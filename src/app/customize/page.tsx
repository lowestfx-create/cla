'use client'
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Undo2, Redo2, Shuffle, ShoppingCart, Share2, ChevronLeft, ChevronRight } from 'lucide-react'
import { toast } from 'sonner'
import { useCustomizerStore, useCartStore } from '@/lib/store'
import { calculatePrice } from '@/lib/utils'
import { CustomConfig } from '@/types'
import ProgressBar from '@/components/ProgressBar'
import ColorPicker from '@/components/ColorPicker'
import PricePill from '@/components/PricePill'
import CharacterPreview from '@/components/CharacterPreview'

const STEPS = ['สไตล์', 'หน้า', 'ผม', 'ชุด', 'อุปกรณ์', 'ฐาน', 'รูปอ้างอิง', 'สรุป']

const STYLES = [
  { id: 'classic', label: 'Classic Mini', desc: 'สไตล์เลโก้ดั้งเดิม', emoji: '🧱', price: 590 },
  { id: 'chibi', label: 'Chibi', desc: 'หัวใหญ่ น่ารัก', emoji: '🥰', price: 650 },
  { id: 'realistic', label: 'Realistic Head', desc: 'หัวเหมือนจริง', emoji: '🎭', price: 790 },
]

const FACES = [
  { id: 'smile', label: 'ยิ้มสดใส', emoji: '😊' },
  { id: 'cool', label: 'คูล', emoji: '😎' },
  { id: 'blush', label: 'อาย', emoji: '😊' },
  { id: 'serious', label: 'จริงจัง', emoji: '😐' },
  { id: 'happy', label: 'ดีใจ', emoji: '😄' },
  { id: 'wink', label: '윙크', emoji: '😉' },
]

const HAIR_STYLES = [
  { id: 'short-straight', label: 'สั้นตรง', emoji: '💇' },
  { id: 'short-wavy', label: 'สั้นหยัก', emoji: '💇' },
  { id: 'long-straight', label: 'ยาวตรง', emoji: '👱‍♀️' },
  { id: 'long-wavy', label: 'ยาวหยัก', emoji: '👩‍🦱' },
  { id: 'ponytail', label: 'หางม้า', emoji: '💆‍♀️' },
  { id: 'bun', label: 'มวย', emoji: '👩‍🦳' },
  { id: 'mohawk', label: 'โมฮอว์ก', emoji: '🧑‍🦯' },
  { id: 'curly', label: 'หยิก', emoji: '👩‍🦱' },
  { id: 'afro', label: 'อฟโร', emoji: '👩‍🦱' },
  { id: 'bald', label: 'หัวโล้น', emoji: '👨‍🦲' },
  { id: 'baseball-cap', label: 'หมวกเบสบอล', emoji: '🧢' },
  { id: 'beanie', label: 'หมวกไหมพรม', emoji: '🧶' },
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
  { id: 'glasses', label: 'แว่นตา', emoji: '👓' },
  { id: 'sunglasses', label: 'แว่นกันแดด', emoji: '🕶️' },
  { id: 'hat', label: 'หมวกปีก', emoji: '👒' },
  { id: 'crown', label: 'มงกุฎ', emoji: '👑' },
  { id: 'sword', label: 'ดาบ', emoji: '⚔️' },
  { id: 'wand', label: 'ไม้กายสิทธิ์', emoji: '🪄' },
  { id: 'cat', label: 'แมว', emoji: '🐱' },
  { id: 'dog', label: 'หมา', emoji: '🐶' },
  { id: 'book', label: 'หนังสือ', emoji: '📚' },
  { id: 'camera', label: 'กล้อง', emoji: '📷' },
  { id: 'guitar', label: 'กีตาร์', emoji: '🎸' },
  { id: 'coffee', label: 'กาแฟ', emoji: '☕' },
]

const BASES = [
  { id: 'none', label: 'ไม่มีฐาน', desc: 'ตัวละครเดี่ยว', price: 0 },
  { id: 'plain', label: 'ฐานเรียบ', desc: 'สีพื้น ไม่มีข้อความ', price: 0 },
  { id: 'engraved', label: 'ฐานสลักชื่อ', desc: 'ใส่ชื่อหรือข้อความได้ (+50฿)', price: 50 },
]

