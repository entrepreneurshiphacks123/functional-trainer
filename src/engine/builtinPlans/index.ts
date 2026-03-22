import { frenchContrastTennis } from "./frenchContrastTennis";
import { functionalFitness45 } from "./functionalFitness";
import { athleticStrengthFootwork } from "./athleticStrengthFootwork";
import { feelBetterJointFriendly } from "./feelBetterJointFriendly";
import { minimalEquipmentHotel } from "./minimalEquipmentHotel";
import { middayTuneup } from "./middayTuneup";
import { hotelBodybuilders } from "./hotelBodybuilders";

// NOTE: This is intentionally a plain object array (no type import)
// to avoid circular imports with ../plans.ts.
export const BUILTIN_PLANS = [
  frenchContrastTennis,    // NEW — first position = default
  functionalFitness45,
  athleticStrengthFootwork,
  feelBetterJointFriendly,
  minimalEquipmentHotel,
  middayTuneup,
  hotelBodybuilders,
];
