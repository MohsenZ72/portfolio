import { lazy, Suspense, useState } from 'react'
import { Nav } from './components/Nav'
import { Preloader } from './components/Preloader'
import { useMediaQuery } from './hooks/useMediaQuery'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useSmoothScroll } from './lib/scroll'
import { Contact } from './sections/Contact'
import { Hero } from './sections/Hero'
import { Roots } from './sections/Roots'
import { Work } from './sections/Work'

// Three.js is ~1 MB: load it after the text so the page reads instantly.
const Scene = lazy(() => import('./three/Scene').then((m) => ({ default: m.Scene })))

export default function App() {
  const reduced = useReducedMotion()
  const compact = useMediaQuery('(max-width: 820px)')
  const motion = !reduced
  const [ready, setReady] = useState(!motion)

  useSmoothScroll(motion && !compact)

  return (
    <>
      <a className="skip" href="#roots">
        Skip to content
      </a>
      <Suspense fallback={<div className="scene-fallback" aria-hidden="true" />}>
        <Scene motion={motion} compact={compact} />
      </Suspense>
      <Preloader motion={motion} onDone={() => setReady(true)} />
      <Nav />
      <main>
        <Hero ready={ready} motion={motion} />
        <Roots motion={motion} />
        <Work motion={motion} />
        <Contact />
      </main>
    </>
  )
}
