#!/usr/bin/env bash
set -euo pipefail
source ~/.nvm/nvm.sh && nvm use 20 >/dev/null
RESP=$(curl -sf -X POST http://127.0.0.1:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"admin@restaurant.local","password":"admin123"}')
TOKEN=$(python3 -c 'import json,sys; print(json.load(sys.stdin)["access_token"])' <<<"$RESP")
BID=5cd20e51-448f-4f2d-a6b4-436e715ba2df
curl -sf "http://127.0.0.1:3000/api/orders/waiter?branchId=$BID" \
  -H "Authorization: Bearer $TOKEN" | python3 - <<'PY'
import json,sys
orders=json.load(sys.stdin)
print("count", len(orders))
for o in orders:
  print(json.dumps({
    "id": o["id"][:8],
    "status": o["status"],
    "total": o.get("total"),
    "total_repr": repr(o.get("total")),
    "balanceDue": o.get("balanceDue"),
    "currency": o.get("currency"),
    "items": [{"name": (i.get("menuItem") or {}).get("name"), "price": i.get("price"), "qty": i.get("quantity")} for i in o.get("items",[])],
  }, indent=2))
PY
