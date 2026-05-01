import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Star, Wand2, ShoppingCart, Shield, Truck, RotateCcw } from 'lucide-react'
import { PRODUCTS } from '@/lib/data'
import ProductCard from '@/components/ProductCard'
import AddToCartButton from '@/components/AddToCartButton'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = PRODUCTS.find((p) => p.slug === params.slug)
  if (!product) return { title: 'ไม่พบสินค้า' }
  return {
    title: `${product.nameTH} | BrickMe`,
    description: product.descriptionTH,
    openGraph: {
      title: product.nameTH,
      description: product.descriptionTH,
      images: [{ url: product.images[0], width: 600, height: 600, alt: product.nameTH }],
    },
  }
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

const GUARANTEES = [
  { icon: Shield, label: 'QC ทุกชิ้นก่อนส่ง', desc: 'ตรวจคุณภาพ 3 จุด' },
  { icon: Truck, label: 'ส่งเร็ว 7–14 วัน', desc: 'มี tracking ทุกออเดอร์' },
  { icon: RotateCcw, label: 'แก้ได้ 2 ครั้งฟรี', desc: 'ในขั้นยืนยันแบบ' },
]

export default function ProductDetailPage({ params }: Props) {
  const product = PRODUCTS.find((p) => p.slug === params.slug)
  if (!product) notFound()

  const related = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.nameTH,
    description: product.descriptionTH,
    image: product.images,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'THB',
      availability: 'https://schema.org/InStock',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="min-h-screen bg-brand-neutral">
        <div className="container-site py-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <Link href="/shop" className="flex items-center gap-1.5 text-brand-muted hover:text-brand-dark font-body text-sm transition-colors focus-ring rounded">
              <ArrowLeft size={16} />
              กลับไป Shop
            </Link>
            <span className="text-gray-300">/</span>
            <span className="font-body text-sm text-brand-dark">{product.nameTH}</span>
          </div>

          <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
            {/* Images */}
            <div className="space-y-3">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-card">
                <Image
                  src={product.images[0]}
                  alt={product.nameTH}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.badge && (
                  <span className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-display font-bold shadow
                    ${product.badge === 'bestseller' ? 'bg-brand-yellow text-brand-dark' :
                      product.badge === 'new' ? 'bg-brand-red text-white' : 'bg-green-500 text-white'}`}>
                    {product.badge === 'bestseller' ? '🔥 ขายดี' : product.badge === 'new' ? '✨ ใหม่' : '🏷️ พิเศษ'}
                  </span>
                )}
              </div>
              {product.images[1] && (
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-white shadow-card">
                  <Image src={product.images[1]} alt={`${product.nameTH} มุมที่ 2`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-yellow text-brand-yellow" />
                ))}
                <span className="font-body text-brand-muted text-sm ml-1">5.0 (รีวิว 48 ครั้ง)</span>
              </div>

              <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark leading-tight mb-2">
                {product.nameTH}
              </h1>
              <p className="font-body text-brand-muted leading-relaxed mb-6">
                {product.descriptionTH}
              </p>

              {/* Price */}
              <div className="bg-brand-light rounded-2xl p-5 mb-6">
                <p className="font-body text-brand-muted text-sm">ราคาเริ่มต้น</p>
                <p className="font-display font-black text-4xl text-brand-dark mt-1">
                  ฿{product.price.toLocaleString()}
                </p>
                <p className="font-body text-brand-muted text-xs mt-1">
                  ราคาสุดท้ายขึ้นอยู่กับ options ที่เลือกใน Customizer
                </p>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href={`/customize${product.preset ? `?preset=${product.preset}` : ''}`}
                  className="btn-primary flex-1 py-4 text-base justify-center"
                >
                  <Wand2 size={20} />
                  Custom แบบนี้เลย
                </Link>
                <AddToCartButton product={product} />
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {GUARANTEES.map((g) => (
                  <div key={g.label} className="bg-white rounded-2xl p-4 text-center shadow-card">
                    <g.icon size={22} className="mx-auto mb-2 text-brand-dark" />
                    <p className="font-display font-bold text-xs text-brand-dark leading-tight">{g.label}</p>
                    <p className="font-body text-[10px] text-brand-muted mt-0.5">{g.desc}</p>
                  </div>
                ))}
              </div>

              {/* Details */}
              <div className="bg-white rounded-2xl p-5 shadow-card space-y-3">
                <h3 className="font-display font-bold text-brand-dark">รายละเอียดสินค้า</h3>
                {[
                  ['วัสดุ', 'UV Resin คุณภาพสูง'],
                  ['ความสูง', 'Classic 6 cm / Chibi 7 cm / Realistic 7.5 cm'],
                  ['ระยะเวลาผลิต', '7–14 วันทำการ'],
                  ['การจัดส่ง', 'Kerry / Flash / J&T / EMS'],
                  ['แก้แบบฟรี', '2 ครั้ง ในขั้นยืนยันแบบ'],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 text-sm">
                    <span className="font-body text-brand-muted flex-shrink-0">{k}</span>
                    <span className="font-body text-brand-dark text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="font-display font-black text-2xl text-brand-dark mb-6">สินค้าที่คล้ายกัน</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {related.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
