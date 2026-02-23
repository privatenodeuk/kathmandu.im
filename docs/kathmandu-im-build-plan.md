# kathmandu.im — Full Build Plan for Claude Code

## Project Goal

Resurrect and rebuild `kathmandu.im` as a comprehensive, SEO-rich travel directory focused on Kathmandu, Nepal. The initial launch version will focus on:

1. **Top Tourist Points of Interest (POIs)** — rich editorial content, photos, maps
2. **Top 5-star and 4-star hotels** — detailed listings, no affiliate links yet
3. A professional, fast, beautiful site that can be used to **apply for affiliate programmes** (Travelpayouts, Booking.com Partner Hub, Agoda)
4. Then layer in affiliate monetisation once approved

**Everything runs in Docker** — Next.js app, self-hosted Supabase, Postgres, storage, and all tooling. No cloud dependencies during development.

---

## Phase Overview

| Phase | What | Why |
|-------|------|-----|
| 0 | Credential discovery, Docker infrastructure, DB schema, design system | Foundation |
| 1 | 25 POI listings with rich content | Content credibility for affiliate applications |
| 2 | 20 top hotel listings (4★ + 5★) | Monetisation-ready listings |
| 3 | SEO layer, JSON-LD, sitemaps, neighbourhood pages | Search visibility |
| 4 | Affiliate integration (Travelpayouts, Booking.com) | Revenue |
| 5 | Scale to budget hotels, restaurants, tours, experiences | Growth |

---

## STEP 0 — Credential Discovery (Run This First, Before Anything Else)

Before creating any files or `.env` configuration, Claude Code must scan sibling project folders for existing credentials and reuse them where possible. This avoids duplicating secrets and ensures consistency across projects running on the same machine.

### 0.1 Credential Scan Script

Create and run `/scripts/check-credentials.sh`:

```bash
#!/bin/bash
# ================================================================
# Credential discovery for kathmandu.im
# Scans ../privatenode and ../trustkit for reusable credentials
# ================================================================

echo "🔍 Scanning for existing credentials..."
echo ""

# ── 1. privatenode ───────────────────────────────────────────────
echo "── Checking ../privatenode ──"
PRIVATENODE_PATHS=(
  "../privatenode/.env"
  "../privatenode/.env.local"
  "../privatenode/.env.production"
  "../privatenode/.env.development"
  "../privatenode/config/secrets.json"
  "../privatenode/config/credentials.json"
  "../privatenode/config/.env"
  "../privatenode/docker-compose.yml"
  "../privatenode/docker-compose.override.yml"
  "../privatenode/.secrets"
  "../../privatenode/.env"
  "../../privatenode/config/.env"
)
for f in "${PRIVATENODE_PATHS[@]}"; do
  if [ -f "$f" ]; then
    echo "  ✓ FOUND: $f"
    echo "  ── contents ──"
    cat "$f"
    echo ""
  fi
done

# ── 2. trustkit ─────────────────────────────────────────────────
echo "── Checking ../trustkit ──"
TRUSTKIT_PATHS=(
  "../trustkit/.env"
  "../trustkit/.env.local"
  "../trustkit/.env.production"
  "../trustkit/config/secrets.json"
  "../trustkit/config/credentials.json"
  "../trustkit/config/.env"
  "../trustkit/docker-compose.yml"
  "../trustkit/.secrets"
  "../trustkit/keys.json"
  "../../trustkit/.env"
  "../../trustkit/config/.env"
)
for f in "${TRUSTKIT_PATHS[@]}"; do
  if [ -f "$f" ]; then
    echo "  ✓ FOUND: $f"
    echo "  ── contents ──"
    cat "$f"
    echo ""
  fi
done

# ── 3. Common shared config locations ───────────────────────────
echo "── Checking shared/common locations ──"
SHARED_PATHS=(
  "../shared/.env"
  "../common/.env"
  "../config/.env"
  "../.env.shared"
  "$HOME/.config/kathmandu/.env"
  "$HOME/.credentials/kathmandu.env"
)
for f in "${SHARED_PATHS[@]}"; do
  if [ -f "$f" ]; then
    echo "  ✓ FOUND: $f"
    cat "$f"
    echo ""
  fi
done

# ── 4. Running Docker containers that might be reusable ─────────
echo "── Running Docker containers ──"
docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Ports}}\t{{.Status}}" 2>/dev/null \
  | grep -E "postgres|supabase|db|mysql|redis" || echo "  None found"

echo ""
echo "── Docker networks ──"
docker network ls 2>/dev/null | grep -v "bridge\|host\|none" || echo "  No custom networks"

echo ""
echo "── Exposed Postgres ports ──"
docker ps --format "{{.Names}} {{.Ports}}" 2>/dev/null | grep "5432" || echo "  None found"

echo ""
echo "🏁 Credential scan complete."
```

```bash
chmod +x scripts/check-credentials.sh
bash scripts/check-credentials.sh
```

### 0.2 Credential Mapping Rules

After scanning, map any discovered values into this project's `.env` using the following lookup table. Always prefer discovered values over generating new ones.

