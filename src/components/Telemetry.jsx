import { motion, useAnimationFrame, useMotionValue, useScroll, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useRef } from 'react'
import { TELEMETRY } from '../data/content'
import { useLang } from '../i18n'
import Icon from './Icon'

const wrap = (min, max, v) => {
  const r = max - min
  return ((((v - min) % r) + r) % r) + min
}

// Бесконечная лента: ускоряется и меняет направление вместе со скроллом.
export default function Telemetry() {
  const { t, tr } = useLang()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 5], { clamp: false })
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)
  const dir = useRef(-1)

  useAnimationFrame((_, delta) => {
    const f = factor.get()
    if (f < 0) dir.current = 1
    else if (f > 0) dir.current = -1
    const move = dir.current * 1.6 * (delta / 1000) * (1 + Math.abs(f))
    baseX.set(baseX.get() + move)
  })

  const group = (key) => (
    <div className="marquee-group tech" key={key} aria-hidden={key === 'b'}>
      {TELEMETRY.map((m, i) => (
        <span key={i} className={`marquee-item ${m.dot ? 'live' : ''}`}>
          {m.dot ? <span className="dot" /> : <Icon name={m.icon} />}
          {m.text && <span>{tr(m.text)}:</span>}
          <strong>{tr(m.strong)}</strong>
          <span className="marquee-sep">//</span>
        </span>
      ))}
    </div>
  )

  return (
    <section className="telemetry" aria-label={t('telemetry.aria')}>
      <motion.div className="marquee" style={{ x }}>
        {group('a')}
        {group('b')}
      </motion.div>
    </section>
  )
}
