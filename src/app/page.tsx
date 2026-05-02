import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { ArrowRight, Wand2, Package, Truck, Star, Gift, Gem, Heart } from 'lucide-react'

const MinifigureViewer = dynamic(() => import('@/components/MinifigureViewer'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
    </div>
  ),
})
import ProductCard from '@/components/ProductCard'
import FAQAccordion from '@/components/FAQAccordion'
import TestimonialCarousel from '@/components/Testimonial'
import { PRODUCTS, TESTIMONIALS, FAQ_ITEMS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'BrickMe — ตัวคุณในเวอร์ชันเลโก้ | Minifigure Custom 3D Printing',
  description: 'สั่งทำ Minifigure เลโก้แบบ Custom ด้วย 3D Printing คุณภาพสูง เริ่มต้น 590 บาท ส่งทั่วไทย',
}

const howItWorksSteps = [
  {
    icon: Wand2,
    title: 'เลือก & ออกแบบ',
    desc: 'แต่งตัวละครได้ตามใจชอบ ผม หน้า เสื้อผ้า อุปกรณ์ ครบทุกรายละเอียด',
    bg: 'bg-brand-yellow',
    shadow: 'shadow-brick',
    num: '01',
  },
  {
    icon: Package,
    title: 'ปริ้นต์ & ตรวจคุณภาพ',
    desc: 'ทีมงานปริ้นต์ 3D ด้วยเรซิ่น UV คุณภาพสูง ตรวจทุกชิ้นก่อนส่ง',
    bg: 'bg-brand-red',
    shadow: 'shadow-brick',
    num: '02',
  },
  {
    icon: Truck,
    title: 'ส่งถึงบ้านคุณ',
    desc: 'แพ็คสวยงาม ส่งเร็วผ่าน Kerry / Flash / J&T มีเลข tracking ทุกขั้น',
    bg: 'bg-brand-blue',
    shadow: 'shadow-brick',
    num: '03',
  },
]

const useCases = [
  {
    Icon: Heart,
    title: 'ของขวัญคนพิเศษ',
    desc: 'วันเกิด ครบรอบ วาเลนไทน์ — ของขวัญที่ไม่เคยซ้ำใคร',
    href: '/shop?category=gift',
    bg: 'bg-brand-yellow',
    iconColor: 'text-brand-dark',
    border: 'border-brand-dark',
  },
  {
    Icon: Gift,
    title: 'งานแต่งงาน',
    desc: 'Cake Topper บ่าวสาวที่หน้าเหมือนคุณจริงๆ ที่ระลึกไม่มีวางขาย',
    href: '/shop?category=wedding',
    bg: 'bg-brand-red',
    iconColor: 'text-white',
    border: 'border-brand-dark',
  },
  {
    Icon: Gem,
    title: 'ของสะสม',
    desc: 'ตัวละครที่เป็นตัวคุณเอง 100% ไม่มีที่ไหนในโลกที่เหมือนกัน',
    href: '/shop?category=collect',
    bg: 'bg-brand-green',
    iconColor: 'text-white',
    border: 'border-brand-dark',
  },
]

