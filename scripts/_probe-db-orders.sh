#!/usr/bin/env bash
set -euo pipefail
source ~/.nvm/nvm.sh && nvm use 20 >/dev/null
cd /home/mayle/dev/restaurant-platform/backend

npx tsx <<'EOF'
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const orders = await p.order.findMany({
  orderBy: { createdAt: 'desc' },
  take: 10,
  select: {
    id: true,
    status: true,
    total: true,
    mode: true,
    branchId: true,
    customerName: true,
    createdAt: true,
    _count: { select: { items: true } },
  },
});
for (const o of orders) {
  console.log({
    id: o.id.slice(0, 8),
    status: o.status,
    total: o.total.toString(),
    mode: o.mode,
    items: o._count.items,
    customer: o.customerName,
  });
}
await p.$disconnect();
EOF
