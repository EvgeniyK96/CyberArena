import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { AEGIS_FEATURES } from '../data/content'
import { Rich, useLang } from '../i18n'
import AutoVideo from './AutoVideo'

function Stat({ f, i, progress }) {
  const { tr } = useLang()
  const start = 0.45 + i * 0.08
  const opacity = useTransform(progress, [start, start + 0.08], [0, 1])
  const y = useTransform(progress, [start, start + 0.08], [40, 0])
  return (
    <motion.div className="aegis-stat" style={{ opacity, y }}>
      <b>
        {f.k}
        {f.u && <small>{f.u}</small>}
      </b>
      <p>{tr(f.label)}</p>
    </motion.div>
  )
}

// Секция закреплена на экране, пока пользователь прокручивает ~3 экрана:
// видео раскрывается из «окна» на весь экран, затем появляются характеристики.
export default function AegisShowcase() {
  const { t } = useLang()
  const ref = useRef(null)
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const inset = useTransform(p, [0, 0.35], [18, 0])
  const insetX = useTransform(p, [0, 0.35], [28, 0])
  const radius = useTransform(p, [0, 0.35], [24, 0])
  const clipPath = useMotionTemplate`inset(${inset}% ${insetX}% ${inset}% ${insetX}% round ${radius}px)`
  const mediaScale = useTransform(p, [0, 0.35, 1], [1.25, 1, 1.08])

  const introOpacity = useTransform(p, [0, 0.08, 0.3, 0.42], [0, 1, 1, 0])
  const introScale = useTransform(p, [0.3, 0.42], [1, 1.25])
  const introY = useTransform(p, [0, 0.1], [60, 0])

  const reticleRotate = useTransform(p, [0, 1], [0, 180])
  const reticleScale = useTransform(p, [0, 0.4, 1], [0.6, 1, 1.4])
  const reticleOpacity = useTransform(p, [0.1, 0.3, 0.8, 1], [0, 0.9, 0.6, 0])

  const hudOpacity = useTransform(p, [0.3, 0.4], [0, 1])
  const syncPct = useTransform(p, (v) => `${Math.min(100, Math.round((v / 0.9) * 100))}%`)

  return (
    <section className="aegis" id="aegis" ref={ref} aria-label={t('aegis.aria')}>
      <div className="aegis-sticky">
        <motion.div className="aegis-media" style={{ clipPath, scale: mediaScale }}>
          <AutoVideo src="/media/aegis.mp4" poster="/media/aegis-poster.jpg" threshold={0} />
        </motion.div>

        <motion.div className="aegis-reticle" style={{ rotate: reticleRotate, scale: reticleScale, opacity: reticleOpacity }} />

        <motion.div className="aegis-hud tech" style={{ opacity: hudOpacity }}>
          <span>TARGET: AEGIS // CYBERNETIC CHAMPION</span>
          <span>
            SYNC <motion.span>{syncPct}</motion.span>
          </span>
        </motion.div>

        <motion.div className="aegis-intro" style={{ opacity: introOpacity, scale: introScale, y: introY }}>
          <span className="eyebrow lime">{t('aegis.eyebrow')}</span>
          <h2 className="h1" style={{ marginTop: '1rem' }}>
            <Rich text={t('aegis.title')} className="text-lime" style={{ textShadow: '0 0 30px rgba(163,230,53,.5)' }} />
          </h2>
        </motion.div>

        <div className="aegis-steps">
          <div className="container">
            {AEGIS_FEATURES.map((f, i) => (
              <Stat key={f.k} f={f} i={i} progress={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
