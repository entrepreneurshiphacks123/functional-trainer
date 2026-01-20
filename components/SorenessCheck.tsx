import { useMemo, useState } from "react";
import { MovementPattern } from "../../types/MovementPattern";
import { Button, Card, Screen } from "../ui/Primitives";
import { toLocalDateKey } from "../utils/date";

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

const colorFor: Record<Soreness, string> = {
  green: "var(--good)",
  yellow: "var(--warn)",
  red: "var(--bad)",
};

function DotChoice({
  value,
  onChange,
}: {
  value: Soreness;
  onChange: (v: Soreness) => void;
}) {
  const opts: Soreness[] = ["green", "yellow", "red"];

  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {opts.map((o) => {
        const active = o === value;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            aria-label={o}
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              border: active ? "2px solid rgba(124,92,255,0.80)" : "1px solid var(--border)",
              background: colorFor[o],
              boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.18)" : "none",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transform: "translateZ(0)",
            }}
          />
        );
      })}
    </div>
  );
}

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
  const todayISO = toLocalDateKey(new Date());

  return (
    <Screen title={`Soreness · ${todayISO}`}>
      <Card>
        <div style={{ display: "grid", gap: 12 }}>
          {patterns.map((p) => {
            const v = state[p] ?? "green";
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
                <div style={{ fontWeight: 750 }}>{pretty[p]}</div>

                <DotChoice
                  value={v}
                  onChange={(nv) => setState((s) => ({ ...s, [p]: nv }))}
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

        <div style={{ height: 8 }} />

        <div style={{ fontSize: 12, opacity: 0.65, lineHeight: 1.4 }}>
          Green = good to go · Yellow = moderate soreness · Red = very sore
        </div>
      </Card>
    </Screen>
  );
}
