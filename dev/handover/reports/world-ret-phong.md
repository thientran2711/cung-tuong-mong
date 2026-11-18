# world-ret-phong — đại hàn (ret) ends → đại phóng cung nhân (phong)

Worker world-ret-phong (opus), foreman C-AG #2 session_01UV1SziUGzeqJM9bXyR2ehR. Brief dev/handover/briefs/world-ret-phong.md.
START_CTX ~5 % of the window (roll-over at 30 %, ceiling 60 %); finished at ~12 %. No handover needed.

PRIORITY #1 CHECK ('phongP|phongAfter|afterP'): OD 0 | ledger 0 | claims 0 | main 2 (jbal2 trom.phongP, jworld2:166 trom end) | review/* 0. The trộm → phong link existed; rét → phong did not (review-world-events-2-r1 item 1 dropped the dead phong.afterP). Reused the trộm path; no second code path.

## Branch
`review/world-ret-phong` from origin/main e8b1906f → **54cb809f** (one commit, site rebuilt).

## What changed
- `dev/build/jworld2.js`: ONE helper `phongAfter(p,cause)` (right after `aged`): `roll(p)` → palace-wide count of aged maids (`allServ().filter(aged)`) ≥ `BAL.world.phong.min` → `ws("phong",cause)`. worldStart still applies phong's cd (24 tuần), maxOpen, the host gate, the "already open" skip.
  - `EVD.ret.end` calls `phongAfter(B().ret.phongP,"Sau trận đại hàn, Hoàng thượng cho giảm bớt người trong cung")`.
  - `EVD.trom.end`: the inline `if(roll(b.phongP))ws("phong",…)` replaced by the same helper (LUẬT SỬA CẢ NHÓM: one path for both causes).
- `dev/build/jbal2.js`: `BAL.world.ret.phongP:25` (one core, read only by ret.end).
- Co-op: unchanged design; world ends run in the host's worldTick (worldStart returns null off-host). No guest-side logic (OD:L1493).

