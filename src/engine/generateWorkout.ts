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

/**
 * Adds ONE extra hard weighted full-body compound movement for Performance mode.
 * - Weighted
 * - Full body
 * - Functional / compound (some rotation bias, but universally doable)
 * - Inserted just before the "finish" slot when possible
 */
function addHighPerformanceExtraHard(items: WorkoutItem[], day: DayType): WorkoutItem[] {
  // Unique extra compound by day (so we don't repeat DB clean → push press every session)
  const EXTRA_BY_DAY: Record<DayType, WorkoutItem> = {
    // Day A: rotational power bias
    A: {
      id: "a_hp_extra",
      slot: "athletic",
      name: "DB clean → push press (alternating)",
      dose: "4×6/side",
      equipment: "Dumbbells",
      description:
        "Full-body power + conditioning. Clean to shoulder, then drive overhead. Brace ribs down, move fast but crisp. Stop 1–2 reps before form breaks.",
      hint: "heavy + clean",
    },

    // Day B: decel / single-leg bias
    B: {
      id: "b_hp_extra",
      slot: "strength",
      name: "DB reverse lunge → push press (alternating)",
      dose: "4×5/side",
      equipment: "Dumbbells",
      description:
        "Step back into a reverse lunge, stand tall, then drive the DB overhead. Keep ribs down. If pressing gets sloppy, switch to a strict press.",
      hint: "heavy + stable",
    },

    // Day C: shoulders + control (but still full-body)
    C: {
      id: "c_hp_extra",
      slot: "strength",
      name: "DB thruster",
      dose: "5×4",
      equipment: "Dumbbells",
      description:
        "Front squat into a smooth drive overhead. Stay tall in the torso, knees track over toes. Move with intent—this is strength + power, not cardio flailing.",
      hint: "legs + press",
    },

    // Day D: elastic / conditioning bias
    D: {
      id: "d_hp_extra",
      slot: "athletic",
      name: "DB snatch (alternating)",
      dose: "6×4/side",
      equipment: "Dumbbells",
      description:
        "Explosive hip drive to overhead in one motion. Keep the DB close, punch through at the top, and reset each rep. Stop early if it turns into a shoulder grind.",
      hint: "fast + crisp",
    },
  };

  const extra = EXTRA_BY_DAY[day];

  // Put it before the finisher if a finish slot exists
  const idxFinish = items.map((x) => x.slot).lastIndexOf("finish");
  if (idxFinish >= 0) {
    return [...items.slice(0, idxFinish), extra, ...items.slice(idxFinish)];
  }
  return [...items, extra];
}

