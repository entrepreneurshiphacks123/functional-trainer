import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

struct WorkoutLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WorkoutActivityAttributes.self) { context in
            LockScreenView(attributes: context.attributes, state: context.state)
                .activityBackgroundTint(Color.black.opacity(0.25))
                .activitySystemActionForegroundColor(.white)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    Text(context.attributes.startedAt, style: .timer)
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
                Text(context.attributes.startedAt, style: .timer)
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

private struct LockScreenView: View {
    let attributes: WorkoutActivityAttributes
    let state: WorkoutActivityAttributes.ContentState

    private static let dotColors: [Int: Color] = [
        1: Color(red: 0xFF / 255, green: 0x5A / 255, blue: 0x4E / 255),
        2: Color(red: 0xFF / 255, green: 0x9F / 255, blue: 0x0A / 255),
        3: Color(red: 0xFF / 255, green: 0xD6 / 255, blue: 0x0A / 255),
        4: Color(red: 0x30 / 255, green: 0xD1 / 255, blue: 0x58 / 255),
    ]

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            HStack(spacing: 8) {
                Text(attributes.startedAt, style: .timer)
                    .font(.system(size: 24, weight: .bold).monospacedDigit())
                    .frame(width: 84, alignment: .leading)
                Text(state.title)
                    .font(.system(size: 13, weight: .bold))
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .frame(maxWidth: .infinity, alignment: .leading)
                if let hr = state.heartRate {
                    Text("♥ \(hr)")
                        .font(.system(size: 13, weight: .bold).monospacedDigit())
                        .foregroundStyle(Color(red: 1, green: 0.35, blue: 0.45))
                }
            }
            VStack(alignment: .leading, spacing: 2) {
                ForEach(Array(state.rows.enumerated()), id: \.offset) { _, row in
                    HStack(spacing: 6) {
                        if let pos = row.pos {
                            Circle().fill(Self.dotColors[pos] ?? .white).frame(width: 7, height: 7)
                        }
                        Text(row.name)
                            .font(.system(size: 13, weight: .semibold))
                            .lineLimit(1)
                            .truncationMode(.tail)
                            .frame(maxWidth: .infinity, alignment: .leading)
                        Text(row.dose)
                            .font(.system(size: 13).monospacedDigit())
                            .foregroundStyle(.white.opacity(0.65))
                    }
                }
            }
            HStack(spacing: 8) {
                Text("\(attributes.dayTitle) · \(state.position)")
                    .font(.system(size: 11))
                    .foregroundStyle(.white.opacity(0.45))
                    .lineLimit(1)
                    .truncationMode(.tail)
                    .frame(maxWidth: .infinity, alignment: .leading)
                if !state.isLast {
                    Button(intent: NextScreenIntent()) {
                        Text("Next ›")
                            .font(.system(size: 13, weight: .bold))
                            .padding(.horizontal, 14)
                            .padding(.vertical, 5)
                            .background(Capsule().fill(Color.white.opacity(0.18)))
                            .overlay(Capsule().stroke(Color.white.opacity(0.3), lineWidth: 0.5))
                    }
                    .buttonStyle(.plain)
                }
            }
        }
        .foregroundStyle(.white)
        .padding(.horizontal, 14)
        .padding(.top, 10)
        .padding(.bottom, 9)
    }
}
