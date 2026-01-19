import React from "react";
import { Card, Screen, Button } from "../ui/Primitives";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
  dose: string; // reps / sets / time — equal weight as name
  hint?: string;
};

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
};

export default function WorkoutPlayer({
  dayLabel,
  modeLabel,
  items,
  onDone,
}: {
  dayLabel: string;
  modeLabel: string;
  items: WorkoutItem[];
  onDone: () => void;
}) {
  const [i, setI] = React.useState(0);

  return (
    <Screen title={`${dayLabel} ${modeLabel}`}>
      <Card>
        {/* Workout list */}
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((it, idx) => {
            const active = idx === i;

            return (
              <div
                key={it.id}
                style={{
                  padding: active ? "16px 14px" : "12px 12px",
                  borderRadius: 16,
                  border: `1px solid var(--border)`,
                  background: active ? "var(--card2)" : "transparent",
                  transform: active ? "scale(1.03)" : "scale(1)",
                  transition:
                    "transform 140ms ease, background 140ms ease, padding 140ms ease",
                }}
              >
                {/* Name + Dose (equal weight) */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      fontSize: active ? 18 : 16,
                      fontWeight: 800,
                      opacity: active ? 1 : 0.75,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {it.name}
                  </div>

                  <div
                    style={{
                      fontSize: active ? 18 : 16,
                      fontWeight: 800,
                      opacity: active ? 1 : 0.75,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it.dose}
                  </div>
                </div>

                {/* Slot + Hint */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                  }}
                >
                  <div
                    style={{
                      fontSize: 13,
                      opacity: active ? 0.6 : 0.45,
                    }}
                  >
                    {slotLabel[it.slot]}
                  </div>

                  {it.hint ? (
                    <div
                      style={{
                        fontSize: 13,
                        opacity: active ? 0.6 : 0.45,
                      }}
                    >
                      {it.hint}
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ height: 14 }} />

        <div style={{ display: "grid", gap: 10 }}>
          {i < items.length - 1 ? (
            <Button
              icon="➡️"
              onClick={() => setI((x) => Math.min(items.length - 1, x + 1))}
            >
              Next
            </Button>
          ) : (
            <Button icon="✅" onClick={onDone}>
              Done
            </Button>
          )}

          {i > 0 ? (
            <Button
              icon="←"
              variant="ghost"
              onClick={() => setI((x) => Math.max(0, x - 1))}
            >
              Back
            </Button>
          ) : null}
        </div>
      </Card>
    </Screen>
  );
}
