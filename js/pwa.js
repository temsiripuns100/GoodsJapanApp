/**
 * Goods Japan – ติดตั้งเป็นแอป (PWA)
 * 1) ลงทะเบียน service worker (sw.js) ให้เปิดได้เร็วและเปิดได้ตอนเน็ตหลุด
 * 2) โชว์แถบ "ติดตั้งแอป" ด้านล่างจอ เมื่อมือถือพร้อมติดตั้ง (Android/Chrome)
 *    และคำแนะนำสั้นๆ สำหรับ iPhone (Safari ไม่มีปุ่มติดตั้งอัตโนมัติ)
 */
(function () {
  'use strict';

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function (err) {
        console.warn('Service worker ไม่ทำงาน:', err);
      });
    });
  }

  var isStandalone =
    window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
  if (isStandalone) return; // เปิดจากแอปอยู่แล้ว ไม่ต้องชวนติดตั้ง

  var SNOOZE_KEY = 'gj-install-dismissed-at';
  var SNOOZE_DAYS = 7;

  function snoozed() {
    try {
      var t = Number(localStorage.getItem(SNOOZE_KEY) || 0);
      return Date.now() - t < SNOOZE_DAYS * 864e5;
    } catch (e) {
      return false;
    }
  }
  function snooze() {
    try { localStorage.setItem(SNOOZE_KEY, String(Date.now())); } catch (e) {}
  }

  var css = '' +
    '.gj-install{position:fixed;left:12px;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));' +
    'z-index:9999;display:flex;align-items:center;gap:12px;max-width:480px;margin:0 auto;padding:12px 12px 12px 14px;' +
    'background:var(--jp-navy,#1B2A4A);color:#fff;border-radius:16px;box-shadow:0 12px 32px rgba(27,42,74,.28);' +
    'font-family:"Noto Sans Thai",system-ui,sans-serif;transform:translateY(140%);transition:transform .35s cubic-bezier(.2,.8,.2,1)}' +
    '.gj-install.show{transform:none}' +
    '.gj-install img{width:44px;height:44px;flex:none;border-radius:50%}' +
    '.gj-install .gj-txt{flex:1;min-width:0;line-height:1.35}' +
    '.gj-install b{display:block;font-size:.98rem;font-weight:700}' +
    '.gj-install span{display:block;font-size:.8rem;opacity:.8}' +
    '.gj-install .gj-go{flex:none;border:0;border-radius:999px;padding:10px 16px;font:inherit;font-weight:700;font-size:.9rem;' +
    'background:var(--jp-red,#C41E3A);color:#fff;cursor:pointer}' +
    '.gj-install .gj-go:hover{background:var(--jp-red-hover,#A3182E)}' +
    '.gj-install .gj-x{flex:none;width:32px;height:32px;border:0;border-radius:50%;background:transparent;color:#fff;' +
    'opacity:.7;font-size:20px;line-height:1;cursor:pointer}' +
    '.gj-install button:focus-visible{outline:2px solid var(--jp-gold,#D4AF37);outline-offset:2px}' +
    '@media (prefers-reduced-motion:reduce){.gj-install{transition:none}}';

  function buildBar(title, sub, actionLabel) {
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var bar = document.createElement('div');
    bar.className = 'gj-install';
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'ติดตั้งแอป Goods Japan');
    bar.innerHTML =
      '<img src="assets/icons/icon-192.png" alt="">' +
      '<div class="gj-txt"><b>' + title + '</b><span>' + sub + '</span></div>' +
      (actionLabel ? '<button type="button" class="gj-go">' + actionLabel + '</button>' : '') +
      '<button type="button" class="gj-x" aria-label="ปิด">×</button>';
    document.body.appendChild(bar);
    requestAnimationFrame(function () { bar.classList.add('show'); });

    bar.querySelector('.gj-x').addEventListener('click', function () {
      snooze();
      hide(bar);
    });
    return bar;
  }

  function hide(bar) {
    if (!bar) return;
    bar.classList.remove('show');
    setTimeout(function () { bar.remove(); }, 400);
  }

  // Android / Chrome / Edge / Samsung Internet
  var deferredPrompt = null;
  var bar = null;

  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault();
    deferredPrompt = e;
    if (snoozed() || bar) return;
    bar = buildBar('ติดตั้งแอป Goods Japan', 'ดูของเข้าใหม่และโปรได้จากหน้าจอมือถือ', 'ติดตั้ง');
    bar.querySelector('.gj-go').addEventListener('click', function () {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then(function (choice) {
        if (choice.outcome !== 'accepted') snooze();
        deferredPrompt = null;
        hide(bar);
        bar = null;
      });
    });
  });

  window.addEventListener('appinstalled', function () {
    hide(bar);
    bar = null;
    deferredPrompt = null;
  });

  // iPhone / iPad (Safari): ไม่มี beforeinstallprompt ต้องบอกวิธีเอง
  var ua = window.navigator.userAgent;
  var isIOS = /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  var isSafari = /safari/i.test(ua) && !/crios|fxios|edgios|line\//i.test(ua);
  if (isIOS && isSafari && !snoozed()) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        if (!bar) bar = buildBar('เพิ่ม Goods Japan ลงหน้าจอ', 'กดปุ่มแชร์ แล้วเลือก "เพิ่มไปยังหน้าจอโฮม"', '');
      }, 2500);
    });
  }
})();
