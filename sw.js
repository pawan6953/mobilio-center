const CACHE_NAME = 'mobilio-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/brands.html',
  '/about.html',
  '/cart.html',
  '/style.css',
  '/main.js',
  '/images/iphone15pro.jpg',
  '/images/iphone15.jpg',
  '/images/iphone14pro.jpg',
  '/images/iphone14.jpg',
  '/images/iphone13pro.jpg',
  '/images/iphone13.jpg',
  '/images/s25ultra.jpg',
  '/images/s25+.jpg',
  '/images/s25.jpg',
  '/images/s24ultra.jpg',
  '/images/s24+.jpg',
  '/images/s24.jpg',
  '/images/s24fe.jpg',
  '/images/s23ultra.jpg',
  '/images/s23+.jpg',
];

// Install - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate - delete old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch - serve from cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
      .catch(() => new Response('<h1>Offline</h1>', { headers: { 'Content-Type': 'text/html' } }))
  );
});
