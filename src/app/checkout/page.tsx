'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CreditCard, QrCode, Building2, Gift, Truck, CheckCircle2, MapPin, User, Package } from 'lucide-react'
import { useCartStore } from '@/lib/store'
import { PROVINCES, getShippingCost, generateOrderId, formatPhoneNumber } from '@/lib/utils'

const schema = z.object({
  firstName: z.string().min(1, 'กรุณากรอกชื่อ'),
  lastName: z.string().min(1, 'กรุณากรอกนามสกุล'),
  phone: z.string().min(9, 'เบอร์โทรไม่ถูกต้อง').max(13),
  email: z.string().email('อีเมลไม่ถูกต้อง'),
  address: z.string().min(5, 'กรุณากรอกที่อยู่'),
  province: z.string().min(1, 'กรุณาเลือกจังหวัด'),
  district: z.string().min(1, 'กรุณากรอกอำเภอ'),
  subdistrict: z.string().min(1, 'กรุณากรอกตำบล'),
  zipcode: z.string().length(5, 'รหัสไปรษณีย์ต้องมี 5 หลัก'),
  shipping: z.enum(['kerry', 'flash', 'jnt', 'ems']),
  payment: z.enum(['promptpay', 'card', 'transfer']),
  giftWrap: z.boolean(),
  giftMessage: z.string().max(100).optional(),
  note: z.string().max(200).optional(),
  acceptTerms: z.literal(true, { errorMap: () => ({ message: 'กรุณายอมรับข้อกำหนด' }) }),
  acceptLeadtime: z.literal(true, { errorMap: () => ({ message: 'กรุณายืนยันว่าเข้าใจระยะเวลาผลิต' }) }),
})

type FormData = z.infer<typeof schema>

const SHIPPING_OPTIONS = [
  { id: 'kerry', label: 'Kerry Express', price: 0, desc: '3–5 วันทำการ', emoji: '🔴' },
  { id: 'flash', label: 'Flash Express', price: 0, desc: '2–4 วันทำการ', emoji: '⚡' },
  { id: 'jnt', label: 'J&T Express', price: 0, desc: '2–4 วันทำการ', emoji: '🟠' },
  { id: 'ems', label: 'EMS (ไปรษณีย์ไทย)', price: 40, desc: '3–7 วันทำการ', emoji: '📮' },
]

const PAYMENT_OPTIONS = [
  { id: 'promptpay', label: 'PromptPay QR', icon: QrCode, desc: 'สแกนจ่ายได้ทันที', color: 'bg-blue-50 border-blue-200' },
  { id: 'card', label: 'บัตรเครดิต/เดบิต', icon: CreditCard, desc: 'Visa, Mastercard', color: 'bg-purple-50 border-purple-200' },
  { id: 'transfer', label: 'โอนเงิน + แนบสลิป', icon: Building2, desc: 'กสิกร, SCB, กรุงไทย', color: 'bg-green-50 border-green-200' },
]

