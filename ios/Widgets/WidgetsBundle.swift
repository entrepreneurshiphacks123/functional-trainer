import SwiftUI
import WidgetKit

// Placeholder so the extension embeds and signs. Task 4 replaces it with the Live Activity.
struct PlaceholderEntry: TimelineEntry {
    let date: Date
}

struct PlaceholderProvider: TimelineProvider {
    func placeholder(in context: Context) -> PlaceholderEntry { PlaceholderEntry(date: .now) }
    func getSnapshot(in context: Context, completion: @escaping @Sendable (PlaceholderEntry) -> Void) {
        completion(PlaceholderEntry(date: .now))
    }
    func getTimeline(in context: Context, completion: @escaping @Sendable (Timeline<PlaceholderEntry>) -> Void) {
        completion(Timeline(entries: [PlaceholderEntry(date: .now)], policy: .never))
    }
}

struct PlaceholderWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "PlaceholderWidget", provider: PlaceholderProvider()) { _ in
            Text("Functional Trainer")
        }
        .supportedFamilies([.systemSmall])
    }
}

@main
struct WidgetsBundle: WidgetBundle {
    var body: some Widget {
        PlaceholderWidget()
    }
}
