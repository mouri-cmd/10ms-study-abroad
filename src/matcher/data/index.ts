// ============================================================
// Destination registry.
//
// To add a country: drop its research JSON into ./destinations/,
// add an entry to editorial.json, and import it below. Everything
// else — unit conversion, missing levels, priority alignment — is
// handled by normalise().
//
// Bump RULES_VERSION on every data change. That version is written
// into each sheet row, so a counsellor can always tell which rules
// produced a given recommendation.
// ============================================================

import { normalise } from '../engine/normalise'
import type { Destination } from '../engine/types'

import australia from './destinations/australia.json'
import canada from './destinations/canada.json'
import malaysia from './destinations/malaysia.json'
import malta from './destinations/malta.json'
import newZealand from './destinations/new_zealand.json'
import uk from './destinations/uk.json'
import usa from './destinations/usa.json'

export const RULES_VERSION = '0.5.0'

const RAW = [australia, uk, canada, newZealand, usa, malta, malaysia]

export const DESTINATIONS: Destination[] = RAW.map((r) => normalise(r as never))

/** True once every country carries a lastVerified date. */
export const ALL_VERIFIED = DESTINATIONS.every((d) => d.verified)

export const UNVERIFIED = DESTINATIONS.filter((d) => !d.verified).map((d) => d.id)

export const RULES = {
  rulesVersion: RULES_VERSION,
  allVerified: ALL_VERIFIED,
  unverified: UNVERIFIED,
  destinations: DESTINATIONS,
}
