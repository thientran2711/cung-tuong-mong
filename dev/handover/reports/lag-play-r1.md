# lag-play-r1 — reviewer report (BIG tier: performance + co-op)

START_CTX ~6 % (est.). Reviewer session session_01UV1Szh3qnjMBBhwLSJrxVX, opened by MAIN s21.
Reviewed review/lag-play @ 7200e7d2 (base 2232ea32), merged onto origin/main 8f476f6f, then re-merged onto a0d93ac8 (tab-instant + pixi-tabs re-run PASS after it), on review/lag-play-r1.

## VERDICT: PASS (sha in the commit that adds this file; review/lag-play-r1 head, ancestor = origin/main a0d93ac8)

## Merge
- Conflict dev/test/play-perf.js (add/add): main got an A/B tab script of the same name from kit-marks-r1. Kept lag-play's play-perf.js
  (README + budget file point to it); main's script moved to dev/test/tab-perf-ab.js (usage line updated). index.html / sw.js rebuilt.

## Reviewer fixes (small, on r1)
1. Dư đồ leather unroll on a TAB change played in portrait too (worker left it open). Owner 16/11 15:45Z: portrait tab change = no effect
   at all. jbook render wrapper: kitUnroll only when !kitIsPortrait(); landscape keeps it (15:45Z "effects only in landscape"; 15:55Z
   removes only the page turn). Coordinator: if the owner wants the landscape unroll gone too, it is one condition in jbook.js.
2. KIT.md canon overwrite: §34.0 items 4b/5/6, the code comment, §34.1 "Live wiring", the Dư đồ lines and §34.0a still said tab switches
   curl / slide / fade. Rewritten in place to "instant (§34.0a)"; §34.0a states the landscape-only unroll.
3. dev/test/tab-instant.js now taps Dư đồ too and checks .kl-unroll (portrait: must not run; landscape: must run).
4. New dev/test/pixi-tabs.js: Pixi room layer after 3 rounds over every tab (Fold returns via the real "Về phòng" button).

## Measurements (CPU 4x, this 4-CPU box, back to back, same scripts)
Main-thread busy time (play-prof.js, 3 reps, sampled − idle):
| action x3 | Fold main → r1 | iPad main → r1 |
|---|---|---|
| tab round | 30.9 → 13.9 s (−55 %) | 8.9 → 4.3 s (−52 %) |
| Sang buổi | 13.7 → 11.9 s (−13 %; r1 run incl. 2.2 s first Pixi init) | 11.2 → 8.8 s (−22 %) |
| act card + dialog | 9.2 → 8.0 s (−13 %) | 5.0 → 5.1 s (±0) |

play-perf.js 2-min bot, two runs each (main A/B vs r1 A/B):
| metric | Fold main | Fold r1 | iPad main | iPad r1 |
|---|---|---|---|---|
| tap p95 | 2.34 / 1.78 s | 1.18 / 1.12 s | 3.85 / 4.72 s | 4.09 / 4.25 s |
| worst long task while acting | 8.4 / 4.7 s | 6.7 (first tab = first Pixi load) / 1.5 s | 1.2 / 3.8 s | 0.8 / 2.9 s |
| worst long task in bot play (freeze) | 8.8 / 11.7 s | 2.0 / 2.0 s | 6.3 / 9.9 s | 2.4 / 2.0 s |
| live intervals end | 17 / 18 | 17 / 17 | 17 / 17 | 17 / 17 |
| page errors | 0 | 0 | 0 | 0 |
- Confirmed: tab busy −50 %, freeze 9–12 s → 2.0 s, Fold tap p95 ~1.1–1.2 s (worker 1.4 s).
- NOT reproduced: iPad tap p95 2.0 s. Here 4.1–4.2 s, same as main (3.9–4.7 s); the slow iPad tab taps have only 0.2–0.4 s of long
  tasks, so the time is paint/raster (SwiftShader software raster at 1180x820@2), not script. Budget tapP95 3.5 s missed on BOTH builds,
  r1 not worse → no FAIL by the README rule. Real-iPad check advised.
- Sang buổi/act-card busy: −13…−22 % (worker −25/−26 %): smaller but same direction.
- page-curl2.js tab tap: main "slide" 1320 ms → r1 "none" 132 ms (Fold); iPad "none" 123 ms.

## Checks
- tab-instant.js (7 tabs incl. Dư đồ, Fold + iPad): PASS 14/14, no page errors.
- Tuần lục page turn (page-curl2.js): Fold button turn = paper slide 315 ms, iPad = curl 1035 ms, fast taps leave no sheet, back OK, no
  overflow, no errors (drag "none" on main too).
- KIT §34.0a registered (+ stale lines fixed, fix 2).
- kit-conform 755x1000 + 1180x820: 87/89 CONFORMS on both builds; each run has one random place card that does not open (etq on main,
  tgk/etq on r1, same test flake on main) — no regression.
- book-live shots of every tab, Fold + iPad: no overflow, no curls, looked at the shots — no visual regression.
- pixi-tabs.js: PASS (canvas = stage box, visible, ticker as at start, after 21 round trips per device).
- Book with late figures (book-relayout.js): 1180x820 "jumped" FAILS on r1 AND on main (pre-existing, not from this branch;
  main also failed 1366x1024 in one run). → follow-up for lag-play-2 / book owner.
- coop-e2e.js: 59/59, incl. old save loads in solo, 0 page errors.
- coop-lag.js 6 buổi: main turn p95 10.3 s / action p95 3.6 s / worst task 7.0 s; r1 rerun 5.4 s / 4.4 s / 3.4 s, 6/6 turns.
  coopResendPerMin over budget on both (main 15.3, r1 13–14.8). First r1 run counted 1 "stuck" buổi = the week change (negative turn
  time, test-side counter), not reproduced in the rerun.

## Notes for the coordinator (not FAIL)
- dev/test/sheet-turn.js crashes now (kitCurlSwap.hold on a tab): obsolete for tabs as the worker said; retire or point it at kitBook.
- Leftovers already listed by the worker (render chain split, seat delta, leak, Pixi preload) are claimed by lag-play-2.
