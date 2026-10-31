# Architecture

## Product boundary

The MVP optimizes the public journey: scan → story → map → next place → route. It deliberately excludes accounts, admin CRUD, analytics, audio, AR, and offline map tiles.

## Runtime flow

1. A printed QR encodes `NEXT_PUBLIC_APP_BASE_URL/places/<slug>`.
2. The language-neutral route validates the slug and redirects to `/bg/places/<slug>` or `/en/places/<slug>` using the remembered locale or `Accept-Language`.
3. Published landmark pages are statically generated for both locales.
4. Leaflet renders verified coordinates over OpenStreetMap tiles; the adjacent list preserves the same content without map interaction.
5. Nearby places are sorted with the Haversine formula. Directions offer Google Maps, Apple Maps, and Waze using destination coordinates; each external provider calculates turn-by-turn routing.

## Data layers

`src/data/landmarks.ts` is the auditable competition seed manifest. Zod validates each bilingual landmark, image attribution, source, coordinate field, publication state, route, and stop.

`supabase/migrations/` defines the durable PostgreSQL schema for categories, landmarks, cultural routes, private issue reports, and verification runs. Every exposed table has RLS enabled, explicit grants, and published-only read policies. `scripts/seed-supabase.ts` performs idempotent upserts from the validated manifest.

`src/lib/backend.ts` reads live Supabase records in production mode. Manifest fallback is available only when `CONTENT_BACKEND` is not `supabase`, preserving a deterministic offline development path without silently masking a production database failure.

## Routes

- `/{locale}` — editorial homepage
- `/{locale}/map` — discovery map/list
- `/{locale}/places/[slug]` — localized landmark story
- `/places/[slug]` — permanent QR redirect
- `/{locale}/routes/[slug]` — ordered cultural route
- `/{locale}/demo` — jury mode
- `/{locale}/demo/sign/[slug]` — printable sign proposal
- `/{locale}/story` — sourced city and product history
- `/{locale}/report` — public issue report form
- `/admin` — token-protected configuration health and issue inbox
- `/api/places` and `/api/places/[slug]` — validated published data
- `/api/qr/[slug]` — SVG or PNG QR output
- `/api/reports` — validated persistent report intake; protected server-only listing
- `/api/health` — non-secret backend/database health

## Resilience and privacy

Location is requested only after pressing “Около мен / Near me”, is held only in component memory, and is never persisted. Favorites use one localStorage key. There are no visitor accounts, analytics, or background location. A signed, four-hour HttpOnly, SameSite=Strict cookie is used only after successful admin authentication. Visitor reports older than 90 days are removed when a report is submitted or the protected inbox is opened. If geolocation is denied, manual browsing remains available. If JavaScript or mapping fails, the landmark story and textual nearby links remain server-rendered.

The service worker caches only same-origin public localized pages and explicit static shell assets. It never caches `/api/*`, `/admin`, Supabase responses, report data, or OpenStreetMap tiles, and does not claim offline mapping.

Google Maps URLs, Apple Maps URLs, and Waze Deep Links do not require an API key. The Leaflet/OpenStreetMap discovery map remains the resilient default. A future Google Maps Embed or JavaScript implementation may read `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, but production keys must be domain- and API-restricted and must never enter Git history.

## Security

Zod validates manifest, API filters, and issue reports. Supabase RLS and explicit grants expose only published landmarks/routes/categories. The report endpoint has a honeypot and a database-backed, privacy-preserving rate limit; only the server-only Supabase role may write reports. The legacy report RPC and migration helper are explicitly revoked from anonymous/authenticated roles. The application sets CSP, HSTS, `nosniff`, strict referrer policy, frame denial, cross-origin isolation headers, and a restrictive permissions policy. Admin login uses constant-time token comparison, rate limiting, and an HMAC-signed expiring cookie. Supabase's security advisor reports no findings after the production-hardening migration.

