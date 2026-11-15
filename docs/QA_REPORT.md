# QA report

## Backend production-core verification — 15 November 2026

This pass introduced versioned public API contracts, server-side discovery pagination/search, nearby and route endpoints, idempotent report intake, a Supabase-only migration workflow, database contract tests, and GitHub Actions quality gates.

| Check | Result | Evidence |
|---|---|---|
| Dependency clean install | PASS | `npm ci` completed successfully |
| Dependency audit | PASS | `npm audit` and the clean install reported zero vulnerabilities |
| Lint | PASS | `npm run lint` completed with no errors |
| Type checking | PASS | `npm run typecheck` completed with no errors |
| Unit tests | PASS | `npm test`: 7 files, 14 tests |
| Production build | PASS | `npm run build`: 57 generated pages/routes; all API routes compiled |
| Browser/API/accessibility suite | PASS | `npm run test:e2e`: 81 passed, 24 intentional project-duplicate skips |
| API smoke test | PASS | Production server returned 200 for paginated places, detail, nearby, route list/detail; 400 for unknown filters and a missing idempotency header; 404 for an unknown landmark |
| QR decode regression | PASS | Unit test generated and decoded the stable landmark URL |
| Database seed generation | PASS | `npm run supabase:seed:sql` regenerated `supabase/seed.sql` from the validated manifest |
| Local Supabase migration/pgTAP execution | NOT RUN | Docker is not installed on this machine; `.github/workflows/quality.yml` runs the database job where Docker is available |
| Remote Supabase migration push | NOT RUN | Intentionally not applied without an explicit production database change/deployment step |

The browser suite covers 375, 390, 768, 1024 and 1440 px projects. Desktop-only proofs include full-page accessibility, service-worker cache boundaries, report rate limiting, exact idempotent replay, and conflicting idempotency-key rejection.

The remaining production gates are external: rotate the previously exposed Supabase secret, apply the new migration to the selected Supabase project, execute `npm run backend:verify`, configure the production environment, deploy to HTTPS, and perform a physical smartphone QR scan.

## Regional landmark expansion — 14 November 2026

Expanded the validated manifest from eight to fourteen published places without changing permanent existing slugs or the database schema. Added Ancient Nessebar, Sozopol Archaeological Museum, Begliktash, the Ropotamo visitor boat pier, Pomorie Salt Museum and the Ancient Domed Tomb near Pomorie. Aquae Calidae and St. Anastasia Island were updated in place with stronger institutional sources. Added north-coast driving and south-coast mixed regional routes while preserving the central walking route.

| Check | Result | Evidence |
|---|---|---|
| Source and duplicate audit | PASS | Classified every requested group as NEW, UPDATE, SPLIT or REQUIRES MORE RESEARCH; Aquae Calidae and St. Anastasia retain their stable IDs/slugs; Cape Atia was not published. |
| Manifest/schema validation | PASS | All 14 records and 3 routes parse through Zod during module import and unit tests. |
| Forensic integrity | PASS | Script reported 0 duplicate IDs, 0 duplicate slugs, 0 broken route stops, 0 missing BG/EN translations and 0 invalid coordinate pairs. |
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Unit tests | PASS | `npm test`; 5 files and 10 tests passed, including manifest uniqueness, route resolution, search, Haversine ordering, navigation URLs and QR decoding. |
| Production build | PASS | `npm run build`; Next.js compiled and generated 56 pages, including 28 localized landmark pages. |
| Browser journeys | PASS | `npm run test:e2e -- --reporter=line`; 80 passed and 20 intentionally skipped duplicate server proofs across 375, 390, 768, 1024 and 1440 px projects. |
| Regional browser coverage | PASS | Tests exercised the “Around Burgas” scope, list fallback, Ancient Nessebar BG page, Sozopol Museum EN page, Pomorie QR output, both regional route URLs and the `nature` API filter. |
| Automated accessibility | PASS | The Playwright suite found no serious or critical axe violations on the homepage at all five sizes and on the established key-page desktop audit; keyboard skip-link behavior passed. |
| Screenshot suite | PASS | `npm run screenshots -- --reporter=line`; 16 actual Playwright captures passed, including the regional landmark and south-coast route. |
| Production dependency audit | PASS | `npm audit --omit=dev` reported 0 vulnerabilities. |
| Live Supabase reseed | NOT RUN | No live database mutation was required or authorized in this pass. The idempotent seed reads the same validated manifest, but production should be reseeded after credentials are configured. |
| Physical QR scan and HTTPS deployment | NOT RUN | Still requires the final deployed domain and a real phone; localhost QR payloads remain development-only. |

