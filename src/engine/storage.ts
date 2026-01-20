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

  activePlanId?: string;
  dayOverride?: string | null;
};

const KEY = "training_os_state_v4";

// If you also store plans elsewhere, include those keys here so Settings can reset them too.
// (Safe even if they don't exist.)
export const STORAGE_KEYS = {
  state: KEY,
  plans: "training_os_plans_v1",
};

function isObject(x: any) {
  return x && typeof x === "object" && !Array.isArray(x);
}

function sanitizeState(raw: any): AppState {
  if (!isObject(raw)) return {};

  const out: AppState = {};

  if (typeof raw.lastDay === "string") out.lastDay = raw.lastDay;

  if (isObject(raw.soreness)) out.soreness = raw.soreness as SorenessMap;

  if (Array.isArray(raw.sorenessLog)) {
    out.sorenessLog = raw.sorenessLog
      .filter((e: any) => isObject(e) && typeof e.dateISO === "string" && isObject(e.soreness))
      .map((e: any) => ({ dateISO: e.dateISO, soreness: e.soreness as SorenessMap }));
  }

  if (Array.isArray(raw.workoutLog)) {
    out.workoutLog = raw.workoutLog
      .filter((e: any) => isObject(e) && typeof e.dateISO === "string" && typeof e.day === "string")
      .map((e: any) => ({
        dateISO: String(e.dateISO),
        planId: typeof e.planId === "string" ? e.planId : undefined,
        day: String(e.day),
        mode: e.mode === "high_performance" || e.mode === "low_stress" ? e.mode : "low_stress",
        title: typeof e.title === "string" ? e.title : "",
        items: Array.isArray(e.items) ? e.items : [],
      }));
  } else {
    out.workoutLog = [];
  }

  if (typeof raw.activePlanId === "string") out.activePlanId = raw.activePlanId;

  if (raw.dayOverride === null || typeof raw.dayOverride === "string") out.dayOverride = raw.dayOverride;

  return out;
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return sanitizeState(parsed);
  } catch {
    // If JSON is corrupted, return empty (App.tsx will show Recovery UI)
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

export function resetAllAppData() {
  // Clears everything for this domain (most reliable “unbrick”)
  localStorage.clear();
}

export function resetWorkoutDataOnly() {
  // Clears state but keeps uploaded plans (if any)
  localStorage.removeItem(KEY);
}

export function resetPlansOnly() {
  // Keeps workout history, clears plan uploads + selection
  localStorage.removeItem(STORAGE_KEYS.plans);
  const prev = loadState();
  saveState({ ...prev, activePlanId: "functional-fitness-45", dayOverride: null });
}
