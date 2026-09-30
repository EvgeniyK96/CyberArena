import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { PACKAGES, SEAT_ZONES } from '../data/content'
import { lockScroll } from '../hooks/useSmoothScroll'
import { Rich, useLang } from '../i18n'
import Counter from './Counter'
import Icon from './Icon'
import { EASE, SectionHead } from './Reveal'

const pad = (n) => String(n).padStart(2, '0')
const seatId = (zone, n) => `${zone.prefix}-${pad(n)}`

const FILTERS = [{ id: 'all' }, ...SEAT_ZONES.map((z) => ({ id: z.id, label: z.title.split(' ')[0] }))]

const totalFree = SEAT_ZONES.reduce((a, z) => a + (z.to - z.from + 1 - z.busy.length), 0)
const totalBusy = SEAT_ZONES.reduce((a, z) => a + z.busy.length, 0)

function priceFor(zone, pkg) {
  return pkg.night ? zone.night : zone.price * pkg.mult
}

// +7 (701) 450-88-21 — казахстанские номера тоже начинаются с +7
function formatPhone(raw) {
  let d = raw.replace(/\D/g, '')
  // вставили «8999…» или «+7 999…» поверх префикса «+7»
  if (d.length > 11 && /^7[78]/.test(d)) d = d.slice(1)
  if (d.startsWith('8')) d = '7' + d.slice(1)
  if (!d.startsWith('7')) d = '7' + d
  d = d.slice(0, 11)
  const p = d.slice(1)
  let out = '+7'
  if (p.length) out += ' (' + p.slice(0, 3)
  if (p.length >= 3) out += ')'
  if (p.length > 3) out += ' ' + p.slice(3, 6)
  if (p.length > 6) out += '-' + p.slice(6, 8)
  if (p.length > 8) out += '-' + p.slice(8, 10)
  return out
}

