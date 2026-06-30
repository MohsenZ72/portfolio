import { TechLogo } from '../TechLogo'
import { findTechnologyByName } from '../../data/technologies'
import { skills } from '../../data/resume'

function SkillChip({ name }: { name: string }) {
  const tech = findTechnologyByName(name)

  if (!tech) {
    return (
      <span className="rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
        {name}
      </span>
    )
  }

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/80 px-3 py-1 text-xs text-zinc-300">
      <TechLogo tech={tech} className="h-3.5 w-3.5" width={14} height={14} />
      {name}
    </span>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      data-reveal
      className="relative min-h-screen px-6 py-28 md:px-12"
      aria-labelledby="skills-title"
    >
      <div className="mx-auto w-full max-w-6xl">
        <p className="section-label">Expertise</p>
        <h2 id="skills-title" className="mt-4 font-display text-4xl text-zinc-50 md:text-5xl">
          Full-stack depth, product-focused execution.
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {skills.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-white/10 bg-zinc-950/45 p-6 backdrop-blur-md"
            >
              <h3 className="text-lg font-medium text-zinc-100">{group.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <SkillChip key={item} name={item} />
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
