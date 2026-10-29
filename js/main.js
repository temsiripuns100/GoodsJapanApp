/**
 * Goods Japan — เมนูมือถือ + นับถอยหลังวันเปิดร้าน
 */
(function () {
  'use strict';

  // เมนูมือถือ
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // นับถอยหลัง Grand Opening (7 พ.ย. 2569 09:00 น. เวลาไทย)
  var OPEN_AT = new Date('2026-11-07T09:00:00+07:00').getTime();
  var boxes = document.querySelectorAll('[data-countdown]');
  if (!boxes.length) return;

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function tick() {
    var left = OPEN_AT - Date.now();
    boxes.forEach(function (box) {
      if (left <= 0) {
        box.innerHTML = '<p style="font-size:1.2rem;font-weight:700;color:#fff">ร้านเปิดแล้ว แวะมาได้เลย เปิด 09:00 – 21:00 น.</p>';
        return;
      }
      var d = Math.floor(left / 864e5);
      var h = Math.floor(left / 36e5) % 24;
      var m = Math.floor(left / 6e4) % 60;
      var s = Math.floor(left / 1e3) % 60;
      box.innerHTML =
        '<div><b>' + d + '</b><span>วัน</span></div>' +
        '<div><b>' + pad(h) + '</b><span>ชั่วโมง</span></div>' +
        '<div><b>' + pad(m) + '</b><span>นาที</span></div>' +
        '<div><b>' + pad(s) + '</b><span>วินาที</span></div>';
    });
    if (left > 0) setTimeout(tick, 1000);
  }
  tick();
})();
