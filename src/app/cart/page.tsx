'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Pencil, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem } = useCartStore()
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const handleRemove = (id: string, name: string) => {
    removeItem(id)
    toast(`🗑️ ลบ "${name}" ออกจากตะกร้าแล้ว`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-brand-neutral px-4">
        <div className="text-7xl mb-5">🛒</div>
        <h1 className="font-display font-black text-3xl text-brand-dark mb-2">ตะกร้าว่างอยู่</h1>
        <p className="font-body text-brand-muted mb-8">ยังไม่มีสินค้า — ออกแบบตัวละครของคุณได้เลย</p>
        <Link href="/customize" className="btn-primary text-base px-8 py-4">
          เริ่ม Custom เลย →
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      <div className="container-site py-10">
        <h1 className="font-display font-black text-4xl text-brand-dark mb-8">
          ตะกร้าสินค้า
          <span className="ml-3 text-xl font-bold text-brand-muted">({items.length} ชิ้น)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="bg-white rounded-2xl p-5 shadow-card flex gap-4 items-start"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-neutral flex-shrink-0">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🧱</div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-brand-dark text-lg leading-tight">{item.name}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[
                        item.customConfig.style,
                        item.customConfig.hairStyle,
                        item.customConfig.top,
                      ].filter(Boolean).map((v) => (
                        <span key={v} className="px-2 py-0.5 bg-brand-neutral rounded-full text-xs font-body text-brand-muted capitalize">
                          {v}
                        </span>
                      ))}
                    </div>
                    {item.customConfig.note && (
                      <p className="font-body text-brand-muted text-xs mt-2 line-clamp-1">
                        💬 {item.customConfig.note}
                      </p>
                    )}
                  </div>

                  {/* Price + Actions */}
                  <div className="flex flex-col items-end gap-3 flex-shrink-0">
                    <p className="font-display font-black text-xl text-brand-dark">
                      ฿{(item.price * item.quantity).toLocaleString()}
                    </p>
                    <div className="flex gap-2">
                      <Link
                        href={`/customize?id=${item.id}`}
                        className="p-2 rounded-xl bg-brand-neutral hover:bg-brand-yellow transition-colors focus-ring"
                        aria-label="แก้ไขแบบ"
                      >
                        <Pencil size={15} />
                      </Link>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="p-2 rounded-xl bg-brand-neutral hover:bg-red-50 hover:text-red-500 transition-colors focus-ring"
                        aria-label="ลบออกจากตะกร้า"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/customize" className="flex items-center gap-2 text-brand-muted hover:text-brand-dark font-body text-sm transition-colors mt-2">
              + เพิ่มตัวละครอีกตัว
            </Link>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
              <h2 className="font-display font-bold text-xl text-brand-dark mb-5">สรุปออเดอร์</h2>

              <div className="space-y-3 mb-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="font-body text-brand-muted truncate mr-2">{item.name}</span>
                    <span className="font-body text-brand-dark flex-shrink-0">฿{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-5 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-body text-brand-muted">ค่าจัดส่ง</span>
                  <span className="font-body text-brand-dark">คำนวณในขั้นตอนถัดไป</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-display font-bold text-brand-dark">รวมทั้งหมด</span>
                  <span className="font-display font-black text-2xl text-brand-dark">฿{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full justify-center py-4 text-base">
                ดำเนินการชำระเงิน
                <ArrowRight size={18} />
              </Link>

              <div className="flex items-center justify-center gap-2 mt-4">
                <Tag size={14} className="text-brand-muted" />
                <p className="font-body text-brand-muted text-xs">ราคารวม VAT แล้ว ยังไม่รวมค่าส่ง</p>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-2">
                <ShoppingBag size={16} className="text-brand-muted flex-shrink-0" />
                <p className="font-body text-brand-muted text-xs leading-relaxed">
                  ชำระเงินได้ผ่าน PromptPay, บัตรเครดิต/เดบิต หรือโอนเงิน
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
