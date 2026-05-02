import Link from 'next/link'
import { MessageCircle, Instagram, Facebook, Youtube, ArrowRight } from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/shop', label: 'สินค้าทั้งหมด' },
    { href: '/customize', label: 'Custom ตัวเอง' },
    { href: '/shop?category=gift', label: 'ของขวัญ' },
  ],
  info: [
    { href: '/about', label: 'เกี่ยวกับเรา' },
    { href: '/faq', label: 'คำถามที่พบบ่อย' },
    { href: '/contact', label: 'ติดต่อเรา' },
    { href: '/order/track', label: 'ติดตามออเดอร์' },
  ],
  policy: [
    { href: '/policy/shipping', label: 'นโยบายจัดส่ง' },
    { href: '/policy/refund', label: 'การคืนเงิน' },
    { href: '/policy/ip-policy', label: 'นโยบาย IP' },
    { href: '/policy/privacy', label: 'ความเป็นส่วนตัว' },
    { href: '/policy/terms', label: 'ข้อกำหนดการใช้' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">

      {/* CTA Banner */}
      <div className="bg-brand-yellow border-y-3 border-brand-dark">
        <div className="stud-pattern-light">
          <div className="container-site py-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-black text-2xl md:text-3xl text-brand-dark">
                พร้อมสร้างตัวละครของคุณแล้วหรือยัง?
              </p>
              <p className="font-body text-brand-dark/70 mt-1 font-medium">
                ออกแบบง่าย ส่งเร็ว คุณภาพที่คุ้มค่า
              </p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/customize" className="btn-dark">
                เริ่ม Custom เลย
                <ArrowRight size={18} />
              </Link>
              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 bg-[#06C755] text-white font-display font-black rounded-lg border-3 border-brand-dark shadow-brick hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-brick-sm transition-all duration-75"
              >
                <MessageCircle size={18} />
                LINE
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Dark brick row */}
      <div className="brick-row" />

      {/* Main Footer */}
      <div className="container-site py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-brand-yellow border-3 border-white/20 rounded-lg flex items-center justify-center shadow-brick-yellow">
                <span className="text-brand-dark font-display font-black text-base leading-none">B</span>
              </div>
              <span className="font-display font-black text-xl">
                Brick<span className="text-brand-yellow">Me</span>
              </span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-5">
              ตัวคุณในเวอร์ชันเลโก้<br />
              ปริ้นต์ 3D คุณภาพระดับของขวัญ<br />
              ส่งทั่วไทย
            </p>
            <div className="flex gap-2">
              {[
                { href: 'https://instagram.com/brickme.th', Icon: Instagram, label: 'Instagram' },
                { href: 'https://facebook.com/brickme.th', Icon: Facebook, label: 'Facebook' },
                { href: 'https://youtube.com/@brickme', Icon: Youtube, label: 'YouTube' },
                { href: 'https://line.me/ti/p/~@brickme', Icon: MessageCircle, label: 'LINE' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/10 hover:bg-brand-yellow hover:text-brand-dark border border-white/20 hover:border-brand-dark rounded-lg flex items-center justify-center transition-all duration-150"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-yellow mb-4 border-b border-white/10 pb-2">
              ร้านค้า
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gray-400 hover:text-brand-yellow text-sm transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-brand-yellow transition-colors duration-150" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-yellow mb-4 border-b border-white/10 pb-2">
              ข้อมูล
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gray-400 hover:text-brand-yellow text-sm transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-brand-yellow transition-colors duration-150" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-yellow mb-4 border-b border-white/10 pb-2">
              นโยบาย
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.policy.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-gray-400 hover:text-brand-yellow text-sm transition-colors duration-150 flex items-center gap-1 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-brand-yellow transition-colors duration-150" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BrickMe. สงวนลิขสิทธิ์ — สร้างด้วยความรักในประเทศไทย 🇹🇭
          </p>
          <div className="flex items-center gap-3">
            <span className="font-body text-gray-500 text-xs">รับชำระผ่าน</span>
            <div className="flex gap-2">
              {['PromptPay', 'Visa', 'Mastercard'].map((p) => (
                <span
                  key={p}
                  className="px-2.5 py-1 bg-white/10 border border-white/20 rounded-md text-xs font-display font-black text-gray-300"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
