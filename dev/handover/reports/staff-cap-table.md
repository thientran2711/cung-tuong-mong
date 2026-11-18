# staff-cap-table — TABLE READY (worker session_01UV1SzkENdmyJBzB9tXt38F, opened by MAIN s41; measure only, BAL untouched)
PRIORITY #1 CHECK: OD L1632/L1636 (her ladder), L1778 (02:12Z B2), L1781 (02:34Z ~25–27), L1784 (02:55Z), 03:05Z worst-case/brain line (not in OD yet; taken from brief) | main jpromo.js:22 BAL.promo.cap, j10 capOf/mkServ, j27 CAPC=16, jagent agDecide | review/staff-caps-count b6166003 (reused its snapshot script; B2 avg re-measured 30.5 = same) , review/staff-cap-fix a2389cc (not touched) | claims staff-cap SziJshK → this session.

Branch `review/staff-cap-table` **5a098039** (measure files only): dev/measure/staff-cap-tables.js (the 7 tables), staff-cap-table-count.js (avg + worst), staff-cap-table-perf.js (worst-palace perf), staff-caps-count.js (copied from review/staff-caps-count). Built site = root index.html (main eb3675a6+).

## Tables (row = [cung nữ incl. personal maid, thái giám]; TH = Thái hậu)
| | ĐƯ | TT | QN | Tần | Phi | QP | HQP | HH | TH |
|---|---|---|---|---|---|---|---|---|---|
| A live | 1+0 | 2+0 | 2+1 | 2+1 | 3+1 | 3+2 | 4+2 | 4+2 | 4+2 |
| B2 her ladder | 1+0 | 1+0 | 2+0 | 2+1 | 2+1 | 3+1 | 3+1 | 4+1 | 3 + ma ma + 1 |
| D1 | 1+0 | 1+0 | 2+0 | **2+0** | 2+1 | 3+1 | 3+1 | 4+1 | 3 + ma ma |
| D2 | 1+0 | 1+0 | 2+0 | **2+0** | 2+1 | **3+0** | 3+1 | 4+1 | 3 + ma ma |
| D3 | 1+0 | 1+0 | 2+0 | **2+0** | 2+1 | 3+1 | 3+1 | 4+1 | **2 + ma ma** |
| LR low-rank 1 | 1+0 | 1+0 | **1+0** | 2+1 | 2+1 | 3+1 | 3+1 | 4+1 | 3 + ma ma + 1 |
| E own | 1+0 | 1+0 | **1+0** | **2+0** | 2+1 | 3+1 | 3+1 | 4+1 | 2 + ma ma + 1 |

## Totals (cung nữ + thái giám + ma ma, whole palace)
Average = 16 bot lives (8 origins) at start / +2y / +5y (palace today ≈ 11 / 10 / 9 consorts). WORST = forced full palace: the 8 chủ vị of OD 17/11 04:32Z (HH, HQP, QP, Phi×2, Tần×3) + every other consort at Quý nhân + Thái hậu alive. 16 = live CAPC; 20 = planned seats.
| table | avg start | avg +2y | avg +5y | worst 12 | worst 16 | worst 20 |
|---|---|---|---|---|---|---|
| A live | 38.0 | 39.5 | 38.8 | 52 | 64 | 76 |
| B2 | 30.5 | 31.6 | 31.0 | 41 | 49 | 57 |
| D1 | 27.4 | 28.1 | 28.5 | 37 | 45 | 53 |
| D2 | **26.4** | **27.1** | **26.9** | 36 | 44 | 52 |
| D3 | 26.4 | 27.3 | 28.1 | 36 | 44 | 52 |
| LR | 29.3 | 29.9 | 30.2 | 37 | 41 | 45 |
| E | 26.1 | 26.4 | 27.8 | 33 | 37 | 41 |
Note: no table gets under 20 even at today's ~11 consorts (personal maids alone = 1 per consort).
CORRECTED (owner OD 18/11 ~02:10Z, main s41): the art pool holds ids m01..m52 of the 84 painted women (FIGIX.maid), 30 eunuchs (u01..u30), 8 ma ma (k01..k08) — verified in the built game (Object.keys(FIGIX.*)). **BUG (not fixed here, measure-only worker):** the household cap still counts the OLD small face pool: dev/build/j17.js:53 `roomFor(role)` = poolOf(role) (j17.js:44) over FPOOL, which dev/build/j25.js:98 sets to 15 face-maid-* / 15 eunuch (eun1..3) / 6 face-mama-*. Probe (built game, Fold): hiring stops at **14 staff maids** palace-wide (cnt = 1 + staff maids vs 15) and **12 non-maid staff** (cnt + 3 vs 15), while the figures shown come from FIGIX (fig-maid-m03…). Second edge: j17.js:42 sets FAV[f]=0 when an old face-*.webp fails to load, and roomFor drops it — if those old files are gone/offline the palace hires nobody. Fix = roomFor counts the FIGIX identity pool per role (maids ≤ 52 minus maid identities worn by consorts, eunuchs ≤ 30, ma ma ≤ 8), not FPOOL/FAV. With the REAL ceiling every worst-case row above stands as written (largest: table A at 20 = 51 maids incl. TH + 25 eunuchs ≤ 60 / 30); no table is cut. With today's bug the live game would cut e.g. B2/D2/V2 at 20 from 57/52/52 to ~43/~42/~42 (20 personal maids + 14 + eunuchs).

