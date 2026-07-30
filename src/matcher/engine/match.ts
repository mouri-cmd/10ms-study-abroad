// ============================================================
// Matching engine.
//
// Two passes per destination:
//   Pass A — hard gates. A failure produces a specific, honest
//            block reason and drops the destination to 'unlikely'.
//   Pass B — weighted fit score across five factors.
//
// Reasons are emitted as codes + params, never as sentences, so
// the same result renders in both English and Bangla.
// ============================================================

import { DESTINATIONS, RULES, RULES_VERSION } from '../data'
import { suggestUniversities } from './universities'
import type {
  Destination,
  MatchOutput,
  MatchResult,
  Reason,
  ResultEntry,
  StudentProfile,
  StudyLevel,
  Tier,
} from './types'

export { DESTINATIONS, RULES, RULES_VERSION }

// ------------------------------------------------------------
// Weights
// ------------------------------------------------------------

const WEIGHTS = {
  academic: 22,
  english: 20,
  budget: 23,
  priority: 25,
  timing: 10,
} as const

const PREFERRED_COUNTRY_BONUS = 4

const TIER_STRONG = 75
const TIER_POSSIBLE = 45

/**
 * A destination that fails a hard gate can never carry a high score — showing
 * "unlikely, 78" next to "strong, 80" reads as a contradiction to a student.
 */
const BLOCKED_SCORE_CAP = 30

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------

