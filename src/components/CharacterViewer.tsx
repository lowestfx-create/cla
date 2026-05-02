'use client'
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

// ─── Rotating parent — body + face share ONE rotation so they always sync ────
function RotatingGroup({ autoRotate, children }: { autoRotate: boolean; children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null)
  useFrame((state) => {
    if (autoRotate && ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.45
    }
  })
  return <group ref={ref}>{children}</group>
}

// ─── Body (STL) ──────────────────────────────────────────────────────────────
function BodyModel({ url, color }: { url: string; color: string }) {
  const geometry = useLoader(STLLoader, url)

  const { scale, centerOffset } = useMemo(() => {
    geometry.computeVertexNormals()
    geometry.computeBoundingBox()
    const box = geometry.boundingBox!
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)
    return {
      scale: maxDim > 0 ? 2.2 / maxDim : 1,
      centerOffset: [-center.x, -center.y, -center.z] as [number, number, number],
    }
  }, [geometry])

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
function FaceModel({ url }: { url: string }) {
  const { scene } = useGLTF(url)

  const { faceClone, faceScale, facePosition } = useMemo(() => {
    const clone = scene.clone(true)

    const box = new THREE.Box3().setFromObject(clone)
    const center = new THREE.Vector3()
    box.getCenter(center)
    const size = new THREE.Vector3()
    box.getSize(size)
    const maxDim = Math.max(size.x, size.y, size.z)

    // Head ≈ 33% of body height (body = 2.2 units → head = 0.72)
    const fScale = maxDim > 0 ? 0.72 / maxDim : 1

    // Bottom of face in local scaled coords
    const faceBottomLocal = (box.min.y - center.y) * fScale

    // Body top ≈ 1.1  (body scaled 2.2, centered at 0)
    // Sit face bottom right on body top
    const targetY = 1.1 - faceBottomLocal

    return {
      faceClone: clone,
      faceScale: fScale,
      facePosition: [
        -center.x * fScale,
        targetY - center.y * fScale,
        -center.z * fScale,
      ] as [number, number, number],
    }
  }, [scene])

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
            <BodyModel url={bodyUrl} color={bodyColor} />
          </Suspense>

          {faceUrl && (
            <Suspense fallback={null}>
              <FaceModel url={faceUrl} />
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
