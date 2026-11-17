PRIORITY #1 CHECK ('chủ vị|phối điện|BAL.res'): OD 13 | ledger 2 | claims 6 | main 15 | review/* 0; ('BAL.seat|SEATCAP|seat cap'): OD 4 | ledger 1 | claims 8 | main 15 | review/* 3 (seatcap-r1 = LIVE, reuse j30 SEATCAP); ('harem cap|roomFor|BAL.ps.harem'): OD 4 | ledger 0 | claims 2 | main 15 | review/* 0 → extend the existing rules (j27/j95c/jres/j30), no second system.

# D8 residence + seats halved + harem cap 20 — worker report

START_CTX ≈ 4 % of a 1M window (get_session read 0 at start → estimate). Context at report time ≈ 30 % → rollover point reached. Code, tests and shots are done; the MEASURE is short of the 150-lives-per-side target (see §4 and HANDOVER at the end).

Branch: `review/residence-seats`, base origin/main 4719d424, merged with origin/main 6c4f21c3 (generated files rebuilt). Never pushed to main, no PR.

## 1. What changed (ONE CORE: extend j27/j95c/jres/jpal/j30/jseat, no second system)

| rule | before (typed copies) | after (one constant) |
|---|---|---|
| co-residents per chủ vị | `3` typed in j27.js:25 and j95c.js:71 (+ comments) | `BAL.res={side:1,halls:["dong","tay"]}` in jbal.js; `resCap()` = side × halls = 2; j95c `over=L.length+me-resCap()`; jpal palFix reads `resCap()`/`BAL.res.halls` |
| which hall | jres `resSidePart` by stable order, 3 per palace | `p.resHall` set by jpal hallFix (1 per hall, own room); resSidePart reads it, fallback `HL[floor(i/BAL.res.side)]` |
| her place below Tần | j27.js:24 + jpal.js:33 "she keeps Ngọc Thanh các" | removed: palFix houses her like an NPC (S.resHead/S.resHall); Ngọc Thanh các only when every chủ vị has 2 |
| she as host | excluded as a chủ vị host | two-way: as Tần/Phi/QP she hosts NPC co-residents too |
| palFix body | two bodies (j27 + jpal override) | j27 `palFix(){}` stub; one body in jpal.js |
| spread | none (first host filled first) | pickHost = host with fewest co-residents (random tie); spread loop moves the newest NPC from a full host to an empty one (log line `… dời sang …`); she is never moved by the spread |
| harem cap | `const CAPC=16` in j27 (not 12), typeof check in j55 | `BAL.harem.cap=20`; j27 tuyenTu `BAL.harem.cap-live`, roomFor('consort') `liveRivals(true).length+1>=BAL.harem.cap`, j55 the same; BAL.ps.harem (start ≈12) unchanged |
| seats | `BAL.seat={7:1,6:1,5:2,4:4,3:6}`; numbers typed in jseat/jbal2 comments | `{7:1,6:1,5:1,4:2,3:3}` (owner 17/11 04:30Z), changed only through SEATCAP (j30 ← BAL.seat); comments no longer type numbers |
| old saves over a seat cap | seatSettle would demote extras | jseat `seatKeepStamp()` once per save (S.seatV=2) stamps `S.seatKeep` for NPC holders already over cap; `seatKept(p)` exempts them while they hold that rank and live; nobody promoted into a full rank (seatHas false), nobody demoted |
| redone when | — | palFix runs on promotion / demotion / death / lãnh cung / load (existing hooks), so old saves are housed on load |
| view | Dư đồ showed a Ngọc Thanh các spot for her | jres: `palName("home")` = her hall name (e.g. "Đông phối điện · Chung Tú cung"); residents()/mapSpots put her in her host's spot; mapPos("home") = host palace (walking starts there); jpm palace detail counts her in her hall (`kpmMine`), tapping her hall enters "home"; stage at home paints her hall art |
| missing room art | — | jres `resTamPal()` + kit `kitTam(true)` chip ('tạm', KIT FIRST, existing part jgrey .ktam) on the stage when her room uses a stand-in |

