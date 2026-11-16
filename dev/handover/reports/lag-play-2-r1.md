# lag-play-2-r1 — reviewer report (BIG review: perf + co-op) of review/lag-play-2 @ d006dfdd

Reviewer session session_01UV1SzjyH2iaj5P368p1TBN, coordinator main s22. Branch review/lag-play-2-r1.
VERDICT: PASS 6cba5143 (ancestor = origin/main b53ba8b9). Includes one small reviewer fix (urgent seat copy, below).

## Merge onto latest origin/main
- 1st merge onto 9fc1ac33 (lag-play r1 already live): real conflicts in 6 source files, resolved keeping BOTH sides:
  - coop/worker/src/index.js: room reply = main's `chat: await this.chatLoad()` + branch's `caps: ["seatd"]`.
  - dev/build/assemble.py: main's module list (+16 new modules) with `jlag2.js` kept LAST.
  - j11.js: branch `pxPreload()` + main's `pxCap()` (kitView().pages).
  - j57.js: main's tabsFit (kitView one page = 2 rows) + branch signature memo; `kitView().pages` added to the signature.
  - j79.js: main's run loop (kitRankPaint + kitNameTone + kitMarkPaint) + branch's "nested root walked once" skip.
  - jk4.js: main's kitTcFit + branch's `if(!window.__rdep)kitHdFit()` guard.
- 2nd merge onto b53ba8b9 (kit-fit-r1 went live during the review): assemble.py list (+jsteal.js), jlag2 kept last; site rebuilt.
- Generated files (index.html, sw.js, assets.json) taken from main and rebuilt with dev/site/build_site.sh each time.

## Reviewer fix (small, on this branch) — a08a152b
Live-behaviour regression found in the client send queue: the seat copy pushed on `pagehide` / `visibilitychange→hidden`
(`snapSave(true)`) is ~40 KB. On the live build it went out plain and synchronously (gzip only above 200 KB). In lag-play-2 every frame
above 8 KB goes through async CompressionStream inside a promise queue, so a page being closed / frozen on hide can lose its last seat
copy (the copy another device restores from). Fix: `COOP.send(obj,true)` = urgent: no gzip (up to 200 KB, like before), and sent at once
in the same call when nothing is queued; when something is queued it keeps its place (order kept, no `seatold` from overtaking).
`seatPush(o,now)` passes `now`. Checked in a browser against the live Worker: urgent idle → plain, synchronous; normal 40 KB → gzip,
async; urgent behind a queued gzip → sent after it, in order; idle again → synchronous. coop-e2e re-run after the fix: 59/59.

## Tests
| check | result |
|---|---|
| quickcheck.sh (open Fold, old save from LIVE build loads + plays a buổi, perf smoke vs live iPad) | PASS on 6cba5143 (164 s; perf median new/live: render 279/336 ms, tab 342/345, buổi 1030/1245, tasks>200ms 13/14). Also PASS on b5154616 |
| coop-e2e.js vs LIVE Worker (worker NOT deployed; caps absent → full gzip seat copies) | 59/59 on 6cba5143 and on a08a152b. (First run on b5154616 before the fix: 57/59, the 2 known flaky "start: each sees the other" timing checks the worker reported; passed on every rerun) |
| coop/worker tests: merge, vault (48), seat (incl. the 7 seatd checks), chat, ws | ALL OK (after merge with main's chat) |
| play-perf 2-min, Fold, main vs branch | main PASS (tap p95 1856, soak long tasks/min 101.5); branch PASS (tap p95 1000, soak 78.5/min) |
| play-perf 2-min, iPad Air, 3 runs main vs 4 runs branch | tab-tap latency median 752 vs 768 ms, p75 1312 vs 1464, p90 2800 vs 2704 (same); soak long tasks/min 108–112 vs 66–73 (−35 %). Budget misses on BOTH sides (main: idleFpsMin 29.5 once; branch: tapP95 4200 / 4176 twice, actLongTaskMax 6731 once) = box noise, single runs swing ±40 % as the worker noted |
| page errors | 0 (play-perf, tab shots, quickcheck) |
| visual: every main tab, Fold 755x1000 + iPad 1180x820, seeded life, real tab clicks, main vs branch pixel diff | 0 page errors, no horizontal overflow, same tab font (--tfs .86rem Fold / .8rem iPad) on all 16 tab views; second visits pixel-identical; first-visit diffs only where pictures were still loading (seen on main too: Dư đồ map blank on main 1 of 3 runs, act paintings placeholder on main 1 of 3) — no visual change from the branch |

Notes on the visual check: first-visit shots differed in some runs (act-card paintings / stage figures still loading). Traced: the img
`complete` time after the tab click is the same on both builds (main 625–880 ms, branch 603–826 ms, 4 alternating runs), and in static
shots main also showed the placeholder once — CDN load timing, not the branch. Second visit of the same tab = pixel-identical.

## Not covered / for the coordinator
- coop-lag.js with seat deltas: needs the Worker deployed (not done, per instruction). The live client path (no caps) is what was tested.
- The one 6.7 s long task in one iPad branch run (during the 4th tab tap, not in the tap latency) could be the idle Pixi preload on this
  SwiftShader box; it did not repeat in 3 other iPad runs. Watch `actLongTaskMax` on the owner's iPad after go-live.
- Goal tap p95 ≤ 200 ms still not reached (worker's own honest note; structural render-chain rewrite needed).

Shots: scratch only (/home/user/wt/lp2r1-out, deleted with the verdict); none uploaded, nothing in git.
