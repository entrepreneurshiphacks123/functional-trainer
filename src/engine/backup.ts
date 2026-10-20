export const BACKUP_KEYS: string[] = [
  "training_os_state_v1",
  "training_os_plans_v1",
  "training_os_plan_order_v1",
  "training_os_loadlog_v1",
  "training_os_theme_v1",
  "wp_state_v3",
];

const FORMAT = "functional-trainer-backup";

export function buildBackup(store: Pick<Storage, "getItem">, now: Date) {
  const data: Record<string, string> = {};
  for (const k of BACKUP_KEYS) {
    const v = store.getItem(k);
    if (v !== null) data[k] = v;
  }
  return { format: FORMAT as typeof FORMAT, version: 1 as const, createdAt: now.toISOString(), data };
}

/** Pure dry pass: the key/value pairs a restore would write. Throws on anything that isn't a backup. */
export function inspectBackup(parsed: unknown): Record<string, string> {
  const p = parsed as any;
  if (p && typeof p === "object" && p.format === FORMAT && p.data && typeof p.data === "object") {
    const out: Record<string, string> = {};
    for (const k of BACKUP_KEYS) if (typeof p.data[k] === "string") out[k] = p.data[k];
    return out;
  }
  if (p && typeof p === "object" && Array.isArray(p.workoutLog)) {
    return { training_os_state_v1: JSON.stringify(p) };
  }
  throw new Error("Not a Functional Trainer backup");
}

export function restoreBackup(store: Pick<Storage, "setItem">, parsed: unknown): { restoredKeys: string[] } {
  const entries = inspectBackup(parsed);
  const restoredKeys = Object.keys(entries);
  for (const k of restoredKeys) store.setItem(k, entries[k]);
  return { restoredKeys };
}