const PRESETS: Record<string, Partial<CustomConfig>> = {
  couple: { style: 'classic', skin: '#FDBCB4', faceExpression: 'smile', hairStyle: 'long-straight', hairColor: '#2C1810', top: 'dress', topColor: '#E91E63', bottom: 'skirt', bottomColor: '#E91E63', shoes: 'heels', shoesColor: '#2C1810', base: 'engraved' },
  office: { style: 'classic', skin: '#F1C27D', faceExpression: 'cool', hairStyle: 'short-straight', hairColor: '#1C1C1C', top: 'suit', topColor: '#1E3A5F', bottom: 'trousers', bottomColor: '#1E3A5F', shoes: 'loafers', shoesColor: '#1C1C1C', base: 'plain' },
  gamer: { style: 'chibi', skin: '#FDBCB4', faceExpression: 'happy', hairStyle: 'mohawk', hairColor: '#4B0082', top: 'hoodie', topColor: '#1C1C1C', bottom: 'joggers', bottomColor: '#1C1C1C', shoes: 'sneakers', shoesColor: '#FF5722', accessories: ['glasses'], base: 'plain' },
}

export default function CustomizePage() {
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
    // restore draft
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
      style: randomFrom(['classic', 'chibi', 'realistic']) as CustomConfig['style'],
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
    toast('🎲 สุ่มแบบแล้ว! ชอบไหม?')
  }, [updateConfig])

  const handleShare = useCallback(() => {
    const url = `${window.location.origin}/customize?config=${encodeURIComponent(JSON.stringify(config))}`
    navigator.clipboard.writeText(url)
    toast('🔗 คัดลอกลิงก์แล้ว แชร์ให้เพื่อนดูได้เลย!')
  }, [config])

  const handleAddToCart = useCallback(() => {
    addItem({
      id: `custom-${Date.now()}`,
      customConfig: { ...config, note, baseName },
      quantity: 1,
      price: currentPrice,
      name: `Custom ${STYLES.find(s => s.id === config.style)?.label ?? 'Minifigure'}`,
    })
    toast.success('✅ เพิ่มลงตะกร้าแล้ว!')
    router.push('/cart')
  }, [config, currentPrice, note, baseName, addItem, router])

  const canGoNext = step < STEPS.length - 1
  const canGoPrev = step > 0

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-30">
        <div className="container-site py-4">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h1 className="font-display font-black text-xl text-brand-dark">Custom ตัวละคร</h1>
            <div className="flex items-center gap-2">
              <button onClick={undo} disabled={history.length === 0} aria-label="ย้อนกลับ"
                className="p-2 rounded-lg hover:bg-brand-neutral disabled:opacity-30 transition-colors focus-ring">
                <Undo2 size={18} />
              </button>
              <button onClick={redo} disabled={future.length === 0} aria-label="ทำซ้ำ"
                className="p-2 rounded-lg hover:bg-brand-neutral disabled:opacity-30 transition-colors focus-ring">
                <Redo2 size={18} />
              </button>
              <button onClick={handleRandom} aria-label="สุ่มแบบ"
                className="p-2 rounded-lg hover:bg-brand-neutral transition-colors focus-ring" title="สุ่มแบบ">
                <Shuffle size={18} />
              </button>
              <button onClick={handleShare} aria-label="แชร์แบบ"
                className="hidden md:flex p-2 rounded-lg hover:bg-brand-neutral transition-colors focus-ring">
                <Share2 size={18} />
              </button>
            </div>
          </div>
          <ProgressBar steps={STEPS} currentStep={step} />
        </div>
      </div>

      <div className="container-site py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">

          {/* ── Left: Preview (sticky on desktop) ── */}
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
                transition={{ duration: 0.25 }}
              >

                {/* STEP 0: Style */}
                {step === 0 && (
                  <StepCard title="เลือกสไตล์ตัวละคร" desc="สไตล์จะกำหนดรูปแบบและราคาเริ่มต้น">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {STYLES.map((s) => (
                        <RadioCard
                          key={s.id}
                          selected={config.style === s.id}
                          onClick={() => updateConfig({ style: s.id as CustomConfig['style'] })}
                        >
                          <div className="text-4xl mb-2">{s.emoji}</div>
                          <p className="font-display font-bold text-brand-dark">{s.label}</p>
                          <p className="font-body text-brand-muted text-xs mt-1">{s.desc}</p>
                          <p className="font-display font-black text-brand-yellow mt-2">฿{s.price}</p>
                        </RadioCard>
                      ))}
                    </div>
                  </StepCard>
                )}

                {/* STEP 1: Face */}
                {step === 1 && (
                  <StepCard title="หน้าและสีผิว" desc="เลือกอารมณ์สีหน้า และเฉดสีผิว">
                    <div className="space-y-6">
                      <div>
                        <p className="font-display font-semibold text-brand-dark mb-3">อารมณ์ / Expression</p>
                        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                          {FACES.map((f) => (
                            <RadioCard
                              key={f.id}
                              selected={config.faceExpression === f.id}
                              onClick={() => updateConfig({ faceExpression: f.id })}
                              compact
                            >
                              <div className="text-3xl">{f.emoji}</div>
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
                            <div className="text-2xl">{h.emoji}</div>
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
                        <p className="font-display font-semibold text-brand-dark mb-3">เสื้อ (Top)</p>
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
                        <p className="font-display font-semibold text-brand-dark mb-3">กางเกง/กระโปรง (Bottom)</p>
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
                        <p className="font-display font-semibold text-brand-dark mb-3">รองเท้า (Shoes)</p>
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
                            <div className="text-2xl">{a.emoji}</div>
                            <p className="font-body text-xs text-brand-muted mt-1">{a.label}</p>
                            {selected && <p className="text-[10px] font-bold text-brand-yellow">+50฿</p>}
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
                          <p className="font-display font-bold text-brand-dark">{b.label}</p>
                          <p className="font-body text-brand-muted text-xs mt-1">{b.desc}</p>
                          <p className="font-display font-black text-brand-yellow mt-2">
                            {b.price === 0 ? 'ฟรี' : `+฿${b.price}`}
                          </p>
                        </RadioCard>
                      ))}
                    </div>
                    {config.base === 'engraved' && (
                      <div className="mt-4">
                        <label className="font-display font-semibold text-sm text-brand-dark block mb-2">
                          ข้อความบนฐาน (สูงสุด 20 ตัวอักษร)
                        </label>
                        <input
                          type="text"
                          maxLength={20}
                          value={baseName}
                          onChange={(e) => setBaseName(e.target.value)}
                          placeholder="เช่น ชื่อ, วันที่ระลึก..."
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none font-body transition-colors"
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
                      <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-brand-yellow transition-colors cursor-pointer">
                        <div className="text-4xl mb-3">📸</div>
                        <p className="font-display font-bold text-brand-dark">อัปโหลดรูป</p>
                        <p className="font-body text-brand-muted text-sm mt-1">JPG, PNG — สูงสุด 3 ไฟล์</p>
                        <input type="file" accept="image/*" multiple className="hidden" />
                      </div>
                      <div>
                        <label className="font-display font-semibold text-sm text-brand-dark block mb-2">
                          หมายเหตุเพิ่มเติม
                        </label>
                        <textarea
                          rows={4}
                          value={note}
                          onChange={(e) => setNote(e.target.value)}
                          placeholder="บอกรายละเอียดที่ต้องการเพิ่มเติม เช่น 'ต้องการสักที่แขน' หรือ 'ผมสั้นด้านข้าง'"
                          className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none font-body transition-colors resize-none"
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

                      <div className="border-t-2 border-brand-yellow pt-4 mt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-display font-bold text-lg text-brand-dark">ราคารวม</span>
                          <span className="font-display font-black text-2xl text-brand-dark">
                            ฿{currentPrice.toLocaleString()}
                          </span>
                        </div>
                        <p className="font-body text-brand-muted text-sm mt-1">ยังไม่รวมค่าจัดส่ง</p>
                      </div>

                      <button
                        onClick={handleAddToCart}
                        className="w-full btn-primary text-base py-4 mt-2"
                      >
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
                <button
                  onClick={() => setStep(s => s + 1)}
                  className="btn-primary flex-1"
                >
                  ถัดไป <ChevronRight size={18} />
                </button>
              )}
            </div>

            {/* Presets shortcut */}
            {step === 0 && (
              <div className="mt-6 p-4 bg-white rounded-2xl">
                <p className="font-display font-semibold text-sm text-brand-dark mb-3">หรือเริ่มจาก Preset สำเร็จรูป</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'office', label: '👔 ชายออฟฟิศ' },
                    { id: 'couple', label: '👩 สาวหวาน' },
                    { id: 'gamer', label: '🎮 นักเกม' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (PRESETS[p.id]) {
                          updateConfig(PRESETS[p.id] as Partial<CustomConfig>)
                          toast(`✨ โหลด Preset "${p.label}" แล้ว`)
                        }
                      }}
                      className="px-4 py-2 bg-brand-neutral text-brand-dark font-display font-semibold text-sm rounded-xl hover:bg-brand-yellow transition-colors"
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

// ── Sub-components ──

function StepCard({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-card">
      <h2 className="font-display font-black text-2xl text-brand-dark">{title}</h2>
      <p className="font-body text-brand-muted text-sm mt-1 mb-6">{desc}</p>
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
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`
        w-full rounded-2xl border-2 transition-all duration-200 text-center focus-ring
        ${compact ? 'p-3' : 'p-5'}
        ${selected
          ? 'border-brand-yellow bg-brand-light shadow-pill'
          : 'border-gray-200 bg-white hover:border-brand-yellow/50 hover:bg-brand-neutral'
        }
      `}
    >
      {children}
    </motion.button>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="font-body text-brand-muted text-sm flex-shrink-0">{label}</span>
      <span className="font-display font-semibold text-brand-dark text-sm text-right">{value}</span>
    </div>
  )
}
