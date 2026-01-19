import { useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";

type Step = "mode" | "workout" | "soreness";

export default function App() {
  const [step, setStep] = useState<Step>("mode");

  return (
    <main style={{ padding: 20 }}>
      {step === "mode" && <ModeSelect onSelect={() => setStep("workout")} />}
      {step === "workout" && <WorkoutPlayer onFinish={() => setStep("soreness")} />}
      {step === "soreness" && <SorenessCheck onDone={() => setStep("mode")} />}
    </main>
  );
}
