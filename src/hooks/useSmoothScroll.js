import { useEffect } from 'react'
import Lenis from 'lenis'

let lenis = null

// Плавная прокрутка к якорю; работает и без Lenis (reduced motion).
export function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const offset = window.innerWidth < 768 ? -60 : -70
  // Абсолютная координата: не зависит от внутреннего состояния Lenis.
  const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY + offset)
  if (lenis) lenis.scrollTo(top, { duration: 1.4 })
  else window.scrollTo({ top, behavior: 'smooth' })
}

export function lockScroll(locked) {
  document.body.classList.toggle('no-scroll', locked)
  if (!lenis) return
  locked ? lenis.stop() : lenis.start()
}

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    let raf
    const loop = (t) => {
      lenis.raf(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      lenis = null
    }
  }, [])
}
