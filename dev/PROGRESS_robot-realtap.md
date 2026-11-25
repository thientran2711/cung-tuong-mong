# PROGRESS robot-realtap (ROLE A, brief dev/handover/briefs/F-robot-2511.md)

PRIORITY #1 CHECK: 'real tap|realtap|elementFromPoint|robot-audit' → OD 25/11 rows ~05:10Z/~05:15Z/~05:20Z/~05:40Z/~05:45Z | main: robot10.js (in-page JS bot, render off, cannot tap), act-dedupe-vp.js / flip-newlife.js (elementFromPoint + touchscreen idea REUSED) | review/robot10-coop-stuckcap-r: robot10-coop.js (coop-bot STEP = JS bot, reused only its room/kiếp/extra-life model) | claims: none.

## What it is
- `dev/test/realtap.js` — shared tap(page, target): wheel-scroll into view → hit-test (elementFromPoint, 5 points) → touchscreen.tap (Fold) / mouse.click (iPad) at that point. Covered / off-screen → «DEAD BUTTON» {screen, label, cover, shot}. Hint popups (#kpop) are not dead buttons. No .click()/dispatchEvent/game calls.
- `dev/test/robot-rt.js` — ONE solo life with real taps: title → Chơi một mình → Bắt đầu kiếp mới → roulette → Nhận thân phận → play to death / real ending. NO cap. Exit-road blacklist (EXIT_RE); an exit is tapped only if it is the only option (recorded exitPick {label,n,only:true}). Stuck = no game-clock step for stuckMin (15) → stuck bug + shot + save, unstick ladder (Escape → ✕ → reload + continue the same save), SAME life goes on. Save size logged every cp (50) buổi. Mini-game boards / scene gates without buttons get real taps inside the board.
- `dev/test/robot-rt-coop.js` — one co-op room, two seats (host Fold, guest iPad), room made and joined by taps (the guest TYPES the ám hiệu), both seats play with the same Seat player; a seat that finished its life plays the next kiếp in the same room (extra) until the friend's life ends.
- Results carry `harness:{kind:'realtap',realtap:true,jsClicks:0,...}` → `dev/measure/robot-audit.js` (handover branch) marks them VALID when the end is real.
- page.evaluate is used to READ (screen scan, S.year/turn/dead, save size) and for the pre-life setup only: window.__forceOrigin + the a67init road pick (the game's own dev hooks, the same as robot10) and a recording wrapper on over() that calls the game's over unchanged.

## Run (runners)
- solo: `node dev/test/robot-rt.js <LIVE url> <out> dev=fold origin=<o> road=<r> bot=sens seed=<n> life=<name>` (dev=ipad for iPad). One life per process; run lives in parallel (one robot = one life).
- co-op: `node dev/test/robot-rt-coop.js <LIVE url> <out> host=fold guest=ipad kiep=1 seed=<n> tag=<name> [hostOrigin= hostRoad= guestOrigin= guestRoad=]`.
- outputs: <out>/<life>.json + .md (+ shots-<life>/ for dead buttons / stuck; shots NEVER in git). STATUS line every hour on stdout; final line «LIFE DONE …» / «ROOM DONE …».
- audit: `node dev/measure/robot-audit.js <out>` (from the handover branch).

## Self-test 25/11 (LIVE github.io, slices — a slice is not a life)
| device | buổi | real taps | dead buttons | stuck | bugs | JS clicks |
|---|---|---|---|---|---|---|
| Fold 755x1000 | 4 | 34 | 0 | 0 | 0 | 0 |
| iPad 1180x820 | 4 | 43 | 1 (act card half under the fixed #tabs bar → fixed in harness: scroll it to the middle first, then tap) | 0 | 0 | 0 |
| co-op host Fold + guest iPad | room VRDG made + joined by taps (guest typed the code), both seats in the palace playing | — | — | — | — | 0 |
- grep: no `.click(` / `dispatchEvent` in dev/test/realtap.js, robot-rt.js, robot-rt-coop.js (only page.mouse.click / touchscreen.tap at hit-checked points).
- Not dead buttons by design: hint popups (#kpop), tap-out catcher (#kxcatch), pointer-events:none / disabled options, element gone between scan and tap.
- 25/11 fix 1 (runner s5 report): tutorial Lời dặn (#ktut, .ktut-blk blockers) = a gate layer: the robot taps the highlighted hole target first, else the tutorial's own buttons; covers inside #ktut are never dead buttons. A cover that CONTAINS the button (its own dialog / scroll edge) = clipped, not dead (s5 «Chương 1 … covered by div.dlg.kpsc»). Re-test Fold 4 buổi: 32 taps, 0 dead, 0 stuck.
- 25/11 fix 2 (F #6 triage): probe points now lie in the VISIBLE part of the button (viewport ∩ clipping scrollers) — a card half-hidden at the bottom of #panel is tapped on its visible part like a person (iPad «Học tập · Tài nghệ» under #tabs: was DEAD, now tapped at y741); centering scroll wheels over the element's OWN scroller (was the screen middle, which never scrolled #panel on iPad); fully clipped by its scroller = «clipped», not dead; a foreign cover is re-checked once after 2.5 s (dawn frame / scene passing). Re-test Fold 3 buổi 36 taps 0 dead; iPad geo probe tap ok.
- 25/11 fix 3-5: room-leave / back-to-title buttons never tapped (cbb90e91); open non-backdrop dialog = top layer, #title/#kload never a dead-button cover, host reads code from all buttons (c29a6b5b); in a dialog ✕/Lui before help / empty-label icons, and a close tapped 3× with the same dialog still there → «NO EFFECT» bug + shot. «Tâm trạng» stuck verdict: saves held ~2.9k duplicate queued person dialogs (pending P) built by the old picker tapping the mood bar behind the dialog; ✕ works (pops one). Game side: person-dialog queue has no dedupe (reported to F #6).
- 25/11 RESUME: every cp buổi (50) and every 10 min the seat writes <out>/<life>.ckpt.json (R + rng + the game's localStorage save) and flushes <life>.json/.md; `resume=1` (same out/life args) restores the save (setup), reopens it by taps (Chơi một mình → Tiếp tục), keeps the SAME life id, adds harness.resumed[] (audit counts one life). Test: Fold slice 3 → kill → resume to buổi 5 OK. Co-op rooms cannot resume (the room is gone): rerun the room.
- 25/11 map fix: a big in-page panel that is not a dialog (Dư đồ .mapsc, absolute 1162x599 over the stage) counts as the page: tabs / «Sang buổi» stay candidates. Test iPad: map open → «Sang buổi» tapped, 2 buổi, 0 stuck.
