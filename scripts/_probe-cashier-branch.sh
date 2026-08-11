#!/usr/bin/env bash
set -euo pipefail
source ~/.nvm/nvm.sh && nvm use 20 >/dev/null
cd /home/mayle/dev/restaurant-platform/backend

npx tsx <<'EOF'
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const cashier = await p.user.findUnique({ where: { email: 'cashier@restaurant.local' } });
console.log('cashier', { branchId: cashier?.branchId, restaurantId: cashier?.restaurantId, role: cashier?.role });
const order = await p.order.findFirst({ where: { status: 'NEW' }, orderBy: { createdAt: 'desc' } });
console.log('openOrder', order && { id: order.id.slice(0,8), branchId: order.branchId, total: order.total.toString(), status: order.status });
await p.$disconnect();
EOF

RESP=$(curl -sf -X POST http://127.0.0.1:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"cashier@restaurant.local","password":"cashier123"}')
TOKEN=$(python3 -c 'import json,sys; print(json.load(sys.stdin)["access_token"])' <<<"$RESP")

# list branches
curl -sf http://127.0.0.1:3000/api/branches -H "Authorization: Bearer $TOKEN" | python3 -c 'import json,sys; b=json.load(sys.stdin); print("branches", [(x["id"][:8], x["name"]) for x in b])'

# get profile
curl -sf http://127.0.0.1:3000/api/profile -H "Authorization: Bearer $TOKEN" | python3 -c 'import json,sys; print("profile", json.load(sys.stdin))'

# orders with and without branch
python3 - <<PY
import json, urllib.request
token = """$TOKEN"""
req = urllib.request.Request("http://127.0.0.1:3000/api/orders/waiter", headers={"Authorization": f"Bearer {token}"})
with urllib.request.urlopen(req) as r:
    orders = json.load(r)
print("waiter_no_query", len(orders))
for o in orders[:3]:
    print(" ", o.get("id","")[:8], o.get("total"), o.get("currency"), o.get("balanceDue"), o.get("status"))
PY
