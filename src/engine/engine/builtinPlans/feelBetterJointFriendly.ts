export const feelBetterJointFriendly = {
  id: "feel-better-joint-friendly",
  name: "Feel Better (Back + Knees)",
  icon: "🧠🦵",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Hips + Back Reset",
      items: [
        { id: "fb_a_walk", slot: "prep", name: "Easy walk (or march)", dose: "6:00", equipment: "None", description: "Nasal breathing. Just warm the system." },
        { id: "fb_a_hip_circles", slot: "prep", name: "Hip circles", dose: "6/side", equipment: "None", description: "Slow and comfortable." },

        { id: "fb_a_tempo_goblet", slot: "strength", name: "Tempo goblet squat", dose: "3×8 (3s down)", equipment: "DB (optional)", description: "Slow controlled descent. Stop before knee discomfort.", hint: "knee friendly" },
        { id: "fb_a_sl_rdl", slot: "strength", name: "Single-leg RDL", dose: "3×8/side", equipment: "DB (optional)", description: "Hinge, long spine, light touch support if needed." },
        { id: "fb_a_glute_bridge", slot: "strength", name: "Glute bridge", dose: "3×12", equipment: "None", description: "Pause 1s at top. Don’t overarch." },

        { id: "fb_a_mcgill_curlup", slot: "athletic", name: "McGill curl-up", dose: "2×6 slow", equipment: "None", description: "Brace, small movement, no neck strain.", hint: "spine" },
        { id: "fb_a_side_plank", slot: "athletic", name: "Side plank", dose: "2×25 sec/side", equipment: "None", description: "Hips high, long line." },

        { id: "fb_a_finish_breath", slot: "finish", name: "Slow breathing", dose: "2:00", equipment: "None", description: "Long exhales to calm the system." },
      ],
    },

    B: {
      title: "Upper + Posture",
      items: [
        { id: "fb_b_wall_slides", slot: "prep", name: "Wall slides", dose: "10 reps", equipment: "Wall", description: "Ribs down. Smooth reps." },
        { id: "fb_b_band_pullapart", slot: "prep", name: "Band pull-aparts", dose: "20 reps", equipment: "Band", description: "Squeeze shoulder blades." },

        { id: "fb_b_cs_row", slot: "strength", name: "Chest-supported row", dose: "4×10", equipment: "DBs/bench or machine", description: "No momentum. Pause at top.", hint: "upper back" },
        { id: "fb_b_floor_press", slot: "strength", name: "DB floor press", dose: "3×10", equipment: "DBs", description: "Elbows 45°. Smooth reps." },
        { id: "fb_b_facepull", slot: "strength", name: "Face pulls", dose: "3×15", equipment: "Cable/band", description: "Pull to eyebrows, elbows high." },

        { id: "fb_b_neck_pec", slot: "finish", name: "Neck + pec stretch", dose: "2:00 total", equipment: "None/doorway", description: "Gentle. No pinching." },
      ],
    },

    C: {
      title: "Knees + Ankles",
      items: [
        { id: "fb_c_ankle_rocks", slot: "prep", name: "Ankle rocks", dose: "12/side", equipment: "None", description: "Knee forward over toes, heel stays down if possible." },
        { id: "fb_c_leg_swings", slot: "prep", name: "Leg swings", dose: "10/side", equipment: "None", description: "Easy range, smooth." },

        { id: "fb_c_spanish_squat", slot: "strength", name: "Spanish squat hold (strap/band)", dose: "4×30 sec", equipment: "Strap/band", description: "Sit back, shins vertical-ish. Quads burn, knees feel supported.", hint: "quad iso" },
        { id: "fb_c_stepdowns", slot: "strength", name: "Step-downs (slow)", dose: "3×8/side", equipment: "Step/box", description: "3 sec down. Control the knee path." },
        { id: "fb_c_tib_raises", slot: "strength", name: "Tibialis raises", dose: "3×15", equipment: "Wall", description: "Heels down, lift toes up." },

        { id: "fb_c_calf_stretch", slot: "finish", name: "Calf stretch + ankle circles", dose: "1:00/side + circles", equipment: "None", description: "Breathe. Ease into it." },
      ],
    },

    D: {
      title: "Feel-Good Engine + Mobility",
      items: [
        { id: "fb_d_zone2", slot: "strength", name: "Zone 2 steady work", dose: "20–30 min", equipment: "Walk/bike/row", description: "You should be able to talk. Keep it easy.", hint: "aerobic" },
        { id: "fb_d_hips", slot: "finish", name: "Hips + thoracic mobility", dose: "10 min", equipment: "None", description: "Pick 3–4 stretches you like. Slow breathing." },
      ],
    },
  },
} as const;
