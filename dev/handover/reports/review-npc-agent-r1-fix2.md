# npc-agent AG1 + AG1b — review r1-fix #2 (BIG tier, Foreman C reviewer)
PRIORITY #1 CHECK: OD L1386 (NPC-agent law), L1267 (ONE CORE), L852/L1473 (khắc spill) | main 4719d424: jgrey kitOff (KIT §84 greyed option), j76 can/whyTime | review/* review/npc-agent-r1 (target), earlier verdict npc-agent-ag1-r1.md | claims Foreman C AG1 worker chain
Reviewer session_011xDdVRyN4EWAMkVGeM4BB3. START_CTX ≈ 4 % (get_session reads 0; own estimate). Target review/npc-agent-r1 @ 55acd2d6 (SẴN SÀNG KIỂM d4796840).

## VERDICT: PASS review/npc-agent-r1-fix2 2756d2d2f69b8f0e6d3cfb45895ea1a8d8ba74d2
(ancestor = current origin/main 4719d424; fast-forward ready. Four small reviewer fixes inside, listed below; one of them repairs a LIVE main crash.)

## Merge onto main (two rounds: 7abaf07a, then 4719d424)
Conflicts: assemble.py = main's list + jmind (after jdis) + jagent (after jeitem); j20 = branch queenRewards (mindPickBy) + main blCard (BAL.wage);
j4 = branch accuser pick + main seatDown; j2 = branch BAL.deck cards + main ghenN() in the Kinh hồng vũ text; jbal2 / KIT_REQUESTS = both blocks;
j3 = main's line (KIT §84 greyed option); index.html / sw.js / assets.json rebuilt. Main's new jroad/jrd_* (player story roads) do not touch jagent.

