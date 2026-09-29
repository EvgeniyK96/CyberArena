import { motion } from 'framer-motion'
import { GAMES } from '../data/content'
import Icon from './Icon'
import { SectionHead } from './Reveal'

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Games() {
  return (
    <section className="section" id="games">
      <div className="container">
        <SectionHead
          eyebrow="// Предустановленный софт и игры"
          eyebrowClass="magenta"
          title={
            <>
              Библиотека игр <span className="text-magenta">без задержек</span>
            </>
          }
          lead="Все клиенты обновляются автоматически через локальный NVMe кэш-сервер на 10 Гбит/с. Заходи и играй на своих или клубных Prime-аккаунтах."
        />
        <motion.div
          className="games-grid"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.06 } } }}
        >
          {GAMES.map((g) => (
            <motion.div
              key={g.title}
              className={`game ${g.tag}`}
              onMouseMove={spotlight}
              variants={{
                hidden: { opacity: 0, y: 40, rotateY: -30 },
                show: { opacity: 1, y: 0, rotateY: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
              }}
              whileHover={{ y: -6 }}
            >
              <span className="ready tech">
                <Icon name="download_done" /> Ready
              </span>
              <Icon name={g.icon} />
              <b>{g.title}</b>
              <small className="tech">{g.note}</small>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
