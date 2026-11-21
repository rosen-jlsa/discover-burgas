import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
const base=process.env.PREVIEW_BASE_URL||"http://127.0.0.1:3002";
await mkdir("screenshots/release-nov21",{recursive:true});
const browser=await chromium.launch();
try {
  for(const width of [390,1440]) {
    const page=await browser.newPage({viewport:{width,height:width===390?844:1000},reducedMotion:"reduce"});
    await page.goto(`${base}/bg`);await page.waitForLoadState("networkidle");
    await page.screenshot({path:`screenshots/release-nov21/home-${width}.png`});
    for(const [step,progress] of [[0,.05],[1,.35],[2,.6],[3,.88]]) {
      const section=page.locator(".scroll-journey");
      await section.evaluate((el,p)=>window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+(el.offsetHeight-window.innerHeight)*p,behavior:"instant"}),progress);
      await page.waitForFunction(step=>document.querySelector(".scroll-journey")?.getAttribute("data-active-step")===String(step),step);
      await page.screenshot({path:`screenshots/release-nov21/journey-${width}-${step}.png`});
    }
    await page.goto(`${base}/bg/places/ancient-nessebar`);await page.waitForLoadState("networkidle");
    await page.screenshot({path:`screenshots/release-nov21/landmark-${width}.png`});
    await page.close();
  }
}finally{await browser.close();}