const stats = [
  { value: '500+', label: 'ออเดอร์สำเร็จ' },
  { value: '4.9', label: 'คะแนนเฉลี่ย' },
  { value: '7–14', label: 'วันทำการ' },
  { value: '100%', label: 'Custom ทุกชิ้น' },
]

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8)
  const faqPreview = FAQ_ITEMS.slice(0, 4)

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] bg-brand-yellow overflow-hidden flex items-center">
        <div className="absolute inset-0 stud-pattern" />

        <div className="container-site relative z-10 py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-brand-dark text-brand-yellow px-4 py-2 rounded-lg border-3 border-brand-dark shadow-brick-sm mb-6 font-display font-black text-xs uppercase tracking-widest">
                <Star size={12} className="fill-brand-yellow" />
                ปริ้นต์ 3D คุณภาพระดับของขวัญ
              </div>

              <h1 className="font-display font-black text-5xl md:text-6xl lg:text-7xl text-brand-dark leading-[0.95] mb-6">
                ตัวคุณ<br />
                ในเวอร์ชัน<br />
                <span className="bg-brand-dark text-brand-yellow px-2 inline-block -rotate-1">เลโก้</span>
              </h1>

              <p className="font-body text-brand-dark/80 text-lg mb-8 leading-relaxed font-medium">
                ออกแบบ Minifigure Custom ด้วยตัวเอง<br />
                ระยะเวลา 7–14 วัน — <strong>เริ่มต้นเพียง 590 บาท</strong>
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/customize" className="btn-dark text-base px-8 py-4">
                  <Wand2 size={20} />
                  เริ่ม Custom เลย
                </Link>
                <Link href="/shop" className="btn-secondary text-base px-8 py-4">
                  ดูผลงาน
                  <ArrowRight size={18} />
                </Link>
              </div>

              {/* Social proof */}
              <div className="flex items-center gap-4 mt-8">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full border-3 border-brand-dark overflow-hidden bg-white shadow-brick-sm">
                      <Image
                        src={`https://api.dicebear.com/8.x/avataaars/svg?seed=hero${i}`}
                        alt={`ลูกค้า ${i}`}
                        width={36}
                        height={36}
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-brand-dark text-white px-4 py-2 rounded-lg border-2 border-brand-dark shadow-brick-sm">
                  <div className="flex items-center gap-1 mb-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={12} className="fill-brand-yellow text-brand-yellow" />
                    ))}
                  </div>
                  <p className="font-display font-black text-xs text-gray-300">ลูกค้าพึงพอใจ 500+ ออเดอร์</p>
                </div>
              </div>
            </div>

            {/* Hero Visual — 3D Minifigure */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">

                {/* 3D Canvas */}
                <div className="w-72 h-80 md:w-80 md:h-96 mx-auto bg-white rounded-lg border-3 border-brand-dark shadow-brick-xl overflow-hidden relative">
                  <MinifigureViewer
                    parts={{}}
                    topColor="#DA291C"
                    bottomColor="#1A1A1A"
                    skinColor="#FDBCB4"
                    hairColor="#2C1810"
                    autoRotate
                    className="w-full h-full"
                  />
                  {/* hint */}
                  <p className="absolute bottom-2 left-0 right-0 text-center font-body text-[10px] text-brand-muted select-none pointer-events-none">
                    ลากเพื่อหมุน · เลื่อนเพื่อซูม
                  </p>
                </div>

                {/* Floating badge - top left */}
                <div className="absolute -left-4 top-8 bg-brand-red text-white rounded-lg border-3 border-brand-dark shadow-brick p-3">
                  <p className="font-display font-black text-xs">Custom 100%</p>
                  <p className="font-body text-[10px] text-red-200">ออกแบบเองทุกอย่าง</p>
                </div>

                {/* Floating badge - bottom right */}
                <div className="absolute -right-4 bottom-16 bg-brand-blue text-white rounded-lg border-3 border-brand-dark shadow-brick p-3">
                  <p className="font-display font-black text-xs">ส่งเร็ว 7–14 วัน</p>
                  <p className="font-body text-[10px] text-blue-200">มี tracking ทุกชิ้น</p>
                </div>

                {/* Price tag */}
                <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-brand-dark text-brand-yellow rounded-lg border-3 border-brand-dark shadow-brick px-5 py-2 whitespace-nowrap">
                  <p className="font-display font-black text-sm">เริ่มต้น 590฿</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom brick row */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="brick-row" />
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="bg-brand-dark py-10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="font-display font-black text-4xl text-brand-yellow">{stat.value}</p>
                <p className="font-body text-gray-400 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="brick-row-yellow" />

      {/* ─── How It Works ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">วิธีสั่งซื้อ</span>
            <h2 className="section-title">สั่งง่าย ใน 3 ขั้นตอน</h2>
            <p className="section-subtitle">ไม่ต้องมีประสบการณ์ออกแบบ ก็ได้ตัวละครที่เป็นตัวเองได้</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {howItWorksSteps.map((step, i) => (
              <div key={i} className="card p-8 text-center group hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-card-hover transition-all duration-100">
                <div className={`w-16 h-16 ${step.bg} rounded-lg border-3 border-brand-dark shadow-brick flex items-center justify-center mx-auto mb-5`}>
                  <step.icon size={26} className={step.bg === 'bg-brand-yellow' ? 'text-brand-dark' : 'text-white'} />
                </div>
                <div className="font-display font-black text-6xl text-gray-100 mb-2 leading-none select-none">{step.num}</div>
                <h3 className="font-display font-black text-xl text-brand-dark mb-2">{step.title}</h3>
                <p className="font-body text-brand-muted leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/customize" className="btn-primary text-base px-8 py-4">
              <Wand2 size={20} />
              ลองทำเลย — ดีไซน์ฟรี
            </Link>
          </div>
        </div>
      </section>

      <div className="brick-row" />

      {/* ─── Use Cases ─── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">เหมาะสำหรับ</span>
            <h2 className="section-title">เหมาะสำหรับทุกโอกาส</h2>
            <p className="section-subtitle">ไม่ว่าจะเป็นของขวัญหรือของสะสม BrickMe มีคำตอบให้ทุกโมเมนต์</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {useCases.map((uc, i) => (
              <Link
                key={i}
                href={uc.href}
                className={`${uc.bg} rounded-lg border-3 ${uc.border} shadow-brick p-6 md:p-7 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brick-sm transition-all duration-100 focus-ring group block`}
              >
                <div className={`w-12 h-12 bg-white/20 border-2 border-white/40 rounded-lg flex items-center justify-center mb-4`}>
                  <uc.Icon size={22} className={uc.iconColor} />
                </div>
                <h3 className={`font-display font-black text-lg mb-2 ${uc.bg === 'bg-brand-yellow' ? 'text-brand-dark' : 'text-white'}`}>
                  {uc.title}
                </h3>
                <p className={`font-body text-sm leading-relaxed ${uc.bg === 'bg-brand-yellow' ? 'text-brand-dark/70' : 'text-white/80'}`}>
                  {uc.desc}
                </p>
                <div className={`flex items-center gap-1 mt-4 font-display font-black text-sm group-hover:gap-2 transition-all duration-100 ${uc.bg === 'bg-brand-yellow' ? 'text-brand-dark' : 'text-white'}`}>
                  ดูเพิ่มเติม <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="brick-row-yellow" />

      {/* ─── Featured Gallery ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="section-label">ผลงาน</span>
              <h2 className="section-title">ผลงานที่ผ่านมา</h2>
              <p className="section-subtitle mt-2">แรงบันดาลใจจากออเดอร์จริงของลูกค้า</p>
            </div>
            <Link
              href="/shop"
              className="hidden md:flex items-center gap-2 font-display font-black text-brand-dark border-3 border-brand-dark bg-white px-4 py-2 rounded-lg shadow-brick hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brick-sm transition-all duration-75"
            >
              ดูทั้งหมด <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link href="/shop" className="btn-outline">
              ดูสินค้าทั้งหมด <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <div className="brick-row" />

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <span className="section-label">รีวิวจริง</span>
            <h2 className="section-title">ลูกค้าพูดถึงเรา</h2>
            <p className="section-subtitle">รีวิวจริงจากผู้สั่งจริง ไม่มีปั้นแต่ง</p>
          </div>
          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </section>

      <div className="brick-row-yellow" />

      {/* ─── FAQ ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <span className="section-label">FAQ</span>
              <h2 className="section-title">คำถามที่พบบ่อย</h2>
              <p className="section-subtitle">ตอบข้อสงสัยก่อนตัดสินใจสั่ง</p>
            </div>
            <FAQAccordion items={faqPreview} />
            <div className="text-center mt-8">
              <Link href="/faq" className="btn-outline">
                ดูคำถามทั้งหมด <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