| This project needs | Look for these keys in scanned files |
|---|---|
| `POSTGRES_PASSWORD` | `DB_PASSWORD`, `POSTGRES_PASSWORD`, `DATABASE_PASSWORD`, `PG_PASSWORD`, `DB_PASS` |
| `POSTGRES_USER` | `DB_USER`, `POSTGRES_USER`, `DATABASE_USER`, `PG_USER` |
| `POSTGRES_DB` | `DB_NAME`, `POSTGRES_DB`, `DATABASE_NAME` |
| `JWT_SECRET` | `JWT_SECRET`, `SUPABASE_JWT_SECRET`, `SECRET_KEY`, `APP_SECRET` |
| `ANON_KEY` | `SUPABASE_ANON_KEY`, `ANON_KEY` |
| `SERVICE_ROLE_KEY` | `SUPABASE_SERVICE_ROLE_KEY`, `SERVICE_ROLE_KEY`, `SERVICE_KEY` |
| `GOOGLE_MAPS_API_KEY` | `GOOGLE_MAPS_KEY`, `MAPS_API_KEY`, `GOOGLE_API_KEY`, `GCLOUD_API_KEY`, `GOOGLE_KEY` |
| `GOOGLE_PLACES_API_KEY` | Same as above — often the same key is used for both |
| `SMTP_*` | `MAIL_HOST`, `EMAIL_HOST`, `SMTP_*`, `SENDGRID_API_KEY`, `MAILGUN_*` |
| `SECRET_KEY_BASE` | `SECRET_KEY_BASE`, `APP_SECRET`, `RAILS_SECRET` |
| `CLOUDINARY_*` | `CLOUDINARY_URL`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY` |

### 0.3 Shared Docker Infrastructure Check

If the scan finds a running Postgres container (port 5432 exposed), check whether we can create a new database in it rather than running a second Postgres instance:

```bash
# If a shared postgres container exists, e.g. "privatenode_db":
docker exec -it <container_name> psql -U postgres -c "\l"
# If connection works, create our database there:
docker exec -it <container_name> psql -U postgres -c "CREATE DATABASE kathmandu;"
# Then update docker-compose.yml to remove the local `db` service
# and join the external network instead
```

**If shared Postgres found:** remove the `db` service from `docker-compose.yml`, set `DATABASE_URL` to point to the shared container, and add the external network:
```yaml
networks:
  kathmandu_net:
    external: true
    name: <discovered_network_name>
```

**If nothing found:** proceed with the full self-hosted stack below.

---

## Phase 0.4 — Docker Infrastructure

### `docker-compose.yml`

Place in project root. This runs the full self-hosted Supabase stack plus the Next.js app.

```yaml
version: "3.8"

