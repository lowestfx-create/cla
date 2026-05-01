import Link from 'next/link'
import { MessageCircle, Instagram, Facebook, Youtube } from 'lucide-react'

const footerLinks = {
  shop: [
    { href: '/shop', label: 'สินค้าทั้งหมด' },
    { href: '/customize', label: 'Custom ตัวเอง' },
    { href: '/shop?category=gift', label: 'ของขวัญ' },
    { href: '/shop?category=b2b', label: 'สั่งทำบริษัท' },
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
    { href: '/policy/privacy', label: 'นโยบายความเป็นส่วนตัว' },
    { href: '/policy/terms', label: 'ข้อกำหนดการใช้บริการ' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white">
      {/* CTA Banner */}
      <div className="bg-brand-yellow">
        <div className="container-site py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-2xl md:text-3xl text-brand-dark">
              พร้อมสร้างตัวละครของคุณแล้วหรือยัง?
            </p>
            <p className="font-body text-brand-dark/70 mt-1">ออกแบบง่าย ส่งเร็ว คุณภาพที่คุ้มค่า</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/customize" className="btn-primary bg-brand-dark text-white hover:bg-gray-800">
              เริ่ม Custom เลย →
            </Link>
            <a
              href="https://line.me/ti/p/~@brickme"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-3 bg-[#06C755] text-white font-display font-bold rounded-xl hover:bg-[#05b34c] transition-all duration-200"
            >
              <MessageCircle size={18} />
              ติดต่อ LINE
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-site py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                <span className="text-brand-dark font-display font-black text-sm">B</span>
              </div>
              <span className="font-display font-black text-xl">
                Brick<span className="text-brand-yellow">Me</span>
              </span>
            </div>
            <p className="font-body text-gray-400 text-sm leading-relaxed mb-5">
              ตัวคุณในเวอร์ชันเลโก้<br />
              ปริ้นต์ 3D คุณภาพระดับของขวัญ<br />
              ส่งทั่วไทย มีบริการ B2B
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/brickme.th" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-yellow hover:text-brand-dark rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com/brickme.th" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-yellow hover:text-brand-dark rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://youtube.com/@brickme" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-brand-yellow hover:text-brand-dark rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="YouTube">
                <Youtube size={18} />
              </a>
              <a href="https://line.me/ti/p/~@brickme" target="_blank" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/10 hover:bg-[#06C755] rounded-lg flex items-center justify-center transition-all duration-200"
                aria-label="LINE">
                <MessageCircle size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">ร้านค้า</h3>
            <ul className="space-y-2.5">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-gray-300 hover:text-brand-yellow text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">ข้อมูล</h3>
            <ul className="space-y-2.5">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-gray-300 hover:text-brand-yellow text-sm transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h3 className="font-display font-bold text-sm uppercase tracking-wider text-gray-400 mb-4">นโยบาย</h3>
            <ul className="space-y-2.5">
              {footerLinks.policy.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-body text-gray-300 hover:text-brand-yellow text-sm transition-colors duration-200">
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
            © 2567 BrickMe. สงวนลิขสิทธิ์ | ออกแบบด้วย ❤️ ในประเทศไทย
          </p>
          <div className="flex items-center gap-3">
            <span className="font-body text-gray-500 text-xs">รับชำระผ่าน</span>
            <div className="flex gap-2">
              {['PromptPay', 'Visa', 'Mastercard'].map((p) => (
                <span key={p} className="px-2 py-1 bg-white/10 rounded text-xs font-display font-bold text-gray-300">
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
