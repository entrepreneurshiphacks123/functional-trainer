import React, { useMemo, useState } from "react";
import { Card } from "../ui/Primitives";
import { getAllPlans, savePlanOrder } from "../engine/plans";

export default function PlanControls({
  activePlanId,
  onPlanChange,
}: {
  activePlanId?: string;
  onPlanChange: (id: string) => void;
}) {
  // Snapshot plans on mount; the local "order" state drives the UI in reorder mode.
  const initialPlans = useMemo(() => getAllPlans(), []);
  const [order, setOrder] = useState<string[]>(() => initialPlans.map((p) => p.id));
  const [reordering, setReordering] = useState(false);

  const planById = useMemo(() => {
    const m = new Map<string, (typeof initialPlans)[number]>();
    for (const p of initialPlans) m.set(p.id, p);
    return m;
  }, [initialPlans]);

  const moveUp = (idx: number) => {
    if (idx <= 0) return;
    const next = [...order];
    [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
    setOrder(next);
    savePlanOrder(next);
  };

  const moveDown = (idx: number) => {
    if (idx >= order.length - 1) return;
    const next = [...order];
    [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    setOrder(next);
    savePlanOrder(next);
  };

  return (
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.01em" }}>
            Workout Plans
          </div>
          <button
            type="button"
            onClick={() => setReordering((v) => !v)}
            style={{
              padding: "6px 12px",
              borderRadius: "var(--radius, 0)",
              border: "var(--bw, 2px) solid var(--border)",
              background: reordering ? "var(--accent)" : "var(--bg)",
              color: reordering ? "var(--accent-text)" : "var(--text)",
              cursor: "pointer",
              fontWeight: 800,
              fontSize: 12,
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            {reordering ? "Done" : "Reorder"}
          </button>
        </div>

        <div style={{ display: "grid", gap: 8 }}>
          {order.map((id, idx) => {
            const p = planById.get(id);
            if (!p) return null;
            const active = p.id === activePlanId;
            const icon = p.icon ?? "🏋️";
            const isFirst = idx === 0;
            const isLast = idx === order.length - 1;

            return (
              <div
                key={p.id}
                style={{
                  display: "flex",
                  alignItems: "stretch",
                  gap: 8,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (!reordering) onPlanChange(p.id);
                  }}
                  disabled={reordering}
                  style={{
                    flex: 1,
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
                    cursor: reordering ? "default" : "pointer",
                    WebkitTapHighlightColor: "transparent",
                    fontWeight: 950,
                    fontSize: 15,
                    textTransform: "uppercase",
                    letterSpacing: "0.02em",
                    opacity: reordering ? 0.85 : 1,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{icon}</span>
                  <span>{p.name}</span>
                </button>

                {reordering && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button
                      type="button"
                      onClick={() => moveUp(idx)}
                      disabled={isFirst}
                      aria-label={`Move ${p.name} up`}
                      style={{
                        flex: 1,
                        minWidth: 44,
                        padding: "0 10px",
                        borderRadius: "var(--radius, 0)",
                        border: "var(--bw, 2px) solid var(--border)",
                        background: "var(--bg)",
                        color: "var(--text)",
                        cursor: isFirst ? "not-allowed" : "pointer",
                        opacity: isFirst ? 0.35 : 1,
                        fontSize: 18,
                        fontWeight: 900,
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      ↑
                    </button>
                    <button
                      type="button"
                      onClick={() => moveDown(idx)}
                      disabled={isLast}
                      aria-label={`Move ${p.name} down`}
                      style={{
                        flex: 1,
                        minWidth: 44,
                        padding: "0 10px",
                        borderRadius: "var(--radius, 0)",
                        border: "var(--bw, 2px) solid var(--border)",
                        background: "var(--bg)",
                        color: "var(--text)",
                        cursor: isLast ? "not-allowed" : "pointer",
                        opacity: isLast ? 0.35 : 1,
                        fontSize: 18,
                        fontWeight: 900,
                        WebkitTapHighlightColor: "transparent",
                      }}
                    >
                      ↓
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
