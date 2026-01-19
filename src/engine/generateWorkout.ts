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

  // minimal “soreness lock”: if shoulders are red, avoid shoulder day C
  const shouldersRed = args.soreness?.shoulder_stability === "red";
  const safeDay = shouldersRed && day === "C" ? "D" : day;

  const spicy = args.mode === "high_performance";

  const itemsByDay: Record<DayType, WorkoutItem[]> = {
    A: [
      { id: "a1", slot: "prep", name: "Foot/ankle primer", hint: "2–3 min" },
      { id: "a2", slot: "prep", name: "Hip + T-spine openers", hint: "5 min" },
      { id: "a3", slot: "strength", name: "KB swings", hint: spicy ? "5×10" : "3×10" },
      { id: "a4", slot: "strength", name: "Pallof press", hint: spicy ? "4 sets" : "3 sets" },
      { id: "a5", slot: "athletic", name: "Med-ball rotational throw", hint: spicy ? "8×2 fast" : "6×2 clean" },
      { id: "a6", slot: "finish", name: "Offset carry", hint: "2–4 carries" },
    ],
    B: [
      { id: "b1", slot: "prep", name: "Ankle + hip prep", hint: "6–8 min" },
      { id: "b2", slot: "strength", name: "Front-foot elevated split squat", hint: spicy ? "4 sets" : "3 sets" },
      { id: "b3", slot: "strength", name: "Step-downs", hint: spicy ? "slow lowers" : "controlled" },
      { id: "b4", slot: "athletic", name: "Lateral bound → stick", hint: spicy ? "bigger hops" : "small + clean" },
      { id: "b5", slot: "finish", name: "Breathing reset", hint: "2 min" },
    ],
    C: [
      { id: "c1", slot: "prep", name: "Scap + T-spine", hint: "5 min" },
      { id: "c2", slot: "strength", name: "Bottoms-up carry", hint: spicy ? "longer carries" : "lighter" },
      { id: "c3", slot: "strength", name: "Tall kneeling press", hint: spicy ? "4 sets" : "3 sets" },
      { id: "c4", slot: "athletic", name: "Overhead med-ball catch", hint: spicy ? "faster feed" : "soft toss" },
      { id: "c5", slot: "finish", name: "Band external rotations", hint: "2–3 sets" },
    ],
    D: [
      { id: "d1", slot: "prep", name: "Elastic warm-up", hint: "6–8 min" },
      { id: "d2", slot: "strength", name: "Pogo jumps", hint: spicy ? "6×15" : "4×15" },
      { id: "d3", slot: "athletic", name: "Ladder footwork (lateral)", hint: spicy ? "faster" : "smooth" },
      { id: "d4", slot: "athletic", name: "Line hops", hint: spicy ? "continuous" : "sets + rest" },
      { id: "d5", slot: "finish", name: "Easy walk + breathe", hint: "3 min" },
    ],
  };

  return { day: safeDay, items: itemsByDay[safeDay] };
}
