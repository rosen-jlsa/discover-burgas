import assert from "node:assert/strict";
const base=new URL(process.argv[2]||"http://localhost:3000");
async function get(path){const response=await fetch(new URL(path,base));assert.equal(response.status,200,`${path}: HTTP ${response.status}`);return response.text();}
const robots=await get("/robots.txt");assert.match(robots,/Sitemap: https?:\/\//);assert.match(robots,/Disallow: \/admin/);assert.doesNotMatch(robots,/Disallow: \/\s*$/m);
const sitemap=await get("/sitemap.xml");assert.match(sitemap,/xhtml:link/);assert.match(sitemap,/\/bg\/install/);assert.doesNotMatch(sitemap,/<loc>[^<]*\/(?:api|admin)\b/);
for(const path of ["/bg","/en","/bg/map","/en/map","/bg/places/burgas-clock","/en/places/burgas-clock"]){const html=await get(path);for(const pattern of [/<title>[^<]+<\/title>/,/name="description" content="[^"]+"/,/rel="canonical"/,/hrefLang="(?:bg-BG|bg)"/])assert.match(html,pattern,`${path}: missing metadata ${pattern}`);assert.doesNotMatch(html,/<meta[^>]+name="robots"[^>]+content="[^"]*noindex/);console.log(`OK ${path}: title, description, canonical and language alternates`);}
console.log(`SEO smoke checks passed for ${base.origin}. This does not verify account ownership, indexing or PageSpeed scores.`);
