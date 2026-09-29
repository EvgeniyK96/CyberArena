import { motion } from 'framer-motion'
import { OFFERS } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import AutoVideo from './AutoVideo'
import Icon from './Icon'
import { EASE, Reveal, SectionHead } from './Reveal'

export default function Offers({ onToast }) {
  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      onToast(`Промокод ${code} скопирован`)
    } catch {
      onToast(`Промокод: ${code}`)
    }
  }

  return (
    <section className="section" id="offers">
      <div className="container">
        <SectionHead
          eyebrow="// Скидки & спецтарифы"
          eyebrowClass="lime"
          title={
            <>
              Эксклюзивные офферы <span className="text-lime">для своих</span>
            </>
          }
          lead="Мы поддерживаем гейминг-культуру: покажи студенческий или приходи сквадом, чтобы забирать часы с максимальной выгодой."
        />
        <div className="offers-grid">
          {OFFERS.map((o, i) => (
            <motion.article
              key={o.title}
              className={`offer ${o.accent}`}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              <Icon name={o.icon} />
              <h3>{o.title}</h3>
              <p>{o.text}</p>
              <div className="offer-foot tech">
                <span>{o.foot}</span>
                {o.foot.startsWith('Промокод') && (
                  <button className="copy-btn" onClick={() => copy(o.foot.split(': ')[1])}>
                    <Icon name="content_copy" /> Copy
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal className="cta-banner" style={{ marginTop: 'clamp(3rem, 7vw, 5rem)' }}>
          <AutoVideo src="/media/runner.mp4" poster="/media/runner-poster.jpg" />
          <div className="cta-banner-inner">
            <span className="eyebrow magenta">// Ночной рейд • 22:00 — 08:00</span>
            <h2 className="h2" style={{ margin: 0 }}>
              Готов к <span className="text-magenta">катке</span>?
              <br />
              Место ждёт тебя
            </h2>
            <p className="lead">Бронь в два клика, без предоплаты. Код доступа к ПК придёт по SMS.</p>
            <a
              href="#booking"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('booking')
              }}
            >
              <Icon name="bolt" fill /> Забронировать сейчас
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
