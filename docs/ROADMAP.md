# Roadmap

## Completed MVP

- Original bilingual identity and responsive editorial UI
- Seven sourced landmark records and five-stop central route
- Stable QR redirect, downloadable SVG/PNG codes, and printable proposal
- Localized stories, source disclosure, licensed-image attribution, maps, nearby discovery, directions, and local favorites
- Search, categories, map/list parity, manual geolocation, PWA shell, and offline explanation
- Prisma schema/migration/seed, validation, test suite, screenshot set, and jury guide

## Deployment gate

- Provision Neon, run migration and seed, and switch repository reads to Prisma where operational persistence is desired
- Deploy to Vercel over HTTPS and set the final base URL
- Regenerate QR print assets, scan them with real phones, and perform the jury flow on the deployed build
- Repeat current-hours/fees/accessibility verification before any public launch

## Next improvements

- Protected institutional content workflow with review and publication states
- More first-party/licensed photography and structured accessibility information
- Privacy-preserving aggregate QR engagement counts
- Audio guides and accessible audio descriptions
- Valid routing-provider distance/time calculations and public-transport guidance
- Additional municipalities and languages using the existing translation model

## Long-term vision

Partner-supported regional collections, curated educational routes, deeper archival material, richer offline reading, and carefully scoped AR interpretation. None of these are presented as implemented in the MVP.

