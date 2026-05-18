import type { StaticPlan } from "../plans";

export const frenchContrastTennis: StaticPlan = {
  id: "french-contrast-tennis",
  name: "French Contrast Tennis",
  icon: "🎾",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    // ─────────────────────────────────────────────
    // DAY A: Hip Hinge + Linear Power
    // ─────────────────────────────────────────────
    A: {
      title: "Hinge + Linear",
      items: [
        // ── Warmup ──
        {
          id: "a_w1",
          slot: "prep",
          name: "Ankle circles + calf raises",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "a_w2",
          slot: "prep",
          name: "World's greatest stretch + hip airplanes",
          dose: "3 min",
          equipment: "None",
        },
        {
          id: "a_w3",
          slot: "prep",
          name: "Band walks + glute activation",
          dose: "2 min",
          equipment: "Mini band",
        },
        {
          id: "a_w4",
          slot: "prep",
          name: "Side-lying clamshells + adductor lifts",
          dose: "10/side each",
          equipment: "None",
          description: "Wake up adductors + abductors",
          howTo:
            "Clamshells: side-lying, knees bent, open top knee like a clamshell — 10/side. Then roll over, cross the top leg in front of the bottom leg, lift the bottom leg straight up — 10/side. 60 seconds total. Quick blood flow to the hip stabilizers.",
        },

        // ── Core Activation ──
        {
          id: "a_ca1",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return. Feel your deep core brace, not your hip flexors.",
        },
        {
          id: "a_ca2",
          slot: "core_activation",
          name: "Half-kneeling Pallof press",
          dose: "8/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
          suggestedLoad: "15 lb",
          howTo:
            "Kneel on inside knee facing perpendicular to band/cable. Press out from chest. Hold 2 seconds at full extension — resist the pull. Don't let your trunk rotate.",
        },
        {
          id: "a_ca3",
          slot: "core_activation",
          name: "Bird dog (3-sec hold)",
          dose: "6/side",
          equipment: "None",
          description: "Anti-extension + anti-rotation",
          howTo:
            "Extend opposite arm and leg simultaneously. Hold 3 seconds at the top. Keep hips square — don't let the hip of the extended leg open up.",
        },
        {
          id: "a_ca4",
          slot: "core_activation",
          name: "Side plank with hip dip",
          dose: "8/side",
          equipment: "None",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked. Dip hip toward the floor, then drive it back up above neutral. Slow control. Trains the QL and obliques — the muscles that resist lateral collapse on wide shots.",
        },

        // ── FC Block 1 — Hinge Power (single pass) ──
        {
          id: "a_fc1_1",
          slot: "fc_block",
          name: "Trap bar deadlift",
          dose: "3 reps @ 80%",
          equipment: "Trap bar",
          description: "Potentiate posterior chain",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "205 lb (bar + 80/side)",
        },
        {
          id: "a_fc1_2",
          slot: "fc_block",
          name: "Broad jump → stick in split step",
          dose: "3 reps",
          equipment: "None",
          description: "Express hip extension force",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Land in split step stance — feet shoulder-width, knees bent, weight on balls of feet. Hold 2 seconds. You should look like you're about to return a serve. If you land upright, you're doing it wrong.",
        },
        {
          id: "a_fc1_3",
          slot: "fc_block",
          name: "KB swing (heavy)",
          dose: "5 reps",
          equipment: "KB",
          description: "Speed-strength hinge",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "53 lb KB",
        },
        {
          id: "a_fc1_4",
          slot: "fc_block",
          name: "Banded broad jump",
          dose: "4 reps",
          equipment: "Long band",
          description: "Overspeed hip extension",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── FC Block 2 — Rotational Power (single pass) ──
        {
          id: "a_fc2_1",
          slot: "fc_block",
          name: "Back squat (half range)",
          dose: "3 reps @ 80%",
          equipment: "Barbell",
          description: "Potentiate legs + trunk",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "175 lb (bar + 65/side)",
        },
        {
          id: "a_fc2_2",
          slot: "fc_block",
          name: "Med-ball rotational slam",
          dose: "3/side",
          equipment: "Med ball",
          description: "High-force rotation, kinematic chain",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
        },
        {
          id: "a_fc2_3",
          slot: "fc_block",
          name: "Landmine SL RDL + hip twist",
          dose: "4/side",
          equipment: "Barbell",
          description: "Rotational control under single-leg balance",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "~70 lb",
          howTo:
            "Hold the barbell end in one hand. Stand on the opposite leg. Hinge at the hip, lowering the barbell toward the ground while the free leg extends behind you. At the bottom, rotate your trunk toward the standing leg, then rotate back as you stand. Mimics loading position on open-stance shots.",
        },
        {
          id: "a_fc2_4",
          slot: "fc_block",
          name: "Med-ball shotput throw (reactive)",
          dose: "4/side",
          equipment: "Med ball",
          description: "Speed rotation, unit turn",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          suggestedLoad: "10 lb",
        },

        // ── FC Block 3 — Posterior Pull (single pass) ──
        {
          id: "a_fc3_1",
          slot: "fc_block",
          name: "Landmine T-bar row (two-handed)",
          dose: "3 reps @ 80%",
          equipment: "Barbell + landmine + V-handle",
          description: "Potentiate pull chain",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "~135 lb (bar + 90 on loaded end)",
          howTo:
            "Barbell in landmine, V-handle clipped around the loaded end. Straddle the bar, hinge to ~45° with chest tall. Row explosively to chest, control down. Tighter pull pattern than the barbell row and friendlier on the grip — closer to the racquet-arm pull through contact.",
        },
        {
          id: "a_fc3_2",
          slot: "fc_block",
          name: "Med-ball overhead slam",
          dose: "4 reps",
          equipment: "Med ball",
          description: "Express pull-down force",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "12 lb",
        },
        {
          id: "a_fc3_3",
          slot: "fc_block",
          name: "Single-arm DB row (explosive)",
          dose: "4/side",
          equipment: "DB",
          description: "Speed-strength pull",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "45 lb DB",
          howTo:
            "Explosive concentric — rip the weight to your hip. Control the eccentric. Think: fast up, slow down. Same force pattern as the racquet arm pulling through contact.",
        },
        {
          id: "a_fc3_4",
          slot: "fc_block",
          name: "Band straight-arm pulldown (speed)",
          dose: "6 reps",
          equipment: "Long band",
          description: "Overspeed lat activation",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored high. Straight arms, pull from overhead to hips as fast as possible. Snap the band down. Pure speed — the band assist lets you move faster than bodyweight allows.",
        },

        // ── Tennis Movement ──
        {
          id: "a_tm1",
          slot: "tennis_movement",
          name: "Sandbag decel (pitcher throw, hold on)",
          dose: "4/side",
          equipment: "Sandbag",
          suggestedLoad: "~30 lb",
          howTo:
            "Hold sandbag at chest. Wind up like a pitcher — load rear hip, rotate trunk back. Explosively rotate forward as if throwing, but DO NOT release. Decelerate hard through the trunk. The braking is the exercise.",
        },
        {
          id: "a_tm2",
          slot: "tennis_movement",
          name: "Ladder: Icky shuffle",
          dose: "2 passes",
          equipment: "Agility ladder",
          howTo:
            "In-in-out pattern — step in with one foot, step in with the other, step out with the lead foot. Quick lateral weight transfers through the ladder. Mirrors the quick weight shift of split-step recovery on court.",
        },
        {
          id: "a_tm3",
          slot: "tennis_movement",
          name: "Ladder: Devonte 2.0",
          dose: "2 passes",
          equipment: "Agility ladder",
          howTo:
            "Salsa pattern, switch lead foot mid-ladder, drop into a lunge every 3rd rep. Coordination + decel loading in one drill.",
        },
        {
          id: "a_tm4",
          slot: "tennis_movement",
          name: "Lateral hurdle hops",
          dose: "3 passes/direction",
          equipment: "6\" hurdles or 4 DBs spaced 2 ft apart",
          howTo:
            "Set 4 hurdles (or DBs on the floor) in a line, 2 feet apart. Hop laterally over each on both feet. Land in split step stance after the last one — feet wide, knees bent, ready position. Quick ground contacts between hops.",
        },
        {
          id: "a_tm5",
          slot: "tennis_movement",
          name: "Split step → explosive first step 3m → stick",
          dose: "4/direction",
          equipment: "None (or long band)",
          howTo:
            "Ready position. Split step, then explode forward 3 meters — just 2-3 steps of maximum acceleration. Stick the landing in athletic stance for 2 seconds. The first step is the exercise — that's what wins points on court.\n\n**Band variation:** Loop a long band around your waist — anchored behind for accel resistance, or in front for overspeed decel. Turns the drill into a strength stimulus.",
        },
        {
          id: "a_tm6",
          slot: "tennis_movement",
          name: "Lateral bound → stick → crossover recovery",
          dose: "3/side",
          equipment: "None (or long band)",
          howTo:
            "Bound wide laterally, stick landing on outside leg for 2 seconds. Then crossover step to recover back to start. Mimics wide ball → recovery on court.\n\n**Band variation:** Band around waist, anchored opposite the bound direction for accel resistance — or anchored same side as the bound for overspeed recovery.",
        },
        {
          id: "a_fin1",
          slot: "finisher",
          name: "KB clean + squat + press (complex)",
          dose: "3/side",
          equipment: "KB",
          finisherRounds: 3,
          suggestedLoad: "35 lb KB",
          howTo:
            "Single-arm KB clean to rack position. Squat. Press overhead at the top. That's one rep. Full-body power chain: pull → squat → push. Builds the ground-up force production tennis demands.",
        },

        // ── Accessories ──
        {
          id: "a_acc1",
          slot: "accessory",
          name: "Face pulls",
          dose: "3×12",
          equipment: "Band or cable",
          suggestedLoad: "20 lb",
        },
        {
          id: "a_acc2",
          slot: "accessory",
          name: "Banded lateral walks",
          dose: "3×10/side",
          equipment: "Mini band",
        },
        {
          id: "a_acc3",
          slot: "accessory",
          name: "DB single-leg RDL",
          dose: "3×8/side",
          equipment: "DBs",
          description: "Single-leg posterior chain + balance",
          suggestedLoad: "35 lb DBs",
          howTo:
            "Stand on one leg, DBs in both hands. Hinge at the hip, free leg extends behind you like a tail. Lower DBs until you feel hamstring stretch — back flat, hips square. Drive through standing-leg glute to return. Slow eccentric, controlled. Same single-leg loading pattern as planting on an open-stance forehand.",
        },
        {
          id: "a_acc4",
          slot: "accessory",
          name: "Landmine row to push press (single-arm)",
          dose: "3×6/side",
          equipment: "Barbell + landmine",
          description: "Full-chain pull + leg-drive press — vanity + integration",
          suggestedLoad: "~70 lb (bar + 25)",
          howTo:
            "Stand to one side of the landmine, barbell end in one hand. Hinge to ~45°, row the bar end to your hip (slow controlled pull). Stand up, transition the bar end to shoulder height. Dip knees, then drive through the legs to push-press overhead. Return to shoulder, reset to hinge for next rep. Pull → press → leg drive in one — same kinetic chain as a serve.",
        },

        // ── Cooldown ──
        {
          id: "a_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY B: Squat + Lateral Power
    // ─────────────────────────────────────────────
    B: {
      title: "Squat + Lateral",
      items: [
        // ── Warmup ──
        {
          id: "b_w1",
          slot: "prep",
          name: "Ankle rocks + toe raises",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "b_w2",
          slot: "prep",
          name: "Lunge stretch + hip 90/90 switches",
          dose: "3 min",
          equipment: "None",
        },
        {
          id: "b_w3",
          slot: "prep",
          name: "Mini-band lateral walks + clamshells",
          dose: "2 min",
          equipment: "Mini band",
        },

        // ── Core Activation ──
        {
          id: "b_ca1",
          slot: "core_activation",
          name: "Copenhagen plank",
          dose: "20s/side",
          equipment: "Bench",
          description: "Anti-lateral flexion + adductor strength",
          howTo:
            "Side plank with top leg on bench, bottom leg free. Squeeze adductors to hold position. Prevents groin injuries and builds lateral trunk stability for court movement.",
        },
        {
          id: "b_ca2",
          slot: "core_activation",
          name: "Side plank with reach-through",
          dose: "8/side",
          equipment: "None",
          description: "Anti-lateral flexion + rotation",
          howTo:
            "Side plank on forearm. Reach top arm under your body (rotation), then open up to the ceiling. Control the rotation — don't collapse.",
        },
        {
          id: "b_ca3",
          slot: "core_activation",
          name: "Pallof press iso hold",
          dose: "15s/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
          suggestedLoad: "15 lb",
          howTo:
            "Standing athletic stance. Press band out from chest and hold at full extension for 15 seconds. Fight the rotation. Don't let your hips shift.",
        },
        {
          id: "b_ca4",
          slot: "core_activation",
          name: "Side plank with hip dip",
          dose: "8/side",
          equipment: "None",
          description: "Anti-lateral flexion (dynamic)",
          howTo:
            "Side plank on forearm, feet stacked. Dip hip toward the floor, then drive it back up above neutral. Slow control. Pairs with the Copenhagen — Copenhagen is the iso, this is the dynamic. Both prep the QL for hard lateral movement.",
        },

        // ── FC Block 1 — Squat Power (single pass) ──
        {
          id: "b_fc1_1",
          slot: "fc_block",
          name: "Heavy goblet squat",
          dose: "3 reps @ 80%",
          equipment: "DB",
          description: "Potentiate quads + glutes",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "65 lb DB",
          howTo:
            "Hold DB at chest, elbows inside knees. Full depth, drive through the whole foot. Keep chest tall.",
        },
        {
          id: "b_fc1_2",
          slot: "fc_block",
          name: "Hurdle hops → stick landing",
          dose: "3 reps",
          equipment: "6\" hurdles or 3 DBs spaced 3 ft apart",
          description: "High-force vertical + landing mechanics",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "3 hurdles (or DBs on the floor) in a line, 3 feet apart. Hop over each continuously. Stick final landing in split step stance for 2 seconds. Minimize ground contact between hops.",
        },
        {
          id: "b_fc1_3",
          slot: "fc_block",
          name: "Goblet squat jump",
          dose: "4 reps",
          equipment: "DB",
          description: "Speed-strength squat pattern",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "30 lb DB",
        },
        {
          id: "b_fc1_4",
          slot: "fc_block",
          name: "Banded squat jumps",
          dose: "5 reps",
          equipment: "Long band",
          description: "Assisted/overspeed vertical",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── FC Block 2 — Lateral Power (single pass) ──
        {
          id: "b_fc2_1",
          slot: "fc_block",
          name: "Front-foot elevated split squat (heavy)",
          dose: "3/side",
          equipment: "DBs + step",
          description: "Potentiate single-leg + hip stability",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40 lb DBs",
        },
        {
          id: "b_fc2_2",
          slot: "fc_block",
          name: "Lateral bound → stick (2 sec hold)",
          dose: "3/side",
          equipment: "None",
          description: "High-force lateral decel",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Bound laterally, stick the landing on one leg. Hold 2 seconds — full control. Landing position = wide ball recovery stance.",
        },
        {
          id: "b_fc2_3",
          slot: "fc_block",
          name: "DB lateral step-up",
          dose: "4/side",
          equipment: "DB + box",
          description: "Speed-strength lateral drive",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "30 lb DB",
        },
        {
          id: "b_fc2_4",
          slot: "fc_block",
          name: "Shuffle → decel (3-step stop)",
          dose: "3/direction",
          equipment: "None",
          description: "Reactive lateral speed + braking",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Shuffle 5m laterally as fast as possible. Decel in exactly 3 steps: wide base, low hips, chest over toes. End in split step ready position. This is how you stop on court.",
        },

        // ── FC Block 3 — Single-Leg Reactive (single pass) ──
        {
          id: "b_fc3_1",
          slot: "fc_block",
          name: "Rear-foot elevated split squat",
          dose: "3/side",
          equipment: "DBs + bench",
          description: "Potentiate single-leg drive",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40 lb DBs",
        },
        {
          id: "b_fc3_2",
          slot: "fc_block",
          name: "Single-leg box jump → stick landing",
          dose: "3/side",
          equipment: "Box (12\")",
          description: "Single-leg force expression",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Standing on one leg, jump onto a 12\" box. Stick the landing on both feet in split step stance. 2-second hold. If unstable, lower the box. The single-leg takeoff is the point — it's how you push off on court.",
        },
        {
          id: "b_fc3_3",
          slot: "fc_block",
          name: "DB reverse lunge to knee drive",
          dose: "4/side",
          equipment: "DBs",
          description: "Speed-strength single-leg transition",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "25 lb DBs",
          howTo:
            "Step back into reverse lunge. Explode up, driving the back knee forward and up. Don't pause at the top — lunge, drive, lunge. Mimics recovery step mechanics.",
        },
        {
          id: "b_fc3_4",
          slot: "fc_block",
          name: "Single-leg pogo hops",
          dose: "5/side",
          equipment: "None",
          description: "Overspeed single-leg elastic recoil",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stiff ankle, minimal knee bend. Quick ground contacts on one leg. Same cue as regular pogos — drumstick, not a thud. The single-leg version builds the ankle stiffness you need for hard cuts.",
        },

        // ── Tennis Movement ──
        {
          id: "b_tm1",
          slot: "tennis_movement",
          name: "Lateral hurdle hops",
          dose: "3 passes/direction",
          equipment: "6\" hurdles or 4 DBs spaced 2 ft apart",
          howTo:
            "4 hurdles (or DBs) in a line, 2 feet apart. Hop laterally over each. Land in split step after the last one. Quick ground contacts — hot feet.",
        },
        {
          id: "b_tm2",
          slot: "tennis_movement",
          name: "Lateral bound → stick → crossover recovery",
          dose: "4/side",
          equipment: "None",
          howTo:
            "Bound wide, stick landing 2 sec, then crossover step to recover back to start. Mimics wide ball → recovery on court.",
        },
        {
          id: "b_tm3",
          slot: "tennis_movement",
          name: "Split step drop → explosive first step 3m",
          dose: "4/direction",
          equipment: "None (or long band)",
          howTo:
            "Start in ready position. Small hop (split step), land, explode laterally 3 meters. Just 2-3 steps of max acceleration and stick. The split step timing is the exercise — read and react.\n\n**Band variation:** Loop a long band around your waist — anchored opposite the explosion direction for accel resistance, or anchored same direction for overspeed decel work.",
        },
        {
          id: "b_tm4",
          slot: "tennis_movement",
          name: "Ladder: Icky shuffle",
          dose: "2 passes",
          equipment: "Agility ladder",
          howTo:
            "In-in-out pattern — step in with one foot, step in with the other, step out with the lead foot. Quick lateral movement through the ladder.",
        },
        {
          id: "b_tm5",
          slot: "tennis_movement",
          name: "Shuffle → decel → split step → first step forward",
          dose: "4 reps",
          equipment: "None (or long band)",
          howTo:
            "Lateral shuffle 5m, decel, split step, explosive first step forward 3m and stick. Mimics baseline defense → approach shot transition. The transition from lateral to linear is the skill.\n\n**Band variation:** Band around waist, anchored behind for accel resistance through the forward burst, or in front for overspeed first-step.",
        },
        {
          id: "b_fin1",
          slot: "finisher",
          name: "Med-ball slam → lateral shuffle → slam",
          dose: "1 round (slam → shuffle → slam → shuffle back)",
          equipment: "Med ball",
          finisherRounds: 3,
          suggestedLoad: "10 lb",
          howTo:
            "Overhead slam, pick up ball, lateral shuffle 5m, slam again, shuffle back. That's one round. Combines vertical power with lateral movement — like transitioning between baseline shots.",
        },

        // ── Accessories ──
        {
          id: "b_acc1",
          slot: "accessory",
          name: "Calf raises (slow, full ROM)",
          dose: "3×12",
          equipment: "DBs",
          suggestedLoad: "35 lb DBs",
        },
        {
          id: "b_acc2",
          slot: "accessory",
          name: "Tibialis raises",
          dose: "3×15",
          equipment: "None or band",
        },
        {
          id: "b_acc3",
          slot: "accessory",
          name: "Cossack squat",
          dose: "3×6/side",
          equipment: "DB (goblet)",
          description: "Adductor + single-leg under load",
          suggestedLoad: "35 lb DB",
          howTo:
            "Wide stance, DB at chest. Sit into one hip — working knee tracks over toe, opposite leg straight with toe lifted up. Feel the inner-thigh stretch on the straight side and squat depth on the working side. Slow control up. Builds the adductor strength + hip mobility you need to recover from wide balls.",
        },
        {
          id: "b_acc4",
          slot: "accessory",
          name: "Single-leg glute bridge",
          dose: "3×10/side",
          equipment: "None",
          description: "Single-leg posterior chain",
          howTo:
            "Lie on back, one foot planted (heel close to glute), other leg extended straight up. Drive hip up through the planted heel — squeeze glute hard at top. Slow down. Don't let the hips drop laterally. Trains the single-leg drive pattern that pushes you off the ground on every direction change.",
        },
        {
          id: "b_acc5",
          slot: "accessory",
          name: "Standing banded hip abduction",
          dose: "2×15/side",
          equipment: "Mini band",
          description: "Glute med isolation",
          howTo:
            "Mini band around ankles. Stand tall, slight knee bend. Lift one leg out to the side against the band — control back to start. Lock the glute med so it does the work, not the hip flexor.",
        },

        // ── Cooldown ──
        {
          id: "b_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY C: Upper Body + Rotation
    // ─────────────────────────────────────────────
    C: {
      title: "Upper + Rotation",
      items: [
        // ── Warmup ──
        {
          id: "c_w1",
          slot: "prep",
          name: "Scap push-ups + band pull-aparts",
          dose: "2 min",
          equipment: "Band",
        },
        {
          id: "c_w2",
          slot: "prep",
          name: "T-spine rotations on foam roller",
          dose: "2 min",
          equipment: "Foam roller",
        },
        {
          id: "c_w3",
          slot: "prep",
          name: "Bottoms-up KB hold (standing, 30s/side)",
          dose: "2 min",
          equipment: "KB",
        },
        {
          id: "c_w4",
          slot: "prep",
          name: "Med-ball chest passes at 70%",
          dose: "3–4 reps",
          equipment: "Med ball",
          description: "CNS primer",
        },
        {
          id: "c_w5",
          slot: "prep",
          name: "Side-lying clamshells + adductor lifts",
          dose: "10/side each",
          equipment: "None",
          description: "Wake up hip stabilizers",
          howTo:
            "Clamshells: 10/side. Then roll over, top leg crossed in front, lift bottom leg 10. Quick prep so the hips aren't asleep through the upper body day.",
        },

        // ── Core Activation ──
        {
          id: "c_ca1",
          slot: "core_activation",
          name: "Dead bug (slow exhale)",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Exhale as you extend opposite arm and leg. Primes trunk stability before pressing and rotation.",
        },
        {
          id: "c_ca2",
          slot: "core_activation",
          name: "Tall-kneeling Pallof press",
          dose: "8/side",
          equipment: "Cable or band",
          description: "Anti-rotation — no hip compensation",
          suggestedLoad: "15 lb",
          howTo:
            "Tall kneeling position. Press out from chest, hold 2 seconds at full extension. No hip shift, no lean. Pure trunk control.",
        },
        {
          id: "c_ca3",
          slot: "core_activation",
          name: "Bird dog with rotation",
          dose: "6/side",
          equipment: "None",
          description: "Anti-extension + rotational control",
          howTo:
            "Extend opposite arm and leg. At the top, rotate trunk slightly toward the extended arm side, then return to neutral. Trains rotational control — prepares trunk for the rotational FC blocks.",
        },
        {
          id: "c_ca4",
          slot: "core_activation",
          name: "Side plank with hip dip",
          dose: "8/side",
          equipment: "None",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked. Dip hip toward the floor, then drive it back up above neutral. Slow control. Primes the QL and obliques before the rotational FC blocks — rotation needs a stable lateral chain.",
        },

        // ── FC Block 1 — Pressing Power (single pass) ──
        {
          id: "c_fc1_1",
          slot: "fc_block",
          name: "Barbell bench press",
          dose: "3 reps @ 80%",
          equipment: "Barbell + bench",
          description: "Potentiate pressing chain",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "175 lb (bar + 65/side)",
        },
        {
          id: "c_fc1_2",
          slot: "fc_block",
          name: "Med-ball chest pass (wall)",
          dose: "4 reps",
          equipment: "Med ball",
          description: "High-force horizontal push",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "12 lb",
        },
        {
          id: "c_fc1_3",
          slot: "fc_block",
          name: "Landmine press + knee drive",
          dose: "4/side",
          equipment: "Barbell",
          description: "Ground → hip → trunk → press kinetic chain",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "~70 lb",
          howTo:
            "Stand facing away from the landmine anchor. Hold the barbell end at shoulder height with one hand. As you press up, drive the opposite knee up explosively. The force chain runs ground → hip → trunk → press — same kinetic sequence as a tennis serve. Alternate sides each rep.",
        },
        {
          id: "c_fc1_4",
          slot: "fc_block",
          name: "Band-assisted plyo push-up",
          dose: "5 reps",
          equipment: "Long band",
          description: "Reactive pressing speed",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── FC Block 2 — Rotational Torque (single pass) ──
        {
          id: "c_fc2_1",
          slot: "fc_block",
          name: "Landmine rotation (heavy)",
          dose: "3/side",
          equipment: "Barbell + landmine",
          description: "Potentiate trunk rotational power",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "80 lb (bar + 35)",
          howTo:
            "Barbell in landmine attachment. Hold end with both hands at chest. Drive from hips to rotate the bar from one hip to the other. Keep arms relatively straight — power comes from hips and trunk, not shoulders.",
        },
        {
          id: "c_fc2_2",
          slot: "fc_block",
          name: "Med-ball rotational ground slam",
          dose: "3/side",
          equipment: "Med ball",
          description: "High-force rotation, kinematic sequencing",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
        },
        {
          id: "c_fc2_3",
          slot: "fc_block",
          name: "Band low-to-high chop (split stance)",
          dose: "4/side",
          equipment: "Long band",
          description: "Speed-strength rotation — no cable needed",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Band anchored low. Split stance with inside foot forward. Pull from low to high across body, rotating trunk. Drive from back hip. Same movement as a cable chop but the band stays at the landmine station.",
        },
        {
          id: "c_fc2_4",
          slot: "fc_block",
          name: "Band-resisted open stance rotation",
          dose: "4/side",
          equipment: "Long band",
          description: "Reactive forehand/backhand loading",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored behind you at hip height. Stand in open stance (feet wide, slight knee bend). Rotate trunk against band resistance mimicking forehand/backhand loading. Snap back to start — feel the elastic recoil.",
        },

        // ── FC Block 3 — Pull + Overhead (single pass) ──
        {
          id: "c_fc3_1",
          slot: "fc_block",
          name: "Barbell bent-over row",
          dose: "3 reps @ 80%",
          equipment: "Barbell",
          description: "Potentiate pull chain — serve decel muscle group",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "135 lb",
        },
        {
          id: "c_fc3_2",
          slot: "fc_block",
          name: "Med-ball overhead forward throw",
          dose: "4 reps",
          equipment: "Med ball",
          description: "Express overhead power — serve pattern",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
          howTo:
            "Stand facing wall, 8 feet back. Ball overhead with both hands. Step forward and throw ball into the wall at maximum velocity. Whole body — legs drive, trunk flexes, arms follow. Same kinetic chain as the serve.",
        },
        {
          id: "c_fc3_3",
          slot: "fc_block",
          name: "Half-kneeling single-arm band row (explosive)",
          dose: "4/side",
          equipment: "Long band",
          description: "Speed-strength pull with rotary stability",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Half-kneeling position, band anchored at chest height in front. Pull explosively to your hip with one arm. The kneeling position forces your trunk to stabilize — no leg compensation. Anti-rotation meets speed-strength.",
        },
        {
          id: "c_fc3_4",
          slot: "fc_block",
          name: "Band pull-apart (speed)",
          dose: "8 reps",
          equipment: "Band",
          description: "Overspeed posterior chain activation",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Light band, arms straight in front. Pull apart as fast as humanly possible. Snap to full stretch. Speed is the only variable that matters here — not range, not resistance.",
        },

        // ── Tennis Movement ──
        {
          id: "c_tm1",
          slot: "tennis_movement",
          name: "Sandbag decel (pitcher throw, hold on)",
          dose: "4/side",
          equipment: "Sandbag",
          suggestedLoad: "~30 lb",
          howTo:
            "Rotational braking. Wind up like a pitcher — load rear hip, rotate trunk back. Explosively rotate forward as if throwing, but DO NOT release. Decelerate hard. The braking is the exercise — same force pattern as decelerating after a forehand follow-through.",
        },
        {
          id: "c_tm2",
          slot: "tennis_movement",
          name: "Split step → explosive first step 3m → decel → recovery step",
          dose: "4 reps",
          equipment: "None (or long band)",
          howTo:
            "Ready position. Split step, explode forward 3m, decel in 2 steps, crossover step left then right to recover. Full direction change chain — short space, maximum intent.\n\n**Band variation:** Band around waist, anchored behind for accel resistance, or in front for overspeed decel. Loads the chain without needing space.",
        },
        {
          id: "c_tm3",
          slot: "tennis_movement",
          name: "Ladder: Devonte",
          dose: "2 passes",
          equipment: "Agility ladder",
          howTo:
            "Salsa pattern but switch which foot leads mid-ladder. Forces lead-leg coordination changes — same as switching direction on court.",
        },
        {
          id: "c_tm4",
          slot: "tennis_movement",
          name: "Lateral shuffle → split step → explosive first step",
          dose: "4/direction",
          equipment: "None (or long band)",
          howTo:
            "Shuffle 5m, split step, explode forward 3m and stick. The split step is the trigger — read and react.\n\n**Band variation:** Band around waist, anchored opposite the burst direction for accel work, or same direction for overspeed.",
        },
        {
          id: "c_tm5",
          slot: "tennis_movement",
          name: "Rotational med-ball wall throw (fast)",
          dose: "6/side",
          equipment: "Med ball",
          suggestedLoad: "8 lb",
          howTo:
            "Face wall at 45 degrees. Quick rotational throws — catch and immediately throw again. Speed > power. Reactive rotation at game speed.",
        },
        // ── Strength Block (replaces finisher — vanity work that supports the serve) ──
        {
          id: "c_str1",
          slot: "strength",
          name: "Barbell bench press",
          dose: "3×8",
          equipment: "Barbell + bench",
          description: "Pressing strength — moderate load, full ROM",
          suggestedLoad: "155 lb (bar + 55/side)",
          howTo:
            "Lighter than the FC potentiation triple. Brief pause at chest, drive up controlled. This is the volume work that builds the tendon resilience and pressing capacity the heavy single can't.",
        },
        {
          id: "c_str2",
          slot: "strength",
          name: "Incline DB press",
          dose: "3×10",
          equipment: "DBs + incline bench",
          description: "Upper chest + anterior delt — supports serve volume",
          suggestedLoad: "40 lb DBs",
          howTo:
            "Incline ~30°. DBs to ear level at the bottom, press up but don't lock out (keep tension on the chest). Slow eccentric. Builds the front of the shoulder that takes the brunt of serve volume.",
        },

        // ── Accessories ──
        {
          id: "c_acc1",
          slot: "accessory",
          name: "Face pulls",
          dose: "3×12",
          equipment: "Cable or band",
          suggestedLoad: "20 lb",
        },
        {
          id: "c_acc2",
          slot: "accessory",
          name: "Bottoms-up KB carry",
          dose: "3 carries/side",
          equipment: "KB",
          description: "Shoulder stability under chaos",
          suggestedLoad: "20 lb KB",
        },

        // ── Cooldown ──
        {
          id: "c_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY D: Elastic + Conditioning
    // ─────────────────────────────────────────────
    D: {
      title: "Elastic + Conditioning",
      items: [
        // ── Warmup ──
        {
          id: "d_w1",
          slot: "prep",
          name: "Jump rope (easy rhythm)",
          dose: "2 min",
          equipment: "Jump rope (optional)",
        },
        {
          id: "d_w2",
          slot: "prep",
          name: "Ankle pogo hops + calf bounces",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "d_w3",
          slot: "prep",
          name: "Hip flexor stretch + leg swings",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "d_w4",
          slot: "prep",
          name: "Side-lying clamshells + adductor lifts",
          dose: "10/side each",
          equipment: "None",
          description: "Wake up hip stabilizers before plyos",
          howTo:
            "Clamshells: 10/side. Roll over, top leg crossed in front, lift bottom leg 10. Quick blood flow to the hips before the elastic work.",
        },

        // ── Core Activation ──
        {
          id: "d_ca1",
          slot: "core_activation",
          name: "Hollow body hold",
          dose: "20s",
          equipment: "None",
          description: "Anti-extension under full-body tension",
          howTo:
            "Arms overhead, legs extended, lower back pressed to floor. If you can't hold 20s, bend knees slightly. This is the foundation of trunk stiffness for plyometrics.",
        },
        {
          id: "d_ca2",
          slot: "core_activation",
          name: "Plank shoulder taps (slow)",
          dose: "10 total",
          equipment: "None",
          description: "Anti-rotation under instability",
          howTo:
            "High plank, tap opposite shoulder with each hand. Slow — don't let hips rock side to side. Wider feet = easier. Narrow feet = harder.",
        },
        {
          id: "d_ca3",
          slot: "core_activation",
          name: "Dead bug with contralateral reach",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension + coordination",
          howTo:
            "Opposite arm and leg extend. Reach PAST your normal range — fingertips and toes pushing away from center. 3-second extension.",
        },
        {
          id: "d_ca4",
          slot: "core_activation",
          name: "Side plank with hip dip",
          dose: "8/side",
          equipment: "None",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked. Dip hip toward the floor, then drive it back up above neutral. Slow control — primes the QL for lateral plyometrics where one-sided landing loads stack on the lateral chain.",
        },

        // ── FC Block 1 — Vertical Elasticity (single pass) ──
        {
          id: "d_fc1_1",
          slot: "fc_block",
          name: "Trap bar deadlift (lighter, 75%)",
          dose: "3 reps",
          equipment: "Trap bar",
          description: "Potentiate without grinding — fast bar speed",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "175 lb (bar + 65/side)",
        },
        {
          id: "d_fc1_2",
          slot: "fc_block",
          name: "Depth jump (off 18\" box, stick landing)",
          dose: "3 reps",
          equipment: "Box (18\")",
          description: "Stretch-shortening cycle — minimize ground contact",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Step off (don't jump off). The moment your feet hit the ground, immediately jump as high as possible. Minimize ground contact time. Stick the landing in split step stance.",
        },
        {
          id: "d_fc1_3",
          slot: "fc_block",
          name: "DB squat jump",
          dose: "4 reps",
          equipment: "DBs",
          description: "Speed-strength vertical",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "25 lb DBs",
        },
        {
          id: "d_fc1_4",
          slot: "fc_block",
          name: "Pogo hops (continuous)",
          dose: "15–20 reps",
          equipment: "None",
          description: "Ankle stiffness + elastic recoil",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stiff ankles, minimal knee bend. Quick ground contacts — pretend the floor is lava. Foot should sound like a drumstick, not a thud.",
        },

        // ── FC Block 2 — Lateral Elasticity (single pass) ──
        {
          id: "d_fc2_1",
          slot: "fc_block",
          name: "Heavy DB lateral lunge",
          dose: "3/side",
          equipment: "DBs",
          description: "Potentiate adductors + lateral hip",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "45 lb DBs",
        },
        {
          id: "d_fc2_2",
          slot: "fc_block",
          name: "Lateral depth jump (off 12\" box, stick)",
          dose: "3/side",
          equipment: "Box (12\")",
          description: "Lateral stretch-shortening cycle",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Stand on a low box. Step off sideways. The moment you land, immediately bound laterally away from the box. Stick the landing for 2 seconds. Land in athletic ready position.",
        },
        {
          id: "d_fc2_3",
          slot: "fc_block",
          name: "Banded lateral shuffle (resisted)",
          dose: "5 steps/direction",
          equipment: "Mini band",
          description: "Speed-strength lateral",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
        },
        {
          id: "d_fc2_4",
          slot: "fc_block",
          name: "Skater hops (continuous, quick)",
          dose: "8 total",
          equipment: "None",
          description: "Reactive lateral elasticity",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Continuous lateral hops. Arm swing like a speed skater. Quick ground contacts, soft landings. Cover distance — don't just hop in place.",
        },

        // ── FC Block 3 — Multi-Directional Reactive (single pass) ──
        {
          id: "d_fc3_1",
          slot: "fc_block",
          name: "Heavy DB step-up",
          dose: "3/side",
          equipment: "DBs + box (16\")",
          description: "Potentiate drive pattern",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40 lb DBs",
        },
        {
          id: "d_fc3_2",
          slot: "fc_block",
          name: "180° squat jump → stick",
          dose: "3 reps",
          equipment: "None",
          description: "Rotational force expression",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Squat, jump, rotate 180° in the air, stick the landing in athletic stance. Hold 2 seconds. Alternate rotation direction each rep. Trains rotational body control at speed.",
        },
        {
          id: "d_fc3_3",
          slot: "fc_block",
          name: "Med-ball rotational slam (fast)",
          dose: "4/side",
          equipment: "Med ball",
          description: "Speed-strength rotation",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "8 lb",
          howTo:
            "Light ball, maximum speed. Rotate and slam to the ground on your side. Catch the bounce and immediately go again. Speed > power — this is the speed position, not the force position.",
        },
        {
          id: "d_fc3_4",
          slot: "fc_block",
          name: "Compass hops (N-S-E-W, continuous)",
          dose: "2 rounds (8 hops per round)",
          equipment: "None",
          description: "Overspeed multi-directional reactivity",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stand on one spot. Hop forward, back to center, right, back to center, backward, back to center, left, back to center. That's one round. Quick ground contacts, stiff ankles. Covers all 4 directions — the movement vocabulary of court coverage.",
        },

        // ── Tennis Movement ──
        {
          id: "d_tm1",
          slot: "tennis_movement",
          name: "Ladder: Icky shuffle",
          dose: "2 passes",
          equipment: "Agility ladder",
          howTo:
            "In-in-out pattern — step in with one foot, step in with the other, step out with the lead foot. Quick lateral weight transfers through the ladder.",
        },
        {
          id: "d_tm2",
          slot: "tennis_movement",
          name: "Line hops — front/back + side/side",
          dose: "20s on / 10s off × 3 rounds",
          equipment: "None",
          howTo:
            "Two patterns: hop forward and back over a line, then side to side. Quick ground contacts, ankle stiffness drill. Stay on balls of feet.",
        },
        {
          id: "d_tm3",
          slot: "tennis_movement",
          name: "Split step → react → explosive first step 3m → stick",
          dose: "4 reps",
          equipment: "None (or long band)",
          howTo:
            "Ready position. Visual cue (partner points or ball drop). Split step, read, explode to the target 3m away. Stick landing in athletic stance. Reaction is the exercise — not the distance.\n\n**Band variation:** Band around waist, anchored opposite the burst direction for accel resistance, or anchored same direction for overspeed decel.",
        },
        {
          id: "d_tm4",
          slot: "tennis_movement",
          name: "Sprint superset (weekly — needs space)",
          dose: "3 reps",
          equipment: "None",
          description: "Once-per-week sprint work — skip if no space",
          howTo:
            "Sprint 10m, 3-step decel, split step, backpedal to start. This is the one day per week you open it up to full speed. If you don't have 10m of straight line, replace with 5m shuttles (forward → back × 3).",
        },
        {
          id: "d_fin1",
          slot: "finisher",
          name: "Burpee → broad jump → explosive start",
          dose: "3 reps",
          equipment: "None",
          finisherRounds: 3,
          howTo:
            "Burpee (chest to floor), explode up into a broad jump, land and immediately take 2-3 explosive steps forward. Full-body power + transition to first-step speed.",
        },
        {
          id: "d_fin2",
          slot: "finisher",
          name: "Med-ball complex: overhead slam + rotational throw L + rotational throw R",
          dose: "3 throws (slam + throw L + throw R)",
          equipment: "Med ball",
          finisherRounds: 3,
          suggestedLoad: "8 lb",
          howTo:
            "Three throws in sequence without rest: overhead slam, pick up, rotational throw left, pick up, rotational throw right. That's one round. Multi-planar power endurance.",
        },

        // ── Accessories ──
        {
          id: "d_acc1",
          slot: "accessory",
          name: "Tibialis raises",
          dose: "3×15",
          equipment: "None or band",
        },
        {
          id: "d_acc2",
          slot: "accessory",
          name: "Single-leg calf raise (slow)",
          dose: "3×10/side",
          equipment: "DB",
          suggestedLoad: "30 lb DB",
        },

        // ── Cooldown ──
        {
          id: "d_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
      ],
    },
  },
};
