import { frenchContrastV3 } from "./frenchContrastV3";
import { frenchContrastTennisV2 } from "./frenchContrastTennisV2";
import { frenchContrastTennis } from "./frenchContrastTennis";
import { functionalFitness45 } from "./functionalFitness";
import { athleticStrengthFootwork } from "./athleticStrengthFootwork";
import { feelBetterJointFriendly } from "./feelBetterJointFriendly";
import { minimalEquipmentHotel } from "./minimalEquipmentHotel";
import { middayTuneup } from "./middayTuneup";
import { hotelBodybuilders } from "./hotelBodybuilders";
import { momStrength } from "./momStrength";

// NOTE: This is intentionally a plain object array (no type import)
// to avoid circular imports with ../plans.ts.
export const BUILTIN_PLANS = [
  frenchContrastV3,        // V3 — 3-day, 5 contrasts, first position = default
  frenchContrastTennisV2,  // V2 — Phase 2, 4-day
  frenchContrastTennis,    // V1 — kept for reference/fallback
  functionalFitness45,
  athleticStrengthFootwork,
  feelBetterJointFriendly,
  minimalEquipmentHotel,
  middayTuneup,
  hotelBodybuilders,
  momStrength,
];
