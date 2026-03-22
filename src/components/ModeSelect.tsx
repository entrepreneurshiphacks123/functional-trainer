import React from "react";
import { Card, Button } from "../ui/Primitives";
import type { Mode } from "../engine/storage";

export default function ModeSelect({
  onSelect,
  equipment,
}: {
  onSelect: (m: Mode) => void;
  equipment?: string[];
}) {
  return (
    <Card>
      <div style={{ display: "grid", gap: 12 }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.01em" }}>
          Choose mode
        </div>

        <div style={{ display: "grid", gap: 10 }}>
          <Button onClick={() => onSelect("base")} icon="🌱">
            Base
          </Button>
          <Button onClick={() => onSelect("high_performance")} icon="🔥">
            High Performance
          </Button>
        </div>

        <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.35 }}>
          Base = 30 min, no warmup, 2 contrast blocks + 2 exercises.
          <br />
          High Performance = 60 min with warmup, 3 full French Contrast blocks + finisher.
        </div>

        {equipment && equipment.length > 0 && (
          <div style={{ marginTop: 4 }}>
            <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
              Grab before you start
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, lineHeight: 1.6 }}>
              {equipment.join(" · ")}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
