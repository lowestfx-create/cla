'use client'
import { useEffect, useState } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

// ─── Single-renderer thumbnail generator ────────────────────────────────────
// Uses ONE WebGL context for all faces — avoids browser context limit (8-16)

async function renderFaceToDataURL(
  url: string,
  skinColor: string,
  renderer: THREE.WebGLRenderer,
  camera: THREE.PerspectiveCamera,
  scene: THREE.Scene,
  loader: GLTFLoader,
): Promise<string> {
  const gltf = await loader.loadAsync(url)
  const model = gltf.scene

  // Clone + tint: keep all texture maps, only change base color of light meshes
  const skinCol = new THREE.Color(skinColor)
  model.traverse((obj) => {
    const mesh = obj as THREE.Mesh
    if (!mesh.isMesh) return
    const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material]
    const tinted = mats.map((mat) => {
      const m = (mat as THREE.MeshStandardMaterial).clone()
      // Only tint meshes whose base color is "light" — dark meshes (eyes/brows/mouth) stay
      const lum = m.color.r * 0.299 + m.color.g * 0.587 + m.color.b * 0.114
      if (lum > 0.6) m.color.copy(skinCol)
      return m
    })
    mesh.material = Array.isArray(mesh.material) ? tinted : tinted[0]
  })

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
    const mesh = obj as THREE.Mesh
    if (mesh.isMesh) {
      if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose())
      else mesh.material.dispose()
      mesh.geometry.dispose()
    }
  })

  return dataUrl
}

// ─── Hook: generate all thumbnails with one shared renderer ─────────────────
export function useFaceThumbnails(urls: string[], skinColor: string): (string | null)[] {
  const [thumbs, setThumbs] = useState<(string | null)[]>(urls.map(() => null))

  useEffect(() => {
    let cancelled = false
    setThumbs(urls.map(() => null)) // reset on skin color change

    const SIZE = 160
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(SIZE, SIZE)
    renderer.setPixelRatio(2)
    renderer.setClearColor(0x000000, 0)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2

    // Slightly elevated camera → more 3D depth visible on face surface
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(0, 0.3, 2.8)
    camera.lookAt(0, 0, 0)

    const scene = new THREE.Scene()
    // Low ambient → shadows are darker, surface detail pops more
    const ambient = new THREE.AmbientLight(0xffffff, 0.3)
    // Strong 45° key light from top-left front — reveals face relief
    const key = new THREE.DirectionalLight(0xffffff, 2.8)
    key.position.set(-2, 4, 3)
    // Soft fill from right
    const fill = new THREE.DirectionalLight(0xffffff, 0.5)
    fill.position.set(3, 0, 2)
    // Subtle rim from behind-below
    const rim = new THREE.DirectionalLight(0xffe8d0, 0.4)
    rim.position.set(0, -3, -1)
    scene.add(ambient, key, fill, rim)

    const loader = new GLTFLoader()

    // Render one at a time (sequential to avoid memory spikes)
    ;(async () => {
      for (let i = 0; i < urls.length; i++) {
        if (cancelled) break
        try {
          const dataUrl = await renderFaceToDataURL(urls[i], skinColor, renderer, camera, scene, loader)
          if (!cancelled) {
            setThumbs((prev) => {
              const next = [...prev]
              next[i] = dataUrl
              return next
            })
          }
        } catch (err) {
          console.warn('FaceViewer: failed to render', urls[i], err)
        }
      }
      if (!cancelled) renderer.dispose()
    })()

    return () => {
      cancelled = true
      renderer.dispose()
    }
  // Re-render when skin color changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urls.join(','), skinColor])

  return thumbs
}

// ─── FaceThumb: displays one generated thumbnail ─────────────────────────────
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
