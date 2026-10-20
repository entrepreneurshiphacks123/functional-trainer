import { expect, test } from "vitest";
import { frenchContrastV3 } from "./frenchContrastV3";
import { getWorkoutForPlan } from "../plans";
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
      "prep", "core_activation", "fc_block", "athletic", "strength", "accessory", "cooldown",
    ]);
  });

  test(`day ${k}: 5 blocks of 4, only 4-5 optional`, () => {
    for (const b of [1, 2, 3, 4, 5]) {
      const blk = items.filter((i) => i.fcBlock === b);
      expect(blk.map((i) => i.fcPosition)).toEqual([1, 2, 3, 4]);
      expect(blk.every((i) => !!i.optional === b >= 4)).toBe(true);
    }
  });

  test(`day ${k}: 2 complexes, 3 lifts in own groups, 2 small movements`, () => {
    expect(count(items, "athletic")).toBe(2);
    expect(count(items, "accessory")).toBe(2);
    const lifts = items.filter((i) => i.slot === "strength");
    expect(lifts).toHaveLength(3);
    expect(new Set(lifts.map((i) => i.group)).size).toBe(3);
  });

  test(`day ${k}: focus-area rules`, () => {
    expect(items.some((i) => i.slot === "prep" && /slider lateral lunge/i.test(i.name))).toBe(true);
    expect(items.some((i) => i.slot === "fc_block" && (i.fcBlock ?? 9) <= 3 && /lateral|cossack|skater/i.test(i.name))).toBe(true);
    expect(items.some((i) => i.slot === "accessory" && /hold|iso|wall sit|copenhagen/i.test(i.name))).toBe(true);
    expect(items.some((i) => i.slot === "accessory" && /copenhagen|abduct/i.test(i.name))).toBe(true);
    const p4 = items.filter((i) => i.fcPosition === 4);
    expect(p4.filter((i) => /drop jump/i.test(i.name)).length).toBeLessThanOrEqual(2);
    expect(p4.some((i) => /split step|first step/i.test(i.name))).toBe(true);
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

test("Day C opens with the back squat", () => {
  const first = frenchContrastV3.days.C.items.find((i: WorkoutItem) => i.slot === "fc_block");
  expect(first?.name).toMatch(/back squat/i);
});

test("suggested loads don't repeat the ~ the player already adds", () => {
  expect(all.filter((i) => /^~/.test(i.suggestedLoad ?? "")).map((i) => i.id)).toEqual([]);
});
