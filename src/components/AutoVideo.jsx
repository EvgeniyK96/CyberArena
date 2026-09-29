import { forwardRef, useEffect, useRef } from 'react'

// Видео, которое играет только пока видно на экране (экономит CPU/батарею).
const AutoVideo = forwardRef(function AutoVideo({ src, poster, className, threshold = 0.15, ...rest }, outerRef) {
  const ref = useRef(null)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {})
        else v.pause()
      },
      { threshold },
    )
    io.observe(v)
    return () => io.disconnect()
  }, [threshold])

  return (
    <video
      ref={(node) => {
        ref.current = node
        if (typeof outerRef === 'function') outerRef(node)
        else if (outerRef) outerRef.current = node
      }}
      className={className}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
      {...rest}
    />
  )
})

export default AutoVideo