services:

  # ── Next.js Application ───────────────────────────────────────────────────────
  app:
    build:
      context: .
      dockerfile: Dockerfile
      target: development
    container_name: kathmandu_app
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
      - /app/.next
    environment:
      NODE_ENV: development
      DATABASE_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      DIRECT_URL: postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      NEXT_PUBLIC_SUPABASE_URL: http://localhost:8000
      NEXT_PUBLIC_SUPABASE_ANON_KEY: ${ANON_KEY}
      SUPABASE_SERVICE_ROLE_KEY: ${SERVICE_ROLE_KEY}
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: ${GOOGLE_MAPS_API_KEY}
      GOOGLE_PLACES_API_KEY: ${GOOGLE_PLACES_API_KEY}
    depends_on:
      db:
        condition: service_healthy
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Postgres ──────────────────────────────────────────────────────────────────
  db:
    image: supabase/postgres:15.1.0.117
    container_name: kathmandu_db
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-postgres}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB:-kathmandu}
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - kathmandu_pgdata:/var/lib/postgresql/data
      - ./docker/postgres/init.sql:/docker-entrypoint-initdb.d/init.sql
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-postgres}"]
      interval: 5s
      timeout: 5s
      retries: 10
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Supabase Auth (GoTrue) ────────────────────────────────────────────────────
  auth:
    image: supabase/gotrue:v2.143.0
    container_name: kathmandu_auth
    depends_on:
      db:
        condition: service_healthy
    environment:
      GOTRUE_API_HOST: "0.0.0.0"
      GOTRUE_API_PORT: 9999
      API_EXTERNAL_URL: ${API_EXTERNAL_URL:-http://localhost:8000}
      GOTRUE_DB_DRIVER: postgres
      GOTRUE_DB_DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}?search_path=auth
      GOTRUE_SITE_URL: ${SITE_URL:-http://localhost:3000}
      GOTRUE_URI_ALLOW_LIST: "*"
      GOTRUE_DISABLE_SIGNUP: "false"
      GOTRUE_JWT_ADMIN_ROLES: service_role
      GOTRUE_JWT_AUD: authenticated
      GOTRUE_JWT_DEFAULT_GROUP_NAME: authenticated
      GOTRUE_JWT_EXP: 3600
      GOTRUE_JWT_SECRET: ${JWT_SECRET}
      GOTRUE_MAILER_AUTOCONFIRM: "true"
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Supabase REST API (PostgREST) ─────────────────────────────────────────────
  rest:
    image: postgrest/postgrest:v12.0.1
    container_name: kathmandu_rest
    depends_on:
      db:
        condition: service_healthy
    environment:
      PGRST_DB_URI: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      PGRST_DB_SCHEMAS: public,storage,graphql_public
      PGRST_DB_ANON_ROLE: anon
      PGRST_JWT_SECRET: ${JWT_SECRET}
      PGRST_DB_USE_LEGACY_GUCS: "false"
      PGRST_APP_SETTINGS_JWT_SECRET: ${JWT_SECRET}
      PGRST_APP_SETTINGS_JWT_EXP: 3600
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Supabase Realtime ─────────────────────────────────────────────────────────
  realtime:
    image: supabase/realtime:v2.28.32
    container_name: kathmandu_realtime
    depends_on:
      db:
        condition: service_healthy
    environment:
      PORT: 4000
      DB_HOST: db
      DB_PORT: 5432
      DB_USER: ${POSTGRES_USER}
      DB_PASSWORD: ${POSTGRES_PASSWORD}
      DB_NAME: ${POSTGRES_DB}
      DB_AFTER_CONNECT_QUERY: "SET search_path TO _realtime"
      DB_ENC_KEY: supabaserealtime
      API_JWT_SECRET: ${JWT_SECRET}
      FLY_ALLOC_ID: fly123
      FLY_APP_NAME: realtime
      SECRET_KEY_BASE: ${SECRET_KEY_BASE}
      ERL_AFLAGS: -proto_dist inet_tcp
      ENABLE_TAILSCALE: "false"
      DNS_NODES: "''"
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Supabase Storage ──────────────────────────────────────────────────────────
  storage:
    image: supabase/storage-api:v0.46.4
    container_name: kathmandu_storage
    depends_on:
      db:
        condition: service_healthy
    environment:
      ANON_KEY: ${ANON_KEY}
      SERVICE_KEY: ${SERVICE_ROLE_KEY}
      POSTGREST_URL: http://rest:3000
      PGRST_JWT_SECRET: ${JWT_SECRET}
      DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
      FILE_SIZE_LIMIT: 52428800
      STORAGE_BACKEND: file
      FILE_STORAGE_BACKEND_PATH: /var/lib/storage
      TENANT_ID: stub
      REGION: local
      GLOBAL_S3_BUCKET: stub
      ENABLE_IMAGE_TRANSFORMATION: "true"
      IMGPROXY_URL: http://imgproxy:8080
    volumes:
      - kathmandu_storage:/var/lib/storage
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Image Transformation ──────────────────────────────────────────────────────
  imgproxy:
    image: darthsim/imgproxy:v3.8.0
    container_name: kathmandu_imgproxy
    environment:
      IMGPROXY_BIND: ":8080"
      IMGPROXY_LOCAL_FILESYSTEM_ROOT: /
      IMGPROXY_USE_ETAG: "true"
      IMGPROXY_ENABLE_WEBP_DETECTION: "true"
    volumes:
      - kathmandu_storage:/var/lib/storage:ro
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Kong API Gateway ──────────────────────────────────────────────────────────
  # Routes /rest/, /auth/, /storage/ → respective services
  # All client requests use http://localhost:8000 as the Supabase URL
  kong:
    image: kong:2.8.1
    container_name: kathmandu_kong
    ports:
      - "8000:8000/tcp"
      - "8443:8443/tcp"
    environment:
      KONG_DATABASE: "off"
      KONG_DECLARATIVE_CONFIG: /var/lib/kong/kong.yml
      KONG_DNS_ORDER: LAST,A,CNAME
      KONG_PLUGINS: request-transformer,cors,key-auth,acl,basic-auth
      KONG_NGINX_PROXY_PROXY_BUFFER_SIZE: 160k
      KONG_NGINX_PROXY_PROXY_BUFFERS: 64 160k
    volumes:
      - ./docker/kong/kong.yml:/var/lib/kong/kong.yml:ro
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Supabase Studio ───────────────────────────────────────────────────────────
  # Access at http://localhost:3001
  studio:
    image: supabase/studio:20240101-8e4a094
    container_name: kathmandu_studio
    ports:
      - "3001:3000"
    environment:
      STUDIO_PG_META_URL: http://meta:8080
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      DEFAULT_ORGANIZATION_NAME: "Kathmandu.im"
      DEFAULT_PROJECT_NAME: "Kathmandu Directory"
      SUPABASE_URL: http://kong:8000
      SUPABASE_PUBLIC_URL: http://localhost:8000
      SUPABASE_ANON_KEY: ${ANON_KEY}
      SUPABASE_SERVICE_KEY: ${SERVICE_ROLE_KEY}
    networks:
      - kathmandu_net
    restart: unless-stopped

  # ── Postgres Meta (used by Studio) ───────────────────────────────────────────
  meta:
    image: supabase/postgres-meta:v0.75.0
    container_name: kathmandu_meta
    depends_on:
      db:
        condition: service_healthy
    environment:
      PG_META_PORT: 8080
      PG_META_DB_HOST: db
      PG_META_DB_PORT: 5432
      PG_META_DB_NAME: ${POSTGRES_DB}
      PG_META_DB_USER: ${POSTGRES_USER}
      PG_META_DB_PASSWORD: ${POSTGRES_PASSWORD}
    networks:
      - kathmandu_net
    restart: unless-stopped

volumes:
  kathmandu_pgdata:
  kathmandu_storage:

networks:
  kathmandu_net:
    driver: bridge
    # ⚠ If a shared Docker network was found in Step 0.3, replace the above with:
    # external: true
    # name: <discovered_network_name>
```

### `Dockerfile`

```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat

# ── Dependencies ──────────────────────────────────────────────────────────────
FROM base AS deps
COPY package.json package-lock.json* ./
RUN npm ci

# ── Development (hot reload, volume-mounted source) ───────────────────────────
FROM base AS development
COPY --from=deps /app/node_modules ./node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# ── Production builder ────────────────────────────────────────────────────────
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN npm run build

# ── Production runner ─────────────────────────────────────────────────────────
FROM base AS production
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

### `.env` Template

Claude Code creates this file after running the credential scan. Values discovered from `privatenode` or `trustkit` are inserted automatically. Fields left blank must be filled before running `docker compose up`.

```bash
# ================================================================
# kathmandu.im environment configuration
# Values auto-populated from credential scan where found
# ================================================================

# ── Postgres ──────────────────────────────────────────────────────────────────
POSTGRES_USER=postgres
POSTGRES_PASSWORD=        # REQUIRED — from credential scan or: openssl rand -hex 16
POSTGRES_DB=kathmandu

# ── Supabase JWT ──────────────────────────────────────────────────────────────
JWT_SECRET=               # REQUIRED — from credential scan or: openssl rand -hex 32
ANON_KEY=                 # Generate after setting JWT_SECRET (see script below)
SERVICE_ROLE_KEY=         # Generate after setting JWT_SECRET (see script below)

# ── App URLs ──────────────────────────────────────────────────────────────────
SITE_URL=http://localhost:3000
API_EXTERNAL_URL=http://localhost:8000
SECRET_KEY_BASE=          # generate with: openssl rand -hex 64

# ── Google APIs ───────────────────────────────────────────────────────────────
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=    # from credential scan or Google Cloud Console
GOOGLE_PLACES_API_KEY=              # often the same key as above

# ── Storage (self-hosted Supabase Storage used by default) ────────────────────
# Uncomment only if Cloudinary keys found in credential scan:
# CLOUDINARY_CLOUD_NAME=
# CLOUDINARY_API_KEY=
# CLOUDINARY_API_SECRET=

# ── Affiliate (populate after approval) ──────────────────────────────────────
TRAVELPAYOUTS_MARKER=
TRAVELPAYOUTS_TOKEN=
BOOKING_AFFILIATE_ID=
AGODA_AFFILIATE_ID=
```

### JWT Key Generation Script

`/scripts/generate-jwt-keys.js`:

```js
// Run with: node scripts/generate-jwt-keys.js
// Requires JWT_SECRET to be set in .env first
require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
if (!secret) { console.error('JWT_SECRET not set in .env'); process.exit(1); }

const anon = jwt.sign(
  { role: 'anon', iss: 'supabase', iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + (10 * 365 * 24 * 60 * 60) },
  secret
);
const service = jwt.sign(
  { role: 'service_role', iss: 'supabase', iat: Math.floor(Date.now()/1000), exp: Math.floor(Date.now()/1000) + (10 * 365 * 24 * 60 * 60) },
  secret
);

console.log('\nAdd these to your .env:\n');
console.log(`ANON_KEY=${anon}`);
console.log(`SERVICE_ROLE_KEY=${service}`);
```

### Kong Config

`./docker/kong/kong.yml`:

```yaml
_format_version: "1.1"

services:
  - name: auth-v1
    url: http://auth:9999/
    routes:
      - name: auth-v1-all
        strip_path: true
        paths: [/auth/v1/]

  - name: rest-v1
    url: http://rest:3000/
    routes:
      - name: rest-v1-all
        strip_path: true
        paths: [/rest/v1/]

  - name: realtime-v1
    url: http://realtime:4000/
    routes:
      - name: realtime-v1-all
        strip_path: true
        paths: [/realtime/v1/]

  - name: storage-v1
    url: http://storage:5000/
    routes:
      - name: storage-v1-all
        strip_path: true
        paths: [/storage/v1/]

  - name: meta
    url: http://meta:8080/
    routes:
      - name: meta-all
        strip_path: true
        paths: [/pg/]

plugins:
  - name: cors
    config:
      origins: ["*"]
      methods: [GET, POST, PUT, PATCH, DELETE, OPTIONS]
      headers: [Accept, Authorization, Content-Type, X-Client-Info, apikey]
      credentials: true
      max_age: 3600
```

### Postgres Init

`./docker/postgres/init.sql`:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pgjwt";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements";

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS storage;
CREATE SCHEMA IF NOT EXISTS realtime;
CREATE SCHEMA IF NOT EXISTS _realtime;
CREATE SCHEMA IF NOT EXISTS graphql_public;

DO $$ BEGIN CREATE ROLE anon NOLOGIN NOINHERIT;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE authenticated NOLOGIN NOINHERIT;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  EXCEPTION WHEN duplicate_object THEN NULL; END $$;

GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT ALL ON FUNCTIONS TO anon, authenticated, service_role;
```

---

## Phase 0.5 — Project Scaffold

```bash
# In project root (kathmandu-im/)
npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
npx shadcn-ui@latest init
npm install @prisma/client prisma
npm install @supabase/supabase-js @supabase/ssr
npm install @googlemaps/js-api-loader
npm install lucide-react date-fns slugify clsx tailwind-merge
npm install next-seo
npm install --save-dev @types/googlemaps jsonwebtoken dotenv
```

### Folder Structure

```
/
├── docker/
│   ├── kong/kong.yml
│   └── postgres/init.sql
├── prisma/
│   └── schema.prisma
├── scripts/
│   ├── check-credentials.sh     ← Step 0 — run first
│   ├── generate-jwt-keys.js     ← run after setting JWT_SECRET
│   ├── seed-areas.ts
│   ├── seed-amenities.ts
│   ├── seed-tags.ts
│   ├── seed-pois.ts
│   └── seed-hotels.ts
├── src/
│   ├── app/
│   │   ├── (site)/
│   │   │   ├── page.tsx                    # homepage
│   │   │   ├── hotels/
│   │   │   │   ├── page.tsx                # hotel directory
│   │   │   │   ├── [slug]/page.tsx         # hotel detail
│   │   │   │   └── [category]/page.tsx     # luxury / thamel / budget etc.
│   │   │   ├── places/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   └── [category]/page.tsx
│   │   │   ├── neighbourhood/
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── privacy/page.tsx
│   │   ├── (admin)/
│   │   │   └── admin/
│   │   │       ├── page.tsx
│   │   │       ├── hotels/page.tsx
│   │   │       └── places/page.tsx
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/                             # shadcn
│   │   └── site/
│   │       ├── Header.tsx
│   │       ├── Footer.tsx
│   │       ├── HotelCard.tsx
│   │       ├── PlaceCard.tsx
│   │       ├── MapEmbed.tsx
│   │       ├── ImageGallery.tsx
│   │       ├── StarRating.tsx
│   │       ├── AmenityBadge.tsx
│   │       ├── FilterSidebar.tsx
│   │       ├── SearchBar.tsx
│   │       └── AffiliateButton.tsx         # CTA — affiliate-aware, falls back gracefully
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── supabase.ts
│   │   ├── google-places.ts
│   │   ├── schema-markup.ts               # JSON-LD generators
│   │   ├── affiliate.ts
│   │   └── utils.ts
│   └── types/
│       └── index.ts
├── .env
├── docker-compose.yml
└── Dockerfile
```

---

## Phase 0.6 — Database Schema (Prisma)

`/prisma/schema.prisma`:

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")  // bypasses Kong for Prisma CLI migrations
}

enum Status {
  DRAFT
  PUBLISHED
  ARCHIVED
}

enum PropertyType {
  HOTEL
  GUESTHOUSE
  HOSTEL
  RESORT
  BOUTIQUE
  LODGE
  APARTMENT
}

enum PriceTier {
  BUDGET
  MID
  UPSCALE
  LUXURY
}

enum ListingType {
  HOTEL
  RESTAURANT
  ATTRACTION
  TEMPLE
  MUSEUM
  VIEWPOINT
  MARKET
  ACTIVITY
  TRANSPORT
}

model Area {
  id               String      @id @default(uuid())
  slug             String      @unique
  name             String
  nameLocal        String?     // Nepali script
  description      String?     @db.Text
  shortDescription String?
  highlights       Json        @default("[]")
  coverImageUrl    String?
  imageUrls        Json        @default("[]")
  latitude         Float?
  longitude        Float?
  metaTitle        String?
  metaDescription  String?
  sortOrder        Int         @default(0)
  properties       Property[]
  listings         Listing[]
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
}

model Property {
  id                String           @id @default(uuid())
  slug              String           @unique
  status            Status           @default(DRAFT)
  name              String
  nameLocal         String?
  tagline           String?
  description       String?          @db.Text
  descriptionShort  String?
  propertyType      PropertyType     @default(HOTEL)
  starRating        Float?           // 1.0–5.0
  internalGrade     PriceTier?
  countryCode       String           @default("NP")
  city              String           @default("Kathmandu")
  neighbourhood     String?
  addressLine1      String?
  addressLine2      String?
  latitude          Float?
  longitude         Float?
  googlePlaceId     String?
  areaId            String?
  area              Area?            @relation(fields: [areaId], references: [id])
  phone             String?
  email             String?
  websiteUrl        String?
  // Affiliate fields — false until programme approval
  bookingPropertyId String?
  travelPayoutsId   String?
  affiliateUrl      String?
  affiliateNetwork  String?          @default("travelpayouts")
  affiliateEnabled  Boolean          @default(false)
  priceMinUsd       Int?
  priceMaxUsd       Int?
  priceTier         PriceTier?
  coverImageUrl     String?
  imageUrls         Json             @default("[]")  // [{url, alt, caption}]
  ourScore          Float?           // editorial /10
  reviewCount       Int              @default(0)
  avgRating         Float?
  bookingRating     Float?
  googleRating      Float?
  metaTitle         String?
  metaDescription   String?
  schemaMarkup      Json?            // pre-built JSON-LD stored here
  featured          Boolean          @default(false)
  editorPick        Boolean          @default(false)
  verified          Boolean          @default(false)
  roomTypes         RoomType[]
  reviews           Review[]
  amenities         PropertyAmenity[]
  tags              PropertyTag[]
  createdAt         DateTime         @default(now())
  updatedAt         DateTime         @updatedAt
  publishedAt       DateTime?

  @@index([slug])
  @@index([status])
  @@index([areaId])
  @@index([featured])
  @@index([starRating])
  @@index([priceTier])
}

model RoomType {
  id           String   @id @default(uuid())
  propertyId   String
  property     Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  name         String
  description  String?
  maxOccupancy Int?
  sizeSqm      Float?
  bedConfig    String?  // king | twin | bunk | mixed-dorm
  priceFromUsd Int?
  imageUrls    Json     @default("[]")
  available    Boolean  @default(true)

  @@index([propertyId])
}

model Amenity {
  id         String            @id @default(uuid())
  slug       String            @unique
  name       String
  icon       String?           // lucide icon name
  category   String?           // connectivity | dining | wellness | transport | room | safety
  sortOrder  Int               @default(0)
  properties PropertyAmenity[]
}

model PropertyAmenity {
  propertyId String
  amenityId  String
  notes      String?           // e.g. "available 7–10am only"
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  amenity    Amenity  @relation(fields: [amenityId], references: [id], onDelete: Cascade)

  @@id([propertyId, amenityId])
}

model Tag {
  id         String       @id @default(uuid())
  slug       String       @unique
  name       String
  type       String?      // vibe | feature | traveller-type | location-type
  colour     String?
  properties PropertyTag[]
  listings   ListingTag[]
}

model PropertyTag {
  propertyId String
  tagId      String
  property   Property @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  tag        Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([propertyId, tagId])
}

model Review {
  id         String    @id @default(uuid())
  propertyId String?
  listingId  String?
  property   Property? @relation(fields: [propertyId], references: [id], onDelete: Cascade)
  listing    Listing?  @relation(fields: [listingId], references: [id], onDelete: Cascade)
  authorName String
  rating     Float     // 1–10
  title      String?
  body       String?   @db.Text
  pros       String?
  cons       String?
  travelType String?   // solo | couple | family | business
  visitMonth Int?
  visitYear  Int?
  verified   Boolean   @default(false)
  status     String    @default("pending") // pending | approved | rejected
  createdAt  DateTime  @default(now())

  @@index([propertyId])
  @@index([listingId])
  @@index([status])
}

model Listing {
  id               String      @id @default(uuid())
  slug             String      @unique
  status           Status      @default(DRAFT)
  listingType      ListingType
  name             String
  nameLocal        String?
  tagline          String?
  description      String?     @db.Text
  descriptionShort String?
  areaId           String?
  area             Area?       @relation(fields: [areaId], references: [id])
  address          String?
  latitude         Float?
  longitude        Float?
  googlePlaceId    String?
  coverImageUrl    String?
  imageUrls        Json        @default("[]")
  openingHours     Json?       // from Google Places weekday_text array
  admissionPrice   String?
  websiteUrl       String?
  phone            String?
  affiliateUrl     String?
  affiliateEnabled Boolean     @default(false)
  ourScore         Float?
  googleRating     Float?
  reviewCount      Int         @default(0)
  // Flexible type-specific fields — shape documented per listingType in comments
  extraFields      Json        @default("{}")
  metaTitle        String?
  metaDescription  String?
  schemaMarkup     Json?
  featured         Boolean     @default(false)
  editorPick       Boolean     @default(false)
  tags             ListingTag[]
  reviews          Review[]
  createdAt        DateTime    @default(now())
  updatedAt        DateTime    @updatedAt
  publishedAt      DateTime?

  @@index([slug])
  @@index([status])
  @@index([listingType])
  @@index([featured])
}

model ListingTag {
  listingId String
  tagId     String
  listing   Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)
  tag       Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([listingId, tagId])
}
```

---

## Phase 0.7 — Design System

**Palette (Kathmandu inspired)**
```
Primary:    #C0392B  (deep Nepali red — prayer flags, temples)
Secondary:  #E67E22  (saffron/marigold — festivals)
Accent:     #2C3E50  (mountain slate)
Background: #FAFAF8  (warm off-white)
Text:       #1A1A1A
Muted:      #6B7280
```

**Typography:** Headings — `Playfair Display` · Body — `Inter` · Labels/prices — `DM Mono`

```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      nepal: {
        red:     '#C0392B',
        saffron: '#E67E22',
        slate:   '#2C3E50',
        gold:    '#D4AC0D',
      }
    },
    fontFamily: {
      serif: ['Playfair Display', 'Georgia', 'serif'],
      sans:  ['Inter', 'system-ui', 'sans-serif'],
      mono:  ['DM Mono', 'monospace'],
    }
  }
}
```

---

## Phase 1 — Points of Interest (25 POIs)

### Target List

**UNESCO World Heritage (7):** Pashupatinath Temple, Boudhanath Stupa, Swayambhunath (Monkey Temple), Kathmandu Durbar Square, Patan Durbar Square, Bhaktapur Durbar Square, Changu Narayan Temple

**Temples & Shrines:** Kumari Ghar, Dakshinkali Temple, Budhanilkantha (Sleeping Vishnu), Bagmati River Ghats

**Museums & Culture:** National Museum of Nepal, Patan Museum, Garden of Dreams, Kaiser Library

**Viewpoints & Nature:** Nagarkot (Himalaya sunrise), Chandragiri Hills, Shivapuri Nagarjun National Park, Godavari Botanical Garden

**Markets & Neighbourhoods:** Thamel, Asan Tole spice market, Indra Chowk, Patan old city walk

**Experiences:** Bungee jumping at The Last Resort, White water rafting on Trishuli River

### Claude Content Generation Prompt (run for each POI)

```
You are a knowledgeable travel writer for kathmandu.im — a premium Kathmandu 
travel directory.

Write a comprehensive listing for: [POI NAME]

Return ONLY valid JSON, no markdown fences, no preamble:
{
  "tagline": "one compelling sentence, max 120 chars",
  "descriptionShort": "2-3 sentence hook for card previews, max 200 chars",
  "description": "500-700 words. Include: historical and cultural context, what visitors actually experience, best time to visit, insider tips. Write for engaged travellers who want depth. Vivid and specific. Avoid: clichés, 'hidden gem', 'bustling'.",
  "highlights": ["5-7 key highlights as short phrases"],
  "visitorTips": {
    "bestTimeToVisit": "...",
    "howToGetThere": "...",
    "whatToWear": "...",
    "timeNeeded": "e.g. 2-3 hours",
    "admissionPrice": "e.g. NPR 1000 foreigners, free for Hindus",
    "photographyTips": "..."
  },
  "nearbyAttractions": ["name1", "name2", "name3"],
  "insiderTip": "one specific local tip not found in guidebooks",
  "listingType": "TEMPLE | MUSEUM | VIEWPOINT | MARKET | ACTIVITY | ATTRACTION",
  "tags": ["from: temple, heritage, unesco, viewpoint, market, museum, nature, adventure, free, photography, spiritual, cultural, family-friendly, must-see"],
  "metaTitle": "SEO title max 60 chars, include Kathmandu",
  "metaDescription": "SEO meta description max 155 chars"
}
```

### Google Places Enrichment Script

`/scripts/enrich-from-places.ts` — adds real coordinates, ratings, phone, opening hours after content is generated:

```typescript
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();
const API_KEY = process.env.GOOGLE_PLACES_API_KEY!;

// Populate these Place IDs — find via Google Maps URLs or Places API text search
const PLACE_IDS: Record<string, string> = {
  'pashupatinath-temple':  '',  // paste Place ID from Google Maps
  'boudhanath-stupa':      '',
  'swayambhunath':         '',
  // ... all 25 POIs and 20 hotels
};

async function enrichListing(slug: string, placeId: string) {
  const res = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json` +
    `?place_id=${placeId}` +
    `&fields=name,geometry,rating,user_ratings_total,formatted_phone_number,website,opening_hours,photos` +
    `&key=${API_KEY}`
  );
  const { result: p } = await res.json();

  await prisma.listing.update({
    where: { slug },
    data: {
      googlePlaceId: placeId,
      latitude:      p.geometry?.location?.lat,
      longitude:     p.geometry?.location?.lng,
      googleRating:  p.rating,
      reviewCount:   p.user_ratings_total,
      phone:         p.formatted_phone_number,
      websiteUrl:    p.website,
      openingHours:  p.opening_hours?.weekday_text ?? null,
      extraFields: {
        googlePhotoRefs: p.photos?.slice(0, 5).map((ph: any) => ph.photo_reference) ?? []
      }
    }
  });
  console.log(`✓ ${slug}`);
}

