# French Contrast Tennis Workout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing workout system with French Contrast training blocks optimized for tennis, with Base (30 min) and High Performance (60 min) modes, rest timer enforcement, and expandable how-to instructions.

**Architecture:** Static plan file with all 4 days of exercises. WorkoutItem type extended with FC block metadata, rest timers, and how-to fields. WorkoutPlayer updated to show FC block grouping, rest timer overlays, and collapsible how-to sections. Settings extended with 3/4 day training preference.

**Tech Stack:** React 18 + TypeScript + Vite (existing stack, no new deps)

**Spec:** `docs/superpowers/specs/2026-03-22-french-contrast-tennis-workouts-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|---------------|
| Create | `types/WorkoutItem.ts` | Shared WorkoutItem type with FC fields |
| Create | `src/engine/builtinPlans/frenchContrastTennis.ts` | All 4 days of exercises |
| Create | `src/components/RestTimer.tsx` | Rest timer overlay component |
| Create | `src/components/HowTo.tsx` | Expandable how-to section |
| Modify | `src/components/WorkoutPlayer.tsx` | Import from shared type, FC block grouping, rest timer integration, how-to display |
| Modify | `src/engine/builtinPlans/index.ts` | Add new plan, reorder to make it default |
| Modify | `src/engine/storage.ts` | Add `trainingDaysPerWeek` to AppState |
| Modify | `src/engine/plans.ts` | Mode-based filtering (hpOnly), FC rest metadata |
| Modify | `src/engine/library.ts` | Update day labels/intents for new plan |
| Modify | `src/components/Settings.tsx` | Add 3/4 day toggle |
| Modify | `src/App.tsx` | 3/4 day rotation logic, knee soreness routing |

---

### Task 1: Create shared WorkoutItem type

**Files:**
- Create: `types/WorkoutItem.ts`
- Modify: `src/components/WorkoutPlayer.tsx` — remove local WorkoutItem type, import from shared

- [ ] **Step 1: Create `types/WorkoutItem.ts`**

```typescript
export type WorkoutItemSlot = "prep" | "fc_block" | "individual" | "accessory" | "finisher" | "cooldown";

export type WorkoutItem = {
  id: string;
  slot: WorkoutItemSlot;
  name: string;
  dose: string;
  equipment?: string;
  description?: string;
  hint?: string;
  howTo?: string;
  howToImage?: string;
  fcBlock?: number;
  fcPosition?: 1 | 2 | 3 | 4;
  restAfter?: number;
  hpOnly?: boolean;
  kneeFlag?: boolean;
  finisherRounds?: number;
};

export type WorkoutData = {
  day: string;
  items: WorkoutItem[];
};
```

- [ ] **Step 2: Update WorkoutPlayer.tsx**

Remove the local `WorkoutItem` and `WorkoutData` type definitions (lines 6-20). Add import:

```typescript
import { WorkoutItem, WorkoutData } from "../../types/WorkoutItem";
```

Update the `slotLabel` map to use new slot values:

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

- [ ] **Step 3: Update imports in plans.ts**

In `src/engine/plans.ts`, the `getWorkoutForPlan` return type uses `any[]` for items. No import change needed — it already uses `any`. But update `StaticPlanDay` to reference the shared type:

```typescript
import { WorkoutItem } from "../../types/WorkoutItem";

