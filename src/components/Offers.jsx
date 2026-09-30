import { motion } from 'framer-motion'
import { OFFERS } from '../data/content'
import { scrollToId } from '../hooks/useSmoothScroll'
import { Rich, useLang } from '../i18n'
import AutoVideo from './AutoVideo'
import Icon from './Icon'
import { EASE, Reveal, SectionHead } from './Reveal'

export default function Offers({ onToast }) {
  const { t, tr } = useLang()
  const copy = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      onToast(t('offers.copied', { code }))
    } catch {
      onToast(t('offers.promo', { code }))
    }
  }

  return (
    <section className="section" id="offers">
      <div className="container">
        <SectionHead
          eyebrow={t('offers.eyebrow')}
          eyebrowClass="lime"
          title={<Rich text={t('offers.title')} className="text-lime" />}
          lead={t('offers.lead')}
        />
        <div className="offers-grid">
          {OFFERS.map((o, i) => (
            <motion.article
              key={o.icon}
              className={`offer ${o.accent}`}
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              whileHover={{ y: -8 }}
            >
              <Icon name={o.icon} />
              <h3>{tr(o.title)}</h3>
              <p>{tr(o.text)}</p>
              <div className="offer-foot tech">
                <span>{o.code ? t('offers.promo', { code: o.code }) : tr(o.foot)}</span>
                {o.code && (
                  <button className="copy-btn" onClick={() => copy(o.code)}>
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
            <span className="eyebrow magenta">{t('offers.ctaEyebrow')}</span>
            <h2 className="h2" style={{ margin: 0 }}>
              <Rich text={t('offers.ctaTitle')} className="text-magenta" />
            </h2>
            <p className="lead">{t('offers.ctaLead')}</p>
            <a
              href="#booking"
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('booking')
              }}
            >
              <Icon name="bolt" fill /> {t('offers.ctaBtn')}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
