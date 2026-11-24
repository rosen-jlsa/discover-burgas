# Search, measurement and launch readiness

Prepared 24 November 2026. Code readiness is distinct from account verification, deployment and search indexing. No external registrations or reviews were submitted in this work.

| Item | Repository support | Launch action / evidence needed |
|---|---|---|
| Google Search Console | Optional Google verification metadata | Owner adds HTTPS URL-prefix property, copies HTML content token into GOOGLE_SITE_VERIFICATION, deploys and verifies. Domain properties require DNS ownership instead. |
| Sitemap submission | Generated /sitemap.xml, both languages and published landmarks/routes; installation page and reciprocal language alternates | Submit exact canonical sitemap URL in Google Search Console after deployment. Check fetch status; submission does not guarantee indexing. |
| Bing Webmaster Tools | Optional msvalidate.01 metadata | Add/import owned site, set BING_SITE_VERIFICATION, deploy, verify and submit sitemap. |
| robots.txt | Allows public pages, references sitemap, excludes /api/ and /admin | Fetch production /robots.txt and ensure hosting has no accidental X-Robots-Tag: noindex. Robots exclusions are not authentication. |
| Google Analytics 4 | Optional G- ID, explicit opt-in, localized controls and withdrawal; no script without permission | Create property/web stream, set NEXT_PUBLIC_GA_MEASUREMENT_ID, rebuild. Disable Enhanced Measurement automatic pageviews/history and other automatic events: this application sends manual sanitized pageviews. Turn off Google Signals/advertising features, choose minimal retention, document actual controller/retention and validate consent with Tag Assistant/DebugView. No account/property has been created here. |
| Google Business Profile | No fabricated business listing | Only pursue if the operator actually qualifies as an in-person customer-facing business or service-area business. A website-only tourism guide is not sufficient. Never use a landmark/municipal address as the app's office. |
| Titles/descriptions | Localized homepage, discovery and landmark metadata, canonicals and language alternates | Run SEO smoke check, review remaining secondary pages and search snippets. Google may rewrite snippets. |
| Phone testing | Existing automated 375/390 px browser checks | Real Android Chrome and iPhone Safari: QR scan → story → map → directions → favorite → offline → installation/update. Record model, OS, browser and actual outcomes. Viewport emulation is not physical-device testing. |
| PageSpeed Insights | Repeatable URL handoff and smoke script | Run production homepage, map and landmark on mobile and desktop; save actual reports/date. Cold load, map tiles, photographs and consent states matter. No score is asserted here. |
| Review/directory listings | Source-backed platform description below | Identify relevant directories with actual software/travel-guide categories. Check eligibility, terms, fees and ownership. Submit truthful operator details only after release; no fake reviews, paid link farms or claiming listings exist. |

## Commands and URLs

```sh
npm run build
npm start
node scripts/check-seo.mjs http://localhost:3000
node scripts/check-seo.mjs https://discover-burgas.vercel.app
```

Final origin is set by NEXT_PUBLIC_APP_BASE_URL. Verify the deployed version with /api/version before submitting old URLs. Verification values are public tokens, not API secrets; paste only the HTML tag's content value. These variables require a rebuild/deployment.

- Search Console: https://search.google.com/search-console
- Bing: https://www.bing.com/webmasters/
- PageSpeed: https://pagespeed.web.dev/analysis?url=https%3A%2F%2Fdiscover-burgas.vercel.app%2Fbg
- GA4: https://analytics.google.com/
- Sitemap: https://discover-burgas.vercel.app/sitemap.xml

Directory description to adapt after checking each service's rules: “Discover Burgas is an independent Bulgarian/English cultural discovery web application. QR signs open sourced landmark stories, photographs, nearby places and maps. Visitors can follow cultural routes and save selected stories offline without an account.” Do not describe it as an official municipal or Eurovision product.

## rust-anything assessment

Reviewed https://github.com/erkamyaman/rust-anything and its README. This MIT-licensed tool supports incremental migration to Rust with recorded behavior/differential verification, including HTTP servers, CLIs and libraries. It is not an SEO, analytics or map integration. It has not been installed or executed.

Decision: retain Next.js/TypeScript and Supabase. There is no measured CPU bottleneck or Rust migration requirement here. The useful idea is behavior-preserving verification, already reflected in our API/browser regression tests. Revisit an isolated Rust component only after profiling establishes a bottleneck and a benchmark justifies deployment and maintenance costs; no promised performance gain.

## Official references

- https://developers.google.com/search/docs/monitor-debug/search-console-start
- https://support.google.com/webmasters/answer/9008080
- https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
- https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b
- https://developers.google.com/analytics/devguides/collection/ga4/views
- https://support.google.com/business/answer/3038177

Remaining owner dependencies: account access/verification tokens, deployed current release, GA property settings if enabled, real-device results, actual PageSpeed reports and eligible directory submissions. No public or paid operation is implied by this checklist.
