import { useEffect, useMemo, useState } from "react";
import ModeSelect from "./components/ModeSelect";
import WorkoutPlayer from "./components/WorkoutPlayer";
import SorenessCheck from "./components/SorenessCheck";
import CalendarView from "./components/CalendarView";
import PlanControls from "./components/PlanControls";
import Settings from "./components/Settings";
import { loadState, saveState, Mode, Soreness, AppState, resetAllAppData } from "./engine/storage";
import { findPlan, getWorkoutForPlan } from "./engine/plans";
import { dayIntent, dayLabels } from "./engine/library";
import { MovementPattern } from "../types/MovementPattern";
import { applyTheme, loadTheme, saveTheme, Theme } from "./ui/theme";
import { TinyIconButton } from "./ui/Primitives";
import { toLocalDateKey } from "./utils/date";

type Step = "mode" | "workout" | "soreness" | "calendar" | "settings";

function nextDayKey(order: string[], last?: string) {
  if (!Array.isArray(order) || order.length === 0) return "A";
  if (!last) return order[0];
  const idx = order.indexOf(last);
  if (idx < 0) return order[0];
  return order[(idx + 1) % order.length];
}

function safeBoot() {
  try {
    return { ok: true as const, state: loadState(), error: null as any };
  } catch (e) {
    return { ok: false as const, state: {} as AppState, error: e };
  }
}

export default function App() {
  const boot = useMemo(() => safeBoot(), []);
  const persisted = boot.state;

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

  // Plan fallback (prevents crash if activePlanId points to missing/legacy plan)
  const plan = useMemo(() => {
    return (
      findPlan(activePlanId) ||
      findPlan("functional-fitness-45") ||
      null
    );
  }, [activePlanId]);

  // If boot succeeded but we still can't resolve a plan, show recovery UI
  if (!boot.ok || !plan) {
    return (
      <div style={{ padding: 16, fontFamily: "system-ui" }}>
        <h2 style={{ margin: "0 0 10px" }}>App needs a quick reset</h2>
        <p style={{ opacity: 0.8, lineHeight: 1.4 }}>
          Your saved data is from an older version (or a plan is missing) and the app can’t load safely.
          Tap reset to fix it.
        </p>
        <button
          onClick={() => {
            resetAllAppData();
            location.reload();
          }}
          style={{
            padding: "12px 16px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.18)",
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Reset App Data
        </button>

        {boot.error ? (
          <pre style={{ marginTop: 14, opacity: 0.6, fontSize: 12, whiteSpace: "pre-wrap" }}>
            {String(boot.error)}
          </pre>
        ) : null}
      </div>
    );
  }

  const dayKeys = Array.isArray(plan.dayKeys) && plan.dayKeys.length ? plan.dayKeys : ["A", "B", "C", "D"];
  const plannedDay = dayOverride ?? nextDayKey(dayKeys, lastDay);

  const workout = useMemo(() => {
    if (!mode) return null;
    return getWorkoutForPlan({ plan, dayKey: plannedDay, lastDay, mode, soreness });
  }, [lastDay, mode, soreness, plan, plannedDay]);

  const dayLabel = workout
    ? `${dayLabels[workout.day as any] ?? `Day ${workout.day}`} — ${dayIntent[workout.day as any] ?? ""}`
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
      ? [
          ...(prev.workoutLog ?? []).filter((e) => e.dateISO !== dateISO),
          workoutEntry,
        ].sort((a, b) => (a.dateISO < b.dateISO ? 1 : -1))
      : prev.workoutLog ?? [];

    const next: AppState = {
      ...prev,
      lastDay: workout?.day ?? lastDay,
      soreness: data,
      sorenessLog: nextSorenessLog,
      workoutLog: nextWorkoutLog,
      activePlanId: plan.id,
      dayOverride: null, // clear after saving
    };

    setLastDay(next.lastDay);
    setWorkoutLog(nextWorkoutLog);
    setDayOverride(null);
    saveState(next);
  };

  const themeToggle = (
    <TinyIconButton
      label={theme === "dark" ? "☀︎" : "☾"}
      onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
    />
  );

  const calendarBtn = (
    <TinyIconButton label="📅" onClick={() => setStep((s) => (s === "calendar" ? "mode" : "calendar"))} />
  );

  const settingsBtn = (
    <TinyIconButton label="⚙️" onClick={() => setStep((s) => (s === "settings" ? "mode" : "settings"))} />
  );

  const topRight = (
    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginBottom: 10 }}>
      {calendarBtn}
      {settingsBtn}
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

      {step === "settings" && (
        <div>
          {topRight}
          <Settings onBack={() => setStep("mode")} />
        </div>
      )}

      {step === "mode" && (
        <div>
          {topRight}
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
        <div>
          {topRight}
          <WorkoutPlayer
            workout={workout}
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
          <div style={{ display: "none" }}>{toLocalDateKey(new Date())}</div>
        </div>
      )}
    </>
  );
}
