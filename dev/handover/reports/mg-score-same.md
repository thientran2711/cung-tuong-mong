# REPORT mg-score-same — worker wk mg-score-same (opus, session_01Rc5AsMwgUZdbs4boL9VMtH) — SẴN SÀNG
PRIORITY #1 CHECK: OD 20/11 ~06:50Z (owner bug) + ~05:10Z (no text in play) + 17/11 HUD row hidden (KIT §13) | main 70bea3d3: jmgt mgGrade/mgPace, j82 kg82Play, kitGameClock (j79), mg-bots.js — reused | review/* cal-p2 (numbers HOLD, kG values untouched), mg-noword/mg-visual (landed on main 70bea3d3, merged) | claims: this worker only.
Foreman: C-AG #28 session_01Rc5AsLarKgavDpQSsAHHYB. Branch **review/mg-score-same @ c07604e0** (from origin/main 37e4a68f, merged 70bea3d3). START_CTX 3 %.

## Owner bug (verbatim, 20/11 ~06:50Z)
"Có nhiều môn thấy tính lệch lắm nha, có nghĩa là lúc mà tôi vào á, tôi chơi tôi thấy cái nào cũng là kiểu như là đạt hết. Đến lúc tính điểm toàn 9 trên 10 không, mà không hiểu tại sao. Tôi cứ nghĩ là tại vì cái thời gian nó càng thấp cho nên bị trừ điểm bớt, mà không biết có phải không."

## Answer to her question (for MAIN, Vietnamese to her)
Yes, two hidden cuts: (1) the TIME PART (jmgt mgPace) keeps a round whole only if it is finished in a very small share of its limit (Cờ at her matching board: ≈ 2.5 s of 10.4 s; Xử án ≈ 0.7 s of 10 s; Thư pháp ≈ 2.2 s per glyph), so a perfect but normal-speed run loses 6–18 %; (2) the CURVE mgGrade 10·(raw/10)^kG (Cờ kG 3, Thêu 5.5, Hương 3.65, Đàn 2.8, Cắm hoa 2.3 …) turns 9.7 raw into 9. Nothing showed either cut while playing: per-round feedback says success, and in solo play NO score is visible at all (the PHẦN/HỒI/CÒN row is hidden by owner 17/11, KIT §13).