export default function CheckoutPage() {
  const router = useRouter()
  const { items, clearCart } = useCartStore()
  const [submitting, setSubmitting] = useState(false)
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      shipping: 'kerry',
      payment: 'promptpay',
      giftWrap: false,
    },
  })

  const province = watch('province')
  const shipping = watch('shipping')
  const payment = watch('payment')
  const giftWrap = watch('giftWrap')

  const baseShipping = getShippingCost(province || '')
  const emsExtra = shipping === 'ems' ? 40 : 0
  const shippingCost = baseShipping + emsExtra
  const giftWrapCost = giftWrap ? 30 : 0
  const total = subtotal + shippingCost + giftWrapCost

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) { toast.error('ตะกร้าว่างอยู่'); return }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    const orderId = generateOrderId()
    clearCart()
    router.push(`/order/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Package size={48} className="text-brand-muted" />
        <p className="font-display font-bold text-xl text-brand-dark">ไม่มีสินค้าในตะกร้า</p>
        <a href="/shop" className="btn-primary">ดูสินค้า</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      {/* Page header */}
      <div className="bg-white border-b-3 border-brand-dark shadow-[0_3px_0_#FFD700]">
        <div className="container-site py-6 md:py-8">
          <h1 className="font-display font-black text-3xl md:text-4xl text-brand-dark">ชำระเงิน</h1>
          <p className="font-body text-brand-muted mt-1 text-sm">{items.length} ชิ้น • รวมสินค้า ฿{subtotal.toLocaleString()}</p>
        </div>
      </div>

      <div className="container-site py-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">

            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-4">

              {/* Recipient */}
              <FormSection title="ข้อมูลผู้รับ" icon={User}>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="ชื่อ" error={errors.firstName?.message}>
                    <input {...register('firstName')} placeholder="สมชาย" className={inputCls(!!errors.firstName)} />
                  </Field>
                  <Field label="นามสกุล" error={errors.lastName?.message}>
                    <input {...register('lastName')} placeholder="รักงาน" className={inputCls(!!errors.lastName)} />
                  </Field>
                  <Field label="เบอร์โทรศัพท์" error={errors.phone?.message}>
                    <input
                      {...register('phone')}
                      placeholder="08X-XXX-XXXX"
                      inputMode="tel"
                      onChange={(e) => setValue('phone', formatPhoneNumber(e.target.value))}
                      className={inputCls(!!errors.phone)}
                    />
                  </Field>
                  <Field label="อีเมล" error={errors.email?.message}>
                    <input {...register('email')} type="email" placeholder="you@email.com" className={inputCls(!!errors.email)} />
                  </Field>
                </div>
              </FormSection>

              {/* Address */}
              <FormSection title="ที่อยู่จัดส่ง" icon={MapPin}>
                <div className="space-y-4">
                  <Field label="ที่อยู่ (บ้านเลขที่ ซอย ถนน)" error={errors.address?.message}>
                    <input {...register('address')} placeholder="123/45 ถ.สุขุมวิท ซ.11" className={inputCls(!!errors.address)} />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="จังหวัด" error={errors.province?.message}>
                      <select {...register('province')} className={inputCls(!!errors.province)}>
                        <option value="">เลือกจังหวัด</option>
                        {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                      </select>
                    </Field>
                    <Field label="อำเภอ/เขต" error={errors.district?.message}>
                      <input {...register('district')} placeholder="วัฒนา" className={inputCls(!!errors.district)} />
                    </Field>
                    <Field label="ตำบล/แขวง" error={errors.subdistrict?.message}>
                      <input {...register('subdistrict')} placeholder="คลองเตยเหนือ" className={inputCls(!!errors.subdistrict)} />
                    </Field>
                    <Field label="รหัสไปรษณีย์" error={errors.zipcode?.message}>
                      <input {...register('zipcode')} placeholder="10110" inputMode="numeric" maxLength={5} className={inputCls(!!errors.zipcode)} />
                    </Field>
                  </div>
                </div>
              </FormSection>

              {/* Shipping */}
              <FormSection title="วิธีจัดส่ง" icon={Truck}>
                <div className="space-y-2.5">
                  {SHIPPING_OPTIONS.map((opt) => {
                    const cost = opt.id === 'ems' ? baseShipping + 40 : baseShipping
                    const isSelected = shipping === opt.id
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'border-brand-dark bg-brand-yellow/20 shadow-brick-sm'
                            : 'border-brand-dark/15 bg-white hover:border-brand-dark/40 hover:bg-brand-yellow/10'
                        }`}
                      >
                        <input type="radio" {...register('shipping')} value={opt.id} className="sr-only" />
                        <span className="text-xl flex-shrink-0">{opt.emoji}</span>
                        <div className="flex-1">
                          <p className="font-display font-bold text-brand-dark text-sm">{opt.label}</p>
                          <p className="font-body text-brand-muted text-xs">{opt.desc}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <p className="font-display font-black text-brand-dark">฿{cost.toLocaleString()}</p>
                          {isSelected && <CheckCircle2 size={18} className="text-brand-dark" />}
                        </div>
                      </label>
                    )
                  })}
                </div>
              </FormSection>

              {/* Gift wrap */}
              <FormSection title="ห่อของขวัญ" icon={Gift}>
                <label className={`flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                  giftWrap ? 'border-brand-dark bg-brand-yellow/20 shadow-brick-sm' : 'border-brand-dark/15 bg-white hover:border-brand-dark/40'
                }`}>
                  <input type="checkbox" {...register('giftWrap')} className="mt-1 w-4 h-4 accent-brand-yellow" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-display font-bold text-brand-dark text-sm">ห่อของขวัญ + การ์ดข้อความ</p>
                      <span className="px-2 py-0.5 bg-brand-yellow border border-brand-dark rounded-full text-[10px] font-display font-black text-brand-dark">+฿30</span>
                    </div>
                    <p className="font-body text-brand-muted text-xs mt-1">แพ็คสวยงาม พร้อมการ์ดเขียนข้อความได้</p>
                  </div>
                </label>
                {giftWrap && (
                  <textarea
                    {...register('giftMessage')}
                    placeholder="ข้อความในการ์ด (ไม่บังคับ)"
                    rows={2}
                    className="w-full mt-3 px-4 py-3 bg-white rounded-xl border-2 border-brand-dark/20 focus:border-brand-yellow outline-none font-body text-sm resize-none transition-colors"
                  />
                )}
              </FormSection>

              {/* Payment */}
              <FormSection title="วิธีชำระเงิน" icon={CreditCard}>
                <div className="space-y-2.5">
                  {PAYMENT_OPTIONS.map((opt) => {
                    const isSelected = payment === opt.id
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-150 ${
                          isSelected
                            ? 'border-brand-dark bg-brand-yellow/20 shadow-brick-sm'
                            : 'border-brand-dark/15 bg-white hover:border-brand-dark/40 hover:bg-brand-yellow/10'
                        }`}
                      >
                        <input type="radio" {...register('payment')} value={opt.id} className="sr-only" />
                        <div className={`w-10 h-10 rounded-lg border-2 border-brand-dark/20 flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-brand-dark' : 'bg-brand-neutral'}`}>
                          <opt.icon size={18} className={isSelected ? 'text-brand-yellow' : 'text-brand-dark'} />
                        </div>
                        <div className="flex-1">
                          <p className="font-display font-bold text-brand-dark text-sm">{opt.label}</p>
                          <p className="font-body text-brand-muted text-xs">{opt.desc}</p>
                        </div>
                        {isSelected && <CheckCircle2 size={18} className="text-brand-dark flex-shrink-0" />}
                      </label>
                    )
                  })}
                </div>

                {payment === 'promptpay' && (
                  <div className="mt-4 p-5 bg-white rounded-xl text-center border-2 border-brand-dark/10">
                    <p className="font-display font-bold text-brand-dark mb-3">QR PromptPay</p>
                    <div className="w-36 h-36 bg-brand-neutral rounded-xl mx-auto flex items-center justify-center border-2 border-dashed border-brand-dark/20">
                      <QrCode size={56} className="text-brand-muted" />
                    </div>
                    <p className="font-body text-brand-muted text-xs mt-3">QR จะแสดงหลังกดยืนยันออเดอร์</p>
                  </div>
                )}

                {payment === 'transfer' && (
                  <div className="mt-4 p-5 bg-white rounded-xl border-2 border-brand-dark/10 space-y-2 text-sm font-body">
                    <p className="font-display font-bold text-brand-dark">บัญชีโอนเงิน</p>
                    <p>🏦 กสิกรไทย · <strong>0XX-X-XXXXX-X</strong></p>
                    <p>ชื่อ: บริษัท บริคมี จำกัด</p>
                    <p className="text-brand-muted text-xs mt-2">โอนแล้วแนบสลิปใน LINE หรืออีเมล hello@brickme.th</p>
                  </div>
                )}
              </FormSection>

              {/* Note */}
              <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick p-5">
                <h2 className="font-display font-bold text-base text-brand-dark mb-3">หมายเหตุ (ไม่บังคับ)</h2>
                <textarea
                  {...register('note')}
                  rows={3}
                  placeholder="แจ้งรายละเอียดเพิ่มเติม เช่น ต้องการ Rush order หรือข้อมูลพิเศษอื่นๆ"
                  className="w-full px-4 py-3 bg-brand-neutral rounded-xl border-2 border-brand-dark/15 focus:border-brand-yellow outline-none font-body text-sm resize-none transition-colors"
                />
              </div>

              {/* Terms */}
              <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick p-5 space-y-3">
                {[
                  { name: 'acceptTerms' as const, label: 'ฉันยอมรับ ข้อกำหนดการใช้บริการ และ นโยบายความเป็นส่วนตัว', error: errors.acceptTerms?.message },
                  { name: 'acceptLeadtime' as const, label: 'ฉันเข้าใจว่าสินค้าใช้เวลาผลิต 7–14 วันทำการ และไม่สามารถยกเลิกได้หลังเริ่มปริ้นต์', error: errors.acceptLeadtime?.message },
                ].map(({ name, label, error }) => (
                  <div key={name}>
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" {...register(name)} className="mt-1 w-4 h-4 accent-brand-yellow flex-shrink-0" />
                      <span className="font-body text-brand-dark text-sm leading-relaxed">{label}</span>
                    </label>
                    {error && <p className="text-red-500 text-xs mt-1 ml-7">{error}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden sticky top-24">
                <div className="bg-brand-yellow px-5 py-4 border-b-2 border-brand-dark">
                  <h2 className="font-display font-black text-lg text-brand-dark">สรุปยอดชำระ</h2>
                </div>

                <div className="p-5">
                  <div className="space-y-2.5 mb-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm gap-2">
                        <span className="font-body text-brand-muted truncate">{item.name}</span>
                        <span className="font-body font-bold text-brand-dark flex-shrink-0">฿{(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t-2 border-dashed border-gray-200 pt-4 space-y-2 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="font-body text-brand-muted">ค่าจัดส่ง</span>
                      <span className="font-body text-brand-dark">฿{shippingCost.toLocaleString()}</span>
                    </div>
                    {giftWrap && (
                      <div className="flex justify-between text-sm">
                        <span className="font-body text-brand-muted">ห่อของขวัญ</span>
                        <span className="font-body text-brand-dark">฿30</span>
                      </div>
                    )}
                    <div className="flex justify-between items-baseline pt-1 border-t border-gray-100">
                      <span className="font-display font-bold text-brand-dark">รวมทั้งหมด</span>
                      <span className="font-display font-black text-2xl text-brand-dark">฿{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full justify-center py-3.5 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                        <Truck size={20} />
                      </motion.div>
                    ) : (
                      <><CheckCircle2 size={20} /> ยืนยันออเดอร์</>
                    )}
                  </button>

                  <p className="font-body text-brand-muted text-xs text-center mt-3">🔒 ข้อมูลของคุณปลอดภัยด้วย SSL</p>
                </div>

                <div className="brick-row-yellow" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormSection({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-3.5 border-b-2 border-brand-dark/10 bg-brand-neutral/40">
        <Icon size={16} className="text-brand-dark" />
        <h2 className="font-display font-bold text-base text-brand-dark">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-display font-semibold text-xs text-brand-dark mb-1.5 uppercase tracking-wide">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 bg-brand-neutral rounded-xl border-2 outline-none font-body text-brand-dark transition-colors text-sm ${
    hasError ? 'border-red-300 focus:border-red-400' : 'border-brand-dark/15 focus:border-brand-yellow'
  }`
}
