import { useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import { MovementPattern } from "../types/MovementPattern";

type Step = "mode" | "workout" | "soreness";
type Mode = "high_performance" | "walk_out_better";
type Soreness = "green" | "yellow" | "red";

export default function App() {
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode | null>(null);

  // Placeholder until engine is wired: rotate day label or keep a static label
  const dayLabel = useMemo(() => "Day A — Acceleration + Rotation", []);

  const modeLabel =
    mode === "high_performance" ? "🔥 High Performance" : "🌱 Walk Out Better";

  const handleMode = (m: Mode) => {
    setMode(m);
    setStep("workout");
  };

  const handleSaveSoreness = (data: Partial<Record<MovementPattern, Soreness>>) => {
    // next step: persist to localStorage + feed workout engine
    localStorage.setItem("training:soreness", JSON.stringify(data));
  };

  return (
    <>
      {step === "mode" && <ModeSelect onSelect={handleMode} />}

      {step === "workout" && (
        <WorkoutPlayer
          modeLabel={modeLabel}
          dayLabel={dayLabel}
          onFinish={() => setStep("soreness")}
        />
      )}

      {step === "soreness" && (
        <SorenessCheck
          onSave={handleSaveSoreness}
          onDone={() => setStep("mode")}
        />
      )}
    </>
  );
}
