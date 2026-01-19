import { Button, Card, Pill, Screen } from "../ui/Primitives";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
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
  const total = items.length;
  const [i, setI] = React.useState(0);
  const item = items[i];

  const progress = `${i + 1}/${total}`;

  return (
    <Screen
      title={dayLabel}
      right={<Pill label={modeLabel} />}
    >
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
          <Pill label={slotLabel[item.slot]} />
          <span style={{ opacity: 0.65, fontSize: 13 }}>{progress}</span>
        </div>

        <div style={{ height: 14 }} />

        <div style={{ fontSize: 22, fontWeight: 750, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
          {item.name}
        </div>

        {item.hint ? (
          <div style={{ marginTop: 10, opacity: 0.7, fontSize: 14, lineHeight: 1.4 }}>
            {item.hint}
          </div>
        ) : null}

        <div style={{ height: 16 }} />

        <div style={{ display: "grid", gap: 10 }}>
          {i < total - 1 ? (
            <Button icon="➡️" onClick={() => setI((x) => Math.min(total - 1, x + 1))}>
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

// required import
import React from "react";
