import { Button, Card, Screen } from "../ui/Primitives";

type Mode = "high_performance" | "walk_out_better";

export default function ModeSelect({ onSelect }: { onSelect: (m: Mode) => void }) {
  return (
    <Screen title="Start">
      <Card>
        <div style={{ display: "grid", gap: 10 }}>
          <Button icon="🔥" onClick={() => onSelect("high_performance")}>
            Performance
          </Button>
          <Button icon="🌱" variant="ghost" onClick={() => onSelect("walk_out_better")}>
            Feel Better
          </Button>
        </div>
      </Card>
    </Screen>
  );
}
