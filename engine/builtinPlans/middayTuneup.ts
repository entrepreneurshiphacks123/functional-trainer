export const middayTuneup = {
  id: "midday-tuneup",
  name: "Midday Tune-Up",
  icon: "🧘",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    A: {
      title: "Spine + Hips Reset",
      items: [
        { id: "mt_a_9090", slot: "prep", name: "90/90 breathing", dose: "5 slow breaths", equipment: "Wall/chair", description: "Long exhales. Ribs down." },
        { id: "mt_a_catcow", slot: "prep", name: "Cat–cow", dose: "8 reps", equipment: "None", description: "Move one vertebra at a time." },
        { id: "mt_a_hip_circles", slot: "prep", name: "Hip circles", dose: "6/side", equipment: "None", description: "Smooth circles. No pinching." },

        { id: "mt_a_wgs", slot: "strength", name: "World’s greatest stretch", dose: "4/side", equipment: "None", description: "Lunge → elbow to instep → rotate." },
        { id: "mt_a_dd_plankwave", slot: "strength", name: "Down dog → plank wave", dose: "6 reps", equipment: "None", description: "Flow from down dog to plank and back." },
        { id: "mt_a_lunge_rotate", slot: "strength", name: "Lunge with rotation", dose: "5/side", equipment: "None", description: "Rotate through upper back. Hips stable." },
        { id: "mt_a_pigeon", slot: "strength", name: "Pigeon (or figure-4)", dose: "45 sec/side", equipment: "None", description: "No pain. Breathe into the stretch." },

        { id: "mt_a_deadbug", slot: "athletic", name: "Dead bug (slow exhale)", dose: "8/side", equipment: "None", description: "Exhale fully as leg extends. Low back heavy.", hint: "control" },
        { id: "mt_a_sideplank", slot: "athletic", name: "Side plank", dose: "25–40 sec/side", equipment: "None", description: "Long line head-to-heel." },
        { id: "mt_a_bridge_march", slot: "athletic", name: "Glute bridge march", dose: "10/side", equipment: "None", description: "Hips stay level. No rocking." },

        { id: "mt_a_legs_up_wall", slot: "finish", name: "Legs up wall", dose: "2:00", equipment: "Wall", description: "Downshift. Slow nasal breaths." },
      ],
    },

    B: {
      title: "Shoulders + Upper Back (Desk Undo)",
      items: [
        { id: "mt_b_shoulder_cars", slot: "prep", name: "Shoulder CARs", dose: "4/side", equipment: "None", description: "Slow circles. Ribs down." },
        { id: "mt_b_wall_slides", slot: "prep", name: "Wall slides", dose: "10 reps", equipment: "Wall", description: "Smooth reps. No shrugging." },
        { id: "mt_b_scap_pushups", slot: "prep", name: "Scap pushups", dose: "12 reps", equipment: "None", description: "Arms straight. Shoulder blades glide." },

        { id: "mt_b_thread", slot: "strength", name: "Thread the needle", dose: "45 sec/side", equipment: "None", description: "Rotate through upper back." },
        { id: "mt_b_puppy", slot: "strength", name: "Puppy pose", dose: "60 sec", equipment: "None", description: "Hips back, arms long, breathe." },
        { id: "mt_b_cobra_child", slot: "strength", name: "Cobra → child’s pose", dose: "6 cycles", equipment: "None", description: "Gentle extension then flexion." },
        { id: "mt_b_pec", slot: "strength", name: "Doorway pec stretch", dose: "45 sec/side", equipment: "Door frame", description: "Open chest. No pain." },

        { id: "mt_b_hollow", slot: "athletic", name: "Hollow hold (or dead bug hold)", dose: "3×20–30 sec", equipment: "None", description: "Ribs down. Low back heavy." },
        { id: "mt_b_prone_w", slot: "athletic", name: 'Prone "W" raises', dose: "3×10", equipment: "None", description: "Squeeze shoulder blades down/back." },
        { id: "mt_b_snow", slot: "athletic", name: "Reverse snow angels", dose: "2×8", equipment: "None", description: "Controlled arc. No shrugging." },

        { id: "mt_b_478", slot: "finish", name: "4–7–8 breathing", dose: "4 rounds", equipment: "None", description: "In 4, hold 7, out 8." },
      ],
    },

    C: {
      title: "Hips + Hamstrings (Lower Body Relief)",
      items: [
        { id: "mt_c_fold", slot: "prep", name: "Forward fold hang", dose: "45 sec", equipment: "None", description: "Soft knees. Relax neck." },
        { id: "mt_c_ankle", slot: "prep", name: "Ankle rocks", dose: "12/side", equipment: "None", description: "Knee forward over toes." },
        { id: "mt_c_goodmorning", slot: "prep", name: "Bodyweight good morning", dose: "10 reps", equipment: "None", description: "Hinge, long spine." },

        { id: "mt_c_lunge_fold", slot: "strength", name: "Low lunge → hamstring fold", dose: "5/side", equipment: "None", description: "Flow between positions slowly." },
        { id: "mt_c_9090_switch", slot: "strength", name: "90/90 switches", dose: "10 total", equipment: "None", description: "Slow transitions. Stay tall." },
        { id: "mt_c_cossack", slot: "strength", name: "Cossack squat (assisted)", dose: "6/side", equipment: "Support", description: "Small range if needed, control." },
        { id: "mt_c_butterfly", slot: "strength", name: "Butterfly stretch", dose: "60 sec", equipment: "None", description: "Tall spine, gentle pressure." },

        { id: "mt_c_sl_bridge", slot: "athletic", name: "Single-leg glute bridge", dose: "10/side", equipment: "None", description: "Hips level, pause at top." },
        { id: "mt_c_bird_dog", slot: "athletic", name: "Bird dog", dose: "8/side (2s pause)", equipment: "None", description: "Reach long, don’t twist." },
        { id: "mt_c_leg_lifts", slot: "athletic", name: "Side-lying leg lifts", dose: "15/side", equipment: "None", description: "Slow, controlled, feel outer hip." },

        { id: "mt_c_box", slot: "finish", name: "Box breathing", dose: "2:00", equipment: "None", description: "In 4, hold 4, out 4, hold 4." },
      ],
    },

    D: {
      title: "Full Body — Feel Human Again",
      items: [
        { id: "mt_d_shake", slot: "prep", name: "Shake out + nasal breathing", dose: "1:00", equipment: "None", description: "Loosen everything. Calm breaths." },
        { id: "mt_d_catcow", slot: "prep", name: "Cat–cow", dose: "8 reps", equipment: "None", description: "Smooth spine motion." },
        { id: "mt_d_squat_hold", slot: "prep", name: "Deep squat hold (supported)", dose: "60 sec", equipment: "Support", description: "Breathe. No pain." },

        { id: "mt_d_sun", slot: "strength", name: "Sun salutation (slow)", dose: "5 rounds", equipment: "None", description: "Smooth transitions. Easy pace." },
        { id: "mt_d_lizard", slot: "strength", name: "Lizard stretch", dose: "45 sec/side", equipment: "None", description: "Breathe into hips." },
        { id: "mt_d_twist", slot: "strength", name: "Seated twist", dose: "45 sec/side", equipment: "None", description: "Rotate through upper back." },
        { id: "mt_d_bridge", slot: "strength", name: "Bridge pose hold", dose: "3×20 sec", equipment: "None", description: "Glutes on, ribs down." },

        { id: "mt_d_mcs", slot: "athletic", name: "Slow mountain climbers", dose: "2×40 sec", equipment: "None", description: "Controlled steps, ribs down." },
        { id: "mt_d_plank", slot: "athletic", name: "Plank", dose: "2×30–45 sec", equipment: "None", description: "Strong line, breathe." },

        { id: "mt_d_child", slot: "finish", name: "Child’s pose breathing", dose: "1:00", equipment: "None", description: "Slow breaths to finish." },
      ],
    },
  },
} as const;
