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

  const isActive = (href: string) => pathname === href

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="container-site">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 focus-ring rounded-lg">
              <div className="w-8 h-8 bg-brand-yellow rounded-lg flex items-center justify-center">
                <span className="text-brand-dark font-display font-black text-sm">B</span>
              </div>
              <span className="font-display font-black text-xl text-brand-dark">
                Brick<span className="text-brand-yellow">Me</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.labelTH}
                  href={link.href}
                  className={cn(
                    'font-body font-medium text-sm transition-colors duration-200 relative group focus-ring rounded',
                    isActive(link.href) ? 'text-brand-dark' : 'text-brand-muted hover:text-brand-dark'
                  )}
                >
                  {language === 'th' ? link.labelTH : link.labelEN}
                  <span
                    className={cn(
                      'absolute -bottom-1 left-0 h-0.5 bg-brand-yellow transition-all duration-200',
                      isActive(link.href) ? 'w-full' : 'w-0 group-hover:w-full'
                    )}
                  />
                </Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
                className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-display font-bold hover:border-brand-yellow hover:bg-brand-light transition-all duration-200 focus-ring"
                aria-label="Toggle language"
              >
                {language === 'th' ? '🇹🇭 TH' : '🇬🇧 EN'}
              </button>

              {/* LINE Button */}
              <a
                href="https://line.me/ti/p/~@brickme"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#06C755] text-white text-xs font-display font-bold hover:bg-[#05b34c] transition-all duration-200 focus-ring"
                aria-label="Contact via LINE"
              >
                <MessageCircle size={14} />
                LINE
              </a>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-xl hover:bg-brand-light transition-colors duration-200 focus-ring"
                aria-label={`ตะกร้าสินค้า ${totalItems} ชิ้น`}
              >
                <ShoppingCart size={22} className="text-brand-dark" />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-red text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </motion.span>
                )}
              </Link>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-brand-light transition-colors duration-200 focus-ring"
                aria-label="เปิดเมนู"
              >
                {menuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-16"
          >
            <div className="container-site py-8 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href + link.labelTH + 'mobile'}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={cn(
                    'font-display font-bold text-2xl py-3 border-b border-gray-100 transition-colors duration-200',
                    isActive(link.href) ? 'text-brand-dark' : 'text-brand-muted'
                  )}
                >
                  {language === 'th' ? link.labelTH : link.labelEN}
                </Link>
              ))}

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => setLanguage(language === 'th' ? 'en' : 'th')}
                  className="flex-1 py-3 rounded-xl border-2 border-gray-200 font-display font-bold text-center hover:border-brand-yellow transition-colors duration-200"
                >
                  {language === 'th' ? '🇬🇧 EN' : '🇹🇭 TH'}
                </button>
                <a
                  href="https://line.me/ti/p/~@brickme"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-[#06C755] text-white font-display font-bold text-center flex items-center justify-center gap-2"
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
