import { motion, useMotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HERO_STATS } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import AutoVideo from './AutoVideo'
import Counter from './Counter'
import Icon from './Icon'
import { EASE } from './Reveal'

const LINES = [
  { text: 'Твой портал в' },
  { text: 'киберспорт', accent: true },
  { text: 'высшей лиги' },
]

export default function Hero({ ready }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Параллакс: видео уезжает медленнее, контент — быстрее и гаснет.
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60])

  // 3D-наклон карточки героя за курсором.
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 18 })
  const imgX = useSpring(useTransform(mx, [-0.5, 0.5], [14, -14]), { stiffness: 120, damping: 20 })
  const imgY = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 120, damping: 20 })

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const show = ready ? 'show' : 'hidden'

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-video" style={{ y: videoY, scale: videoScale }}>
        <AutoVideo src="/media/club-bg.mp4" poster="/media/club-bg-poster.jpg" threshold={0} />
      </motion.div>
      <div className="hero-shade" />
      <div className="hero-scanlines" />

      <div className="container hero-grid">
        <motion.div className="hero-copy" style={{ y: copyY, opacity: copyOpacity }}>
          <motion.div
            className="hero-chip tech text-cyan"
            initial={{ opacity: 0, x: -30 }}
            animate={ready ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="dot cyan" /> Киберспортивный кластер 2025 • Москва
          </motion.div>

          <motion.h1
            className="h1"
            initial="hidden"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            {LINES.map((l) => (
              <span className="line" key={l.text}>
                <motion.span
                  className={l.accent ? 'accent' : ''}
                  variants={{
                    hidden: { y: '110%', skewY: 6 },
                    show: { y: '0%', skewY: 0, transition: { duration: 0.9, ease: EASE } },
                  }}
                >
                  {l.text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            className="lead"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
          >
            Топовые боевые станции на базе <strong>RTX 4090</strong> и <strong>Core i9-14900K</strong>, киберспортивные
            матрицы 360Hz Fast-IPS, эргономика Herman Miller Embody и бескомпромиссная атмосфера LAN-турниров мирового
            класса.
          </motion.p>

          <motion.div
            className="hero-ctas"
            initial={{ opacity: 0, y: 20 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
          >
            <a
              href="#booking"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('booking')
              }}
            >
              <Icon name="sports_esports" /> Забронировать место
            </a>
            <a
              href="#zones"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('zones')
              }}
            >
              <Icon name="memory" /> Конфигурации ПК
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {HERO_STATS.map((s) => (
              <div key={s.label}>
                <b>
                  {s.text ?? (
                    <>
                      {ready ? <Counter value={s.value} duration={1.6} /> : 0}
                      <span className="text-cyan">{s.suffix}</span>
                    </>
                  )}
                </b>
                <span className="tech">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.9, rotateY: -20 }}
          animate={ready ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
        >
          <motion.div className="hero-card" style={{ rotateX: rx, rotateY: ry }}>
            <motion.img
              src="/img/hero.jpg"
              alt="Кибер-солдат в тактической броне — маскот арены"
              style={{ x: imgX, y: imgY }}
            />
            <motion.div
              className="hero-scan"
              initial={{ top: '-30%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'linear', repeatDelay: 1.5 }}
            />
            <div className="hero-hud">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="dot" />
                <div>
                  <p className="title">ONLINE PROTOCOL ACTIVE</p>
                  <p className="sub tech">NODE: MSK-ARENA-CORE // 360FPS LOCKED</p>
                </div>
              </div>
              <Icon name="verified" className="text-cyan" />
            </div>
          </motion.div>
          <div className="hero-frame">
            <i />
            <i />
            <i />
            <i />
          </div>

          <motion.div
            className="float-chip one badge lime"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Icon name="memory" /> RTX 4090 24GB
          </motion.div>
          <motion.div
            className="float-chip two badge magenta"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            <Icon name="monitor" /> 540Hz OLED
          </motion.div>
        </motion.div>
      </div>

      <motion.div className="scroll-cue tech" style={{ opacity: copyOpacity }}>
        <span className="mouse" />
        Scroll
      </motion.div>
    </section>
  )
}
