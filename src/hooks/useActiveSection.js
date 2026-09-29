import { useEffect, useState } from 'react'

// Какая секция сейчас в центре экрана — для подсветки пункта меню.
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [ids])
  return active
}
