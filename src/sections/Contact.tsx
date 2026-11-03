import { profile, stack } from '../data/profile'

export function Contact() {
  return (
    <section id="contact" data-stage="3" className="section section-left" aria-labelledby="contact-title">
      <div className="panel panel-wide">
        <div className="stack-grid" aria-label="Tools I use">
          {stack.map((g) => (
            <div key={g.group}>
              <p className="eyebrow">{g.group}</p>
              <p className="stack-items">{g.items.join(' · ')}</p>
            </div>
          ))}
        </div>

        <div className="contact-col">
        <p className="eyebrow">Signal</p>
        <h2 id="contact-title" className="contact-title">
          Hiring in the <em>Netherlands?</em>
        </h2>
        <a className="contact-mail" href={`mailto:${profile.email}`}>
          {profile.email}
        </a>
        <p className="lede contact-permit">{profile.permit}</p>
        <div className="contact-actions">
          <a className="btn btn-solid" href={`${import.meta.env.BASE_URL}${profile.resume}`} download>
            Download résumé
          </a>
          <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn ↗
          </a>
          <a className="btn" href={profile.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </div>
        <footer className="foot">
          <span>{profile.location}</span>
          <span>Built with React Three Fiber · 28,000 particles · no 3D models</span>
        </footer>
        </div>
      </div>
    </section>
  )
}
