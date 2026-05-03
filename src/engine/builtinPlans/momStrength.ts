import type { StaticPlan } from "../plans";

// 3x/week strength plan for an osteoporotic 65yo woman, post-hip-replacement and post-knee surgery, training solo.
// Hard rules baked into every exercise:
//   - No spine flexion or extension (osteoporosis fracture protocol)
//   - No hip internal rotation (posterior hip precaution)
//   - No squat below 90° (the box stops her at safe depth)
//   - Machines preferred over cables where a machine exists (her preference)
//   - Body-part grouping: back → chest → shoulders → legs → arms → core
//   - 3-phase structure: warmup → strength → cooldown (Pallof + carries cover core, no dedicated activation block)
export const momStrength: StaticPlan = {
  id: "mom-strength",
  name: "Mom's Strength Plan",
  icon: "🦴",
  kind: "static",
  dayKeys: ["A", "B", "C"],
  days: {
    // ─────────────────────────────────────────────
    // DAY A — Standard Full Body (her daily anchor)
    // ─────────────────────────────────────────────
    A: {
      title: "Standard Full Body",
      items: [
        // ── Warmup ──
        {
          id: "mom_a_w1",
          slot: "prep",
          name: "Easy walk",
          dose: "5 min",
          equipment: "Treadmill or outside",
          description: "Nasal breathing. Just warm the system.",
        },
        {
          id: "mom_a_w2",
          slot: "prep",
          name: "Lateral band walks",
          dose: "10 steps each direction",
          equipment: "Mini band",
          howTo: "Band around thighs (just above knees). Knees soft, small steps sideways. Keep tension on the band the whole time.",
        },
        {
          id: "mom_a_w3",
          slot: "prep",
          name: "Monster walks (diagonal)",
          dose: "10 fwd, 10 back",
          equipment: "Mini band",
          howTo: "Band around thighs. Step forward and out at a 45° angle, alternating legs. Keep band tension. Reverse for the back portion.",
        },
        {
          id: "mom_a_w4",
          slot: "prep",
          name: "Hip circles",
          dose: "5/side",
          equipment: "None",
          description: "Slow and comfortable.",
        },
        {
          id: "mom_a_w5",
          slot: "prep",
          name: "Glute bridge (warmup)",
          dose: "10 reps",
          equipment: "None",
          description: "Just warming the hips. No max effort.",
        },

        // ── Strength: BACK ──
        {
          id: "mom_a_s1",
          slot: "strength",
          name: "Lat pulldown",
          dose: "3×8",
          equipment: "Lat pulldown machine",
          group: "BACK",
          howTo: "Pull bar to collarbone, elbows down. Don't lean back.",
        },
        {
          id: "mom_a_s2",
          slot: "strength",
          name: "Seated row machine",
          dose: "3×10",
          equipment: "Seated row machine",
          group: "BACK",
          howTo: "Long spine, pull handles to belly, squeeze shoulder blades. Don't round forward at the bottom.",
        },

        // ── Strength: CHEST ──
        {
          id: "mom_a_s3",
          slot: "strength",
          name: "Chest press machine",
          dose: "3×10",
          equipment: "Chest press machine",
          group: "CHEST",
          howTo: "Press straight forward, smooth tempo. Don't lock elbows at top. No back arching.",
        },

        // ── Strength: SHOULDERS ──
        {
          id: "mom_a_s4",
          slot: "strength",
          name: "DB lateral raise (seated)",
          dose: "3×10",
          equipment: "Dumbbells",
          group: "SHOULDERS",
          howTo: "Sit upright. Lead with the elbow, slight bend. Stop at shoulder height — not above.",
        },

        // ── Strength: LEGS ──
        {
          id: "mom_a_s5",
          slot: "strength",
          name: "Box squat (DB or cable goblet hold)",
          dose: "3×8",
          equipment: "DB or cable + box",
          group: "LEGS",
          suggestedLoad: "15-25 lb",
          kneeFlag: true,
          howTo: "Hold DB or cable handle at chest like a goblet. Sit back to the box, light touch, stand up. The box stops your depth — don't try to go below it.",
        },
        {
          id: "mom_a_s6",
          slot: "strength",
          name: "Glute-focus leg press (feet HIGH)",
          dose: "3×10",
          equipment: "Leg press machine",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Place feet HIGH on the platform, heels near top, toes pointed down. Drive through heels — feel glutes and hams. Don't lock knees at top.",
        },
        {
          id: "mom_a_s7",
          slot: "strength",
          name: "Step-ups (low box)",
          dose: "2×8/side",
          equipment: "6-8\" box",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Drive through heel of the working leg. Soft step-down — control the descent.",
        },
        {
          id: "mom_a_s8",
          slot: "strength",
          name: "Calf raises (loaded)",
          dose: "3×15",
          equipment: "Calf machine or DBs",
          group: "LEGS",
          howTo: "Slow up, slower down. Full range — heel below toes at bottom, full point at top.",
        },

        // ── Strength: CORE ──
        {
          id: "mom_a_s9",
          slot: "strength",
          name: "Standing Pallof press",
          dose: "2×10/side",
          equipment: "Cable",
          group: "CORE",
          suggestedLoad: "10-15 lb",
          howTo: "Stand sideways to a chest-height cable. Hold handle at sternum with both hands. Press straight out, hold 2 seconds, return slow. Resist the cable's pull — don't let your trunk rotate.",
        },

        // ── Cooldown ──
        {
          id: "mom_a_c1",
          slot: "cooldown",
          name: "Farmer's carry",
          dose: "2×30 sec",
          equipment: "Dumbbells",
          howTo: "Heaviest DBs you can walk with cleanly. Stand tall, shoulders back, walk at a steady pace.",
        },
        {
          id: "mom_a_c2",
          slot: "cooldown",
          name: "Single-leg balance",
          dose: "3×20 sec/side",
          equipment: "None",
          howTo: "Stand on one leg, eyes open, hands free. Hold 20 seconds. Switch sides.",
        },
        {
          id: "mom_a_c3",
          slot: "cooldown",
          name: "Easy walk",
          dose: "3 min",
          equipment: "Treadmill or outside",
          description: "Cool down, slow breathing.",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY B — Back Focus (alternate)
    // ─────────────────────────────────────────────
    B: {
      title: "Back Focus",
      items: [
        // ── Warmup ──
        {
          id: "mom_b_w1",
          slot: "prep",
          name: "Easy walk",
          dose: "5 min",
          equipment: "Treadmill or outside",
        },
        {
          id: "mom_b_w2",
          slot: "prep",
          name: "Lateral band walks",
          dose: "10 steps each direction",
          equipment: "Mini band",
        },
        {
          id: "mom_b_w3",
          slot: "prep",
          name: "Monster walks (diagonal)",
          dose: "10 fwd, 10 back",
          equipment: "Mini band",
        },
        {
          id: "mom_b_w4",
          slot: "prep",
          name: "Scapular pulls",
          dose: "12 reps",
          equipment: "Band or cable",
          howTo: "Arms straight, pull shoulder blades down and back. Small movement — initiate from the blades, not the arms.",
        },
        {
          id: "mom_b_w5",
          slot: "prep",
          name: "Clamshells",
          dose: "12/side",
          equipment: "Mini band (optional)",
          howTo: "Side-lying, knees bent, feet stacked. Open top knee while keeping feet together. Don't roll the hip back.",
        },

        // ── Strength: BACK ──
        {
          id: "mom_b_s1",
          slot: "strength",
          name: "Lat pulldown",
          dose: "3×8",
          equipment: "Lat pulldown machine",
          group: "BACK",
          howTo: "Pull to collarbone, elbows down. Don't lean back.",
        },
        {
          id: "mom_b_s2",
          slot: "strength",
          name: "Seated row machine",
          dose: "3×10",
          equipment: "Seated row machine",
          group: "BACK",
          howTo: "Long spine, pull to belly, squeeze blades.",
        },
        {
          id: "mom_b_s3",
          slot: "strength",
          name: "Rear delt fly machine",
          dose: "3×12",
          equipment: "Rear delt fly machine",
          group: "BACK",
          howTo: "Sit chest to pad. Lead with the elbows, pull handles wide and back. Squeeze rear delts.",
        },

        // ── Strength: CHEST ──
        {
          id: "mom_b_s4",
          slot: "strength",
          name: "Chest press machine",
          dose: "3×10",
          equipment: "Chest press machine",
          group: "CHEST",
          howTo: "Press straight, smooth tempo. No arching.",
        },

        // ── Strength: LEGS ──
        {
          id: "mom_b_s5",
          slot: "strength",
          name: "Glute-focus leg press (feet HIGH)",
          dose: "3×10",
          equipment: "Leg press machine",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Feet HIGH on platform, drive through heels. Glutes and hams do the work.",
        },
        {
          id: "mom_b_s6",
          slot: "strength",
          name: "Leg curl machine",
          dose: "3×10",
          equipment: "Leg curl machine",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Smooth tempo, full range. Squeeze hamstrings at the top of the curl.",
        },

        // ── Strength: ARMS ──
        {
          id: "mom_b_s7",
          slot: "strength",
          name: "Bicep curl (cable bar or DBs)",
          dose: "2×10",
          equipment: "Cable bar or dumbbells",
          group: "ARMS",
          howTo: "Elbows pinned to sides. Smooth curl, controlled lower.",
        },

        // ── Strength: CORE ──
        {
          id: "mom_b_s8",
          slot: "strength",
          name: "Standing Pallof press",
          dose: "2×10/side",
          equipment: "Cable",
          group: "CORE",
          suggestedLoad: "10-15 lb",
          howTo: "Stand sideways to cable, handle at sternum. Press out, hold 2 sec, resist rotation.",
        },

        // ── Cooldown ──
        {
          id: "mom_b_c1",
          slot: "cooldown",
          name: "Suitcase carry",
          dose: "2×30 sec/side",
          equipment: "Dumbbell",
          howTo: "Hold ONE heavy DB at your side. Walk tall — don't lean toward the weight. Switch sides.",
        },
        {
          id: "mom_b_c2",
          slot: "cooldown",
          name: "Tandem stance balance",
          dose: "3×20 sec",
          equipment: "None",
          howTo: "Stand with one foot directly in front of the other, heel touching toe (like a tightrope walker). Hold 20 sec. Switch lead foot. Repeat.",
        },
        {
          id: "mom_b_c3",
          slot: "cooldown",
          name: "Easy walk",
          dose: "3 min",
          equipment: "Treadmill or outside",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY C — Legs + Push Focus (alternate)
    // ─────────────────────────────────────────────
    C: {
      title: "Legs + Push Focus",
      items: [
        // ── Warmup ──
        {
          id: "mom_c_w1",
          slot: "prep",
          name: "Easy walk",
          dose: "5 min",
          equipment: "Treadmill or outside",
        },
        {
          id: "mom_c_w2",
          slot: "prep",
          name: "Lateral band walks",
          dose: "10 steps each direction",
          equipment: "Mini band",
        },
        {
          id: "mom_c_w3",
          slot: "prep",
          name: "Monster walks (diagonal)",
          dose: "10 fwd, 10 back",
          equipment: "Mini band",
        },
        {
          id: "mom_c_w4",
          slot: "prep",
          name: "Ankle rocks",
          dose: "10/side",
          equipment: "None",
          howTo: "Knee forward over toes, heel stays down if possible. Slow and controlled.",
        },
        {
          id: "mom_c_w5",
          slot: "prep",
          name: "Hip flexor stretch",
          dose: "30 sec/side",
          equipment: "None",
          description: "Gentle. No forcing.",
        },

        // ── Strength: BACK ──
        {
          id: "mom_c_s1",
          slot: "strength",
          name: "Lat pulldown",
          dose: "3×8",
          equipment: "Lat pulldown machine",
          group: "BACK",
          howTo: "Pull to collarbone, elbows down. Don't lean back.",
        },

        // ── Strength: CHEST ──
        {
          id: "mom_c_s2",
          slot: "strength",
          name: "Chest press machine",
          dose: "3×10",
          equipment: "Chest press machine",
          group: "CHEST",
        },

        // ── Strength: SHOULDERS ──
        {
          id: "mom_c_s3",
          slot: "strength",
          name: "DB lateral raise (seated)",
          dose: "3×10",
          equipment: "Dumbbells",
          group: "SHOULDERS",
          howTo: "Sit upright. Lead with the elbow, slight bend. Stop at shoulder height — not above.",
        },

        // ── Strength: LEGS ──
        {
          id: "mom_c_s4",
          slot: "strength",
          name: "Box squat (DB or cable goblet hold)",
          dose: "3×8",
          equipment: "DB or cable + box",
          group: "LEGS",
          suggestedLoad: "15-25 lb",
          kneeFlag: true,
          howTo: "Goblet hold at chest. Sit back to box, stand up. Box stops depth.",
        },
        {
          id: "mom_c_s5",
          slot: "strength",
          name: "Leg extension machine",
          dose: "3×10",
          equipment: "Leg extension machine",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Smooth tempo, controlled lower. Don't bang the stack.",
        },
        {
          id: "mom_c_s6",
          slot: "strength",
          name: "Step-ups (low box)",
          dose: "3×8/side",
          equipment: "6-8\" box",
          group: "LEGS",
          kneeFlag: true,
          howTo: "Drive through heel. Soft step-down — control the way down.",
        },
        {
          id: "mom_c_s7",
          slot: "strength",
          name: "Calf raises (loaded)",
          dose: "3×15",
          equipment: "Calf machine or DBs",
          group: "LEGS",
        },

        // ── Strength: ARMS ──
        {
          id: "mom_c_s8",
          slot: "strength",
          name: "Triceps pressdown",
          dose: "2×10",
          equipment: "Cable + bar",
          group: "ARMS",
          howTo: "Elbows pinned to sides. Press down to full extension, controlled return.",
        },

        // ── Strength: CORE ──
        {
          id: "mom_c_s9",
          slot: "strength",
          name: "Standing Pallof press",
          dose: "2×10/side",
          equipment: "Cable",
          group: "CORE",
          suggestedLoad: "10-15 lb",
        },

        // ── Cooldown ──
        {
          id: "mom_c_c1",
          slot: "cooldown",
          name: "Farmer's carry",
          dose: "2×30 sec",
          equipment: "Dumbbells",
        },
        {
          id: "mom_c_c2",
          slot: "cooldown",
          name: "Single-leg balance",
          dose: "3×20 sec/side",
          equipment: "None",
        },
        {
          id: "mom_c_c3",
          slot: "cooldown",
          name: "Easy walk",
          dose: "3 min",
          equipment: "Treadmill or outside",
        },
      ],
    },
  },
};
