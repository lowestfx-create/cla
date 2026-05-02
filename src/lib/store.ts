'use client'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, CustomConfig, Language } from '@/types'
import { calculatePrice } from './utils'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateItem: (id: string, updates: Partial<CartItem>) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

interface CustomizerStore {
  config: CustomConfig
  history: CustomConfig[]
  future: CustomConfig[]
  updateConfig: (updates: Partial<CustomConfig>) => void
  undo: () => void
  redo: () => void
  resetConfig: () => void
  currentPrice: number
}

interface AppStore {
  language: Language
  setLanguage: (lang: Language) => void
}

const defaultConfig: CustomConfig = {
  style: 'mini',
  skin: '#FDBCB4',
  faceExpression: '',
  hairStyle: 'short-straight',
  hairColor: '#2C1810',
  top: 'tshirt',
  topColor: '#3B82F6',
  bottom: 'jeans',
  bottomColor: '#1E3A5F',
  shoes: 'sneakers',
  shoesColor: '#FFFFFF',
  accessories: [],
  base: 'plain',
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => ({ items: [...state.items, item] })),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
      updateItem: (id, updates) =>
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, ...updates } : i)),
        })),
      clearCart: () => set({ items: [] }),
      get totalItems() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
      get totalPrice() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },
    }),
    { name: 'brickme-cart' }
  )
)

export const useCustomizerStore = create<CustomizerStore>()((set, get) => ({
  config: defaultConfig,
  history: [],
  future: [],
  currentPrice: calculatePrice(defaultConfig),

  updateConfig: (updates) => {
    const prev = get().config
    const newConfig = { ...prev, ...updates }
    set({
      config: newConfig,
      history: [...get().history.slice(-19), prev],
      future: [],
      currentPrice: calculatePrice(newConfig),
    })
  },

  undo: () => {
    const history = get().history
    if (history.length === 0) return
    const prev = history[history.length - 1]
    set({
      config: prev,
      history: history.slice(0, -1),
      future: [get().config, ...get().future],
      currentPrice: calculatePrice(prev),
    })
  },

  redo: () => {
    const future = get().future
    if (future.length === 0) return
    const next = future[0]
    set({
      config: next,
      future: future.slice(1),
      history: [...get().history, get().config],
      currentPrice: calculatePrice(next),
    })
  },

  resetConfig: () =>
    set({ config: defaultConfig, history: [], future: [], currentPrice: calculatePrice(defaultConfig) }),
}))

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      language: 'th',
      setLanguage: (lang) => set({ language: lang }),
    }),
    { name: 'brickme-app' }
  )
)
