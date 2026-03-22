# French Contrast Tennis Workout Redesign

## Overview

Redesign the Functional Trainer PWA workout system around French Contrast (FC) training methodology optimized for tennis performance. Two modes: Base (30 min, no warmup) and High Performance (60 min with warmup). Supports 3-day and 4-day training weeks.

## Goals

- Get Steve back into playing shape with heart rate emphasis
- Train tennis-specific movement patterns: unit turns, torque, kinematic sequencing
- Focus areas: knee, hip, ankle, shoulder, core
- French Contrast supersets as the primary training method
- High Performance keeps heart rate running throughout
- Base mode is a flexible "just get a workout in" option

## Data Model Changes

### Type Location: Move WorkoutItem to `/types/`

Currently `WorkoutItem` lives inside `src/components/WorkoutPlayer.tsx`. Move it to `/types/WorkoutItem.ts` as a shared type — both the plan files and the UI components need to import it.

### Exercise Type — No Changes Needed

The `Exercise` interface in `/types/Exercise.ts` is not used by the plan system (plans use `WorkoutItem[]` directly). Leave it as-is. The `howTo` and `howToImage` fields live on `WorkoutItem`, not `Exercise`.

### WorkoutItem Updates

```typescript
// /types/WorkoutItem.ts (moved from WorkoutPlayer.tsx)
export interface WorkoutItem {
  id: string;
  slot: "prep" | "fc_block" | "individual" | "accessory" | "finisher" | "cooldown";
  name: string;
  dose: string;
  equipment: string;
  description: string;
  hint?: string;
  howTo?: string;         // Expandable instructions, collapsed by default
  howToImage?: string;    // Optional image URL for the how-to
  fcBlock?: number;       // Which FC block this belongs to (1, 2, 3)
  fcPosition?: 1 | 2 | 3 | 4;  // Position within the FC block
  restAfter?: number;     // Seconds of rest after this exercise
  hpOnly?: boolean;       // Only shown in High Performance mode
  kneeFlag?: boolean;     // Flag for knee-sensitive exercises
  finisherRounds?: number; // For finisher exercises: how many rounds to repeat
}
```

### WorkoutPlayer.tsx — slotLabel Map Update

The existing `slotLabel` map must be updated to include the new slot values:

```typescript
const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  fc_block: "French Contrast",
  individual: "Individual",
  accessory: "Accessory",
  finisher: "Finisher",
  cooldown: "Cooldown",
};
```

The old slot values (`"strength"`, `"athletic"`, `"finish"`) are removed. Existing plans that use them will need to be updated or removed.

### AppState Updates

```typescript
// Add to AppState in storage.ts
export type AppState = {
  lastDay?: string;
  soreness: SorenessMap;
  sorenessLog?: SorenessLogEntry[];
  workoutLog?: WorkoutLogEntry[];
  activePlanId?: string;
  dayOverride?: string | null;
  trainingDaysPerWeek?: 3 | 4;  // NEW: controls day rotation
};
```

Default: `trainingDaysPerWeek: 4`. Settings component needs a toggle (3 or 4 days).

### Mode Type — Already Correct

`Mode` in `storage.ts` is `"base" | "high_performance"` — matches the spec. Note: `WorkoutSession.ts` still references `"walk_out_better"` — update that to `"base"` for consistency.

### Soreness Routing — Knee Mapping

There is no `"knee"` key in `MovementPattern`. Knee soreness maps to the existing `"single_leg"` and `"deceleration"` patterns:

- If `single_leg === "red"` OR `deceleration === "red"` → treat as knee issue → skip Day B, offer Day D instead
- `kneeFlag` on individual exercises allows finer-grained filtering: if either pattern is red, hide/warn on kneeFlag exercises across ALL days

This extends the existing shoulder routing logic (`shoulder_stability === "red"` → skip Day C).

### New Timing Constants

```typescript
const FC_INTRA_REST = 20;     // seconds between exercises within an FC block (fixed at 20s)
const FC_INTER_REST = 150;    // seconds (2.5 min) between FC blocks
const FINISHER_EXERCISE_REST = 0;   // minimal rest within finisher
const FINISHER_ROUND_REST = 30;     // seconds between finisher rounds
```

## Session Structure

### Base Mode (30 min, no warmup)

| Order | Component | Details |
|-------|-----------|---------|
| 1 | FC Block 1 | Positions 2-3-4 only (skip heavy compound) |
| 2 | FC Block 2 | Positions 2-3-4 only (skip heavy compound) |
| 3 | Individual 1 | Standalone exercise, skippable |
| 4 | Individual 2 | Standalone exercise, skippable |

