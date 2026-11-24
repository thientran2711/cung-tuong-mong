# REVIEW BIG3 final-merge (Foreman D ROOT; reviewer-lander, brief briefs/D-big3-final-merge.md)
PRIORITY #1 CHECK ('final-merge kframe-heir typed-stat-bal hadoc-loop'): OD 0 | ledger 0 | claims this one only | main 0 (LIVE 4a8c627b holds none of the three) | review/* review/fix-kframe-heir-rv fcdf5b19, review/typed-stat-bal-rv a902ebe4, review/fix-hadoc-loop-rv 0273f818 (each reviewer-PASS on older LIVE; reused as is, gate scripts reused from each branch).
Rules read: START_CORE (18 laws) + START_WORKER + START_REVIEWER; the three earlier review briefs (gate lists used as written).
CHAIN (each a clean FF on the one before): LIVE 24883e24 → step 1 fffb7bfb → step 2 7aa2ca7f → step 3 d33d214b.
History: full gate run on LIVE 4a8c627b (step 1 36e1b5c4, step 2 66d0a214, step 3 00bd261c). Foreman D ROOT 02:37Z: LIVE moved → carried 14ba8768 down the chain (f55507d4 / 105ee7d3 / 27fc9d73: quickcheck ×3 PASS + hadoc probes PASS), then LIVE moved again → carried 24883e24 once at the end (fffb7bfb / 7aa2ca7f / d33d214b). Every LIVE merge: only index.html / sw.js (step 2 on 14ba8768 also assets.json) conflicted → took LIVE + rebuilt; jbal2 auto-merged with LIVE's mgp/mgpc/mgpb block (no shared key, one-core-guard PASS).
FINAL GATES on the 24883e24 chain: quickcheck PASS ×3 (step 1: open 1797 ms, render 262/249, tab 473/473, buổi 1624/1427 ms; step 2: 1856 ms, 230/266, 480/515, 1437/1257; step 3: 1882 ms, 225/255, 435/431, 1627/1356; old save ok, core gates PASS incl. one-core-guard + kit-conform + dialog-fixed, all three) · typed-stat-same 503 tables, 0 value diffs (only tsbB comment) · c6-cancel 0 · kframe-heir PROBE PASS · hadoc-loop ALL PASS · robot replay B loop false, 0 errors · poison-road 35/35 · econ-tamco-scan PASS.
NOTE: LIVE moved once more to 2a9125bf (kit-dhcapfit + map-label-overlap) after the final run; the only files both touch are index.html / sw.js (built) → landing needs a merge + rebuild only, no source overlap.

## Step 1 — review/fix-kframe-heir-rv
Merge LIVE 4a8c627b into fcdf5b19 → 36e1b5c4. Only index.html / sw.js conflicted → took LIVE + rebuilt (assemble + build_site). No source conflict.
| gate | result |
|---|---|
| kframe-heir.js | PROBE PASS, 0 page errors |
| j51-heir-danh.js | PROBE PASS |
| scan-heir-family | 30 sites, 0 without a co-op road |
| act-missing-scan | 55 acts × win/lose × 2 sides × 2 modes, 0 fail |
| scan-stat-clamp | 0 unclamped writes |
| one-core-guard / text / text-rule | PASS (inline 3559 ≤ 3592) |
| quickcheck | PASS · old save ok · open 1690 ms · perf new/live render 236/240, tab 435/452, buổi 1310/2580 ms · core gates PASS |
| coop-e2e | 141/141 PASS (on 4a8c627b merge) |
Laws touched: 1 (her + NPC mother lose the same BAL.kid.heirDanh), 3 (no cost when an act has no target), 4 (all from BAL), 11 (family scans 0) — unchanged from the earlier PASS, re-proved on LIVE.

REVIEW PASS — LAND READY review/fix-kframe-heir-rv fffb7bfb69e3824362d09c1857d2505315af4af7 (FF on LIVE 24883e24)

