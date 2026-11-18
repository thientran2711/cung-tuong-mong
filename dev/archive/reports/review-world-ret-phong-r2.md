PRIORITY #1 CHECK ('phongN|phongOpen|phongAfter|srvAge.ask|phong.min'): OD 0 | ledger 0 | claims 1 (this job) | main 0 for phongN/phongOpen (srvAge.ask = existing j42 maid rule, jbal.js:51) | review/* 3 (world-ret-phong, -r1, -r2 = this family)

# REVIEW world-ret-phong r2 (BIG opus, rules + numbers): **PASS 85545ce7** (branch review/world-ret-phong-r3)

Reviewer session_01UV1Szgs7rrynEBwLodvmU5 (same as r1), foreman C-AG #4 session_01UV1SzkyZBYRFoSWBF8fg27. Context ~20 % of the window at the end; no handover.
Reviewed: worker r2 82a3b344 (fix aef46180 on the r1 base a15e6047). Reviewer head **85545ce7** = 82a3b344 + merges of origin/main 03a776e4, c114ab9e, d4a850ce, 03f97e15 (only generated files conflicted: index.html / sw.js / assets.json, rebuilt by assemble.py + build_site.sh) + one test-only fix (below).

**Landing note:** main moved again while QUICKCHECK ran (3ac036d5, looks-2 r2). Those commits touch no world file; `git merge-tree` shows only index.html + sw.js conflicts. The coordinator lands with the usual generated-files merge + rebuild (no code decision needed), or asks me for one more merge.

## r1 fix list → result
| # | r1 item | r2 | verdict |
|---|---|---|---|
| 1 | gate pool ≠ release pool | ONE pool `phongN()` over `[S].concat(phongHH())`, `phongHH = liveR()` (alive, not lãnh cung); phong.start releases from the same `phongHH`; no phong code counts `allServ()` | OK |
| 2 | event unreachable | mãn hạn = `BAL.srvAge.ask` (25, the j42 rule she meets as a maid; rk ≥ 3 stays as ma ma — same rule both sides, no new age number); `phong.min` 3 → 2; spring odds `phong.p:70`; ONE opener `phongOpen(p,cause,o)` for calendar + trộm + đại hàn, odds clamped `BAL.odds.lo..hi`; `phongAfter = phongOpen`. A household keeps one maid only when ≥ 2 are due; the start line drops "N người … đã ra đi" when n = 0 (only her own are due) | OK; gain/risk table in the worker report is sound (Được lớn hơn) |
| 3 | bot proof | worldbot now prints `phongSum` (per cause, released n + mine, empty, smallest gap) | OK, re-run by the reviewer below |
| 4 | dead / lãnh cung test row | world_check2 row: aged maids only in a dead + a lãnh cung household → calendar, trộm end, đại hàn end open nothing | OK |
| 5 | rerun gates | see Tests | OK |

## Reviewer bot (dev/measure/worldbot.js on the r2 build, seeds 4–6 — not the worker's 1–3 — × 25 years)
| seed | calendar /yr | đại hàn /yr | trộm /yr | released per window (n + mine) | empty | smallest gap (cd 24) | errors |
|---|---|---|---|---|---|---|---|
| 4 | 0.16 | 0.04 | 0.04 | 2,2,2,1,3,2 | 0 | 36 | 0 |
| 5 | 0.20 | 0.08 | 0.04 | 1,3,3,3,2,3,2,3 | 0 | 39 | 0 |
| 6 | 0.12 | 0.08 | 0 | 4,2,2,2,2 | 0 | 36 | 0 |
Total ≈ 0.33 /yr ≈ one release every 3 years; with the worker's seeds 1–3 (0.27 /yr) the family is a real, rare, never-empty event. ret ends 0.48–0.56 /yr, trộm ends 0.08–0.16 /yr; jworld err 0, page errors 0, stuck 0. A "1" = one aged maid left from a household that kept another, or one of hers: not empty.

## Rules
- ONE-CORE: every number from BAL (phong.p/min, srvAge.ask, ret.phongP, trom.phongP, odds.lo/hi); one-core-guard PASS.
- VANPHONG: causes "Sau trận đại hàn, Hoàng thượng cho giảm bớt người trong cung", "Sau án trộm, …", "Cung nữ mãn hạn, theo lệ cho xuất cung"; start line without the "0 người" clause; no %, no typed numbers.
- Kit-first: no UI change (existing world pop-up / info card).
- Co-op: openers run in the host's worldTick; worldStart host() gate unchanged; no guest logic (OD:L1493).
- Old save: no new save key; world_check2 old-save row ok; QUICKCHECK old save ok.

## Test-only fix by the reviewer (6e4fd9cb on this branch: "world_check2 §1: a kind she died in is played again")
After the main merges world_check2 failed 2 / 30 runs (FAIL 9/43 or 2/43): her random death during the 17-kind playthrough of §1 (diagnosed `dead:true`) made that kind and every later one fail (worldStart needs !S.dead). Not caused by this branch (the phong rows pass; the failing kinds varied: cam … tinh, benh, trung, ret). Fix: fresh() is kept as `window.__wcFresh`; a kind she died in is played again on a new life (max 3 tries). 21/21 PASS after (was 13/15 with seeded dice only — not kept).

## Tests on 85545ce7 (main 03f97e15 merged)
- world_check2 **PASS 43/43** (21/21 runs after the fix).
- world_check **PASS 25/25**.
- one-core-guard **PASS**.
- QUICKCHECK **PASS** · 169 s · open 1801 ms · old save ok · perf new/live render 193/193 ms, tab 399/354, buổi 928/1145, tasks>200ms 13/14 · core gates PASS.
No screenshots (no UI change). Scratch bot output only in the reviewer's scratchpad.
