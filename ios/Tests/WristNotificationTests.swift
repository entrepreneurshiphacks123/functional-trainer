import XCTest
import UserNotifications
@testable import App

final class WristNotificationTests: XCTestCase {
    func testTitlePassesThrough() {
        let c = WristNotification.content(for: LiveSnapshot(title: "French Contrast", lines: ["a"], isLast: false))
        XCTAssertEqual(c.title, "French Contrast")
    }

    func testLongLineIsCutTo28PlusEllipsis() {
        let long = String(repeating: "x", count: 40)
        let c = WristNotification.content(for: LiveSnapshot(title: "T", lines: [long], isLast: false))
        XCTAssertEqual(c.body, String(repeating: "x", count: 28) + "…")
    }

    func testShortLineIsUntouched() {
        let exact = String(repeating: "y", count: 28)
        let c = WristNotification.content(for: LiveSnapshot(title: "T", lines: [exact], isLast: false))
        XCTAssertEqual(c.body, exact)
    }

    func testBodyHasFourLinesForFourLineSnapshot() {
        let c = WristNotification.content(for: LiveSnapshot(title: "T", lines: ["a", "b", "c", "d"], isLast: false))
        XCTAssertEqual(c.body.split(separator: "\n").count, 4)
    }

    func testSoundIsNil() {
        let c = WristNotification.content(for: LiveSnapshot(title: "T", lines: ["a"], isLast: false))
        XCTAssertNil(c.sound)
    }

    func testIdentifierIsFixed() {
        XCTAssertEqual(WristNotification.identifier, "workout-current")
    }

    func testFlagDefaultsToTrueAndPersists() {
        let d = UserDefaults(suiteName: "test-\(UUID())")!
        XCTAssertTrue(WristNotification.isOn(defaults: d))
        WristNotification.setOn(false, defaults: d)
        XCTAssertFalse(WristNotification.isOn(defaults: d))
        WristNotification.setOn(true, defaults: d)
        XCTAssertTrue(WristNotification.isOn(defaults: d))
    }
}
