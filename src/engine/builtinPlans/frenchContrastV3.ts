import type { StaticPlan } from "../plans";

// ═══════════════════════════════════════════════════════════════
// FRENCH CONTRAST V3 - 3-day split
// Each day = warm-up (incl. posterior-chain activation), core (about 10 min,
// at most ONE mat move), 5 French contrast blocks of 4 (done ONCE each, no
// repeat rounds, max ONE drop-family move per day), blocks 4-5 optional
// (Skip to finisher), ONE short standing finisher (exactly 4 items, favorite complex first), cooldown.
// Nothing on the mat after core. About 55 min.
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
            "**Setup:** Open floor space to step forward into a lunge.\n\n**Move:**\n1. Step into a deep lunge. Put both hands on the floor inside the front foot.\n2. Drop the inside elbow toward the front instep and hold 2 seconds.\n3. Rotate the chest open toward the front knee and reach that arm to the ceiling.\n4. Stand up and balance on one leg for hip airplanes: hinge forward, then open the hip out to the side and close it, slowly.\n5. Repeat on the other side.\n\n**Feel:** Hips and mid-back unlock. Don't rush it or let the stance knee collapse inward.",
        },

        {
          id: "v3a_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Adductor prep, daily",
          howTo:
            "**Setup:** Stand with both feet on sliders. Hands on your hips, or touch a wall for balance.\n\n**Move:**\n1. Shift your weight onto the right leg and bend that knee.\n2. Slide the left foot straight out to the side. The sliding leg stays straight.\n3. Pull the sliding foot back to center with your inner thigh.\n4. Switch sides every rep. Go slow, about 2 seconds out.\n\n**Feel:** Inner thighs open up and work. No pinch in the stance hip.",
        },

        {
          id: "v3a_w4",
          slot: "prep",
          name: "Banded good morning + B-stance hinge",
          dose: "2x8",
          equipment: "Long band",
          description: "Posterior-chain activation",
          howTo:
            "**Setup:** Stand on a long band and loop it over your upper back. Feet hip-width.\n\n**Move:**\n1. Band good morning: soft knees, push the hips straight back until the torso is near parallel, then drive the hips forward to stand. Do 8.\n2. B-stance: slide one foot back so only the toes touch the floor, with most of your weight on the front leg.\n3. Hinge the same way over the front leg. Do 4 per side.\n4. That is 1 set. Do 2 sets.\n\n**Feel:** Glutes and hamstrings wake up, not the low back. Keep the back flat.",
        },

        // ── Core (about 10 min, one mat move) ──
        {
          id: "v3a_ca4",
          slot: "core_activation",
          name: "Copenhagen plank (short lever)",
          dose: "20s/side",
          equipment: "Flat bench",
          description: "Adductors",
          howTo:
            "**Setup:** Flat bench. Lie on your side with the top knee and inner shin on the bench. The bottom leg hangs under it. Forearm on the floor under your shoulder.\n\n**Move:**\n1. Lift your hips until the body is one straight line.\n2. Press the top leg into the bench. The bottom leg stays off the floor.\n3. Hold for 20 seconds, then switch sides.\n\n**Feel:** The inner thigh of the top leg burns. Common mistake: hips sagging or piking up.",
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
            "Kneel on inside knee facing perpendicular to band/cable. Press out from chest. Hold 2 seconds at full extension - resist the pull. Don't let your trunk rotate.",
        },

        {
          id: "v3a_ca5",
          slot: "core_activation",
          name: "Half-kneeling KB windmill",
          dose: "5/side",
          equipment: "KB",
          description: "Lateral core + hip control",
          suggestedLoad: "18-26 lb KB",
          howTo:
            "**Setup:** Half-kneel with the right knee down and the left foot planted out to the side. Light KB pressed overhead in the LEFT hand. Eyes on the bell.\n\n**Move:**\n1. Lock the arm out overhead.\n2. Shift the hips toward the bell side and hinge sideways toward the down knee.\n3. Slide the free right hand to the floor beside the right knee.\n4. Reverse the move and come back up tall.\n5. Finish all reps, then switch the knee and hand.\n\n**Feel:** Obliques and the side of the hip under the bell work. Keep the bell arm vertical the whole time.",
        },

        {
          id: "v3a_ca6",
          slot: "core_activation",
          name: "Renegade row",
          dose: "5/side",
          equipment: "Hex DBs",
          description: "Anti-rotation",
          suggestedLoad: "25-30 lb DBs",
          howTo:
            "**Setup:** Hands on two hex DBs, shoulder-width. Feet wide, body in a straight line.\n\n**Move:**\n1. Brace the core and squeeze the glutes.\n2. Row one DB to your ribs without letting the hips twist.\n3. Lower it under control and switch sides.\n\n**Feel:** Core braces against the twist. Wide feet make it easier to stay square.",
        },

        {
          id: "v3a_ca7",
          slot: "core_activation",
          name: "Suitcase carry",
          dose: "30m/side",
          equipment: "KB or DB",
          description: "Anti-lateral flexion",
          suggestedLoad: "50 lb KB",
          howTo:
            "**Setup:** Hold a heavy KB or DB in one hand at your side.\n\n**Move:**\n1. Stand tall, ribs down, shoulders level.\n2. Walk 30 meters at a steady pace.\n3. Switch hands and walk back.\n\n**Feel:** The obliques on the opposite side fire. Don't lean toward the weight.",
        },

        // ── FC Block 1 - Hinge power (done once) ──
        {
          id: "v3a_fc1_1",
          slot: "fc_block",
          name: "Barbell Romanian deadlift",
          dose: "5 @ 80%",
          equipment: "Barbell",
          description: "Heavy - potentiation",
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
            "**Setup:** Kneel on both knees. Sit back slightly onto your heels. Arms back.\n\n**Move:**\n1. Swing the arms forward and up hard.\n2. Drive the hips forward and jump so both feet land flat on the floor.\n3. Land in an athletic stance with soft knees.\n4. Reset and go again.\n\n**Feel:** Pure hip power from a dead stop, with no help from the ankles.",
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
          suggestedLoad: "50 lb KB",
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

        // ── FC Block 2 - Linear speed (done once) ──
        {
          id: "v3a_fc2_1",
          slot: "fc_block",
          name: "Machine hip thrust (3s iso hold at top)",
          dose: "5 @ 80%",
          equipment: "Hip thrust machine",
          description: "Heavy - potentiation",
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
            "**Setup:** Ready stance, feet shoulder-width, on the balls of the feet. Mark a spot 3 meters ahead.\n\n**Move:**\n1. Split step: a small hop, landing on the balls of the feet.\n2. Explode forward 3 meters with 2-3 steps of maximum acceleration.\n3. Stick: stop in athletic stance and hold 2 seconds.\n\n**Feel:** The first step is the exercise. Stay low and push hard.\n\n**Band variation:** Loop a long band around your waist. Anchor it behind you for acceleration resistance, or in front for overspeed.",
        },

        // ── FC Block 3 - Lateral (done once) ──
        {
          id: "v3a_fc3_1",
          slot: "fc_block",
          name: "Heavy DB lateral lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy - adductors",
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
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point - deceleration strength under real load.",
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
            "**Setup:** Wrap a long band around your waist, anchored low to one side. Step out until the band is tight.\n\n**Move:**\n1. Bound sideways away from the anchor, against the band.\n2. Stick the landing on one leg for half a beat.\n3. Bound back toward the anchor and control the band.\n4. Keep going without stopping.\n\n**Feel:** Glutes and outer hips fire. Keep the rhythm steady.",
        },

        {
          id: "v3a_fc3_4",
          slot: "fc_block",
          name: "Lateral line hops (quick)",
          dose: "3x10s",
          equipment: "Floor line or tape",
          description: "Reactive",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "**Setup:** Stand beside a line on the floor (tape is fine), feet together.\n\n**Move:**\n1. Hop sideways over the line with both feet.\n2. Hop straight back over it. Keep going side to side.\n3. Stay low, on the balls of the feet, with short quiet contacts.\n4. Go for 10 seconds, rest, repeat for 3 rounds.\n\n**Feel:** Ankles and outer hips stay springy. Common mistake: big slow hops. Keep them small and fast.",
        },

        // ── FC Block 4 - Pull (optional, done once) ──
        {
          id: "v3a_fc4_1",
          slot: "fc_block",
          name: "Barbell bent-over row",
          dose: "5 @ 80%",
          equipment: "Barbell",
          description: "Heavy - potentiation",
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
            "Explosive concentric, controlled eccentric. Cable keeps tension consistent through the whole range instead of dropping off at lockout - closer to the resistance curve of a racquet pull-through.",
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

        // ── FC Block 5 - Single-leg hinge (optional, done once) ──
        {
          id: "v3a_fc5_1",
          slot: "fc_block",
          name: "Landmine SL RDL + hip twist",
          dose: "5/side",
          equipment: "Landmine",
          description: "Heavy - potentiation",
          fcBlock: 5,
          fcPosition: 1,
          restAfter: 20,
          optional: true,
          suggestedLoad: "70 lb",
          howTo:
            "**Setup:** Landmine set up. Hold the end of the bar in one hand and stand on the opposite leg.\n\n**Move:**\n1. Soften the standing knee. Hinge at the hip and lower the bar toward the floor as the free leg reaches behind you.\n2. At the bottom, rotate your trunk toward the standing leg.\n3. Rotate back to square.\n4. Drive the hips forward and stand tall.\n\n**Feel:** The glute and hamstring of the standing leg load up. It mimics the loading position on open-stance shots.",
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

        // ── Finisher (standing, off the floor) ──
        {
          id: "v3a_ath1b",
          slot: "athletic",
          name: "Cable row to knee drive",
          dose: "3x6/side",
          equipment: "Cable",
          description: "Pull + drive",
          suggestedLoad: "30 lb",
          howTo:
            "**Setup:** Anchor the cable at chest height. Hold the handle in the hand opposite your standing leg, with a slight stagger.\n\n**Move:**\n1. Row the handle to your ribs while exploding the opposite knee up.\n2. Finish tall on one leg, knee at hip height, handle at your side.\n3. Hold the balance for 1 second, then return under control.\n\n**Feel:** The pull and the knee drive link into one motion. One of your staples.\n\n**Avoid:** letting the torso lean back as you drive the knee.",
        },

        {
          id: "v3a_ath1",
          slot: "athletic",
          name: "Offset deadlift (heavy KB/DB in one hand, from the floor)",
          dose: "3x6/side",
          equipment: "Heavy KB or DB",
          description: "Hinge + anti-lean",
          suggestedLoad: "50 lb KB or 70 lb DB",
          howTo:
            "**Setup:** Place a heavy KB or DB on the floor beside one foot. Feet hip-width.\n\n**Move:**\n1. Hinge back and grab it with one hand. Back flat.\n2. Brace and push the floor away to stand tall. Don't lean toward the weight.\n3. Lower it under control and touch it to the floor.\n4. Finish all reps, then switch hands.\n\n**Feel:** Glutes and hamstrings drive. The obliques stop you from leaning.",
        },

        {
          id: "v3a_ath2",
          slot: "athletic",
          name: "Side RDL",
          dose: "3x6/side",
          equipment: "None or light DB",
          description: "Lateral single-leg hinge",
          suggestedLoad: "20 lb DB",
          howTo:
            "**Setup:** Stand on your left leg with a soft knee. Light DB in the left hand if you want load.\n\n**Move:**\n1. Lift the right leg out to the right side.\n2. Hinge at the left hip and bend to the left, over the standing leg. The right leg stays out to the side.\n3. Stand back up.\n4. Finish all reps, then do the other side.\n\n**Feel:** The glute and inner thigh of the standing leg load up. It is a single-leg RDL to the side instead of behind you.",
        },

        {
          id: "v3a_ath4",
          slot: "athletic",
          name: "Standing cable hip adduction",
          dose: "2x12/side",
          equipment: "Cable + ankle cuff",
          description: "Adductors",
          suggestedLoad: "20 lb",
          howTo:
            "**Setup:** Set the cable low with an ankle cuff on the ankle nearest the stack. Stand side-on and hold the frame for balance.\n\n**Move:**\n1. Stand tall on the outside leg.\n2. Sweep the cuffed leg across in front of the standing leg, as far as is comfortable.\n3. Return slowly out to the side.\n\n**Feel:** The inner thigh squeezes. Keep the hips square and the trunk still.",
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
          description: "Self-myofascial release - posterior cuff + lat attachment",
          howTo:
            "**Setup:** Stand facing a wall with the lacrosse ball between the wall and your body.\n\n**Move:**\n1. Lean in and pin the ball into the meat of the rear shoulder (the back of the cuff). Do small slow rolls.\n2. Move the ball to the edge of the lat, just below the armpit. Roll slowly.\n3. Pause on any tender spot for 10-15 seconds and breathe.\n\n**Feel:** Tissue tension releasing. This is not a stretch. Stay standing, nothing on the floor.",
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
            "**Setup:** Stand with both feet on sliders. Hands on your hips, or touch a wall for balance.\n\n**Move:**\n1. Shift your weight onto the right leg and bend that knee.\n2. Slide the left foot straight out to the side. The sliding leg stays straight.\n3. Pull the sliding foot back to center with your inner thigh.\n4. Switch sides every rep. Go slow, about 2 seconds out.\n\n**Feel:** Inner thighs open up and work. No pinch in the stance hip.",
        },

        {
          id: "v3b_w4",
          slot: "prep",
          name: "Cable pull-through",
          dose: "2x10",
          equipment: "Cable + rope",
          description: "Posterior-chain activation",
          suggestedLoad: "30 lb",
          howTo:
            "**Setup:** Set the cable low with a rope. Face away from the stack, rope between your legs, walk forward until the cable is tight.\n\n**Move:**\n1. Hinge back with soft knees and long arms, rope passing between the legs.\n2. Push the hips back until the hamstrings stretch.\n3. Drive the hips forward and squeeze the glutes at the top.\n\n**Feel:** Glutes and hamstrings work, not the low back.",
        },

        {
          id: "v3b_w5",
          slot: "prep",
          name: "Single-leg balance + calf raise",
          dose: "1 min/side",
          equipment: "None (Bosu optional)",
          description: "Ankle stability",
          howTo:
            "**Setup:** Stand on one leg near a wall or rack for safety.\n\n**Move:**\n1. Do 10 slow single-leg calf raises.\n2. Then hold a single-leg balance for 20 seconds.\n3. Switch legs.\n\n**Feel:** The ankle works to stay steady. Progress to eyes closed or standing on the Bosu.",
        },

        // ── Core (about 10 min, one mat move) ──
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
          id: "v3b_ca4",
          slot: "core_activation",
          name: "Half-kneeling KB windmill",
          dose: "5/side",
          equipment: "KB",
          description: "Lateral core + hip control",
          suggestedLoad: "18-26 lb KB",
          howTo:
            "**Setup:** Half-kneel with the right knee down and the left foot planted out to the side. Light KB pressed overhead in the LEFT hand. Eyes on the bell.\n\n**Move:**\n1. Lock the arm out overhead.\n2. Shift the hips toward the bell side and hinge sideways toward the down knee.\n3. Slide the free right hand to the floor beside the right knee.\n4. Reverse the move and come back up tall.\n5. Finish all reps, then switch the knee and hand.\n\n**Feel:** Obliques and the side of the hip under the bell work. Keep the bell arm vertical the whole time.",
        },

        {
          id: "v3b_ca5",
          slot: "core_activation",
          name: "Renegade row",
          dose: "5/side",
          equipment: "Hex DBs",
          description: "Anti-rotation",
          suggestedLoad: "25-30 lb DBs",
          howTo:
            "**Setup:** Hands on two hex DBs, shoulder-width. Feet wide, body in a straight line.\n\n**Move:**\n1. Brace the core and squeeze the glutes.\n2. Row one DB to your ribs without letting the hips twist.\n3. Lower it under control and switch sides.\n\n**Feel:** Core braces against the twist. Wide feet make it easier to stay square.",
        },

        {
          id: "v3b_ca6",
          slot: "core_activation",
          name: "Suitcase carry",
          dose: "30m/side",
          equipment: "KB or DB",
          description: "Anti-lateral flexion",
          suggestedLoad: "50 lb KB",
          howTo:
            "**Setup:** Hold a heavy KB or DB in one hand at your side.\n\n**Move:**\n1. Stand tall, ribs down, shoulders level.\n2. Walk 30 meters at a steady pace.\n3. Switch hands and walk back.\n\n**Feel:** The obliques on the opposite side fire. Don't lean toward the weight.",
        },

        // ── FC Block 1 - Press (done once) ──
        {
          id: "v3b_fc1_1",
          slot: "fc_block",
          name: "Barbell bench press (3s pause on chest)",
          dose: "5 @ 80%",
          equipment: "Barbell + bench",
          description: "Heavy - potentiation",
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

        // ── FC Block 2 - Rotation (done once) ──
        {
          id: "v3b_fc2_1",
          slot: "fc_block",
          name: "Heavy single-arm landmine rotation, offset stance",
          dose: "4/side @ 80%",
          equipment: "Landmine",
          description: "Heavy - potentiation",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "70 lb",
          howTo:
            "**Setup:** Landmine set up. Hold the sleeve in one hand at chest height. Stagger your stance.\n\n**Move:**\n1. Brace your core and keep the hips steady.\n2. Rotate the trunk and swing the bar across your body.\n3. Rotate back under control.\n\n**Feel:** Obliques and hips drive the swing. Don't let the offset load pull you around.",
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
          suggestedLoad: "Heavy - leave 1-2 reps in the tank",
          howTo:
            "Set the cable high, handle in both hands. Rotate hips and trunk to pull the handle down and across your body to the opposite hip, like chopping wood. Power comes from the hip turn, not the arms - let your back foot pivot.",
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
            "**Setup:** Cable at chest height. Stand side-on to the stack in an open stance, handle in your hand at the chest.\n\n**Move:**\n1. Start with the hips turned slightly toward the stack.\n2. Rotate through the hips and trunk and punch the handle across your body, fast.\n3. Fully extend the arm and let the back heel pivot.\n4. Bring it back under control and reset every rep.\n\n**Feel:** The hips throw the punch, not the arm. The cable gives steadier tension than a band.",
        },

        // ── FC Block 3 - Lateral (done once) ──
        {
          id: "v3b_fc3_1",
          slot: "fc_block",
          name: "Heavy DB lateral step-up",
          dose: "5/side",
          equipment: "Step-up block + heavy DBs",
          description: "Heavy - lateral",
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
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point - deceleration strength under real load.",
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
            "**Setup:** Hold the med ball low in front of your thighs. Face a wall or open space.\n\n**Move:**\n1. Step wide to one side into a lateral lunge and sit the hips back.\n2. Drive hard off that leg to come back up.\n3. Scoop the ball up and across your body as you rotate.\n4. Throw it into the wall or open space. Pick it up and reset.\n\n**Feel:** Leg drive turns into hip rotation. Common mistake: throwing with the arms and skipping the legs.",
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
            "**Setup:** Ready stance, feet shoulder-width, on the balls of the feet. Mark a spot 3 meters away in each direction.\n\n**Move:**\n1. Split step: a small hop, landing on the balls of the feet.\n2. React: go in the direction you chose or were called.\n3. Explode 3 meters with 2-3 steps of maximum acceleration.\n4. Stop and reset.\n\n**Feel:** The first step is the exercise. Keep the chest over the knees.",
        },

        // ── FC Block 4 - Pull (optional, done once) ──
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
            "Band anchored at face height. Pull to your face, then at the end of the pull, rotate your hands/forearms up and back into external rotation - fast tempo. Directly trains the rotator cuff pattern that keeps it healthy under all the pressing/rotating this day does.",
        },

        // ── FC Block 5 - Single-leg (optional, done once) ──
        {
          id: "v3b_fc5_1",
          slot: "fc_block",
          name: "Heavy DB reverse lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy - potentiation",
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

        // ── Finisher (standing, off the floor) ──
        {
          id: "v3b_ath1b",
          slot: "athletic",
          name: "Half-kneeling to standing rotational row + knee drive",
          dose: "3x6/side",
          equipment: "Cable or band",
          howTo:
            "**Setup:** Start half-kneeling with the cable or band anchored low to the side.\n\n**Move:**\n1. Pull the handle into a rotational row as you stand up out of the half-kneel.\n2. Finish by driving the back knee up to hip height on one leg.\n\n**Feel:** The pull, the stand, and the knee drive link into one motion.\n\n**Avoid:** standing first and pulling with the arms alone.",
        },

        {
          id: "v3b_ath1",
          slot: "athletic",
          name: "Hanging shoulder airplane",
          dose: "3x3/side",
          equipment: "Pull-up bar",
          description: "Shoulder mobility + strength",
          howTo:
            "**Setup:** Hang from a bar with one hand. Pack the shoulder by pulling it down away from the ear. Free hand off the bar.\n\n**Move:**\n1. Keep the supporting arm fixed and straight.\n2. Slowly rotate the body underneath it, opening the chest away from the bar.\n3. Pause, then rotate back the other way.\n4. Finish all reps, then switch arms.\n\n**Feel:** Shoulder stability and lat strength. Advanced move.\n\n**Regress:** keep the other hand lightly on the bar, or touch your feet to a box.",
        },

        {
          id: "v3b_ath2",
          slot: "athletic",
          name: "45° back extension",
          dose: "3x10",
          equipment: "45° back extension bench",
          description: "Posterior chain",
          howTo:
            "**Setup:** Set the pads at your hip crease and lock your ankles in. Cross your arms on your chest.\n\n**Move:**\n1. Hinge forward to a gentle hamstring stretch with a flat back.\n2. Squeeze the glutes and rise until the body is in a straight line.\n3. Don't lean back past straight.\n\n**Feel:** Glutes and hamstrings work, not the low back.",
        },

        {
          id: "v3b_ath3",
          slot: "athletic",
          name: "Standing cable hip abduction + adduction",
          dose: "2x12/side each",
          equipment: "Cable + ankle cuff",
          description: "Hip abductors + adductors",
          suggestedLoad: "20 lb",
          howTo:
            "**Setup:** Set the cable low with an ankle cuff on one ankle. Stand side-on and hold the frame for balance.\n\n**Move:**\n1. Abduction: with the cuffed ankle farthest from the stack, stand tall and sweep the leg out to the side, toes forward. Return slowly. Do all reps.\n2. Turn around so the cuffed ankle is nearest the stack. Same leg.\n3. Adduction: sweep the cuffed leg across in front of the standing leg, then return slowly out to the side. Do all reps.\n4. Switch legs and repeat both.\n\n**Feel:** The outer hip burns on the way out, the inner thigh squeezes on the way across. Keep the trunk upright and still.",
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
          description: "Self-myofascial release - posterior cuff + lat attachment",
          howTo:
            "**Setup:** Stand facing a wall with the lacrosse ball between the wall and your body.\n\n**Move:**\n1. Lean in and pin the ball into the meat of the rear shoulder (the back of the cuff). Do small slow rolls.\n2. Move the ball to the edge of the lat, just below the armpit. Roll slowly.\n3. Pause on any tender spot for 10-15 seconds and breathe.\n\n**Feel:** Tissue tension releasing. This is not a stretch. Stay standing, nothing on the floor.",
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
            "**Setup:** Stand with both feet on sliders. Hands on your hips, or touch a wall for balance.\n\n**Move:**\n1. Shift your weight onto the right leg and bend that knee.\n2. Slide the left foot straight out to the side. The sliding leg stays straight.\n3. Pull the sliding foot back to center with your inner thigh.\n4. Switch sides every rep. Go slow, about 2 seconds out.\n\n**Feel:** Inner thighs open up and work. No pinch in the stance hip.",
        },

        {
          id: "v3c_w4",
          slot: "prep",
          name: "Banded good morning + B-stance hinge",
          dose: "2x8",
          equipment: "Long band",
          description: "Posterior-chain activation",
          howTo:
            "**Setup:** Stand on a long band and loop it over your upper back. Feet hip-width.\n\n**Move:**\n1. Band good morning: soft knees, push the hips straight back until the torso is near parallel, then drive the hips forward to stand. Do 8.\n2. B-stance: slide one foot back so only the toes touch the floor, with most of your weight on the front leg.\n3. Hinge the same way over the front leg. Do 4 per side.\n4. That is 1 set. Do 2 sets.\n\n**Feel:** Glutes and hamstrings wake up, not the low back. Keep the back flat.",
        },

        // ── Core (about 10 min, one mat move) ──
        {
          id: "v3c_ca4",
          slot: "core_activation",
          name: "Copenhagen plank (long lever)",
          dose: "20-30s/side",
          equipment: "Flat bench",
          description: "Adductors",
          howTo:
            "**Setup:** Flat bench. Lie on your side with the top leg straight and the top foot on the bench. The bottom leg hangs under it. Forearm on the floor under your shoulder.\n\n**Move:**\n1. Lift your hips until the body is one straight line.\n2. Squeeze the top leg into the bench. The bottom leg stays off the floor.\n3. Hold for 20-30 seconds, then switch sides.\n\n**Feel:** The inner thigh of the top leg burns. Common mistake: hips sagging or piking up.",
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
            "Tall stance, band/cable anchored to the side. Press out from chest and hold - resist the pull, don't let your trunk rotate.",
        },

        {
          id: "v3c_ca5",
          slot: "core_activation",
          name: "Half-kneeling KB windmill",
          dose: "5/side",
          equipment: "KB",
          description: "Lateral core + hip control",
          suggestedLoad: "18-26 lb KB",
          howTo:
            "**Setup:** Half-kneel with the right knee down and the left foot planted out to the side. Light KB pressed overhead in the LEFT hand. Eyes on the bell.\n\n**Move:**\n1. Lock the arm out overhead.\n2. Shift the hips toward the bell side and hinge sideways toward the down knee.\n3. Slide the free right hand to the floor beside the right knee.\n4. Reverse the move and come back up tall.\n5. Finish all reps, then switch the knee and hand.\n\n**Feel:** Obliques and the side of the hip under the bell work. Keep the bell arm vertical the whole time.",
        },

        {
          id: "v3c_ca6",
          slot: "core_activation",
          name: "Renegade row",
          dose: "5/side",
          equipment: "Hex DBs",
          description: "Anti-rotation",
          suggestedLoad: "25-30 lb DBs",
          howTo:
            "**Setup:** Hands on two hex DBs, shoulder-width. Feet wide, body in a straight line.\n\n**Move:**\n1. Brace the core and squeeze the glutes.\n2. Row one DB to your ribs without letting the hips twist.\n3. Lower it under control and switch sides.\n\n**Feel:** Core braces against the twist. Wide feet make it easier to stay square.",
        },

        {
          id: "v3c_ca7",
          slot: "core_activation",
          name: "Suitcase carry",
          dose: "30m/side",
          equipment: "KB or DB",
          description: "Anti-lateral flexion",
          suggestedLoad: "50 lb KB",
          howTo:
            "**Setup:** Hold a heavy KB or DB in one hand at your side.\n\n**Move:**\n1. Stand tall, ribs down, shoulders level.\n2. Walk 30 meters at a steady pace.\n3. Switch hands and walk back.\n\n**Feel:** The obliques on the opposite side fire. Don't lean toward the weight.",
        },

        // ── FC Block 1 - Squat power (done once) ──
        {
          id: "v3c_fc1_1",
          slot: "fc_block",
          name: "Barbell back squat",
          dose: "5 @ 80%",
          equipment: "Barbell + rack",
          description: "Heavy - potentiation",
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
            "**Setup:** Open floor, feet shoulder-width.\n\n**Move:**\n1. Swing the arms back, load the hips, and broad jump forward.\n2. Land on both feet and stick for half a second.\n3. Right away, jump straight up and reach overhead. No reset step.\n4. Land soft and walk back.\n\n**Feel:** Glutes and hamstrings fire twice. It trains the move from a wide recovery step into an overhead ball.",
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
          name: "Hurdle hops (continuous, low hurdles)",
          dose: "5",
          equipment: "5 low hurdles",
          description: "Reactive",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "**Setup:** Line up 5 low hurdles (6-12 inches), about 2 feet apart. Stand facing the first one.\n\n**Move:**\n1. Jump over the first hurdle with both feet.\n2. Land and spring straight into the next hurdle. Don't pause.\n3. Keep the knees fairly straight and the ground contact short.\n4. After the last hurdle, walk back and rest.\n\n**Feel:** Quick, springy contacts, like a hot stove. Common mistake: sinking into each landing.",
        },

        // ── FC Block 2 - Lateral (done once) ──
        {
          id: "v3c_fc2_1",
          slot: "fc_block",
          name: "Heavy DB lateral lunge",
          dose: "5/side",
          equipment: "Heavy DBs",
          description: "Heavy - adductors",
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
            "**Setup:** Wide stance, toes turned slightly out. Hold a light DB at the chest if you are using one.\n\n**Move:**\n1. Shift all your weight onto the right leg and sit into a deep lateral squat. The left leg stays straight with the heel down.\n2. Drive through the right foot back to center.\n3. Explode into a small vertical jump.\n4. Land soft in the wide stance and go to the other side.\n\n**Feel:** Inner thigh stretches and the glute drives. Keep the squatting heel down.",
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
            "**Setup:** Wrap a long band around your waist, anchored low to one side. Step out until the band is tight.\n\n**Move:**\n1. Bound sideways away from the anchor, against the band.\n2. Stick the landing on one leg for half a beat.\n3. Bound back toward the anchor and control the band.\n4. Keep going without stopping.\n\n**Feel:** Glutes and outer hips fire. Keep the rhythm steady.",
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

        // ── FC Block 3 (done once) ──
        {
          id: "v3c_fc3_1",
          slot: "fc_block",
          name: "Heavy step-up with knee drive",
          dose: "5/side @ 80%",
          equipment: "Step-up block + heavy DBs",
          description: "Heavy - potentiation",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40-50 lb DBs",
          howTo:
            "Heavy DBs at your sides, box ~knee height. Drive through the lead leg to full extension, punching the trail knee to hip height at the top - pause a beat before stepping down.",
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
            "**Setup:** Stand tall with your hands in front of your chest.\n\n**Move:**\n1. Step back into a reverse lunge and rotate the trunk toward the front leg.\n2. Drive up through the front leg.\n3. Hop off that same leg.\n4. Land on it and stick for 1 second.\n\n**Feel:** The glute and ankle of the landing leg stabilize. Don't let the knee cave in.",
        },

        {
          id: "v3c_fc3_4",
          slot: "fc_block",
          name: "Split step → react → explosive first step 3m",
          dose: "4/direction",
          equipment: "None or long band",
          description: "Reactive footwork",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "**Setup:** Ready stance, feet shoulder-width, on the balls of the feet. Mark a spot 3 meters ahead.\n\n**Move:**\n1. Split step: a small hop, landing on the balls of the feet.\n2. React to the direction you chose or were called.\n3. Explode 3 meters with 2-3 steps of maximum acceleration.\n4. Stop in athletic stance and reset.\n\n**Feel:** The first step is the exercise. Keep the chest over the knees.\n\n**Band variation:** Loop a long band around your waist, anchored behind you for acceleration resistance.",
        },

        // ── FC Block 4 (optional, done once) ──
        {
          id: "v3c_fc4_1",
          slot: "fc_block",
          name: "Bulgarian split squat (heavy)",
          dose: "5/side",
          equipment: "Bench + heavy DBs",
          description: "Heavy - potentiation",
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
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point - deceleration strength under real load.",
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

        // ── FC Block 5 (optional, done once) ──
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
            "**Setup:** Feet shoulder-width, athletic stance.\n\n**Move:**\n1. Dip into a quarter squat and swing the arms.\n2. Jump and turn 180° in the air.\n3. Land in an athletic squat facing the opposite way.\n4. Hold 2 seconds. Turn the other way on the next rep.\n\n**Feel:** Hips and core control the spin. Common mistake: landing short of the full turn or stumbling out of the stick.",
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
          name: "Tuck jumps (quick off the floor)",
          dose: "4",
          equipment: "None",
          description: "Fast, reactive",
          fcBlock: 5,
          fcPosition: 4,
          restAfter: 150,
          optional: true,
          howTo:
            "**Setup:** Feet shoulder-width, athletic stance, on a flat floor.\n\n**Move:**\n1. Dip into a quick quarter squat and swing the arms.\n2. Jump straight up and pull both knees toward the chest.\n3. Land soft with both feet and spring right into the next rep.\n4. Do 4 reps, then rest.\n\n**Feel:** Hips and ankles fire fast. Common mistake: bending forward at the waist instead of lifting the knees.",
        },

        // ── Finisher (standing, off the floor) ──
        {
          id: "v3c_ath1b",
          slot: "athletic",
          name: "Sandbag shouldered lateral lunge to drive",
          dose: "3x5/side",
          equipment: "Sandbag",
          description: "Loaded core, anti-lateral flexion",
          suggestedLoad: "40 lb",
          howTo:
            "**Setup:** Put the sandbag on one shoulder. Stand tall, feet hip-width.\n\n**Move:**\n1. Step wide into a lateral lunge to the side opposite the bag.\n2. Drive hard off that leg back to center and up into a knee drive.\n3. Finish all reps, then switch shoulders.\n\n**Feel:** The obliques fight the side-bend from the offset load.\n\n**Avoid:** leaning toward the bag instead of staying tall.",
        },

        {
          id: "v3c_ath1",
          slot: "athletic",
          name: "Side RDL",
          dose: "3x6/side",
          equipment: "None or light DB",
          description: "Lateral single-leg hinge",
          suggestedLoad: "20 lb DB",
          howTo:
            "**Setup:** Stand on your left leg with a soft knee. Light DB in the left hand if you want load.\n\n**Move:**\n1. Lift the right leg out to the right side.\n2. Hinge at the left hip and bend to the left, over the standing leg. The right leg stays out to the side.\n3. Stand back up.\n4. Finish all reps, then do the other side.\n\n**Feel:** The glute and inner thigh of the standing leg load up. It is a single-leg RDL to the side instead of behind you.",
        },

        {
          id: "v3c_ath5",
          slot: "athletic",
          name: "Split squat iso hold, lengthened",
          dose: "30s/side",
          equipment: "None or light DB",
          description: "Isometric, lengthened position",
          howTo:
            "**Setup:** Take a split squat stance, front foot flat or elevated on a plate. Light DB optional.\n\n**Move:**\n1. Lower into the bottom position, with a deep stretch on the rear hip flexor and quad.\n2. Hold it for 30 seconds, breathing steadily.\n3. Rise, then switch legs.\n\n**Feel:** The muscle lengthens under tension. This tendon work protects the knee and hip.",
        },

        {
          id: "v3c_ath3",
          slot: "athletic",
          name: "Standing cable hip adduction",
          dose: "2x12/side",
          equipment: "Cable + ankle cuff",
          description: "Adductors",
          suggestedLoad: "20 lb",
          howTo:
            "**Setup:** Set the cable low with an ankle cuff on the ankle nearest the stack. Stand side-on and hold the frame for balance.\n\n**Move:**\n1. Stand tall on the outside leg.\n2. Sweep the cuffed leg across in front of the standing leg, as far as is comfortable.\n3. Return slowly out to the side.\n\n**Feel:** The inner thigh squeezes. Keep the hips square and the trunk still.",
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
