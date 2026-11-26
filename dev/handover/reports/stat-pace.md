PRIORITY #1 CHECK ('kỳ ngộ|thiện cảm|oán|danh|sủng|event cap|người tìm'): OD 254 | ledger 16 | claims 8 | main 15 | review/* 9 | archive 805 — reused: review/balance-pace pace.js harness pattern (it covers lesson/course pace, NOT these five stats; not landed), jspread / j68 evGate / evBusy (existing pacing layers, wrapped, not rebuilt). No other worker on stat pace / daily cap.

# review/stat-pace — WORKER D2 (Foreman D) — STATUS: #3 FIXED the BIG review FAIL list (1–6), re-review next; preset A default, B = one-line switch (BAL.stpPick)
#3 = session_01D3E3NapjNambTi15A89ezj · depth 3 · START_CTX ~4 % (estimate; tool read 0).
#2 = session_01D3E3NXn2KvRU5meXSH17rD · depth 2 · START_CTX ~5 % (estimate) · sếp 05:20Z «Sửa gấp … sau khi đáp máy bay» → Foreman D 05:27Z: make A/B two presets, A default, land.
depth 2 · START_CTX ~3 % (estimate; tool read 0) · rolled over at ~33 % (rule: START_CTX + 25 %).
Branch review/stat-pace from LIVE origin/main f009e1a6. Pushed commits: a4da17b3 (+ the handover commit carrying this file).

## Owner words (verbatim rows OD 26/11 ~01:25Z … ~04:20Z on the handover branch; not repeated here — read them there)

## LIVE measured (dev/measure/statpace.js, inpage6 «sens» bot, 8 lives × 24 months, file live.html = origin/main f009e1a6)
1 game year = 12 months = 36 game days (tuần). Median of 8 lives (max in brackets); at100 = stat cells ≥ 99 over the 8 lives (7 stats each).

| month | rank | Sủng | Danh | Đức | Thái hậu→ta | Hoàng hậu→ta | best consort thiện cảm | worst oán toward her | at100 |
|---|---|---|---|---|---|---|---|---|---|
| 3 | 1.5 | 71 (99) | 52 (82) | 55 (66) | 24 (74) | −2 (45) | 38 (92) | 42 (78) | 1 |
| 6 | 2 | 96 (100) | 66 (91) | 79 (87) | 53 (89) | −5 (55) | 33 (68) | 84 (100) | 3 |
| 12 | 2 | 98 (99) | 71 (100) | 100 (100) | 72 (100) | 20 (60) | 32 (60) | 98 (100) | 19 |
| 24 | 2 | 98 (100) | 79 (100) | 100 (100) | 81 (99) | 0 (24) | 4 (45) | 99 (100) | 20 |

= her report exactly: by the end of year 1 Sủng / Đức / Danh / Thái hậu / oán sit at 100 while she is still rank ~2.
Root (gain tally by source, statpace.js `src`): single rises far too big (Kỳ ngộ thiện cảm +30…+56 ×V band, Thái hậu +30 from relTo / runOpt, thị tẩm Sủng +12, j95b ledger seed oán up to +48 a hit), no slowdown near the top, no rank link; plus Kỳ ngộ p0 85 % with a 1-tuần wait ≈ one encounter EVERY day, visitors up to 2/day + stage visitors up to 3/buổi.
Events per day (dev/test/stat-pace.js on LIVE, 47 days): mean 3.3 big events a day, worst 7, 18 of 47 days above 3.

## What the branch does (all numbers BAL, law 4; same rule for her and every NPC, law 1)
- BAL.stp (dev/build/jbalsp.js) + jstatpace.js `spG` = ONE rise rule in the funnels apply (j1) / ap (j8) / affAdd / oanAdd (j9):
  size bands per change [small, normal, big] = Sủng/Danh/Đức [2,5,8], thiện cảm/oán [4,8,12] (above «normal» counts 30 %, never past «big» → Kỳ ngộ +34 ⇒ +12);
  rank ceiling (of the one who RECEIVES; her rank for regard toward her) ceil = [45,55,65,75,85,92,97,100] — each above what the next rank needs (test checks RANKS[r+1].s/.d);
  diminishing returns × max(.15, 1 − (now/ceil)^3); fractions carry per person (p.spc), no random draw. A fall of Danh/Đức/Sủng/oán is untouched;
  thiện cảm (th/hh/rel −100..100) is paced on BOTH sides (dislike growing below 0 the same way — without it Hoàng hậu sank to −100 in the first run).