## Perf at each worst case — Fold 755x1000@2, host mode, CPU 4× throttle, 8 buổi each (single runs swing ±40 %)
buổi = nextBuoi + render + agent loop flushed (ms, median / worst); render = room render median; heap after GC; world = what the weekly co-op world sync carries (rivals + staff), raw / gzip (frames > 8 KB go gzip, jcoop).
| run | people (table) | buổi ms med / worst | render ms | heap MB | DOM | world KB raw / gz | save KB | ser ms |
|---|---|---|---|---|---|---|---|---|
| LIVE (A, 11 consorts) | 38 | 529 / 731 | 115 | 38.1 | 1656 | 29.5 / 5.9 | 102 | 6 |
| A 20 | 76 | 671 / 838 | 123 | 39.2 | 2007 | 55.4 / 9.1 | 175 | 9 |
| B2 12 / 16 / 20 | 41 / 49 / 57 | 560 / 518 / 514 (worst ≤ 1023) | 113–122 | 38.7–39.0 | 1703–2018 | 30.9 / 39.3 / 48.2 raw; 6.1 / 7.0 / 8.0 gz | 114–153 | 8–10 |
| D1 20 | 53 | 591 / 877 | 97 | 39.3 | 2009 | 47.9 / 8.1 | 152 | 15 |
| D2 12 / 16 / 20 | 36 / 44 / 52 | 467 / 550 / 463 (worst ≤ 1012) | 102–121 | 38.5–39.0 | 1665–2010 | 29.4–48.8 / 5.8–8.1 | 111–150 | 6–9 |
| D3 20 | 52 | 549 / 869 | 101 | 38.8 | 1996 | 48.0 / 8.1 | 152 | 9 |
| LR 20 | 45 | 634 / 951 | 99 | 39.0 | 1709 | 47.0 / 8.2 | 147 | 8 |
| E 12 / 16 / 20 | 33 / 37 / 41 | 529 / 590 / 588 (worst ≤ 973) | 104–142 | 38.8–39.2 | 1959–2014 | 29.4–45.7 / 5.9–8.1 | 111–144 | 6–11 |
(full rows: /home/user/wt/sct-out/perf.json, reproducible with `node dev/measure/staff-cap-table-perf.js --out f.json`)
Reading: servant count does NOT move the buổi step, render or memory beyond run noise (every table at 20 consorts sits inside LIVE's ±40 % band; heap +1 MB). The ~0.5 s buổi step is the rest of the game (j95 schedule, events), not servants. Even table A at 76 people is within noise.

## Brain variants (owner 03:05Z: every servant has a brain)
Today servants keep the j95 schedule (AG1 scores consorts only; AG3 maids get tea deeds). Measured consort decide (agDecide) at 4×: mean 0.08–0.30 ms, p95 0.7–1.9 ms. ESTIMATE (servant decide assumed = consort decide; servants have fewer options, so this is an upper bound):
| variant | deciders per buổi at worst 20 (B2 / D2 / E) | extra CPU per buổi (mean … p95 bound) |
|---|---|---|
| full brain every servant | 38 / 33 / 22 staff | ~8 … ~70 ms (B2); ~6 … ~60 (D2); ~4 … ~40 (E) |
| thân cận-only full brain (1 close servant per household, others light/schedule) | 20 | ~4 … ~35 ms |
The agent loop is time-sliced (BAL.ag.perf.slice 3 ms per frame), so even the p95 bound spreads over ~10–25 frames instead of one freeze. Both variants are small next to the 500 ms buổi step. A real servant-brain build must re-measure (servant deeds don't exist yet).

## Co-op
Host cost = ser/toCanon of the bigger world: 6 ms → 8–15 ms. Weekly world frame gzip 5.9 KB (live) → 8.0–8.1 KB (B2/D/E at 20), 9.1 KB (A at 20) — all under the 16 KB target (play-perf-budget _target.coopSyncKBMax). +2 KB at a 1 Mbps phone uplink ≈ +16 ms (ESTIMATE from bytes; a live two-client coop-lag.js run was NOT done: that test plays an ordinary palace and cannot force the worst palace). Per-buổi seat deltas do not carry NPC staff.

## Recommendation (gain vs risk)
Perf is no reason to pick a lower table: even 76 people did not lag beyond noise (risk of lag from servants: rare / small / caught by play-perf.js). Pick by her ~25–27 goal: **D2** is the only table that stays 26.4–27.1 at every moment while keeping her Quý nhân 2, Phi 2+1, HQP 3+1, HH 4+1 and TH 3 + ma ma; cost = Tần and Quý phi lose the eunuch she named (likely she notices: medium; fix = one BAL row). E is the best worst case (41 at 20) but cuts Quý nhân to 1 against her words. B2 (her ladder as said) = ~31, above her 25–27. → Được lớn hơn with D2: hits her number with the fewest changes to her ladder; servant lag is not a real risk.
Apply after her pick = staff-cap-fix HANDOVER item 4 (BAL row + printed texts + NPC seeding + face pool + tests).

## V TABLE (owner proposal OD 18/11 ~01:45Z, L1789; harness review/staff-cap-table 4b1d9a2c)
| | ĐƯ | TT | QN | Tần | Phi | QP | HQP | HH | TH |
|---|---|---|---|---|---|---|---|---|---|
| V1 | 1+0 | 1+0 | 2+0 | 2+0 | 2+1 | 2+1 | 3+1 | 3+1 | 4+1 |
| V2 | 1+0 | 1+0 | 2+0 | 2+0 | 2+1 | 2+1 | 3+1 | **4+1** | **3 + ma ma** |

| table | avg start | avg +2y | avg +5y | worst 12 | worst 16 | worst 20 |
|---|---|---|---|---|---|---|
| V1 | **26.4** | **26.9** | **26.5** | 36 | 44 | 52 |
| V2 | **26.4** | **27.1** | **26.9** | 36 | 44 | 52 |
(same bot snapshots and worst palace as above; V2 = D2's exact totals, V1 = 1 fewer cung nữ + 1 more thái giám at the top.)

| perf at worst 20 (Fold, 4×) | people | buổi ms med / worst | render ms | heap MB | DOM | world KB raw / gz | save KB | ser ms |
|---|---|---|---|---|---|---|---|---|
| V1 | 52 | 599 / 819 | 100 | 39.2 | 1704 | 46.6 / 8.0 | 146 | 7 |
| V2 | 52 | 646 / 862 | 113 | 39.1 | 2013 | 47.8 / 7.9 | 148 | 8 |
Same reading as above: inside the LIVE noise band (529 / 731, ±40 %); co-op world frame 8 KB gz < 16 KB target. Both hit her 25–27 at every moment. Brain estimate as for D2 (33 staff at worst 20: ~6 … ~60 ms/buổi, sliced).

## Nữ đế (OD:L88)
Exists in code as the succession CHOICE, not a rank/seat: dev/build/j99succ.js (succBegin("c") → title "Nữ đế", 3-chapter epilogue, endings c_ok / c_abd / c_bad / c_rare / c_fail). No RANKS entry, no BAL.promo.cap row, no seat. Staff today: capOf(S) keeps reading her LAST consort row (S.rank, usually Hoàng hậu = row 7 → under V1 3+1, under V2 4+1); Hoàng thái hậu path (a) also stays on her own row (BAL.promo.capTh is only for the NPC Thái hậu S.thO). During the epilogue the world is paused (S.succ.on), so the row matters only for what the epilogue shows. A Nữ đế / player-Thái hậu row = new BAL row + capOf branch on S.succ.p, when she rules it.

## HANDOVER (rollover 18/11 ~01:45Z machine clock; worker past START_CTX + 25 %) — for the staff-cap-apply successor (opened by MAIN s41)
TASK (MAIN s41 msgs 18/11 01:42Z + 01:43Z): owner PICK OD L1794 (18/11 ~02:15Z, read verbatim) = live A with Quý nhân 2+0 → BAL.promo.cap = [[1,0],[2,0],[2,0],[2,1],[3,1],[3,2],[4,2],[4,2]], capTh [4,2] unchanged; eunuchs from Tần. Branch review/staff-cap-apply from main **62a6846f** (staff-cap-fix is LIVE there). NOT STARTED (no branch, no code).
Plan:
1. BAL: dev/build/jpromo.js:22 `cap:` row 2 [2,1]→[2,0]; add a Nữ đế slot (e.g. `capNd`) = HH row [4,2] (owner number pending) and make j10 capOf(S) read it when S.succ && S.succ.p==="c" (j99succ.js succBegin). Comment lines jpromo.js:12/20 describe the table — update.
2. Texts that state caps: git grep origin/main for "thái giám" + "cung nữ" near phẩm/rank in dev/build (promo-rules cards jpromo prRules/kitPersonReveal, j10 capLaw (prints from BAL — check it), Nội vụ phủ hire cards j29 hireCard/fillStaff, staff tab tooltips jstaff, rank-up reveal "+1 người hầu"). Every number printed from capOf/BAL, VANPHONG wording.
3. Old saves / NPC seeding: Quý nhân households with an eunuch today → capSweep/capTrim (staff-cap-fix rule) removes him with ONE grouped kit notice (already the live rule — just verify on an old save with a QN + eunuch; staff-cap.js has the cases).
4. FACE-POOL BUG (this report, CORRECTED note above): dev/build/j17.js:53 roomFor counts poolOf() = old FPOOL (j25.js:98: 15/15/6) + FAV probe j17.js:42 → hiring stops at 14 staff maids / 12 non-maid palace-wide; figures are FIGIX (ids m01..m52 / 30 eunuchs / 8 ma ma). Fix roomFor to count FIGIX identities per role (maids ≤ 52 minus maid identities worn by consorts, j88 reserve), no FAV dependency on old face-*.webp. Probe script: /home/user/wt/sct-out/probe.js (scratch; copy into dev/measure if kept). Watch jpromo.js:57 comment + j27.js:58 consort wrapper.
5. Tests: node dev/test/staff-cap.js (27), dev/test/staff-root.js (16), one-core test, quickcheck (pattern reports/batch-0430.md), coop-e2e; measure: dev/measure/staff-cap-table-count.js with a new table row (avg of the pick ≈ A minus QN eunuchs: ~37 at start; worst 20 = 52+... recompute) and perf (perf flat, see above).
6. Report reports/staff-cap-apply.md + CLAIMS + send_message MAIN s41 "SẴN SÀNG KIỂM staff-cap-apply <sha>" → BIG review.
Worktrees of this worker: /home/user/wt/sct (review/staff-cap-table, pushed 4b1d9a2c), /home/user/wt/ho (detached/rep, handover). Scratch outputs /home/user/wt/sct-out (snaps.json, perf.json, perfV.json).
