import { type PropsWithChildren } from 'react'
import { useLenisScroll } from '../../hooks/useLenisScroll'
import { useReducedMotion } from '../../hooks/useReducedMotion'

export function SmoothScroll({ children }: PropsWithChildren) {
  const reducedMotion = useReducedMotion()
  useLenisScroll(!reducedMotion)

  return <>{children}</>
}