## Family table (every "event end → phong" path)
| path | before | after |
|---|---|---|
| trộm end | roll trom.phongP → ws phong, even with 0 aged maids (an empty "0 người đã ra đi" window could open) | phongAfter: roll + phong.min aged maids + cd |
| đại hàn end | none (research row #13 "or after rét" not built) | phongAfter: roll ret.phongP + phong.min + cd |
| spring calendar (month 2) | phong.min + cd | unchanged (already gated) |
| other ends (vu cổ, đại xá…) | none in code; research mentions #10 / đại xá as possible later causes | not in this brief; untouched |

## Why 25 (vs trom.phongP 40)
Same range as trộm, lower on purpose: trộm is misconduct inside the households (a purge fits), rét is weather (cutting mouths to feed through a hard winter fits, but weaker). Rét can come about once a winter (cd 54 tuần) → at most ~1 in 4 winters adds a release; with phong.cd 24 an after-rét release in months 12–1 takes the place of the month-2 spring one, so the palace does not see two releases in a row. Text per VANPHONG (cổ trang, no %).

## Tests
- `node dev/test/world_check2.js dev/index.html` → **PASS 42/42** (was 39 + 2 new rows + count). New: for ret and trom each: hit (roll passes → phong opens), miss (roll fails → none), rate over 1000 ends = BAL phongP ±5 (ret 26/25, 22/25, 26/25; trom 41/40, 42/40, 40/40), cd (a second end inside phong.cd opens nothing), min (fewer aged maids palace-wide than phong.min → nothing).
- `node dev/test/world_check.js dev/index.html` → PASS 25/25 on 8 of 10 runs; 2 runs FAILED one row "center pop-up at the start, with her own options" (Sứ đoàn, opts []). Not touched by this change (Sứ đoàn has no phong/ret link); cause: world_check.js fresh() has no consort-start loop (world_check2's fresh() does), so a random maid start has no consort options. Base main gave 0/8 fails in my sample — small sample; flagged for the foreman as a test-harness flake, not fixed here (out of brief).
- `node dev/test/one-core-guard.js` → PASS (fails 0, inline 5092 ≤ baseline 5093).
- QUICKCHECK `bash dev/tools/quickcheck.sh` on 54cb809f → see last line below.
- **QUICKCHECK PASS** · 152 s · open 1709 ms · old save ok · perf new/live: render 210/183 ms, tab 301/294, buổi 927/844, tasks>200ms 13/12 · core gates PASS.

SẴN SÀNG KIỂM 54cb809f (review/world-ret-phong).

---
# r2 (after review r1 FAIL: the phóng cung family never fired in play)

PRIORITY #1 CHECK ('srvAge.ask|phongN|phongOpen|phong.min'): OD 0 | ledger 0 | claims 1 (this job) | main 0 for phongN/phongOpen; srvAge.ask = the j42 player-maid rule (j42.js:222, jbal.js:51) — reused, no new age number | review/* 1 (review/world-ret-phong-r1 = reviewer base).
Branch **review/world-ret-phong-r2** from review/world-ret-phong-r1 a15e6047 → aef46180 (fix) → **82a3b344** (merge origin/main b5d109fe; index.html/sw.js rebuilt; needed because main's one-core frozen list shrank to 4957). START_CTX ~5 %; now ~20 % (< 30 %), no successor needed.

## Root cause (probe, 3 seeds × 25 yrs, live households at month 2)
NPC maids enter at 18–26, stay a median of ~1 year (90th pct 3–6), and the long-stayers rise to rk ≥ 3 (excluded: they stay as ma ma). Maids aged ≥ 30 (srvAge.out) in a live household at month 2: 0 in almost every year → phong.min 3 never met. Aged ≥ 25 (srvAge.ask), rk < 3: 0–4 per spring (≥ 2 in ~45 % of springs, ≥ 3 in ~14 %).

## Fix (fix-list items 1–4)
1. ONE pool `phongN()` = aged maids in `[S].concat(liveR())` (liveRivals: alive, not lãnh cung); phong.start releases from the same households (`phongHH`). No phong code counts `allServ()` any more.
2. Reachable by BAL: mãn hạn = **BAL.srvAge.ask** (25; the same rule a maid player meets in j42: asked to leave at 25, a chưởng sự rk ≥ 3 may stay as ma ma; history: Qing palace women were released around 25 after their years of service — research row 13). `BAL.world.phong.min` 3 → **2**; new `BAL.world.phong.p:70` = spring odds. ONE opener `phongOpen(p,cause,o)` for the spring calendar, trộm end and đại hàn end, odds clamped `BAL.odds.lo..hi`. `phongAfter` = phongOpen.
   Never empty: an NPC household keeps one aged maid (npcKeep) only when it has ≥ 2, so someone always leaves; the start line drops the "0 người" clause when only her own maids are due.
3. Bot below. 4. world_check2 row added.

## Numbers — gain / risk
| choice | gain | risk (likelihood · weight · how caught / fixed) |
|---|---|---|
| age = srvAge.ask (25), not a new phong.age | one core: the same mãn hạn age for her and NPCs; reachable | NPC maids leave at 25 instead of 30 · certain by design · small (fillStaff refills at the end) · change one BAL number |
| min 2 (was 3) | spring release possible in ~45 % of springs | a release of only 2 maids feels small · likely · small · raise min in BAL |
| p 70 spring odds | brings ~0.45 → ~0.2–0.3 /yr ("once every few years") | seed spread (0.12–0.32 /yr) · likely · small · worldbot phongSum |
| keep only with ≥ 2 aged | never an empty window | NPCs keep slightly less often · likely · tiny |
Kết luận: Được lớn hơn — a dead feature becomes a real, rare, never-empty event using the existing age rule.

## Bot (dev/measure/worldbot.js now reports phongSum; final build 82a3b344; first option on every card; new life on death)
| seed × yrs | calendar /yr | đại hàn /yr | trộm /yr | released per window (n + mine) | empty | smallest gap (phong.cd 24) | errors |
|---|---|---|---|---|---|---|---|
| 1 × 25 | 0.32 | 0 | 0.08 | 2,2,3,2,2,2,2,2,3,2 | 0 | 36 | 0 |
| 2 × 25 | 0.16 | 0.04 | 0 | 3,2,2,2,2 | 0 | 68 | 0 |
| 3 × 25 | 0.12 | 0.08 | 0 | 2,2,2,3,2 | 0 | 29 | 0 |
| all 75 yrs | **0.20** | **0.04** | **0.027** | 2–3 | **0** | ≥ 29 | 0 (jworld err 0, page errors 0, stuck 0) |
Total ≈ 0.27 /yr ≈ one release every ~3.7 years; ret ends 0.36–0.52 /yr, trộm ends 0.2 /yr (unchanged).

## Tests (on 82a3b344)
- world_check2 **PASS 43/43** (new row: aged maids only in a dead + a lãnh cung household, none in the pool → calendar, trộm end, đại hàn end open nothing; calendar row stubs the spring odds; ret/trom rate rows 23/25, 39/40).
- world_check **PASS 25/25** (×4 runs, with the reviewer's fresh() fix).
- one-core-guard **PASS** (after the main merge).
- QUICKCHECK **PASS** · 123 s · old save ok · perf new/live render 148/147, tab 227/243, buổi 741/786 · core gates PASS.

SẴN SÀNG KIỂM 82a3b344 (review/world-ret-phong-r2).
