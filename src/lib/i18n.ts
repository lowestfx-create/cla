export const translations = {
  th: {
    nav: {
      home: 'หน้าแรก',
      shop: 'Shop',
      customize: 'Customize',
      gallery: 'Gallery',
      faq: 'FAQ',
      cart: 'ตะกร้า',
      language: 'TH',
    },
    hero: {
      headline: 'ตัวคุณในเวอร์ชันเลโก้\nส่งให้ในมือเดียว',
      sub: 'ปริ้นต์ 3D คุณภาพระดับของขวัญ • 7–14 วัน • เริ่ม 590 บาท',
      cta: 'เริ่ม Custom เลย',
      ctaSecondary: 'ดูผลงาน',
    },
    howItWorks: {
      title: 'สั่งง่าย 3 ขั้นตอน',
      steps: [
        { title: 'เลือก & ออกแบบ', desc: 'แต่งตัวละครตามใจชอบใน Customizer' },
        { title: 'ปริ้นต์ & QC', desc: 'ทีมงานปริ้นต์ 3D ตรวจคุณภาพทุกชิ้น' },
        { title: 'จัดส่งถึงบ้าน', desc: 'แพ็คสวย ส่งเร็ว มีเลข tracking' },
      ],
    },
    useCases: {
      title: 'เหมาะสำหรับทุกโอกาส',
      items: [
        { title: 'ของขวัญแฟน', emoji: '💛', desc: 'วันเกิด ครบรอบ วาเลนไทน์' },
        { title: 'งานแต่งงาน', emoji: '💍', desc: 'Cake topper ที่ไม่เหมือนใคร' },
        { title: 'ของขวัญบริษัท', emoji: '🏢', desc: 'B2B ราคาพิเศษ ขั้นต่ำ 10 ชิ้น' },
        { title: 'ของสะสม', emoji: '✨', desc: 'ตัวละครในแบบที่เป็นตัวคุณ' },
      ],
    },
    footer: {
      tagline: 'ตัวคุณในเวอร์ชันเลโก้',
      rights: '© 2567 BrickMe. สงวนลิขสิทธิ์',
    },
  },
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      customize: 'Customize',
      gallery: 'Gallery',
      faq: 'FAQ',
      cart: 'Cart',
      language: 'EN',
    },
    hero: {
      headline: 'You, in LEGO form.\nDelivered to your door.',
      sub: 'Gift-quality 3D printing • 7–14 days • From ฿590',
      cta: 'Start Customizing',
      ctaSecondary: 'View Gallery',
    },
    howItWorks: {
      title: '3 Simple Steps',
      steps: [
        { title: 'Design & Choose', desc: 'Dress your character in the Customizer' },
        { title: 'Print & QC', desc: 'Our team 3D prints and quality checks' },
        { title: 'Delivered to You', desc: 'Beautiful packaging, fast shipping' },
      ],
    },
    useCases: {
      title: 'Perfect for Every Occasion',
      items: [
        { title: 'Partner Gift', emoji: '💛', desc: 'Birthday, Anniversary, Valentine\'s' },
        { title: 'Wedding', emoji: '💍', desc: 'Unique cake toppers' },
        { title: 'Corporate Gift', emoji: '🏢', desc: 'B2B pricing, min 10 pcs' },
        { title: 'Collectible', emoji: '✨', desc: 'A character that\'s uniquely you' },
      ],
    },
    footer: {
      tagline: 'You, in LEGO form.',
      rights: '© 2024 BrickMe. All rights reserved.',
    },
  },
}

export type TranslationKey = typeof translations.th
