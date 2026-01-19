import { Button, Card, Screen } from "../ui/Primitives";

type Mode = "high_performance" | "walk_out_better";

export default function ModeSelect({ onSelect }: { onSelect: (m: Mode) => void }) {
  return (
    <Screen
      title="How do you want to feel?"
      subtitle="Zero choice. You only pick the training vibe. The app handles what’s safe and smart today."
    >
      <Card>
        <div style={{ display: "grid", gap: 10 }}>
          <Button icon="🔥" onClick={() => onSelect("high_performance")}>
            High Performance
          </Button>
          <Button icon="🌱" variant="ghost" onClick={() => onSelect("walk_out_better")}>
            Walk Out Feeling Better
          </Button>
        </div>
      </Card>
    </Screen>
  );
}
