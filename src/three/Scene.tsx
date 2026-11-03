import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { Suspense } from 'react'
import { Field } from './Field'

function hasWebGL() {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

export function Scene({ motion, compact }: { motion: boolean; compact: boolean }) {
  if (!hasWebGL()) return <div className="scene-fallback" aria-hidden="true" />
  return (
    <div className="scene" aria-hidden="true">
      <Canvas
        dpr={compact ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        gl={{ antialias: false, powerPreference: 'high-performance', alpha: true }}
        fallback={<div className="scene-fallback" />}
      >
        <Suspense fallback={null}>
          <Field count={compact ? 11000 : 28000} motion={motion} />
        </Suspense>
        {!compact && (
          <EffectComposer multisampling={0}>
            <Bloom intensity={0.85} luminanceThreshold={0.08} luminanceSmoothing={0.4} mipmapBlur />
            <Noise opacity={0.035} />
            <Vignette offset={0.25} darkness={0.75} />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  )
}