export type StaticPlanDay = {
  title: string;
  items: WorkoutItem[];
};
```

- [ ] **Step 4: Verify app compiles**

```bash
cd /Users/steveellis/Documents/functional-trainer && npm run build
```

Expected: Build succeeds. Existing plans use old slot values but TypeScript won't catch this because they use `as const` — they'll just show wrong labels at runtime, which we fix in Task 3.

- [ ] **Step 5: Commit**

```bash
git add types/WorkoutItem.ts src/components/WorkoutPlayer.tsx src/engine/plans.ts
git commit -m "refactor: extract WorkoutItem to shared type with FC block fields"
```

---

### Task 2: Add trainingDaysPerWeek to AppState + Settings UI

**Files:**
- Modify: `src/engine/storage.ts`
- Modify: `src/components/Settings.tsx`
- Modify: `src/App.tsx`

- [ ] **Step 1: Update storage.ts**

Add `trainingDaysPerWeek` to the `AppState` type:

```typescript
export type AppState = {
  lastDay?: string;
  soreness: SorenessMap;
  sorenessLog?: SorenessLogEntry[];
  workoutLog?: WorkoutLogEntry[];
  activePlanId?: string;
  dayOverride?: string | null;
  trainingDaysPerWeek?: 3 | 4;
};
```

Update `defaultState`:

```typescript
const defaultState: AppState = {
  lastDay: undefined,
  soreness: {},
  sorenessLog: [],
  workoutLog: [],
  activePlanId: "french-contrast-tennis",
  dayOverride: null,
  trainingDaysPerWeek: 4,
};
```

Update `loadState` to parse the new field:

```typescript
trainingDaysPerWeek: parsed.trainingDaysPerWeek === 3 ? 3 : 4,
```

- [ ] **Step 2: Add toggle to Settings.tsx**

Add a new Card section between Appearance and Workout Plans. Settings needs to accept `trainingDaysPerWeek` and `onTrainingDaysChange` props:

```typescript
export default function Settings({
  theme,
  onThemeToggle,
  onBack,
  trainingDaysPerWeek,
  onTrainingDaysChange,
}: {
  theme: Theme;
  onThemeToggle: () => void;
  onBack: () => void;
  trainingDaysPerWeek: 3 | 4;
  onTrainingDaysChange: (days: 3 | 4) => void;
}) {
```

Add card after Appearance card:

```tsx
<Card title="Training Schedule">
  <div style={{ display: "grid", gap: 12 }}>
    <div style={{ fontSize: 14, fontWeight: 700, opacity: 0.8 }}>
      Training days per week
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
      {([3, 4] as const).map((d) => (
        <button
          key={d}
          onClick={() => onTrainingDaysChange(d)}
          style={{
            padding: "14px",
            background: trainingDaysPerWeek === d ? "var(--accent)" : "var(--bg)",
            color: trainingDaysPerWeek === d ? "var(--accent-text)" : "var(--text)",
            border: "var(--bw) solid var(--border)",
            fontWeight: 950,
            fontSize: 16,
          }}
        >
          {d} days
        </button>
      ))}
    </div>
    <div style={{ fontSize: 12, opacity: 0.6 }}>
      3 days = A→B→C (drops conditioning day). 4 days = full A→B→C→D rotation.
    </div>
  </div>
</Card>
```

- [ ] **Step 3: Wire up in App.tsx**

Add state for `trainingDaysPerWeek`:

```typescript
const [trainingDaysPerWeek, setTrainingDaysPerWeek] = useState<3 | 4>(
  persisted.trainingDaysPerWeek ?? 4
);
```

Pass to Settings:

```tsx
<Settings
  theme={theme}
  onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
  onBack={() => setActiveTab("workout")}
  trainingDaysPerWeek={trainingDaysPerWeek}
  onTrainingDaysChange={(d) => {
    setTrainingDaysPerWeek(d);
    persist({ trainingDaysPerWeek: d });
  }}
/>
```

Update `dayKeys` computation to respect 3-day mode:

```typescript
const allDayKeys = Array.isArray(plan.dayKeys) && plan.dayKeys.length ? plan.dayKeys : ["A", "B", "C", "D"];
const dayKeys = trainingDaysPerWeek === 3 ? allDayKeys.filter((k) => k !== "D") : allDayKeys;
```

Update knee soreness routing (add alongside existing shoulder routing):

```typescript
const kneeRed = soreness?.single_leg === "red" || soreness?.deceleration === "red";
const shoulderRed = soreness?.shoulder_stability === "red";

let plannedDay = computedPlannedDay;
if (shoulderRed && plannedDay === "C") plannedDay = nextDayKey(dayKeys, "C");
if (kneeRed && plannedDay === "B") plannedDay = nextDayKey(dayKeys, "B");
```

- [ ] **Step 4: Verify app compiles and Settings renders**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/engine/storage.ts src/components/Settings.tsx src/App.tsx
git commit -m "feat: add 3/4 day training schedule toggle and knee soreness routing"
```

---

### Task 3: Create the French Contrast Tennis plan

**Files:**
- Create: `src/engine/builtinPlans/frenchContrastTennis.ts`
- Modify: `src/engine/builtinPlans/index.ts`

This is the largest task — all 4 days of exercises with FC block metadata, how-to instructions, rest timers, and mode flags.

- [ ] **Step 1: Create `frenchContrastTennis.ts`**

Create the file at `src/engine/builtinPlans/frenchContrastTennis.ts`. The plan uses the `StaticPlan` type structure. Each exercise item includes `fcBlock`, `fcPosition`, `restAfter`, `hpOnly`, `kneeFlag`, and `howTo` fields as specified in the design spec.

Full content: Transcribe ALL exercises from the spec document (`docs/superpowers/specs/2026-03-22-french-contrast-tennis-workouts-design.md`) into WorkoutItem objects for all 4 days (A, B, C, D). Each day includes:
- Warmup items (slot: "prep", hpOnly: true)
- FC Block 1 items (slot: "fc_block", fcBlock: 1, fcPosition: 1-4)
- FC Block 2 items (slot: "fc_block", fcBlock: 2, fcPosition: 1-4)
- FC Block 3 items (slot: "fc_block", fcBlock: 3, fcPosition: 1-4, hpOnly: true)
- Base individual items (slot: "individual", hpOnly: false — but ONLY shown in base mode, handle in plans.ts)
- Accessory items (slot: "accessory", hpOnly: true)
- Finisher items (slot: "finisher", hpOnly: true, finisherRounds: N)
- Cooldown item (slot: "cooldown", hpOnly: true)

**Rest timer values:**
- FC positions 1-3: `restAfter: 20`
- FC position 4 (last in block): `restAfter: 150`
- Finisher exercises: `restAfter: 0` (except last in round: `restAfter: 30`)

**FC position 1 items:** Set `hpOnly: true` (skipped in Base mode).

**Individual exercises:** Add a new boolean `baseOnly: true` (not in spec — add to WorkoutItem type in Task 1 if needed, OR handle via filtering in plans.ts by checking `slot === "individual"`).

Decision: Keep it simple — individuals always have `slot: "individual"`. In Base mode, show individuals. In HP mode, hide individuals. Handle in plans.ts filtering.

**howTo field:** Only populate on exercises flagged in the spec tables (cable step-up with rotation, landmine rotation, cable low-to-high chop, band-resisted open stance rotation, depth jump, lateral depth jump, single-leg 180 rotation jump, lateral shuffle → split step → sprint, 5-10-5 shuttle drill).

The plan structure:

```typescript
import type { StaticPlan } from "../plans";

export const frenchContrastTennis: StaticPlan = {
  id: "french-contrast-tennis",
  name: "French Contrast Tennis",
  icon: "🎾",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Hip Hinge + Linear Power",
      items: [
        // ... all Day A items from spec
      ],
    },
    B: {
      title: "Squat + Lateral Power",
      items: [
        // ... all Day B items from spec
      ],
    },
    C: {
      title: "Upper Body + Rotation",
      items: [
        // ... all Day C items from spec
      ],
    },
    D: {
      title: "Elastic + Conditioning",
      items: [
        // ... all Day D items from spec
      ],
    },
  },
};
```

Each exercise follows this pattern:

```typescript
{
  id: "a_fc1_1",               // day_block_position
  slot: "fc_block",
  name: "Trap bar deadlift",
  dose: "3 reps @ 80%",
  equipment: "Trap bar",
  description: "Potentiate posterior chain. Hinge hard, drive through the floor. Don't grind — this is a primer, not a max.",
  hint: "potentiate",
  fcBlock: 1,
  fcPosition: 1,
  restAfter: 20,
  hpOnly: true,
},
```

- [ ] **Step 2: Register in builtinPlans/index.ts**

```typescript
import { frenchContrastTennis } from "./frenchContrastTennis";
// ... other imports

export const BUILTIN_PLANS = [
  frenchContrastTennis,    // NEW — first = default
  functionalFitness45,
  athleticStrengthFootwork,
  feelBetterJointFriendly,
  minimalEquipmentHotel,
  middayTuneup,
  hotelBodybuilders,
];
```

- [ ] **Step 3: Update library.ts day labels**

The `dayLabels` and `dayIntent` maps are used by App.tsx for display. The plan's own `title` field handles this for static plans, but update anyway for consistency:

```typescript
export const dayLabels: Record<DayType, string> = {
  A: "Day A",
  B: "Day B",
  C: "Day C",
  D: "Day D",
};

export const dayIntent: Record<DayType, string> = {
  A: "Hip Hinge + Linear Power",
  B: "Squat + Lateral Power",
  C: "Upper Body + Rotation",
  D: "Elastic + Conditioning",
};
```

- [ ] **Step 4: Verify the plan file compiles**

```bash
npm run build
```

- [ ] **Step 5: Commit**

```bash
git add src/engine/builtinPlans/frenchContrastTennis.ts src/engine/builtinPlans/index.ts src/engine/library.ts
git commit -m "feat: add French Contrast Tennis plan with all 4 days"
```

---

### Task 4: Mode-based exercise filtering in plans.ts

**Files:**
- Modify: `src/engine/plans.ts`

- [ ] **Step 1: Update `getWorkoutForPlan` to filter by mode**

In the `plan.kind === "static"` branch, after getting items, filter based on mode:

```typescript
if (plan.kind === "static") {
  const fallbackKey = plan.dayKeys?.[0] ?? Object.keys(plan.days)[0] ?? dayKey;
  const d = plan.days[dayKey] ?? plan.days[fallbackKey];

  let items = [...d.items];

  if (mode === "base") {
    // Base mode: remove hpOnly items, keep individuals
    items = items.filter((it: any) => !it.hpOnly);
  } else {
    // HP mode: remove individual-slot items (they're base-only), keep hpOnly items
    items = items.filter((it: any) => it.slot !== "individual");

    // Legacy: insert highPerformanceExtraByDay if defined
    const extra = plan.highPerformanceExtraByDay?.[dayKey];
    if (extra) items = insertBeforeFinish(items, extra);
  }

  return { day: dayKey, items };
}
```

- [ ] **Step 2: Verify with build**

```bash
npm run build
```

- [ ] **Step 3: Commit**

```bash
git add src/engine/plans.ts
git commit -m "feat: mode-based exercise filtering (hpOnly + individual slots)"
```

---

### Task 5: Rest Timer component

**Files:**
- Create: `src/components/RestTimer.tsx`

- [ ] **Step 1: Create RestTimer.tsx**

```typescript
import React from "react";

export default function RestTimer({
  seconds,
  nextExerciseName,
  blockLabel,
  onSkip,
  onComplete,
}: {
  seconds: number;
  nextExerciseName?: string;
  blockLabel?: string;
  onSkip: () => void;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = React.useState(seconds);

  React.useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  React.useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const t = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
  }, [remaining, onComplete]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = mins > 0
    ? `${mins}:${secs.toString().padStart(2, "0")}`
    : `${secs}`;

  const progress = 1 - remaining / seconds;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        color: "#fff",
        padding: 32,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Rest
      </div>

      <div
        style={{
          fontSize: 96,
          fontWeight: 950,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {display}
      </div>

      {/* Progress bar */}
      <div style={{ width: "80%", maxWidth: 300, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "var(--accent, #7c5cff)",
            borderRadius: 2,
            transition: "width 1s linear",
          }}
        />
      </div>

      {blockLabel && (
        <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.6 }}>
          {blockLabel}
        </div>
      )}

      {nextExerciseName && (
        <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8, textAlign: "center" }}>
          Up next: {nextExerciseName}
        </div>
      )}

      <button
        onClick={onSkip}
        style={{
          marginTop: 16,
          padding: "12px 32px",
          background: "transparent",
          border: "2px solid rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 900,
          fontSize: 14,
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Skip Rest
      </button>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/RestTimer.tsx
git commit -m "feat: add RestTimer overlay component"
```

---

### Task 6: HowTo expandable component

**Files:**
- Create: `src/components/HowTo.tsx`

- [ ] **Step 1: Create HowTo.tsx**

```typescript
import React from "react";

export default function HowTo({ text, image }: { text: string; image?: string }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={{ marginTop: 8 }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          background: "none",
          border: "none",
          color: "var(--accent, #7c5cff)",
          fontWeight: 800,
          fontSize: 13,
          cursor: "pointer",
          padding: 0,
          textTransform: "uppercase",
          letterSpacing: "0.03em",
        }}
      >
        {open ? "▾ Hide How-To" : "▸ How To Do This"}
      </button>

      {open && (
        <div
          style={{
            marginTop: 8,
            padding: 12,
            background: "var(--card2, rgba(255,255,255,0.05))",
            border: "1px solid var(--border-light, rgba(255,255,255,0.1))",
            borderRadius: "var(--radius, 0)",
            fontSize: 14,
            lineHeight: 1.6,
            fontWeight: 600,
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
          {image && (
            <img
              src={image}
              alt="Exercise demonstration"
              style={{ width: "100%", marginTop: 12, borderRadius: "var(--radius, 0)" }}
            />
          )}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/HowTo.tsx
git commit -m "feat: add collapsible HowTo component for exercise instructions"
```

---

### Task 7: Update WorkoutPlayer with FC blocks, rest timer, and how-to

**Files:**
- Modify: `src/components/WorkoutPlayer.tsx`

This is the most complex UI task. Three changes:

1. **FC block context** in the exercise display (block label + position indicator)
2. **Rest timer** triggered on "Done" within FC blocks
3. **How-to** displayed in the exercise detail view

- [ ] **Step 1: Add imports**

```typescript
import RestTimer from "./RestTimer";
import HowTo from "./HowTo";
```

- [ ] **Step 2: Add rest timer state**

Inside the `WorkoutPlayer` component, add:

```typescript
const [showRestTimer, setShowRestTimer] = React.useState(false);
const [restSeconds, setRestSeconds] = React.useState(0);
```

- [ ] **Step 3: Create helper functions for FC block context**

```typescript
function getFcBlockLabel(item: WorkoutItem, items: WorkoutItem[]): string | undefined {
  if (item.slot !== "fc_block" || !item.fcBlock) return undefined;
  // Count total FC blocks in this workout
  const blockNums = [...new Set(items.filter((x) => x.fcBlock).map((x) => x.fcBlock!))];
  return `Block ${item.fcBlock} of ${blockNums.length}`;
}

function getFcPositionLabel(item: WorkoutItem): string | undefined {
  if (!item.fcPosition) return undefined;
  const labels = { 1: "Heavy Compound", 2: "Force Plyo", 3: "Speed-Strength", 4: "Speed Plyo" };
  return labels[item.fcPosition];
}
```

- [ ] **Step 4: Update the Next/Done button logic**

Replace the existing Next button section. Within FC blocks, "Next" becomes "Done" and triggers the rest timer:

```typescript
{i < items.length - 1 ? (
  activeItem?.slot === "fc_block" && activeItem?.restAfter ? (
    <Button icon="✓" onClick={() => {
      haptic();
      startSessionIfNeeded();
      setRestSeconds(activeItem.restAfter!);
      setShowRestTimer(true);
    }}>
      Done
    </Button>
  ) : (
    <Button icon="➡️" onClick={goNext}>
      Next
    </Button>
  )
) : (
  <Button icon="✅" onClick={() => { haptic(); onFinish(); }}>
    Done
  </Button>
)}
```

- [ ] **Step 5: Add rest timer overlay rendering**

At the end of the component return, before the closing `</Screen>`:

```typescript
{showRestTimer && (
  <RestTimer
    seconds={restSeconds}
    nextExerciseName={items[i + 1]?.name}
    blockLabel={getFcBlockLabel(activeItem, items)}
    onSkip={() => {
      setShowRestTimer(false);
      goNext();
    }}
    onComplete={() => {
      setShowRestTimer(false);
      goNext();
    }}
  />
)}
```

- [ ] **Step 6: Add FC block context to active exercise display**

Above the exercise name in the active exercise block, add block/position context:

```typescript
{activeItem?.slot === "fc_block" && (
  <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
    {getFcBlockLabel(activeItem, items)} • {getFcPositionLabel(activeItem)}
  </div>
)}
```

- [ ] **Step 7: Add HowTo to exercise display**

After the hint display, add:

```typescript
{activeItem?.howTo && (
  <HowTo text={activeItem.howTo} image={activeItem.howToImage} />
)}
```

- [ ] **Step 8: Update the overview modal with FC block grouping**

In the overview modal, group exercises by FC block with visual separators:

```typescript
{items.map((it, idx) => {
  const active = idx === i;
  const prevItem = idx > 0 ? items[idx - 1] : null;
  const showBlockHeader = it.fcBlock && (!prevItem || prevItem.fcBlock !== it.fcBlock);

  return (
    <React.Fragment key={it.id}>
      {showBlockHeader && (
        <div style={{
          fontSize: 11,
          fontWeight: 900,
          opacity: 0.4,
          textTransform: "uppercase",
          padding: "8px 12px 4px",
          marginTop: idx > 0 ? 8 : 0,
        }}>
          FC Block {it.fcBlock}
        </div>
      )}
      <button
        onClick={() => { setI(idx); setShowOverview(false); }}
        style={{
          textAlign: "left",
          padding: 12,
          background: active ? "var(--card2)" : "transparent",
          border: active ? "var(--bw) solid var(--border)" : "1px solid var(--border-light)",
          borderRadius: 0,
          color: "var(--text)",
        }}
      >
        <div style={{ fontWeight: 900 }}>{idx + 1}. {it.name}</div>
        <div style={{ fontSize: 13, opacity: 0.7 }}>{it.dose} • {slotLabel[it.slot]}</div>
      </button>
    </React.Fragment>
  );
})}
```

- [ ] **Step 9: Add HowTo to ExerciseDetails modal**

In the `ExerciseDetails` component, after the Instructions section, add:

```typescript
{item.howTo && (
  <div style={{ display: "grid", gap: 4 }}>
    <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>How To</div>
    <div style={{ fontSize: 15, lineHeight: 1.6, fontWeight: 600, whiteSpace: "pre-wrap" }}>
      {item.howTo}
    </div>
    {item.howToImage && (
      <img src={item.howToImage} alt="Exercise demo" style={{ width: "100%", marginTop: 8 }} />
    )}
  </div>
)}
```

- [ ] **Step 10: Verify build**

```bash
npm run build
```

- [ ] **Step 11: Commit**

```bash
git add src/components/WorkoutPlayer.tsx
git commit -m "feat: WorkoutPlayer with FC block grouping, rest timer, and how-to"
```

---

### Task 8: Finisher round looping

**Files:**
- Modify: `src/components/WorkoutPlayer.tsx`

The finisher exercises need to loop for N rounds. When the user hits "Next" on the last finisher exercise and rounds remain, loop back to the first finisher exercise.

- [ ] **Step 1: Add finisher tracking state**

```typescript
const [finisherRound, setFinisherRound] = React.useState(1);
```

- [ ] **Step 2: Update goNext to handle finisher looping**

```typescript
const goNext = () => {
  haptic();
  startSessionIfNeeded();

  const currentItem = items[i];
  const nextItem = items[i + 1];

  // Check if we're at the end of a finisher round and need to loop
  if (currentItem?.slot === "finisher" && currentItem?.finisherRounds) {
    const isLastFinisher = !nextItem || nextItem.slot !== "finisher";
    if (isLastFinisher && finisherRound < currentItem.finisherRounds) {
      // Find first finisher item
      const firstFinisherIdx = items.findIndex((x) => x.slot === "finisher");
      setFinisherRound((r) => r + 1);
      // Show round rest timer
      setRestSeconds(30);
      setShowRestTimer(true);
      // When timer completes, goNext will set i to firstFinisherIdx
      // We need to store where to go — use a ref or adjust onComplete
      setI(firstFinisherIdx - 1); // -1 because goNext will +1
      return;
    }
  }

  setI((x) => Math.min(items.length - 1, x + 1));
};
```

Actually, cleaner approach — override onComplete for finisher rest:

```typescript
const [pendingIdx, setPendingIdx] = React.useState<number | null>(null);

// In the rest timer onComplete/onSkip:
onComplete={() => {
  setShowRestTimer(false);
  if (pendingIdx !== null) {
    setI(pendingIdx);
    setPendingIdx(null);
  } else {
    goNext();
  }
}}
```

Then in the finisher loop logic, set `setPendingIdx(firstFinisherIdx)` instead.

- [ ] **Step 3: Add round indicator to finisher exercise display**

```typescript
{activeItem?.slot === "finisher" && activeItem?.finisherRounds && (
  <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
    Round {finisherRound} of {activeItem.finisherRounds}
  </div>
)}
```

- [ ] **Step 4: Reset finisher round on workout restart or day change**

Add to the effect that resets state:

```typescript
React.useEffect(() => {
  setFinisherRound(1);
}, [workout]);
```

- [ ] **Step 5: Verify build**

```bash
npm run build
```

- [ ] **Step 6: Commit**

```bash
git add src/components/WorkoutPlayer.tsx
git commit -m "feat: finisher round looping with inter-round rest timer"
```

---

### Task 9: Update ModeSelect descriptions

**Files:**
- Modify: `src/components/ModeSelect.tsx`

- [ ] **Step 1: Update mode descriptions**

```typescript
<div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.35 }}>
  Base = 30 min, no warmup, 2 contrast blocks + 2 exercises.
  <br />
  High Performance = 60 min with warmup, 3 full French Contrast blocks + finisher.
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ModeSelect.tsx
git commit -m "feat: update mode descriptions for French Contrast program"
```

---

### Task 10: Manual test + deploy

- [ ] **Step 1: Run dev server and test**

```bash
cd /Users/steveellis/Documents/functional-trainer && npm run dev
```

Test manually:
1. App loads with French Contrast Tennis as default plan
2. Base mode shows 2 abbreviated FC blocks + 2 individual exercises (~8 items)
3. HP mode shows warmup + 3 full FC blocks + accessory + finisher + cooldown (~25+ items)
4. Rest timer appears after completing FC block exercises
5. Rest timer shows countdown, skip button works
6. How-to expandable appears on flagged exercises
7. Overview modal shows FC block grouping headers
8. Settings shows 3/4 day toggle
9. Switching to 3-day removes Day D from rotation
10. Finisher loops for correct number of rounds

- [ ] **Step 2: Build for production**

```bash
npm run build
```

- [ ] **Step 3: Commit final state**

```bash
git add -A
git commit -m "feat: complete French Contrast Tennis workout system"
```

- [ ] **Step 4: Deploy to Cloudflare Pages (if applicable)**

```bash
npx wrangler pages deploy dist --project-name functional-trainer
```
