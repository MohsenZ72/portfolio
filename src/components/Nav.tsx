import { profile } from '../data/profile'
import { scrollToId } from '../lib/scroll'

const links = [
  { id: 'roots', label: 'Roots' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export function Nav() {
  return (
    <header className="nav">
      <a href="#top" className="nav-mark" aria-label="Mohsen Zare, back to top" onClick={(e) => { e.preventDefault(); scrollToId('top') }}>
        MZ
      </a>
      {/* Where he is, and where he is going. */}
      <p className="nav-coords" aria-label="From Yerevan to Leiden">
        <span>40.18° N 44.51° E</span>
        <span className="nav-arrow" aria-hidden="true">→</span>
        <span>52.16° N 4.49° E</span>
      </p>
      <nav aria-label="Sections">
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} onClick={(e) => { e.preventDefault(); scrollToId(l.id) }}>
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a className="nav-cv" href={`${import.meta.env.BASE_URL}${profile.resume}`} download>
              Résumé
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
