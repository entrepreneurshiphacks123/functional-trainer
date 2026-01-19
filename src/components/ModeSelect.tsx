type Mode = "high_performance" | "walk_out_better";

export default function ModeSelect({ onSelect }: { onSelect: (m: Mode) => void }) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <h2>How do you want to feel when you're done?</h2>
      <button onClick={() => onSelect("high_performance")}>🔥 High Performance</button>
      <button onClick={() => onSelect("walk_out_better")}>🌱 Walk Out Feeling Better</button>
    </section>
  );
}