The regional records deliberately keep opening hours, prices and accessibility null. New records without verified reusable photography use the branded non-documentary fallback. The Ropotamo marker is the published boat pier under the E87 bridge, not a reserve centroid; the page includes the protected-area access constraints.

## Burgas story page redesign — 1 November 2026

Rebuilt `/bg/story` as an editorial city-history feature with a licensed photo hero and on-image credit, quick-jump period navigation, a vertical timeline connected to real landmark pages, sourced present/future context, and a separate history of the QR guide project.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Production build | PASS | `npm run build` compiled both locale story routes successfully. |
| Rendered previews | CAPTURED | Desktop, full-page desktop and 390px mobile previews are in [screenshots/aevo-inspired](../screenshots/aevo-inspired/). |
| Automated history/link assertions | NOT RUN | No separate automated test was requested for this visual pass. |

## Stay planner redesign — 1 November 2026

Rebuilt `/bg/stay` with a licensed Burgas Bay editorial image, date and guest controls, direct Booking.com/Airbnb searches, a cultural-route handoff, and clear external-booking disclosure. The search form validates paired dates and checkout order, then passes optional dates and guest count to the selected provider; no inventory or booking API is claimed.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Production build | PASS | `npm run build` compiled `/[locale]/stay` successfully. |
| Rendered previews | CAPTURED | Desktop and 390px mobile full-page captures are in [screenshots/aevo-inspired](../screenshots/aevo-inspired/). |
| Booking provider search behavior | NOT RUN | No automated external-link test was requested; actual availability is controlled by the providers. |

## Dining discovery redesign — 1 November 2026

Rebuilt `/bg/eat` with a restaurant-editorial hero, responsive venue cards, search, six filters, rating/source context, and an optional server-side Google Places photo endpoint. The endpoint is allowlisted to the curated venues, returns no-store responses, checks the place name before presenting a photo, and includes source-photo attribution/link data. No Google Places key is configured locally, so verified live Google image retrieval is still pending and the UI shows an illustrative fallback with a configuration note.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Production build | PASS | `npm run build` compiled successfully and registered `/api/venues/[id]/photo`. |
| Dining page | PASS | Local `GET /bg/eat` returned HTTP 200 after restarting the production server. |
| Photo endpoint without key | EXPECTED 503 | `/api/venues/neptun/photo` reported that Google Places photos are not configured. |
| Rendered previews | CAPTURED | Desktop/full-page and 390px mobile dining views are in [screenshots/aevo-inspired](../screenshots/aevo-inspired/). |
| Google photo attribution and live API response | NOT VERIFIED | Requires `GOOGLE_PLACES_API_KEY`, Places API (New), and billing in Google Cloud. |
| Automated end-to-end tests | NOT RUN | No test suite was requested for this change. |

## Motion and interaction pass — 1 November 2026

Added a shared scroll-reveal system for homepage sections and key discovery pages, staged hero entrance, tactile button/card transitions, image hover movement, and animated map markers/selected-place panels. Motion respects `prefers-reduced-motion`; all page content remains visible to visitors who request reduced motion.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Production build | PASS | `npm run build` compiled and generated 44 static/SSG pages plus dynamic routes. |
| Local map page | PASS | After restarting the production server, `GET /bg/map` returned HTTP 200 and included the updated motion component. |
| Rendered screenshots | CAPTURED | Re-captured homepage at 375, 390, 768, 1024, and 1440 px plus map, details, demo, route, dining, and stay pages. |
| Automated/browser motion assertions | NOT RUN | No dedicated test was requested or added for animation timing. |

