export const minimalEquipmentHotel = {
  id: "minimal-equipment-hotel",
  name: "Minimal Equipment (Hotel)",
  icon: "🧳",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Full Body Density",
      items: [
        { id: "meh_a_warmup", slot: "prep", name: "Warm-up flow", dose: "5:00", equipment: "None", description: "Light movement + breathing. Get warm." },
        { id: "meh_a_goblet", slot: "strength", name: "DB goblet squat", dose: "10 reps", equipment: "DB (optional)", description: "Tall torso, controlled reps." },
        { id: "meh_a_pushups", slot: "strength", name: "Pushups", dose: "10 reps", equipment: "None", description: "Hands elevated if needed." },
        { id: "meh_a_row", slot: "strength", name: "DB row", dose: "12/side", equipment: "DB (optional)", description: "Row to hip, no twist." },
        { id: "meh_a_plank", slot: "athletic", name: "Plank", dose: "40 sec", equipment: "None", description: "Ribs down, breathe." },
        { id: "meh_a_rounds", slot: "finish", name: "Repeat circuit", dose: "3–5 rounds", equipment: "None", description: "Performance: 5 rounds. Feel Better: 3 rounds.", hint: "density" },
      ],
    },

    B: {
      title: "Legs + Core",
      items: [
        { id: "meh_b_warmup", slot: "prep", name: "Warm-up (hips + knees)", dose: "5:00", equipment: "None", description: "Leg swings, squats, lunges." },
        { id: "meh_b_split", slot: "strength", name: "Split squat", dose: "10/side", equipment: "BW/DB", description: "Slow down, drive up." },
        { id: "meh_b_rdl", slot: "strength", name: "RDL", dose: "12 reps", equipment: "DBs (optional)", description: "Hinge, long spine." },
        { id: "meh_b_sideplank", slot: "athletic", name: "Side plank", dose: "30 sec/side", equipment: "None", description: "Hips high." },
        { id: "meh_b_rounds", slot: "finish", name: "Repeat circuit", dose: "4–6 rounds", equipment: "None", description: "Performance: 6 rounds. Feel Better: 4 rounds." },
      ],
    },

    C: {
      title: "Upper + Conditioning",
      items: [
        { id: "meh_c_warmup", slot: "prep", name: "Warm-up (shoulders)", dose: "5:00", equipment: "None/band", description: "Scap pushups, band pull-aparts." },
        { id: "meh_c_incline", slot: "strength", name: "DB incline press", dose: "10 reps", equipment: "DBs + bench (optional)", description: "If no bench: floor press." },
        { id: "meh_c_pullapart", slot: "strength", name: "Band pull-aparts", dose: "20 reps", equipment: "Band", description: "Squeeze upper back." },
        { id: "meh_c_burpees", slot: "athletic", name: "Burpees (or step-back)", dose: "8 reps", equipment: "None", description: "Move steadily. Step-back option is fine." },
        { id: "meh_c_rounds", slot: "finish", name: "Repeat circuit", dose: "4–6 rounds", equipment: "None", description: "Performance: 6 rounds. Feel Better: 4 rounds." },
      ],
    },

    D: {
      title: "Move + Sweat",
      items: [
        { id: "meh_d_march", slot: "strength", name: "Brisk march", dose: "1 min", equipment: "None", description: "Get heart rate up." },
        { id: "meh_d_shadowbox", slot: "strength", name: "Shadowbox", dose: "1 min", equipment: "None", description: "Light feet, easy intensity." },
        { id: "meh_d_intervals", slot: "athletic", name: "Intervals", dose: "15–20 rounds", equipment: "None", description: "1 min march + 1 min shadowbox." },
        { id: "meh_d_stretch", slot: "finish", name: "Stretch", dose: "5 min", equipment: "None", description: "Hips + thoracic. Slow breathing." },
      ],
    },
  },
} as const;
