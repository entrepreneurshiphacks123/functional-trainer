import { MovementPattern } from "../../types/MovementPattern";

export type Soreness = "green" | "yellow" | "red";
export type Mode = "high_performance" | "walk_out_better";

export type AppState = {
  lastDay?: "A" | "B" | "C" | "D";
  soreness?: Partial<Record<MovementPattern, Soreness>>;
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
