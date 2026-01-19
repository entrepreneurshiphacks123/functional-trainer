import { useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import { loadState, saveState, Mode, Soreness } from "./engine/storage";
import { generateWorkoutV1 } from "./engine/generateWorkout";
import { dayIntent, dayLabels } from "./engine/library";
import { MovementPattern } from "../types/MovementPattern";

type Step = "mode" | "workout" | "soreness";

export default function App() {
  const persisted = useMemo(() => loadState(), []);
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode | null>(null);
  const [lastDay, setLastDay] = useState(persisted.lastDay);
  const [soreness, setSoreness] = useState(persisted.soreness);

  const start = (m: Mode) => {
    setMode(m);
    setStep("workout");
  };

  const modeLabel = mode === "high_performance" ? "🔥" : "🌱";

  const workout = useMemo(() => {
    if (!mode) return null;
    return generateWorkoutV1({ lastDay, mode, soreness });
  }, [lastDay, mode, soreness]);

  const dayLabel = workout ? `${dayLabels[workout.day]} — ${dayIntent[workout.day]}` : "";

  const saveSoreness = (data: Partial<Record<MovementPattern, Soreness>>) => {
    setSoreness(data);
    const next = { lastDay: workout?.day ?? lastDay, soreness: data };
    setLastDay(next.lastDay);
    saveState(next);
  };

  return (
    <>
      {step === "mode" && <ModeSelect onSelect={start} />}

      {step === "workout" && workout && mode && (
        <WorkoutPlayer
          dayLabel={dayLabel}
          modeLabel={modeLabel}
          items={workout.items}
          onDone={() => setStep("soreness")}
        />
      )}

      {step === "soreness" && (
        <SorenessCheck
          initial={soreness}
          onSave={saveSoreness}
          onDone={() => {
            setMode(null);
            setStep("mode");
          }}
        />
      )}
    </>
  );
}
