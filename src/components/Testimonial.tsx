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
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-brand-yellow rounded-lg border-3 border-brand-dark shadow-brick-lg p-8 md:p-10 max-w-2xl mx-auto text-center"
      >
        {/* Stars */}
        <div className="flex justify-center gap-1 mb-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className={i < item.rating ? 'fill-brand-dark text-brand-dark' : 'text-brand-dark/20 fill-brand-dark/20'}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="font-body text-brand-dark text-lg leading-relaxed mb-6 font-medium">
          &ldquo;{item.comment}&rdquo;
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-3">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden border-3 border-brand-dark shadow-brick-sm bg-white">
            <Image
              src={item.avatar}
              alt={item.name}
              fill
              className="object-cover"
              sizes="48px"
            />
          </div>
          <div className="text-left">
            <p className="font-display font-black text-brand-dark text-sm">{item.name}</p>
            <p className="font-body text-brand-dark/60 text-xs">{item.productName} · {item.date}</p>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-4 mt-6">
        <button
          onClick={prev}
          className="w-10 h-10 bg-white rounded-lg border-3 border-brand-dark shadow-brick-sm hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none flex items-center justify-center transition-all duration-75 focus-ring"
          aria-label="รีวิวก่อนหน้า"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-3 rounded-sm border-2 border-brand-dark transition-all duration-200 ${
                i === current ? 'bg-brand-dark w-8' : 'bg-brand-yellow w-3 hover:bg-brand-dark/40'
              }`}
              aria-label={`รีวิวที่ ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="w-10 h-10 bg-white rounded-lg border-3 border-brand-dark shadow-brick-sm hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none flex items-center justify-center transition-all duration-75 focus-ring"
          aria-label="รีวิวถัดไป"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
