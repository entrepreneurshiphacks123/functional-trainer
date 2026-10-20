# French Contrast V3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add French Contrast V3, a 3-day static plan with 5 contrast blocks a day (blocks 4-5 optional and skippable), to the existing web app.

**Architecture:** V3 is a new `StaticPlan` file in `src/engine/builtinPlans/`. One new optional field on `WorkoutItem` (`optional`) drives two player changes: a " · optional" suffix on the block label and a "Skip to complexes" button. Screen-building logic gets exported so it can be unit-tested. The native iPhone app is a separate plan; nothing here touches Capacitor or Swift.

**Tech Stack:** Vite 5, React 18, TypeScript 5. Vitest is added as the test runner (dev dependency only).

**Spec:** `docs/superpowers/specs/2026-10-20-french-contrast-v3-design.md`

## Global Constraints

- Don't change V2 (`frenchContrastTennisV2.ts`) or any other existing plan file.
- Item ids are unique across the whole plan. Prefix with the day: `v3a_`, `v3b_`, `v3c_`.
- Every item has `howTo`, in V2's voice and detail (cues, what to feel, common mistake).
- No chest-supported rows. No Zercher squat (back squat replaces it). No trap bar. No reactive ball catches or anything that needs a partner.
- Barbell lifts are allowed freely (barbell and squat rack are available).
- Equipment available: barbell and squat rack, dumbbells, kettlebell, landmine, cable, bands, sliders, Bosu ball, sandbag, med ball, TRX, flat bench, incline bench, step-up block, plyo boxes in several heights.
- Each FC block is done **once** (no rounds). Do not write "run 2 rounds" anywhere.
- Rest guidance stays as text, following V2: about 20s within a block, 2-3 min between blocks.
- Commits end with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. No pushing without Steven's yes.

## Review Focus

1. **Plans without an `athletic` section** (every plan but V3 and V2): the skip button must not appear, since there's nowhere to skip to. Pinned in Task 1 (`skipTargetIndex` returns `null`).
2. **Skip from block 4** must pass block 5 too, landing on the first complex, not on block 5. Pinned in Task 1.
3. **Other plans' labels are unchanged.** V2's FC screens still read "French Contrast N of 3" with no suffix. Pinned in Task 1.
4. **Base vs High Performance mode** must return the identical V3 session (V3 must not use `hpOnly` or `individual`). Pinned in Task 3.
5. **Resuming a saved session** after a skip should land back on the complexes screen. The existing `wp_state_v3` save already stores `screenIdx`, and skipping just sets it. Checked by hand in Task 4.

---

### Task 1: Optional blocks in the screen model, with tests

**Files:**
- Modify: `package.json` (add `vitest` dev dependency and a `test` script)
- Modify: `types/WorkoutItem.ts` (add field)
- Modify: `src/components/WorkoutPlayer.tsx` (export `WorkoutScreen` and `buildScreens`; label suffix; add `skipTargetIndex`)
- Test: `src/components/workoutScreens.test.ts`

**Interfaces:**
- Produces: `WorkoutItem.optional?: boolean`
- Produces: `export function buildScreens(items: WorkoutItem[]): WorkoutScreen[]` (existing function, now exported, along with `export type WorkoutScreen`)
- Produces: `export function skipTargetIndex(screens: WorkoutScreen[], fromIdx: number): number | null`. Returns the index of the first screen after `fromIdx` whose first item has `slot === "athletic"`, only when `screens[fromIdx]` is an `fc_block` screen containing an item with `optional: true`. Otherwise it returns `null`.

- [ ] **Step 1: Install and add the test runner**

Run: `npm install && npm install -D vitest@2.1.9`
Add to `package.json` scripts: `"test": "vitest run"`.
Expected: `npx vitest --version` prints 2.1.9.

- [ ] **Step 2: Write the failing tests** in `src/components/workoutScreens.test.ts`

Build items inline with a small helper `fc(block, pos, optional?)` that makes `{ id, slot: "fc_block", name, dose: "1", fcBlock, fcPosition, optional }`, plus `athletic` and `cooldown` items.

```ts
test("optional FC block label gets suffix", () => {
  const screens = buildScreens([...block(1), ...block(4, true), ...block(5, true), ath(), cool()]);
  expect(screens[0].label).toBe("French Contrast 1 of 3");
  expect(screens[1].label).toBe("French Contrast 4 of 3 · optional"); // see note
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
  const fcLabels = buildScreens(items).filter((s) => s.type === "fc_block").map((s) => s.label);
  expect(fcLabels).toEqual(["French Contrast 1 of 3", "French Contrast 2 of 3", "French Contrast 3 of 3"]);
});
```

