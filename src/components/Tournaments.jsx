import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { TOURNAMENTS } from '../data/content'
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
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(t)
  }, [])
  const s = Math.max(0, Math.floor((to - now) / 1000))
  const parts = [
    [Math.floor(s / 86400), 'дн'],
    [Math.floor((s % 86400) / 3600), 'ч'],
    [Math.floor((s % 3600) / 60), 'мин'],
    [s % 60, 'сек'],
  ]
  return (
    <div className="countdown" aria-label="До старта">
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
  return (
    <section className="section" id="tournaments">
      <div className="container">
        <SectionHead
          eyebrow="// Соревновательная система"
          title={
            <>
              Турнирная лига <span className="text-cyan glow-text">Nexus</span>
            </>
          }
          aside={
            <a href="#tournaments" className="link-arrow tech" onClick={(e) => e.preventDefault()}>
              Правила участия и регламент <Icon name="arrow_forward" />
            </a>
          }
        />

        <div className="tour-grid">
          {TOURNAMENTS.map((t, i) => (
            <motion.article
              key={t.title}
              className={`tour ${t.accent}`}
              initial={{ opacity: 0, x: i === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.9, ease: EASE }}
              whileHover={{ y: -6 }}
            >
              <Icon name={t.icon} className="tour-icon" />
              <div className="tour-meta">
                <span className={`badge ${t.accent === 'magenta' ? 'magenta' : ''}`}>{t.when}</span>
                <span className="badge lime">
                  <span className="dot" /> {t.status}
                </span>
              </div>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
              <Countdown to={TARGETS[i]} />
              <div className="slots">
                <div className="slots-top tech">
                  <span>Заполнено слотов</span>
                  <span>
                    {t.slots.taken} / {t.slots.total}
                  </span>
                </div>
                <div className="slots-bar">
                  <motion.span
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: t.slots.taken / t.slots.total }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4, delay: 0.3, ease: EASE }}
                  />
                </div>
              </div>
              <div className="tour-foot">
                <div>
                  <small className="tech">Призовой фонд</small>
                  <b>{t.prize}</b>
                </div>
                <button
                  className={t.accent === 'magenta' ? 'btn btn-vip' : 'btn btn-primary'}
                  // TODO(backend): регистрация команды/игрока
                  onClick={() => onToast('Заявка принята — организатор свяжется с вами')}
                >
                  {t.cta}
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
