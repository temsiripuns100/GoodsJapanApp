/**
 * Goods Japan (กูดส์ เจแปน) - Products Catalog & Filter
 * Aligned with README.md Lifestyle Product Strategy (Klong 4)
 */

const PRODUCTS = [
    {
        id: 1,
        name: "ชามราเมนเซรามิก Arita-yaki ลายคลื่นคานางาวะ",
        category: "ceramics",
        price: 180,
        originalPrice: 350,
        tier: "Tier 2",
        badge: "ขายดี 🍜",
        desc: "งานเซรามิกเนื้อหนา มีตราประทับใต้ก้นชาม นำเข้าจากจังหวัดซากะ สภาพสวยกริบ 95%",
        icon: "🥣"
    },
    {
        id: 2,
        name: "แก้วไทเทเนียม Snow Peak Single Wall 450ml",
        category: "camping",
        price: 890,
        originalPrice: 1450,
        tier: "Tier 3",
        badge: "แรร์ไอเทม 🏕️",
        desc: "แก้วแคมป์ปิ้งน้ำหนักเบาพิเศษ ผลิตในเมืองสึบาเมะ ซันโจ ทนทาน พกพาสะดวก",
        icon: "🏕️"
    },
    {
        id: 3,
        name: "รอกสปินนิ่ง Shimano Sedona C3000HG มือสองญี่ปุ่น",
        category: "fishing",
        price: 1250,
        originalPrice: 2200,
        tier: "Tier 3",
        badge: "ยอดฮิต 🎣",
        desc: "หมุนลื่น เสียงคลิกเกอร์ใส เหมาะสำหรับตีเหยื่อปลอมและตกปลาเกล็ดคลองรังสิต",
        icon: "🎣"
    },
    {
        id: 4,
        name: "ตะเกียงน้ำมัน Coleman Unleaded 1 (Model 282)",
        category: "camping",
        price: 2400,
        originalPrice: 4500,
        tier: "Tier 3",
        badge: "วินเทจ 🏮",
        desc: "ไฟสว่างอบอุ่น วินเทจแท้จากญี่ปุ่น พร้อมเคสแข็งเดิม สำหรับสายแคมป์ปิ้งตัวจริง",
        icon: "🏮"
    },
    {
        id: 5,
        name: "ชุดถ้วยน้ำชาพร้อมจานรอง Tachikichi (เซ็ต 5 ชิ้น)",
        category: "ceramics",
        price: 490,
        originalPrice: 990,
        tier: "Tier 2",
        badge: "มีกล่องเดิม 🍵",
        desc: "แบรนด์เครื่องปั้นดินเผาเก่าแก่จากเกียวโต ลายครามน้ำเงินวาดมือ สภาพสะสม",
        icon: "🍵"
    },
    {
        id: 6,
        name: "ฟิกเกอร์วันพีซ Portrait of Pirates แท้จาก Bandai",
        category: "collectibles",
        price: 750,
        originalPrice: 1800,
        tier: "Tier 3",
        badge: "ของแท้ 🏴‍☠️",
        desc: "งานลงสีละเอียด คมกริบ พร้อมฐานตั้ง นำเข้าจากย่านอากิฮาบาระ สภาพใหม่",
        icon: "🎎"
    },
    {
        id: 7,
        name: "ชุดรถเหล็ก Tomica Vintage Limited (3 คัน)",
        category: "collectibles",
        price: 320,
        originalPrice: 650,
        tier: "Tier 2",
        badge: "ของสะสม 🚗",
        desc: "รถคลาสสิกญี่ปุ่นสเกล 1/64 ล้อเหล็ก เปิดประตูได้ ประทับตรา Made in Japan",
        icon: "🚗"
    },
    {
        id: 8,
        name: "ถาดเสิร์ฟไม้สนฮิโนกิ (Hinoki Wood) แท้",
        category: "decor",
        price: 260,
        originalPrice: 590,
        tier: "Tier 2",
        badge: "มินิมอล 🪵",
        desc: "มีกลิ่นหอมไม้อ่อนๆ ตามธรรมชาติ ดีไซน์สไตล์ Japandi แต่งบ้านคลอง 4 ได้อย่างลงตัว",
        icon: "🪵"
    },
    {
        id: 9,
        name: "เสื้อคลุมกิโมโนผ้าฝ้ายวินเทจ (Hanten Jacket)",
        category: "vintage",
        price: 290,
        originalPrice: 750,
        tier: "Tier 2",
        badge: "สไตล์ญี่ปุ่น 👘",
        desc: "ผ้าฝ้ายทอมือสีครามอินดิโก ใส่สบาย ระบายอากาศดี แมตช์กับกางเกงยีนส์ได้ง่าย",
        icon: "👘"
    },
    {
        id: 10,
        name: "ถ้วยน้ำจิ้มเซรามิกญี่ปุ่นคละลาย 3 ชิ้น 100.-",
        category: "ceramics",
        price: 35,
        originalPrice: 70,
        tier: "Tier 1",
        badge: "โปรหน้าร้าน 🥢",
        desc: "กระบะเทหน้า Café Amazon ดักคนแวะรื้อคุ้ย (3 ชิ้น 100.- / ชิ้นเดี่ยว 35.-)",
        icon: "🥢"
    },
    {
        id: 11,
        name: "คันชิงหลิวคาร์บอนไฟเบอร์ 3.6 เมตร ไกด์ทอง",
        category: "fishing",
        price: 550,
        originalPrice: 1200,
        tier: "Tier 2",
        badge: "สายชิงหลิว 🐟",
        desc: "น้ำหนักเบา แอ็คชั่นลงคันสวย สู้ปลาสนุก ตอบโจทย์สายตกปลาบ่อและคลองธรรมชาติ",
        icon: "🎋"
    },
    {
        id: 12,
        name: "เก้าอี้สนามพับได้ลายไม้สไตล์ Kermit Chair",
        category: "camping",
        price: 690,
        originalPrice: 1390,
        tier: "Tier 2",
        badge: "ยอดนิยม ⛺",
        desc: "โครงอลูมิเนียมลายไม้ ผ้า Oxford 600D ทนทาน พับเก็บง่าย พกไปแคมป์ปิ้งนครนายก",
        icon: "🪑"
    }
];

