import React from "react";
import { Button, Card, Screen, Modal } from "../ui/Primitives";
import { pad2, toLocalDateKey } from "../utils/date";
import { WorkoutLogEntry } from "../engine/storage";

export default function CalendarView({
  logs,
  onBack,
}: {
  logs: WorkoutLogEntry[];
  onBack: () => void;
}) {
  const todayKey = toLocalDateKey(new Date());
  const [cursor, setCursor] = React.useState<Date>(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });

  const logByDate = React.useMemo(() => {
    const m = new Map<string, WorkoutLogEntry>();
    for (const e of logs ?? []) {
      if (!m.has(e.dateISO)) m.set(e.dateISO, e);
    }
    return m;
  }, [logs]);

  const cells = React.useMemo(() => {
    const start = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const month = start.getMonth();
    const firstDow = start.getDay();
    const gridStart = new Date(start);
    gridStart.setDate(start.getDate() - firstDow);

    const out: Array<{ date: Date; key: string; inMonth: boolean; entry?: WorkoutLogEntry }> = [];
    for (let i = 0; i < 42; i++) {
      const d = new Date(gridStart);
      d.setDate(gridStart.getDate() + i);
      const key = toLocalDateKey(d);
      out.push({
        date: d,
        key,
        inMonth: d.getMonth() === month,
        entry: logByDate.get(key),
      });
    }
    return out;
  }, [cursor, logByDate]);

  const title = `${cursor.toLocaleString(undefined, { month: "long" })} ${cursor.getFullYear()}`;

  return (
    <Screen
      title="History"
      right={
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setCursor(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))} style={navBtn}>←</button>
          <button onClick={() => setCursor(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))} style={navBtn}>→</button>
        </div>
      }
    >
      <Card title={title}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, background: "var(--border)", border: "var(--bw) solid var(--border)" }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} style={{ textAlign: "center", fontSize: 11, fontWeight: 950, padding: "8px 0", background: "var(--card2)", color: "var(--text)", textTransform: "uppercase" }}>
              {d}
            </div>
          ))}

          {cells.map((c) => (
            <DayCell
              key={c.key}
              day={c.date.getDate()}
              inMonth={c.inMonth}
              isToday={c.key === todayKey}
              entry={c.entry}
            />
          ))}
        </div>

        <div style={{ height: 20 }} />

        <div style={{ display: "grid", gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Recent Activity</div>
          {logs.slice(0, 5).map(log => (
            <div key={log.dateISO} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 14px", border: "1px solid var(--border-light)", background: "var(--card)" }}>
              <div style={{ fontWeight: 900 }}>{log.title}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>{log.dateISO}</div>
            </div>
          ))}
          {logs.length === 0 && <div style={{ fontSize: 14, opacity: 0.5, textAlign: "center", padding: "20px 0" }}>No workouts yet.</div>}
        </div>
      </Card>
    </Screen>
  );
}

function DayCell({
  day,
  inMonth,
  isToday,
  entry,
}: {
  day: number;
  inMonth: boolean;
  isToday: boolean;
  entry?: WorkoutLogEntry;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onPointerDown={() => entry && setOpen(true)}
        style={{
          ...cell,
          opacity: inMonth ? 1 : 0.2,
          background: entry ? "var(--accent)" : "var(--bg)",
          color: entry ? "var(--accent-text)" : "var(--text)",
          border: isToday ? "var(--bw) solid var(--bad)" : "none",
          cursor: entry ? "pointer" : "default",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 900 }}>{day}</span>
      </button>

      {open && entry ? (
        <Modal title="Workout Detail" onClose={() => setOpen(false)}>
          <div style={{ display: "grid", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div style={{ fontSize: 18, fontWeight: 950 }}>{entry.title}</div>
              <div style={{ fontSize: 13, fontWeight: 800, opacity: 0.6 }}>{entry.dateISO}</div>
            </div>

            <div style={{ fontSize: 12, opacity: 0.7, textTransform: "uppercase", fontWeight: 900 }}>
              Plan: {entry.planId} • Mode: {entry.mode === 'high_performance' ? '🔥 Performance' : '🌱 Base'}
            </div>

            <div style={{ borderTop: "var(--bw) solid var(--border)", margin: "8px 0" }} />

            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 900, opacity: 0.6, textTransform: "uppercase" }}>Exercises Completed</div>
              {entry.items.map((it, idx) => (
                <div key={idx} style={{ padding: "10px 12px", background: "var(--card2)", border: "1px solid var(--border-light)" }}>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{it.name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>{it.dose}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 12 }}>
              <Button onClick={() => setOpen(false)}>Close</Button>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}

const navBtn: React.CSSProperties = {
  background: "var(--bg)",
  color: "var(--text)",
  border: "var(--bw) solid var(--border)",
  padding: "8px 12px",
  fontSize: 16,
  fontWeight: 950,
  cursor: "pointer",
};

const cell: React.CSSProperties = {
  padding: 0,
  aspectRatio: "1 / 1",
  textAlign: "center",
  WebkitTapHighlightColor: "transparent",
};
