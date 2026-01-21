import { generateWorkoutV1 } from "./generateWorkout";
import { Mode, SorenessMap } from "./storage";
import { BUILTIN_PLANS } from "./builtinPlans";
export { BUILTIN_PLANS };

export type GeneratedPlan = {
  id: string;
  name: string;
  icon?: string; // emoji / short label
  kind: "generated_v1";
  dayKeys: string[]; // for UI (A-D)
};

export type StaticPlanDay = {
  title: string;
  items: any[];
};

export type StaticPlan = {
  id: string;
  name: string;
  icon?: string; // emoji / short label
  kind: "static";
  dayKeys: string[];
  days: Record<string, StaticPlanDay>;
};

export type WorkoutPlan = GeneratedPlan | StaticPlan;

function isNonEmptyString(x: any): x is string {
  return typeof x === "string" && x.trim().length > 0;
}

function isPlanShapeSafe(p: any): p is WorkoutPlan {
  if (!p || typeof p !== "object") return false;
  if (!isNonEmptyString(p.id) || !isNonEmptyString(p.name)) return false;

  if (p.kind === "generated_v1") {
    return Array.isArray(p.dayKeys) && p.dayKeys.length > 0;
  }

  if (p.kind === "static") {
    if (!Array.isArray(p.dayKeys) || p.dayKeys.length === 0) return false;
    if (!p.days || typeof p.days !== "object") return false;
    for (const k of p.dayKeys) {
      const d = p.days[k];
      if (!d || typeof d !== "object") return false;
      if (!isNonEmptyString(d.title)) return false;
      if (!Array.isArray(d.items)) return false;
    }
    return true;
  }

  return false;
}

const PLANS_KEY = "training_os_plans_v1";

// Built-in plans are defined in ./builtinPlans (keeps this file small)

export function loadUserPlans(): WorkoutPlan[] {
  try {
    const raw = localStorage.getItem(PLANS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Filter out legacy/corrupted plans so the app can't crash on undefined dayKeys.
    return parsed.filter(isPlanShapeSafe);
  } catch {
    return [];
  }
}
export function saveUserPlans(plans: WorkoutPlan[]) {
  try {
    localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
  } catch {
    // ignore
  }
}

export function getAllPlans(): WorkoutPlan[] {
  const user = loadUserPlans();
  const byId = new Map<string, WorkoutPlan>();
  for (const p of BUILTIN_PLANS) byId.set(p.id, p);
  for (const p of user) byId.set(p.id, p);
  return Array.from(byId.values());
}

export function findPlan(planId?: string | null): WorkoutPlan {
  const plans = getAllPlans();
  const found = plans.find((p) => p.id === planId);
  return found ?? BUILTIN_PLANS[0];
}

export function validateUploadedPlan(plan: any): string | null {
  if (!plan || typeof plan !== "object") return "Plan must be a JSON object";
  if (typeof plan.id !== "string" || !plan.id.trim()) return "Plan requires string id";
  if (typeof plan.name !== "string" || !plan.name.trim()) return "Plan requires string name";
  if (plan.icon != null && typeof plan.icon !== "string") return "Plan.icon must be a string if provided";
  if (plan.kind !== "static") return "Only static plans are supported for upload (kind: 'static')";
  if (!Array.isArray(plan.dayKeys) || plan.dayKeys.length < 1) return "Plan requires dayKeys array";
  if (!plan.days || typeof plan.days !== "object") return "Plan requires days object";
  for (const k of plan.dayKeys) {
    const d = plan.days[k];
    if (!d) return `Missing days['${k}']`;
    if (typeof d.title !== "string") return `days['${k}'].title must be a string`;
    if (!Array.isArray(d.items)) return `days['${k}'].items must be an array`;
  }
  return null;
}

export function upsertUserPlan(plan: WorkoutPlan) {
  const existing = loadUserPlans();
  const idx = existing.findIndex((p) => p.id === plan.id);
  if (idx >= 0) existing[idx] = plan;
  else existing.unshift(plan);
  saveUserPlans(existing);
}

export function getWorkoutForPlan(args: {
  plan: WorkoutPlan;
  dayKey: string;
  mode: Mode;
  soreness?: SorenessMap;
  lastDay?: string;
}): { day: string; items: any[] } {
  const { plan, dayKey, mode, soreness, lastDay } = args;

  if (plan.kind === "static") {
    // Defensive: if dayKeys missing somehow, fall back to first key in days.
    const fallbackKey = plan.dayKeys?.[0] ?? Object.keys(plan.days)[0] ?? dayKey;
    const d = plan.days[dayKey] ?? plan.days[fallbackKey];
    return { day: dayKey, items: d.items };
  }

  // generated_v1
  // dayKey is ignored by generator unless we override lastDay.
  // We simulate “next day == dayKey” by setting lastDay to the previous day.
  const keys = plan.dayKeys;
  const idx = keys.indexOf(dayKey);
  const prevKey = idx <= 0 ? keys[keys.length - 1] : keys[idx - 1];
  const w = generateWorkoutV1({ lastDay: (prevKey as any) ?? lastDay, mode, soreness });
  return w;
}

// --- Day titles (used for headers / labels) ---
// The generated plan doesn't carry titles in its payload, so we define them here.
const GENERATED_V1_DAY_TITLES: Record<string, string> = {
  A: "Accel + Rotation 🔥",
  B: "Decel + Single-leg",
  C: "Shoulders + Control",
  D: "Elastic + Footwork 🔥",
};

/**
 * Returns the human-friendly day title for a plan/day.
 * - Static plans: uses plan.days[dayKey].title
 * - Generated plan: uses the built-in map above
 */
export function getDayTitleForPlan(plan: WorkoutPlan, dayKey: string): string {
  if (plan.kind === "static") {
    const fallbackKey = plan.dayKeys?.[0] ?? Object.keys(plan.days)[0] ?? dayKey;
    return (plan.days[dayKey] ?? plan.days[fallbackKey])?.title ?? `Day ${dayKey}`;
  }
  return GENERATED_V1_DAY_TITLES[dayKey] ?? `Day ${dayKey}`;
}