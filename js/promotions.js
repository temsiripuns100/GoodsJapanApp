/**
 * Goods Japan (กูดส์ เจแปน) - Promotions & Grand Opening 11.11 Countdown
 */

const PROMOTIONS = {
    active: [
        {
            title: "🎉 ไอเทมเปิดร้าน 11 บาท (ดักคนเข้าร้าน)",
            tag: "Grand Opening 11.11",
            desc: "จานรองแก้วเซรามิก ถ้วยน้ำจิ้มญี่ปุ่นแท้ ราคาเพียง 11 บาทเท่านั้น! (จำกัดสิทธิ์ท่านละ 2 ชิ้น)",
            badge: "⚡ Flash Deal 11.11",
            date: "11 พ.ย. – 15 พ.ย. 2569",
            featured: true
        },
        {
            title: "🎁 ช้อปครบ 300.- ฟรีแก้วมัคญี่ปุ่น 1 ใบ",
            tag: "ของแถมพรีเมียม",
            desc: "เลือกซื้อสินค้าในร้านครบ 300 บาท รับฟรีแก้วมัคเซรามิกญี่ปุ่นแท้ 1 ใบ (เตรียมของแถมไว้ 50 ชิ้นแรก หมดแล้วหมดเลย)",
            badge: "จำกัด 50 สิทธิ์แรก",
            date: "ตลอดสัปดาห์เปิดร้าน",
            featured: true
        },
        {
            title: "🧺 กระบะเสื้อผ้าวินเทจ 3 ตัว 100.-",
            tag: "Treasure Hunt",
            desc: "รื้อคุ้ยเสื้อผ้าญี่ปุ่นวินเทจ เสื้อเชิ้ต แจ็คเก็ต กางเกง ในกระบะหน้าร้าน ปตท. คละได้ทุกตัว 3 ตัวเพียง 100 บาท!",
            badge: "คุ้มที่สุด",
            date: "เปิดบริการทุกวัน",
            featured: false
        },
        {
            title: "🛍️ บุฟเฟ่ต์ถุงทอง 199 บาท",
            tag: "ระบายสต๊อกสุดมันส์",
            desc: "รับถุงช้อปปิ้งของทางร้าน ยัดเสื้อผ้าและของจิปาถะได้เท่าไหร่ รูดซิปปิดได้ เอาไปเลยถุงละ 199 บาท!",
            badge: "Viral TikTok",
            date: "เฉพาะศุกร์ - เสาร์ - อาทิตย์",
            featured: false
        },
        {
            title: "📱 แอด LINE หรือ Follow TikTok ลดเพิ่ม 10 บาท",
            tag: "สิทธิพิเศษสมาชิก",
            desc: "กดติดตาม @goodsjapan หน้าร้าน รับส่วนลดทันที 10 บาทในการซื้อสินค้าทุกรายการโดยไม่มีขั้นต่ำ",
            badge: "ลดทันที",
            date: "ไม่จำกัดเวลา",
            featured: false
        }
    ],
    expired: [
        {
            title: "Soft Opening Family Day",
            tag: "รอบทดลองระบบ",
            desc: "เปิดรับลูกค้า Café Amazon รอบชิมลางก่อนวัน Grand Opening พร้อมส่วนลด 5%",
            badge: "สิ้นสุดแล้ว",
            date: "8 - 10 พ.ย. 2569",
            featured: false
        }
    ]
};

// Valid Coupon Codes
const COUPONS = {
    "GJ1111": { discount: "11%", desc: "ส่วนลดพิเศษฉลอง Grand Opening 11.11" },
    "GOODSJAPAN": { discount: "20 บาท", desc: "ส่วนลดต้อนรับเพื่อนใหม่ Goods Japan" },
    "AMAZON10": { discount: "10 บาท", desc: "สิทธิพิเศษสำหรับลูกค้า Café Amazon ปั๊ม ปตท. คลอง 4" },
    "OPENING11": { discount: "15%", desc: "โค้ดลับเปิดตัวร้านค้า" }
};

