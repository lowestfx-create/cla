'use client'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface ProgressBarProps {
  steps: string[]
  currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="relative flex items-center justify-between">
      {/* Track */}
      <div className="absolute left-0 right-0 top-4 h-0.5 bg-gray-200 z-0">
        <motion.div
          className="h-full bg-brand-yellow"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {steps.map((step, i) => {
        const done = i < currentStep
        const active = i === currentStep

        return (
          <div key={i} className="relative z-10 flex flex-col items-center gap-1.5">
            <motion.div
              animate={{
                scale: active ? 1.15 : 1,
                backgroundColor: done ? '#FFC800' : active ? '#1A1A2E' : '#E5E7EB',
              }}
              transition={{ duration: 0.2 }}
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center transition-all',
                done ? 'bg-brand-yellow' : active ? 'bg-brand-dark' : 'bg-gray-200'
              )}
            >
              {done ? (
                <Check size={14} className="text-brand-dark" strokeWidth={3} />
              ) : (
                <span className={cn('text-xs font-display font-bold', active ? 'text-white' : 'text-gray-500')}>
                  {i + 1}
                </span>
              )}
            </motion.div>
            <span className={cn(
              'text-[10px] font-display font-semibold text-center hidden md:block max-w-[60px] leading-tight',
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
