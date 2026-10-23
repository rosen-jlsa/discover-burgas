const CACHE = "discover-burgas-v2";
const SHELL = ["/bg", "/en", "/offline", "/icon.svg", "/icon-192.png", "/icon-512.png", "/manifest.webmanifest"];
const PUBLIC_NAVIGATION = /^\/(bg|en)(\/|$)/;
const PUBLIC_ASSET = /^(\/_next\/static\/|\/images\/|\/icon(?:-\d+)?\.(?:svg|png)$|\/manifest\.webmanifest$)/;

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key)))));
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/") || url.pathname.startsWith("/admin")) return;

  if (request.mode === "navigate") {
    if (!PUBLIC_NAVIGATION.test(url.pathname)) return;
    event.respondWith(fetch(request).then((response) => {
      if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
      return response;
    }).catch(() => caches.match(request).then((hit) => hit || caches.match("/offline"))));
    return;
  }

  if (!PUBLIC_ASSET.test(url.pathname)) return;
  event.respondWith(caches.match(request).then((hit) => hit || fetch(request).then((response) => {
    if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
    return response;
  })));
});
