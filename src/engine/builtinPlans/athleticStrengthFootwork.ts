export const athleticStrengthFootwork = {
  id: "athletic-strength-footwork",
  name: "Athletic Strength + Footwork",
  icon: "⚡️",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Acceleration + Hinge",
      items: [
        { id: "asf_a_jump_rope", slot: "prep", name: "Jump rope / bounce", dose: "2:00", equipment: "Rope (optional)", description: "Easy rhythm. Just warm up.", hint: "pulse" },
        { id: "asf_a_hip_hinge_drill", slot: "prep", name: "Hip hinge drill", dose: "10 reps", equipment: "None", description: "Hands on hips, push hips back, keep spine long." },
        { id: "asf_a_ankle_pogos", slot: "prep", name: "Ankle pogo hops", dose: "2×20", equipment: "None", description: "Small quick bounces. Stay tall." },

        { id: "asf_a_rdl", slot: "strength", name: "RDL (DB/BB)", dose: "4×6", equipment: "Dumbbells or barbell", description: "Hips back, long hamstrings. Stop before low back takes over.", hint: "hinge" },
        { id: "asf_a_split_squat", slot: "strength", name: "Split squat (front foot elevated optional)", dose: "3×8/side", equipment: "Bodyweight/DBs", description: "Slow down, drive up. Keep torso tall." },
        { id: "asf_a_ham_sliders", slot: "strength", name: "Hamstring sliders", dose: "3×10", equipment: "Towel/sliders", description: "Heels on towel, slide out/in under control." },

        { id: "asf_a_shuffle_stick", slot: "athletic", name: "Lateral shuffle → stick", dose: "4×15 sec", equipment: "None", description: "Shuffle fast, stick the landing like a photo." },
        { id: "asf_a_line_taps", slot: "athletic", name: "Fast-feet line taps", dose: "4×20 sec", equipment: "Tape line", description: "Quick contacts, light feet.", hint: "speed" },

        { id: "asf_a_calf_slow", slot: "finish", name: "Calf raises (slow)", dose: "2×15", equipment: "None/DBs", description: "Full stretch, full squeeze." },
        { id: "asf_a_breath_9090", slot: "finish", name: "90/90 breathing", dose: "2:00", equipment: "Wall/chair", description: "Long exhales, ribs down.", hint: "downshift" },
      ],
    },

    B: {
      title: "Upper Power + Elastic",
      items: [
        { id: "asf_b_scap_pushups", slot: "prep", name: "Scap pushups", dose: "12 reps", equipment: "None", description: "Arms straight. Let shoulder blades glide." },
        { id: "asf_b_band_pullaparts", slot: "prep", name: "Band pull-aparts", dose: "20 reps", equipment: "Band", description: "Squeeze upper back. No shrugging." },
        { id: "asf_b_wall_angels", slot: "prep", name: "Wall angels", dose: "10 reps", equipment: "Wall", description: "Smooth reps, ribs down." },

        { id: "asf_b_incline_press", slot: "strength", name: "DB incline press", dose: "4×8", equipment: "DBs + bench", description: "Control down, drive up.", hint: "press" },
        { id: "asf_b_1arm_row", slot: "strength", name: "1-arm row", dose: "4×10/side", equipment: "DB or cable", description: "Row to hip/rib. Keep shoulder down." },
        { id: "asf_b_pushup_iso", slot: "strength", name: "Pushup iso hold (bottom)", dose: "3×20 sec", equipment: "None", description: "Hold 1–2 inches off the floor. Breathe." },

        { id: "asf_b_shadowbox_elastic", slot: "athletic", name: "Elastic shadowboxing (snap + recoil)", dose: "5×30 sec", equipment: "None", description: "Explode then relax. Stay light.", hint: "elastic" },
        { id: "asf_b_stance_switches", slot: "athletic", name: "Step-in/step-out stance switches", dose: "4×20 sec", equipment: "None", description: "Quick switches, quiet feet." },

        { id: "asf_b_dead_hang", slot: "finish", name: "Dead hang (or towel hang)", dose: "2×30 sec", equipment: "Bar/towel", description: "Relax shoulders, breathe." },
        { id: "asf_b_shoulder_open", slot: "finish", name: "Shoulder opener stretch", dose: "1:30", equipment: "None", description: "Gentle stretch. No pain." },
      ],
    },

    C: {
      title: "Squat + Change of Direction",
      items: [
        { id: "asf_c_squat_tempo", slot: "prep", name: "Bodyweight squat (tempo)", dose: "10 reps", equipment: "None", description: "3 sec down, 1 sec up." },
        { id: "asf_c_lunge_stretch", slot: "prep", name: "Lunge stretch", dose: "30 sec/side", equipment: "None", description: "Open hip flexors, breathe." },
        { id: "asf_c_hip_airplanes", slot: "prep", name: "Hip airplanes (assisted)", dose: "6/side", equipment: "Support", description: "Control pelvis rotation. Small range if needed." },

        { id: "asf_c_front_or_goblet", slot: "strength", name: "Front squat or goblet squat", dose: "4×6", equipment: "Barbell/DB", description: "Brace, smooth reps.", hint: "squat" },
        { id: "asf_c_stepups", slot: "strength", name: "Step-ups", dose: "3×10/side", equipment: "Bench/box", description: "Drive through lead heel, control down." },
        { id: "asf_c_copenhagen_knee", slot: "strength", name: "Copenhagen plank (knee)", dose: "3×20 sec/side", equipment: "Bench", description: "Build adductors. Keep hips high.", hint: "adductors" },

        { id: "asf_c_5105", slot: "athletic", name: "5–10–5 change-of-direction", dose: "6 reps", equipment: "Markers (optional)", description: "Hard plant, quick turn. Walk back recovery." },
        { id: "asf_c_skater_hops", slot: "athletic", name: "Skater hops", dose: "3×10/side", equipment: "None", description: "Stick landing. Knee tracks over toes." },

        { id: "asf_c_adductor_stretch", slot: "finish", name: "Adductor stretch", dose: "1:00/side", equipment: "None", description: "Easy stretch, breathe." },
        { id: "asf_c_legs_up_wall", slot: "finish", name: "Legs up wall", dose: "2:00", equipment: "Wall", description: "Downshift, slow breathing." },
      ],
    },

    D: {
      title: "Core + Footwork Conditioning",
      items: [
        { id: "asf_d_catcow", slot: "prep", name: "Cat–cow", dose: "8 reps", equipment: "None", description: "Smooth spine." },
        { id: "asf_d_deadbug", slot: "prep", name: "Dead bug", dose: "10/side", equipment: "None", description: "Long exhale, ribs down." },
        { id: "asf_d_jump_rope", slot: "prep", name: "Jump rope", dose: "1:00", equipment: "Rope (optional)", description: "Easy rhythm." },

        { id: "asf_d_pallof", slot: "strength", name: "Pallof press", dose: "3×12/side", equipment: "Band/cable", description: "Resist rotation. Slow reps.", hint: "anti-rotation" },
        { id: "asf_d_suitcase_carry", slot: "strength", name: "Suitcase carry", dose: "4×30–40 sec/side", equipment: "DB/KB", description: "Stay tall. Don’t lean.", hint: "core + grip" },
        { id: "asf_d_rev_crunch", slot: "strength", name: "Reverse crunch", dose: "3×12", equipment: "None", description: "Curl pelvis, don’t swing." },

        { id: "asf_d_ladder_8min", slot: "athletic", name: "Footwork ladder (tape boxes)", dose: "8:00 continuous", equipment: "Tape (optional)", description: "Steady pace: in-in-out-out, lateral in-in, icky shuffle.", hint: "engine" },

        { id: "asf_d_child_breath", slot: "finish", name: "Child’s pose breathing", dose: "2:00", equipment: "None", description: "Slow nasal breaths.", hint: "finish" },
      ],
    },
  },
} as const;
