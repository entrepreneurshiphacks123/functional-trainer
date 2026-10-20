import type { WorkoutScreen } from "../components/WorkoutPlayer";

export type LiveRow = { name: string; dose: string; pos: 1 | 2 | 3 | 4 | null };
export type LiveSnapshot = {
  title: string;
  lines: string[];
  rows: LiveRow[];
  isLast: boolean;
};

const MAX_LINES = 5;
const MAX_ROWS = 4;

export function shortTitle(label: string): string {
  return label.replace(/^French Contrast (\d+) of (\d+)( · optional)?$/, (_, n, total, opt) =>
    `Contrast ${n}/${total}${opt ? " · opt" : ""}`,
  );
}

export function abbreviate(name: string): string {
  return name.replace(/\bLateral\b/g, "Lat").replace(/\blateral\b/g, "lat");
}

export function toSnapshots(screens: WorkoutScreen[]): LiveSnapshot[] {
  return screens.map((s, i) => {
    const all = s.items.map((it) => `${abbreviate(it.name)} · ${it.dose}`);
    const lines =
      all.length > MAX_LINES
        ? [...all.slice(0, MAX_LINES - 1), `+${all.length - (MAX_LINES - 1)} more`]
        : all;
    const allRows: LiveRow[] = s.items.map((it) => ({
      name: abbreviate(it.name),
      dose: it.dose,
      pos: s.type === "fc_block" ? (it.fcPosition ?? null) : null,
    }));
    const rows =
      allRows.length > MAX_ROWS
        ? [...allRows.slice(0, MAX_ROWS - 1), { name: `+${allRows.length - (MAX_ROWS - 1)} more`, dose: "", pos: null }]
        : allRows;
    return { title: shortTitle(s.label), lines, rows, isLast: i === screens.length - 1 };
  });
}

export function sessionStartPayload(args: {
  startedAt: number | null;
  planName: string;
  dayTitle: string;
  screens: WorkoutScreen[];
  index: number;
}): { startedAt: number; planName: string; dayTitle: string; snapshots: LiveSnapshot[]; index: number } | null {
  if (args.startedAt === null) return null;
  return {
    startedAt: args.startedAt,
    planName: args.planName,
    dayTitle: args.dayTitle,
    snapshots: toSnapshots(args.screens),
    index: args.index,
  };
}

export function sessionTransition(
  prev: number | null,
  next: number | null,
): "start" | "end" | "restart" | "none" {
  if (prev === next) return "none";
  if (next === null) return "end";
  if (prev === null) return "start";
  return "restart";
}
