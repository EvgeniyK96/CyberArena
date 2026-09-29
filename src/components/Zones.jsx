import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useState } from 'react'
import { COMPARISON, ZONES } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import AutoVideo from './AutoVideo'
import Icon from './Icon'
import { EASE, SectionHead } from './Reveal'

function ZoneCard({ zone, index, onPick }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18 })
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const onMove = (e) => {
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${px * 100}%`)
    el.style.setProperty('--my', `${py * 100}%`)
    if (!fine) return
    rx.set((0.5 - py) * 8)
    ry.set((px - 0.5) * 8)
  }

  return (
    <motion.div
      className="zone-wrap"
      initial={{ opacity: 0, y: 80, rotateX: 18 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: EASE }}
    >
    <motion.article
      className={`zone-card ${zone.accent}`}
      style={{ rotateX: rx, rotateY: ry }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      <div className="zone-media">
        {zone.video ? (
          <AutoVideo src={zone.video} poster={zone.poster} />
        ) : (
          <img src={zone.image} alt="" loading="lazy" />
        )}
        <span className={`badge ${zone.accent === 'cyan' ? 'solid-lime' : zone.accent === 'lime' ? 'lime' : 'solid-magenta'}`}>
          {zone.badge}
        </span>
        {zone.video && (
          <span className="zone-live tech">
            <span className="dot red" style={{ animation: 'pulse-dot 1.4s infinite' }} /> Live
          </span>
        )}
        <div className="zone-title">
          <span className="tech">{zone.klass}</span>
          <h3 className="h3">{zone.title}</h3>
        </div>
      </div>
      <div className="zone-body">
        <div className="spec-list">
          {zone.specs.map(([k, v]) => (
            <div className="spec-row" key={k}>
              <span>{k}:</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
        <div className="zone-foot">
          <div className="price">
            <small>ТАРИФ</small>
            <b>
              от {zone.price} ₽<span>/час</span>
            </b>
          </div>
          <button className={zone.id === 'vip' ? 'btn btn-vip btn-sm' : 'btn btn-ghost btn-sm'} onClick={() => onPick(zone.id)}>
            {zone.cta}
          </button>
        </div>
      </div>
    </motion.article>
    </motion.div>
  )
}

export default function Zones({ onPickZone }) {
  const [open, setOpen] = useState(false)

  const pick = (id) => {
    onPickZone(id)
    scrollToId('booking')
  }

  return (
    <section className="section" id="zones">
      <div className="container">
        <SectionHead
          eyebrow="// Селекция боевых зон"
          title={
            <>
              Зоны клуба и <span className="text-cyan">аппаратные</span> классы
            </>
          }
          lead="Каждая комната спроектирована под свои задачи: от индивидуального соло-ранкеда до закрытых сквад-буткемпов и стриминга."
        />

        <div className="zones-grid">
          {ZONES.map((z, i) => (
            <ZoneCard key={z.id} zone={z} index={i} onPick={pick} />
          ))}
        </div>

        <motion.div
          className="compare glass"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <button className="compare-toggle" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span>
              <Icon name="tune" />
              <span className="h3" style={{ fontSize: '1rem' }}>
                Сравнение оборудования и девайсов
              </span>
            </span>
            <Icon name="expand_more" className="chev" />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                className="compare-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <div className="table-wrap" data-lenis-prevent>
                  <table>
                    <thead>
                      <tr>
                        <th>Параметр</th>
                        {COMPARISON.cols.map((c) => (
                          <th key={c}>{c}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.rows.map((r, i) => (
                        <motion.tr
                          key={r[0]}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 + i * 0.04 }}
                        >
                          {r.map((c, j) => (
                            <td key={j}>{c}</td>
                          ))}
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
