import {test,expect} from "@playwright/test";
import {createServer} from "node:http";
test("install instructions and version/asset-links are available",async({page,request})=>{
 await page.goto("/en/install");await expect(page.getByRole("heading",{name:"Burgas. On your screen."})).toBeVisible();
 for(const name of ["Android","iPhone and iPad","Windows and Linux","macOS"])await expect(page.getByRole("heading",{name,exact:true})).toBeVisible();
 const version=await request.get("/api/version");expect(version.headers()["cache-control"]).toBe("no-store");expect((await version.json()).version).toBe("1.1.0");
 const links=await request.get("/.well-known/assetlinks.json");expect(links.ok()).toBe(true);expect((await links.json())[0].target.package_name).toBe("com.discoverburgas.guide");
});
test("browser install prompt is used only after a click",async({page})=>{
 await page.goto("/bg/install");await page.waitForLoadState("networkidle");
 await page.evaluate(()=>{const event=new Event("beforeinstallprompt");Object.assign(event,{prompt:async()=>{document.body.dataset.installPrompt="requested";},userChoice:Promise.resolve({outcome:"accepted"})});window.dispatchEvent(event);});
 await page.getByRole("button",{name:"Инсталирай Discover Burgas"}).click();await expect(page.locator("body")).toHaveAttribute("data-install-prompt","requested");
});
test("downloaded story and photo survive offline reload and can be removed",async({page,context})=>{
 await page.goto("/bg/places/ancient-nessebar");await page.evaluate(()=>navigator.serviceWorker.ready);
 await page.getByRole("button",{name:"Запази за офлайн",exact:true}).click();await expect(page.getByRole("button",{name:"Запазено за офлайн",exact:true})).toBeVisible();
 await page.goto("/offline");await page.locator("summary").filter({hasText:"Старинен Несебър"}).click();
 await expect(page.locator(".offline-story-photo")).toBeVisible();
 await context.setOffline(true);await page.reload();await page.locator("summary").filter({hasText:"Старинен Несебър"}).click();
 await expect.poll(()=>page.locator(".offline-story-photo").evaluate((image:HTMLImageElement)=>image.naturalWidth)).toBeGreaterThan(0);
 await expect(page.getByText("UNESCO",{exact:false}).first()).toBeVisible();
 await page.getByRole("button",{name:"Изтрий от устройството"}).click();await expect(page.locator("summary")).toHaveCount(0);
});
test("blocked storage produces an actionable error",async({page})=>{
 await page.addInitScript(()=>{Object.defineProperty(window,"indexedDB",{get(){throw new DOMException("Blocked","SecurityError");}});});
 await page.goto("/bg/places/burgas-clock");await page.getByRole("button",{name:"Запази за офлайн",exact:true}).click();await expect(page.getByRole("status").filter({hasText:"Провери връзката"})).toBeVisible();
});
test("a new worker waits for Update and preserves local data",async({page})=>{
 test.setTimeout(60000);
 let release="a";
 const proxy=createServer(async(req,res)=>{
  try{const response=await fetch(`http://localhost:3000${req.url}`);const headers=Object.fromEntries(response.headers);delete headers["content-encoding"];delete headers["content-length"];let body=Buffer.from(await response.arrayBuffer());if(req.url?.startsWith("/sw.js"))body=Buffer.from(body.toString().replace(/const CACHE=.*?;/,`const CACHE="discover-burgas-test-${release}";`));res.writeHead(response.status,headers);res.end(body);}catch{res.writeHead(502);res.end();}
 });
 await new Promise<void>(resolve=>proxy!.listen(0,"127.0.0.1",resolve));const address=proxy.address();if(!address||typeof address==="string")throw new Error("Proxy failed");
 try{
  await page.goto(`http://127.0.0.1:${address.port}/bg/install`);await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.waitForFunction(()=>Boolean(navigator.serviceWorker.controller));
  await page.evaluate(()=>localStorage.setItem("pwa-preservation-test","saved"));
  release="b";await page.evaluate(async()=>{const registration=await navigator.serviceWorker.getRegistration();await registration?.update();});
  await expect(page.getByRole("button",{name:"Обнови",exact:true})).toBeVisible();
  await Promise.all([page.waitForEvent("load"),page.getByRole("button",{name:"Обнови",exact:true}).click()]);
  expect(await page.evaluate(()=>localStorage.getItem("pwa-preservation-test"))).toBe("saved");
  await expect(page.getByRole("button",{name:"Обнови",exact:true})).toHaveCount(0);
 }finally{proxy.closeAllConnections();await new Promise<void>(resolve=>proxy!.close(()=>resolve()));}
});
