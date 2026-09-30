import { CONTACTS, NAV } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { useLang } from '../i18n'
import Icon from './Icon'
import { Reveal } from './Reveal'

// Стилизованная «тактическая» карта района (без внешних карт/API).
function MiniMap() {
  return (
    <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <pattern id="mgrid" width="16" height="16" patternUnits="userSpaceOnUse">
          <path d="M16 0H0V16" fill="none" stroke="rgba(0,240,255,.07)" />
        </pattern>
      </defs>
      <rect width="320" height="200" fill="url(#mgrid)" />
      <g fill="rgba(255,255,255,.035)" stroke="rgba(0,240,255,.12)">
        <rect x="18" y="20" width="70" height="46" />
        <rect x="100" y="14" width="54" height="60" />
        <rect x="210" y="22" width="88" height="40" />
        <rect x="24" y="118" width="62" height="58" />
        <rect x="112" y="128" width="46" height="50" />
        <rect x="216" y="120" width="80" height="62" />
      </g>
      <path d="M0 96 H320" stroke="rgba(0,240,255,.35)" strokeWidth="6" />
      <path d="M170 0 V200" stroke="rgba(0,240,255,.2)" strokeWidth="4" />
      <path d="M0 150 C80 140 120 180 200 100 S300 70 320 60" stroke="rgba(217,70,239,.45)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
      <circle cx="96" cy="96" r="6" fill="#0a0b10" stroke="#a3e635" strokeWidth="2" />
      <text x="72" y="86" fill="#a3e635" fontSize="8" fontFamily="JetBrains Mono, monospace">М</text>
    </svg>
  )
}

export default function Footer() {
  const { t, tr } = useLang()
  const go = (id) => (e) => {
    e.preventDefault()
    scrollToId(id)
  }
  return (
    <footer className="footer" id="contacts">
      <div className="container">
        <div className="footer-grid">
          <Reveal>
            <a href="#top" className="brand" onClick={go('top')} style={{ marginBottom: '1rem' }}>
              <img src="/img/logo-mark.png" alt="" width="44" height="44" loading="lazy" />
              <span className="brand-name">
                <b>NEXUS</b>
                <small>CYBER ARENA</small>
              </span>
            </a>
            <p>{t('footer.about')}</p>
            <p className="tech text-lime" style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
              <span className="dot" /> {t('footer.hours')}
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <h4>{t('footer.nav')}</h4>
            <nav>
              {NAV.filter((n) => n.id !== 'contacts').map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)}>
                  {tr(n.label)}
                </a>
              ))}
            </nav>
          </Reveal>

          <Reveal delay={0.16}>
            <h4>{t('footer.contacts')}</h4>
            <a className="contact" href={`tel:${CONTACTS.phone.replace(/[^\d+]/g, '')}`}>
              <Icon name="call" /> {CONTACTS.phone}
            </a>
            <a className="contact" href={`mailto:${CONTACTS.email}`}>
              <Icon name="mail" /> {CONTACTS.email}
            </a>
            <span className="contact">
              <Icon name="location_on" /> {tr(CONTACTS.address)}
            </span>
            <div className="socials">
              {CONTACTS.socials.map((s) => (
                <a key={s} href="#contacts" onClick={(e) => e.preventDefault()}>
                  {s}
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.24}>
            <h4>{t('footer.location')}</h4>
            <div className="map-card">
              <MiniMap />
              <span className="map-ping" />
              <span className="map-pin">
                <Icon name="location_on" fill />
              </span>
              <div className="map-caption">
                <span>{tr(CONTACTS.metro)}</span>
                <span className="text-lime">{t('footer.parking')}</span>
              </div>
            </div>
            <p className="tech muted" style={{ marginTop: '1rem' }}>
              {t('footer.pay')} <span className="text-cyan">{CONTACTS.payments}</span>
            </p>
          </Reveal>
        </div>

        <div className="footer-bottom tech">
          <span>{t('footer.rights')}</span>
          <nav>
            <a href="#contacts" onClick={(e) => e.preventDefault()}>
              {t('footer.rules')}
            </a>
            <a href="#contacts" onClick={(e) => e.preventDefault()}>
              {t('footer.offer')}
            </a>
            <a href="#contacts" onClick={(e) => e.preventDefault()}>
              {t('footer.privacy')}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}
