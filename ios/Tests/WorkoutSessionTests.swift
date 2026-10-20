import XCTest
@testable import App

@MainActor
final class WorkoutSessionTests: XCTestCase {
    private func payload(index: Int = 0, startedAt: Date = Date(timeIntervalSince1970: 1000)) -> SessionPayload {
        SessionPayload(
            startedAt: startedAt, planName: "V3", dayTitle: "Day A",
            snapshots: [
                LiveSnapshot(title: "Warm-up", lines: ["a", "b"], isLast: false),
                LiveSnapshot(title: "French Contrast", lines: ["c"], isLast: false),
                LiveSnapshot(title: "Finish", lines: [], isLast: true),
            ],
            index: index)
    }

    private func suite() -> UserDefaults { UserDefaults(suiteName: "test-\(UUID())")! }

    func testAdvanceMovesForward() {
        let s = WorkoutSession(defaults: suite())
        s.start(payload: payload())
        XCTAssertTrue(s.advance())
        XCTAssertEqual(s.index, 1)
    }

    func testAdvanceOnLastReturnsFalse() {
        let s = WorkoutSession(defaults: suite())
        s.start(payload: payload(index: 2))
        XCTAssertFalse(s.advance())
        XCTAssertEqual(s.index, 2)
    }

    func testSetIndexClamps() {
        let s = WorkoutSession(defaults: suite())
        s.start(payload: payload())
        XCTAssertTrue(s.setIndex(99))
        XCTAssertEqual(s.index, 2)
        XCTAssertFalse(s.setIndex(99))
    }

    func testCurrentState() {
        let s = WorkoutSession(defaults: suite())
        s.start(payload: payload(index: 2))
        let st = s.currentState(heartRate: nil)
        XCTAssertEqual(st.title, "Finish")
        XCTAssertEqual(st.lines, [])
        XCTAssertTrue(st.isLast)
        XCTAssertEqual(st.position, "3 / 3")
        s.setIndex(1)
        XCTAssertEqual(s.currentState(heartRate: 120).lines, ["c"])
        XCTAssertEqual(s.currentState(heartRate: 120).heartRate, 120)
    }

    func testPersistsAndClears() {
        let d = suite()
        let s = WorkoutSession(defaults: d)
        s.start(payload: payload())
        s.advance()
        let restored = WorkoutSession(defaults: d)
        XCTAssertEqual(restored.index, 1)
        XCTAssertEqual(restored.snapshots.count, 3)
        s.end()
        XCTAssertEqual(WorkoutSession(defaults: d).snapshots.count, 0)
    }

    func testSameStartedAtKeepsIndexButReplacesSnapshots() {
        let s = WorkoutSession(defaults: suite())
        s.start(payload: payload())
        s.advance()
        var p = payload(index: 0)
        p.dayTitle = "Day B"
        s.start(payload: p)
        XCTAssertEqual(s.index, 1)
        XCTAssertEqual(s.dayTitle, "Day B")
        s.start(payload: payload(index: 2, startedAt: Date(timeIntervalSince1970: 2000)))
        XCTAssertEqual(s.index, 2)
    }
}
