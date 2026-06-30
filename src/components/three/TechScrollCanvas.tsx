import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { TechCarousel } from './TechCarousel'

export default function TechScrollCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 8], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={['#08080a']} />
      <fog attach="fog" args={['#08080a', 8, 20]} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 5]} intensity={0.7} color="#e4e4e7" />
      <Suspense fallback={null}>
        <TechCarousel />
      </Suspense>
    </Canvas>
  )
}
