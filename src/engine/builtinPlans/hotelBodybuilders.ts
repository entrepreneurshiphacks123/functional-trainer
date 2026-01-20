export const hotelBodybuilders = {
  id: "hotel-bodybuilders",
  name: "Hotel Bodybuilders",
  icon: "🏨💪",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Chest + Delts + Tris",
      items: [
        { id: "hb_a_pullaparts", slot: "prep", name: "Band pull-aparts (or light cable row)", dose: "2×20", equipment: "Band/cable", description: "Warm shoulders + upper back." },
        { id: "hb_a_easy_pushups", slot: "prep", name: "Easy pushups", dose: "1×10", equipment: "None", description: "Groove the pattern. Not a burn set." },

        { id: "hb_a_incline", slot: "strength", name: "DB incline press", dose: "4×8–12", equipment: "DBs + bench", description: "Control down, drive up.", hint: "heavy-ish" },
        { id: "hb_a_flat", slot: "strength", name: "Flat DB press", dose: "3×10–12", equipment: "DBs + bench", description: "Full range, steady reps." },
        { id: "hb_a_fly", slot: "strength", name: "Cable fly (or DB fly)", dose: "3×12–15", equipment: "Cable or DBs", description: "Big stretch, controlled squeeze.", hint: "stretch+squeeze" },

        { id: "hb_a_lateral", slot: "athletic", name: "DB lateral raise", dose: "4×12–20", equipment: "DBs", description: "Strict reps, chase the burn.", hint: "pump" },
        { id: "hb_a_pressdown", slot: "athletic", name: "Rope pressdown (or DB skull crushers)", dose: "3×10–15", equipment: "Cable or DBs", description: "Elbows pinned, full extension." },
        { id: "hb_a_overhead", slot: "athletic", name: "Overhead cable extension", dose: "2×12–15", equipment: "Cable", description: "Long head focus. Smooth reps." },

        { id: "hb_a_pushup_burn", slot: "finish", name: "Pushup burnout (optional)", dose: "2 sets near-failure", equipment: "None", description: "Stop 1 rep before form breaks." },
      ],
    },

    B: {
      title: "Back + Bis (Width + Thickness)",
      items: [
        { id: "hb_b_scap", slot: "prep", name: "Hanging scap pulls (or light pulldown)", dose: "2×10", equipment: "Bar/cable", description: "Shoulder blades down/back." },
        { id: "hb_b_facepull", slot: "prep", name: "Face pulls", dose: "2×15", equipment: "Cable/band", description: "Pull to eyebrows. Squeeze rear delts." },

        { id: "hb_b_pulldown", slot: "strength", name: "Lat pulldown", dose: "4×8–12", equipment: "Cable", description: "Chest tall. Elbows down to ribs.", hint: "lats" },
        { id: "hb_b_cs_row", slot: "strength", name: "Chest-supported DB row", dose: "4×8–12", equipment: "DBs + bench", description: "No momentum. Pause at top.", hint: "thickness" },
        { id: "hb_b_1arm", slot: "strength", name: "1-arm cable row", dose: "3×10–12/side", equipment: "Cable", description: "Row to hip/rib. Shoulder stays down." },

        { id: "hb_b_rear_delt", slot: "athletic", name: "Rear delt cable fly", dose: "3×12–20", equipment: "Cable", description: "Light weight, strict reps." },
        { id: "hb_b_db_curl", slot: "athletic", name: "DB curl", dose: "3×8–12", equipment: "DBs", description: "Full range, no sway." },
        { id: "hb_b_cable_curl", slot: "athletic", name: "Cable curl (or hammer curl)", dose: "2×12–15", equipment: "Cable/DBs", description: "Chase the pump, slow eccentric." },

        { id: "hb_b_sapd", slot: "finish", name: "Straight-arm pulldown", dose: "2×15–20", equipment: "Cable", description: "Arms mostly straight. Lats do the work." },
      ],
    },

    C: {
      title: "Legs (Quads + Hams + Calves)",
      items: [
        { id: "hb_c_swings", slot: "prep", name: "Leg swings", dose: "10/side", equipment: "None", description: "Front/back + side-to-side." },
        { id: "hb_c_bw_squats", slot: "prep", name: "Bodyweight squats", dose: "15 reps", equipment: "None", description: "Easy reps to warm knees/hips." },

        { id: "hb_c_goblet", slot: "strength", name: "DB goblet squat", dose: "4×10–15", equipment: "DB", description: "Controlled depth, heels down.", hint: "quads" },
        { id: "hb_c_bss", slot: "strength", name: "Bulgarian split squat", dose: "4×8–12/side", equipment: "DBs + bench", description: "Slow down, drive up.", hint: "brutal" },
        { id: "hb_c_rdl", slot: "strength", name: "DB RDL", dose: "4×8–12", equipment: "DBs", description: "Hips back. Stop before low-back takes over.", hint: "hinge" },

        { id: "hb_c_legcurl", slot: "athletic", name: "Leg curl machine (or ham sliders)", dose: "3×10–15", equipment: "Machine/towel", description: "If no machine: heels on towel, slide out/in." },
        { id: "hb_c_calves", slot: "athletic", name: "Standing calf raise", dose: "5×10–15", equipment: "DBs", description: "Full stretch + squeeze. Short rests.", hint: "calves" },

        { id: "hb_c_wallsit", slot: "finish", name: "Wall sit (optional)", dose: "60–90 sec", equipment: "Wall", description: "Quads burn. Breathe." },
      ],
    },

    D: {
      title: "Arms + Shoulders (Vanity Day)",
      items: [
        { id: "hb_d_lat_prep", slot: "prep", name: "Light lateral raises", dose: "1×20", equipment: "DBs", description: "Warm blood into delts." },
        { id: "hb_d_curl_prep", slot: "prep", name: "Light curls", dose: "1×20", equipment: "DBs/cable", description: "Easy pump." },

        { id: "hb_d_incline_curl", slot: "strength", name: "DB incline curl", dose: "4×10–12", equipment: "DBs + bench", description: "Big stretch at bottom, no swing." },
        { id: "hb_d_pressdown", slot: "strength", name: "Rope pressdown", dose: "4×10–15", equipment: "Cable", description: "Elbows pinned, full lockout." },
        { id: "hb_d_hammer", slot: "strength", name: "Hammer curl", dose: "3×10–12", equipment: "DBs", description: "Neutral grip, control down." },
        { id: "hb_d_overhead", slot: "strength", name: "Overhead tricep extension", dose: "3×12–15", equipment: "Cable/DB", description: "Long stretch, smooth reps." },

        { id: "hb_d_cable_lat", slot: "athletic", name: "Cable lateral raise (or DB)", dose: "3×12–20", equipment: "Cable/DBs", description: "Strict reps, chase the burn." },
        { id: "hb_d_rear", slot: "athletic", name: "Rear delt fly", dose: "3×12–20", equipment: "Cable/DBs", description: "Control. No shrugging." },

        { id: "hb_d_burnout", slot: "finish", name: "Curls + pressdowns burnout", dose: "1×25 each", equipment: "Cable/DBs", description: "High rep pump, stop before form breaks." },
      ],
    },
  },
} as const;
