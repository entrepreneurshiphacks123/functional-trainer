import { useEffect, useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import CalendarView from "./components/CalendarView";
import { loadState, saveState, Mode, Soreness, AppState } from "./engine/storage";
import { generateWorkoutV1 } from "./engine/generateWorkout";
import { dayIntent, dayLabels } from "./engine/library";
import { MovementPattern } from "../types/MovementPattern";
import { applyTheme, loadTheme, saveTheme, Theme } from "./ui/theme";
import { TinyIconButton } from "./ui/Primitives";

type Step = "mode" | "workout" | "soreness" | "calendar";

export default function App() {
  const persisted = useMemo(() => loadState(), []);
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode | null>(null);
  const [lastDay, setLastDay] = useState(persisted.lastDay);
  const [soreness, setSoreness] = useState(persisted.soreness);
  const [workoutLog, setWorkoutLog] = useState(persisted.workoutLog ?? []);

  const [theme, setTheme] = useState<Theme>(() => loadTheme());

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

  const saveSorenessAndLogWorkout = (
    data: Partial<Record<MovementPattern, Soreness>>,
    dateISO: string
  ) => {
    setSoreness(data);

    const prev: AppState = loadState();

    // soreness history (dated)
    const nextSorenessLog = [
      ...(prev.sorenessLog ?? []).filter((e) => e.dateISO !== dateISO),
      { dateISO, soreness: data },
    ].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

    // workout history (dated) — logged when soreness is saved
    const workoutEntry =
      workout && mode
        ? {
            dateISO,
            day: workout.day,
            mode,
            title: dayLabel,
            items: workout.items,
          }
        : null;

    const nextWorkoutLog = workoutEntry
      ? [
          ...(prev.workoutLog ?? []).filter((e) => e.dateISO !== dateISO),
          workoutEntry,
        ].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
      : prev.workoutLog ?? [];

    const next: AppState = {
      lastDay: workout?.day ?? lastDay,
      soreness: data,
      sorenessLog: nextSorenessLog,
      workoutLog: nextWorkoutLog,
    };

    setLastDay(next.lastDay);
    setWorkoutLog(nextWorkoutLog);
    saveState(next);
  };

  const themeToggle = (
    <TinyIconButton
      label={theme === "dark" ? "☀︎" : "☾"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    />
  );

  const calendarBtn = (
    <TinyIconButton
      label="📅"
      onClick={() => setStep((s) => (s === "calendar" ? "mode" : "calendar"))}
    />
  );

  const topRight = (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 10 }}>
      {calendarBtn}
      {themeToggle}
    </div>
  );

  return (
    <>
      {step === "calendar" && (
        <div>
          {topRight}
          <CalendarView logs={workoutLog} onBack={() => setStep("mode")} />
        </div>
      )}

      {step === "mode" && (
        <div>
          {topRight}
          <ModeSelect onSelect={start} />
        </div>
      )}

      {step === "workout" && workout && mode && (
        <div>
          {topRight}
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
          {topRight}
          <SorenessCheck
            initial={soreness}
            onSave={saveSorenessAndLogWorkout}
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
