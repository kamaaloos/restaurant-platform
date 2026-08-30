# Deploy: Neon + Railway (API) + Vercel (frontends)

This guide deploys the restaurant platform with:

| Component | Host |
|-----------|------|
| PostgreSQL | [Neon](https://neon.tech) |
| Nest API (`backend/`) | [Railway](https://railway.app) |
| Next.js apps (`apps/*`) | [Vercel](https://vercel.com) — one project per app |

Local installs use the **root npm workspaces** (`apps/*`, `packages/*`, `backend`). Railway keeps Root Directory `backend/` and uses `backend/package-lock.json` separately — after changing API deps, run `npm install` at the repo root **and** `npm install --prefix backend`.

---

## 0. CI (GitHub Actions)

Workflow: `.github/workflows/ci.yml` (runs on push/PR to `main`).

| Job | What it runs |
|-----|----------------|
| Apps | `nx affected -t lint build` for workspace apps |
| Backend | `npm run test:ci` + `npm run build` in `backend/` |
| E2E smoke | Build customer → Playwright `portfolio-smoke` (no API/seed) |
| E2E staff | Postgres + Redis → migrate/seed API → kitchen/waiter/cashier Playwright |

Local equivalents:

```bash
npm run ci:apps
npm run ci:backend
npm run build --workspace=customer && npm run customer:e2e:smoke

# Staff e2e (API must be up + seeded):
npm run backend:dev
# other terminal after migrate/seed:
npm run build --workspace=kitchen
npm run build --workspace=waiter
npm run build --workspace=cashier
npm run ci:e2e:staff
```

---

## 1. Neon (database)

1. Create a project in Neon.
2. Copy the **pooled** connection string (`?sslmode=require`).
3. You will set this as `DATABASE_URL` on Railway.

After the API is deployed once, seed demo data (from your machine or Railway shell):

```bash
cd backend
DATABASE_URL="postgresql://..." npm run seed
```

**Demo seed users (local/CI only):** `admin@restaurant.local` / `admin123` and `cashier@restaurant.local` / `cashier123`.

**Before production:** change those passwords in Admin (or delete the demo users) and create real staff accounts. Re-running seed does **not** reset existing passwords. Never leave the default passwords on a public API.

Restaurant receipts use each restaurant’s **tax rate %** (Admin → Restaurants; default 22). Menu prices are treated as tax-inclusive.

**Stripe live:** see [stripe-production.md](./stripe-production.md).

---

## 2. Railway (API)

### Create the service

1. New Project → **Deploy from GitHub repo**.
2. Add a service for the API.
3. **Settings → Root Directory:** `backend`
4. Railway reads `backend/railway.toml`:
   - Runs `npx prisma migrate deploy` then `npm run start:prod` on deploy
   - Health check: `GET /api/health`

### Build

Nixpacks installs with **devDependencies** (`backend/nixpacks.toml`) so `@nestjs/cli` is available for `npm run build`. `postinstall` runs `prisma generate` (needs `DATABASE_URL`).

### Variables

Copy from `backend/.env.example`. Minimum for production:

| Variable | Example |
|----------|---------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Neon pooled URL |
| `JWT_SECRET` | long random string |
| `JWT_EXPIRES_IN` | `15m` (access token; refresh cookie is 14 days) |
| `METRICS_TOKEN` | long random string (required for `/api/metrics` and `/api/slo`) |
| `CORS_ORIGIN` | comma-separated Vercel production URLs (no trailing slash) |
| `CORS_ALLOW_VERCEL_PREVIEWS` | `1` (allows `https://*.vercel.app` for PR previews) |
| `CUSTOMER_APP_URL` | `https://your-customer.vercel.app` |
| `CASHIER_APP_URL` | `https://your-cashier.vercel.app` |

Optional for now: `REDIS_URL` (Railway Redis plugin). When set, Socket.IO and rate limits use Redis. When omitted, the API uses in-memory fallbacks (**single instance only** — add Redis before scaling replicas).

`PORT` is injected by Railway — do not hardcode.

### Verify

```bash
curl https://YOUR-RAILWAY-HOST.up.railway.app/api/health
curl https://YOUR-RAILWAY-HOST.up.railway.app/api/ready
```

### Troubleshooting: `P1001 Can't reach database server`

Deploy logs show `prisma migrate deploy` failing before Nest starts. This is **Neon connectivity**, not Nest code.

1. **Neon Console** → open the project → confirm the compute is **Active** (not Suspended). Free tier sleeps after idle; open the SQL Editor once to wake it, then **Redeploy** on Railway.
2. **Connection string** — Railway `DATABASE_URL` must be the **pooled** Neon URL (`…-pooler….neon.tech`) with `?sslmode=require`. If you reset the password in Neon, paste the new URL into Railway.
3. **IP allowlist** — Neon → Settings → Networking: if allowlisting is on, allow Railway (or disable allowlisting for the project).
4. Start command already retries migrate (`scripts/migrate-deploy-with-retry.mjs`) for cold starts; a persistent P1001 still means Neon/Railway cannot open TCP to the host.

---

## 3. Vercel (five Next.js apps)

Create **five** Vercel projects from the same repo:

| App | Root Directory | Port (local dev) |
|-----|----------------|------------------|
| Customer | `apps/customer` | 3001 |
| Kitchen | `apps/kitchen` | 3002 |
| Waiter | `apps/waiter` | 3003 |
| Admin | `apps/admin` | 3004 |
| Cashier | `apps/cashier` | 3005 |

Each app includes a `vercel.json` that installs dependencies from the monorepo root:

```json
{
  "installCommand": "npm install --prefix ../..",
  "buildCommand": "npm run build"
}
```

### Troubleshooting Vercel builds

**`Couldn't find any pages or app directory`** — Vercel is building from the **repo root** instead of `apps/<app>`. The log shows `npm run vercel-build` → `next build` at `@org/source` (root). Fix:

1. Vercel → **customer** project (the one that serves `retail.maylesoft.com`) → **Settings → General**
2. **Root Directory** → `apps/customer` (not empty, not `.`)
3. Save → **Redeploy**

When Root Directory is correct, the build log should show `npm run build` (from `apps/customer/vercel.json`), not root `vercel-build`. Rewrites in `apps/customer/vercel.json` (e.g. `/api/activate` → Railway) only apply after a successful deploy with this setting.

**Wrong Vercel project** — If you created a sixth project linked to the repo without a Root Directory, delete it or set Root Directory; do not point `retail.maylesoft.com` at a root-level project.


| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-RAILWAY-HOST.up.railway.app/api` (must include `https://` **and** end with `/api`) |
| `NEXT_PUBLIC_WS_URL` | `https://YOUR-RAILWAY-HOST.up.railway.app` |

Do **not** set `NEXT_PUBLIC_API_URL` to `maylesoft.com` or a Railway host **without** `/api`. Nest routes live under `/api`. `https://….up.railway.app/customer/tenants/alhuda` returns 404; `https://….up.railway.app/api/customer/tenants/alhuda` is correct.

### Admin only

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CUSTOMER_URL` | QR / table links — use `https://customer.maylesoft.com`, **not** `www` / apex |
| `NEXT_PUBLIC_KITCHEN_URL` | Kitchen device pairing links |
| `NEXT_PUBLIC_WAITER_URL` | Waiter device pairing links |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — menu / brand image uploads (Storage → Blob → token) |

### Cashier only (Stripe)

| Variable | When |
|----------|------|
| `NEXT_PUBLIC_ONLINE_PAYMENTS=1` | API `PAYMENT_PROVIDER=stripe` |
| `NEXT_PUBLIC_STRIPE_TERMINAL=1` | Stripe Terminal enabled on API |

Full live go-live checklist: [stripe-production.md](./stripe-production.md).

See each app’s `.env.example` for copy-paste templates.

---

## 4. Wire CORS on Railway

After you know your Vercel URLs, set on Railway:

```
CORS_ORIGIN=https://customer-xxx.vercel.app,https://kitchen-xxx.vercel.app,https://waiter-xxx.vercel.app,https://admin-xxx.vercel.app,https://cashier-xxx.vercel.app
CORS_ALLOW_VERCEL_PREVIEWS=1
```

With `CORS_ALLOW_VERCEL_PREVIEWS=1`, PR preview deployments (`*.vercel.app`) can call the API without listing every preview URL.

Also update `CUSTOMER_APP_URL` and `CASHIER_APP_URL` to your production customer/cashier URLs.

For **restaurant subdomains** (Pattern B, e.g. `alhuda.maylesoft.com`), include a wildcard origin:

```
CORS_ORIGIN=https://admin.maylesoft.com,https://kitchen.maylesoft.com,https://waiter.maylesoft.com,https://till.maylesoft.com,https://maylesoft.com,https://*.maylesoft.com

Same list applies to **HTTP** and **Socket.IO** (`/realtime`). Wildcards such as `https://*.maylesoft.com` are evaluated by shared CORS helpers (not matched as a literal string).
```

---

## 4b. Custom domain: restaurant subdomains (Pattern B)

Guest ordering can live on **one subdomain per restaurant**:

| Host | App |
|------|-----|
| `maylesoft.com` / `www` | Customer — MayleSoft product hub (links to each product) |
| `customer.maylesoft.com` | Customer — restaurant platform marketing landing |
| `retail.maylesoft.com` | Customer — MayleSoft Retail (Windows POS) landing |
| `clinic.maylesoft.com` | **Separate** ClinicOS app (not the customer project) |
| `hkamal.maylesoft.com` | Customer — personal portfolio (Hasan Kamal) |
| `alhuda.maylesoft.com` | Customer (tenant home + `/w`, `/t`) |
| `admin.maylesoft.com` | Admin |
| `kitchen.maylesoft.com` | Kitchen |
| `waiter.maylesoft.com` | Waiter |
| `till.maylesoft.com` | Cashier |

**Retail is not a 6th Vercel project.** Do not deploy the Flutter repo’s `site/` folder as a separate Vercel site. `retail.maylesoft.com` must point at the **customer** project (same as `customer.maylesoft.com`). Host-based routing in `apps/customer/src/app/page.tsx` serves `RetailLanding`; `retail` is a reserved label in `tenant-host.ts` (not a restaurant tenant).

**ClinicOS is a separate app.** `clinic.maylesoft.com` already hosts ClinicOS on its own Vercel project. Keep DNS pointed at that project. The MayleSoft hub only **links** to it; do not serve a duplicate clinic landing from the customer app. `clinic` is reserved in `tenant-host.ts` so a misrouted wildcard never treats it as a restaurant slug.

### DNS (registrar)

1. **Wildcard for guests** — Customer Vercel project:
   - Type: **CNAME**
   - Name: `*`
   - Value: `cname.vercel-dns.com` (use the value Vercel shows)
2. Add **app** subdomains the same way (`admin`, `kitchen`, `waiter`, `till`, **`customer`**) pointing at their Vercel projects.
3. Apex `maylesoft.com` → customer project (product hub). **`customer.maylesoft.com`** → same customer project (restaurant landing).

### Vercel (customer project)

1. Domains → add `*.maylesoft.com`, `maylesoft.com`, **`customer.maylesoft.com`**, and **`retail.maylesoft.com`** (wildcard covers retail; explicit domain avoids misrouting to another project)
2. Set env:
   - `NEXT_PUBLIC_ROOT_DOMAIN=maylesoft.com`
   - `NEXT_PUBLIC_MARKETING_HOST=customer.maylesoft.com`
   - Optional: `NEXT_PUBLIC_RETAIL_HOST=retail.maylesoft.com` (default when unset)
   - Optional: `NEXT_PUBLIC_PORTFOLIO_HOST=hkamal.maylesoft.com` (default when unset)
3. Redeploy customer after adding the env var.

`hkamal` is a **reserved** subdomain (not a restaurant tenant). The wildcard `*.maylesoft.com` CNAME covers it; no extra DNS record is required unless you use a custom portfolio host.

### Admin

1. Set `NEXT_PUBLIC_ROOT_DOMAIN=maylesoft.com` so walk-in copy links use `https://{slug}.maylesoft.com/w/...`
2. Set `NEXT_PUBLIC_CUSTOMER_URL=https://customer.maylesoft.com` (or `NEXT_PUBLIC_MARKETING_HOST=customer.maylesoft.com`) so table QR codes do not point at the product hub on `www`.
3. In Restaurants, set each restaurant **slug** (e.g. `alhuda`) — this is the subdomain label.

### How it works

- Middleware reads the host; `alhuda.maylesoft.com` rewrites `/` → restaurant home (branches list).
- `customer.maylesoft.com` serves the restaurant platform marketing page.
- `retail.maylesoft.com` serves the MayleSoft Retail (Windows POS) landing — `retail` is a **reserved** label (not a restaurant tenant).
- Retail update feed: `https://retail.maylesoft.com/latest.json` (file: `apps/customer/public/latest.json`). Put the matching installer at `apps/customer/public/MayleSoftRetail-Setup-0.1.0.exe` (same path as `downloadUrl` in that JSON) before deploy.
- **Retail license activation** is a **separate Railway service** (not the restaurant `backend`). The Windows app posts to `https://retail.maylesoft.com/api/activate`. That path is proxied to Railway in `apps/customer/vercel.json` — the Flutter repo’s `site/vercel.json` rewrite is **not** used in production because `retail.maylesoft.com` is on the customer Vercel project, not a standalone `site/` deploy. After changing the rewrite destination, redeploy the customer project.
- `maylesoft.com` serves a small product hub (Restaurant platform, Dugsi, Retail, …).
- Public API: `GET /api/customer/tenants/:slug`
- Reserved labels (`admin`, `kitchen`, `customer`, `dugsi`, `retail`, `www`, …) are never treated as restaurant slugs.

Guest menu/service-request 404s on `/t/maylesoft.com/customer/...` mean the **customer** Vercel project’s `NEXT_PUBLIC_API_URL` is a relative host. Fix it to the Railway URL, then **redeploy** (Next inlines `NEXT_PUBLIC_*` at build time).

---

## 5. Preview vs production

- **Production:** stable Vercel domains + `CORS_ORIGIN` list on Railway.
- **PR previews:** enable `CORS_ALLOW_VERCEL_PREVIEWS=1`; preview frontends use the same `NEXT_PUBLIC_API_URL` pointing at Railway.
- You can use a single Railway API for both preview and production frontends.

---

## 6. Smoke test checklist

- [ ] `GET /api/health` and `/api/ready` return OK on Railway
- [ ] Admin login at `/login`
- [ ] Customer menu loads (walk-in or table QR)
- [ ] Kitchen / waiter boards connect (WebSocket via `NEXT_PUBLIC_WS_URL`)
- [ ] Cashier walk-in order → pay → kitchen receives order
- [ ] Realtime updates (order status) without refresh

---

## Local development (reference)

| Service | URL |
|---------|-----|
| API | http://localhost:3000/api |
| Customer | http://localhost:3001 |
| Kitchen | http://localhost:3002 |
| Waiter | http://localhost:3003 |
| Admin | http://localhost:3004 |
| Cashier | http://localhost:3005 |

Copy `backend/.env.example` → `backend/.env` and each app’s `.env.example` → `.env.local` for local overrides.

---

## 7. Cloudflare & security.txt

The customer Vercel project serves `/.well-known/security.txt` from `apps/customer/public/.well-known/security.txt` (apex `maylesoft.com` and tenant subdomains on the same project).

DNS and edge hardening (Bot Fight Mode, DMARC, optional AI Labyrinth): **[cloudflare-checklist.md](./cloudflare-checklist.md)**.
