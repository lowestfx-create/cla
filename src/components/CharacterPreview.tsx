'use client'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { CustomConfig } from '@/types'
import { useCustomizerStore } from '@/lib/store'
import { SKIN_TONES } from '@/components/ColorPicker'

const BodyViewer = dynamic(() => import('@/components/BodyViewer'), { ssr: false })

const STYLE_STLS: Record<string, string> = {
  mini: '/models/mini-body.stl',
  normal: '/models/normal-body.stl',
}

interface Props {
  config: Partial<CustomConfig>
}

// Head SVG constants (viewBox "0 0 120 100")
const hx = 34
const hw = 52
const hTop = 12
const hBot = 54
const eyeY = hTop + 27
const eyeL = 53
const eyeR = 67

function HairLayer({ hairStyle, hairColor }: { hairStyle: string; hairColor: string }) {
  const c = hairColor
  switch (hairStyle) {
    case 'bald': return null
    case 'short-straight':
      return <rect x={hx} y={hTop - 10} width={hw} height={18} rx="5" fill={c} />
    case 'short-wavy':
      return <path d={`M ${hx} ${hBot-18} Q ${hx} ${hTop-12} 60 ${hTop-14} Q ${hx+hw} ${hTop-12} ${hx+hw} ${hBot-18} L ${hx+hw} ${hTop+4} Q ${hx+hw} ${hTop-6} 60 ${hTop-8} Q ${hx} ${hTop-6} ${hx} ${hTop+4} Z`} fill={c} />
    case 'long-straight':
      return <><rect x={hx} y={hTop-10} width={hw} height={18} rx="5" fill={c} /><rect x={hx} y={hTop+4} width={9} height={55} rx="4" fill={c} /><rect x={hx+hw-9} y={hTop+4} width={9} height={55} rx="4" fill={c} /></>
    case 'long-wavy':
      return <><rect x={hx} y={hTop-10} width={hw} height={18} rx="5" fill={c} /><path d={`M ${hx} ${hTop+6} Q ${hx-6} ${hTop+30} ${hx} ${hTop+50}`} fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" /><path d={`M ${hx+hw} ${hTop+6} Q ${hx+hw+6} ${hTop+30} ${hx+hw} ${hTop+50}`} fill="none" stroke={c} strokeWidth="9" strokeLinecap="round" /></>
    case 'ponytail':
      return <><rect x={hx} y={hTop-10} width={hw} height={18} rx="5" fill={c} /><path d={`M ${hx+hw-6} ${hTop+8} Q ${hx+hw+12} ${hTop+6} ${hx+hw+10} ${hTop+28} Q ${hx+hw+14} ${hTop+24} ${hx+hw+6} ${hTop+10} Z`} fill={c} /></>
    case 'bun':
      return <><rect x={hx} y={hTop-10} width={hw} height={18} rx="5" fill={c} /><ellipse cx="60" cy={hTop-14} rx="14" ry="10" fill={c} /></>
    case 'mohawk':
      return <><rect x={hx} y={hTop-6} width={hw} height={14} rx="5" fill={c} /><rect x="54" y={hTop-24} width="12" height="20" rx="4" fill={c} /></>
    case 'curly':
      return <path d={`M ${hx-2} ${hBot-20} Q ${hx-4} ${hTop-10} 60 ${hTop-16} Q ${hx+hw+4} ${hTop-10} ${hx+hw+2} ${hBot-20} L ${hx+hw} ${hTop+2} Q ${hx+hw+2} ${hTop-4} 60 ${hTop-10} Q ${hx-2} ${hTop-4} ${hx} ${hTop+2} Z`} fill={c} />
    case 'afro':
      return <ellipse cx="60" cy={hTop+14} rx="36" ry="28" fill={c} />
    case 'baseball-cap':
      return <><rect x={hx} y={hTop-8} width={hw} height={16} rx="6" fill={c} /><rect x={hx-14} y={hTop+2} width="28" height="8" rx="4" fill={c} /></>
    case 'beanie':
      return <><ellipse cx="60" cy={hTop-6} rx="28" ry="14" fill={c} /><rect x={hx} y={hTop+3} width={hw} height="8" rx="2" fill={c} opacity="0.7" /></>
    default:
      return <rect x={hx} y={hTop-10} width={hw} height={18} rx="5" fill={c} />
  }
}

