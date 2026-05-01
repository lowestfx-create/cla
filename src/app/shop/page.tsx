'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, Search, SlidersHorizontal } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/data'
import { Product } from '@/types'

const CATEGORIES = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'gift', label: '🎁 ของขวัญ' },
  { value: 'wedding', label: '💍 งานแต่ง' },
  { value: 'collect', label: '✨ สะสม' },
  { value: 'b2b', label: '🏢 บริษัท' },
]

const GENDERS = [
  { value: 'all', label: 'ทุกเพศ' },
  { value: 'male', label: 'ผู้ชาย' },
  { value: 'female', label: 'ผู้หญิง' },
  { value: 'unisex', label: 'Unisex' },
]

const SORTS = [
  { value: 'default', label: 'แนะนำ' },
  { value: 'price-asc', label: 'ราคา: น้อย → มาก' },
  { value: 'price-desc', label: 'ราคา: มาก → น้อย' },
  { value: 'new', label: 'ใหม่ล่าสุด' },
]

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [gender, setGender] = useState('all')
  const [sort, setSort] = useState('default')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let list = [...PRODUCTS]

    if (search) {
      const q = search.toLowerCase()
      list = list.filter((p) => p.nameTH.toLowerCase().includes(q) || p.descriptionTH.toLowerCase().includes(q))
    }
    if (category !== 'all') list = list.filter((p) => p.category === category)
    if (gender !== 'all') list = list.filter((p) => p.gender === gender)

    switch (sort) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break
      case 'price-desc': list.sort((a, b) => b.price - a.price); break
      case 'new': list = list.filter((p) => p.badge === 'new').concat(list.filter((p) => p.badge !== 'new')); break
    }

    return list
  }, [search, category, gender, sort])

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="container-site py-10">
          <h1 className="font-display font-black text-4xl md:text-5xl text-brand-dark">
            Shop & Gallery
          </h1>
          <p className="font-body text-brand-muted mt-2 text-lg">
            ผลงานทั้งหมด {PRODUCTS.length} แบบ — หรือ{' '}
            <a href="/customize" className="text-brand-dark font-bold underline underline-offset-2">
              Custom ใหม่เอง
            </a>
          </p>
        </div>
      </div>

      <div className="container-site py-8">
        {/* Search + Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="search"
              placeholder="ค้นหาสินค้า..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-200 font-body text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-yellow transition-colors"
            />
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-outline gap-2 py-3"
          >
            <SlidersHorizontal size={18} />
            ตัวกรอง
          </button>

          <div className="hidden md:flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 bg-white rounded-xl border border-gray-200 font-body text-brand-dark text-sm focus:outline-none focus:border-brand-yellow transition-colors"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category chips */}
        <div className={`${showFilters ? 'block' : 'hidden md:block'} mb-6`}>
          <div className="bg-white rounded-2xl p-4 md:p-0 md:bg-transparent">
            <div className="mb-3 md:mb-0 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-4 py-2 rounded-full font-display font-semibold text-sm transition-all duration-200 ${
                    category === c.value
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-white text-brand-muted hover:bg-brand-neutral border border-gray-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-gray-100 md:border-0 md:mt-0 md:pt-0 md:hidden">
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`px-3 py-1.5 rounded-full font-display font-semibold text-xs transition-all duration-200 ${
                    gender === g.value
                      ? 'bg-brand-yellow text-brand-dark'
                      : 'bg-gray-100 text-brand-muted'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between mb-6">
          <p className="font-body text-brand-muted text-sm">
            แสดง <span className="font-bold text-brand-dark">{filtered.length}</span> รายการ
          </p>
          <div className="hidden md:flex gap-2">
            {GENDERS.map((g) => (
              <button
                key={g.value}
                onClick={() => setGender(g.value)}
                className={`px-3 py-1.5 rounded-full font-display font-semibold text-xs transition-all duration-200 ${
                  gender === g.value
                    ? 'bg-brand-yellow text-brand-dark'
                    : 'bg-white text-brand-muted border border-gray-200'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="font-display font-bold text-xl text-brand-dark mb-2">ไม่พบสินค้าที่ค้นหา</p>
            <p className="font-body text-brand-muted mb-6">ลองเปลี่ยนคำค้นหา หรือ Custom แบบใหม่เองเลย</p>
            <a href="/customize" className="btn-primary">Custom แบบของตัวเอง →</a>
          </div>
        )}

        {/* B2B CTA */}
        <div className="mt-16 bg-brand-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display font-black text-white text-2xl md:text-3xl mb-2">สั่งทำสำหรับบริษัท?</p>
            <p className="font-body text-gray-400">ขั้นต่ำ 10 ชิ้น • ราคาพิเศษ • พร้อมโลโก้บริษัทบนฐาน</p>
          </div>
          <a
            href="/contact"
            className="flex-shrink-0 bg-brand-yellow text-brand-dark font-display font-bold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition-colors"
          >
            ติดต่อทีม B2B →
          </a>
        </div>
      </div>
    </div>
  )
}
