import AppIntents

/// Lock-screen Back. Mirrors `NextScreenIntent`.
struct PrevScreenIntent: LiveActivityIntent {
    static let title: LocalizedStringResource = "Back"

    init() {}

    @MainActor
    func perform() async throws -> some IntentResult {
        await WorkoutSession.shared.backAndApply()
        return .result()
    }
}
