import React from "react";
import { Card, Screen, Button, TinyIconButton, Modal } from "../ui/Primitives";
import { getLoadFor, setLoadFor } from "../engine/loadLog";
import { toLocalDateKey } from "../utils/date";
import { WorkoutItem, WorkoutData } from "../../types/WorkoutItem";
import RestTimer from "./RestTimer";
import HowTo from "./HowTo";

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  fc_block: "French Contrast",
  individual: "Individual",
  accessory: "Accessory",
  finisher: "Finisher",
  cooldown: "Cooldown",
};

function isoDate() {
  return toLocalDateKey(new Date()); // LOCAL YYYY-MM-DD
}

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function formatHMMSS(totalSec: number) {
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${pad2(m)}:${pad2(s)}`;
  return `${m}:${pad2(s)}`;
}

// ------- Persist current position + session timer -------
const WP_KEY = "wp_state_v3";

function itemsSig(items: { id: string }[]) {
  return items.map((x) => x.id).join("|");
}
function loadWP() {
  try {
    const raw = localStorage.getItem(WP_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
function saveWP(data: any) {
  try {
    localStorage.setItem(WP_KEY, JSON.stringify(data));
  } catch { }
}

// iOS haptic (when supported)
function haptic() {
  try {
    if (navigator.vibrate) navigator.vibrate(10);
  } catch { }
}

function useIsNarrow(breakpointPx = 680) {
  const [isNarrow, setIsNarrow] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
  });

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const handler = () => setIsNarrow(mq.matches);

    if ((mq as any).addEventListener) (mq as any).addEventListener("change", handler);
    else (mq as any).addListener(handler);

    handler();

    return () => {
      if ((mq as any).removeEventListener) (mq as any).removeEventListener("change", handler);
      else (mq as any).removeListener(handler);
    };
  }, [breakpointPx]);

  return isNarrow;
}

// ------- FC block helpers -------
function getFcBlockLabel(item: WorkoutItem, items: WorkoutItem[]): string | undefined {
  if (item.slot !== "fc_block" || !item.fcBlock) return undefined;
  const blockNums = [...new Set(items.filter((x) => x.fcBlock).map((x) => x.fcBlock!))];
  return `Block ${item.fcBlock} of ${blockNums.length}`;
}

function getFcPositionLabel(item: WorkoutItem): string | undefined {
  if (!item.fcPosition) return undefined;
  const labels: Record<number, string> = { 1: "Heavy Compound", 2: "Force Plyo", 3: "Speed-Strength", 4: "Speed Plyo" };
  return labels[item.fcPosition];
}


export default function WorkoutPlayer({
  workout,
  workoutLabel,
  modeLabel,
  plannedDay,
  dayKeys,
  onPlannedDayChange,
  onFinish,
  onBack,
}: {
  workout: WorkoutData;
  workoutLabel: string;
  modeLabel: string;
  plannedDay: string;
  dayKeys: string[];
  onPlannedDayChange: (d: string) => void;
  onFinish: () => void;
  onBack: () => void;
}) {
  const isNarrow = useIsNarrow(680);
  const items = workout.items;

  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState<WorkoutItem | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [showOverview, setShowOverview] = React.useState(false);

  // Rest timer state
  const [showRestTimer, setShowRestTimer] = React.useState(false);
  const [restSeconds, setRestSeconds] = React.useState(0);
  const [finisherRound, setFinisherRound] = React.useState(1);
  const [pendingIdx, setPendingIdx] = React.useState<number | null>(null);

  // Session timer
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = React.useState(0);

  const activeRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [i, showOverview]);

  React.useEffect(() => {
    const saved = loadWP();
    if (!saved) return;
    if (saved.sig !== itemsSig(items)) return;

    if (typeof saved.i === "number") {
      const safe = Math.max(0, Math.min(items.length - 1, saved.i));
      setI(safe);
    }
    if (typeof saved.startedAt === "number") setStartedAt(saved.startedAt);
    if (typeof saved.elapsedSec === "number") setElapsedSec(saved.elapsedSec);
  }, [items]);

  React.useEffect(() => {
    if (!startedAt) return;
    const t = window.setInterval(() => {
      const now = Date.now();
      const sec = Math.max(0, Math.floor((now - startedAt) / 1000));
      setElapsedSec(sec);
    }, 500);
    return () => window.clearInterval(t);
  }, [startedAt]);

  React.useEffect(() => {
    saveWP({
      sig: itemsSig(items),
      i,
      startedAt,
      elapsedSec,
      ts: Date.now(),
    });
  }, [items, i, startedAt, elapsedSec]);

  // Reset finisher round when workout changes
  React.useEffect(() => {
    setFinisherRound(1);
  }, [workout]);

  const startSessionIfNeeded = React.useCallback(() => {
    if (startedAt) return;
    setStartedAt(Date.now());
    setElapsedSec(0);
  }, [startedAt]);

  const resetSession = () => {
    haptic();
    setStartedAt(null);
    setElapsedSec(0);
    setShowOptions(false);
  };

  const goNext = () => {
    haptic();
    startSessionIfNeeded();

    const currentItem = items[i];
    const nextIdx = Math.min(items.length - 1, i + 1);
    const nextItem = items[nextIdx];

    // Finisher round looping
    if (currentItem?.slot === "finisher" && currentItem?.finisherRounds) {
      const isLastFinisher = !nextItem || nextItem.slot !== "finisher" || nextIdx === i;
      if (isLastFinisher && finisherRound < currentItem.finisherRounds) {
        // Find first finisher item
        const firstFinisherIdx = items.findIndex((x) => x.slot === "finisher");
        setFinisherRound((r) => r + 1);
        setPendingIdx(firstFinisherIdx);
        setRestSeconds(30);
        setShowRestTimer(true);
        return;
      }
    }

    // FC block rest timer
    if (currentItem?.slot === "fc_block" && currentItem?.restAfter && currentItem.restAfter > 0) {
      setPendingIdx(nextIdx);
      setRestSeconds(currentItem.restAfter);
      setShowRestTimer(true);
      return;
    }

    // Normal advance
    setI(nextIdx);
  };

  const onRestComplete = () => {
    setShowRestTimer(false);
    if (pendingIdx !== null) {
      setI(pendingIdx);
      setPendingIdx(null);
    }
  };

  const onRestSkip = () => {
    setShowRestTimer(false);
    if (pendingIdx !== null) {
      setI(pendingIdx);
      setPendingIdx(null);
    }
  };

  const goBackIdx = () => {
    haptic();
    setI((x) => Math.max(0, x - 1));
  };

  const activeItem = items[i];
  const screenTitle = workoutLabel ? `${workoutLabel} ${modeLabel}` : modeLabel || "Workout";

  return (
    <Screen
      title={screenTitle}
      right={
        <TinyIconButton label="•••" onClick={() => setShowOptions(true)} />
      }
    >
      <div style={{ display: "grid", gap: 16 }}>
        {/* TIMER BLOCK */}
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "40px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, marginBottom: 8, textTransform: "uppercase" }}>
            Session Time
          </div>
          <div
            style={{
              fontSize: 64,
              fontWeight: 950,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {formatHMMSS(elapsedSec)}
          </div>
          {!startedAt && (
            <button
              onClick={() => { haptic(); startSessionIfNeeded(); }}
              style={{
                marginTop: 20,
                background: "var(--accent)",
                color: "var(--accent-text)",
                border: "var(--bw) solid var(--border)",
                padding: "10px 24px",
                fontWeight: 950,
                textTransform: "uppercase",
              }}
            >
              Start Workout
            </button>
          )}
        </Card>

        {/* ACTIVE EXERCISE BLOCK */}
        <Card title={`Exercise ${i + 1} of ${items.length}`}>
          <div style={{ display: "grid", gap: 12 }}>
            <div
              onClick={() => { haptic(); setSelected(activeItem); }}
              style={{ cursor: "pointer" }}
            >
              {/* FC block context labels */}
              {activeItem?.slot === "fc_block" && (
                <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
                  {getFcBlockLabel(activeItem, items)} • {getFcPositionLabel(activeItem)}
                </div>
              )}
              {activeItem?.slot === "finisher" && activeItem?.finisherRounds && (
                <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", marginBottom: 4 }}>
                  Round {finisherRound} of {activeItem.finisherRounds}
                </div>
              )}

              <div style={{ fontSize: 24, fontWeight: 950, lineHeight: 1.1, marginBottom: 4 }}>
                {activeItem?.name ?? "—"}
              </div>
              <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.7 }}>
                {activeItem?.dose ?? ""} • {activeItem ? slotLabel[activeItem.slot] : "—"}
              </div>
              {activeItem?.hint && (
                <div style={{ fontSize: 14, marginTop: 8, opacity: 0.6 }}>
                  💡 {activeItem.hint}
                </div>
              )}
              {activeItem?.howTo && (
                <HowTo text={activeItem.howTo} image={activeItem.howToImage} />
              )}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              <Button icon="←" variant="ghost" onClick={goBackIdx} disabled={i === 0}>
                Prev
              </Button>
              {i < items.length - 1 ? (
                (activeItem?.slot === "fc_block" && activeItem?.restAfter) ? (
                  <Button icon="✓" onClick={goNext}>
                    Done
                  </Button>
                ) : (
                  <Button icon="➡️" onClick={goNext}>
                    Next
                  </Button>
                )
              ) : (
                <Button icon="✅" onClick={() => { haptic(); onFinish(); }}>
                  Done
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* OVERVIEW / LOG BUTTON */}
        <Button variant="ghost" onClick={() => setShowOverview(true)}>
          View Workout Overview
        </Button>
      </div>

      {/* OPTIONS MODAL */}
      {showOptions && (
        <Modal title="Workout Options" onClose={() => setShowOptions(false)}>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>
              Switch Day
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
              {dayKeys.map((k) => {
                const active = k === plannedDay;
                return (
                  <button
                    key={k}
                    onClick={() => { onPlannedDayChange(k); setShowOptions(false); }}
                    style={{
                      padding: "12px",
                      background: active ? "var(--accent)" : "var(--bg)",
                      color: active ? "var(--accent-text)" : "var(--text)",
                      border: "var(--bw) solid var(--border)",
                      fontWeight: 950,
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>

            <div style={{ height: 12 }} />

            <Button icon="⏱️" onClick={resetSession}>
              Reset Session Timer
            </Button>

            <Button icon="←" variant="ghost" onClick={() => { haptic(); setShowOptions(false); onBack(); }}>
              Exit Workout
            </Button>
          </div>
        </Modal>
      )}

      {/* OVERVIEW MODAL */}
      {showOverview && (
        <Modal title="Workout Overview" onClose={() => setShowOverview(false)}>
          <div style={{ display: "grid", gap: 10 }}>
            {items.map((it, idx) => {
              const active = idx === i;
              const prevItem = idx > 0 ? items[idx - 1] : null;
              const showBlockHeader = it.fcBlock && (!prevItem || prevItem.fcBlock !== it.fcBlock);

              return (
                <React.Fragment key={it.id}>
                  {showBlockHeader && (
                    <div style={{
                      fontSize: 11,
                      fontWeight: 900,
                      opacity: 0.4,
                      textTransform: "uppercase",
                      padding: "8px 12px 4px",
                      marginTop: idx > 0 ? 8 : 0,
                    }}>
                      FC Block {it.fcBlock}
                    </div>
                  )}
                  <button
                    ref={active ? activeRef : undefined}
                    onClick={() => { setI(idx); setShowOverview(false); }}
                    style={{
                      textAlign: "left",
                      padding: 12,
                      background: active ? "var(--card2)" : "transparent",
                      border: active ? "var(--bw) solid var(--border)" : "1px solid var(--border-light)",
                      borderRadius: 0,
                      color: "var(--text)",
                    }}
                  >
                    <div style={{ fontWeight: 900 }}>{idx + 1}. {it.name}</div>
                    <div style={{ fontSize: 13, opacity: 0.7 }}>{it.dose} • {slotLabel[it.slot]}</div>
                  </button>
                </React.Fragment>
              );
            })}
          </div>
        </Modal>
      )}

      {selected ? <ExerciseDetails item={selected} todayISO={isoDate()} onClose={() => setSelected(null)} /> : null}

      {/* REST TIMER OVERLAY */}
      {showRestTimer && (
        <RestTimer
          seconds={restSeconds}
          nextExerciseName={pendingIdx !== null ? items[pendingIdx]?.name : items[i + 1]?.name}
          blockLabel={activeItem ? getFcBlockLabel(activeItem, items) : undefined}
          onSkip={onRestSkip}
          onComplete={onRestComplete}
        />
      )}
    </Screen>
  );
}

function ExerciseDetails({
  item,
  todayISO,
  onClose,
}: {
  item: WorkoutItem;
  todayISO: string;
  onClose: () => void;
}) {
  const lastLoad = React.useMemo(() => getLoadFor(item.id), [item.id]);
  const [load, setLoad] = React.useState<string>(lastLoad);

  const save = () => {
    const trimmed = load.trim();
    if (trimmed.length > 0) {
      setLoadFor(item.id, trimmed);
    }
    onClose();
  };

  return (
    <Modal title={item.name} onClose={onClose}>
      <div style={{ display: "grid", gap: 12, color: "var(--text)" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Load Tracking</div>

          <div style={{ fontSize: 14, fontWeight: 950 }}>
            {lastLoad ? `Previously: ${lastLoad}` : "No previous load"}
          </div>

          <input
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder='e.g. "50 lb", "24kg", "BW"'
            inputMode="text"
            style={{
              width: "100%",
              padding: "16px 12px",
              borderRadius: "var(--radius)",
              border: "var(--bw) solid var(--border)",
              background: "var(--card2)",
              color: "var(--text)",
              fontSize: 15,
              fontWeight: 950,
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "grid", gap: 12, marginTop: 12 }}>
            <Button onClick={save}>Save Load</Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </div>
        </div>

        <div style={{ borderTop: "var(--bw) solid var(--border)", margin: "8px 0" }} />

        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Equipment</div>
          <div style={{ fontSize: 15, fontWeight: 900 }}>{item.equipment ?? "No equipment listed"}</div>
        </div>

        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Instructions</div>
          <div style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 700, whiteSpace: "pre-wrap" }}>
            {item.description ?? "No description available."}
          </div>
        </div>

        {item.howTo && (
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>How To</div>
            <div style={{ fontSize: 15, lineHeight: 1.6, fontWeight: 600, whiteSpace: "pre-wrap" }}>
              {item.howTo}
            </div>
            {item.howToImage && (
              <img src={item.howToImage} alt="Exercise demo" style={{ width: "100%", marginTop: 8 }} />
            )}
          </div>
        )}
      </div>
    </Modal>
  );
}
