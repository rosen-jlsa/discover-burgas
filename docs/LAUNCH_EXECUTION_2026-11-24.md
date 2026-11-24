# Launch execution — 24 November 2026

## External setup actually performed

- Added the URL-prefix property `https://discover-burgas.vercel.app/` in Google Search Console under the owner's signed-in Google account. Ownership remains pending deployment of its verification metadata.
- Added the same website in Bing Webmaster Tools. Ownership remains pending deployment of its verification metadata.
- Created a separate GA4 property named Discover Burgas and a Web stream named Discover Burgas Web. Stream ID: 16407230808; Measurement ID: G-9VES43YN2C. Enhanced Measurement is OFF. A separate existing Firebase property was not modified.
- Saved GOOGLE_SITE_VERIFICATION, BING_SITE_VERIFICATION and NEXT_PUBLIC_GA_MEASUREMENT_ID as Production Config variables in the existing Vercel project. Vercel confirmed successful save and requires a new production deployment.
- Pushed PWA, search and journey-selector commits to feature/backend-production-core; Vercel built the branch preview.
- Created and email-verified an AlternativeTo user account. Prepared a truthful application draft, then checked the geographic policy: single-city/regional applications are explicitly excluded. No application was submitted and no review/priority fee was paid. The draft is not a listing. Do not claim an approved listing.

## Observed PageSpeed baseline

Report: https://pagespeed.web.dev/analysis/https-discover-burgas-vercel-app-bg/hl8upqleookfww8ces21d9?form_factor=mobile

Captured 24 November 2026 at 18:57 Europe/Sofia, Lighthouse 13.6.0. Target was the older active production homepage, not the new branch design.

| Category / metric | Mobile | Desktop |
|---|---:|---:|
| Performance | 98 | 93 |
| Accessibility | 97 | 100 |
| Best Practices | 96 | 96 |
| SEO | 100 | 100 |
| LCP | 2.3 s | 0.5 s |
| CLS | 0 | 0.157 |

No CrUX field data was available. These are single-run lab measurements, not guaranteed scores or a claim of full accessibility. Follow-up findings: desktop layout shift, mobile touch-target spacing, CSS/JS/image delivery and CSP diagnostics. Retest after production is updated.

## Design increment

Kept Discover Burgas's violet, magenta and white identity and Aevo-style phone storytelling. Added an original two-column discovery collection: large authentic landmark photograph; three accessible journey choices; real ordered stops; transport disclosure; and a direct route CTA. Adopted Velorum's product-selection clarity without copying Shopify code, assets, reviews, offers or the green palette. Added horizontal clipping for the scroll journey's decorative overflow while preserving vertical sticky behavior.

Validation: build and lint passed before the collection regression run. The 145-check browser run had 113 passes, 29 skips and 3 failures exposing horizontal overflow in the existing scroll section. Fixed that overflow, rebuilt successfully and reran the five affected viewport tests: all passed. Screenshots in screenshots/collection are actual rendered UI. Later concurrent working-tree changes to PhoneJourney and its own tests are separate work, not part of this increment's validation.

## Remaining gates

1. Publish the latest tested commit with Production environment values; verify the main domain's actual /api/version and metadata.
2. Click Verify in Google/Bing, then submit the live /sitemap.xml and record acceptance. Submission does not guarantee indexing.
3. Test real Analytics collection after visitor opt-in and confirm GA4 retention/advertising settings; do not report data collection active before observing it.
4. Google Business Profile: owner must establish a real eligible in-person business. An online-only prototype is not eligible; no address, office or institutional relationship has been invented.
5. Physical Android/iPhone QR, navigation and installation tests remain owner/device checks. Desktop browser emulation cannot replace these.
6. Select a directory that accepts regional web guides; AlternativeTo is unsuitable under its published geographic rules. Do not fabricate reviews or listings.
