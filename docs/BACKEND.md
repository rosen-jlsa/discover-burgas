# Backend and API contracts

## Runtime modes

- `CONTENT_BACKEND=manifest` uses the validated repository manifest and in-memory report/rate-limit storage. This is deterministic for local demos and automated browser tests.
- `CONTENT_BACKEND=supabase` is the production mode. Missing credentials or failed database reads fail closed instead of silently serving stale content.

Supabase is the only migration authority. Apply files in `supabase/migrations/`, then seed from the same Zod-validated source with `npm run supabase:seed`. `npm run supabase:seed:sql` regenerates `supabase/seed.sql` for local reset and CI.

## Public APIs

Public read endpoints support Bulgarian (`bg`) and English (`en`) and return CDN-cacheable responses for five minutes with stale revalidation.

### `GET /api/places`

Parameters: `locale`, `q`, `category`, `area`, `interest`, `scope=all|burgas|region`, `page`, `pageSize` (maximum 50), and `sort=name|verifiedAt`.

Response: `{ items, count, locale, pagination }`. `count` and `pagination.total` represent the full filtered result count, not only the current page.

### `GET /api/places/:slug`

Returns one published localized landmark. Invalid slugs return 400; unknown or unpublished records return 404.

### `GET /api/places/:slug/nearby`

Parameters: `locale`, `limit` (maximum 12), `radiusKm` (0.1–100). Results use verified coordinates, are sorted by Haversine distance, and include `distanceKm`.

### `GET /api/routes` and `GET /api/routes/:slug`

The collection accepts `locale` and optional `transportMode`. The detail endpoint returns ordered resolved stops and preserves the declared transport mode.

## Errors

Errors use one stable shape:

```json
{ "error": { "code": "INVALID_REQUEST", "message": "...", "details": {} } }
```

Supported codes are `INVALID_REQUEST`, `NOT_FOUND`, `UNAUTHORIZED`, `RATE_LIMITED`, `CONFLICT`, and `UNAVAILABLE`.

## Issue reports

`POST /api/reports` requires a UUID in the `Idempotency-Key` header. The first accepted request returns 201. Repeating the same key and payload returns 200 and `Idempotency-Replayed: true`. Reusing the key with a different payload returns 422. The unique database index resolves concurrent retries safely.

Reports, health, and administrative responses are `no-store`. Reports are private under RLS, limited per one-way request fingerprint, and retained for a target maximum of 90 days.

## Release checks

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run supabase:start
npm run supabase:lint
npm run supabase:test
```

The Supabase commands require Docker. GitHub Actions runs application and database jobs separately so a database-contract failure cannot be hidden by a successful application build.
