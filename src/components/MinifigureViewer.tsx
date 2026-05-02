'use client'
import { Component, Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF, Center } from '@react-three/drei'
import * as THREE from 'three'

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface MinifigureParts {
  /** ผม / หมวก — e.g. "/models/parts/hair-short.glb" */
  hair?: string
  /** หัว (skin) — e.g. "/models/parts/head.glb" */
  head?: string
  /** ตัว / เสื้อ — e.g. "/models/parts/torso-red.glb" */
  torso?: string
  /** แขน (ซ้าย + ขวา) — e.g. "/models/parts/arms.glb" */
  arms?: string
  /** มือ — e.g. "/models/parts/hands.glb" */
  hands?: string
  /** สะโพก — e.g. "/models/parts/hips.glb" */
  hips?: string
  /** ขา — e.g. "/models/parts/legs-jeans.glb" */
  legs?: string
  /** เท้า / รองเท้า — e.g. "/models/parts/feet.glb" */
  feet?: string
  /** ฐาน — e.g. "/models/parts/base.glb" */
  base?: string
}

export interface MinifigureViewerProps {
  /** GLB แยกส่วน จาก Mecabricks */
  parts?: MinifigureParts
  /** สี fallback เมื่อไม่มี GLB */
  topColor?: string
  bottomColor?: string
  skinColor?: string
  hairColor?: string
  autoRotate?: boolean
  className?: string
}

// ─────────────────────────────────────────────
// Error Boundary (จับ GLB load fail)
// ─────────────────────────────────────────────

class PartBoundary extends Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { failed: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback: React.ReactNode }) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() { return { failed: true } }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

// ─────────────────────────────────────────────
// GLB Part Loader
// ─────────────────────────────────────────────

function GLBPart({ url, position, scale = 1 }: {
  url: string
  position?: [number, number, number]
  scale?: number
}) {
  const { scene } = useGLTF(url)
  const clone = scene.clone(true)
  return <primitive object={clone} position={position ?? [0, 0, 0]} scale={scale} />
}

/** โหลด GLB ถ้ามี url — ถ้าไม่มีหรือโหลดไม่สำเร็จ แสดง fallback primitive */
function Part({ url, position, scale, fallback }: {
  url?: string
  position?: [number, number, number]
  scale?: number
  fallback: React.ReactNode
}) {
  if (!url) return <>{fallback}</>
  return (
    <PartBoundary fallback={<>{fallback}</>}>
      <Suspense fallback={<>{fallback}</>}>
        <GLBPart url={url} position={position} scale={scale} />
      </Suspense>
    </PartBoundary>
  )
}

// ─────────────────────────────────────────────
// Material helper
// ─────────────────────────────────────────────

const mat = (color: string, roughness = 0.55) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.05 })

// ─────────────────────────────────────────────
// Primitive parts (fallback)
// ─────────────────────────────────────────────

function PrimHair({ hairColor }: { hairColor: string }) {
  return (
    <group>
      <mesh position={[0, 2.06, 0]} material={mat(hairColor, 0.75)}>
        <boxGeometry args={[0.84, 0.2, 0.84]} />
      </mesh>
      <mesh position={[0, 2.22, 0]} material={mat(hairColor, 0.75)}>
        <boxGeometry args={[0.64, 0.26, 0.64]} />
      </mesh>
      {/* stud */}
      <mesh position={[0, 2.38, 0]} material={mat(hairColor, 0.8)}>
        <cylinderGeometry args={[0.13, 0.13, 0.09, 12]} />
      </mesh>
    </group>
  )
}

function PrimHead({ skinColor }: { skinColor: string }) {
  return (
    <group>
      <mesh position={[0, 1.68, 0]} material={mat(skinColor, 0.6)}>
        <boxGeometry args={[0.8, 0.72, 0.72]} />
      </mesh>
      {/* ear nubs */}
      <mesh position={[-0.44, 1.68, 0]} rotation={[0, 0, Math.PI / 2]} material={mat(skinColor, 0.6)}>
        <cylinderGeometry args={[0.09, 0.09, 0.13, 8]} />
      </mesh>
      <mesh position={[0.44, 1.68, 0]} rotation={[0, 0, Math.PI / 2]} material={mat(skinColor, 0.6)}>
        <cylinderGeometry args={[0.09, 0.09, 0.13, 8]} />
      </mesh>
      {/* eyes */}
      <mesh position={[-0.15, 1.73, 0.37]} material={mat('#1A1A1A', 0.3)}>
        <boxGeometry args={[0.12, 0.14, 0.02]} />
      </mesh>
      <mesh position={[0.15, 1.73, 0.37]} material={mat('#1A1A1A', 0.3)}>
        <boxGeometry args={[0.12, 0.14, 0.02]} />
      </mesh>
      <mesh position={[-0.12, 1.77, 0.385]} material={mat('#FFFFFF', 0.2)}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
      </mesh>
      <mesh position={[0.18, 1.77, 0.385]} material={mat('#FFFFFF', 0.2)}>
        <boxGeometry args={[0.04, 0.04, 0.01]} />
      </mesh>
      {/* smile */}
      <mesh position={[0, 1.62, 0.375]} material={mat('#C97060', 0.6)}>
        <boxGeometry args={[0.2, 0.035, 0.02]} />
      </mesh>
      {/* neck */}
      <mesh position={[0, 1.28, 0]} material={mat(skinColor, 0.6)}>
        <cylinderGeometry args={[0.12, 0.14, 0.11, 8]} />
      </mesh>
    </group>
  )
}

