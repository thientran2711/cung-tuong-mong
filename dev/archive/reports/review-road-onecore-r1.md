# Review road-onecore r1 — review/road-onecore @ 6a1112d1 (ONE CORE move of the B1 road numbers into BAL.road.fx / .rare)
Reviewer: opus (numbers / ONE CORE), coordinator Foreman B s9 (session_01N1tNP35FF3tYRLkr6a7v7Y). START_CTX ~3 % of a 1M window; finished far under the rollover line.
Read: REVIEWER.txt, PREAMBLE.txt, START_CORE/WORKER/REVIEWER, CLAUDE.md core laws, worker report road-onecore.md, review-road-b1-fixa-r1.md.

Branch `review/road-onecore-r1` = origin/main 744b80e7 + review/road-onecore 6a1112d1 (fast-forward: the branch already holds main) + reviewer commit 74ba4f9a → **74ba4f9aa0774b0a90daa41840f87b704294451b** (descends current origin/main 744b80e7). Pushed.

## VERDICT: PASS 74ba4f9aa0774b0a90daa41840f87b704294451b

## (1) No game value changed (c012bf32 → 6a1112d1)
| check (run by me) | result |
|---|---|
| dev/measure/road-onecore-same.js vs c012bf32 | SAME: tt 28 ch / cn 28 / muoi 28 / dtq 28; c 2152, w 1514, l 894, odds fns 1166 × 400 random lives (===), E fx 338, RD97L 16 — 0 differences |
| own check A: every chapter field EXCEPT c/w/l/o/E.fx (texts, go:, if:, cast, x, e, sc, k, flags…; functions by source text) old vs new | 112 chapters, 0 differences; RD97L other fields 0 differences |
| own check B: the BAL.road scalar block (first/last/finTier/cap/dtq_*/muoi_*/cn_*/tm…) in jbalroad.js vs jbal2.js at c012bf32 | text identical (the old OLD-sandbox reading the new jbalroad.js could otherwise hide a changed bar) |
| own check C: BAL.road.fx rows vs options/endings | 112 rows, every beat count = option count, no orphan row, no road chapter without a row |
| live spot-check (game page, tt_tranh_8.s1 and tt_oan_6.s2) | options read c/w/l from BAL (Sức −3/−2, Bạc, Danh…), odds 40+Sủng/4 = 42 as the old arrow; tt_oan_6 «Cho người đứng chờ» BAL bac −20, card shows Bạc −15 = main's price67 rank discount (jstory, unchanged, same before) |
| diff c012bf32..HEAD of jroad.js | only rdFx/rdOdds/RDQ/rdFb/RR/rdRare added + rdDef calls rdFx; j67.js diff is main's own (voice tokens), not this branch |

## (2) Gate on top of latest origin/main
one-core-guard.js on review/road-onecore-r1 (main 744b80e7 + branch): `{"modules":267,"inlineNow":6674,"baseline":6691,"fails":0}` PASS, no --allow-grow; the branch does not touch one-core-guard.js or one-core-baseline.json.

## (3) The ~614 typed amounts inside go: — judged: NOT blocking for this branch
Counted by kind (road files):
| kind | tt | cn | muoi | dtq | sum |
|---|---|---|---|---|---|
| rdOan (oán of a cast person) | 59 | 83 | 67 | 62 | 271 |
| rdRel (thiện cảm) | 19 | 46 | 57 | 28 | 150 |
| e67dad (family / father) | 68 | – | – | 74 | 142 |
| e67bien / e67kho / e67ally / e67pun / e67foe / e67drop | – | 4 | 13 | 35 | 52 |
| option/ending `sc:` (Lợi thế) | 289 | 252 | 260 | 310 | 1111 |
| ending `k:` (ending tier) | 84 | 86 | 84 | 84 | 338 |
Why not blocking now: (a) none is typed in player text (road-option-scan digits 0, VANPHONG 0) and none is a second copy of a BAL key (no OD:L1267 "50 here, 55 there" conflict); (b) the same kinds are typed, ungated, across the rest of main (235 relAdd/oanAdd typed calls in j67/j8/jtsb/j71/j9/…, 625 sc:/k: in other ARC67 files, 27 e67dad) — failing only the roads would be a per-place fix against LUẬT SỬA CẢ NHÓM; (c) the branch is a provable pure move and brings the roads to exactly the bar main's gate holds.
They ARE rule numbers under OD:L1267 → OPEN WHOLE-GAME ITEM for the coordinator (one job, whole group): extend one-core-guard to count typed amounts in rdOan/rdRel/relAdd/oanAdd/e67* calls and `sc:`/`k:` in every module, freeze a baseline, then move them (roads: a `g:` / `sc` list per option in BAL.road.fx, as the worker proposes).

## (4) CO-OP FIRST
| test | result |
|---|---|
| coop-e2e.js (assemble.py first, LIVE Worker) | 59/59, first run (no flaky rerun needed) |
| coop-one-world.js | PASS |

## (5) Roads, saves, devices
| test | result |
|---|---|
| road-rare.js (all 16 roads) | ALL PASS, 0 page errors |
| road-saves.js (old origin/main save, phase-1 save, mid-road tt/dtq/muoi/cn) | 7/7 |
| oldsave-r1.js (old solo save, 755/1180/1366) | 16/16 |
| road-option-scan.js | every list 0, RD97L 16/16 ok, FX ALIGN 0 |
| shots (scratch only, looked at, deleted): road beat card tt_oan_6.s2 at 755x1000 and 1180x820 | kit event card (VIỆC frame, speaker figure, option cards TỐN/GỢI Ý, ladder words liều/an toàn), 0 page errors, 0 horizontal overflow; at 755 the pictures were still loading at shot time (known, CDN) |

## (6) Pattern for road-b2/b3 — clean enough, one guard added
jbalroad.js header documents the table shape and every odds term; rdOdds throws on an unknown term; RDQ / rdFb / RR are one registry each; move/emit/same tools are documented in the report. Weak spot: BAL.road.fx is POSITIONAL (option i = entry i) — adding/removing an option in a jrd file without the table would silently shift numbers. Reviewer fix 74ba4f9a: road-option-scan.js now prints `FX ALIGN` (beat count ≠ option count, rows without chapter/beat/ending, road chapters without a row); mutation-tested (dropping one entry of tt_tranh_8.s1 → `FX ALIGN 1  tt_tranh_8.s1: 3 options, 2 fx entries`). b2/b3 workers must run it and get 0.

## Notes (no FAIL)
- jend14 → road-b3 as planned; road-b2 (jrd_ch/nc/td) and road-b3 (jrd_cnv/thd) still carry 480–548 road-file gate fails (worker's table) — they must copy this pattern before their own review.
- No CDN review folder used; scratch shots deleted; worktrees removed after push.