## Step 2 — review/typed-stat-bal-rv
Merge step-1 head 36e1b5c4 into a902ebe4 → 66d0a214. Real source conflicts (typed-stat moved numbers vs LIVE/kframe edits on the same lines), each settled in a few lines, every number = same value (law 4):
| file | typed-stat side | LIVE / kframe side | kept |
|---|---|---|---|
| j51 heirMonth line | Danh balSg(BAL.kid.heirDanh) | same text + comment | same text (comment kept) |
| j85 caught wrap | BAL.eff.j85.caughtDanh (−5) | LIVE added kitKnow «đã thấy rõ đức», typed −5 | LIVE kitKnow + BAL.eff.j85.caughtDanh (−5 = −5) |
| jkitpage demo event | BAL.kitpage.demo.gift.bac (20); old word «Năm ăn năm thua» | LIVE odds word «Tùy duyên»; typed 20 | «Tùy duyên» + BAL key (20 = 20) |
| jpet petBonus | BAL.rl.jpet.followN (1) | kframe statSet clamp + real-delta petBn | kframe clamp + followN (1 = 1) |
| jbal2 tail | GROUP A block (virB, artB, ducF, eff.j85/j23/j83 keys) | LIVE BAL.nr + BAL.j7c | both blocks; no shared key (one-core-guard: no key set twice) |
| gate | result |
|---|---|
| typed-stat-same vs LIVE 4a8c627b | 503 rule tables; 3 runs. Value diffs: none. Listed «rule diffs»: A.v85Month (known probe flake, run 1 new side / run 2 LIVE side… gone in run 3) and tsbB (j51 heir line: only the code comment differs, both print «Danh +10»; j51-heir-danh rides with kframe, not on LIVE yet). poisonedFish: as the earlier PASS. Text diffs: random dress names / teacher fee / the «mở …» double line (as earlier PASS) |
| one-core-guard / text (incl. typed-stat-text G1) / text-rule / bind | PASS |
| typed-stat-text | 0 typed (12 allowed, list unchanged from a902ebe4) |
| c6-cancel-scan | 0 cards |
| scan-stat-clamp / kframe-heir.js (after merge) | 0 / PROBE PASS |
| quickcheck | old save ok · open 2157 ms · perf new/live render 196/193, tab 366/469, buổi 1069/1232 ms · core gates: one FAIL G4 80-dialog-fixed «new-title plate sits ON the event picture» 1180x820 = the known flaky RED-ON-LIVE fault (kframe report); dialog-fixed.js re-run alone: branch 2× all pass, LIVE 4a8c627b all pass → flake, not this branch |
| coop-e2e | 141/141 PASS |
| shots (scratch only, not in git/CDN) Fold 755x1000 + iPad 1180x820 | (a) poisonedFish «Cá chết» (iPad; Fold: the harness's showModal parks the event in the pending bell, the card itself is the same kit dialog): «Thay hết nước, đồ ăn · TỐN Bạc −5 · ĐƯỢC dưỡng sức», odds words, no %; (b) Tài nghệ › Tứ đức (virB keys) both devices; (c) kit sample event «Hoàng hậu triệu kiến» both devices: «Tùy duyên», «Bạc −20» from BAL. No {n:…} token leak, no undefined/NaN, no horizontal overflow, 0 page errors. |
Laws: 3 (poisonedFish c Bạc / w Sức from BAL.eff.j68f.fishSwap*), 4 (same values), 7 (LIVE odds word kept), 11 (scans 0).

REVIEW PASS — LAND READY review/typed-stat-bal-rv 7aa2ca7f39d357e9f308b4ab2191138b978a44e0 (FF on fffb7bfb)

## Step 3 — review/fix-hadoc-loop-rv
Merge step-2 head into 0273f818 (first 66d0a214 → 00bd261c; final 7aa2ca7f → d33d214b). Only index.html / sw.js conflicted → rebuilt. On top of step 2 it adds only j70 (j70Wants) + jtamco (doAct defers to j70Wants) + hadoc-loop.js + robot-save-replay.js.
| gate | result |
|---|---|
| hadoc-loop.js | ALL PASS |
| robot replay save B (seed 1086252990 loop save, handover robot/saves/save-B-hadoc-loop.json) | Bày mưu 1, road card 1, 2 taps, 2 khắc spent, loop false, 0 errors (repro gone) |
| poison-road | 35/35 PASS |
| econ-tamco.test / econ-tamco-scan | PASS / PASS (11 her + 11 npc road schemes) |
| one-core-guard / text / bind / text-rule | PASS |
| quickcheck | PASS on 27fc9d73 and on d33d214b (see FINAL GATES) |
| night-softlock.js (LIVE's new test, on 27fc9d73) | PASS 8, 0 page errors |
Laws: 1 (NPC road choice inside the act, untouched; econ-tamco npc PASS), 3 (khắc spent once per act), 11 (act interceptors, earlier review).

REVIEW PASS — LAND READY review/fix-hadoc-loop-rv d33d214b0f3135ec00336204028a2301558ce82c (FF on 7aa2ca7f)

## Pre-existing on LIVE (not blocking)
- G4 80-dialog-fixed «new-title plate sits ON the event picture» 1180x820: hit once (step 2 on 4a8c627b), dialog-fixed.js re-run alone all pass on branch ×2 and LIVE 4a8c627b → known flaky RED-ON-LIVE (kframe report); all later quickchecks PASS incl. G4.
- typed-stat-same A.v85Month: probe flake (empty side alternates new / LIVE; j85 v85Month returns early when the seeded character is dead); gone in later runs.
- pets-fix.js:88, night-steal-oldsave stale, schemewire crash, coop-e2e night-1 flake: not hit by any gate in this run (coop-e2e 141/141 ×2); earlier reviews confirmed them on LIVE; not re-run here.
- Shot harness note: on Fold the poisonedFish event is parked by showModal into the pending bell within the same tick (Q 1→0), so its card was shot on iPad only; same kit dialog.

Shots: /home/user/wt/big3-shots (scratch, deleted after verdict). No CDN review folder used.
