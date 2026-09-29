import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { MENU } from '../data/content'
import Icon from './Icon'
import { EASE, SectionHead } from './Reveal'

function ParallaxPhoto({ src, label, className, speed }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`])
  const wrapY = useTransform(scrollYProgress, [0, 1], [speed * 3, -speed * 3])
  return (
    <motion.div ref={ref} className={`photo ${className}`} style={{ y: wrapY }}>
      <motion.img src={src} alt={label} loading="lazy" style={{ y, marginTop: '-12%' }} />
      <span className="badge magenta">{label}</span>
    </motion.div>
  )
}

export default function Bar() {
  return (
    <section className="section" id="bar">
      <div className="container bar-grid">
        <div>
          <SectionHead
            eyebrow="// Топливо для побед"
            eyebrowClass="magenta"
            title={
              <>
                Кибер-бар & <span className="text-magenta">крафтовое</span> меню
              </>
            }
          />
          <p className="lead" style={{ marginTop: '-1rem' }}>
            Доставка прямо к твоему игровому месту через софт управления или chill в отдельной лаундж-зоне с мягкими
            диванами и приставками.
          </p>
          <motion.div
            className="menu"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          >
            {MENU.map((m) => (
              <motion.div
                key={m.title}
                className="menu-item"
                variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } }}
              >
                <div>
                  <Icon name={m.icon} />
                  <span>
                    <b>{m.title}</b>
                    <small>{m.note}</small>
                  </span>
                </div>
                <span className="cost">{m.price}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="bar-photos">
          <ParallaxPhoto src="/img/bar.jpg" label="Bar counter" className="tall" speed={6} />
          <ParallaxPhoto src="/img/lounge.jpg" label="Console lounge 4K" className="short" speed={10} />
        </div>
      </div>
    </section>
  )
}