async function main() {
  for (const [slug, placeId] of Object.entries(PLACE_IDS)) {
    if (!placeId) { console.log(`⚠ No Place ID for ${slug}, skipping`); continue; }
    await enrichListing(slug, placeId);
    await new Promise(r => setTimeout(r, 250)); // respect rate limits
  }
}

main().finally(() => prisma.$disconnect());
```

---

## Phase 2 — Hotel Listings (4★ + 5★)

### Target Hotels

**5-Star (8):** Hotel Yak & Yeti, Dwarika's Hotel, Hyatt Regency Kathmandu, Soaltee Kathmandu, Radisson Hotel Kathmandu, Crowne Plaza Kathmandu-Soaltee, Hotel Annapurna, Gokarna Forest Resort

**4-Star (12):** Kathmandu Guest House, Hotel Shanker, Summit Hotel, Hotel Vajra, Baber Mahal Revisited, Kantipur Temple House, Hotel Himalaya, Malla Hotel, Shangri-La Hotel Kathmandu, Hotel Tibet, Ambassador Garden Home, Hotel Moonlight

### Hotel Content Prompt (run for each hotel)

```
You are a luxury travel writer for kathmandu.im — a premium Kathmandu travel directory.

Write a rich listing for: [HOTEL NAME], Kathmandu, Nepal

