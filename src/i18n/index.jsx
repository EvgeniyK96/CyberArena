import { createContext, Fragment, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { UI } from './ui'

// Мультиязычность: русский и казахский.
// Переводимое значение — объект { ru, kk }; обычная строка одинакова для обоих языков.

export const LANGS = [
  { id: 'kk', label: 'ҚАЗ', name: 'Қазақша' },
  { id: 'ru', label: 'РУС', name: 'Русский' },
]
const DEFAULT_LANG = 'ru'
const STORAGE_KEY = 'nexus-lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (LANGS.some((l) => l.id === saved)) return saved
  } catch {
    // localStorage недоступен (приватный режим) — берём язык браузера
  }
  return navigator.language?.toLowerCase().startsWith('kk') ? 'kk' : DEFAULT_LANG
}

const isPair = (v) => v !== null && typeof v === 'object' && !Array.isArray(v) && 'ru' in v

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(initialLang)

  const setLang = useCallback((next) => {
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // не критично: выбор просто не запомнится
    }
  }, [])

  const value = useMemo(() => {
    const tr = (v) => (isPair(v) ? (v[lang] ?? v.ru) : v)
    // t('key', { n: 5 }) → строка из UI с подстановкой {n}
    const t = (key, params) => {
      let s = tr(UI[key]) ?? key
      if (params) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in params ? params[k] : m))
      return s
    }
    // ru-RU для обоих языков: kk-KZ в браузерах даёт «2,900», а в Казахстане пишут «2 900»
    const money = (n) => `${Math.round(n).toLocaleString('ru-RU')}\u00a0₸` // неразрывный пробел перед ₸
    return { lang, setLang, tr, t, money }
  }, [lang, setLang])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = value.t('meta.title')
    document.querySelector('meta[name="description"]')?.setAttribute('content', value.t('meta.description'))
  }, [lang, value])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}

// Текст с разметкой: *акцент* → <Tag className style>, перенос строки → <br />.
// Позволяет переводчику менять порядок слов вместе с выделением.
export function Rich({ text, tag: Tag = 'span', className, style }) {
  return text.split('\n').map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line.split('*').map((part, j) =>
        j % 2 ? (
          <Tag key={j} className={className} style={style}>
            {part}
          </Tag>
        ) : (
          part
        ),
      )}
    </Fragment>
  ))
}
