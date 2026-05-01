'use client'
import { motion } from 'framer-motion'
import { CustomConfig } from '@/types'

interface CharacterPreviewProps {
  config: CustomConfig
}

export default function CharacterPreview({ config }: CharacterPreviewProps) {
  const skin = config.skin || '#FDBCB4'
  const hairColor = config.hairColor || '#2C1810'
  const topColor = config.topColor || '#3B82F6'
  const bottomColor = config.bottomColor || '#1E3A5F'
  const shoesColor = config.shoesColor || '#FFFFFF'

  const faceEmoji: Record<string, string> = {
    smile: '🙂', cool: '😎', blush: '😊', serious: '😐', happy: '😄', wink: '😉',
  }

  const hairPath: Record<string, React.ReactNode> = {
    'short-straight': <rect x="32" y="18" width="36" height="12" rx="4" fill={hairColor} />,
    'short-wavy': <path d="M32 28 Q38 20 44 26 Q50 20 56 26 Q62 20 68 26 V18 H32Z" fill={hairColor} />,
    'long-straight': <><rect x="32" y="18" width="36" height="12" rx="4" fill={hairColor} /><rect x="30" y="26" width="8" height="24" rx="3" fill={hairColor} /><rect x="62" y="26" width="8" height="24" rx="3" fill={hairColor} /></>,
    'long-wavy': <><path d="M32 28 Q38 20 44 26 Q50 20 56 26 Q62 20 68 26 V18 H32Z" fill={hairColor} /><path d="M30 26 Q26 36 30 46 Q26 56 30 60 V26Z" fill={hairColor} /><path d="M70 26 Q74 36 70 46 Q74 56 70 60 V26Z" fill={hairColor} /></>,
    'ponytail': <><rect x="32" y="18" width="36" height="12" rx="4" fill={hairColor} /><rect x="56" y="18" width="8" height="30" rx="4" fill={hairColor} /></>,
    'bun': <><rect x="32" y="18" width="36" height="12" rx="4" fill={hairColor} /><circle cx="50" cy="18" r="8" fill={hairColor} /></>,
    'mohawk': <rect x="44" y="10" width="12" height="22" rx="4" fill={hairColor} />,
    'curly': <><circle cx="38" cy="22" r="8" fill={hairColor} /><circle cx="50" cy="18" r="9" fill={hairColor} /><circle cx="62" cy="22" r="8" fill={hairColor} /></>,
    'afro': <ellipse cx="50" cy="22" rx="22" ry="16" fill={hairColor} />,
    'bald': null,
    'baseball-cap': <><rect x="28" y="16" width="44" height="16" rx="8" fill={hairColor} /><rect x="22" y="28" width="14" height="5" rx="2" fill={hairColor} /></>,
    'beanie': <path d="M30 30 Q30 10 50 10 Q70 10 70 30 Z" fill={hairColor} />,
  }

  const topShape: Record<string, React.ReactNode> = {
    tshirt: <><rect x="30" y="72" width="40" height="30" rx="3" fill={topColor} /><rect x="20" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="66" y="72" width="14" height="20" rx="3" fill={topColor} /></>,
    polo: <><rect x="30" y="72" width="40" height="30" rx="3" fill={topColor} /><rect x="20" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="66" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="46" y="72" width="8" height="10" rx="2" fill="white" opacity="0.3" /></>,
    hoodie: <><rect x="28" y="72" width="44" height="32" rx="5" fill={topColor} /><rect x="18" y="72" width="14" height="24" rx="4" fill={topColor} /><rect x="68" y="72" width="14" height="24" rx="4" fill={topColor} /><rect x="38" y="72" width="24" height="12" rx="6" fill="white" opacity="0.15" /></>,
    suit: <><rect x="30" y="72" width="40" height="30" rx="3" fill={topColor} /><rect x="20" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="66" y="72" width="14" height="20" rx="3" fill={topColor} /><polygon points="46,72 54,72 50,84" fill="white" opacity="0.2" /></>,
    dress: <><path d="M35 72 L30 112 H70 L65 72 Z" fill={topColor} /><rect x="30" y="72" width="12" height="20" rx="3" fill={topColor} /><rect x="58" y="72" width="12" height="20" rx="3" fill={topColor} /></>,
    uniform: <><rect x="30" y="72" width="40" height="30" rx="3" fill={topColor} /><rect x="20" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="66" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="44" y="72" width="12" height="18" rx="2" fill="white" opacity="0.25" /></>,
    scrubs: <><rect x="28" y="72" width="44" height="32" rx="4" fill={topColor} /><rect x="18" y="74" width="14" height="22" rx="4" fill={topColor} /><rect x="68" y="74" width="14" height="22" rx="4" fill={topColor} /><rect x="40" y="76" width="20" height="8" rx="3" fill="white" opacity="0.2" /></>,
    jersey: <><rect x="30" y="72" width="40" height="30" rx="3" fill={topColor} /><rect x="20" y="72" width="14" height="20" rx="3" fill={topColor} /><rect x="66" y="72" width="14" height="20" rx="3" fill={topColor} /><text x="50" y="92" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" opacity="0.5">10</text></>,
  }

  const accessoryEmojiMap: Record<string, string> = {
    glasses: '👓', sunglasses: '🕶️', hat: '👒', crown: '👑',
    sword: '⚔️', wand: '🪄', cat: '🐱', dog: '🐶',
    book: '📚', camera: '📷', guitar: '🎸', coffee: '☕',
  }

  return (
    <div className="bg-white rounded-3xl shadow-card p-4 flex flex-col items-center">
      <p className="font-display font-bold text-xs text-brand-muted uppercase tracking-widest mb-3">Preview</p>

      <motion.div
        className="relative"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="100" height="160" viewBox="0 0 100 160" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Character preview">
          {/* Base */}
          {config.base !== 'none' && (
            <ellipse cx="50" cy="150" rx="28" ry="7" fill="#E5E7EB" />
          )}
          {config.base === 'engraved' && (
            <ellipse cx="50" cy="150" rx="28" ry="7" fill="#D1D5DB" />
          )}

          {/* Body / Bottom */}
          {config.bottom !== 'skirt' ? (
            <>
              <rect x="35" y="102" width="14" height="30" rx="4" fill={bottomColor} />
              <rect x="51" y="102" width="14" height="30" rx="4" fill={bottomColor} />
            </>
          ) : (
            <path d="M32 102 L28 132 H72 L68 102 Z" fill={bottomColor} />
          )}

          {/* Shoes */}
          <ellipse cx="42" cy="134" rx="10" ry="6" fill={shoesColor} stroke="#E5E7EB" strokeWidth="1" />
          <ellipse cx="58" cy="134" rx="10" ry="6" fill={shoesColor} stroke="#E5E7EB" strokeWidth="1" />

          {/* Top */}
          {topShape[config.top] || topShape['tshirt']}

          {/* Neck */}
          <rect x="44" y="60" width="12" height="14" rx="4" fill={skin} />

          {/* Head */}
          <rect x="28" y="26" width="44" height="38" rx="12" fill={skin} />

          {/* Hair */}
          {hairPath[config.hairStyle] ?? hairPath['short-straight']}

          {/* Face */}
          <text x="50" y="52" textAnchor="middle" fontSize="18">
            {faceEmoji[config.faceExpression] || '🙂'}
          </text>
        </svg>

        {/* Accessories overlay */}
        {config.accessories && config.accessories.length > 0 && (
          <div className="absolute -right-3 top-0 flex flex-col gap-1">
            {config.accessories.slice(0, 3).map((a) => (
              <span key={a} className="text-lg leading-none" title={a}>
                {accessoryEmojiMap[a] || '✨'}
              </span>
            ))}
          </div>
        )}
      </motion.div>

      {/* Style badge */}
      <div className="mt-3 px-3 py-1 bg-brand-light rounded-full">
        <p className="font-display font-bold text-xs text-brand-dark capitalize">
          {config.style === 'classic' ? 'Classic Mini' : config.style === 'chibi' ? 'Chibi' : 'Realistic Head'}
        </p>
      </div>
    </div>
  )
}
