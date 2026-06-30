import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'

export function useLenisScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) {
      return
    }

    const lenis = new Lenis({ autoRaf: false, lerp: 0.08 })
    const update = (time: number) => {
      lenis.raf(time * 1000)
    }

    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
    }
  }, [enabled])
}