### High Performance Mode (60 min, with warmup)

| Order | Component | Details |
|-------|-----------|---------|
| 1 | Warmup | 8-10 min dynamic prep |
| 2 | FC Block 1 | Full 4-exercise protocol |
| 3 | FC Block 2 | Full 4-exercise protocol |
| 4 | FC Block 3 | Full 4-exercise protocol |
| 5 | Accessory | Prehab superset |
| 6 | Finisher | 4-6 min heart rate circuit |
| 7 | Cooldown | 2 min breathe-down |

## French Contrast Protocol

Each FC block follows this sequence:

| Position | Type | Load | Reps | Purpose |
|----------|------|------|------|---------|
| 1 | Heavy compound | ~80% 1RM | 2-3 | Potentiate (HP only) |
| 2 | High-force plyometric | Bodyweight | 3-5 | Express force |
| 3 | Speed-strength movement | ~60% or moderate load | 3-5 | Move fast under load |
| 4 | Speed/reactive plyometric | Bodyweight or band-assisted | 4-6 | Max velocity |

**Rest:** 20-30s between exercises within block, 2-3 min between blocks (enforced by timer).

## 4-Day Split

3-day weeks drop Day D. Rotation: A→B→C→A→B→C.

---

### Day A: Hip Hinge + Linear Power

**Theme:** Ground-up force production, acceleration, hip extension, rotational power transfer

**Warmup (HP only, ~8 min)**
1. Ankle circles + calf raises (2 min)
2. World's greatest stretch + hip airplanes (3 min)
3. Band walks + glute activation (2 min)
4. 3-5 broad jumps at 70% effort (1 min)

**FC Block 1 — Hinge Power**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Trap bar deadlift | 3 @ 80% | Trap bar | 20s | Potentiate posterior chain |
| 2 | Broad jump (stick landing) | 3 | None | 20s | Express hip extension force |
| 3 | KB swing (heavy) | 5 | KB | 20s | Speed-strength hinge |
| 4 | Banded broad jump | 4 | Band | 2-3 min | Overspeed hip extension |

**FC Block 2 — Rotational Power**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Back squat (half range) | 3 @ 80% | Barbell | 20s | Potentiate legs + trunk |
| 2 | Med-ball rotational slam | 3/side | Med ball | 20s | High-force rotation, kinematic chain |
| 3 | Cable step-up with rotation | 4/side | Cable + box | 20s | Loaded rotation through planes, single-leg. howTo: Cable anchored low on the side you rotate FROM. Step up with the leg closest to the box. Rotate torso from cable side as you drive up. Mimics open-stance forehand loading pattern. |
| 4 | Med-ball shotput throw (reactive) | 4/side | Med ball | 2-3 min | Speed rotation, unit turn |

**FC Block 3 — Linear Acceleration (HP only)**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 | RDL (barbell) | 3 @ 80% | Barbell | 20s | Potentiate hamstrings |
| 2 | Box jump (step down) | 3 | Box | 20s | High-force vertical |
| 3 | DB split squat jump | 4/side | DBs | 20s | Speed-strength single-leg |
| 4 | 10m sprint (or shuttle) | 2 | None | 2-3 min | Max velocity expression |

**Base Individual Exercises**
1. Single-leg RDL (DB) — 3x6/side — balance + posterior chain
2. Half-kneeling Pallof press — 3x8/side — anti-rotation core

**HP Accessory Superset**
- A1: Face pulls (band or cable) — 3x12
- A2: Banded lateral walks — 3x10/side

**HP Finisher (4-6 min)**
- 3 rounds: 6 med-ball rotational slams + 10m shuttle run + 8 KB swings. Minimal rest between exercises, 30s between rounds.

---

### Day B: Squat + Lateral Power

**Theme:** Lateral force production, deceleration, change of direction, knee/ankle integrity

**Warmup (HP only, ~8 min)**
1. Ankle rocks + toe raises (2 min)
2. Lunge stretch + hip 90/90 switches (3 min)
3. Mini-band lateral walks + clamshells (2 min)
4. 3-4 lateral bounds at 70% effort (1 min)

**FC Block 1 — Squat Power**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Trap bar deadlift (high handles) | 3 @ 80% | Trap bar | 20s | Potentiate quads + glutes. Sub: heavy goblet squat if no trap bar. |
| 2 | Hurdle hops (stick each landing) | 3 | Hurdles/cones | 20s | High-force vertical + landing mechanics |
| 3 | Goblet squat jump | 4 | DB | 20s | Speed-strength squat pattern |
| 4 | Banded squat jumps | 5 | Band | 2-3 min | Assisted/overspeed vertical |

