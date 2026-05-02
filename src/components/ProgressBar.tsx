'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  const pct = (currentStep / (steps.length - 1)) * 100

  return (
    <div className="relative flex items-start justify-between">
      {/* Track background */}
      <div className="absolute left-0 right-0 top-4 h-1 bg-gray-200 rounded-full z-0 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-yellow to-brand-yellow/80 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
        />
      </div>

      {steps.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep

        return (
          <div key={i} className="relative z-10 flex flex-col items-center gap-1">
            <motion.div
              animate={{ scale: active ? 1.18 : 1 }}
              transition={{ duration: 0.2, type: 'spring', stiffness: 300 }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center border-3 transition-all duration-200',
                done
                  ? 'bg-brand-yellow border-brand-dark shadow-brick-sm'
                  : active
                  ? 'bg-brand-dark border-brand-dark shadow-brick-sm'
                  : 'bg-white border-gray-300 shadow-sm'
              )}
            >
              {done ? (
                <Check size={13} className="text-brand-dark" strokeWidth={3} />
              ) : (
                <span className={cn(
                  'text-[10px] font-display font-black',
                  active ? 'text-white' : 'text-gray-400'
                )}>
                  {i + 1}
                </span>
              )}
            </motion.div>

            <span className={cn(
              'text-[9px] font-display font-bold text-center hidden md:block max-w-[52px] leading-tight mt-0.5',
              active ? 'text-brand-dark' : done ? 'text-brand-yellow' : 'text-gray-400'
            )}>
              {step}
            </span>
          </div>
        )
      })}
    </div>
  )
}
