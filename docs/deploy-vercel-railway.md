# Deploy: Neon + Railway (API) + Vercel (frontends)

This guide deploys the restaurant platform with:

| Component | Host |
|-----------|------|
| PostgreSQL | [Neon](https://neon.tech) |
| Nest API (`backend/`) | [Railway](https://railway.app) |
| Next.js apps (`apps/*`) | [Vercel](https://vercel.com) — one project per app |

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

Default admin login after seed: `admin@restaurant.local` / `admin123`.

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
| `CORS_ORIGIN` | comma-separated Vercel production URLs (no trailing slash) |
| `CORS_ALLOW_VERCEL_PREVIEWS` | `1` (allows `https://*.vercel.app` for PR previews) |
| `CUSTOMER_APP_URL` | `https://your-customer.vercel.app` |
| `CASHIER_APP_URL` | `https://your-cashier.vercel.app` |

Optional: `PAYMENT_PROVIDER`, Stripe keys, Redis (see `.env.example`).

For a **single-replica** first deploy without Redis, set `REDIS_OPTIONAL=1`.
For multi-instance / reliable realtime, add a Railway Redis plugin and set `REDIS_URL`.

`PORT` is injected by Railway — do not hardcode.

### Verify

```bash
curl https://YOUR-RAILWAY-HOST.up.railway.app/api/health
curl https://YOUR-RAILWAY-HOST.up.railway.app/api/ready
```

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

### Environment variables (all apps)

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://YOUR-RAILWAY-HOST.up.railway.app/api` |
| `NEXT_PUBLIC_WS_URL` | `https://YOUR-RAILWAY-HOST.up.railway.app` |

### Admin only

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_CUSTOMER_URL` | QR / table links |
| `NEXT_PUBLIC_KITCHEN_URL` | Kitchen device pairing links |
| `NEXT_PUBLIC_WAITER_URL` | Waiter device pairing links |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob — menu / brand image uploads (Storage → Blob → token) |

### Cashier only (Stripe)

| Variable | When |
|----------|------|
| `NEXT_PUBLIC_ONLINE_PAYMENTS=1` | API `PAYMENT_PROVIDER=stripe` |
| `NEXT_PUBLIC_STRIPE_TERMINAL=1` | Stripe Terminal enabled on API |

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
