import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(projectRoot, "screenshots", "aevo-inspired");
const baseUrl = process.env.PREVIEW_BASE_URL || "http://localhost:3001";

const captures = [
  { name: "home-1440.png", route: "/bg", width: 1440, height: 1000 },
  { name: "home-390.png", route: "/bg", width: 390, height: 844, fullPage: true },
  { name: "home-375.png", route: "/bg", width: 375, height: 844, fullPage: true },
  { name: "home-768.png", route: "/bg", width: 768, height: 900, fullPage: true },
  { name: "home-1024.png", route: "/bg", width: 1024, height: 900, fullPage: true },
  { name: "map-1440.png", route: "/bg/map", width: 1440, height: 980 },
  { name: "map-full.png", route: "/bg/map", width: 1440, height: 980, fullPage: true },
  { name: "map-390.png", route: "/bg/map", width: 390, height: 844, fullPage: true },
  { name: "detail.png", route: "/bg/places/archaeological-museum", width: 1440, height: 980 },
  { name: "demo.png", route: "/bg/demo", width: 1440, height: 980 },
  { name: "demo-full.png", route: "/bg/demo", width: 1440, height: 980, fullPage: true },
  { name: "demo-390.png", route: "/bg/demo", width: 390, height: 844, fullPage: true },
  { name: "route.png", route: "/bg/routes/burgas-centre-stories", width: 1440, height: 980 },
  { name: "route-full.png", route: "/bg/routes/burgas-centre-stories", width: 1440, height: 980, fullPage: true },
  { name: "route-390.png", route: "/bg/routes/burgas-centre-stories", width: 390, height: 844, fullPage: true },
  { name: "regional-detail.png", route: "/bg/places/ancient-nessebar", width: 1440, height: 980 },
  { name: "regional-route.png", route: "/bg/routes/south-coast-discovery", width: 1440, height: 980 },
  { name: "dining.png", route: "/bg/eat", width: 1440, height: 980 },
  { name: "dining-full.png", route: "/bg/eat", width: 1440, height: 980, fullPage: true },
  { name: "dining-390.png", route: "/bg/eat", width: 390, height: 844, fullPage: true },
  { name: "stays.png", route: "/bg/stay", width: 1440, height: 980 },
  { name: "stays-full.png", route: "/bg/stay", width: 1440, height: 980, fullPage: true },
  { name: "stays-390.png", route: "/bg/stay", width: 390, height: 844, fullPage: true },
  { name: "story.png", route: "/bg/story", width: 1440, height: 980 },
  { name: "story-full.png", route: "/bg/story", width: 1440, height: 980, fullPage: true },
  { name: "story-390.png", route: "/bg/story", width: 390, height: 844, fullPage: true },
];

await mkdir(outputDirectory, { recursive: true });
const browser = await chromium.launch({ headless: true });
const selectedCaptures = process.env.CAPTURE_ONLY ? captures.filter((capture) => capture.name.startsWith(process.env.CAPTURE_ONLY)) : captures;

try {
  for (const capture of selectedCaptures) {
    const page = await browser.newPage({ viewport: { width: capture.width, height: capture.height } });
    const response = await page.goto(new URL(capture.route, baseUrl).toString(), { waitUntil: "domcontentloaded" });
    if (!response?.ok()) throw new Error(`${capture.route} returned ${response?.status() ?? "no response"}`);

    await page.evaluate(async (fullPage) => {
      await document.fonts.ready;
      document.querySelectorAll("img").forEach((image) => { image.loading = "eager"; });
      const pause = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));
      const pageHeight = document.documentElement.scrollHeight;
      for (let y = 0; y < pageHeight; y += Math.max(500, window.innerHeight * 0.72)) {
        window.scrollTo(0, y);
        await pause(140);
      }
      await Promise.all([...document.images].map((image) => image.decode().catch(() => undefined)));
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
      if (document.activeElement instanceof HTMLElement) document.activeElement.blur();
      for (let attempt = 0; attempt < 4 && window.scrollY !== 0; attempt += 1) {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        await pause(30);
      }
      const header = document.querySelector(".site-header");
      if (fullPage && header instanceof HTMLElement) { header.style.position = "relative"; header.style.top = "auto"; }
      const skipLink = document.querySelector(".skip-link");
      if (skipLink instanceof HTMLElement) { skipLink.style.transition = "none"; skipLink.style.display = "none"; }
      await pause(120);
    }, Boolean(capture.fullPage));

    await page.screenshot({ path: path.join(outputDirectory, capture.name), fullPage: Boolean(capture.fullPage), animations: "disabled" });
    await page.close();
    process.stdout.write(`Captured ${capture.route} → screenshots/aevo-inspired/${capture.name}\n`);
  }
} finally {
  await browser.close();
}
