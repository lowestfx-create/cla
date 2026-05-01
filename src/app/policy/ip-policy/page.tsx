import type { Metadata } from 'next'
import Link from 'next/link'
import { AlertTriangle, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'นโยบายทรัพย์สินทางปัญญา (IP) | BrickMe',
  description: 'นโยบาย IP ของ BrickMe — งานที่รับและไม่รับทำ เกี่ยวกับตัวละครลิขสิทธิ์',
}

export default function IPPolicyPage() {
  return (
    <PolicyLayout title="นโยบายทรัพย์สินทางปัญญา" updated="1 พฤษภาคม 2567">

      <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <p className="font-body text-amber-800 text-sm leading-relaxed">
            <strong>สำคัญ:</strong> BrickMe ให้ความเคารพต่อสิทธิ์เจ้าของทรัพย์สินทางปัญญาอย่างเคร่งครัด นโยบายนี้ช่วยให้คุณเข้าใจว่าเราสามารถช่วยได้ในขอบเขตไหน
          </p>
        </div>
      </div>

      <Section title="สิ่งที่เราไม่รับทำ">
        <div className="bg-red-50 rounded-2xl p-5 space-y-3">
          {[
            'Replica ตัวละครลิขสิทธิ์ที่จำหน่ายหรือแจกจ่ายในเชิงพาณิชย์ (เช่น Mickey Mouse, Iron Man, Naruto, Pikachu ฯลฯ)',
            'โมเดลที่ทำขึ้นเพื่อแอบอ้างว่าเป็นสินค้าลิขสิทธิ์ของแบรนด์จริง',
            'ตัวละครที่ได้รับการร้องขอให้ทำซ้ำอย่างตรงทั้งหมดจากงานลิขสิทธิ์',
            'ดีไซน์ที่ละเมิดเครื่องหมายการค้าของผู้อื่น',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="text-red-500 mt-0.5 font-bold flex-shrink-0">✕</span>
              <p className="font-body text-brand-muted text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="สิ่งที่เราทำได้">
        <div className="bg-green-50 rounded-2xl p-5 space-y-3">
          {[
            'ตัวละครที่ได้แรงบันดาลใจจากสไตล์ใดก็ได้ แต่เป็นดีไซน์ใหม่ที่ไม่คัดลอก',
            'ตัวละครของคุณเอง หน้าตาคล้ายคุณ หรือคนที่คุณรัก',
            'ตัวละครที่คุณสร้างขึ้นเอง หรือเป็นเจ้าของลิขสิทธิ์',
            'มาสคอตบริษัทของคุณเอง (ต้องมีเอกสารยืนยันความเป็นเจ้าของ)',
            'ตัวละครที่ได้รับอนุญาตจากเจ้าของลิขสิทธิ์แล้ว (ต้องแสดงหลักฐาน)',
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <CheckCircle2 size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <p className="font-body text-brand-muted text-sm">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="เหตุผลของนโยบายนี้">
        <p>เราเข้าใจว่าหลายคนอาจต้องการตัวละครจากการ์ตูนหรือภาพยนตร์ที่ตัวเองชอบ แต่การผลิตซ้ำโดยไม่ได้รับอนุญาตถือเป็นการละเมิดกฎหมายทรัพย์สินทางปัญญา ซึ่งอาจส่งผลกระทบต่อเจ้าของลิขสิทธิ์และ BrickMe เอง</p>
        <p>เราเลือกที่จะดำเนินธุรกิจอย่างโปร่งใสและถูกต้อง เพราะเชื่อว่าดีไซน์ที่ดีที่สุดคือตัวละครที่เป็น <strong>"ตัวคุณเอง"</strong> 100%</p>
      </Section>

      <Section title="การรายงานการละเมิด">
        <p>หากคุณพบว่า BrickMe กำลังละเมิดลิขสิทธิ์ของคุณ หรือหากคุณเป็นเจ้าของลิขสิทธิ์และต้องการยื่นคำร้อง กรุณาติดต่อ <strong>hello@brickme.th</strong> เราจะดำเนินการอย่างเร่งด่วน</p>
      </Section>

      <Section title="ติดต่อสอบถาม">
        <p>ไม่แน่ใจว่างานที่ต้องการทำได้ไหม? ทักถามก่อนได้เลยที่ LINE: @brickme ทีมงานยินดีให้คำปรึกษาโดยไม่มีค่าใช้จ่าย</p>
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
          {[{ href: '/policy/shipping', label: 'การจัดส่ง' }, { href: '/policy/refund', label: 'การคืนเงิน' }, { href: '/policy/privacy', label: 'ความเป็นส่วนตัว' }, { href: '/policy/terms', label: 'ข้อกำหนด' }].map((l) => (
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
      <div className="font-body text-brand-muted leading-relaxed space-y-3 [&_strong]:text-brand-dark">{children}</div>
    </div>
  )
}
