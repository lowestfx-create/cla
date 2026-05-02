import type { Metadata } from 'next'
import { MessageCircle, Mail, Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'ติดต่อเรา | BrickMe',
  description: 'ติดต่อทีม BrickMe ผ่าน LINE, อีเมล หรือฟอร์มบนเว็บ พร้อมตอบทุกวัน 9:00–21:00 น.',
}

const CONTACTS = [
  {
    icon: MessageCircle,
    label: 'LINE Official',
    value: '@brickme',
    desc: 'ตอบเร็วที่สุด ภายใน 1 ชั่วโมง',
    href: 'https://line.me/ti/p/~@brickme',
    bg: 'bg-[#06C755]',
    btnLabel: 'เปิด LINE',
  },
  {
    icon: Mail,
    label: 'อีเมล',
    value: 'hello@brickme.th',
    desc: 'ตอบภายใน 24 ชั่วโมง',
    href: 'mailto:hello@brickme.th',
    bg: 'bg-brand-dark',
    btnLabel: 'ส่งอีเมล',
  },
  {
    icon: Clock,
    label: 'เวลาทำการ',
    value: 'ทุกวัน 9:00–21:00',
    desc: 'รวมวันหยุดนักขัตฤกษ์',
    href: null,
    bg: 'bg-brand-yellow',
    btnLabel: null,
  },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">

      {/* Page Header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-8 md:py-12">
          <span className="section-label mb-3">ติดต่อ</span>
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-dark">ติดต่อเรา</h1>
          <p className="font-body text-brand-muted text-lg mt-2">มีคำถาม? ทักมาได้เลย ไม่ต้องรอนาน</p>
        </div>
      </div>

      <div className="container-site py-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left: Contact channels */}
          <div>
            <h2 className="font-display font-black text-2xl text-brand-dark mb-5">ช่องทางติดต่อ</h2>
            <div className="space-y-3 mb-8">
              {CONTACTS.map(({ icon: Icon, label, value, desc, href, bg, btnLabel }) => (
                <div key={label} className="bg-white rounded-xl border-3 border-brand-dark shadow-brick p-4 flex items-center gap-4 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100">
                  <div className={`w-12 h-12 rounded-xl ${bg} border-2 border-brand-dark/20 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0_rgba(0,0,0,0.1)]`}>
                    <Icon size={22} className={bg === 'bg-brand-yellow' ? 'text-brand-dark' : 'text-white'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body text-brand-muted text-xs">{label}</p>
                    <p className="font-display font-bold text-brand-dark truncate">{value}</p>
                    <p className="font-body text-brand-muted text-xs mt-0.5">{desc}</p>
                  </div>
                  {href && btnLabel && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg border-2 border-brand-dark font-display font-bold text-xs bg-brand-neutral hover:bg-brand-yellow transition-colors flex-shrink-0 shadow-[2px_2px_0_#1A1A1A]"
                    >
                      {btnLabel}
                    </a>
                  )}
                </div>
              ))}
            </div>

            {/* LINE CTA hero */}
            <div className="rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 w-full p-5 bg-[#06C755] hover:bg-[#05b34c] transition-colors"
              >
                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={30} className="text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-display font-black text-xl text-white">ทัก LINE ได้เลย</p>
                  <p className="font-body text-white/80 text-sm">วิธีที่เร็วที่สุด — ตอบภายใน 1 ชั่วโมง</p>
                </div>
                <ArrowRight size={22} className="text-white/60 flex-shrink-0" />
              </a>
              <div className="h-2 bg-[#05a34c]" />
            </div>

            {/* FAQ link */}
            <div className="mt-4">
              <Link
                href="/faq"
                className="flex items-center justify-between w-full p-4 bg-white rounded-xl border-3 border-brand-dark shadow-brick hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100"
              >
                <div>
                  <p className="font-display font-bold text-brand-dark text-sm">ดูคำถามที่พบบ่อยก่อน</p>
                  <p className="font-body text-brand-muted text-xs mt-0.5">อาจจะมีคำตอบที่คุณต้องการอยู่แล้ว</p>
                </div>
                <ArrowRight size={18} className="text-brand-muted flex-shrink-0" />
              </Link>
            </div>
          </div>

          {/* Right: Contact form */}
          <div>
            <h2 className="font-display font-black text-2xl text-brand-dark mb-5">ส่งข้อความ</h2>
            <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
              <div className="p-6">
                <ContactForm />
              </div>
              <div className="brick-row-yellow" />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
