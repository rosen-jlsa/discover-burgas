import {test,expect} from "@playwright/test";
test("search metadata and bilingual sitemap are available",async({page,request})=>{
 await page.goto("/en");await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href",/\/en$/);
 await expect(page.locator('meta[name="description"]')).toHaveAttribute("content",/Discover/);
 const sitemap=await request.get("/sitemap.xml");expect(sitemap.ok()).toBe(true);const xml=await sitemap.text();expect(xml).toContain("/bg/install");expect(xml).toContain('hreflang="bg-BG"');expect(xml).not.toContain("/admin");
 const robots=await request.get("/robots.txt");expect(await robots.text()).toContain("Disallow: /admin");
});
test("configured analytics waits for permission and supports withdrawal",async({page})=>{
 let scripts=0;
 await page.route("https://www.googletagmanager.com/**",async route=>{scripts++;await route.fulfill({contentType:"application/javascript",body:"/* isolated analytics test; no Google requests */"});});
 await page.goto("/en?private_query=do-not-send");const allow=page.getByRole("button",{name:"Allow analytics",exact:true});
 test.skip(await allow.count()===0,"Run a dedicated build with NEXT_PUBLIC_GA_MEASUREMENT_ID=G-TEST123 to exercise configured analytics.");
 await expect(allow).toBeVisible();expect(scripts).toBe(0);
 await allow.click();await expect.poll(()=>scripts).toBe(1);
 await expect.poll(()=>page.evaluate(()=>window.dataLayer?.filter(item=>Array.from(item as ArrayLike<unknown>)[0]==="event").length||0)).toBe(1);
 const queue=await page.evaluate(()=>JSON.stringify(window.dataLayer?.map(item=>Array.from(item as ArrayLike<unknown>))));expect(queue).not.toContain("private_query");
 await page.context().addCookies([{name:"_ga",value:"test",url:page.url()}]);await page.getByRole("button",{name:"Disable analytics",exact:true}).click();await page.waitForLoadState("load");
 await expect(page.getByRole("button",{name:"Allow analytics",exact:true})).toBeVisible();expect(scripts).toBe(1);expect((await page.context().cookies()).some(cookie=>cookie.name==="_ga")).toBe(false);
});
