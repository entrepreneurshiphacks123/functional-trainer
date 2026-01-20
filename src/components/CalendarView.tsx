import React from "react";
import { Button, Card, Screen } from "../ui/Primitives";
import { fromLocalDateKey, pad2, toLocalDateKey } from "../utils/date";
import { WorkoutLogEntry } from "../engine/storage";

function monthKey(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}`;
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function addMonths(d: Date, delta: number) {
  return new Date(d.getFullYear(), d.getMonth() + delta, 1);
}

export default function CalendarView({
  logs,
  onBack,
}: {
  logs: WorkoutLogEntry[];
  onBack: () => void;
}) {
  const todayKey = toLocalDateKey(new Date());
  const [cursor, setCursor] = React.useState<Date>(() => startOfMonth(new Date()));

  const logByDate = React.useMemo(() => {
    const m = new Map<string, WorkoutLogEntry>();
    for (const e of logs ?? []) {
      // newest wins
      if (!m.has(e.dateISO)) m.set(e.dateISO, e);
    }
    return m;
  }, [logs]);

  const cells = React.useMemo(() => {
    const start = startOfMonth(cursor);
    const month = start.getMonth();

    // Calendar grid: Sun..Sat, 6 rows
    const firstDow = start.getDay(); // 0=Sun
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
      title={"Calendar"}
      right={
        <div style={{ display: "flex", gap: 8 }}>
          <button
            type="button"
            onClick={() => setCursor((d) => addMonths(d, -1))}
            style={navBtn}
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => setCursor((d) => addMonths(d, 1))}
            style={navBtn}
          >
            →
          </button>
        </div>
      }
    >
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
          <div style={{ fontSize: 16, fontWeight: 950 }}>{title}</div>
          <div style={{ fontSize: 12, opacity: 0.65 }}>Tap a day to view</div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d} style={{ textAlign: "center", fontSize: 12, opacity: 0.65, fontWeight: 850 }}>
              {d}
            </div>
          ))}

          {cells.map((c) => {
            const done = !!c.entry;
            const isToday = c.key === todayKey;

            return (
              <DayCell
                key={c.key}
                day={c.date.getDate()}
                inMonth={c.inMonth}
                done={done}
                isToday={isToday}
                entry={c.entry}
              />
            );
          })}
        </div>

        <div style={{ height: 12 }} />

        <Button icon="←" variant="ghost" onClick={onBack}>
          Back
        </Button>
      </Card>
    </Screen>
  );
}

function DayCell({
  day,
  inMonth,
  done,
  isToday,
  entry,
}: {
  day: number;
  inMonth: boolean;
  done: boolean;
  isToday: boolean;
  entry?: WorkoutLogEntry;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => done && setOpen(true)}
        disabled={!done}
        style={{
          ...cell,
          opacity: inMonth ? 1 : 0.35,
          border: isToday ? "1px solid rgba(124,92,255,0.85)" : "1px solid var(--border)",
          background: done ? "var(--card2)" : "transparent",
          cursor: done ? "pointer" : "default",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 13, fontWeight: 900 }}>{day}</div>
          {done ? (
            <div
              aria-hidden="true"
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "var(--good)",
              }}
            />
          ) : null}
        </div>
      </button>

      {open && entry ? (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
          style={overlay}
        >
          <div onClick={(e) => e.stopPropagation()} style={modal}>
            <div style={{ fontSize: 16, fontWeight: 950 }}>{entry.dateISO}</div>
            <div style={{ height: 6 }} />
            <div style={{ fontSize: 14, fontWeight: 900 }}>{entry.title}</div>
            <div style={{ height: 6 }} />
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              Plan: {entry.planId ?? "—"} · Mode: {entry.mode}
            </div>
            <div style={{ height: 12 }} />
            <button type="button" onClick={() => setOpen(false)} style={closeBtn}>
              Close
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
}

const navBtn: React.CSSProperties = {
  borderRadius: 12,
  border: "1px solid var(--border)",
  background: "var(--card2)",
  color: "var(--text)",
  padding: "10px 12px",
  fontSize: 14,
  fontWeight: 900,
  cursor: "pointer",
  WebkitTapHighlightColor: "transparent",
};

const cell: React.CSSProperties = {
  borderRadius: 12,
  padding: "10px 10px",
  minHeight: 44,
  textAlign: "left",
  WebkitTapHighlightColor: "transparent",
};

const overlay: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.55)",
  display: "grid",
  alignItems: "end",
  padding: 12,
  zIndex: 50,
};

const modal: React.CSSProperties = {
  width: "100%",
  maxWidth: 560,
  margin: "0 auto",
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 18,
  padding: 14,
};

const closeBtn: React.CSSProperties = {
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
};
