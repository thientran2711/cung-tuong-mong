PRIORITY #1 CHECK ('phongAfter|phongP|world-ret-phong'): OD 0 | ledger 0 | claims 7 | main 2 | review/* 1 (review/world-ret-phong = the branch under review)

# REVIEW world-ret-phong r1 (BIG opus, rules + numbers): **FAIL**

Reviewer session_01UV1Szgs7rrynEBwLodvmU5, foreman C-AG #3 session_01UV1Szh8FwC7dVrdZpdtNPP. START_CTX ~4 % of the window; finished ~12 %. No handover needed.
Branch under review: review/world-ret-phong 54cb809f (fast-forward of origin/main e8b1906f). Reviewer branch: **review/world-ret-phong-r1 a15e6047** (54cb809f + a test-only fix, see "Flake"); the r2 fix should start from it.

## What passes
| check | result |
|---|---|
| ONE helper for both causes | OK. `phongAfter(p,cause)` (jworld2.js:177) used by `EVD.ret.end` and `EVD.trom.end`; the old inline trộm `roll→ws` is gone; no second path. |
| own BAL number | OK. `BAL.world.ret.phongP:25` (jbal2.js:858), read only by ret.end; trộm keeps `trom.phongP:40`. The 25 vs 40 reasoning in the worker report is sound. |
| cd / maxOpen / host gate | OK. phongAfter goes through worldStart (jworld.js:60-64): host(), already-open skip, `phong.cd`, `maxOpen`. ends run only in the host's worldTick (jworld.js:305, inTick=1). No guest logic (OD:L1493). Note: ret/trom are still open while their end() runs, so maxOpen counts them (same as before for trộm; fine). |
| ONE-CORE | OK. one-core-guard PASS (fails 0, inline 5092 ≤ 5093). No typed number in the new text. |
| VANPHONG | OK. "Sau trận đại hàn, Hoàng thượng cho giảm bớt người trong cung" — cổ trang, no %, no number. |
| kit-first | OK. No UI change; the phong window uses the existing world pop-up / info card. |
| old save | OK. No new save key (BAL only); world_check2 "old save without S.wwin plays" ok. |
| world_check2 | PASS 42/42 (ret rate 27/25, trom 40/40, hit/miss/cd/min ok). |
| world_check | PASS 10/10 after the reviewer's test fix (see "Flake"). |
| bot errors | 0 jworld errors, 0 page errors in 3 × 30 game years. |

## Flake (fixed by the reviewer, test-only)
world_check "center pop-up at the start, with her own options" (Sứ đoàn) failed when fresh() rolled a maid start (no consort options). Not caused by this branch. Fix a15e6047: world_check.js fresh() uses the same consort-start loop as world_check2. 10/10 PASS after.

## Why FAIL: the phóng cung nhân family is dead in real play, and the gate still allows an empty release
Bot (dev/measure/worldbot.js + a per-tuần probe of the `aged` count; seeds 1-3 × 30 years and 11-13 × 25 years, first option on every card, new life on death):
| measure | result |
|---|---|
| phong windows opened (any cause: spring calendar, trộm, đại hàn) | **0 in 90 game years** (ret ends ~.47/yr, trộm ends ~.18/yr) |
| aged maids (jworld2 `aged`) in the households phong.start releases (S + liveR) | **0 in 2700 of 2700 tuần** |
| aged maids counted by the gate (`allServ()`, every rival incl. dead / lãnh cung) | 0: 2386 tuần, 1: 230, 2: 84 |

1. **Dead feature (root cause, whole family).** Live households never hold a maid that matches `aged` (age ≥ BAL.srvAge.out 30, not rk ≥ 3, no eid): long-serving maids reach rk ≥ 3 (excluded, they stay as ma ma) or leave by turnover first. So `BAL.world.phong.min:3` is never met, the spring calendar (jworld2.js:271) never opens, and the new ret link never fires — the same "dead number" reason review-world-events-2-r1 item 1 gave for removing `phong.afterP`. On main the only phong windows came from the ungated trộm path, and those were empty releases (the ~.06-.09 /yr in review-world-events-2-r1 line 37). This branch removes the empty ones correctly, which leaves phong at 0.
2. **Gate pool ≠ release pool → empty release still possible.** The gate counts `allServ()` (every rival, dead and lãnh cung included, jworld2.js:177 and :271); phong.start releases only `liveR()` households and reports her own as `mine`. Aged maids that sit only in a dead / lãnh cung household pass the gate and open "0 người ở các cung đã ra đi" (seed 12 reached 2 such maids; with min 3 it is one maid away).

## Fix list (worker, on review/world-ret-phong-r2 from a15e6047)
1. ONE pool helper (jworld2.js, next to `aged`), e.g. `phongN()` = aged maids in `[S].concat(liveR())` staff; use it in the spring calendar gate (:271), in `phongAfter`, and nowhere count `allServ()` for phong. LUẬT SỬA CẢ NHÓM: every phong opener reads it.
2. Make the event reachable with ONE-CORE numbers: find which system keeps live-household maids from ever matching `aged` (rk ≥ 3 promotion, turnover), then set the "mãn hạn" rule for the release from BAL (e.g. a `BAL.world.phong.age`, or count by years of service, or include the rule for rk ≥ 3 that matches the player-side j42 ma ma rule) and/or `phong.min`, so the spring release happens about once every few years and ret/trom add a little on top. Justify the numbers in the report (owner rule: numbers are ours to decide; follow the gain/risk format).
3. Bot proof: worldbot (≥3 seeds × ≥25 years) reports phong /yr split by cause (calendar / trộm / đại hàn), released count per window (n + mine), **0 empty releases**, no runaway (phong cd 24 respected), 0 errors.
4. world_check2: add a row — aged maids only in a dead (or lãnh cung) rival household → ret/trộm end and the spring calendar open nothing.
5. Re-run world_check, world_check2, one-core-guard, QUICKCHECK; report with the PRIORITY #1 line first.

Not run by the reviewer: QUICKCHECK (verdict is FAIL on design grounds; the worker's QUICKCHECK on 54cb809f was PASS and the reviewer change is test-only). No screenshots (no UI change). Scratch bot files stay in the reviewer's scratchpad, nothing in git.
