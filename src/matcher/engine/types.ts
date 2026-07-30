// ============================================================
// Shared types for the matching engine.
// This module has no DOM or React dependency so it can run
// identically in the browser and in the Cloudflare Pages Function.
// ============================================================

export type Lang = 'en' | 'bn'
export type Localised = { en: string; bn: string }

export type StudyLevel = 'diploma' | 'bachelors' | 'masters' | 'phd'

export type EnglishTest =
  | 'ielts'
  | 'ielts_ukvi'
  | 'pte'
  | 'toefl'
  | 'duolingo'
  | 'moi'
  | 'none'

export type ResultSystem = 'gpa5' | 'cgpa4' | 'cgpa5' | 'percent' | 'grades'

export type Priority =
  | 'lowest_cost'
  | 'fast_processing'
  | 'post_study_work'
  | 'pr_pathway'
  | 'ranking'
  | 'scholarship'

export type IntakeHorizon = 'within_6m' | '6_to_12m' | 'beyond_12m' | 'undecided'

export type FundingSource = 'self' | 'parents' | 'sponsor' | 'bank_loan' | 'seeking_scholarship'

export type Rating = 'very_weak' | 'weak' | 'moderate' | 'strong' | 'very_strong'
export type ScholarshipRating = 'very_limited' | 'limited' | 'moderate' | 'strong' | 'very_strong'
export type RefusalImpact = 'low' | 'moderate' | 'high' | 'severe'

// ------------------------------------------------------------
// Student profile — the engine input
// ------------------------------------------------------------

export interface ResultEntry {
  system: ResultSystem
  /** Raw value in the units of `system`. For 'grades', a 0–100 index from the grade-profile select. */
  value: number | null
  year: number | null
}

export interface StudentProfile {
  // Step 1 — contact
  name: string
  phone: string
  whatsapp: string
  email: string
  consent: boolean

  // Step 2 — goal
  level: StudyLevel | null
  field: string
  intake: IntakeHorizon | null
  /** Human-readable intake the student picked, e.g. "September 2026". */
  intakeChoice: string

  // Step 3 — academics
  ssc: ResultEntry
  hsc: ResultEntry
  undergrad: ResultEntry
  backlogs: number

  // Step 4 — English
  englishTest: EnglishTest | null
  /** True when the score entered is predicted or from a mock, not a real certificate. */
  englishPredicted: boolean
  englishOverall: number | null
  bandListening: number | null
  bandReading: number | null
  bandWriting: number | null
  bandSpeaking: number | null

  // Step 5 — situation
  currentStatus: string
  gapYears: number
  gapReason: string
  visaRefusal: boolean
  refusalDetails: string
  passportStatus: string
  /** Total first-year budget in BDT. */
  budgetBDT: number | null
  funding: FundingSource | null
  priorities: Priority[]
  preferredCountries: string[]
  notes: string
}

// ------------------------------------------------------------
// Destination rules — the engine's reference data
// ------------------------------------------------------------

export interface LevelRequirement {
  ieltsMinOverall: number
  /** Per-band floor. The field that most often decides an outcome. */
  ieltsNoBandBelow: number
  /** What to aim for, as opposed to what scrapes past. */
  ieltsExpected: number
  ieltsCompetitive: number
  /** Normalised 0–100, used by the engine. */
  academicIndexMin: number
  academicIndexCompetitive: number
  /** The units the research file stated, kept so results can be shown in them. */
  academicScale: string
  academicMinNative: number
  academicCompetitiveNative: number
  standardisedTest: 'required' | 'optional' | 'not_required'
  notes: Localised
}

export interface CostBand {
  low: number
  typical: number
  high: number
}

export interface NamedScholarship {
  name: string
  level: 'bachelors' | 'masters' | 'phd' | 'diploma' | 'both'
  coverage: string
  minIelts: number | null
  minAcademic: string
  deadlineWindow: string
  competitiveness: string
  url: string | null
}

export interface Source {
  field: string
  url: string
  publishedOrUpdated: string
}

