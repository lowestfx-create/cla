'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { Testimonial as TestimonialType } from '@/types'

interface TestimonialCarouselProps {
  items: TestimonialType[]
}

export default function TestimonialCarousel({ items }: TestimonialCarouselProps) {
  const [current, setCurrent] = useState(0)

  const prev = () => setCurrent((c) => (c - 1 + items.length) % items.length)
  const next = () => setCurrent((c) => (c + 1) % items.length)

  const item = items[current]

  return (
    <div className="relative">
      <motion.div
        key={current}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-3xl p-8 md:p-10 shadow-card max-w-2xl mx-auto text-center"
      >
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < item.rating ? 'fill-brand-yellow text-brand-yellow' : 'text-gray-200 fill-gray-200'}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-body text-brand-dark text-lg leading-relaxed mb-6">
          &ldquo;{item.comment}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden bg-brand-neutral">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="text-left">
            <p className="font-display font-bold text-brand-dark text-sm">{item.name}</p>
            <p className="font-body text-brand-muted text-xs">{item.productName} · {item.date}</p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-brand-yellow transition-colors duration-200 focus-ring"
          aria-label="รีวิวก่อนหน้า"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${i === current ? 'bg-brand-yellow w-6' : 'bg-gray-300'}`}
              aria-label={`รีวิวที่ ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 bg-white rounded-full shadow-card flex items-center justify-center hover:bg-brand-yellow transition-colors duration-200 focus-ring"
          aria-label="รีวิวถัดไป"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
