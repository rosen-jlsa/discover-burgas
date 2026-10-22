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
- Zod manifests, Prisma/PostgreSQL schema, migration, and repeatable seed
- Unit, browser, QR decode, and automated accessibility checks
- Bright spring 2027 daylight design, animated editorial headlines, and reduced-motion support
- Source-backed city and platform story at `/bg/story` and `/en/story`
- Visitor issue reporting and a token-protected configuration health dashboard at `/admin`

## Stack

Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, Leaflet, PostgreSQL/Neon, Prisma 7, Zod, Vitest, Playwright, and axe-core. Vercel is the intended application host; Neon is the supported production database.

The competition UI reads the version-controlled, Zod-validated manifest in `src/data/landmarks.ts`. This keeps the demo deterministic if a database is unavailable. The Prisma schema and seed mirror that manifest and are ready for a Neon-backed content repository in the next deployment phase.

## Local setup

Requirements: Node.js 20.19+ and npm. Docker is optional.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open `http://localhost:3000/bg`. The jury entry point is `http://localhost:3000/bg/demo`.

### Database

For Neon, set both connection strings in `.env.local`, then run:

```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

For optional local PostgreSQL:

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

## Vercel and Neon deployment

1. Create a Neon PostgreSQL project and copy its pooled and direct connection URLs.
2. Import this repository into Vercel.
3. Configure `DATABASE_URL`, `DIRECT_URL`, and `NEXT_PUBLIC_APP_BASE_URL=https://<production-domain>`.
4. Run `npm run db:migrate` and `npm run db:seed` against Neon.
5. Deploy, then regenerate/verify printable QR assets against the HTTPS domain.
6. Complete a real smartphone-camera scan before public presentation.

Production deployment and real-phone scanning remain pending because no Vercel/Neon credentials or production domain were available in this environment.

### Maps configuration

Visitor navigation does **not** require a Google Maps API key. The application uses official Google Maps URLs, Apple Maps unified URLs, and Waze Deep Links, while the in-page discovery map remains Leaflet/OpenStreetMap.

`NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is reserved as an optional deployment variable if a future release replaces Leaflet with Google Maps Embed or JavaScript API. Never commit the real key; restrict it to the production domain and only the enabled Maps APIs.

### Protected operations view

Set `ADMIN_DASHBOARD_TOKEN` to a long random value to unlock `/admin`. The dashboard reports whether services are configured but never displays secret values. Visitor reports are held in volatile server memory in this prototype; production persistence should use PostgreSQL.

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

