import { MovementPattern } from "./MovementPattern";

export interface PatternState {
  pattern: MovementPattern;
  fatigueScore: number; // 0-10
  soreness: "green" | "yellow" | "red";
  lastTrainedAt?: number; // epoch ms
}
