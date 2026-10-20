import XCTest
@testable import App

final class HeartRateParseTests: XCTestCase {
    func testParsesUInt8Value() {
        XCTAssertEqual(HeartRateMonitor.parse(Data([0x00, 0x48])), 72)
    }

    func testParsesLittleEndianUInt16Value() {
        XCTAssertEqual(HeartRateMonitor.parse(Data([0x01, 0x2C, 0x01])), 300)
    }

    func testEmptyDataIsNil() {
        XCTAssertNil(HeartRateMonitor.parse(Data()))
    }

    func testTruncatedDataIsNil() {
        XCTAssertNil(HeartRateMonitor.parse(Data([0x00])))
        XCTAssertNil(HeartRateMonitor.parse(Data([0x01, 0x2C])))
    }
}

@MainActor
final class HeartRateSessionTests: XCTestCase {
    private func activeSession() -> WorkoutSession {
        let s = WorkoutSession(defaults: UserDefaults(suiteName: "test-\(UUID())")!)
        s.start(payload: SessionPayload(
            startedAt: Date(timeIntervalSince1970: 1000), planName: "V3", dayTitle: "Day A",
            snapshots: [LiveSnapshot(title: "A", lines: [], isLast: false),
                        LiveSnapshot(title: "B", lines: [], isLast: true)],
            index: 0))
        return s
    }

    func testStoredBpmSurvivesScreenChange() {
        let s = activeSession()
        _ = s.recordHeartRate(132, now: Date(timeIntervalSince1970: 0))
        _ = s.setIndex(1)
        XCTAssertEqual(s.currentState(heartRate: s.heartRate).heartRate, 132)
    }

    func testPushThrottledToFiveSeconds() {
        let s = activeSession()
        let t = Date(timeIntervalSince1970: 100)
        XCTAssertTrue(s.recordHeartRate(100, now: t))
        s.markPushed(at: t)
        XCTAssertFalse(s.recordHeartRate(101, now: t.addingTimeInterval(4.9)))
        XCTAssertEqual(s.heartRate, 101)
        XCTAssertTrue(s.recordHeartRate(102, now: t.addingTimeInterval(5)))
    }

    func testNilBpmBypassesThrottle() {
        let s = activeSession()
        let t = Date(timeIntervalSince1970: 100)
        s.markPushed(at: t)
        XCTAssertTrue(s.recordHeartRate(nil, now: t.addingTimeInterval(1)))
        XCTAssertNil(s.heartRate)
    }

    func testNoPushWithoutActiveSessionAndEndClearsBpm() {
        let idle = WorkoutSession(defaults: UserDefaults(suiteName: "test-\(UUID())")!)
        XCTAssertFalse(idle.recordHeartRate(90, now: Date()))
        let s = activeSession()
        _ = s.recordHeartRate(120, now: Date())
        s.end()
        XCTAssertNil(s.heartRate)
    }
}
