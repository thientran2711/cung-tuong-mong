PRIORITY #1 CHECK: copied from the worker brief briefs/D8-residence-seats.md line 2 (chủ vị / BAL.seat / harem cap checks): ('chủ vị|phối điện|BAL.res') OD 13 | ledger 2 | claims 6 | main 15 | review/* 0; ('BAL.seat|SEATCAP|seat cap') OD 4 | ledger 1 | claims 8 | main 15 | review/* 3 (seatcap-r1 = LIVE, reuse j30 SEATCAP); ('harem cap|roomFor|BAL.ps.harem') OD 4 | ledger 0 | claims 2 | main 15 | review/* 0 | claims: this job only (D) → review only. Reviewer re-check: git grep origin/main for CAPC / newRival( / rivals.push( / .out=false after each merge (found 2 new main paths, fixed below).

# REVIEW r1 — review/residence-seats @d88883df → review/residence-seats-r1 (opus reviewer, opened by Foreman D #9; reported to D #10)

START_CTX ≈ 3 % (estimate). Branch: review/residence-seats-r1, head a6e0fbc2 (= worker d88883df + 3 merges of live main + 1 fix). FF from live main b5d109fe.

## 1. Merge with live main (6)
- merge 25bfd7cf (259 commits): conflict jbal2.js (main's BAL.il/BAL.nroad kept + the branch's seat comment); generated files rebuilt.
- merge e9bbc4d6 (117 commits, ONE CORE BAL.eff migration): conflicts j7/j8/j14/j55/jbal — resolved as main's line + the branch's roomFor guards; jbal keeps main's srvAge.old + halved seat + BAL.res/harem.
- merge b5d109fe (coop-thin-b-r3): only generated files; rebuilt.

## 2. Fixes made by the reviewer (whole family, harem cap) — commit 27436d2b
Main brought two new paths of the same family after the worker's scan:
| path | before | after |
|---|---|---|
| jworld.js:125 đại tuyển tú | `liveR().length+1>=(typeof CAPC==="number"?CAPC:16)` — CAPC no longer exists → typed 16 (ONE CORE break, tuyển tú stopped at 16 not 20) | removed; roomFor("consort") (BAL.harem.cap) is the only cap |
| jworld.js:215 đại xá (NPC back from lãnh cung) | no room check → over 20 | `&&roomFor("consort")` |
Runtime check (harem filled): đại tuyển tú 17 → 19 (≤ 20); 5 đại xá at a full harem with 3 in lãnh cung → stays 20. Rescan of the whole build: no CAPC left; every newRival / rivals.push / out=false path outside co-op is behind roomFor.

