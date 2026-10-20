#!/usr/bin/env bash
# One-command build, sign and install to Steven's iPhone. Also the 7-day re-sign path
# (free Personal Team builds expire after 7 days). Phone must be plugged in and unlocked.
set -euo pipefail

DEVICE_ID="00008140-001C54840EE3001C"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"

# xcodegen first: `cap sync` reads the generated project through the ios/App/App.xcodeproj symlink.
(cd "$ROOT/ios" && xcodegen generate)
(cd "$ROOT" && npm run build:native)
# Generate again: XcodeGen only adds files that exist at generate time, and the first pass
# ran before `cap sync` created public/, capacitor.config.json and config.xml.
(cd "$ROOT/ios" && xcodegen generate)

cd "$ROOT/ios"
xcodebuild -project App.xcodeproj -scheme App \
  -destination "id=$DEVICE_ID" -derivedDataPath build \
  -allowProvisioningUpdates build

xcrun devicectl device install app --device "$DEVICE_ID" \
  build/Build/Products/Debug-iphoneos/App.app
