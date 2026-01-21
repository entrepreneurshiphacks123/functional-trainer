// src/engine/library.ts

export type DayType = "A" | "B" | "C" | "D";

export const dayLabels: Record<DayType, string> = {
  A: "Day A",
  B: "Day B",
  C: "Day C",
  D: "Day D",
};

export const dayIntent: Record<DayType, string> = {
  A: "Accel + Rotation",
  B: "Decel + Single-leg",
  C: "Shoulders + Control",
  D: "Elastic + Footwork",
};
