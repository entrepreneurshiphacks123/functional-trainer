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

    func testSnapshotWithoutRowsDecodesWithEmptyRows() throws {
        let json = #"{"title":"T","lines":["a"],"isLast":false}"#.data(using: .utf8)!
        let snap = try JSONDecoder().decode(LiveSnapshot.self, from: json)
        XCTAssertEqual(snap.rows, [])
        XCTAssertEqual(snap.lines, ["a"])
    }

    func testSnapshotWithRowsDecodesPos() throws {
        let json = #"{"title":"T","lines":[],"rows":[{"name":"Squat","dose":"5 @ 80%","pos":1},{"name":"Plank","dose":"30s","pos":null}],"isLast":false}"#.data(using: .utf8)!
        let snap = try JSONDecoder().decode(LiveSnapshot.self, from: json)
        XCTAssertEqual(snap.rows, [LiveRow(name: "Squat", dose: "5 @ 80%", pos: 1), LiveRow(name: "Plank", dose: "30s", pos: nil)])
    }

    func testCurrentStateCarriesRows() {
        let s = WorkoutSession(defaults: suite())
        let rows = [LiveRow(name: "Squat", dose: "5", pos: 2)]
        s.start(payload: SessionPayload(
            startedAt: Date(timeIntervalSince1970: 1000), planName: "V3", dayTitle: "Day A",
            snapshots: [LiveSnapshot(title: "T", lines: [], rows: rows, isLast: true)], index: 0))
        XCTAssertEqual(s.currentState().rows, rows)
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

    func testApplyAfterEndRequestsAndPostsNothing() async {
        let s = WorkoutSession(defaults: suite())
        var pushes = 0, posts = 0
        s.pushHook = { _, _ in pushes += 1 }
        s.wristPostHook = { _ in posts += 1 }
        s.start(payload: payload())
        s.end()
        await s.apply()
        XCTAssertEqual(pushes, 0)
        XCTAssertEqual(posts, 0)
    }

    func testEndDuringPushSuppressesWristPost() async {
        let s = WorkoutSession(defaults: suite())
        var posts = 0
        s.wristPostHook = { _ in posts += 1 }
        s.start(payload: payload())
        s.pushHook = { _, _ in s.end() }
        await s.apply()
        XCTAssertEqual(posts, 0)
    }
}