- LAW 11 family scan dev/measure/statpace-scan.py: LIVE 130 raw rise writes → branch 0 (111 routed through `spAdd`, 2 by hand jlux/jkc); left on purpose: fx-object builders jlux/jpoison/jrcp (they feed apply later), co-op mirror jcoopworld friendEntry.
  Funnel sites now under the rule: apply 344 · ap 284 · affAdd 148 · relAdd 258 · oanAdd 208 · hhSet 1 · spAdd 115.
- Real number on screen (law 4): fmt() option previews and Kỳ ngộ buttons + result lines show the REAL rise (`spSee`). KNOWN LEFT: typed literal previews like j7 «thiện cảm +25» (pre-existing typed numbers) still print the raw size → follow-up (one scan, same family as E-d «+8 (42)» rows).
- Daily big-event cap jevc.js + BAL.evc {cap 3, q fest 2 / harm 1 / visit 1 / ky 1 / opt 1, pri fest>harm>visit>ky>opt, wait 3}: counts cards shown today + cards waiting (Q, SP13.L, EVHOLD, EVCW); gates kyArrive, approachOne, gmCard, agScene (deed still lands), show70 (non-urgent waits), evBusy, makeDil; at paint a big card of a full day waits in EVCW for a later day (harm never held). Kỳ ngộ wait BAL.kyngo.cd [1,1,1,1] → [2,2,3,3] tuần (canon overwrite in jbalky.js).

## Branch measured
Events (test, 47 days): mean 2.2 a day (LIVE 3.3), worst 4 (LIVE 7), days above 3: 3 (LIVE 18). Still FAIL by 3 days: leftover cards that bypass the hold (likely must/forced e68 visit-type cards — the test now prints MUST/FORCED flags per card; NEXT: run it, then either exempt such cards in the test or gate their source).

| option (6 lives × 24 mo, partial) | m6 rank · Sủng · Danh · Đức · th · hh | m12 | m24 | at100 in 2 years |
|---|---|---|---|---|
| LIVE | 2 · 96 · 66 · 79 · 53 · −5 | 2 · 98 · 71 · 100 · 72 · 20 | 2 · 98 · 79 · 100 · 81 · 0 | 20 |
| **A recommended** (pow 3, ceil 45…100, cap 3) — 2 lives so far | 2.5 · 47 · 40 · 55 · 27 · −15 | 3 · 63 · 44 · 69 · 38 · −11 | **4.5** · 77 · 56 · 76 · 24 · −16 | 0 |
| B stricter (pow 2, ceil 40…100, cap 2) — 4 lives | 2.5 · 40 · 25 · 50 · 24 · −22 | 1.5 · 50 · 29 · 54 · 12 · −41 | 0.5 · 46 · 32 · 52 · 3 · −40 | 0 |
(pow-2 / ceil-45 first run, 3 lives: no 100 either, rank 1–3, Danh ~30.) Worst oán toward her at 2 y: LIVE 99 → A 46 → B 26.
Reading: A keeps every stat under 100 for 2 years and values rise WITH rank (median rank 4.5 = Phi road at 2 y vs LIVE stuck at 2); B is so tight that Danh/Thái hậu stay too low to promote.