## Reviewer fixes on review/npc-agent-r1-fix2 (commits 2464c799, 2d1dc8b9)
1. **KIT FIRST — one locked-option form.** Main now has the kit GREYED OPTION (jgrey `kitOff`, KIT §84: `c.off` → disabled + Cần ✗ chip).
   The branch's fault-2a lock used its own `c.lock/why` path in j3 (and a KIT_REQUEST). jagent agReact now calls `kitOff(opt, reason, "")` on
   Nghe lén / join when `can(BAL.ag.kh)` is false (j76 day-aware can, spill allowed → the reason is the game's own whyTime); agent_check reads
   `c.off`. Shot Fold 755x1000 + iPad 1180x820 (scratch): two greyed kit cards with "✗ hết khắc buổi này", two open rows, no overflow, 0 errors.
   The branch's KIT_REQUESTS "dialog option LOCKED state" entry is now covered by KIT §84 — kit keeper may close it.
2. **LIVE MAIN BUG (not this branch): the self card crashes.** main 7abaf07a and 4719d424 `showSelf()` → ReferenceError "WAGE is not defined"
   (one-core moved WAGE to BAL.wage; j15:90 still read WAGE). Fixed j15 → `BAL.wage`. Family scan (decls removed from main still referenced):
   only WAGE is real (J59HMIN = comment, the rest are locals). This reaches main with this fast-forward; until then the live self card is broken.
3. **ONE CORE:** one-core-guard FAILED on the merge: "NEW inline rule number: jagent.js [fx] sung:1" (agWhy typed `{sung:1}` for the deck act).
   Now the deed's real gain (npcEffortKind w = BAL.deck). Guard PASS; onecore-pick TOTAL 0.
4. **Test harness:** (a) two-way-acts (main's two-way guard) failed 23 checks on the branch (main 0): jagent mutes NPC twDo outside its tick
   (one path per deed; every other NPC caller is the old dice j8:396–405 / jtwoway:83 SOC map the loop owns — scope correct). The test checks
   the deeds' cost/odds, so it now runs with BAL.ag.on=0 → ALL PASS (its SOC.ally check flakes 1/5 on main and on the branch alike).
   (b) inpage6 bot picked greyed `c.off` options that chooseM refuses → endless loop: on CURRENT MAIN 28/31 bot lives TIMEOUT on
   "Sau vụ mưu hại". Bot now skips `c.off`. Every bot run on main since KIT §84 was invalid — Foreman B balance numbers should be rerun.

## r1 faults — verified at root
| fault | check | result |
|---|---|---|
| 1 perf | agent_probe 160 steps, Fold 755x1000, CPU×4, alone, 4 runs | slice p95 5.1 / 5.1 / 3.9 / 4.6 ms (budget 8), max 8.7–15.2 (single landings), 0 page / jagent errors; under the bot p95 median 1.1, max 4.5 |
| 2 khắc | agent_check (BAL.ag.kh in code + text; no-khắc greyed; two-way deed budget) | ok (form now KIT §84, fix 1) |
| 3 typed weights | onecore-pick.py; one-core-guard | TOTAL 0; guard PASS (after fix 3) |
| 4 likes one system | likes-family (all receivers), npcmind-check (main → branch) | one line, one number each; 36 people, ERRS [] |
| 5 kit pictures | agent_check kit row check | every reaction row has its kit picture |
| 6 servant witness | agent_check (forced cnv life) | ok, stable |
| 7 deck one table | code: j2 artActs + j75 npcEffortKind read BAL.deck + deckOdds/deckGain/deckLoss (mm() = Emperor mood, same for all) | ok |
| 8 bot regression | 40 + 40 lives, same seeds, sens + inag + intrace (table below) | early death / illness within noise (branch better) |

## Fault 8 fix vs the NPC-agent law (OD:L1386) and ONE CORE
- Spite need closed by the deed's own gain (BAL.tw.g spite points / BAL.ag.unit), memory v.ag.vent fading by BAL.ag.vent.fade: a preference
  (WHY she chooses), not an outcome bar, gate or roll; the deed itself still runs through twDo with the player's cost and odds. Old saves without
  v.ag.vent load (two-way-oldsave ok); coop-one-world PASS (host-only).
- Enmity as a certain loss: provoke's / humil's oán / ghen numbers are the BAL.tw.g numbers the player's risk line shows, weighed by
  BAL.ag.road[o].safe; provoke/humil have no odds roll, so "certain" is right. Note (main, not this branch): provoke's relAdd also adds hidden
  oán (BAL.relOan.hurt × 15 = 9) that neither the player's card nor the NPC's weighing shows.
- All numbers in BAL; no new bar / gate / roll.

## Bot (40 lives each, run_par sens, 2 pages, seed 1, inpage6 (c.off fix) + inag + intrace; main 7abaf07a vs branch merge 2464c799; 0 timeouts, 0 page errors)
| measure | main | branch |
|---|---|---|
| early death (an7, incl. age-outs) | 80 % | 68 % |
| illness / Tuổi xuân / childbirth / poisoned / Xuất cung | 14 / 7 / 5 / 1 / 1 | 6 / 8 / 5 / 2 / 3 |
| survived / old | 8 | 13 |
| years / life · births / life | 10.3 · 0.60 | 10.9 · 0.42 |
| her illness onsets / life · her Sức / Sủng mean | 9.3 · 85 / 77 | 8.8 · 86 / 77 |
| harm acts on her (runAct) / life · poison | 478 · 12.7 | 530 · 16.9 |
| NPC deeds ON her / life: provoke · humil · apol · gossip · visit | 19.9 · 9.4 · 3.2 · 11.6 · 3.7 | 129.9 · 9.1 · 81.8 · 44.0 · 16.6 |
| her nights / yr · NPC nights / yr · NPC births / yr | 4.11 · 20.2 · 1.29 | 4.52 · 20.3 · 1.44 |
| NPC Sủng / Thái hậu at end (median) | 38 / 27.5 | 41 / 6 |
| AG1b scenes / life · khắc spent | – | 54 · 18.6 |
Not blocking, for Foreman B / AG2 (behaviour, not a law breach): provoke on her ≈ 6.5× main's old dice (≈ 12 a year from all rivals) and
"Tạ lỗi" to her ≈ 25× (≈ 7.5 a year) — the provoke → her oán → their safety need → apologise churn the worker described; NPC Thái hậu regard
lower because the loop obeys the real Từ Ninh access rule. qdrop 10 over 40 lives (decisions dropped from the slice queue) — watch in AG2.

## Other tests (merge 2756d2d2 unless noted)
agent_check 16/16 · one-core-guard PASS · onecore-pick 0 · time-spill-guard PASS · two-way-acts ALL PASS (flake as main) · likes-family 0 FAIL ·
npcmind-check ERRS [] · two-way-oldsave (main 4719d424 save → branch, 30 weeks) ok, 0 errors · coop-one-world PASS · coop-e2e 62/62 (live Worker) ·
coop-night 105/105 · coop-twin ok · save-slots ALL OK · ghen-shown ALL OK · kit_dupes OK · kit-conform 101 / 3 MISSING (= main, same 3) ·
pcard-dislikes ALL PASS (main: 4 FAILS) · unmet-list-family / opt-render / schemewire / khac-day-run / night-day / lost-items / paid-tiers /
difficulty / an-tinh-diff / npcmind-probe: pass, 0 page errors · thaiy 48/49 (same fail on main) · webkit-syntax 3 parse hits (jlogsync / j95b, main's) ·
**QUICKCHECK PASS** (core gates PASS, old save ok, perf new/live render 206/189, tab 266/303, buổi 709/1141 ms) · tier.js = BIG.
Pre-existing on main, not this branch: Hoàng hậu / consort gift text vs real regard change differ (likes-family: HH text +15, rel +35).

Shots: scratch only (none in git, no CDN review folder used).
