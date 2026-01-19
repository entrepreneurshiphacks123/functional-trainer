import { Exercise } from "../../types/Exercise";
import { UserState } from "../../types/UserState";

export function generateWorkout(
  user: UserState,
  mode: "high_performance" | "walk_out_better",
  exercises: Exercise[]
) {
  // TODO: implement adaptive logic
  return {
    dayType: user.currentDayType,
    exercises: []
  };
}
