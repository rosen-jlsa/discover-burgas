# Rendered presentation assets

These PNG files were captured from the actual production build with Playwright on 22 October 2026. Map captures wait for rendered Leaflet markers and retain OpenStreetMap attribution. Recreate them with `npm run screenshots` after `npm run build`.

## Product-led redesign — 1 November 2026

`aevo-inspired/` contains fresh captures from the actual production build on `localhost:3001`: homepage widths 375, 390, 768, 1024, and 1440 px, plus the map, landmark detail, jury demo, central and regional routes, a regional landmark, dining, and stay pages. The mobile homepage capture is full-page; the desktop hero and secondary pages show the initial screen at 1440 × 980. These are actual rendered application screenshots, not mockups.

Regenerate the current set after starting the built app with `npm run screenshots:design`. Set `PREVIEW_BASE_URL` to another local or deployed origin when needed. The capture script scrolls to load lazy images before returning to the top for each screenshot.

`atlas/` preserves the immediately previous design iteration for reference; it is not the current visual direction.

