import { motion } from 'framer-motion'

const EASE = [0.2, 0.7, 0.2, 1]

// Появление элемента при прокрутке.
export function Reveal({ as = 'div', children, delay = 0, y = 40, x = 0, className, once = true, amount = 0.25, ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </Tag>
  )
}

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
})

export const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
}

// Заголовок секции: eyebrow + H2 с построчным «выездом» + подзаголовок.
export function SectionHead({ eyebrow, eyebrowClass = '', title, lead, aside }) {
  return (
    <div className="section-head">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={stagger(0.1)}>
        <motion.span className={`eyebrow ${eyebrowClass}`} variants={item}>
          {eyebrow}
        </motion.span>
        <motion.h2 className="h2" variants={item}>
          {title}
        </motion.h2>
      </motion.div>
      {lead && (
        <Reveal as="p" className="lead" delay={0.15}>
          {lead}
        </Reveal>
      )}
      {aside}
    </div>
  )
}

export { EASE }
