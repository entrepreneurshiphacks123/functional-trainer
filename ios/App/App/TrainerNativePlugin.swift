import Capacitor
import Foundation
import os

/// Capacitor calls and listener notification are thread-safe; Swift 6 just can't see that.
private struct Unchecked<T>: @unchecked Sendable { let value: T }

@objc(TrainerNativePlugin)
public class TrainerNativePlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "TrainerNativePlugin"
    public let jsName = "TrainerNative"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "startSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setIndex", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "endSession", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "getIndex", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "setWristNotifications", returnType: CAPPluginReturnPromise),
    ]

    private static let log = Logger(subsystem: "com.stevenellis.functionaltrainer", category: "health")

    /// Task 7 fills this with heart-rate samples collected during the session.
    var heartRateSamples: [(Date, Int)] = []

    public override func load() {
        // The lock-screen intent runs in this process; it reaches JS through here (not on JS-driven setIndex).
        let me = Unchecked(value: self)
        Task { @MainActor in
            WorkoutSession.shared.onIndexChanged = { i in
                me.value.notifyListeners("indexChanged", data: ["index": i])
            }
        }
    }

    @objc func startSession(_ call: CAPPluginCall) {
        guard let startedAtMs = call.getDouble("startedAt"),
              let snapsRaw = call.getValue("snapshots"),
              let data = try? JSONSerialization.data(withJSONObject: snapsRaw),
              let snapshots = try? JSONDecoder().decode([LiveSnapshot].self, from: data),
              !snapshots.isEmpty
        else { return call.reject("startSession: bad payload") }
        let payload = SessionPayload(
            startedAt: Date(timeIntervalSince1970: startedAtMs / 1000),
            planName: call.getString("planName") ?? "",
            dayTitle: call.getString("dayTitle") ?? "",
            snapshots: snapshots,
            index: call.getInt("index") ?? 0)
        let box = Unchecked(value: call)
        Task { @MainActor in
            let session = WorkoutSession.shared
            if session.startedAt != payload.startedAt { await session.endActivity() }
            session.start(payload: payload)
            if WristNotification.isOn() { await WristNotification.requestAuthorization() }
            await session.apply()
            box.value.resolve()
        }
    }

    // JS echoes every indexChanged back here, so this must not emit indexChanged.
    @objc func setIndex(_ call: CAPPluginCall) {
        guard let i = call.getInt("index") else { return call.reject("setIndex: missing index") }
        let box = Unchecked(value: call)
        Task { @MainActor in
            let session = WorkoutSession.shared
            if session.setIndex(i) { await session.apply() }
            box.value.resolve()
        }
    }

    @objc func endSession(_ call: CAPPluginCall) {
        let startedAtMs = call.getDouble("startedAt")
        let endedAtMs = call.getDouble("endedAt")
        let save = call.getBool("save") ?? false
        let samples = heartRateSamples
        let box = Unchecked(value: call)
        Task { @MainActor in
            await WorkoutSession.shared.endAndClear()
            box.value.resolve()
            // Only a finished workout is saved. A save error never blocks or delays Done.
            guard save, let s = startedAtMs, let e = endedAtMs,
                  let plan = HealthSaver.plan(start: Date(timeIntervalSince1970: s / 1000),
                                              end: Date(timeIntervalSince1970: e / 1000),
                                              samples: samples) else { return }
            Task.detached {
                do { try await HealthSaver.save(plan) }
                catch { TrainerNativePlugin.log.error("Health save failed: \(error.localizedDescription, privacy: .public)") }
            }
        }
    }

    @objc func getIndex(_ call: CAPPluginCall) {
        let box = Unchecked(value: call)
        Task { @MainActor in
            let session = WorkoutSession.shared
            box.value.resolve(["index": session.isActive ? session.index : NSNull()])
        }
    }

    @objc func setWristNotifications(_ call: CAPPluginCall) {
        guard let on = call.getBool("on") else { return call.reject("setWristNotifications: missing on") }
        WristNotification.setOn(on)
        if !on { WristNotification.clear() }
        call.resolve()
    }
}
