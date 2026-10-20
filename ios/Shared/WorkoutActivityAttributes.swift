import ActivityKit
import Foundation

/// Swift mirror of the JS `LiveSnapshot`.
struct LiveSnapshot: Codable, Hashable, Sendable {
    let title: String
    let lines: [String]
    let isLast: Bool
}

struct WorkoutActivityAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable, Sendable {
        var title: String
        var lines: [String]
        var isLast: Bool
        var position: String
        var heartRate: Int?
    }

    var planName: String
    var dayTitle: String
    var startedAt: Date
}
