import { useState } from 'react'
import { earlierExperience, featuredExperience } from '../../data/resume'

export function Experience() {
  const [showAll, setShowAll] = useState(false)

  return (
    <section
      id="experience"
      data-reveal
      className="relative min-h-screen px-6 py-28 md:px-12"
      aria-labelledby="experience-title"
    >
      <div className="mx-auto max-w-6xl">
        <p className="section-label">Experience</p>
        <h2 id="experience-title" className="mt-4 font-display text-4xl text-zinc-50 md:text-5xl">
          Proven delivery across product and platform teams.
        </h2>

        <div className="mt-10 space-y-5">
          {featuredExperience.map((item) => (
            <article
              key={`${item.company}-${item.period}`}
              className="rounded-2xl border border-white/10 bg-zinc-950/45 p-6 backdrop-blur-md"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-medium text-zinc-100">
                  {item.role} · {item.company}
                </h3>
                <span className="text-sm text-zinc-500">{item.period}</span>
              </div>
              <p className="mt-1 text-sm text-zinc-500">{item.location}</p>
              <ul className="mt-4 space-y-2 text-sm text-zinc-400">
                {item.highlights.map((highlight) => (
                  <li key={highlight}>- {highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-zinc-950/30 p-5">
          <button
            type="button"
            className="glass-pill text-sm"
            onClick={() => setShowAll((value) => !value)}
            aria-expanded={showAll}
          >
            {showAll ? 'Hide earlier experience' : 'View full history'}
          </button>
          {showAll && (
            <ul className="mt-4 space-y-2 text-sm text-zinc-500">
              {earlierExperience.map((item) => (
                <li key={item}>- {item}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}
