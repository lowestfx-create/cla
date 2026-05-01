'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { MessageCircle, Mail, Clock, Send } from 'lucide-react'

export const metadata = {
  title: 'ติดต่อเรา | BrickMe',
  description: 'ติดต่อทีม BrickMe ผ่าน LINE, อีเมล หรือฟอร์มบนเว็บ พร้อมตอบทุกวัน 9:00–21:00 น.',
}

const schema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  subject: z.string().min(1, 'กรุณาเลือกหัวข้อ'),
  message: z.string().min(10, 'กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร'),
})

type FormData = z.infer<typeof schema>

const SUBJECTS = [
  'สอบถามก่อนสั่ง',
  'แก้ไขออเดอร์',
  'ติดตามออเดอร์',
  'สั่งซื้อแบบ B2B / Event',
  'ปัญหาการชำระเงิน',
  'อื่นๆ',
]

const CONTACTS = [
  {
    icon: MessageCircle,
    label: 'LINE Official',
    value: '@brickme',
    desc: 'ตอบเร็วที่สุด ภายใน 1 ชั่วโมง',
    href: 'https://line.me/ti/p/~@brickme',
    color: 'bg-[#06C755] text-white',
  },
  {
    icon: Mail,
    label: 'อีเมล',
    value: 'hello@brickme.th',
    desc: 'ตอบภายใน 24 ชั่วโมง',
    href: 'mailto:hello@brickme.th',
    color: 'bg-brand-dark text-white',
  },
  {
    icon: Clock,
    label: 'เวลาทำการ',
    value: 'ทุกวัน 9:00–21:00',
    desc: 'รวมวันหยุดนักขัตฤกษ์',
    href: null,
    color: 'bg-brand-yellow text-brand-dark',
  },
]

export default function ContactPage() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('✅ ส่งข้อความแล้ว! เราจะตอบกลับภายใน 24 ชั่วโมงครับ')
    reset()
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Hero */}
      <div className="bg-brand-yellow">
        <div className="container-site py-14">
          <h1 className="font-display font-black text-5xl text-brand-dark">ติดต่อเรา</h1>
          <p className="font-body text-brand-dark/70 text-lg mt-3">
            มีคำถาม? ทักมาได้เลย ไม่ต้องรอนาน
          </p>
        </div>
      </div>

      <div className="container-site py-14">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact channels */}
          <div>
            <h2 className="font-display font-black text-2xl text-brand-dark mb-6">ช่องทางติดต่อ</h2>
            <div className="space-y-4 mb-10">
              {CONTACTS.map(({ icon: Icon, label, value, desc, href, color }) => (
                <div key={label} className="bg-white rounded-2xl p-5 shadow-card flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${color} flex items-center justify-center flex-shrink-0`}>
                    <Icon size={22} />
                  </div>
                  <div className="flex-1">
                    <p className="font-body text-brand-muted text-xs">{label}</p>
                    <p className="font-display font-bold text-brand-dark">{value}</p>
                    <p className="font-body text-brand-muted text-xs mt-0.5">{desc}</p>
                  </div>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-outline text-xs py-2 px-4 flex-shrink-0"
                    >
                      เปิด
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* LINE big CTA */}
            <a
              href="https://line.me/ti/p/~@brickme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 w-full p-5 bg-[#06C755] text-white rounded-2xl hover:bg-[#05b34c] transition-colors"
            >
              <MessageCircle size={28} />
              <div>
                <p className="font-display font-black text-lg">ทัก LINE ได้เลย</p>
                <p className="font-body text-white/80 text-sm">วิธีที่เร็วที่สุด — ตอบภายใน 1 ชั่วโมง</p>
              </div>
            </a>
          </div>

          {/* Form */}
          <div>
            <h2 className="font-display font-black text-2xl text-brand-dark mb-6">ส่งข้อความ</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 md:p-8 shadow-card space-y-5">
              <div>
                <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">ชื่อ</label>
                <input
                  {...register('name')}
                  placeholder="สมชาย รักงาน"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-body transition-colors ${errors.name ? 'border-red-300' : 'border-gray-200 focus:border-brand-yellow'}`}
                />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">อีเมล</label>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@email.com"
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-body transition-colors ${errors.email ? 'border-red-300' : 'border-gray-200 focus:border-brand-yellow'}`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">หัวข้อ</label>
                <select
                  {...register('subject')}
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-body transition-colors ${errors.subject ? 'border-red-300' : 'border-gray-200 focus:border-brand-yellow'}`}
                >
                  <option value="">เลือกหัวข้อ</option>
                  {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
              </div>

              <div>
                <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">ข้อความ</label>
                <textarea
                  {...register('message')}
                  rows={5}
                  placeholder="บอกรายละเอียดที่ต้องการ..."
                  className={`w-full px-4 py-3 rounded-xl border-2 outline-none font-body transition-colors resize-none ${errors.message ? 'border-red-300' : 'border-gray-200 focus:border-brand-yellow'}`}
                />
                {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60"
              >
                <Send size={18} />
                {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
