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

const DOTS: Array<{ value: Soreness; label: string; color: string }> = [
  { value: "green", label: "Good", color: "var(--good)" },
  { value: "yellow", label: "Moderate", color: "var(--warn)" },
  { value: "red", label: "Very sore", color: "var(--bad)" },
];

function DotPicker({
  value,
  onChange,
}: {
  value: Soreness;
  onChange: (v: Soreness) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      {DOTS.map((d) => {
        const active = d.value === value;
        return (
          <button
            key={d.value}
            type="button"
            onClick={() => onChange(d.value)}
            aria-label={d.label}
            title={d.label}
            style={{
              width: 28,
              height: 28,
              borderRadius: 999,
              background: d.color,
              border: active ? "2px solid rgba(255,255,255,0.85)" : "2px solid rgba(0,0,0,0.18)",
              boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.18)" : "0 1px 6px rgba(0,0,0,0.08)",
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
              transform: active ? "scale(1.06)" : "scale(1)",
              transition: "transform 120ms ease, box-shadow 120ms ease",
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

  // IMPORTANT: local date key, not UTC ISO.
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
                <DotPicker
                  value={v}
                  onChange={(nv) => setState((s) => ({ ...s, [p]: nv }))}
                />
              </div>
            );
          })}

          <div style={{ fontSize: 12, opacity: 0.65, marginTop: 4 }}>
            Green = good · Yellow = moderate · Red = very sore
          </div>
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
