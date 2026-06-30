import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { DeveloperLaptop } from './DeveloperLaptop'

export default function HeroCanvas() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0.6, 5.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 4]} intensity={0.65} color="#e4e4e7" />
      <Suspense fallback={null}>
        <DeveloperLaptop />
      </Suspense>
    </Canvas>
  )
}
