import {appVersion} from "@/lib/app-version";
export function GET(){
 const cache=JSON.stringify(`discover-burgas-${appVersion.version}-${appVersion.buildId}`);
 return new Response(`
const CACHE=${cache};
const SHELL=["/bg","/en","/offline","/icon.svg","/icon-192.png","/icon-512.png","/manifest.webmanifest"];
const PUBLIC_NAVIGATION=/^\\/(bg|en)(\\/|$)/;
const PUBLIC_ASSET=/^(\\/_next\\/static\\/|\\/images\\/|\\/icon(?:-\\d+)?\\.(?:svg|png)$|\\/manifest\\.webmanifest$)/;
self.addEventListener("install",event=>{
 event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  for(const path of SHELL){
   const response=await fetch(path,{cache:"reload"});
   if(!response.ok)throw new Error("Offline shell download failed");
   await cache.put(path,response.clone());
   if(path==="/offline"){
    const html=await response.text();
    const files=[...html.matchAll(/(?:src|href)="([^" ]+)"/g)].map(match=>new URL(match[1].replaceAll("&amp;","&"),self.location.origin)).filter(url=>url.origin===self.location.origin&&url.pathname.startsWith("/_next/static/"));
    await cache.addAll([...new Set(files.map(url=>url.href))]);
   }
  }
 })());
});
self.addEventListener("message",event=>{if(event.data?.type==="ACTIVATE_UPDATE")self.skipWaiting();});
self.addEventListener("activate",event=>{
 event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key.startsWith("discover-burgas-")&&key!==CACHE).map(key=>caches.delete(key)))));
 self.clients.claim();
});
self.addEventListener("fetch",event=>{
 const request=event.request;const url=new URL(request.url);
 if(request.method!=="GET"||url.origin!==self.location.origin)return;
 if(url.pathname.startsWith("/api/")||url.pathname.startsWith("/admin"))return;
 if(request.mode==="navigate"){
  if(!PUBLIC_NAVIGATION.test(url.pathname)&&url.pathname!=="/offline")return;
  event.respondWith(fetch(request).then(response=>{
   if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
   return response;
  }).catch(async()=>await caches.match(request)||await caches.match("/offline")));
  return;
 }
 if(!PUBLIC_ASSET.test(url.pathname))return;
 event.respondWith(caches.match(request).then(hit=>hit||fetch(request).then(response=>{
  if(response.ok){const copy=response.clone();event.waitUntil(caches.open(CACHE).then(cache=>cache.put(request,copy)));}
  return response;
 })));
});
`,{headers:{"Content-Type":"application/javascript; charset=utf-8","Cache-Control":"no-store","Service-Worker-Allowed":"/"}});
}
