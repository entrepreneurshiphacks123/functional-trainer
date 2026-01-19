import { Exercise } from "../../types/Exercise";
import { UserState } from "../../types/UserState";

export type Mode = "high_performance" | "walk_out_better";

export function generateWorkout(
  user: UserState,
  mode: Mode,
  exercises: Exercise[]
) {
  // TODO: implement adaptive logic:
  // 1) decay fatigue
  // 2) select next day type (A–D) based on lowest fatigue + soreness locks
  // 3) fill slots (prep/strength/athletic/finish)
  // 4) apply mode modifiers (volume/density/complexity)
  return {
    dayType: user.currentDayType,
    mode,
    exercises: [] as Array<{ exerciseId: string; slot: "prep" | "strength" | "athletic" | "finish" }>,
  };
}
