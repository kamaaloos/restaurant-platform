#!/usr/bin/env bash
set -euo pipefail
source "$HOME/.nvm/nvm.sh"
nvm use 20
cd "$HOME/dev/restaurant-platform"

echo "=== env files ==="
ls -la backend/.env apps/*/.env 2>/dev/null || true

echo "=== connection targets ==="
WINHOST="$(grep -m1 nameserver /etc/resolv.conf | awk '{print $2}')"
echo "WINHOST=$WINHOST"

check_port() {
  local host="$1" port="$2" label="$3"
  if timeout 2 bash -c "echo >/dev/tcp/${host}/${port}" 2>/dev/null; then
    echo "${label}: open (${host}:${port})"
  else
    echo "${label}: closed (${host}:${port})"
  fi
}

check_port 127.0.0.1 55432 "postgres localhost"
check_port "$WINHOST" 55432 "postgres winhost"
check_port 127.0.0.1 6379 "redis localhost"
check_port "$WINHOST" 6379 "redis winhost"
check_port 127.0.0.1 3000 "api localhost"

echo "=== DATABASE_URL / REDIS ==="
grep -E '^(DATABASE_URL|REDIS)' backend/.env || true
