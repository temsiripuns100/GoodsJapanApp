/**
 * Goods Japan – Service Worker
 * - หน้าเว็บ (HTML): ดึงจากเน็ตก่อน ถ้าออฟไลน์ใช้ของที่เก็บไว้ ไม่มีก็แสดง offline.html
 * - CSS / JS / รูป: ใช้ของในเครื่องก่อน แล้วอัปเดตเบื้องหลัง
 * เวลาแก้ไฟล์เว็บแล้วอยากให้แอปโหลดของใหม่ทันที ให้เปลี่ยนเลข VERSION ด้านล่าง
 */
const VERSION = 'gj-v1-2026-10-29';
const CORE_CACHE = `${VERSION}-core`;
const RUNTIME_CACHE = `${VERSION}-runtime`;

const CORE_FILES = [
  './',
  './index.html',
  './shop.html',
  './promotions.html',
  './location.html',
  './about.html',
  './offline.html',
  './manifest.webmanifest',
  './css/style.css',
  './css/animations.css',
  './css/responsive.css',
  './js/main.js',
  './js/sakura.js',
  './js/products.js',
  './js/promotions.js',
  './js/animations.js',
  './js/pwa.js',
  './assets/images/logo.png',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CORE_CACHE)
      // โหลดทีละไฟล์ ไฟล์ไหนหายก็ข้ามไป ไม่ทำให้ติดตั้งล้ม
      .then((cache) => Promise.all(CORE_FILES.map((url) => cache.add(url).catch(() => null))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => !k.startsWith(VERSION)).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // หน้าเว็บ: network first
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          return res;
        })
        .catch(async () =>
          (await caches.match(req, { ignoreSearch: true })) ||
          (await caches.match('./offline.html'))
        )
    );
    return;
  }

  // ไฟล์ในเว็บเรา + Google Fonts: cache first แล้วอัปเดตเบื้องหลัง
  const sameOrigin = url.origin === self.location.origin;
  const isFont = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!sameOrigin && !isFont) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const fresh = fetch(req)
        .then((res) => {
          if (res && (res.ok || res.type === 'opaque')) {
            const copy = res.clone();
            caches.open(RUNTIME_CACHE).then((c) => c.put(req, copy));
          }
          return res;
        })
        .catch(() => cached);
      return cached || fresh;
    })
  );
});
