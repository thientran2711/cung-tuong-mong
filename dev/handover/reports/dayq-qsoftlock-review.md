# Q-SOFTLOCK review (BIG, opus) — worker SSK 886c1c1b → review sha 8acabdd1 (review/dayq-qsoftlock)

PRIORITY #1 CHECK ('Q-SOFTLOCK|dayq|kmFree|kmBusy'): OD 26/11 Q-SOFTLOCK rows (play-stopper) | main LIVE 03a8c17c (jdayq.js / j93 kmFree, kmPump, kmGen) | review/* review/dayq-qsoftlock (worker #5 SSK 886c1c1b, then 139a6583) | claims Q-SOFTLOCK #5 session_01D3E3NZbh2fpy8WkxGMhpHR. Brief: reports/coop-rebirth-stuck.md «ROLLOVER RV-CRS» + «Q-SOFTLOCK owner #2…#5».

**VERDICT: PASS 8acabdd1** = worker 139a6583 (886c1c1b + merge LIVE 53319e6f) + reviewer merge of LIVE 03a8c17c (renderer-mem). LIVE moved twice during the review; each merge: only index.html / sw.js conflicted → main's taken, `assemble.py` + `CTM_CHANGE=… build_site.sh`, main's CHANGE line kept. FF on LIVE 03a8c17c checked (`git merge-base --is-ancestor`). Game diff vs LIVE = dev/build/jdayq.js only (+ built files); the rest is dev/test.

## Code read (jdayq.js)
- (1) kmFree wrapper: when j93 says «not free», only a host ON SCREEN keeps that answer (dqKmReal = dqDawn || dqOn #kpodov / roulette / #kmrew); a ghost host is released after BAL.dayq.wake ms. Solo only (dqUi).
- (2) dqKmStale (700 ms tick): kmBusy + KMQ waiting + dqScreenEmpty for BAL.dayq.stale ms → `kmGen++; kmBusy=false; kmPump()`. Checked j93 kmPump: kmGen only voids the queue's own `fin` (release kmBusy + pump next); the job's closure (e.g. jflip cfPlay done → CFN / nfStep) is NOT cancelled, so no game state is dropped (law 6c safe). Same release kmReset already uses for a life. Nit (not a FAIL): a job voided after 10 s with nothing on screen could still paint later if its picture lands, and then overlap the next scene — cosmetic, only after a 10 s blank.
- (c) activity gate: an un-hidden #ov not on screen / left-over DF.play without .kfoc on screen stops holding after BAL.dayq.wake; co-op seat keeps the old answer.
- dqActEl / dqNewsPass / dqFreeScreen / dqMgStale: «first match» → dqOn «every match on screen» (same rule as r3/r4).
- dqNextHeal solo → dqNextSync (render()'s own rule; one writer, law 13 one net).
- Law 4: numbers from BAL.dayq {stale 10000, wake 2000} (the `||10000` / `||2000` fallbacks follow LIVE's existing pattern). No S key, no draw, no player text (law 7 n/a). No UI part (law 9 n/a).
- Law 11 family: scan-q-hold.py family B (scene-queue holders) LIVE 7 of 7 uncovered → branch 0 of 7; family A/B scan output identical before and after the 03a8c17c merge (renderer-mem adds no new hold-return).

## Gates (reviewer, ALONE, one at a time; UTF-8 servers 8801 branch / 8802 LIVE)
| gate | 886c1c1b | 8acabdd1 (final) | LIVE |
|---|---|---|---|
| sangbuoi-held A–L Fold 755x1000 + iPad 1180x820 (real taps) | ALL PASS 24/24 | **ALL PASS** | f573dc94, same test file, CASES=JKL: **J, K, L2 FAIL both devices** (J «flip never played (queue blocked by a stale job)», K «ghost #kmrew held kmFree», L2 «ghost DF.play held kmFree») |
| scan-q-hold family B | 0 of 7 | 0 of 7 | 7 of 7 |
| dayq-break | FAIL 4 (S.mg + data-coopWait rows, both devices) | — | **identical FAIL 4** on LIVE f573dc94 (same test file) → pre-existing, not this branch (healed +0: another render() re-enables #next) |
| coop-e2e | 143/143 | **143/143** | — |
| quickcheck --runs 5 | part 2 PASS (open 1903 ms, old save ok, render 182/175, tab 493/575, buổi 1029/1046) | part 2 **PASS** (open 1653 ms, old save ok «Bành Uyển Nhi» buổi ok 0 errors, render 171/171, tab 409/444, buổi 1196/965, tasks>200ms 21/22) | — |
| quickcheck core gates | only G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» Fold+iPad | same | same 2 cells on LIVE (verified by this reviewer on aa37de21, RV-SELX-FAIR) → pre-existing |
| dayq-hold-coop | not rerun by the reviewer | — | worker: LIVE b881686f 17/17 once, 7/15 once; branch 4/16 same row kinds; branch with LIVE's jdayq 4/16 → flaky on LIVE, branch ≤ LIVE. Accepted (co-op seat keeps the old kmFree answer by design; coop-e2e 143/143) |

## Videos
Worker FULL real-tap videos looked at (contact sheet every 8 s): qsoftlock-JKL-fold.mp4 (471 s) / qsoftlock-JKL-ipad.mp4 (289 s) — setup lives, day turns, «Tin báo» card shows, room returns, no stuck screen. CDN folder _review/dayq-qsoftlock NOT wiped by the reviewer (foreman / lander wipes after landing: `python3 dev/site/cdn_sync.py --wipe-review dayq-qsoftlock`).

## Laws touched
4 ok (BAL.dayq) · 6c ok (no job effect dropped) · 9 n/a · 11 ok (family B 0/7, A unchanged) · 12 ok (Fold + iPad) · 13 ok (one net: dqNextHeal → dqNextSync; SSK carries the check line) · 16 ok (only where a host / busy flag holds the queue with NOTHING on screen; co-op untouched).

## Separate findings for D (pre-existing, not this branch)
1. dayq-break S.mg / data-coopWait rows FAIL on LIVE too (some render() re-enables #next in those artificial states).
2. dayq-hold-coop unstable on LIVE — needs its own owner.
3. quickcheck G4 80-dialog-fixed «no empty Tốn / Được cell» on LIVE.

LAND READY review/dayq-qsoftlock 8acabdd1 (FF from LIVE 03a8c17c)

## ADDENDUM (26/11 ~23:55Z): LIVE moved to 4cfcda61 → reviewer merge 25828054 (built files only; jdayq.js byte-identical to 8acabdd1; scan A/B identical). Gates ALONE on 25828054: held A–L Fold+iPad ALL PASS · coop-e2e 143/143 · quickcheck --runs 5 PASS (old save ok); core gates only pre-existing G4.
LAND READY review/dayq-qsoftlock 25828054 (FF from LIVE 4cfcda61)

## ADDENDUM 2 (27/11 ~03:20Z): LIVE → a22cf45d → 540358c4 → 17f23656; reviewer re-merges 36497db1 → efda2628 → dccf4f83 (built files only; jdayq.js byte-identical; scan A/B identical). efda2628 full gates: held A–L ALL PASS · coop-e2e 143/143 · quickcheck part 2 PASS. dccf4f83: held J/K/L PASS (1 Fold K test-timing flake: the test scene was ON screen and correctly held the cards; K×8 rerun PASS). quickcheck core: only G4 90-button-crawl «Ô lưu · Lui» = identical FAIL on LIVE 540358c4 (×2) → pre-existing.
LAND READY review/dayq-qsoftlock dccf4f83 (FF from LIVE 17f23656)
