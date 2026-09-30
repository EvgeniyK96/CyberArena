import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TOURNAMENTS } from '../data/content'
import { Rich, useLang } from '../i18n'
import Icon from './Icon'
import { EASE, SectionHead } from './Reveal'

// Ближайший день недели (0 — вс, 6 — сб) в заданный час.
function nextDate(weekday, hour) {
  const d = new Date()
  d.setHours(hour, 0, 0, 0)
  let diff = (weekday - d.getDay() + 7) % 7
  if (diff === 0 && d <= new Date()) diff = 7
  d.setDate(d.getDate() + diff)
  return d
}

const TARGETS = [nextDate(6, 16), nextDate(0, 18)]

function Countdown({ to }) {
  const { t } = useLang()
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor((to - now) / 1000))
  const parts = [
    [Math.floor(s / 86400), t('tour.d')],
    [Math.floor((s % 86400) / 3600), t('tour.h')],
    [Math.floor((s % 3600) / 60), t('tour.m')],
    [s % 60, t('tour.s')],
  ]
  return (
    <div className="countdown" aria-label={t('tour.countdown')}>
      {parts.map(([v, l]) => (
        <div key={l}>
          <b>{String(v).padStart(2, '0')}</b>
          <small className="tech">{l}</small>
        </div>
      ))}
    </div>
  )
}

export default function Tournaments({ onToast }) {
  const { t, tr } = useLang()
  return (
    <section className="section" id="tournaments">
      <div className="container">
        <SectionHead
          eyebrow={t('tour.eyebrow')}
          title={<Rich text={t('tour.title')} className="text-cyan glow-text" />}
          aside={
            <a href="#tournaments" className="link-arrow tech" onClick={(e) => e.preventDefault()}>
              {t('tour.rules')} <Icon name="arrow_forward" />
            </a>
          }
        />

        <div className="tour-grid">
          {TOURNAMENTS.map((tour, i) => (
            <motion.article
              key={tour.title}
              className={`tour ${tour.accent}`}
              initial={{ opacity: 0, x: i === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <Icon name={tour.icon} className="tour-icon" />
              <div className="tour-meta">
                <span className={`badge ${tour.accent === 'magenta' ? 'magenta' : ''}`}>{tr(tour.when)}</span>
                <span className="badge lime">
                  <span className="dot" /> {tr(tour.status)}
                </span>
              </div>
              <h3>{tour.title}</h3>
              <p>{tr(tour.text)}</p>
              <Countdown to={TARGETS[i]} />
              <div className="slots">
                <div className="slots-top tech">
                  <span>{t('tour.slots')}</span>
                  <span>
                    {tour.slots.taken} / {tour.slots.total}
                  </span>
                </div>
                <div className="slots-bar">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: tour.slots.taken / tour.slots.total }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
                  />
                </div>
              </div>
              <div className="tour-foot">
                <div>
                  <small className="tech">{t('tour.prize')}</small>
                  <b>{tr(tour.prize)}</b>
                </div>
                <button
                  className={tour.accent === 'magenta' ? 'btn btn-vip' : 'btn btn-primary'}
                  // TODO(backend): регистрация команды/игрока
                  onClick={() => onToast(t('tour.toast'))}
                >
                  {tr(tour.cta)}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
