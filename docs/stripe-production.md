# Stripe production checklist

Use this before switching a live restaurant from `PAYMENT_PROVIDER=none|mock` to **Stripe live**.

## 1. Stripe account

- [ ] Create / use the restaurant’s Stripe account (or platform Connect if you add that later).
- [ ] Switch Dashboard to **Live** mode (not Test).
- [ ] Complete business verification / payouts so live charges are allowed.

## 2. API secrets (Railway)

Set on the Nest API (`backend/`):

| Variable | Notes |
|----------|--------|
| `PAYMENT_PROVIDER=stripe` | Enables ONLINE + (by default) Terminal |
| `STRIPE_SECRET_KEY` | **Live** `sk_live_…` (never commit) |
| `STRIPE_PUBLISHABLE_KEY` | **Live** `pk_live_…` |
| `STRIPE_WEBHOOK_SECRET` | From the live webhook endpoint (`whsec_…`) |
| `STRIPE_TERMINAL=1` | Keep on for card-present; set `0` only if Terminal is unused |
| `STRIPE_TERMINAL_LOCATION_ID` | Live Location id (`tml_…`) from Stripe Terminal |
| `CUSTOMER_APP_URL` | Production customer origin (Checkout success/cancel) |
| `CASHIER_APP_URL` | Production till origin |
| `CORS_ORIGIN` | Must include customer + cashier (+ guest subdomain wildcards) |

Do **not** mix test keys with live webhooks or vice versa.

## 3. Webhook endpoint

1. Stripe Dashboard → Developers → Webhooks → **Add endpoint**.
2. URL: `https://YOUR-API-HOST/api/payments/webhooks/stripe`
3. Subscribe at least to:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.
5. Confirm Nest is started with **raw body** enabled (required for signature verification).

## 4. Stripe Terminal (card-present)

- [ ] Create a **Location** in Live mode; set `STRIPE_TERMINAL_LOCATION_ID`.
- [ ] Register readers from Cashier (connection token) against that location.
- [ ] Cashier env: `NEXT_PUBLIC_STRIPE_TERMINAL=1` and `NEXT_PUBLIC_ONLINE_PAYMENTS=1` when online checkout is live.

## 5. Frontends (Vercel)

| App | Variable |
|-----|----------|
| Cashier | `NEXT_PUBLIC_ONLINE_PAYMENTS=1` when `PAYMENT_PROVIDER=stripe` |
| Cashier | `NEXT_PUBLIC_STRIPE_TERMINAL=1` when Terminal is on |
| All apps | `NEXT_PUBLIC_API_URL` → `https://…/api` |

## 6. Smoke test (live, small amount)

1. Walk-in or table order → Cashier **ONLINE** payment → complete Checkout → order settles via webhook.
2. Terminal **CARD** → reader collects → `payment_intent.succeeded` settles payment.
3. Failed Terminal intent → payment marked failed (not stuck PENDING forever).
4. Refund path (if used in ops) against a live test charge.

## 7. Ops hygiene

- Rotate any keys that ever appeared in logs or chat.
- Restrict Stripe Dashboard access; prefer restricted API keys if you later split roles.
- Keep `PAYMENT_PROVIDER=mock` only on staging; production should be `stripe` or `none`.

See also: [deploy-vercel-railway.md](./deploy-vercel-railway.md) (CORS, app URLs, Redis).
