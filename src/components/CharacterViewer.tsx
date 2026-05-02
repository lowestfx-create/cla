'use client'
import { Suspense, useMemo, useRef, Component, ReactNode } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

// Preload all baked face GLBs so switching is instant
const FACE_GLBS = Array.from({ length: 7 }, (_, i) => `/parts/face/face${i + 1}_baked.glb`)
FACE_GLBS.forEach((url) => useGLTF.preload(url))

// ErrorBoundary — swallows GLB load errors silently (shows nothing instead of crashing)
class FaceErrorBoundary extends Component<{ children: ReactNode }, { error: boolean }> {
  state = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? null : this.props.children }
}

// ─── Gentle sway so back-of-head never shows ─────────────────────────────────
function RotatingGroup({ autoRotate, children }: { autoRotate: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.44
    }
  })
  return <group ref={ref}>{children}</group>
}

// ─── Face GLB — receives exact bodyTopY computed from loaded body ─────────────
function FaceModel({ url, bodyTopY }: { url: string; bodyTopY: number }) {
  const { scene } = useGLTF(url)

  const { faceClone, faceScale, facePosition } = useMemo(() => {
    const clone = scene.clone(true)

    // GLTF loads textures with flipY=false (V=0 at bottom in WebGL).
    // Mecabricks UV has front expression at V<0.5 = TOP of image.
    // With flipY=false, V<0.5 maps to bottom → shows BACK expression.
    // Fix: flip all textures so V=0 maps to top → front expression shows correctly.
    clone.traverse((obj) => {
      const mesh = obj as THREE.Mesh
      if (!mesh.isMesh) return
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
      mats.forEach((mat) => {
        const m = mat as THREE.MeshStandardMaterial
        if (m.map) { m.map.flipY = true; m.map.needsUpdate = true }
        m.needsUpdate = true
      })
    })

    const box = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    // maxDim = face height (Y axis after Three.js applies node transforms)
    const maxDim = Math.max(size.x, size.y, size.z)

    // Head height ≈ 60% of bodyTopY — face top must align exactly with bodyTopY
    const headFraction = 0.60
    const targetHeadSize = bodyTopY * headFraction
    const fScale = maxDim > 0 ? targetHeadSize / maxDim : 1

    // neckY = bodyTopY - headHeight  →  guarantees face_top = bodyTopY exactly
    const neckY = bodyTopY - targetHeadSize
    // facePositionY places box.min.y (neck base in GLB world coords) at neckY
    const facePositionY = neckY - box.min.y * fScale

    return {
      faceClone: clone,
      faceScale: fScale,
      facePosition: [
        -center.x * fScale,
        facePositionY,
        -center.z * fScale,
      ] as [number, number, number],
    }
  }, [scene, bodyTopY])

  return (
    <group scale={faceScale} position={facePosition}>
      <primitive object={faceClone} />
    </group>
  )
}

// ─── CharacterGroup: loads body STL first, then positions face on real bodyTopY ─
// This ensures bodyTopY is always computed before FaceModel renders.
function CharacterGroup({
  bodyUrl,
  bodyColor,
  faceUrl,
}: {
  bodyUrl: string
  bodyColor: string
  faceUrl: string | null
}) {
  const geometry = useLoader(STLLoader, bodyUrl)   // suspends until body STL loads

  const { scale, centerOffset, bodyTopY } = useMemo(() => {
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    const box = geometry.boundingBox!
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    const s = maxDim > 0 ? 2.2 / maxDim : 1
    const topY = (box.max.y - center.y) * s   // actual body top in world units
    return {
      scale: s,
      centerOffset: [-center.x, -center.y, -center.z] as [number, number, number],
      bodyTopY: topY,
    }
  }, [geometry])

  return (
    <>
      {/* Body */}
      <group scale={scale}>
        <mesh position={centerOffset} castShadow receiveShadow>
          <primitive object={geometry} attach="geometry" />
          <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.08} envMapIntensity={0.6} />
        </mesh>
      </group>

      {/* Face — sits on top of body using real bodyTopY */}
      {faceUrl && (
        <FaceErrorBoundary key={faceUrl}>
          <Suspense fallback={null}>
            <FaceModel url={faceUrl} bodyTopY={bodyTopY} />
          </Suspense>
        </FaceErrorBoundary>
      )}
    </>
  )
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((s) => { if (ref.current) ref.current.rotation.y = s.clock.elapsedTime * 2 })
  return (
    <mesh ref={ref}>
      <boxGeometry args={[0.3, 0.3, 0.3]} />
      <meshStandardMaterial color="#FFD700" />
    </mesh>
  )
}

// ─── Public component ─────────────────────────────────────────────────────────
interface CharacterViewerProps {
  bodyUrl: string
  bodyColor?: string
  faceUrl?: string | null
  skinColor?: string
  className?: string
  interactive?: boolean
}

export default function CharacterViewer({
  bodyUrl,
  bodyColor = '#DA291C',
  faceUrl = null,
  skinColor = '#FDBCB4',
  className = '',
  interactive = true,
}: CharacterViewerProps) {
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', pointerEvents: interactive ? 'auto' : 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 40 }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 8, 5]} intensity={2.2} castShadow shadow-mapSize={[1024, 1024]} />
        <directionalLight position={[-5, 4, 2]} intensity={0.6} color="#FFF3CC" />
        <directionalLight position={[1, -3, -4]} intensity={0.25} color="#C8DDFF" />

        <RotatingGroup autoRotate={!interactive}>
          {/* Body loads first → bodyTopY is ready → FaceModel gets correct Y */}
          <Suspense fallback={<Spinner />}>
            <CharacterGroup bodyUrl={bodyUrl} bodyColor={bodyColor} faceUrl={faceUrl} />
          </Suspense>
        </RotatingGroup>

        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 1.6}
          />
        )}
      </Canvas>
    </div>
  )
}
