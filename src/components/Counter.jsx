import { animate, useInView } from 'framer-motion'
import { useEffect, useRef } from 'react'

// Анимированное число: считает при появлении на экране и плавно
// перетекает к новому значению при изменении (итог в калькуляторе).
const defaultFormat = (n) => Math.round(n).toLocaleString('ru-RU')

export default function Counter({ value, format = defaultFormat, duration = 1.2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const current = useRef(0)

  useEffect(() => {
    if (!inView || !ref.current) return
    const controls = animate(current.current, value, {
      duration: current.current === 0 ? duration : 0.5,
      ease: [0.2, 0.7, 0.2, 1],
      onUpdate: (n) => {
        current.current = n
        if (ref.current) ref.current.textContent = format(n)
      },
    })
    return () => controls.stop()
  }, [inView, value, duration, format])

  return <span ref={ref}>{format(0)}</span>
}
