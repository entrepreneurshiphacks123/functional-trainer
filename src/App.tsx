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
    data: Partial<Record<MovementPatter
