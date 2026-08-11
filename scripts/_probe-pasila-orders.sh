#!/usr/bin/env bash
set -euo pipefail
source ~/.nvm/nvm.sh && nvm use 20 >/dev/null
cd /home/mayle/dev/restaurant-platform/backend
npx tsx <<'EOF'
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const ids = ['e9b498a0','8c927daa','c60ff4ba']; // prefixes
const orders = await p.order.findMany({
  where: { branchId: '5cd20e51-448f-4f2d-a6b4-436e715ba2df', status: { in: ['NEW','ACCEPTED','PREPARING','PENDING_PAYMENT','READY','SERVED'] } },
  include: { items: { include: { menuItem: true } }, payments: true, restaurant: { select: { currency: true, name: true } } },
  orderBy: { createdAt: 'desc' },
});
for (const o of orders) {
  const itemSum = o.items.reduce((s,i) => s + Number(i.price)*i.quantity, 0);
  console.log({
    id: o.id.slice(0,8),
    status: o.status,
    total: o.total.toString(),
    itemSum,
    currency: o.restaurant.currency,
    restaurant: o.restaurant.name,
    items: o.items.map(i => `${i.quantity}x ${i.menuItem?.name} @ ${i.price}`),
    payments: o.payments.map(p => `${p.status} ${p.amount}`),
  });
}
await p.$disconnect();
EOF
