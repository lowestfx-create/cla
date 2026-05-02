'use client'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Pencil, ShoppingBag, ArrowRight, Tag, Plus, Package } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

function EmptyCart() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-brand-neutral px-4">
      <div className="w-28 h-28 mx-auto mb-6 relative">
        <div className="w-full h-full bg-brand-yellow border-3 border-brand-dark shadow-brick-lg rounded-2xl flex items-center justify-center">
          <ShoppingBag size={48} className="text-brand-dark" />
        </div>
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-brand-red border-3 border-brand-dark rounded-full flex items-center justify-center shadow-brick-sm">
          <span className="font-display font-black text-white text-sm">0</span>
        </div>
      </div>
      <h1 className="font-display font-black text-3xl text-brand-dark mb-2">ตะกร้าว่างอยู่</h1>
      <p className="font-body text-brand-muted mb-2 text-center max-w-xs">
        ยังไม่มีสินค้าในตะกร้า — ออกแบบตัวละครของคุณได้เลย
      </p>
      <p className="font-body text-brand-muted/60 text-sm mb-8">เริ่มต้นเพียง 590 บาท ส่งทั่วไทย</p>
      <div className="flex gap-3 flex-wrap justify-center">
        <Link href="/customize" className="btn-primary text-base px-8 py-4">
          <Plus size={18} /> เริ่ม Custom เลย
        </Link>
        <Link href="/shop" className="btn-outline text-base px-8 py-4">
          ดูผลงาน <ArrowRight size={18} />
        </Link>
      </div>
    </div>
  )
}

function ColorDot({ color }: { color?: string }) {
  if (!color) return null
  return (
    <span
      className="inline-block w-3.5 h-3.5 rounded-full border border-brand-dark/20 flex-shrink-0"
      style={{ background: color }}
    />
  )
}

export default function CartPage() {
  const { items, removeItem } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast(`ลบ "${name}" ออกจากตะกร้าแล้ว`)
  }

  if (items.length === 0) return <EmptyCart />

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Page header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-6 md:py-8">
          <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark">
            ตะกร้าสินค้า
          </h1>
          <p className="font-body text-brand-muted mt-1 text-sm">
            {items.length} ชิ้น • รวม ฿{total.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

          {/* ── Items ── */}
          <div className="lg:col-span-2 space-y-3">
            <AnimatePresence>
              {items.map((item, idx) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50, transition: { duration: 0.2 } }}
                  transition={{ delay: idx * 0.04 }}
                  className="bg-white rounded-xl border-3 border-brand-dark shadow-brick hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100 p-4 md:p-5 flex gap-4 items-start"
                >
                  {/* Thumbnail / color preview */}
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl overflow-hidden bg-brand-neutral border-2 border-brand-dark/15 flex-shrink-0 relative">
                    {item.thumbnail ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={item.thumbnail} alt={item.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center gap-1.5 p-2">
                        <div className="flex gap-1">
                          <ColorDot color={item.customConfig.topColor} />
                          <ColorDot color={item.customConfig.bottomColor} />
                        </div>
                        <div className="flex gap-1">
                          <ColorDot color={item.customConfig.hairColor} />
                          <ColorDot color={item.customConfig.skin} />
                        </div>
                        <Package size={14} className="text-brand-muted mt-0.5" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-black text-brand-dark text-base md:text-lg leading-tight">{item.name}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        item.customConfig.style === 'normal' ? 'Normal Body' : 'Mini Body',
                        item.customConfig.hairStyle,
                        item.customConfig.top,
                      ].filter(Boolean).map((v) => (
                        <span key={v} className="px-2 py-0.5 bg-brand-neutral rounded-full text-[10px] font-body text-brand-muted capitalize border border-brand-dark/10">
                          {v}
                        </span>
                      ))}
                    </div>
                    {item.customConfig.note && (
                      <p className="font-body text-brand-muted text-xs mt-2 line-clamp-2 italic">
                        "{item.customConfig.note}"
                      </p>
                    )}
                    {item.customConfig.base === 'engraved' && item.customConfig.baseName && (
                      <p className="font-body text-brand-muted text-xs mt-1">
                        🔖 ฐานสลัก: <span className="font-bold">{item.customConfig.baseName}</span>
                      </p>
                    )}
                  </div>

                  {/* Price + Actions */}
                  <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                    <p className="font-display font-black text-xl text-brand-dark">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex gap-1.5">
                      <Link
                        href="/customize"
                        className="p-2 rounded-lg bg-brand-neutral border border-brand-dark/15 hover:bg-brand-yellow hover:border-brand-dark transition-all duration-100 focus-ring"
                        aria-label="แก้ไขแบบ"
                        title="แก้ไขแบบ"
                      >
                        <Pencil size={14} />
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 rounded-lg bg-brand-neutral border border-brand-dark/15 hover:bg-red-50 hover:border-red-300 hover:text-red-500 transition-all duration-100 focus-ring"
                        aria-label="ลบออกจากตะกร้า"
                        title="ลบออก"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Add more */}
            <Link
              href="/customize"
              className="flex items-center gap-2 text-brand-muted hover:text-brand-dark font-body text-sm transition-colors mt-2 group py-2"
            >
              <span className="w-6 h-6 rounded-full border-2 border-dashed border-brand-muted group-hover:border-brand-dark flex items-center justify-center transition-colors">
                <Plus size={12} />
              </span>
              เพิ่มตัวละครอีกตัว
            </Link>
          </div>

          {/* ── Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden sticky top-24">
              {/* Header */}
              <div className="bg-brand-yellow px-5 py-4 border-b-2 border-brand-dark">
                <h2 className="font-display font-black text-lg text-brand-dark">สรุปออเดอร์</h2>
              </div>

              <div className="p-5">
                {/* Item breakdown */}
                <div className="space-y-2.5 mb-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm gap-2">
                      <span className="font-body text-brand-muted truncate">{item.name}</span>
                      <span className="font-body font-bold text-brand-dark flex-shrink-0">฿{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-2 mb-5">
                  <div className="flex justify-between text-sm">
                    <span className="font-body text-brand-muted">ค่าจัดส่ง</span>
                    <span className="font-body text-brand-muted italic">คิดตอนชำระ</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="font-display font-bold text-brand-dark">รวมสินค้า</span>
                    <span className="font-display font-black text-2xl text-brand-dark">฿{total.toLocaleString()}</span>
                  </div>
                </div>

                <Link href="/checkout" className="btn-primary w-full justify-center py-3.5 text-base">
                  ชำระเงิน <ArrowRight size={18} />
                </Link>

                {/* Trust signals */}
                <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-body text-brand-muted">
                    <Tag size={12} className="flex-shrink-0" />
                    ราคารวม VAT แล้ว ยังไม่รวมค่าส่ง
                  </div>
                  <div className="flex items-center gap-2 text-xs font-body text-brand-muted">
                    <ShoppingBag size={12} className="flex-shrink-0" />
                    PromptPay · โอนเงิน · บัตรเครดิต/เดบิต
                  </div>
                </div>
              </div>

              {/* Stud strip */}
              <div className="brick-row-yellow" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
