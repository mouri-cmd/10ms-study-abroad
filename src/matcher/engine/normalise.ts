// ============================================================
// Adapter: research-schema JSON → runtime Destination.
//
// Research files are written by whoever ran the deep research pass,
// in the units and shape that pass naturally produces. This module
// absorbs the differences so a verified country can be dropped into
// src/data/destinations/ with no hand-editing:
//
//   • academic thresholds arrive as GPA/5 or CGPA/4 and are converted
//     to the engine's 0–100 index
//   • diploma and PhD levels may be missing and are inferred
//   • strings that should be bilingual may arrive as plain strings
//   • nulls appear wherever the research could not verify something
//   • priority strengths and weaknesses are derived from the verified
//     ratings, so editorial judgment tracks the facts automatically
// ============================================================

import editorial from '../data/editorial.json'
import type {
  Destination,
  Localised,
  Priority,
  Rating,
  ScholarshipRating,
  StudyLevel,
} from './types'

const LEVELS: StudyLevel[] = ['diploma', 'bachelors', 'masters', 'phd']

type Raw = Record<string, any>

// ------------------------------------------------------------
// Coercion helpers — every one of these exists because a research
// file will, sooner or later, arrive in the other shape.
// ------------------------------------------------------------

function loc(v: unknown, fallbackBn = ''): Localised {
  if (v === null || v === undefined) return { en: '', bn: fallbackBn }
  if (typeof v === 'string') return { en: v, bn: fallbackBn }
  const o = v as Record<string, unknown>
  return {
    en: typeof o.en === 'string' ? o.en : '',
    bn: typeof o.bn === 'string' && o.bn ? o.bn : fallbackBn,
  }
}

function n(v: unknown, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? v : fallback
}

/** Converts a native academic threshold to the engine's 0–100 index. */
export function toIndex(value: number, scale: string | undefined): number {
  switch (scale) {
    case 'cgpa4':
      return (value / 4) * 100
    case 'gpa5':
      return (value / 5) * 100
    case 'percent':
    case 'index100':
      return value
    default:
      // No scale given. Values at or below 5 are almost certainly a GPA,
      // anything larger is already an index.
      return value <= 5 ? (value / 5) * 100 : value
  }
}

const DEFAULT_SCALE: Record<StudyLevel, string> = {
  diploma: 'gpa5',
  bachelors: 'gpa5',
  masters: 'cgpa4',
  phd: 'cgpa4',
}

// ------------------------------------------------------------
// Derived priority alignment
// ------------------------------------------------------------

const TH = editorial.thresholds

const STRONG_RATINGS: Rating[] = ['strong', 'very_strong']
const WEAK_RATINGS: Rating[] = ['weak', 'very_weak']
const STRONG_SCHOL: ScholarshipRating[] = ['strong', 'very_strong']
const WEAK_SCHOL: ScholarshipRating[] = ['limited', 'very_limited']

/**
 * Derives which priorities a destination serves well or badly from its
 * verified data, so that when research says "Australia's PR outlook is weak",
 * the scoring stops rewarding Australia for a PR-focused student — without
 * anyone remembering to edit a second list.
 */
