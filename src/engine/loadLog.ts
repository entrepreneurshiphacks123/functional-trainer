// src/engine/loadLog.ts
//
// Stores per-exercise load notes (e.g., "50s", "135x5", etc) in localStorage.
// Keyed by workout item name so it works across plans.

const KEY = "training_os_loadlog_v1";

type LoadLog = Record<string, string>;

function safeParse(raw: string | null): LoadLog {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return {};
    const out: LoadLog = {};
    for (const [k, v] of Object.entries(parsed as any)) {
      if (typeof k === "string" && typeof v === "string") out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

function readAll(): LoadLog {
  return safeParse(localStorage.getItem(KEY));
}

function writeAll(next: LoadLog) {
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
}

/**
 * Get the saved load for a given movement/exercise name.
 */
export function getLoadFor(exerciseName: string): string {
  const all = readAll();
  return all[exerciseName] ?? "";
}

/**
 * Save the load for a given movement/exercise name.
 */
export function setLoadFor(exerciseName: string, load: string) {
  const all = readAll();
  all[exerciseName] = load;
  writeAll(all);
}

/**
 * Optional: clear all saved loads.
 */
export function resetLoadLog() {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // ignore
  }
}
