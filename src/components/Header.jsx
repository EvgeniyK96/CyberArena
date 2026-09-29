import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { NAV } from '../data/content'
import { lockScroll, scrollToId } from '../hooks/useSmoothScroll'
import Icon from './Icon'

export default function Header({ active }) {
  const { scrollY } = useScroll()
  const [compact, setCompact] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Сжимаем шапку после первого экрана и прячем при скролле вниз.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setCompact(y > 40)
    setHidden(y > 600 && y > prev + 4)
    if (y < prev - 4) setHidden(false)
  })

  const go = (id) => (e) => {
    e.preventDefault()
    setMenu(false)
    scrollToId(id)
  }

  const setMenu = (v) => {
    setOpen(v)
    lockScroll(v)
  }

  return (
    <>
      <header className={`header ${compact ? 'compact' : ''} ${hidden && !open ? 'hidden' : ''}`}>
        <div className="topbar">
          <div className="container">
            <div className="topbar-left">
              <span>
                <span className="dot" /> Клуб открыт 24/7
              </span>
              <span className="sep">•</span>
              <span>
                <Icon name="computer" /> Доступно 42 / 60 ПК
              </span>
              <span className="sep">•</span>
              <span>
                <Icon name="speed" /> Пинг 1ms (Fiber Dual-WAN)
              </span>
            </div>
            <div className="topbar-right">
              <span className="text-magenta">
                <Icon name="emoji_events" /> Major Tournament Dota 2 & CS2: 500 000 ₽
              </span>
              <a href="#tournaments" onClick={go('tournaments')}>
                Регистрация
              </a>
            </div>
          </div>
        </div>

        <div className="navbar">
          <div className="container">
            <a href="#top" className="brand" onClick={go('top')} aria-label="NEXUS Cyber Arena — на главную">
              <img src="/img/logo-mark.png" alt="" width="44" height="44" />
              <span className="brand-name">
                <b>NEXUS</b>
                <small>CYBER ARENA</small>
              </span>
            </a>

            <nav className="nav" aria-label="Основная навигация">
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'active' : ''}>
                  {n.label}
                  {active === n.id && <motion.span layoutId="nav-ind" className="nav-indicator" />}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <a href="#booking" className="btn btn-primary btn-sm" onClick={go('booking')}>
                Забронировать ПК
              </a>
              <button className="icon-btn" aria-label="Личный кабинет (скоро)" title="Личный кабинет — скоро">
                <Icon name="person" />
              </button>
              <button className="icon-btn burger" aria-label="Открыть меню" aria-expanded={open} onClick={() => setMenu(true)}>
                <Icon name="menu" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: 'circle(0% at 100% 0%)' }}
            animate={{ clipPath: 'circle(150% at 100% 0%)' }}
            exit={{ clipPath: 'circle(0% at 100% 0%)' }}
            transition={{ duration: 0.55, ease: [0.7, 0, 0.2, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Меню"
          >
            <div className="mobile-menu-top">
              <span className="brand">
                <img src="/img/logo-mark.png" alt="" width="40" height="40" />
                <span className="brand-name">
                  <b>NEXUS</b>
                  <small>CYBER ARENA</small>
                </span>
              </span>
              <button className="icon-btn" aria-label="Закрыть меню" onClick={() => setMenu(false)}>
                <Icon name="close" />
              </button>
            </div>
            <nav>
              {NAV.map((n, i) => (
                <motion.a
                  key={n.id}
                  href={`#${n.id}`}
                  onClick={go(n.id)}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  {n.label}
                  <Icon name="arrow_forward" />
                </motion.a>
              ))}
            </nav>
            <a href="#booking" className="btn btn-primary btn-block" onClick={go('booking')}>
              <Icon name="sports_esports" /> Забронировать ПК
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function TabBar({ active }) {
  const tabs = [
    { id: 'top', icon: 'sports_esports', label: 'Главная' },
    { id: 'zones', icon: 'grid_view', label: 'Зоны' },
    { id: 'booking', icon: 'power_settings_new', label: 'Бронь', center: true },
    { id: 'games', icon: 'stadia_controller', label: 'Игры' },
    { id: 'tournaments', icon: 'trophy', label: 'Турниры' },
  ]
  return (
    <nav className="tabbar" aria-label="Быстрая навигация">
      {tabs.map((t) => (
        <a
          key={t.id}
          href={`#${t.id}`}
          className={`${t.center ? 'center' : ''} ${active === t.id || (!active && t.id === 'top') ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            scrollToId(t.id)
          }}
        >
          {t.center && <span className="pro">PRO</span>}
          <Icon name={t.icon} />
          {t.label}
        </a>
      ))}
    </nav>
  )
}
