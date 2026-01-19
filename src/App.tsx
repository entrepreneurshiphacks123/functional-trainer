import { useEffect, useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import { loadState, saveState, Mode, Soreness, AppState } from "./engine/storage";
import { generateWorkoutV1 } from "./engine/generateWorkout";
import { dayIntent, dayLabels } from "./engine/library";
import { MovementPattern } from "../types/MovementPattern";
import { applyTheme, loadTheme, saveTheme, Theme } from "./ui/theme";
import { TinyIconButton } from "./ui/Primitives";

type Step = "mode" | "workout" | "soreness";

export default function App() {
  const persisted = useMemo(() => loadState(), []);
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode | null>(null);
  const [lastDay, setLastDay] = useState(persisted.lastDay);
  const [soreness, setSoreness] = useState(persisted.soreness);

  const [theme, setTheme] = useState<Theme>(() => {
    const t = loadTheme();
    return t;
  });

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const start = (m: Mode) => {
    setMode(m);
    setStep("workout");
  };

  const workout = useMemo(() => {
    if (!mode) return null;
    return generateWorkoutV1({ lastDay, mode, soreness });
  }, [lastDay, mode, soreness]);

  const dayLabel = workout ? `${dayLabels[workout.day]} — ${dayIntent[workout.day]}` : "";
  const modeLabel = mode === "high_performance" ? "🔥" : "🌱";

  const saveSoreness = (
    data: Partial<Record<MovementPattern, Soreness>>,
    dateISO: string
  ) => {
    setSoreness(data);

    const prev: AppState = loadState();
    const nextLog = [
      ...(prev.sorenessLog ?? []).filter((e) => e.dateISO !== dateISO),
      { dateISO, soreness: data },
    ].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

    const next: AppState = {
      lastDay: workout?.day ?? lastDay,
      soreness: data,
      sorenessLog: nextLog,
    };

    setLastDay(next.lastDay);
    saveState(next);
  };

  const themeToggle = (
    <TinyIconButton
      label={theme === "dark" ? "☀︎" : "☾"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    />
  );

  return (
    <>
      {step === "mode" && (
        // ModeSelect uses Screen internally; we keep toggle global by placing it in Screen right via minimal approach:
        // easiest: wrap with a div and place toggle at top if you want. For now, ModeSelect is clean.
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            {themeToggle}
          </div>
          <ModeSelect onSelect={start} />
        </div>
      )}

      {step === "workout" && workout && mode && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            {themeToggle}
          </div>
          <WorkoutPlayer
            dayLabel={dayLabel}
            modeLabel={modeLabel}
            items={workout.items}
            onDone={() => setStep("soreness")}
          />
        </div>
      )}

      {step === "soreness" && (
        <div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
            {themeToggle}
          </div>
          <SorenessCheck
            initial={soreness}
            onSave={saveSoreness}
            onDone={() => {
              setMode(null);
              setStep("mode");
            }}
          />
        </div>
      )}
    </>
  );
}
