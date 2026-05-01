'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-neutral px-4 text-center">
      <div className="text-8xl mb-4">😵</div>
      <h1 className="font-display font-black text-4xl text-brand-dark mb-3">
        เกิดข้อผิดพลาดบางอย่าง
      </h1>
      <p className="font-body text-brand-muted text-lg mb-8 max-w-sm">
        ตัวละครของคุณยังปลอดภัยอยู่ครับ — ลองโหลดหน้าใหม่อีกครั้ง
      </p>
      <div className="flex gap-3 flex-wrap justify-center">
        <button onClick={reset} className="btn-primary text-base px-8 py-4">
          ลองอีกครั้ง
        </button>
        <a href="/" className="btn-outline text-base px-8 py-4">
          กลับหน้าแรก
        </a>
      </div>
    </div>
  )
}
