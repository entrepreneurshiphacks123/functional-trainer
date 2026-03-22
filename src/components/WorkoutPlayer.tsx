import React from "react";
import { Card, Screen, Button, TinyIconButton, Modal } from "../ui/Primitives";
import { getLoadFor, setLoadFor, getAllLoads } from "../engine/loadLog";
import { pad2, toLocalDateKey } from "../utils/date";
import { WorkoutItem, WorkoutData } from "../../types/WorkoutItem";

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  fc_block: "French Contrast",
  individual: "Individual",
  accessory: "Accessory",
  finisher: "Finisher",
  cooldown: "Cooldown",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
};

function isoDate() {
  return toLocalDateKey(new Date());
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

function haptic() {
  try {
    if (navigator.vibrate) navigator.vibrate(10);
  } catch { }
}

// FC position colors — visual scan at a glance
const FC_POSITION_COLORS: Record<number, string> = {
  1: "#e74c3c", // heavy compound — red
  2: "#e67e22", // force plyo — orange
  3: "#f1c40f", // speed-strength — yellow
  4: "#2ecc71", // speed plyo — green
};

const FC_POSITION_LABELS: Record<number, string> = {
  1: "Heavy",
  2: "Plyo",
  3: "Speed",
  4: "Reactive",
};

// ------- Group items into "screens" -------
// Each screen is either a single item or a group of FC block items
type WorkoutScreen = {
  type: "single" | "fc_block" | "finisher";
  label: string;
  items: WorkoutItem[];
  restNote?: string; // e.g. "Rest 2-3 min"
  roundCount?: number; // for finisher
};

function buildScreens(items: WorkoutItem[]): WorkoutScreen[] {
  const screens: WorkoutScreen[] = [];
  let idx = 0;

  while (idx < items.length) {
    const item = items[idx];

    // Group warmup items together
    if (item.slot === "prep") {
      const prepItems: WorkoutItem[] = [];
      while (idx < items.length && items[idx].slot === "prep") {
        prepItems.push(items[idx]);
        idx++;
      }
      screens.push({
        type: "single",
        label: "Warm-up",
        items: prepItems,
      });
      continue;
    }

    // Group accessory items together
    if (item.slot === "accessory") {
      const accItems: WorkoutItem[] = [];
      while (idx < items.length && items[idx].slot === "accessory") {
        accItems.push(items[idx]);
        idx++;
      }
      screens.push({
        type: "single",
        label: "Accessory",
        items: accItems,
      });
      continue;
    }

    // Group FC block items together
    if (item.slot === "fc_block" && item.fcBlock) {
      const blockNum = item.fcBlock;
      const blockItems: WorkoutItem[] = [];
      while (idx < items.length && items[idx].slot === "fc_block" && items[idx].fcBlock === blockNum) {
        blockItems.push(items[idx]);
        idx++;
      }
      // Check if next screen is also an FC block (meaning we need rest between)
      const nextItem = idx < items.length ? items[idx] : null;
      const restNote = nextItem?.slot === "fc_block" ? "Rest 2-3 min before next block" : undefined;

      const totalBlocks = [...new Set(items.filter((x) => x.fcBlock).map((x) => x.fcBlock!))].length;
      screens.push({
        type: "fc_block",
        label: `French Contrast ${blockNum} of ${totalBlocks}`,
        items: blockItems,
        restNote,
      });
      continue;
    }

    // Group finisher items together
    if (item.slot === "finisher") {
      const finisherItems: WorkoutItem[] = [];
      while (idx < items.length && items[idx].slot === "finisher") {
        finisherItems.push(items[idx]);
        idx++;
      }
      const rounds = finisherItems[0]?.finisherRounds ?? 3;
      screens.push({
        type: "finisher",
        label: `Finisher — ${rounds} rounds`,
        items: finisherItems,
        restNote: "30s rest between rounds",
        roundCount: rounds,
      });
      continue;
    }

    // Single item screen
    screens.push({
      type: "single",
      label: slotLabel[item.slot] ?? item.slot,
      items: [item],
    });
    idx++;
  }

  return screens;
}

// Collect unique equipment with saved weights
function collectEquipmentWithLoads(items: WorkoutItem[]): { name: string; weights: string[] }[] {
  const loads = getAllLoads();
  const equipMap = new Map<string, Set<string>>();

  for (const item of items) {
    if (item.equipment) {
      const parts = item.equipment.split(/\s*[+,]\s*/);
      for (const p of parts) {
        const trimmed = p.trim();
        if (trimmed && trimmed.toLowerCase() !== "none") {
          if (!equipMap.has(trimmed)) equipMap.set(trimmed, new Set());
          const savedLoad = loads[item.id];
          if (savedLoad) equipMap.get(trimmed)!.add(savedLoad);
        }
      }
    }
  }

  return [...equipMap.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, weights]) => ({ name, weights: [...weights].sort() }));
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
  const items = workout.items;
  const screens = React.useMemo(() => buildScreens(items), [items]);
  const equipment = React.useMemo(() => collectEquipmentWithLoads(items), [items]);
  const loads = React.useMemo(() => getAllLoads(), [items]);

  const [screenIdx, setScreenIdx] = React.useState(0);
  const [selected, setSelected] = React.useState<WorkoutItem | null>(null);
  const [showOptions, setShowOptions] = React.useState(false);
  const [showOverview, setShowOverview] = React.useState(false);
  const [showEquipment, setShowEquipment] = React.useState(false);

  // Session timer
  const [startedAt, setStartedAt] = React.useState<number | null>(null);
  const [elapsedSec, setElapsedSec] = React.useState(0);

  React.useEffect(() => {
    const saved = loadWP();
    if (!saved) return;
    if (saved.sig !== itemsSig(items)) return;
    if (typeof saved.screenIdx === "number") {
      setScreenIdx(Math.max(0, Math.min(screens.length - 1, saved.screenIdx)));
    }
    if (typeof saved.startedAt === "number") setStartedAt(saved.startedAt);
    if (typeof saved.elapsedSec === "number") setElapsedSec(saved.elapsedSec);
  }, [items, screens.length]);

  React.useEffect(() => {
    if (!startedAt) return;
    const t = window.setInterval(() => {
      setElapsedSec(Math.max(0, Math.floor((Date.now() - startedAt) / 1000)));
    }, 500);
    return () => window.clearInterval(t);
  }, [startedAt]);

  React.useEffect(() => {
    saveWP({ sig: itemsSig(items), screenIdx, startedAt, elapsedSec, ts: Date.now() });
  }, [items, screenIdx, startedAt, elapsedSec]);

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
    setScreenIdx((x) => Math.min(screens.length - 1, x + 1));
  };

  const goBack = () => {
    haptic();
    setScreenIdx((x) => Math.max(0, x - 1));
  };

  // Swipe navigation
  const touchStartX = React.useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(diff) < 60) return; // min swipe distance
    if (diff < 0 && screenIdx < screens.length - 1) animatedGoNext();
    if (diff > 0 && screenIdx > 0) animatedGoBack();
  };

  // Swipe animation
  const [slideDir, setSlideDir] = React.useState<"left" | "right" | null>(null);
  const [animating, setAnimating] = React.useState(false);

  const animatedGoNext = () => {
    if (animating || screenIdx >= screens.length - 1) return;
    haptic();
    startSessionIfNeeded();
    setSlideDir("left");
    setAnimating(true);
    setTimeout(() => {
      setScreenIdx((x) => Math.min(screens.length - 1, x + 1));
      setSlideDir(null);
      setAnimating(false);
    }, 200);
  };

  const animatedGoBack = () => {
    if (animating || screenIdx <= 0) return;
    haptic();
    setSlideDir("right");
    setAnimating(true);
    setTimeout(() => {
      setScreenIdx((x) => Math.max(0, x - 1));
      setSlideDir(null);
      setAnimating(false);
    }, 200);
  };

  const screen = screens[screenIdx];
  const screenTitle = workoutLabel
    ? `Day ${plannedDay} — ${workoutLabel}`
    : modeLabel || "Workout";

  const slideStyle: React.CSSProperties = slideDir
    ? {
        transform: slideDir === "left" ? "translateX(-30px)" : "translateX(30px)",
        opacity: 0.3,
        transition: "transform 0.2s ease, opacity 0.2s ease",
      }
    : {
        transform: "translateX(0)",
        opacity: 1,
        transition: "transform 0.2s ease, opacity 0.2s ease",
      };

  return (
    <Screen
      title={screenTitle}
      right={
        <TinyIconButton label="•••" onClick={() => setShowOptions(true)} />
      }
    >
      <div
        style={{ display: "grid", gap: 16 }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* SESSION TIMER */}
        <Card
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "32px 20px",
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, marginBottom: 8, textTransform: "uppercase" }}>
            Session Time
          </div>
          <div
            style={{
              fontSize: 72,
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
                padding: "12px 28px",
                fontWeight: 950,
                textTransform: "uppercase",
                fontSize: 16,
              }}
            >
              Start Workout
            </button>
          )}
        </Card>

        {/* CURRENT SCREEN */}
        <Card title={screen.label} style={slideStyle}>
          <div style={{ display: "grid", gap: 0 }}>
            {screen.items.map((item, idx) => {
              const posColor = screen.type === "fc_block" && item.fcPosition
                ? FC_POSITION_COLORS[item.fcPosition]
                : undefined;
              const posLabel = screen.type === "fc_block" && item.fcPosition
                ? FC_POSITION_LABELS[item.fcPosition]
                : undefined;

              return (
                <div
                  key={item.id}
                  style={{
                    padding: "10px 0 10px 12px",
                    borderTop: idx > 0 ? "1px solid var(--border-light, rgba(255,255,255,0.1))" : "none",
                    borderLeft: posColor ? `3px solid ${posColor}` : "3px solid transparent",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span
                          style={{ fontSize: 17, fontWeight: 950, lineHeight: 1.2, cursor: "pointer" }}
                          onClick={() => { haptic(); setSelected(item); }}
                        >
                          {item.name}
                        </span>
                        {posLabel && (
                          <span style={{
                            fontSize: 10,
                            fontWeight: 900,
                            textTransform: "uppercase",
                            color: posColor,
                            opacity: 0.8,
                            letterSpacing: "0.03em",
                          }}>
                            {posLabel}
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.6, marginTop: 2 }}>
                        {item.dose}
                        {item.equipment && item.equipment.toLowerCase() !== "none" && (
                          <span> · {item.equipment}</span>
                        )}
                        {(() => {
                          const saved = loads[item.id];
                          const suggested = item.suggestedLoad;
                          if (saved) return <span style={{ color: "var(--accent, #7c5cff)", opacity: 1 }}> · {saved}</span>;
                          if (suggested) return <span style={{ fontStyle: "italic" }}> · ~{suggested}</span>;
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Rest note between blocks */}
            {screen.restNote && (
              <div style={{
                marginTop: 8,
                padding: "8px 12px",
                background: "var(--card2, rgba(255,255,255,0.05))",
                border: "1px solid var(--border-light, rgba(255,255,255,0.1))",
                fontSize: 13,
                fontWeight: 800,
                opacity: 0.7,
                textAlign: "center",
              }}>
                {screen.restNote}
              </div>
            )}

            {/* FC block rest between exercises note */}
            {screen.type === "fc_block" && (
              <div style={{ fontSize: 12, opacity: 0.5, marginTop: 8, textAlign: "center" }}>
                ~20s rest between exercises within block
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div style={{ marginTop: 12 }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 11,
              fontWeight: 800,
              opacity: 0.5,
              marginBottom: 4,
              textTransform: "uppercase",
            }}>
              <span>{screenIdx + 1} of {screens.length}</span>
              <span>{Math.round(((screenIdx + 1) / screens.length) * 100)}%</span>
            </div>
            <div style={{ width: "100%", height: 3, background: "var(--border-light, rgba(0,0,0,0.1))", borderRadius: 2 }}>
              <div style={{
                width: `${((screenIdx + 1) / screens.length) * 100}%`,
                height: "100%",
                background: "var(--accent, #7c5cff)",
                borderRadius: 2,
                transition: "width 0.3s ease",
              }} />
            </div>
          </div>

          {/* What's next preview */}
          {screenIdx < screens.length - 1 && (
            <div style={{
              marginTop: 8,
              fontSize: 12,
              fontWeight: 700,
              opacity: 0.5,
              textAlign: "center",
            }}>
              Next: {screens[screenIdx + 1].label}
            </div>
          )}

          {/* Navigation */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            <Button icon="←" variant="ghost" onClick={animatedGoBack} disabled={screenIdx === 0}>
              Prev
            </Button>
            {screenIdx < screens.length - 1 ? (
              <Button icon="➡️" onClick={animatedGoNext}>
                Next
              </Button>
            ) : (
              <Button icon="✅" onClick={() => { haptic(); try { localStorage.removeItem("wp_state_v3"); } catch {} onFinish(); }}>
                Done
              </Button>
            )}
          </div>
        </Card>

        {/* OVERVIEW BUTTON */}
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
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${dayKeys.length}, 1fr)`, gap: 8 }}>
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
            {equipment.length > 0 && (
              <Button icon="🎒" variant="ghost" onClick={() => { setShowOptions(false); setShowEquipment(true); }}>
                Equipment List
              </Button>
            )}
            <Button icon="⏱️" variant="ghost" onClick={resetSession}>
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
          <div style={{ display: "grid", gap: 6 }}>
            {screens.map((s, idx) => {
              const active = idx === screenIdx;
              return (
                <button
                  key={idx}
                  onClick={() => { setScreenIdx(idx); setShowOverview(false); }}
                  style={{
                    textAlign: "left",
                    padding: 12,
                    background: active ? "var(--card2)" : "transparent",
                    border: active ? "var(--bw) solid var(--border)" : "1px solid var(--border-light)",
                    borderRadius: 0,
                    color: "var(--text)",
                  }}
                >
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{idx + 1}. {s.label}</div>
                  <div style={{ fontSize: 12, opacity: 0.6, marginTop: 2 }}>
                    {s.items.map((it) => it.name).join(" → ")}
                  </div>
                </button>
              );
            })}
          </div>
        </Modal>
      )}

      {/* EQUIPMENT LIST MODAL */}
      {showEquipment && (
        <Modal title="Equipment Needed" onClose={() => setShowEquipment(false)}>
          <div style={{ display: "grid", gap: 8 }}>
            {equipment.map((e) => (
              <div
                key={e.name}
                style={{
                  padding: "10px 14px",
                  background: "var(--card2)",
                  border: "1px solid var(--border-light)",
                }}
              >
                <div style={{ fontWeight: 900, fontSize: 15 }}>{e.name}</div>
                {e.weights.length > 0 && (
                  <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.6, marginTop: 2 }}>
                    {e.weights.join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Modal>
      )}

      {/* EXERCISE DETAIL MODAL */}
      {selected && (
        <ExerciseDetails item={selected} todayISO={isoDate()} onClose={() => setSelected(null)} />
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
            {lastLoad ? `Previously: ${lastLoad}` : item.suggestedLoad ? `Suggested: ~${item.suggestedLoad}` : "No previous load"}
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

        {item.equipment && (
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Equipment</div>
            <div style={{ fontSize: 15, fontWeight: 900 }}>{item.equipment}</div>
          </div>
        )}

        {item.description && (
          <div style={{ display: "grid", gap: 4 }}>
            <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Instructions</div>
            <div style={{ fontSize: 15, lineHeight: 1.5, fontWeight: 700, whiteSpace: "pre-wrap" }}>
              {item.description}
            </div>
          </div>
        )}

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
