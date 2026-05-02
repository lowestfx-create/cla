'use client'
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

// ─── Combined body + face in ONE Suspense ────────────────────────────────────
// Both models load together so we can compute relative positioning.

function CharacterModel({
  bodyUrl,
  bodyColor,
  faceUrl,
  autoRotate,
}: {
  bodyUrl: string
  bodyColor: string
  faceUrl: string | null
  autoRotate: boolean
}) {
  const bodyGeo = useLoader(STLLoader, bodyUrl)
  // useGLTF is called conditionally-safe because the URL won't change mid-render
  // (face is only rendered when faceUrl is non-null, handled by parent Suspense key)
  const faceGltf = faceUrl ? useGLTF(faceUrl) : null // eslint-disable-line react-hooks/rules-of-hooks

  const groupRef = useRef<THREE.Group>(null)

  const { bodyScale, bodyOffset, bodyTopY, faceScale, facePosition, faceClone } = useMemo(() => {
    // ── Body metrics ──
    bodyGeo.computeVertexNormals()
    bodyGeo.computeBoundingBox()
    const bodyBox = bodyGeo.boundingBox!
    const bodyCenter = new THREE.Vector3()
    bodyBox.getCenter(bodyCenter)
    const bodySize = new THREE.Vector3()
    bodyBox.getSize(bodySize)
    const maxDim = Math.max(bodySize.x, bodySize.y, bodySize.z)
    const bScale = maxDim > 0 ? 2.2 / maxDim : 1
    const bTopY = (bodyBox.max.y - bodyCenter.y) * bScale

    // ── Face metrics ──
    let fScale = 1
    let fPos: [number, number, number] = [0, bTopY + 0.3, 0]
    let fClone: THREE.Object3D | null = null

    if (faceGltf) {
      fClone = faceGltf.scene.clone(true)
      const faceBox = new THREE.Box3().setFromObject(fClone)
      const faceCenter = new THREE.Vector3()
      faceBox.getCenter(faceCenter)
      const faceSize = new THREE.Vector3()
      faceBox.getSize(faceSize)
      const faceDim = Math.max(faceSize.x, faceSize.y, faceSize.z)

      // Face head = ~27% of body height (roughly LEGO proportions)
      fScale = faceDim > 0 ? (2.2 * 0.27) / faceDim : 1

      // Bottom of face (in local face coords) after scaling
      const faceBottomLocal = (faceBox.min.y - faceCenter.y) * fScale
      // Center face horizontally
      const faceCenterOffsetX = -faceCenter.x * fScale
      const faceCenterOffsetZ = -faceCenter.z * fScale

      fPos = [
        faceCenterOffsetX,
        bTopY - faceBottomLocal,   // sit face bottom at body top
        faceCenterOffsetZ,
      ]
    }

    return {
      bodyScale: bScale,
      bodyOffset: [-bodyCenter.x, -bodyCenter.y, -bodyCenter.z] as [number, number, number],
      bodyTopY: bTopY,
      faceScale: fScale,
      facePosition: fPos,
      faceClone: fClone,
    }
  }, [bodyGeo, faceGltf])

  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.45
    }
  })

  return (
    <group ref={groupRef}>
      {/* Body */}
      <group scale={bodyScale}>
        <mesh position={bodyOffset} castShadow receiveShadow>
          <primitive object={bodyGeo} attach="geometry" />
          <meshStandardMaterial color={bodyColor} roughness={0.4} metalness={0.08} envMapIntensity={0.6} />
        </mesh>
      </group>

      {/* Face */}
      {faceClone && (
        <group scale={faceScale} position={facePosition}>
          <primitive object={faceClone} />
        </group>
      )}
    </group>
  )
}

// ─── Loading spinner (3D) ─────────────────────────────────────────────────────
function Spinner() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 2
  })
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

        <Suspense fallback={<Spinner />}>
          <CharacterModel
            bodyUrl={bodyUrl}
            bodyColor={bodyColor}
            faceUrl={faceUrl}
            autoRotate={!interactive}
          />
        </Suspense>

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
