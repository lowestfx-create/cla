'use client'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function FloatingLineButton() {
  return (
    <motion.a
      href="https://line.me/ti/p/~@brickme"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="ติดต่อผ่าน LINE"
      className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2.5 px-5 py-3.5 bg-[#06C755] text-white font-display font-bold rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle size={20} />
      <span>สอบถามผ่าน LINE</span>
    </motion.a>
  )
}
