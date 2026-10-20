import ActivityKit
import AppIntents
import SwiftUI
import WidgetKit

private let background = Color(red: 0x0E / 255, green: 0x11 / 255, blue: 0x16 / 255)

struct WorkoutLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: WorkoutActivityAttributes.self) { context in
            LockScreenView(attributes: context.attributes, state: context.state)
                .activityBackgroundTint(background)
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

    var body: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Text(attributes.dayTitle).font(.subheadline).foregroundStyle(.secondary).lineLimit(1)
                Spacer()
                Text(attributes.startedAt, style: .timer)
                    .font(.subheadline.monospacedDigit())
                    .multilineTextAlignment(.trailing)
            }
            Text(state.title).font(.headline).lineLimit(2)
            VStack(alignment: .leading, spacing: 1) {
                ForEach(Array(state.lines.enumerated()), id: \.offset) { _, line in
                    Text(line).font(.caption.monospacedDigit()).lineLimit(1)
                }
            }
            HStack {
                Text(state.position).font(.caption.monospacedDigit()).foregroundStyle(.secondary)
                if let hr = state.heartRate {
                    Label("\(hr)", systemImage: "heart.fill")
                        .font(.caption.monospacedDigit())
                        .foregroundStyle(.red)
                }
                Spacer()
                if !state.isLast {
                    Button(intent: NextScreenIntent()) { Text("Next").fontWeight(.semibold) }
                        .buttonStyle(.borderedProminent)
                }
            }
        }
        .foregroundStyle(.white)
        .padding()
    }
}
