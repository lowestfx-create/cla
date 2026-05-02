'use client'
import { motion } from 'framer-motion'
import { CustomConfig } from '@/types'

interface MiniaturePreviewProps {
  config: CustomConfig
  size?: 'sm' | 'md' | 'lg'
}

const STYLE_HEIGHTS: Record<string, number> = { mini: 180, normal: 200 }

export default function MiniaturePreview({ config, size = 'lg' }: MiniaturePreviewProps) {
  const h = STYLE_HEIGHTS[config.style] ?? 180

  const sizeClass = { sm: 'w-28 h-36', md: 'w-40 h-52', lg: 'w-56 h-72' }[size]

  return (
    <div className={`relative ${sizeClass} mx-auto select-none`} aria-label="ตัวอย่างตัวละคร">
      <svg
        viewBox="0 0 112 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-xl"
      >
        {/* ── Shadow ── */}
        <ellipse cx="56" cy="140" rx="28" ry="5" fill="rgba(0,0,0,0.12)" />

        {/* ── Base ── */}
        {config.base !== 'none' && (
          <rect x="26" y="128" width="60" height="12" rx="6" fill="#D1D5DB" />
        )}
        {config.base === 'engraved' && (
          <text x="56" y="137" textAnchor="middle" fontSize="5" fill="#6B7280" fontFamily="sans-serif">
            {config.baseName ?? 'BrickMe'}
          </text>
        )}

        {/* ── Legs ── */}
        <rect x="32" y="100" width={18} height={30} rx="6"
          fill={config.bottomColor} />
        <rect x={62} y="100" width={18} height={30} rx="6"
          fill={config.bottomColor} />

        {/* ── Shoes ── */}
        <rect x="30" y="122" width={21} height="10" rx="5" fill={config.shoesColor} />
        <rect x={61} y="122" width={21} height="10" rx="5" fill={config.shoesColor} />

        {/* ── Body / Top ── */}
        <rect x="26" y="68" width="60" height={36} rx="8" fill={config.topColor} />

        {/* Arms */}
        <rect x="8" y="70" width="16" height={28} rx="7" fill={config.topColor} />
        <rect x="88" y="70" width="16" height={28} rx="7" fill={config.topColor} />
        {/* Hands */}
        <circle cx="16" cy={104} r="7" fill={config.skin} />
        <circle cx="96" cy={104} r="7" fill={config.skin} />

        {/* ── Neck ── */}
        <rect x="46" y="58" width="20" height="14" rx="4" fill={config.skin} />

        {/* ── Head ── */}
        <rect x="28" y="18" width="56" height="44" rx="16" fill={config.skin} />

        {/* ── Face expression ── */}
        {config.faceExpression === 'smile' && (
          <>
            <circle cx="43" cy="34" r="3.5" fill="#1A1A2E" />
            <circle cx="69" cy="34" r="3.5" fill="#1A1A2E" />
            <path d="M44 44 Q56 52 68 44" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}
        {config.faceExpression === 'cool' && (
          <>
            <rect x="38" y="31" width="12" height="5" rx="2.5" fill="#1A1A2E" />
            <rect x="62" y="31" width="12" height="5" rx="2.5" fill="#1A1A2E" />
            <path d="M46 44 Q56 48 66 44" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}
        {config.faceExpression === 'blush' && (
          <>
            <circle cx="43" cy="34" r="3" fill="#1A1A2E" />
            <circle cx="69" cy="34" r="3" fill="#1A1A2E" />
            <ellipse cx="38" cy="40" rx="5" ry="3" fill="#FFAAAA" opacity="0.6" />
            <ellipse cx="74" cy="40" rx="5" ry="3" fill="#FFAAAA" opacity="0.6" />
            <path d="M46 45 Q56 51 66 45" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" fill="none" />
          </>
        )}
        {config.faceExpression === 'wink' && (
          <>
            <circle cx="43" cy="34" r="3.5" fill="#1A1A2E" />
            <path d="M64 32 Q68 30 72 32" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M44 44 Q56 52 68 44" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          </>
        )}

        {/* ── Hair ── */}
        {config.hairStyle === 'short-straight' && (
          <rect x="26" y="12" width="60" height="18" rx="8" fill={config.hairColor} />
        )}
        {config.hairStyle === 'long' && (
          <>
            <rect x="26" y="12" width="60" height="16" rx="8" fill={config.hairColor} />
            <rect x="20" y="20" width="10" height="34" rx="5" fill={config.hairColor} />
            <rect x="82" y="20" width="10" height="34" rx="5" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'curly' && (
          <>
            <ellipse cx="56" cy="16" rx="32" ry="12" fill={config.hairColor} />
            <circle cx="28" cy="26" r="8" fill={config.hairColor} />
            <circle cx="84" cy="26" r="8" fill={config.hairColor} />
            <circle cx="40" cy="16" r="7" fill={config.hairColor} />
            <circle cx="72" cy="16" r="7" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'ponytail' && (
          <>
            <rect x="26" y="12" width="60" height="16" rx="8" fill={config.hairColor} />
            <rect x="82" y="14" width="12" height="30" rx="5" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'buzz' && (
          <rect x="28" y="14" width="56" height="10" rx="4" fill={config.hairColor} />
        )}
        {config.hairStyle === 'afro' && (
          <ellipse cx="56" cy="14" rx="36" ry="18" fill={config.hairColor} />
        )}
        {config.hairStyle === 'bun' && (
          <>
            <rect x="26" y="16" width="60" height="12" rx="6" fill={config.hairColor} />
            <circle cx="56" cy="10" r="10" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'bald' && null}
        {config.hairStyle === 'mohawk' && (
          <>
            <rect x="26" y="18" width="60" height="8" rx="4" fill={config.hairColor} />
            <rect x="48" y="0" width="16" height="24" rx="6" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'side-part' && (
          <>
            <rect x="26" y="12" width="60" height="16" rx="8" fill={config.hairColor} />
            <rect x="26" y="20" width="24" height="16" rx="4" fill={config.hairColor} />
          </>
        )}
        {config.hairStyle === 'wavy' && (
          <>
            <ellipse cx="56" cy="14" rx="32" ry="12" fill={config.hairColor} />
            <path d="M24 22 Q32 30 24 38 Q32 46 26 52" stroke={config.hairColor} strokeWidth="8" strokeLinecap="round" fill="none" />
            <path d="M88 22 Q80 30 88 38 Q80 46 86 52" stroke={config.hairColor} strokeWidth="8" strokeLinecap="round" fill="none" />
          </>
        )}
        {config.hairStyle === 'twin-tails' && (
          <>
            <rect x="26" y="12" width="60" height="14" rx="7" fill={config.hairColor} />
            <rect x="14" y="18" width="12" height="28" rx="5" fill={config.hairColor} />
            <rect x="86" y="18" width="12" height="28" rx="5" fill={config.hairColor} />
          </>
        )}

        {/* ── Accessories ── */}
        {config.accessories.includes('hat') && (
          <g>
            <rect x="30" y="4" width="52" height="12" rx="4" fill="#1A1A2E" />
            <rect x="22" y="14" width="68" height="6" rx="3" fill="#1A1A2E" />
          </g>
        )}
        {config.accessories.includes('glasses') && (
          <g>
            <rect x="34" y="31" width="16" height="10" rx="4" fill="none" stroke="#1A1A2E" strokeWidth="2" />
            <rect x="62" y="31" width="16" height="10" rx="4" fill="none" stroke="#1A1A2E" strokeWidth="2" />
            <line x1="50" y1="36" x2="62" y2="36" stroke="#1A1A2E" strokeWidth="2" />
            <line x1="28" y1="36" x2="34" y2="36" stroke="#1A1A2E" strokeWidth="2" />
            <line x1="78" y1="36" x2="84" y2="36" stroke="#1A1A2E" strokeWidth="2" />
          </g>
        )}
        {config.accessories.includes('sword') && (
          <g transform="rotate(-20, 8, 110)">
            <rect x="2" y="90" width="4" height="32" rx="1" fill="#C0C0C0" />
            <rect x="0" y="98" width="8" height="4" rx="1" fill="#8B6914" />
          </g>
        )}
        {config.accessories.includes('bag') && (
          <rect x="88" y="78" width="16" height="18" rx="5" fill="#8B6914" />
        )}
        {config.accessories.includes('cat') && (
          <g>
            <circle cx="100" cy="112" r="8" fill="#F1C27D" />
            <polygon points="93,106 97,100 101,106" fill="#F1C27D" />
            <polygon points="99,106 103,100 107,106" fill="#F1C27D" />
            <circle cx="98" cy="112" r="1.5" fill="#1A1A2E" />
            <circle cx="102" cy="112" r="1.5" fill="#1A1A2E" />
          </g>
        )}
        {config.accessories.includes('crown') && (
          <g>
            <path d="M36 16 L42 6 L56 12 L70 6 L76 16 Z" fill="#FFD700" />
          </g>
        )}
      </svg>
    </div>
  )
}
