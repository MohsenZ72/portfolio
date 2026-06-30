import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const sections = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Tech', href: '#tech-stack' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 px-4 md:px-10">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-zinc-950/70 px-4 py-3 backdrop-blur-xl pointer-events-auto">
        <a href="#hero" className="text-sm font-medium tracking-[0.18em] text-zinc-300 uppercase">
          MZ
        </a>

        <button
          className="rounded-full border border-white/20 p-2 text-white md:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <ul className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
          {sections.map((section) => (
            <li key={section.href}>
              <a className="transition hover:text-zinc-100" href={section.href}>
                {section.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {isOpen && (
        <div className="mx-auto mt-3 max-w-6xl rounded-3xl border border-white/10 bg-slate-950/80 p-4 backdrop-blur-xl md:hidden pointer-events-auto">
          <ul className="space-y-3 text-sm text-slate-100">
            {sections.map((section) => (
              <li key={section.href}>
                <a
                  className="block rounded-xl px-3 py-2 transition hover:bg-white/10"
                  href={section.href}
                  onClick={() => setIsOpen(false)}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
