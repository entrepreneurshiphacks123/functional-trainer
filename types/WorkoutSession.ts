import { MovementPattern } from "./MovementPattern";

export interface WorkoutSession {
  id: string;
  dayType: "A" | "B" | "C" | "D";
  mode: "high_performance" | "walk_out_better";
  startedAt: number;
  completedAt?: number;

  exercises: Array<{
    exerciseId: string;
    slot: "prep" | "strength" | "athletic" | "finish";
    patternStress: Partial<Record<MovementPattern, number>>;
  }>;

  sorenessFeedback: Partial<Record<MovementPattern, "green" | "yellow" | "red">>;
}
