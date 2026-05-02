'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingCart, Menu, X, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCartStore, useAppStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', labelTH: 'หน้าแรก', labelEN: 'Home' },
  { href: '/shop', labelTH: 'Shop', labelEN: 'Shop' },
  { href: '/customize', labelTH: 'Customize', labelEN: 'Customize' },
  { href: '/shop', labelTH: 'Gallery', labelEN: 'Gallery' },
  { href: '/faq', labelTH: 'FAQ', labelEN: 'FAQ' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { language, setLanguage } = useAppStore()
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('brickme-lang') as 'th' | 'en' | null
    if (saved && saved !== language) setLanguage(saved)
  }, [])

  const toggleLanguage = () => {
    const next = language === 'th' ? 'en' : 'th'
    setLanguage(next)
    localStorage.setItem('brickme-lang', next)
  }

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-200',
          scrolled
            ? 'bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]'
            : 'bg-transparent'
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 focus-ring rounded-lg">
              <div className="w-9 h-9 bg-brand-yellow border-3 border-brand-dark shadow-[2px_2px_0_#1A1A1A] rounded-lg flex items-center justify-center">
                <span className="text-brand-dark font-display font-black text-sm leading-none">B</span>
              </div>
              <span className="font-display font-black text-xl text-brand-dark leading-none">
                Brick<span className="text-brand-red">Me</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.labelTH}
                  href={link.href}
                  className={cn(
                    'font-display font-bold text-sm px-3 py-1.5 rounded-lg transition-all duration-100 focus-ring',
                    isActive(link.href)
                      ? 'bg-brand-yellow text-brand-dark border-2 border-brand-dark shadow-[2px_2px_0_#1A1A1A]'
                      : 'text-brand-dark hover:bg-brand-yellow/40 border-2 border-transparent hover:border-brand-dark'
                  )}
                >
                  {language === 'th' ? link.labelTH : link.labelEN}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleLanguage}
                className="hidden md:flex items-center px-3 py-1.5 rounded-lg border-2 border-brand-dark bg-white text-xs font-display font-black shadow-[2px_2px_0_#1A1A1A] hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all duration-75 focus-ring"
                aria-label="Toggle language"
              >
                {language === 'th' ? 'TH' : 'EN'}
              </button>

              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06C755] border-2 border-brand-dark text-white text-xs font-display font-black shadow-[2px_2px_0_#1A1A1A] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all duration-75 focus-ring"
                aria-label="Contact via LINE"
              >
                <MessageCircle size={13} />
                LINE
              </a>

              <Link
                href="/cart"
                className="relative p-2 rounded-lg border-2 border-brand-dark bg-white shadow-[2px_2px_0_#1A1A1A] hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0_#1A1A1A] transition-all duration-75 focus-ring"
                aria-label={`ตะกร้าสินค้า ${totalItems} ชิ้น`}
              >
                <ShoppingCart size={20} className="text-brand-dark" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-brand-red border-2 border-brand-dark text-white text-[9px] font-black rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </Link>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg border-2 border-brand-dark bg-white shadow-[2px_2px_0_#1A1A1A] hover:bg-brand-yellow transition-all duration-75 focus-ring"
                aria-label="เปิดเมนู"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Yellow stud strip below header when scrolled */}
        {scrolled && <div className="brick-row-yellow" />}
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-40 bg-brand-neutral pt-16"
          >
            <div className="brick-row-yellow" />
            <div className="container-site py-8 flex flex-col gap-3">
              {navLinks.map((link, i) => (
                <Link
                  key={link.href + link.labelTH + 'mobile'}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-display font-black text-2xl py-3.5 px-5 rounded-lg border-3 border-brand-dark transition-all duration-75',
                    isActive(link.href)
                      ? 'bg-brand-yellow shadow-brick'
                      : 'bg-white shadow-brick-sm hover:bg-brand-yellow/50'
                  )}
                >
                  <span className="text-brand-muted text-base mr-3 font-display">0{i + 1}</span>
                  {language === 'th' ? link.labelTH : link.labelEN}
                </Link>
              ))}

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={toggleLanguage}
                  className="flex-1 py-3 rounded-lg border-3 border-brand-dark font-display font-black text-center bg-white shadow-brick-sm hover:bg-brand-yellow transition-all duration-75"
                >
                  {language === 'th' ? 'EN' : 'TH'}
                </button>
                <a
                  href="https://line.me/ti/p/~@brickme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-lg border-3 border-brand-dark bg-[#06C755] text-white font-display font-black text-center flex items-center justify-center gap-2 shadow-brick-sm"
                >
                  <MessageCircle size={18} />
                  LINE
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
