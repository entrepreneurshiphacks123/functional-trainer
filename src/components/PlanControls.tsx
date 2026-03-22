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
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}>
          Workout Plans
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {plans.map((p) => {
            const active = p.id === activePlanId;
            const icon = p.icon ?? "🏋️";

            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onPlanChange(p.id)}
                style={{
                  textAlign: "left",
                  padding: "14px 16px",
                  borderRadius: "var(--radius, 0)",
                  border: active
                    ? "var(--bw, 2px) solid var(--accent)"
                    : "var(--bw, 2px) solid var(--border)",
                  background: active ? "var(--accent)" : "var(--bg)",
                  color: active ? "var(--accent-text)" : "var(--text)",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  fontWeight: 950,
                  fontSize: 15,
                  textTransform: "uppercase",
                  letterSpacing: "0.02em",
                }}
              >
                <span style={{ fontSize: 22 }}>{icon}</span>
                <span>{p.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
