import React from "react";
import { Card } from "../ui/Primitives";
import { getAllPlans, upsertUserPlan, validateUploadedPlan } from "../engine/plans";
import { mergeState } from "../engine/storage";

export default function PlanControls({
  activePlanId,
  onPlanChange,
  dayKeys,
  dayOverride,
  onDayOverrideChange,
}: {
  activePlanId?: string;
  onPlanChange: (id: string) => void;
  dayKeys: string[];
  dayOverride?: string | null;
  onDayOverrideChange: (day: string | null) => void;
}) {
  const plans = React.useMemo(() => getAllPlans(), [activePlanId]);

  const onUpload = async (file: File) => {
    try {
      const text = await file.text();
      const json = JSON.parse(text);
      const err = validateUploadedPlan(json);
      if (err) {
        alert(err);
        return;
      }
      upsertUserPlan(json);
      onPlanChange(json.id);
      mergeState({ activePlanId: json.id });
      alert("Plan added!\n\nYou can now select it from the list.");
    } catch (e: any) {
      alert("Could not read that file. Make sure it's valid JSON.");
    }
  };

  return (
    <Card style={{ marginBottom: 12 }}>
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 850 }}>Workout plan</div>

        <div style={{ display: "grid", gap: 8 }}>
          {plans.map((p) => {
            const active = p.id === activePlanId;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPlanChange(p.id)}
                style={{
                  ...planRow,
                  background: active ? "var(--card2)" : "transparent",
                  border: active
                    ? "1px solid rgba(124,92,255,0.75)"
                    : "1px solid var(--border)",
                  boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.14)" : "none",
                }}
              >
                <span style={{ fontWeight: 950 }}>{p.name}</span>
                <span style={{ opacity: 0.7, fontSize: 12 }}>{active ? "Active" : "Select"}</span>
              </button>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <label style={uploadLabel}>
            Upload plan JSON
            <input
              type="file"
              accept="application/json"
              style={{ display: "none" }}
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) onUpload(f);
                e.currentTarget.value = "";
              }}
            />
          </label>

          <a
            href={"data:application/json;charset=utf-8," + encodeURIComponent(EXAMPLE_PLAN_JSON)}
            download="example-plan.json"
            style={uploadLabel}
          >
            Download example JSON
          </a>
        </div>

        <div style={{ height: 4 }} />

        <div style={{ fontSize: 13, opacity: 0.7, fontWeight: 850 }}>Next day override</div>

        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {dayKeys.map((k) => {
            const active = (dayOverride ?? "") === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => onDayOverrideChange(active ? null : k)}
                style={{
                  ...pill,
                  background: active ? "var(--card2)" : "transparent",
                  border: active ? "1px solid rgba(124,92,255,0.75)" : "1px solid var(--border)",
                  boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.14)" : "none",
                }}
              >
                Day {k}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onDayOverrideChange(null)}
            style={{ ...pill, opacity: 0.8 }}
          >
            Clear
          </button>
        </div>

        <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.4 }}>
          If the app picked the wrong day, tap the day you want. This only affects the *next* workout.
        </div>
      </div>
    </Card>
  );
}

const planRow: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "baseline",
  justifyContent: "space-between",
  gap: 12,
  padding: "12px 12px",
  borderRadius: 14,
  cursor: "pointer",
  color: "var(--text)",
  WebkitTapHighlightColor: "transparent",
};

const uploadLabel: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 10,
  borderRadius: 14,
  padding: "10px 12px",
  border: "1px solid var(--border)",
  background: "transparent",
  color: "var(--text)",
  fontSize: 14,
  fontWeight: 900,
  cursor: "pointer",
  textDecoration: "none",
};

const pill: React.CSSProperties = {
  borderRadius: 999,
  padding: "10px 12px",
  fontSize: 14,
  fontWeight: 900,
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
  background: "transparent",
  color: "var(--text)",
  border: "1px solid var(--border)",
};

const EXAMPLE_PLAN_JSON = JSON.stringify(
  {
    id: "bodyweight-20",
    name: "Bodyweight - 20min",
    kind: "static",
    dayKeys: ["A", "B"],
    days: {
      A: {
        title: "Bodyweight A",
        items: [
          { id: "bw-a1", slot: "prep", name: "Easy jog in place", dose: "2 min" },
          { id: "bw-a2", slot: "strength", name: "Push-ups", dose: "3×8" },
          { id: "bw-a3", slot: "strength", name: "Air squats", dose: "3×12" },
          { id: "bw-a4", slot: "finish", name: "Breathing reset", dose: "2 min" },
        ],
      },
      B: {
        title: "Bodyweight B",
        items: [
          { id: "bw-b1", slot: "prep", name: "Mobility flow", dose: "4 min" },
          { id: "bw-b2", slot: "strength", name: "Split squats", dose: "3×8/side" },
          { id: "bw-b3", slot: "strength", name: "Plank", dose: "3×30s" },
          { id: "bw-b4", slot: "finish", name: "Walk", dose: "5 min" },
        ],
      },
    },
  },
  null,
  2
);
