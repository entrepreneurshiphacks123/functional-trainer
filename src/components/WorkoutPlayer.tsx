import React from "react";
import { Card, Screen, Button } from "../ui/Primitives";
import { getLoadFor, setLoadFor } from "../engine/loadLog";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
  dose: string;

  equipment?: string;
  description?: string;
  hint?: string;

  // Optional override (if you ever want it per exercise)
  restSec?: number;
};

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
};

function isoDate() {
  return new Date().toISOString().slice(0, 10);
}

function formatMMSS(totalSec: number) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// time-based if dose mentions min/sec AND does not include ×
function parseTimedSeconds(dose: string): number | null {
  const d = dose.toLowerCase();

  if (d.includes("×")) return null;

  const minMatch = d.match(/(\d+)\s*(?:–|-)?\s*(\d+)?\s*min/);
  if (minMatch) {
    const a = Number(minMatch[1]);
    const b = minMatch[2] ? Number(minMatch[2]) : a;
    const avg = Math.round((a + b) / 2);
    return avg * 60;
  }

  const secMatch = d.match(
    /(\d+)\s*(?:–|-)?\s*(\d+)?\s*(?:s|sec|secs|second|seconds)\b/
  );
  if (secMatch) {
    const a = Number(secMatch[1]);
    const b = secMatch[2] ? Number(secMatch[2]) : a;
    return Math.round((a + b) / 2);
  }

  return null;
}

function isRepBased(dose: string) {
  const d = dose.toLowerCase();
  return (
    d.includes("×") ||
    d.includes("sets") ||
    d.includes("/side") ||
    d.includes("carries") ||
    d.includes("runs")
  );
}

function defaultRestForSlot(slot: WorkoutItem["slot"]) {
  if (slot === "strength") return 60;
  if (slot === "athletic") return 45;
  return 0;
}

// ------- Persist current position + timer -------
const WP_KEY = "wp_state_v2";
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
    // not supported everywhere; harmless if absent
    if (navigator.vibrate) navigator.vibrate(10);
  } catch {}
}

