PRIORITY #1 CHECK ('bot-proof|ctxTaste|ctxCap'): OD 0 | ledger 0 | claims 7 | main 6 | review/* 0; ('rank pressure|ration'): OD 24 | ledger 1 | claims 8 | main 15 | review/* 0; ('Giả bệnh'): OD 0 | claims 1 | main 15; own grep: jecon BAL.pay/duty/wage/banThuong + BAL.promo.cap (rank costs exist → reuse), jty BAL.ty rob*, jevb ctxTaste/ctxCap, dev/measure inpage6/instory/indanhlog/evbot → extended, no new system.
# BALANCE-2 — worker report (D8, session_01964izCgvagC6fUGWVGhXHy, opus)
START_CTX ≈ 5 % of the 1M window (get_session reads 0; estimate). Rollover at 30 %, ceiling 60 %.
Branch **review/balance-2** = review/balance-core-r2 baff0824 + origin/main 6c4f21c3 + review/story-bot 0e8f8ff8.

## STATUS (WIP, updated as work lands)
- DONE: (1) inpage6 c.off fix. (3) Giả bệnh one-core + honest card; typed card chances family → BAL.rk (riskscan.py 16 → 0); hidden-risk family: map spot robbery risk shown. (9) clamps + raised-maid Danh.
- BOT FAULT FOUND (all earlier sens-bot balance numbers affected): inpage6 scoreAct/talkScore did `- costW(a.c)` where costW is the (negative) price → every price counted as a GAIN; the bot chose dear acts and fell into «Giả bệnh» 11.6×/life. Fixed (`+costW`). Story-bot P2 "HH 0/30" and fault-2 numbers were measured with this bug.
- BUG FOUND + FIXED (Danh drain, real game): the monthly «Bổng lộc» card was applied TWICE (chooseM applies the option fx, then econDoDuty paid again): «Chu toàn lễ nghĩa» cost 2× bạc (shown 30, took 60), «Bớt lễ nghĩa» cost 2× Danh (shown 3, took 6) — every month for her. Proof: /home/user/wt/b2shots/duty.js on game_base vs branch. Family check: dev/measure/dblscan.py (static: 4 candidates, all legit win/fail payouts) + inbal2 runtime check (x.b2.dbl, any option whose real change is exactly 2× its fx).
- NEW Danh source by rank (rank-pressure law: bigger duty, bigger cost, earns the name the next rank asks for): paid lễ nghĩa → Danh +BAL.dutyDanh[rank] [0,0,1,1,1,2,2,0], NPCs the same.
- Pilot "before" (34 lives, fixed bot): Hoàng hậu 13 %, death before HH / 8-y cap ≈ 33 %, end < 3 y 27 %; promotion months blocked: promo gap 52–81 %, Danh 41–52 %, seat vacancy 30 % (HQP), Thái hậu 30 % (HQP). Rank pressure (bot): bạc held 9–29, cards blocked by bạc 31–36 % from Thường tại to HQP, khắc left 0.3–0.46/buổi, Sức 54–56 — already about flat.
- RUNNING: 150-life "before" (game_base = branch before balance-2 game changes, fixed bot), Vừa, 8-year cap, /home/user/wt/b2out/before. Queue (dev/measure/b2queue.sh, log /home/user/wt/b2out/queue.log): after Vừa 150 (game_after = code @832c25d7) → Khó < 3 y before/after + hz 1.35 arm → bot-proof hint/rand × ctx old/new → §7 Sủng-curve arm.
- Tools: dev/measure/runbal2.sh (runner), inbal2.js (rank pressure, promotion-gate months, punish her/NPC), anbal2.py (--flow --pun --press --gate --orig), inevpick.js (hint/rand/same event pickers on the sens bot), riskscan.py.

