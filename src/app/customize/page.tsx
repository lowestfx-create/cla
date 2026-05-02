'use client'
import { useState, useEffect, useCallback, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Undo2, Redo2, Shuffle, ShoppingCart, Share2, ChevronLeft, ChevronRight,
  Glasses, Sun, HardHat, Crown, Sword, Sparkles, Cat, Dog, BookOpen, Camera, Guitar, Coffee,
  CheckCircle2,
} from 'lucide-react'
import { toast } from 'sonner'
import { useCustomizerStore, useCartStore } from '@/lib/store'
import { calculatePrice } from '@/lib/utils'
import { CustomConfig } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import ColorPicker from '@/components/ColorPicker'
import PricePill from '@/components/PricePill'
import CharacterPreview from '@/components/CharacterPreview'

const BodyViewer = dynamic(() => import('@/components/BodyViewer'), { ssr: false })

const STEPS = ['สไตล์', 'หน้า', 'ผม', 'ชุด', 'อุปกรณ์', 'ฐาน', 'รูปอ้างอิง', 'สรุป']

const STYLES = [
  { id: 'mini', label: 'Mini Body', desc: 'ขนาดเล็ก กะทัดรัด สไตล์เลโก้คลาสสิก', price: 590, stl: '/models/mini-body.stl' },
  { id: 'normal', label: 'Normal Body', desc: 'ขนาดมาตรฐาน สัดส่วนครบ สมจริง', price: 650, stl: '/models/normal-body.stl' },
]

const FACES = [
  { id: 'smile', label: 'ยิ้มสดใส' },
  { id: 'cool', label: 'คูล' },
  { id: 'blush', label: 'อาย' },
  { id: 'serious', label: 'จริงจัง' },
  { id: 'happy', label: 'ดีใจ' },
  { id: 'wink', label: '윙크' },
]

const HAIR_STYLES = [
  { id: 'short-straight', label: 'สั้นตรง' },
  { id: 'short-wavy', label: 'สั้นหยัก' },
  { id: 'long-straight', label: 'ยาวตรง' },
  { id: 'long-wavy', label: 'ยาวหยัก' },
  { id: 'ponytail', label: 'หางม้า' },
  { id: 'bun', label: 'มวย' },
  { id: 'mohawk', label: 'โมฮอว์ก' },
  { id: 'curly', label: 'หยิก' },
  { id: 'afro', label: 'อฟโร' },
  { id: 'bald', label: 'หัวโล้น' },
  { id: 'baseball-cap', label: 'หมวกเบสบอล' },
  { id: 'beanie', label: 'หมวกไหมพรม' },
]

const TOPS = [
  { id: 'tshirt', label: 'เสื้อยืด' },
  { id: 'polo', label: 'โปโล' },
  { id: 'hoodie', label: 'ฮู้ดดี้' },
  { id: 'suit', label: 'สูท' },
  { id: 'dress', label: 'ชุดเดรส' },
  { id: 'uniform', label: 'ชุดนักเรียน' },
  { id: 'scrubs', label: 'ชุดพยาบาล' },
  { id: 'jersey', label: 'เสื้อกีฬา' },
]

const BOTTOMS = [
  { id: 'jeans', label: 'ยีนส์' },
  { id: 'shorts', label: 'กางเกงขาสั้น' },
  { id: 'skirt', label: 'กระโปรง' },
  { id: 'trousers', label: 'สแล็ค' },
  { id: 'joggers', label: 'จ๊อกเกอร์' },
]

const SHOES = [
  { id: 'sneakers', label: 'สนีกเกอร์' },
  { id: 'heels', label: 'ส้นสูง' },
  { id: 'boots', label: 'บูท' },
  { id: 'sandals', label: 'รองเท้าแตะ' },
  { id: 'loafers', label: 'โลฟเฟอร์' },
]

const ACCESSORIES = [
  { id: 'glasses', label: 'แว่นตา', Icon: Glasses },
  { id: 'sunglasses', label: 'แว่นกันแดด', Icon: Sun },
  { id: 'hat', label: 'หมวกปีก', Icon: HardHat },
  { id: 'crown', label: 'มงกุฎ', Icon: Crown },
  { id: 'sword', label: 'ดาบ', Icon: Sword },
  { id: 'wand', label: 'ไม้กายสิทธิ์', Icon: Sparkles },
  { id: 'cat', label: 'แมว', Icon: Cat },
  { id: 'dog', label: 'หมา', Icon: Dog },
  { id: 'book', label: 'หนังสือ', Icon: BookOpen },
  { id: 'camera', label: 'กล้อง', Icon: Camera },
  { id: 'guitar', label: 'กีตาร์', Icon: Guitar },
  { id: 'coffee', label: 'กาแฟ', Icon: Coffee },
]

