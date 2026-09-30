import { motion } from 'framer-motion'
import { GAMES } from '../data/content'
import { Rich, useLang } from '../i18n'
import Icon from './Icon'
import { SectionHead } from './Reveal'

const spotlight = (e) => {
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

export default function Games() {
  const { t } = useLang()
  return (
    <section className="section" id="games">
      <div className="container">
        <SectionHead
          eyebrow={t('games.eyebrow')}
          eyebrowClass="magenta"
          title={<Rich text={t('games.title')} className="text-magenta" />}
          lead={t('games.lead')}
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
