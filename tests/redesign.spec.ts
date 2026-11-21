import {test,expect} from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
async function loadImages(page: import("@playwright/test").Page) {
 await page.evaluate(()=>{document.querySelectorAll<HTMLImageElement>("img:not(.leaflet-tile)").forEach(im=>{im.loading="eager";});});
 await expect.poll(()=>page.evaluate(()=>Array.from(document.images).filter(im=>!im.classList.contains("leaflet-tile")).every(im=>im.complete&&im.naturalWidth>0)),{timeout:20000}).toBe(true);
}
for(const width of [375,390,768,1024,1440]) test(`homepage layout ${width}`,async({page})=>{
 await page.setViewportSize({width,height:900});
 const errors:string[]=[];page.on("pageerror",e=>errors.push(e.message));
 await page.goto("/bg");
 await expect(page.getByRole("heading",{level:1})).toContainText("Градът отблизо.");
 await expect(page.locator(".aevo-phone-photo img")).toBeVisible();
 await expect.poll(()=>page.locator(".aevo-phone-photo img").evaluate((el:HTMLImageElement)=>el.naturalWidth)).toBeGreaterThan(0);
 await expect(page.getByRole("link",{name:"Разгледай картата"})).toHaveAttribute("href","/bg/map");
 await expect.poll(()=>page.evaluate(()=>document.documentElement.scrollWidth<=window.innerWidth)).toBe(true);
 const axe=await new AxeBuilder({page}).analyze();
 expect(axe.violations.filter(v=>["serious","critical"].includes(v.impact??""))).toEqual([]);
 await loadImages(page);
 await page.screenshot({path:`screenshots/aevo-inspired/home-${width}.png`,fullPage:true});
 expect(errors).toEqual([]);
});
test("phone guide follows scroll in both directions with working destinations",async({page})=>{
 await page.goto("/bg");
 const journey=page.locator(".scroll-journey");
 const scroll=async(progress:number)=>{await journey.evaluate((el,p)=>{window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY+(el.getBoundingClientRect().height-window.innerHeight)*p,behavior:"instant"});},progress);};
 await scroll(.88);
 await expect(journey).toHaveAttribute("data-active-step","3");
 await expect(page.getByRole("link",{name:"Google Maps",exact:true})).toHaveAttribute("href",/google.com\/maps\/dir/);
 await scroll(.05);await expect(journey).toHaveAttribute("data-active-step","0");
 await expect(page.getByRole("link",{name:"Или отвори тук"})).toHaveAttribute("href","/bg/places/archaeological-museum");
});
test("dining category links filter actual sourced places",async({page})=>{
 await page.goto("/bg/eat?category=coffee");
 await expect(page.getByRole("heading",{name:"Ti Bar & Kitchen"})).toBeVisible();
 await expect(page.getByRole("heading",{name:"Neptun Restaurant & Bar"})).toHaveCount(0);
 await page.getByRole("button",{name:"Край морето",exact:true}).click();
 await expect(page.getByRole("heading",{name:"Neptun Restaurant & Bar"})).toBeVisible();
 await expect(page.getByRole("link",{name:"Сайт и меню"})).toHaveAttribute("href","https://www.neptunburgas.com/en/restaurant");
 await expect(page.getByRole("link",{name:"Намери в Google Maps"})).toHaveAttribute("href",/maps\/search\/\?api=1/);
});
test("stays disclose external handoff in both languages",async({page})=>{
 for(const locale of ["bg","en"]){await page.goto(`/${locale}/stay`);await expect(page.getByRole("link",{name:/Booking.com/})).toHaveAttribute("href",/booking.com\/searchresults/);await expect(page.getByRole("link",{name:/Airbnb/})).toHaveAttribute("href",/airbnb.com\/burgas-bulgaria\/stays/);await expect(page.locator(".provider-disclosure")).toBeVisible();}
});
test("map selection exposes details and directions on mobile",async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto("/bg/map");
 await page.getByRole("button",{name:/Археологически музей/}).filter({has:page.locator("strong")}).click();
 await expect(page.locator(".map-selected-card").getByRole("link",{name:"История"})).toHaveAttribute("href","/bg/places/archaeological-museum");
 await expect(page.locator(".map-selected-card").getByRole("link",{name:"Навигация"})).toHaveAttribute("href",/google.com\/maps\/dir/);
});
test("public screens and screenshots",async({page})=>{
 await page.setViewportSize({width:1440,height:1000});
 for(const [name,path] of [["dining","/bg/eat"],["stays","/bg/stay"],["detail","/bg/places/archaeological-museum"],["route","/bg/routes/burgas-centre-stories"],["story","/bg/story"],["demo","/bg/demo"],["english","/en"]]){
  const response=await page.goto(path);expect(response?.status()).toBe(200);
  const axe=await new AxeBuilder({page}).analyze();expect(axe.violations.filter(v=>["serious","critical"].includes(v.impact??"")),path).toEqual([]);
  await loadImages(page);
  await page.screenshot({path:`screenshots/aevo-inspired/${name}.png`,fullPage:true});
 }
});
test("real tiles load and QR remains downloadable",async({page,request})=>{
 await page.goto("/bg/map");
 await expect.poll(()=>page.locator(".leaflet-tile-loaded").evaluateAll(els=>els.filter(e=>(e as HTMLImageElement).naturalWidth>0).length),{timeout:20000}).toBeGreaterThan(0);
 const qr=await request.get("/api/qr/archaeological-museum?format=svg");expect(qr.status()).toBe(200);expect(await qr.text()).toContain("<svg");
});
