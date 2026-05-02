import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Zap, Shield, ArrowRight, Users, Star, Clock, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | BrickMe',
  description: 'เรื่องราวของ BrickMe — ร้านรับทำ Minifigure Custom 3D Printing ที่เกิดจากความรักในเลโก้และความตั้งใจสร้างของขวัญที่มีความหมาย',
}

const VALUES = [
  { icon: Heart, title: 'ทำด้วยใจ', desc: 'ทุกตัวที่ออกจากร้านเราผ่านการตรวจสอบด้วยมือทุกชิ้น ไม่มีการปล่อยผ่านแบบขอไปที', color: 'bg-red-500', lightColor: 'bg-red-50' },
  { icon: Zap, title: 'ส่งเร็ว ตรงเวลา', desc: 'เราเข้าใจว่าของขวัญมีวันนัด ทุกออเดอร์จึงมีกำหนดส่งที่ชัดเจนและ tracking ทุกขั้น', color: 'bg-brand-yellow', lightColor: 'bg-yellow-50' },
  { icon: Shield, title: 'โปร่งใส ซื่อตรง', desc: 'ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง นโยบายคืนเงินเขียนไว้ชัด ไม่มีเงื่อนไขซ่อน', color: 'bg-blue-500', lightColor: 'bg-blue-50' },
]

const STATS = [
  { value: '500+', label: 'ออเดอร์ที่ผ่านมา', icon: Users },
  { value: '5.0', label: 'คะแนนเฉลี่ย', icon: Star },
  { value: '7–14', label: 'วันทำการ', icon: Clock },
  { value: '100%', label: 'ทำในไทย', icon: MapPin },
]

