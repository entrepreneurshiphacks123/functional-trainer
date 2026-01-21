// src/engine/storage.ts
import type { MovementPattern } from "../../types/MovementPattern";

export type Mode = "base" | "high_performance";

export type Soreness = "green" | "yellow" | "red";

export type SorenessMap = Partial<Record<MovementPattern, Soreness>>;

export type SorenessLogEntry = {
  dateISO: string; // YYYY-MM-DD
  soreness: SorenessMap;
};

export type WorkoutLogEntry = {
  dateISO: string; // YYYY-MM-DD
  planId: string;
  day: string; // "A" | "B" | "C" | "D" (string to be tolerant)
  mode: Mode;
  title: string;
  items: any[];
};

export type AppState = {
  lastDay?: string;
  soreness: SorenessMap;
  sorenessLog?: SorenessLogEntry[];
  workoutLog?: WorkoutLogEntry[];
  activePlanId?: string;
  dayOverride?: string | null;
};

const STORAGE_KEY = "training_os_state_v1";

const defaultState: AppState = {
  lastDay: undefined,
  soreness: {},
  sorenessLog: [],
  workoutLog: [],
  activePlanId: "functional-fitness-45",
  dayOverride: null,
};

function isObject(x: unknown): x is Record<string, any> {
  return !!x && typeof x === "object" && !Array.isArray(x);
}

function safeString(x: any): string | undefined {
  return typeof x === "string" && x.trim().length ? x : undefined;
}

function safeMode(x: any): Mode | undefined {
  return x === "base" || x === "high_performance" ? x : undefined;
}

function safeSoreness(x: any): Soreness | undefined {
  return x === "green" || x === "yellow" || x === "red" ? x : undefined;
}

function sanitizeSorenessMap(raw: any): SorenessMap {
  if (!isObject(raw)) return {};
  const out: SorenessMap = {};
  for (const [k, v] of Object.entries(raw)) {
    const sv = safeSoreness(v);
    if (sv) (out as any)[k] = sv;
  }
  return out;
}

function sanitizeWorkoutLog(raw: any): WorkoutLogEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((e) => isObject(e))
    .map((e) => ({
      dateISO: safeString(e.dateISO) ?? "",
      planId: safeString(e.planId) ?? "",
      day: safeString(e.day) ?? "",
      mode: safeMode(e.mode) ?? "base",
      title: safeString(e.title) ?? "",
      items: Array.isArray(e.items) ? e.items : [],
    }))
    .filter((e) => e.dateISO && e.planId);
}

function sanitizeSorenessLog(raw: any): SorenessLogEntry[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((e) => isObject(e))
    .map((e) => ({
      dateISO: safeString(e.dateISO) ?? "",
      soreness: sanitizeSorenessMap(e.soreness),
    }))
    .filter((e) => e.dateISO);
}

/**
 * Load persisted app state from localStorage.
 * Defensive against legacy/corrupted shapes.
 */
export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...defaultState };
    const parsed = JSON.parse(raw);

    if (!isObject(parsed)) return { ...defaultState };

    return {
      lastDay: safeString(parsed.lastDay),
      soreness: sanitizeSorenessMap(parsed.soreness),
      sorenessLog: sanitizeSorenessLog(parsed.sorenessLog),
      workoutLog: sanitizeWorkoutLog(parsed.workoutLog),
      activePlanId: safeString(parsed.activePlanId) ?? defaultState.activePlanId,
      dayOverride: parsed.dayOverride === null ? null : safeString(parsed.dayOverride) ?? null,
    };
  } catch {
    return { ...defaultState };
  }
}

/**
 * Save full app state. Keep it tolerant to partials so caller can patch.
 */
export function saveState(next: AppState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

/**
 * Optional helper if you ever need a hard reset button.
 */
export function resetAllAppData() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
