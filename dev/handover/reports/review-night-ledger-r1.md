PRIORITY #1 CHECK ('night-ledger|10-night|ledger V3|stealPass'): OD 5 | ledger 0 | claims 8 | main 5 | review/* 1 (review/night-ledger = this job) → review only.
# REVIEW r1 — review/night-ledger @55141158 → review/night-ledger-r1 @37018e74

Reviewer: opus, session_01964izDmB732aEhch1p1ohV; coordinator Foreman D #9 session_01964izBsQba9xq3oCFovTBQ. Brief briefs/D9-night-ledger-r1.md.
START_CTX ≈ 5 % (own estimate); ended well under START + 25 %.
Read: START_CORE, START_WORKER, START_REVIEWER, topic time-calendar / people-life / wording / balance-economy (night parts); worker report night-ledger.md (all, §5);
brief D9-night-ledger.md; night-time.md V3-A/B/C; OD 16/11 18:10Z, 18:40Z, 19:00Z (L1396), 19:05Z (L1397), 22:45Z, 22:50Z, OD:L1386 verbatim.
Branch **review/night-ledger-r1** = 55141158 + merge of review/cycle-roll-r1 968e6209 (as ordered) + reviewer fixes. Commits: 89294b80 (merge), WIP, c2ee2eac, 37018e74.

