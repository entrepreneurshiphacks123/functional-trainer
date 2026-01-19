import { MovementPattern } from "./MovementPattern";

export interface PatternState {
  pattern: MovementPattern;
  fatigueScore: number;
  soreness: "green" | "yellow" | "red";
  lastTrainedAt?: number;
}
