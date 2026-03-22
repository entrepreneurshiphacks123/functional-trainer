// src/engine/library.ts

export type DayType = "A" | "B" | "C" | "D";

export const dayLabels: Record<DayType, string> = {
  A: "Day A",
  B: "Day B",
  C: "Day C",
  D: "Day D",
};

export const dayIntent: Record<DayType, string> = {
  A: "Hip Hinge + Linear Power",
  B: "Squat + Lateral Power",
  C: "Upper Body + Rotation",
  D: "Elastic + Conditioning",
};