const clamp = (n: number, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

/** Linear 0–100 score: 0 at `min`, 100 at `competitive`. */
function ramp(value: number, min: number, competitive: number): number {
  if (competitive <= min) return value >= min ? 100 : 0
  return clamp(((value - min) / (competitive - min)) * 100)
}

const round = (n: number) => Math.round(n)

/** Converts a 0–100 index back into the units a requirement is written in. */
export function nativeScore(index: number, scale: string): number {
  const div = scale === 'cgpa4' ? 4 : scale === 'gpa5' ? 5 : 100
  const v = scale === 'percent' || scale === 'index100' ? index : (index / 100) * div
  return Math.round(v * 100) / 100
}

// ------------------------------------------------------------
// Academic normalisation
// ------------------------------------------------------------

/** Converts a result entry to a 0–100 index. Returns null when not supplied. */
export function normaliseResult(r: ResultEntry | undefined | null): number | null {
  if (!r || r.value === null || Number.isNaN(r.value)) return null
  switch (r.system) {
    case 'gpa5':
      return clamp((r.value / 5) * 100)
    case 'cgpa4':
      return clamp((r.value / 4) * 100)
    case 'cgpa5':
      return clamp((r.value / 5) * 100)
    case 'percent':
      return clamp(r.value)
    case 'grades':
      return clamp(r.value)
    default:
      return null
  }
}

/**
 * The result an entry requirement is actually written against.
 *
 * University minimums are stated as "HSC GPA 4.0" or "CGPA 2.75" — a single
 * qualification, not a blend. Gating on a blended index would wrongly reject a
 * student with a weak SSC and a strong HSC, so the gate uses the governing
 * qualification alone.
 */
export function gateIndex(p: StudentProfile): number | null {
  const ssc = normaliseResult(p.ssc)
  const hsc = normaliseResult(p.hsc)
  const ug = normaliseResult(p.undergrad)
  const level = p.level ?? 'bachelors'

  let idx: number | null
  if (level === 'masters' || level === 'phd') idx = ug ?? hsc
  else idx = hsc ?? ssc

  if (idx === null) return null
  if (p.backlogs > 0) idx -= Math.min(10, p.backlogs * 2.5)
  return clamp(idx)
}

/**
 * Weighted academic index, used for competitiveness rather than eligibility.
 * A strong SSC genuinely strengthens an application even where no rule names it,
 * so it counts toward the score but never toward the gate.
 */
export function academicIndex(p: StudentProfile): number | null {
  const ssc = normaliseResult(p.ssc)
  const hsc = normaliseResult(p.hsc)
  const ug = normaliseResult(p.undergrad)
  const level = p.level ?? 'bachelors'

  let idx: number | null = null

  if (level === 'masters' || level === 'phd') {
    if (ug !== null && hsc !== null) idx = ug * 0.7 + hsc * 0.3
    else if (ug !== null) idx = ug
    else if (hsc !== null) idx = hsc
  } else {
    if (hsc !== null && ssc !== null) idx = hsc * 0.65 + ssc * 0.35
    else if (hsc !== null) idx = hsc
    else if (ssc !== null) idx = ssc
  }

  if (idx === null) return null

  // Backlogs apply a modest penalty rather than a hard block.
  if (p.backlogs > 0) idx -= Math.min(10, p.backlogs * 2.5)

  return clamp(idx)
}

// ------------------------------------------------------------
// English normalisation
// ------------------------------------------------------------

const PTE_TO_IELTS: [number, number][] = [
  [29, 4.5], [36, 5.0], [42, 5.5], [50, 6.0], [58, 6.5],
  [65, 7.0], [73, 7.5], [79, 8.0], [83, 8.5],
]
const TOEFL_TO_IELTS: [number, number][] = [
  [32, 4.5], [46, 5.5], [60, 6.0], [79, 6.5], [94, 7.0],
  [102, 7.5], [110, 8.0], [115, 8.5],
]
const DET_TO_IELTS: [number, number][] = [
  [75, 4.5], [85, 5.5], [90, 6.0], [100, 6.5], [110, 7.0],
  [120, 7.5], [130, 8.0], [140, 8.5],
]

function bandFromTable(score: number, table: [number, number][]): number {
  let out = 0
  for (const [threshold, ielts] of table) {
    if (score >= threshold) out = ielts
  }
  return out
}

/** Converts any accepted test to an IELTS-equivalent overall score. Null if not measurable. */
export function ieltsEquivalent(p: StudentProfile): number | null {
  const s = p.englishOverall
  if (s === null || Number.isNaN(s)) return null
  switch (p.englishTest) {
    case 'ielts':
    case 'ielts_ukvi':
      return s
    case 'pte':
      return bandFromTable(s, PTE_TO_IELTS)
    case 'toefl':
      return bandFromTable(s, TOEFL_TO_IELTS)
    case 'duolingo':
      return bandFromTable(s, DET_TO_IELTS)
    default:
      return null
  }
}

/** Lowest individual band, only meaningful for IELTS. */
function lowestBand(p: StudentProfile): { band: number; which: string } | null {
  if (p.englishTest !== 'ielts' && p.englishTest !== 'ielts_ukvi') return null
  const entries: [string, number | null][] = [
    ['listening', p.bandListening],
    ['reading', p.bandReading],
    ['writing', p.bandWriting],
    ['speaking', p.bandSpeaking],
  ]
  const present = entries.filter(([, v]) => v !== null && !Number.isNaN(v)) as [string, number][]
  if (present.length === 0) return null
  let min = present[0]
  for (const e of present) if (e[1] < min[1]) min = e
  return { band: min[1], which: min[0] }
}

// ------------------------------------------------------------
// Cost
// ------------------------------------------------------------

function costFor(d: Destination, level: StudyLevel) {
  const tuition = d.cost.tuitionPerYearBDT[level]
  const living = d.cost.livingPerYearBDT
  const extras =
    d.cost.visaFeeBDT +
    d.cost.healthCoverPerYearBDT +
    d.cost.otherApplicationFeesBDT +
    d.cost.airfareOneWayBDT

  const computedMin = tuition.low + living.low + extras
  const computedTypical = tuition.typical + living.typical + extras

  // A researched all-in total accounts for things the component sum misses —
  // visa-mandated fund levels, blocked deposits, upfront tuition. Where it is
  // higher than the component sum, it wins. Understating the floor is the one
  // error here that costs a family real money.
  const researchedMin = d.cost.firstYearTotalBDT.minimumViable
  const researchedTypical = d.cost.firstYearTotalBDT.typical

  // The visa itself will not be granted below this, whatever the costs suggest.
  const visaFloor = d.cost.visaMandatedFundsBDT + tuition.low

  return {
    tuition,
    living,
    firstYearMinimum: Math.max(computedMin, researchedMin, visaFloor),
    firstYearTypical: Math.max(computedTypical, researchedTypical),
    upfront: d.cost.upfrontDepositBDT,
  }
}

function gapAllowance(d: Destination, level: StudyLevel): number {
  switch (level) {
    case 'diploma':
      return d.gapTolerance.diplomaYears
    case 'bachelors':
      return d.gapTolerance.bachelorsYears
    case 'masters':
      return d.gapTolerance.mastersYears
    case 'phd':
      return d.gapTolerance.phdYears
  }
}

// ------------------------------------------------------------
// Timing
// ------------------------------------------------------------

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

/** How workable are this destination's intakes given the student's horizon. */
function timingScore(d: Destination, p: StudentProfile, now = new Date()): number {
  if (!p.intake || p.intake === 'undecided' || p.intake === 'beyond_12m') return 85
  const horizonMonths = p.intake === 'within_6m' ? 6 : 12
  const currentMonth = now.getMonth()

  let best = 0
  for (const intake of d.intakes) {
    const applyIdx = MONTHS.indexOf(intake.applyByMonth)
    const intakeIdx = MONTHS.indexOf(intake.month)
    if (applyIdx < 0 || intakeIdx < 0) continue
    let monthsToIntake = intakeIdx - currentMonth
    if (monthsToIntake <= 0) monthsToIntake += 12
    let monthsToDeadline = applyIdx - currentMonth
    if (monthsToDeadline <= 0) monthsToDeadline += 12
    if (monthsToDeadline > monthsToIntake) monthsToDeadline -= 12

    if (monthsToIntake <= horizonMonths && monthsToDeadline >= 1) best = Math.max(best, 100)
    else if (monthsToIntake <= horizonMonths) best = Math.max(best, 55)
    else best = Math.max(best, 70)
  }
  // More intakes per year means more chances to start.
  return clamp(best + (d.intakes.length - 2) * 5)
}

// ------------------------------------------------------------
// Main
// ------------------------------------------------------------

export function matchStudent(p: StudentProfile, now = new Date()): MatchOutput {
  const level: StudyLevel = p.level ?? 'bachelors'
  const idx = academicIndex(p)
  const gate = gateIndex(p)
  const ielts = ieltsEquivalent(p)
  const low = lowestBand(p)

  // Destinations restricted to other study levels are left out entirely,
  // rather than shown as blocked: Malta for a Bachelor's student is not a
  // near-miss, it is simply not on offer.
  const offered = DESTINATIONS.filter(
    (d) => !d.offeredLevels || d.offeredLevels.includes(level),
  )

  const results: MatchResult[] = offered.map((d) => {
    const req = d.levels[level]
    const reasons: Reason[] = []
    let blocked = false
    let conditional = false

    // ---------- English ----------
    let englishScore = 40
    if (p.englishTest === 'moi') {
      conditional = true
      if (d.englishAlternatives.moiAccepted) {
        reasons.push({ kind: 'con', code: 'english_moi_ok', params: {} })
        englishScore = 45
      } else {
        blocked = true
        reasons.push({
          kind: 'block',
          code: 'english_moi_rejected',
          params: { required: req.ieltsMinOverall },
        })
        englishScore = 0
      }
    } else if (p.englishTest === 'none' || ielts === null) {
      conditional = true
      englishScore = 45
      reasons.push({
        kind: 'con',
        code: 'english_not_taken',
        params: { required: req.ieltsMinOverall, target: req.ieltsExpected },
      })
    } else {
      if (ielts >= req.ieltsCompetitive) {
        englishScore = 100
        reasons.push({
          kind: 'pro',
          code: 'english_strong',
          params: { score: ielts, required: req.ieltsMinOverall },
        })
      } else if (ielts >= req.ieltsMinOverall) {
        englishScore = ramp(ielts, req.ieltsMinOverall, req.ieltsCompetitive)
        reasons.push({
          kind: 'pro',
          code: 'english_meets',
          params: { score: ielts, required: req.ieltsMinOverall },
        })
      } else if (ielts >= req.ieltsMinOverall - 0.5) {
        blocked = true
        englishScore = 0
        reasons.push({
          kind: 'block',
          code: 'english_near',
          params: { score: ielts, required: req.ieltsMinOverall },
        })
      } else {
        blocked = true
        englishScore = 0
        reasons.push({
          kind: 'block',
          code: 'english_below',
          params: { score: ielts, required: req.ieltsMinOverall },
        })
        if (d.englishAlternatives.pathwayAvailable && ielts >= d.englishAlternatives.pathwayMinIelts) {
          reasons.push({
            kind: 'con',
            code: 'english_pathway',
            params: { min: d.englishAlternatives.pathwayMinIelts },
          })
        }
      }

      // Per-band floor — only assessable for IELTS.
      if (!blocked && low && low.band < req.ieltsNoBandBelow) {
        blocked = true
        englishScore = Math.min(englishScore, 20)
        reasons.push({
          kind: 'block',
          code: 'english_band_short',
          params: {
            skill: low.which,
            band: low.band,
            required: req.ieltsNoBandBelow,
          },
        })
      }

      if (d.englishAlternatives.ukviRequired && p.englishTest === 'ielts') {
        reasons.push({ kind: 'con', code: 'english_ukvi', params: {} })
      }

      // A predicted or mock score gives a useful provisional answer but can
      // never confirm anything: the result stays conditional, so 'strong' is
      // out of reach until a real certificate exists.
      if (p.englishPredicted) {
        conditional = true
        reasons.push({ kind: 'con', code: 'english_predicted', params: { score: ielts } })
      }
    }

    // ---------- Academic ----------
    // Eligibility is decided on the governing qualification (`gate`);
    // competitiveness is scored on the blended index (`idx`).
    let academicScore = 40
    if (gate === null || idx === null) {
      conditional = true
      if (level === 'masters' || level === 'phd') {
        reasons.push({ kind: 'con', code: 'no_ug_result', params: {} })
      }
    } else if (gate < req.academicIndexMin) {
      blocked = true
      academicScore = 0
      // Reported in the units the requirement is written in — "GPA 3.5 against
      // the 4.0 needed" lands; "index 70 against 80" does not.
      reasons.push({
        kind: 'block',
        code: 'academic_below',
        params: {
          have: nativeScore(gate, req.academicScale),
          required: req.academicMinNative,
          scale: req.academicScale,
        },
      })
    } else if (idx >= req.academicIndexCompetitive) {
      academicScore = 100
      reasons.push({
        kind: 'pro',
        code: 'academic_strong',
        params: { have: nativeScore(gate, req.academicScale), scale: req.academicScale },
      })
    } else {
      academicScore = ramp(idx, req.academicIndexMin, req.academicIndexCompetitive)
      reasons.push({
        kind: 'pro',
        code: 'academic_meets',
        params: {
          have: nativeScore(gate, req.academicScale),
          required: req.academicMinNative,
          scale: req.academicScale,
        },
      })
    }

    if (p.backlogs > 0) {
      reasons.push({ kind: 'con', code: 'academic_backlogs', params: { count: p.backlogs } })
    }
    if (req.standardisedTest === 'required') {
      reasons.push({ kind: 'con', code: 'test_required', params: {} })
    }

    // ---------- Budget ----------
    // Tuition-first gating. The full first-year figure (visa floor included)
    // still exists for the compare table and the counsellor, but a student is
    // only hard-blocked when even the lowest tuition is beyond them. Between
    // "tuition fits" and "everything funded" is a counselling conversation,
    // not a closed door.
    const cost = costFor(d, level)
    const softFloor = cost.tuition.low + cost.living.low
    let budgetScore = 50
    if (p.budgetBDT !== null && !Number.isNaN(p.budgetBDT)) {
      if (p.budgetBDT >= cost.firstYearTypical) {
        budgetScore = 100
        reasons.push({
          kind: 'pro',
          code: 'budget_comfortable',
          params: { typical: cost.firstYearTypical },
        })
      } else if (p.budgetBDT >= softFloor) {
        budgetScore = 55 + (ramp(p.budgetBDT, softFloor, cost.firstYearTypical) * 0.45)
        reasons.push({
          kind: 'con',
          code: 'budget_tight',
          params: { minimum: softFloor, typical: cost.firstYearTypical },
        })
      } else if (p.budgetBDT >= cost.tuition.low) {
        budgetScore = 40
        reasons.push({
          kind: 'con',
          code: 'budget_planning',
          params: { tuition: cost.tuition.low },
        })
      } else {
        blocked = true
        budgetScore = 0
        reasons.push({
          kind: 'block',
          code: 'budget_short',
          params: { budget: p.budgetBDT, tuition: cost.tuition.low },
        })
      }
      if (!blocked && cost.upfront > 0 && p.budgetBDT < cost.upfront * 2.2) {
        reasons.push({
          kind: 'con',
          code: 'budget_deposit',
          params: { upfront: cost.upfront, label: d.cost.upfrontDepositLabel.en },
        })
      }
    }

    // ---------- Study gap ----------
    const maxGap = gapAllowance(d, level)
    if (p.gapYears > maxGap) {
      blocked = true
      reasons.push({
        kind: 'block',
        code: 'gap_over',
        params: { years: p.gapYears, max: maxGap },
      })
    } else if (p.gapYears > 0) {
      reasons.push({ kind: 'pro', code: 'gap_ok', params: { years: p.gapYears, max: maxGap } })
    }

    // ---------- Prior visa refusal ----------
    if (p.visaRefusal) {
      const impact = d.visa.priorRefusalImpact
      if (impact === 'severe') {
        blocked = true
        reasons.push({ kind: 'block', code: 'refusal_risk', params: { impact } })
      } else if (impact === 'high' || impact === 'moderate') {
        reasons.push({ kind: 'con', code: 'refusal_risk', params: { impact } })
      } else {
        reasons.push({ kind: 'pro', code: 'refusal_low', params: {} })
      }
    }

    // ---------- Priorities ----------
    // Starts neutral. Alignment pulls it up, active mismatch pulls it down —
    // a country that is bad at what the student cares about should lose ground,
    // not merely fail to gain any.
    let priorityScore = 55
    if (p.priorities.length > 0) {
      const step = 50 / p.priorities.length
      priorityScore = 50
      for (const pr of p.priorities) {
        if (d.priorityStrengths.includes(pr)) {
          priorityScore += step
          reasons.push({ kind: 'pro', code: `priority_${pr}` as Reason['code'], params: {} })
        } else if (d.priorityWeaknesses.includes(pr)) {
          priorityScore -= step
          reasons.push({ kind: 'con', code: 'priority_weak', params: { priority: pr } })
        }
      }
      priorityScore = clamp(priorityScore)
    }

    // ---------- Timing ----------
    const timing = timingScore(d, p, now)

    // ---------- Context reasons (always shown) ----------
    reasons.push({
      kind: d.scholarships.rating === 'strong' || d.scholarships.rating === 'very_strong' ? 'pro' : 'con',
      code: 'scholarship_outlook',
      params: {
        rating: d.scholarships.rating,
        min: d.scholarships.typicalMeritWaiverPercent.min,
        max: d.scholarships.typicalMeritWaiverPercent.max,
      },
    })
    reasons.push({
      kind: d.pr.rating === 'strong' || d.pr.rating === 'very_strong' ? 'pro' : 'con',
      code: 'pr_outlook',
      params: {
        rating: d.pr.rating,
        min: d.pr.realisticYearsToPR.min,
        max: d.pr.realisticYearsToPR.max,
      },
    })
    const psw = d.postStudy.monthsByLevel[level]
    if (psw > 0) {
      reasons.push({
        kind: psw >= 24 ? 'pro' : 'con',
        code: 'psw_duration',
        params: { months: psw, name: d.postStudy.visaName },
      })
    }

    // ---------- Score ----------
    let score =
      (academicScore * WEIGHTS.academic +
        englishScore * WEIGHTS.english +
        budgetScore * WEIGHTS.budget +
        priorityScore * WEIGHTS.priority +
        timing * WEIGHTS.timing) /
      (WEIGHTS.academic + WEIGHTS.english + WEIGHTS.budget + WEIGHTS.priority + WEIGHTS.timing)

    if (p.preferredCountries.includes(d.id)) {
      score += PREFERRED_COUNTRY_BONUS
      reasons.push({ kind: 'pro', code: 'preferred_country', params: {} })
    }

    if (blocked) score = Math.min(score, BLOCKED_SCORE_CAP)
    score = clamp(round(score))

    // ---------- Tier ----------
    let tier: Tier
    if (blocked) tier = 'unlikely'
    else if (score >= TIER_STRONG) tier = 'strong'
    else if (score >= TIER_POSSIBLE) tier = 'possible'
    else tier = 'unlikely'

    // An unverified English score can never produce a 'strong' claim.
    if (conditional && tier === 'strong') tier = 'possible'

    // Blocks first, then pros, then cons — so the headline reason is the decisive one.
    const order: Record<Reason['kind'], number> = { block: 0, pro: 1, con: 2 }
    reasons.sort((a, b) => order[a.kind] - order[b.kind])

    return {
      destinationId: d.id,
      tier,
      score,
      blocked,
      conditional,
      reasons,
      // Suggested even for blocked destinations — a counsellor talking a
      // student through "what would change the answer" needs names.
      // Each suggestion's tuition is aligned to this country's verified cost
      // band by tier, so the per-university figures never contradict the
      // card's headline tuition.
      universities: suggestUniversities(d.id, level, p.field, idx, req).map((u) => ({
        ...u,
        tuitionBDT:
          u.tier === 'competitive'
            ? cost.tuition.high
            : u.tier === 'accessible'
              ? cost.tuition.low
              : cost.tuition.typical,
      })),
      breakdown: {
        academic: round(academicScore),
        english: round(englishScore),
        budget: round(budgetScore),
        priority: round(priorityScore),
        timing: round(timing),
      },
      cost,
      targetIelts: req.ieltsExpected,
      ieltsMin: req.ieltsMinOverall,
      ieltsNoBandBelow: req.ieltsNoBandBelow,
    }
  })

  results.sort((a, b) => {
    const rank: Record<Tier, number> = { strong: 0, possible: 1, unlikely: 2 }
    if (rank[a.tier] !== rank[b.tier]) return rank[a.tier] - rank[b.tier]
    return b.score - a.score
  })

  return {
    rulesVersion: RULES_VERSION,
    academicIndex: idx === null ? null : round(idx),
    ieltsEquivalent: ielts,
    results,
    strong: results.filter((r) => r.tier === 'strong').map((r) => r.destinationId),
    possible: results.filter((r) => r.tier === 'possible').map((r) => r.destinationId),
    unlikely: results.filter((r) => r.tier === 'unlikely').map((r) => r.destinationId),
    topScore: results.length ? results[0].score : 0,
  }
}

export function destinationById(id: string): Destination | undefined {
  return DESTINATIONS.find((d) => d.id === id)
}