## 3. Checks (on the merged build)
| check | result |
|---|---|
| (1) ONE CORE | one-core-guard / rules-one-source / kit-conform: core gates PASS (quickcheck, 3 times). No typed 2/3/4/12/20 for these rules in j27/j95c/jres/jpal/j30/jseat/roomFor callers; seats only in BAL.seat → SEATCAP |
| (2) residence-seats R1–R9b | PASS (on each merge head) |
| (2) newgirl at cap, through chooseM | all 3 options add nobody; paid option refunds its 20 bạc (refund relies on `this` = option; chooseM calls c.go() as a method — OK) |
| (3) old saves | residence-oldsave PASS (live save, 4 Phi + 3 QP kept, nobody demoted, she housed in a phối điện on load); quickcheck old save ok |
| seatcap-sim 6 lives × 120 months | 0 over-cap months, max holders = BAL.seat |
| (5) coop-e2e | branch 63/63 = live 63/63 (run twice on the branch) |
| (5) quickcheck --runs 5 on a6e0fbc2 | PASS · render 197/166, tab 274/282, buổi 872/910 ms (new/live) |
| perf, controlled (same lives, render stubbed, harem forced to 20, 3 alternating reps × 360 buổi) | 29.27 vs 28.08 ms per buổi = +4.2 % (≤ +5 %) |
| render, controlled (same 3 origins, 40 renders each, 3 reps) | 34.9 vs 34.0 ms = +2.6 %; palFix 0.05 ms, mapSpots 0.09 ms per call. The quickcheck render gap (min of random first lives) follows the life, not this code |
| (4) shots, LOOKED at (Fold 755×1000@2 + iPad 1180×820@2, scratch only, deleted) | stage title "Đông phối điện · <host> cung", her room picture, her figure + maid, feet not cut, no overlap, no horizontal overflow, 0 page errors; palace detail: Đông phối điện "Người ở: ta", Tây phối điện ≤ 1 person. No west-palace case came up ('tạm' path unit-checked by the worker's R8); ART REQUEST for Foreman C stays as in reports/residence-seats.md §4 |

## 4. Bot sample (sens bots, 2 browsers, ≤120 months; live = origin/main 25bfd7cf served as is, branch = db70f7bf, same base)

### Lives

| | lives | ended in game (death/ending) | reached 10 years (cap) | TIMEOUT | CRASH | months played (sum) | months per life (median) |
|---|---|---|---|---|---|---|---|
| before | 64 | 33 | 31 | 0 | 0 | 5375 | 109.5 |
| after | 65 | 32 | 33 | 0 | 0 | 5605 | 119 |

### Promotion pace (months from start; median [p25–p75]; reach = lives that got there, per 100 lives)

| | Tần reach | to Tần | Phi reach | to Phi | Quý phi reach | to QP | HQP reach | Hoàng hậu reach | to HH |
|---|---|---|---|---|---|---|---|---|---|
| before | 63 (98/100) | 11 [7–18] | 57 (89/100) | 23 [17–31] | 47 (73/100) | 30 [24–40] | 44 (69/100) | 36 (56/100) | 70 [53–96] |
| after | 61 (94/100) | 13 [7–23] | 52 (80/100) | 30.5 [22–40] | 47 (72/100) | 40 [31–56] | 42 (65/100) | 23 (35/100) | 79 [65–93] |

### Harem size (living consorts + her), per game year: max over lives / mean of each life's yearly max (lives still playing that year)

| | start (y1 mean) | max ever | y1 | y2 | y3 | y4 | y5 | y6 | y7 | y8 | y9 | y10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | 12.5 | 19 | 15 / 12.5 (64) | 16 / 13.1 (64) | 17 / 15.7 (55) | 17 / 15.3 (49) | 17 / 15.0 (44) | 18 / 16.1 (42) | 18 / 15.4 (40) | 19 / 15.1 (40) | 18 / 16.0 (35) | 17 / 15.9 (32) |
| after | 12.3 | 20 | 16 / 12.3 (65) | 18 / 13.2 (61) | 20 / 17.0 (55) | 20 / 16.3 (52) | 20 / 16.2 (46) | 20 / 18.8 (44) | 20 / 18.2 (42) | 20 / 17.8 (41) | 20 / 19.3 (40) | 20 / 18.5 (37) |

### Co-residents per chủ vị (monthly samples) and where she lives while below Tần

| | samples | 0 | 1 | 2 | 3+ | over cap (>2) | her months below Tần | in a side hall (Đông/Tây phối điện) | Ngọc Thanh các | other |
|---|---|---|---|---|---|---|---|---|---|---|
| before | 19406 | 6337 (33/100) | 2637 (14/100) | 2511 (13/100) | 7921 (41/100) | 7921 | 3048 | 0 (0/100) | 2836 (93/100) | 212 |
| after | 23360 | 48 (0/100) | 4223 (18/100) | 19089 (82/100) | 0 (0/100) | 0 | 4001 | 2635 (66/100) | 764 (19/100) | 602 |
Perf column of this run is not used: the branch side ran while coop-e2e / shots / quickcheck shared the CPU and the two sides did not run at the same time; the controlled run in §3 replaces it.

Reading:
- Co-residents over 2: live 7 921 samples → 0. Empty chủ vị 33/100 → 0/100. She lives in a side hall 66/100 of her months below Tần (live 0). Harem never above 20 (cap reached from year 3); start 12.3 vs 12.5 (BAL.ps.harem unchanged).
- Promotion: Tần the same (94 vs 98 /100, 13 vs 11 months). Phi and Quý phi later (Phi 30.5 vs 23 months, reach 80 vs 89; QP 40 vs 30 months). **Hoàng hậu reach drops 56 → 35 /100** (23 vs 36 lives; small sample, Fisher p ≈ 0.02). In the worker's table (older main) HH was 38 → 39; live main itself has since risen to 56. This is the effect of the owner's halved seats on today's main — not a code fault, no rule broken — but the owner should see it (OWNER/BALANCE item for Foreman D / MAIN, not blocking).

## 5. Notes (not blocking)
- j27 tuyenTu still types `liveRivals(true).length>=8` (off-year skip) and `3+R(3)` (girls per tuyển tú) — pre-existing, not the cap/seat/residence rules; follow-up for the ONE CORE sweep (BAL.eff).
- j7 newgirl "Dằn mặt" at a full harem still costs Đức −4 / Tâm cơ +1 although the girl goes home (only bạc is refunded). Minor.
- The repo's dev/test/palace-map.js times out on boot on today's main (stale test, not this branch).
- No images uploaded to the CDN; scratch shots deleted.

PASS a6e0fbc2316a54cb810072826c144fa217bdf27e
