#!/usr/bin/env bash
set -euo pipefail
source ~/.nvm/nvm.sh && nvm use 20 >/dev/null
cd /home/mayle/dev/restaurant-platform/backend
npx tsx <<'EOF'
import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
const downtown = '0e302875-b5f7-4c50-90ce-c202a736aead';
const other = '5cd20e51-448f-4f2d-a6b4-436e715ba2df';
for (const [name, id] of [['downtown', downtown], ['other', other]]) {
  const orders = await p.order.findMany({
    where: { branchId: id },
    orderBy: { createdAt: 'desc' },
    take: 8,
    select: { id: true, status: true, total: true, mode: true, customerName: true },
  });
  console.log('===', name, id.slice(0,8), '===');
  for (const o of orders) console.log(o.status, o.total.toString(), o.mode, o.customerName, o.id.slice(0,8));
}
const branches = await p.branch.findMany({ select: { id: true, name: true, restaurantId: true } });
console.log('branches', branches.map(b => ({ id: b.id.slice(0,8), name: b.name })));
await p.$disconnect();
EOF
