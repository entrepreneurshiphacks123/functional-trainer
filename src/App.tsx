import { useState } from "react";

type Mode = "high_performance" | "walk_out_better";

export default function App() {
  const [mode, setMode] = useState<Mode | null>(null);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
      <h1 style={{ margin: "0 0 8px" }}>Training OS</h1>
      <p style={{ marginTop: 0, opacity: 0.75 }}>
        Zero-choice workouts. You only pick how you want to feel.
      </p>

      {!mode ? (
        <section style={{ display: "grid", gap: 12, maxWidth: 480 }}>
          <h2 style={{ fontSize: 18, margin: "12px 0 0" }}>How do you want to feel when you're done?</h2>
          <button
            onClick={() => setMode("high_performance")}
            style={btnStyle}
          >
            🔥 High Performance
          </button>
          <button
            onClick={() => setMode("walk_out_better")}
            style={btnStyle}
          >
            🌱 Walk Out Feeling Better
          </button>
          <p style={{ fontSize: 13, opacity: 0.65, marginTop: 6 }}>
            Next: we'll connect this to the workout engine + Cloudflare KV.
          </p>
        </section>
      ) : (
        <section style={{ display: "grid", gap: 12, maxWidth: 520 }}>
          <h2 style={{ fontSize: 18, margin: "12px 0 0" }}>Mode: {mode === "high_performance" ? "🔥 High Performance" : "🌱 Walk Out Feeling Better"}</h2>
          <p style={{ marginTop: 0, opacity: 0.75 }}>
            This is a placeholder screen. Next, the app will generate your A–D workout and walk you through it.
          </p>
          <button onClick={() => setMode(null)} style={{ ...btnStyle, opacity: 0.9 }}>
            ← Back
          </button>
        </section>
      )}
    </main>
  );
}

const btnStyle: React.CSSProperties = {
  padding: "14px 14px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.15)",
  background: "white",
  fontSize: 16,
  textAlign: "left",
  cursor: "pointer",
};
