import { Edges, Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import type { Group } from 'three'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function CodeScreen() {
  return (
    <group position={[0, 0.2, 0]} rotation={[-0.08, 0, 0]}>
      <mesh>
        <planeGeometry args={[2.1, 1.35]} />
        <meshStandardMaterial color="#0b1220" emissive="#1d4ed8" emissiveIntensity={0.35} />
        <Edges color="#38bdf8" threshold={15} />
      </mesh>
      <Html transform occlude distanceFactor={2.2} position={[0, 0, 0.01]} style={{ pointerEvents: 'none' }}>
        <pre className="w-[148px] overflow-hidden text-left font-mono text-[7px] leading-relaxed text-sky-300/90">
          {`const build = () => {\n  return createApp({\n    stack: 'full',\n    craft: true\n  });\n};`}
        </pre>
      </Html>
    </group>
  )
}

export function DeveloperLaptop() {
  const groupRef = useRef<Group>(null)
  const reducedMotion = useReducedMotion()

  useFrame((state) => {
    const group = groupRef.current
    if (!group || reducedMotion) {
      return
    }

    group.rotation.y = Math.sin(state.clock.elapsedTime * 0.35) * 0.14
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.25) * 0.03 - 0.06
    group.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.04
  })

  return (
    <group ref={groupRef} position={[2.4, 0.1, 0]} scale={1.45}>
      <CodeScreen />
      <pointLight position={[2, 2, 3]} intensity={1.1} color="#93c5fd" />
      <pointLight position={[-2, 1, 2]} intensity={0.35} color="#a1a1aa" />
    </group>
  )
}
