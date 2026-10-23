![Discover Burgas — independent host-city cultural companion](docs/assets/discover-burgas-banner.svg)

# Открий Бургас / Discover Burgas

> „Всяко място разказва история.“

Bulgarian-first, mobile-first cultural discovery platform built for a competition demonstration. A physical QR code opens a stable, language-neutral landmark URL; the visitor receives a localized historical story, verified sources, an interactive map, nearby places, directions, and a practical cultural route.

This repository is an independent competition prototype. It does not claim endorsement by Burgas Municipality or any cultural institution, and the printable signs are proposals—not installed infrastructure.

## Preview

| Desktop discovery | Mobile QR journey |
|---|---|
| ![Desktop homepage](screenshots/homepage-desktop.png) | <img src="screenshots/homepage-mobile.png" alt="Mobile homepage" width="280" /> |
| ![Interactive landmark map](screenshots/interactive-map.png) | <img src="screenshots/nearby-mobile.png" alt="Mobile nearby places" width="280" /> |

![Arena Burgas — Eurovision 2027 visitor page](screenshots/arena-burgas.png)

![The source-backed story of Burgas](screenshots/city-story.png)

![Interactive four-step mobile guide](screenshots/phone-guide.png)

## Working MVP

- Eight sourced locations, including confirmed Eurovision 2027 venue Arena Burgas
- Bulgarian and English public routes
- Stable QR targets at `/places/[slug]`
- SVG and PNG QR downloads generated from `NEXT_PUBLIC_APP_BASE_URL`
- Leaflet/OpenStreetMap discovery with search, categories, map/list views, opt-in location, and a text fallback
- Haversine-based nearby recommendations
- One-tap routing through Google Maps, Apple Maps, or Waze using keyless universal links
- Five-stop central walking route; Aquae Calidae is transport-dependent and St. Anastasia is boat-dependent
- Local-only favorites, no account or tracking
- Printable sign proposal and jury demo mode
- PWA manifest, offline explanation, and conservative application-shell service worker
- Zod manifests, Supabase/PostgreSQL migrations, RLS policies, and repeatable TypeScript seed
- Unit, browser, QR decode, five-viewport, keyboard, and multi-page automated accessibility checks
- Bright spring 2027 daylight design, animated editorial headlines, and reduced-motion support
- Source-backed city and platform story at `/bg/story` and `/en/story`
- Visitor issue reporting and a token-protected configuration health dashboard at `/admin`
- Interactive phone walkthrough with four working states and an animated European visitor flag stream

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Leaflet, Supabase PostgreSQL, Zod, Vitest, Playwright, axe-core, and a Python REST verifier. Vercel is the intended application host.

The public pages and APIs read live published records from Supabase when `CONTENT_BACKEND=supabase`. The version-controlled, Zod-validated manifest in `src/data/landmarks.ts` remains the auditable seed and an explicit local fallback only.

## Local setup

Requirements: Node.js 20.19+ and npm. Docker is optional.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000/bg`. The jury entry point is `http://localhost:3000/bg/demo`.

### Database

Create/link a Supabase project, apply the migrations, then seed and verify:

```bash
npx supabase login
npx supabase link --project-ref <project-ref>
npm run supabase:push
npm run supabase:seed
npm run backend:verify
```

The seed requires a server secret, or the documented short-lived RLS seed-token procedure. Never place `SUPABASE_SECRET_KEY` in a `NEXT_PUBLIC_` variable. For a fully local Supabase stack, use `npx supabase start` on a machine with Docker.

```bash
docker compose up -d
```

Use `postgresql://discover:discover_local@localhost:5432/discover_burgas` for both local database variables. Docker was not available on the implementation machine, so the included Compose path is documented but was not executed.

## Quality commands

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm run screenshots
```

Playwright browsers may first require `npx playwright install chromium`. See [the QA report](docs/QA_REPORT.md) for results that were actually executed.

## Vercel and Supabase deployment

1. Create a Supabase project and apply `supabase/migrations/`.
2. Import this repository into Vercel.
3. Configure `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, server-only `SUPABASE_SECRET_KEY`, `CONTENT_BACKEND=supabase`, and `NEXT_PUBLIC_APP_BASE_URL=https://<production-domain>`.
4. Run `npm run supabase:seed` and `npm run backend:verify`.
5. Deploy, then regenerate/verify printable QR assets against the HTTPS domain.
6. Complete a real smartphone-camera scan before public presentation.

The Supabase Free project is provisioned and seeded. Vercel deployment and real-phone scanning remain pending because no Vercel deployment/project was connected and no production domain is available.

### Maps configuration

Visitor navigation does **not** require a Google Maps API key. The application uses official Google Maps URLs, Apple Maps unified URLs, and Waze Deep Links, while the in-page discovery map remains Leaflet/OpenStreetMap.

`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is reserved for an optional future Google Maps Embed or JavaScript integration. The inspected Google Cloud project currently has no billing account; no paid Maps API or unrestricted key was enabled. If enabled later, restrict a separate website key to the final HTTPS domain and only the required Maps API.

### Protected operations view

Set `ADMIN_DASHBOARD_TOKEN` to a long random value to unlock `/admin`. Visitor submissions pass through the validated, rate-limited Next.js server endpoint and are written with the server-only Supabase secret. Anonymous and authenticated database roles cannot call the report RPC or read/write the report table directly. Admin sessions are signed and expire after four hours; records older than 90 days are removed on new report submission and protected inbox access.

## Burgas 2027 information

Burgas is the confirmed Host City for Eurovision 2027, with the live shows scheduled at Arena Burgas on 11, 13, and 15 May 2027. The project links to official EBU/BNT information and does not invent unannounced Eurovision Village, EuroClub, ticket, or transport details.

This repository is an independent cultural-technology prototype and is not affiliated with or endorsed by Eurovision, the EBU, BNT, or Burgas Municipality. Its event-inspired graphics are original and do not reuse the official event logo.

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Data and image sources](docs/DATA_SOURCES.md)
- [QR system](docs/QR_SYSTEM.md)
- [3–5 minute jury demo](docs/DEMO_GUIDE.md)
- [Roadmap](docs/ROADMAP.md)
- [Executed QA](docs/QA_REPORT.md)
- [Rendered screenshots](screenshots/)