export function generateWorkoutV1(args: {
  lastDay?: DayType;
  mode: Mode;
  soreness?: Partial<Record<MovementPattern, Soreness>>;
}): { day: DayType; items: WorkoutItem[] } {
  const day = nextDay(args.lastDay);

  // Minimal soreness lock: if shoulders are red, avoid shoulder day C
  const shouldersRed = args.soreness?.shoulder_stability === "red";
  const safeDay: DayType = shouldersRed && day === "C" ? "D" : day;

  const spicy = args.mode === "high_performance";

  const itemsByDay: Record<DayType, WorkoutItem[]> = {
    // Day A: Accel + Rotation (tennis pop + rotational power)
    A: [
      {
        id: "a1",
        slot: "prep",
        name: "Foot/ankle primer",
        dose: "2–3 min",
        equipment: "Mini band (optional)",
        description:
          "Quick pulses: toe raises, ankle circles, short hops in place. Keep it springy—wake up the feet, don’t fatigue them.",
      },
      {
        id: "a2",
        slot: "prep",
        name: "Hip + T-spine openers",
        dose: "5 min",
        equipment: "None",
        description:
          "World’s greatest stretch + slow rotations. Long exhale, ribcage down, rotate through upper back (not low back).",
      },
      {
        id: "a3",
        slot: "strength",
        name: "KB swings",
        dose: spicy ? "5×10" : "3×10",
        equipment: "Kettlebell",
        description:
          "Hinge hard, snap hips, let the bell float. Shins mostly vertical. Stop the set when snap slows or shoulders take over.",
        hint: "hip snap",
      },
      {
        id: "a4",
        slot: "strength",
        name: "Half-kneeling Pallof press",
        dose: spicy ? "4 sets" : "3 sets",
        equipment: "Cable or band",
        description:
          "Brace like someone’s about to poke your ribs. Press straight out, don’t rotate. Slow out, controlled back.",
        hint: "anti-rotation",
      },
      {
        id: "a5",
        slot: "athletic",
        name: "Med-ball rotational throw",
        dose: spicy ? "8×2/side" : "6×2/side",
        equipment: "Med ball + wall",
        description:
          "Load hips, rotate through torso, throw like a forehand. Finish balanced—don’t stumble. Reset each rep.",
        hint: "fast but clean",
      },
      {
        id: "a6",
        slot: "finish",
        name: "Offset suitcase carry",
        dose: "3–5 carries",
        equipment: "Dumbbell or kettlebell",
        description:
          "Walk tall. Don’t lean. Quiet ribs. This is ‘anti-side-bend’ strength—money for tennis posture and back health.",
      },
    ],

    // Day B: Decel + Single-leg (change of direction + knee/hip integrity)
    B: [
      {
        id: "b1",
        slot: "prep",
        name: "Ankle + hip prep",
        dose: "6–8 min",
        equipment: "Box/step (optional)",
        description:
          "Slow ankle rocks, hip airplanes (supported), and a few controlled step-downs. Goal: joints feel ‘oiled,’ not tired.",
      },
      {
        id: "b2",
        slot: "strength",
        name: "Front-foot elevated split squat",
        dose: spicy ? "4 sets" : "3 sets",
        equipment: "DBs + small plate/step",
        description:
          "Front foot slightly elevated. Drop straight down, stay tall, drive through midfoot. Keep knee tracking over toes.",
        hint: "controlled reps",
      },
      {
        id: "b3",
        slot: "strength",
        name: "Step-downs",
        dose: spicy ? "4×6/side" : "3×6/side",
        equipment: "Box/step",
        description:
          "Slow lower (2–3 seconds). Tap heel lightly—don’t dump weight. Stand back up with the working leg.",
        hint: "slow eccentric",
      },
      {
        id: "b4",
        slot: "athletic",
        name: "Lateral bound → stick",
        dose: spicy ? "8/side" : "6/side",
        equipment: "None",
        description:
          "Jump sideways, land quiet, freeze 1–2 seconds. Knee soft, hip back, chest proud. Own the decel.",
        hint: "stick the landing",
      },
      {
        id: "b5",
        slot: "athletic",
        name: "Shuffle → decel (3-step stop)",
        dose: spicy ? "6 runs" : "4 runs",
        equipment: "Floor line/cones",
        description:
          "Quick shuffle 3–5 steps then hard stop in athletic stance. Think: ‘brake under control’ like a defensive slide.",
        hint: "quiet feet",
      },
      {
        id: "b6",
        slot: "finish",
        name: "Breathing reset",
        dose: "2 min",
        equipment: "None",
        description:
          "Nose inhale, long exhale. Let shoulders drop. You should finish feeling better than you started.",
      },
    ],

    // Day C: Shoulders + Control (chaos-stable, joint-friendly, tennis armor)
    C: [
      {
        id: "c1",
        slot: "prep",
        name: "Scap + T-spine",
        dose: "5 min",
        equipment: "Band (optional)",
        description:
          "Scap push-ups + band pull-aparts. Smooth reps. Feel shoulder blades glide—no shrugging.",
      },
      {
        id: "c2",
        slot: "strength",
        name: "Bottoms-up carry",
        dose: spicy ? "4 carries" : "3 carries",
        equipment: "Kettlebell",
        description:
          "Elbow under wrist. Wrist stacked. Walk slow and steady. If the bell wobbles, lighten it—control first.",
        hint: "shoulder stability",
      },
      {
        id: "c3",
        slot: "strength",
        name: "Tall-kneeling DB press",
        dose: spicy ? "4×6" : "3×6",
        equipment: "Dumbbells",
        description:
          "Knees down, glutes tight, ribs down. Press without leaning back. Stop 1–2 reps before form breaks.",
        hint: "no back arch",
      },
      {
        id: "c4",
        slot: "strength",
        name: "1-arm cable row (pause)",
        dose: spicy ? "4×8/side" : "3×8/side",
        equipment: "Cable or band",
        description: "Row to ribcage. Pause 1 second. Shoulder blade back/down—not up into your ear.",
        hint: "pause each rep",
      },
      {
        id: "c5",
        slot: "athletic",
        name: "Med-ball catch (athletic stance)",
        dose: spicy ? "6×3" : "5×3",
        equipment: "Med ball + partner/wall",
        description:
          "Athletic stance. Catch, absorb, stabilize. Don’t let shoulders yank. This is reactive stability, not max power.",
        hint: "soft hands",
      },
      {
        id: "c6",
        slot: "finish",
        name: "Alphabet (Shoulders)",
        dose: "2–3 sets",
        equipment: "DB",
        description:
          "U, W, T, n, p.",
      },
    ],

    // Day D: Elastic + Footwork (bounce, rhythm, conditioning without grind)
    D: [
      {
        id: "d1",
        slot: "prep",
        name: "Elastic warm-up",
        dose: "6–8 min",
        equipment: "Jump rope (optional)",
        description:
          "Light bounce: rope or pogo rhythm. Keep breathing easy. Goal: springy calves + warm body.",
      },
      {
        id: "d2",
        slot: "strength",
        name: "Pogo jumps",
        dose: spicy ? "6×15" : "4×15",
        equipment: "None",
        description:
          "Small quick bounces. Stiff-ish ankles, soft knees. Land quiet. Stop when bounce slows.",
        hint: "quick contacts",
      },
      {
        id: "d3",
        slot: "athletic",
        name: "Ladder footwork (lateral)",
        dose: spicy ? "8 runs" : "6 runs",
        equipment: "Agility ladder or tape",
        description:
          "Fast feet, light steps. Stay tall. Don’t look down too much—keep head steady like sport.",
        hint: spicy ? "speed" : "smooth",
      },
      {
        id: "d4",
        slot: "athletic",
        name: "Line hops (front/back)",
        dose: spicy ? "6×20s" : "5×20s",
        equipment: "Floor line/tape",
        description:
          "Hop over a line, quick and low. Arms relaxed. Breathe. If you get sloppy, shorten the set.",
      },
      {
        id: "d5",
        slot: "athletic",
        name: "Single-leg 180 (control)",
        dose: spicy ? "5/side" : "4/side",
        equipment: "None",
        description:
          "Balance on one leg, rotate hips/shoulders together to face behind you, then return. Smooth, controlled—no wobble chase.",
        hint: "own the turn",
      },
      {
        id: "d6",
        slot: "finish",
        name: "Easy walk + breathe",
        dose: "3 min",
        equipment: "None",
        description:
          "Downshift. Nose inhale, long exhale. Leave the session feeling athletic, not cooked.",
      },
    ],
  };

  const base = itemsByDay[safeDay];

  // Performance mode: add 1 extra hard weighted full-body compound movement
  const finalItems = spicy ? addHighPerformanceExtraHard(base, safeDay) : base;

  return { day: safeDay, items: finalItems };
}
