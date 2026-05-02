'use client'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ─── Single-renderer thumbnail generator ────────────────────────────────────
// Uses ONE WebGL context for all faces — avoids browser context limit (8-16)

async function renderFaceToDataURL(
  url: string,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  loader: GLTFLoader,
): Promise<string> {
  const gltf = await loader.loadAsync(url)
  const model = gltf.scene

  // Auto-center + auto-scale
  const box = new THREE.Box3().setFromObject(model)
  const center = new THREE.Vector3()
  box.getCenter(center)
  const size = new THREE.Vector3()
  box.getSize(size)
  const maxDim = Math.max(size.x, size.y, size.z)
  const s = maxDim > 0 ? 1.8 / maxDim : 1
  model.scale.setScalar(s)
  model.position.set(-center.x * s, -center.y * s, -center.z * s)

  scene.add(model)
  renderer.render(scene, camera)
  const dataUrl = renderer.domElement.toDataURL('image/webp', 0.9)
  scene.remove(model)
  model.traverse((obj) => {
    if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose()
  })

  return dataUrl
}

// ─── Hook: generate all thumbnails with one shared renderer ─────────────────
export function useFaceThumbnails(urls: string[]): (string | null)[] {
  const [thumbs, setThumbs] = useState<(string | null)[]>(urls.map(() => null))

  useEffect(() => {
    let cancelled = false

    const SIZE = 160
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(SIZE, SIZE)
    renderer.setPixelRatio(2)
    renderer.setClearColor(0x000000, 0)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100)
    camera.position.set(0, 0, 2.5)
    camera.lookAt(0, 0, 0)

    const scene = new THREE.Scene()
    const ambient = new THREE.AmbientLight(0xffffff, 1.4)
    const dir1 = new THREE.DirectionalLight(0xffffff, 1.2)
    dir1.position.set(2, 4, 3)
    const dir2 = new THREE.DirectionalLight(0xffffff, 0.4)
    dir2.position.set(-2, 1, 2)
    scene.add(ambient, dir1, dir2)

    const loader = new GLTFLoader()

    // Render one at a time to avoid memory spikes
    ;(async () => {
      for (let i = 0; i < urls.length; i++) {
        if (cancelled) break
        try {
          const dataUrl = await renderFaceToDataURL(urls[i], renderer, camera, scene, loader)
          if (!cancelled) {
            setThumbs((prev) => {
              const next = [...prev]
              next[i] = dataUrl
              return next
            })
          }
        } catch (err) {
          console.warn('FaceViewer: failed to load', urls[i], err)
        }
      }
      if (!cancelled) renderer.dispose()
    })()

    return () => {
      cancelled = true
      renderer.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join(',')])

  return thumbs
}

// ─── FaceThumb: shows one generated thumbnail ────────────────────────────────
interface FaceThumbProps {
  dataUrl: string | null
  className?: string
}

export function FaceThumb({ dataUrl, className = '' }: FaceThumbProps) {
  if (!dataUrl) {
    return (
      <div className={`w-full h-full flex items-center justify-center ${className}`}>
        <div className="w-5 h-5 border-2 border-brand-dark/30 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={dataUrl}
      alt="face preview"
      className={`w-full h-full object-contain ${className}`}
      draggable={false}
    />
  )
}
