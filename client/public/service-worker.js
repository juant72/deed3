// service-worker.js avanzado para PWA
self.addEventListener('install', event => {
    self.skipWaiting();
    event.waitUntil(
        caches.open('static-v1').then(cache => {
            return cache.addAll([
                '/',
                '/index.html',
                '/styles.css',
                '/script.js',
            ]);
        })
    );
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
