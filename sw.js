const CACHE_NAME = "schoolix-shell-v2";
const APP_SHELL = [
  "/", "/index.html", "/offline.html", "/schoolix-app-icon.svg",
  "/schoolix-app.css", "/schoolix-erp.css", "/schoolix-polish.css",
  "/firebase-compat.js", "/supabase-config.js",
];

const isSameOrigin = (url) => url.origin === self.location.origin;
const isApiRequest = (url) => url.pathname.startsWith("/api/") || url.pathname.includes("/.netlify/functions/");
const isVersionedRequest = (url) => /\/(?:version|update)\.json$/.test(url.pathname);
const isStaticAsset = (request) => ["style", "script", "image", "font"].includes(request.destination);

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
    .then(() => self.clients.claim()));
});

async function networkFirst(request, fallback) {
  try {
    const response = await fetch(request);
    if (response?.ok) (await caches.open(CACHE_NAME)).put(request, response.clone());
    return response;
  } catch {
    return (await caches.match(request)) || (fallback ? caches.match(fallback) : Response.error());
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  const network = fetch(request).then((response) => {
    if (response?.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || network || Response.error();
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (!isSameOrigin(url) || isApiRequest(url) || isVersionedRequest(url)) return;
  if (request.mode === "navigate") return event.respondWith(networkFirst(request, "/offline.html"));
  if (isStaticAsset(request)) event.respondWith(staleWhileRevalidate(request));
});