Return ONLY valid JSON, no markdown fences, no preamble:
{
  "tagline": "evocative one-liner max 120 chars",
  "descriptionShort": "compelling 2-3 sentence preview max 220 chars",
  "description": "600-800 words. Cover: property history, architectural style, room experience, standout facilities, dining highlights, location advantages, who this suits best. Write like a discerning travel journalist, not a brochure. Specific and vivid.",
  "highlights": ["7-9 standout features as short phrases"],
  "amenitiesList": ["pool", "spa", "restaurant", "bar", "gym", "wifi", "airport-shuttle", ...],
  "neighbourhood": "area name",
  "neighbourhoodDescription": "2-3 sentences on the immediate area and walkability",
  "bestFor": ["solo" | "couples" | "families" | "business" | "luxury"],
  "insiderTip": "one specific tip a travel journalist would know",
  "nearbyAttractions": ["within walking distance"],
  "propertyType": "HOTEL | BOUTIQUE | RESORT",
  "starRating": 4 or 5,
  "priceTier": "UPSCALE | LUXURY",
  "tags": ["luxury", "heritage", "boutique", "pool", "spa", "thamel", "lazimpat", "rooftop", ...],
  "metaTitle": "SEO title max 60 chars",
  "metaDescription": "SEO meta max 155 chars"
}
```

---

## Phase 3 — SEO Layer

### JSON-LD Generators (`/src/lib/schema-markup.ts`)

```typescript
const tierToSymbol = (t: string | null) =>
  ({ BUDGET: '$', MID: '$$', UPSCALE: '$$$', LUXURY: '$$$$' }[t ?? ''] ?? '$$');

