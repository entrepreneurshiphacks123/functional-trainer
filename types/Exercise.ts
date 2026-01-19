import { MovementPattern } from "./MovementPattern";

export type ShoulderSubTag =
  | "scap_control"
  | "isometric_capacity"
  | "dynamic_stability"
  | "elastic_deceleration";

export interface Exercise {
  id: string;
  name: string;
  primaryPattern: MovementPattern;
  secondaryPattern?: MovementPattern;
  shoulderSubTag?: ShoulderSubTag;
  allowedDays: Array<"A" | "B" | "C" | "D">;
  coordinationLevel: 1 | 2 | 3;
  loadTypes: Array<"bodyweight" | "db" | "kb" | "band" | "medball">;
  isOverhead: boolean;
}