## For sếp (Vietnamese, short)
(#3 numbers, 6 đời × 24 tháng, cùng 6 hạt giống với LIVE; bảng ở mục «#3 work» 4.)
- **Cách A (mặc định):** mỗi lần tăng Danh/Đức/Sủng tối đa +8, thiện cảm/oán tối đa +12 (kỳ ngộ +34 → +12); càng gần trần theo bậc càng tăng chậm (Đáp ứng 45 … Hoàng hậu 100); vượt trần bậc vẫn tăng rất chậm, chỉ dừng ở mức cổng cao nhất (Đức/Danh 80, Sủng 75, Thái hậu 60) nên không việc nào bị khóa. Một ngày tối đa 3 việc lớn, phần dư dời ngày sau; kỳ ngộ 2–3 ngày một lần. Máy thử 2 năm: không chỉ số nào chạm 100 (cao nhất 84); bậc giữa 3 (LIVE 3,5), không đời nào vào lãnh cung.
- **Cách B (chặt hơn, đổi 1 dòng BAL.stpPick):** trần thấp hơn, chậm mạnh hơn, mỗi ngày tối đa 2 việc lớn. Máy thử 2 năm: không chạm 100 (cao nhất 80), nhưng bậc giữa 0 và 2/5 đời vào lãnh cung — chặt quá, khó leo.
Cả hai: lòng Thái hậu tăng chậm hẳn (LIVE mỗi lần +30, nay tối đa +12; A sau 2 năm 26, LIVE 65). Sếp chọn A hay B — em không tự chọn.

## Tests so far
dev/test/stat-pace.js (unit 31 checks all ok: bands, ceilings above next-rank needs, carry, NPC same rule, old save above ceiling kept, cap ledger, tags; simulated days still FAIL 3 days — see above). Regression runner over the 97 tests that touch the changed functions: /home/user/wt/sp-out/regress.sh (tests list tests.txt) — NOT RUN YET (LIVE vs branch). No videos yet.

## #2 work (session_01D3E3NXn2KvRU5meXSH17rD)
- **Cap leaks closed** (needed by A and B): (1) the test billed morning cards painted inside endTurn to the day before → counts each card on the day she SEES it; (2) a plot's warning / aftermath (never held, by design) landed on a full day → `BAL.evc.res {harm:1}` keeps one slot for harm until harm came that day (evcOK + paint hold, `evcKeep`); (3) a re-queued copy of an earlier card (next step of a Phụ tuyến) carried the old «seen» mark and skipped the gate → the mark is per day (`evcToday`, m.evcN = day + 1).
  Simulated 45-day runs (dev/test/stat-pace.js): 8/8 runs of the final build 0 days over the cap, worst day 3 (LIVE: worst 6, 15 of 46 days over, mean 3.0/day; branch mean 0.8–1.9/day).
- **A / B as ONE switch**: `BAL.stpPick="A"` in dev/build/jbalsp.js; `BAL.stpPre.A {ceil 45…100, pow 3, cap 3}` (default), `B {ceil 40,50,60,70,80,90,96,100, pow 2, cap 2}`. Flip to B = change that one line. Both pass dev/test/stat-pace.js (B: worst day 2 of cap 2).
- **BAL key clash fixed** (found by one-core-guard + ag-carry regression): `BAL.sp` was already servant promotion (jpromsv) and `BAL.pace` lesson pace (jbal2) → stat pace is now `BAL.stp` (jbalsp / jstatpace / test). one-core-guard PASS (paced-stat flag tables written as lists, not typed numbers).
- **Regression** (142 tests touching the changed functions, each with its own default args; branch first, then LIVE for every branch failure; dev/test list in report folder of the worktree /home/user/wt/sp-out/tests.txt): 9 differed from LIVE → re-run alone: 4 were flaky/timing (npc-purpose-g1d, selx-map, viecnho-fix, place-rules-video: pass); ag-carry + one-core-guard were the BAL.sp clash (fixed, pass); cold-faction, receiver-choice, visitor-scene assert their own feature's exact pre-pace numbers / force a card on a full day → they switch `BAL.stp.on=0; BAL.evc.on=0` in their page (pace + cap covered by stat-pace.js) → pass. FINAL full re-run: see «#3 work» (FINAL full re-run line).
- **Typed previews follow-up** (step 5): dev/measure/statpace-typed.py lists 103 typed rise previews in 37 files (same count on LIVE: pre-existing, e.g. j7 «thiện cảm +25»); they print the raw size while the rise is now paced → belongs to the E-d «Hoàng hậu thiện cảm +8 (42)» kit result-row family (change + new total from the real funnel); not touched here (no private rows, law 9). Kỳ ngộ result lines + fmt() previews already print the real number.
- **Videos** (dev/test/stat-pace-video.js, real taps, Fold 755x1000 + iPad 1180x820): a Kỳ ngộ → tap the way that wins thiện cảm → result «… thiện cảm +12» (raw would be +30…40); a day with Kỳ ngộ + one other big event + one slot kept for harm → «Có người đến» waits (EVCW 1) → the day turns → the same visitor comes. Recording note: j68's own one-optional-card-a-buổi gate (existing rule) is switched off only for the release frame so the card is seen at once.
  https://ctm-img.victoria-tntt.workers.dev/img/_review/stat-pace/stat-pace-fold-755x1000.mp4
  https://ctm-img.victoria-tntt.workers.dev/img/_review/stat-pace/stat-pace-ipad-1180x820.mp4

- **Merged LIVE 6b5d3d05** → d693723f (conflict jagacts reward/pardon: kept the spAdd pace route + LIVE's forgetSafe). Law-11 scan after merge: no new raw rise (only the intended fx-builders jlux/jpoison/jrcp + co-op mirror).
- **Quickcheck d693723f**: open 1991 ms, old LIVE save loads + plays a buổi OK; core gates: 2 G4 FAILs that are IDENTICAL on LIVE 6b5d3d05 (80-dialog-fixed «kit-dialog-2 a no empty Tốn/Được cell», 90-button-crawl «Ô lưu · Lui close») = pre-existing, not this branch; perf run 1: tab 573 vs live 422 ms (limit 549) — profiled: spG/spSee/evc hooks cost ~0 ms, repeated tab timing new 1832/1437 vs live 1590/1587 = noise; perf re-run: QUICKCHECK PASS (512 s · open 2288 ms · old save ok · render 268/233, tab 695/572, buổi 1849/2919 ms, tasks>200ms 38/37).
- **BIG reviewer** opened (child): session_01D3E3NXKn1Hw6DCUdV6BXbE on d693723f.

## #3 work (session_01D3E3NapjNambTi15A89ezj) — answers to the BIG review FAIL list (dev/handover/reviews/stat-pace-big.md)
PRIORITY #1 CHECK: OD 26/11 D2 rows + 05:05Z A/B pick (still open for sếp) | main 6b5d3d05 (no stat floor / gate scan) | review/stat-pace only | claims D2 row (#2 → #3).
Code sha: 15606eea (on LIVE 6b5d3d05; LIVE is an ancestor → FF).
1. **Gates vs rank ceiling (law 11 / 16)** — new scan `dev/measure/statpace-gates.py` (every `x.danh/duc/sung/th/hh >= gate` in dev/build, + every step of the
   stat ladders read through helpers: BAL.ducLv / sungLv / danhG / oanLv / hhDuc / sinhThanSung …, + the net thresholds of a consort's thiện cảm / oán
   toward her, BAL.net.thClamp top) = 155 gates. Fix: `BAL.stp.floor` {duc 80, danh 80, sung 75, th 60, hh 60, rel 80, oan 80} = the highest gate of
   each stat. The rank ceiling still SLOWS a rise (dm: above the ceiling only the slow share dm.min .15 counts) but a rise only STOPS at
   max(ceil[rank], floor[stat]) (`spTop`), so every working rule stays reachable at every rank (Ẩn dật Đức 60, «Khách lạ ở chùa» Danh 60,
   Đức → Thái hậu +1/month 60 for her and every NPC, hiền đức 80, sinh thần Sủng 50, Thái hậu th 50/60, net thresholds …). Same floors for A and B.
   The scan exits 1 when a gate is shut; the unit test checks 14 named gates at every rank. Before / after (built page BAL; `--nofloor` = before):
```
== --nofloor --preset A
preset A · floor none · gates 155 · gates shut at some rank 75
stat	gates	max gate	shut gates	ranks shut (rank:count)
danh	15	80	8	0:8 1:5 2:2 3:1
duc	28	80	19	0:19 1:13 2:3 3:1
hh	5	60	3	0:3 1:1
oan	8	75	4	0:4 1:4 2:3
rel	5	80	4	0:4 1:4 2:2 3:1
sung	65	75	25	0:25 1:14 2:4
th	29	60	12	0:12 1:4
exit 1
== --nofloor --preset B
preset B · floor none · gates 155 · gates shut at some rank 83
stat	gates	max gate	shut gates	ranks shut (rank:count)
danh	15	80	8	0:8 1:5 2:2 3:1
duc	28	80	23	0:23 1:14 2:3 3:1
hh	5	60	3	0:3 1:1
oan	8	75	5	0:5 1:4 2:3 3:3
rel	5	80	4	0:4 1:4 2:2 3:1
sung	65	75	28	0:28 1:18 2:4 3:2
th	29	60	12	0:12 1:4
exit 1
== --preset A
preset A · floor {'duc': 80, 'danh': 80, 'sung': 75, 'th': 60, 'hh': 60, 'rel': 80, 'oan': 80} · gates 155 · gates shut at some rank 0
stat	gates	max gate	shut gates	ranks shut (rank:count)
danh	15	80	0	-
duc	28	80	0	-
hh	5	60	0	-
oan	8	75	0	-
rel	5	80	0	-
sung	65	75	0	-
th	29	60	0	-
exit 0
== --preset B
preset B · floor {'duc': 80, 'danh': 80, 'sung': 75, 'th': 60, 'hh': 60, 'rel': 80, 'oan': 80} · gates 155 · gates shut at some rank 0
stat	gates	max gate	shut gates	ranks shut (rank:count)
danh	15	80	0	-
duc	28	80	0	-
hh	5	60	0	-
oan	8	75	0	-
rel	5	80	0	-
sung	65	75	0	-
th	29	60	0	-
exit 0
```
   «Nothing at 100 in year 1» still holds (table under 4: at100 = 0 for A and B over 2 years; the max of any stat over 6 lives × 24 months is 88).
2. **ag-carry regression / dropped choice** — jevc agScene wrap: on a full day the consort PUTS THE DEED OFF with the same rule jagday already uses
   for «she changes her mind» (p.drop, out of pend, AG.stat.drop, agTouch re-plans her day); before, p.seen = 1 and the deed landed later with no
   card and no choice. Her wish stays with the consort (agent wants), so she comes on a later day with room. Unit check «full day: «Có người tìm đến» put off».
   ag-carry.test.js on 15606eea: ALL 26 PASS (lives [0,0,1]).
3. **Unrouted rises (directMap)** — scan class `riseMap` added to statpace-scan.py (x.rl[id] / x.ro[id] += n or = cl((…)+n)). LIVE 5 → branch 0:
   jcoopworld resApply (her row for the co-op friend: rel / oán) + brbAff + jkcco bond → `spRow` (new, jstatpace: the same spG rule for a map row,
   ceiling at the rank of the one the row is about = the friend's consort entry, rank 0 before the palace); jts tsLeNpc → affAdd (BAL.eff.jts.leNpc 2).
   Left on purpose (unchanged from #2): fx-object builders jlux / jpoison / jrcp (they feed apply later) and the co-op mirror friendEntry().rel.
   Co-op: resApply runs on the host (fW()&&!host() returns early), spG has no random draw → host-computed, deterministic. coop-e2e.js on 15606eea: 143/143 PASS.
4. **Evidence, 6 lives × 24 months, the same 6 seeds for LIVE / A / B, final code** (built page of 673ecef1 = fadad0d8; dev/measure/statpace.js, CAP 2600, PAR 2;
   B = BALO {"stpPick":"B","stp":{"ceil":stpPre.B.ceil,"dm":{"pow":2}},"evc":{"cap":2}}). Values = median of the lives (max in brackets); ranks = every
   life's rank; lc = lives in lãnh cung that month; at100 = stat cells ≥ 99 (7 stats per life). B: seed 5 died in month 0 (bot), so B has 5 lives after month 0.
| run | month | rank (all lives) | lc | Sủng | Danh | Đức | Thái hậu→ta | Hoàng hậu→ta | best consort thiện cảm | worst oán toward her | at100 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| LIVE 6b5d3d05 | 3 | 2 [0, 2, 2, 2, 2, 2] | 0 | 90.5 (100) | 91.5 (99) | 52.5 (64) | 33.5 (60) | -22.5 | 36.5 | 34 (62) | 4 |
| LIVE 6b5d3d05 | 6 | 3 [0, 2, 3, 3, 3, 3] | 0 | 99 (99) | 81.5 (100) | 77.5 (93) | 34.5 (70) | -21 | 38.5 | 49 (100) | 6 |
| LIVE 6b5d3d05 | 12 | 3 [0, 2, 3, 3, 3, 4] | 0 | 99 (100) | 89 (100) | 100 (100) | 85.5 (100) | -18 | 25.5 | 94.5 (100) | 15 |
| LIVE 6b5d3d05 | 24 | 3.5 [0, 2, 3, 4, 4, 4] | 0 | 99.5 (100) | 96.5 (100) | 100 (100) | 65.5 (100) | -20.5 | -2 | 93 (100) | 15 |
| A (default) | 3 | 1.5 [0, 0, 1, 2, 2, 2] | 0 | 39.5 (57) | 38.5 (49) | 44.5 (47) | 31.5 (41) | -11.5 | 11.5 | 17.5 (32) | 0 |
| A (default) | 6 | 2 [1, 1, 2, 2, 3, 3] | 0 | 51 (59) | 40.5 (46) | 54.5 (58) | 39 (46) | -19.5 | 10 | 19.5 (41) | 0 |
| A (default) | 12 | 2 [1, 2, 2, 2, 2, 3] | 0 | 62.5 (68) | 45.5 (58) | 58 (78) | 40.5 (57) | -32 | 2 | 31.5 (51) | 0 |
| A (default) | 24 | 3 [1, 1, 3, 3, 4, 4] | 0 | 70 (84) | 44.5 (69) | 71 (75) | 26 (68) | -27.5 | -29.5 | 30.5 (63) | 0 |
| B (BAL.stpPick="B") | 3 | 1.5 [0, 0, 1, 2, 2, 2] | 0 | 31.5 (55) | 34.5 (44) | 41 (43) | 5 (40) | -13.5 | 15 | 18 (23) | 0 |
| B (BAL.stpPick="B") | 6 | 2 [0, 2, 2, 2, 3] | 0 | 38 (66) | 30 (39) | 47 (48) | 2 (12) | -18 | 11 | 18 (37) | 0 |
| B (BAL.stpPick="B") | 12 | 2 [0, 0, 2, 3, 3] | 1 | 55 (58) | 26 (45) | 50 (60) | -15 (3) | 0 | 4 | 31 (47) | 0 |
| B (BAL.stpPick="B") | 24 | 0 [0, 0, 0, 3, 4] | 2 | 68 (71) | 20 (46) | 57 (80) | -21 (29) | 0 | -7 | 34 (55) | 0 |
   Reading: LIVE fills Sủng / Danh / Đức / oán to 100 by month 6–12 (at100 15 at 1 y). A and B: at100 0 in 2 years; the highest value of any stat
   in any life on any day = A 84, B 80 (LIVE 100). Rank progress at 2 y: LIVE median 3.5 (0,2,3,4,4,4), A 3 (1,1,3,3,4,4), B 0 (0,0,0,3,4) with 2 of 5
   lives in lãnh cung — B is too tight to climb. Thái hậu → ta: A 26 at 2 y (LIVE 65; her rises are banded, at most +12 a time, LIVE +30), B −21.
   The same run on the first #3 sha 15606eea (before «start values not paced») gave A rank 2 / B 3 at 2 y and at100 0 for both: the bot sample is
   noisy (±1 rank), the «nothing near 100» result is stable. Consorts' mean thiện cảm drifts to about −65 at 2 y on LIVE too (not this branch).
   Sếp's A / B pick stays open (not chosen here).
5. **Report gaps** — FINAL regression line and quickcheck line below; LAND READY line wording fixed («preset A default, B = one-line switch (BAL.stpPick)»).
6. **Cap family** — jagknow «Có người bán tin» (a servant coming to sell news) is now kind visit: counted when shown + a source gate (knSellPick for
   her, after its own roll, returns nothing on a full day; the j67 story beat knSellArc = her own choice, never refused). jagent «Ngươi bắt gặp» is
   EXEMPT with the reason written in jevc: it is what she sees at the place she walked to this khắc (her own move; holding it would show a deed
   after it is over, law 6). EVCW held cards are now SAVED with the life (ser / deser wrap, the Q save form serM → rcpMk / deserQ); unit check
   «EVCW saved + loaded». Nit spRk typed 7 → RANKS.length-1.
Tests on 15606eea: dev/test/stat-pace.js index.html 45 PASS (all unit checks incl. the new gate / put-off / seller / EVCW / spRow ones; 45 days:
worst day 3 of cap 3, 0 over, mean 1.31); one-core-guard PASS; one-core-text PASS; coop-e2e 143/143 PASS; ag-carry ALL 26 PASS;
statpace-gates.py exit 0 (A and B); statpace-scan riseMap 0 / riseDirect 18 (= the intended fx builders, unchanged).
**FINAL full re-run (code 673ecef1, test files fadad0d8)**: list = dev/measure/statpace-tests.txt (97) + every test calling resApply / brbAff / bond /
knSell / tsLeNpc / agScene / agSeekCard / evcOK + ag-carry = 101 tests, branch first (default args, P3), then LIVE 6b5d3d05 (LIVE test files)
for every branch non-pass: 30 pass on the branch; 71 do not pass on the branch AND do not pass on LIVE (pre-existing: wrong default args,
worker-URL tests, known LIVE reds). Tests that passed on LIVE but not on the branch: 4 in the first run → fixed in 673ecef1:
one-core-text (the new lì xì key: her card typed «thiện cảm +2» → now prints BAL.eff.jts.liXiAff, one number for her card and the NPC host),
balance-core (origin start values went through the pace rule → `SP_OFF` while start() makes a life: a new life starts exactly as on LIVE),
ag-sell + night-multi (force several cards in one day / check an exact keep.gain at Sủng 50 → cap / pace off in those pages, reason written,
like cold-faction). Second run: 0 such tests; 3 first-run passes went red once (ag-moodknow = red on LIVE too; npc-purpose-g1g, place-rules
pass when re-run alone). Same-red tests with a different count, each re-run: two-way-acts (random, re-run = LIVE's 1 FAIL), ag-all (Empress
exact-gain check twice in a row → pace off for that check only, now = LIVE's 6), invite-host-away (branch 2 FAIL vs LIVE 3), feelings18 (branch better).
Co-op family (13 coop-* tests touching resApply / ser, own default args, both builds assembled): identical to LIVE (coop-thin-b red once under
load, PASS alone; coop-guest-maid same TypeError on LIVE).
**Quickcheck fadad0d8**: QUICKCHECK PASS · 511 s · open 2515 ms · old save ok · perf (median of 3, new/live): render 245/267, tab 500/548,
buổi 2050/1656 ms, tasks>200ms 33/35. Core gates: G4 80-dialog-fixed + 90-button-crawl = pre-existing on LIVE (as in #2); G4 92-look-dedupe
red once = flaky on LIVE too (look-dedupe.js on LIVE: «opens «undefined»» FAIL 1 of 2 runs; branch PASS 2 of 2).
Videos: no player-visible change in #3 (no new UI, no new words), so #2's Fold 755x1000 + iPad 1180x820 videos stand (URLs above).

## LAND READY line (after reviewer PASS): «LAND READY review/stat-pace <sha> (FF from LIVE 6b5d3d05) · preset A default, B = one-line switch (BAL.stpPick)»

## HANDOVER #2 → #3 (done by #3; kept for the record) (rolled at ~29.5 % context; START_CTX ~5 %; depth 2) — the COORDINATOR (Foreman D session_01D3E3NaVk7n7f8KTo2enJna) opens #3
State: review/stat-pace (head after this commit) = code d693723f (LIVE 6b5d3d05 merged) + report/review docs. BIG reviewer session_01D3E3NXKn1Hw6DCUdV6BXbE (my child) = FAIL; full text dev/handover/reviews/stat-pace-big.md. #3 fixes, then messages that reviewer (send_message) for the re-review.
Container note: the worktree /home/user/wt/sp + /home/user/wt/live + /home/user/wt/sp-out live only in #2's container; #3 rebuilds (sparse worktree of review/stat-pace, bash dev/site/build_site.sh; regression list = every dev/test/*.js matching kyngo|kyArrive|affAdd|oanAdd|relAdd|spAdd|approachOne|gmCard|agScene|show70|evBusy|makeDil|BAL\.kyngo plus files named kc|lux|pet|reign|toil|men|ag-|maid|route|selx|ts-|world|visit|greet|fest; run each with its default args, branch first, then LIVE for the ones that fail; ~45 min at -P 4).
TODO (reviewer FAIL list, in order):
1. LAW 11/16 gates vs rank ceiling: write a scan (every BAL stat gate Đức/Danh/Sủng/th/hh compared with BAL.stp.ceil[rank] for each rank where that gate is used; e.g. route.anDuc 60, tuDuc 50, rtDuc/guiltDuc 60, danhG.kcVihanh 60, kcR5 Danh 50 + Đức 70, ducLv.up 60 monthly Thái hậu +1, j20 sinh thần Sủng 50, j14 th 50, jrd_ch trust th 50) + before/after table; make every gate reachable (recommendation: raise low-rank ceilings to ≥ the highest gate open at that rank — likely ceil[0..1] ≥ 60–70 — or take Đức/th off the rank ceiling and keep only band + diminishing; pick the option that still keeps «nothing at 100 in year 1»); A and B presets both.
2. ag-carry.test regression: jevc agScene wrap drops the «Có người tìm đến» shared act (her choice) on a full day → defer it (hold the deed + its card to a later day) or count it in the visit slot; do not drop her choice. Then the FULL list re-run LIVE vs branch on the final sha.
3. Unrouted rises in directMap: jcoopworld.js:824 (S.rl/S.ro += g.rel/g.oan), :1259 brbAff, jkcco.js:34 bond, jts.js:288 tsLeNpc v.rl += 2 → affAdd/spAdd; extend dev/measure/statpace-scan.py to check directMap rises.
4. Re-measure A and B ≥ 6 lives × 24 months after fix 1 (CAP=2600 PAR=3 node dev/measure/statpace.js index.html 6 24 0; B via BALO='{"stpPick":"B"}' is NOT enough — the preset is applied at load: patch BAL.stp.ceil/dm.pow/BAL.evc.cap from BAL.stpPre.B in BALO instead) with rank progress + lãnh cung counts; update the tables.
5. Report: fill the FINAL full re-run line; LAND READY line must say «preset A default, B = one-line switch (BAL.stpPick)».
6. Judge + document: «Có người bán tin» (10 in 47 d) / «Ngươi bắt gặp» (6) reach her outside the cap kinds → put in a kind or exempt with a reason; EVCW held cards are lost on save/reload (save them in S or note it); nit spRk typed 7 → RANKS.length-1.
Then: quickcheck (bash dev/tools/quickcheck.sh; G4 80-dialog-fixed + 90-button-crawl FAIL identically on LIVE = pre-existing; perf noisy — re-run once), new Fold/iPad videos only if the visible story changes (script dev/test/stat-pace-video.js), re-review by session_01D3E3NXKn1Hw6DCUdV6BXbE → «LAND READY review/stat-pace <sha> (FF from LIVE) · preset A default, B = one-line switch (BAL.stpPick)» + video URLs here → message Foreman D.

## HANDOVER (for the successor — the COORDINATOR opens it)
1. Wait for Foreman D's pick (A/B). Worktree /home/user/wt/sp (sparse), outputs /home/user/wt/sp-out (live.html = LIVE copy, *.jsonl lives, sum.py summary, show.py per-source tally). If the container is gone: fetch review/stat-pace and rebuild (bash dev/site/build_site.sh).
2. Finish the cap: run `node dev/test/stat-pace.js index.html 45`, read the MUST/FORCED flags of over-cap days, fix (gate source or exempt never-waitable cards in BOTH jevc and test).
3. Re-run optA to 6 lives (`BALO` not needed now: A is the branch default pow 3): `CAP=2600 PAR=3 node dev/measure/statpace.js index.html 6 24 0`.
4. Run regress.sh on live.html and on the branch build; only regressions vs LIVE matter; fix them (likely: tests asserting exact gains / Kỳ ngộ cd 1 / kyngo-unit cooldown).
5. Typed preview numbers follow-up (j7 etc.) or list it as KIT/E-d follow-up.
6. Fold 755x1000 + iPad 1180x820 FULL videos (a Kỳ ngộ button showing the real +, a result line, a day with a waiting visitor) → img/_review/stat-pace/; then SSK → open ONE opus BIG reviewer as child (create_session, source_url https://github.com/thientran2711/cung-tuong-mong, clone_depth 30) → «LAND READY review/stat-pace <sha> (FF from LIVE)» here → message Foreman D (session_01D3E3NX3vWTRXcmN8Wi8Yxw).
ROLLOVER (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