export function hotelSchema(p: any) {
  return {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": p.name,
    "description": p.descriptionShort,
    "url": `https://kathmandu.im/hotels/${p.slug}`,
    "starRating": p.starRating
      ? { "@type": "Rating", "ratingValue": String(p.starRating) } : undefined,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": p.addressLine1,
      "addressLocality": "Kathmandu",
      "addressCountry": "NP"
    },
    "geo": p.latitude
      ? { "@type": "GeoCoordinates", "latitude": p.latitude, "longitude": p.longitude }
      : undefined,
    "aggregateRating": p.avgRating
      ? { "@type": "AggregateRating", "ratingValue": String(p.avgRating),
          "reviewCount": String(p.reviewCount), "bestRating": "10" }
      : undefined,
    "priceRange": tierToSymbol(p.priceTier),
    "image": (p.imageUrls as any[]).map((i: any) => i.url).filter(Boolean),
    "telephone": p.phone,
    "sameAs": p.websiteUrl ? [p.websiteUrl] : []
  };
}

export function attractionSchema(l: any) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "name": l.name,
    "description": l.descriptionShort,
    "url": `https://kathmandu.im/places/${l.slug}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Kathmandu",
      "addressCountry": "NP"
    },
    "geo": l.latitude
      ? { "@type": "GeoCoordinates", "latitude": l.latitude, "longitude": l.longitude }
      : undefined,
    "aggregateRating": l.googleRating
      ? { "@type": "AggregateRating", "ratingValue": String(l.googleRating),
          "reviewCount": String(l.reviewCount), "bestRating": "5" }
      : undefined,
    "image": l.coverImageUrl
  };
}
```

