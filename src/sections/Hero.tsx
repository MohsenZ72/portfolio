import { useRef } from 'react'
import { profile } from '../data/profile'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { scrollToId } from '../lib/scroll'

export function Hero({ ready, motion }: { ready: boolean; motion: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!ready || !motion) return
      const split = SplitText.create('.hero-name', { type: 'chars', mask: 'chars' })
      gsap
        .timeline()
        .from(split.chars, { yPercent: 110, duration: 1.1, ease: 'expo.out', stagger: 0.035 })
        .from('.hero-fade', { opacity: 0, y: 16, duration: 0.9, ease: 'power3.out', stagger: 0.08 }, '-=0.6')
      return () => split.revert()
    },
    { scope: root, dependencies: [ready, motion] },
  )

  return (
    <section ref={root} id="top" data-stage="0" className="hero">
      <p className="eyebrow hero-fade">{profile.role} · TypeScript · LLM features</p>
      <h1 className="hero-name">
        Mohsen
        <br />
        <em>Zare</em>
      </h1>
      <div className="hero-foot">
        <p className="hero-pitch hero-fade">{profile.pitch}</p>
        <div className="hero-actions hero-fade">
          <a className="btn btn-solid" href={`mailto:${profile.email}`}>
            Email me
          </a>
          <a className="btn" href={`${import.meta.env.BASE_URL}${profile.resume}`} download>
            Download résumé
          </a>
        </div>
        <p className="hero-meta hero-fade">
          <span>{profile.moving}</span>
          <button type="button" className="hero-scroll" onClick={() => scrollToId('roots')}>
            Scroll to grow the seed ↓
          </button>
        </p>
      </div>
    </section>
  )
}
