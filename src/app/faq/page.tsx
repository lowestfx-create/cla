import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, ArrowRight } from 'lucide-react'
import FAQAccordion from '@/components/FAQAccordion'
import { FAQ_ITEMS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย | BrickMe',
  description: 'รวมคำถามและคำตอบเกี่ยวกับการสั่งทำ Minifigure Custom ระยะเวลา วัสดุ การจัดส่ง และนโยบายต่างๆ',
}

const CATEGORIES = [
  { label: '⏱️ ระยะเวลาและขั้นตอน', keys: [0, 6, 10] },
  { label: '📦 สินค้าและวัสดุ', keys: [2, 3] },
  { label: '🚚 การจัดส่ง', keys: [4, 11] },
  { label: '💳 การชำระเงินและคืนเงิน', keys: [5, 9] },
  { label: '🎨 การออกแบบและ IP', keys: [1, 7] },
  { label: '🏢 B2B และพิเศษ', keys: [8, 10] },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Hero */}
      <div className="bg-brand-yellow">
        <div className="container-site py-14 text-center">
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-dark">
            คำถามที่พบบ่อย
          </h1>
          <p className="font-body text-brand-dark/70 text-lg mt-3 max-w-xl mx-auto">
            หาคำตอบก่อนสั่ง — ถ้าไม่เจอก็ทัก LINE ได้เลยครับ
          </p>
        </div>
      </div>

      <div className="container-site py-14 max-w-3xl">
        {/* All FAQs */}
        <FAQAccordion items={FAQ_ITEMS} />

        {/* Still have questions */}
        <div className="mt-14 bg-brand-dark rounded-3xl p-8 text-center">
          <div className="text-4xl mb-4">🤔</div>
          <h2 className="font-display font-black text-2xl text-white mb-2">ยังมีคำถามอื่นอีกไหม?</h2>
          <p className="font-body text-gray-400 mb-6">
            ทีมงานพร้อมตอบทุกวัน 9:00–21:00 น. ทัก LINE ได้เลยครับ
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://line.me/ti/p/~@brickme"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#06C755] text-white font-display font-bold rounded-xl hover:bg-[#05b34c] transition-colors"
            >
              <MessageCircle size={18} />
              ทัก LINE ได้เลย
            </a>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-display font-bold rounded-xl hover:bg-white/20 transition-colors">
              ส่งอีเมลหาเรา
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { href: '/policy/shipping', label: '🚚 นโยบายจัดส่ง' },
            { href: '/policy/refund', label: '💰 นโยบายคืนเงิน' },
            { href: '/policy/ip-policy', label: '⚖️ นโยบาย IP' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-2xl p-4 text-center font-display font-bold text-brand-dark hover:bg-brand-yellow transition-colors shadow-card text-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
