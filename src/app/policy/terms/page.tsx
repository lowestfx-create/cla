import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ข้อกำหนดการใช้บริการ | BrickMe',
  description: 'ข้อกำหนดและเงื่อนไขการใช้บริการ BrickMe สำหรับการสั่งทำ Minifigure Custom',
}

export default function TermsPage() {
  return (
    <PolicyLayout title="ข้อกำหนดการใช้บริการ" updated="1 พฤษภาคม 2567">
      <Section title="การยอมรับข้อกำหนด">
        <p>การใช้งานเว็บไซต์ BrickMe หรือการสั่งซื้อสินค้า ถือว่าคุณได้อ่านและยอมรับข้อกำหนดเหล่านี้แล้ว หากไม่เห็นด้วย กรุณาหยุดใช้บริการ</p>
      </Section>

      <Section title="การสั่งซื้อ">
        <ul>
          <li>ออเดอร์จะสมบูรณ์เมื่อเราได้รับการชำระเงินครบถ้วนและยืนยันแบบกับลูกค้าแล้วเท่านั้น</li>
          <li>เราสงวนสิทธิ์ปฏิเสธออเดอร์ที่ละเมิดนโยบาย IP หรือมีเนื้อหาที่ไม่เหมาะสม</li>
          <li>ราคาที่แสดงบนเว็บไซต์รวม VAT แล้ว ไม่รวมค่าจัดส่ง</li>
        </ul>
      </Section>

      <Section title="ทรัพย์สินทางปัญญา">
        <p>เนื้อหา ภาพ และดีไซน์บนเว็บไซต์นี้เป็นทรัพย์สินของ BrickMe ห้ามนำไปใช้โดยไม่ได้รับอนุญาต สำหรับนโยบายเกี่ยวกับการทำตัวละครลิขสิทธิ์ โปรดดู <Link href="/policy/ip-policy" className="text-brand-dark underline">นโยบาย IP</Link></p>
      </Section>

      <Section title="ข้อจำกัดความรับผิด">
        <ul>
          <li>BrickMe ไม่รับผิดชอบต่อความเสียหายทางอ้อมหรือผลที่ตามมาจากการใช้สินค้า</li>
          <li>ความรับผิดสูงสุดของเราไม่เกินมูลค่าออเดอร์ที่ชำระ</li>
          <li>เราไม่รับผิดชอบต่อความล่าช้าที่เกิดจากเหตุสุดวิสัย (ภัยธรรมชาติ, นัดหยุดงาน ฯลฯ)</li>
        </ul>
      </Section>

      <Section title="การเปลี่ยนแปลงข้อกำหนด">
        <p>BrickMe สงวนสิทธิ์ในการเปลี่ยนแปลงข้อกำหนดเหล่านี้ได้ตลอดเวลา การเปลี่ยนแปลงจะมีผลทันทีที่ประกาศบนเว็บไซต์</p>
      </Section>

      <Section title="กฎหมายที่บังคับใช้">
        <p>ข้อกำหนดนี้อยู่ภายใต้กฎหมายไทย ข้อพิพาทใดๆ จะถูกนำเข้าสู่กระบวนการทางกฎหมายในประเทศไทย</p>
      </Section>

      <Section title="ติดต่อ">
        <p>หากมีคำถาม ติดต่อ <strong>hello@brickme.th</strong> หรือ LINE: @brickme</p>
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
          {[{ href: '/policy/shipping', label: 'การจัดส่ง' }, { href: '/policy/refund', label: 'การคืนเงิน' }, { href: '/policy/privacy', label: 'ความเป็นส่วนตัว' }, { href: '/policy/ip-policy', label: 'นโยบาย IP' }].map((l) => (
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
      <div className="font-body text-brand-muted leading-relaxed space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_strong]:text-brand-dark [&_a]:text-brand-dark [&_a]:underline">{children}</div>
    </div>
  )
}
