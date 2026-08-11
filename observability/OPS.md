# Ops config checklist — Alertmanager paging + Stripe Terminal Location
#
# Code paths are ready. Fill these once per environment.

## 1. Alertmanager → Slack

1. Create a Slack Incoming Webhook: https://api.slack.com/messaging/webhooks  
   (pick the alerts channel → copy the `https://hooks.slack.com/services/...` URL).  
   Discord alternative: channel webhook URL + append `/slack`.
2. Copy `observability/env.example` → `.env.observability` at the repo root.
3. Set `ALERTMANAGER_WEBHOOK_URL` to that HTTPS URL.
4. Start / recreate observability stack:

```bash
docker compose --env-file .env.observability --profile observability up -d
```

5. Open http://localhost:9093 → Status → Config and confirm the webhook URL.
6. Fire a test alert (optional):

```bash
curl -s -X POST http://127.0.0.1:9093/api/v2/alerts \
  -H 'Content-Type: application/json' \
  -d '[{
    "labels": {"alertname":"OpsConfigTest","severity":"page","service":"restaurant"},
    "annotations": {"summary":"Ops config test page","description":"Ignore — verifying webhook"}
  }]'
```

You should see a message in Slack/Discord within a few seconds.
Warnings stay local (null receiver); only `severity=page` pages.

Rules that page today: `PrepLatencyCritical`, `PaymentSettleLatencyCritical`
(see `observability/alerts/restaurant-slos.yml`).

## 2. Stripe Terminal Location + physical reader

Requires `PAYMENT_PROVIDER=stripe` and Terminal enabled on the API.

1. Stripe Dashboard → **Terminal** → **Locations** → Create location
   (address of the restaurant / counter).
2. Copy the Location ID (`tml_...`).
3. In `backend/.env`:

```bash
PAYMENT_PROVIDER=stripe
STRIPE_SECRET_KEY=sk_live_...   # or sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_...
STRIPE_TERMINAL=1
STRIPE_TERMINAL_LOCATION_ID=tml_...
```

4. In `apps/cashier/.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_STRIPE_TERMINAL=1
```

5. Restart API + cashier.
6. Cashier → **Payments** → expand **Stripe Terminal reader** → **Physical**.
7. On the WisePOS / BBPOS: open registration / pairing mode → note the code.
8. Enter code + label → **Register reader** → select it in the dropdown.
9. Take a small CARD payment to confirm the reader collects the PI.

Simulated mode remains the default (local + CI); no hardware needed until you switch to Physical.

## 3. Quick verify

```bash
# From repo root (WSL or Git Bash)
bash scripts/ops-verify.sh
```

Checks: API health, metrics scrape, payment config exposes `terminalLocationId`,
Alertmanager up, Prometheus targeting Alertmanager.
