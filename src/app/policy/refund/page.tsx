import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'นโยบายการคืนเงิน | BrickMe',
  description: 'นโยบายการยกเลิกและคืนเงินของ BrickMe สำหรับสินค้าสั่งทำ Minifigure Custom',
}

export default function RefundPolicyPage() {
  return (
    <PolicyLayout title="นโยบายการคืนเงิน" updated="1 พฤษภาคม 2567">
      <Section title="ภาพรวม">
        <p>เนื่องจาก BrickMe ผลิตสินค้าแบบสั่งทำพิเศษ (Made-to-Order) ตามแบบของลูกค้าแต่ละคน จึงมีนโยบายการคืนเงินที่แตกต่างจากสินค้าทั่วไป เราขอแจ้งรายละเอียดอย่างชัดเจนดังนี้</p>
      </Section>

      <Section title="การยกเลิกออเดอร์">
        <ul>
          <li><strong>ภายใน 24 ชั่วโมง</strong>หลังชำระเงิน: ยกเลิกได้ฟรี คืนเงินเต็มจำนวน ภายใน 3–5 วันทำการ</li>
          <li><strong>หลัง 24 ชั่วโมง แต่ก่อนเริ่มผลิต</strong>: คืนเงิน 50% ของยอดชำระ</li>
          <li><strong>หลังเริ่มปริ้นต์แล้ว</strong>: ไม่สามารถยกเลิกหรือคืนเงินได้ เนื่องจากวัสดุและแรงงานถูกใช้ไปแล้ว</li>
        </ul>
        <p>หากต้องการยกเลิก กรุณาติดต่อทาง LINE หรืออีเมล hello@brickme.th โดยแจ้งหมายเลขออเดอร์</p>
      </Section>

      <Section title="สินค้าชำรุดหรือผิดพลาด">
        <p>หากสินค้าที่ได้รับมีความชำรุดหรือไม่ตรงกับที่ยืนยันแบบไว้ เราจะ<strong>ผลิตใหม่หรือคืนเงินเต็มจำนวน</strong>โดยไม่มีค่าใช้จ่ายเพิ่มเติม</p>
        <ul>
          <li>ถ่ายภาพสินค้าที่ได้รับและส่งให้เราภายใน 48 ชั่วโมงหลังได้รับสินค้า</li>
          <li>ทีมงานจะตรวจสอบและตอบกลับภายใน 1 วันทำการ</li>
          <li>หากยืนยันว่าเป็นความผิดพลาดของเรา จะดำเนินการแก้ไขให้ทันที</li>
        </ul>
      </Section>

      <Section title="กรณีที่ไม่สามารถคืนเงินได้">
        <ul>
          <li>สินค้าที่เสียหายจากการใช้งานหรือการจัดเก็บของลูกค้า</li>
          <li>การเปลี่ยนใจหลังจากยืนยันแบบแล้ว</li>
          <li>ความแตกต่างของสีที่เกิดจากหน้าจอคอมพิวเตอร์/มือถือ (สีบนหน้าจออาจแตกต่างจากสีจริงเล็กน้อย)</li>
          <li>สินค้าที่สั่งทำแบบ Rush Order</li>
        </ul>
      </Section>

      <Section title="วิธีรับเงินคืน">
        <p>เงินคืนจะโอนกลับไปยังช่องทางเดิมที่ชำระ</p>
        <ul>
          <li><strong>บัตรเครดิต/เดบิต</strong>: ภายใน 5–10 วันทำการ (ขึ้นอยู่กับธนาคาร)</li>
          <li><strong>PromptPay / โอนเงิน</strong>: ภายใน 1–3 วันทำการ</li>
        </ul>
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
          {[{ href: '/policy/shipping', label: 'การจัดส่ง' }, { href: '/policy/privacy', label: 'ความเป็นส่วนตัว' }, { href: '/policy/terms', label: 'ข้อกำหนด' }, { href: '/policy/ip-policy', label: 'นโยบาย IP' }].map((l) => (
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
