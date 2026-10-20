import Foundation
import UserNotifications

/// The current block as one replaceable notification, so a paired band buzzes on each Next.
enum WristNotification {
    static let identifier = "workout-current"
    static let defaultsKey = "wristNotifications.on"
    static let maxLineLength = 28

    /// Read when JS is asleep (lock-screen Next), so it lives in UserDefaults. On when unset.
    static func isOn(defaults: UserDefaults = .standard) -> Bool {
        defaults.object(forKey: defaultsKey) as? Bool ?? true
    }

    static func setOn(_ on: Bool, defaults: UserDefaults = .standard) {
        defaults.set(on, forKey: defaultsKey)
    }

    static func content(for snapshot: LiveSnapshot) -> UNMutableNotificationContent {
        let c = UNMutableNotificationContent()
        c.title = snapshot.title
        c.body = snapshot.lines.map(truncated).joined(separator: "\n")
        c.sound = nil
        return c
    }

    static func requestAuthorization() async {
        _ = try? await UNUserNotificationCenter.current().requestAuthorization(options: [.alert])
    }

    /// Replaces any delivered or pending copy, then posts immediately.
    static func post(_ snapshot: LiveSnapshot) async {
        let center = UNUserNotificationCenter.current()
        center.removeDeliveredNotifications(withIdentifiers: [identifier])
        center.removePendingNotificationRequests(withIdentifiers: [identifier])
        let request = UNNotificationRequest(identifier: identifier, content: content(for: snapshot), trigger: nil)
        try? await center.add(request)
    }

    static func clear() {
        let center = UNUserNotificationCenter.current()
        center.removeDeliveredNotifications(withIdentifiers: [identifier])
        center.removePendingNotificationRequests(withIdentifiers: [identifier])
    }

    private static func truncated(_ line: String) -> String {
        line.count > maxLineLength ? String(line.prefix(maxLineLength)) + "…" : line
    }
}
