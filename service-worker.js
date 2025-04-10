self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate');
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
