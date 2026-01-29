import { useEffect, useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import CalendarView from "./components/CalendarView";
import PlanControls from "./components/PlanControls";
import Settings from "./components/Settings";
import { loadState, saveState, Mode, Soreness, AppState } from "./engine/storage";
import { findPlan, getWorkoutForPlan } from "./engine/plans";
import { dayIntent, dayLabels } from "./engine/library";
import { MovementPattern } from "../types/MovementPattern";
import { applyTheme, loadTheme, saveTheme, Theme } from "./ui/theme";
import { BottomNav } from "./ui/Primitives";

type Step = "mode" | "workout" | "soreness";
type Tab = "workout" | "calendar" | "settings";

function nextDayKey(order: string[], last?: string) {
  if (!Array.isArray(order) || order.length === 0) return "A";
  if (!last) return order[0];
  const idx = order.indexOf(last);
  if (idx < 0) return order[0];
  return order[(idx + 1) % order.length];
}

export default function App() {
  const persisted = useMemo(() => loadState(), []);
  const [activeTab, setActiveTab] = useState<Tab>("workout");
  const [step, setStep] = useState<Step>("mode");
  const [mode, setMode] = useState<Mode | null>(null);

  const [lastDay, setLastDay] = useState(persisted.lastDay);
  const [soreness, setSoreness] = useState(persisted.soreness);
  const [workoutLog, setWorkoutLog] = useState(persisted.workoutLog ?? []);

  const [activePlanId, setActivePlanId] = useState<string | undefined>(
    persisted.activePlanId ?? "functional-fitness-45"
  );
  const [dayOverride, setDayOverride] = useState<string | null>(persisted.dayOverride ?? null);

  const [theme, setTheme] = useState<Theme>(() => loadTheme());

  useEffect(() => {
    applyTheme(theme);
    saveTheme(theme);
  }, [theme]);

  const plan = useMemo(() => findPlan(activePlanId), [activePlanId]);
  const dayKeys = Array.isArray(plan.dayKeys) && plan.dayKeys.length ? plan.dayKeys : ["A", "B", "C", "D"];

  const computedPlannedDay = dayOverride ?? nextDayKey(dayKeys, lastDay);

  const plannedDay =
    soreness?.shoulder_stability === "red" && computedPlannedDay === "C" ? "D" : computedPlannedDay;

  const workout = useMemo(() => {
    if (!mode) return null;
    return getWorkoutForPlan({ plan, dayKey: plannedDay, lastDay, mode, soreness });
  }, [lastDay, mode, soreness, plan, plannedDay]);

  const dayLabel = workout
    ? `${(dayLabels as any)[workout.day] ?? `Day ${workout.day}`} — ${(dayIntent as any)[workout.day] ?? ""}`
    : "";

  const modeLabel = mode === "high_performance" ? "🔥" : "🌱";

  const persist = (patch: Partial<AppState>) => {
    const prev = loadState();
    saveState({ ...prev, ...patch });
  };

  const start = (m: Mode) => {
    setMode(m);
    setStep("workout");
  };

  const saveSorenessAndLogWorkout = (data: Partial<Record<MovementPattern, Soreness>>, dateISO: string) => {
    setSoreness(data);
    const prev: AppState = loadState();
    const nextSorenessLog = [
      ...(prev.sorenessLog ?? []).filter((e) => e.dateISO !== dateISO),
      { dateISO, soreness: data },
    ].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1));

    const workoutEntry =
      workout && mode
        ? {
          dateISO,
          planId: plan.id,
          day: workout.day,
          mode,
          title: dayLabel,
          items: workout.items,
        }
        : null;

    const nextWorkoutLog = workoutEntry
      ? [...(prev.workoutLog ?? []).filter((e) => e.dateISO !== dateISO), workoutEntry].sort((a, b) =>
        a.dateISO < b.dateISO ? 1 : -1
      )
      : prev.workoutLog ?? [];

    const next: AppState = {
      ...prev,
      lastDay: workout?.day ?? lastDay,
      soreness: data,
      sorenessLog: nextSorenessLog,
      workoutLog: nextWorkoutLog,
      activePlanId: plan.id,
      dayOverride: null,
    };

    setLastDay(next.lastDay);
    setWorkoutLog(nextWorkoutLog);
    setDayOverride(null);
    saveState(next);
  };

  const onTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // When switching to workout tab, if we were in soreness result, go back to mode selection
    if (tab === "workout" && step === "soreness") {
      setStep("mode");
      setMode(null);
    }
  };

  return (
    <>
      <main>
        {activeTab === "calendar" && (
          <CalendarView logs={workoutLog} onBack={() => setActiveTab("workout")} />
        )}

        {activeTab === "settings" && (
          <Settings
            theme={theme}
            onThemeToggle={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            onBack={() => setActiveTab("workout")}
          />
        )}

        {activeTab === "workout" && (
          <>
            {step === "mode" && (
              <div style={{ display: "grid", gap: 12 }}>
                <PlanControls
                  activePlanId={plan.id}
                  onPlanChange={(id) => {
                    setActivePlanId(id);
                    setDayOverride(null);
                    persist({ activePlanId: id, dayOverride: null });
                  }}
                />
                <ModeSelect onSelect={start} />
              </div>
            )}

            {step === "workout" && workout && mode && (
              <WorkoutPlayer
                workout={workout as any}
                workoutLabel={dayLabel}
                modeLabel={modeLabel}
                plannedDay={plannedDay}
                dayKeys={dayKeys}
                onPlannedDayChange={(d) => {
                  setDayOverride(d);
                  persist({ dayOverride: d });
                }}
                onFinish={() => setStep("soreness")}
                onBack={() => {
                  setMode(null);
                  setStep("mode");
                }}
              />
            )}

            {step === "soreness" && (
              <SorenessCheck
                initial={soreness}
                onSave={saveSorenessAndLogWorkout}
                onDone={() => {
                  setMode(null);
                  setStep("mode");
                }}
              />
            )}
          </>
        )}
      </main>

      <BottomNav active={activeTab} onTabChange={onTabChange} />
    </>
  );
}
