import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Wand2, Package, Truck, Star } from 'lucide-react'
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
    color: 'bg-brand-yellow',
  },
  {
    icon: Package,
    title: 'ปริ้นต์ & ตรวจคุณภาพ',
    desc: 'ทีมงานปริ้นต์ 3D ด้วยเรซิ่น UV คุณภาพสูง ตรวจทุกชิ้นก่อนส่ง',
    color: 'bg-brand-red',
  },
  {
    icon: Truck,
    title: 'ส่งถึงบ้านคุณ',
    desc: 'แพ็คสวยงาม ส่งเร็วผ่าน Kerry / Flash / J&T มีเลข tracking ติดตามได้ทุกขั้น',
    color: 'bg-brand-dark',
  },
]

const useCases = [
  {
    emoji: '💛',
    title: 'ของขวัญคนพิเศษ',
    desc: 'วันเกิด ครบรอบ วาเลนไทน์ — ของขวัญที่ไม่เคยซ้ำใคร',
    href: '/shop?category=gift',
    bg: 'bg-yellow-50',
  },
  {
    emoji: '💍',
    title: 'งานแต่งงาน',
    desc: 'Cake Topper บ่าวสาวที่หน้าเหมือนคุณจริงๆ ที่ระลึกที่ไม่มีวางขาย',
    href: '/shop?category=wedding',
    bg: 'bg-pink-50',
  },
  {
    emoji: '🏢',
    title: 'ของขวัญบริษัท',
    desc: 'B2B ขั้นต่ำ 10 ชิ้น ราคาพิเศษ พร้อมโลโก้บริษัทบนฐาน',
    href: '/shop?category=b2b',
    bg: 'bg-blue-50',
  },
  {
    emoji: '✨',
    title: 'ของสะสม',
    desc: 'ตัวละครที่เป็นตัวคุณเอง 100% ไม่มีที่ไหนในโลกที่เหมือนกัน',
    href: '/shop?category=collect',
    bg: 'bg-purple-50',
  },
]

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8)
  const faqPreview = FAQ_ITEMS.slice(0, 4)

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[90vh] md:min-h-[85vh] bg-brand-yellow overflow-hidden flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-dark" />
          <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-brand-dark" />
          <div className="absolute bottom-20 left-1/4 w-24 h-24 rounded-full bg-brand-dark" />
        </div>

        <div className="container-site relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full mb-6 shadow-sm">
                <Star size={14} className="fill-brand-dark text-brand-dark" />
                <span className="font-body text-brand-dark text-sm font-semibold">ปริ้นต์ 3D คุณภาพระดับของขวัญ</span>
              </div>

              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-brand-dark leading-tight mb-4">
                ตัวคุณใน<br />
                เวอร์ชันเลโก้<br />
                <span className="text-white">ส่งให้ในมือเดียว</span>
              </h1>

              <p className="font-body text-brand-dark/80 text-lg mb-8 leading-relaxed">
                ออกแบบ Minifigure Custom ด้วยตัวเอง • ระยะเวลา 7–14 วัน<br />
                <strong>เริ่มต้นเพียง 590 บาท</strong> ส่งทั่วไทย
              </p>

              <div className="flex flex-wrap gap-3">
                <Link href="/customize" className="btn-primary bg-brand-dark text-white hover:bg-gray-800 shadow-lg text-base px-8 py-4">
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
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-yellow overflow-hidden bg-white">
                      <Image
                        src={`https://api.dicebear.com/8.x/avataaars/svg?seed=hero${i}`}
                        alt={`ลูกค้า ${i}`}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={14} className="fill-brand-dark text-brand-dark" />
                    ))}
                  </div>
                  <p className="font-body text-brand-dark/70 text-xs mt-0.5">ลูกค้าพึงพอใจ 500+ ออเดอร์</p>
                </div>
              </div>
            </div>

            {/* Hero image / minifigures */}
            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm">
                {/* Main figure */}
                <div className="w-64 h-64 md:w-80 md:h-80 mx-auto bg-white rounded-[40px] shadow-card-hover overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1585378169254-e79b8c54e7ef?w=400&h=400&fit=crop"
                    alt="ตัวอย่าง Minifigure Custom"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Floating cards */}
                <div className="absolute -left-4 top-8 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2">
                  <span className="text-2xl">🎨</span>
                  <div>
                    <p className="font-display font-bold text-xs text-brand-dark">Custom 100%</p>
                    <p className="font-body text-[10px] text-brand-muted">ออกแบบเองทุกอย่าง</p>
                  </div>
                </div>

                <div className="absolute -right-4 bottom-16 bg-white rounded-2xl shadow-card p-3 flex items-center gap-2">
                  <span className="text-2xl">📦</span>
                  <div>
                    <p className="font-display font-bold text-xs text-brand-dark">ส่งเร็ว 7–14 วัน</p>
                    <p className="font-body text-[10px] text-brand-muted">มี tracking ทุกชิ้น</p>
                  </div>
                </div>

                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-brand-dark text-white rounded-2xl shadow-card px-4 py-2">
                  <p className="font-display font-bold text-sm">เริ่มต้น 590฿</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 20 720 25C840 30 960 30 1080 25C1200 20 1320 10 1380 5L1440 0V60H0Z" fill="#F8F7F4"/>
          </svg>
        </div>
      </section>

      {/* ─── How it works ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">สั่งง่าย ใน 3 ขั้นตอน</h2>
            <p className="section-subtitle">ไม่ต้องมีประสบการณ์ออกแบบ ก็ได้ตัวละครที่เป็นตัวเองได้</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {howItWorksSteps.map((step, i) => (
              <div key={i} className="card p-8 text-center group hover:scale-[1.02] transition-transform duration-200">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md`}>
                  <step.icon size={28} className={step.color === 'bg-brand-dark' ? 'text-white' : 'text-brand-dark'} />
                </div>
                <div className="font-display font-black text-5xl text-gray-100 mb-2 -mt-2">{i + 1}</div>
                <h3 className="font-display font-bold text-xl text-brand-dark mb-2">{step.title}</h3>
                <p className="font-body text-brand-muted leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/customize" className="btn-primary text-base px-8 py-4">
              <Wand2 size={20} />
              ลองทำเลย — ฟรี ไม่มีค่าใช้จ่ายในการดีไซน์
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Use Cases ─── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">เหมาะสำหรับทุกโอกาส</h2>
            <p className="section-subtitle">ไม่ว่าจะเป็นของขวัญหรือของสะสม BrickMe มีคำตอบให้ทุกโมเมนต์</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {useCases.map((uc, i) => (
              <Link
                key={i}
                href={uc.href}
                className={`${uc.bg} rounded-3xl p-6 md:p-8 hover:scale-[1.02] transition-transform duration-200 focus-ring group`}
              >
                <div className="text-4xl mb-4">{uc.emoji}</div>
                <h3 className="font-display font-bold text-brand-dark text-lg mb-2">{uc.title}</h3>
                <p className="font-body text-brand-muted text-sm leading-relaxed">{uc.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-brand-dark font-display font-bold text-sm group-hover:gap-2 transition-all">
                  ดูเพิ่มเติม <ArrowRight size={14} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Featured Gallery ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-title">ผลงานที่ผ่านมา</h2>
              <p className="section-subtitle mt-2">แรงบันดาลใจจากออเดอร์จริงของลูกค้า</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 font-display font-bold text-brand-dark hover:text-brand-yellow transition-colors">
              ดูทั้งหมด <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* ─── Testimonials ─── */}
      <section className="py-20 bg-white">
        <div className="container-site">
          <div className="text-center mb-12">
            <h2 className="section-title">ลูกค้าพูดถึงเรา</h2>
            <p className="section-subtitle">รีวิวจริงจากผู้สั่งจริง ไม่มีปั้นแต่ง</p>
          </div>
          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </section>

      {/* ─── FAQ Preview ─── */}
      <section className="py-20 bg-brand-neutral">
        <div className="container-site">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
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
