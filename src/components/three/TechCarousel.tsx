import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import { MathUtils } from 'three'
import { technologies } from '../../data/technologies'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTechScrollProgress } from '../../hooks/useTechScrollProgress'
import { TechCard } from './TechCard'

const count = technologies.length
const radius = 4.2

export function TechCarousel() {
  const groupRef = useRef<Group>(null)
  const { progress } = useTechScrollProgress()
  const reducedMotion = useReducedMotion()

  const positions = useMemo(
    () =>
      technologies.map((_tech, index) => {
        const angle = (index / count) * Math.PI * 2
        return {
          x: Math.sin(angle) * radius,
          z: Math.cos(angle) * radius,
          angle,
        }
      }),
    [],
  )

  const activeIndex = Math.min(count - 1, Math.round(progress * (count - 1)))

  useFrame((state) => {
    const group = groupRef.current
    if (!group) {
      return
    }

    const targetRotation = reducedMotion ? 0 : -progress * Math.PI * 2
    group.rotation.y = MathUtils.lerp(group.rotation.y, targetRotation, 0.08)

    if (!reducedMotion) {
      group.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08
    }
  })

  return (
    <group ref={groupRef}>
      {technologies.map((tech, index) => {
        const position = positions[index]
        return (
          <group key={tech.slug} position={[position.x, 0, position.z]} rotation={[0, -position.angle, 0]}>
            <TechCard tech={tech} active={index === activeIndex} />
          </group>
        )
      })}
    </group>
  )
}