Staff caps (Foreman B) and co-op code not touched.

## 2. Tests

| test | result |
|---|---|
| one-core-guard | PASS, 0 fails |
| dev/test/residence-seats.js (new, R1–R8, 6 games × 24 months + forced cases) | PASS: start harem = BAL.ps.harem; her home a Đông/Tây phối điện every game; R1 ≤2 per chủ vị, 1 per hall, every month; R3 spread holds; R4 old 3-under-one trimmed, nobody lost; R5 Tần→own palace, demote→housed, lãnh cung→lc; R6 SEATCAP=BAL.seat, 4 old Phi kept after a turn, new Phi refused; R7 cap at 20 (full: 7 chính, 7 đông, 5 tây) |
| dev/test/residence-oldsave.js (new, old build save → new build) | PASS: 4 Phi + 3 QP kept (no demotion), S.seatKeep stamped, she housed in a phối điện on load |
| seatcap-sim (6 lives × 120 months) | exit 0, no over-cap, no page errors |
| palace-oldsave (old → new, Fold) | loads, no errors |
| coop-e2e | 60/60 (= live), buổi median 2.8 s |
| after merge with origin/main 6c4f21c3 | residence-seats PASS again, one-core-guard PASS (fails 0) |
| quickcheck | not run (CPU busy with measures) — successor |

Shots (looked at each; outside git in /home/user/wt/resseat-shots): Fold 755×1000@2 Dư đồ — no Ngọc Thanh các spot, host spot "Khải Tường cung … · ta ở Đông phối điện"; Fold palace detail — Đông phối điện row "Người ở: ta"; iPad 1180×820@2 stage — "Đông phối điện · Chung Tú cung", right room art, her figure + maid, feet not cut, no overlap. On Fold the act tab covers the stage (existing layout, not this change).

## 3. Measure (sens-bots, shards of 2 browsers, page reopened every 4 lives)

dev/measure/inresseat.js + run_rs.js + an_rs.py. Bot pages crash ("Target crashed") under memory; run_rs keeps finished lives. 2 h wall time gave 42 lives before / 53 after — **short of ≥150 per side**.

| | lives | months played | reach Tần | months to Tần (median) | reach Phi | to Phi | reach Quý phi | to QP | reach Hoàng hậu | max harem | co-residents per chủ vị 0/1/2/3+ (per 100 samples) | over cap | she in side hall / NTC (months below Tần) | ms per buổi |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | 42 | 594 | 25 (60/100) | 8 | 14 | 16.5 | 6 | 20.5 | 0 | 17 | 28/23/26/23 | 1359 | 0 / 951 of 951 | 90.0 |
| after | 53 | 687 | 20 (38/100) | 7.5 | 9 | 12 | 3 | 35 | 1 | 19 | 2/42/56/0 | 0 | 1184 / 53 of 1237 | 86.1 |

Reading (small sample, lives are short ≈13 months): co-residents never above 2 after (was 23/100 at 3+), almost no empty chủ vị (2/100 vs 28/100), she lives in a side hall 96 % of her low months instead of always Ngọc Thanh các; harem max 19 ≤ 20; perf per buổi not worse (86 vs 90 ms). Promotion: fewer bots reach Tần (38 vs 60 per 100) and Quý phi is slower — expected with halved seats, but the sample is too small to size it. **Needs the full ≥150-life run before the owner decides.**

### 10 game years, idle player kept alive (dev/measure/harem10.js, 6 lives × 120 months per build)

