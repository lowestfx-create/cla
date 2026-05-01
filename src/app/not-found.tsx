import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: '404 — ไม่พบหน้านี้ | BrickMe' }

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-brand-neutral px-4 text-center">
      <div className="text-8xl mb-4">🧱</div>
      <h1 className="font-display font-black text-6xl text-brand-dark mb-2">404</h1>
      <p className="font-display font-bold text-2xl text-brand-dark mb-3">
        โอ้โห! หน้านี้หายไปไหนแล้ว
      </p>
      <p className="font-body text-brand-muted text-lg mb-8 max-w-sm">
        ดูเหมือนว่าตัวละครนี้ยังไม่ได้ถูกปริ้นต์ออกมา หรือ URL อาจพิมพ์ผิดครับ
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/" className="btn-primary text-base px-8 py-4">
          กลับหน้าแรก
        </Link>
        <Link href="/customize" className="btn-outline text-base px-8 py-4">
          Custom ตัวใหม่เลย →
        </Link>
      </div>
    </div>
  )
}
