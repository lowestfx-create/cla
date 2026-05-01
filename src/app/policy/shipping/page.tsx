import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'นโยบายการจัดส่ง | BrickMe',
  description: 'นโยบายการจัดส่งของ BrickMe — ขนส่ง ค่าส่ง ระยะเวลา และการติดตามพัสดุ',
}

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout title="นโยบายการจัดส่ง" updated="1 พฤษภาคม 2567">
      <Section title="ขนส่งที่รองรับ">
        <p>BrickMe จัดส่งสินค้าผ่านบริษัทขนส่งชั้นนำดังนี้</p>
        <ul>
          <li><strong>Kerry Express</strong> — 3–5 วันทำการ</li>
          <li><strong>Flash Express</strong> — 2–4 วันทำการ</li>
          <li><strong>J&T Express</strong> — 2–4 วันทำการ</li>
          <li><strong>EMS (ไปรษณีย์ไทย)</strong> — 3–7 วันทำการ (มีค่าบริการเพิ่มเติม)</li>
        </ul>
        <p>สำหรับการจัดส่งต่างประเทศ รองรับเฉพาะ EMS เท่านั้น ระยะเวลาประมาณ 5–10 วันทำการ และคำนวณค่าส่งตามน้ำหนักจริง</p>
      </Section>

      <Section title="ค่าจัดส่ง">
        <ul>
          <li><strong>กรุงเทพฯ และปริมณฑล</strong> (กรุงเทพฯ, นนทบุรี, ปทุมธานี, สมุทรปราการ) — 50 บาท</li>
          <li><strong>ต่างจังหวัด</strong> — 80 บาท</li>
          <li><strong>EMS</strong> — ค่าส่งปกติ + 40 บาท</li>
          <li><strong>ต่างประเทศ</strong> — คิดตามน้ำหนักจริง แจ้งก่อนชำระเงิน</li>
        </ul>
      </Section>

      <Section title="ระยะเวลาจัดส่ง">
        <p>ระยะเวลาโดยรวมตั้งแต่สั่งจนได้รับสินค้าคือ <strong>9–19 วันทำการ</strong> แบ่งเป็น</p>
        <ul>
          <li>ผลิตสินค้า: 7–14 วันทำการหลังยืนยันแบบ</li>
          <li>จัดส่ง: 2–5 วันทำการ</li>
        </ul>
        <p>สำหรับ Rush Order (แจ้งก่อนสั่ง) ระยะเวลาผลิต 3–5 วันทำการ มีค่าบริการเพิ่ม 300 บาท</p>
      </Section>

      <Section title="การติดตามพัสดุ">
        <p>ลูกค้าจะได้รับเลข tracking ผ่านอีเมลและ LINE ทันทีที่สินค้าถูกส่งออก สามารถติดตามสถานะได้ที่เว็บไซต์ของบริษัทขนส่ง หรือผ่านหน้า <Link href="/order/track" className="text-brand-dark underline">ติดตามออเดอร์</Link> บนเว็บ BrickMe</p>
      </Section>

      <Section title="ความเสียหายระหว่างขนส่ง">
        <p>หากสินค้าได้รับความเสียหายระหว่างการขนส่ง กรุณาถ่ายภาพกล่องและสินค้าแล้วติดต่อเราทาง LINE หรืออีเมลภายใน 48 ชั่วโมงหลังได้รับสินค้า เราจะดำเนินการแก้ไขให้โดยเร็วที่สุด</p>
      </Section>
    </PolicyLayout>
  )
}

function PolicyLayout({ title, updated, children }: { title: string; updated: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-neutral">
      <div className="bg-brand-dark">
        <div className="container-site py-12">
          <div className="flex items-center gap-2 text-gray-400 text-sm font-body mb-3">
            <Link href="/" className="hover:text-white transition-colors">หน้าแรก</Link>
            <span>/</span>
            <span className="text-white">{title}</span>
          </div>
          <h1 className="font-display font-black text-4xl text-white">{title}</h1>
          <p className="font-body text-gray-400 mt-2 text-sm">อัปเดตล่าสุด: {updated}</p>
        </div>
      </div>

      <div className="container-site py-12 max-w-3xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card prose-custom space-y-8">
          {children}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {[
            { href: '/policy/refund', label: 'การคืนเงิน' },
            { href: '/policy/privacy', label: 'ความเป็นส่วนตัว' },
            { href: '/policy/terms', label: 'ข้อกำหนด' },
            { href: '/policy/ip-policy', label: 'นโยบาย IP' },
          ].map((l) => (
            <Link key={l.href} href={l.href} className="px-4 py-2 bg-white rounded-xl text-sm font-body text-brand-muted hover:text-brand-dark shadow-card transition-colors">
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display font-bold text-xl text-brand-dark mb-3 pb-2 border-b-2 border-brand-yellow">{title}</h2>
      <div className="font-body text-brand-muted leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-brand-dark [&_a]:text-brand-dark [&_a]:underline">
        {children}
      </div>
    </div>
  )
}
