PRIORITY #1 CHECK ('nfParked|night-final'): OD 6 | ledger 0 | claims 8 | main 7 | review/* 3 → reviewed the existing branch review/night-final-fix @ f7c54202, no rebuild.

# review-night-final-r2 — verdict: **PASS 52d5092d** (review/night-final-r2; lands after balance-core)

Reviewer session_01964izCMFu6Vj4oECszvM5j (opus), coordinator Foreman D #8. START_CTX ≈ 4 % of 1M (own estimate), ended ≈ 12 %.
Rules read: START_CORE, START_WORKER, START_REVIEWER; review-night-final-r1.md; night-final.md §13.

## Branch
review/night-final-r2 = f7c54202 + merge LIVE origin/main 9fdc1199 (trait-pool) = f4abdd97 + 52d5092d (test fix). origin/main 9fdc1199 is an ancestor (FF).
Still carries balance-core 9abcfa72 (not on main) → lands only after balance-core.
Merge conflicts (balance-core side vs trait-pool on main), resolved by combining both:
- j8 stealFit: main's `netIs(s,"sharp")` (trait-pool) + balance-core's `oSteal = stealBase(...)`.
- j85 npcStudy: `roll(BAL.start.npc.study*(1+BAL.net.k.study*netQ(v,"study")))` (balance-core BAL + trait-pool factor), main's renamed trait words (Ân cần|Khiêm nhường, Xảo quyệt), balance-core focus kept; addArtP = balance-core crsPush.
- assemble.py: main's list + jbalcore.js/jnf.js after jgrey.js (jfe.js stays right after jnf.js); index.html/sw.js/assets.json rebuilt.

## Checks (build f4abdd97 / 52d5092d)
| # | check | result |
|---|---|---|
| 1 | F1: coop-e2e (live Worker) ×2 | **60/60 · 60/60** (= live 60/60). PASS |
| 2 | coop-night | 99/99. PASS |
| 3 | night-coop-park.js (solo↔room mid-day, 6 cases) | ALL OK 6/6 |
| 4 | ONE root (code read of every jnf entry point) | `nfParked()` jnf.js:36 = COOPW.on; nfOn() = !nfParked(); flip, visRoll, nightScene, render rerun, endTurn, resolveTonight/rivalNight, click guard, step/wake, send/ask/act listener/room re-send all behind nfOn; act lists / ACT.ok / stealPass / j2 deck cards behind nfParked. Ungated leftovers are no-ops in co-op: stealWin counter, chooseM wrapper (send() checks nfOn), showModal timer (only pid nfch), SOC.steal.ok=false (same as live jsteal). Nothing new runs in co-op. PASS |
| 5 | jfe.js only while parked | `on()` needs `PK()` = window.nfParked(); solo: jfe's flip/nextBuoi/render hooks fall through to jnf → no double flip. PASS |
| 6 | solo: night-final 10/10 · night-multi 7/7 (×5) · night-steal-unit all PASS, 0 page errors · flip-entry 755x1000@2 + 1180x820@2 ALL OK | PASS (see fix below) |
| 7 | flip choice + hints, Fold 755x1000@2 + iPad 1180x820@2 (LOOKED, scratch /home/user/wt/nfr2-s) | 2 option cards + Thôi; Tranh sủng "dựa vào ân sủng; tài nghệ góp ít · thành: sủng chút ít · hỏng: mất chút sủng, chút đức" vs Chặn ngự giá "dựa vào nhan sắc, ân sủng; tài nghệ nặng ký … Hoàng hậu phật ý" — distinct, ladder chip Khó, no %. No overlap, no h-overflow, nothing cut (Fold: 2nd card in the option column's scroll, as r1). PASS |
| 8 | kit §32.8a/§43.0a families | timed-choice-fit OK 12 cases; fig-feet-fam 93 cases 0 px cut (755x1000, 1180x820, 390x844). PASS |
| 9 | one-core-guard | 0 fails. PASS |
| 10 | quickcheck.sh --runs 7 | PASS · open 1165 ms · old save ok · core gates PASS (incl. coop-one-world / G4) · render 225/217, tab 282/309, buổi 1047/855 (fresh random lives, gate PASS) |
| 11 | perf on ONE fixed save (live-made save deser'd into both, iPad 1180x820, CPU ×4, seeded random, 2 day buổi, 7 runs alternating, medians) | busy **324 / 365 ms (−11 %)**, render 255 / 279 ms. ≤ live +5 %: PASS |

## Reviewer fix (52d5092d)
night-multi case 3 failed 3/7 after the main merge: Chặn ngự giá loss "got Sủng −10, expected −8". Root: her own trait Nóng nảy — j1 `sg()` (every `apply` on her) scales Sủng by ×1.3; trait-pool makes that trait show up on her more often. Game behaviour is right (the choice card already prints "hỏng: Sủng −10" through the same sg); the test now expects `sg(lose.sung)`. 5/5 green after.

## Notes for main
- Co-op code still differs from main (both already reviewed in r1, not part of this fix): jcoopworld seatWeek tie rule (higher Sủng keeps the seat, OD 22:10Z audit) and jcoopone MUTE/ONLY_ME += empArtMonth/eaLearn (balance-core). coop-e2e equal to live with them.
- Open KIT REQUESTs from r1 unchanged (390x844 v3 frame info column; flip tassel).
- CDN img/_review/night-final/: wipe with the go-live of this branch.

PASS 52d5092d5769c5d25349d376c9427718e6289a97
