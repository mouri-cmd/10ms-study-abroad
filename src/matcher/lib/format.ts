import type { Lang } from '../i18n/strings'

const BN_DIGITS = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']

/** Converts Latin digits to Bangla digits. Used only when lang is 'bn'. */
export function bnDigits(s: string): string {
  return s.replace(/[0-9]/g, (d) => BN_DIGITS[Number(d)])
}

export function num(n: number, lang: Lang, decimals = 0): string {
  const s = n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
  return lang === 'bn' ? bnDigits(s) : s
}

/**
 * BDT formatting in the units Bangladeshi families actually use.
 * ≥ 1 crore → crore, ≥ 1 lakh → lakh, otherwise plain.
 */
export function money(bdt: number, lang: Lang): string {
  if (!Number.isFinite(bdt)) return '—'
  if (bdt === 0) return lang === 'bn' ? '৳০' : '৳0'

  if (bdt >= 10000000) {
    const v = bdt / 10000000
    const s = v.toFixed(v >= 10 ? 1 : 2)
    return lang === 'bn' ? `৳${bnDigits(s)} কোটি` : `৳${s} crore`
  }
  if (bdt >= 100000) {
    const v = bdt / 100000
    const s = v.toFixed(v >= 10 ? 1 : 2)
    return lang === 'bn' ? `৳${bnDigits(s)} লক্ষ` : `৳${s} lakh`
  }
  return `৳${num(Math.round(bdt), lang)}`
}

/** Compact range, collapsing to a single value when both ends match. */
export function moneyRange(a: number, b: number, lang: Lang): string {
  if (a === b) return money(a, lang)
  return `${money(a, lang)} – ${money(b, lang)}`
}

/** IELTS bands print as 6.0 / 6.5, never 6 or 6.50. */
export function band(n: number, lang: Lang): string {
  const s = n.toFixed(1)
  return lang === 'bn' ? bnDigits(s) : s
}
