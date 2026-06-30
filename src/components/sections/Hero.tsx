import { Suspense, lazy } from 'react'
import { profile } from '../../data/resume'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const HeroCanvas = lazy(() => import('../three/HeroCanvas'))

export function Hero() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reducedMotion = useReducedMotion()
  const showHero3D = !isMobile && !reducedMotion

  return (
    <section
      id="hero"
      data-reveal
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-20 pt-28 md:px-12"
      aria-labelledby="hero-title"
    >
      {showHero3D ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
          <div className="absolute inset-0 bg-gradient-to-r from-[#08080a] via-[#08080a]/88 to-[#08080a]/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-[#08080a]/55" />
        </div>
      ) : null}

      <div className="relative z-10 mx-auto grid w-full max-w-6xl gap-12 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-8">
          <p className="section-label">Software Engineer</p>
          <h1
            id="hero-title"
            className="font-display text-5xl leading-[0.98] text-zinc-50 sm:text-6xl lg:text-[4.5rem]"
          >
            {profile.name}
          </h1>
          <h2 className="max-w-xl text-lg font-normal text-zinc-300 md:text-xl">{profile.role}</h2>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400 md:text-base">
            Designing scalable, user-focused systems across the full stack with modern architecture and
            refined frontend execution.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <a className="glass-pill" href="#contact">
              Start a conversation
            </a>
            <a className="glass-pill" href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="flex items-end">
          <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/50 p-6 backdrop-blur-md">
            <p className="text-sm text-zinc-300">
              <span className="section-label mb-1 block">Location</span>
              {profile.location}
            </p>
            <p className="mt-5 text-sm text-zinc-300">
              <span className="section-label mb-2 block">WhatsApp</span>
              <a
                href={`https://wa.me/${profile.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-zinc-900/60 text-[#25D366] transition hover:border-[#25D366]/40 hover:bg-[#25D366]/10"
              >
                <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.89-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </p>
            <p className="mt-5 text-sm text-zinc-300">
              <span className="section-label mb-1 block">Email</span>
              <a
                href={`mailto:${profile.email}`}
                className="text-zinc-100 underline decoration-zinc-600 underline-offset-4"
              >
                {profile.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