Note: the existing "N of M" counts distinct block numbers in the item list. In real V3 data the blocks are 1-5, so the label reads "French Contrast 4 of 5 · optional". The test fixture uses blocks 1, 4 and 5 only, which is why it says "of 3". Keep the existing counting.

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL. `skipTargetIndex` and `buildScreens` are not exported.

- [ ] **Step 4: Implement**

Add `optional?: boolean;` to `WorkoutItem`. Export `WorkoutScreen` and `buildScreens`. In the FC branch of `buildScreens`, append `" · optional"` to the label when any item in the block has `optional`. Add `skipTargetIndex` beside `buildScreens`.

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test && npx tsc --noEmit -p .`
Expected: 5 tests pass. No type errors.

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json types/WorkoutItem.ts src/components/WorkoutPlayer.tsx src/components/workoutScreens.test.ts
git commit -m "Add optional FC blocks and skip target to the workout screen model"
```

---

### Task 2: "Skip to complexes" button in the player

**Files:**
- Modify: `src/components/WorkoutPlayer.tsx` (render only; the nav area near the existing `Next: {label}` preview, around line 565)

**Interfaces:**
- Consumes: `skipTargetIndex(screens, screenIdx)` from Task 1.

- [ ] **Step 1: Render the button**

When `skipTargetIndex(screens, screenIdx)` is not `null`, show a ghost `Button` labelled `Skip to complexes ⏭` above the Prev/Next row. On click it calls `haptic()`, then `setScreenIdx(target)`. Use the existing `Button` primitive with `variant="ghost"`; add no new styles.

- [ ] **Step 2: Type check and build**

Run: `npx tsc --noEmit -p . && npm run build`
Expected: no errors; `dist/` builds.

- [ ] **Step 3: Commit**

```bash
git add src/components/WorkoutPlayer.tsx
git commit -m "Add Skip to complexes button on optional contrast blocks"
```

(It gets checked by hand in Task 4, once V3 data exists.)

---

### Task 3: V3 exercise list (Steven approves), then the plan file

**Files:**
- Create: `docs/superpowers/plans/2026-10-20-french-contrast-v3-exercises.md` (review table)
- Create: `src/engine/builtinPlans/frenchContrastV3.ts`
- Modify: `src/engine/builtinPlans/index.ts` (import, and put `frenchContrastV3` first in `BUILTIN_PLANS` with the comment `// V3 — 3-day, 5 contrasts, first position = default`)
- Test: `src/engine/builtinPlans/frenchContrastV3.test.ts`

**Interfaces:**
- Consumes: `WorkoutItem.optional` (Task 1); `StaticPlan` from `src/engine/plans.ts`.
- Produces: `export const frenchContrastV3: StaticPlan` with `id: "french-contrast-v3"`, `name: "French Contrast V3"`, `icon: "🎾"`, `kind: "static"`, `dayKeys: ["A","B","C"]`, and day titles `"Hinge + Linear"`, `"Upper + Rotation"`, `"Squat + Lateral"`.

- [ ] **Step 1: Draft the exercise table for Steven**

One table per day, with columns section, name, dose, equipment, and one line of why. Follow the spec's "four focus areas" and the 4th-slot mix. Day structure, in order:
- `prep` (include "Slider lateral lunge matrix")
- `core_activation`: 3 items covering anti-extension, anti-rotation and anti-lateral-flexion
- `fc_block` 1-5, 4 items each (`fcPosition` 1 heavy, 2 plyo, 3 loaded jump, 4 fast/reactive); blocks 4-5 `optional: true`
- `athletic` ×2, with one loaded core movement across `athletic` or `accessory`
- `strength` ×3, each in its own `group` (the lift name), 3-4 sets of 5-8
- `accessory` ×2: at least one isometric hold, and one Copenhagen or banded abduction
- `cooldown`

Put the most important blocks in 1-3. Day C's first block opens with the back squat. Drops name a box height ("12-18 in box").

- [ ] **Step 2: Stop and get Steven's approval of the table.** Apply his edits. Do not write the plan file before he says yes.

- [ ] **Step 3: Write the failing structure test** in `frenchContrastV3.test.ts`

For each day key, using `const items = frenchContrastV3.days[k].items`:

