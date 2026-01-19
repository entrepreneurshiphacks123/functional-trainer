import React from "react";
import { Card, Screen, Button } from "../ui/Primitives";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
  dose: string; // <- reps/sets/time, same visual weight as name
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
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((it, idx) => {
            const active = idx === i;
            return (
              <div
                key={it.id}
                style={{
                  padding: "12px 12px",
                  borderRadius: 14,
                  border: `1px solid var(--border)`,
                  background: active ? "var(--card2)" : "transparent",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                  <div style={{ fontSize: 16, fontWeight: 750, opacity: active ? 1 : 0.78 }}>
                    {it.name}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 750, opacity: active ? 1 : 0.78 }}>
                    {it.dose}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ fontSize: 13, opacity: 0.55 }}>{slotLabel[it.slot]}</div>
                  {it.hint ? <div style={{ fontSize: 13, opacity: 0.55 }}>{it.hint}</div> : null}
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 12 }} />

        <div style={{ display: "grid", gap: 10 }}>
          {i < items.length - 1 ? (
            <Button icon="➡️" onClick={() => setI((x) => Math.min(items.length - 1, x + 1))}>
              Next
            </Button>
          ) : (
            <Button icon="✅" onClick={onDone}>
              Done
            </Button>
          )}

          {i > 0 ? (
            <Button icon="←" variant="ghost" onClick={() => setI((x) => Math.max(0, x - 1))}>
              Back
            </Button>
          ) : null}
        </div>
      </Card>
    </Screen>
  );
}
