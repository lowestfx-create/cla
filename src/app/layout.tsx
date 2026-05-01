import type { Metadata, Viewport } from 'next'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBar from '@/components/layout/BottomBar'
import FloatingLineButton from '@/components/FloatingLineButton'
import { Toaster } from 'sonner'

export const metadata: Metadata = {
  title: {
    default: 'BrickMe — ตัวคุณในเวอร์ชันเลโก้ | Minifigure สั่งทำ 3D Printing',
    template: '%s | BrickMe',
  },
  description: 'สั่งทำ Minifigure เลโก้แบบ Custom ด้วย 3D Printing คุณภาพสูง เริ่มต้น 590 บาท ส่งทั่วไทย รองรับงาน B2B',
  keywords: ['เลโก้ custom', 'minifigure สั่งทำ', 'ของขวัญเลโก้', 'ปริ้นต์ 3D เลโก้', 'LEGO custom Thailand'],
  openGraph: {
    title: 'BrickMe — ตัวคุณในเวอร์ชันเลโก้',
    description: 'สั่งทำ Minifigure Custom ด้วย 3D Printing คุณภาพสูง ส่งทั่วไทย',
    type: 'website',
    locale: 'th_TH',
    siteName: 'BrickMe',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrickMe — ตัวคุณในเวอร์ชันเลโก้',
    description: 'Minifigure Custom 3D Printing คุณภาพสูง',
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-16 pb-16 md:pb-0">
          {children}
        </main>
        <Footer />
        <BottomBar />
        <FloatingLineButton />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: '#1A1A2E',
              color: '#fff',
              borderRadius: '16px',
              fontFamily: 'Sarabun, sans-serif',
            },
          }}
        />
      </body>
    </html>
  )
}