const PROCESS = [
  { step: '01', title: 'รับแบบจากลูกค้า', desc: 'ผ่าน Customizer บนเว็บ หรือส่งรูปอ้างอิงทาง LINE ทีมงานจะ confirm แบบก่อนเริ่มผลิตทุกครั้ง' },
  { step: '02', title: 'Slice & Print', desc: 'ใช้ซอฟต์แวร์ 3D สร้างโมเดล แล้วปริ้นต์ด้วย Resin 3D Printer ความละเอียดสูง 0.05mm' },
  { step: '03', title: 'ลงสีและ QC', desc: 'ทีมช่างลงสีด้วยมือ แล้วตรวจคุณภาพ 3 จุด ก่อนส่งรูป QC ให้ลูกค้าดูก่อนจัดส่ง' },
  { step: '04', title: 'แพ็คและจัดส่ง', desc: 'แพ็คใส่กล่องกันกระแทก พร้อมการ์ดขอบคุณ ส่งพร้อมเลข tracking' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">

      {/* Page Header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-8 md:py-12">
          <span className="section-label mb-3">เกี่ยวกับเรา</span>
          <h1 className="font-display font-black text-4xl md:text-6xl text-brand-dark leading-tight">
            เราเชื่อว่าของขวัญที่ดี<br />
            <span className="text-brand-red">ควรไม่เหมือนใคร</span>
          </h1>
          <p className="font-body text-brand-muted mt-3 text-lg max-w-lg">
            จาก Minifigure ตัวแรกที่ทำเพื่อแฟน สู่กว่า 500 ออเดอร์ที่ส่งความสุขทั่วไทย
          </p>
        </div>
      </div>

      <div className="container-site py-12 max-w-5xl">

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-14">
          <div className="relative aspect-square rounded-2xl overflow-hidden border-3 border-brand-dark shadow-brick">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"
              alt="ที่มาของ BrickMe"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <h2 className="font-display font-black text-3xl text-brand-dark">ทำไมถึงเริ่ม BrickMe?</h2>
            <p className="font-body text-brand-muted leading-relaxed">
              BrickMe เกิดจากปัญหาจริงๆ — วันเกิดแฟน เราหาของขวัญไม่ได้สักอย่างที่รู้สึกว่า "ใช่" จริงๆ ของทุกชิ้นดูเหมือนซื้อมาจากห้างเหมือนกันหมด ไม่มีความเป็นตัวเธอเลย
            </p>
            <p className="font-body text-brand-muted leading-relaxed">
              เราเลยลองทำ Minifigure เลโก้รูปเธอขึ้นมาเองด้วย 3D Printer ตัวแรก ผลลัพธ์ที่ได้มันทำให้เธอน้ำตาซึมเลย — ตั้งแต่วันนั้นเราก็รู้ว่านี่คือสิ่งที่ต้องทำต่อ
            </p>
            <p className="font-body text-brand-muted leading-relaxed">
              วันนี้ BrickMe ส่งมอบความสุขผ่าน Minifigure Custom ไปแล้วกว่า 500 ออเดอร์ ตั้งแต่ของขวัญวันเกิด งานแต่งงาน ไปจนถึงสั่งทำแบบ B2B สำหรับบริษัทใหญ่ๆ
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-dark rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden mb-14">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {STATS.map(({ value, label, icon: Icon }, i) => (
              <div key={label} className={`p-8 text-center ${i > 0 ? '' : ''}`}>
                <Icon size={22} className="text-brand-yellow mx-auto mb-3 opacity-80" />
                <p className="font-display font-black text-4xl text-brand-yellow">{value}</p>
                <p className="font-body text-gray-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
          <div className="brick-row-yellow" />
        </div>

        {/* Process */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="section-label mb-2">กระบวนการ</span>
            <h2 className="font-display font-black text-3xl text-brand-dark">จาก Custom สู่มือคุณ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              {PROCESS.map(({ step, title, desc }) => (
                <div key={step} className="bg-white rounded-xl border-3 border-brand-dark shadow-brick p-4 flex gap-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100">
                  <div className="w-10 h-10 bg-brand-yellow border-2 border-brand-dark rounded-lg flex items-center justify-center font-display font-black text-sm flex-shrink-0 shadow-[2px_2px_0_#1A1A1A]">
                    {step}
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-dark">{title}</p>
                    <p className="font-body text-brand-muted text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative aspect-video md:aspect-square rounded-2xl overflow-hidden border-3 border-brand-dark shadow-brick">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop"
                alt="กระบวนการผลิต BrickMe"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-14">
          <div className="text-center mb-8">
            <span className="section-label mb-2">สัญญากับลูกค้า</span>
            <h2 className="font-display font-black text-3xl text-brand-dark">สิ่งที่เราให้คุณ</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {VALUES.map(({ icon: Icon, title, desc, color, lightColor }) => (
              <div key={title} className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick p-6 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100">
                <div className={`w-12 h-12 rounded-xl ${color} border-2 border-brand-dark/20 flex items-center justify-center mb-4 shadow-[2px_2px_0_rgba(0,0,0,0.15)]`}>
                  <Icon size={22} className="text-white" />
                </div>
                <h3 className="font-display font-black text-xl text-brand-dark mb-2">{title}</h3>
                <p className="font-body text-brand-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-yellow p-8 md:p-12 text-center">
            <h2 className="font-display font-black text-3xl text-brand-dark mb-3">
              พร้อมสร้างของขวัญที่ไม่มีวางขายแล้วหรือยัง?
            </h2>
            <p className="font-body text-brand-dark/70 mb-8 text-lg">
              ออกแบบตัวละครของคุณได้เลย ฟรี ไม่มีค่าใช้จ่ายในการดีไซน์
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/customize" className="btn-dark text-base px-8 py-4">
                เริ่ม Custom เลย
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-white border-3 border-brand-dark rounded-xl font-display font-black shadow-brick hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brick-sm transition-all duration-75">
                ติดต่อทีมงาน
              </Link>
            </div>
          </div>
          <div className="brick-row" />
        </div>

      </div>
    </div>
  )
}