Animations are intentionally short and restrained outside the hero. The reduced-motion media query disables looping movement and transitions while preserving visible content and functional controls.

## Aevo-inspired product-led design — 1 November 2026

The current homepage and shared public-page visual system use an original Discover Burgas composition inspired by the reference site's product storytelling and spacing. The jury-facing production build currently serves `http://localhost:3001/bg`.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed with no errors. |
| Type checking | PASS | `npm run typecheck` completed with no errors. |
| Production build | PASS | `npm run build` compiled successfully and generated 44 static/SSG pages plus dynamic APIs/routes. |
| Homepage HTTP response | PASS | `GET /bg` returned HTTP 200; the new mobile guide and 2027 host-city destination were present. |
| Rendered visual previews | CAPTURED | Playwright browser screenshots at 375, 390, 768, 1024, and 1440 px, plus map, landmark detail, and demo screens, are stored in [screenshots/aevo-inspired](../screenshots/aevo-inspired/). These are actual rendered pages. |
| Full automated journey/accessibility suite | NOT RUN IN THIS PASS | The established suite was not run for this visual redesign pass. Its homepage assertions were updated to match the guide preview. |

The hero phone preview shows a real published landmark and links to the live landmark, map, route, and local favorite control. The 2027 host-city chip links to the Arena Burgas record and uses no Eurovision logo. The prototype remains independent and does not claim event or municipal endorsement.

## Previous design iteration: Burgas Atlas (superseded) — 1 November 2026

This earlier homepage direction was replaced by the product-led visual direction above. Its real browser captures are retained in [screenshots/atlas](../screenshots/atlas/) for iteration history.

The Atlas pass completed lint, type checking, production build, and multi-viewport screenshots. The full automated journey/accessibility suite was not run in that pass.

## Earlier editorial redesign verification — 26 October 2026

The redesigned production build succeeded and generated 44 static or pre-rendered pages plus dynamic routes. Type checking and lint completed with no errors. The existing unit suite passed 10/10. The existing desktop journey suite passed 17/17, covering QR redirect, localization, favorites, geolocation denial, reports and security controls. The new focused Playwright suite passed 11/11: 375, 390, 768, 1024 and 1440 px layouts; page runtime errors and horizontal overflow; dining filters; Booking.com/Airbnb external links; keyboard-operated phone tabs; map selection and directions; actual map tiles; QR SVG; and automated accessibility on key screens. Actual screenshots are in [screenshots/redesign](../screenshots/redesign/).

The checks found and corrected low contrast in photographic attribution, the favorite control and city-history accents. The new area for dining contains two entries verified against the venues' own sites. The accommodation buttons open external provider searches; live booking availability and transactions were not tested because no API integration is claimed. HTTPS deployment and a real smartphone-camera scan still require the separate deployment step.

Executed on Windows on **24 October 2026**. Only observed results are recorded.

| Check | Result | Evidence |
|---|---|---|
| Production build | PASS | `npm run build`; Next.js compiled successfully and generated 38 static/SSG pages plus dynamic APIs/routes |
| Type checking | PASS | `npm run typecheck` |
| Lint | PASS | `npm run lint`; zero errors and zero warnings |
| Unit tests | PASS | `npm test`; 5 files and 10 tests covering manifests, localization/search, publication lookup, route integrity, Haversine ordering, universal map links, admin-cookie signing/expiry, QR URL construction, and QR decoding |
| Browser journeys | PASS | `npm run test:e2e`; 73 passed and 12 intentionally skipped duplicate server proofs, across 375, 390, 768, 1024, and 1440 px projects |
| Automated accessibility | PASS | axe-core found no serious or critical violations on the homepage at all five sizes and on map, detail, route, demo, story, report, and privacy pages at desktop; keyboard skip-link behavior also passed at all five sizes |
| Security headers and private caching | PASS | Browser/API checks verified CSP, HSTS, `Cache-Control: no-store` for `/admin` and reports, and that the service worker never caches `/api/*` or `/admin` |
| Report abuse protection | PASS | Honeypot rejection and the 5-submissions-per-10-minutes database-backed limit were exercised; the sixth request returned `429` with `Retry-After: 600` |
| Public database bypass regression | PASS | A direct `anon`/publishable-key call to `submit_issue_report` returned HTTP 401 with permission denied |
| Supabase security advisor | PASS | Live project returned zero security lints after `production_security_hardening` |
| Supabase migration history | PASS | Live history contains the two baseline migrations and `20261023215907_production_security_hardening` |
| Supabase backend verification | PASS | `npm run backend:verify`; 8 published records and 0 coordinate/translation/source errors |
| Screenshot suite | PASS | `npm run screenshots`; 14/14 actual Playwright captures, including privacy and the interactive phone guide |
| Prisma client generation | PASS | `npm run db:generate` |
| Dependency audit | PASS | Both `npm audit` and `npm audit --omit=dev` reported zero vulnerabilities |

