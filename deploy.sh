#!/bin/bash
# deploy.sh — Deploy kathmandu.im to twakka01 (46.62.205.109)
# Usage: bash deploy.sh
set -euo pipefail

SERVER="root@46.62.205.109"
REMOTE_PATH="/var/www/kathmandu.im"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"
SSH_KEY="$HOME/.ssh/id_ed25519"

echo "Deploying kathmandu.im to twakka01..."
echo "  Source : $LOCAL_PATH/"
echo "  Target : $SERVER:$REMOTE_PATH"
echo ""

# Sync code (excluding secrets and git history)
rsync -avz --delete \
    -e "ssh -i $SSH_KEY" \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='.env' \
    --exclude='cloudflare/' \
    --exclude='deploy.sh' \
    --exclude='node_modules' \
    "$LOCAL_PATH/" \
    "$SERVER:$REMOTE_PATH/"

echo ""
echo "✓ Code synced"

# Rebuild and restart the container on the server
echo "Rebuilding Docker container on server..."
ssh -i "$SSH_KEY" "$SERVER" "
  cd $REMOTE_PATH
  docker compose -f docker-compose.prod.yml build --no-cache app
  docker compose -f docker-compose.prod.yml up -d
  docker compose -f docker-compose.prod.yml ps
"

echo ""
echo "✓ Deployed. Check: curl -I https://kathmandu.im"
