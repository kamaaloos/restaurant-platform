#!/usr/bin/env bash
# Quick ops config checks. Run from repo root.
set -euo pipefail

API="${API_URL:-http://127.0.0.1:3000/api}"
AM="${ALERTMANAGER_URL:-http://127.0.0.1:9093}"
PROM="${PROMETHEUS_URL:-http://127.0.0.1:9090}"
ok=0
fail=0

check() {
  local name="$1"
  shift
  if "$@"; then
    echo "OK   $name"
    ok=$((ok + 1))
  else
    echo "FAIL $name"
    fail=$((fail + 1))
  fi
}

echo "=== API ==="
check "health" curl -sf --max-time 5 "$API/health" >/dev/null
METRICS_AUTH=()
if [ -n "${METRICS_TOKEN:-}" ]; then
  METRICS_AUTH=(-H "Authorization: Bearer ${METRICS_TOKEN}")
fi
check "metrics" curl -sf --max-time 5 "${METRICS_AUTH[@]}" "$API/metrics" | grep -q restaurant_prep_duration_seconds

echo "=== Payments / Terminal ==="
if curl -sf --max-time 5 "$API/payments/config" >/tmp/pay-config.json 2>/dev/null; then
  # config endpoint is JWT-guarded on some setups — try public path
  :
fi
# Public-ish: many installs guard /payments/config; try anyway and report
CFG=$(curl -s --max-time 5 -o /tmp/pay-config.json -w "%{http_code}" "$API/payments/config" || echo 000)
if [ "$CFG" = "200" ]; then
  if grep -q '"terminalEnabled":true' /tmp/pay-config.json; then
    echo "OK   terminalEnabled=true"
    ok=$((ok + 1))
  else
    echo "WARN terminalEnabled is not true (CARD stays honor-system)"
  fi
  if grep -qE '"terminalLocationId":"tml_' /tmp/pay-config.json; then
    echo "OK   terminalLocationId set (tml_…)"
    ok=$((ok + 1))
  else
    echo "WARN terminalLocationId missing — set STRIPE_TERMINAL_LOCATION_ID"
  fi
elif [ "$CFG" = "401" ] || [ "$CFG" = "403" ]; then
  echo "WARN /payments/config needs auth ($CFG) — check STRIPE_TERMINAL_LOCATION_ID in backend/.env"
else
  echo "FAIL payments/config HTTP $CFG"
  fail=$((fail + 1))
fi

echo "=== Observability ==="
check "alertmanager -/healthy" curl -sf --max-time 5 "$AM/-/healthy" >/dev/null
check "prometheus -/healthy" curl -sf --max-time 5 "$PROM/-/healthy" >/dev/null
if curl -sf --max-time 5 "$PROM/api/v1/alertmanagers" | grep -q alertmanager; then
  echo "OK   prometheus → alertmanager wired"
  ok=$((ok + 1))
else
  echo "WARN prometheus not reporting alertmanager (stack down or not started)"
fi

echo
echo "Passed: $ok  Failed: $fail"
echo "See observability/OPS.md for Slack webhook + Stripe Location steps."
[ "$fail" -eq 0 ]
