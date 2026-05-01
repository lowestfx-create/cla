'use client'
import { motion } from 'framer-motion'
import { CustomConfig } from '@/types'

interface Props {
  config: Partial<CustomConfig>
}

const HAIR_SHAPES: Record<string, string> = {
  'short-straight': 'M 40 52 Q 40 30 60 28 Q 80 30 80 52 L 80 48 Q 80 28 60 22 Q 40 28 40 48 Z',
  'short-wavy': 'M 38 52 Q 35 38 42 30 Q 52 22 60 24 Q 70 22 78 30 Q 85 38 82 52 L 82 46 Q 82 26 60 20 Q 38 26 38 46 Z',
  'long-straight': 'M 36 52 Q 36 28 60 24 Q 84 28 84 52 L 84 80 Q 82 84 80 80 L 80 50 Q 80 30 60 28 Q 40 30 40 50 L 40 80 Q 38 84 36 80 Z',
  'long-wavy': 'M 35 52 Q 33 30 50 24 Q 60 20 70 24 Q 87 30 85 52 L 88 78 Q 82 88 78 78 L 78 52 Q 78 32 60 28 Q 42 32 42 52 L 42 78 Q 38 88 32 78 Z',
  'ponytail': 'M 40 52 Q 40 30 60 26 Q 80 30 80 52 L 80 48 Q 80 28 60 22 Q 40 28 40 48 Z M 74 38 Q 80 30 78 50 Q 82 48 84 36 Q 86 24 80 22 Z',
  'bun': 'M 40 52 Q 40 32 60 28 Q 80 32 80 52 L 80 48 Q 80 28 60 24 Q 40 28 40 48 Z M 52 24 Q 52 14 60 12 Q 68 14 68 24 Q 68 32 60 32 Q 52 32 52 24 Z',
  'mohawk': 'M 40 52 Q 40 34 60 30 Q 80 34 80 52 L 80 48 Q 80 32 60 28 Q 40 32 40 48 Z M 56 30 Q 56 12 60 8 Q 64 12 64 30 Z',
  'curly': 'M 36 52 Q 34 30 44 24 Q 50 16 60 18 Q 70 16 76 24 Q 86 30 84 52 L 84 50 Q 86 28 76 22 Q 70 14 60 16 Q 50 14 44 22 Q 34 28 36 50 Z',
  'afro': 'M 30 55 Q 28 25 60 18 Q 92 25 90 55 L 90 50 Q 92 20 60 14 Q 28 20 30 50 Z',
  'bald': '',
  'baseball-cap': 'M 38 52 Q 38 32 60 28 Q 82 32 82 52 L 82 44 Q 82 26 60 24 Q 38 26 38 44 Z M 30 48 Q 30 40 40 40 L 38 44 Q 30 44 32 48 Z',
  'beanie': 'M 36 54 Q 36 26 60 20 Q 84 26 84 54 L 84 46 Q 84 22 60 16 Q 36 22 36 46 Z M 36 52 Q 36 44 84 44 L 84 50 Q 84 42 36 42 Z',
}

