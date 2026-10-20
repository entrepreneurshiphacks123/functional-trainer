import { describe, it, expect, vi } from "vitest";
import { onHeartRate } from "./bridge";

describe("onHeartRate on the web", () => {
  it("never fires, and its unsubscribe works", () => {
    const cb = vi.fn();
    const off = onHeartRate(cb);
    expect(typeof off).toBe("function");
    expect(() => off()).not.toThrow();
    expect(() => off()).not.toThrow();
    expect(cb).not.toHaveBeenCalled();
  });
});
