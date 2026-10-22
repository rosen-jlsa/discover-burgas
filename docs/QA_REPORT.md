# QA report

Executed on Windows on **22 October 2026**. Only observed results are recorded.

| Check | Result | Evidence |
|---|---|---|
| Production build | PASS | `npm run build`; 25 static/SSG pages generated, API/dynamic routes compiled |
| Type checking | PASS | `npm run typecheck` |
| Unit tests | PASS | `npm test`; 8 tests covering manifests, localization/search, publication lookup, route integrity, Haversine ordering, QR URL construction, and QR decoding |
| Browser journeys | PASS | `npm run test:e2e`; 12/12 across desktop Chromium and Pixel 7 emulation |
| Automated accessibility | PASS | axe-core reported no serious or critical homepage violations in both browser projects |
| Rendered screenshot suite | PASS | `npm run screenshots`; 8/8 captures after Leaflet markers rendered |
| Prisma client generation | PASS | `npm run db:generate` |
| Production dependency audit | PASS | `npm audit --omit=dev`; zero production vulnerabilities reported |
| Lint | PASS with warnings | `npm run lint`; three Next.js `no-img-element` warnings are limited to server-generated QR endpoints |

Browser coverage includes Bulgarian discovery/search, stable language-neutral QR redirect, language switching, local favorite persistence, denied-geolocation fallback, API locale validation, missing slugs, QR SVG response, and accessibility scanning.

Screenshots cover desktop/mobile homepage, discovery map, landmark detail, mobile nearby discovery, cultural route, QR demonstration, and printable sign.

## Not executed

- PostgreSQL migration and seed: no Neon credentials were supplied and Docker is absent on this machine.
- Vercel deployment: no project credentials or production domain were supplied.
- Final HTTPS QR payload validation and physical smartphone-camera scan: requires the production domain.
- Manual screen-reader session and a full device lab at 375, 390, 768, 1024, and 1440 px. Responsive CSS and representative desktop/390 px browser tests were executed, but these unexecuted manual checks are not marked PASS.

## Known non-production audit note

The full npm audit reports five high-severity advisories through development-only ESLint/glob tooling. The production-only audit is clean; npm currently proposes an unavailable/non-safe resolution, so no forced dependency downgrade was applied.

