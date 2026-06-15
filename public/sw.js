// GNAH Service Worker — Network First Strategy
const CACHE_NAME = 'gnah-v2';
const STATIC_CACHE = 'gnah-static-v2';

const STATIC_ASSETS = [
  '/Images/logo/gnah-logo.png',
  '/Images/icons/icon-192.png',
  '/Images/icons/icon-512.png',
  '/manifest.json',
];

// Install
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS).catch(() => {});
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(
        names.filter((n) => n !== CACHE_NAME && n !== STATIC_CACHE)
          .map((n) => caches.delete(n))
      )
    )
  );
  self.clients.claim();
});

// Fetch — NETWORK FIRST for HTML/JS, Cache First for images only
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip non-same-origin
  if (url.origin !== self.location.origin) return;
  
  // IMAGES — Cache first (they don't change often)
  if (/\.(png|jpg|jpeg|gif|webp|svg|ico)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(STATIC_CACHE).then((c) => c.put(event.request, clone));
          }
          return response;
        }).catch(() => cached);
      })
    );
    return;
  }
  
  // ALL OTHER REQUESTS — Network first, NO caching of HTML/JS
  // This ensures React Router works correctly and pages always load fresh
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        return response;
      })
      .catch(() => {
        // Fallback: serve index.html for navigation (SPA)
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html');
        }
        return new Response('', { status: 408 });
      })
  );
});

// Handle update messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
