import type { StaticPlan } from "../plans";

export const functionalFitness45: StaticPlan = {
  id: "functional-fitness-45",
  name: "Functional Fitness - 45min",
  icon: "🏋️",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],

  // Plan-specific extra hard compound (only added in high_performance mode)
  highPerformanceExtraByDay: {
    A: {
      id: "ffa-hp-extra",
      slot: "athletic",
      name: "DB Clean → Push Press (alternating)",
      dose: "4×6/side",
      equipment: "Dumbbells",
      description:
        "Full-body power. Clean to shoulder, then drive overhead. Crisp reps only—stop 1–2 reps before form breaks.",
      hint: "fast + clean",
    },
    B: {
      id: "ffb-hp-extra",
      slot: "strength",
      name: "DB Reverse Lunge → Push Press (alternating)",
      dose: "4×5/side",
      equipment: "Dumbbells",
      description:
        "Step back into a reverse lunge, stand tall, then press overhead. Ribs down. Smooth reps—no wobbling.",
      hint: "heavy + stable",
    },
    C: {
      id: "ffc-hp-extra",
      slot: "strength",
      name: "DB Thruster",
      dose: "5×4",
      equipment: "Dumbbells",
      description:
        "Front squat into a smooth drive overhead. Stay tall, drive hard, and keep it clean—not sloppy cardio reps.",
      hint: "legs + press",
    },
    D: {
      id: "ffd-hp-extra",
      slot: "athletic",
      name: "DB Snatch (alternating)",
      dose: "6×4/side",
      equipment: "Dumbbells",
      description:
        "Explosive hip drive to overhead in one motion. Reset each rep. Stop if it turns into a shoulder grind.",
      hint: "crisp reps",
    },
  },

  days: {
    A: {
      title: "Accel + Rotation 🔥",
      items: [
        {
          id: "a1",
          slot: "prep",
          name: "Foot/ankle primer",
          dose: "2–3 min",
          equipment: "Mini band (optional)",
          description:
            "Quick pulses: toe raises, ankle circles, short hops in place. Wake things up without fatiguing.",
        },
        {
          id: "a2",
          slot: "prep",
          name: "Hip + T-spine openers",
          dose: "5 min",
          equipment: "None",
          description:
            "World’s greatest stretch + slow rotations. Long exhale, ribs down, rotate through upper back.",
        },
        {
          id: "a3",
          slot: "strength",
          name: "KB swings",
          dose: "4×10",
          equipment: "Kettlebell",
          description:
            "Hinge hard, snap hips, let the bell float. Stop when snap slows or shoulders take over.",
          hint: "hip snap",
        },
        {
          id: "a4",
          slot: "strength",
          name: "Half-kneeling Pallof press",
          dose: "3 sets",
          equipment: "Cable or band",
          description:
            "Brace like someone’s about to poke your ribs. Press straight out, don’t rotate. Controlled reps.",
          hint: "anti-rotation",
        },
        {
          id: "a5",
          slot: "athletic",
          name: "Med-ball rotational throw",
          dose: "6×2/side",
          equipment: "Med ball + wall",
          description:
            "Load hips, rotate through torso, throw like a forehand. Reset each rep. Balance > chaos.",
          hint: "fast but clean",
        },
        {
          id: "a6",
          slot: "finish",
          name: "Offset suitcase carry",
          dose: "3–5 carries",
          equipment: "Dumbbell or kettlebell",
          description:
            "Walk tall. Don’t lean. Quiet ribs. This is anti-side-bend strength—money for posture and core.",
        },
      ],
    },

    B: {
      title: "Decel + Single-leg",
      items: [
        {
          id: "b1",
          slot: "prep",
          name: "Ankle + hip prep",
          dose: "6–8 min",
          equipment: "Box/step (optional)",
          description:
            "Slow ankle rocks + hip openers + a few controlled step-downs. Goal: oiled joints, not fatigue.",
        },
        {
          id: "b2",
          slot: "strength",
          name: "Front-foot elevated split squat",
          dose: "3–4 sets",
          equipment: "DBs + small plate/step",
          description:
            "Drop straight down, stay tall, drive through midfoot. Knee tracks over toes. Controlled reps.",
          hint: "controlled reps",
        },
        {
          id: "b3",
          slot: "strength",
          name: "Step-downs",
          dose: "3×6/side",
          equipment: "Box/step",
          description:
            "Slow lower (2–3 sec). Tap heel lightly—don’t dump. Stand up with the working leg.",
          hint: "slow eccentric",
        },
        {
          id: "b4",
          slot: "athletic",
          name: "Lateral bound → stick",
          dose: "6/side",
          equipment: "None",
          description:
            "Jump sideways, land quiet, freeze 1–2 sec. Soft knee, hip back, chest proud. Own decel.",
          hint: "stick the landing",
        },
        {
          id: "b5",
          slot: "athletic",
          name: "Shuffle → decel (3-step stop)",
          dose: "4 runs",
          equipment: "Floor line/cones",
          description:
            "Quick shuffle 3–5 steps then hard stop in athletic stance. Think: brake under control.",
          hint: "quiet feet",
        },
        {
          id: "b6",
          slot: "finish",
          name: "Breathing reset",
          dose: "2 min",
          equipment: "None",
          description:
            "Nose inhale, long exhale. Let shoulders drop. Finish feeling better than you started.",
        },
      ],
    },

    C: {
      title: "Shoulders + Control",
      items: [
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
          dose: "3–4 carries",
          equipment: "Kettlebell",
          description:
            "Elbow under wrist. Wrist stacked. Walk steady. If it wobbles, lighten it—control first.",
          hint: "stability",
        },
        {
          id: "c3",
          slot: "strength",
          name: "Tall-kneeling DB press",
          dose: "3×6",
          equipment: "Dumbbells",
          description:
            "Knees down, glutes tight, ribs down. Press without leaning back. Stop before form breaks.",
          hint: "no back arch",
        },
        {
          id: "c4",
          slot: "strength",
          name: "1-arm cable row (pause)",
          dose: "3×8/side",
          equipment: "Cable or band",
          description:
            "Row to ribcage. Pause 1 sec. Shoulder blade back/down—not up into your ear.",
          hint: "pause each rep",
        },
        {
          id: "c5",
          slot: "athletic",
          name: "Med-ball catch (athletic stance)",
          dose: "5×3",
          equipment: "Med ball + partner/wall",
          description:
            "Catch, absorb, stabilize. Reactive stability, not max power. Quiet shoulders, soft hands.",
          hint: "control",
        },

        // ✅ Requested swap: last shoulder day exercise -> Alphabet (with DBs)
        {
          id: "c6",
          slot: "finish",
          name: "Alphabet (DBs)",
          dose: "2 rounds",
          equipment: "Light dumbbells",
          description:
            "Arms straight (soft elbows). Draw the alphabet with your hands (A–Z). Keep ribs down, neck long. Stop if it pinches—this should feel like a controlled burn.",
          hint: "light + controlled",
        },
      ],
    },

    D: {
      title: "Elastic + Footwork 🔥",
      items: [
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
          dose: "4×15",
          equipment: "None",
          description:
            "Small quick bounces. Stiff-ish ankles, soft knees. Land quiet. Stop when bounce slows.",
          hint: "quick contacts",
        },
        {
          id: "d3",
          slot: "athletic",
          name: "Ladder footwork (lateral)",
          dose: "6 runs",
          equipment: "Agility ladder or tape",
          description:
            "Fast feet, light steps. Stay tall. Don’t stare at your feet—keep head steady like sport.",
          hint: "smooth",
        },
        {
          id: "d4",
          slot: "athletic",
          name: "Line hops (front/back)",
          dose: "5×20s",
          equipment: "Floor line/tape",
          description:
            "Hop over a line, quick and low. Arms relaxed. Shorten the set if you get sloppy.",
        },
        {
          id: "d5",
          slot: "athletic",
          name: "Single-leg 180 (control)",
          dose: "4/side",
          equipment: "None",
          description:
            "Balance on one leg, rotate to face behind you, then return. Smooth control—no wobble chasing.",
          hint: "own the turn",
        },
        {
          id: "d6",
          slot: "finish",
          name: "Easy walk + breathe",
          dose: "3 min",
          equipment: "None",
          description:
            "Downshift. Nose inhale, long exhale. Leave feeling athletic, not cooked.",
        },
      ],
    },
  },
};
