import { Button, Card, Pill, Screen } from "../ui/Primitives";

export default function WorkoutPlayer({
  onFinish,
  modeLabel,
  dayLabel,
}: {
  onFinish: () => void;
  modeLabel: string;
  dayLabel: string;
}) {
  return (
    <Screen
      title="Today’s session"
      subtitle="We’ll make this the one-exercise-per-screen player next. For now, this confirms flow + state."
      right={<Pill label={modeLabel} />}
    >
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ display: "grid", gap: 6 }}>
            <div style={{ opacity: 0.65, fontSize: 13 }}>Session Type</div>
            <div style={{ fontSize: 18, fontWeight: 700 }}>{dayLabel}</div>
          </div>
          <Pill label="45–60 min" />
        </div>

        <div style={{ height: 12 }} />

        <div style={{ opacity: 0.75, fontSize: 14, lineHeight: 1.5 }}>
          Next step: the engine will generate your A–D workout and walk you through it with timers, sets, and simple taps.
        </div>

        <div style={{ height: 14 }} />

        <Button icon="✅" onClick={onFinish}>
          Finish & Log Soreness
        </Button>
      </Card>

      <Card subtle>
        <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.5 }}>
          <strong style={{ opacity: 0.92 }}>Reminder:</strong> No training on tennis days. If you’re smoked, pick “Walk Out Feeling Better.”
        </div>
      </Card>
    </Screen>
  );
}
