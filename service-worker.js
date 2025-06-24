const CACHE_NAME = "block-blast-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./spiel.js",
  "./icon.png",
  "./manifest.json"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
