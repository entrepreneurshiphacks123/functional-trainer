import ActivityKit
import Foundation
import os

/// Keeps exactly one workout Live Activity alive.
///
/// Root cause of the earlier duplicates: `Activity.activities` lags a fresh `Activity.request`,
/// so two pushes arriving back to back (startSession then setIndex, or a restore right after a
/// launch) each saw an empty list and each requested a new activity. The pusher remembers the
/// activity it requested and decides on the main actor with no suspension between "look" and
/// "request", and it ends any extras (left by older builds or crashes) on every push.
@MainActor
final class LiveActivityPusher {
    typealias State = WorkoutActivityAttributes.ContentState

    /// Seam over ActivityKit, so the one-activity rules can be tested without a device.
    struct Ops {
        var enabled: () -> Bool
        var running: () -> [String]
        var isAlive: (String) -> Bool
        var request: (WorkoutActivityAttributes, ActivityContent<State>) throws -> String
        var update: (String, ActivityContent<State>) async -> Void
        var end: (String) async -> Void
    }

    private let ops: Ops
    private var owned: String?
    private static let log = Logger(subsystem: "com.stevenellis.functionaltrainer", category: "liveactivity")

    init(ops: Ops = LiveActivityPusher.liveOps()) { self.ops = ops }

    func push(_ attrs: WorkoutActivityAttributes, _ content: ActivityContent<State>) async {
        var ids = ops.running()
        if let o = owned, !ids.contains(o), ops.isAlive(o) { ids.append(o) }
        let keep = owned.flatMap { ids.contains($0) ? $0 : nil } ?? ids.first
        if let keep {
            owned = keep
            for id in ids where id != keep { await ops.end(id) }
            await ops.update(keep, content)
            return
        }
        // No suspension point between the check above and this request.
        guard ops.enabled() else {
            Self.log.error("Live Activities are disabled for this app; no lock-screen card")
            return
        }
        do {
            owned = try ops.request(attrs, content)
        } catch {
            Self.log.error("Activity.request failed: \(error.localizedDescription, privacy: .public)")
        }
    }

    func endAll() async {
        var ids = ops.running()
        if let o = owned, !ids.contains(o), ops.isAlive(o) { ids.append(o) }
        owned = nil
        for id in ids { await ops.end(id) }
    }

    static func liveOps() -> Ops {
        let requested = Requested()
        func find(_ id: String) -> Activity<WorkoutActivityAttributes>? {
            Activity<WorkoutActivityAttributes>.activities.first { $0.id == id } ?? requested.byID[id]
        }
        return Ops(
            enabled: { ActivityAuthorizationInfo().areActivitiesEnabled },
            running: { Activity<WorkoutActivityAttributes>.activities.map(\.id) },
            isAlive: { id in
                guard let a = requested.byID[id] else { return false }
                return a.activityState == .active || a.activityState == .stale
            },
            request: { attrs, content in
                let a = try Activity.request(attributes: attrs, content: content, pushType: nil)
                requested.byID[a.id] = a
                return a.id
            },
            update: { id, content in
                guard let a = find(id) else { return }
                await ActivityBox(a).update(content)
            },
            end: { id in
                if let a = find(id) { await ActivityBox(a).end() }
                requested.byID[id] = nil
            })
    }

    /// Activity is not Sendable; the box lets its async calls run off the main actor. The activity is only touched here.
    private struct ActivityBox: @unchecked Sendable {
        let activity: Activity<WorkoutActivityAttributes>
        init(_ a: Activity<WorkoutActivityAttributes>) { activity = a }
        func update(_ content: ActivityContent<State>) async { await activity.update(content) }
        func end() async { await activity.end(nil, dismissalPolicy: .immediate) }
    }

    @MainActor private final class Requested {
        var byID: [String: Activity<WorkoutActivityAttributes>] = [:]
    }
}