### URL Structure

```
kathmandu.im/                          Homepage
kathmandu.im/hotels                    All hotels
kathmandu.im/hotels/luxury             Luxury hotels ($$$$)
kathmandu.im/hotels/thamel             Hotels by area
kathmandu.im/hotels/[slug]             Individual hotel
kathmandu.im/places                    All POIs
kathmandu.im/places/temples            By category
kathmandu.im/places/unesco             UNESCO sites
kathmandu.im/places/[slug]             Individual POI
kathmandu.im/neighbourhood/thamel      Area guide
```

---

## Phase 4 — Affiliate Integration (post-approval)

### `/src/lib/affiliate.ts`

```typescript
export function buildBookingUrl(bookingPropertyId: string) {
  const aid = process.env.BOOKING_AFFILIATE_ID;
  if (!aid || !bookingPropertyId) return null;
  return `https://www.booking.com/hotel/np/${bookingPropertyId}.html?aid=${aid}`;
}

export function buildTravelpayoutsUrl(hotelSlug: string) {
  const marker = process.env.TRAVELPAYOUTS_MARKER;
  if (!marker) return null;
  return `https://www.hotellook.com/hotels/kathmandu/${hotelSlug}?marker=${marker}`;
}

// Live prices — only works after TRAVELPAYOUTS_TOKEN is set
export async function getLivePrices(locationId: string, checkIn: string, checkOut: string) {
  const token = process.env.TRAVELPAYOUTS_TOKEN;
  if (!token) return null;
  const res = await fetch(
    `https://engine.hotellook.com/api/v2/cache.json?location=${locationId}` +
    `&checkIn=${checkIn}&checkOut=${checkOut}&adults=2&currency=usd&token=${token}&limit=20`
  );
  return res.json();
}
```

**Affiliate applications (in order after site is live):**
1. Travelpayouts — `travelpayouts.com/programs` — no traffic minimum, covers hotels + flights + cars
2. Booking.com Partner Hub — `join.booking.com` — needs live site with privacy policy
3. Agoda Partner — Asia-focused, strong Nepal inventory
4. GetYourGuide — Phase 5, tours and experiences
5. Klook — Phase 5, Asia activities

---

## Phase 5 — Scale Roadmap

**Month 2–3:** Expand to all 3-star hotels (target 80 total), top 30 restaurants, tour operators
**Month 4–6:** Day trips from Kathmandu (Pokhara, Chitwan, Nagarkot), festivals calendar, user reviews
**Month 6+:** Trekking permit guides, flights widget, newsletter capture

---

## Key Pages — Build Order

1. Homepage — Himalaya hero, featured POIs, top hotels, search bar
2. Hotel directory — filterable grid (area, star rating, price tier, amenities)
3. Individual hotel page — full gallery, map, amenities, room types, CTA button
4. POI directory — filterable by category
5. Individual POI page — editorial content, map, gallery, practical info box
6. Neighbourhood pages — area guides with embedded hotel + POI listings
7. About page (for affiliate applications — explain site's mission)
8. Privacy Policy (required by all affiliate programmes)
9. Contact page (required by all affiliate programmes)

---

## Docker Commands Reference

```bash
# ── First run ──────────────────────────────────────────────────────────────────
bash scripts/check-credentials.sh          # Step 0: credential discovery
# Fill in any blank REQUIRED fields in .env
node scripts/generate-jwt-keys.js          # generate ANON_KEY + SERVICE_ROLE_KEY
docker compose up --build                  # build and start all services

