import { Capacitor, registerPlugin } from "@capacitor/core";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import type { LiveSnapshot } from "./liveSnapshot";

export const isNative = (): boolean => Capacitor.isNativePlatform();

export async function shareFile(name: string, json: string): Promise<void> {
  if (!isNative()) return;
  const { uri } = await Filesystem.writeFile({
    path: name,
    data: json,
    directory: Directory.Cache,
    encoding: Encoding.UTF8,
  });
  await Share.share({ title: name, files: [uri] });
}

// ------- TrainerNative plugin (Swift side lands in Task 4) -------
export type HeartRateStatus = "connected" | "searching" | "off";

export type SessionStartPayload = {
  startedAt: number;
  planName: string;
  dayTitle: string;
  snapshots: LiveSnapshot[];
  index: number;
};

type ListenerHandle = { remove: () => Promise<void> };

interface TrainerNativePlugin {
  startSession(p: SessionStartPayload): Promise<void>;
  setIndex(p: { index: number }): Promise<void>;
  endSession(p: { startedAt: number; endedAt: number; title: string; save?: boolean }): Promise<void>;
  getIndex(): Promise<{ index: number | null }>;
  setWristNotifications(p: { on: boolean }): Promise<void>;
  startHeartRate(): Promise<void>;
  stopHeartRate(): Promise<void>;
  addListener(
    event: "indexChanged",
    cb: (e: { index: number }) => void,
  ): Promise<ListenerHandle>;
  addListener(
    event: "heartRate",
    cb: (e: { bpm: number | null; status: HeartRateStatus }) => void,
  ): Promise<ListenerHandle>;
}

const TrainerNative = registerPlugin<TrainerNativePlugin>("TrainerNative");

// Native calls must never throw into the UI.
async function safeCall(label: string, fn: () => Promise<unknown>): Promise<void> {
  if (!isNative()) return;
  try {
    await fn();
  } catch (e) {
    console.warn(`TrainerNative.${label} failed`, e);
  }
}

export const startSession = (p: SessionStartPayload): Promise<void> =>
  safeCall("startSession", () => TrainerNative.startSession(p));

export const setIndex = (index: number): Promise<void> =>
  safeCall("setIndex", () => TrainerNative.setIndex({ index }));

export const endSession = (p: { startedAt: number; endedAt: number; title: string; save?: boolean }): Promise<void> =>
  safeCall("endSession", () => TrainerNative.endSession(p));

export async function getIndex(): Promise<number | null> {
  if (!isNative()) return null;
  try {
    const r = await TrainerNative.getIndex();
    return typeof r?.index === "number" ? r.index : null;
  } catch (e) {
    console.warn("TrainerNative.getIndex failed", e);
    return null;
  }
}

export const setWristNotifications = (on: boolean): Promise<void> =>
  safeCall("setWristNotifications", () => TrainerNative.setWristNotifications({ on }));

export const startHeartRate = (): Promise<void> =>
  safeCall("startHeartRate", () => TrainerNative.startHeartRate());

export const stopHeartRate = (): Promise<void> =>
  safeCall("stopHeartRate", () => TrainerNative.stopHeartRate());

function listen(register: () => Promise<ListenerHandle>, label: string): () => void {
  if (!isNative()) return () => {};
  let removed = false;
  let handle: ListenerHandle | null = null;
  register()
    .then((h) => {
      if (removed) h.remove().catch(() => {});
      else handle = h;
    })
    .catch((e) => console.warn(`TrainerNative.addListener(${label}) failed`, e));
  return () => {
    if (removed) return;
    removed = true;
    if (handle) {
      handle.remove().catch(() => {});
      handle = null;
    }
  };
}

export const onIndexChanged = (cb: (i: number) => void): (() => void) =>
  listen(() => TrainerNative.addListener("indexChanged", (e) => cb(e.index)), "indexChanged");

export const onHeartRate = (
  cb: (bpm: number | null, status: HeartRateStatus) => void,
): (() => void) =>
  listen(() => TrainerNative.addListener("heartRate", (e) => cb(e.bpm, e.status)), "heartRate");