export default function CharacterPreview({ config }: Props) {
  const { updateConfig } = useCustomizerStore()

  const {
    style = 'mini',
    skin = '#FDBCB4',
    faceExpression = 'smile',
    hairStyle = 'short-straight',
    hairColor = '#2C1810',
    topColor = '#3B82F6',
    bottomColor = '#1E3A5F',
    shoesColor = '#FFFFFF',
  } = config

  const stlUrl = STYLE_STLS[style ?? 'mini'] ?? STYLE_STLS.mini

  const mouths: Record<string, string> = {
    smile:   `M ${eyeL-1} ${eyeY+16} Q 60 ${eyeY+24} ${eyeR+1} ${eyeY+16}`,
    cool:    `M ${eyeL-1} ${eyeY+18} L ${eyeR+1} ${eyeY+18}`,
    blush:   `M ${eyeL} ${eyeY+16} Q 60 ${eyeY+21} ${eyeR} ${eyeY+16}`,
    serious: `M ${eyeL} ${eyeY+19} L ${eyeR} ${eyeY+19}`,
    happy:   `M ${eyeL-3} ${eyeY+14} Q 60 ${eyeY+28} ${eyeR+3} ${eyeY+14}`,
    wink:    `M ${eyeL-1} ${eyeY+16} Q 60 ${eyeY+24} ${eyeR+1} ${eyeY+16}`,
  }

  return (
    <div className="bg-white rounded-2xl border-3 border-brand-dark shadow-brick overflow-hidden">
      <div className="bg-gradient-to-b from-brand-light to-white flex flex-col items-center">
        <p className="font-body text-brand-muted text-[10px] pt-3 mb-1 uppercase tracking-widest">PREVIEW</p>

        {/* ── 3D Body ── */}
        <div className="w-full h-52 bg-brand-neutral/40 overflow-hidden" style={{ height: '208px' }}>
          <Suspense fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-7 h-7 border-4 border-brand-dark border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <BodyViewer url={stlUrl} color={topColor} className="w-full h-full" interactive={false} />
          </Suspense>
        </div>

        {/* ── Face + swatches strip ── */}
        <div className="w-full px-3 py-2 bg-white border-t-2 border-brand-dark/10 flex items-center gap-3">
          {/* mini face SVG */}
          <svg viewBox="28 0 64 68" width="46" height="46" role="img" aria-label="หน้า">
            <rect x={hx} y={hTop} width={hw} height={hBot - hTop} rx="10" fill={skin} />
            <ellipse cx={hx}    cy={hTop+21} rx="5" ry="7" fill={skin} />
            <ellipse cx={hx+hw} cy={hTop+21} rx="5" ry="7" fill={skin} />
            {faceExpression === 'wink'
              ? <path d={`M ${eyeL-4} ${eyeY} Q ${eyeL} ${eyeY-5} ${eyeL+4} ${eyeY}`} fill="none" stroke="#1A1A2E" strokeWidth="2.5" strokeLinecap="round" />
              : <ellipse cx={eyeL} cy={eyeY} rx="4" ry="5" fill="#1A1A2E" />}
            <ellipse cx={eyeR} cy={eyeY} rx="4" ry="5" fill="#1A1A2E" />
            <circle cx={eyeL+1.5} cy={eyeY-1.5} r="1.5" fill="white" />
            <circle cx={eyeR+1.5} cy={eyeY-1.5} r="1.5" fill="white" />
            {(faceExpression === 'blush' || faceExpression === 'happy') && <>
              <ellipse cx="46" cy={eyeY+13} rx="6" ry="3.5" fill="#FFB6C1" opacity="0.6" />
              <ellipse cx="74" cy={eyeY+13} rx="6" ry="3.5" fill="#FFB6C1" opacity="0.6" />
            </>}
            <path d={mouths[faceExpression] ?? mouths.smile} fill="none" stroke="#C97060" strokeWidth="2.2" strokeLinecap="round" />
            <HairLayer hairStyle={hairStyle ?? 'short-straight'} hairColor={hairColor ?? '#2C1810'} />
          </svg>

          {/* color swatches */}
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-brand-dark/20 flex-shrink-0" style={{ background: topColor }} />
              <span className="font-body text-[10px] text-brand-muted">เสื้อ</span>
              <div className="w-3 h-3 rounded-full border border-brand-dark/20 flex-shrink-0 ml-1" style={{ background: bottomColor }} />
              <span className="font-body text-[10px] text-brand-muted">กางเกง</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full border border-brand-dark/20 flex-shrink-0" style={{ background: hairColor }} />
              <span className="font-body text-[10px] text-brand-muted">ผม</span>
              <div className="w-3 h-3 rounded-full border border-brand-dark/20 flex-shrink-0 ml-1" style={{ background: shoesColor }} />
              <span className="font-body text-[10px] text-brand-muted">รองเท้า</span>
            </div>
          </div>
        </div>

        {/* ── Skin tone picker ── */}
        <div className="w-full px-3 pb-3 border-t-2 border-brand-dark/10 pt-2.5">
          <p className="font-body text-[10px] text-brand-muted mb-2 uppercase tracking-widest">สีผิว</p>
          <div className="flex gap-2">
            {SKIN_TONES.map((tone) => (
              <button
                key={tone}
                onClick={() => updateConfig({ skin: tone })}
                aria-label={`สีผิว ${tone}`}
                className="relative flex-1 h-7 rounded-full transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
                style={{ background: tone, border: skin === tone ? '2.5px solid #1A1A1A' : '2px solid transparent' }}
              >
                {skin === tone && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                      <path d="M1 4L3.5 6.5L9 1" stroke={tone < '#C00000' ? '#fff' : '#1A1A1A'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Badge ── */}
        <div className="pb-3">
          <span className="px-3 py-1 bg-brand-yellow text-brand-dark text-xs font-display font-black rounded-full border-2 border-brand-dark shadow-brick-sm">
            {style === 'mini' ? 'Mini Body' : 'Normal Body'}
          </span>
        </div>
      </div>
    </div>
  )
}
