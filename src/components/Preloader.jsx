import { animate, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LOG = ['BOOT NEXUS-OS', 'SYNC 60 NODES', 'LINK 10GB/S', 'READY']

// Короткая «загрузка системы» перед показом hero.
export default function Preloader({ onDone }) {
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const c = animate(0, 100, {
      duration: 1.4,
      ease: [0.6, 0, 0.3, 1],
      onUpdate: (v) => setPct(Math.round(v)),
      onComplete: () => setTimeout(onDone, 200),
    })
    return () => c.stop()
  }, [onDone])

  return (
    <motion.div
      className="preloader"
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 0.7, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="preloader-inner">
        <motion.img src="/img/logo-mark.png" alt="" initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.6 }} />
        <div className="brand-name" style={{ justifyItems: 'center' }}>
          <b>NEXUS</b>
          <small>CYBER ARENA</small>
        </div>
        <div className="preloader-bar">
          <span style={{ transform: `scaleX(${pct / 100})` }} />
        </div>
        <div className="preloader-log tech">
          <span>{LOG[Math.min(LOG.length - 1, Math.floor(pct / 26))]}</span>
          <span className="text-cyan">{pct}%</span>
        </div>
      </div>
    </motion.div>
  )
}
