import { useMemo, useState } from "react";
import { MovementPattern } from "../../types/MovementPattern";
import { Button, Card, Screen, Segmented } from "../ui/Primitives";

type Soreness = "green" | "yellow" | "red";

const pretty: Record<MovementPattern, string> = {
  acceleration: "Accel",
  deceleration: "Decel",
  rotation: "Rotation",
  anti_rotation: "Anti-rot",
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

  const [state, setState] = useState<Partial<Record<MovementPattern, Soreness>>>(initial ?? {});

  return (
    <Screen title="Soreness">
      <Card>
        <div style={{ display: "grid", gap: 12 }}>
          {patterns.map((p) => {
            const v = state[p] ?? "green";
            return (
              <div key={p} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
                <div style={{ fontWeight: 700 }}>{pretty[p]}</div>
                <Segmented
                  value={v}
                  options={[
                    { key: "green", label: "G" },
                    { key: "yellow", label: "Y" },
                    { key: "red", label: "R" },
                  ]}
                  onChange={(nv) => setState((s) => ({ ...s, [p]: nv as Soreness }))}
                />
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
          Save
        </Button>
      </Card>
    </Screen>
  );
}
