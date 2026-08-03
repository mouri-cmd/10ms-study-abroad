"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { t as translate, type Lang } from '../i18n/strings'

type Theme = 'light' | 'dark'

interface AppCtx {
  lang: Lang
  setLang: (l: Lang) => void
  theme: Theme
  setTheme: (v: Theme) => void
  t: (key: string, params?: Record<string, string | number>) => string
}

const Ctx = createContext<AppCtx | null>(null)

// Shares localStorage keys + custom events with Navbar's lang toggle and the
// site-wide theme toggle, so this context stays in sync with them without a
// shared React tree.
//
// `lang` renders straight into text (headlines, labels via t()), so it must
// start at the same value the server rendered ('en' — the server has no
// localStorage to read) or React throws a hydration mismatch and discards
// the SSR-ed markup for this subtree. The real value is read from <html>'s
// data-lang attribute (set before first paint by layout.tsx's no-flash
// script) in a layout effect, which only runs after hydration completes —
// so the correction happens in a normal client-only commit, synchronously
// before the browser paints, rather than during hydration itself.
function initialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return (document.documentElement.getAttribute('data-theme') as Theme | null) || 'light'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en')
  const [theme, setThemeState] = useState<Theme>(initialTheme)

  useLayoutEffect(() => {
    const attr = document.documentElement.getAttribute('data-lang') as Lang | null
    if (attr && attr !== lang) setLangState(attr)
    // Runs once, right after hydration — not a reactive sync on `lang`.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const onLangChange = () => {
      try {
        const updated = localStorage.getItem('lang') as Lang | null
        if (updated) setLangState(updated)
      } catch {}
    }
    window.addEventListener('langChange', onLangChange)
    return () => window.removeEventListener('langChange', onLangChange)
  }, [])

  useEffect(() => {
    const onThemeChange = () => {
      try {
        const updated = localStorage.getItem('theme') as Theme | null
        if (updated) setThemeState(updated)
      } catch {}
    }
    window.addEventListener('themeChange', onThemeChange)
    return () => window.removeEventListener('themeChange', onThemeChange)
  }, [])

  useEffect(() => {
    document.documentElement.setAttribute('data-lang', lang)
    document.documentElement.setAttribute('lang', lang)
  }, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const setLang = useCallback((l: Lang) => {
    setLangState(l)
    try {
      localStorage.setItem('lang', l)
    } catch {}
    window.dispatchEvent(new Event('langChange'))
  }, [])

  const setTheme = useCallback((v: Theme) => {
    setThemeState(v)
    try {
      localStorage.setItem('theme', v)
    } catch {}
    window.dispatchEvent(new Event('themeChange'))
  }, [])

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(key, lang, params),
    [lang],
  )

  const value = useMemo(
    () => ({ lang, setLang, theme, setTheme, t }),
    [lang, theme, setLang, setTheme, t],
  )

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useApp(): AppCtx {
  const c = useContext(Ctx)
  if (!c) throw new Error('useApp must be used inside AppProvider')
  return c
}