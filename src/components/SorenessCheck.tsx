import { useMemo, useState } from "react";
import { MovementPattern } from "../../types/MovementPattern";
import { Button, Card, Pill, Screen, Segmented } from "../ui/Primitives";

type Soreness = "green" | "yellow" | "red";

const pretty: Record<MovementPattern, string> = {
  acceleration: "Acceleration",
  deceleration: "Deceleration",
  rotation: "Rotation",
  anti_rotation: "Anti-Rotation",
  single_leg: "Single-Leg",
  elastic_power: "Elastic Power",
  foot_ankle: "Foot/Ankle",
  shoulder_stability: "Shoulder Stability",
};

export default function SorenessCheck({
  onDone,
  initial,
  onSave,
}: {
  onDone: () => void;
  initial?: Partial<Record<MovementPattern, Soreness>>;
  onSave?: (data: Partial<Record<MovementPattern, Soreness>>) => void;
}) {
  const patterns = useMemo<MovementPattern[]>(
    () => [
      "acceleration",
      "deceleration",
      "rotation",
      "anti_rotation",
      "single_leg",
      "elastic_power",
      "foot_ankle",
      "shoulder_stability",
    ],
    []
  );

  const [state, setState] = useState<Partial<Record<MovementPattern, Soreness>>>(
    initial ?? {}
  );

  const pillTone = (v?: Soreness) =>
    v === "green" ? "good" : v === "yellow" ? "warn" : v === "red" ? "bad" : "neutral";

  return (
    <Screen
      title="Quick soreness check"
      subtitle="This is how the app adapts. Red blocks a pattern for 48–72h. Green recovers faster."
    >
      <Card>
        <div style={{ display: "grid", gap: 12 }}>
          {patterns.map((p) => {
            const v = state[p];
            return (
              <div
                key={p}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ display: "grid", gap: 6 }}>
                  <div style={{ fontWeight: 700 }}>{pretty[p]}</div>
                  <div style={{ opacity: 0.65, fontSize: 13 }}>
                    {p === "shoulder_stability" ? "Protect the weak link." : "How did this feel today?"}
                  </div>
                </div>

                <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
                  <Pill label={v ?? "unset"} tone={pillTone(v)} />
                  <Segmented
                    value={v ?? "green"}
                    options={[
                      { key: "green", label: "Green" },
                      { key: "yellow", label: "Yellow" },
                      { key: "red", label: "Red" },
                    ]}
                    onChange={(nv) => setState((s) => ({ ...s, [p]: nv as Soreness }))}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 14 }} />

        <Button
          icon="💾"
          onClick={() => {
            onSave?.(state);
            onDone();
          }}
        >
          Save & Exit
        </Button>
      </Card>
    </Screen>
  );
}