**FC Block 2 — Lateral Power**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Front-foot elevated split squat (heavy) | 3/side | DBs + step | 20s | Potentiate single-leg + hip stability |
| 2 | Lateral bound → stick (2 sec hold) | 3/side | None | 20s | High-force lateral decel |
| 3 | DB lateral step-up | 4/side | DB + box | 20s | Speed-strength lateral drive, knee tracking |
| 4 | Shuffle → decel (3-step stop) | 3/direction | None | 2-3 min | Reactive lateral speed + braking |

**FC Block 3 — Single-Leg Power (HP only)**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 | Bulgarian split squat (heavy) | 3/side | DBs + bench | 20s | Potentiate single-leg. kneeFlag: true |
| 2 | Single-leg box jump (step down) | 3/side | Box | 20s | Single-leg force production. kneeFlag: true |
| 3 | DB reverse lunge to knee drive | 4/side | DBs | 20s | Speed-strength + hip flexion |
| 4 | Skater hops (continuous) | 6 total | None | 2-3 min | Reactive lateral elasticity |

**Base Individual Exercises**
1. Step-downs (slow eccentric, 3 sec lower) — 3x6/side — knee control + decel strength
2. Copenhagen plank — 3x20s/side — adductor strength, groin injury prevention

**HP Accessory Superset**
- A1: Calf raises (slow, full ROM) — 3x12
- A2: Tibialis raises (or banded ankle dorsiflexion) — 3x15

**HP Finisher (4-6 min)**
- 3 rounds: 5-10-5 shuttle drill + 8 lateral bounds + 10 goblet squat jumps. Minimal rest between exercises, 30s between rounds. howTo for 5-10-5: Set two markers 5 yards apart. Start in the middle. Sprint 5 yards right, touch. Sprint 10 yards left, touch. Sprint 5 yards back to middle.

---

### Day C: Upper Body + Rotation

**Theme:** Shoulder armor, pressing/pulling power, anti-rotation, unit turn mechanics, torque production

**Warmup (HP only, ~8 min)**
1. Scap push-ups + band pull-aparts (2 min)
2. T-spine rotations on foam roller (2 min)
3. Bottoms-up KB hold (standing, each side 30s) (2 min)
4. 3-4 med-ball chest passes at 70% (2 min)

**FC Block 1 — Pressing Power**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Barbell bench press | 3 @ 80% | Barbell + bench | 20s | Potentiate pressing chain |
| 2 | Med-ball chest pass (wall) | 4 | Med ball | 20s | High-force horizontal push |
| 3 | DB push press (standing) | 4 | DBs | 20s | Speed-strength, legs into press |
| 4 | Band-assisted plyo push-up | 5 | Band | 2-3 min | Reactive pressing speed |

**FC Block 2 — Rotational Torque**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Landmine rotation (heavy) | 3/side | Barbell + landmine | 20s | Potentiate rotational chain. howTo: Barbell in landmine attachment. Hold end with both hands at chest. Drive from hips to rotate the bar from one hip to the other. Keep arms relatively straight — power comes from hips and trunk, not shoulders. |
| 2 | Med-ball rotational ground slam | 3/side | Med ball | 20s | High-force rotation, kinematic sequencing |
| 3 | Cable low-to-high chop (split stance) | 4/side | Cable | 20s | Speed-strength rotation through planes. howTo: Cable anchored low. Split stance with inside foot forward. Pull from low to high across body, rotating trunk. Drive from back hip. |
| 4 | Band-resisted open stance rotation | 4/side | Band | 2-3 min | Reactive unit turn, elastic recoil. howTo: Band anchored behind you at hip height. Stand in open stance (feet wide, slight knee bend). Rotate trunk against band resistance mimicking forehand/backhand loading. Snap back to start — feel the elastic recoil. |

**FC Block 3 — Pulling Power (HP only)**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 | Barbell bent-over row | 3 @ 80% | Barbell | 20s | Potentiate pulling chain |
| 2 | Med-ball overhead slam | 4 | Med ball | 20s | High-force full-body pull-down |
| 3 | 1-arm cable row (explosive) | 4/side | Cable | 20s | Speed-strength pulling, anti-rotation |
| 4 | Band face pull (fast, snap back) | 6 | Band | 2-3 min | Reactive shoulder external rotation |

