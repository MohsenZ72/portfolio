import { Suspense, lazy, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { TechLogo } from '../TechLogo'
import { technologies } from '../../data/technologies'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { useTechScrollProgress } from '../../hooks/useTechScrollProgress'
import { ScrollTrigger } from '../../lib/gsap'

const TechScrollCanvas = lazy(() => import('../three/TechScrollCanvas'))

export function TechStack3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const { progress, setProgress } = useTechScrollProgress()
  const reducedMotion = useReducedMotion()
  const isMobile = useMediaQuery('(max-width: 768px)')

  const activeIndex = Math.min(technologies.length - 1, Math.round(progress * (technologies.length - 1)))
  const activeTech = technologies[activeIndex]

  useGSAP(
    () => {
      const section = sectionRef.current
      const pin = pinRef.current
      if (!section || !pin || isMobile || reducedMotion) {
        return
      }

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom bottom',
        pin,
        scrub: 1,
        onUpdate: (self) => setProgress(self.progress),
      })

      return () => trigger.kill()
    },
    { dependencies: [isMobile, reducedMotion, setProgress] },
  )

  if (isMobile || reducedMotion) {
    return (
      <section id="tech-stack" className="relative px-6 py-24 md:px-12" aria-labelledby="tech-stack-title">
        <div className="mx-auto max-w-6xl">
          <p className="section-label">Tech Stack</p>
          <h2 id="tech-stack-title" className="mt-4 font-display text-4xl text-zinc-50 md:text-5xl">
            Tools I build with every day.
          </h2>
          <div className="mt-10 flex gap-4 overflow-x-auto pb-4">
            {technologies.map((tech) => (
              <article
                key={tech.slug}
                className="flex min-w-[7.5rem] shrink-0 flex-col items-center gap-3 rounded-2xl border border-white/10 bg-zinc-950/60 px-4 py-5"
              >
                <TechLogo tech={tech} className="h-9 w-9" width={36} height={36} />
                <span className="text-center text-xs text-zinc-300">{tech.name}</span>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="tech-stack" ref={sectionRef} className="relative h-[420vh]" aria-labelledby="tech-stack-title">
      <div ref={pinRef} className="relative h-screen overflow-hidden">
        <div className="absolute inset-0">
          <Suspense fallback={null}>
            <TechScrollCanvas />
          </Suspense>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-6 py-28 md:px-12">
          <div>
            <p className="section-label">Tech Stack</p>
            <h2 id="tech-stack-title" className="mt-4 font-display text-4xl text-zinc-50 md:text-5xl">
              Tools I build with every day.
            </h2>
          </div>

          <div className="mx-auto w-full max-w-lg text-center">
            <p className="section-label mb-3">Currently in focus</p>
            <p className="font-display text-3xl text-zinc-50 md:text-4xl" aria-live="polite">
              {activeTech.name}
            </p>
            <div className="mt-6 flex justify-center gap-2">
              {technologies.map((tech, index) => (
                <span
                  key={tech.slug}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: index === activeIndex ? '1.5rem' : '0.375rem',
                    backgroundColor: index === activeIndex ? '#e4e4e7' : '#52525b',
                  }}
                  aria-hidden
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
