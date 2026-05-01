export interface Product {
  id: string
  slug: string
  name: string
  nameTH: string
  description: string
  descriptionTH: string
  price: number
  images: string[]
  category: 'gift' | 'collect' | 'b2b' | 'wedding'
  gender: 'male' | 'female' | 'unisex'
  theme?: string
  badge?: 'bestseller' | 'new' | 'sale'
  preset?: string
}

export interface CartItem {
  id: string
  productId?: string
  customConfig: CustomConfig
  quantity: number
  price: number
  name: string
  thumbnail?: string
}

export interface CustomConfig {
  style: 'classic' | 'chibi' | 'realistic'
  skin: string
  faceExpression: string
  hairStyle: string
  hairColor: string
  top: string
  topColor: string
  bottom: string
  bottomColor: string
  shoes: string
  shoesColor: string
  accessories: string[]
  base: 'none' | 'plain' | 'engraved'
  baseName?: string
  referenceImages?: string[]
  note?: string
  presetId?: string
}

export interface OrderTimeline {
  step: number
  label: string
  labelTH: string
  completed: boolean
  current: boolean
  date?: string
  trackingNumber?: string
  courier?: string
}

export interface Testimonial {
  id: string
  name: string
  avatar: string
  rating: number
  comment: string
  date: string
  productName: string
}

export interface FAQItem {
  question: string
  questionEN: string
  answer: string
  answerEN: string
  category?: string
}

export type Language = 'th' | 'en'
