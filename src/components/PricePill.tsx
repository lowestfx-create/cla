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
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="rounded-xl border-3 border-brand-dark shadow-brick overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fff9e6 0%, #ffffff 100%)' }}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-brand-yellow border-2 border-brand-dark shadow-brick-sm flex items-center justify-center flex-shrink-0">
            <Tag size={15} className="text-brand-dark" />
          </div>
          <div>
            <p className="font-body text-brand-muted text-[10px] uppercase tracking-wider">ราคาปัจจุบัน</p>
            <div className="flex items-baseline gap-1">
              <AnimatePresence mode="wait">
                <motion.span
                  key={price}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="font-display font-black text-2xl text-brand-dark"
                >
                  {price.toLocaleString('th-TH')}
                </motion.span>
              </AnimatePresence>
              <span className="font-display font-bold text-sm text-brand-muted">฿</span>
            </div>
          </div>
        </div>

        {onAddToCart && (
          <button
            onClick={onAddToCart}
            className="btn-primary text-sm py-2.5 px-4 flex-shrink-0"
            aria-label={`เพิ่มลงตะกร้า ราคา ${price} บาท`}
          >
            <ShoppingCart size={15} />
            ใส่ตะกร้า
          </button>
        )}
      </div>

      {/* Bottom stud strip */}
      <div
        className="h-2"
        style={{
          background: 'repeating-linear-gradient(90deg, #FFD700 0px, #FFD700 18px, #E6C200 18px, #E6C200 20px)',
        }}
      />
    </motion.div>
  )
}
