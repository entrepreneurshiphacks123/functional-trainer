export type LoadLog = Record<
  string,
  {
    lastLoad?: string;   // keep as string to support "50 lb", "24kg", "BW", etc.
    lastDateISO?: string;
  }
>;

const KEY = "training:loadlog:v1";

export function loadLoadLog(): LoadLog {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as LoadLog) : {};
  } catch {
    return {};
  }
}

export function saveLoadLog(next: LoadLog) {
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function getLoadFor(exerciseId: string): { lastLoad?: string; lastDateISO?: string } {
  const log = loadLoadLog();
  return log[exerciseId] ?? {};
}

export function setLoadFor(exerciseId: string, lastLoad: string, lastDateISO: string) {
  const log = loadLoadLog();
  log[exerciseId] = { lastLoad, lastDateISO };
  saveLoadLog(log);
}
