import { MovementPattern } from "../../types/MovementPattern";
import { DayType } from "./library";
import type { WorkoutItem } from "../components/WorkoutPlayer";

export type Soreness = "green" | "yellow" | "red";
export type Mode = "high_performance" | "walk_out_better";

export type SorenessLogEntry = {
  dateISO: string; // YYYY-MM-DD
  soreness: Partial<Record<MovementPattern, Soreness>>;
};

export type WorkoutLogEntry = {
  dateISO: string; // YYYY-MM-DD
  day: DayType;
  mode: Mode;
  title: string; // "Day A — Accel + Rotation"
  items: WorkoutItem[];
};

export type AppState = {
  lastDay?: DayType;
  soreness?: Partial<Record<MovementPattern, Soreness>>;
  sorenessLog?: SorenessLogEntry[];
  workoutLog?: WorkoutLogEntry[];
};

const KEY = "training:state:v1";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AppState) : {};
  } catch {
    return {};
  }
}

export function saveState(next: AppState) {
  localStorage.setItem(KEY, JSON.stringify(next));
}
