import React from "react";
import { Card, Screen, Button } from "../ui/Primitives";

export type WorkoutItem = {
  id: string;
  slot: "prep" | "strength" | "athletic" | "finish";
  name: string;
  dose: string;

  // New (optional for now)
  equipment?: string;    // e.g. "Kettlebell", "Band", "Med ball", "None"
  description?: string;  // quick cues, what it is, how to do it
  hint?: string;         // small extra line like "fast" / "clean"
};

const slotLabel: Record<WorkoutItem["slot"], string> = {
  prep: "Warm-up",
  strength: "Strength",
  athletic: "Athletic",
  finish: "Finish",
};

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
          padding: 14,
          maxWidth: 560,
          width: "100%",
          margin: "0 auto",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <div style={{ fontSize: 16, fontWeight: 850, letterSpacing: "-0.01em" }}>{title}</div>
          <button
            onClick={onClose}
            style={{
              borderRadius: 999,
              border: "1px solid var(--border)",
              background: "var(--card2)",
              color: "var(--text)",
              padding: "8px 10px",
              fontSize: 14,
              cursor: "pointer",
              WebkitTapHighlightColor: "transparent",
            }}
          >
            Close
          </button>
        </div>

        <div style={{ height: 10 }} />
        {children}
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

  return (
    <Screen title={`${dayLabel} ${modeLabel}`}>
      <Card>
        {/* Workout list */}
        <div style={{ display: "grid", gap: 10 }}>
          {items.map((it, idx) => {
            const active = idx === i;

            return (
              <button
                key={it.id}
                onClick={() => setSelected(it)}
                style={{
                  textAlign: "left",
                  width: "100%",
                  border: `1px solid var(--border)`,
                  background: active ? "var(--card2)" : "transparent",
                  borderRadius: 16,
                  padding: active ? "16px 14px" : "12px 12px",
                  cursor: "pointer",
                  transform: active ? "scale(1.03)" : "scale(1)",
                  transition:
                    "transform 140ms ease, background 140ms ease, padding 140ms ease",
                  WebkitTapHighlightColor: "transparent",
                }}
              >
                {/* Name + Dose (equal weight) */}
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
                      fontWeight: 850,
                      opacity: active ? 1 : 0.75,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {it.name}
                  </div>

                  <div
                    style={{
                      fontSize: active ? 18 : 16,
                      fontWeight: 850,
                      opacity: active ? 1 : 0.75,
                      letterSpacing: "-0.01em",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {it.dose}
                  </div>
                </div>

                {/* Slot + Hint */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 6,
                  }}
                >
                  <div style={{ fontSize: 13, opacity: active ? 0.6 : 0.45 }}>
                    {slotLabel[it.slot]}
                  </div>
                  {it.hint ? (
                    <div style={{ fontSize: 13, opacity: active ? 0.6 : 0.45 }}>
                      {it.hint}
                    </div>
                  ) : (
                    <div style={{ fontSize: 13, opacity: active ? 0.6 : 0.45 }}>
                      Tap for details
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Controls */}
        <div style={{ height: 14 }} />

        <div style={{ display: "grid", gap: 10 }}>
          {i < items.length - 1 ? (
            <Button
              icon="➡️"
              onClick={() => setI((x) => Math.min(items.length - 1, x + 1))}
            >
              Next
            </Button>
          ) : (
            <Button icon="✅" onClick={onDone}>
              Done
            </Button>
          )}

          {i > 0 ? (
            <Button
              icon="←"
              variant="ghost"
              onClick={() => setI((x) => Math.max(0, x - 1))}
            >
              Back
            </Button>
          ) : null}
        </div>
      </Card>

      {/* Bottom-sheet modal */}
      {selected ? (
        <Modal title={selected.name} onClose={() => setSelected(null)}>
          <div style={{ display: "grid", gap: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "baseline",
              }}
            >
              <div style={{ fontSize: 13, opacity: 0.65 }}>Equipment</div>
              <div style={{ fontSize: 14, fontWeight: 800 }}>
                {selected.equipment ?? "—"}
              </div>
            </div>

            <div style={{ borderTop: "1px solid var(--border)", opacity: 0.7 }} />

            <div style={{ fontSize: 13, opacity: 0.65 }}>How</div>
            <div style={{ fontSize: 14, lineHeight: 1.45, fontWeight: 650 }}>
              {selected.description ?? "—"}
            </div>
          </div>
        </Modal>
      ) : null}
    </Screen>
  );
}