const BASES = [
  { id: 'none', label: 'ไม่มีฐาน', desc: 'ตัวละครเดี่ยว', price: 0 },
  { id: 'plain', label: 'ฐานเรียบ', desc: 'สีพื้น ไม่มีข้อความ', price: 0 },
  { id: 'engraved', label: 'ฐานสลักชื่อ', desc: 'ใส่ชื่อหรือข้อความได้ (+50฿)', price: 50 },
]

const PRESETS: Record<string, Partial<CustomConfig>> = {
  couple: { style: 'mini', skin: '#FDBCB4', faceExpression: 'smile', hairStyle: 'long-straight', hairColor: '#2C1810', top: 'dress', topColor: '#E91E63', bottom: 'skirt', bottomColor: '#E91E63', shoes: 'heels', shoesColor: '#2C1810', base: 'engraved' },
  office: { style: 'mini', skin: '#F1C27D', faceExpression: 'cool', hairStyle: 'short-straight', hairColor: '#1C1C1C', top: 'suit', topColor: '#1E3A5F', bottom: 'trousers', bottomColor: '#1E3A5F', shoes: 'loafers', shoesColor: '#1C1C1C', base: 'plain' },
  gamer: { style: 'normal', skin: '#FDBCB4', faceExpression: 'happy', hairStyle: 'mohawk', hairColor: '#4B0082', top: 'hoodie', topColor: '#1C1C1C', bottom: 'joggers', bottomColor: '#1C1C1C', shoes: 'sneakers', shoesColor: '#FF5722', accessories: ['glasses'], base: 'plain' },
}

// ── SVG paths for hair (reused from CharacterPreview) ──
const HAIR_SHAPES: Record<string, string> = {
  'short-straight': 'M 40 52 Q 40 30 60 28 Q 80 30 80 52 L 80 48 Q 80 28 60 22 Q 40 28 40 48 Z',
  'short-wavy': 'M 38 52 Q 35 38 42 30 Q 52 22 60 24 Q 70 22 78 30 Q 85 38 82 52 L 82 46 Q 82 26 60 20 Q 38 26 38 46 Z',
  'long-straight': 'M 36 52 Q 36 28 60 24 Q 84 28 84 52 L 84 80 Q 82 84 80 80 L 80 50 Q 80 30 60 28 Q 40 30 40 50 L 40 80 Q 38 84 36 80 Z',
  'long-wavy': 'M 35 52 Q 33 30 50 24 Q 60 20 70 24 Q 87 30 85 52 L 88 78 Q 82 88 78 78 L 78 52 Q 78 32 60 28 Q 42 32 42 52 L 42 78 Q 38 88 32 78 Z',
  'ponytail': 'M 40 52 Q 40 30 60 26 Q 80 30 80 52 L 80 48 Q 80 28 60 22 Q 40 28 40 48 Z M 74 38 Q 80 30 78 50 Q 82 48 84 36 Q 86 24 80 22 Z',
  'bun': 'M 40 52 Q 40 32 60 28 Q 80 32 80 52 L 80 48 Q 80 28 60 24 Q 40 28 40 48 Z M 52 24 Q 52 14 60 12 Q 68 14 68 24 Q 68 32 60 32 Q 52 32 52 24 Z',
  'mohawk': 'M 40 52 Q 40 34 60 30 Q 80 34 80 52 L 80 48 Q 80 32 60 28 Q 40 32 40 48 Z M 56 30 Q 56 12 60 8 Q 64 12 64 30 Z',
  'curly': 'M 36 52 Q 34 30 44 24 Q 50 16 60 18 Q 70 16 76 24 Q 86 30 84 52 L 84 50 Q 86 28 76 22 Q 70 14 60 16 Q 50 14 44 22 Q 34 28 36 50 Z',
  'afro': 'M 30 55 Q 28 25 60 18 Q 92 25 90 55 L 90 50 Q 92 20 60 14 Q 28 20 30 50 Z',
  'bald': '',
  'baseball-cap': 'M 38 52 Q 38 32 60 28 Q 82 32 82 52 L 82 44 Q 82 26 60 24 Q 38 26 38 44 Z M 30 48 Q 30 40 40 40 L 38 44 Q 30 44 32 48 Z',
  'beanie': 'M 36 54 Q 36 26 60 20 Q 84 26 84 54 L 84 46 Q 84 22 60 16 Q 36 22 36 46 Z M 36 52 Q 36 44 84 44 L 84 50 Q 84 42 36 42 Z',
}

