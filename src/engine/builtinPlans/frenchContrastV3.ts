import type { StaticPlan } from "../plans";

// ═══════════════════════════════════════════════════════════════
// FRENCH CONTRAST V3 — 3-day split
// Each day = warm-up, core, 5 French contrast blocks of 4 (done ONCE each,
// no repeat rounds), blocks 4-5 optional (Skip to complexes), 2 complexes,
// 3 lifts (each its own screen), 2 small movements incl. an isometric,
// cooldown. About 60 min; about 50 when skipping blocks 4-5.
// Every block runs: 1 Heavy -> 2 Plyo -> 3 Loaded jump -> 4 Fast/reactive.
// Rest about 20s between exercises, 2-3 min between blocks.
// ═══════════════════════════════════════════════════════════════

const DROP_PROGRESSION =
  "**Progression:** weeks 1-2, step off and stick the landing (drop catch). Weeks 3+, rebound straight up (full drop jump).";

const LATERAL_DROP_PROGRESSION =
  "**Progression:** weeks 1-2, step off and stick the landing on the outside leg. Weeks 3+, bound out of the landing right away.";

export const frenchContrastV3: StaticPlan = {
  id: "french-contrast-v3",
  name: "French Contrast V3",
  icon: "🎾",
  kind: "static",
  dayKeys: ["A", "B", "C"],
  sorenessDays: { shoulder: "B", knee: "C" },
  days: {
    // ─────────────────────────────────────────────
    // DAY A: Hinge + Linear
    // ─────────────────────────────────────────────
    A: {
      title: "Hinge + Linear",
      items: [
        // ── Warm-up ──
        {
          id: "v3a_w1",
          slot: "prep",
          name: "Ankle circles + calf raises",
          dose: "1 min",
          equipment: "None",
          description: "Ankles ready for jumps",
          howTo:
            "Slow ankle circles each direction, then calf raises with a full stretch at the bottom and a hard squeeze at the top. Feel the calves and Achilles warm up. Don't bounce through the raises, the jumps come later.",
        },
        {
          id: "v3a_w2",
          slot: "prep",
          name: "World's greatest stretch + hip airplanes",
          dose: "2 min",
          equipment: "None",
          description: "Hips and T-spine",
          howTo:
            "Deep lunge, elbow to instep, then rotate the chest open toward the front knee. Follow with hip airplanes: stand on one leg, hinge, and open and close the hip slowly. Feel the hips and T-spine unlock. Don't rush it or collapse the stance knee inward.",
        },
        {
          id: "v3a_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Adductor prep, daily",
          howTo:
            "Feet on sliders, hands on hips or a wall for balance. Slide one leg out to the side into a lateral lunge. The sliding leg stays straight, bend the stance knee, push back to center. Alternate sides. Controlled tempo, opens the adductors dynamically instead of a static stretch.",
        },

        // ── Core ──
        {
          id: "v3a_ca1",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return. Feel your deep core brace, not your hip flexors.\n\n**Progression:** hold a light DB or plate (5–10 lb) in the extending-arm hand.",
        },
        {
          id: "v3a_ca2",
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
          id: "v3a_ca3",
          slot: "core_activation",
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked on the Bosu dome. Dip hip toward the floor, then drive it back up above neutral. The unstable base under your feet adds a real balance demand on top of the QL/oblique work.",
        },

        // ── FC Block 1 — Hinge power (done once) ──
        {
          id: "v3a_fc1_1",
          slot: "fc_block",
          name: "Barbell Romanian deadlift",
          dose: "5 @ 80%",
          equipment: "Barbell",
          description: "Heavy — potentiation",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "185 lb",
          howTo:
            "Bar at the thighs, hinge at the hips with a flat back, bar travels close to the shins. Feel the hamstrings load, not the low back. Stop when you feel the stretch, don't chase depth with a rounded spine. This is the potentiator for the jumps that follow.",
        },
        {
          id: "v3a_fc1_2",
          slot: "fc_block",
          name: "Kneeling jump to feet",
          dose: "4",
          equipment: "None",
          description: "Plyo",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Kneel on both knees, sit back slightly onto your heels. Swing your arms and explosively extend hips and knees to jump up, landing on your feet in athletic stance. Zero counter-movement help from the ankles — pure hip-extension power from a dead stop.",
        },
        {
          id: "v3a_fc1_3",
          slot: "fc_block",
          name: "Single-arm KB swing (heavy)",
          dose: "5/side",
          equipment: "KB",
          description: "Loaded jump",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "53 lb KB",
          howTo:
            "Same hip-snap as a two-hand swing, but single-arm forces your core to resist the rotational pull of the offset load. Don't let your trunk twist.",
        },
        {
          id: "v3a_fc1_4",
          slot: "fc_block",
          name: "Drop jump, rebound to vertical",
          dose: "4",
          equipment: "12-18\" box",
          description: "Reactive",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stand on a 12-18\" box. Step off, don't jump off, land on both feet and rebound straight up as fast as you can. Feel the ground contact be short and springy, like a hot stove. Common mistake: sinking deep into the landing and losing the rebound.\n\n" +
            DROP_PROGRESSION,
        },

        // ── FC Block 2 — Linear speed (done once) ──
        {
          id: "v3a_fc2_1",
          slot: "fc_block",
          name: "Machine hip thrust (3s iso hold at top)",
          dose: "5 @ 80%",
          equipment: "Hip thrust machine",
          description: "Heavy — potentiation",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          howTo:
            "Upper back on the pad, belt or pad snug over the hip crease, feet flat and about hip-width. Drive through the heels to full hip extension, ribs down, chin tucked. Pause: at the top of every rep, squeeze the glutes and hold the lockout for a slow 3-count, then lower under control. Feel it in the glutes, not the low back. Common mistake: cranking the lower back to fake the lockout.",
        },
        {
          id: "v3a_fc2_2",
          slot: "fc_block",
          name: "Broad jump → stick",
          dose: "3",
          equipment: "None",
          description: "Plyo",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Swing the arms back, load the hips, and jump as far forward as you can. Land on both feet in athletic stance and hold the stick for 2 seconds. Feel the glutes and hamstrings absorb the landing. Common mistake: hopping forward again instead of sticking.",
        },
        {
          id: "v3a_fc2_3",
          slot: "fc_block",
          name: "DB jump squat (light, 20-30%)",
          dose: "4",
          equipment: "Light DBs",
          description: "Loaded jump",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "15-20 lb DBs",
          howTo:
            "Light DBs at your sides. Dip to a quarter squat and jump as high as you can, then land soft and reset. The load stays light on purpose, speed is the point. Feel the legs fire fast, not grind. Common mistake: going too heavy and turning it into a slow squat.",
        },
        {
          id: "v3a_fc2_4",
          slot: "fc_block",
          name: "Split step → explosive first step 3m → stick",
          dose: "4/direction",
          equipment: "None or long band",
          description: "Reactive",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Ready position. Split step, then explode forward 3 meters — just 2-3 steps of maximum acceleration. Stick the landing in athletic stance for 2 seconds. The first step is the exercise.\n\n**Band variation:** Loop a long band around your waist — anchored behind for accel resistance, or in front for overspeed decel.",
        },

        // ── FC Block 3 — Lateral (done once) ──
        {
          id: "v3a_fc3_1",
          slot: "fc_block",
          name: "Heavy DB lateral lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy — adductors",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "50-60 lb DBs",
          howTo:
            "Heavy DBs held at the chest or sides. Step wide to one side, sit the hips back and bend that knee while the other leg stays straight with the foot flat. Push hard off the working leg to return to center. Feel the adductors and glute of the working side. Common mistake: letting the knee cave in or the heel lift.",
        },
        {
          id: "v3a_fc3_2",
          slot: "fc_block",
          name: "Lateral bound → stick (2s)",
          dose: "4/side",
          equipment: "None",
          description: "Plyo",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point — deceleration strength under real load.",
        },
        {
          id: "v3a_fc3_3",
          slot: "fc_block",
          name: "Lateral bound series (banded, continuous)",
          dose: "6",
          equipment: "Long band",
          description: "Loaded jump",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Band around your waist anchored to one side. Bound laterally against the band resistance, stick each landing for a half-beat, then bound back. Continuous, keep the rhythm.",
        },
        {
          id: "v3a_fc3_4",
          slot: "fc_block",
          name: "Lateral drop to bound",
          dose: "3/side",
          equipment: "12\" box",
          description: "Reactive",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stand on the edge of a 12\" box, side-on to your landing spot. Step off sideways, land on the outside leg, and bound laterally off it right away. Feel the landing leg absorb and spring. Common mistake: hopping off the box instead of stepping off.\n\n" +
            LATERAL_DROP_PROGRESSION,
        },

        // ── FC Block 4 — Pull (optional, done once) ──
        {
          id: "v3a_fc4_1",
          slot: "fc_block",
          name: "Barbell bent-over row",
          dose: "5 @ 80%",
          equipment: "Barbell",
          description: "Heavy — potentiation",
          fcBlock: 4,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "115 lb",
          howTo:
            "Hinge to about 45°, flat back, bar hanging below the chest. Row the bar to the lower ribs and squeeze the shoulder blades together. Feel the lats and mid-back, not the low back. Common mistake: standing up and heaving the bar with momentum.",
        },
        {
          id: "v3a_fc4_2",
          slot: "fc_block",
          name: "Med-ball overhead slam",
          dose: "4",
          equipment: "Med ball",
          description: "Plyo",
          fcBlock: 4,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          suggestedLoad: "12 lb",
          howTo:
            "Reach tall with the ball overhead, then slam it into the floor with everything, hips and ribs driving down. Feel the lats and core fire. Pick the ball up under control, don't let it bounce back into your face.",
        },
        {
          id: "v3a_fc4_3",
          slot: "fc_block",
          name: "Single-arm cable row (explosive)",
          dose: "4/side",
          equipment: "Cable",
          description: "Loaded speed",
          fcBlock: 4,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "45-50 lb stack",
          howTo:
            "Explosive concentric, controlled eccentric. Cable keeps tension consistent through the whole range instead of dropping off at lockout — closer to the resistance curve of a racquet pull-through.",
        },
        {
          id: "v3a_fc4_4",
          slot: "fc_block",
          name: "Band straight-arm pulldown (speed)",
          dose: "6",
          equipment: "Long band",
          description: "Fast",
          fcBlock: 4,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Band anchored high. Straight arms, pull from overhead to hips as fast as possible. Snap the band down. Pure speed.",
        },

        // ── FC Block 5 — Single-leg hinge (optional, done once) ──
        {
          id: "v3a_fc5_1",
          slot: "fc_block",
          name: "Landmine SL RDL + hip twist",
          dose: "5/side",
          equipment: "Landmine",
          description: "Heavy — potentiation",
          fcBlock: 5,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "70 lb",
          howTo:
            "Hold the barbell end in one hand. Stand on the opposite leg. Hinge at the hip, lowering the barbell toward the ground while the free leg extends behind you. At the bottom, rotate your trunk toward the standing leg, then rotate back as you stand. Mimics loading position on open-stance shots.",
        },
        {
          id: "v3a_fc5_2",
          slot: "fc_block",
          name: "Single-leg broad jump → stick",
          dose: "3/side",
          equipment: "None",
          description: "Plyo",
          fcBlock: 5,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          howTo:
            "Stand on one leg, swing the arms, and jump forward off that leg. Land on the same leg and hold the stick for 2 seconds with a soft knee. Feel the glute and the ankle stabilize. Common mistake: the knee caving in on the landing.",
        },
        {
          id: "v3a_fc5_3",
          slot: "fc_block",
          name: "DB step-up jump (light)",
          dose: "3/side",
          equipment: "Step-up block + light DBs",
          description: "Loaded jump",
          fcBlock: 5,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "15-20 lb DBs",
          howTo:
            "Light DBs at your sides, one foot on a step-up block. Drive through that foot and jump straight up, land back on the block foot, and reset. Feel the working-leg glute and quad fire fast. Common mistake: pushing off the back foot instead of the one on the block.",
        },
        {
          id: "v3a_fc5_4",
          slot: "fc_block",
          name: "Pogo hops",
          dose: "10-15",
          equipment: "None",
          description: "Fast, elastic",
          fcBlock: 5,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Stiff ankles, knees nearly straight, tiny quick hops off the balls of the feet, staying tall. Feel the calves and Achilles act like a spring. Don't bend the knees and squat the hops, keep contact time as short as you can.",
        },

        // ── Complexes ──
        {
          id: "v3a_ath1",
          slot: "athletic",
          name: "Cable row to knee drive",
          dose: "3×6/side",
          equipment: "Cable",
          description: "Pull + drive",
          suggestedLoad: "30 lb",
          howTo:
            "Anchor cable at chest height. Hold the handle in the hand OPPOSITE your standing leg, slight stagger to start. Row the handle to your ribs while exploding the opposite knee up to a tall single-leg stand — finish balanced on one leg, knee at hip height, handle at your side. Hold the balance 1 second, return under control. One of your staples.",
        },
        {
          id: "v3a_ath2",
          slot: "athletic",
          name: "Landmine rainbow (anti-rotation)",
          dose: "3×6/side",
          equipment: "Landmine",
          description: "Loaded core — anti-rotation",
          suggestedLoad: "bar + 25 lb",
          howTo:
            "Hold the landmine sleeve with both hands at chest height, feet shoulder width. Sweep the bar in a big arc from one hip up over to the other hip, arms long, while the hips and ribs stay square. Feel the obliques brace against the pull. Common mistake: letting the hips spin with the bar.",
        },

        // ── Lifts ──
        {
          id: "v3a_lift1",
          slot: "strength",
          name: "Barbell deadlift",
          dose: "4×5",
          equipment: "Barbell",
          group: "Barbell deadlift",
          suggestedLoad: "225 lb",
          howTo:
            "Bar over mid-foot, hinge down and grip just outside the legs. Brace, pull the slack out of the bar, then push the floor away. Feel the glutes and hamstrings drive, lats tight. Common mistake: yanking the bar off the floor with a rounded back.",
        },
        {
          id: "v3a_lift2",
          slot: "strength",
          name: "Single-arm DB row (bench-supported knee and hand)",
          dose: "3×8/side",
          equipment: "DB + flat bench",
          group: "Single-arm DB row",
          suggestedLoad: "60-70 lb DB",
          howTo:
            "Knee and same-side hand on a flat bench, back flat. Row the DB to your hip, elbow past the torso, and squeeze the lat. Lower under control to a full stretch. Common mistake: twisting the torso to swing the weight up.",
        },
        {
          id: "v3a_lift3",
          slot: "strength",
          name: "Barbell good morning",
          dose: "3×8",
          equipment: "Barbell",
          group: "Barbell good morning",
          suggestedLoad: "95 lb",
          howTo:
            "Bar on the upper back, soft knees. Push the hips straight back until the torso is near parallel, then drive the hips forward to stand. Feel the hamstrings stretch. Keep the weight modest, common mistake is rounding the back or turning it into a squat.",
        },

        // ── Small movements ──
        {
          id: "v3a_acc1",
          slot: "accessory",
          name: "Copenhagen plank",
          dose: "20-30s/side",
          equipment: "Flat bench",
          description: "Isometric — adductors",
          howTo:
            "Top leg on a bench, bottom leg hangs, top-side forearm planked on the floor. Hold the hips level. Brutal on the adductors — your best defense against a groin strain sliding into a wide ball.",
        },
        {
          id: "v3a_acc2",
          slot: "accessory",
          name: "Slider hamstring curl, single-leg, eccentric",
          dose: "6-8/side",
          equipment: "Sliders",
          description: "Hamstring armor",
          howTo:
            "Lie on your back, one heel on a slider, other leg lifted or braced. Bridge the hips up, then SLOWLY straighten the sliding leg out (3-4 second eccentric) while keeping hips up, then curl back in. The slow-out is the point — that's the eccentric strength that protects the hamstring at end-range, exactly where it tears.",
        },

        // ── Cooldown ──
        {
          id: "v3a_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
          howTo:
            "Easy walk, breathe in and out through the nose only. Let the heart rate come down and the shoulders drop. If you have to mouth-breathe, slow the walk until you can stop.",
        },
        {
          id: "v3a_cd2",
          slot: "cooldown",
          name: "Lacrosse ball rotator cuff + lat release",
          dose: "60-90s",
          equipment: "Lacrosse ball",
          description: "Self-myofascial release — posterior cuff + lat attachment",
          howTo:
            "Against a wall or lying on the floor, pin the ball into the meat of the rear shoulder (posterior cuff) and the lat edge just below the armpit. Small slow rolls, pause on tender spots 10-15 seconds. Not a stretch — you're releasing tissue tension, breathe through it.",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY B: Upper + Rotation
    // ─────────────────────────────────────────────
    B: {
      title: "Upper + Rotation",
      items: [
        // ── Warm-up ──
        {
          id: "v3b_w1",
          slot: "prep",
          name: "Scap push-ups + band pull-aparts",
          dose: "2 min",
          equipment: "Band",
          description: "Shoulders",
          howTo:
            "Scap push-ups: arms locked in a plank, let the chest sink between the shoulder blades, then push the floor away. Then band pull-aparts at chest height, pulling the band to the chest. Feel the shoulder blades glide. Don't bend the elbows on the scap push-ups.",
        },
        {
          id: "v3b_w2",
          slot: "prep",
          name: "T-spine rotations on foam roller",
          dose: "1-2 min",
          equipment: "Foam roller",
          description: "Rotation range",
          howTo:
            "Lie with the roller under the upper back, hands behind the head, hips on the floor or bridged. Extend over the roller, then rotate the chest to each side. Feel the mid-back open up. Don't let the ribs flare or the low back take the movement.",
        },
        {
          id: "v3b_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Adductor prep, daily",
          howTo:
            "Feet on sliders, hands on hips or a wall. Slide one leg out into a lateral lunge, sliding leg stays straight, bend the stance knee, push back to center. Controlled tempo.",
        },

        // ── Core ──
        {
          id: "v3b_ca1",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return. Feel your deep core brace, not your hip flexors.",
        },
        {
          id: "v3b_ca2",
          slot: "core_activation",
          name: "Tall-kneeling Pallof press",
          dose: "8/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
          suggestedLoad: "15 lb",
          howTo:
            "Tall kneeling, both knees down, band or cable anchored to the side at chest height. Press out from the chest and hold 2 seconds at full extension. Resist the pull, don't let your trunk rotate or lean.",
        },
        {
          id: "v3b_ca3",
          slot: "core_activation",
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked on the Bosu dome. Dip hip toward the floor, then drive it back up above neutral. The unstable base under your feet adds a real balance demand on top of the QL/oblique work.",
        },

        // ── FC Block 1 — Press (done once) ──
        {
          id: "v3b_fc1_1",
          slot: "fc_block",
          name: "Barbell bench press (3s pause on chest)",
          dose: "5 @ 80%",
          equipment: "Barbell + bench",
          description: "Heavy — potentiation",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "155 lb",
          howTo:
            "Shoulder blades pinned back and down, feet planted, bar over the mid-chest. Lower under control until the bar touches the chest, then pause: hold the bar motionless on the chest for a full 3-count, no bouncing and no relaxing the upper back, then drive it up fast. Feel the chest and triceps load from a dead stop. Common mistake: cutting the pause short or flaring the elbows wide.",
        },
        {
          id: "v3b_fc1_2",
          slot: "fc_block",
          name: "Plyo push-up",
          dose: "4",
          equipment: "None",
          description: "Plyo",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Strong plank, lower the chest to the floor, then explode up so the hands leave the ground. Land with soft elbows and go straight into the next rep. Feel the chest and triceps fire fast. Common mistake: sagging hips. If the hands won't clear the floor, do the reps with a clap-free push-off at an incline.",
        },
        {
          id: "v3b_fc1_3",
          slot: "fc_block",
          name: "Single-arm DB push press (explosive)",
          dose: "4/side",
          equipment: "DB",
          description: "Loaded speed",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "35-40 lb DB",
          howTo:
            "DB at shoulder. Dip the knees slightly and drive up explosively, using leg drive to help press the DB overhead. Trains the leg-to-arm power transfer of a real serve.",
        },
        {
          id: "v3b_fc1_4",
          slot: "fc_block",
          name: "Resisted punch throws (band, alternating)",
          dose: "8/side",
          equipment: "Band",
          description: "Fast",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored behind you at chest height, handle in each hand. Alternate fast punching presses against the band resistance, like a boxing combo.",
        },

        // ── FC Block 2 — Rotation (done once) ──
        {
          id: "v3b_fc2_1",
          slot: "fc_block",
          name: "Heavy single-arm landmine rotation, offset stance",
          dose: "4/side @ 80%",
          equipment: "Landmine",
          description: "Heavy — potentiation",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "70 lb",
          howTo:
            "Hold the landmine sleeve in one hand at chest height, stance offset. Rotate the trunk to swing the bar across your body and back, resisting the urge to let your trunk get pulled by the offset load.",
        },
        {
          id: "v3b_fc2_2",
          slot: "fc_block",
          name: "Med-ball rotational wall slam",
          dose: "4/side",
          equipment: "Med ball",
          description: "Plyo",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
          howTo:
            "Standing (not down at the ground), rotate and slam the ball into a wall at roughly chest-to-shoulder height, catch the rebound and reset. Matches an actual stroke height instead of driving down.",
        },
        {
          id: "v3b_fc2_3",
          slot: "fc_block",
          name: "Heavy cable woodchopper, high-to-low",
          dose: "5/side",
          equipment: "Cable",
          description: "Loaded speed",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "Heavy — leave 1-2 reps in the tank",
          howTo:
            "Set the cable high, handle in both hands. Rotate hips and trunk to pull the handle down and across your body to the opposite hip, like chopping wood. Power comes from the hip turn, not the arms — let your back foot pivot.",
        },
        {
          id: "v3b_fc2_4",
          slot: "fc_block",
          name: "Cable rotational punch (fast, open stance)",
          dose: "6/side",
          equipment: "Cable",
          description: "Fast",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Cable at chest height, open stance. Punch the handle across your body fast, resetting under control each rep. Cable gives more consistent tension than a band.",
        },

        // ── FC Block 3 — Lateral + footwork (done once) ──
        {
          id: "v3b_fc3_1",
          slot: "fc_block",
          name: "Heavy DB lateral step-up",
          dose: "5/side",
          equipment: "Step-up block + heavy DBs",
          description: "Heavy — lateral",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40-50 lb DBs",
          howTo:
            "Heavy DBs at your sides, stand side-on to a knee-height block. Put the near foot on it and drive through that leg to stand tall on top, trail leg stays off the block. Lower under control. Feel the glute and outer hip of the working leg. Common mistake: pushing off the trail foot.",
        },
        {
          id: "v3b_fc3_2",
          slot: "fc_block",
          name: "Lateral bound → stick (2s)",
          dose: "4/side",
          equipment: "None",
          description: "Plyo",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point — deceleration strength under real load.",
        },
        {
          id: "v3b_fc3_3",
          slot: "fc_block",
          name: "Lateral lunge to med-ball scoop toss",
          dose: "4/side",
          equipment: "Med ball",
          description: "Loaded, lateral to rotation",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "10 lb",
          howTo:
            "Hold the med ball low. Lateral lunge to one side, then drive off that leg and scoop-toss the ball up and across your body into a wall or open space as you rotate. Feel the leg drive turn into hip rotation. Common mistake: throwing with the arms and skipping the legs.",
        },
        {
          id: "v3b_fc3_4",
          slot: "fc_block",
          name: "Split step → react → explosive first step 3m",
          dose: "4/direction",
          equipment: "None",
          description: "Reactive footwork",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Ready position, split step, then react to the direction you chose or were called and explode 3 meters with 2-3 steps of maximum acceleration. The first step is the exercise. Land the split step on the balls of the feet and keep the chest over the knees.",
        },

        // ── FC Block 4 — Pull (optional, done once) ──
        {
          id: "v3b_fc4_1",
          slot: "fc_block",
          name: "Landmine T-bar row (bent-over, standing)",
          dose: "5 @ 80%",
          equipment: "Landmine + V-handle",
          description: "Heavy row, no chest pad",
          fcBlock: 4,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "115 lb",
          howTo:
            "Straddle the bar with a V-handle, hinge to about 45° with a flat back. Row the handle to your ribs and squeeze the shoulder blades. Feel the lats and mid-back. Common mistake: standing up to heave the weight, keep the hinge angle fixed.",
        },
        {
          id: "v3b_fc4_2",
          slot: "fc_block",
          name: "Med-ball overhead forward throw",
          dose: "4",
          equipment: "Med ball",
          description: "Plyo",
          fcBlock: 4,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          suggestedLoad: "10 lb",
          howTo:
            "Hold the ball overhead, rock back slightly, then throw it forward into a wall or open space using the whole body, hips first. Feel the lats and core snap. Explosive overhead pattern, serve-relevant.",
        },
        {
          id: "v3b_fc4_3",
          slot: "fc_block",
          name: "Half-kneeling single-arm cable row (explosive)",
          dose: "4/side",
          equipment: "Cable",
          description: "Loaded speed",
          fcBlock: 4,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "30-35 lb",
          howTo:
            "Half-kneeling, cable low. Explosive concentric pull to ribs, controlled eccentric. Cable gives a more consistent arc than a band.",
        },
        {
          id: "v3b_fc4_4",
          slot: "fc_block",
          name: "Band face pull to external rotation (fast)",
          dose: "8",
          equipment: "Band",
          description: "Fast",
          fcBlock: 4,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Band anchored at face height. Pull to your face, then at the end of the pull, rotate your hands/forearms up and back into external rotation — fast tempo. Directly trains the rotator cuff pattern that keeps it healthy under all the pressing/rotating this day does.",
        },

        // ── FC Block 5 — Lower drop (optional, done once) ──
        {
          id: "v3b_fc5_1",
          slot: "fc_block",
          name: "Heavy DB reverse lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy — potentiation",
          fcBlock: 5,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "50-60 lb DBs",
          howTo:
            "Heavy DBs at your sides. Step back into a long lunge, back knee just above the floor, then drive through the front heel to return. Feel the front glute and quad load. Common mistake: front knee drifting in or the torso pitching forward.",
        },
        {
          id: "v3b_fc5_2",
          slot: "fc_block",
          name: "Box jump → stick",
          dose: "3",
          equipment: "18-24\" box",
          description: "Plyo",
          fcBlock: 5,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          howTo:
            "Swing the arms, jump onto the 18-24\" box, and land softly in a quarter squat. Stick it for 2 seconds, then step down, never jump down. Feel the glutes and quads take the landing quietly. Common mistake: landing in a deep squat.",
        },
        {
          id: "v3b_fc5_3",
          slot: "fc_block",
          name: "Single-leg hop to stick (light DB)",
          dose: "3/side",
          equipment: "Light DB",
          description: "Loaded jump",
          fcBlock: 5,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "15-20 lb DB",
          howTo:
            "Light DB held at the chest. Hop forward off one leg and land on that same leg, hold the stick for 2 seconds with a soft knee. Feel the glute and ankle lock in. Common mistake: the knee collapsing inward or hopping again before the hold is done.",
        },
        {
          id: "v3b_fc5_4",
          slot: "fc_block",
          name: "Drop catch (step off, land, stick)",
          dose: "4",
          equipment: "18\" box",
          description: "Reactive",
          fcBlock: 5,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Stand on an 18\" box. Step off, land on both feet in a quarter squat, and freeze. Feel the whole leg absorb the force, hips back, knees tracking over the toes. Common mistake: landing stiff-legged or letting the knees cave.\n\n" +
            DROP_PROGRESSION,
        },

        // ── Complexes ──
        {
          id: "v3b_ath1",
          slot: "athletic",
          name: "Reverse lunge to landmine rotational press",
          dose: "3×5/side",
          equipment: "Landmine",
          howTo:
            "Hold the landmine sleeve at chest height with both hands. Step back into a reverse lunge, loading into the front leg. Drive up out of the lunge by extending that front leg, and as you stand, rotate your trunk away from the landmine anchor while pressing the bar out and across your body. The press is powered by the leg drive and hip turn, not your arms — hips lead, press follows, same as transferring ground force into a forehand. Reset under control, repeat.",
        },
        {
          id: "v3b_ath2",
          slot: "athletic",
          name: "Half-kneeling to standing rotational row + knee drive",
          dose: "3×6/side",
          equipment: "Cable or band",
          howTo:
            "Start half-kneeling with the cable or band anchored low to the side. Pull the handle into a rotational row as you stand up out of the half-kneel, then finish by driving the back knee up to hip height on one leg. Feel the pull, the stand, and the knee drive link into one motion. Common mistake: standing first and pulling with the arms alone.",
        },

        // ── Lifts ──
        {
          id: "v3b_lift1",
          slot: "strength",
          name: "Barbell overhead press",
          dose: "4×6",
          equipment: "Barbell",
          group: "Barbell overhead press",
          suggestedLoad: "95 lb",
          howTo:
            "Bar at the collarbone, elbows just in front of the bar, glutes squeezed. Press straight up and move the head through once the bar passes the forehead, finish with biceps by the ears. Feel the shoulders and triceps drive. Common mistake: leaning back and turning it into an incline press.",
        },
        {
          id: "v3b_lift2",
          slot: "strength",
          name: "Incline DB bench press",
          dose: "3×8",
          equipment: "Incline bench + DBs",
          group: "Incline DB bench press",
          suggestedLoad: "55-60 lb DBs",
          howTo:
            "Bench at 30-45°, shoulder blades pinned back. Lower the DBs to the upper chest with elbows about 45° from the torso, then press up and slightly in. Feel the upper chest stretch at the bottom. Common mistake: flaring the elbows and letting the shoulders roll forward.",
        },
        {
          id: "v3b_lift3",
          slot: "strength",
          name: "TRX row (feet forward, body straight)",
          dose: "3×8",
          equipment: "TRX",
          group: "TRX row",
          howTo:
            "Hold the handles, lean back with the body in one straight line from heels to head, feet forward to make it harder. Row the chest to the handles, squeeze the shoulder blades, lower slowly. Feel the mid-back and lats. Common mistake: sagging hips or shrugging the shoulders to the ears.",
        },

        // ── Small movements ──
        {
          id: "v3b_acc1",
          slot: "accessory",
          name: "Heavy Pallof press iso hold",
          dose: "30s/side",
          equipment: "Cable or band",
          description: "Isometric — loaded core",
          suggestedLoad: "25-30 lb",
          howTo:
            "Tall stance, cable or band anchored to the side at chest height, set heavier than the warm-up Pallof. Press out from the chest and hold for the full 30 seconds while the pull tries to turn you. Feel the obliques brace. Common mistake: letting the hips twist or the arms drift back toward the chest.",
        },
        {
          id: "v3b_acc2",
          slot: "accessory",
          name: "Side-lying banded abduction",
          dose: "3×12/side",
          equipment: "Mini band",
          description: "Abductors",
          howTo:
            "Lie on your side, mini band around the knees or ankles, hips stacked. Lift the top leg up and slightly back, toes level or slightly down, and lower slowly. Feel the outer glute, not the low back. Common mistake: rolling the pelvis backward to swing the leg higher.",
        },

        // ── Cooldown ──
        {
          id: "v3b_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
          howTo:
            "Easy walk, breathe in and out through the nose only. Let the heart rate come down and the shoulders drop. If you have to mouth-breathe, slow the walk until you can stop.",
        },
        {
          id: "v3b_cd2",
          slot: "cooldown",
          name: "Lacrosse ball rotator cuff + lat release",
          dose: "60-90s",
          equipment: "Lacrosse ball",
          description: "Self-myofascial release — posterior cuff + lat attachment",
          howTo:
            "Against a wall or lying on the floor, pin the ball into the meat of the rear shoulder (posterior cuff) and the lat edge just below the armpit. Small slow rolls, pause on tender spots 10-15 seconds.",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY C: Squat + Lateral
    // ─────────────────────────────────────────────
    C: {
      title: "Squat + Lateral",
      items: [
        // ── Warm-up ──
        {
          id: "v3c_w1",
          slot: "prep",
          name: "Ankle rocks + toe raises",
          dose: "1-2 min",
          equipment: "None",
          howTo:
            "Half-kneeling or standing at a wall, rock the knee forward over the toes with the heel down, then do toe raises with the heels planted. Feel the ankle open and the shins work. Don't let the heel lift on the rocks.",
        },
        {
          id: "v3c_w2",
          slot: "prep",
          name: "Lunge stretch + hip 90/90 switches",
          dose: "2 min",
          equipment: "None",
          howTo:
            "Hold a deep lunge stretch for a few breaths on each side, then sit into 90/90 and switch sides by rotating both knees across. Feel the front and rear hip open. Don't force the switch with the hands, let the hips do the work.",
        },
        {
          id: "v3c_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Adductor prep, daily",
          howTo:
            "Feet on sliders, hands on hips or a wall. Slide one leg out into a lateral lunge, sliding leg stays straight, bend the stance knee, push back to center. Controlled tempo.",
        },

        // ── Core ──
        {
          id: "v3c_ca1",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return. Feel your deep core brace, not your hip flexors.",
        },
        {
          id: "v3c_ca2",
          slot: "core_activation",
          name: "Pallof press iso hold",
          dose: "20s/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
          suggestedLoad: "15 lb",
          howTo:
            "Tall stance, band/cable anchored to the side. Press out from chest and hold — resist the pull, don't let your trunk rotate.",
        },
        {
          id: "v3c_ca3",
          slot: "core_activation",
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu",
          description: "Anti-lateral flexion",
          howTo:
            "Side plank on forearm, feet stacked on the Bosu dome. Dip hip toward the floor, then drive it back up above neutral. The unstable base under your feet adds a real balance demand on top of the QL/oblique work.",
        },

        // ── FC Block 1 — Squat (done once) ──
        {
          id: "v3c_fc1_1",
          slot: "fc_block",
          name: "Barbell back squat",
          dose: "5 @ 80%",
          equipment: "Barbell + rack",
          description: "Heavy — potentiation",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "185 lb",
          howTo:
            "Bar on the upper back, feet just outside shoulder width. Brace, sit down between the hips until the thighs are at least parallel, then drive up hard. Feel the quads and glutes load. Common mistake: knees caving in or the chest folding forward out of the hole.",
        },
        {
          id: "v3c_fc1_2",
          slot: "fc_block",
          name: "Broad jump to vertical jump",
          dose: "3",
          equipment: "None",
          description: "Plyo",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Broad jump forward, stick for a half-second, then immediately convert into a vertical jump — no reset. Trains going from a wide recovery step into an overhead ball.",
        },
        {
          id: "v3c_fc1_3",
          slot: "fc_block",
          name: "DB jump squat (light, 20-30%)",
          dose: "4",
          equipment: "Light DBs",
          description: "Loaded jump",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "15-20 lb DBs",
          howTo:
            "Light DBs at your sides. Dip to a quarter squat and jump as high as you can, then land soft and reset. The load stays light on purpose, speed is the point. Feel the legs fire fast, not grind. Common mistake: going too heavy and turning it into a slow squat.",
        },
        {
          id: "v3c_fc1_4",
          slot: "fc_block",
          name: "Drop jump, rebound to vertical",
          dose: "4",
          equipment: "12-18\" box",
          description: "Reactive",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stand on a 12-18\" box. Step off, don't jump off, land on both feet and rebound straight up as fast as you can. Feel the ground contact be short and springy, like a hot stove. Common mistake: sinking deep into the landing and losing the rebound.\n\n" +
            DROP_PROGRESSION,
        },

        // ── FC Block 2 — Lateral (done once) ──
        {
          id: "v3c_fc2_1",
          slot: "fc_block",
          name: "Heavy DB lateral lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy — adductors",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "50-60 lb DBs",
          howTo:
            "Heavy DBs held at the chest or sides. Step wide to one side, sit the hips back and bend that knee while the other leg stays straight with the foot flat. Push hard off the working leg to return to center. Feel the adductors and glute of the working side. Common mistake: letting the knee cave in or the heel lift.",
        },
        {
          id: "v3c_fc2_2",
          slot: "fc_block",
          name: "Cossack squat to jump",
          dose: "4/side",
          equipment: "None or light DB",
          description: "Plyo",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "20-25 lb DB optional",
          howTo:
            "Wide stance, shift all your weight into a deep lateral squat on one leg (other leg straight, heel down). Drive back to center and explode into a small vertical jump.",
        },
        {
          id: "v3c_fc2_3",
          slot: "fc_block",
          name: "Lateral bound series (banded, continuous)",
          dose: "6",
          equipment: "Long band",
          description: "Loaded jump",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Band around your waist anchored to one side. Bound laterally against the band resistance, stick each landing for a half-beat, then bound back. Continuous, keep the rhythm.",
        },
        {
          id: "v3c_fc2_4",
          slot: "fc_block",
          name: "Lateral drop to bound",
          dose: "3/side",
          equipment: "12\" box",
          description: "Reactive",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Stand on the edge of a 12\" box, side-on to your landing spot. Step off sideways, land on the outside leg, and bound laterally off it right away. Feel the landing leg absorb and spring. Common mistake: hopping off the box instead of stepping off.\n\n" +
            LATERAL_DROP_PROGRESSION,
        },

        // ── FC Block 3 — Single-leg (done once) ──
        {
          id: "v3c_fc3_1",
          slot: "fc_block",
          name: "Heavy step-up with knee drive",
          dose: "5/side @ 80%",
          equipment: "Step-up block + heavy DBs",
          description: "Heavy — potentiation",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40-50 lb DBs",
          howTo:
            "Heavy DBs at your sides, box ~knee height. Drive through the lead leg to full extension, punching the trail knee to hip height at the top — pause a beat before stepping down.",
        },
        {
          id: "v3c_fc3_2",
          slot: "fc_block",
          name: "Single-leg box jump → stick",
          dose: "3/side",
          equipment: "Low box",
          description: "Plyo",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Single-leg takeoff onto a low box, stick the landing on the same leg, hold 2 seconds before stepping down. The single best move in the program for teaching your knee/ankle to absorb force safely on one leg.",
        },
        {
          id: "v3c_fc3_3",
          slot: "fc_block",
          name: "Rotational lunge to single-leg hop",
          dose: "4/side",
          equipment: "None",
          description: "Loaded speed",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Step into a reverse lunge while rotating your trunk toward the front leg. Drive back up and immediately hop off that same leg, landing back in a single-leg stick.",
        },
        {
          id: "v3c_fc3_4",
          slot: "fc_block",
          name: "Split step drop → explosive first step 3m",
          dose: "4/direction",
          equipment: "None or long band",
          description: "Reactive footwork",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Ready position, drop into split step, explode forward 3 meters. Stick the landing. The reactive first-move pattern.\n\n**Band variation:** Loop a long band around your waist, anchored behind for accel resistance.",
        },

        // ── FC Block 4 — Split stance (optional, done once) ──
        {
          id: "v3c_fc4_1",
          slot: "fc_block",
          name: "Bulgarian split squat (heavy)",
          dose: "5/side",
          equipment: "Bench + heavy DBs",
          description: "Heavy — potentiation",
          fcBlock: 4,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "40-50 lb DBs",
          howTo:
            "Rear foot on a bench, front foot far enough out that the shin stays near vertical at the bottom. Lower straight down, drive through the front heel. Feel the front quad and glute. Common mistake: front foot too close, which pushes the knee way past the toes.",
        },
        {
          id: "v3c_fc4_2",
          slot: "fc_block",
          name: "Lateral bound → stick (2s)",
          dose: "4/side",
          equipment: "None",
          description: "Plyo",
          fcBlock: 4,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          howTo:
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point — deceleration strength under real load.",
        },
        {
          id: "v3c_fc4_3",
          slot: "fc_block",
          name: "Skater jump (light DBs)",
          dose: "4/side",
          equipment: "Light DBs",
          description: "Loaded, lateral",
          fcBlock: 4,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "10-15 lb DBs",
          howTo:
            "Light DBs at your sides. Push off one leg and leap sideways to land on the other leg, trail leg swinging behind, and hold the landing a beat. Feel the glute and the outer hip drive the push and then absorb. Common mistake: landing with the knee caving in.",
        },
        {
          id: "v3c_fc4_4",
          slot: "fc_block",
          name: "Skater hops (continuous, quick)",
          dose: "10-15",
          equipment: "None",
          description: "Fast",
          fcBlock: 4,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Hop side to side from one foot to the other with a small trail-leg swing, staying low and quick with no stick between reps. Feel the glutes and ankles bounce. Keep contacts short, common mistake is making each hop a slow big leap.",
        },

        // ── FC Block 5 — Decel (optional, done once) ──
        {
          id: "v3c_fc5_1",
          slot: "fc_block",
          name: "Heavy lateral step-down, controlled",
          dose: "5/side",
          equipment: "Box + DB",
          description: "Heavy eccentric",
          fcBlock: 5,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "30-40 lb DB",
          howTo:
            "Stand on a low box, slowly lower one leg down to lightly touch the floor under full control (3-4 sec), then step back up. Eccentric-focused single-leg control at the same intensity/impact level as before.",
        },
        {
          id: "v3c_fc5_2",
          slot: "fc_block",
          name: "180° squat jump → stick",
          dose: "4",
          equipment: "None",
          description: "Plyo",
          fcBlock: 5,
          fcPosition: 2,
          restAfter: 20,
          optional: true,
          howTo:
            "Dip into a quarter squat, jump and turn 180° in the air, land in an athletic squat facing the opposite way and hold for 2 seconds. Feel the hips and core control the spin. Common mistake: landing short of the full turn or stumbling out of the stick.",
        },
        {
          id: "v3c_fc5_3",
          slot: "fc_block",
          name: "Med-ball rotational scoop toss (fast)",
          dose: "4/side",
          equipment: "Med ball",
          description: "Loaded speed",
          fcBlock: 5,
          fcPosition: 3,
          restAfter: 20,
          optional: true,
          suggestedLoad: "10 lb",
          howTo:
            "Underhand scoop the med ball from low-outside to high-across your body, releasing it explosively into open space or a wall.",
        },
        {
          id: "v3c_fc5_4",
          slot: "fc_block",
          name: "Drop catch (step off, land, stick)",
          dose: "4",
          equipment: "18\" box",
          description: "Reactive",
          fcBlock: 5,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "Stand on an 18\" box. Step off, land on both feet in a quarter squat, and freeze. Feel the whole leg absorb the force, hips back, knees tracking over the toes. Common mistake: landing stiff-legged or letting the knees cave.\n\n" +
            DROP_PROGRESSION,
        },

        // ── Complexes ──
        {
          id: "v3c_ath1",
          slot: "athletic",
          name: "Crossover step-up to rotational reach",
          dose: "3×6/side",
          equipment: "Box + light DB or med ball",
          howTo:
            "Crossover step up onto a box (trail leg crosses in front), and as you stand tall on top, reach/rotate the trunk toward the stepping-leg side. Step down under control.",
        },
        {
          id: "v3c_ath2",
          slot: "athletic",
          name: "Sandbag shouldered lateral lunge to drive",
          dose: "3×5/side",
          equipment: "Sandbag",
          description: "Loaded core — anti-lateral flexion",
          suggestedLoad: "40 lb",
          howTo:
            "Sandbag on one shoulder. Step wide into a lateral lunge to the side opposite the bag, then drive hard off that leg back to center and up into a knee drive. Feel the obliques fight the side-bend from the offset load. Common mistake: leaning toward the bag instead of staying tall.",
        },

        // ── Lifts ──
        {
          id: "v3c_lift1",
          slot: "strength",
          name: "Barbell reverse lunge",
          dose: "3×6/side",
          equipment: "Barbell + rack",
          group: "Barbell reverse lunge",
          suggestedLoad: "115 lb",
          howTo:
            "Bar on the upper back. Step back into a long lunge, back knee just above the floor, then drive through the front heel to return. Feel the front glute and quad. Common mistake: front knee caving in or taking a short step that loads the knee.",
        },
        {
          id: "v3c_lift2",
          slot: "strength",
          name: "Goblet Cossack squat",
          dose: "3×6/side",
          equipment: "KB or DB",
          group: "Goblet Cossack squat",
          suggestedLoad: "35-45 lb",
          howTo:
            "Hold the weight at the chest. Wide stance, shift fully onto one leg and sit deep while the other leg stays straight with the heel down or toes up. Drive back to center. Feel the adductors stretch and load. Common mistake: heel lifting on the squatting side.",
        },
        {
          id: "v3c_lift3",
          slot: "strength",
          name: "Single-leg DB RDL",
          dose: "3×8/side",
          equipment: "DB",
          group: "Single-leg DB RDL",
          suggestedLoad: "40-50 lb DB",
          howTo:
            "DB in the hand opposite the standing leg. Hinge at the hip, back leg extends behind you as the DB travels down the standing leg. Feel the hamstring and glute of the standing leg. Common mistake: opening the hips toward the ceiling or rounding the back.",
        },

        // ── Small movements ──
        {
          id: "v3c_acc1",
          slot: "accessory",
          name: "Split squat iso hold, lengthened",
          dose: "30s/side",
          equipment: "None or light DB",
          description: "Isometric — lengthened position",
          howTo:
            "Front-foot-elevated or standard split squat stance, lower into the bottom position (deep stretch on the rear hip flexor/quad) and HOLD. Let the muscle lengthen under tension — this tendon adaptation protects the hip/knee more than a heavy PR ever will.",
        },
        {
          id: "v3c_acc2",
          slot: "accessory",
          name: "Copenhagen plank (long lever)",
          dose: "20-30s/side",
          equipment: "Flat bench",
          description: "Isometric — adductors",
          howTo:
            "Top foot on the bench with the knee straight, hold the bench with the top-side foot rather than the knee, bottom leg hangs, forearm planked on the floor. Hold the hips level. Feel the adductors burn. Common mistake: hips sagging or piking up.",
        },

        // ── Cooldown ──
        {
          id: "v3c_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
          howTo:
            "Easy walk, breathe in and out through the nose only. Let the heart rate come down and the shoulders drop. If you have to mouth-breathe, slow the walk until you can stop.",
        },
      ],
    },
  },
};
