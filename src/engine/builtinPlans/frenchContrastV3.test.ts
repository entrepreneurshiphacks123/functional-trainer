import { expect, test } from "vitest";
import { frenchContrastV3 } from "./frenchContrastV3";
import { getWorkoutForPlan, sorenessDays } from "../plans";
import type { WorkoutItem } from "../../../types/WorkoutItem";

const dedupe = (xs: string[]) => xs.filter((x, i) => i === 0 || x !== xs[i - 1]);
const count = (items: WorkoutItem[], slot: string) => items.filter((i) => i.slot === slot).length;
const all = Object.values(frenchContrastV3.days).flatMap((d) => d.items as WorkoutItem[]);

test("three days A, B, C", () => {
  expect(frenchContrastV3.dayKeys).toEqual(["A", "B", "C"]);
});

for (const k of ["A", "B", "C"]) {
  const items = frenchContrastV3.days[k].items as WorkoutItem[];

  test(`day ${k}: section order`, () => {
    expect(dedupe(items.map((i) => i.slot))).toEqual([
      "prep", "core_activation", "fc_block", "athletic", "cooldown",
    ]);
  });

  test(`day ${k}: 5 blocks of 4, only 4-5 optional`, () => {
    for (const b of [1, 2, 3, 4, 5]) {
      const blk = items.filter((i) => i.fcBlock === b);
      expect(blk.map((i) => i.fcPosition)).toEqual([1, 2, 3, 4]);
      expect(blk.every((i) => !!i.optional === b >= 4)).toBe(true);
    }
  });

  test(`day ${k}: finisher has 3-4 athletic items, no strength/accessory`, () => {
    const n = count(items, "athletic");
    expect(n).toBeGreaterThanOrEqual(3);
    expect(n).toBeLessThanOrEqual(4);
    expect(count(items, "strength")).toBe(0);
    expect(count(items, "accessory")).toBe(0);
  });

  test(`day ${k}: focus-area rules`, () => {
    expect(items.some((i) => i.slot === "prep" && /slider lateral lunge/i.test(i.name))).toBe(true);
    expect(items.some((i) => i.slot === "fc_block" && (i.fcBlock ?? 9) <= 3 && /lateral|cossack|skater/i.test(i.name))).toBe(true);
    const core = items.filter((i) => i.slot === "core_activation");
    expect(core.length).toBeGreaterThanOrEqual(5);
    if (k !== "B") expect(core.some((i) => /copenhagen/i.test(i.name))).toBe(true);
    expect(items.some((i) => i.slot === "athletic" && /abduct|adduct|band walk/i.test(i.name))).toBe(true);
    const p4 = items.filter((i) => i.fcPosition === 4);
    expect(p4.filter((i) => /drop jump/i.test(i.name)).length).toBeLessThanOrEqual(2);
    expect(p4.some((i) => /split step|first step/i.test(i.name))).toBe(true);
  });

  test(`day ${k}: at most one drop-family move in the FC blocks`, () => {
    expect(items.filter((i) => i.slot === "fc_block" && /drop/i.test(i.name)).length).toBeLessThanOrEqual(1);
  });

  test(`day ${k}: nothing on the mat after core`, () => {
    const after = items.filter((i) => ["fc_block", "athletic", "cooldown"].includes(i.slot));
    expect(after.filter((i) => /plank|dead bug|side-lying|slider (ham|curl)|glute bridge|lying/i.test(i.name)).map((i) => i.id)).toEqual([]);
  });

  test(`day ${k}: core has at most one floor move`, () => {
    const core = items.filter((i) => i.slot === "core_activation");
    expect(core.filter((i) => /plank|dead bug|side-lying|bridge|lying/i.test(i.name)).length).toBeLessThanOrEqual(1);
  });

  test(`day ${k}: base and high-performance modes return the same session`, () => {
    const base = getWorkoutForPlan({ plan: frenchContrastV3, dayKey: k, mode: "base" }).items;
    const hp = getWorkoutForPlan({ plan: frenchContrastV3, dayKey: k, mode: "high_performance" }).items;
    expect(hp).toEqual(base);
  });
}

test("ids unique across the plan", () => {
  expect(new Set(all.map((i) => i.id)).size).toBe(all.length);
});

test("every item has a real how-to", () => {
  expect(all.filter((i) => (i.howTo ?? "").trim().length <= 40).map((i) => i.id)).toEqual([]);
});

test("banned items and wording are absent", () => {
  expect(all.filter((i) => /chest[- ]supported|zercher|trap bar|ball catch|reaction ball|partner/i.test(`${i.name} ${i.howTo}`)).map((i) => i.id)).toEqual([]);
  expect(all.filter((i) => /2 rounds|run .* rounds/i.test(i.howTo ?? "")).map((i) => i.id)).toEqual([]);
  expect(all.some((i) => i.hpOnly || i.slot === "individual")).toBe(false);
});

test("no em-dash in any name, description or how-to", () => {
  expect(all.filter((i) => /—/.test(`${i.name} ${i.description ?? ""} ${i.howTo ?? ""}`)).map((i) => i.id)).toEqual([]);
});

test("Day C opens with the back squat", () => {
  const first = frenchContrastV3.days.C.items.find((i: WorkoutItem) => i.slot === "fc_block");
  expect(first?.name).toMatch(/back squat/i);
});

test("suggested loads don't repeat the ~ the player already adds", () => {
  expect(all.filter((i) => /^~/.test(i.suggestedLoad ?? "")).map((i) => i.id)).toEqual([]);
});

test("soreness day mapping follows V3's own layout", () => {
  expect(sorenessDays(frenchContrastV3)).toEqual({ shoulder: "B", knee: "C" });
  expect(frenchContrastV3.days.B.title).toMatch(/upper/i);
  expect(frenchContrastV3.days.C.title).toMatch(/squat/i);
});
