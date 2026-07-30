import type { ReactElement } from 'react'
import { useApp } from '../app/providers'

// ============================================================
// The student journey as an arrow-process: six icon steps with a
// brand chevron between them, short copy under each. Folds to a
// vertical list on mobile. Bilingual through i18n.
// ============================================================

const STEPS = [1, 2, 3, 4, 5, 6] as const

const ICONS: Record<number, ReactElement> = {
  1: (
    <path d="M11 3a8 8 0 105.29 14.03l3.84 3.84 1.42-1.42-3.84-3.84A8 8 0 0011 3zm0 2a6 6 0 110 12 6 6 0 010-12z" />
  ),
  2: (
    <path d="M4 4h16a1 1 0 011 1v11a1 1 0 01-1 1H8l-4 4V5a1 1 0 011-1zm3 5v2h10V9H7zm0 4v2h7v-2H7z" />
  ),
  3: (
    <path d="M12 2l11 6-4 2.18V14.5c0 1.66-3.13 3-7 3s-7-1.34-7-3v-4.32L3 9.4V15H1V8l11-6zm0 2.3L5.7 8 12 11.4 18.3 8 12 4.3zm5 6.97l-5 2.73-5-2.73V14.4c.9.66 2.85 1.1 5 1.1s4.1-.44 5-1.1v-3.13z" />
  ),
  4: (
    <path
      fillRule="evenodd"
      d="M6 2h9l5 5v14a1 1 0 01-1 1H6a1 1 0 01-1-1V3a1 1 0 011-1zm8 1.5V8h4.5L14 3.5zM8 12h8v1.6H8V12zm0 3.4h8V17H8v-1.6zm0 3.4h5v1.6H8v-1.6z"
    />
  ),
  5: (
    <path d="M20 4L3 11l6 2 2 6 3-4 4 3 2-14zm-2.6 3.1l-6 6L11 15l6.4-7.9z" />
  ),
  6: (
    <path d="M2.5 19h19v2h-19v-2zM21 10.5c-.3-.9-1.3-1.4-2.2-1.1L14 10.7 7.5 4.6 5.6 5.2l3.9 6.6-4.2 1.2-1.7-1.3-1.4.4 2 3.5 15-4.3c.9-.3 1.4-1.3 1.2-2.2z" />
  ),
}

export function Journey() {
  const { t } = useApp()
  return (
    <div className="journey">
      {STEPS.map((i) => (
        <div className="jstep" key={i}>
          <div className="jicon">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              {ICONS[i]}
            </svg>
            <span className="jnum">{t(`journey.${i}.n`)}</span>
          </div>
          <div className="jtitle">{t(`journey.${i}.t`)}</div>
          <div className="jdesc">{t(`journey.${i}.d`)}</div>
        </div>
      ))}
    </div>
  )
}
