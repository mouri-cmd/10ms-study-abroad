// ============================================================
// University suggestions.
//
// Given a destination, a study level, the student's field and their
// blended academic index, pick up to three universities the student
// could realistically apply to: field-matched where possible, tiered
// to their academic strength, and always including one safer entry
// when the list has one.
//
// The data is DRAFT (src/data/universities.json) — indicative names
// and tuition, meant to be replaced by the counselling team's own
// placement list. No DOM dependency: runs in the browser and in the
// Pages Function.
// ============================================================

import UNIS from '../data/universities.json'
import type { LevelRequirement, StudyLevel } from './types'

export type UniTier = 'competitive' | 'moderate' | 'accessible'

export interface UniversitySuggestion {
  name: string
  city: string
  tier: UniTier
  /** True when the university is listed as strong in the student's chosen field. */
  fieldMatch: boolean
  /** Indicative tuition per year in BDT for the student's study level. */
  tuitionBDT: number
  strongFields: string[]
}

interface RawUni {
  name: string
  city: string
  tier: string
  strongFields: string[]
  tuitionPerYearBDT: Record<string, number>
}

const TIER_RANK: Record<UniTier, number> = { competitive: 2, moderate: 1, accessible: 0 }

export const UNIVERSITY_DATA_VERIFIED = (UNIS as { lastVerified: string | null }).lastVerified !== null

/** Total universities across all destinations, rounded down to a safe marketing figure. */
export const UNIVERSITY_COUNT =
  Math.floor(
    Object.values(UNIS.universities as Record<string, unknown[]>).reduce(
      (n, list) => n + list.length,
      0,
    ) / 10,
  ) * 10

function tuitionFor(u: RawUni, level: StudyLevel): number {
  const t = u.tuitionPerYearBDT
  if (level === 'masters' || level === 'phd') return t.masters ?? t.bachelors ?? 0
  return t.bachelors ?? t.masters ?? 0
}

/**
 * The highest tier the student should be encouraged to apply to.
 * Above the competitive threshold, everything is in range. Between the
 * minimum and competitive thresholds, the midpoint splits 'moderate'
 * from 'accessible'. Unknown academics land on 'moderate' — enough to
 * show something useful without overpromising.
 */
export function reachTier(academicIndex: number | null, req: LevelRequirement): UniTier {
  if (academicIndex === null) return 'moderate'
  if (academicIndex >= req.academicIndexCompetitive) return 'competitive'
  const mid = (req.academicIndexMin + req.academicIndexCompetitive) / 2
  return academicIndex >= mid ? 'moderate' : 'accessible'
}

export function suggestUniversities(
  destinationId: string,
  level: StudyLevel,
  field: string,
  academicIndex: number | null,
  req: LevelRequirement,
): UniversitySuggestion[] {
  const all = (UNIS.universities as Record<string, RawUni[]>)[destinationId] ?? []
  if (all.length === 0) return []

  const reach = reachTier(academicIndex, req)
  const hasField = field !== '' && field !== 'other'

  const inRange = all
    .filter((u) => TIER_RANK[(u.tier as UniTier) ?? 'moderate'] <= TIER_RANK[reach])
    .map<UniversitySuggestion>((u) => ({
      name: u.name,
      city: u.city,
      tier: u.tier as UniTier,
      fieldMatch: hasField && u.strongFields.includes(field),
      tuitionBDT: tuitionFor(u, level),
      strongFields: u.strongFields,
    }))

  // Field matches first; within each group, most ambitious tier first.
  inRange.sort((a, b) => {
    if (a.fieldMatch !== b.fieldMatch) return a.fieldMatch ? -1 : 1
    return TIER_RANK[b.tier] - TIER_RANK[a.tier]
  })

  const picked = inRange.slice(0, 4)

  // Always leave the student one realistic landing spot: if nothing picked
  // is 'accessible' but the in-range list has one, swap it in at the end.
  if (picked.length === 4 && !picked.some((u) => u.tier === 'accessible')) {
    const safe = inRange.find((u) => u.tier === 'accessible' && !picked.includes(u))
    if (safe) picked[picked.length - 1] = safe
  }

  return picked
}
