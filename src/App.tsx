import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Experience } from './components/sections/Experience'
import { Hero } from './components/sections/Hero'
import { Skills } from './components/sections/Skills'
import { TechStack3D } from './components/sections/TechStack3D'
import { Nav } from './components/layout/Nav'
import { ProgressBar } from './components/layout/ProgressBar'
import { SmoothScroll } from './components/layout/SmoothScroll'
import { useScrollProgress } from './hooks/useScrollProgress'
import { useReducedMotion } from './hooks/useReducedMotion'
import { gsap, ScrollTrigger } from './lib/gsap'

function App() {
  const rootRef = useRef<HTMLDivElement>(null)
  const { setProgress } = useScrollProgress()
  const reducedMotion = useReducedMotion()

  useGSAP(
    () => {
      ScrollTrigger.create({
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => setProgress(self.progress),
      })

      if (!reducedMotion) {
        const sections = gsap.utils.toArray<HTMLElement>('[data-reveal]')
        sections.forEach((section) => {
          gsap.from(section, {
            autoAlpha: 0,
            y: 36,
            duration: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 82%',
              end: 'top 58%',
              scrub: 0.25,
            },
          })
        })
      }
    },
    { scope: rootRef, dependencies: [reducedMotion, setProgress] },
  )

  return (
    <SmoothScroll>
      <a className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50" href="#hero">
        Skip to content
      </a>
      <ProgressBar />
      <Nav />

      <div ref={rootRef} className="relative">
        <main>
          <Hero />
          <About />
          <TechStack3D />
          <Skills />
          <Experience />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  )
}

export default App
