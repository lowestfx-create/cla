import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Zap, Shield, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'เกี่ยวกับเรา | BrickMe',
  description: 'เรื่องราวของ BrickMe — ร้านรับทำ Minifigure Custom 3D Printing ที่เกิดจากความรักในเลโก้และความตั้งใจสร้างของขวัญที่มีความหมาย',
}

const VALUES = [
  {
    icon: Heart,
    title: 'ทำด้วยใจ',
    desc: 'ทุกตัวที่ออกจากร้านเราผ่านการตรวจสอบด้วยมือทุกชิ้น ไม่มีการปล่อยผ่านแบบขอไปที',
    color: 'bg-red-50 text-red-500',
  },
  {
    icon: Zap,
    title: 'ส่งเร็ว ตรงเวลา',
    desc: 'เราเข้าใจว่าของขวัญมีวันนัด ทุกออเดอร์จึงมีกำหนดส่งที่ชัดเจนและ tracking ทุกขั้น',
    color: 'bg-yellow-50 text-yellow-500',
  },
  {
    icon: Shield,
    title: 'โปร่งใส ซื่อตรง',
    desc: 'ราคาชัดเจน ไม่มีค่าใช้จ่ายแอบแฝง นโยบายคืนเงินเขียนไว้ชัด ไม่มีเงื่อนไขซ่อน',
    color: 'bg-blue-50 text-blue-500',
  },
]

const STATS = [
  { value: '500+', label: 'ออเดอร์ที่ผ่านมา' },
  { value: '5.0', label: 'คะแนนเฉลี่ย' },
  { value: '7–14', label: 'วันทำการ' },
  { value: '100%', label: 'ทำด้วยมือในไทย' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Hero */}
      <div className="bg-brand-yellow">
        <div className="container-site py-16">
          <div className="max-w-2xl">
            <p className="font-body text-brand-dark/60 text-sm font-semibold uppercase tracking-widest mb-3">เกี่ยวกับเรา</p>
            <h1 className="font-display font-black text-5xl md:text-6xl text-brand-dark leading-tight">
              เราเชื่อว่า<br />ของขวัญที่ดี<br />
              <span className="text-white">ควรไม่เหมือนใคร</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container-site py-16 max-w-4xl">

        {/* Story */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div className="relative aspect-square rounded-3xl overflow-hidden shadow-card">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop"
              alt="ที่มาของ BrickMe"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-5">
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

        {/* Process */}
        <div className="mb-16">
          <h2 className="font-display font-black text-3xl text-brand-dark mb-8 text-center">กระบวนการของเรา</h2>
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-5">
              {[
                { step: '01', title: 'รับแบบจากลูกค้า', desc: 'ผ่าน Customizer บนเว็บ หรือส่งรูปอ้างอิงทาง LINE ทีมงานจะ confirm แบบก่อนเริ่มผลิตทุกครั้ง' },
                { step: '02', title: 'Slice & Print', desc: 'ใช้ซอฟต์แวร์ 3D สร้างโมเดล แล้วปริ้นต์ด้วย Resin 3D Printer ความละเอียดสูง 0.05mm' },
                { step: '03', title: 'ลงสีและ QC', desc: 'ทีมช่างลงสีด้วยมือ แล้วตรวจคุณภาพ 3 จุด ก่อนส่งรูป QC ให้ลูกค้าดูก่อนจัดส่ง' },
                { step: '04', title: 'แพ็คและจัดส่ง', desc: 'แพ็คใส่กล่องกันกระแทก พร้อมการ์ดขอบคุณ ส่งพร้อมเลข tracking' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-10 h-10 bg-brand-yellow rounded-xl flex items-center justify-center font-display font-black text-sm flex-shrink-0">
                    {step}
                  </div>
                  <div>
                    <p className="font-display font-bold text-brand-dark">{title}</p>
                    <p className="font-body text-brand-muted text-sm mt-1 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="relative aspect-video md:aspect-square rounded-3xl overflow-hidden shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=600&fit=crop"
                alt="กระบวนการผลิต BrickMe"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="font-display font-black text-4xl text-brand-yellow">{value}</p>
                <p className="font-body text-gray-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="font-display font-black text-3xl text-brand-dark mb-8 text-center">สัญญากับลูกค้า</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {VALUES.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="bg-white rounded-3xl p-7 shadow-card">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center mb-4`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-dark mb-2">{title}</h3>
                <p className="font-body text-brand-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-brand-yellow rounded-3xl p-8 md:p-12 text-center">
          <h2 className="font-display font-black text-3xl text-brand-dark mb-3">
            พร้อมสร้างของขวัญที่ไม่มีวางขายแล้วหรือยัง?
          </h2>
          <p className="font-body text-brand-dark/70 mb-8 text-lg">
            ออกแบบตัวละครของคุณได้เลย ฟรี ไม่มีค่าใช้จ่ายในการดีไซน์
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/customize" className="btn-primary bg-brand-dark text-white hover:bg-gray-800 text-base px-8 py-4">
              เริ่ม Custom เลย
              <ArrowRight size={18} />
            </Link>
            <Link href="/contact" className="btn-secondary text-base px-8 py-4">
              ติดต่อทีมงาน
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
