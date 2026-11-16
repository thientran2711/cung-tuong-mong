SẴN SÀNG KIỂM 39f3eb22
# test-drift-roulette (worker, branch review/test-drift-roulette, base origin/main 399483e3)

No game code changed. Tests only (dev/test/*). START_CTX ~8 % (fresh worker); finished well under the rollover line, no handover needed.

## Verdicts
1. Roulette overlay (#kroul/#kroulw, "Bỏ qua") = TEST DRIFT. Fixed with ONE shared helper.
2. tutorial.js "tour did not start" = TEST DRIFT, NOT a game bug. Checked like a player at 755x1000 and 1180x820 (Playwright, screenshot seen): after the new-life popups are closed the first-run tour ("Game này là gì", lời dặn 1/12) starts at both sizes. Two reasons the old test never saw it: (a) the tour is OFF in automated browsers (navigator.webdriver) unless localStorage hclh-tut-test=1 (jtut.js autoOk, by design; the test sets the flag); (b) tutorial.js newLife() tapped the FIRST visible button of the identity card = the "Phi tần" filter tab, never "Nhận thân phận", so Q kept 3 popups ("Thân phận kiếp này", "Nhập cung", "Mệnh truyện kiếp này") and the tour stayed paused (busy). Same family checked: first-run download screen #kload, reward chest #kmrew, kit podium #kpodov, queued first-open tips: all behave as designed for a player (see below).

## What was added (dev/test/lib/)
- roulette.js: dismissRoulette(page) taps "Bỏ qua" (and "Vào cung ngay" on #kload), waits until gone; autoDismissRoulette(ctx|page) background tap; passNewLifePopups (taps "Nhận thân phận"/"Đã hiểu"/"Tiếp"/✕ by text); closeResult (podium "Tiếp", chest "Nhận", then the kit ✕ that now closes a mini-game result); clearMoments.
- pw-roulette.js: drop-in `require('./lib/pw-roulette')` instead of `require('playwright')`; every context/page gets the auto-dismiss + blocks the ~1 GB first-run download (bulk requests marked ctmload / x-ctm-load fail like offline, #kload then offers "Vào cung ngay", tapped like a player). Needed because a fresh profile otherwise downloads 955 MB and #kload covers every tap.
- run-family.sh (before/after runner), firstrun-probe.js (player-style first-run probe; TUT=1 sets the test flag).
- 43 tests switched to pw-roulette (39 that start a fresh life AND tap, + the 4 below). The other start-tests either already had the .krskip interval or only evaluate JS (never tap) so the overlay cannot block them.

## Before / after (755x1000@1, Playwright, one run each, sandbox)
| test | before (main 399483e3) | after | extra drift found behind the roulette and fixed in the test |
|---|---|---|---|
| podium | FAIL (kroulw intercepts tap) | PASS 35 s | kload; result closes with kit ✕ not #kg82ok; chest moment |
| minigames | FAIL (kroulw) | PASS 410 s (6 kinds + 2 lessons) | kload; podium + chest over result; #kg82ok hidden → kit ✕; NaN point guard in auto-player; `#ov .mg` strict (hidden twin) |
| minigames-j71 | FAIL | PASS 48 s | same as above |
| inv-grade | FAIL (kroul subtree intercepts) | PASS 25 s | slot pick list now lists candidates (tap item) and the wear act lives in #kidfl |
| toilette | timeout 170 s | PASS 149 s | kload; lip-ring tap loop too short under load (3x200 → up to 10x400) |
| mk-e2e | timeout 170 s | PASS 144 s | same lip loop |
| tutorial (tour,skip,replay) | FAIL "tour did not start" | PASS, no FAIL | newLife taps by text; queued Hành sự tip must be tapped before the Tài nghệ tip |
1180x820@1 (second owner device): podium PASS, inv-grade PASS, minigames-j71 PASS, tutorial PASS (after the tip fix; before the fix: "tip" + "tip shown twice" FAIL = the queued Hành sự tip, same cause).
Runs are alone, not parallel: toilette/mk-e2e/minigames are timing- and CPU-sensitive (a parallel run with 3 other browsers gave false FAILs). Not run: 1366x1024, the 39 mass-switched tests (syntax-checked with node --check only; the wrapper is a one-line change and the same helper already passes in the 7 above).

## Game-side notes (no change made; for the coordinator)
- First-run tour: works for a player at both sizes. Off for webdriver without the flag (by design).
- #kload first-run download blocks every tap until it ends or the player taps "Vào cung ngay" (offered only after a download error). Real players on a good network wait for 955 MB. Not touched; owner call if the screen should be skippable earlier.
- A reward chest (#kmrew/.kmov) can pop over a contest result in the middle of a flow; a player taps the chest then "Nhận". The helper does the same.

Branch: origin/review/test-drift-roulette @ 39f3eb22 (1 commit, 50 files, tests only).