export interface Destination {
  id: string
  flag: string
  name: Localised
  lastVerified: string | null
  /** False while the country is still carrying placeholder research. */
  verified: boolean
  /** Editorial restriction: show this destination only for these levels. Null = all levels. */
  offeredLevels: StudyLevel[] | null
  levels: Record<StudyLevel, LevelRequirement>
  englishAlternatives: {
    pte: { bachelors: number | null; masters: number | null }
    toefl: { bachelors: number | null; masters: number | null }
    duolingo: { bachelors: number | null; masters: number | null }
    moiAccepted: boolean
    moiConditions: Localised
    ukviRequired: boolean
    pathwayAvailable: boolean
    pathwayMinIelts: number
  }
  gapTolerance: {
    diplomaYears: number
    bachelorsYears: number
    mastersYears: number
    phdYears: number
    documentationRequired: boolean
    notes: Localised
  }
  cost: {
    currency: string
    exchangeRateToBDT: number
    exchangeRateDate: string | null
    tuitionPerYearBDT: Record<StudyLevel, CostBand>
    livingPerYearBDT: CostBand
    visaMandatedFundsBDT: number
    upfrontDepositBDT: number
    upfrontDepositLabel: Localised
    visaFeeBDT: number
    healthCoverPerYearBDT: number
    otherApplicationFeesBDT: number
    airfareOneWayBDT: number
    firstYearTotalBDT: { minimumViable: number; typical: number }
  }
  scholarships: {
    rating: ScholarshipRating
    typicalMeritWaiverPercent: { min: number; max: number }
    meritThresholdNote: Localised
    needBasedAvailable: boolean
    assistantshipsAvailable: boolean
    named: NamedScholarship[]
    notes: Localised
  }
  work: {
    termTimeHoursPerWeek: number
    holidayHoursPerWeek: number
    typicalHourlyWageLocal: number | null
    realisticMonthlyEarningsBDT: number
    coversWhatShareOfLivingCost: Localised
    dependantsAllowed: boolean
    dependantWorkRights: string
  }
  postStudy: {
    visaName: string
    monthsByLevel: Record<StudyLevel, number>
    restrictions: Localised
  }
  pr: {
    rating: Rating
    pathwaySteps: string[]
    realisticYearsToPR: { min: number; max: number }
    mainRisk: Localised
    recentChanges: string
  }
  visa: {
    name: string
    code: string
    processingWeeks: { min: number; max: number }
    interviewRequired: boolean
    fundsHeldMonths: number
    priorRefusalImpact: RefusalImpact
    priorRefusalNote: Localised
    commonRefusalReasons: string[]
    bangladeshApprovalRate: number | null
  }
  intakes: { month: string; applyByMonth: string }[]
  /** Derived in normalise.ts from the verified ratings, overridable in editorial.json. */
  priorityStrengths: Priority[]
  /** Priorities this destination actively serves badly — penalised, not just unrewarded. */
  priorityWeaknesses: Priority[]
  rankingTier: string
  notes: Localised
  sources: Source[]
}

export interface RulesFile {
  rulesVersion: string
  dataStatus: string
  currencyNote: string
  destinations: Destination[]
}

// ------------------------------------------------------------
// Engine output
// ------------------------------------------------------------

export type ReasonKind = 'pro' | 'con' | 'block'

/** Reason codes are rendered through the i18n templates so output is bilingual. */
export type ReasonCode =
  | 'english_strong'
  | 'english_meets'
  | 'english_near'
  | 'english_below'
  | 'english_band_short'
  | 'english_not_taken'
  | 'english_predicted'
  | 'english_moi_ok'
  | 'english_moi_rejected'
  | 'english_pathway'
  | 'english_ukvi'
  | 'academic_strong'
  | 'academic_meets'
  | 'academic_below'
  | 'academic_backlogs'
  | 'budget_comfortable'
  | 'budget_tight'
  | 'budget_planning'
  | 'budget_short'
  | 'budget_deposit'
  | 'gap_ok'
  | 'gap_over'
  | 'refusal_risk'
  | 'refusal_low'
  | 'priority_lowest_cost'
  | 'priority_fast_processing'
  | 'priority_post_study_work'
  | 'priority_pr_pathway'
  | 'priority_ranking'
  | 'priority_scholarship'
  | 'priority_weak'
  | 'scholarship_outlook'
  | 'pr_outlook'
  | 'psw_duration'
  | 'work_rights'
  | 'preferred_country'
  | 'test_required'
  | 'no_ug_result'

export interface Reason {
  kind: ReasonKind
  code: ReasonCode
  params: Record<string, string | number>
}

export type Tier = 'strong' | 'possible' | 'unlikely'

export interface CostEstimate {
  tuition: CostBand
  living: CostBand
  firstYearMinimum: number
  firstYearTypical: number
  upfront: number
}

export interface UniversitySuggestionOut {
  name: string
  city: string
  tier: 'competitive' | 'moderate' | 'accessible'
  fieldMatch: boolean
  tuitionBDT: number
  strongFields: string[]
}

export interface MatchResult {
  destinationId: string
  tier: Tier
  score: number
  blocked: boolean
  conditional: boolean
  reasons: Reason[]
  /** Up to three draft university suggestions, field-matched and tiered to the student. */
  universities: UniversitySuggestionOut[]
  breakdown: {
    academic: number
    english: number
    budget: number
    priority: number
    timing: number
  }
  cost: CostEstimate
  /** IELTS-equivalent score the student should target for a comfortable range of options. */
  targetIelts: number
  ieltsMin: number
  ieltsNoBandBelow: number
}

export interface MatchOutput {
  rulesVersion: string
  academicIndex: number | null
  ieltsEquivalent: number | null
  results: MatchResult[]
  strong: string[]
  possible: string[]
  unlikely: string[]
  topScore: number
}
