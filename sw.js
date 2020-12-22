const cacheName = 'v1';
const cacheAssets = [
    '/',
];

self.addEventListener('install', e => {
  console.log('Install');
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Cache');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  console.log('Activate');
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', e => {
  console.log('Fetch');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});