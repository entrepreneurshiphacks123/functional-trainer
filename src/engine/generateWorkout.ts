import { MovementPattern } from "../../types/MovementPattern";
import { Mode, Soreness } from "./storage";
import { DayType } from "./library";
import { WorkoutItem } from "../components/WorkoutPlayer";

const dayOrder: DayType[] = ["A", "B", "C", "D"];

function nextDay(last?: DayType): DayType {
  if (!last) return "A";
  const idx = dayOrder.indexOf(last);
  return dayOrder[(idx + 1) % dayOrder.length];
}

export function generateWorkoutV1(args: {
  lastDay?: DayType;
  mode: Mode;
  soreness?: Partial<Record<MovementPattern, Soreness>>;
}): { day: DayType; items: WorkoutItem[] } {
  const day = nextDay(args.lastDay);

  // minimal soreness lock: if shoulders are red, avoid shoulder day C
  const shouldersRed = args.soreness?.shoulder_stability === "red";
  const safeDay = shouldersRed && day === "C" ? "D" : day;

  const spicy = args.mode === "high_performance";

  const itemsByDay: Record<DayType, WorkoutItem[]> = {
    A: [
      { id: "a1", slot: "prep", name: "Foot/ankle primer", dose: "2–3 min" },
      { id: "a2", slot: "prep", name: "Hip + T-spine openers", dose: "5 min" },
      { id: "a3", slot: "strength", name: "KB swings", dose: spicy ? "5×10" : "3×10" },
      { id: "a4", slot: "strength", name: "Pallof press", dose: spicy ? "4 sets" : "3 sets" },
      { id: "a5", slot: "athletic", name: "Med-ball rotational throw", dose: spicy ? "8×2" : "6×2", hint: spicy ? "fast" : "clean" },
      { id: "a6", slot: "finish", name: "Offset carry", dose: "2–4 carries" },
    ],
    B: [
      { id: "b1", slot: "prep", name: "Ankle + hip prep", dose: "6–8 min" },
      { id: "b2", slot: "strength", name: "FFESS (split squat)", dose: spicy ? "4 sets" : "3 sets" },
      { id: "b3", slot: "strength", name: "Step-downs", dose: spicy ? "4 sets" : "3 sets", hint: spicy ? "slow lowers" : "controlled" },
      { id: "b4", slot: "athletic", name: "Lateral bound → stick", dose: spicy ? "8/side" : "6/side", hint: spicy ? "bigger" : "clean" },
      { id: "b5", slot: "finish", name: "Breathing reset", dose: "2 min" },
    ],
    C: [
      { id: "c1", slot: "prep", name: "Scap + T-spine", dose: "5 min" },
      { id: "c2", slot: "strength", name: "Bottoms-up carry", dose: spicy ? "4 carries" : "3 carries", hint: spicy ? "longer" : "lighter" },
      { id: "c3", slot: "strength", name: "Tall kneeling press", dose: spicy ? "4 sets" : "3 sets" },
      { id: "c4", slot: "athletic", name: "OH med-ball catch", dose: spicy ? "6×3" : "5×3", hint: spicy ? "faster" : "soft" },
      { id: "c5", slot: "finish", name: "Band ER", dose: "2–3 sets" },
    ],
    D: [
      { id: "d1", slot: "prep", name: "Elastic warm-up", dose: "6–8 min" },
      { id: "d2", slot: "strength", name: "Pogo jumps", dose: spicy ? "6×15" : "4×15" },
      { id: "d3", slot: "athletic", name: "Ladder (lateral)", dose: spicy ? "8 runs" : "6 runs", hint: spicy ? "fast" : "smooth" },
      { id: "d4", slot: "athletic", name: "Line hops", dose: spicy ? "6×20s" : "5×20s", hint: spicy ? "continuous" : "sets" },
      { id: "d5", slot: "finish", name: "Easy walk", dose: "3 min" },
    ],
  };

  return { day: safeDay, items: itemsByDay[safeDay] };
}
