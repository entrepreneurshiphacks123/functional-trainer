import React from "react";
import { Card, Button } from "../ui/Primitives";
import type { Mode } from "../engine/storage";

export default function ModeSelect({ onSelect }: { onSelect: (m: Mode) => void }) {
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
          Base = smoother pace. High Performance = more intensity.
        </div>
      </div>
    </Card>
  );
}
