import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

struct WorkoutLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WorkoutActivityAttributes.self) { context in
            Group {
                if context.attributes.kind == "list" {
                    ListCardView(state: context.state)
                } else {
                    ControlCardView(attributes: context.attributes, state: context.state)
                }
            }
                .activityBackgroundTint(Color.black.opacity(0.25))
                .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Text(timerInterval: context.attributes.startedAt...Date.distantFuture, countsDown: false, showsHours: true)
                        .monospacedDigit()
                        .font(.caption)
                        .frame(width: 56, alignment: .leading)
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text(context.state.position).font(.caption).monospacedDigit()
                }
                DynamicIslandExpandedRegion(.center) {
                    Text(context.state.title).font(.headline).lineLimit(1)
                }
                DynamicIslandExpandedRegion(.bottom) {
                    HStack(alignment: .bottom) {
                        VStack(alignment: .leading, spacing: 2) {
                            ForEach(Array(context.state.lines.prefix(3).enumerated()), id: \.offset) { _, line in
                                Text(line).font(.caption).monospacedDigit().lineLimit(1)
                            }
                        }
                        Spacer(minLength: 8)
                        if !context.state.isLast {
                            Button(intent: NextScreenIntent()) { Text("Next") }
                        }
                    }
                }
            } compactLeading: {
                Text(timerInterval: context.attributes.startedAt...Date.distantFuture, countsDown: false, showsHours: true)
                    .monospacedDigit()
                    .frame(width: 48)
            } compactTrailing: {
                Text(context.state.position).monospacedDigit()
            } minimal: {
                Text(context.state.position).monospacedDigit().font(.caption2)
            }
        }
    }
}

private let rowDotColors: [Int: Color] = [
    1: Color(red: 0xFF / 255, green: 0x5A / 255, blue: 0x4E / 255),
    2: Color(red: 0xFF / 255, green: 0x9F / 255, blue: 0x0A / 255),
    3: Color(red: 0xFF / 255, green: 0xD6 / 255, blue: 0x0A / 255),
    4: Color(red: 0x30 / 255, green: 0xD1 / 255, blue: 0x58 / 255),
]

private struct NavCapsule: View {
    let label: String

    var body: some View {
        Text(label)
            .font(.system(size: 16, weight: .bold))
            .frame(minWidth: 52, minHeight: 44)
            .padding(.horizontal, 10)
            .background(Capsule().fill(Color.white.opacity(0.18)))
            .overlay(Capsule().stroke(Color.white.opacity(0.3), lineWidth: 0.5))
            .contentShape(Capsule())
    }
}

/// Card 1: timer, title and position on the left, Back and Next on the right.
private struct ControlCardView: View {
    let attributes: WorkoutActivityAttributes
    let state: WorkoutActivityAttributes.ContentState

    var body: some View {
        HStack(alignment: .center, spacing: 8) {
            Text(timerInterval: attributes.startedAt...Date.distantFuture, countsDown: false, showsHours: true)
                .font(.system(size: 32, weight: .bold).monospacedDigit())
                .lineLimit(1)
                .minimumScaleFactor(0.7)
                .frame(width: 122, alignment: .leading)
            VStack(alignment: .leading, spacing: 0) {
                Text(state.title)
                    .font(.system(size: 14, weight: .bold))
                    .lineLimit(1)
                    .truncationMode(.tail)
                (Text(state.position)
                    + Text(state.heartRate.map { "  ♥ \($0)" } ?? "")
                        .foregroundColor(Color(red: 1, green: 0.35, blue: 0.45)))
                    .font(.system(size: 13, weight: .semibold))
                    .foregroundStyle(.white.opacity(0.65))
                    .lineLimit(1)
            }
            Spacer(minLength: 4)
            if !state.isFirst {
                Button(intent: PrevScreenIntent()) { NavCapsule(label: "‹") }
                    .buttonStyle(.plain)
            }
            if !state.isLast {
                Button(intent: NextScreenIntent()) { NavCapsule(label: "Next ›") }
                    .buttonStyle(.plain)
            }
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
    }
}

/// Card 2: title and exercise rows only. Must fit the ~160 pt lock-screen limit with 5 rows.
private struct ListCardView: View {
    let state: WorkoutActivityAttributes.ContentState

    var body: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(state.title)
                .font(.system(size: 16, weight: .bold))
                .lineLimit(1)
                .truncationMode(.tail)
            ForEach(Array(state.rows.enumerated()), id: \.offset) { _, row in
                HStack(spacing: 6) {
                    if let pos = row.pos {
                        Circle().fill(rowDotColors[pos] ?? .white).frame(width: 8, height: 8)
                    }
                    Text(row.name)
                        .font(.system(size: 17, weight: .semibold))
                        .lineLimit(1)
                        .truncationMode(.tail)
                        .frame(maxWidth: .infinity, alignment: .leading)
                    Text(row.dose)
                        .font(.system(size: 16).monospacedDigit())
                        .foregroundStyle(.white.opacity(0.65))
                        .lineLimit(1)
                        .fixedSize(horizontal: true, vertical: false)
                }
            }
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 14)
        .padding(.vertical, 10)
    }
}