function renderProductCard(p) {
    return `
        <div class="product-card fade-in" data-category="${p.category}">
            <div class="product-image-wrap">
                <span class="product-badge">${p.badge}</span>
                <span class="product-tier-badge">${p.tier}</span>
                <div style="font-size: 5rem; display: flex; align-items: center; justify-content: center; height: 100%; width: 100%; background: linear-gradient(135deg, #F8F9FA, #EDF1F5);">
                    ${p.icon}
                </div>
            </div>
            <div class="product-body">
                <span class="product-category">${getCategoryLabel(p.category)}</span>
                <h3 class="product-title">${p.name}</h3>
                <p class="product-desc">${p.desc}</p>
                <div class="product-footer">
                    <div>
                        <span class="product-price">฿${p.price.toLocaleString()}</span>
                        <span class="product-price-old">฿${p.originalPrice.toLocaleString()}</span>
                    </div>
                    <a href="https://line.me/ti/p/~@goodsjapan" target="_blank" class="btn-inquire">ทักสอบถาม 💬</a>
                </div>
            </div>
        </div>
    `;
}

function getCategoryLabel(cat) {
    switch (cat) {
        case 'ceramics': return 'เซรามิก & เครื่องครัว';
        case 'camping': return 'แคมป์ปิ้ง Outdoor';
        case 'fishing': return 'อุปกรณ์ตกปลา';
        case 'collectibles': return 'ของสะสม & โมเดล';
        case 'decor': return 'ของแต่งบ้านมินิมอล';
        case 'vintage': return 'เสื้อผ้าวินเทจ';
        default: return 'สินค้าทั่วไป';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Render on Index Page (New Arrivals - 6 items)
    const newArrivals = document.getElementById('new-arrivals');
    if (newArrivals) {
        newArrivals.innerHTML = PRODUCTS.slice(0, 6).map(renderProductCard).join('');
    }

    // 2. Render on Shop Page (Full Catalog & Filters)
    const productGrid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const searchInput = document.querySelector('.search-box input');
    const sortSelect = document.querySelector('.sort-select select');
    const noResults = document.getElementById('no-results');

    if (productGrid) {
        let currentCategory = 'all';
        let searchQuery = '';
        let currentSort = 'latest';

        function updateCatalog() {
            let filtered = PRODUCTS.filter(p => {
                const matchCategory = (currentCategory === 'all') || (p.category === currentCategory);
                const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                    p.desc.toLowerCase().includes(searchQuery.toLowerCase());
                return matchCategory && matchSearch;
            });

            // Sorting
            if (currentSort === 'price-asc') {
                filtered.sort((a, b) => a.price - b.price);
            } else if (currentSort === 'price-desc') {
                filtered.sort((a, b) => b.price - a.price);
            } else if (currentSort === 'name') {
                filtered.sort((a, b) => a.name.localeCompare(b.name, 'th'));
            }

            if (filtered.length === 0) {
                productGrid.innerHTML = '';
                if (noResults) noResults.style.display = 'block';
            } else {
                if (noResults) noResults.style.display = 'none';
                productGrid.innerHTML = filtered.map(renderProductCard).join('');
            }
        }

        // Filter button clicks
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentCategory = btn.getAttribute('data-category');
                updateCatalog();
            });
        });

        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchQuery = e.target.value.trim();
                updateCatalog();
            });
        }

        // Sort select
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                currentSort = e.target.value;
                updateCatalog();
            });
        }

        // Initial render
        updateCatalog();
    }
});
