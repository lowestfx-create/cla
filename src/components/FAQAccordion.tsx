'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { FAQItem } from '@/types'
import { cn } from '@/lib/utils'

interface FAQAccordionProps {
  items: FAQItem[]
  lang?: 'th' | 'en'
}

export default function FAQAccordion({ items, lang = 'th' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        const question = lang === 'th' ? item.question : item.questionEN
        const answer = lang === 'th' ? item.answer : item.answerEN

        return (
          <div
            key={i}
            className={cn(
              'rounded-lg border-3 border-brand-dark overflow-hidden transition-all duration-100',
              isOpen ? 'bg-brand-yellow shadow-brick' : 'bg-white shadow-brick-sm'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left focus-ring rounded-t-lg"
              aria-expanded={isOpen}
            >
              <span className="font-display font-black text-brand-dark pr-4">{question}</span>
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-md border-2 border-brand-dark flex items-center justify-center transition-all duration-100',
                isOpen ? 'bg-brand-dark text-brand-yellow' : 'bg-white text-brand-dark'
              )}>
                {isOpen ? <Minus size={16} /> : <Plus size={16} />}
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <div className="border-t-2 border-brand-dark/30 mx-5" />
                  <p className="font-body text-brand-dark/80 leading-relaxed px-5 py-4 text-sm">
                    {answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