## What changed (code, whole family — 31 kinds, every engine)
- jmgt: `mgLive(env,x)` = `mgGrade(x,kind)` (the result's own grade) of the raw still reachable (`mgReach(got,done,of)`: points lost stay lost, rounds not played count whole). kg82Play writes the given mark on the board at the end (`kg82Set0("score", …)`), so the board always ends on the result mark.
- Every engine's HUD score uses it (34 score cells): j82 rhythm/go/pattern/steps/aim, j91 hold/fling/trace(+kinh/may)/arrange/untangle/cook/blend, jlant lamp, jnwp calli/doiline, jnwq place/clue, jtd ×4 (tdWrap subtracts the hints taken so far, as env.end does), jts pluck/steer, jslap tat/ne (mark on the tap), jhd hoadien (mark on the placement), j92 groom. No raw count, no rounding before the grade.
- Time part made visible in the mark: the mgPace kinds (co tho doi doden kim le tc xa thq) lower the mark LIVE while she is slow (current round's worth × mgPace(now)).
- td_dung and chai now pass the float to env.end (they pre-rounded).
- No kG / pace VALUES changed (numbers family HOLD). No UI part changed (law 9).
- Tools: mg-bots.js `MGBOT_ALL31=1` + `shown/given` per play; `dev/measure/mg-score-same.py` (table); test `dev/test/mg-score-same-scan.py` (static scan: every score cell via mgLive, kg82Play ends on the given mark).

## Table — board's last mark vs mark given, skilled bot (normal adult speed, all-hit oracle with human error), matching board hoc/0/0
Before = origin/main 37e4a68f, n=6/kind. After = c07604e0 (merged main), n=4/kind (ban re-run n=8 after the last-shot fix; td_hanh/chai/hoadien/co also re-run n=6 after their fixes: all same).
| kind | engine | before same | before shown→given | after same | after shown→given | cause (before) |
|---|---|---|---|---|---|---|
| dan | j82 rhythm | 1/6 | 10→10, 8.1→7, 8.3→6, 9.1→8 | 4/4 | 5→5, 6→6, 7→7, 9→9 | curve kG 2.8 hidden (board raw, result graded); board printed the raw float («8.3/10») |
| hat | j91 hold | 3/6 | 7→8, 8→8, 8→9 | 4/4 | 10→10, 8→8, 9→9 | curve kG 0.85 hidden (board raw, result graded) |
| co | j82 go | 0/6 | 8→6, 9→7, 9→8 | 4/4 | 4→4, 8→8, 9→9 | curve kG 3 hidden (board raw, result graded); time part mgPace applied at round end, not shown |
| dauho | j91 fling | 6/6 | 7→7, 9→9 | 4/4 | 6→6, 8→8, 9→9 | rounded raw count (matches only because kG 1) |
| ban | j82 aim | 0/6 | 6→7, 6→8, 7→8, 7→9 | 8/8 (re-run after last-shot fix) | 7→7, 8→8, 9→9 | curve kG 0.8 hidden (board raw, result graded) |
| tho | jnwp calli | 6/6 | 7→7, 8→8 | 4/4 | 8→8, 9→9 | time part mgPace applied at round end, not shown |
| doi | jnwp doiline | 6/6 | 8→8, 9→9 | 4/4 | 8→8, 9→9 | time part mgPace applied at round end, not shown |
| doden | jlant lamp | 6/6 | 8→8, 9→9 | 4/4 | 7→7, 8→8 | time part mgPace applied at round end, not shown |
| ve | j91 trace | 4/6 | 7→8, 8→8, 8→9 | 4/4 | 5→5, 7→7, 8→8 | curve kG 0.9 hidden (board raw, result graded) |
| hoa | j91 arrange | 1/6 | 6→3, 8→7, 9→8, 9→9 | 4/4 | 7→7, 8→8 | curve kG 2.3 hidden (board raw, result graded) |
| theu | j82 pattern | 1/6 | 10→10, 10→8, 9→5, 9→6 | 4/4 | 10→10, 6→6, 8→8 | curve kG 5.5 hidden (board raw, result graded) |
| kim | j91 untangle | 5/6 | 9→8, 9→9 | 4/4 | 8→8 | curve kG 1.8 hidden (board raw, result graded); time part mgPace applied at round end, not shown |
| mua | j82 steps | 1/6 | 10→9, 6→5, 7→6, 7→7 | 4/4 | 7→7, 8→8 | curve kG 1.25 hidden (board raw, result graded) |
| banh | j91 cook | 6/6 | 8→8, 9→9 | 4/4 | 7→7, 8→8 | rounded raw count (matches only because kG 1) |
| huong | j91 blend | 0/6 | 10→8, 10→9, 6→2, 9→8 | 4/4 | 8→8 | curve kG 3.65 hidden (board raw, result graded) |
| td_cong | jtd thread | 2/6 | 9→8, 9→9 | 4/4 | 7→7, 8→8 | curve kG 1.3 hidden (board raw, result graded); raw sum; hints not on board |
| td_dung | jtd walk | 6/6 | 8→8, 9→9 | 4/4 | 7→7, 9→9 | rounded raw to env.end + hints not on board |
| td_ngon | jtd talk | 1/6 | 10→10, 7→5, 8→6, 9→7 | 4/4 | 10→10, 3→3, 7→7, 8→8 | curve kG 2 hidden (board raw, result graded); raw sum; hints not on board |
| td_hanh | jtd alms | 0/6 | 3→6, 4→6, 7→5, 7→6 | 4/4 | 3→3, 7→7, 9→9 | raw sum; hints not on board |
| duho | jts pluck | 0/6 | 10→9, 8→7, 9→8 | 4/4 | 5→5, 6→6, 8→8 | curve kG 1.5 hidden (board raw, result graded); running count |
| den | jts steer | 2/6 | 6→7, 7→8, 8→8, 8→9 | 4/4 | 7→7, 8→8 | curve kG 0.8 hidden (board raw, result graded); running ratio |
| kinh | jwkg→j91 trace | 6/6 | 8→8, 9→9 | 4/4 | 8→8, 9→9 | curve kG 0.9 hidden (board raw, result graded) |
| may | jwkg→j91 trace | 3/6 | 6→6, 7→8, 8→8, 8→9 | 4/4 | 7→7, 8→8 | curve kG 0.82 hidden (board raw, result graded) |
| chai | j92 groom | 0/6 | x/3→0 | 4/4 | 0→0 | board showed taps «k/3»; rounded raw to env.end |
| hoadien | jhd | 0/6 | None→7, None→8, None→9 | 4/4 | 10→10, 8→8, 9→9 | no board score |
| tat | jslap | 0/6 | None→10, None→2, None→6 | 4/4 | 10→10, 6→6 | board «–/10» |
| ne | jslap | 0/6 | None→0, None→10 | 4/4 | 0→0, 10→10 | board «–/10» |
| le | jnwq place | 6/6 | 8→8, 9→9 | 4/4 | 8→8 | time part mgPace applied at round end, not shown |
| tc | jnwq place | 6/6 | 8→8, 9→9 | 4/4 | 8→8, 9→9 | time part mgPace applied at round end, not shown |
| xa | jnwq clue | 6/6 | 7→7, 8→8, 9→9 | 4/4 | 8→8 | time part mgPace applied at round end, not shown |
| thq | jnwq place | 6/6 | 8→8, 9→9 | 4/4 | 8→8 | time part mgPace applied at round end, not shown |

Result: before 13 of 31 kinds matched every play (mostly kG 1 kinds by luck of rounding); after 31/31.

## OPEN — needs MAIN / kit keeper (filed in dev/kit/KIT_REQUESTS.md on the branch)
1. **She still cannot SEE the mark while playing**: the HUD row is hidden by owner 17/11. KIT REQUEST (a): one kit mark chip `.kgmark` in the game title line beside the clock (kitChip look, «n/10» numbers only — like the clock chip), fed by `kitGameSet("score",…)` the way kitGameClock is fed by "time". Alternative (b) un-hide only the PHẦN cell = undoes 17/11 → owner OK needed (law 16). Recommend (a). Until then the fix is real (one grading path, bots/tests read it) but invisible to her.
2. KIT REQUEST: kitGameClock turns amber (existing chip class `w`) once the full-marks window (fast·lim) has passed.
3. Per-round pop colours were NOT changed (mg-noword owns those lines; words are being removed).

## PROPOSAL (numbers HOLD — not built): fair time part
Skilled bot time share u = el/lim per round at the matching board (mg-bots u log, n=12–30 rounds/kind) vs today's full-marks window `fast` (ease ≈ 1–2):
| kind | fast today [e0,e5] → at her board | bot u p50 / p75 | keep today | a perfect run keeps | propose fast [e0,e5] | keep |
|---|---|---|---|---|---|---|
| co | [.1,.8] → .24 (≈2.5 s of 10.4 s) | .39 / .47 | .6 | ≈ .92 per round | [.4,.8] | .6 |
| tho | [.05,.175] → .10 (≈2.2 s/glyph) | .20 / .21 | .5 | ≈ .94 | [.2,.35] | .5 |
| doi | [.05,.425] → .20 | .38 / .41 | .3 | ≈ .84 | [.35,.55] | .3 |
| doden | [.05,.175] → .10 (≈2.8 s of 28 s) | .28 / .37 | .3 | ≈ .86 | [.3,.5] | .3 |
| kim | [0,0] → 0 (every ms costs) | .21 / .26 | .6 | ≈ .92 | [.25,.4] | .6 |
| le | [.075,.25] → .145 | .32 / .33 | .3 | ≈ .86 | [.3,.45] | .3 |
| tc | [.05,.175] → .10 | .33 / .34 | .3 | ≈ .82 | [.3,.45] | .3 |
| xa | [.05,.1] → .07 (≈0.7 s of 10 s) | .21 / .26 | .1 | ≈ .86 | [.25,.4] | .4 |
| thq | [.075,.45] → .225 | .49 / .56 | .5 | ≈ .83 | [.5,.65] | .5 |
Rule: full marks while a careful normal-speed run (≈ bot p75) is still inside the window; law 5 kept (fast falls as the board gets harder with rank). Pair with cal-p2's kG proposal before landing (a kG raise and a pace relief move the same marks).

## Tests (c07604e0, dev/index.html + build_site)
- assemble + build_site.sh: OK. node --check all touched files: OK. mg-score-same-scan.py: 34 cells via mgLive, 0 raw.
- mg-bots 31 kinds before/after: table above. mg-noword-a: ALL OK. mg-visual: ALL OK. ag-mgcal: no FAIL. mg-ready-guide: all rows yes.
- tuduc-mg (repo root, 755x1000): cong/dung/hanh pass ×2, ngon fail ×2 — SAME on main 37e4a68f (pre-existing). (A Lượt 4/3 overflow from my alms hud call was found by it and fixed.)
- slap-mg 755x1000: fails ["marks"] = pre-existing on main.
- oldsave-r1 (old = main build): 16/16 (Fold, iPad 1180, iPad Pro).
- Shots (looked at each, no UI change expected — score row hidden): Cờ / Cắm hoa / Bắn cung while playing at 755x1000 and 1180x820 (mgshots91): no overflow, no cut, no page errors. Scratch /home/user/wt/mgss-out/shots (not uploaded; nothing visual changed).
- PRE-EXISTING main FAILs (same before/after): ag-mg2 summons ×2; ag-mgh 7 "strong hands rare" (ag-mgh 4 flaky, passed on rerun); slap-mg ["marks"]; tuduc-mg ngon ×2.

## Handover
Done; nothing left but the reviewer + the kit decision (OPEN 1–2). Scratch: /home/user/wt/mgss-out (before/after jsonl, tables). Worktree /home/user/wt/mgss can be removed after review.
