import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'นโยบายความเป็นส่วนตัว | BrickMe',
  description: 'นโยบายความเป็นส่วนตัว PDPA ของ BrickMe — การเก็บรวบรวมและใช้ข้อมูลส่วนบุคคล',
}

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout title="นโยบายความเป็นส่วนตัว" updated="1 พฤษภาคม 2567">
      <Section title="บทนำ">
        <p>BrickMe ให้ความสำคัญกับความเป็นส่วนตัวของลูกค้าเป็นอย่างยิ่ง นโยบายนี้อธิบายว่าเราเก็บรวบรวม ใช้ และปกป้องข้อมูลส่วนบุคคลของคุณอย่างไร ตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)</p>
      </Section>

      <Section title="ข้อมูลที่เราเก็บรวบรวม">
        <ul>
          <li><strong>ข้อมูลการสั่งซื้อ</strong>: ชื่อ ที่อยู่ เบอร์โทร อีเมล เพื่อจัดส่งสินค้า</li>
          <li><strong>ข้อมูลการชำระเงิน</strong>: ประเภทการชำระเงิน (เราไม่เก็บหมายเลขบัตรเครดิตโดยตรง)</li>
          <li><strong>รูปภาพอ้างอิง</strong>: รูปที่คุณส่งมาเพื่อประกอบการผลิต จัดเก็บชั่วคราว 90 วัน</li>
          <li><strong>ข้อมูลการใช้งาน</strong>: IP address, ประเภทเบราว์เซอร์ เพื่อปรับปรุงบริการ</li>
        </ul>
      </Section>

      <Section title="วัตถุประสงค์การใช้ข้อมูล">
        <ul>
          <li>ดำเนินการออเดอร์และจัดส่งสินค้า</li>
          <li>ติดต่อสื่อสารเกี่ยวกับออเดอร์ของคุณ</li>
          <li>ปรับปรุงสินค้าและบริการ</li>
          <li>ส่งข้อมูลโปรโมชั่น (เฉพาะกรณีที่คุณให้ความยินยอม)</li>
        </ul>
      </Section>

      <Section title="การแบ่งปันข้อมูล">
        <p>เราไม่ขายข้อมูลส่วนบุคคลของคุณให้แก่บุคคลภายนอก เราอาจแบ่งปันข้อมูลกับ</p>
        <ul>
          <li>บริษัทขนส่ง (Kerry, Flash, J&T, ไปรษณีย์ไทย) เฉพาะข้อมูลที่จำเป็น</li>
          <li>ผู้ให้บริการชำระเงิน (Omise) ซึ่งมีมาตรฐาน PCI DSS</li>
        </ul>
      </Section>

      <Section title="สิทธิ์ของคุณ (PDPA)">
        <ul>
          <li><strong>สิทธิ์เข้าถึง</strong>: ขอดูข้อมูลที่เราเก็บไว้</li>
          <li><strong>สิทธิ์แก้ไข</strong>: ขอแก้ไขข้อมูลที่ไม่ถูกต้อง</li>
          <li><strong>สิทธิ์ลบ</strong>: ขอให้ลบข้อมูลส่วนบุคคล</li>
          <li><strong>สิทธิ์คัดค้าน</strong>: ปฏิเสธการใช้ข้อมูลเพื่อการตลาด</li>
        </ul>
        <p>ใช้สิทธิ์ได้โดยติดต่อ hello@brickme.th</p>
      </Section>

      <Section title="ความปลอดภัยของข้อมูล">
        <p>เราใช้การเข้ารหัส SSL/TLS สำหรับการส่งข้อมูลทั้งหมด และจัดเก็บข้อมูลบนเซิร์ฟเวอร์ที่มีการป้องกันตามมาตรฐานสากล</p>
      </Section>

      <Section title="ติดต่อเรา">
        <p>หากมีคำถามเกี่ยวกับนโยบายนี้ ติดต่อได้ที่ <strong>hello@brickme.th</strong> หรือ LINE: @brickme</p>
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
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-card space-y-8">{children}</div>
        <div className="mt-8 flex flex-wrap gap-3">
          {[{ href: '/policy/shipping', label: 'การจัดส่ง' }, { href: '/policy/refund', label: 'การคืนเงิน' }, { href: '/policy/terms', label: 'ข้อกำหนด' }, { href: '/policy/ip-policy', label: 'นโยบาย IP' }].map((l) => (
            <Link key={l.href} href={l.href} className="px-4 py-2 bg-white rounded-xl text-sm font-body text-brand-muted hover:text-brand-dark shadow-card transition-colors">{l.label}</Link>
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
      <div className="font-body text-brand-muted leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-brand-dark">{children}</div>
    </div>
  )
}
