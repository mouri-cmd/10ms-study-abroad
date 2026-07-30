"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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
// The initializers read straight from <html>'s current attributes rather
// than localStorage. That attribute is always authoritative by the time this
// component's JS runs — layout.tsx's no-flash script sets it before first
// paint on a full page load, and it simply persists across client-side route
// changes. Deriving from localStorage instead (as an effect, running after
// mount) raced the *other* effect that writes the attribute from state,
// which could stomp an already-correct 'dark' attribute with the stale
// 'light' default for the rest of the session. `document` is guarded for
// SSR, where this mounts server-side with no DOM; since neither value is
// rendered into JSX (only applied via effect), the client/server difference
// never surfaces as a hydration mismatch.

function initialLang(): Lang {
  if (typeof document === 'undefined') return 'en'
  return (document.documentElement.getAttribute('data-lang') as Lang | null) || 'en'
}

function initialTheme(): Theme {
  if (typeof document === 'undefined') return 'light'
  return (document.documentElement.getAttribute('data-theme') as Theme | null) || 'light'
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)
  const [theme, setThemeState] = useState<Theme>(initialTheme)

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