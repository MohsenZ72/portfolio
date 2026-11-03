import { useRef } from 'react'
import { projects } from '../data/profile'
import { gsap, useGSAP } from '../lib/gsap'
import { sceneState } from '../lib/scroll'

export function Work({ motion }: { motion: boolean }) {
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (!motion) return
      gsap.utils.toArray<HTMLElement>('.project').forEach((row) => {
        gsap.from(row, {
          opacity: 0,
          y: 50,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: { trigger: row, start: 'top 85%' },
        })
      })
    },
    { scope: root, dependencies: [motion] },
  )

  const light = (i: number) => () => {
    sceneState.hub = i
  }
  const dim = () => {
    sceneState.hub = -1
  }

  return (
    <section ref={root} id="work" data-stage="2" className="section section-left" aria-labelledby="work-title">
      <div className="panel">
        <p className="eyebrow">Network</p>
        <h2 id="work-title" className="section-title">
          Roots became
          <br />
          <em>networks.</em>
        </h2>
        <p className="lede">
          Four products I build and run. Each one lights up its node in the graph when you point at it.
        </p>
        <ul className="projects">
          {projects.map((p, i) => (
            <li
              key={p.name}
              className="project"
              onPointerEnter={light(i)}
              onPointerLeave={dim}
              onFocus={light(i)}
              onBlur={dim}
            >
              <div className="project-head">
                <h3 className="project-name">{p.name}</h3>
                <p className="project-kind">{p.kind}</p>
              </div>
              <p className="project-line">{p.line}</p>
              <ul className="facts" aria-label={`${p.name} facts`}>
                {p.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <p className="project-stack">{p.stack}</p>
              {p.url && (
                <a className="project-link" href={p.url} target="_blank" rel="noreferrer">
                  Visit {p.url.replace('https://', '')} <span aria-hidden="true">↗</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
