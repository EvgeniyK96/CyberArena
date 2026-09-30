import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { NAV } from '../data/content'
import { lockScroll, scrollToId } from '../hooks/useSmoothScroll'
import { LANGS, useLang } from '../i18n'
import Icon from './Icon'

// Переключатель языка ҚАЗ / РУС. id нужен, чтобы «пилюли» в шапке и в мобильном меню анимировались независимо.
function LangSwitch({ id }) {
  const { lang, setLang, t } = useLang()
  return (
    <div className="lang-switch" role="group" aria-label={t('lang.aria')}>
      {LANGS.map((l) => (
        <button
          key={l.id}
          type="button"
          lang={l.id}
          className={lang === l.id ? 'on' : ''}
          aria-pressed={lang === l.id}
          title={l.name}
          onClick={() => setLang(l.id)}
        >
          {lang === l.id && <motion.span layoutId={`lang-pill-${id}`} className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
          {l.label}
        </button>
      ))}
    </div>
  )
}

export default function Header({ active }) {
  const { t, tr } = useLang()
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
                <span className="dot" /> {t('topbar.open')}
              </span>
              <span className="sep">•</span>
              <span>
                <Icon name="computer" /> {t('topbar.pcs')}
              </span>
              <span className="sep">•</span>
              <span>
                <Icon name="speed" /> {t('topbar.ping')}
              </span>
            </div>
            <div className="topbar-right">
              <span className="text-magenta">
                <Icon name="emoji_events" /> {t('topbar.major')}
              </span>
              <a href="#tournaments" onClick={go('tournaments')}>
                {t('topbar.register')}
              </a>
            </div>
          </div>
        </div>

        <div className="navbar">
          <div className="container">
            <a href="#top" className="brand" onClick={go('top')} aria-label={t('header.home')}>
              <img src="/img/logo-mark.png" alt="" width="44" height="44" />
              <span className="brand-name">
                <b>NEXUS</b>
                <small>CYBER ARENA</small>
              </span>
            </a>

            <nav className="nav" aria-label={t('header.nav')}>
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`} onClick={go(n.id)} className={active === n.id ? 'active' : ''}>
                  {tr(n.label)}
                  {active === n.id && <motion.span layoutId="nav-ind" className="nav-indicator" />}
                </a>
              ))}
            </nav>

            <div className="nav-actions">
              <LangSwitch id="header" />
              <a href="#booking" className="btn btn-primary btn-sm" onClick={go('booking')}>
                {t('header.book')}
              </a>
              <button className="icon-btn account" aria-label={t('header.account')} title={t('header.accountTitle')}>
                <Icon name="person" />
              </button>
              <button className="icon-btn burger" aria-label={t('header.openMenu')} aria-expanded={open} onClick={() => setMenu(true)}>
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
            aria-label={t('header.menu')}
          >
            <div className="mobile-menu-top">
              <span className="brand">
                <img src="/img/logo-mark.png" alt="" width="40" height="40" />
                <span className="brand-name">
                  <b>NEXUS</b>
                  <small>CYBER ARENA</small>
                </span>
              </span>
              <LangSwitch id="menu" />
              <button className="icon-btn" aria-label={t('header.closeMenu')} onClick={() => setMenu(false)}>
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
                  {tr(n.label)}
                  <Icon name="arrow_forward" />
                </motion.a>
              ))}
            </nav>
            <a href="#booking" className="btn btn-primary btn-block" onClick={go('booking')}>
              <Icon name="sports_esports" /> {t('header.book')}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const TABS = [
  { id: 'top', icon: 'sports_esports' },
  { id: 'zones', icon: 'grid_view' },
  { id: 'booking', icon: 'power_settings_new', center: true },
  { id: 'games', icon: 'stadia_controller' },
  { id: 'tournaments', icon: 'trophy' },
]

export function TabBar({ active }) {
  const { t } = useLang()
  return (
    <nav className="tabbar" aria-label={t('tabbar.aria')}>
      {TABS.map((tab) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          className={`${tab.center ? 'center' : ''} ${active === tab.id || (!active && tab.id === 'top') ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault()
            scrollToId(tab.id)
          }}
        >
          {tab.center && <span className="pro">PRO</span>}
          <Icon name={tab.icon} />
          {t(`tabbar.${tab.id}`)}
        </a>
      ))}
    </nav>
  )
}
