'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
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
              'bg-white rounded-2xl overflow-hidden border-2 transition-colors duration-200',
              isOpen ? 'border-brand-yellow' : 'border-transparent shadow-card'
            )}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left focus-ring rounded-2xl"
              aria-expanded={isOpen}
            >
              <span className="font-display font-bold text-brand-dark pr-4">{question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <ChevronDown size={20} className={cn('transition-colors', isOpen ? 'text-brand-yellow' : 'text-brand-muted')} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <p className="font-body text-brand-muted leading-relaxed px-5 pb-5">
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
