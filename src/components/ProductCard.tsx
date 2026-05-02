'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Wand2 } from 'lucide-react'
import { Product } from '@/types'
import { cn, formatPrice } from '@/lib/utils'

interface ProductCardProps {
  product: Product
  lang?: 'th' | 'en'
}

const badgeConfig = {
  bestseller: { label: 'ขายดี', bg: 'bg-brand-yellow text-brand-dark' },
  new: { label: 'ใหม่', bg: 'bg-brand-red text-white' },
  sale: { label: 'พิเศษ', bg: 'bg-brand-green text-white' },
}

export default function ProductCard({ product, lang = 'th' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const name = lang === 'th' ? product.nameTH : product.name

  return (
    <motion.article
      className="bg-white rounded-lg border-3 border-brand-dark shadow-brick overflow-hidden group cursor-pointer"
      whileHover={{ x: -1, y: -1 }}
      animate={hovered ? { boxShadow: '6px 6px 0px #1A1A1A' } : { boxShadow: '4px 4px 0px #1A1A1A' }}
      transition={{ duration: 0.08 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} aria-label={name} className="focus-ring rounded-t-lg block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-neutral border-b-3 border-brand-dark">
          <Image
            src={hovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          {/* Badge */}
          {product.badge && (
            <span className={cn(
              'absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-xs font-display font-black border-2 border-brand-dark shadow-brick-sm',
              badgeConfig[product.badge].bg
            )}>
              {badgeConfig[product.badge].label}
            </span>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-brand-dark/30 flex items-center justify-center"
          >
            <span className="bg-brand-yellow text-brand-dark font-display font-black px-4 py-2 rounded-lg border-3 border-brand-dark shadow-brick-sm text-sm">
              ดูรายละเอียด
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4 pb-2">
          <p className="font-display font-black text-brand-dark truncate">{name}</p>
          <p className="font-body text-brand-muted text-xs mt-0.5 line-clamp-2">
            {lang === 'th' ? product.descriptionTH : product.description}
          </p>
          <div className="mt-3">
            <span className="font-display font-black text-xl text-brand-dark">
              {lang === 'th' ? `เริ่ม ${product.price.toLocaleString()}฿` : `From ฿${product.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      </Link>

      {/* Custom CTA */}
      <div className="px-4 pb-4 pt-2">
        <Link
          href={`/customize${product.preset ? `?preset=${product.preset}` : ''}`}
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 bg-brand-yellow text-brand-dark font-display font-black text-sm rounded-lg border-3 border-brand-dark shadow-brick-sm hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all duration-75"
          aria-label={`Custom จากแบบ ${name}`}
        >
          <Wand2 size={14} />
          Custom จากแบบนี้
        </Link>
      </div>
    </motion.article>
  )
}
