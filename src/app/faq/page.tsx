import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle, ArrowRight, ExternalLink } from 'lucide-react'
import FAQAccordion from '@/components/FAQAccordion'
import { FAQ_ITEMS } from '@/lib/data'

export const metadata: Metadata = {
  title: 'คำถามที่พบบ่อย | BrickMe',
  description: 'รวมคำถามและคำตอบเกี่ยวกับการสั่งทำ Minifigure Custom ระยะเวลา วัสดุ การจัดส่ง และนโยบายต่างๆ',
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-brand-neutral">

      {/* Page Header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-8 md:py-12">
          <span className="section-label mb-3">FAQ</span>
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-dark">
            คำถามที่พบบ่อย
          </h1>
          <p className="font-body text-brand-muted text-lg mt-2 max-w-lg">
            หาคำตอบก่อนสั่ง — ถ้าไม่เจอก็ทัก LINE ได้เลยครับ
          </p>
        </div>
      </div>

      <div className="container-site py-10 max-w-3xl">

        {/* All FAQs */}
        <FAQAccordion items={FAQ_ITEMS} />

        {/* Still have questions */}
        <div className="mt-12 rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-dark p-8 text-center">
            <div className="w-16 h-16 bg-brand-yellow border-3 border-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-brick-yellow">
              <MessageCircle size={28} className="text-brand-dark" />
            </div>
            <h2 className="font-display font-black text-2xl text-white mb-2">ยังมีคำถามอื่นอีกไหม?</h2>
            <p className="font-body text-gray-400 mb-6">
              ทีมงานพร้อมตอบทุกวัน 9:00–21:00 น. ทัก LINE ได้เลยครับ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#06C755] text-white font-display font-black rounded-xl border-3 border-white/20 shadow-[2px_2px_0_rgba(255,255,255,0.15)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-75"
              >
                <MessageCircle size={18} />
                ทัก LINE ได้เลย
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 text-white font-display font-bold rounded-xl border-2 border-white/20 hover:bg-white/20 transition-colors"
              >
                ส่งอีเมลหาเรา
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="brick-row-yellow" />
        </div>

        {/* Quick links */}
        <div className="mt-8 grid sm:grid-cols-3 gap-3">
          {[
            { href: '/policy/shipping', label: '🚚 นโยบายจัดส่ง' },
            { href: '/policy/refund', label: '💰 นโยบายคืนเงิน' },
            { href: '/policy/ip-policy', label: '⚖️ นโยบาย IP' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="bg-white rounded-xl border-3 border-brand-dark shadow-brick p-4 text-center font-display font-bold text-brand-dark hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick-sm transition-all duration-100 text-sm flex items-center justify-center gap-1.5"
            >
              {link.label}
              <ExternalLink size={12} className="opacity-50" />
            </Link>
          ))}
        </div>

      </div>
    </div>
  )
}
