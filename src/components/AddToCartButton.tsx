'use client'
import { ShoppingCart } from 'lucide-react'
import { toast } from 'sonner'
import { useCartStore } from '@/lib/store'
import { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem)

  const handleAdd = () => {
    addItem({
      id: `product-${product.id}-${Date.now()}`,
      productId: product.id,
      customConfig: {
        style: 'classic', skin: '#FDBCB4', faceExpression: 'smile',
        hairStyle: 'short-straight', hairColor: '#2C1810',
        top: 'tshirt', topColor: '#3B82F6',
        bottom: 'jeans', bottomColor: '#1E3A5F',
        shoes: 'sneakers', shoesColor: '#FFFFFF',
        accessories: [], base: 'plain',
      },
      quantity: 1,
      price: product.price,
      name: product.nameTH,
      thumbnail: product.images[0],
    })
    toast.success(`✅ เพิ่ม "${product.nameTH}" ลงตะกร้าแล้ว`)
  }

  return (
    <button onClick={handleAdd} className="btn-outline flex-1 py-4 text-base justify-center gap-2">
      <ShoppingCart size={20} />
      เพิ่มลงตะกร้า
    </button>
  )
}