# ── Daily development ──────────────────────────────────────────────────────────
docker compose up -d                       # start in background
docker compose logs -f app                 # watch app logs
docker compose logs -f db                  # watch postgres logs

# ── Database ───────────────────────────────────────────────────────────────────
docker compose exec app npx prisma db push       # push schema changes
docker compose exec app npx prisma generate      # regenerate client
docker compose exec app npx prisma studio        # visual DB browser (port 5555)
docker compose exec db psql -U postgres -d kathmandu  # direct psql access

# ── Seeding ────────────────────────────────────────────────────────────────────
docker compose exec app npx ts-node scripts/seed-areas.ts
docker compose exec app npx ts-node scripts/seed-amenities.ts
docker compose exec app npx ts-node scripts/seed-tags.ts
docker compose exec app npx ts-node scripts/seed-pois.ts
docker compose exec app npx ts-node scripts/seed-hotels.ts
docker compose exec app npx ts-node scripts/enrich-from-places.ts

# ── Access points ──────────────────────────────────────────────────────────────
# Next.js app:       http://localhost:3000
# Supabase Studio:   http://localhost:3001
# Supabase API:      http://localhost:8000

# ── Reset ──────────────────────────────────────────────────────────────────────
docker compose down        # stop containers, keep volumes
docker compose down -v     # stop and DELETE all data (full reset)
```

---

## Startup Checklist for Claude Code

Run these checks at the start of every session before writing any code:

```bash
# 1. Run credential scan
bash scripts/check-credentials.sh

# 2. Verify required env vars are populated (no trailing = with empty value)
echo "Checking required env vars..."
for var in POSTGRES_PASSWORD JWT_SECRET ANON_KEY SERVICE_ROLE_KEY; do
  val=$(grep "^${var}=" .env | cut -d= -f2-)
  if [ -z "$val" ]; then
    echo "  ⚠ MISSING: $var"
  else
    echo "  ✓ $var is set"
  fi
done

# 3. Start services
docker compose up -d

# 4. Wait for database health
echo "Waiting for Postgres..."
until docker compose exec db pg_isready -U postgres -q; do sleep 2; done
echo "  ✓ Postgres ready"

# 5. Push Prisma schema
docker compose exec app npx prisma db push --skip-generate

# 6. Verify tables exist
docker compose exec db psql -U postgres -d kathmandu -c "\dt public.*"
```

---

## Notes for Claude Code

- Always TypeScript strict mode
- All DB queries through Prisma — no raw SQL except PostGIS geo queries
- Use `DIRECT_URL` for Prisma CLI (`db push`, `migrate`) — bypasses Kong. Use `DATABASE_URL` (through Kong) for app runtime queries
- Server components for all data fetching; client components only for interactivity (map renders, image galleries, filter state)
- `AffiliateButton` component: if `affiliateEnabled && affiliateUrl` → show affiliate CTA with `rel="sponsored nofollow"`. Otherwise → fall back to hotel website URL or Google Maps link
- `affiliateEnabled` stays `false` on all records until affiliate programmes are approved and IDs are configured
- The `extraFields` JSON column on Listing is intentionally open — document the expected shape for each `listingType` in a code comment on the model
- Image storage uses self-hosted Supabase Storage (`/storage/v1/`) — no external CDN needed during development
- If credential scan in Step 0 finds a shared Postgres container, update `docker-compose.yml` to omit the `db` service and join the external network
- Never invent or guess credential values — leave blank and flag for the user if credential scan finds nothing
