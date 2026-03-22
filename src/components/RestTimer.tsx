import React from "react";

export default function RestTimer({
  seconds,
  nextExerciseName,
  blockLabel,
  onSkip,
  onComplete,
}: {
  seconds: number;
  nextExerciseName?: string;
  blockLabel?: string;
  onSkip: () => void;
  onComplete: () => void;
}) {
  const [remaining, setRemaining] = React.useState(seconds);

  React.useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  React.useEffect(() => {
    if (remaining <= 0) {
      onComplete();
      return;
    }
    const t = window.setTimeout(() => setRemaining((r) => r - 1), 1000);
    return () => window.clearTimeout(t);
  }, [remaining, onComplete]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const display = mins > 0
    ? `${mins}:${secs.toString().padStart(2, "0")}`
    : `${secs}`;

  const progress = 1 - remaining / seconds;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        color: "#fff",
        padding: 32,
      }}
    >
      <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        Rest
      </div>

      <div
        style={{
          fontSize: 96,
          fontWeight: 950,
          fontVariantNumeric: "tabular-nums",
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}
      >
        {display}
      </div>

      {/* Progress bar */}
      <div style={{ width: "80%", maxWidth: 300, height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2 }}>
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: "var(--accent, #7c5cff)",
            borderRadius: 2,
            transition: "width 1s linear",
          }}
        />
      </div>

      {blockLabel && (
        <div style={{ fontSize: 14, fontWeight: 800, opacity: 0.6 }}>
          {blockLabel}
        </div>
      )}

      {nextExerciseName && (
        <div style={{ fontSize: 16, fontWeight: 800, opacity: 0.8, textAlign: "center" }}>
          Up next: {nextExerciseName}
        </div>
      )}

      <button
        onClick={onSkip}
        style={{
          marginTop: 16,
          padding: "12px 32px",
          background: "transparent",
          border: "2px solid rgba(255,255,255,0.3)",
          color: "rgba(255,255,255,0.7)",
          fontWeight: 900,
          fontSize: 14,
          textTransform: "uppercase",
          cursor: "pointer",
        }}
      >
        Skip Rest
      </button>
    </div>
  );
}
