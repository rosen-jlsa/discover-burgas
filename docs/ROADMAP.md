# Roadmap

## Completed MVP

- Original bilingual identity and responsive editorial UI
- Eight sourced location records, including confirmed Eurovision 2027 venue Arena Burgas, and a five-stop central route
- Stable QR redirect, downloadable SVG/PNG codes, and printable proposal
- Localized stories, source disclosure, licensed-image attribution, maps, nearby discovery, directions, and local favorites
- Search, categories, map/list parity, manual geolocation, PWA shell, and offline explanation
- Live Supabase schema, aligned migration history, RLS/grants, server-only writes, abuse limits, 90-day application cleanup, idempotent seed, Python verification, five-viewport test suite, screenshot set, and jury guide

## Deployment gate

- Sign in to Vercel, import the existing GitHub repository, and add the documented environment variables
- Deploy over HTTPS and replace the development base URL with the final Vercel/custom domain
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

