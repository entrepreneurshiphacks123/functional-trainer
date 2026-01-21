import React from "react";
import { Card, Button } from "../ui/Primitives";
import type { Mode } from "../engine/storage";

export default function ModeSelect({ onSelect }: { onSelect: (m: Mode) => void }) {
  return (
    <Card>
      <div style={{ display: "grid", gap: 10 }}>
        <div style={{ fontSize: 18, fontWeight: 700 }}>Choose mode</div>
        <Button onClick={() => onSelect("base")}>🌱 Base</Button>
        <Button onClick={() => onSelect("high_performance")}>🔥 High Performance</Button>
      </div>
    </Card>
  );
}