function derivePriorities(d: Destination, rankingTier: string): {
  strengths: Priority[]
  weaknesses: Priority[]
} {
  const strengths: Priority[] = []
  const weaknesses: Priority[] = []

  const cost = d.cost.firstYearTotalBDT.typical
  if (cost > 0 && cost <= TH.lowCostStrengthBDT) strengths.push('lowest_cost')
  else if (cost >= TH.highCostWeaknessBDT) weaknesses.push('lowest_cost')

  const weeks = d.visa.processingWeeks.max
  if (weeks > 0 && weeks <= TH.fastProcessingStrengthWeeks) strengths.push('fast_processing')
  else if (weeks >= TH.slowProcessingWeaknessWeeks) weaknesses.push('fast_processing')

  const psw = Math.max(d.postStudy.monthsByLevel.bachelors, d.postStudy.monthsByLevel.masters)
  if (psw >= TH.pswStrengthMonths) strengths.push('post_study_work')
  else if (psw < TH.pswWeaknessMonths) weaknesses.push('post_study_work')

  if (STRONG_RATINGS.includes(d.pr.rating)) strengths.push('pr_pathway')
  else if (WEAK_RATINGS.includes(d.pr.rating)) weaknesses.push('pr_pathway')

  if (STRONG_SCHOL.includes(d.scholarships.rating)) strengths.push('scholarship')
  else if (WEAK_SCHOL.includes(d.scholarships.rating)) weaknesses.push('scholarship')

  if (rankingTier === 'top' || rankingTier === 'high') strengths.push('ranking')
  else if (rankingTier === 'low') weaknesses.push('ranking')

  return { strengths, weaknesses }
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

export function normalise(raw: Raw): Destination {
  const id = String(raw.id)
  const ed = (editorial.countries as Record<string, Raw>)[id] ?? {}

  // ---- Levels ----
  const rawLevels: Raw = raw.levels ?? {}
  const bachelors = rawLevels.bachelors ?? rawLevels.masters ?? {}
  const masters = rawLevels.masters ?? bachelors

  const levels = {} as Destination['levels']
  for (const lv of LEVELS) {
    // A missing level falls back to the nearest sensible sibling rather than
    // vanishing — a student choosing PhD should never see an empty result set.
    const src: Raw =
      rawLevels[lv] ?? (lv === 'diploma' ? bachelors : lv === 'phd' ? masters : bachelors)
    const scale = src.academicScale ?? DEFAULT_SCALE[lv]

    // Accept both the research field names and the older index-based ones.
    const minRaw = src.academicMin ?? src.academicIndexMin
    const compRaw = src.academicCompetitive ?? src.academicIndexCompetitive

    levels[lv] = {
      ieltsMinOverall: n(src.ieltsMinOverall, 6.0),
      ieltsNoBandBelow: n(src.ieltsNoBandBelow, 5.5),
      ieltsExpected: n(src.ieltsExpected, n(src.ieltsMinOverall, 6.0) + 0.5),
      ieltsCompetitive: n(src.ieltsCompetitive, n(src.ieltsMinOverall, 6.0) + 1),
      academicIndexMin: toIndex(n(minRaw, 3.0), scale),
      academicIndexCompetitive: toIndex(n(compRaw, 4.0), scale),
      academicScale: scale,
      academicMinNative: n(minRaw, 3.0),
      academicCompetitiveNative: n(compRaw, 4.0),
      standardisedTest: src.standardisedTest ?? 'not_required',
      notes: loc(src.notes),
    }
  }

  // ---- Cost ----
  const rawCost: Raw = raw.cost ?? {}
  const rawTuition: Raw = rawCost.tuitionPerYearBDT ?? {}
  const tuitionBachelors = rawTuition.bachelors ?? { low: 0, typical: 0, high: 0 }
  const tuitionMasters = rawTuition.masters ?? tuitionBachelors
  const tuition = {
    // Diploma tuition is typically well below Bachelor's; PhD sits near Master's.
    diploma: rawTuition.diploma ?? {
      low: Math.round(tuitionBachelors.low * 0.65),
      typical: Math.round(tuitionBachelors.typical * 0.65),
      high: Math.round(tuitionBachelors.high * 0.65),
    },
    bachelors: tuitionBachelors,
    masters: tuitionMasters,
    phd: rawTuition.phd ?? tuitionMasters,
  }

  // ---- Post-study work ----
  const rawPsw: Raw = raw.postStudy?.monthsByLevel ?? {}
  const pswBachelors = n(rawPsw.bachelors, 0)
  const psw = {
    diploma: n(rawPsw.diploma, Math.round(pswBachelors * 0.75)),
    bachelors: pswBachelors,
    masters: n(rawPsw.masters, pswBachelors),
    phd: n(rawPsw.phd, n(rawPsw.masters, pswBachelors)),
  }

  // ---- Gap tolerance ----
  const g: Raw = raw.gapTolerance ?? {}
  const gapBachelors = n(g.bachelorsYears, 2)
  const gapMasters = n(g.mastersYears, 5)

  const d: Destination = {
    id,
    flag: ed.flag ?? '🏳️',
    name: loc(raw.name, ed.nameBn ?? ''),
    lastVerified: raw.lastVerified ?? null,
    verified: Boolean(raw.lastVerified),
    // Counsellor decision: which study levels this destination is shown for.
    offeredLevels: Array.isArray(ed.offeredLevels) ? (ed.offeredLevels as StudyLevel[]) : null,
    levels,
    englishAlternatives: {
      pte: raw.englishAlternatives?.pte ?? { bachelors: null, masters: null },
      toefl: raw.englishAlternatives?.toefl ?? { bachelors: null, masters: null },
      duolingo: raw.englishAlternatives?.duolingo ?? { bachelors: null, masters: null },
      moiAccepted: Boolean(raw.englishAlternatives?.moiAccepted),
      moiConditions: loc(raw.englishAlternatives?.moiConditions),
      ukviRequired: Boolean(raw.englishAlternatives?.ukviRequired),
      pathwayAvailable: raw.englishAlternatives?.pathwayAvailable !== false,
      pathwayMinIelts: n(raw.englishAlternatives?.pathwayMinIelts, 5.0),
    },
    gapTolerance: {
      diplomaYears: n(g.diplomaYears, gapBachelors + 1),
      bachelorsYears: gapBachelors,
      mastersYears: gapMasters,
      phdYears: n(g.phdYears, gapMasters + 1),
      documentationRequired: g.documentationRequired !== false,
      notes: loc(g.notes),
    },
    cost: {
      currency: rawCost.currency ?? '',
      exchangeRateToBDT: n(rawCost.exchangeRateToBDT, 0),
      exchangeRateDate: rawCost.exchangeRateDate ?? null,
      tuitionPerYearBDT: tuition,
      livingPerYearBDT: rawCost.livingPerYearBDT ?? { low: 0, typical: 0, high: 0 },
      visaMandatedFundsBDT: n(rawCost.visaMandatedFundsBDT, 0),
      upfrontDepositBDT: n(rawCost.upfrontDepositBDT, 0),
      upfrontDepositLabel: loc(rawCost.upfrontDepositLabel),
      visaFeeBDT: n(rawCost.visaFeeBDT, 0),
      healthCoverPerYearBDT: n(rawCost.healthCoverPerYearBDT, 0),
      otherApplicationFeesBDT: n(rawCost.otherApplicationFeesBDT, 0),
      airfareOneWayBDT: n(rawCost.airfareOneWayBDT, 0),
      firstYearTotalBDT: rawCost.firstYearTotalBDT ?? { minimumViable: 0, typical: 0 },
    },
    scholarships: {
      rating: raw.scholarships?.rating ?? 'limited',
      typicalMeritWaiverPercent: raw.scholarships?.typicalMeritWaiverPercent ?? { min: 0, max: 0 },
      meritThresholdNote: loc(raw.scholarships?.meritThresholdNote),
      needBasedAvailable: Boolean(raw.scholarships?.needBasedAvailable),
      assistantshipsAvailable: Boolean(raw.scholarships?.assistantshipsAvailable),
      named: (raw.scholarships?.named ?? []).map((s: Raw) => ({
        name: s.name ?? '',
        level: s.level ?? 'both',
        coverage: s.coverage ?? '',
        minIelts: typeof s.minIelts === 'number' ? s.minIelts : null,
        minAcademic: s.minAcademic ?? '',
        deadlineWindow: s.deadlineWindow ?? '',
        competitiveness: s.competitiveness ?? '',
        url: s.url ?? null,
      })),
      notes: loc(raw.scholarships?.notes),
    },
    work: {
      termTimeHoursPerWeek: n(raw.work?.termTimeHoursPerWeek, 20),
      holidayHoursPerWeek: n(raw.work?.holidayHoursPerWeek, 40),
      typicalHourlyWageLocal:
        typeof raw.work?.typicalHourlyWageLocal === 'number'
          ? raw.work.typicalHourlyWageLocal
          : null,
      realisticMonthlyEarningsBDT: n(raw.work?.realisticMonthlyEarningsBDT, 0),
      coversWhatShareOfLivingCost: loc(raw.work?.coversWhatShareOfLivingCost),
      dependantsAllowed: Boolean(raw.work?.dependantsAllowed),
      dependantWorkRights: raw.work?.dependantWorkRights ?? '',
    },
    postStudy: {
      visaName: raw.postStudy?.visaName ?? '',
      monthsByLevel: psw,
      restrictions: loc(raw.postStudy?.restrictions),
    },
    pr: {
      rating: raw.pr?.rating ?? 'moderate',
      pathwaySteps: raw.pr?.pathwaySteps ?? [],
      realisticYearsToPR: raw.pr?.realisticYearsToPR ?? { min: 0, max: 0 },
      mainRisk: loc(raw.pr?.mainRisk),
      recentChanges: raw.pr?.recentChanges ?? '',
    },
    visa: {
      name: raw.visa?.name ?? '',
      code: raw.visa?.code ?? '',
      processingWeeks: raw.visa?.processingWeeks ?? { min: 0, max: 0 },
      interviewRequired: Boolean(raw.visa?.interviewRequired),
      fundsHeldMonths: n(raw.visa?.fundsHeldMonths, 0),
      priorRefusalImpact: raw.visa?.priorRefusalImpact ?? 'moderate',
      priorRefusalNote: loc(raw.visa?.priorRefusalNote),
      commonRefusalReasons: raw.visa?.commonRefusalReasons ?? [],
      bangladeshApprovalRate:
        typeof raw.visa?.bangladeshApprovalRate === 'number'
          ? raw.visa.bangladeshApprovalRate
          : null,
    },
    intakes: raw.intakes ?? [],
    priorityStrengths: [],
    priorityWeaknesses: [],
    rankingTier: ed.rankingTier ?? 'mid',
    notes: loc(raw.bangladeshNotes ?? raw.notes),
    sources: raw.sources ?? [],
  }

  const derived = derivePriorities(d, d.rankingTier)
  const override = (editorial.priorityOverride as Record<string, Raw>)[id]
  d.priorityStrengths = override?.strengths ?? derived.strengths
  d.priorityWeaknesses = override?.weaknesses ?? derived.weaknesses

  return d
}
