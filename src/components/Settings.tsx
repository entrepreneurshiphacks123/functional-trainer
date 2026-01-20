import React, { useMemo, useState } from "react";
import { Card, Button, Screen } from "../ui/Primitives";
import { getAllPlans, loadUserPlans, saveUserPlans, upsertUserPlan, validateUploadedPlan } from "../engine/plans";

function downloadJson(filename: string, obj: any) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const EXAMPLE_PLAN = {
  id: "bodyweight-20",
  name: "Bodyweight - 20min",
  icon: "🤸",
  kind: "static",
  dayKeys: ["A", "B"],
  days: {
    A: {
      title: "Day A",
      items: [
        { slot: "prep", name: "Breathing + Bracing", dose: "2 min" },
        { slot: "strength", name: "Push-ups", dose: "3 x AMRAP (stop 2 reps shy)" },
        { slot: "strength", name: "Split Squat", dose: "3 x 10 / side" },
        { slot: "finish", name: "Walk", dose: "8 min" }
      ]
    },
    B: {
      title: "Day B",
      items: [
        { slot: "prep", name: "Hip CARs", dose: "2 min" },
        { slot: "strength", name: "Rows (band)", dose: "3 x 12" },
        { slot: "strength", name: "Tempo Squat", dose: "3 x 8 (3 sec down)" },
        { slot: "finish", name: "Breathing", dose: "5 min" }
      ]
    }
  }
};

export default function Settings({ onBack }: { onBack: () => void }) {
  const [refresh, setRefresh] = useState(0);
  const plans = useMemo(() => getAllPlans(), [refresh]);
  const userPlans = useMemo(() => loadUserPlans(), [refresh]);

  const onUpload = async (file: File) => {
    const text = await file.text();
    let parsed: any;
    try {
      parsed = JSON.parse(text);
    } catch {
      alert("That file isn't valid JSON.");
      return;
    }
    const err = validateUploadedPlan(parsed);
    if (err) {
      alert(err);
      return;
    }
    upsertUserPlan(parsed);
    setRefresh((x) => x + 1);
  };

  const updateIcon = (id: string, icon: string) => {
    const existing = loadUserPlans();
    const idx = existing.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      (existing[idx] as any).icon = icon;
      saveUserPlans(existing);
    }
    setRefresh((x) => x + 1);
  };

  const updateName = (id: string, name: string) => {
    const existing = loadUserPlans();
    const idx = existing.findIndex((p: any) => p.id === id);
    if (idx >= 0) {
      (existing[idx] as any).name = name;
      saveUserPlans(existing);
    }
    setRefresh((x) => x + 1);
  };

  return (
    <Screen title="Settings" right={<Button onClick={onBack}>Back</Button>}>
      <Card title="Workout Plans (Manage)">
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
          <label
            style={{
              padding: "10px 12px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--card2)",
              cursor: "pointer",
              fontWeight: 800,
            }}
          >
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

          <Button onClick={() => downloadJson("example-plan.json", EXAMPLE_PLAN)}>Download example</Button>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ display: "grid", gap: 10 }}>
          {plans.map((p: any) => {
            const isUser = userPlans.some((u: any) => u.id === p.id);
            return (
              <div
                key={p.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "62px 1fr",
                  gap: 12,
                  alignItems: "center",
                  padding: 12,
                  borderRadius: 16,
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              >
                <input
                  value={p.icon ?? ""}
                  placeholder="🏋️"
                  disabled={!isUser}
                  onChange={(e) => updateIcon(p.id, e.target.value.slice(0, 4))}
                  style={{
                    width: 62,
                    height: 44,
                    borderRadius: 14,
                    textAlign: "center",
                    fontSize: 22,
                    border: "1px solid var(--border)",
                    background: isUser ? "var(--card2)" : "transparent",
                    color: "var(--text)",
                    opacity: isUser ? 1 : 0.55,
                  }}
                  title={isUser ? "Edit icon (emoji)" : "Built-in plan icon"}
                />
                <div style={{ display: "grid", gap: 6 }}>
                  <input
                    value={p.name}
                    disabled={!isUser}
                    onChange={(e) => updateName(p.id, e.target.value)}
                    style={{
                      width: "100%",
                      height: 40,
                      borderRadius: 12,
                      padding: "0 12px",
                      border: "1px solid var(--border)",
                      background: isUser ? "var(--card2)" : "transparent",
                      color: "var(--text)",
                      fontWeight: 850,
                      opacity: isUser ? 1 : 0.65,
                    }}
                    title={isUser ? "Edit plan name" : "Built-in plan name"}
                  />
                  <div style={{ fontSize: 12, opacity: 0.75 }}>
                    {isUser ? "User plan (editable)" : "Built-in plan (not editable here)"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </Screen>
  );
}
