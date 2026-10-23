# QA report

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
