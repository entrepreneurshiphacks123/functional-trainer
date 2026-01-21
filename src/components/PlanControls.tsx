import React from "react";
import { Card } from "../ui/Primitives";
import { getAllPlans } from "../engine/plans";

export default function PlanControls({
  activePlanId,
  onPlanChange,
}: {
  activePlanId?: string;
  onPlanChange: (id: string) => void;
}) {
  const plans = getAllPlans();

  return (
    <Card title="Workout Plans">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
        }}
      >
        {plans.map((p) => {
          const active = p.id === activePlanId;
          const icon = (p as any).icon || "🏋️";
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onPlanChange(p.id)}
              style={{
                textAlign: "left",
                padding: 16,
                borderRadius: 16,
                border: active ? "1px solid rgba(124,92,255,0.85)" : "1px solid var(--border)",
                background: active ? "rgba(124,92,255,0.10)" : "var(--card)",
                boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.12)" : "none",
                display: "flex",
                alignItems: "center",
                gap: 14,
                cursor: "pointer",
              }}
            >
              <div
                aria-hidden
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 18,
                  display: "grid",
                  placeItems: "center",
                  fontSize: 26,
                  background: "var(--card2)",
                  border: "1px solid var(--border)",
                  flex: "0 0 auto",
                }}
              >
                {icon}
              </div>

              <div style={{ minWidth: 0 }}>
                <div style={{ fontWeight: 950, fontSize: 16, lineHeight: 1.1, marginBottom: 4 }}>
                  {p.name}
                </div>
                <div style={{ opacity: 0.75, fontSize: 12 }}>{active ? "Selected" : "Tap to select"}</div>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
