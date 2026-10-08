import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { HERO_STATS } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { Rich, useLang } from '../i18n'
import AutoVideo from './AutoVideo'
import Counter from './Counter'
import Icon from './Icon'
import { EASE } from './Reveal'

export default function Hero({ ready }) {
  const { t, tr } = useLang()
  const ref = useRef(null)
  // Строки заголовка: каждая «выезжает» отдельно, *строка* — акцентная.
  const lines = t('hero.title')
    .split('\n')
    .map((l) => ({ text: l.replace(/\*/g, ''), accent: l.startsWith('*') }))
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Параллакс: видео уезжает медленнее, контент — быстрее и гаснет.
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -120])
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const show = ready ? 'show' : 'hidden'

  return (
    <section className="hero" id="top" ref={ref}>
      <motion.div className="hero-video" style={{ y: videoY, scale: videoScale }}>
        <AutoVideo src="/media/background.mp4" poster="/media/background-poster.jpg" threshold={0} />
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
            <span className="dot cyan" /> {t('hero.chip')}
          </motion.div>

          <motion.h1
            key={t('hero.title')}
            className="h1"
            initial="hidden"
            animate={show}
            variants={{ show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } } }}
          >
            {lines.map((l) => (
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
            <Rich text={t('hero.lead')} tag="strong" />
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
              <Icon name="sports_esports" /> {t('hero.book')}
            </a>
            <a
              href="#zones"
              className="btn btn-ghost"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('zones')
              }}
            >
              <Icon name="memory" /> {t('hero.configs')}
            </a>
          </motion.div>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {HERO_STATS.map((s, i) => (
              <div key={i}>
                <b>
                  {s.text ?? (
                    <>
                      {ready ? <Counter value={s.value} duration={1.6} /> : 0}
                      <span className="text-cyan">{s.suffix}</span>
                    </>
                  )}
                </b>
                <span className="tech">{tr(s.label)}</span>
              </div>
            ))}
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
