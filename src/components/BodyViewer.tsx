'use client'
import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js'
import * as THREE from 'three'

function STLModel({ url, color, autoRotate }: { url: string; color: string; autoRotate: boolean }) {
  const geometry = useLoader(STLLoader, url)
  const groupRef = useRef<THREE.Group>(null)

  // Compute center offset and scale WITHOUT mutating the geometry
  const { scale, centerOffset } = useMemo(() => {
    geometry.computeVertexNormals()
    const box = new THREE.Box3().setFromBufferAttribute(
      geometry.attributes.position as THREE.BufferAttribute
    )
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
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.4
    }
  })

  return (
    <group ref={groupRef} scale={scale}>
      <mesh position={centerOffset} castShadow>
        <primitive object={geometry} attach="geometry" />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.05} />
      </mesh>
    </group>
  )
}

function LoadingSpinner() {
  return (
    <mesh>
      <boxGeometry args={[0.5, 0.5, 0.5]} />
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
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]} shadows={{ type: THREE.PCFShadowMap }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#FFD700" />

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
