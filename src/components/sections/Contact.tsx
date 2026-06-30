import { profile } from '../../data/resume'

export function Contact() {
  return (
    <section
      id="contact"
      data-reveal
      className="relative flex min-h-screen items-center px-6 py-24 md:px-12"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-zinc-950/55 p-8 text-center backdrop-blur-md md:p-14">
        <p className="section-label">Contact</p>
        <h2 id="contact-title" className="mt-4 font-display text-4xl text-zinc-50 md:text-5xl">
          Available for meaningful product work.
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-zinc-400 md:text-lg">
          Open to freelance and full-time opportunities where architecture, quality, and frontend
          craft are valued.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a className="glass-pill" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="glass-pill" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="glass-pill" href={`tel:${profile.phone.replace(/\s+/g, '')}`}>
            {profile.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
