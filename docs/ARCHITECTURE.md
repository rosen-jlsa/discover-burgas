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

Location is requested only after pressing “Около мен / Near me”, is held only in component memory, and is never persisted. Favorites use one localStorage key. There are no visitor accounts, analytics, or background location. A short-lived HttpOnly, SameSite=Strict cookie is used only after successful admin authentication. If geolocation is denied, manual browsing remains available. If JavaScript or mapping fails, the landmark story and textual nearby links remain server-rendered.

The service worker caches only the application shell and offline explanation. It does not cache OpenStreetMap tiles or claim offline mapping.

Google Maps URLs, Apple Maps URLs, and Waze Deep Links do not require an API key. The Leaflet/OpenStreetMap discovery map remains the resilient default. A future Google Maps Embed or JavaScript implementation may read `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, but production keys must be domain- and API-restricted and must never enter Git history.

## Security

Zod validates manifest, API filters, and issue reports. Supabase RLS and explicit grants expose only published landmarks/routes/categories. Visitor reports enter through a `security definer` RPC that repeats length/category validation; report tables remain unreadable and unwritable directly by anonymous users. The application sets `nosniff`, strict referrer policy, frame denial, and a restrictive permissions policy. The secret key is server-only. Admin login uses constant-time token comparison and an HttpOnly cookie. Public launch should add provider-level rate limiting and abuse monitoring.

