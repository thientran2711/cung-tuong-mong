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
