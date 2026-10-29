/**
 * Goods Japan — สินค้าในร้าน + รายการจอง
 * ข้อมูลสินค้ามาจาก js/catalog-data.js (สร้างจากชีต GoodsJapan_Catalog_v3)
 */
(function () {
  'use strict';

  var DATA = window.GJ_CATALOG || [];
  var FB = 'https://www.facebook.com/profile.php?id=61595247456619';
  var PHONE = '080-101-2332';
  var PAGE_SIZE = 24;
  var STORE_KEY = 'gj-reserve-v1';

  var GROUPS = [
    { id: 'all', label: 'ทั้งหมด' },
    { id: 'kitchen', label: 'เครื่องครัว & ของใช้' },
    { id: 'glasses', label: 'แว่นตา' },
    { id: 'plush-big', label: 'ตุ๊กตาตัวใหญ่ & หมอน' },
    { id: 'plush', label: 'ตุ๊กตาคาแรกเตอร์' },
    { id: 'plush-small', label: 'ตุ๊กตาเล็ก & พวงกุญแจ' }
  ];
  var PRICES = [
    { id: 'any', label: 'ทุกราคา', test: function () { return true; } },
    { id: 'u100', label: 'ไม่เกิน 100.-', test: function (p) { return p <= 100; } },
    { id: '100-300', label: '101 – 300.-', test: function (p) { return p > 100 && p <= 300; } },
    { id: '300-1000', label: '301 – 1,000.-', test: function (p) { return p > 300 && p <= 1000; } },
    { id: 'o1000', label: '1,000.- ขึ้นไป', test: function (p) { return p > 1000; } }
  ];

  var byCode = {};
  DATA.forEach(function (it) { byCode[it.c] = it; });

  var ICON = {
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    torii: '<svg viewBox="0 0 48 48" fill="currentColor"><rect x="6" y="9" width="36" height="5" rx="1"/><rect x="10" y="16" width="28" height="4" rx="1"/><rect x="14" y="14" width="4" height="26"/><rect x="30" y="14" width="4" height="26"/><rect x="12" y="23" width="24" height="3"/></svg>'
  };

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (ch) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch];
    });
  }
  function baht(n) { return n.toLocaleString('th-TH'); }
  function img(it) { return 'assets/products/' + encodeURIComponent(it.c) + '.jpg'; }
  function groupLabel(id) {
    for (var i = 0; i < GROUPS.length; i++) if (GROUPS[i].id === id) return GROUPS[i].label;
    return '';
  }

  /* ---------- reserve list (เก็บในเครื่องลูกค้า) ---------- */
  var reserve = [];
  try { reserve = JSON.parse(localStorage.getItem(STORE_KEY) || '[]').filter(function (c) { return byCode[c]; }); } catch (e) { reserve = []; }
  function saveReserve() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(reserve)); } catch (e) {}
    renderBar();
    document.querySelectorAll('.add[data-code]').forEach(function (b) {
      var on = reserve.indexOf(b.dataset.code) > -1;
      b.setAttribute('aria-pressed', on ? 'true' : 'false');
      b.innerHTML = on ? ICON.check : ICON.plus;
      b.setAttribute('aria-label', (on ? 'เอาออกจากรายการจอง ' : 'เพิ่มในรายการจอง ') + b.dataset.code);
    });
  }
  function toggle(code) {
    var i = reserve.indexOf(code);
    if (i > -1) { reserve.splice(i, 1); toast('เอา ' + code + ' ออกจากรายการแล้ว'); }
    else { reserve.push(code); toast('เพิ่ม ' + code + ' ในรายการจองแล้ว'); }
    saveReserve();
  }

  var toastEl, toastTimer;
  function toast(msg) {
    if (!toastEl) { toastEl = document.createElement('div'); toastEl.className = 'toast'; toastEl.setAttribute('role', 'status'); document.body.appendChild(toastEl); }
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }

  /* ---------- cards ---------- */
  function cardHTML(it) {
    var on = reserve.indexOf(it.c) > -1;
    return '<article class="card">' +
      '<button class="card-photo' + (it.g === 'kitchen' ? ' cover' : '') + '" type="button" data-open="' + esc(it.c) + '" aria-label="ดูรายละเอียด ' + esc(it.n) + '">' +
        (it.i ? '<img src="' + img(it) + '" alt="" loading="lazy" decoding="async">' : '<span class="no-photo"><span>' + ICON.torii + 'ทักเพจขอรูป</span></span>') +
      '</button>' +
      '<div class="card-body">' +
        '<h3 class="card-title">' + esc(it.n) + '</h3>' +
        (it.d ? '<p class="card-desc">' + esc(it.d) + '</p>' : '') +
        '<div class="card-foot">' +
          '<span class="tag"><span class="code">' + esc(it.c) + '</span><span class="price">฿' + baht(it.p) + '</span></span>' +
          '<button class="add" type="button" data-code="' + esc(it.c) + '" aria-pressed="' + on + '" aria-label="' + (on ? 'เอาออกจากรายการจอง ' : 'เพิ่มในรายการจอง ') + esc(it.c) + '">' + (on ? ICON.check : ICON.plus) + '</button>' +
        '</div>' +
      '</div>' +
    '</article>';
  }

  /* ---------- detail dialog ---------- */
  var detail;
  function openDetail(code) {
    var it = byCode[code];
    if (!it) return;
    if (!detail) {
      detail = document.createElement('dialog');
      detail.className = 'detail';
      document.body.appendChild(detail);
      detail.addEventListener('click', function (e) { if (e.target === detail) detail.close(); });
    }
    var on = reserve.indexOf(it.c) > -1;
    detail.innerHTML =
      '<div class="dlg-head"><span class="tag"><span class="code">' + esc(it.c) + '</span><span class="price">฿' + baht(it.p) + '</span></span>' +
      '<button class="x" type="button" data-close aria-label="ปิด">×</button></div>' +
      '<div class="detail-photo">' + (it.i ? '<img src="' + img(it) + '" alt="' + esc(it.n) + '">' : '<span class="no-photo"><span>' + ICON.torii + 'ยังไม่มีรูปบนเว็บ<br>ทักเพจขอรูปได้</span></span>') + '</div>' +
      '<div class="dlg-body">' +
        '<span class="label-sm">' + esc(groupLabel(it.g)) + ' · ของมือสองจากญี่ปุ่น มีชิ้นเดียว</span>' +
        '<h2>' + esc(it.n) + '</h2>' +
        (it.d ? '<p class="muted">' + esc(it.d) + '</p>' : '') +
        '<div class="row">' +
          '<button class="btn btn-navy" type="button" data-toggle="' + esc(it.c) + '">' + (on ? 'อยู่ในรายการจองแล้ว · เอาออก' : 'เพิ่มในรายการจอง') + '</button>' +
          '<a class="btn btn-ghost" href="' + FB + '" target="_blank" rel="noopener">ทักเพจถาม ' + esc(it.c) + '</a>' +
        '</div>' +
        '<p class="label-sm">ของมือสองแต่ละชิ้นอาจมีรอยตามการใช้งาน ถ้าอยากดูรูปเพิ่มหรือถามสภาพ ทักเพจแล้วแจ้งรหัส ' + esc(it.c) + ' ได้เลย</p>' +
      '</div>';
    detail.querySelector('[data-close]').onclick = function () { detail.close(); };
    detail.querySelector('[data-toggle]').onclick = function () { toggle(it.c); detail.close(); };
    if (typeof detail.showModal === 'function') detail.showModal(); else detail.setAttribute('open', '');
  }

  /* ---------- reserve bar + drawer ---------- */
  var bar, drawer;
  function renderBar() {
    if (!document.body.hasAttribute('data-reserve')) return;
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'reserve-bar';
      bar.innerHTML = '<button type="button"><span class="t"></span><span class="go">ดูรายการ</span></button>';
      bar.querySelector('button').onclick = openDrawer;
      document.body.appendChild(bar);
    }
    var total = reserve.reduce(function (s, c) { return s + byCode[c].p; }, 0);
    bar.hidden = reserve.length === 0;
    document.body.classList.toggle('has-bar', reserve.length > 0);
    bar.querySelector('.t').textContent = 'รายการจอง ' + reserve.length + ' ชิ้น · ฿' + baht(total);
  }
  function message() {
    var lines = ['สวัสดีครับ/ค่ะ สนใจจองสินค้าจากเว็บ Goods Japan', ''];
    var total = 0;
    reserve.forEach(function (c) { var it = byCode[c]; total += it.p; lines.push(it.c + ' ' + it.n + ' – ' + baht(it.p) + ' บาท'); });
    lines.push('', 'รวม ' + reserve.length + ' ชิ้น ' + baht(total) + ' บาท', 'ชื่อ: ', 'จะมารับที่ร้านวันที่: ');
    return lines.join('\n');
  }
  function openDrawer() {
    if (!drawer) {
      drawer = document.createElement('dialog');
      document.body.appendChild(drawer);
      drawer.addEventListener('click', function (e) { if (e.target === drawer) drawer.close(); });
    }
    var total = reserve.reduce(function (s, c) { return s + byCode[c].p; }, 0);
    drawer.innerHTML =
      '<div class="dlg-head"><h2>รายการจอง (' + reserve.length + ')</h2><button class="x" type="button" data-close aria-label="ปิด">×</button></div>' +
      '<div class="dlg-body">' +
        (reserve.length ? reserve.map(function (c) {
          var it = byCode[c];
          return '<div class="r-item">' + (it.i ? '<img src="' + img(it) + '" alt="">' : '<span class="ph"></span>') +
            '<div><div class="c">' + esc(it.c) + '</div><div class="n">' + esc(it.n) + '</div></div>' +
            '<div><div class="p">฿' + baht(it.p) + '</div><button class="rm" type="button" data-rm="' + esc(it.c) + '">เอาออก</button></div></div>';
        }).join('') : '<p class="muted">ยังไม่มีสินค้าในรายการ กดปุ่ม + ที่สินค้าเพื่อเพิ่ม</p>') +
        (reserve.length ?
          '<div class="r-total"><span>รวม</span><span class="num">฿' + baht(total) + '</span></div>' +
          '<ol class="r-steps"><li>กด “คัดลอกรายการ”</li><li>กด “ทักเพจ Facebook” แล้ววางข้อความส่งให้ร้าน</li><li>รอร้านยืนยันว่าของยังอยู่ แล้วมารับที่ร้าน</li></ol>' +
          '<div class="r-actions">' +
            '<button class="btn btn-red" type="button" data-copy>คัดลอกรายการ</button>' +
            '<a class="btn btn-navy" href="' + FB + '" target="_blank" rel="noopener">ทักเพจ Facebook</a>' +
            '<p class="label-sm">หรือโทร <b class="num">' + PHONE + '</b> แจ้งรหัสสินค้า · ของมีชิ้นเดียว อาจขายหน้าร้านไปก่อนได้</p>' +
            '<textarea class="copy-box" readonly aria-label="ข้อความรายการจอง">' + esc(message()) + '</textarea>' +
            '<button class="btn btn-ghost btn-sm" type="button" data-clear>ล้างรายการทั้งหมด</button>' +
          '</div>' : '') +
      '</div>';
    drawer.querySelector('[data-close]').onclick = function () { drawer.close(); };
    drawer.querySelectorAll('[data-rm]').forEach(function (b) {
      b.onclick = function () { toggle(b.dataset.rm); openDrawer(); };
    });
    var copyBtn = drawer.querySelector('[data-copy]');
    if (copyBtn) copyBtn.onclick = function () {
      var box = drawer.querySelector('.copy-box');
      var done = function () { toast('คัดลอกแล้ว ไปวางในแชทเพจได้เลย'); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(box.value).then(done, function () { box.select(); toast('กดค้างที่ข้อความแล้วเลือกคัดลอก'); });
      } else { box.select(); toast('กดค้างที่ข้อความแล้วเลือกคัดลอก'); }
    };
    var clearBtn = drawer.querySelector('[data-clear]');
    if (clearBtn) clearBtn.onclick = function () { reserve = []; saveReserve(); drawer.close(); };
    if (!drawer.open) { if (typeof drawer.showModal === 'function') drawer.showModal(); else drawer.setAttribute('open', ''); }
  }

  /* ---------- clicks (cards anywhere) ---------- */
  document.addEventListener('click', function (e) {
    var add = e.target.closest('.add[data-code]');
    if (add) { toggle(add.dataset.code); return; }
    var open = e.target.closest('[data-open]');
    if (open) openDetail(open.dataset.open);
  });

  /* ---------- home page ---------- */
  function renderHome() {
    var heroBox = document.getElementById('hero-photos');
    if (heroBox) {
      heroBox.innerHTML = ['K03', 'K36', 'K69', 'K16', 'K12', 'K14'].map(function (c) {
        var it = byCode[c];
        return it && it.i ? '<img src="' + img(it) + '" alt="' + esc(it.n) + '" width="300" height="400">' : '';
      }).join('');
    }
    var cats = document.getElementById('cat-tiles');
    if (cats) {
      var cover = { kitchen: 'K03', glasses: 'G06', 'plush-big': 'D1-05', plush: 'D020', 'plush-small': 'S04' };
      cats.innerHTML = GROUPS.slice(1).map(function (g) {
        var items = DATA.filter(function (it) { return it.g === g.id; });
        var min = Math.min.apply(null, items.map(function (it) { return it.p; }));
        var c = byCode[cover[g.id]];
        return '<a class="cat" href="shop.html#' + g.id + '">' +
          (c && c.i ? '<img src="' + img(c) + '" alt="" loading="lazy">' : '<span></span>') +
          '<span><b>' + g.label + '</b><span>' + items.length + ' ชิ้น · เริ่ม ฿' + baht(min) + '</span></span></a>';
      }).join('');
    }
    var feat = document.getElementById('featured');
    if (feat) {
      feat.innerHTML = ['D1-03', 'K16', 'G01', 'D069', 'K03', 'D1-35', 'S43', 'K36']
        .map(function (c) { return byCode[c]; }).filter(Boolean).map(cardHTML).join('');
    }
    document.querySelectorAll('[data-count]').forEach(function (el) {
      var g = el.dataset.count;
      el.textContent = baht(g === 'all' ? DATA.length : DATA.filter(function (it) { return it.g === g; }).length);
    });
    document.querySelectorAll('[data-catalog-date]').forEach(function (el) { el.textContent = window.GJ_CATALOG_DATE || ''; });
  }

  /* ---------- shop page ---------- */
  function renderShop() {
    var grid = document.getElementById('shop-grid');
    if (!grid) return;
    var groupBox = document.getElementById('group-chips');
    var priceBox = document.getElementById('price-chips');
    var search = document.getElementById('q');
    var sort = document.getElementById('sort');
    var countEl = document.getElementById('result-count');
    var moreBtn = document.getElementById('more');
    var empty = document.getElementById('empty');

    var hashGroup = (location.hash || '').replace('#', '');
    var state = { group: GROUPS.some(function (g) { return g.id === hashGroup; }) ? hashGroup : 'all', price: 'any', q: '', sort: 'pick', shown: PAGE_SIZE };

    groupBox.innerHTML = GROUPS.map(function (g) {
      var n = g.id === 'all' ? DATA.length : DATA.filter(function (it) { return it.g === g.id; }).length;
      return '<button class="chip" type="button" data-group="' + g.id + '" aria-pressed="false">' + g.label + '<b>' + n + '</b></button>';
    }).join('');
    priceBox.innerHTML = PRICES.map(function (p) {
      return '<button class="chip" type="button" data-price="' + p.id + '" aria-pressed="false">' + p.label + '</button>';
    }).join('');

    function priceTest() { for (var i = 0; i < PRICES.length; i++) if (PRICES[i].id === state.price) return PRICES[i].test; return PRICES[0].test; }
    function norm(s) { return s.toLowerCase().replace(/\s+/g, ' ').trim(); }

    function list() {
      var t = priceTest();
      var q = norm(state.q);
      var out = DATA.filter(function (it) {
        if (state.group !== 'all' && it.g !== state.group) return false;
        if (!t(it.p)) return false;
        if (q && norm(it.c + ' ' + it.n + ' ' + it.d).indexOf(q) === -1) return false;
        return true;
      });
      var s = state.sort;
      out.sort(function (a, b) {
        if (s === 'asc') return a.p - b.p;
        if (s === 'desc') return b.p - a.p;
        // แนะนำ: มีรูปก่อน แล้วชิ้นเด่น แล้วราคามากไปน้อย
        return (b.i - a.i) || (b.r - a.r) || (b.p - a.p);
      });
      return out;
    }

    function draw() {
      var items = list();
      groupBox.querySelectorAll('[data-group]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.group === state.group ? 'true' : 'false'); });
      priceBox.querySelectorAll('[data-price]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.price === state.price ? 'true' : 'false'); });
      grid.innerHTML = items.slice(0, state.shown).map(cardHTML).join('');
      countEl.textContent = items.length ? 'พบ ' + baht(items.length) + ' ชิ้น' + (items.length > state.shown ? ' · แสดง ' + baht(state.shown) : '') : '';
      moreBtn.hidden = items.length <= state.shown;
      moreBtn.textContent = 'แสดงเพิ่มอีก ' + Math.min(PAGE_SIZE, items.length - state.shown) + ' ชิ้น';
      empty.hidden = items.length > 0;
    }

    groupBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-group]'); if (!b) return;
      state.group = b.dataset.group; state.shown = PAGE_SIZE;
      try { history.replaceState(null, '', state.group === 'all' ? location.pathname : '#' + state.group); } catch (err) {}
      draw();
    });
    priceBox.addEventListener('click', function (e) {
      var b = e.target.closest('[data-price]'); if (!b) return;
      state.price = b.dataset.price; state.shown = PAGE_SIZE; draw();
    });
    var timer;
    search.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () { state.q = search.value; state.shown = PAGE_SIZE; draw(); }, 150);
    });
    sort.addEventListener('change', function () { state.sort = sort.value; state.shown = PAGE_SIZE; draw(); });
    moreBtn.addEventListener('click', function () { state.shown += PAGE_SIZE; draw(); });
    window.addEventListener('hashchange', function () {
      var h = location.hash.replace('#', '');
      if (GROUPS.some(function (g) { return g.id === h; })) { state.group = h; state.shown = PAGE_SIZE; draw(); }
    });
    document.getElementById('clear-filters').addEventListener('click', function () {
      state = { group: 'all', price: 'any', q: '', sort: state.sort, shown: PAGE_SIZE }; search.value = ''; draw();
    });
    draw();
  }

  function init() {
    renderHome();
    renderShop();
    saveReserve();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
