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

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
};

function isoDate() {
  // IMPORTANT: local YYYY-MM-DD (prevents date shifting / calendar bugs)
  return toLocalDateKey(new Date());
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

// Small hook: treat narrow screens as “mobile”
function useIsNarrow(breakpointPx = 680) {
  const [isNarrow, setIsNarrow] = React.useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpointPx}px)`).matches;
  });

  React.useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpointPx}px)`);
    const handler = () => setIsNarrow(mq.matches);

    // Safari compatibility
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

// ------- Modal (scrollable, safe-area, sticky header) -------
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
  // Narrow = stack timer above list. Otherwise: timer takes ~1/3 width.
  // Keep the horizontal split (timer = 1/3 width) until fairly narrow screens.
  const isNarrow = useIsNarrow(680);

  const [i, setI] = React.useState(0);
  const [selected, setSelected] = React.useState<WorkoutItem | null>(null);

  // Session timer
  const [startedAt, setStartedAt] = React.useState<number | null>(null); // epoch ms
  const [elapsedSec, setElapsedSec] = React.useState(0);

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

    if (typeof saved.startedAt === "number") setStartedAt(saved.startedAt);
    if (typeof saved.elapsedSec === "number") setElapsedSec(saved.elapsedSec);
  }, [items]);

  // Tick session timer
  React.useEffect(() => {
    if (!startedAt) return;

    const t = window.setInterval(() => {
      const now = Date.now();
      const sec = Math.max(0, Math.floor((now - startedAt) / 1000));
      setElapsedSec(sec);
    }, 500);

    return () => window.clearInterval(t);
  }, [startedAt]);

  // Persist state
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
    // “Starts when I start the first workout” = first real action.
    // Next always starts the session if it isn’t already running.
    startSessionIfNeeded();
    setI((x) => Math.min(items.length - 1, x + 1));
  };

  const goBack = () => {
    haptic();
    setI((x) => Math.max(0, x - 1));
  };

  const activeItem = items[i];

  return (
    <Screen title={`${dayLabel} ${modeLabel}`}>
      {/* Day selector (no label) */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', margin: '10px 0 12px' }}>
        {dayKeys.map((k) => {
          const active = k === plannedDay;
          return (
            <button
              key={k}
              type="button"
              aria-label={`Select Day ${k}`}
              onClick={() => onPlannedDayChange(k)}
              style={{
                padding: '10px 14px',
                borderRadius: 999,
                border: active ? '1px solid rgba(124,92,255,0.85)' : '1px solid var(--border)',
                background: active ? 'rgba(124,92,255,0.14)' : 'var(--card)',
                fontWeight: 950,
                cursor: 'pointer',
                minWidth: 48,
                textAlign: 'center',
              }}
            >
              {k}
            </button>
          );
        })}
      </div>
      <Card>
        {/* Layout: timer is a constant 1/3 screen panel (desktop/tablet) */}
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

              // On mobile: keep it compact; on desktop: allow sticky panel
              height: isNarrow ? "auto" : "calc(100vh - 140px)",
              minHeight: isNarrow ? 220 : 420,
              maxHeight: isNarrow ? 360 : 820,
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div style={{ display: "grid", gap: 6 }}>
              <div style={{ fontSize: 12, opacity: 0.65 }}>Session</div>
              <div
                style={{
                  fontSize: isNarrow ? 44 : 56,
                  fontWeight: 950,
                  letterSpacing: "-0.02em",
                  lineHeight: 1.02,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {formatHMMSS(elapsedSec)}
              </div>

              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 6 }}>
                <button
                  onClick={() => {
                    haptic();
                    startSessionIfNeeded();
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
                    boxSizing: "border-box",
                  }}
                >
                  {startedAt ? "Running" : "Start"}
                </button>

                <button
                  onClick={resetSession}
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
                    boxSizing: "border-box",
                  }}
                >
                  Reset
                </button>
              </div>
            </div>

            {/* CURRENT EXERCISE PREVIEW (helps this panel feel “worth” 1/3 of screen) */}
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

          {/* RIGHT SIDE: workout list + sticky controls */}
          <div style={{ minWidth: 0 }}>
            {/* Full workout list, current exercise highlighted */}
            <div style={{ display: "grid", gap: 10, padding: "0 4px" }}>
              {items.map((it, idx) => {
                const active = idx === i;

                return (
                  <button
                    ref={active ? activeRef : null}
                    key={it.id}
                    onClick={() => {
                      // Allow jumping/selecting any exercise directly
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
                          fontWeight: 950,
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
                          fontWeight: 950,
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
                      <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.45 }}>{slotLabel[it.slot]}</div>
                      <div style={{ fontSize: 13, opacity: active ? 0.62 : 0.45 }}>{it.hint ? it.hint : "Tap for details"}</div>
                    </div>
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
                  <Button
                    icon="✅"
                    onClick={() => {
                      haptic();
                      onDone();
                    }}
                  >
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
      <div style={{ display: "grid", gap: 12 }}>
        {/* Load */}
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Load</div>

          <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
            <div style={{ fontSize: 14, fontWeight: 950 }}>{last.lastLoad ? `Last: ${last.lastLoad}` : "Last: —"}</div>
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

        {/* Equipment */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "baseline" }}>
          <div style={{ fontSize: 13, opacity: 0.65 }}>Equipment</div>
          <div style={{ fontSize: 14, fontWeight: 950, textAlign: "right" }}>{item.equipment ?? "—"}</div>
        </div>

        {/* Description */}
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