export default function Booking({ pickedZone }) {
  const { t, tr, money } = useLang()
  const [filter, setFilter] = useState('all')
  const [seat, setSeat] = useState({ zone: 'standard', num: 17 })
  const [pkgId, setPkgId] = useState('3h')
  const [student, setStudent] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [touched, setTouched] = useState(false)
  const [done, setDone] = useState(false)

  // Клик «Бронь» в карточке зоны → фильтруем карту и выбираем первое свободное место.
  useEffect(() => {
    if (!pickedZone) return
    const z = SEAT_ZONES.find((s) => s.id === pickedZone.id)
    if (!z) return
    setFilter(z.id)
    for (let n = z.from; n <= z.to; n++) {
      if (!z.busy.includes(n)) {
        setSeat({ zone: z.id, num: n })
        break
      }
    }
  }, [pickedZone])

  const zone = SEAT_ZONES.find((z) => z.id === seat.zone)
  const pkg = PACKAGES.find((p) => p.id === pkgId)
  const base = priceFor(zone, pkg)
  const total = student ? base * 0.8 : base
  const phoneOk = phone.replace(/\D/g, '').length === 11
  const step = !seat ? 0 : !pkg ? 1 : phoneOk ? 3 : 2

  const summary = useMemo(
    () => [
      [t('booking.sumSeat'), `${seatId(zone, seat.num)} • ${zone.title}`],
      [t('booking.sumPackage'), `${tr(pkg.title)}${pkg.night ? ' (22:00 — 08:00)' : ''}`],
      [t('booking.sumPlayer'), name || t('booking.guest')],
      [t('booking.sumPhone'), phone],
      [t('booking.sumTotal'), money(total)],
    ],
    // t/tr/money меняются вместе с языком
    [zone, seat, pkg, name, phone, total, t, tr, money],
  )

  const submit = () => {
    setTouched(true)
    if (!phoneOk) return
    // TODO(backend): POST /api/bookings { seat, package, name, phone, student }
    setDone(true)
    lockScroll(true)
  }

  const close = () => {
    setDone(false)
    lockScroll(false)
  }

  return (
    <section className="section" id="booking">
      <div className="container">
        <SectionHead
          eyebrow={
            <>
              <span className="dot" /> {t('booking.eyebrow')}
            </>
          }
          eyebrowClass="lime"
          title={<Rich text={t('booking.title')} className="text-cyan" />}
          aside={
            <div className="booking-head-badges">
              <span className="badge lime">
                <span className="dot" /> {t('booking.free', { n: totalFree })}
              </span>
              <span className="badge red">
                <span className="dot red" /> {t('booking.busy', { n: totalBusy })}
              </span>
              <span className="badge">
                <span className="dot cyan" /> {t('booking.yours')}
              </span>
            </div>
          }
        />

        <div className="booking-grid">
          <motion.div
            className="map-panel glass"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <div className="map-top tech">
              <span className="text-cyan">
                <Icon name="domain" /> {t('booking.plan')}
              </span>
              <span className="text-lime">
                <Icon name="sync" /> Online sync
              </span>
            </div>

            <div className="zone-filter" role="tablist" aria-label={t('booking.filterAria')}>
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  role="tab"
                  aria-selected={filter === f.id}
                  className={filter === f.id ? 'on' : ''}
                  onClick={() => setFilter(f.id)}
                >
                  {filter === f.id && <motion.span layoutId="zone-pill" className="pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />}
                  {f.label ?? t('booking.filterAll')}
                </button>
              ))}
            </div>

            {SEAT_ZONES.map((z) => (
              <div key={z.id} className={`seat-zone ${filter !== 'all' && filter !== z.id ? 'dim' : ''}`}>
                <div className="seat-zone-head">
                  <b className={`text-${z.accent}`}>
                    <Icon name={z.icon} /> {z.title}
                    <span className="muted" style={{ fontWeight: 500 }}>
                      ({z.range})
                    </span>
                  </b>
                  <span className="badge">{z.spec}</span>
                </div>
                <motion.div
                  className="seats"
                  style={{ '--cols': z.cols, '--mcols': z.cols === 6 ? 3 : 5 }}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={{ show: { transition: { staggerChildren: 0.025 } } }}
                >
                  {Array.from({ length: z.to - z.from + 1 }, (_, i) => z.from + i).map((n) => {
                    const busy = z.busy.includes(n)
                    const selected = seat.zone === z.id && seat.num === n
                    return (
                      <motion.button
                        key={n}
                        type="button"
                        className={`seat ${selected ? 'selected' : ''}`}
                        disabled={busy}
                        aria-pressed={selected}
                        aria-label={`${seatId(z, n)} — ${t(busy ? 'booking.seatBusy' : 'booking.seatFree')}`}
                        onClick={() => {
                          setSeat({ zone: z.id, num: n })
                          if (filter !== 'all' && filter !== z.id) setFilter(z.id)
                        }}
                        variants={{ hidden: { opacity: 0, scale: 0.6 }, show: { opacity: 1, scale: 1 } }}
                        whileTap={busy ? undefined : { scale: 0.9 }}
                      >
                        {selected && <span className="tag">{t('booking.selected')}</span>}
                        {seatId(z, n)}
                        <i />
                      </motion.button>
                    )
                  })}
                </motion.div>
              </div>
            ))}
          </motion.div>

          <motion.aside
            className="checkout"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            aria-label={t('booking.aria')}
          >
            <div className="stepper tech">
              {[t('booking.step1'), t('booking.step2'), t('booking.step3')].map((s, i) => (
                <div key={s} className={`step ${step > i ? 'done' : ''}`}>
                  <div className="bar">
                    <motion.span initial={false} animate={{ scaleX: step > i ? 1 : 0 }} transition={{ duration: 0.5, ease: EASE }} />
                  </div>
                  {s}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${seat.zone}-${seat.num}`}
                className="pc-card"
                initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="pc-card-top">
                  <div>
                    <h4>
                      <span className="dot cyan" /> ПК #{pad(seat.num)}
                    </h4>
                    <p>{zone.title}</p>
                  </div>
                  <span className={`badge ${zone.accent === 'cyan' ? '' : zone.accent}`}>{zone.gpu}</span>
                </div>
                <div className="chips">
                  <span className="chip">
                    <Icon name="memory" /> {zone.cpu}
                  </span>
                  {zone.chips.map((c) => (
                    <span className="chip" key={c}>
                      {c}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div>
              <div className="field-label tech">
                <span>{t('booking.pickPackage')}</span>
                <span className="text-magenta">{t('booking.noPrepay')}</span>
              </div>
              <div className="packages">
                {PACKAGES.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    className={`pkg ${p.night ? 'night' : ''} ${pkgId === p.id ? 'on' : ''}`}
                    onClick={() => setPkgId(p.id)}
                    whileTap={{ scale: 0.96 }}
                    aria-pressed={pkgId === p.id}
                  >
                    {p.hit && <span className="badge solid-magenta hit">{t('booking.hit')}</span>}
                    <b>{tr(p.title)}</b>
                    <small>{tr(p.note)}</small>
                    <span className="pkg-price">{money(priceFor(zone, p))}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="toggle-row">
              <span>
                <Icon name="school" />
                <span>
                  <b>{t('booking.student')}</b>
                  <small>{t('booking.studentNote')}</small>
                </span>
              </span>
              <button type="button" role="switch" aria-checked={student} aria-label={t('booking.student')} className="switch" onClick={() => setStudent(!student)}>
                <motion.span className="knob" layout transition={{ type: 'spring', stiffness: 600, damping: 30 }} style={{ left: student ? 25 : 3 }} />
              </button>
            </div>

            <div className="inputs">
              <div className="field-label tech" style={{ marginBottom: 0 }}>
                <span>{t('booking.playerData')}</span>
                <span className="text-cyan">Auth required</span>
              </div>
              <input className="input" placeholder={t('booking.namePh')} value={name} onChange={(e) => setName(e.target.value)} autoComplete="nickname" />
              <input
                className={`input ${touched && !phoneOk ? 'invalid' : ''}`}
                placeholder="+7 (___) ___-__-__"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                value={phone}
                onFocus={() => !phone && setPhone('+7')}
                onChange={(e) => setPhone(e.target.value.length < 3 ? e.target.value : formatPhone(e.target.value))}
              />
              {touched && !phoneOk && <small style={{ color: '#fca5a5' }}>{t('booking.phoneErr')}</small>}
            </div>

            <div className="total">
              <div>
                <span className="tech muted">{t('booking.total')}</span>
                <AnimatePresence>
                  {student && (
                    <motion.div className="old" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                      {money(base)}
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="tech text-lime">{t('booking.noFee')}</span>
              </div>
              <div className="total-sum">
                <Counter value={total} duration={0.8} /> ₸
              </div>
            </div>

            <button type="button" className="btn btn-primary btn-block" onClick={submit} style={{ minHeight: 56 }}>
              <Icon name="bolt" fill /> {t('booking.submit')}
            </button>
            <div className="checkout-note">
              <span>
                <Icon name="lock" /> {t('booking.hold')}
              </span>
              <span>
                <Icon name="verified_user" /> Nexus Safe Shield
              </span>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {done && (
          <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
            <motion.div
              className="modal"
              role="dialog"
              aria-modal="true"
              aria-label={t('booking.doneAria')}
              initial={{ scale: 0.85, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={close} aria-label={t('booking.close')}>
                <Icon name="close" />
              </button>
              <motion.div className="big-ic" initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring' }}>
                <Icon name="check" />
              </motion.div>
              <h3>{t('booking.doneTitle')}</h3>
              <p>{t('booking.doneText')}</p>
              <div className="modal-summary">
                {summary.map(([k, v]) => (
                  <div key={k}>
                    <span>{k}</span>
                    <b>{v}</b>
                  </div>
                ))}
              </div>
              <button className="btn btn-primary btn-block" onClick={close}>
                {t('booking.gg')}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