function PrimTorso({ topColor }: { topColor: string }) {
  return (
    <group>
      <mesh position={[0, 0.82, 0]} material={mat(topColor)}>
        <boxGeometry args={[0.86, 0.76, 0.64]} />
      </mesh>
      {/* logo patch */}
      <mesh position={[0, 0.88, 0.33]} material={mat('#FFD700', 0.3)}>
        <boxGeometry args={[0.26, 0.26, 0.01]} />
      </mesh>
    </group>
  )
}

function PrimArms({ topColor, skinColor }: { topColor: string; skinColor: string }) {
  return (
    <group>
      {/* left arm */}
      <mesh position={[-0.6, 0.82, 0]} material={mat(topColor)}>
        <boxGeometry args={[0.3, 0.6, 0.5]} />
      </mesh>
      {/* right arm */}
      <mesh position={[0.6, 0.82, 0]} material={mat(topColor)}>
        <boxGeometry args={[0.3, 0.6, 0.5]} />
      </mesh>
    </group>
  )
}

function PrimHands({ skinColor }: { skinColor: string }) {
  return (
    <group>
      <mesh position={[-0.6, 0.42, 0]} material={mat(skinColor, 0.6)}>
        <cylinderGeometry args={[0.16, 0.16, 0.22, 8]} />
      </mesh>
      <mesh position={[0.6, 0.42, 0]} material={mat(skinColor, 0.6)}>
        <cylinderGeometry args={[0.16, 0.16, 0.22, 8]} />
      </mesh>
    </group>
  )
}

function PrimHips({ bottomColor }: { bottomColor: string }) {
  return (
    <mesh position={[0, 0.34, 0]} material={mat(bottomColor)}>
      <boxGeometry args={[0.86, 0.28, 0.64]} />
    </mesh>
  )
}

function PrimLegs({ bottomColor }: { bottomColor: string }) {
  return (
    <group>
      <mesh position={[-0.22, -0.22, 0]} material={mat(bottomColor)}>
        <boxGeometry args={[0.38, 0.62, 0.62]} />
      </mesh>
      <mesh position={[0.22, -0.22, 0]} material={mat(bottomColor)}>
        <boxGeometry args={[0.38, 0.62, 0.62]} />
      </mesh>
    </group>
  )
}

function PrimFeet() {
  return (
    <group>
      <mesh position={[-0.22, -0.6, 0.07]} material={mat('#1A1A1A')}>
        <boxGeometry args={[0.42, 0.1, 0.72]} />
      </mesh>
      <mesh position={[0.22, -0.6, 0.07]} material={mat('#1A1A1A')}>
        <boxGeometry args={[0.42, 0.1, 0.72]} />
      </mesh>
    </group>
  )
}

function PrimBase() {
  return (
    <group>
      <mesh position={[0, -0.73, 0]} material={mat('#C8C8C8', 0.9)}>
        <boxGeometry args={[1.2, 0.06, 0.9]} />
      </mesh>
      {([-0.4, 0, 0.4] as number[]).flatMap((x) =>
        ([-0.28, 0.28] as number[]).map((z) => (
          <mesh key={`${x}${z}`} position={[x, -0.67, z]} material={mat('#B0B0B0', 0.9)}>
            <cylinderGeometry args={[0.09, 0.09, 0.06, 8]} />
          </mesh>
        ))
      )}
    </group>
  )
}

// ─────────────────────────────────────────────
// Assembled figure (parts composited)
// ─────────────────────────────────────────────

function AssembledFigure({
  parts = {},
  topColor,
  bottomColor,
  skinColor,
  hairColor,
}: {
  parts: MinifigureParts
  topColor: string
  bottomColor: string
  skinColor: string
  hairColor: string
}) {
  const group = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.45) * 0.3
    }
  })

  return (
    <group ref={group} position={[0, 0.15, 0]}>

      {/* ผม */}
      <Part url={parts.hair} fallback={<PrimHair hairColor={hairColor} />} />

      {/* หัว */}
      <Part url={parts.head} fallback={<PrimHead skinColor={skinColor} />} />

      {/* ตัว */}
      <Part url={parts.torso} fallback={<PrimTorso topColor={topColor} />} />

      {/* แขน */}
      <Part url={parts.arms} fallback={<PrimArms topColor={topColor} skinColor={skinColor} />} />

      {/* มือ */}
      <Part url={parts.hands} fallback={<PrimHands skinColor={skinColor} />} />

      {/* สะโพก */}
      <Part url={parts.hips} fallback={<PrimHips bottomColor={bottomColor} />} />

      {/* ขา */}
      <Part url={parts.legs} fallback={<PrimLegs bottomColor={bottomColor} />} />

      {/* เท้า */}
      <Part url={parts.feet} fallback={<PrimFeet />} />

      {/* ฐาน */}
      <Part url={parts.base} fallback={<PrimBase />} />

    </group>
  )
}

// ─────────────────────────────────────────────
// Main export
// ─────────────────────────────────────────────

export default function MinifigureViewer({
  parts = {},
  topColor = '#DA291C',
  bottomColor = '#1A1A1A',
  skinColor = '#FDBCB4',
  hairColor = '#2C1810',
  autoRotate = true,
  className = '',
}: MinifigureViewerProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas camera={{ position: [0, 1, 4.5], fov: 38 }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.75} />
        <directionalLight position={[4, 8, 4]} intensity={1.4} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-3, 3, -3]} intensity={0.35} color="#FFD700" />
        <pointLight position={[0, -1, 3]} intensity={0.2} color="#006CB7" />

        <AssembledFigure
          parts={parts}
          topColor={topColor}
          bottomColor={bottomColor}
          skinColor={skinColor}
          hairColor={hairColor}
        />

        <OrbitControls
          autoRotate={autoRotate}
          autoRotateSpeed={1.8}
          enableZoom
          enablePan={false}
          minDistance={2.5}
          maxDistance={9}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 1.8}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.87, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.12} />
        </mesh>
      </Canvas>
    </div>
  )
}
