import CoreBluetooth
import Foundation

/// Reads a standard BLE heart-rate broadcast (service 0x180D, characteristic 0x2A37).
@MainActor
final class HeartRateMonitor: NSObject, @preconcurrency CBCentralManagerDelegate, @preconcurrency CBPeripheralDelegate {
    enum Status: String { case connected, searching, off }

    static let serviceUUID = CBUUID(string: "180D")
    static let measurementUUID = CBUUID(string: "2A37")

    var onUpdate: ((Int?, Status) -> Void)?

    private var central: CBCentralManager?
    private var peripheral: CBPeripheral?
    private var running = false

    /// Heart Rate Measurement: bit 0 of the flags byte picks UInt8 (0) or little-endian UInt16 (1).
    nonisolated static func parse(_ data: Data) -> Int? {
        let b = [UInt8](data)
        guard let flags = b.first else { return nil }
        if flags & 0x01 == 0 {
            return b.count >= 2 ? Int(b[1]) : nil
        }
        return b.count >= 3 ? Int(b[1]) | (Int(b[2]) << 8) : nil
    }

    func start() {
        guard !running else { return }
        running = true
        onUpdate?(nil, .searching)
        if let central {
            if central.state == .poweredOn { scan() }
        } else {
            central = CBCentralManager(delegate: self, queue: .main)
        }
    }

    func stop() {
        running = false
        central?.stopScan()
        if let peripheral { central?.cancelPeripheralConnection(peripheral) }
        peripheral = nil
        onUpdate?(nil, .off)
    }

    private func scan() {
        guard running, peripheral == nil else { return }
        central?.scanForPeripherals(withServices: [Self.serviceUUID])
    }

    private func lost() {
        peripheral = nil
        guard running else { return }
        onUpdate?(nil, .searching)
        scan()
    }

    // MARK: CBCentralManagerDelegate

    func centralManagerDidUpdateState(_ central: CBCentralManager) {
        if central.state == .poweredOn { scan() }
    }

    func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral,
                        advertisementData: [String: Any], rssi RSSI: NSNumber) {
        guard running, self.peripheral == nil else { return }
        central.stopScan()
        self.peripheral = peripheral
        peripheral.delegate = self
        central.connect(peripheral)
    }

    func centralManager(_ central: CBCentralManager, didConnect peripheral: CBPeripheral) {
        peripheral.discoverServices([Self.serviceUUID])
    }

    func centralManager(_ central: CBCentralManager, didFailToConnect peripheral: CBPeripheral, error: Error?) {
        lost()
    }

    func centralManager(_ central: CBCentralManager, didDisconnectPeripheral peripheral: CBPeripheral, error: Error?) {
        lost()
    }

    // MARK: CBPeripheralDelegate

    func peripheral(_ peripheral: CBPeripheral, didDiscoverServices error: Error?) {
        guard let service = peripheral.services?.first(where: { $0.uuid == Self.serviceUUID }) else { return }
        peripheral.discoverCharacteristics([Self.measurementUUID], for: service)
    }

    func peripheral(_ peripheral: CBPeripheral, didDiscoverCharacteristicsFor service: CBService, error: Error?) {
        guard let c = service.characteristics?.first(where: { $0.uuid == Self.measurementUUID }) else { return }
        peripheral.setNotifyValue(true, for: c)
    }

    func peripheral(_ peripheral: CBPeripheral, didUpdateNotificationStateFor characteristic: CBCharacteristic, error: Error?) {
        if characteristic.isNotifying, running { onUpdate?(nil, .connected) }
    }

    func peripheral(_ peripheral: CBPeripheral, didUpdateValueFor characteristic: CBCharacteristic, error: Error?) {
        guard running, let data = characteristic.value, let bpm = Self.parse(data) else { return }
        onUpdate?(bpm, .connected)
    }
}
