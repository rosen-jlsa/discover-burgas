# Открий Бургас / Discover Burgas

> „Всяко място разказва история.“

Bulgarian-first, mobile-first cultural discovery platform built for a competition demonstration. A physical QR code opens a stable, language-neutral landmark URL; the visitor receives a localized historical story, verified sources, an interactive map, nearby places, directions, and a practical cultural route.

This repository is an independent competition prototype. It does not claim endorsement by Burgas Municipality or any cultural institution, and the printable signs are proposals—not installed infrastructure.

## Working MVP

- Seven sourced landmarks in Burgas and the surrounding region
- Bulgarian and English public routes
- Stable QR targets at `/places/[slug]`
- SVG and PNG QR downloads generated from `NEXT_PUBLIC_APP_BASE_URL`
- Leaflet/OpenStreetMap discovery with search, categories, map/list views, opt-in location, and a text fallback
- Haversine-based nearby recommendations
- Five-stop central walking route; Aquae Calidae is transport-dependent and St. Anastasia is boat-dependent
- Local-only favorites, no account or tracking
- Printable sign proposal and jury demo mode
- PWA manifest, offline explanation, and conservative application-shell service worker
- Zod manifests, Prisma/PostgreSQL schema, migration, and repeatable seed
- Unit, browser, QR decode, and automated accessibility checks

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

## Documentation

- [Architecture](docs/ARCHITECTURE.md)
- [Data and image sources](docs/DATA_SOURCES.md)
- [QR system](docs/QR_SYSTEM.md)
- [3–5 minute jury demo](docs/DEMO_GUIDE.md)
- [Roadmap](docs/ROADMAP.md)
- [Executed QA](docs/QA_REPORT.md)
- [Rendered screenshots](screenshots/)

