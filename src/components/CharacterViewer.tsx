'use client'
import { Suspense, useMemo, useRef, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

// ─── Rotating parent — body + face share ONE rotation so they always sync ────
function RotatingGroup({ autoRotate, children }: { autoRotate: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (autoRotate && ref.current) {
      // Gentle sway ±25° so back of head never shows
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.65) * 0.44
    }
  })
  return <group ref={ref}>{children}</group>
}

// ─── Body (STL) ──────────────────────────────────────────────────────────────
function BodyModel({ url, color, onBodyTop }: { url: string; color: string; onBodyTop?: (y: number) => void }) {
  const geometry = useLoader(STLLoader, url)

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
    // actual top of body in world units after centering
    const topY = (box.max.y - center.y) * s
    return {
      scale: s,
      centerOffset: [-center.x, -center.y, -center.z] as [number, number, number],
      bodyTopY: topY,
    }
  }, [geometry])

  // Report body top so FaceModel can sit on it correctly
  if (onBodyTop) onBodyTop(bodyTopY)

  return (
    <group scale={scale}>
      <mesh position={centerOffset} castShadow receiveShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.08} envMapIntensity={0.6} />
      </mesh>
    </group>
  )
}

// ─── Face (GLB with baked texture) ───────────────────────────────────────────
function FaceModel({ url, bodyTopY }: { url: string; bodyTopY: number }) {
  const { scene } = useGLTF(url)

  const { faceClone, faceScale, facePosition } = useMemo(() => {
    const clone = scene.clone(true)

    const box = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)

    // Head ≈ 32% of body height
    const fScale = maxDim > 0 ? 0.70 / maxDim : 1

    // Place face bottom right on measured body top (slight overlap of 0.04 to hide the gap)
    const faceBottomScaled = box.min.y * fScale
    const posY = bodyTopY - faceBottomScaled - 0.04

    return {
      faceClone: clone,
      faceScale: fScale,
      facePosition: [
        -center.x * fScale,
        posY - center.y * fScale,
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

// ─── Spinner ─────────────────────────────────────────────────────────────────
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
  const [bodyTopY, setBodyTopY] = useState<number>(1.0)

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

        {/* Single RotatingGroup → body + face always rotate in sync */}
        <RotatingGroup autoRotate={!interactive}>
          <Suspense fallback={<Spinner />}>
            <BodyModel url={bodyUrl} color={bodyColor} onBodyTop={setBodyTopY} />
          </Suspense>

          {faceUrl && (
            <Suspense key={faceUrl} fallback={null}>
              <FaceModel url={faceUrl} bodyTopY={bodyTopY} />
            </Suspense>
          )}
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