## 1. Spec check of the worker build (independent)
| spec | result |
|---|---|
| played tối = her first day, else first NPC day, else custom (OD 18:40Z) | OK (ledger.js 3; code jledger ldRoll) |
| Empress custom days 1 / 15 by day, never on the tray (OD 19:00Z) | OK (ledger.js 1: 600 nights, 0 tray picks, 40/40 custom) |
| cycle by day (OD 19:00Z / 19:05Z) | ledger nights OK; **played scene was still blocked for the whole cycle tuần** → §5.1 fixed (§2 below) |
| extra nights: stealPass live:false, notice + extraFx + own conception roll | OK (ledger.js 4, night-multi 7) |
| conception float × concF (spec 7) | OK (ledger.js 5: 1 → 0.065, no rounding) |
| BAL.nt one core | worker OK; after the cycle-roll merge **two summon copies** (BAL.nt.summon vs main's AG2 BAL.ag.emp.summon) → fixed |
| VANPHONG (no %) in the notices | OK; one wording fault in the family fixed (§2 d) |

## 2. What I changed (branch review/night-ledger-r1)
a. **Merge review/cycle-roll-r1 968e6209** (brings main 05ebe3da = npc-agent AG1/AG2 + trait-pool). 7 source conflicts, resolved:
   assemble list = union (jmind/jagent/jagemp + jbalcore/jledger/jnf); j2 her Sủng deck cards = BAL.deck + deckOdds (AG1 r1-fix 7), and
   **deckOdds' art part = balance-core artOE** (one formula for her and NPCs; was artW2×8 = the pre-balance-core ladder); j13 treat = artO + mindPickBy;
   j8 flip = ldPin first, else AG2 empSummon/empPick, fallback roll(BAL.ag.emp.summon) (main's typed 65:90 gone); j75 custom = BAL.ag.emp.custom
   (FAIRN.custom moved there by AG2) with the ledger's by-day gate kept; jflip result chip = night-final "pending" + AG2 empWhyTxt; jbal2 / KIT_REQUESTS both kept.
b. **Ledger × Emperor agent (AG2, OD:L1386)**: each ledger night is HIS choice — empSummon() (90 / 65, busy = ill / Chăm chính / court crisis)
   then empPick(C) (nightCh × his memory, mindPick slip). BAL.nt.summon / summonBusy **removed** (ONE CORE: BAL.ag.emp.summon). His reason
   (empWhy) of the PLAYED day is kept for nightWhy (not the 10th day's). jagemp's own header already said "the ledger calls them once per night".
c. **§5.1 BLOCKING — played scene by day** (jcycle, follow-up the worker named): cyNow/cyLdDay. While the ledger runs: once the tuần is drawn,
   cyTray (scene, flip choice, steal, tray grey, nightCh 0) = "her cycle covers the PLAYED day"; while the ledger draws (window.__ldRoll)
   nobody is blocked for the whole tuần (each night excludes her own cycle days); before the draw the day's own acts (late visit's night
   option, ksp bath) keep the cycle-tuần lock (the played day is not known yet — see FOR MAIN 4). Without the ledger (co-op parked): unchanged.
   Shown with the per-month length: ledger.js **case 7** (12 months, lengths {5:4, 6:4, 7:4}; her nights never on cycle days; she plays her
   first non-cycle day of her cycle tuần 12/12; a played day forced inside her cycle is blocked 12/12; length = cyLen every month).
   Case 2 updated: a woman in her cycle tuần may now be played on a non-cycle day (never on a cycle day: pCyc 0).
d. Wording family (LUẬT SỬA CẢ NHÓM, VANPHONG): with the ledger the card is off only on cycle days, so "tuần này" became false in 4 texts:
   start notice → "Kỳ nguyệt sự đã đến (mồng 2–7): những đêm ấy Kính sự phòng tạm cất thẻ bài của ngươi."; cyrep pop-up hints / result
   "thẻ bài tạm cất những đêm ấy" (no ledger: "tuần này" as before). j75 monopoly "(n trong sáu đêm gần đây)" → "(n đêm trong sáu tuần gần đây)" (true at both paces).
e. **§5.2 + §5.3 — rules that count nights** (scan of every nightLog / nightsIn / .nights reader, 22 sites):
   | site | kind | action |
   |---|---|---|
   | j75 favNow (FAIRN.fav 4 in 6 tuần → độc sủng, admonition, ghen/oán, family gift) | RATE | ÷ pace |
   | j75 satN (FAIRN.sat weight ×, satO steal odds, nightWhy "muốn đổi người") | RATE | ÷ pace (float) |
   | j8 anMonth (Ân fades: recent nights in 3 tuần) | RATE | ÷ pace |
   | j8 fake-preg check, j22/jroute tryst pregMismatch, jtruth ksW, jcycle 240/247, jemo:168, j72 q72EmpNear, j8:402 block | "any night near" (true record) | kept |
   | j21, j78, j2/j10 Sổ thị tẩm, jcycle cyNights, jstaff, jst14, jdh "Trăng soi rèm ngọc", jemo emoSnap n, jroute:175 | shown counts / milestones (true) | kept (FOR MAIN 5: jdh milestone) |
   pace = jledger `ntPace()` = BAL.nt.days while the ledger runs, else 1 (one night a tuần stood for the tuần's 10 days, V3-B) — no new number;
   measured ratio nights/tuần ledger ÷ base = 6.75–7.11 ÷ 0.70 ≈ 9.6–10.2. j8 `ntP()` reads it. Ân per NOT-played night: BAL.nt.extraFx.**anP 25**
   (Ân +1 at 25 %, like sungP; analyst V3-C risk 2 named this knob).
f. j42 srvMoodEvent `tr==="Xảo quyệt"` (undefined after trait-pool; crashed coop-e2e's maid week) → `hasT(m,"Xảo quyệt")`, the same line as main.
g. Tests / tools: dev/test/ledger.js (case 7, AG2 summons in case 6, case 4 pins anP); dev/measure/ledger-bot.js (NT_OFF / PACE / ANP / AGOFF / EMPOFF; fairness columns).

## 3. Bot before / after (dev/measure/ledger-bot.js, 12 lives × 24 months, real day walk, her stats floored Sủng ≥ 25; same build; "base" = BAL.nt.on false = one night a tuần)
| per month (unless said) | base | ledger, no fix (≈ worker + merge) | pace fix, anP 100 | **final: pace fix, anP 25** |
|---|---|---|---|---|
| her nights | 0.21 | 2.65 | 2.70 | **2.55** |
| months with ≥ 1 night of hers | 20 % | 75 % | 74 % | **80 %** |
| NPC nights / consort | 0.18 | 2.11 | 2.12 | 2.12 |
| nights a tuần (all) | 0.70 | 7.11 | 6.75 | 6.88 |
| **tuần with a độc sủng (favNow)** | 0.2 % | **97 %** | 0 % | **0.2 %** |
| **mean satiety factor on the tray (FAIRN.sat)** | 0.99 | **0.63** | 1.00 | **1.00** |
| admonitions / year | 0 | 0 | 0 | 0 |
| **NPC mean Ân tình, month 12 / 24** | 1.8 / 1.6 | 11.8 / 17.4 | 8.3 / 9.9 | **2.7 / 3.5** |
| NPC mean Sủng, month 24 | 32.7 | 38.6 | 36.2 | 38.8 |
| her Ân tình, month 24 | 1.2 | 86 | 80 | 82 (FOR MAIN 1) |
| her conceptions | 0.007 | 0.015 | 0.024 | 0.019 |
| NPC conceptions / consort-year | 0.233 | 0.126 | 0.139 | 0.142 (FOR MAIN 2) |
| bot ms / month | 711 | 1226 | 1137 | 1195 |
Without the fix the fairness rules fire for the favourite almost every tuần (97 %) and every consort with nights is "satiated" (×0.63); with it both are back at the one-night-a-tuần rate. Raw: /home/user/wt/nlr1-scratch/*.json (scratch, not in git).

## 4. Gates (final 37018e74 unless said)
| gate | result |
|---|---|
| one-core-guard | **PASS** 0 fails (inline 6605 ≤ baseline 6691, 202 BAL keys) |
| quickcheck.sh --runs 7 (c2ee2eac; later commits = one j42 line) | **PASS** · old save ok · render 230/276, tab 385/336, **buổi 935/1067 ms** (≤ live +5 %) · core gates PASS |
| ledger.js | **ALL PASS 7/7**, 0 page errors (×3 runs) |
| night-final / night-multi / night-day / night-coop-park 6/6 / log-sync-night / flip-entry 755x1000@2 | all PASS |
| agemp_check (AG2) | ALL 20 PASS |
| cycle-roll.js | PASS (396 draws, 5/6/7 split .34/.32/.35) |
| night-steal-unit | 1 FAIL "Tham vọng tries more" = the random-trait flake the worker listed (base 2 FAIL) |
| preg-rate.js | FAIL "peak notice not logged" only = same as base |
| cycle.js | logic fails = exactly the 4 of night-ledger 55141158 (night-final end-of-tối flip; test not adapted) + "pop-up not shown" as base; in real play the pop-up DOES show at the commit (shots) → FOR MAIN 3 |
| coop-e2e (live Worker) | **62/62** (61/62 before fix f) |
| coop-night (live Worker) | **105/105** (run 2; run 1 101/105 — same flake class the worker saw) |
| shots LOOKED, Fold 755x1000@2 + iPad 1180x820@2 (scratch /home/user/wt/nlr1-shots, not uploaded) | cyrep pop-up with "những đêm ấy" fits the kit option card (Fold 3 lines, iPad 4); Sổ ghi: ledger line, contest line, new cycle notice; no overlap, nothing cut, 0 page errors. Option pictures blank in the shot = CDN load time, not this branch |

## 5. Worker §5 — decisions applied
1. §5.1 → built (2c). 2. §5.2 → built (2e). 3. §5.3 → built (2e, anP 25). 4. §5.4 per-NIGHT chance accepted, no change. 5/6 → FOR MAIN below.

## 6. FOR MAIN (report-only, not blocking)
1. Her Ân tình saturates (~80 at month 24 vs 1.2) because she now plays a tối about every 2.5 tuần (her first ledger day takes the scene, OD 18:40Z) and a played night gives Ân 2+q. NPC Ân held. Balance pass: her played-night Ân / gift bond BAL.gift.an.
2. NPC conceptions / consort-year in my runs 0.13–0.21 (ledger) vs 0.22–0.23 (base); worker's runs said 0.22 vs 0.24. Rare events, big noise (n ≈ 70 per run); re-measure BAL.nt.concF with the D57 bot (≥ 36 months) after landing.
3. dev/test/cycle.js was never adapted to the end-of-tối flip (night-final): 4 logic fails + "pop-up not shown" on base and here.
4. Day acts of her cycle tuần (late visit's "Thắp đèn hầu rượu", ksp "Tắm gội chờ giá") still lock for the whole tuần: the played day is drawn only at the end of tối. Owner question if wanted: draw the played day at the start of tối?
5. jdh "Trăng soi rèm ngọc" (count of nights) is reached ~10× sooner with the ledger.
6. Worker §5.5: j55's court-crisis skip is now folded into AG2 busy 65 % (merged); jemoact's no-flip still acts on the played tối only; the maid's-lie check runs on the played night only. §5.6 her-side conception knob by difficulty: not in scope.
7. AG2 empCustom (he may break the lệ) is OFF while the ledger runs: OD 19:00Z puts him at the Empress's palace on days 1 / 15 (custom by day, kept). Owner question only if the agent's choice should apply there too.
8. Main has moved past 05ebe3da (AG3 …); the coordinator's merge of this branch onto the latest main will meet j8 flip / j75 / jbal2 again.

Lands after balance-core + night-final-r2 + cycle-roll-r1 (cycle-roll-r1 is already merged into this branch).

PASS 37018e74db0240165ea841ae46bc588f74efa6e7
