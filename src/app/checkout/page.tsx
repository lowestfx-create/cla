'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { CreditCard, QrCode, Building2, Gift, Truck, CheckCircle2 } from 'lucide-react'
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
  { id: 'kerry', label: 'Kerry Express', price: 0, desc: '3–5 วันทำการ' },
  { id: 'flash', label: 'Flash Express', price: 0, desc: '2–4 วันทำการ' },
  { id: 'jnt', label: 'J&T Express', price: 0, desc: '2–4 วันทำการ' },
  { id: 'ems', label: 'EMS (ไปรษณีย์ไทย)', price: 40, desc: '3–7 วันทำการ' },
]

const PAYMENT_OPTIONS = [
  { id: 'promptpay', label: 'PromptPay QR', icon: QrCode, desc: 'สแกนจ่ายได้ทันที' },
  { id: 'card', label: 'บัตรเครดิต/เดบิต', icon: CreditCard, desc: 'Visa, Mastercard' },
  { id: 'transfer', label: 'โอนเงิน + แนบสลิป', icon: Building2, desc: 'กสิกร, SCB, กรุงไทย' },
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
  const phone = watch('phone')

  const baseShipping = getShippingCost(province || '')
  const emsExtra = shipping === 'ems' ? 40 : 0
  const shippingCost = baseShipping + emsExtra
  const giftWrapCost = giftWrap ? 30 : 0
  const total = subtotal + shippingCost + giftWrapCost

  const onSubmit = async (data: FormData) => {
    if (items.length === 0) {
      toast.error('ตะกร้าว่างอยู่')
      return
    }
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    const orderId = generateOrderId()
    clearCart()
    router.push(`/order/${orderId}`)
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="font-display font-bold text-xl text-brand-dark mb-4">ไม่มีสินค้าในตะกร้า</p>
        <a href="/shop" className="btn-primary">ไปที่ Shop →</a>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-neutral">
      <div className="container-site py-10">
        <h1 className="font-display font-black text-4xl text-brand-dark mb-8">ชำระเงิน</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left: Form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Recipient */}
              <FormSection title="ข้อมูลผู้รับ">
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
                      onChange={(e) => {
                        const formatted = formatPhoneNumber(e.target.value)
                        setValue('phone', formatted)
                      }}
                      className={inputCls(!!errors.phone)}
                    />
                  </Field>
                  <Field label="อีเมล" error={errors.email?.message}>
                    <input {...register('email')} type="email" placeholder="you@email.com" className={inputCls(!!errors.email)} />
                  </Field>
                </div>
              </FormSection>

              {/* Address */}
              <FormSection title="ที่อยู่จัดส่ง">
                <div className="space-y-4">
                  <Field label="ที่อยู่ (บ้านเลขที่ ซอย ถนน)" error={errors.address?.message}>
                    <input {...register('address')} placeholder="123/45 ถ.สุขุมวิท ซ.11" className={inputCls(!!errors.address)} />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="จังหวัด" error={errors.province?.message}>
                      <select {...register('province')} className={inputCls(!!errors.province)}>
                        <option value="">เลือกจังหวัด</option>
                        {PROVINCES.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
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
              <FormSection title="วิธีจัดส่ง">
                <div className="space-y-3">
                  {SHIPPING_OPTIONS.map((opt) => {
                    const cost = opt.id === 'ems' ? baseShipping + 40 : baseShipping
                    return (
                      <label
                        key={opt.id}
                        className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                          shipping === opt.id ? 'border-brand-yellow bg-brand-light' : 'border-gray-200 bg-white hover:border-brand-yellow/50'
                        }`}
                      >
                        <input type="radio" {...register('shipping')} value={opt.id} className="sr-only" />
                        <div className="flex-1">
                          <p className="font-display font-bold text-brand-dark">{opt.label}</p>
                          <p className="font-body text-brand-muted text-xs">{opt.desc}</p>
                        </div>
                        <p className="font-display font-black text-brand-dark">
                          ฿{cost.toLocaleString()}
                        </p>
                      </label>
                    )
                  })}
                </div>
              </FormSection>

              {/* Gift wrap */}
              <FormSection title="ห่อของขวัญ">
                <label className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                  giftWrap ? 'border-brand-yellow bg-brand-light' : 'border-gray-200 bg-white hover:border-brand-yellow/50'
                }`}>
                  <input type="checkbox" {...register('giftWrap')} className="mt-1 w-4 h-4 accent-brand-yellow" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Gift size={18} className="text-brand-dark" />
                      <p className="font-display font-bold text-brand-dark">ห่อของขวัญ + การ์ดข้อความ</p>
                      <span className="text-xs font-bold text-brand-yellow">+30฿</span>
                    </div>
                    <p className="font-body text-brand-muted text-xs mt-1">แพ็คสวยงาม พร้อมการ์ดเขียนข้อความได้</p>
                  </div>
                </label>
                {giftWrap && (
                  <textarea
                    {...register('giftMessage')}
                    placeholder="ข้อความในการ์ด (ไม่บังคับ)"
                    rows={2}
                    className="w-full mt-3 px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none font-body text-sm resize-none transition-colors"
                  />
                )}
              </FormSection>

              {/* Payment */}
              <FormSection title="วิธีชำระเงิน">
                <div className="space-y-3">
                  {PAYMENT_OPTIONS.map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                        payment === opt.id ? 'border-brand-yellow bg-brand-light' : 'border-gray-200 bg-white hover:border-brand-yellow/50'
                      }`}
                    >
                      <input type="radio" {...register('payment')} value={opt.id} className="sr-only" />
                      <opt.icon size={22} className="text-brand-dark flex-shrink-0" />
                      <div>
                        <p className="font-display font-bold text-brand-dark">{opt.label}</p>
                        <p className="font-body text-brand-muted text-xs">{opt.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {payment === 'promptpay' && (
                  <div className="mt-4 p-5 bg-white rounded-2xl text-center border border-brand-yellow/30">
                    <p className="font-display font-bold text-brand-dark mb-3">QR PromptPay</p>
                    <div className="w-36 h-36 bg-gray-100 rounded-xl mx-auto flex items-center justify-center">
                      <QrCode size={64} className="text-gray-400" />
                    </div>
                    <p className="font-body text-brand-muted text-xs mt-3">QR จะแสดงหลังกดยืนยันออเดอร์</p>
                  </div>
                )}

                {payment === 'transfer' && (
                  <div className="mt-4 p-5 bg-white rounded-2xl border border-brand-yellow/30 space-y-2 text-sm font-body">
                    <p className="font-display font-bold text-brand-dark">บัญชีโอนเงิน</p>
                    <p>🏦 กสิกรไทย · <strong>0XX-X-XXXXX-X</strong></p>
                    <p>ชื่อ: บริษัท บริคมี จำกัด</p>
                    <p className="text-brand-muted text-xs mt-2">โอนแล้วแนบสลิปใน LINE หรืออีเมล hello@brickme.th</p>
                  </div>
                )}
              </FormSection>

              {/* Note */}
              <FormSection title="หมายเหตุ (ไม่บังคับ)">
                <textarea
                  {...register('note')}
                  rows={3}
                  placeholder="แจ้งรายละเอียดเพิ่มเติม เช่น ต้องการ Rush order หรือข้อมูลพิเศษอื่นๆ"
                  className="w-full px-4 py-3 bg-white rounded-xl border-2 border-gray-200 focus:border-brand-yellow outline-none font-body text-sm resize-none transition-colors"
                />
              </FormSection>

              {/* Terms */}
              <div className="space-y-3">
                {[
                  { name: 'acceptTerms' as const, label: 'ฉันยอมรับ ข้อกำหนดการใช้บริการ และ นโยบายความเป็นส่วนตัว', error: errors.acceptTerms?.message },
                  { name: 'acceptLeadtime' as const, label: 'ฉันเข้าใจว่าสินค้าใช้เวลาผลิต 7–14 วันทำการ และไม่สามารถยกเลิกได้หลังเริ่มปริ้นต์', error: errors.acceptLeadtime?.message },
                ].map(({ name, label, error }) => (
                  <label key={name} className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" {...register(name)} className="mt-1 w-4 h-4 accent-brand-yellow flex-shrink-0" />
                    <span className="font-body text-brand-dark text-sm leading-relaxed">{label}</span>
                    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
                  </label>
                ))}
              </div>
            </div>

            {/* Right: Summary */}
            <div>
              <div className="bg-white rounded-3xl p-6 shadow-card sticky top-24">
                <h2 className="font-display font-bold text-xl text-brand-dark mb-5">สรุปยอดชำระ</h2>
                <div className="space-y-3 text-sm mb-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span className="font-body text-brand-muted truncate mr-2">{item.name}</span>
                      <span className="font-body text-brand-dark flex-shrink-0">฿{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2 border-t border-gray-100">
                    <span className="font-body text-brand-muted">ค่าจัดส่ง</span>
                    <span className="font-body text-brand-dark">฿{shippingCost.toLocaleString()}</span>
                  </div>
                  {giftWrap && (
                    <div className="flex justify-between">
                      <span className="font-body text-brand-muted">ห่อของขวัญ</span>
                      <span className="font-body text-brand-dark">฿30</span>
                    </div>
                  )}
                </div>
                <div className="border-t-2 border-brand-yellow pt-4 flex justify-between items-center mb-6">
                  <span className="font-display font-bold text-lg text-brand-dark">รวมทั้งหมด</span>
                  <span className="font-display font-black text-3xl text-brand-dark">฿{total.toLocaleString()}</span>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="btn-primary w-full justify-center py-4 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}>
                      <Truck size={20} />
                    </motion.div>
                  ) : (
                    <>
                      <CheckCircle2 size={20} />
                      ยืนยันออเดอร์
                    </>
                  )}
                </button>

                <p className="font-body text-brand-muted text-xs text-center mt-3">
                  🔒 ข้อมูลของคุณปลอดภัยด้วย SSL
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-card">
      <h2 className="font-display font-bold text-lg text-brand-dark mb-4">{title}</h2>
      {children}
    </div>
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block font-display font-semibold text-sm text-brand-dark mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  )
}

function inputCls(hasError: boolean) {
  return `w-full px-4 py-3 bg-white rounded-xl border-2 outline-none font-body text-brand-dark transition-colors ${
    hasError ? 'border-red-300 focus:border-red-400' : 'border-gray-200 focus:border-brand-yellow'
  }`
}