## Measured so far (sens bot with the cost-sign fix; Vừa; 10-origin rotation; life capped at 8 y; HHSTOP)
| run | lives | Hoàng hậu | life ended before HH / cap | end < 3 y | avg max rank | Sủng m12/24/36 | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|
| before (game_base = branch before balance-2 game changes) | 152 | 14 (9 %) | 51 (34 %) | 24 (16 %) | 4.6 | 96/96/98 | 43/42/39 |
| after @832c25d7 (lễ nghĩa double charge fixed + dutyDanh) — PARTIAL | 61 | 3 (5 %) | 27 (44 %) | 13 (21 %) | 4.7 | 97/98/96 | 53/53/57 |
Before, promotion months blocked (share of months at that rank): promo gap 51–89 %, Danh 36–57 %, cấm túc 8–23 %; HQP → Hoàng hậu: gap 77 %, Danh 57 %, Thái hậu «phải hết lòng» (no son, BAL.hhThNoSon 80) 47 %, seat vacancy 3 %.
Her punishments / life (before): bị Hoàng hậu xử tội 5.1, xét tội theo chứng cứ 3.3, gặp riêng nam nhân 1.6 (Giả bệnh 0 once the bot reads costs).
Rank pressure (before, per buổi): bạc held 11–23, cards blocked by bạc 17 % (Đáp ứng) then 32–34 % flat Thường tại → HQP, khắc left 0.23–0.45, Sức 54–56 (72 at Đáp ứng) → high ranks are NOT slacker by the bot measure; no new costs added (owner law already holds; BAL.duty/banThuong/wage already scale).
Reading: the Danh fix lifts Danh (+10–18 at m12–36) but Hoàng hậu stays ~5–9 %: the HQP → HH gate (Thái hậu 80 without a son + Danh 78 + 11-month gap) is the wall, not Danh drains. Early death (life ended before HH/cap) 34–44 % = in the OD:L20 band (35–45 %); story-bot's "< 3 y 20 %" is a different metric (16–21 % here).

## HANDOVER (worker rolled over at context ≈ 40 %, coordinator Foreman D #9 asked; owner rule OD:L1217 + 16/11 08:22Z s14 — the COORDINATOR opens the successor)
Branch review/balance-2 @a2ce31a3 (pushed). Worktree /home/user/wt/bal2 is in THIS container only.
DONE (code): (1) inpage6 c.off; bot cost-sign fix; bot reads «kèm» risks + map robbery risk. (3) Giả bệnh BAL.tw.g.illCatch/illDanh/confM + fakeIllRisk/punishMonths, honest card (cấm túc N tháng: khả năng …); typed card chances → BAL.rk (12 keys) + H54.joy/sad/ask (riskscan.py --typed: 16 → 0); hidden-risk family: riskscan 6 hits all honest; map spot «bị giật y phục: khả năng …» (jty, kit map mmeta <em>; Fold 755 + iPad 1180 shots looked at: no overlap/overflow). (2) lễ nghĩa double charge fixed (econDoDuty pre); BAL.dutyDanh. (9) clamps (j35 Tâm cơ, jkc Danh, jrd_cn NPC Sủng); raised maid keeps BAL.danhG.srvRise .2 of her servant Danh.
Gates run: one-core-guard PASS (fails 0, inline 6616 < 6691). NOT yet run: quickcheck.sh, balance-core.js, old saves, coop-e2e.
BACKGROUND (this container, will die with it): /home/user/wt/b2out/queue.sh (= dev/measure/b2queue.sh) — after Vừa 152 (61 done at 09:45Z, ETA ~10:40Z) → Khó <3 y before/after + hz 1.35 arm (~11:30Z) → bot-proof hint/rand × ctx old/new (~12:30Z) → §7 Sủng arm (~13:15Z). If this container is gone, re-run dev/measure/b2queue.sh from a new worktree (copy dev/index.html of the base sha baff0824+main merge as dev/game_base.html — or build game_base from commit e94c8a61 — and of the branch as dev/game_after.html).
LEFT (exact next steps):
 a. HH 5–9 % vs target ~32 %: lever the HQP → HH gate via BAL only (two-way, NPCs same): BAL.hhThNoSon 80 → ~70 and/or RANKS HH Danh 78 → ~70 (j1 RANKS is the table; one core), measure 150 lives; keep promo gap (owner pace OD:L353). Also check seat: seat vacancy only 3 % of HQP months → vacancy is not the wall.
 b. Khó vs Vừa early: compare khoB/khoA vs Vừa < 3 y; if Khó ≈ Vừa, set DIFF.kho.bal.hz to the arm that gives Khó early ≈ Vừa + 10 pts (khoA13 = 1.35).
 c. bot-proof: compare bp_old_hint vs bp_old_rand vs bp_new_*: if hint − rand gap grows with ctxTaste 18 / ctxCap 30, ship it in jevb BAL (owner OD:L478); else report.
 d. §7 Sủng table for the owner (via main): Sủng m12/24/36 + rank + HH with BAL.grow.keys + "sung" (arm 'sung') vs after; write the VANPHONG table (no %, ladder words) — do NOT ship.
 e. Gates: quickcheck.sh, dev/test/balance-core.js, old saves, coop-e2e not worse; rebuild site (bash dev/site/build_site.sh) and commit; final report + "SẴN SÀNG KIỂM <sha>"; send_message Foreman D #9 session_01964izBsQba9xq3oCFovTBQ.

