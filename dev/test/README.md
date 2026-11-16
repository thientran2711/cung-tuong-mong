# dev/test — how to test on REAL devices (D22)

Plain `chromium.launch()` + `viewport` is NOT a phone. Use `dev/test/lib/device.js`.

## Quick start
```js
const {chromium}=require('playwright'); const D=require('./lib/device');   // from dev/test/*.js
const srv=await D.serveRoot();                       // serves the BUILT repo root (index.html + rot.js + assets) on a free port
const b=await chromium.launch();                     // ONE Chromium per process; behind the proxy add {proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}
const ctx=await D.newDeviceContext(b,'iphone14');    // UA, viewport, DSF, isMobile, hasTouch, platform/maxTouchPoints, no vibrate on iOS, SW blocked
const p=await ctx.newPage();
const game=await D.openHost(p,srv.url);              // HOST mode: built index.html through rot.js; `game` = the #krotf Frame
await game.evaluate(()=>{ /* start(), S, render() … live here, NOT on p */ });
console.log(await D.probe(p));                       // {host, rotated, s, tip, ua, platform, coarse, hover, dpr, inner, frameInner…}
await b.close(); srv.close();
```
Self-test of all profiles: `node dev/test/device-selftest.js [device…]`. Example assertions: `node dev/test/rotate-prompt.js`.
Migrated examples: `book-title.js` (profiles; `HOST=1` = host mode), `boot-flash.js` (`DEVICE=iphone14`).

## Profiles (`D.DEVICES`)
fold 755x1000@2.625 (Android Chrome UA) · foldLand 1000x755 · foldOuter 360x800 · iphone14 390x844@3 (iPhone UA) · iphone14Land 844x390 ·
pixel 412x915 · pixelLand · ipadAir 1180x820@2 (iPadOS UA = MACINTOSH + platform MacIntel + 5 touch points) · ipadAirPort 820x1180 ·
ipadPro 1366x1024 · ipadProPort 1024x1366 · ipadOld 1024x768 (`iPad; CPU OS 15` UA) · desktop 1280x800 (mouse: hover:hover, pointer:fine).
Options (2nd/3rd arg `extra`): any Playwright context option (default `serviceWorkers:'block'`), plus `standalone:true` (installed PWA: `navigator.standalone`), `vibrate:true|false`.

## Host mode vs direct mode (READ THIS)
- Built root `index.html` = rot.js HOST: the game runs in ONE iframe `#krotf` at the DESIGN size (landscape 1180x820 spread / portrait ONE PAGE 590x820 = iPad half, KIT §0), scaled to the screen.
  Narrow portrait (w/h < 0.62: 390x844, 412x915, 360x800) = frame rotated 90 deg + prompt "Xoay ngang điện thoại để chơi". Inside the frame
  `innerWidth/innerHeight` and every media query read the design size, so e.g. Fold landscape 1000x755 and iPad Pro 1366x1024 are really played at 1180x820.
- `dev/index.html` (or any run with `navigator.webdriver`) = DIRECT mode: no host, the game sees the real viewport. Playwright is a webdriver, so rot.js picks
  direct mode unless the URL has `?khost=1`. That is why tests "found no rotate prompt" on dev/index.html (it has no rot.js; the built root index.html does, and in
  direct mode it shows the prompt but never rotates or scales).
- `D.openHost(page,url)` adds `?khost=1`; `D.openDirect(page,url)` adds `?khost=0`. Use HOST for anything a player sees on a real device (layout at 1000x755,
  1366x1024, 844x390, 390x844, touch/drag coordinates through the transform); DIRECT is fine for logic tests and iPad 1180x820 where design size = viewport (Fold portrait: host canvas is 590x820, use HOST for layout).
- Game globals (`start`, `S`, `render`, `kitView`) live in the frame: use `game.evaluate`, `game.waitForFunction`, `game.locator`. Screenshots/clicks use the page (`p.screenshot`, `p.touchscreen`).
- The built index.html must be fresh: run `bash dev/site/build_site.sh` first (dev/index.html alone has no rot.js). A test that serves a different build: `D.serveRoot(dir)`.
- SW: contexts block service workers by default (clean state). To test the SW pass `{serviceWorkers:'allow'}`.

## What desktop-style tests never exercise (UA / device branches in game code)
See `dev/PROGRESS_ua-test.md` for the list (iOS "add to home screen" note, hover glow, pointer:coarse hint, vibrate, standalone, safe-area, old-Safari regex).
Rule: a fix that touches one of these needs one run of the matching profile (`iphone14` / `ipadAir` / `fold`) in HOST mode.

## Performance budget test (D15)
`node dev/test/perf.js` (see header of the file and dev/PROGRESS_perf.md): first-load bytes / time to title / time to first turn / heap after 10 buổi / long tasks on fold, iphone14, ipadAir; budget in `perf-budget.json`; exit 1 when over. Note: it enables the service worker (unlike the other profile tests).

### First-hour list + fresh-install / offline / update checks (review/perf-r1)
- `dev/site/first-hour.txt` decides what blocks entry (assets.py group `core`). It is GENERATED: `node dev/measure/firsthour.js fold,ipadAir 0 3`
  (needs the built root + the CDN; one life per origin incl. the cung nữ road `cnv`, 3 weeks each; the new list is the union with the old one),
  then `bash dev/site/build_site.sh`. Re-run it whenever a branch adds art that every new life sees in its first weeks (new rooms, act pictures,
  kit pictures, title/loading art), otherwise that art is `lazy` (fetched when first shown: fine online, missing offline until seen once).
- `node dev/test/lazy-offline.js --devices fold,iphone14 --lives 2 --weeks 2 --save-data --offline`: fresh install (SW on, host mode, no background
  set), counts pictures the first weeks needed that were NOT downloaded ahead (group lazy, fetched on use), broken pictures, then offline: every
  file seen must come from the cache and the saved life's rooms must show. Exit 1 on a broken picture or a seen file not served offline.
- `node dev/test/upgrade-sw.js --old <root of an older built checkout>`: returning install, old SW + old ctm-assets -> this build (pictures stubbed,
  keys real): new worker in control, no stale index, one shell cache, still-valid asset keys kept, core complete, offline reload on the new build.
## KIT §81 scene end in tests (`dev/test/lib/kmscene.js`)
A kit scene (card flip, edict, bloom, gloom, ink…) waits for its end button `.kmov.km-endon > .kmend`. A test that clicks through the motion queue (edict → reward chest → person reveal) must press it: `const KM=require('./lib/kmscene'); await KM.use(ctx)` before goto, then `__kmNext()` in page code. Without it the queue stays on the first scene (e.g. the Kính sự phòng flip at life start).
