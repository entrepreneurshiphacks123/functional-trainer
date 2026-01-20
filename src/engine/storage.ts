import { MovementPattern } from "../../types/MovementPattern";

export type Mode = "high_performance" | "low_stress";
export type Soreness = "green" | "yellow" | "red";

export type SorenessMap = Partial<Record<MovementPattern, Soreness>>;

export type WorkoutLogEntry = {
  dateISO: string; // YYYY-MM-DD in LOCAL time
  planId?: string;
  day: string; // e.g. "A", "B", ...
  mode: Mode;
  title: string;
  items: any[];
};

export type AppState = {
  lastDay?: string;
  soreness?: SorenessMap;
  sorenessLog?: Array<{ dateISO: string; soreness: SorenessMap }>;
  workoutLog?: WorkoutLogEntry[];

  // New
  activePlanId?: string;
  dayOverride?: string | null; // manual next-day override
};

const KEY = "training_os_state_v4";

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AppState;
    return parsed ?? {};
  } catch {
    return {};
  }
}

export function saveState(next: AppState) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

export function mergeState(patch: Partial<AppState>) {
  const prev = loadState();
  saveState({ ...prev, ...patch });
}
