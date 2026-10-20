import ActivityKit
import Foundation

/// Swift mirror of the JS `LiveSnapshot`.
struct LiveRow: Codable, Hashable, Sendable {
    let name: String
    let dose: String
    let pos: Int?
}

struct LiveSnapshot: Codable, Hashable, Sendable {
    let title: String
    let lines: [String]
    let rows: [LiveRow]
    let isLast: Bool

    init(title: String, lines: [String], rows: [LiveRow] = [], isLast: Bool) {
        self.title = title
        self.lines = lines
        self.rows = rows
        self.isLast = isLast
    }

    // `rows` is absent in sessions persisted and payloads sent before the glass card.
    init(from decoder: Decoder) throws {
        let c = try decoder.container(keyedBy: CodingKeys.self)
        title = try c.decode(String.self, forKey: .title)
        lines = try c.decode([String].self, forKey: .lines)
        rows = try c.decodeIfPresent([LiveRow].self, forKey: .rows) ?? []
        isLast = try c.decode(Bool.self, forKey: .isLast)
    }
}

struct WorkoutActivityAttributes: ActivityAttributes {
    struct ContentState: Codable, Hashable, Sendable {
        var title: String
        var lines: [String]
        var rows: [LiveRow]
        var isLast: Bool
        var position: String
        var heartRate: Int?
    }

    var planName: String
    var dayTitle: String
    var startedAt: Date
}
