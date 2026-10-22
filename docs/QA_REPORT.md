# QA report

Executed on Windows on **22 October 2026**. Only observed results are recorded.

| Check | Result | Evidence |
|---|---|---|
| Production build | PASS | `npm run build`; 34 static/SSG pages generated, including bilingual history/report routes, plus API/dynamic routes |
| Type checking | PASS | `npm run typecheck` |
| Unit tests | PASS | `npm test`; 9 tests covering manifests, localization/search, publication lookup, route integrity, Haversine ordering, universal map links, QR URL construction, and QR decoding |
| Browser journeys | PASS | `npm run test:e2e`; 20/20 across desktop Chromium and Pixel 7 emulation |
| Automated accessibility | PASS | axe-core reported no serious or critical homepage violations in both browser projects |
| Protected admin session | PASS | Local production server accepted the configured token, set the HttpOnly cookie, rendered `/admin`, and authorized `GET /api/reports` |
| Rendered screenshot suite | PASS | `npm run screenshots`; 12/12 captures after Leaflet markers rendered |
| Prisma client generation | PASS | `npm run db:generate` |
| Production dependency audit | PASS | `npm audit --omit=dev`; zero production vulnerabilities reported |
| Lint | PASS with warnings | `npm run lint`; three Next.js `no-img-element` warnings are limited to server-generated QR endpoints |

Browser coverage includes Bulgarian discovery/search, Arena Burgas routing through Google Maps/Apple Maps/Waze, stable language-neutral QR redirect, language switching, local favorite persistence, denied-geolocation fallback, API locale validation, missing slugs, QR SVG response, the source-backed history, issue reporting, the locked admin gate, and accessibility scanning.

Screenshots cover desktop/mobile homepage, discovery map, landmark detail, Arena Burgas, mobile nearby discovery, cultural route, QR demonstration, printable sign, city history, mobile issue reporting, and the protected admin gate.

## Not executed

- PostgreSQL migration and seed: no Neon credentials were supplied and Docker is absent on this machine.
- Vercel deployment: no project credentials or production domain were supplied.
- Final HTTPS QR payload validation and physical smartphone-camera scan: requires the production domain.
- Manual screen-reader session and a full device lab at 375, 390, 768, 1024, and 1440 px. Responsive CSS and representative desktop/390 px browser tests were executed, but these unexecuted manual checks are not marked PASS.

## Known non-production audit note

The full npm audit reports five high-severity advisories through development-only ESLint/glob tooling. The production-only audit is clean; npm currently proposes an unavailable/non-safe resolution, so no forced dependency downgrade was applied.

