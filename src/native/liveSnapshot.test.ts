import { expect, test } from "vitest";
import { toSnapshots, sessionStartPayload, sessionTransition, shortTitle, abbreviate } from "./liveSnapshot";
import { getIndex, startSession } from "./bridge";
import type { WorkoutScreen } from "../components/WorkoutPlayer";
import type { WorkoutItem } from "../../types/WorkoutItem";

const item = (i: number, name = `Move ${i}`, dose = "3 x 8"): WorkoutItem => ({
  id: `i${i}`,
  slot: "individual",
  name,
  dose,
});

const screen = (label: string, count: number): WorkoutScreen => ({
  type: "single",
  label,
  items: Array.from({ length: count }, (_, i) => item(i)),
});

test("a 6-item screen gives 5 lines ending in +2 more", () => {
  const [snap] = toSnapshots([screen("Warm-up", 6)]);
  expect(snap.lines).toHaveLength(5);
  expect(snap.lines.slice(0, 4)).toEqual(["Move 0 · 3 x 8", "Move 1 · 3 x 8", "Move 2 · 3 x 8", "Move 3 · 3 x 8"]);
  expect(snap.lines[4]).toBe("+2 more");
});

test("a 5-item screen shows all 5 lines", () => {
  const [snap] = toSnapshots([screen("Warm-up", 5)]);
  expect(snap.lines).toHaveLength(5);
  expect(snap.lines[4]).toBe("Move 4 · 3 x 8");
});

test("a 4-item FC screen gives 4 name · dose lines and keeps the label", () => {
  const fc: WorkoutScreen = {
    type: "fc_block",
    label: "French Contrast 4 of 5 · optional",
    items: [item(0, "Barbell back squat", "5 @ 80%"), item(1), item(2), item(3)],
  };
  const [snap] = toSnapshots([fc]);
  expect(snap.title).toBe("Contrast 4/5 · opt");
  expect(snap.lines).toHaveLength(4);
  expect(snap.lines[0]).toBe("Barbell back squat · 5 @ 80%");
});

test("only the last screen is isLast", () => {
  const snaps = toSnapshots([screen("A", 1), screen("B", 1), screen("C", 1)]);
  expect(snaps.map((s) => s.isLast)).toEqual([false, false, true]);
});

test("sessionStartPayload is null when startedAt is null", () => {
  expect(
    sessionStartPayload({ startedAt: null, planName: "P", dayTitle: "D", screens: [screen("A", 1)], index: 0 }),
  ).toBeNull();
});

test("sessionStartPayload carries the snapshots and index", () => {
  const p = sessionStartPayload({ startedAt: 123, planName: "P", dayTitle: "D", screens: [screen("A", 1)], index: 0 });
  expect(p).toEqual({
    startedAt: 123,
    planName: "P",
    dayTitle: "D",
    snapshots: [
      { title: "A", lines: ["Move 0 · 3 x 8"], rows: [{ name: "Move 0", dose: "3 x 8", pos: null }], isLast: true },
    ],
    index: 0,
  });
});

test("on the web, getIndex resolves null and startSession resolves undefined", async () => {
  await expect(getIndex()).resolves.toBeNull();
  await expect(
    startSession({ startedAt: 1, planName: "P", dayTitle: "D", snapshots: [], index: 0 }),
  ).resolves.toBeUndefined();
});

test("sessionTransition decides start/end/restart from previous and next startedAt", () => {
  expect(sessionTransition(null, 5)).toBe("start");
  expect(sessionTransition(5, null)).toBe("end");
  expect(sessionTransition(5, 9)).toBe("restart");
  expect(sessionTransition(5, 5)).toBe("none");
  expect(sessionTransition(null, null)).toBe("none");
});

test("shortTitle shortens FC labels and leaves others alone", () => {
  expect(shortTitle("French Contrast 3 of 5")).toBe("Contrast 3/5");
  expect(shortTitle("French Contrast 4 of 5 · optional")).toBe("Contrast 4/5 · opt");
  for (const l of ["Warm-up", "Athletic Complex", "Barbell deadlift"]) expect(shortTitle(l)).toBe(l);
});

test("abbreviate shortens the whole word Lateral only", () => {
  expect(abbreviate("Lateral raise")).toBe("Lat raise");
  expect(abbreviate("Band lateral walk")).toBe("Band lat walk");
  expect(abbreviate("Collateral")).toBe("Collateral");
});

test("abbreviation applies to rows and lines", () => {
  const sc: WorkoutScreen = { type: "single", label: "X", items: [item(0, "Lateral lunge", "3 x 8")] };
  const [snap] = toSnapshots([sc]);
  expect(snap.lines[0]).toBe("Lat lunge · 3 x 8");
  expect(snap.rows[0]).toEqual({ name: "Lat lunge", dose: "3 x 8", pos: null });
});

test("rows: 4 items give 4 rows; 5 items give 3 rows plus +2 more", () => {
  expect(toSnapshots([screen("W", 4)])[0].rows).toHaveLength(4);
  const rows = toSnapshots([screen("W", 5)])[0].rows;
  expect(rows).toHaveLength(4);
  expect(rows.slice(0, 3).map((r) => r.name)).toEqual(["Move 0", "Move 1", "Move 2"]);
  expect(rows[3]).toEqual({ name: "+2 more", dose: "", pos: null });
});

test("pos is fcPosition on FC rows and null elsewhere", () => {
  const fc: WorkoutScreen = {
    type: "fc_block",
    label: "French Contrast 1 of 5",
    items: [1, 2, 3, 4].map((p) => ({ ...item(p), fcPosition: p as 1 | 2 | 3 | 4 })),
  };
  expect(toSnapshots([fc])[0].rows.map((r) => r.pos)).toEqual([1, 2, 3, 4]);
  const single: WorkoutScreen = { type: "single", label: "S", items: [{ ...item(0), fcPosition: 2 }] };
  expect(toSnapshots([single])[0].rows[0].pos).toBeNull();
});
