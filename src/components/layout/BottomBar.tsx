'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Wand2, ShoppingCart, MessageCircle } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { cn } from '@/lib/utils'

const tabs = [
  { href: '/', icon: Home, labelTH: 'หน้าแรก', labelEN: 'Home' },
  { href: '/customize', icon: Wand2, labelTH: 'Custom', labelEN: 'Custom', highlight: true },
  { href: '/cart', icon: ShoppingCart, labelTH: 'ตะกร้า', labelEN: 'Cart' },
]

export default function BottomBar() {
  const pathname = usePathname()
  const totalItems = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0))

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-3 border-brand-dark shadow-[0_-3px_0_#FFD700]">
      <div className="flex items-center justify-around h-16 px-2 pb-safe">
        {tabs.map(({ href, icon: Icon, labelTH, highlight }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg flex-1 transition-all duration-100',
                highlight
                  ? 'bg-brand-yellow text-brand-dark border-3 border-brand-dark shadow-brick-sm mx-2 -mt-4 rounded-lg py-2.5'
                  : active
                  ? 'text-brand-dark bg-brand-yellow/20 border-2 border-brand-dark'
                  : 'text-brand-muted'
              )}
            >
              <div className="relative">
                <Icon size={22} strokeWidth={active || highlight ? 2.5 : 1.8} />
                {href === '/cart' && totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-brand-red border-2 border-brand-dark text-white text-[8px] font-black rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="text-[10px] font-display font-black">{labelTH}</span>
            </Link>
          )
        })}

        <a
          href="https://line.me/ti/p/~@brickme"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-0.5 px-4 py-1.5 rounded-lg flex-1 text-brand-muted transition-all duration-100"
        >
          <MessageCircle size={22} strokeWidth={1.8} />
          <span className="text-[10px] font-display font-black">LINE</span>
        </a>
      </div>
    </nav>
  )
}