// ── Mini SVG hair thumbnail ──
function HairSVG({ hairStyle, hairColor, skinColor }: { hairStyle: string; hairColor: string; skinColor: string }) {
  const path = HAIR_SHAPES[hairStyle] ?? ''
  return (
    <svg viewBox="28 8 64 72" width="52" height="52" aria-hidden="true">
      <rect x="40" y="52" width="40" height="40" rx="10" fill={skinColor} />
      <ellipse cx="40" cy="70" rx="5" ry="6" fill={skinColor} />
      <ellipse cx="80" cy="70" rx="5" ry="6" fill={skinColor} />
      <ellipse cx="54" cy="70" rx="3.5" ry="4" fill="#1A1A1A" />
      <ellipse cx="66" cy="70" rx="3.5" ry="4" fill="#1A1A1A" />
      {path ? <path d={path} fill={hairColor} /> : (
        <ellipse cx="60" cy="52" rx="20" ry="3" fill="#E5E7EB" />
      )}
    </svg>
  )
}

// ── Mini SVG face thumbnail ──
function FaceSVG({ expression, skinColor }: { expression: string; skinColor: string }) {
  const mouths: Record<string, string> = {
    smile: 'M 54 86 Q 60 92 66 86',
    cool: 'M 54 87 L 66 87',
    blush: 'M 55 86 Q 60 90 65 86',
    serious: 'M 55 88 L 65 88',
    happy: 'M 52 84 Q 60 94 68 84',
    wink: 'M 54 86 Q 60 92 66 86',
  }
  return (
    <svg viewBox="32 48 56 46" width="52" height="42" aria-hidden="true">
      <rect x="40" y="52" width="40" height="40" rx="10" fill={skinColor} />
      <ellipse cx="40" cy="70" rx="5" ry="6" fill={skinColor} />
      <ellipse cx="80" cy="70" rx="5" ry="6" fill={skinColor} />
      {expression === 'wink'
        ? <path d="M 52 78 Q 56 74 60 78" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
        : <ellipse cx="56" cy="77" rx="3.5" ry="4" fill="#1A1A2E" />}
      <ellipse cx="64" cy="77" rx="3.5" ry="4" fill="#1A1A2E" />
      {(expression === 'blush' || expression === 'happy') && <>
        <ellipse cx="50" cy="83" rx="5" ry="3" fill="#FFB6C1" opacity="0.55" />
        <ellipse cx="70" cy="83" rx="5" ry="3" fill="#FFB6C1" opacity="0.55" />
      </>}
      <path d={mouths[expression] ?? mouths.smile} fill="none" stroke="#C97060" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

// ── Mini SVG style card ──
function StyleSVG({ styleId, selected }: { styleId: string; selected: boolean }) {
  const headScale = styleId === 'chibi' ? 1.3 : styleId === 'realistic' ? 1.1 : 1
  const cx = 40
  const cy = 32
  return (
    <svg viewBox="20 10 40 60" width="64" height="80" aria-hidden="true">
      {/* body */}
      <rect x="28" y="54" width="24" height="18" rx="3" fill={selected ? '#DA291C' : '#3B82F6'} />
      {/* head */}
      <g transform={`translate(${cx},${cy}) scale(${headScale}) translate(${-cx},${-cy})`}>
        <rect x="28" y="20" width="24" height="22" rx={styleId === 'realistic' ? 8 : 5} fill="#FDBCB4" />
        <ellipse cx="35" cy="33" rx="2.5" ry="3" fill="#1A1A1A" />
        <ellipse cx="45" cy="33" rx="2.5" ry="3" fill="#1A1A1A" />
        <path d="M 35 39 Q 40 43 45 39" fill="none" stroke="#C97060" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function CustomizePageInner() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { config, updateConfig, undo, redo, history, future, currentPrice } = useCustomizerStore()
  const addItem = useCartStore((s) => s.addItem)
  const [step, setStep] = useState(0)
  const [note, setNote] = useState('')
  const [baseName, setBaseName] = useState('')

  useEffect(() => {
    const preset = searchParams.get('preset')
    if (preset && PRESETS[preset]) {
      Object.entries(PRESETS[preset]).forEach(([k, v]) => {
        updateConfig({ [k]: v } as Partial<CustomConfig>)
      })
    }
    const draft = localStorage.getItem('brickme-draft')
    if (draft && !preset) {
      try { updateConfig(JSON.parse(draft)) } catch {}
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('brickme-draft', JSON.stringify(config))
  }, [config])

  const handleRandom = useCallback(() => {
    const randomFrom = <T,>(arr: T[]) => arr[Math.floor(Math.random() * arr.length)]
    updateConfig({
      style: randomFrom(['mini', 'normal']) as CustomConfig['style'],
      skin: randomFrom(['#FDBCB4', '#F1C27D', '#E0AC69', '#C68642', '#8D5524']),
      faceExpression: randomFrom(FACES).id,
      hairStyle: randomFrom(HAIR_STYLES).id,
      hairColor: randomFrom(['#2C1810', '#1C1C1C', '#8B6914', '#D4584A', '#4B0082', '#FFFFFF']),
      top: randomFrom(TOPS).id,
      topColor: randomFrom(['#E74C3C', '#27AE60', '#3B82F6', '#9B59B6', '#F39C12']),
      bottom: randomFrom(BOTTOMS).id,
      bottomColor: randomFrom(['#1E3A5F', '#1C1C1C', '#27AE60', '#607D8B']),
      shoes: randomFrom(SHOES).id,
      shoesColor: randomFrom(['#FFFFFF', '#1C1C1C', '#795548']),
      accessories: Math.random() > 0.5 ? [randomFrom(ACCESSORIES).id] : [],
      base: 'plain',
    })
    toast('สุ่มแบบแล้ว!')
  }, [updateConfig])

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/customize?config=${encodeURIComponent(JSON.stringify(config))}`
    navigator.clipboard.writeText(url)
    toast('คัดลอกลิงก์แล้ว แชร์ให้เพื่อนได้เลย!')
  }, [config])

  const handleAddToCart = useCallback(() => {
    addItem({
      id: `custom-${Date.now()}`,
      customConfig: { ...config, note, baseName },
      quantity: 1,
      price: currentPrice,
      name: `Custom ${STYLES.find(s => s.id === config.style)?.label ?? 'Minifigure'}`,
    })
    toast.success('เพิ่มลงตะกร้าแล้ว!')
    router.push('/cart')
  }, [config, currentPrice, note, baseName, addItem, router])

  const canGoNext = step < STEPS.length - 1
  const canGoPrev = step > 0

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Top bar */}
      <div className="bg-white border-b-3 border-brand-dark sticky top-16 z-30 shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <h1 className="font-display font-black text-xl text-brand-dark leading-none">Custom ตัวละคร</h1>
              <p className="font-body text-brand-muted text-[10px] mt-0.5">สร้างตัวละครในแบบของคุณ</p>
            </div>
            <div className="flex items-center gap-2">
              {[
                { action: undo, icon: Undo2, disabled: history.length === 0, label: 'ย้อนกลับ' },
                { action: redo, icon: Redo2, disabled: future.length === 0, label: 'ทำซ้ำ' },
                { action: handleRandom, icon: Shuffle, disabled: false, label: 'สุ่มแบบ' },
              ].map(({ action, icon: Icon, disabled, label }) => (
                <button
                  key={label}
                  onClick={action}
                  disabled={disabled}
                  aria-label={label}
                  className="p-2 rounded-lg border-2 border-brand-dark bg-white shadow-brick-sm hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-75 focus-ring"
                >
                  <Icon size={16} />
                </button>
              ))}
              <button
                onClick={handleShare}
                aria-label="แชร์แบบ"
                className="hidden md:flex p-2 rounded-lg border-2 border-brand-dark bg-white shadow-brick-sm hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-75 focus-ring"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>
          <ProgressBar steps={STEPS} currentStep={step} />
        </div>
      </div>

      <div className="container-site py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* ── Left: Preview ── */}
          <div className="lg:w-80 lg:flex-shrink-0">
            <div className="lg:sticky lg:top-36">
              <CharacterPreview config={config} />
              <div className="mt-4">
                <PricePill price={currentPrice} onAddToCart={step === STEPS.length - 1 ? handleAddToCart : undefined} />
              </div>
              {step < STEPS.length - 1 && (
                <p className="text-center font-body text-brand-muted text-xs mt-3">
                  กรอกข้อมูลครบแล้วกด "สรุป" เพื่อเพิ่มลงตะกร้า
                </p>
              )}
            </div>
          </div>

          {/* ── Right: Step panel ── */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >

                {/* STEP 0: Style */}
                {step === 0 && (
                  <StepCard title="เลือกสไตล์ตัวละคร" desc="สไตล์จะกำหนดรูปแบบและราคาเริ่มต้น">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {STYLES.map((s) => {
                        const isSelected = config.style === s.id
                        return (
                          <motion.button
                            key={s.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => updateConfig({ style: s.id as CustomConfig['style'] })}
                            className={`
                              w-full rounded-xl border-3 text-left overflow-hidden transition-all duration-150 focus-ring
                              ${isSelected
                                ? 'border-brand-dark shadow-brick-lg'
                                : 'border-brand-dark/40 shadow-brick hover:border-brand-dark hover:shadow-brick-lg'
                              }
                            `}
                          >
                            {/* 3D model area */}
                            <div
                              className="w-full relative overflow-hidden"
                              style={{
                                height: '200px',
                                background: isSelected
                                  ? 'linear-gradient(150deg, #0f172a 0%, #1e293b 50%, #7c1517 100%)'
                                  : 'linear-gradient(150deg, #1e293b 0%, #334155 50%, #1e3a5f 100%)',
                              }}
                            >
                              {/* stud overlay */}
                              <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                  backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 25%, transparent 25%)',
                                  backgroundSize: '16px 16px',
                                }}
                              />
                              <Suspense fallback={
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                                </div>
                              }>
                                <BodyViewer
                                  url={s.stl}
                                  color={isSelected ? '#DA291C' : '#4A90D9'}
                                  className="w-full h-full"
                                  interactive={false}
                                />
                              </Suspense>

                              {/* Selected badge */}
                              {isSelected && (
                                <div className="absolute top-2 right-2">
                                  <span className="flex items-center gap-1 px-2 py-0.5 bg-brand-yellow border-2 border-brand-dark rounded-md text-[9px] font-display font-black text-brand-dark shadow-brick-sm">
                                    <CheckCircle2 size={10} />
                                    เลือกแล้ว
                                  </span>
                                </div>
                              )}
                            </div>

                            {/* Info section */}
                            <div className={`px-4 py-3 ${isSelected ? 'bg-brand-yellow' : 'bg-white'}`}>
                              <div className="flex items-center justify-between">
                                <p className="font-display font-black text-brand-dark text-lg">{s.label}</p>
                                <p className="font-display font-black text-brand-dark text-xl">฿{s.price}</p>
                              </div>
                              <p className="font-body text-brand-dark/60 text-xs mt-0.5">{s.desc}</p>
                            </div>
                          </motion.button>
                        )
                      })}
                    </div>
                  </StepCard>
                )}

                {/* STEP 1: Face */}
                {step === 1 && (
                  <StepCard title="หน้าและสีผิว" desc="เลือกอารมณ์สีหน้า และเฉดสีผิว">
                    <div className="space-y-6">
                      <div>
                        <p className="font-display font-bold text-brand-dark mb-3">อารมณ์ / Expression</p>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                          {FACES.map((f) => (
                            <RadioCard
                              key={f.id}
                              selected={config.faceExpression === f.id}
                              onClick={() => updateConfig({ faceExpression: f.id })}
                              compact
                            >
                              <div className="flex justify-center">
                                <FaceSVG expression={f.id} skinColor={config.skin ?? '#FDBCB4'} />
                              </div>
                              <p className="font-body text-xs text-brand-muted mt-1">{f.label}</p>
                            </RadioCard>
                          ))}
                        </div>
                      </div>
                      <ColorPicker
                        type="skin"
                        selected={config.skin}
                        onChange={(c) => updateConfig({ skin: c })}
                        label="สีผิว"
                      />
                    </div>
                  </StepCard>
                )}

                {/* STEP 2: Hair */}
                {step === 2 && (
                  <StepCard title="ทรงผม" desc="12 แบบทรงผม พร้อม 12 สี">
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {HAIR_STYLES.map((h) => (
                          <RadioCard
                            key={h.id}
                            selected={config.hairStyle === h.id}
                            onClick={() => updateConfig({ hairStyle: h.id })}
                            compact
                          >
                            <div className="flex justify-center">
                              <HairSVG
                                hairStyle={h.id}
                                hairColor={config.hairColor ?? '#2C1810'}
                                skinColor={config.skin ?? '#FDBCB4'}
                              />
                            </div>
                            <p className="font-body text-xs text-brand-muted mt-1 text-center">{h.label}</p>
                          </RadioCard>
                        ))}
                      </div>
                      <ColorPicker
                        type="hair"
                        selected={config.hairColor}
                        onChange={(c) => updateConfig({ hairColor: c })}
                        label="สีผม"
                      />
                    </div>
                  </StepCard>
                )}

                {/* STEP 3: Outfit */}
                {step === 3 && (
                  <StepCard title="เสื้อผ้า" desc="เลือก Top / Bottom / Shoes พร้อมสี">
                    <div className="space-y-6">
                      <div>
                        <p className="font-display font-bold text-brand-dark mb-3">เสื้อ (Top)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {TOPS.map((t) => (
                            <RadioCard key={t.id} selected={config.top === t.id} onClick={() => updateConfig({ top: t.id })} compact>
                              <p className="font-body text-sm text-brand-dark">{t.label}</p>
                            </RadioCard>
                          ))}
                        </div>
                        <div className="mt-3">
                          <ColorPicker type="clothing" selected={config.topColor} onChange={(c) => updateConfig({ topColor: c })} label="สีเสื้อ" />
                        </div>
                      </div>
                      <div>
                        <p className="font-display font-bold text-brand-dark mb-3">กางเกง/กระโปรง (Bottom)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {BOTTOMS.map((b) => (
                            <RadioCard key={b.id} selected={config.bottom === b.id} onClick={() => updateConfig({ bottom: b.id })} compact>
                              <p className="font-body text-sm text-brand-dark">{b.label}</p>
                            </RadioCard>
                          ))}
                        </div>
                        <div className="mt-3">
                          <ColorPicker type="clothing" selected={config.bottomColor} onChange={(c) => updateConfig({ bottomColor: c })} label="สีกางเกง/กระโปรง" />
                        </div>
                      </div>
                      <div>
                        <p className="font-display font-bold text-brand-dark mb-3">รองเท้า (Shoes)</p>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          {SHOES.map((s) => (
                            <RadioCard key={s.id} selected={config.shoes === s.id} onClick={() => updateConfig({ shoes: s.id })} compact>
                              <p className="font-body text-sm text-brand-dark">{s.label}</p>
                            </RadioCard>
                          ))}
                        </div>
                        <div className="mt-3">
                          <ColorPicker type="clothing" selected={config.shoesColor} onChange={(c) => updateConfig({ shoesColor: c })} label="สีรองเท้า" />
                        </div>
                      </div>
                    </div>
                  </StepCard>
                )}

                {/* STEP 4: Accessories */}
                {step === 4 && (
                  <StepCard title="อุปกรณ์เสริม" desc={`เลือกได้ 0–3 ชิ้น (+${50}฿ ต่อชิ้น)`}>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {ACCESSORIES.map((a) => {
                        const selected = config.accessories?.includes(a.id) ?? false
                        return (
                          <RadioCard
                            key={a.id}
                            selected={selected}
                            onClick={() => {
                              const current = config.accessories ?? []
                              if (selected) {
                                updateConfig({ accessories: current.filter((x) => x !== a.id) })
                              } else if (current.length < 3) {
                                updateConfig({ accessories: [...current, a.id] })
                              } else {
                                toast.error('เลือกได้สูงสุด 3 ชิ้น')
                              }
                            }}
                            compact
                          >
                            <div className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center mx-auto mb-1 ${selected ? 'bg-brand-yellow border-brand-dark' : 'bg-brand-neutral border-gray-200'}`}>
                              <a.Icon size={20} className="text-brand-dark" />
                            </div>
                            <p className="font-body text-xs text-brand-muted">{a.label}</p>
                            {selected && <p className="text-[10px] font-black text-brand-dark mt-0.5">+50฿</p>}
                          </RadioCard>
                        )
                      })}
                    </div>
                    <p className="font-body text-brand-muted text-sm mt-4">
                      เลือกแล้ว: {config.accessories?.length ?? 0}/3 ชิ้น
                    </p>
                  </StepCard>
                )}

                {/* STEP 5: Base */}
                {step === 5 && (
                  <StepCard title="ฐานตัวละคร" desc="ฐานช่วยให้ตั้งตัวละครได้มั่นคง">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {BASES.map((b) => (
                        <RadioCard
                          key={b.id}
                          selected={config.base === b.id}
                          onClick={() => updateConfig({ base: b.id as CustomConfig['base'] })}
                        >
                          {/* Base SVG illustration */}
                          <div className="flex justify-center mb-2">
                            <svg viewBox="0 0 60 24" width="80" height="32" aria-hidden="true">
                              <rect x="4" y="8" width="52" height="14" rx="4" fill={b.id === 'none' ? '#E5E7EB' : '#9CA3AF'} />
                              {b.id !== 'none' && [12, 22, 32, 42, 52].map((x) => (
                                <ellipse key={x} cx={x} cy="6" rx="5" ry="4" fill="#6B7280" />
                              ))}
                              {b.id === 'engraved' && (
                                <text x="30" y="19" textAnchor="middle" fontSize="5" fill="white" fontFamily="monospace">NAME</text>
                              )}
                            </svg>
                          </div>
                          <p className="font-display font-black text-brand-dark">{b.label}</p>
                          <p className="font-body text-brand-muted text-xs mt-1">{b.desc}</p>
                          <p className="font-display font-black text-brand-dark mt-2">
                            {b.price === 0 ? 'ฟรี' : `+฿${b.price}`}
                          </p>
                        </RadioCard>
                      ))}
                    </div>
                    {config.base === 'engraved' && (
                      <div className="mt-4">
                        <label className="font-display font-bold text-sm text-brand-dark block mb-2">
                          ข้อความบนฐาน (สูงสุด 20 ตัวอักษร)
                        </label>
                        <input
                          type="text"
                          maxLength={20}
                          value={baseName}
                          onChange={(e) => setBaseName(e.target.value)}
                          placeholder="เช่น ชื่อ, วันที่ระลึก..."
                          className="w-full px-4 py-3 bg-white rounded-lg border-3 border-brand-dark focus:border-brand-yellow outline-none font-body transition-colors shadow-brick-sm"
                        />
                        <p className="text-xs text-brand-muted mt-1 text-right">{baseName.length}/20</p>
                      </div>
                    )}
                  </StepCard>
                )}

                {/* STEP 6: Reference */}
                {step === 6 && (
                  <StepCard title="รูปอ้างอิง (ไม่บังคับ)" desc="อัปโหลดรูปตัวเองหรือคนที่จะให้เป็นของขวัญ เพื่อให้ทีมงานทำได้ใกล้เคียงที่สุด">
                    <div className="space-y-4">
                      <div className="border-3 border-dashed border-brand-dark rounded-lg p-8 text-center hover:bg-brand-yellow/10 transition-colors cursor-pointer">
                        <div className="w-12 h-12 bg-brand-neutral border-2 border-brand-dark rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Camera size={22} className="text-brand-dark" />
                        </div>
                        <p className="font-display font-black text-brand-dark">อัปโหลดรูป</p>
                        <p className="font-body text-brand-muted text-sm mt-1">JPG, PNG — สูงสุด 3 ไฟล์</p>
                        <input type="file" accept="image/*" multiple className="hidden" />
                      </div>
                      <div>
                        <label className="font-display font-bold text-sm text-brand-dark block mb-2">
                          หมายเหตุเพิ่มเติม
                        </label>
                        <textarea
                          rows={4}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="บอกรายละเอียดที่ต้องการเพิ่มเติม เช่น 'ต้องการสักที่แขน' หรือ 'ผมสั้นด้านข้าง'"
                          className="w-full px-4 py-3 bg-white rounded-lg border-3 border-brand-dark focus:border-brand-yellow outline-none font-body transition-colors resize-none shadow-brick-sm"
                        />
                      </div>
                    </div>
                  </StepCard>
                )}

                {/* STEP 7: Summary */}
                {step === 7 && (
                  <StepCard title="สรุปออเดอร์" desc="ตรวจสอบรายละเอียดก่อนเพิ่มลงตะกร้า">
                    <div className="space-y-4">
                      <SummaryRow label="สไตล์" value={STYLES.find(s => s.id === config.style)?.label ?? '-'} />
                      <SummaryRow label="ทรงผม" value={HAIR_STYLES.find(h => h.id === config.hairStyle)?.label ?? '-'} />
                      <SummaryRow label="เสื้อ" value={TOPS.find(t => t.id === config.top)?.label ?? '-'} />
                      <SummaryRow label="กางเกง/กระโปรง" value={BOTTOMS.find(b => b.id === config.bottom)?.label ?? '-'} />
                      <SummaryRow label="รองเท้า" value={SHOES.find(s => s.id === config.shoes)?.label ?? '-'} />
                      <SummaryRow label="อุปกรณ์" value={config.accessories?.length ? config.accessories.map(a => ACCESSORIES.find(x => x.id === a)?.label).join(', ') : 'ไม่มี'} />
                      <SummaryRow label="ฐาน" value={BASES.find(b => b.id === config.base)?.label ?? '-'} />
                      {config.base === 'engraved' && baseName && <SummaryRow label="ข้อความฐาน" value={baseName} />}
                      {note && <SummaryRow label="หมายเหตุ" value={note} />}

                      <div className="border-t-3 border-brand-dark pt-4 mt-4 bg-brand-yellow rounded-lg p-4 -mx-1">
                        <div className="flex justify-between items-center">
                          <span className="font-display font-bold text-lg text-brand-dark">ราคารวม</span>
                          <span className="font-display font-black text-3xl text-brand-dark">
                            ฿{currentPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="font-body text-brand-dark/60 text-sm mt-1">ยังไม่รวมค่าจัดส่ง</p>
                      </div>

                      <button onClick={handleAddToCart} className="w-full btn-primary text-base py-4 mt-2">
                        <ShoppingCart size={20} />
                        เพิ่มลงตะกร้า
                      </button>
                      <button onClick={handleShare} className="w-full btn-outline text-sm py-3">
                        <Share2 size={16} />
                        แชร์แบบให้เพื่อนดูก่อน
                      </button>
                    </div>
                  </StepCard>
                )}

              </motion.div>
            </AnimatePresence>

            {/* Nav buttons */}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(s => s - 1)}
                disabled={!canGoPrev}
                className="btn-outline flex-1 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={18} /> ย้อนกลับ
              </button>
              {canGoNext && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(s => s + 1)}
                  className="btn-primary flex-1 text-base"
                >
                  ถัดไป <ChevronRight size={18} />
                </motion.button>
              )}
            </div>

            {/* Presets shortcut */}
            {step === 0 && (
              <div className="mt-6 card p-5">
                <p className="font-display font-black text-sm text-brand-dark mb-3">หรือเริ่มจาก Preset สำเร็จรูป</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'office', label: 'ชายออฟฟิศ' },
                    { id: 'couple', label: 'สาวหวาน' },
                    { id: 'gamer', label: 'นักเกม' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (PRESETS[p.id]) {
                          updateConfig(PRESETS[p.id] as Partial<CustomConfig>)
                          toast(`โหลด Preset "${p.label}" แล้ว`)
                        }
                      }}
                      className="px-4 py-2 bg-brand-neutral text-brand-dark font-display font-black text-sm rounded-lg border-2 border-brand-dark shadow-brick-sm hover:bg-brand-yellow hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-75"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CustomizePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-brand-neutral flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-brand-dark border-t-brand-yellow rounded-full animate-spin mx-auto mb-3" />
          <p className="font-display font-black text-brand-dark">กำลังโหลด...</p>
        </div>
      </div>
    }>
      <CustomizePageInner />
    </Suspense>
  )
}

// ── Sub-components ──

function StepCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="card p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display font-black text-2xl text-brand-dark">{title}</h2>
        <div className="flex items-center gap-2 mt-1">
          <div className="h-px flex-1 bg-gradient-to-r from-brand-yellow to-transparent" />
          <p className="font-body text-brand-muted text-sm">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  )
}

function RadioCard({ selected, onClick, children, compact = false }: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
  compact?: boolean
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        w-full rounded-xl border-3 transition-all duration-100 text-center focus-ring relative overflow-hidden
        ${compact ? 'p-3' : 'p-5'}
        ${selected
          ? 'border-brand-dark bg-brand-yellow shadow-brick translate-x-[2px] translate-y-[2px]'
          : 'border-brand-dark/50 bg-white shadow-brick-sm hover:border-brand-dark hover:bg-brand-yellow/20 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-brick'
        }
      `}
    >
      {selected && (
        <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-brand-dark rounded-full flex items-center justify-center">
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3L3 5L7 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      )}
      {children}
    </motion.button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b-2 border-gray-100 last:border-0">
      <span className="font-body text-brand-muted text-sm flex-shrink-0">{label}</span>
      <span className="font-display font-black text-brand-dark text-sm text-right">{value}</span>
    </div>
  )
}