Browser coverage includes Bulgarian discovery/search, Arena Burgas routing through Google Maps/Apple Maps/Waze, stable language-neutral QR redirect, language switching, local favorite persistence, denied-geolocation fallback, API locale validation, missing slugs, QR SVG response, the four-state phone guide, source-backed history, issue reporting, locked admin access, English privacy content, security headers, service-worker cache boundaries, spam/rate-limit controls, keyboard navigation, and accessibility scanning.

## Security-fix verification

The vulnerable path was **anonymous browser/database caller → public Supabase RPC → private `issue_reports` write**, with an additional risk from long-lived replayable admin cookies and over-broad service-worker caching. The fix routes writes through the validated server endpoint, revokes public RPC/helper execution, enforces deny policies and server-role grants, adds a privacy-preserving database limiter, signs/expiring admin sessions, and excludes sensitive routes from caches. Legitimate report submission and protected admin reads remain covered by browser tests. No security-advisor findings remain.

## Remaining production gate — not marked PASS

- Vercel deployment: the browser and CLI are currently signed out; the repository cannot be imported or configured until the owner completes Vercel authentication.
- Final HTTPS QR payload validation and physical smartphone-camera scan: requires the deployed production domain.
- Vercel environment-variable presence and production smoke test: requires the deployment above.
- Formal legal/privacy review, manual screen-reader session, and physical iOS/Android device lab remain appropriate before an institutional public rollout.

The codebase and live Supabase backend pass the executed release checks. “10/10 public launch” is not claimed until the external Vercel, HTTPS QR, and real-device gates are completed.

## Demo and cultural map visual update — 1 November 2026

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` after the demo and map redesign |
| Type checking | PASS | `npm run typecheck` after the demo and map redesign |
| Production build | PASS | `npm run build`; 44 routes generated |
| Local production page responses | PASS | `/bg/demo` and `/bg/map` returned HTTP 200 on port 3001 |
| Live QR endpoint | PASS | `/api/qr/aquae-calidae?format=svg` returned HTTP 200 and `image/svg+xml` |
| Rendered desktop/mobile previews | PASS | Playwright rendered `demo.png`, `demo-full.png`, `demo-390.png`, `map-1440.png`, `map-full.png`, and `map-390.png` |

Visual review confirmed the mobile demo presents the actual QR, the direct Aquae Calidae link, and the explicit sign-proposal disclaimer. The mobile map displays the interactive OpenStreetMap map, verified markers, category controls, and a scrollable place list. No QR camera scan on a physical phone was performed for this update.

## Cultural route page update — 1 November 2026

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` after route redesign |
| Type checking | PASS | `npm run typecheck` after route redesign |
| Production build | PASS | `npm run build`; 44 routes generated |
| Rendered route previews | PASS | Playwright captured `route.png`, `route-full.png`, and `route-390.png` from the production server |
| Mobile visual review | PASS | Confirmed five ordered stops, per-stop story links and Google Maps/Apple Maps/Waze actions, route map with five markers, and responsive layout in `route-390.png` |
| Local route response | PASS | `/bg/routes/burgas-centre-stories` returned HTTP 200 on port 3001 |
