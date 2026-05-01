import type { Metadata } from 'next'
import { MessageCircle, Mail, Clock } from 'lucide-react'
import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export const metadata: Metadata = {
  title: 'ติดต่อเรา | BrickMe',
  description: 'ติดต่อทีม BrickMe ผ่าน LINE, อีเมล หรือฟอร์มบนเว็บ พร้อมตอบทุกวัน 9:00–21:00 น.',
}

const CONTACTS = [
  { icon: MessageCircle, label: 'LINE Official', value: '@brickme', desc: 'ตอบเร็วที่สุด ภายใน 1 ชั่วโมง', href: 'https://line.me/ti/p/~@brickme', color: 'bg-[#06C755] text-white' },
  { icon: Mail, label: 'อีเมล', value: 'hello@brickme.th', desc: 'ตอบภายใน 24 ชั่วโมง', href: 'mailto:hello@brickme.th', color: 'bg-brand-dark text-white' },
  { icon: Clock, label: 'เวลาทำการ', value: 'ทุกวัน 9:00–21:00', desc: 'รวมวันหยุดนักขัตฤกษ์', href: null, color: 'bg-brand-yellow text-brand-dark' },
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">
      <div className="bg-brand-yellow">
        <div className="container-site py-14">
          <h1 className="font-display font-black text-5xl text-brand-dark">ติดต่อเรา</h1>
          <p className="font-body text-brand-dark/70 text-lg mt-3">มีคำถาม? ทักมาได้เลย ไม่ต้องรอนาน</p>
        </div>
      </div>

      <div className="container-site py-14">
        <div className="grid lg:grid-cols-2 gap-12">
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
                    <a href={href} target="_blank" rel="noopener noreferrer" className="btn-outline text-xs py-2 px-4 flex-shrink-0">
                      เปิด
                    </a>
                  )}
                </div>
              ))}
            </div>
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

          <div>
            <h2 className="font-display font-black text-2xl text-brand-dark mb-6">ส่งข้อความ</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}
