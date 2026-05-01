'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Tag } from 'lucide-react'

interface PricePillProps {
  price: number
  onAddToCart?: () => void
}

export default function PricePill({ price, onAddToCart }: PricePillProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white rounded-2xl shadow-card-hover border border-brand-yellow/30 p-4 flex items-center justify-between gap-4"
    >
      <div className="flex items-center gap-2">
        <Tag size={18} className="text-brand-yellow" />
        <div>
          <p className="font-body text-brand-muted text-xs">ราคาปัจจุบัน</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={price}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="font-display font-black text-2xl text-brand-dark"
            >
              {price.toLocaleString('th-TH')}
              <span className="text-sm font-bold text-brand-muted ml-1">บาท</span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {onAddToCart && (
        <button
          onClick={onAddToCart}
          className="btn-primary text-sm py-2.5 px-5 flex-shrink-0"
          aria-label={`เพิ่มลงตะกร้า ราคา ${price} บาท`}
        >
          <ShoppingCart size={16} />
          เพิ่มลงตะกร้า
        </button>
      )}
    </motion.div>
  )
}
