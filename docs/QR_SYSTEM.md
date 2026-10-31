# QR system

## Stable links

Every code points to a language-neutral path:

```text
https://production-domain.example/places/aquae-calidae
```

That route verifies the landmark and redirects to the remembered or browser-preferred language. Historical copy can change without replacing the physical sign because the slug remains stable.

## Generation

Set `NEXT_PUBLIC_APP_BASE_URL` without a trailing slash. Then request:

- `/api/qr/aquae-calidae?format=svg` for print
- `/api/qr/aquae-calidae?format=png` for screen use

Only registered published slugs generate a code. SVG is the preferred print format. The generator uses high error correction, black on white, and a four-module quiet zone.

To add a landmark, add and validate its record, ensure `/{locale}/places/[slug]` builds, deploy it, and only then generate its final QR.

## Printing and testing

Open `/{locale}/demo/sign/[slug]`, print at 100% scale, keep the quiet zone clear, and avoid glossy placement or resizing that blurs modules. The sign includes an explicit competition-proposal disclaimer.

Automated tests decode a generated PNG and compare the result to the configured URL. Before presentation, also scan the final printed sign with ordinary iOS and Android camera apps over the deployed HTTPS site. Localhost QR codes are development-only.

