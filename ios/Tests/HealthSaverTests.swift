import XCTest
@testable import App

final class HealthSaverTests: XCTestCase {
    private let start = Date(timeIntervalSince1970: 1_000)
    private var end: Date { start.addingTimeInterval(600) }

    func testEndBeforeStartIsNil() {
        XCTAssertNil(HealthSaver.plan(start: end, end: start, samples: []))
    }

    func testEndEqualToStartIsNil() {
        XCTAssertNil(HealthSaver.plan(start: start, end: start, samples: []))
    }

    func testSamplesOutsideWindowAreDropped() {
        let samples: [(Date, Int)] = [
            (start.addingTimeInterval(-1), 90),
            (start.addingTimeInterval(10), 100),
            (start.addingTimeInterval(300), 120),
            (end, 130),
            (end.addingTimeInterval(1), 80),
        ]
        let plan = HealthSaver.plan(start: start, end: end, samples: samples)
        XCTAssertEqual(plan?.samples.map(\.1), [100, 120, 130])
    }

    func testEmptySamplesStillGivePlan() {
        let plan = HealthSaver.plan(start: start, end: end, samples: [])
        XCTAssertEqual(plan?.samples.count, 0)
        XCTAssertEqual(plan?.start, start)
        XCTAssertEqual(plan?.end, end)
    }
}
