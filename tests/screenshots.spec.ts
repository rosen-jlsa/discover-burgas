import { test } from "@playwright/test";

const shots = [
  ["homepage-desktop", "/bg", { width: 1440, height: 1000 }],
  ["homepage-mobile", "/bg", { width: 390, height: 844 }],
  ["interactive-map", "/bg/map", { width: 1440, height: 1000 }],
  ["landmark-detail", "/bg/places/aquae-calidae", { width: 1440, height: 1000 }],
  ["nearby-mobile", "/bg/places/archaeological-museum", { width: 390, height: 844 }],
  ["cultural-route", "/bg/routes/burgas-centre-stories", { width: 1440, height: 1000 }],
  ["qr-demonstration", "/bg/demo", { width: 1280, height: 1000 }],
  ["printable-sign", "/bg/demo/sign/aquae-calidae", { width: 1024, height: 1100 }]
] as const;

for (const [name, path, viewport] of shots) test(`capture ${name}`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await page.goto(path);
  if (["homepage-desktop", "homepage-mobile", "interactive-map", "landmark-detail", "nearby-mobile", "cultural-route"].includes(name)) {
    await page.locator(".leaflet-marker-icon").first().waitFor({ state: "visible" });
  }
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => Array.from(document.images).every((image) => image.complete && image.naturalWidth > 0));
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
});
