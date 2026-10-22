import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Bulgarian discovery journey", async ({ page }) => {
  await page.goto("/bg");
  await expect(page.getByRole("heading", { name: /Открий историите/ })).toBeVisible();
  await page.getByRole("link", { name: "Разгледай картата" }).first().click();
  await expect(page).toHaveURL(/\/bg\/map/);
  await page.getByPlaceholder("Търси място или история…").fill("Акве");
  await expect(page.getByText("Туристически комплекс „Акве Калиде“").first()).toBeVisible();
});

test("stable QR route redirects and English switch works", async ({ page }) => {
  await page.goto("/places/aquae-calidae");
  await expect(page).toHaveURL(/\/(bg|en)\/places\/aquae-calidae/);
  const currentEnglish = page.url().includes("/en/");
  await page.getByRole("link", { name: currentEnglish ? /BG/ : /EN/ }).click();
  await expect(page).toHaveURL(new RegExp(`/${currentEnglish ? "bg" : "en"}/places/aquae-calidae`));
});

test("favorites persist without an account", async ({ page }) => {
  await page.goto("/bg/places/aquae-calidae");
  await page.getByRole("button", { name: "Запази" }).click();
  await page.reload();
  await expect(page.getByRole("button", { name: "Запазено" })).toBeVisible();
});

test("map keeps a useful fallback when geolocation is denied", async ({ page, context }) => {
  await context.clearPermissions();
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "geolocation", {
      configurable: true,
      value: { getCurrentPosition: (_success: PositionCallback, error: PositionErrorCallback) => error({ code: 1, message: "denied", PERMISSION_DENIED: 1, POSITION_UNAVAILABLE: 2, TIMEOUT: 3 } as GeolocationPositionError) },
    });
  });
  await page.goto("/bg/map");
  await page.getByRole("button", { name: "Около мен" }).click();
  await expect(page.getByRole("status")).toContainText("ръчното разглеждане");
});

test("public APIs validate locale, 404, and QR formats", async ({ request }) => {
  expect((await request.get("/api/places?locale=bg")).ok()).toBeTruthy();
  expect((await request.get("/api/places?locale=de")).status()).toBe(400);
  expect((await request.get("/api/places/not-real")).status()).toBe(404);
  const qr = await request.get("/api/qr/aquae-calidae?format=svg");
  expect(qr.ok()).toBeTruthy(); expect(qr.headers()["content-type"]).toContain("image/svg+xml");
});

test("homepage has no serious automated accessibility violations", async ({ page }) => {
  await page.goto("/bg");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations.filter((v) => ["serious", "critical"].includes(v.impact || ""))).toEqual([]);
});
