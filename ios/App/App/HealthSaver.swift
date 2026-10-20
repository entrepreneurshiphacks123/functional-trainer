import Foundation
import HealthKit

/// What gets written to Health for one finished workout.
struct HealthWritePlan: @unchecked Sendable {
    let start: Date
    let end: Date
    let samples: [(Date, Int)]
}

enum HealthSaver {
    /// Pure: nil when the window is empty or backwards; drops samples outside start...end.
    static func plan(start: Date, end: Date, samples: [(Date, Int)]) -> HealthWritePlan? {
        guard end > start else { return nil }
        return HealthWritePlan(start: start, end: end,
                               samples: samples.filter { $0.0 >= start && $0.0 <= end })
    }

    /// Needs HealthKit on a device; verified at the device checkpoint, not unit-tested.
    static func save(_ plan: HealthWritePlan) async throws {
        guard HKHealthStore.isHealthDataAvailable() else { return }
        let store = HKHealthStore()
        let hr = HKQuantityType(.heartRate)
        try await store.requestAuthorization(toShare: [HKObjectType.workoutType(), hr], read: [])

        let config = HKWorkoutConfiguration()
        config.activityType = .functionalStrengthTraining
        config.locationType = .indoor
        let builder = HKWorkoutBuilder(healthStore: store, configuration: config, device: .local())

        try await builder.beginCollection(at: plan.start)
        if !plan.samples.isEmpty {
            let unit = HKUnit.count().unitDivided(by: .minute())
            let objects = plan.samples.map {
                HKQuantitySample(type: hr, quantity: HKQuantity(unit: unit, doubleValue: Double($0.1)),
                                 start: $0.0, end: $0.0)
            }
            try await builder.addSamples(objects)
        }
        try await builder.endCollection(at: plan.end)
        try await builder.addMetadata([HKMetadataKeyWorkoutBrandName: "Functional Trainer"])
        _ = try await builder.finishWorkout()
    }
}
