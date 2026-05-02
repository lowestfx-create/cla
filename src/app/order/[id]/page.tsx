'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, Printer, Truck, Star, MessageCircle, Upload, Copy, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'

const TIMELINE = [
  { icon: Check, label: 'รับออเดอร์แล้ว', desc: 'ระบบได้รับออเดอร์เรียบร้อย', done: true, current: false, date: '1 พ.ค. 2567 · 10:32' },
  { icon: MessageCircle, label: 'ยืนยันแบบ', desc: 'ทีมงานส่งรูปต้นแบบให้ดูก่อนปริ้นต์', done: true, current: false, date: '2 พ.ค. 2567 · 14:15' },
  { icon: Printer, label: 'กำลังปริ้นต์', desc: 'ปริ้นต์ 3D และลงสีอยู่', done: true, current: false, date: '3 พ.ค. 2567 · 09:00' },
  { icon: Package, label: 'QC + แพ็คสินค้า', desc: 'ตรวจคุณภาพและบรรจุกล่อง', done: false, current: true, date: null },
  { icon: Truck, label: 'จัดส่งแล้ว', desc: 'สินค้าอยู่ระหว่างการขนส่ง', done: false, current: false, date: null },
]

export default function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const [message, setMessage] = useState('')
  const currentStep = TIMELINE.findIndex((t) => t.current)
  const doneCount = TIMELINE.filter((t) => t.done).length

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('TH123456789')
    toast('คัดลอกเลข tracking แล้ว')
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    toast.success('ส่งข้อความถึงทีมงานแล้ว')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-brand-neutral">

      {/* Page header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-6 md:py-8">
          <p className="font-body text-brand-muted text-sm mb-1">หมายเลขออเดอร์</p>
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark">{id}</h1>
            <span className="px-4 py-2 bg-brand-yellow border-2 border-brand-dark font-display font-bold text-sm rounded-lg shadow-[2px_2px_0_#1A1A1A]">
              กำลังผลิต
            </span>
          </div>
          <p className="font-body text-brand-muted text-sm mt-1">สั่งเมื่อ 1 พ.ค. 2567</p>
        </div>
      </div>

      <div className="container-site py-8 max-w-3xl space-y-5">

        {/* Order summary */}
        <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-yellow px-5 py-3.5 border-b-2 border-brand-dark">
            <h2 className="font-display font-bold text-base text-brand-dark">ข้อมูลออเดอร์</h2>
          </div>
          <div className="p-5 grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'สินค้า', value: 'Custom Classic Mini × 1' },
              { label: 'ยอดรวม', value: '฿720' },
              { label: 'ผู้รับ', value: 'สมชาย รักงาน' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body text-brand-muted text-xs uppercase tracking-wide mb-1">{label}</p>
                <p className="font-display font-bold text-brand-dark">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Progress bar summary */}
        <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-display font-bold text-base text-brand-dark">ความคืบหน้า</h2>
            <span className="font-body text-brand-muted text-sm">{doneCount}/{TIMELINE.length} ขั้นตอน</span>
          </div>
          <div className="w-full h-3 bg-brand-neutral rounded-full overflow-hidden border border-brand-dark/10">
            <motion.div
              className="h-full bg-brand-yellow rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(doneCount / TIMELINE.length) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="font-body text-brand-muted text-xs mt-2">
            ขั้นตอนปัจจุบัน: <span className="font-bold text-brand-dark">{TIMELINE.find(t => t.current)?.label}</span>
          </p>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-neutral/60 px-5 py-3.5 border-b-2 border-brand-dark/10">
            <h2 className="font-display font-bold text-base text-brand-dark">สถานะออเดอร์</h2>
          </div>
          <div className="p-5">
            <div className="relative">
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
              <motion.div
                className="absolute left-5 top-0 w-0.5 bg-brand-yellow"
                initial={{ height: 0 }}
                animate={{ height: `${((currentStep + 1) / TIMELINE.length) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />

              <div className="space-y-7">
                {TIMELINE.map((step, i) => {
                  const Icon = step.icon
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="relative flex items-start gap-5 pl-2"
                    >
                      <div className={`relative z-10 w-9 h-9 rounded-xl border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                        step.done
                          ? 'bg-brand-yellow border-brand-dark shadow-[2px_2px_0_#1A1A1A]'
                          : step.current
                          ? 'bg-brand-dark border-brand-dark shadow-[2px_2px_0_rgba(0,0,0,0.3)]'
                          : 'bg-white border-gray-200'
                      }`}>
                        <Icon size={15} className={step.done ? 'text-brand-dark' : step.current ? 'text-brand-yellow' : 'text-gray-300'} />
                      </div>

                      <div className="flex-1 pb-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className={`font-display font-bold text-sm ${step.done || step.current ? 'text-brand-dark' : 'text-gray-400'}`}>
                            {step.label}
                            {step.current && (
                              <span className="ml-2 px-2 py-0.5 bg-brand-yellow border border-brand-dark text-brand-dark text-[10px] font-black rounded-full">
                                กำลังดำเนินการ
                              </span>
                            )}
                          </p>
                          {step.date && (
                            <span className="font-body text-xs text-brand-muted">{step.date}</span>
                          )}
                        </div>
                        <p className={`font-body text-xs mt-0.5 ${step.done || step.current ? 'text-brand-muted' : 'text-gray-300'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Message to team */}
        <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-neutral/60 px-5 py-3.5 border-b-2 border-brand-dark/10">
            <h2 className="font-display font-bold text-base text-brand-dark">ส่งข้อความถึงทีมงาน</h2>
          </div>
          <div className="p-5 space-y-3">
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="เช่น 'ขอปรับสีเสื้อเป็นสีแดงได้ไหม' หรือถามสถานะ"
              className="w-full px-4 py-3 bg-brand-neutral rounded-xl border-2 border-brand-dark/15 focus:border-brand-yellow outline-none font-body text-sm resize-none transition-colors"
            />
            <div className="flex gap-2">
              <button onClick={handleSendMessage} className="btn-primary text-sm py-2.5 px-5">
                ส่งข้อความ
              </button>
              <label className="btn-outline text-sm py-2.5 px-4 cursor-pointer flex items-center gap-1.5">
                <Upload size={14} />
                แนบรูป
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Tracking */}
        <div className="bg-white rounded-2xl border-3 border-brand-dark/30 shadow-brick-sm p-5 opacity-60">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-brand-muted text-xs uppercase tracking-wide mb-1">เลข Tracking (Kerry Express)</p>
              <p className="font-display font-bold text-brand-dark text-lg">TH123456789</p>
            </div>
            <button onClick={handleCopyTracking} className="btn-outline text-sm py-2 px-4 gap-2 flex items-center">
              <Copy size={14} />
              คัดลอก
            </button>
          </div>
          <p className="font-body text-brand-muted text-xs mt-3">เลข tracking จะปรากฏเมื่อสินค้าถูกจัดส่งแล้ว</p>
        </div>

        {/* Review prompt */}
        <div className="rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-yellow p-6 text-center">
            <div className="flex justify-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={24} className="fill-brand-dark text-brand-dark" />
              ))}
            </div>
            <p className="font-display font-black text-brand-dark text-lg mb-1">ได้รับสินค้าแล้ว?</p>
            <p className="font-body text-brand-dark/70 text-sm mb-5">รีวิวให้เราหน่อยนะ ช่วยได้เยอะมากเลย</p>
            <div className="flex gap-3 justify-center flex-wrap">
              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white font-display font-black rounded-xl border-2 border-brand-dark shadow-[2px_2px_0_rgba(0,0,0,0.3)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-75"
              >
                <MessageCircle size={18} />
                รีวิวผ่าน LINE
              </a>
              <Link href="/shop" className="inline-flex items-center gap-2 px-6 py-3 bg-white border-3 border-brand-dark rounded-xl font-display font-black shadow-brick-sm hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-75">
                สั่งอีกครั้ง
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="brick-row" />
        </div>

      </div>
    </div>
  )
}
