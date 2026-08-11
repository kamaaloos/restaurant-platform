#!/usr/bin/env bash
set -euo pipefail
source "$HOME/.nvm/nvm.sh"
nvm use 20 >/dev/null
echo "=== migrations ==="
ls "$HOME/dev/restaurant-platform/backend/prisma/migrations" | tail -8
cd "$HOME/dev/restaurant-platform/backend"
npx prisma db execute --stdin <<'SQL'
SELECT column_name
FROM information_schema.columns
WHERE table_name = 'Device' AND column_name LIKE 'pairing%';
SQL
