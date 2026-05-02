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

  const isNormal = style === 'normal'

  return (
    <div className="rounded-2xl border-3 border-brand-dark shadow-brick-lg overflow-hidden bg-white">
      {/* ── 3D Body ── */}
      <div
        className="w-full relative overflow-hidden"
        style={{
          height: '220px',
          background: 'linear-gradient(150deg, #0f172a 0%, #1e293b 45%, #0f3460 100%)',
        }}
      >
        {/* Stud grid overlay */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 25%, transparent 25%)',
            backgroundSize: '18px 18px',
          }}
        />

        {/* PREVIEW label */}
        <p className="absolute top-2.5 left-0 right-0 text-center font-body text-white/40 text-[9px] uppercase tracking-[0.25em] z-10 select-none">
          PREVIEW
        </p>

        {/* Style badge top-right */}
        <div className="absolute top-2 right-2 z-10">
          <span className={`
            px-2 py-0.5 text-[9px] font-display font-black rounded-md border-2 border-white/20
            ${isNormal ? 'bg-brand-yellow/90 text-brand-dark' : 'bg-brand-red/90 text-white'}
          `}>
            {isNormal ? 'NORMAL' : 'MINI'}
          </span>
        </div>

        {/* 3D viewer — key forces remount when style changes (bug fix) */}
        <Suspense fallback={
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-8 h-8 border-4 border-brand-yellow border-t-transparent rounded-full animate-spin" />
          </div>
        }>
          <BodyViewer
            key={stlUrl}
            url={stlUrl}
            color={topColor}
            className="w-full h-full"
            interactive={false}
          />
        </Suspense>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{ background: 'linear-gradient(to top, rgba(255,255,255,0.08), transparent)' }}
        />
      </div>

      {/* ── Face + color swatches ── */}
      <div className="flex items-center gap-3 px-3 py-2.5 bg-brand-light border-t-3 border-brand-dark/10">
        {/* Mini face SVG */}
        <div className="flex-shrink-0 w-12 h-12 rounded-lg border-2 border-brand-dark/15 bg-white shadow-brick-sm overflow-hidden flex items-center justify-center">
          <svg viewBox="28 0 64 68" width="44" height="44" role="img" aria-label="หน้า">
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
        </div>

        {/* Color swatches */}
        <div className="flex flex-col gap-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-brand-dark/30 shadow-sm" style={{ background: topColor }} />
              <span className="font-body text-[10px] text-brand-muted">เสื้อ</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-brand-dark/30 shadow-sm" style={{ background: bottomColor }} />
              <span className="font-body text-[10px] text-brand-muted">กางเกง</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-brand-dark/30 shadow-sm" style={{ background: hairColor }} />
              <span className="font-body text-[10px] text-brand-muted">ผม</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full border-2 border-brand-dark/30 shadow-sm" style={{ background: shoesColor }} />
              <span className="font-body text-[10px] text-brand-muted">รองเท้า</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Skin tone picker ── */}
      <div className="px-3 pb-3 pt-2 bg-white border-t border-brand-dark/8">
        <p className="font-body text-[9px] text-brand-muted mb-2 uppercase tracking-widest">สีผิว</p>
        <div className="flex gap-1.5">
          {SKIN_TONES.map((tone) => (
            <button
              key={tone}
              onClick={() => updateConfig({ skin: tone })}
              aria-label={`สีผิว ${tone}`}
              className="relative flex-1 h-7 rounded-full transition-all duration-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark"
              style={{
                background: tone,
                border: skin === tone ? '3px solid #1A1A1A' : '2px solid rgba(0,0,0,0.12)',
                boxShadow: skin === tone ? '2px 2px 0 #1A1A1A' : 'none',
                transform: skin === tone ? 'translateY(-1px)' : 'none',
              }}
            >
              {skin === tone && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
