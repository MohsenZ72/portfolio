import { profile } from '../../data/resume'

export function About() {
  return (
    <section
      id="about"
      data-reveal
      className="relative flex min-h-screen items-center px-6 py-24 md:px-12"
      aria-labelledby="about-title"
    >
      <article className="mx-auto w-full max-w-4xl rounded-2xl border border-white/10 bg-zinc-950/45 p-8 backdrop-blur-md md:p-12">
        <p className="section-label">About</p>
        <h2 id="about-title" className="mt-5 font-display text-4xl text-zinc-50 md:text-5xl">
          Building systems that scale and interfaces that convert.
        </h2>
        <p className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg">{profile.summary}</p>
      </article>
    </section>
  )
}
