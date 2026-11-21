import fs from "node:fs/promises";
import sharp from "sharp";

// Explicitly reviewed subjects; never choose a search result automatically.
const selected = {
  "historical-museum":"Исторически музей - един от четирите музея в рамките на Регионалния исторически музей в град Бургас.jpg",
  "burgas-clock":"Burgas City Clock.jpg",
  "ancient-nessebar":"Несебър, южен бряг - Южная набережная Несебра - South shore of Nessebar peninsula - panoramio.jpg",
  "sozopol-archaeological-museum":"Sozopol Arch Museum.jpg",
  "begliktash":"Main Dolmen Begliktash BG.jpg",
  "ropotamo-boat-pier":"Ropotamo (Ропотамо) river - boat.JPG",
  "pomorie-salt-museum":"Pomorie In Salt Museum.jpg",
  "pomorie-ancient-tomb":"Pomorie Thracian tomb E7.jpg",
  "arena-burgas":"Arena Burgas.jpg",
};
const plain = text => (text || "").replace(/<[^>]*>/g, "").replace(/&amp;/g,"&").trim();
const url=new URL("https://commons.wikimedia.org/w/api.php");
url.search=new URLSearchParams({action:"query",titles:Object.values(selected).map(t=>`File:${t}`).join("|"),prop:"imageinfo",iiprop:"url|size|extmetadata",iiurlwidth:"1280",format:"json"});
const response=await fetch(url,{headers:{"User-Agent":"DiscoverBurgas/1.0 licensed cultural photography research"}});
if(!response.ok)throw new Error(`Commons metadata: ${response.status}`);
const data=await response.json();
const pages=Object.values(data.query.pages);
const manifest=JSON.parse(await fs.readFile("src/data/landmark-photos.json","utf8").catch(()=>"{}"));
await fs.mkdir("public/images/landmarks",{recursive:true});
for(const [slug,title] of Object.entries(selected)) {
  if(process.argv.length>2&&!process.argv.slice(2).includes(slug))continue;
  const info=pages.find(p=>p.title===`File:${title}`)?.imageinfo?.[0];
  if(!info)throw new Error(`Missing file: ${title}`);
  const meta=info.extmetadata;
  const license=plain(meta.LicenseShortName?.value);
  if(!/CC BY|CC0|Public domain/.test(license))throw new Error(`Unapproved license: ${title}: ${license}`);
  await new Promise(resolve=>setTimeout(resolve,2000));
  const downloadUrl=new URL(info.thumburl||info.url);
  const photo=await fetch(downloadUrl,{headers:{"User-Agent":"DiscoverBurgas/1.0"},signal:AbortSignal.timeout(20000)});
  if(!photo.ok){console.error(`Download failed ${slug}: ${photo.status}`);continue;}
  const bytes=Buffer.from(await photo.arrayBuffer());
  const path=`/images/landmarks/${slug}.webp`;
  await sharp(bytes).rotate().resize({width:2200,withoutEnlargement:true}).webp({quality:88}).toFile(`public${path}`);
  const creator=plain(meta.Artist?.value);
  manifest[slug]={path,creator,sourceUrl:info.descriptionurl,license,attribution:`${creator} / Wikimedia Commons / ${license} · resized and converted to WebP`,licenseUrl:meta.LicenseUrl?.value||"https://creativecommons.org/publicdomain/zero/1.0/",originalUrl:info.url,width:info.width,height:info.height,retrievedAt:"2026-11-21",caption:plain(meta.ImageDescription?.value)};
  console.log(`${slug}: ${info.width}×${info.height}, ${license}`);
}
await fs.writeFile("src/data/landmark-photos.json",JSON.stringify(manifest,null,2)+"\n");
