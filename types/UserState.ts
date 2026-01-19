import { PatternState } from "./PatternState";
import { MovementPattern } from "./MovementPattern";

export interface UserState {
  currentDayType: "A" | "B" | "C" | "D";
  lastWorkoutAt?: number;
  patternStates: Record<MovementPattern, PatternState>;
}
