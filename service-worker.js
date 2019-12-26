'use strict';

// Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache';

// Add list of files to cache here.
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/js/script.js',
  '/js/service.js',
  '/js/install.js',
  '/css/style.css',
  '/assets/cloud.svg',
  '/assets/cloudy.gif',
  '/assets/afternoon.gif',
  '/assets/clear-night.gif',
  '/assets/clear-night.svg',
  '/assets/default.jpg',
  '/assets/fog.svg',
  '/assets/foggy.gif',
  '/assets/morning.gif',
  '/assets/partly-cloudy-day.gif',
  '/assets/partlyCloudy.svg',
  '/assets/partlyCloudyNight.svg',
  '/assets/raining.gif',
  '/assets/raining.svg',
  '/assets/search.svg',
  '/assets/sleet.gif',
  '/assets/sleet.svg',
  '/assets/snow.gif',
  '/assets/snowing.svg',
  '/assets/sun.svg',
  '/assets/tunder.svg',
  '/assets/windy.svg',
  '/assets/loading.gif'
];

self.addEventListener('install', evt => {
  console.log('[ServiceWorker] Install');
  // Precache static resources here.
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[ServiceWorker] Pre-caching offline page');
      return cache.addAll(FILES_TO_CACHE);
    })
  );

  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  console.log('[ServiceWorker] Activate');
  // Remove previous cached data from disk.
  evt.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  self.clients.claim();
});

self.addEventListener('fetch', evt => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(evt.request).then(response => {
        return response || fetch(evt.request);
      });
    })
  );
  if (evt.request.mode !== 'navigate') {
    // Not a page navigation, bail.
    return;
  }
  evt.respondWith(
    fetch(evt.request).catch(() => {
      return caches.open(CACHE_NAME).then(cache => {
        return cache.match('offline.html');
      });
    })
  );
});