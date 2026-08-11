import type { StaticPlan } from "../plans";

// ═══════════════════════════════════════════════════════════════
// FRENCH CONTRAST TENNIS V2 — Phase 2
// Built from V1 after several months on the same blocks. Adds sliders,
// Bosu ball, more adductor/abductor work, and solo reaction-ball reflex
// training, while keeping the French Contrast structure intact.
// Budget: ~45-50 min/day. A+B+C are the backbone (D skipped ~50% of the
// time) — reflex/twitch/stability work is spread across all three so
// nothing important is D-exclusive.
// ═══════════════════════════════════════════════════════════════

export const frenchContrastTennisV2: StaticPlan = {
  id: "french-contrast-tennis-v2",
  name: "French Contrast Tennis V2",
  icon: "🎾",
  kind: "static",
  dayKeys: ["A", "B", "C", "D"],
  days: {
    // ─────────────────────────────────────────────
    // DAY A: Hinge + Linear (~52 min)
    // ─────────────────────────────────────────────
    A: {
      title: "Hinge + Linear",
      items: [
        // ── Prep (circuit, ~5 min) ──
        {
          id: "a_w1",
          slot: "prep",
          name: "Ankle circles + calf raises",
          dose: "1 min",
          equipment: "None",
        },
        {
          id: "a_w2",
          slot: "prep",
          name: "World's greatest stretch + hip airplanes",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "a_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Dynamic adductor/abductor prep",
          howTo:
            "Feet on sliders, hands on hips or a wall for balance. Slide one leg out to the side into a lateral lunge — sliding leg stays straight, bend the stance knee, push back to center. Alternate sides. Controlled tempo, opens the adductors dynamically instead of a static stretch.",
        },

        // ── Core Activation (circuit, ~5 min — anti-extension / anti-rotation / anti-lateral-flexion, no redundancy) ──
        {
          id: "a_ca1",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return. Feel your deep core brace, not your hip flexors.\n\n**Progression:** hold a light DB or plate (5–10 lb) in the extending-arm hand.",
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
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu ball",
          description: "Anti-lateral flexion + stability",
          howTo:
            "Side plank on forearm, feet stacked on the Bosu dome. Dip hip toward the floor, then drive it back up above neutral. The unstable base under your feet adds a real balance demand on top of the QL/oblique work.",
        },

        // ── FC Block 1 — Hinge Power (single pass — run 2 rounds, ~90s rest between rounds) ──
        {
          id: "a_fc1_1",
          slot: "fc_block",
          name: "Heavy DB Romanian deadlift",
          dose: "5 reps @ 80%",
          equipment: "Heavy DB pair",
          description: "Potentiate posterior chain — hip hinge",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "70-80 lb DBs",
          howTo:
            "Heavy DB pair at thighs. Hinge at the hips, flat back, DBs travel close to the shins. Feel the hamstrings load, not the low back. Same potentiation role as before with a different implement — no barbell setup, still spares the low back.\n\n**Run this cluster for 2 rounds** (not 3) — that's the time-budget trim.",
        },
        {
          id: "a_fc1_2",
          slot: "fc_block",
          name: "Kneeling jump to feet",
          dose: "4 reps",
          equipment: "None",
          description: "Express hip extension from a dead stop",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Kneel on both knees, sit back slightly onto your heels. Swing your arms and explosively extend hips and knees to jump up, landing on your feet in athletic stance. Zero counter-movement help from the ankles — pure hip-extension power from a dead stop.",
        },
        {
          id: "a_fc1_3",
          slot: "fc_block",
          name: "Single-arm KB swing (heavy)",
          dose: "5/side",
          equipment: "KB",
          description: "Speed-strength hinge + anti-rotation",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "53 lb KB",
          howTo:
            "Same hip-snap as a two-hand swing, but single-arm forces your core to resist the rotational pull of the offset load. Don't let your trunk twist.",
        },
        {
          id: "a_fc1_4",
          slot: "fc_block",
          name: "Banded RDL to vertical jump",
          dose: "4 reps",
          equipment: "Long band",
          description: "Overspeed hinge into jump",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored under feet or behind you. Hinge into an RDL position, then explode up into a vertical jump against the band tension. More hinge-specific than a broad jump — same hip-extension pattern, added resistance.",
        },

        // ── FC Block 2 — Rotational (single pass — run 2 rounds) ──
        {
          id: "a_fc2_1",
          slot: "fc_block",
          name: "Landmine rotational squat to press",
          dose: "3/side @ 80%",
          equipment: "Barbell + landmine",
          description: "Potentiate legs + trunk — actually rotational",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "bar + 25 lb",
          howTo:
            "Hold the landmine sleeve at chest with both hands, athletic stance offset to one side. Squat down, then drive up while rotating and pressing the bar across your body to the opposite side.",
        },
        {
          id: "a_fc2_2",
          slot: "fc_block",
          name: "Rotational box jump (quarter turn)",
          dose: "3/side",
          equipment: "12-18\" box",
          description: "Plyo + rotation",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Stand facing away from a box. Jump up and rotate 90° in the air to land on the box facing forward. Land soft, stick it.",
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
          name: "Band rotational chop to throw",
          dose: "5/side",
          equipment: "Long band",
          description: "Overspeed rotation, unit turn",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored high to one side. Chop down and across, then reverse and release the motion explosively like a throw. Band gives constant tension instead of a dead-weight release.",
        },

        // ── FC Block 3 — Posterior Pull (single pass — run 2 rounds) ──
        {
          id: "a_fc3_1",
          slot: "fc_block",
          name: "Chest-supported heavy DB row",
          dose: "5 reps @ 80%",
          equipment: "Incline bench + DBs",
          description: "Potentiate pull chain, spares low back",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "70-80 lb DBs",
          howTo:
            "Chest against an incline bench (~30-45°). Row both DBs to your ribs, squeeze the shoulder blades. Chest support takes the low back out of it entirely — strict pull, no momentum.",
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
          name: "Single-arm cable row (explosive)",
          dose: "4/side",
          equipment: "Cable",
          description: "Speed-strength pull, consistent resistance arc",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "45-50 lb stack",
          howTo:
            "Explosive concentric, controlled eccentric. Cable keeps tension consistent through the whole range instead of dropping off at lockout — closer to the resistance curve of a racquet pull-through.",
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
            "Band anchored high. Straight arms, pull from overhead to hips as fast as possible. Snap the band down. Pure speed.",
        },

        // ── Athletic + Reactive (merged — ~7 min) ──
        {
          id: "a_ath1",
          slot: "athletic",
          name: "Cable row to knee drive",
          dose: "3×6/side",
          equipment: "Cable or band",
          description: "Anti-rotation pull + single-leg knee drive — integrated (staple, protected)",
          suggestedLoad: "~30 lb",
          howTo:
            "Anchor cable/band at chest height. Hold the handle in the hand OPPOSITE your standing leg, slight stagger to start. Row the handle to your ribs while exploding the opposite knee up to a tall single-leg stand — finish balanced on one leg, knee at hip height, handle at your side. Hold the balance 1 second, return under control. One of your staples.",
        },
        {
          id: "a_ath2",
          slot: "athletic",
          name: "Explosive knee drive to rotational step",
          dose: "3×5/side",
          equipment: "DB or med ball",
          description: "Knee drive → step → loaded trunk rotation, multi-planar (staple, protected)",
          suggestedLoad: "20-25 lb DB or 10 lb ball",
          howTo:
            "Hold a DB or med ball at chest. Standing on one leg, drive the free knee up explosively to hip height (1-sec punch at the top). Step that foot forward into a lunge and rotate your trunk over the front leg, then rotate back to center as you push back to the start. Your other staple.",
        },
        {
          id: "a_ath3",
          slot: "athletic",
          name: "Bosu single-leg stick + reactive reach",
          dose: "6/side",
          equipment: "Bosu ball + reaction ball",
          description: "Single-leg stability + reactive catch",
          howTo:
            "Stand single-leg on the Bosu dome. Throw the reaction ball at a wall a few feet away — the irregular bounce comes back unpredictable. Catch it without stepping off the dome. Ankle/knee stability and true reaction speed in one move, fully solo.\n\n**Rotates weekly with:** Slider lateral slide → stick, Wall reaction-ball drop, Mirror/reactive shuffle to called direction, Continuous pogo hop series — swap one in periodically so this doesn't go stale.",
        },

        // ── Tennis Movement (~4-5 min) ──
        {
          id: "a_tm1",
          slot: "tennis_movement",
          name: "Split step → explosive first step 3m → stick",
          dose: "4/direction",
          equipment: "None (or long band)",
          howTo:
            "Ready position. Split step, then explode forward 3 meters — just 2-3 steps of maximum acceleration. Stick the landing in athletic stance for 2 seconds. The first step is the exercise.\n\n**Band variation:** Loop a long band around your waist — anchored behind for accel resistance, or in front for overspeed decel.",
        },
        {
          id: "a_tm2",
          slot: "tennis_movement",
          name: "Lateral bound → stick → crossover recovery",
          dose: "3/side",
          equipment: "None (or long band)",
          howTo:
            "Bound wide laterally, stick landing on outside leg for 2 seconds. Then crossover step to recover back to start. Mimics wide ball → recovery on court.\n\n**Band variation:** Band around waist, anchored opposite the bound direction for accel resistance — or same side for overspeed recovery.",
        },

        // ── Accessory (~5-6 min, 2 items — each maps to a named injury-prevention priority) ──
        {
          id: "a_acc1",
          slot: "accessory",
          name: "Sandbag decel (pitcher throw, hold on)",
          dose: "4/side",
          equipment: "Sandbag",
          suggestedLoad: "~30 lb",
          description: "Rotational brake / anti-rotation",
          howTo:
            "Hold sandbag at chest. Wind up like a pitcher — load rear hip, rotate trunk back. Explosively rotate forward as if throwing, but DO NOT release. Decelerate hard through the trunk. The braking is the exercise.",
        },
        {
          id: "a_acc2",
          slot: "accessory",
          name: "Slider hamstring curl, single-leg, eccentric",
          dose: "6-8/side",
          equipment: "Sliders + mat",
          description: "Eccentric posterior chain — the #1 lever against a pulled hamstring",
          howTo:
            "Lie on your back, one heel on a slider, other leg lifted or braced. Bridge the hips up, then SLOWLY straighten the sliding leg out (3-4 second eccentric) while keeping hips up, then curl back in. The slow-out is the point — that's the eccentric strength that protects the hamstring at end-range, exactly where it tears.",
        },

        // ── Cooldown ──
        {
          id: "a_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "a_cd2",
          slot: "cooldown",
          name: "Lacrosse ball rotator cuff + lat release",
          dose: "60-90 sec",
          equipment: "Lacrosse ball",
          description: "Self-myofascial release — posterior cuff + lat attachment",
          howTo:
            "Against a wall or lying on the floor, pin the ball into the meat of the rear shoulder (posterior cuff) and the lat edge just below the armpit. Small slow rolls, pause on tender spots 10-15 seconds. Not a stretch — you're releasing tissue tension, breathe through it.",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY B: Squat + Lateral (~51 min)
    // ─────────────────────────────────────────────
    B: {
      title: "Squat + Lateral",
      items: [
        // ── Prep ──
        {
          id: "b_w1",
          slot: "prep",
          name: "Ankle rocks + toe raises",
          dose: "1-2 min",
          equipment: "None",
        },
        {
          id: "b_w2",
          slot: "prep",
          name: "Lunge stretch + hip 90/90 switches",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "b_w3",
          slot: "prep",
          name: "Slider lateral lunge matrix",
          dose: "8/side",
          equipment: "Sliders",
          description: "Dynamic adductor/abductor prep",
          howTo:
            "Feet on sliders, hands on hips or a wall. Slide one leg out into a lateral lunge, sliding leg stays straight, bend the stance knee, push back to center. Controlled tempo.",
        },

        // ── Core Activation (fixes a real gap — Day B had zero anti-extension work before) ──
        {
          id: "b_ca1",
          slot: "core_activation",
          name: "Copenhagen plank",
          dose: "20-30s/side",
          equipment: "Bench",
          description: "Adductor, short lever",
          howTo:
            "Top leg on a bench, bottom leg hangs, top-side forearm planked on the floor. Hold the hips level. Brutal on the adductors — your best defense against a groin strain sliding into a wide ball.",
        },
        {
          id: "b_ca2",
          slot: "core_activation",
          name: "Pallof press iso hold",
          dose: "20s/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
          howTo:
            "Tall stance, band/cable anchored to the side. Press out from chest and hold — resist the pull, don't let your trunk rotate.",
        },
        {
          id: "b_ca3",
          slot: "core_activation",
          name: "Dead bug (slow, exhale on extend)",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension",
          howTo:
            "Flatten lower back to floor. Extend opposite arm and leg on exhale. 3-second extend, 2-second return.",
        },

        // ── FC Block 1 — Squat/Reactive (single pass — run 2 rounds) ──
        {
          id: "b_fc1_1",
          slot: "fc_block",
          name: "Zercher squat (heavy)",
          dose: "5 reps @ 80%",
          equipment: "Barbell or heavy KB",
          description: "Potentiate legs, front-loaded",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "~135 lb",
          howTo:
            "Bar (or KB) cradled in the crooks of your elbows at your chest. Squat down keeping the torso upright — the front load forces a more upright torso than a back squat, different demand on the upper back and core.",
        },
        {
          id: "b_fc1_2",
          slot: "fc_block",
          name: "Broad jump to vertical jump (complex)",
          dose: "3 reps",
          equipment: "None",
          description: "Horizontal-to-vertical force conversion",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Broad jump forward, stick for a half-second, then immediately convert into a vertical jump — no reset. Trains going from a wide recovery step into an overhead ball.",
        },
        {
          id: "b_fc1_3",
          slot: "fc_block",
          name: "Cossack squat to jump",
          dose: "4/side",
          equipment: "None or light DB",
          description: "Lateral loaded squat into explosive jump",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "20-25 lb DB optional",
          howTo:
            "Wide stance, shift all your weight into a deep lateral squat on one leg (other leg straight, heel down). Drive back to center and explode into a small vertical jump.",
        },
        {
          id: "b_fc1_4",
          slot: "fc_block",
          name: "Lateral bound series (banded, continuous)",
          dose: "6 reps",
          equipment: "Long band",
          description: "Overspeed lateral bounding",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band around your waist anchored to one side. Bound laterally against the band resistance, stick each landing for a half-beat, then bound back. Continuous, keep the rhythm.",
        },

        // ── FC Block 2 — Lateral/Single-leg (single pass — run 2 rounds) ──
        {
          id: "b_fc2_1",
          slot: "fc_block",
          name: "Heavy walking lunge (loaded)",
          dose: "5/side @ 80%",
          equipment: "Heavy DBs",
          description: "Potentiate single-leg strength, moving pattern",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "50-60 lb DBs",
          howTo:
            "Heavy DBs at your sides. Long stride, back knee taps just above the floor, drive through the front heel to the next step. Loads the leg while moving through space — closer to what actually happens on court than a static split squat.",
        },
        {
          id: "b_fc2_2",
          slot: "fc_block",
          name: "Lateral bound → stick (2s hold)",
          dose: "4/side",
          equipment: "None",
          description: "Wide-ball slide-stop simulation — kept, nothing else does this job",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Bound laterally as far as you can in one jump, stick the landing on the outside leg and hold 2 full seconds before recovering. The 2-second hold is the point — deceleration strength under real load.",
        },
        {
          id: "b_fc2_3",
          slot: "fc_block",
          name: "Lateral bound to single-leg RDL",
          dose: "4/side",
          equipment: "Light DB optional",
          description: "Lateral landing chained into loaded hip-hinge",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Bound laterally, stick the landing on the outside leg, then immediately hinge into a single-leg RDL on that same leg before recovering. Chains the landing into a loaded stabilization — sliding wide, then holding balance to hit.",
        },
        {
          id: "b_fc2_4",
          slot: "fc_block",
          name: "Resisted lateral crossover run (band around waist)",
          dose: "4 reps/direction",
          equipment: "Long band",
          description: "Overspeed crossover footwork",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band around your waist, anchored behind you. Run laterally using a crossover step pattern (not a shuffle) against the band resistance.",
        },

        // ── FC Block 3 — Single-leg power (single pass — run 2 rounds) ──
        {
          id: "b_fc3_1",
          slot: "fc_block",
          name: "Heavy step-up with knee drive (loaded)",
          dose: "5/side @ 80%",
          equipment: "Box + heavy DBs",
          description: "Potentiate single-leg concentric strength",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "40-50 lb DBs",
          howTo:
            "Heavy DBs at your sides, box ~knee height. Drive through the lead leg to full extension, punching the trail knee to hip height at the top — pause a beat before stepping down.",
        },
        {
          id: "b_fc3_2",
          slot: "fc_block",
          name: "Single-leg box jump → stick landing",
          dose: "3/side",
          equipment: "Low box",
          description: "Premier single-leg landing-control move — kept, central to injury prevention",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          howTo:
            "Single-leg takeoff onto a low box, stick the landing on the same leg, hold 2 seconds before stepping down. The single best move in the program for teaching your knee/ankle to absorb force safely on one leg.",
        },
        {
          id: "b_fc3_3",
          slot: "fc_block",
          name: "Rotational lunge to single-leg hop",
          dose: "4/side",
          equipment: "None",
          description: "Rotation + explosive finish",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Step into a reverse lunge while rotating your trunk toward the front leg. Drive back up and immediately hop off that same leg, landing back in a single-leg stick.",
        },
        {
          id: "b_fc3_4",
          slot: "fc_block",
          name: "Single-leg lateral hop series (banded)",
          dose: "5/side",
          equipment: "Mini band",
          description: "Lateral-plane elastic, matches the day's theme",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Single-leg, mini band around ankles or knees. Hop laterally side to side on one leg, quick ground contacts, band adds resistance to the push-off.",
        },

        // ── Athletic + Reactive (merged) ──
        {
          id: "b_ath1",
          slot: "athletic",
          name: "Crossover step-up to rotational reach",
          dose: "3×6/side",
          equipment: "Box + light DB or med ball",
          description: "Single-leg + rotation, chained — integrated",
          howTo:
            "Crossover step up onto a box (trail leg crosses in front), and as you stand tall on top, reach/rotate the trunk toward the stepping-leg side. Step down under control.",
        },
        {
          id: "b_ath2",
          slot: "athletic",
          name: "Lateral lunge to knee-drive bound",
          dose: "3×5/side",
          equipment: "None",
          description: "Lateral loading into explosive knee drive, chained plyo",
          howTo:
            "Lateral lunge deep to one side, then explosively push off that leg into a knee-drive bound to the other side, landing balanced on the new leg. The exact wide-ball-to-recovery sequence.",
        },
        {
          id: "b_ath3",
          slot: "athletic",
          name: "Bosu single-leg reactive catch, lateral toss",
          dose: "6/side",
          equipment: "Bosu ball + reaction ball",
          description: "Single-leg stability + lateral-biased reaction",
          howTo:
            "Single-leg on the Bosu, throw the reaction ball at a wall angled to one side so the rebound comes back laterally. Catch without stepping off. Fully solo.\n\n**Rotates weekly with:** Skater bound to med-ball rotation, Slider lateral slide → stick, Reactive shuffle to called direction, Continuous skater hop series (elastic).",
        },

        // ── Tennis Movement ──
        {
          id: "b_tm1",
          slot: "tennis_movement",
          name: "Split step drop → explosive first step 3m",
          dose: "4/direction",
          equipment: "None (or long band)",
          howTo:
            "Ready position, drop into split step, explode forward 3 meters. Stick the landing. The reactive first-move pattern.",
        },
        {
          id: "b_tm2",
          slot: "tennis_movement",
          name: "Lateral bound → stick → crossover recovery",
          dose: "3/side",
          equipment: "None (or long band)",
          howTo:
            "Bound wide laterally, stick landing for 2 seconds, crossover step to recover. Mimics wide ball → recovery.",
        },

        // ── Accessory ──
        {
          id: "b_acc1",
          slot: "accessory",
          name: "Split squat iso hold, lengthened",
          dose: "20-30s/side",
          equipment: "None or light DB",
          description: "Yielding iso in a lengthened position — direct application of the injury-prevention principle",
          howTo:
            "Front-foot-elevated or standard split squat stance, lower into the bottom position (deep stretch on the rear hip flexor/quad) and HOLD. Let the muscle lengthen under tension — this tendon adaptation protects the hip/knee more than a heavy PR ever will.",
        },
        {
          id: "b_acc2",
          slot: "accessory",
          name: "Single-leg glute bridge",
          dose: "3×10/side",
          equipment: "None",
          description: "Hip/glute control for single-leg landing",
          howTo:
            "One foot on the floor, other leg extended or bent at 90°. Bridge up through the working heel, squeeze glute at top, control down.",
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
    // DAY C: Upper + Rotation (~49-50 min)
    // ─────────────────────────────────────────────
    C: {
      title: "Upper + Rotation",
      items: [
        // ── Prep ──
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
          dose: "1-2 min",
          equipment: "Foam roller",
        },
        {
          id: "c_w3",
          slot: "prep",
          name: "Bottoms-up KB hold (standing)",
          dose: "30s/side",
          equipment: "KB",
          description: "Shoulder stability, serve-relevant",
        },

        // ── Core Activation ──
        {
          id: "c_ca1",
          slot: "core_activation",
          name: "Dead bug (slow exhale)",
          dose: "8 reps",
          equipment: "None",
          description: "Anti-extension",
        },
        {
          id: "c_ca2",
          slot: "core_activation",
          name: "Tall-kneeling Pallof press",
          dose: "8/side",
          equipment: "Band or cable",
          description: "Anti-rotation",
        },
        {
          id: "c_ca3",
          slot: "core_activation",
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu ball",
          description: "Anti-lateral flexion + stability",
        },

        // ── FC Block 1 — Press (single pass — run 2 rounds) ──
        {
          id: "c_fc1_1",
          slot: "fc_block",
          name: "Landmine press (heavy, half-kneeling)",
          dose: "5/side @ 80%",
          equipment: "Barbell + landmine",
          description: "Potentiate press chain, serve-plane specific — now your only heavy press this session",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "~70 lb",
          howTo:
            "Half-kneeling, opposite knee up. Press the landmine sleeve from shoulder to full extension along its natural diagonal arc — closer to your actual serve/overhead plane than a flat bench press. The separate bench/incline Strength block is cut, so this is your only heavy press now — make it count.",
        },
        {
          id: "c_fc1_2",
          slot: "fc_block",
          name: "Med-ball chest pass (wall)",
          dose: "4 reps",
          equipment: "Med ball",
          description: "Express press-pattern force",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
        },
        {
          id: "c_fc1_3",
          slot: "fc_block",
          name: "Single-arm DB push press (explosive)",
          dose: "4/side",
          equipment: "DB",
          description: "Leg-drive press, explosive",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "35-40 lb DB",
          howTo:
            "DB at shoulder. Dip the knees slightly and drive up explosively, using leg drive to help press the DB overhead. Trains the leg-to-arm power transfer of a real serve.",
        },
        {
          id: "c_fc1_4",
          slot: "fc_block",
          name: "Resisted punch throws (band, alternating)",
          dose: "8/side (alternating)",
          equipment: "Band",
          description: "Overspeed alternating press",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored behind you at chest height, handle in each hand. Alternate fast punching presses against the band resistance, like a boxing combo.",
        },

        // ── FC Block 2 — Rotational (single pass — run 2 rounds) ──
        {
          id: "c_fc2_1",
          slot: "fc_block",
          name: "Heavy single-arm landmine rotation, offset stance",
          dose: "4/side @ 80%",
          equipment: "Barbell + landmine",
          description: "Potentiate rotational strength, single-arm adds anti-rotation core demand",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "~70 lb",
          howTo:
            "Hold the landmine sleeve in one hand at chest height, stance offset. Rotate the trunk to swing the bar across your body and back, resisting the urge to let your trunk get pulled by the offset load.",
        },
        {
          id: "c_fc2_2",
          slot: "fc_block",
          name: "Med-ball rotational wall slam (standing)",
          dose: "4/side",
          equipment: "Med ball",
          description: "Plyo rotation at stroke-height plane",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
          howTo:
            "Standing (not down at the ground), rotate and slam the ball into a wall at roughly chest-to-shoulder height, catch the rebound and reset. Matches an actual stroke height instead of driving down.",
        },
        {
          id: "c_fc2_3",
          slot: "fc_block",
          name: "Heavy landmine rotational lunge to press",
          dose: "4/side",
          equipment: "Barbell + landmine",
          description: "Chained lunge + rotation + press",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "~50-60 lb",
          howTo:
            "Step into a reverse lunge while rotating and pressing the landmine sleeve across your body. Integrated, chained sequence.",
        },
        {
          id: "c_fc2_4",
          slot: "fc_block",
          name: "Cable rotational punch (fast, open stance)",
          dose: "6/side",
          equipment: "Cable",
          description: "Overspeed rotation",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Cable at chest height, open stance. Punch the handle across your body fast, resetting under control each rep. Cable gives more consistent tension than a band.",
        },

        // ── FC Block 3 — Pull + Overhead (single pass — run 2 rounds) ──
        {
          id: "c_fc3_1",
          slot: "fc_block",
          name: "Heavy chest-supported T-bar row",
          dose: "5 reps @ 80%",
          equipment: "Landmine T-bar + V-handle",
          description: "Potentiate pull chain, spares low back",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          suggestedLoad: "~135 lb",
          howTo:
            "Chest against an incline bench, landmine T-bar setup below you. Row to your ribs, squeeze the shoulder blades. Same heavy pull stimulus as a bent-over row, without loading your low back on an already rotation-heavy day.",
        },
        {
          id: "c_fc3_2",
          slot: "fc_block",
          name: "Med-ball overhead forward throw",
          dose: "4 reps",
          equipment: "Med ball",
          description: "Explosive overhead pattern — serve-relevant, kept",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
          suggestedLoad: "10 lb",
        },
        {
          id: "c_fc3_3",
          slot: "fc_block",
          name: "Half-kneeling single-arm cable row (explosive)",
          dose: "4/side",
          equipment: "Cable",
          description: "Speed-strength pull, consistent resistance arc",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "~30-35 lb",
          howTo:
            "Half-kneeling, cable low. Explosive concentric pull to ribs, controlled eccentric. Cable gives a more consistent arc than a band.",
        },
        {
          id: "c_fc3_4",
          slot: "fc_block",
          name: "Band face-pull to external rotation (fast)",
          dose: "8 reps",
          equipment: "Band",
          description: "Overspeed rear-delt/rotator cuff — doubles as direct cuff care",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
          howTo:
            "Band anchored at face height. Pull to your face, then at the end of the pull, rotate your hands/forearms up and back into external rotation — fast tempo. Directly trains the rotator cuff pattern that keeps it healthy under all the pressing/rotating this day does.",
        },

        // ── Athletic + Reactive (merged) ──
        {
          id: "c_ath1",
          slot: "athletic",
          name: "Reverse lunge to landmine rotational press",
          dose: "3×5/side",
          equipment: "Barbell + landmine",
          description: "Chained lunge + rotation + press — integrated",
        },
        {
          id: "c_ath2",
          slot: "athletic",
          name: "Half-kneeling to standing rotational row + knee drive",
          dose: "3×6/side",
          equipment: "Cable or band",
          description: "Pull + stand + rotate + knee drive — integrated",
        },
        {
          id: "c_ath3",
          slot: "athletic",
          name: "Bosu single-leg reactive catch with rotational reach",
          dose: "6/side",
          equipment: "Bosu ball + reaction ball",
          description: "Single-leg stability + rotational reaction",
          howTo:
            "Single-leg on the Bosu, throw the reaction ball at a wall to your side so you have to rotate your trunk to receive the rebound. Catch without stepping off. Fully solo.\n\n**Rotates weekly with:** Band lift to rotational step-through, Wall reaction-ball drop (cross-body catch), Med-ball reactive rotational catch-and-throw off the wall.",
        },

        // ── Tennis Movement ──
        {
          id: "c_tm1",
          slot: "tennis_movement",
          name: "Split step → first step 3m → decel → recovery",
          dose: "4/direction",
          equipment: "None",
        },
        {
          id: "c_tm2",
          slot: "tennis_movement",
          name: "Rotational med-ball wall throw (fast)",
          dose: "5/side",
          equipment: "Med ball",
          suggestedLoad: "8-10 lb",
        },

        // ── Accessory (unchanged — already minimal/necessary) ──
        {
          id: "c_acc1",
          slot: "accessory",
          name: "Face pulls",
          dose: "3×12",
          equipment: "Band or cable",
          suggestedLoad: "20 lb",
        },
        {
          id: "c_acc2",
          slot: "accessory",
          name: "Bottoms-up KB carry",
          dose: "3×40 ft/side",
          equipment: "KB",
          suggestedLoad: "20-25 lb KB",
        },

        // ── Cooldown ──
        {
          id: "c_cd1",
          slot: "cooldown",
          name: "Walk it off + nose breathing",
          dose: "2 min",
          equipment: "None",
        },
        {
          id: "c_cd2",
          slot: "cooldown",
          name: "Lacrosse ball rotator cuff + lat release",
          dose: "60-90 sec",
          equipment: "Lacrosse ball",
          description: "Self-myofascial release — posterior cuff + lat attachment",
          howTo:
            "Against a wall or lying on the floor, pin the ball into the meat of the rear shoulder (posterior cuff) and the lat edge just below the armpit. Small slow rolls, pause on tender spots 10-15 seconds.",
        },
      ],
    },

    // ─────────────────────────────────────────────
    // DAY D: Elastic + Conditioning (~48-49 min)
    // Skipped ~50% of the time — kept lean and left the tendon-safety
    // calibration (box heights, flat plyo volume) from the June de-stack
    // untouched. Reflex/Bosu/adductor work already lives in A/B/C.
    // ─────────────────────────────────────────────
    D: {
      title: "Elastic + Conditioning",
      items: [
        // ── Prep ──
        {
          id: "d_w1",
          slot: "prep",
          name: "Jump rope (easy rhythm)",
          dose: "2 min",
          equipment: "Jump rope",
        },
        {
          id: "d_w2",
          slot: "prep",
          name: "Ankle pogo hops + calf bounces",
          dose: "1-2 min",
          equipment: "None",
        },
        {
          id: "d_w3",
          slot: "prep",
          name: "Hip flexor stretch + leg swings",
          dose: "2 min",
          equipment: "None",
        },

        // ── Core Activation ──
        {
          id: "d_ca1",
          slot: "core_activation",
          name: "Hollow body hold",
          dose: "3×20s",
          equipment: "None",
          description: "Anti-extension, full-body tension — landing-mechanics prep",
        },
        {
          id: "d_ca2",
          slot: "core_activation",
          name: "Plank shoulder taps (slow)",
          dose: "8/side",
          equipment: "None",
          description: "Anti-rotation",
        },
        {
          id: "d_ca3",
          slot: "core_activation",
          name: "Side plank with hip dip, feet on Bosu",
          dose: "8/side",
          equipment: "Bosu ball",
          description: "Anti-lateral flexion + stability",
        },

        // ── FC Block 1 (single pass — run 2 rounds; box heights unchanged, tendon-safety calibrated) ──
        {
          id: "d_fc1_1",
          slot: "fc_block",
          name: "Machine hip thrust (lighter, faster)",
          dose: "5 reps @ 60%",
          equipment: "Hip thrust machine",
          description: "Lighter/faster potentiator, appropriate for an elastic/reactive day",
          fcBlock: 1,
          fcPosition: 1,
          restAfter: 20,
        },
        {
          id: "d_fc1_2",
          slot: "fc_block",
          name: "Depth jump (off 18\" box, stick landing)",
          dose: "4 reps",
          equipment: "18\" box",
          description: "Calibrated height — tendon safety, not touching this number",
          fcBlock: 1,
          fcPosition: 2,
          restAfter: 20,
        },
        {
          id: "d_fc1_3",
          slot: "fc_block",
          name: "Broad jump, continuous ×2",
          dose: "3×2 (continuous pairs)",
          equipment: "None",
          description: "Same intensity as the old banded squat jump, different quality",
          fcBlock: 1,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Two broad jumps back to back with no reset in between — land, absorb, immediately re-jump. Continuous horizontal force absorption and re-expression.",
        },
        {
          id: "d_fc1_4",
          slot: "fc_block",
          name: "Pogo hops (continuous)",
          dose: "10-15 reps",
          equipment: "None",
          description: "Classic ankle-stiffness elastic move — core to this day's purpose, kept",
          fcBlock: 1,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── FC Block 2 (single pass — run 2 rounds; box heights unchanged) ──
        {
          id: "d_fc2_1",
          slot: "fc_block",
          name: "Heavy lateral step-down, controlled",
          dose: "5/side",
          equipment: "Box + DB optional",
          description: "Eccentric-focus, same intensity as the old lateral lunge",
          fcBlock: 2,
          fcPosition: 1,
          restAfter: 20,
          howTo:
            "Stand on a low box, slowly lower one leg down to lightly touch the floor under full control (3-4 sec), then step back up. Eccentric-focused single-leg control at the same intensity/impact level as before.",
        },
        {
          id: "d_fc2_2",
          slot: "fc_block",
          name: "Lateral depth jump (off 12\" box, stick)",
          dose: "4/side",
          equipment: "12\" box",
          description: "Calibrated height — tendon safety, not touching this number",
          fcBlock: 2,
          fcPosition: 2,
          restAfter: 20,
        },
        {
          id: "d_fc2_3",
          slot: "fc_block",
          name: "Lateral bound to stick, continuous ×2",
          dose: "3×2/side",
          equipment: "None",
          description: "Same intensity as the old banded shuffle, different footwork",
          fcBlock: 2,
          fcPosition: 3,
          restAfter: 20,
          howTo:
            "Two lateral bounds in a row on the same side with a quick stick between them, no full reset.",
        },
        {
          id: "d_fc2_4",
          slot: "fc_block",
          name: "Skater hops (continuous, quick)",
          dose: "10-15 reps",
          equipment: "None",
          description: "Classic lateral elastic move — core identity, kept",
          fcBlock: 2,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── FC Block 3 (single pass — run 2 rounds; box heights unchanged) ──
        {
          id: "d_fc3_1",
          slot: "fc_block",
          name: "Heavy reverse lunge to balance, controlled tempo",
          dose: "5/side",
          equipment: "DB or landmine",
          description: "Controlled-tempo single-leg strength, matches the day's control theme",
          fcBlock: 3,
          fcPosition: 1,
          restAfter: 20,
          howTo:
            "Step back into a reverse lunge with a slow, controlled 3-second descent, pause, then drive back to a balanced single-leg stand at the top — hold a beat.",
        },
        {
          id: "d_fc3_2",
          slot: "fc_block",
          name: "180° squat jump → stick",
          dose: "4 reps",
          equipment: "None",
          description: "Calibrated intensity — kept",
          fcBlock: 3,
          fcPosition: 2,
          restAfter: 20,
        },
        {
          id: "d_fc3_3",
          slot: "fc_block",
          name: "Med-ball rotational scoop toss (fast)",
          dose: "4/side",
          equipment: "Med ball",
          description: "Same intensity as the old overhead slam, different plane",
          fcBlock: 3,
          fcPosition: 3,
          restAfter: 20,
          suggestedLoad: "10 lb",
          howTo:
            "Underhand scoop the med ball from low-outside to high-across your body, releasing it explosively into open space or a wall.",
        },
        {
          id: "d_fc3_4",
          slot: "fc_block",
          name: "Compass hops (N-S-E-W, continuous)",
          dose: "20-30 sec continuous",
          equipment: "None",
          description: "Multi-directional elastic signature move — core identity, kept",
          fcBlock: 3,
          fcPosition: 4,
          restAfter: 150,
        },

        // ── Athletic Complex (unchanged — no reflex item added on purpose, tendon safety) ──
        {
          id: "d_ath1",
          slot: "athletic",
          name: "Broad bound to single-leg stick + rotational reach",
          dose: "3×4/side",
          equipment: "None",
          description: "Integrated reactive landing — core to this day's identity",
        },
        {
          id: "d_ath2",
          slot: "athletic",
          name: "Depth drop to lateral bound to stick",
          dose: "3×4/side",
          equipment: "Low box",
          description: "Integrated reactive landing — core to this day's identity",
        },
        {
          id: "d_ath3",
          slot: "athletic",
          name: "Scissor jump to rotational stick",
          dose: "3×5",
          equipment: "None",
          description: "Integrated reactive landing — core to this day's identity",
        },

        // ── Tennis Movement ──
        {
          id: "d_tm1",
          slot: "tennis_movement",
          name: "Split step → react → explosive first step 3m → stick",
          dose: "4/direction",
          equipment: "None",
        },
        {
          id: "d_tm2",
          slot: "tennis_movement",
          name: "Sprint superset (weekly — needs space)",
          dose: "As programmed weekly",
          equipment: "Open space",
          description: "Dedicated conditioning piece — only when space allows",
        },

        // ── Non-impact reflex add-on (right before finisher/cooldown — deliberately zero jumping) ──
        {
          id: "d_refl1",
          slot: "athletic",
          name: "Bosu static single-leg reactive catch (no jump)",
          dose: "8/side",
          equipment: "Bosu ball + reaction ball",
          description: "Non-impact reflex work — this day already carries the plyo load",
          howTo:
            "Static single-leg stance on the Bosu dome — no hopping on or off. Throw the reaction ball at a wall, catch the unpredictable rebound while holding the position. All the reflex stimulus, zero added impact on a day that's already maxed on tendon load.",
        },

        // ── Finisher ──
        {
          id: "d_fin1",
          slot: "finisher",
          name: "Wall sit (terminal iso)",
          dose: "60-90s hold",
          equipment: "None",
          finisherRounds: 1,
        },

        // ── Accessory (trimmed to 1 — direct Achilles target, the reason this day is de-stacked) ──
        {
          id: "d_acc1",
          slot: "accessory",
          name: "Single-leg calf raise (slow)",
          dose: "3×12/side",
          equipment: "None",
          description: "Direct Achilles target — the reason this whole day is de-stacked",
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
