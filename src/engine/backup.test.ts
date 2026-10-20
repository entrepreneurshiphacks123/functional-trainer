import { describe, test, expect } from "vitest";
import { BACKUP_KEYS, buildBackup, restoreBackup } from "./backup";

function memStore(init: Record<string, string>) {
  const m = new Map<string, string>(Object.entries(init));
  return {
    getItem: (k: string) => (m.has(k) ? m.get(k)! : null),
    setItem: (k: string, v: string) => void m.set(k, v),
    map: m,
  };
}

describe("backup", () => {
  test("backup carries every app key that exists", () => {
    const store = memStore({ training_os_state_v1: '{"workoutLog":[]}', training_os_loadlog_v1: '{"x":"50"}' });
    const b = buildBackup(store, new Date("2026-10-20T12:00:00Z"));
    expect(b.format).toBe("functional-trainer-backup");
    expect(b.version).toBe(1);
    expect(b.createdAt).toBe("2026-10-20T12:00:00.000Z");
    expect(Object.keys(b.data).sort()).toEqual(["training_os_loadlog_v1", "training_os_state_v1"]);
  });

  test("restore writes every key back", () => {
    const init: Record<string, string> = {};
    BACKUP_KEYS.forEach((k, i) => (init[k] = `value-${i}`));
    const b = buildBackup(memStore(init), new Date());
    const out = memStore({});
    const { restoredKeys } = restoreBackup(out, JSON.parse(JSON.stringify(b)));
    expect(BACKUP_KEYS).toHaveLength(6);
    expect(restoredKeys.sort()).toEqual([...BACKUP_KEYS].sort());
    for (const k of BACKUP_KEYS) expect(out.getItem(k)).toBe(init[k]);
  });

  test("legacy state-only backup restores to training_os_state_v1", () => {
    const out = memStore({});
    expect(restoreBackup(out, { workoutLog: [{ dateISO: "2026-10-01" }] }).restoredKeys).toEqual(["training_os_state_v1"]);
    expect(JSON.parse(out.getItem("training_os_state_v1")!).workoutLog).toHaveLength(1);
  });

  test("garbage is rejected", () => {
    expect(() => restoreBackup(memStore({}), { hello: 1 })).toThrow("Not a Functional Trainer backup");
    expect(() => restoreBackup(memStore({}), null)).toThrow("Not a Functional Trainer backup");
  });

  test("unknown keys in a backup are ignored", () => {
    const out = memStore({});
    const r = restoreBackup(out, { format: "functional-trainer-backup", version: 1, createdAt: "x", data: { evil: "1", wp_state_v3: "{}" } });
    expect(r.restoredKeys).toEqual(["wp_state_v3"]);
    expect(out.getItem("evil")).toBeNull();
  });
});
