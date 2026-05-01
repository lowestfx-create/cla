'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Check, Package, Printer, Truck, Star, MessageCircle, Upload, Copy } from 'lucide-react'
import { toast } from 'sonner'

const TIMELINE = [
  { icon: Check, label: 'รับออเดอร์แล้ว', desc: 'ระบบได้รับออเดอร์เรียบร้อย', done: true, date: '1 พ.ค. 2567 · 10:32' },
  { icon: MessageCircle, label: 'ยืนยันแบบ', desc: 'ทีมงานส่งรูปต้นแบบให้ดูก่อนปริ้นต์', done: true, date: '2 พ.ค. 2567 · 14:15' },
  { icon: Printer, label: 'กำลังปริ้นต์', desc: 'ปริ้นต์ 3D และลงสีอยู่', done: true, date: '3 พ.ค. 2567 · 09:00' },
  { icon: Package, label: 'QC + แพ็คสินค้า', desc: 'ตรวจคุณภาพและบรรจุกล่อง', done: false, current: true, date: null },
  { icon: Truck, label: 'จัดส่งแล้ว', desc: 'สินค้าอยู่ระหว่างการขนส่ง', done: false, current: false, date: null },
]

export default function OrderPage() {
  const { id } = useParams<{ id: string }>()
  const [message, setMessage] = useState('')
  const currentStep = TIMELINE.findIndex((t) => t.current)

  const handleCopyTracking = () => {
    navigator.clipboard.writeText('TH123456789')
    toast('📋 คัดลอกเลข tracking แล้ว')
  }

  const handleSendMessage = () => {
    if (!message.trim()) return
    toast.success('✅ ส่งข้อความถึงทีมงานแล้ว')
    setMessage('')
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      <div className="container-site py-10 max-w-3xl">

        {/* Header */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card mb-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-body text-brand-muted text-sm">หมายเลขออเดอร์</p>
              <h1 className="font-display font-black text-3xl text-brand-dark mt-1">{id}</h1>
              <p className="font-body text-brand-muted text-sm mt-1">สั่งเมื่อ 1 พ.ค. 2567</p>
            </div>
            <span className="px-4 py-2 bg-brand-yellow text-brand-dark font-display font-bold text-sm rounded-full">
              กำลังผลิต
            </span>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 grid sm:grid-cols-3 gap-4 text-sm">
            {[
              { label: 'สินค้า', value: 'Custom Classic Mini × 1' },
              { label: 'ยอดรวม', value: '฿720' },
              { label: 'ผู้รับ', value: 'สมชาย รักงาน' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p className="font-body text-brand-muted">{label}</p>
                <p className="font-display font-bold text-brand-dark mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card mb-6">
          <h2 className="font-display font-bold text-xl text-brand-dark mb-8">สถานะออเดอร์</h2>

          <div className="relative">
            {/* vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-100" />
            <div
              className="absolute left-5 top-0 w-0.5 bg-brand-yellow transition-all duration-700"
              style={{ height: `${((currentStep + 1) / TIMELINE.length) * 100}%` }}
            />

            <div className="space-y-8">
              {TIMELINE.map((step, i) => {
                const Icon = step.icon
                const isDone = step.done
                const isCurrent = step.current

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex items-start gap-5 pl-2"
                  >
                    {/* dot */}
                    <div className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isDone ? 'bg-brand-yellow shadow-pill' :
                      isCurrent ? 'bg-brand-dark ring-4 ring-brand-yellow/30' :
                      'bg-gray-100'
                    }`}>
                      <Icon size={16} className={isDone ? 'text-brand-dark' : isCurrent ? 'text-white' : 'text-gray-400'} />
                    </div>

                    <div className="flex-1 pb-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className={`font-display font-bold ${isDone || isCurrent ? 'text-brand-dark' : 'text-gray-400'}`}>
                          {step.label}
                          {isCurrent && (
                            <span className="ml-2 px-2 py-0.5 bg-brand-yellow text-brand-dark text-[10px] font-bold rounded-full">
                              ขั้นตอนปัจจุบัน
                            </span>
                          )}
                        </p>
                        {step.date && (
                          <span className="font-body text-xs text-brand-muted">{step.date}</span>
                        )}
                      </div>
                      <p className={`font-body text-sm mt-0.5 ${isDone || isCurrent ? 'text-brand-muted' : 'text-gray-300'}`}>
                        {step.desc}
                      </p>

                      {/* Confirm design step: chat box */}
                      {isCurrent && step.label === 'ยืนยันแบบ' && (
                        <div className="mt-3 p-4 bg-brand-neutral rounded-2xl space-y-3">
                          <p className="font-display font-semibold text-sm text-brand-dark">
                            ส่งข้อความถึงทีมงาน
                          </p>
                          <textarea
                            rows={2}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="เช่น 'ขอปรับสีเสื้อเป็นสีแดงได้ไหม'"
                            className="w-full px-3 py-2 bg-white rounded-xl border border-gray-200 focus:border-brand-yellow outline-none font-body text-sm resize-none"
                          />
                          <div className="flex gap-2">
                            <button onClick={handleSendMessage} className="btn-primary text-sm py-2 px-4">
                              ส่งข้อความ
                            </button>
                            <label className="btn-outline text-sm py-2 px-4 cursor-pointer">
                              <Upload size={14} />
                              แนบรูป
                              <input type="file" accept="image/*" className="hidden" />
                            </label>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Tracking (shown when shipped) */}
        <div className="bg-white rounded-3xl p-6 shadow-card mb-6 opacity-50">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-body text-brand-muted text-sm">เลข Tracking (Kerry Express)</p>
              <p className="font-display font-bold text-brand-dark text-lg mt-1">TH123456789</p>
            </div>
            <button onClick={handleCopyTracking} className="btn-outline text-sm py-2 px-4 gap-2">
              <Copy size={14} />
              คัดลอก
            </button>
          </div>
          <p className="font-body text-brand-muted text-xs mt-3">* เลข tracking จะปรากฏเมื่อสินค้าถูกจัดส่งแล้ว</p>
        </div>

        {/* Review prompt */}
        <div className="bg-brand-yellow rounded-3xl p-6 text-center">
          <div className="flex justify-center gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={24} className="fill-brand-dark text-brand-dark" />
            ))}
          </div>
          <p className="font-display font-bold text-brand-dark text-lg mb-1">ได้รับสินค้าแล้ว?</p>
          <p className="font-body text-brand-dark/70 text-sm mb-4">รีวิวให้เราหน่อยนะ ช่วยได้เยอะมากเลย 🙏</p>
          <a
            href="https://line.me/ti/p/~@brickme"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-dark text-white font-display font-bold rounded-xl hover:bg-gray-800 transition-colors"
          >
            <MessageCircle size={18} />
            รีวิวผ่าน LINE
          </a>
        </div>
      </div>
    </div>
  )
}