```ts
expect(frenchContrastV3.dayKeys).toEqual(["A","B","C"]);
// section order
expect(dedupe(items.map(i => i.slot))).toEqual(
  ["prep","core_activation","fc_block","athletic","strength","accessory","cooldown"]);
// 5 blocks x positions 1-4, blocks 4-5 optional only
for (const b of [1,2,3,4,5]) {
  const blk = items.filter(i => i.fcBlock === b);
  expect(blk.map(i => i.fcPosition)).toEqual([1,2,3,4]);
  expect(blk.every(i => !!i.optional === (b >= 4))).toBe(true);
}
expect(count(items, "athletic")).toBe(2);
expect(count(items, "accessory")).toBe(2);
const lifts = items.filter(i => i.slot === "strength");
expect(lifts).toHaveLength(3);
expect(new Set(lifts.map(i => i.group)).size).toBe(3);
// focus-area rules
expect(items.some(i => i.slot === "prep" && /slider lateral lunge/i.test(i.name))).toBe(true);
expect(items.some(i => i.slot === "fc_block" && /lateral|cossack|skater/i.test(i.name))).toBe(true);
expect(items.some(i => i.slot === "accessory" && /hold|iso|wall sit|copenhagen/i.test(i.name))).toBe(true);
expect(items.some(i => i.slot === "accessory" && /copenhagen|abduct/i.test(i.name))).toBe(true);
const p4 = items.filter(i => i.fcPosition === 4);
expect(p4.filter(i => /drop jump/i.test(i.name)).length).toBeLessThanOrEqual(2);
expect(p4.some(i => /split step|first step/i.test(i.name))).toBe(true);
```

Across the whole plan:

```ts
const all = Object.values(frenchContrastV3.days).flatMap(d => d.items);
expect(new Set(all.map(i => i.id)).size).toBe(all.length);
expect(all.every(i => (i.howTo ?? "").trim().length > 40)).toBe(true);
expect(all.some(i => /chest[- ]supported|zercher|trap bar|ball catch|partner/i.test(`${i.name} ${i.howTo}`))).toBe(false);
expect(all.some(i => /2 rounds|run .* rounds/i.test(i.howTo ?? ""))).toBe(false);
expect(all.some(i => i.hpOnly || i.slot === "individual")).toBe(false);
expect(frenchContrastV3.days.C.items.some(i => /back squat/i.test(i.name))).toBe(true);
// Review Focus 4: modes identical
for (const k of ["A","B","C"]) {
  const base = getWorkoutForPlan({ plan: frenchContrastV3, dayKey: k, mode: "base" }).items;
  const hp = getWorkoutForPlan({ plan: frenchContrastV3, dayKey: k, mode: "high_performance" }).items;
  expect(hp).toEqual(base);
}
```

`dedupe` collapses consecutive duplicates, and `count` counts items by slot. Both are local helpers in the test.

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test`
Expected: FAIL. The module isn't found.

- [ ] **Step 5: Write `frenchContrastV3.ts` from the approved table**

Use V2's file layout: the header comment block, `// DAY X` section dividers and `// ── FC Block N — <name> ──` comments. Use `description` for the one-line role ("Anti-rotation", "Isometric — adductor") and `suggestedLoad` where V2 would. In the drop items' `howTo`, include the progression ladder: weeks 1-2 drop catch and stick, weeks 3+ full drop jump. Register in `index.ts`.

- [ ] **Step 6: Run the tests and build**

Run: `npm test && npx tsc --noEmit -p . && npm run build`
Expected: all tests pass, the build succeeds.

- [ ] **Step 7: Commit**

```bash
git add docs/superpowers/plans/2026-10-20-french-contrast-v3-exercises.md src/engine/builtinPlans/frenchContrastV3.ts src/engine/builtinPlans/frenchContrastV3.test.ts src/engine/builtinPlans/index.ts
git commit -m "Add French Contrast V3 plan (3-day, 5 contrast blocks, optional 4-5)"
```

---

### Task 4: Phone-width walkthrough, then ship on Steven's yes

**Files:** none changed unless the walkthrough finds a bug (fix it in the owning task's file, with a test where the logic is testable).

- [ ] **Step 1: Run it at phone width**

Run `npm run dev`. Open it in the browser pane at 375×812. Select French Contrast V3 in plan controls. A saved plan order may list V3 last; that's expected.

- [ ] **Step 2: Walk Day A end to end and screenshot**

Check:
- the warm-up and core screens
- the FC 1-3 labels "French Contrast N of 5"
- block 4 reads "French Contrast 4 of 5 · optional" and shows "Skip to complexes"
- the skip lands on "Athletic Complex"
- Prev from there reaches block 5
- after a reload mid-session, the app resumes on the same screen
- the 3 lift screens, the accessory screen, cooldown, Done

Spot-check Days B and C to the first optional block. Switch to V2 Day A and confirm there's no skip button and its labels are unchanged.

- [ ] **Step 3: Report to Steven with screenshots and ask to push.** Pushing to GitHub deploys to Cloudflare Pages. Push only on his explicit yes.