| | start harem | max ever | per-year max (y1..y10) | per-year mean | co-residents per chủ vị 0/1/2/3+ (monthly samples) | max holders Tần/Phi/QP/HQP/HH | she side hall / NTC (months below Tần) | ms per endTurn |
|---|---|---|---|---|---|---|---|---|
| before | 11 | 16 | 11,12,12,12,12,16,16,16,16,16 | 11 → 13.7 | 431/1010/485/739 | 3/4/2/1/1 | 0 / 494 | 111.3 |
| after | 11 | 17 | 12,12,12,13,13,17,17,16,17,17 | 11.2 → 14 | 119/1509/1361/1 | 3/2/1/1/1 | 431 / 4 | 117.1 |

Harem never above 20 (max 17; cap only binds with many tuyển tú). Seat holders after never exceed BAL.seat. One sample in 2 990 shows 3 co-residents: sampled between a mid-turn arrival and the next palFix (it is trimmed on the next pass; R1 checks after palFix pass every month). ms per endTurn +5.2 % (117.1 vs 111.3, 6 lives, run alongside the other build) — at the ≤+5 % line, within noise of this small run; the successor should confirm it on the big run (ms per buổi in §3 is 86 vs 90, i.e. not slower).

## 4. ART REQUEST → Foreman C (low priority)

Palaces with no room art (jpal west palaces, indices 8–12): Vĩnh Thọ cung, Dực Khôn cung, Trữ Tú cung, Hàm Phúc cung, Thái Cực điện. Each needs chính, Đông phối, Tây phối × 4 seasons × 4 buổi (suggested slugs vinh-tho, duc-khon, tru-tu, ham-phuc, thai-cuc-dien, same naming as RES_SLUG). With 7 chủ vị the 8 east palaces normally suffice; the west ones appear in old saves or the palLone fallback. Until then the stage uses an east-palace stand-in with the 'tạm' chip.

## 5. Notes

- Live harem cap was CAPC=16, not 12 as quoted in s29.
- NPCs who overflow every chủ vị still use the existing palLone empty-palace fallback (owner 11/14); she gets Ngọc Thanh các instead.
- Shots are not in git. No `<<<<<<<` markers under dev.

## HANDOVER (worker rollover, context ≈30 % ≥ START_CTX 4 % + 25 %)

Remaining for the successor (coordinator opens it):
1. Measure to ≥150 lives per side: in a worktree of review/residence-seats, serve with `python3 -m http.server 8771`, `_old.html` = origin/main index.html (git-excluded), run `node dev/measure/run_rs.js http://127.0.0.1:8771/_old.html 75 old-X.json 6600 4` and the same on index.html, at most 2 browsers at a time (4 crash), several rounds; then `python3 dev/measure/an_rs.py old-*.json -- new-*.json`. Existing partial jsons: /home/user/wt/resseat-shots/m (lost with this container).
2. Run quickcheck once the CPU is idle; confirm perf ≤ live +5 %.
3. Update §3 table; if Tần/QP pace drop holds, flag it to the owner (seat halving effect).

SẴN SÀNG KIỂM 020890d156548a6417c4c60e6be4a4c33752cc42

## WIP — successor #2 (17/11 10:05Z, START_CTX ≈ 4 %)
Bot-page crash fixed (runner served no images → every <img> pending forever kept detached dialog trees alive, 3.5 M nodes); stuck lives fixed (bot tapped a kitOff option forever); fast bot mode. Commits f807c3c7, 7692fac2 on review/residence-seats. Mid-run (85 before / 81 after lives, ≤120 months each): Tần reach 94 → 98 /100 (the old 38/100 was an artefact of stuck short lives), harem max 18 → 20 (= cap), co-residents >2: 11 448 → 0, perf per buổi +1.4 %. Full run to 150/side running; final tables + quickcheck follow.
<<<<<<< HEAD

## FINAL — successor #2 (17/11 14:55Z)

PRIORITY #1 CHECK: grepped OWNER_DECISIONS / HANDOVER / PROGRESS for harem cap, roomFor, sens bot, co-residents; git grep origin/main + origin/review/* for roomFor/liveRivals/newRival/`out=false`. Reused the existing `roomFor("consort")` cap (j27:46, BAL.harem.cap), the existing sens bot (inpage6.js) and the existing kitOff/pbtn locks. Nothing new was built beside them.

