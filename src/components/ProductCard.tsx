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
  bestseller: { label: 'ขายดี', color: 'bg-brand-yellow text-brand-dark' },
  new: { label: 'ใหม่', color: 'bg-brand-red text-white' },
  sale: { label: 'พิเศษ', color: 'bg-green-500 text-white' },
}

export default function ProductCard({ product, lang = 'th' }: ProductCardProps) {
  const [hovered, setHovered] = useState(false)
  const name = lang === 'th' ? product.nameTH : product.name

  return (
    <motion.article
      className="card overflow-hidden group cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Link href={`/product/${product.slug}`} aria-label={name} className="focus-ring rounded-2xl block">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-brand-neutral">
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
              'absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-display font-bold shadow-sm',
              badgeConfig[product.badge].color
            )}>
              {badgeConfig[product.badge].label}
            </span>
          )}

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute inset-0 bg-brand-dark/20 flex items-center justify-center"
          >
            <span className="bg-white text-brand-dark font-display font-bold px-4 py-2 rounded-xl text-sm shadow-lg">
              ดูรายละเอียด
            </span>
          </motion.div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-display font-bold text-brand-dark truncate">{name}</p>
          <p className="font-body text-brand-muted text-sm mt-0.5 line-clamp-2">
            {lang === 'th' ? product.descriptionTH : product.description}
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="font-display font-black text-lg text-brand-dark">
              {lang === 'th' ? `เริ่ม ${product.price.toLocaleString()}฿` : `From ฿${product.price.toLocaleString()}`}
            </span>
          </div>
        </div>
      </Link>

      {/* Custom CTA */}
      <div className="px-4 pb-4">
        <Link
          href={`/customize${product.preset ? `?preset=${product.preset}` : ''}`}
          className="w-full btn-primary text-sm py-2.5 justify-center gap-2"
          aria-label={`Custom จากแบบ ${name}`}
        >
          <Wand2 size={15} />
          Custom จากแบบนี้
        </Link>
      </div>
    </motion.article>
  )
}