// ------- Modal (fixed: scrollable, safe-area, sticky header) -------
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
          // Safe height + internal scrolling (fixes cutoff)
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
            padding:
              "12px 14px calc(10px + env(safe-area-inset-bottom, 0px))",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 900,
              letterSpacing: "-0.01em",
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
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
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default function WorkoutPlayer({
  dayLabel,
  modeLabel,
  items,
  onDone,
}: {
  dayLabel: string;
  modeLabel: string;
  items: WorkoutItem[];
  onDone: () => void;
}) {
  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState<WorkoutItem | null>(null);

  const activeItem = items[i];

  // Timer state
  const [running, setRunning] = React.useState(false);
  const [remaining, setRemaining] = React.useState(60);

  // Auto-scroll active into view
  const activeRef = React.useRef<HTMLButtonElement | null>(null);
  React.useEffect(() => {
    activeRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [i]);

  // Restore state on mount / when items change
  React.useEffect(() => {
    const saved = loadWP();
    if (!saved) return;

    if (saved.sig !== itemsSig(items)) return;

    if (typeof saved.i === "number") {
      const safe = Math.max(0, Math.min(items.length - 1, saved.i));
      setI(safe);
    }
    if (typeof saved.remaining === "number") setRemaining(saved.remaining);

    // Restore paused (native feel: no surprise running timer)
    setRunning(false);
  }, [items]);

  // Persist state
  React.useEffect(() => {
    saveWP({
      sig: itemsSig(items),
      i,
      remaining,
      running, // stored but not auto-resumed
      ts: Date.now(),
    });
  }, [items, i, remaining, running]);

  // Set timer defaults when active changes
  React.useEffect(() => {
    if (!activeItem) return;

    const timed = parseTimedSeconds(activeItem.dose);
    if (timed) {
      setRemaining(timed);
      setRunning(false);
      return;
    }

    const rep = isRepBased(activeItem.dose);
    const rest = activeItem.restSec ?? (rep ? 60 : defaultRestForSlot(activeItem.slot));
    if (rest > 0) setRemaining(rest);
    setRunning(false);
  }, [activeItem?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tick
  React.useEffect(() => {
    if (!running) return;

    const t = window.setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          const timed = activeItem ? parseTimedSeconds(activeItem.dose) : null;
          if (timed) return 0; // timed ends

          const rep = activeItem ? isRepBased(activeItem.dose) : true;
          const rest =
            activeItem?.restSec ??
            (rep ? 60 : defaultRestForSlot(activeItem?.slot ?? "strength"));
          return rest; // loop for rest timers
        }
        return r - 1;
      });
    }, 1000);

    return () => window.clearInterval(t);
  }, [running, activeItem]);

  const showRestTimer = activeItem
    ? isRepBased(activeItem.dose) && (activeItem.restSec ?? 60) > 0
    : false;

  const timedSeconds = activeItem ? parseTimedSeconds(activeItem.dose) : null;
  const showTimedTimer = timedSeconds !== null && timedSeconds > 0;

  const goNext = () => {
    haptic();
    setRunning(false);
    setI((x) => Math.min(items.length - 1, x + 1));
  };

  const goBack = () => {
    haptic();
    setRunning(false);
    setI((x) => Math.max(0, x - 1));
  };

  return (
    <Screen title={`${dayLabel} ${modeLabel}`}>
      <Card>
        <div style={{ display: "grid", gap: 10, padding: "0 4px" }}>
          {items.map((it, idx) => {
            const active = idx === i;

            return (
              <button
                ref={active ? activeRef : null}
                key={it.id}
                onClick={() => setSelected(it)}
                style={{
                  textAlign: "left",
                  width: "100%",
                  maxWidth: "100%",
                  border: active
                    ? "1px solid rgba(124,92,255,0.72)"
                    : "1px solid var(--border)",
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 14,
                    alignItems: "baseline",
                  }}
                >
                  <div
                    style={{
                      fontSize: active ? 18 : 16,
                      fontWeight: 900,
                      opacity: active ? 1 : 0.74,
                      letterSpacing: "-0.01em",
                      minWidth: 0,
                    }}
                  >
                    {it.name}
                  </div>

                  <div
                    style={{
                      fontSize: active ? 18 : 16,
                      fontWeight: 900,
                      opacity: active ? 1 : 0.74,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {it.dose}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
                  <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.45 }}>
                    {slotLabel[it.slot]}
                  </div>
                  <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.45 }}>
                    {it.hint ? it.hint : "Tap for details"}
                  </div>
                </div>

                {/* Timer panel only on active */}
                {active && (showRestTimer || showTimedTimer) ? (
                  <div
                    style={{
                      marginTop: 10,
                      padding: "10px 10px",
                      borderRadius: 14,
                      border: "1px solid rgba(255,255,255,0.08)",
                      background: "rgba(255,255,255,0.03)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <div style={{ display: "grid", gap: 2 }}>
                      <div style={{ fontSize: 12, opacity: 0.65 }}>
                        {showTimedTimer ? "Timer" : "Rest"}
                      </div>
                      <div style={{ fontSize: 18, fontWeight: 950, letterSpacing: "-0.01em" }}>
                        {formatMMSS(remaining)}
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8 }}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          haptic();
                          setRunning((r) => !r);
                        }}
                        style={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          background: "var(--card2)",
                          color: "var(--text)",
                          padding: "10px 12px",
                          fontSize: 14,
                          fontWeight: 900,
                          cursor: "pointer",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        {running ? "Pause" : "Start"}
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          haptic();
                          setRunning(false);

                          const timed = parseTimedSeconds(it.dose);
                          if (timed) setRemaining(timed);
                          else {
                            const rep = isRepBased(it.dose);
                            const rest =
                              it.restSec ?? (rep ? 60 : defaultRestForSlot(it.slot));
                            setRemaining(rest);
                          }
                        }}
                        style={{
                          borderRadius: 12,
                          border: "1px solid var(--border)",
                          background: "transparent",
                          color: "var(--text)",
                          padding: "10px 12px",
                          fontSize: 14,
                          fontWeight: 900,
                          cursor: "pointer",
                          WebkitTapHighlightColor: "transparent",
                        }}
                      >
                        Reset
                      </button>
                    </div>
                  </div>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Sticky controls */}
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
              <Button icon="✅" onClick={onDone}>
                Done
              </Button>
            )}

            {i > 0 ? (
              <Button icon="←" variant="ghost" onClick={goBack}>
                Back
              </Button>
            ) : null}
          </div>
        </div>
      </Card>

      {selected ? (
        <ExerciseDetails
          item={selected}
          todayISO={isoDate()}
          onClose={() => setSelected(null)}
        />
      ) : null}
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
      <div style={{ display: "grid", gap: 12 }}>
        {/* Load logging */}
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Load</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              alignItems: "baseline",
            }}
          >
            <div style={{ fontSize: 14, fontWeight: 900 }}>
              {last.lastLoad ? `Last: ${last.lastLoad}` : "Last: —"}
            </div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>
              {last.lastDateISO ? last.lastDateISO : ""}
            </div>
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
              fontWeight: 800,
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

        {/* Equipment */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            alignItems: "baseline",
          }}
        >
          <div style={{ fontSize: 13, opacity: 0.65 }}>Equipment</div>
          <div style={{ fontSize: 14, fontWeight: 900, textAlign: "right" }}>
            {item.equipment ?? "—"}
          </div>
        </div>

        {/* Description */}
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>How</div>
          <div
            style={{
              fontSize: 14,
              lineHeight: 1.55,
              fontWeight: 700,
              whiteSpace: "pre-wrap",
            }}
          >
            {item.description ?? "—"}
          </div>
        </div>
      </div>
    </Modal>
  );
}
