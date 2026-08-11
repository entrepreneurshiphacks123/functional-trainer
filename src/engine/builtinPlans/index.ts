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
  frenchContrastTennisV2,  // NEW — Phase 2, first position = default
  frenchContrastTennis,    // V1 — kept for reference/fallback
  functionalFitness45,
  athleticStrengthFootwork,
  feelBetterJointFriendly,
  minimalEquipmentHotel,
  middayTuneup,
  hotelBodybuilders,
  momStrength,
];
