'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

const SKIN_TONES = ['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#4A2912']

const HAIR_COLORS = [
  '#2C1810', '#1C1C1C', '#4A3728', '#8B6914', '#C19A49',
  '#F4C430', '#D4584A', '#8B0000', '#4B0082', '#2B4D8C',
  '#FFFFFF', '#808080',
]

const CLOTHING_COLORS = [
  '#1E3A5F', '#E74C3C', '#27AE60', '#F39C12', '#9B59B6',
  '#1ABC9C', '#E91E63', '#FF5722', '#607D8B', '#795548',
  '#FFFFFF', '#1C1C1C', '#F8F7F4', '#FFD700',
]

interface ColorPickerProps {
  colors?: string[]
  selected: string
  onChange: (color: string) => void
  type?: 'skin' | 'hair' | 'clothing'
  label?: string
}

export default function ColorPicker({
  colors,
  selected,
  onChange,
  type = 'clothing',
  label,
}: ColorPickerProps) {
  const palette = colors ?? (type === 'skin' ? SKIN_TONES : type === 'hair' ? HAIR_COLORS : CLOTHING_COLORS)

  return (
    <div>
      {label && (
        <p className="font-display font-semibold text-sm text-brand-dark mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-2">
        {palette.map((color) => (
          <motion.button
            key={color}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onChange(color)}
            aria-label={`เลือกสี ${color}`}
            className={cn(
              'w-8 h-8 rounded-full relative transition-all duration-150 focus-ring',
              selected === color ? 'ring-2 ring-offset-2 ring-brand-dark' : ''
            )}
            style={{
              backgroundColor: color,
              border: color === '#FFFFFF' || color === '#F8F7F4' ? '1px solid #E5E7EB' : 'none',
            }}
          >
            {selected === color && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check
                  size={14}
                  strokeWidth={3}
                  className={color === '#FFFFFF' || color === '#F8F7F4' || color === '#F4C430' ? 'text-brand-dark' : 'text-white'}
                />
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export { SKIN_TONES, HAIR_COLORS, CLOTHING_COLORS }
