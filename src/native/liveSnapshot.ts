import type { WorkoutScreen } from "../components/WorkoutPlayer";

export type LiveSnapshot = {
  title: string;
  lines: string[];
  isLast: boolean;
};

const MAX_LINES = 5;

export function toSnapshots(screens: WorkoutScreen[]): LiveSnapshot[] {
  return screens.map((s, i) => {
    const all = s.items.map((it) => `${it.name} · ${it.dose}`);
    const lines =
      all.length > MAX_LINES
        ? [...all.slice(0, MAX_LINES - 1), `+${all.length - (MAX_LINES - 1)} more`]
        : all;
    return { title: s.label, lines, isLast: i === screens.length - 1 };
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
