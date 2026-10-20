import Capacitor

class TrainerViewController: CAPBridgeViewController {
    override func capacitorDidLoad() {
        bridge?.registerPluginInstance(TrainerNativePlugin())
    }
}