document.addEventListener('DOMContentLoaded', () => {
    // 1. Countdown to Grand Opening 11.11 (November 11, 2026, 10:00:00)
    const targetDate = new Date('2026-11-11T10:00:00+07:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        const countdownContainer = document.getElementById('main-countdown');
        if (!countdownContainer) return;

        if (diff <= 0) {
            countdownContainer.innerHTML = `
                <div style="background: var(--jp-red); color: white; padding: 15px 30px; border-radius: 30px; font-weight: bold; font-size: 1.2rem;">
                    🎉 GRAND OPENING เปิดร้านแล้ววันนี้ที่ ปั๊ม ปตท. คลอง 4!
                </div>
            `;
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        countdownContainer.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-value">${String(days).padStart(2, '0')}</span>
                <span class="countdown-label">วัน</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${String(hours).padStart(2, '0')}</span>
                <span class="countdown-label">ชั่วโมง</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${String(minutes).padStart(2, '0')}</span>
                <span class="countdown-label">นาที</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-value">${String(seconds).padStart(2, '0')}</span>
                <span class="countdown-label">วินาที</span>
            </div>
        `;
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 2. Coupon Code Validator
    const couponInput = document.querySelector('.discount-input');
    const couponBtn = document.querySelector('.discount-btn');
    const couponResult = document.getElementById('discount-result');

    if (couponBtn && couponInput && couponResult) {
        couponBtn.addEventListener('click', () => {
            const code = couponInput.value.trim().toUpperCase();
            if (!code) {
                couponResult.innerHTML = `<span style="color: #999;">กรุณากรอกโค้ดส่วนลด</span>`;
                return;
            }

            if (COUPONS[code]) {
                const c = COUPONS[code];
                couponResult.innerHTML = `
                    <div style="background: #E8F5E9; color: #2E7D32; padding: 12px 20px; border-radius: 12px; font-weight: bold; display: inline-block; border: 1px solid #A5D6A7;">
                        ✅ โค้ดถูกต้อง! ได้รับส่วนลด ${c.discount} (${c.desc})
                    </div>
                `;
            } else {
                couponResult.innerHTML = `
                    <div style="background: #FFEBEE; color: #C62828; padding: 12px 20px; border-radius: 12px; font-weight: bold; display: inline-block; border: 1px solid #EF9A9A;">
                        ❌ ไม่พบโค้ดส่วนลดนี้ หรือหมดอายุแล้ว (ลองใช้: GJ1111 หรือ AMAZON10)
                    </div>
                `;
            }
        });
    }

    // 3. Render Promotions Cards
    const activeContainer = document.getElementById('active-promos');
    const expiredContainer = document.getElementById('expired-promos');

    function renderPromoCard(p) {
        return `
            <div class="promo-card ${p.featured ? 'promo-card-featured' : ''} fade-in">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                    <span class="promo-tag">${p.tag}</span>
                    <span style="font-size: 0.75rem; font-weight: bold; color: var(--jp-red); background: #FFF0F2; padding: 3px 8px; border-radius: 6px;">${p.badge}</span>
                </div>
                <h3 style="font-size: 1.15rem; color: var(--jp-navy); margin-bottom: 10px;">${p.title}</h3>
                <p style="font-size: 0.9rem; color: var(--jp-gray-text); margin-bottom: 15px; line-height: 1.6;">${p.desc}</p>
                <div style="font-size: 0.8rem; color: #888; border-top: 1px solid #F0F0F0; padding-top: 10px;">
                    📅 ระยะเวลา: <strong>${p.date}</strong>
                </div>
            </div>
        `;
    }

    if (activeContainer) {
        activeContainer.innerHTML = PROMOTIONS.active.map(renderPromoCard).join('');
    }

    if (expiredContainer) {
        expiredContainer.innerHTML = PROMOTIONS.expired.map(renderPromoCard).join('');
    }
});
