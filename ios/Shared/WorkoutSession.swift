import ActivityKit
import Foundation

struct SessionPayload: Codable, Hashable, Sendable {
    var startedAt: Date
    var planName: String
    var dayTitle: String
    var snapshots: [LiveSnapshot]
    var index: Int
}

/// Owns the current screen index while the app is backgrounded, and the Live Activity.
@MainActor
final class WorkoutSession {
    static let shared = WorkoutSession()
    static let storeKey = "workoutSession.v1"

    private let defaults: UserDefaults
    private(set) var snapshots: [LiveSnapshot] = []
    private(set) var index = 0
    private(set) var startedAt: Date?
    private(set) var planName = ""
    private(set) var dayTitle = ""
    /// Latest band bpm. Every push reads it, so a screen change never blanks it.
    private(set) var heartRate: Int?
    private var lastPushAt = Date.distantPast
    private static let heartRatePushInterval: TimeInterval = 5

    /// Set by the Capacitor plugin so a lock-screen advance can tell JS (decision 4).
    var onIndexChanged: ((Int) -> Void)?

    init(defaults: UserDefaults = .standard) {
        self.defaults = defaults
        if let data = defaults.data(forKey: Self.storeKey),
           let p = try? JSONDecoder().decode(SessionPayload.self, from: data) {
            snapshots = p.snapshots
            startedAt = p.startedAt
            planName = p.planName
            dayTitle = p.dayTitle
            index = Self.clamp(p.index, count: p.snapshots.count)
        }
    }

    var isActive: Bool { startedAt != nil && !snapshots.isEmpty }

    /// Same `startedAt` as the active session keeps the native index (remount race).
    func start(payload: SessionPayload) {
        let keepIndex = startedAt == payload.startedAt && !snapshots.isEmpty
        snapshots = payload.snapshots
        startedAt = payload.startedAt
        planName = payload.planName
        dayTitle = payload.dayTitle
        index = Self.clamp(keepIndex ? index : payload.index, count: snapshots.count)
        persist()
    }

    @discardableResult
    func setIndex(_ i: Int) -> Bool {
        let next = Self.clamp(i, count: snapshots.count)
        guard next != index else { return false }
        index = next
        persist()
        return true
    }

    @discardableResult
    func advance() -> Bool {
        guard index < snapshots.count - 1 else { return false }
        index += 1
        persist()
        return true
    }

    func currentState(heartRate: Int? = nil) -> WorkoutActivityAttributes.ContentState {
        let s = snapshots.indices.contains(index) ? snapshots[index] : LiveSnapshot(title: "", lines: [], isLast: true)
        return .init(title: s.title, lines: s.lines, isLast: s.isLast,
                     position: "\(index + 1) / \(snapshots.count)", heartRate: heartRate)
    }

    func end() {
        snapshots = []
        index = 0
        startedAt = nil
        planName = ""
        dayTitle = ""
        heartRate = nil
        defaults.removeObject(forKey: Self.storeKey)
    }

    // MARK: Live Activity

    /// The one place that pushes the current state out: Live Activity and wrist notification.
    /// Carries the stored heart rate.
    func apply() async {
        guard isActive, let startedAt else { return }
        lastPushAt = Date()
        let content = ActivityContent(state: currentState(heartRate: heartRate), staleDate: nil)
        let attrs = WorkoutActivityAttributes(planName: planName, dayTitle: dayTitle, startedAt: startedAt)
        await Self.pushActivity(attrs, content)
        if WristNotification.isOn(), snapshots.indices.contains(index) {
            await WristNotification.post(snapshots[index])
        }
    }

    /// Stores the latest bpm. Returns true when the Live Activity should be pushed now:
    /// a session is active and, for a real bpm, the last push was at least 5 s ago.
    /// A nil bpm (band dropped or stopped) always pushes, so a stale value never lingers.
    func recordHeartRate(_ bpm: Int?, now: Date = Date()) -> Bool {
        heartRate = bpm
        guard isActive else { return false }
        return bpm == nil || now.timeIntervalSince(lastPushAt) >= Self.heartRatePushInterval
    }

    func markPushed(at date: Date) { lastPushAt = date }

    /// Ends any Live Activity, including one orphaned by a previous process, without touching the stored session.
    func endActivity() async {
        await Self.endAllActivities()
    }

    // Activity objects are not Sendable, so all ActivityKit work stays off the main actor.
    private nonisolated static func pushActivity(
        _ attrs: WorkoutActivityAttributes,
        _ content: ActivityContent<WorkoutActivityAttributes.ContentState>
    ) async {
        if let existing = Activity<WorkoutActivityAttributes>.activities.first {
            await existing.update(content)
        } else if ActivityAuthorizationInfo().areActivitiesEnabled {
            _ = try? Activity.request(attributes: attrs, content: content, pushType: nil)
        }
    }

    private nonisolated static func endAllActivities() async {
        for a in Activity<WorkoutActivityAttributes>.activities {
            await a.end(nil, dismissalPolicy: .immediate)
        }
    }

    func advanceAndApply() async {
        guard advance() else { return }
        await apply()
        onIndexChanged?(index)
    }

    func endAndClear() async {
        await endActivity()
        WristNotification.clear()
        end()
    }

    private func persist() {
        guard let startedAt else { return }
        let p = SessionPayload(startedAt: startedAt, planName: planName, dayTitle: dayTitle,
                               snapshots: snapshots, index: index)
        if let data = try? JSONEncoder().encode(p) { defaults.set(data, forKey: Self.storeKey) }
    }

    private static func clamp(_ i: Int, count: Int) -> Int {
        max(0, min(i, max(count - 1, 0)))
    }
}