## WORKER #2 (session_01964izGWnkaGFspe7wY97fw, opus) — took over from #1 at a2ce31a3
START_CTX ≈ 4 % of the 1M window (estimate). Rollover at 29 %, ceiling 60 %.
- (17/11 ~09:50Z) MERGED live main 9391f9a into review/balance-2 → **5434696b** (pushed). 8 source conflicts, resolved keeping both sides: j2/j75 deck acts keep main's BAL.deck table but its odds use balance-core's art curve (deckOdds → artOE, her and NPCs alike); main's trait renames (netRx/netIs, Xảo quyệt, Ân cần|Khiêm nhường) applied onto balance-core's npcStudy, stealFit, tyEnemies; H54.sad + BAL.rk.vpTake kept; jbalcore.js kept in assemble.py; site rebuilt. Scan: no line added by balance-core/balance-2 still tests an old trait name. Smoke: 2 bot lives, 0 page errors. one-core-guard PASS (fails 0, inline 6588 < 6691).
- Main turned the NPC agent loop on (jagent, BAL.agent on:1) → pre-merge numbers (incl. #1's queue) are relative only; headline HH numbers are re-measured on the merged build.
- RUNNING (this container): merged build, Vừa, 8-y cap, 152 lives each: mB = merged branch as is; mH = HH-gate lever (BAL.hhThNoSon 80→70, hhThNoSonHieu 70→62, BAL.outQ 60→30, RANKS Hoàng hậu Danh 78→70). ETA ~15:00Z.
- (17/11 13:30Z) MERGED-build HH gate, Vừa, 8-y cap, sens bot (0 page errors):
| run | lives | Hoàng hậu | life ended before HH / cap | end < 3 y | avg max rank | Sủng m12/24/36 | Danh m12/24/36 |
|---|---|---|---|---|---|---|---|
| mB merged as is | 152 | 23 (15 %) | 57 (38 %) | 25 (16 %) | 5.0 | 99/99/98 | 57/58/68 |
| mH Th no-son 70 / hiếu 62, outQ 30, HH Danh 70 | 133 (time cap) | 35 (26 %) | 51 (38 %) | 25 (19 %) | 4.9 | 96/99/98 | 56/54/56 |
mH HQP → HH months blocked: promo gap 91 % (owner pace OD:L353, kept), seat not vacant 35 %, Thái hậu no son 24 %, seat contest 20 %; Danh no longer a wall. Early death unchanged (38 %, OD:L20 band). RUNNING mH2 (Th no-son 62 / hiếu 55, outQ 15, HH Danh 70), 152 lives, ETA ~16:30Z.

## FINAL (worker #2, 17/11 ~17:30Z) — coordinator Foreman D #10 (session_01964izDpDf5BCzpbaaQ1Sxq)
Branch review/balance-2 @de993ca846040a6666e201ce898d46da041338de = #1's work (a2ce31a3) + live main 9391f9a merged + the items below.
SHIPPED (all via BAL, same rule for NPCs):
- (2) HH gate: BAL.hhThNoSon 80→70, hhThNoSonHieu 70→62, outQ 60→30, RANKS Hoàng hậu Danh 78→70. Merged build, sens bot, Vừa, 8-y cap: **HH 15 % (152 lives) → 26 % (133)**; ended before HH/cap 38 % → 38 %; < 3 y 16 % → 19 %. A stronger arm (62/55/15, 152 lives) gave HH 26 % again with < 3 y 21 % → the gate saturates; the rest of the way to ~32 % is time at HQP (promo gap blocks ~90 % of HQP months = owner pace OD:L353, not touched). Text prints BAL (rules-one-source guard updated to read BAL instead of pinning the old 80).
- (4) bot-proof S3-126: BAL.ctxTaste 12→18, ctxCap 22→30 (jevb). #1's arms (40 lives each, pre-merge): old hint HH 5 % / < 3 y 30 % vs random 2 % / 15 % (skill did not pay); new hint 12 % / 15 %, Danh m36 89 vs random 5 % / 25 %, Danh m36 30. Under 150 lives per arm — a confirming run on the merged build is still owed.
- §7 Sủng curve: NOT shipped — owner chose option 1 (Sủng unchanged) at ~14:02Z (Foreman D #9).
OPEN (measured, not tuned — reported honestly):
- (6) Khó early: BAL.hz (her-side) is NOT the lever. Khó < 3 y: hz 1.1 base 12–17 %, 1.35 20 %, 1.6 18 % (34 lives), 2.0 15 % (33) vs Vừa 16–20 %. Vừa deaths < 3 y are mostly poison (13/25 in mB), plus childbirth, illness, Emperor dying (Thái phi / ni cô ends). A real Khó lever = world rules poisonX / birthAdd / illDie (hit NPCs too) and needs ≥ 4 h per 150-life arm; left for the next balance pass.
- Origin spread with the new gate (mH2): ch / nc 50 %, cn / td / tt 33 %, dtq 19 %, bd / muoi 13 %, **cnv 7 %, thd 7 %** (OD:L43 asks 20–40 %, cnv 20–25 %).
GATES (all on this sha or its build): one-core-guard PASS (fails 0, inline 6588 < 6691) · quickcheck.sh PASS ×2 (core gates PASS incl. rules-one-source, time-spill PASS, old save from live loads + plays a buổi, open 1.7 s, render 313/329 ms) · buổi in quickcheck 1338/1195 ms (+12 %) is popup count (fixed 40 ms sleep per popup); seeded check 9 games × 16 buổi: script time per step 195/188 ms (+3.7 %), total +2.9 % → within +5 % · balance-core.js 0 FAIL, 0 page errors · coop-e2e (live Worker) 62/62 (r2: 60/60) · shots.js Fold 755x1000 + iPad 1180x820: SHOTS OK, home + act tab looked at (no overlap, nothing cut) · bot lives on the merged build 0 page errors. No images committed.
SẴN SÀNG KIỂM de993ca846040a6666e201ce898d46da041338de

## ROUND 2 (worker opus, brief D11-balance-2-fix2; HANDOVER — C3 misses on deaths, next tuning round for a successor)
PRIORITY #1 CHECK ('balance-2|artO|BAL.art.odds|Múa trong yến tiệc|Danh wall'): OD 1 | ledger 0 | claims 8 (balance-2 rows, D) | main 15 | review/* 4 (review/balance-2, review/balance-2-r1, review/balance-core-r2*, review/mg-balance-2*)

START_CTX ≈ 4 %; rolled over at ≈ 34 % (Foreman D #11 03:04Z: hand over if C3 misses). WIP head **review/balance-2 @0cefa0f8d6717506eeac81429bd922b342a70261** = balance-core + balance-2 deltas (r1 371e3a22 + origin/main 99f3978d merged in af5b9bdd, site rebuilt 5d956715; dev/index.html in the tree is still the C2 build: rebuild before review).

### Changes on top of r1 (all BAL / two-way: her cards and the NPC's same act read the same keys)
- C1 9c5963b3: BAL.odb.j2.odO_3 30→42 (Múa trong yến tiệc), odO_7 30→40 (Làm thơ dâng lên), BAL.odb.j68f.odP_2 30→40 (Làm thơ vịnh mai), BAL.odb.j68e.odP_5 40→46; BAL.deck vu/cam/ky o[0] 40/40/45 → 48/48/53; j2 Múa failure danh -6 → -BAL.tw.g.vu[2] (=4, the same as an NPC dance).
- C2 d673c0b2: BAL.deck cam/ky/vu lv 3→2; jbalcore.js moves the ARTFX «mở …» line and ARTS.u "Bậc n" to BAL.deck[k].lv (checked in-page).
- C3 0cefa0f8: BAL.deck.vu.lv back to 3 (cam/ky stay at 2).
- Tools: dev/measure/inb2r2.js (card ledger + art path), artscan.py (family scan: 56 artO/artOE/artSide/virO/deckOdds reads with card, Danh win/loss, live term), anr2.py (arm table + per-origin).

### Measured (sens bot, Vừa, 8 y cap, seeds 1000+shard paired; ~26 lives/shard)
| arm | lives | HH | ended before HH/cap | ended < 3 y | Phi, month | Quý phi, month | HH month | Danh m12/24/36 | deaths /100 y (poison / birth / illness) | kids /y |
|---|---|---|---|---|---|---|---|---|---|---|
| live (origin/main) | 168 | 32 (19 %) | 31 % | 11 % | 89 %, m24 | 73 %, m39 | m63.5 | 74/83/90 | 3.27 (2.02 / 0.48 / 0.48) | 0.045 |
| C1 | 68 | 9 (13 %) | 29 % | 13 % | 85 %, m24 | 69 %, m45 | m67 | 83/74/75 | 2.38 | 0.102 |
| C2 | 156 | 31 (20 %) | 43 % | 22 % | 84 %, m27 | 69 %, m39 | m66 | 84/76/84.5 | 6.59 (2.54 / 2.20 / 1.16) | 0.101 |
| C3 | 156 | 35 (22 %) | 37 % | 16 % | 85 %, m24 | 70 %, m39 | m64 | 81.5/76/90 | 4.80 (2.01 / 1.23 / 0.89) | 0.089 |

Per-origin HH, C3 (live): tt 6/16 (1/16), dtq 5/16 (3/17), muoi 2/16 (1/16), cn 3/15 (4/16), nc 5/15 (4/17), bd 4/16 (1/17), td 2/15 (7/18), ch 4/15 (2/18), thd 3/16 (5/17), cnv 1/16 (4/16).

Danh wall fixed: Múa failure drain 265 → ~92 Danh/life (live 100); Danh m24 is 76 vs 36 at r1 (live 83). HH ≥ live from C3; Phi / Quý phi are at the same median month, with reach 3–4 points lower.

### Why it is not ready
Deaths are 4.8 vs 3.3 per 100 y. Poison is now equal to live; C2's poisoning excess came from NPC Kinh hồng vũ at bậc 2, where every NPC dance gives ghen +BAL.tw.g.vu[0] to all. What is left over:
- **Childbirth** (1.23 vs 0.48): kids per year are about 2× live **already at C1 / r1**, so this is carried balance-core, not this round's keys.
- **Illness** (0.89 vs 0.48).

Gates already run on C3: one-core-guard 0 fails (inline 3785 < 3843), text-rule PASS, balance-core 42/0, page errors 0. NOT yet run: quickcheck perf, coop-e2e, old save, Fold / iPad shots, residence-seats combined arm (/home/user/wt/b2res is C1-based and must be rebuilt).

### Next for the successor (BAL only, two-way)
1. Doubled conception (carried balance-core): diff j8 nightCh (artSide vu/y in place of arts.vu*2 / y*1.5), stealBase (BAL.steal.m: more stolen nights?), empnight artOE, and jcycle against origin/main. Count nights per year for live vs C3 (add it to inb2r2.js) and bring kids per year back near 0.045.
2. The y-art care family: careOdds (j13 artO(p,"y") in place of y*5), treatO "self" 30+artO, Uống thuốc phá thai od(odO_4+artO), gate.yCure 3. On the slow ladder these lower recovery and birth care. Re-base them in BAL (e.g. a care base) so the mid-life care odds match live.
3. Re-measure C3+fix (≥150 lives) against the same live dir (/home/user/wt/b2out/live is lost with this container; re-run live with seeds 1000+shard). Then run the gates, the residence arm, the shots, and § ROUND 2 final "SẴN SÀNG KIỂM <sha>".