export default function CharacterPreview({ config }: Props) {
  const {
    style = 'classic',
    skin = '#FDBCB4',
    faceExpression = 'smile',
    hairStyle = 'short-straight',
    hairColor = '#2C1810',
    topColor = '#3B82F6',
    bottomColor = '#1E3A5F',
    shoesColor = '#FFFFFF',
    accessories = [],
    base = 'plain',
  } = config

  const isChibi = style === 'chibi'
  const headScale = isChibi ? 1.2 : style === 'realistic' ? 1.05 : 1
  const bodyY = isChibi ? 108 : 100

  const mouthPath: Record<string, string> = {
    smile: 'M 54 86 Q 60 92 66 86',
    cool: 'M 54 87 L 66 87',
    blush: 'M 55 86 Q 60 90 65 86',
    serious: 'M 55 88 L 65 88',
    happy: 'M 52 84 Q 60 94 68 84',
    wink: 'M 54 86 Q 60 92 66 86',
  }

  const hairPath = HAIR_SHAPES[hairStyle ?? 'short-straight'] || HAIR_SHAPES['short-straight']

  return (
    <div className="bg-white rounded-3xl shadow-card overflow-hidden">
      <div className="bg-gradient-to-b from-brand-light to-white p-4 flex flex-col items-center">
        <p className="font-body text-brand-muted text-xs mb-3 uppercase tracking-wider">Preview</p>

        <motion.div
          key={`${style}-${skin}-${hairStyle}-${hairColor}-${topColor}-${bottomColor}-${accessories?.join(',')}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <svg viewBox="0 0 120 200" width="180" height="240" role="img" aria-label={`ตัวละคร ${style} สไตล์`}>

            {/* BASE */}
            {base !== 'none' && (
              <g>
                <ellipse cx="60" cy="192" rx="28" ry="7" fill="#E5E7EB" />
                <rect x="32" y="186" width="56" height="7" rx="3" fill="#D1D5DB" />
              </g>
            )}

            {/* SHOES */}
            <ellipse cx="49" cy="183" rx="10" ry="5" fill={shoesColor} stroke="#E5E7EB" strokeWidth="0.5" />
            <ellipse cx="71" cy="183" rx="10" ry="5" fill={shoesColor} stroke="#E5E7EB" strokeWidth="0.5" />

            {/* LEGS */}
            <rect x="43" y={bodyY + 44} width="13" height="34" rx="5" fill={bottomColor} />
            <rect x="64" y={bodyY + 44} width="13" height="34" rx="5" fill={bottomColor} />

            {/* BODY */}
            <rect x="38" y={bodyY + 6} width="44" height="42" rx="8" fill={topColor} />
            <path d={`M 52 ${bodyY + 6} Q 60 ${bodyY + 14} 68 ${bodyY + 6}`} fill="none" stroke={skin} strokeWidth="3" />
            <rect x="26" y={bodyY + 8} width="13" height="28" rx="6" fill={topColor} />
            <rect x="81" y={bodyY + 8} width="13" height="28" rx="6" fill={topColor} />
            <ellipse cx="32" cy={bodyY + 38} rx="7" ry="6" fill={skin} />
            <ellipse cx="88" cy={bodyY + 38} rx="7" ry="6" fill={skin} />
            <rect x="54" y={bodyY - 2} width="12" height="10" rx="3" fill={skin} />

            {/* HEAD */}
            <g transform={`translate(60,${isChibi ? 62 : 60}) scale(${headScale}) translate(${-60},${isChibi ? -62 : -60})`}>
              <rect x="40" y="52" width="40" height="40" rx="12" fill={skin} />
              <ellipse cx="40" cy="70" rx="5" ry="6" fill={skin} />
              <ellipse cx="80" cy="70" rx="5" ry="6" fill={skin} />

              {/* eyes */}
              {faceExpression === 'wink'
                ? <path d="M 52 78 Q 56 74 60 78" fill="none" stroke="#1A1A2E" strokeWidth="2" strokeLinecap="round" />
                : <ellipse cx="56" cy="77" rx="3.5" ry="4" fill="#1A1A2E" />}
              <ellipse cx="64" cy="77" rx="3.5" ry="4" fill="#1A1A2E" />
              <circle cx="57.5" cy="75.5" r="1" fill="white" />
              <circle cx="65.5" cy="75.5" r="1" fill="white" />

              {/* blush */}
              {(faceExpression === 'blush' || faceExpression === 'happy') && <>
                <ellipse cx="50" cy="83" rx="5" ry="3" fill="#FFB6C1" opacity="0.5" />
                <ellipse cx="70" cy="83" rx="5" ry="3" fill="#FFB6C1" opacity="0.5" />
              </>}

              {/* nose */}
              <ellipse cx="60" cy="82" rx="2" ry="1.5" fill={skin} stroke="#E8A090" strokeWidth="0.5" />

              {/* mouth */}
              <path d={mouthPath[faceExpression] ?? mouthPath.smile} fill="none" stroke="#C97060" strokeWidth="2" strokeLinecap="round" />

              {/* HAIR */}
              {hairPath && <path d={hairPath} fill={hairColor} />}

              {/* Head accessories */}
              {accessories?.includes('crown') && (
                <g fill="#FFD700">
                  <polygon points="46,36 50,26 55,34 60,22 65,34 70,26 74,36" />
                  <rect x="46" y="34" width="28" height="6" rx="1" />
                </g>
              )}
              {accessories?.includes('glasses') && (
                <g fill="none" stroke="#1A1A2E" strokeWidth="1.5">
                  <rect x="46" y="72" width="10" height="7" rx="2" />
                  <rect x="64" y="72" width="10" height="7" rx="2" />
                  <line x1="56" y1="75.5" x2="64" y2="75.5" />
                </g>
              )}
              {accessories?.includes('sunglasses') && (
                <g fill="#1A1A2E">
                  <rect x="45" y="72" width="11" height="7" rx="3" opacity="0.9" />
                  <rect x="63" y="72" width="11" height="7" rx="3" opacity="0.9" />
                  <rect x="56" y="74" width="7" height="2" />
                </g>
              )}
            </g>

            {/* Body accessories */}
            {accessories?.includes('sword') && (
              <g>
                <rect x="84" y="95" width="3" height="30" rx="1" fill="#9E9E9E" />
                <rect x="80" y="108" width="11" height="3" rx="1" fill="#795548" />
              </g>
            )}
            {accessories?.includes('cat') && (
              <g>
                <ellipse cx="88" cy="115" rx="10" ry="8" fill="#F1C27D" />
                <circle cx="85" cy="113" r="1.5" fill="#1A1A2E" />
                <circle cx="91" cy="113" r="1.5" fill="#1A1A2E" />
              </g>
            )}
            {accessories?.includes('coffee') && (
              <g>
                <rect x="29" y="110" width="14" height="16" rx="3" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth="1" />
                <path d="M 43 114 Q 49 114 49 118 Q 49 122 43 122" fill="none" stroke="#E0E0E0" strokeWidth="1.5" />
              </g>
            )}
            {accessories?.includes('book') && (
              <g>
                <rect x="29" y="105" width="16" height="22" rx="2" fill="#E74C3C" />
                <rect x="31" y="107" width="12" height="18" rx="1" fill="#FAFAFA" />
              </g>
            )}
          </svg>
        </motion.div>

        <span className="mt-2 px-3 py-1 bg-brand-yellow text-brand-dark text-xs font-display font-bold rounded-full">
          {style === 'classic' ? 'Classic Mini' : style === 'chibi' ? 'Chibi' : 'Realistic'}
        </span>
      </div>
    </div>
  )
}