### A. Bot-page crashes and stuck lives (fixed; f807c3c7, 7692fac2)
- Crash: the runner served no images. Every `<img>` stayed "pending" forever and kept detached dialog trees alive (heap snapshot: 3.5 M detached nodes, retainer = Pending activities ← img). Fix: images are answered with a 1×1 png and audio/video are aborted (run_rs.js).
- Stuck: the bot tapped a locked (kitOff) option forever. Fix: inpage6.js skips `off` options.
- Fast mode for the measure only (inresseat.js: no-op fit/focus helpers). Life cap 120 months.
- Result: 306 lives, 0 TIMEOUT, 0 CRASH.

### B. Measure: 153 lives per side, ≤120 months each, live main vs branch, 2 browsers at once (dev/measure/run_rs.js + inresseat.js, analysed by dev/measure/an_rs.py)
#### Lives

| | lives | ended in game (death/ending) | reached 10 years (cap) | TIMEOUT | CRASH | months played (sum) | months per life (median) |
|---|---|---|---|---|---|---|---|
| before | 153 | 76 | 77 | 0 | 0 | 13690 | 119 |
| after | 153 | 71 | 82 | 0 | 0 | 13985 | 119 |

#### Promotion pace (months from start; median [p25–p75]; reach = lives that got there, per 100 lives)

| | Tần reach | to Tần | Phi reach | to Phi | Quý phi reach | to QP | HQP reach | Hoàng hậu reach | to HH |
|---|---|---|---|---|---|---|---|---|---|
| before | 145 (95/100) | 12 [8–21] | 137 (90/100) | 22 [16–33] | 126 (82/100) | 33 [23–41] | 114 (75/100) | 58 (38/100) | 71 [57–100] |
| after | 148 (97/100) | 12 [7–19] | 138 (90/100) | 24.5 [17–34] | 123 (80/100) | 35 [28–46] | 111 (73/100) | 60 (39/100) | 78 [61–100] |

#### Harem size (living consorts + her), per game year: max over lives / mean of each life's yearly max (lives still playing that year)

| | start (y1 mean) | max ever | y1 | y2 | y3 | y4 | y5 | y6 | y7 | y8 | y9 | y10 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| before | 11.6 | 18 | 14 / 11.6 (153) | 16 / 11.8 (147) | 17 / 14.8 (137) | 17 / 13.7 (131) | 17 / 12.9 (122) | 17 / 14.9 (112) | 18 / 13.6 (106) | 17 / 12.8 (98) | 18 / 14.8 (93) | 17 / 13.8 (83) |
| after | 11.7 | 21 | 16 / 11.7 (153) | 16 / 11.7 (148) | 19 / 14.8 (144) | 20 / 14.2 (132) | 20 / 13.2 (123) | 21 / 15.8 (113) | 20 / 14.6 (103) | 20 / 13.8 (99) | 20 / 16.0 (95) | 20 / 14.7 (90) |

#### Co-residents per chủ vị (monthly samples) and where she lives while below Tần

| | samples | 0 | 1 | 2 | 3+ | over cap (>2) | her months below Tần | in a side hall (Đông/Tây phối điện) | Ngọc Thanh các | other |
|---|---|---|---|---|---|---|---|---|---|---|
| before | 53576 | 18244 (34/100) | 7484 (14/100) | 7365 (14/100) | 20483 (38/100) | 20483 | 8832 | 0 (0/100) | 7999 (91/100) | 833 |
| after | 60902 | 507 (1/100) | 13330 (22/100) | 47065 (77/100) | 0 (0/100) | 0 | 7776 | 5936 (76/100) | 1090 (14/100) | 750 |

#### Perf (ms per buổi = nextBuoi wall time, both builds run at the same time, one browser each)

