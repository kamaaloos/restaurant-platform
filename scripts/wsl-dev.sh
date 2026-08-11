#!/usr/bin/env bash
# Quick helpers for the WSL-native checkout at ~/dev/restaurant-platform
# Usage: source ~/dev/restaurant-platform/scripts/wsl-dev.sh

export REPO_ROOT="${REPO_ROOT:-$HOME/dev/restaurant-platform}"
# shellcheck disable=SC1090
source "$HOME/.nvm/nvm.sh"
nvm use 20 >/dev/null

alias rp='cd "$REPO_ROOT"'
alias rp-backend='cd "$REPO_ROOT/backend" && npm run start:dev'
alias rp-customer='cd "$REPO_ROOT" && npm run customer:dev'
alias rp-kitchen='cd "$REPO_ROOT" && npm run kitchen:dev'
alias rp-waiter='cd "$REPO_ROOT" && npm run waiter:dev'
alias rp-admin='cd "$REPO_ROOT" && npm run admin:dev'
alias rp-cashier='cd "$REPO_ROOT" && npm run cashier:dev'

echo "WSL repo: $REPO_ROOT (node $(node -v))"
echo "Aliases: rp, rp-backend, rp-customer, rp-kitchen, rp-waiter, rp-admin, rp-cashier"
