# QA report

## Final palette, CSP and accessibility hardening — 16 November 2026

Replaced the former green accent system with the original Discover Burgas violet–magenta–cyan stage palette across public pages, maps, route/demo experiences, PWA metadata and application icons. QR output remains high-contrast black and white. Fixed the development-only React `eval()` console error by generating environment-aware CSP: local development permits the React diagnostic capability, while production continues to reject `unsafe-eval`.

| Check | Result | Evidence |
|---|---|---|
| Lint | PASS | `npm run lint` completed without errors |
| Type checking | PASS | `npm run typecheck` completed without errors |
| Unit tests | PASS | 8 files and 16 tests, including development/production CSP regression coverage |
| Production build | PASS | 57 pages/routes generated successfully |
| Production dependency audit | PASS | `npm audit --omit=dev` reported 0 vulnerabilities |
| Development CSP | PASS | Local response includes `unsafe-eval`, allowing React development diagnostics |
| Production CSP | PASS | Production response excludes `unsafe-eval` and retains frame/object restrictions |
| Browser suite audit | FOUND AND FIXED | The first run produced 80 passes, 24 intentional skips and one serious map-kicker contrast finding |
| Focused accessibility regression | PASS | The affected desktop key-public-pages axe test passed after the color correction |
| Clean production rebuild | PASS | 57 pages/routes generated with the contrast correction included |
| Final full browser suite | PASS | 81 tests passed, 24 intentional cross-project skips, 0 failures across five viewports |

The final code still requires an approved production deployment before the new palette and CSP change replace the currently deployed build. Physical phone scanning, owner-level Vercel secret classification, legal review and manual assistive-technology testing remain external release checks.

## HTTPS production deployment — 15 November 2026

The verified `feature/backend-production-core` commit `2ad478a` was deployed to Vercel and is serving the final project domain at [https://discover-burgas.vercel.app](https://discover-burgas.vercel.app). Production is connected to the seeded Supabase project; no paid service or Google Places key was enabled.

| Check | Result | Evidence |
|---|---|---|
| Vercel Git connection | PASS | Vercel is connected to `rosen-jlsa/discover-burgas` |
| Verified branch deployment | PASS | Vercel reports deployment `7bd88sQVM58YXPADaupMFUo36aYi` Ready from `feature/backend-production-core` commit `2ad478a` |
| Final HTTPS homepage | PASS | `https://discover-burgas.vercel.app/bg` rendered the Bulgarian production experience |
| Production health | PASS | `/api/health` returned `status=ok`, `backend=supabase`, `database=ready`, and `reportSubmission=server-configured` |
| Production place catalogue | PASS | `/api/places?locale=bg` returned 14 published records from Supabase |
| Production QR SVG | PASS | `/api/qr/archaeological-museum?format=svg` returned a rendered QR image |
| Final QR payload decode | PASS | The production PNG decoded to `https://discover-burgas.vercel.app/places/archaeological-museum` |
| Production application URL | PASS | `NEXT_PUBLIC_APP_BASE_URL` is the final HTTPS Vercel domain |
| Production screenshots | PASS | Desktop homepage, 390 px mobile homepage and desktop jury demo were captured from the deployed HTTPS build in `screenshots/production/` |
| Physical smartphone-camera scan | NOT RUN | Requires the presentation phone; the encoded payload itself was decoded programmatically |

Vercel environment values are configured for Production. The three server-only values are masked in the dashboard; Vercel still recommends converting their dashboard classification from Config to Secret after a fresh owner 2FA verification. This classification does not expose them to the browser and did not block the verified production backend, but it remains a worthwhile account-level hardening step.

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
| Remote Supabase migration | PASS | Applied `backend_contracts_and_search` to project `discover-burgas`; migration history records version `20261115125012` |
| Production seed | PASS | Remote database contains 14 published landmarks and 3 published routes |
| Production data integrity | PASS | 0 missing locales, 0 invalid coordinate pairs, 0 published records without sources, and 0 broken route stops |
| Production API smoke test | PASS | Supabase-mode health, places, full-text search, nearby, and routes returned HTTP 200 |
| Production report idempotency | PASS | First request returned 201, exact replay returned 200 with the same record ID, and conflicting reuse returned 422; the temporary record was removed |
| Supabase advisors | PASS | Security and health advisors returned zero findings after migration and seed |
| Secret rotation | PASS | The previously exposed `default` server key was deleted after validating the separate `version02` key |
| GitHub branch publication | PASS | `feature/backend-production-core` pushed to `rosen-jlsa/discover-burgas` |

The browser suite covers 375, 390, 768, 1024 and 1440 px projects. Desktop-only proofs include full-page accessibility, service-worker cache boundaries, report rate limiting, exact idempotent replay, and conflicting idempotency-key rejection.

The Vercel environment, HTTPS deployment and final-domain QR decode are complete. A physical smartphone-camera scan remains the final presentation-device check. Local pgTAP execution still requires Docker, while the committed GitHub Actions database job provides the repeatable compatible-environment check.

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

## Remaining external checks — not marked PASS

- Scan the production QR with the exact presentation phone on both venue Wi-Fi and mobile data.
- Convert the three server-only Vercel values from dashboard type Config to Secret after fresh owner 2FA verification.
- Formal legal/privacy review, a manual screen-reader session, and a physical iOS/Android device lab remain appropriate before an institutional public rollout.

The codebase, live Supabase backend, Vercel production deployment and final-domain QR payload pass the executed release checks. No unexecuted real-device or legal review is presented as complete.

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
# Search and launch readiness — 2026-11-24

- Production build and ESLint passed. Build also executed the TypeScript checks; separate typecheck and 16 unit tests passed earlier in this increment.
- Final browser regression run: 111 passed, 29 skipped across five widths (45.4 seconds). Five added skips are the configured-analytics check when GA is intentionally absent; existing 24 viewport-specific skips remain.
- Dedicated build with a fake GA ID: both SEO/browser tests passed, including zero tag requests before opt-in, a mocked tag after opt-in, sanitized pageview queue and withdrawal/cookie removal. No request was sent to a real Analytics property. Rebuilt without the fake ID afterward.
- Local `npm run seo:check` passed for robots, bilingual sitemap and six representative localized pages.
- Live production SEO check was executed and failed the new sitemap language-alternate requirement: the current public deployment still serves the older sitemap. Local changes have not been deployed.
- Google/Bing ownership, sitemap submissions, actual GA collection, PageSpeed reports, physical-phone checks and directory submissions are NOT claimed complete. See SEARCH_AND_LAUNCH.md.

# PWA / Android work — 2026-11-21

- Production build: executed successfully, 62 generated pages, Next.js 16.4.6.
- TypeScript check: executed successfully.
- Unit tests: 16 passed across 8 files.
- Lint: executed successfully after fixing a test variable declaration.
- Final full browser suite at five widths: 106 passed, 24 intentionally skipped (42.5 seconds). An earlier run found an ambiguous favorite-button test locator; corrected it to exact accessible names before the successful full rerun.
- All 25 new PWA checks across five widths passed in that suite: instructions/version/asset links, user-triggered installation, offline text/photo reload and deletion, blocked storage, waiting-worker activation preserving local data. These are Chromium viewport checks, not physical iOS or Android validation.
- Signing identity created with JDK 17; only its public certificate is in Git. Private signing material stays outside the repository.
- Android build attempted and stopped at the explicit missing SDK/environment prerequisite. APK/AAB generation and Android lint are NOT passed or complete. SDK license acceptance is pending owner confirmation.
- Public deployment, real-device installation, Safari installation and Android domain verification remain outstanding. No store upload was performed.
