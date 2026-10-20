import { expect, test } from "vitest";
import { buildScreens, skipTargetIndex } from "./WorkoutPlayer";
import { getWorkoutForPlan, sorenessDays } from "../engine/plans";
import { frenchContrastTennisV2 } from "../engine/builtinPlans/frenchContrastTennisV2";
import type { WorkoutItem } from "../../types/WorkoutItem";

const block = (b: number, optional?: boolean): WorkoutItem[] =>
  ([1, 2, 3, 4] as const).map((pos) => ({
    id: `fc${b}_${pos}`,
    slot: "fc_block",
    name: `Block ${b} item ${pos}`,
    dose: "1",
    fcBlock: b,
    fcPosition: pos,
    optional,
  }));

let n = 0;
const ath = (): WorkoutItem => ({ id: `ath${n++}`, slot: "athletic", name: "Complex", dose: "1" });
const cool = (): WorkoutItem => ({ id: `cool${n++}`, slot: "cooldown", name: "Cooldown", dose: "1" });

test("optional FC block label gets suffix", () => {
  const screens = buildScreens([...block(1), ...block(4, true), ...block(5, true), ath(), cool()]);
  expect(screens[0].label).toBe("French Contrast 1 of 3");
  expect(screens[1].label).toBe("French Contrast 4 of 3 · optional");
});

test("skip from block 4 lands on first athletic screen, past block 5", () => {
  const screens = buildScreens([...block(1), ...block(4, true), ...block(5, true), ath(), ath(), cool()]);
  expect(skipTargetIndex(screens, 1)).toBe(3);
  expect(skipTargetIndex(screens, 2)).toBe(3);
});

test("no skip from a non-optional block", () => {
  expect(skipTargetIndex(buildScreens([...block(1), ath()]), 0)).toBeNull();
});

test("no skip when there is no athletic screen", () => {
  expect(skipTargetIndex(buildScreens([...block(1, true), cool()]), 0)).toBeNull();
});

test("V2 labels unchanged", () => {
  const items = getWorkoutForPlan({ plan: frenchContrastTennisV2, dayKey: "A", mode: "high_performance" }).items;
  const fcLabels = buildScreens(items)
    .filter((s) => s.type === "fc_block")
    .map((s) => s.label);
  expect(fcLabels).toEqual(["French Contrast 1 of 3", "French Contrast 2 of 3", "French Contrast 3 of 3"]);
});

test("plans without their own soreness mapping keep the original C/B days", () => {
  expect(sorenessDays(frenchContrastTennisV2)).toEqual({ shoulder: "C", knee: "B" });
});
