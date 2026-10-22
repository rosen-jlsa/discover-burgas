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

`prisma/schema.prisma` models the durable PostgreSQL form: landmarks, translations, images, sources, cultural routes, route translations, and ordered stops. The initial SQL migration is in `prisma/migrations/`; `prisma/seed.ts` replaces dependent records and upserts landmarks, making repeated seed runs deterministic.

The public prototype currently serves the validated manifest directly. This removes a database failure mode during jury presentation while preserving a migration path to Neon. Replacing the repository functions with Prisma queries does not change public URLs or component contracts.

## Routes

- `/{locale}` — editorial homepage
- `/{locale}/map` — discovery map/list
- `/{locale}/places/[slug]` — localized landmark story
- `/places/[slug]` — permanent QR redirect
- `/{locale}/routes/[slug]` — ordered cultural route
- `/{locale}/demo` — jury mode
- `/{locale}/demo/sign/[slug]` — printable sign proposal
- `/api/places` and `/api/places/[slug]` — validated published data
- `/api/qr/[slug]` — SVG or PNG QR output

## Resilience and privacy

Location is requested only after pressing “Около мен / Near me”, is held only in component memory, and is never persisted. Favorites use one localStorage key. No cookies, accounts, analytics, or background location are used. If geolocation is denied, manual browsing remains available. If JavaScript or mapping fails, the landmark story and textual nearby links remain server-rendered.

The service worker caches only the application shell and offline explanation. It does not cache OpenStreetMap tiles or claim offline mapping.

Google Maps URLs, Apple Maps URLs, and Waze Deep Links do not require an API key. The Leaflet/OpenStreetMap discovery map remains the resilient default. A future Google Maps Embed or JavaScript implementation may read `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`, but production keys must be domain- and API-restricted and must never enter Git history.

## Security

Zod validates manifest and API filter inputs. Only published records are returned. The application sets `nosniff`, strict referrer policy, frame denial, and a restrictive permissions policy. Secrets are environment variables. There are no write endpoints in the MVP.

