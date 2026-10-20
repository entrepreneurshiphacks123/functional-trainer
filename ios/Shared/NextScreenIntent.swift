import AppIntents

/// Lock-screen Next. Runs in the app process (LiveActivityIntent), so the app is
/// woken in the background even when the web view is suspended.
struct NextScreenIntent: LiveActivityIntent {
    static let title: LocalizedStringResource = "Next"

    init() {}

    @MainActor
    func perform() async throws -> some IntentResult {
        await WorkoutSession.shared.advanceAndApply()
        return .result()
    }
}
