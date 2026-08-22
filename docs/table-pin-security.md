# Table PIN & presence (operator notes)

## What it protects

Dine-in QR links are public. Guests must enter the **6-digit PIN** printed on the table card before placing orders or creating service requests. After a successful verify, a signed **httpOnly** cookie (`ms_tp`) is valid until **end of the restaurant calendar day** (timezone from restaurant settings).

## Residual risk (by design)

| Residual | Why | Operator mitigation |
|----------|-----|---------------------|
| Same-day remote orders | Cookie lasts until EOD after one PIN | Rotate QR/PIN if abuse suspected; reprint card |
| Shared PIN on table | Anyone at/near the table can read it | Physical card placement; rotate on shift if needed |
| Guessing | 6-digit space (~1e6); verify limited to **5/min** | Prefer Redis throttling in production; rotate after incidents |
| Menu / cancel without PIN | Browse + cancel `NEW` still QR-only | Staff can cancel rogue orders from boards |

## Ops checklist

1. Set `TABLE_PRESENCE_SECRET` in production (falls back to `JWT_SECRET` if unset).
2. After deploy, **rotate QR** on existing tables so they get 6-digit PINs (older 4-digit hashes stay valid until rotate).
3. Re-seed local demos: demo PIN is `123456`.
4. Require `REDIS_URL` so PIN verify rate limits are shared across API replicas.

## Related code

- `backend/src/tables/order-pin.util.ts` — PIN generation
- `backend/src/customer/table-presence.*` — cookie + verify
- Admin Tables → rotate QR → copy PIN → print card