**Base Individual Exercises**
1. Tall-kneeling cable chop (high-to-low) — 3x8/side — rotational core, no leg compensation
2. Bottoms-up KB carry — 3 carries/side — shoulder stability under chaos

**HP Accessory Superset**
- A1: Face pulls (cable) — 3x12
- A2: Alphabet (light DBs, arms extended, draw A-Z) — 2 rounds

**HP Finisher (4-6 min)**
- 3 rounds: 6 med-ball rotational ground slams + 8 med-ball overhead slams + 10 band-resisted rotations. Minimal rest between exercises, 30s between rounds.

---

### Day D: Elastic + Conditioning

**Theme:** Reactive power, footwork, heart rate, playing shape. Dropped on 3-day weeks.

**Warmup (HP only, ~8 min)**
1. Jump rope (easy rhythm) (2 min)
2. Ankle pogo hops + calf bounces (2 min)
3. Hip flexor stretch + leg swings (2 min)
4. Ladder footwork (2 patterns, easy pace) (2 min)

**FC Block 1 — Vertical Elasticity**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Trap bar deadlift (lighter, 75%) | 3 | Trap bar | 20s | Potentiate without grinding |
| 2 | Depth jump (off 18" box, stick landing) | 3 | Box | 20s | High-force reactive, stretch-shortening cycle. howTo: Stand on box. Step off (don't jump off). The moment your feet hit the ground, immediately jump as high as possible. Minimize ground contact time. Stick the landing on the second jump. |
| 3 | DB squat jump | 4 | DBs | 20s | Speed-strength vertical |
| 4 | Pogo hops (continuous) | 15-20 | None | 2-3 min | Max speed ground contacts |

**FC Block 2 — Lateral Elasticity**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 (HP) | Heavy DB lateral lunge | 3/side | DBs | 20s | Potentiate adductors + lateral hip |
| 2 | Lateral depth jump (off 12" box, stick) | 3/side | Box | 20s | High-force lateral reactive. howTo: Stand on a low box. Step off sideways. The moment you land, immediately bound laterally away from the box. Stick the landing for 2 seconds. |
| 3 | Banded lateral shuffle (resisted) | 5 steps/direction | Band | 20s | Speed-strength lateral |
| 4 | Skater hops (continuous, quick) | 8 total | None | 2-3 min | Reactive lateral elasticity |

**FC Block 3 — Multidirectional (HP only)**

| Pos | Exercise | Dose | Equipment | Rest | Notes |
|-----|----------|------|-----------|------|-------|
| 1 | KB swing (heavy) | 5 | KB | 20s | Potentiate hip snap |
| 2 | Lateral bound (alternating, continuous) | 4/side | None | 20s | High-force lateral reactive |
| 3 | Single-leg 180 rotation jump | 3/side | None | 20s | Rotational reactive power. howTo: Stand on one leg. Jump and rotate 180 degrees in the air. Land on the same leg, stabilize for 2 seconds. Rotate back. Control > height. |
| 4 | 10m sprint to decel (3-step stop) | 3 | None | 2-3 min | Max speed + braking |

**Base Individual Exercises**
1. Line hops (front/back, 20s on/10s off) — 3 rounds — ankle stiffness + elastic contacts
2. Lateral shuffle → split step → sprint — 4 reps — tennis-specific footwork. howTo: Shuffle laterally 3-4 steps, hit a split step (small hop landing in athletic stance), then sprint forward 5m. Mimics reading a shot, setting up, then closing on the ball.

**HP Accessory Superset**
- A1: Tibialis raises — 3x15
- A2: Single-leg calf raise (slow) — 3x10/side

**HP Finisher (6 min — the big one)**
- 4 rounds: lateral shuffle 10m + sprint 10m + backpedal 10m + 4 med-ball ground slams. 30s rest between rounds. Simulates court coverage patterns at high heart rate.

**Cooldown (HP only, 2 min)**
- Walk it off, nose breathing, long exhales

---

## Soreness / Injury Routing

| Condition | Behavior |
|-----------|----------|
| Knee soreness = red | Skip Day B, substitute Day D. Flag kneeFlag exercises across all days. |
| Shoulder soreness = red | Skip Day C, substitute next available day. |
| Any pattern = yellow | Show warning but allow the workout. |

## Rest Timer Enforcement

The app MUST show countdown timers. Steve tends to under-rest when training alone, which undermines the potentiation effect of French Contrast.

### UX Flow

The current WorkoutPlayer has Prev/Next navigation showing one exercise at a time. The rest timer integrates as follows:

1. **"Done" button replaces "Next"** within FC blocks. Tapping "Done" marks the exercise complete and immediately shows a **rest timer overlay** on top of the current screen.
2. **Rest timer overlay:** Full-screen countdown (large numbers), shows the upcoming exercise name below. Has a "Skip Rest" button for impatient moments. Timer auto-advances to the next exercise when it hits 0.
3. **Between FC blocks:** Same overlay but longer timer (2.5 min). Shows "Block 2 of 3" context.
4. **Outside FC blocks** (individual, accessory, finisher): "Next" button works as before — no enforced rest timer.
5. **Timer state:** Local component state only. No localStorage persistence. If the user backgrounds the app, the timer keeps running (browser timer behavior).

### Timer Values (fixed, not ranges)

- **Within FC blocks:** 20s countdown (FC_INTRA_REST)
- **Between FC blocks:** 2.5 min countdown (FC_INTER_REST)
- **Finisher rounds:** 30s countdown (FINISHER_ROUND_REST)

## FC Block Visual Grouping

### Overview Screen
FC blocks appear as grouped sections with a header: "FC Block 1 — Hinge Power". The 4 exercises within are listed as sub-items. Each block is visually distinct (card/border grouping).

### Player Screen
Still shows one exercise at a time (current UX). Added context:
- Block-level progress indicator: "Block 1 • Exercise 2 of 4"
- FC block name shown as subtitle above exercise name
- Rest timer overlay between exercises (see above)

### Base Mode Display
In Base mode, FC blocks show only positions 2-3-4 (items with `hpOnly: true` are hidden). The block header still shows but the heavy compound is absent.

## 3-Day vs 4-Day Week

- 4-day: A → B → C → D → A → B → C → D
- 3-day: A → B → C → A → B → C (Day D dropped entirely)
- Selection: User sets training days per week in settings (3 or 4).

## How-To Feature

- `howTo` field on exercises: expandable section, collapsed by default
- Tap/click to reveal detailed instructions
- `howToImage` field: optional screenshot/image displayed within the how-to section
- Only populated on exercises that warrant explanation (compound movements, less common exercises)
- Cue-based instruction style, not textbook — "drive from the hips" not "engage the gluteus maximus"

## Equipment Required

Full gym assumed:
- Barbell + plates
- Trap bar
- Dumbbells
- Kettlebells
- Resistance bands (mini + long)
- Med balls
- Cable machine
- Boxes/steps (various heights: 12", 18")
- Agility ladder (optional)
- Jump rope (optional)
- Landmine attachment
- Bench

## Finisher Structure

Finishers are multi-exercise circuits repeated for rounds. Expressed in WorkoutItem[] as:

- Each exercise in the finisher has `slot: "finisher"` and `finisherRounds: N`
- The player groups all consecutive `finisher` items and repeats the group N times
- Between exercises within a round: no rest (FINISHER_EXERCISE_REST = 0)
- Between rounds: 30s rest timer (FINISHER_ROUND_REST)

Example: Day A finisher = 3 items with `finisherRounds: 3` → player loops through all 3 exercises, then 30s rest, repeat 2 more times.

## Cooldown

All days in HP mode end with a 2 min cooldown (walk it off, nose breathing, long exhales). This is a single WorkoutItem with `slot: "cooldown"`. Base mode has no cooldown.

## Plan Migration

- New plan ID: `french-contrast-tennis`
- `functional-fitness-45` remains in BUILTIN_PLANS for backward compatibility but is no longer the default
- `defaultState.activePlanId` updates to `"french-contrast-tennis"`
- On app load, if `activePlanId` is `"functional-fitness-45"`, show a one-time prompt suggesting the new plan
- Other existing builtin plans (athletic, hotel, etc.) remain available

## Plan Structure in Code

The existing `StaticPlan` type and `generateWorkoutV1` function will need updates to support:
1. FC block grouping (visual grouping of 4 exercises via `fcBlock` + `fcPosition`)
2. Mode-based exercise filtering (`hpOnly` flag → filter items when mode is `"base"`)
3. Rest timer metadata (`restAfter` on each item, consumed by WorkoutPlayer)
4. How-to expandable content (`howTo` field rendered as collapsible section)
5. 3-day vs 4-day rotation logic (`trainingDaysPerWeek` in AppState → skip Day D when 3)
6. Knee/shoulder soreness routing (`kneeFlag` + `single_leg`/`deceleration` red check)
7. Finisher round looping (`finisherRounds` + player logic to repeat the group)
8. `howTo` strings from the Notes column in the workout tables go into the `howTo` field on WorkoutItem (NOT into `description` — description stays as the short coaching cue)
