
const cacheName = 'cache-v2';
const precacheResources = [
  '/',
  'index.html',
  'styles/main.css',
  'images/Bullslaughter_bay.jpeg',
  'images/a_very_cold_evening.jpeg',
  'images/Snowdonia.jpeg',
  'images/llanberis_path.jpeg',
  'images/Whitesands_Bay.jpeg',
  'images/North_Wales.jpeg'
];

self.addEventListener('install', event => {
  console.log('Service worker install event!');
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  event.respondWith(caches.match(event.request)
    .then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request);
      })
    );
});