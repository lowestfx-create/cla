'use client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Send } from 'lucide-react'

const schema = z.object({
  name: z.string().min(1, 'กรุณากรอกชื่อ'),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  subject: z.string().min(1, 'กรุณาเลือกหัวข้อ'),
  message: z.string().min(10, 'กรุณากรอกข้อความอย่างน้อย 10 ตัวอักษร'),
})

type FormData = z.infer<typeof schema>

const SUBJECTS = [
  'สอบถามก่อนสั่ง', 'แก้ไขออเดอร์', 'ติดตามออเดอร์',
  'สั่งซื้อแบบ B2B / Event', 'ปัญหาการชำระเงิน', 'อื่นๆ',
]

export default function ContactForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (_data: FormData) => {
    await new Promise((r) => setTimeout(r, 1000))
    toast.success('✅ ส่งข้อความแล้ว! เราจะตอบกลับภายใน 24 ชั่วโมงครับ')
    reset()
  }

  const inputCls = (err: boolean) =>
    `w-full px-4 py-3 rounded-xl border-2 outline-none font-body transition-colors ${err ? 'border-red-300' : 'border-gray-200 focus:border-brand-yellow'}`

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-3xl p-6 md:p-8 shadow-card space-y-5">
      <div>
        <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">ชื่อ</label>
        <input {...register('name')} placeholder="สมชาย รักงาน" className={inputCls(!!errors.name)} />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div>
        <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">อีเมล</label>
        <input {...register('email')} type="email" placeholder="you@email.com" className={inputCls(!!errors.email)} />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">หัวข้อ</label>
        <select {...register('subject')} className={inputCls(!!errors.subject)}>
          <option value="">เลือกหัวข้อ</option>
          {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
      </div>
      <div>
        <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">ข้อความ</label>
        <textarea {...register('message')} rows={5} placeholder="บอกรายละเอียดที่ต้องการ..." className={`${inputCls(!!errors.message)} resize-none`} />
        {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60">
        <Send size={18} />
        {isSubmitting ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </form>
  )
}
