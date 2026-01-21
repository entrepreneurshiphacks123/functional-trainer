import React from "react";
import { Card, Screen, Button } from "../ui/Primitives";
import { getLoadFor, setLoadFor } from "../engine/loadLog";
import { toLocalDateKey } from "../utils/date";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
  dose: string;

  equipment?: string;
  description?: string;
  hint?: string;
};

export type WorkoutData = {
  day: string; // "A","B","C","D" etc
  items: WorkoutItem[];
};

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
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
  } catch {}
}

// iOS haptic (when supported)
function haptic() {
  try {
    if (navigator.vibrate) navigator.vibrate(10);
  } catch {}
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

// ------- Modal -------
function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        display: "grid",
        alignItems: "end",
        padding: "12px",
        zIndex: 50,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 18,
          width: "100%",
          maxWidth: 560,
          margin: "0 auto",
          maxHeight: "min(78vh, 720px)",
          overflow: "hidden",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 2,
            background: "var(--card)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 14px",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 16, fontWeight: 950, letterSpacing: "-0.01em" }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--card2)",
              color: "var(--text)",
              padding: "8px 10px",
              fontSize: 14,
              fontWeight: 850,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Close
          </button>
        </div>

        <div
          style={{
            padding: 14,
            paddingBottom: "max(14px, env(safe-area-inset-bottom))",
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            color: "var(--text)",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
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

  // Session timer
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = React.useState(0);

  const activeRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [i]);

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

  const startSessionIfNeeded = React.useCallback(() => {
    if (startedAt) return;
    setStartedAt(Date.now());
    setElapsedSec(0);
  }, [startedAt]);

  const resetSession = () => {
    haptic();
    setStartedAt(null);
    setElapsedSec(0);
  };

  const goNext = () => {
    haptic();
    startSessionIfNeeded();
    setI((x) => Math.min(items.length - 1, x + 1));
  };

  const goBackIdx = () => {
    haptic();
    setI((x) => Math.max(0, x - 1));
  };

  const activeItem = items[i];

  // Header should show only the workout title (plan/day).
  // The day letter is shown in the Day picker button, so we avoid repeating it here.
  const wl = (workoutLabel ?? "").trim();
  const ml = (modeLabel ?? "").trim();
  const screenTitle = wl ? [wl, ml].filter(Boolean).join(" ") : ml || "Workout";

  return (
    <Screen title={screenTitle}>
      {/* Day pills only */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", margin: "10px 0 12px" }}>
        {(Array.isArray(dayKeys) ? dayKeys : ["A", "B", "C", "D"]).map((k) => {
          const active = k === plannedDay;
          return (
            <button
              key={k}
              type="button"
              aria-label={`Select Day ${k}`}
              onClick={() => onPlannedDayChange(k)}
              style={{
                padding: "10px 14px",
                borderRadius: 999,
                border: active ? "1px solid rgba(124,92,255,0.85)" : "1px solid var(--border)",
                background: active ? "rgba(124,92,255,0.14)" : "var(--card)",
                color: "var(--text)",
                fontWeight: 950,
                cursor: "pointer",
                minWidth: 48,
                textAlign: "center",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              {k}
            </button>
          );
        })}

        <div style={{ flex: 1 }} />

        <button
          type="button"
          onClick={onBack}
          style={{
            padding: "10px 14px",
            borderRadius: 999,
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--text)",
            fontWeight: 900,
            cursor: "pointer",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          ←
        </button>
      </div>

      <Card>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isNarrow ? "1fr" : "1fr 2fr", // EXACT 1/3 vs 2/3
            gap: 12,
          }}
        >
          {/* TIMER PANEL */}
          <div
            style={{
              borderRadius: 18,
              border: "1px solid var(--border)",
              background: "var(--card2)",
              padding: "14px 14px",
              position: "sticky",
              top: 10,
              alignSelf: "start",
              boxSizing: "border-box",
              height: isNarrow ? "auto" : "calc(100vh - 140px)",
              minHeight: isNarrow ? 220 : 420,
              maxHeight: isNarrow ? 360 : 820,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
              color: "var(--text)",
            }}
          >
            {/* BIG TIMER + SIDE BUTTONS */}
            <div
              style={{
                display: "flex",
                alignItems: "stretch",
                justifyContent: "space-between",
                gap: 12,
              }}
            >
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, opacity: 0.65 }}>Session</div>
                <div
                  style={{
                    fontSize: isNarrow ? 54 : 68,
                    fontWeight: 950,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.0,
                    fontVariantNumeric: "tabular-nums",
                    marginTop: 4,
                  }}
                >
                  {formatHMMSS(elapsedSec)}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gap: 8,
                  alignContent: "start",
                  minWidth: 110,
                }}
              >
                <button
                  onClick={() => {
                    haptic();
                    startSessionIfNeeded();
                  }}
                  style={{
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text)",
                    padding: "12px 12px",
                    fontSize: 14,
                    fontWeight: 950,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {startedAt ? "Running" : "Start"}
                </button>

                <button
                  onClick={resetSession}
                  style={{
                    borderRadius: 14,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    color: "var(--text)",
                    padding: "12px 12px",
                    fontSize: 14,
                    fontWeight: 950,
                    cursor: "pointer",
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* CURRENT EXERCISE PREVIEW */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: 12,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
                <div style={{ fontSize: 12, opacity: 0.65 }}>Now</div>
                <div style={{ fontSize: 12, opacity: 0.65, textAlign: "right" }}>
                  {i + 1}/{items.length}
                </div>
              </div>

              <div style={{ fontSize: 16, fontWeight: 950, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                {activeItem?.name ?? "—"}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                <div style={{ fontSize: 13, opacity: 0.6 }}>{activeItem ? slotLabel[activeItem.slot] : "—"}</div>
                <div style={{ fontSize: 13, opacity: 0.6, textAlign: "right" }}>{activeItem?.dose ?? ""}</div>
              </div>

              <div style={{ fontSize: 12, opacity: 0.55, lineHeight: 1.35 }}>
                {startedAt ? "Timer is running for the whole session." : "Timer starts when you hit Start or Next."}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div style={{ minWidth: 0, color: "var(--text)" }}>
            <div style={{ display: "grid", gap: 10, padding: "0 4px" }}>
              {items.map((it, idx) => {
                const active = idx === i;

                return (
                  <button
                    ref={active ? activeRef : null}
                    key={it.id}
                    onClick={() => {
                      setI(idx);
                      setSelected(it);
                    }}
                    style={{
                      textAlign: "left",
                      width: "100%",
                      maxWidth: "100%",
                      border: active ? "1px solid rgba(124,92,255,0.72)" : "1px solid var(--border)",
                      background: active ? "var(--card2)" : "transparent",
                      borderRadius: 16,
                      padding: active ? "16px 14px" : "12px 12px",
                      cursor: "pointer",
                      transform: active ? "scale(1.01)" : "scale(1)",
                      transformOrigin: "center",
                      boxShadow: active ? "0 0 0 3px rgba(124,92,255,0.14)" : "none",
                      boxSizing: "border-box",
                      transition:
                        "transform 160ms ease, background 160ms ease, padding 160ms ease, box-shadow 160ms ease, border-color 160ms ease",
                      WebkitTapHighlightColor: "transparent",
                      color: "var(--text)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "baseline" }}>
                      <div
                        style={{
                          fontSize: active ? 18 : 16,
                          fontWeight: 950,
                          opacity: active ? 1 : 0.84,
                          letterSpacing: "-0.01em",
                          minWidth: 0,
                        }}
                      >
                        {it.name}
                      </div>

                      <div
                        style={{
                          fontSize: active ? 18 : 16,
                          fontWeight: 950,
                          opacity: active ? 1 : 0.84,
                          letterSpacing: "-0.01em",
                          whiteSpace: "nowrap",
                          flexShrink: 0,
                        }}
                      >
                        {it.dose}
                      </div>
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                      <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.55 }}>{slotLabel[it.slot]}</div>
                      <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.55 }}>
                        {it.hint ? it.hint : "Tap for details"}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                position: "sticky",
                bottom: 10,
                marginTop: 14,
                paddingTop: 10,
                paddingBottom: 2,
                background: "var(--card)",
              }}
            >
              <div style={{ display: "grid", gap: 10, padding: "0 4px" }}>
                {i < items.length - 1 ? (
                  <Button icon="➡️" onClick={goNext}>
                    Next
                  </Button>
                ) : (
                  <Button
                    icon="✅"
                    onClick={() => {
                      haptic();
                      onFinish();
                    }}
                  >
                    Done
                  </Button>
                )}

                {i > 0 ? (
                  <Button icon="←" variant="ghost" onClick={goBackIdx}>
                    Back
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {selected ? <ExerciseDetails item={selected} todayISO={isoDate()} onClose={() => setSelected(null)} /> : null}
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
  const last = React.useMemo(() => getLoadFor(item.id), [item.id]);
  const [load, setLoad] = React.useState<string>(last.lastLoad ?? "");

  const save = () => {
    const trimmed = load.trim();
    if (trimmed.length > 0) {
      setLoadFor(item.id, trimmed, todayISO);
    }
    onClose();
  };

  return (
    <Modal title={item.name} onClose={onClose}>
      <div style={{ display: "grid", gap: 12, color: "var(--text)" }}>
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Load</div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <div style={{ fontSize: 14, fontWeight: 950 }}>
              {last.lastLoad ? `Last: ${last.lastLoad}` : "Last: —"}
            </div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{last.lastDateISO ? last.lastDateISO : ""}</div>
          </div>

          <input
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            placeholder='e.g. "50 lb", "24kg", "BW"'
            inputMode="text"
            style={{
              width: "100%",
              padding: "12px 12px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--card2)",
              color: "var(--text)",
              fontSize: 15,
              fontWeight: 850,
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <div style={{ display: "grid", gap: 8 }}>
            <button
              onClick={save}
              style={{
                width: "100%",
                borderRadius: 14,
                padding: "12px 12px",
                border: "1px solid rgba(255,255,255,0.10)",
                background: "var(--accent)",
                color: "#FFFFFF",
                fontSize: 15,
                fontWeight: 950,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                boxSizing: "border-box",
              }}
            >
              Save
            </button>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                borderRadius: 14,
                padding: "12px 12px",
                border: "1px solid var(--border)",
                background: "var(--card2)",
                color: "var(--text)",
                fontSize: 15,
                fontWeight: 900,
                cursor: "pointer",
                WebkitTapHighlightColor: "transparent",
                boxSizing: "border-box",
              }}
            >
              Cancel
            </button>
          </div>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", opacity: 0.7 }} />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Equipment</div>
          <div style={{ fontSize: 14, fontWeight: 950, textAlign: "right" }}>{item.equipment ?? "—"}</div>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>How</div>
          <div style={{ fontSize: 14, lineHeight: 1.55, fontWeight: 750, whiteSpace: "pre-wrap" }}>
            {item.description ?? "—"}
          </div>
        </div>
      </div>
    </Modal>
  );
}
