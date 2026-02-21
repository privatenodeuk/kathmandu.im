#!/bin/bash
# cloudflare/setup-dns.sh
# Creates/updates DNS A records for kathmandu.im → 46.62.205.109 (twakka01)
# Requires CLOUDFLARE_API_TOKEN in .env or environment.
#
# Usage:
#   cp .env.example .env          # fill in token
#   bash cloudflare/setup-dns.sh
set -euo pipefail

DOMAIN="kathmandu.im"
SERVER_IP="46.62.205.109"
CF_API="https://api.cloudflare.com/client/v4"

# ── Load .env if present ─────────────────────────────────────────────────────
ENV_FILE="$(cd "$(dirname "$0")" && pwd)/.env"
if [[ -f "$ENV_FILE" ]]; then
    # shellcheck disable=SC1090
    source "$ENV_FILE"
fi

TOKEN="${CLOUDFLARE_API_TOKEN:-}"
if [[ -z "$TOKEN" ]]; then
    echo "Error: CLOUDFLARE_API_TOKEN not set."
    echo "  Create cloudflare/.env with CLOUDFLARE_API_TOKEN=<token>"
    echo "  Token is in /home/binit/privatenode/.env"
    exit 1
fi

# ── Helper ───────────────────────────────────────────────────────────────────
cf() {
    curl -sS -H "Authorization: Bearer $TOKEN" \
              -H "Content-Type: application/json" \
              "$@"
}

# ── Look up Zone ID ───────────────────────────────────────────────────────────
echo "Looking up zone for $DOMAIN..."
ZONE_RESP=$(cf "$CF_API/zones?name=$DOMAIN&status=active")
ZONE_ID=$(echo "$ZONE_RESP" | python3 -c "
import sys, json
d = json.load(sys.stdin)
zones = d.get('result', [])
if not zones:
    raise SystemExit('No active zone found for $DOMAIN. Make sure it is added to Cloudflare.')
print(zones[0]['id'])
")
echo "Zone ID: $ZONE_ID"

# ── Upsert A record ──────────────────────────────────────────────────────────
upsert_record() {
    local name="$1"
    local ip="$2"

    EXISTING=$(cf "$CF_API/zones/$ZONE_ID/dns_records?type=A&name=$name")
    RECORD_ID=$(echo "$EXISTING" | python3 -c "
import sys, json
r = json.load(sys.stdin).get('result', [])
print(r[0]['id'] if r else '')
")

    PAYLOAD=$(python3 -c "
import json
print(json.dumps({'type':'A','name':'$name','content':'$ip','ttl':1,'proxied':True}))
")

    if [[ -n "$RECORD_ID" ]]; then
        echo "Updating A record: $name → $ip (proxied)"
        cf -X PUT "$CF_API/zones/$ZONE_ID/dns_records/$RECORD_ID" \
           -d "$PAYLOAD" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  OK' if d.get('success') else f'  ERROR: {d}')"
    else
        echo "Creating A record: $name → $ip (proxied)"
        cf -X POST "$CF_API/zones/$ZONE_ID/dns_records" \
           -d "$PAYLOAD" | python3 -c "import sys,json; d=json.load(sys.stdin); print('  OK' if d.get('success') else f'  ERROR: {d}')"
    fi
}

upsert_record "$DOMAIN"        "$SERVER_IP"
upsert_record "www.$DOMAIN"    "$SERVER_IP"

echo ""
echo "DNS records set. Propagation may take up to 5 minutes (Cloudflare proxy)."
echo "Verify: dig $DOMAIN +short"
