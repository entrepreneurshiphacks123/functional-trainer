# French Contrast V3: Design

Date: 2026-10-20. Replaces French Contrast Tennis V2 as Steven's main plan. V2 stays in the app, untouched.

## Why

V2 is a 4-day split with 3 French contrast (FC) blocks a day. Steven wants more contrast volume, fewer days, and a sharper focus on four things he named directly:

1. Overall core
2. Adductors, abductors, side lunges and all lateral work
3. Drops, drop jumps and other reactive work
4. Isometric holds

He trains alone. Anything that needs a partner is out.

## Goals

- A 3-day split (A, B, C) with the same session structure every day.
- 5 FC blocks of 4 a day. Blocks 4 and 5 are **optional**, so on a tired day he can skip straight to the complexes. He'll mostly do all 5.
- The four focus areas show up every day, not once a week.
- Built as a new static plan in the existing app, using the existing plan format.

## Non-goals and anti-goals

- No reactive ball catches or anything that needs a partner or thrower. Steven ruled this out.
- No trap bar (V2 removed it on purpose).
- Don't change V2 or the other plans.
- Don't let drop-jump impact pile up. Five contrast blocks of max-effort jumps, 3 days a week, is already a lot.

## Session structure (same every day, in this order)

| # | Section | Contents | Existing slot |
|---|---------|----------|---------------|
| 1 | Warmup, stretch and core | Mobility and stretching, then a core circuit (anti-extension, anti-rotation, anti-lateral-flexion), about 10 min | `prep`, `core_activation` |
| 2 | French contrast blocks 1-3 | 3 blocks of 4: heavy, plyo, loaded jump, fast/reactive. **Each block done once**, no repeat rounds (Steven's call) | `fc_block`, `fcBlock` 1-3 |
| 3 | French contrast blocks 4-5, **optional** | Same format, marked optional, with a skip control | `fc_block`, `fcBlock` 4-5 |
| 4 | 2 complex movements | Combined athletic movements, like V2's "landmine rotational squat to press" | `athletic` |
| 5 | 3 individual lifts | Straight strength sets | `strength` (with `group`) |
| 6 | 2 small movements, at least one an isometric | Accessory work and holds | `accessory` |
| 7 | Cooldown | Short | `cooldown` |

Order FC blocks so the most important ones come first: blocks 1-3 carry the day's main pattern, and 4-5 are the ones he can lose without losing the day.

**Time (estimate):** about 60 min for the full session, about 50 min when blocks 4-5 are skipped. One pass of an FC block runs roughly 3-4 min.

## Day themes (my call; Steven saw these and didn't object)

- **A: Hinge + Linear.** Hinge patterns, posterior chain, straight-line speed.
- **B: Upper + Rotation.** Presses, pulls, med-ball and landmine rotation.
- **C: Squat + Lateral.** Squats, lateral bounds, adductors.

Each day's 5 FC blocks lean on its theme. 1-2 blocks a day come from another area, so every region gets hit more than once a week. V2's Day D (Elastic + Conditioning) is folded into the jumps across all three days.

## The four focus areas, placed

**Core.** The warmup core circuit stays. Each day also gets one **loaded** core movement in the complexes or small movements (landmine anti-rotation, heavy carry, slider body saw, TRX fallout). Across the week, cover anti-extension, anti-rotation, anti-lateral-flexion and rotational power.

**Adductors, abductors and lateral.** Every day has:
- the slider lateral lunge matrix in the warmup (kept from V2)
- at least one lateral FC block (Cossack squat to lateral bound, for example)
- a Copenhagen plank or banded abduction in the small movements

**Drops and reactive work.** These fill the fast/reactive (4th) position of FC blocks: drop catches (step off, land, stick), drop jumps (step off, rebound up), lateral drop to bound, and split-step and first-step footwork. **Progression (my call):** landings and drop catches first, then full drop jumps over the first few weeks. Cap drop jumps at about 2 blocks a day.

**Isometric holds.** At least one a day in the small movements, rotating through split squat hold, Copenhagen, wall sit and Pallof hold. Some FC blocks open the heavy lift with a 3-second isometric pause.

**Tennis footwork (my call):** V2's tennis movement section is gone as its own section. Split step and first step drills fold into the reactive slot, so they stay in without adding time.

## Equipment

Barbell and squat rack, dumbbells, kettlebell, landmine, cable, bands, sliders, Bosu ball, sandbag, med ball, TRX, flat bench, incline bench, a step-up block, and plyo boxes in several heights. Use the boxes for drops (pick the height in the `howTo`) and the block for step-ups.

**Barbell lifts are in** (Steven's call). Use them freely in the lifts and as the heavy (1st) exercise in FC blocks. **Back squat replaces the Zercher squat** everywhere V2 used it.

**No chest-supported rows** (Steven doesn't like them). Use other rows: single-arm DB row, TRX row, cable row, landmine row.

## App changes this needs

1. **Optional blocks.** Add `optional?: boolean` to `WorkoutItem` (in `/types/WorkoutItem.ts`). The player shows optional FC blocks as "Contrast 4 of 5 · optional" and gives a "Skip to complexes" button that jumps past every remaining optional block to the first `athletic` screen. Skipped blocks are not logged as done.
2. **Plan file.** `src/engine/builtinPlans/frenchContrastV3.ts`, registered in `builtinPlans/index.ts`, `dayKeys: ["A","B","C"]`. Every item gets `howTo` in the same voice and detail as V2.
3. **Modes (my call):** Base and High Performance both run the same V3 session. Skipping optional blocks is the "tired day" lever, not the mode.

## Calls settled after review (my calls)

- **Rounds:** each FC block is done once (Steven's call). Volume comes from 5 different blocks, not from repeats. No round counter is needed.
- **Skip behaviour:** "Skip to complexes" appears on every optional block screen and jumps to the first `athletic` screen. Back still reaches the skipped blocks. "Not logged as done" means only that skipped blocks don't count in the finished session's summary. There is no new completion-tracking system. The "Contrast N of 5" label stays fixed and doesn't count skips.
- **Lifts:** use the `strength` slot (not `individual`, which is base-mode only), with each lift in its own `group` so it gets its own screen. Use 3-4 sets of 5-8, written as "4×6" or "3×6/side". The lifts follow the day's theme.
- **Drop progression:** text only. The `howTo` carries the ladder (weeks 1-2 drop catch and stick, weeks 3+ full drop jump). There is no week mechanism in the app.
- **4th-slot mix per day:** about 2 drop or drop-jump blocks, at least 1 split-step or first-step footwork block, and the rest other reactive or fast plyos.
- **Lateral and pause reps:** at least 1 lateral FC block on every day, including A and B. At most 1 block a day uses the 3-second isometric pause on its heavy lift.
- **Time vs content:** the content is fixed and the time is an estimate. If a session runs long, the optional blocks are the release valve.

## Left to the builder

- The specific exercises, doses, loads and `howTo` text, inside the rules above. Reuse V2 exercises where they fit the focus areas.
- Rest values, following V2's pattern (about 20s within a block, 2-3 min between blocks).
- The exact copy and placement of the skip control.
