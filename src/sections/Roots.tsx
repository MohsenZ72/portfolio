import { useRef } from 'react'
import { roots } from '../data/profile'
import { gsap, useGSAP } from '../lib/gsap'

export function Roots({ motion }: { motion: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!motion) return
      gsap.utils.toArray<HTMLElement>('.root-row').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 40,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        })
      })
    },
    { scope: root, dependencies: [motion] },
  )

  return (
    <section ref={root} id="roots" data-stage="1" className="section section-right" aria-labelledby="roots-title">
      <div className="panel">
        <p className="eyebrow">Roots</p>
        <h2 id="roots-title" className="section-title">
          I studied plants
          <br />
          before <em>software.</em>
        </h2>
        <p className="lede">
          Agriculture taught me growth cycles: you plan the season, ship small, and look at what actually grows.
          Seven years of shipping software later, that's still how I work.
        </p>
        <ol className="roots-list">
          {roots.map((r) => (
            <li key={r.years} className="root-row">
              <span className="root-years">{r.years}</span>
              <div>
                <h3 className="root-title">{r.title}</h3>
                <p className="root-place">{r.place}</p>
                <p className="root-note">{r.note}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
