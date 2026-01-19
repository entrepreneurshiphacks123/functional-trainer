import { useMemo } from "react";
import { Card, Screen, TinyIconButton } from "../ui/Primitives";
import type { WorkoutLogEntry } from "../engine/storage";

function iso(d: Date) {
  return d.toISOString().slice(0, 10);
}

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
function endOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
}

function streakFromSet(done: Set<string>, todayISO: string) {
  let count = 0;
  const t = new Date(todayISO);
  while (true) {
    const key = iso(t);
    if (!done.has(key)) break;
    count++;
    t.setDate(t.getDate() - 1);
  }
  return count;
}

export default function CalendarView({
  logs,
  onBack,
}: {
  logs: WorkoutLogEntry[];
  onBack: () => void;
}) {
  const todayISO = iso(new Date());

  const doneSet = useMemo(() => new Set(logs.map((l) => l.dateISO)), [logs]);
  const streak = useMemo(() => streakFromSet(doneSet, todayISO), [doneSet, todayISO]);

  const days = useMemo(() => {
    const now = new Date();
    const start = startOfMonth(now);
    const end = endOfMonth(now);

    // pad to Monday-start grid feel
    const firstDow = (start.getDay() + 6) % 7; // Mon=0
    const out: Array<{ dateISO: string; inMonth: boolean }> = [];

    for (let i = 0; i < firstDow; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() - (firstDow - i));
      out.push({ dateISO: iso(d), inMonth: false });
    }

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      out.push({ dateISO: iso(d), inMonth: true });
    }

    while (out.length % 7 !== 0) {
      const d = new Date(end);
      d.setDate(d.getDate() + (out.length % 7));
      out.push({ dateISO: iso(d), inMonth: false });
    }

    return out;
  }, []);

  return (
    <Screen
      title="Calendar"
      right={<TinyIconButton label="←" onClick={onBack} />}
    >
      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontWeight: 750, fontSize: 16 }}>Streak</div>
          <div style={{ fontWeight: 800, fontSize: 20 }}>{streak}</div>
        </div>

        <div style={{ height: 10 }} />

        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
          {days.map((d) => {
            const done = doneSet.has(d.dateISO);
            const isToday = d.dateISO === todayISO;

            return (
              <div
                key={d.dateISO}
                style={{
                  aspectRatio: "1 / 1",
                  borderRadius: 12,
                  border: `1px solid var(--border)`,
                  background: done ? "var(--card2)" : "transparent",
                  opacity: d.inMonth ? 1 : 0.35,
                  display: "grid",
                  placeItems: "center",
                  fontWeight: isToday ? 850 : 650,
                }}
                title={done ? "Workout done" : ""}
              >
                {Number(d.dateISO.slice(-2))}
              </div>
            );
          })}
        </div>
      </Card>
    </Screen>
  );
}
