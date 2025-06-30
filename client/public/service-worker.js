// service-worker.js básico para PWA
self.addEventListener('install', event => {
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
    // Estrategia: network first
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});
