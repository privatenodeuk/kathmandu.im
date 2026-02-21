#!/bin/bash
# deploy.sh — Deploy kathmandu.im to twakka01 (46.62.205.109)
# Usage: bash deploy.sh
set -euo pipefail

SERVER="root@46.62.205.109"
REMOTE_PATH="/var/www/kathmandu.im"
LOCAL_PATH="$(cd "$(dirname "$0")" && pwd)"
SSH_KEY="$HOME/.ssh/prads2_id_rsa"

echo "Deploying kathmandu.im to twakka01..."
echo "  Source : $LOCAL_PATH/"
echo "  Target : $SERVER:$REMOTE_PATH"
echo ""

rsync -avz --delete \
    -e "ssh -i $SSH_KEY" \
    --exclude='.git' \
    --exclude='.DS_Store' \
    --exclude='.env' \
    --exclude='cloudflare/' \
    --exclude='deploy.sh' \
    "$LOCAL_PATH/" \
    "$SERVER:$REMOTE_PATH/"

echo ""
echo "Done. Site synced to $SERVER:$REMOTE_PATH"
echo "Check: curl -I http://46.62.205.109 -H 'Host: kathmandu.im'"
