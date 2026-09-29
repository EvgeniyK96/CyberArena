import { AnimatePresence, motion, MotionConfig, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import AegisShowcase from './components/AegisShowcase'
import Bar from './components/Bar'
import Booking from './components/Booking'
import Footer from './components/Footer'
import Games from './components/Games'
import Header, { TabBar } from './components/Header'
import Hero from './components/Hero'
import Icon from './components/Icon'
import Offers from './components/Offers'
import Preloader from './components/Preloader'
import Telemetry from './components/Telemetry'
import Tournaments from './components/Tournaments'
import Zones from './components/Zones'
import { NAV } from './data/content'
import { useActiveSection } from './hooks/useActiveSection'
import { useSmoothScroll } from './hooks/useSmoothScroll'

const SECTION_IDS = ['top', ...NAV.map((n) => n.id)]

function CursorGlow() {
  const x = useSpring(useMotionValue(-600), { stiffness: 120, damping: 25 })
  const y = useSpring(useMotionValue(-600), { stiffness: 120, damping: 25 })
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return
    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])
  return <motion.div className="cursor-glow" style={{ x, y }} />
}

export default function App() {
  useSmoothScroll()
  const [ready, setReady] = useState(false)
  const [pickedZone, setPickedZone] = useState(null)
  const [toast, setToast] = useState(null)
  const toastTimer = useRef()
  const active = useActiveSection(SECTION_IDS)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  const onDone = useCallback(() => setReady(true), [])

  const showToast = useCallback((text) => {
    clearTimeout(toastTimer.current)
    setToast(text)
    toastTimer.current = setTimeout(() => setToast(null), 2600)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="page-bg" />
      <CursorGlow />
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />

      <AnimatePresence>{!ready && <Preloader onDone={onDone} />}</AnimatePresence>

      <Header active={active} />
      <main>
        <Hero ready={ready} />
        <Telemetry />
        <Zones onPickZone={(id) => setPickedZone({ id, t: Date.now() })} />
        <AegisShowcase />
        <Booking pickedZone={pickedZone} />
        <Games />
        <Tournaments onToast={showToast} />
        <Bar />
        <Offers onToast={showToast} />
      </main>
      <Footer />
      <TabBar active={active} />

      <AnimatePresence>
        {toast && (
          <motion.div
            className="toast"
            role="status"
            initial={{ opacity: 0, y: 30, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 30, x: '-50%' }}
          >
            <Icon name="check_circle" /> {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  )
}
