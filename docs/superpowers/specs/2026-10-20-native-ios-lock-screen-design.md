# Native iPhone App with a Lock-Screen Workout Display: Design

Date: 2026-10-20.

## Why

Steven trains with his phone locked on the bench. Right now he has to unlock it to see the workout timer and what he's on. He wants to glance at the lock screen and see it. A home-screen web app can't put anything on the iOS lock screen, so the app has to become a native iPhone app.

## Goals

- The Functional Trainer is installed on Steven's iPhone 16 Pro as a real app with its own icon.
- While a workout runs, a **Live Activity** shows on the lock screen and in the Dynamic Island:
  - the active workout timer, counting up
  - the current exercise and its dose, like "Zercher squat · 4×5"
  - the position in the session, like "Block 3 of 5"
  - **in a block** (FC block, core circuit, any grouped screen): every exercise in the block. Lines show name and dose, shortened to fit. The lock screen has room for about 5 lines and Live Activities can't scroll, so a longer block shows its first 4 lines and "+N more".
  - optional blocks are labelled, like "Contrast 4 of 5 · optional"
  - live heart rate, once the band is connected (see Apple Health below)
- **No rest timer** (Steven's call). The timer shown is the **active workout timer**, the session stopwatch the player already runs, counting up from the start.
- A **"Next"** button on the lock screen that does the same thing as Next in the app, without unlocking.
- The Live Activity ends when the workout finishes or he ends it.

## Non-goals and anti-goals

- Don't rewrite the app in Swift. Keep the React app and every plan as is.
- Don't change the look of the app or how plans are built, beyond the additions this doc lists (Export/Import in Settings, the heart-rate readout).
- Don't break the Cloudflare Pages web version. It keeps building and deploying from the same code.
- No App Store, TestFlight or paid developer account.

## How it gets made (my calls)

- **Native shell: Capacitor** around the existing Vite and React build. The web code stays the single source of truth.
- **Live Activity: Swift** (ActivityKit and a WidgetKit extension), driven from the web app through a small Capacitor plugin the web code calls on workout start, screen change and workout end.
- **The timer has to keep running while the phone is locked.** The Live Activity counts up from the workout's **start time** (SwiftUI `Text(date, style: .timer)`), not from ticks pushed by JS.
- **"Next"** is a `LiveActivityIntent` button. It reaches the web app through the plugin event bridge, which advances the player the same way the in-app button does, then updates the Live Activity.
- **Project setup like Hushloom:** Xcode 27.1, free Personal Team `T2P62T7K9D`, installed to the device with `xcodebuild ... -allowProvisioningUpdates` and `devicectl device install app`. Free signing expires after 7 days. Ship a one-command rebuild-and-reinstall script (`scripts/reinstall.sh`).
- **Location:** the repo moves to `~/dev/PERSONAL/functional-trainer` (personal project). Keep the git remote.

## Existing data: carry it over (Steven's call)

The app keeps logs, plans and state in `localStorage` (`training_os_state_v1`, `training_os_plans_v1`, `training_os_plan_order_v1`, plus the load log). The native app's web view has its own storage, separate from Safari's, so nothing carries over by itself. History has to come across because it's how he tracks progress.

- Add **Export data** to Settings in the web version. It writes every `training_os_*` key, plus the load log, to one JSON file through the share sheet, with a clipboard copy as the fallback.
- Add **Import data** to Settings. In the native app it reads that file and restores the keys, after a confirmation that shows what will be replaced.
- Do the import once, at first install. Export also works as a backup.

## Apple Health (Steven's call)

- When a workout finishes, save it to Apple Health as a Functional Strength Training workout, with its start time, end time and plan/day name. Ask for Health permission the first time a workout ends.
- Health stores whole workouts, not sets, reps or loads. That detail stays in the app's own history.
- He has no Apple Watch, so no heart rate comes in by default. He wants a **wrist tracker**, not a chest strap, and chose the **Xiaomi Smart Band 10** (~$50), which can broadcast heart rate over standard Bluetooth. Build the heart-rate part now; test it once the band arrives. With the band: the app connects directly over the standard Bluetooth heart-rate service (the vendor app isn't involved), shows live heart rate in the app and on the lock screen, and saves the heart-rate samples to Health with the workout. That way Health gets the heart rate even if the vendor's own Health sync is patchy. He may need to turn on heart-rate broadcast on the band before each session; the app should say so if it finds no sensor.
- Check that HealthKit works under the free Personal Team before building on it.

## Calls settled after review (my calls)

- **Repo move is step 0.** Move the folder to `~/dev/PERSONAL/functional-trainer` and leave a symlink at the old path. The remote and the Cloudflare Pages deploy (driven by GitHub) are unaffected.
- **Bundle ID** `com.stevenellis.functionaltrainer`. Deployment target iOS 18, as in Hushloom.
- **Local updates only.** No APNs or push updates; a free team can't use them anyway.
- **Don't depend on an App Group.** `LiveActivityIntent` runs in the app's process, so the button can reach the app without a shared container. If a free team allows an App Group, it's fine to use one, but nothing should require it.
- **App killed mid-session:** acceptable if the lock-screen button opens the app and resumes on the saved screen. JS is the source of truth; Swift keeps no copy of the screen list.
- **Service worker:** disabled in the native build through a build-time flag (`VITE_NATIVE=1`). The Cloudflare build is unchanged.
- **Position line:** FC screens say "Contrast N of 5"; other screens show their section label ("Warm-up", "Complexes", "Lift 2 of 3").
- **Optional flag** comes from the new `optional` field in the V3 plan (see the V3 spec). Other plans don't set it.

## Left to the builder

- Live Activity visual layout, within the content rules above, matching the app's dark theme (`#0E1116`).
- Dynamic Island compact and expanded layouts.
- App icon (reuse `public/icons/icon-512.png`).
- How the Capacitor plugin is structured.
- The heart-rate readout's placement in the app (small, on the player screen).
- What the app does if the band disconnects mid-session (keep the workout going, show heart rate as missing).
