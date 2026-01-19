import { useMemo, useState } from "react";
import { MovementPattern } from "../../types/MovementPattern";
import { Button, Card, Screen, Segmented } from "../ui/Primitives";

type Soreness = "green" | "yellow" | "red";

const pretty: Record<MovementPattern, string> = {
  acceleration: "Acceleration",
  deceleration: "Deceleration",
  rotation: "Rotation",
  anti_rotation: "Anti-rotation",
  single_leg: "Single-leg",
  elastic_power: "Elastic",
  foot_ankle: "Foot/ankle",
  shoulder_stability: "Shoulders",
};

export default function SorenessCheck({
  onDone,
  initial,
  onSave,
}: {
  onDone: () => void;
  initial?: Partial<Record<MovementPattern, Soreness>>;
  onSave?: (data: Partial<Record<MovementPattern, Soreness>>, dateISO: string) => void;
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

  const [state, setState] = useState<Partial<Record<MovementPattern, Soreness>>>(initial ?? {});
  const todayISO = new Date().toISOString().slice(0, 10);

  const toneFor = (v: Soreness) => (v === "green" ? "good" : v === "yellow" ? "warn" : "bad") as
    | "good"
    | "warn"
    | "bad";

  return (
    <Screen title={`Soreness · ${todayISO}`}>
      <Card>
        <div style={{ display: "grid", gap: 12 }}>
          {patterns.map((p) => {
            const v = state[p] ?? "green";
            return (
              <div key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 750 }}>{pretty[p]}</div>
                <Segmented
                  value={v}
                  tone={toneFor(v)}
                  options={[
                    { key: "green", label: "Green" },
                    { key: "yellow", label: "Yellow" },
                    { key: "red", label: "Red" },
                  ]}
                  onChange={(nv) => setState((s) => ({ ...s, [p]: nv as Soreness }))}
                />
              </div>
            );
          })}
        </div>

        <div style={{ height: 12 }} />

        <Button
          icon="💾"
          onClick={() => {
            onSave?.(state, todayISO);
            onDone();
          }}
        >
          Save
        </Button>
      </Card>
    </Screen>
  );
}
