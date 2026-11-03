import { useRef, useState } from 'react'
import { gsap, useGSAP } from '../lib/gsap'

// A germination counter: the page "sprouts" before it opens.
export function Preloader({ motion, onDone }: { motion: boolean; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [count, setCount] = useState(motion ? 0 : 100)

  useGSAP(
    () => {
      if (!motion) {
        onDone()
        return
      }
      const state = { v: 0 }
      const tl = gsap.timeline({ onComplete: onDone })
      tl.to(state, {
        v: 100,
        duration: 1.7,
        ease: 'power2.inOut',
        onUpdate: () => setCount(Math.round(state.v)),
      })
        .to('.pre-line', { scaleX: 1, duration: 1.7, ease: 'power2.inOut' }, 0)
        .to(root.current, { yPercent: -100, duration: 0.9, ease: 'expo.inOut' }, '+=0.15')
    },
    { scope: root },
  )

  if (!motion) return null
  return (
    <div ref={root} className="preloader" role="status" aria-live="polite">
      <div className="pre-inner">
        <span className="pre-label">germinating</span>
        <span className="pre-count">{String(count).padStart(3, '0')}</span>
        <span className="pre-line" />
      </div>
    </div>
  )
}
