# PROGRESS ua-test (branch review/ua-test, D22 real-phone UA test mode)

## Built
- `dev/test/lib/device.js` — 13 exact device profiles (Fold, Fold land/outer, iPhone 14 port/land, Pixel port/land, iPad Air/Pro port/land, old iPad, desktop):
  UA, viewport/screen, DSF, isMobile, hasTouch, navigator.platform, maxTouchPoints, iOS has no navigator.vibrate, optional navigator.standalone.
  `serveRoot()` static server for the BUILT root site, `openHost()` (?khost=1, waits for the #krotf frame), `openDirect()` (?khost=0), `gameFrame()`, `probe()`.
- `dev/test/device-selftest.js` (all profiles, both modes), `dev/test/rotate-prompt.js` (9 devices x 2 modes: prompt, rotation, design size) — ALL PASS.
- Migrated examples: `dev/test/book-title.js` (profiles + `HOST=1`), `dev/test/boot-flash.js` (`DEVICE=<name>`).
- Docs: `dev/test/README.md` (how every worker uses it; host vs direct).
- No game code touched. No existing device helper found on origin/main or origin/review/* (searched isMobile/hasTouch/khost/devices[): only ad-hoc newContext literals in ~100 tests.

## How rot.js decides (dev/site/rot.js)
Direct mode when `?khost=0` or `navigator.webdriver` (unless `?khost=1`): no iframe, game sees the real viewport, narrow portrait still shows a non-tappable prompt.
Host mode otherwise: `<plaintext>` swallows the page, #krotf iframe at design size 1180x820 (landscape / narrow-pre-rotated) or 755x1000 (w/h >= .62 portrait), uniform scale, rotate 90 deg for w/h < .62.
"Host mode" in the ledger = this. dev/index.html has no rot.js at all (rot.js is inlined only by build_site.sh into root index.html).

## Findings
1. Layout actually played differs from what direct tests see: Fold landscape 1000x755 -> real = 1180x820 scaled .8475; iPad Pro 1366x1024 -> 1180x820 @1.1576; iPhone landscape 844x390 -> 1180x820 @.4756 (!);
   portrait iPads (820x1180, 1024x1366) -> 755x1000. Tests at 1000x755 / 1366x1024 / 844x390 / 390x844 in direct mode test layouts no player sees. Use HOST for those.
2. Host mode is only reachable with `?khost=1` under Playwright (webdriver) — hence all "NO rotate prompt" reports on dev/index.html.

## UA / device branches in game code (git grep origin/main dev/build j*.js, dev/site)
| where | branch | exercised by plain desktop tests? |
|---|---|---|
| jload.js:59-60,73 | IOS = /iP(ad\|hone\|od)/ UA or (platform MacIntel && maxTouchPoints>1); STANDALONE = display-mode standalone or navigator.standalone -> "add to home screen" note on iOS non-standalone | NO (needs iOS profile; `standalone:true` for the hidden case). iPad Mac-UA path only with ipadAir/ipadPro profiles |
| j5.js:25 (+ all4x builds) | `(pointer:coarse)` -> minigame Cầm hint omits "phím D F J K" | only with hasTouch+isMobile (coarse); plain viewport shows keys text |
| jfx.js:222, jmcal.js:209 | `(hover:hover)` glow and `(hover:hover) and (pointer:fine)` calendar hover | desktop only; touch profiles take the no-hover path |
| j11.js:24 vib() | navigator.vibrate (Android only; iOS none -> picture FX instead, jfx.js:5) | desktop Chromium HAS vibrate; iOS no-vibrate path unexercised before (profiles now delete it) |
| rot.js | webdriver->direct; narrow portrait rotate + prompt; screen.orientation.lock only when standalone/fullscreen narrow portrait; typing keyboard-shrink guard; visualViewport resize | host path NEVER in Playwright without ?khost=1; orientation.lock/standalone never |
| j0.js kRx | lookbehind regex for Safari < 16.4 (dev/test/webkit-syntax.js guards literals) | static scan only; ipadOld UA does not change engine (Chromium) |
| safe-area-inset (j87,j90,j93,jflip,jload, index.html :root) | env(safe-area-*) paddings | NEVER: Chromium emulation reports 0 insets (needs real notch / webkit) |
| jtut.js:162 orientationchange | tutorial re-place | not fired by viewport resize in tests |
| kboot.js:52 | logs UA slice to ctm-boot-err | n/a |
No UA bug found; no game change.

## Limits
Chromium only (engine of iOS Safari = WebKit not emulated: backdrop-filter, mix-blend, safe-area, lookbehind parse stay real-device checks).
