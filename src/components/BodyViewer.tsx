'use client'
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

function STLModel({ url, color, autoRotate }: { url: string; color: string; autoRotate: boolean }) {
  const geometry = useLoader(STLLoader, url)
  const groupRef = useRef<THREE.Group>(null)

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

  useFrame((state) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={centerOffset} castShadow receiveShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial
          color={color}
          roughness={0.4}
          metalness={0.08}
          envMapIntensity={0.6}
        />
      </mesh>
    </group>
  )
}

function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[0.4, 0.4, 0.4]} />
      <meshStandardMaterial color="#FFD700" />
    </mesh>
  )
}

interface BodyViewerProps {
  url: string
  color?: string
  className?: string
  interactive?: boolean
}

export default function BodyViewer({ url, color = '#DA291C', className = '', interactive = true }: BodyViewerProps) {
  return (
    <div
      className={`w-full h-full ${className}`}
      style={{ width: '100%', height: '100%', display: 'block', pointerEvents: interactive ? 'auto' : 'none' }}
    >
      <Canvas
        key={url}
        camera={{ position: [0, 0.6, 4.8], fov: 42 }}
        dpr={[1, 2]}
        shadows={{ type: THREE.PCFSoftShadowMap }}
        gl={{ alpha: true, antialias: true }}
        style={{ width: '100%', height: '100%', background: 'transparent' }}
      >
        {/* 3-point lighting setup */}
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[4, 8, 5]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.5}
          shadow-camera-far={50}
        />
        <directionalLight position={[-5, 4, 2]} intensity={0.6} color="#FFF3CC" />
        <directionalLight position={[1, -3, -4]} intensity={0.25} color="#C8DDFF" />

        <Suspense fallback={<LoadingSpinner />}>
          <STLModel url={url} color={color} autoRotate={!interactive} />
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
