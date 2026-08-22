# MayleSoft Restaurant Platform

Nx monorepo for multi-tenant restaurant ops: guest QR ordering, kitchen/waiter displays, cashier till, and admin console — backed by a NestJS + Prisma API.

## Apps & packages

| Path | Role |
|------|------|
| `apps/customer` | Guest hub, tenant sites, QR dine-in, walk-in / pickup |
| `apps/admin` | Restaurants, menu, tables, devices, users, ledger |
| `apps/kitchen` | Kitchen display (device pairing) |
| `apps/waiter` | Floor / waiter display |
| `apps/cashier` | Till, payments, receipts |
| `backend` | NestJS API (`/api`), Prisma, Socket.IO realtime |
| `packages/shared` | Shared URL helpers, money, device pairing, etc. |
| `packages/realtime` | Shared Socket.IO React hook |

## Prerequisites

- Node.js 22+
- Docker (Postgres + Redis via `docker-compose.yaml`)
- npm workspaces (root `package-lock.json`)

## Quick start

```bash
# Infra
docker compose up -d postgres redis

# Install all workspaces (apps, packages, backend)
npm ci

# API — copy backend/.env.example → backend/.env, then:
npm run backend:dev
# other terminal — migrate + seed once:
npm run seed --workspace=backend

# Frontends (pick what you need)
npm run customer:dev   # :3001
npm run kitchen:dev    # :3002
npm run waiter:dev     # :3003
npm run admin:dev      # :3004
npm run cashier:dev    # :3005
```

Default seed logins (local/CI only): `admin@restaurant.local` / `admin123`, `cashier@restaurant.local` / `cashier123`. Rotate before any public deploy.

## Workspaces note

`backend` is an npm workspace for local/CI installs from the repo root. **Railway** still uses Root Directory `backend/` and its own `backend/package-lock.json` — after changing API dependencies, update both:

```bash
npm install                       # root lockfile
npm install --prefix backend      # Railway lockfile
```

## CI

GitHub Actions (`.github/workflows/ci.yml`):

- Apps: `nx affected` lint/build
- Backend: Jest allowlist + build
- Customer Playwright portfolio smoke (no API)
- Staff Playwright against seeded API (kitchen / waiter / cashier)

```bash
npm run ci:apps
npm run ci:backend
npm run customer:e2e:smoke
# staff e2e needs API + seed running — see docs/deploy-vercel-railway.md
```

## Docs

- [Deploy: Neon + Railway + Vercel](docs/deploy-vercel-railway.md)
- [Stripe production checklist](docs/stripe-production.md)
- [Table PIN security](docs/table-pin-security.md)

## Stack

Next.js 15 · NestJS 11 · Prisma · PostgreSQL · Redis · Socket.IO · Stripe (optional) · Playwright