| | buổi timed | ms per buổi (mean) | per-life mean: median [p25–p75] |
|---|---|---|---|
| before | 164854 | 16.0 | 15.5 [14.6–16.3] |
| after | 168407 | 16.3 | 15.6 [14.7–16.8] |

after vs before: +2.1 % (gate ≤ +5 %)

Reading:
- Tần is not slower: 97/100 reach at a median of 12 months, against 95/100 at 12 on live. The earlier partial figure "38/100 vs 60/100" came from stuck, short bot lives (fixed in A). **No BAL change is needed.**
- Phi and Quý phi come about 2 months later (median), and Hoàng hậu reach is the same (39 vs 38 /100).
- Co-residents: 0 samples over 2 on the branch (live: 20 483). She now lives in a side hall while below Tần (76/100 of her months; live: 0).
- Perf: +2.1 % ms per buổi (gate ≤ +5 %). The earlier +5.2 % was not confirmed.

### C. Harem cap leak found by the measure (max 21 on 1/153 lives) → fixed as a family
Scan: every path that adds a living consort (`newRival(`, `rivals.push(`) and every path that brings one back (`.out=false`, `out:false`). Co-op files were scanned but not changed (co-op code is off limits).

| path | before | after |
|---|---|---|
| j7 newgirl event (3 options; chosen late, after the harem filled) | adds past cap | `newGirl()` checks roomFor; full → "Hậu cung đã đủ người, tân nhân được đưa về nhà.", paid option refunds its own price (BAL-typed, one-core-guard 0) |
| j55:121 sớ tuyển tú | adds past cap | `roll(o)&&roomFor("consort")` |
| j7 coldvisit "Xin Hoàng thượng ân xá" | returns her past cap | kitOff "hậu cung đã đủ người" + check in go |
| j8:476 empAct pardon | returns her past cap | `if(v.out&&!roomFor("consort"))return` |
| j15:39 pardon button | open | pbtn why "hậu cung đã đủ người" |
| j14:24 NPC release petition | returns her past cap | `&&roomFor("consort")` |
| j72:475 return roll | returns her past cap | `roll(25)&&roomFor("consort")` |
| j34:53, jbal:201, j8:442/444/446, j3:110, j14:37, j27:43, jkc:541 | already guarded | unchanged |
| j6 pardon | only lifts cấm túc | unchanged (safe) |

Commits 3f0ae63a (new consorts), f759ba30 (returns from lãnh cung). Tests R9 (newgirl at cap) and R9b (pardon/ân xá at cap) in dev/test/residence-seats.js fail on the commit before each fix and PASS after.

Confirmation run on f759ba30 (80 lives, ≤120 months, with a tracer that logs any over-cap month): **max harem 20, 0 lives over 20, 0 co-residents over 2, 0 TIMEOUT/CRASH.**

| | lives | months | max harem | y3 | y6 | y10 | co 0/1/2/3+ per 100 | her side hall / NTC below Tần |
|---|---|---|---|---|---|---|---|---|
| after (f759ba30) | 80 | 7403 | 20 | 20 / 14.9 | 20 / 16.1 | 20 / 15.2 | 1 / 21 / 78 / 0 | 73/100 / 20/100 |

### D. Gates on d88883df (head = f759ba30 + measure tracer only)
- quickcheck.sh: **PASS** (core gates PASS, build matches, old save ok). Medians of 3: render 318/337 ms, tab 423/424 ms, buổi 1471/1211 ms (new/live). The buổi gap is noise from 3 runs on a busy box: the previous run (5 runs, 3f0ae63a) gave 1022/1019, and the 30 000-buổi sens-bot measure gives +2.1 %.
- residence-seats.js (R1–R9b): PASS. residence-oldsave: PASS. seatcap-sim: no over-cap. one-core-guard: 0 fails.

SẴN SÀNG KIỂM d88883dfcf9fc29700a4d2e45029a5146eb19801
=======
>>>>>>> 61f334cd (review kit-ico-rank-r2 report: PASS aaa1bec1)
