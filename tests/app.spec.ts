import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("Bulgarian discovery journey", async ({ page }) => {
  await page.goto("/bg");
  await expect(page.getByRole("heading", { name: /Един град/ })).toBeVisible();
  await page.getByRole("link", { name: "Разгледай картата" }).first().click();
  await expect(page).toHaveURL(/\/bg\/map/);
  await page.getByPlaceholder("Търси място или история…").fill("Акве");
  await expect(page.getByText("Туристически комплекс „Акве Калиде“").first()).toBeVisible();
});

test("Arena Burgas offers universal navigation choices", async ({ page }) => {
  await page.goto("/bg/places/arena-burgas");
  await expect(page.getByRole("heading", { level: 1, name: /Арена Бургас/ })).toBeVisible();
  await expect(page.getByRole("link", { name: /Google Maps/ }).first()).toHaveAttribute("href", /google\.com\/maps\/dir/);
  await expect(page.getByRole("link", { name: /Apple Maps/ }).first()).toHaveAttribute("href", /maps\.apple\.com\/directions/);
  await expect(page.getByRole("link", { name: /Waze/ }).first()).toHaveAttribute("href", /waze\.com\/ul/);
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

test("key public pages have no serious automated accessibility violations", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One full-page audit is sufficient in addition to responsive homepage audits.");
  for (const path of ["/bg/map", "/bg/places/aquae-calidae", "/bg/routes/burgas-centre-stories", "/bg/demo", "/bg/story", "/bg/report", "/bg/privacy"]) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || "")), `Accessibility violations on ${path}`).toEqual([]);
  }
});

test("keyboard users can skip directly to the main content", async ({ page }) => {
  await page.goto("/bg");
  await page.keyboard.press("Tab");
  const skipLink = page.getByRole("link", { name: "Към основното съдържание" });
  await expect(skipLink).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("history story is localized and source-backed", async ({ page }) => {
  await page.goto("/bg/story");
  await expect(page.getByRole("heading", { level: 1, name: "Как Бургас стана Бургас." })).toBeVisible();
  await expect(page.getByRole("link", { name: /Историческа справка/ })).toHaveAttribute("href", /burgas\.bg/);
});

test("visitors can report an issue without an account", async ({ page }) => {
  await page.goto("/bg/report");
  await page.getByLabel("Опиши какво се случи").fill("Тестов сигнал за проверка на формуляра.");
  await page.getByRole("button", { name: "Изпрати сигнал" }).click();
  await expect(page.getByRole("status")).toContainText("Сигналът е записан");
});

test("admin health dashboard stays locked without its token", async ({ page }) => {
  await page.goto("/admin");
  await expect(page.getByRole("heading", { name: "System health" })).toBeVisible();
  await expect(page.getByLabel("Access token")).toBeVisible();
});

test("interactive phone guide explains the four-step journey", async ({ page }) => {
  await page.goto("/bg");
  await page.getByRole("tab", { name: /Виж какво е наблизо/ }).click();
  await expect(page.getByRole("heading", { name: "Наблизо до теб" })).toBeVisible();
  await page.getByRole("tab", { name: /любимата карта/ }).click();
  await expect(page.getByRole("link", { name: /Google Maps/ })).toHaveAttribute("href", /google.com\/maps\/dir/);
});

test("English content declares its language and privacy terms", async ({ page }) => {
  await page.goto("/en/privacy");
  await expect(page.locator('[lang="en"]')).toBeVisible();
  await expect(page.getByRole("heading", { level: 1, name: "Minimal data. A clear purpose." })).toBeVisible();
  await expect(page.getByText(/target maximum of 90 days/)).toBeVisible();
});

test("sensitive routes are no-store and security headers are present", async ({ request }) => {
  const admin = await request.get("/admin");
  expect(admin.headers()["cache-control"]).toContain("no-store");
  expect(admin.headers()["content-security-policy"]).toContain("frame-ancestors 'none'");
  expect(admin.headers()["strict-transport-security"]).toContain("max-age=63072000");
  const reports = await request.get("/api/reports");
  expect(reports.status()).toBe(401);
  expect(reports.headers()["cache-control"]).toContain("no-store");
});

test("service worker never caches API responses", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One production-browser proof is sufficient.");
  await page.goto("/bg");
  await page.evaluate(async () => { await navigator.serviceWorker.ready; await fetch("/api/health"); });
  const cachedPaths = await page.evaluate(async () => {
    const paths: string[] = [];
    for (const name of await caches.keys()) {
      for (const request of await (await caches.open(name)).keys()) paths.push(new URL(request.url).pathname);
    }
    return paths;
  });
  expect(cachedPaths.some((path) => path.startsWith("/api/") || path.startsWith("/admin"))).toBe(false);
});

test("report endpoint rejects bots and rate-limits repeated submissions", async ({ request }, testInfo) => {
  test.skip(testInfo.project.name !== "desktop", "One server-side rate-limit proof is sufficient.");
  const bot = await request.post("/api/reports", { data: { category: "other", page: "/bg", message: "Automated invalid submission", website: "spam.example" } });
  expect(bot.status()).toBe(400);
  const headers = { "x-vercel-forwarded-for": `198.51.100.${20 + Math.floor(Date.now() / 1000) % 180}` };
  for (let index = 0; index < 5; index += 1) {
    const accepted = await request.post("/api/reports", { headers, data: { category: "other", page: "/bg", message: `Rate limit verification report ${index}` } });
    expect(accepted.status()).toBe(201);
  }
  const limited = await request.post("/api/reports", { headers, data: { category: "other", page: "/bg", message: "Rate limit verification report blocked" } });
  expect(limited.status()).toBe(429);
  expect(limited.headers()["retry-after"]).toBe("600");
});
