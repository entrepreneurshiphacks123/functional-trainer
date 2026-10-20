import { expect, test } from "vitest";
import { toSnapshots, sessionStartPayload } from "./liveSnapshot";
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
  expect(snap.title).toBe("French Contrast 4 of 5 · optional");
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
    snapshots: [{ title: "A", lines: ["Move 0 · 3 x 8"], isLast: true }],
    index: 0,
  });
});

test("on the web, getIndex resolves null and startSession resolves undefined", async () => {
  await expect(getIndex()).resolves.toBeNull();
  await expect(
    startSession({ startedAt: 1, planName: "P", dayTitle: "D", snapshots: [], index: 0 }),
  ).resolves.toBeUndefined();
});
