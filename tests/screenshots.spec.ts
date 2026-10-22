import { test } from "@playwright/test";

const shots = [
  ["homepage-desktop", "/bg", { width: 1440, height: 1000 }],
  ["homepage-mobile", "/bg", { width: 390, height: 844 }],
  ["interactive-map", "/bg/map", { width: 1440, height: 1000 }],
  ["landmark-detail", "/bg/places/aquae-calidae", { width: 1440, height: 1000 }],
  ["arena-burgas", "/bg/places/arena-burgas", { width: 1440, height: 1000 }],
  ["nearby-mobile", "/bg/places/archaeological-museum", { width: 390, height: 844 }],
  ["cultural-route", "/bg/routes/burgas-centre-stories", { width: 1440, height: 1000 }],
  ["qr-demonstration", "/bg/demo", { width: 1280, height: 1000 }],
  ["printable-sign", "/bg/demo/sign/aquae-calidae", { width: 1024, height: 1100 }],
  ["city-story", "/bg/story", { width: 1440, height: 1000 }],
  ["issue-report", "/bg/report", { width: 390, height: 844 }],
  ["admin-gate", "/admin", { width: 1280, height: 900 }]
] as const;

for (const [name, path, viewport] of shots) test(`capture ${name}`, async ({ page }) => {
  await page.setViewportSize(viewport);
  await page.goto(path);
  if (["homepage-desktop", "homepage-mobile", "interactive-map", "landmark-detail", "arena-burgas", "nearby-mobile", "cultural-route"].includes(name)) {
    await page.locator(".leaflet-marker-icon").first().waitFor({ state: "visible" });
  }
  await page.evaluate(() => Array.from(document.images)
    .filter((image) => !image.closest(".leaflet-container"))
    .forEach((image) => { image.loading = "eager"; }));
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((resolve) => window.setTimeout(resolve, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(500);
  const brokenImages = await page.evaluate(() => {
    const images = Array.from(document.images).filter((image) => !image.closest(".leaflet-container"));
    return images.filter((image) => image.complete && image.naturalWidth === 0).map((image) => image.currentSrc || image.src);
  });
  if (brokenImages.length) throw new Error(`Broken screenshot images: ${brokenImages.join(", ")}`);
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
});

test("capture interactive phone guide", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto("/bg");
  const mapStep = page.getByRole("tab", { name: /Виж какво е наблизо/ });
  await mapStep.evaluate((element: HTMLElement) => element.click());
  await page.waitForFunction(() => document.querySelector('[role="tab"][aria-selected="true"]')?.textContent?.includes("Виж какво е наблизо"));
  await page.evaluate(() => {
    const section = document.querySelector<HTMLElement>(".phone-guide-section");
    document.documentElement.style.scrollBehavior = "auto";
    section?.scrollIntoView({ block: "start" });
  });
  await page.waitForTimeout(450);
  await page.screenshot({ path: "screenshots/phone-guide.png" });
});
