'use client'
import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, SlidersHorizontal, ArrowRight } from 'lucide-react'
import ProductCard from '@/components/ProductCard'
import { PRODUCTS } from '@/lib/data'

const CATEGORIES = [
  { value: 'all', label: 'ทั้งหมด' },
  { value: 'gift', label: '🎁 ของขวัญ' },
  { value: 'wedding', label: '💍 งานแต่ง' },
  { value: 'collect', label: '✨ สะสม' },
  { value: 'b2b', label: '🏢 บริษัท' },
]

const GENDERS = [
  { value: 'all', label: 'ทุกเพศ' },
  { value: 'male', label: 'ชาย' },
  { value: 'female', label: 'หญิง' },
  { value: 'unisex', label: 'Unisex' },
]

const SORTS = [
  { value: 'default', label: 'แนะนำ' },
  { value: 'price-asc', label: 'ราคา น้อย→มาก' },
  { value: 'price-desc', label: 'ราคา มาก→น้อย' },
  { value: 'new', label: 'ใหม่ล่าสุด' },
]

export default function ShopPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('all')
  const [gender, setGender] = useState('all')
  const [sort, setSort] = useState('default')
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const hasActiveFilter = category !== 'all' || gender !== 'all' || search !== ''

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

  const clearAll = () => { setSearch(''); setCategory('all'); setGender('all'); setSort('default') }

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Page header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-8 md:py-10">
          <div className="flex items-end justify-between">
            <div>
              <span className="section-label mb-2">ผลงานทั้งหมด</span>
              <h1 className="font-display font-black text-3xl md:text-5xl text-brand-dark leading-tight">
                Shop & Gallery
              </h1>
              <p className="font-body text-brand-muted mt-1.5 text-base">
                {PRODUCTS.length} แบบ — หรือ{' '}
                <a href="/customize" className="text-brand-dark font-bold underline underline-offset-2 hover:text-brand-red transition-colors">
                  Custom ใหม่เองได้เลย
                </a>
              </p>
            </div>
            <a
              href="/customize"
              className="hidden md:flex btn-primary text-sm py-2.5 px-5"
            >
              Custom ตัวเอง <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-site py-6 md:py-8">

        {/* ── Search + Sort bar ── */}
        <div className="flex gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted pointer-events-none" />
            <input
              type="search"
              placeholder="ค้นหาสินค้า..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-3 bg-white rounded-xl border-2 border-brand-dark/20 font-body text-brand-dark placeholder:text-gray-400 focus:outline-none focus:border-brand-yellow shadow-brick-sm transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-dark"
                aria-label="ล้างการค้นหา"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Sort — always visible */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-3 bg-white rounded-xl border-2 border-brand-dark/20 font-body text-brand-dark text-sm focus:outline-none focus:border-brand-yellow shadow-brick-sm transition-colors flex-shrink-0"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>

          {/* Mobile filter toggle */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className={`md:hidden flex items-center gap-1.5 px-3 py-3 rounded-xl border-2 font-display font-bold text-sm shadow-brick-sm transition-all flex-shrink-0 ${showMobileFilters ? 'bg-brand-yellow border-brand-dark' : 'bg-white border-brand-dark/20'}`}
          >
            <SlidersHorizontal size={16} />
            {hasActiveFilter && <span className="w-2 h-2 rounded-full bg-brand-red" />}
          </button>
        </div>

        {/* ── Filters ── */}
        {/* Desktop: always shown */}
        <div className={`${showMobileFilters ? 'block' : 'hidden md:block'} mb-5`}>
          <div className="bg-white rounded-2xl border-2 border-brand-dark/10 p-4 shadow-brick-sm">
            {/* Category row */}
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="font-display font-bold text-xs text-brand-muted self-center mr-1 hidden md:block">หมวด:</span>
              {CATEGORIES.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={`px-3.5 py-1.5 rounded-full font-display font-bold text-sm transition-all duration-150 ${
                    category === c.value
                      ? 'bg-brand-dark text-white shadow-md'
                      : 'bg-brand-neutral text-brand-muted hover:bg-brand-yellow/30 hover:text-brand-dark'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Gender + clear row */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-gray-100 items-center">
              <span className="font-display font-bold text-xs text-brand-muted mr-1 hidden md:block">เพศ:</span>
              {GENDERS.map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value)}
                  className={`px-3 py-1 rounded-full font-display font-bold text-xs transition-all duration-150 ${
                    gender === g.value
                      ? 'bg-brand-yellow text-brand-dark shadow-sm'
                      : 'bg-brand-neutral text-brand-muted hover:bg-brand-yellow/30 hover:text-brand-dark'
                  }`}
                >
                  {g.label}
                </button>
              ))}
              {hasActiveFilter && (
                <button
                  onClick={clearAll}
                  className="ml-auto flex items-center gap-1 px-3 py-1 text-xs font-display font-bold text-brand-red bg-red-50 hover:bg-red-100 rounded-full transition-colors"
                >
                  <X size={11} /> ล้างตัวกรอง
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── Results count ── */}
        <div className="flex items-center justify-between mb-5">
          <p className="font-body text-brand-muted text-sm">
            พบ <span className="font-bold text-brand-dark">{filtered.length}</span> รายการ
            {hasActiveFilter && <span className="text-brand-red ml-1">(กรองอยู่)</span>}
          </p>
        </div>

        {/* ── Product grid ── */}
        {filtered.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            <AnimatePresence>
              {filtered.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.18 }}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-5 bg-brand-neutral rounded-2xl border-3 border-brand-dark shadow-brick flex items-center justify-center">
              <Search size={32} className="text-brand-muted" />
            </div>
            <p className="font-display font-bold text-xl text-brand-dark mb-2">ไม่พบสินค้า</p>
            <p className="font-body text-brand-muted mb-6">ลองเปลี่ยนตัวกรอง หรือ Custom แบบใหม่เองเลย</p>
            <div className="flex gap-3 justify-center">
              {hasActiveFilter && (
                <button onClick={clearAll} className="btn-outline">
                  ล้างตัวกรอง
                </button>
              )}
              <a href="/customize" className="btn-primary">Custom แบบของตัวเอง</a>
            </div>
          </div>
        )}

        {/* ── B2B CTA ── */}
        <div className="mt-16 rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
          <div className="bg-brand-dark p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-black text-white text-2xl md:text-3xl mb-1.5">สั่งทำสำหรับบริษัท?</p>
              <p className="font-body text-gray-400">ขั้นต่ำ 10 ชิ้น • ราคาพิเศษ • พร้อมโลโก้บริษัทบนฐาน</p>
            </div>
            <a href="/contact" className="flex-shrink-0 btn-primary">
              ติดต่อทีม B2B <ArrowRight size={16} />
            </a>
          </div>
          <div className="brick-row-yellow" />
        </div>
      </div>
    </div>
  )
}
