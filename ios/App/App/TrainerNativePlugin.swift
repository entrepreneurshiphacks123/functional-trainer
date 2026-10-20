import Capacitor
import Foundation

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
    ]

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
        let box = Unchecked(value: call)
        Task { @MainActor in
            await WorkoutSession.shared.endAndClear()
            box.value.resolve()
        }
    }

    @objc func getIndex(_ call: CAPPluginCall) {
        let box = Unchecked(value: call)
        Task { @MainActor in
            let session = WorkoutSession.shared
            box.value.resolve(["index": session.isActive ? session.index : NSNull()])
        }
    }
}
