# Jury demo: 3–5 minutes

## Preparation

Open `/bg/demo` on the presentation computer. Keep the Aquae Calidae sign open on a second screen or printed sheet. Use a phone on mobile data as well as venue Wi-Fi. Keep `/bg/map` available as the geolocation-denied fallback.

Before the jury session, confirm that `NEXT_PUBLIC_APP_BASE_URL` is the final HTTPS domain, regenerate the QR, scan it with a real phone camera, and verify all three external navigation choices. Do not present a localhost QR.

## Flow

**0:00–0:30 — The problem.** On the homepage, explain that people often stand beside a meaningful place without an immediate, trustworthy story or a practical next stop.

**0:30–1:00 — One product, one journey.** Show the four-step phone guide: QR sign → story → map → next destination. Stress that there is no install or registration.

**1:00–1:50 — The real QR.** Open the printable Aquae Calidae sign and scan it with the phone. Show that the stable `/places/aquae-calidae` address resolves to the localized page. Point out the verified story, source cards, image credit, visitor-information uncertainty state and external navigation choices.

**1:50–2:30 — From a place to the city.** Open the map. Search for “Акве”, switch between map and list, then choose “Бургас”. Explain that the same validated record powers the QR, story, map marker, search and directions.

**2:30–3:25 — From Burgas to the region.** Choose “Около Бургас”. Open **Старинен Несебър** and show the UNESCO source, then briefly open **Посетителски пристан при резерват „Ропотамо“**. Explain why the product marks the permitted visitor pier rather than an arbitrary point inside a strict reserve.

**3:25–4:10 — Transport-honest routes.** Open the south-coast route. Show that it is labelled mixed transport, not walking. Mention the separate north-coast driving route and the unchanged central Burgas walking route.

**4:10–4:40 — Credibility and scale.** Close with fourteen bilingual records, nullable operational data, source provenance, licensed imagery or honest fallbacks, accessible list mode and stable QR slugs. Explain that the architecture scales across the Burgas region without becoming an unsourced tourism directory.

## Fallbacks

- If location is denied, show the localized manual-browsing message and use list view.
- If tiles fail, use the adjacent landmark list and directions links.
- If Wi-Fi fails, show previously loaded pages and the offline explanation; do not claim offline maps.
- If phone scanning is unavailable, click the visible QR destination from demo mode while stating it is the same URL encoded in the code.
- If a seasonal service is unavailable, do not improvise a schedule. Show the official source link and the honest empty visitor-information state.

