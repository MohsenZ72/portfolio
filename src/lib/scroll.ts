import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

// Shared, mutable state read every frame by the WebGL scene (no React re-renders).
export const sceneState = {
  // 0 = seed (hero), 1 = roots, 2 = network, 3 = signal (contact). Continuous.
  stage: 0,
  // Pointer in -1..1, y up.
  pointer: { x: 0, y: 0 },
  // Hovered project hub (0–3) or -1.
  hub: -1,
}

let lenis: Lenis | null = null

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.4 })
  else el.scrollIntoView({ behavior: 'smooth' })
}

function computeStage() {
  const vh = window.innerHeight
  const sections = document.querySelectorAll<HTMLElement>('[data-stage]')
  let stage = 0
  sections.forEach((el) => {
    const n = Number(el.dataset.stage)
    if (n === 0) return
    const top = el.getBoundingClientRect().top
    stage += Math.min(1, Math.max(0, (vh - top) / (vh * 0.9)))
  })
  sceneState.stage = stage
}

export function useSmoothScroll(smooth: boolean) {
  useEffect(() => {
    const onPointer = (e: PointerEvent) => {
      sceneState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1
      sceneState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointer, { passive: true })

    const tick = (time: number) => {
      lenis?.raf(time * 1000)
      computeStage()
    }
    if (smooth) {
      lenis = new Lenis({ autoRaf: false, lerp: 0.085 })
      lenis.on('scroll', ScrollTrigger.update)
    }
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)
    computeStage()

    return () => {
      window.removeEventListener('pointermove', onPointer)
      gsap.ticker.remove(tick)
      lenis?.destroy()
      lenis = null
    }
  }, [smooth])
}
