# one-core-dup3 — ONE CORE leftovers wave (review/one-core-dup3)

PRIORITY #1 CHECK ('one-core-dup3'): OD 0 new (ONE CORE OD:L1267) | ledger 0 | claims: this job only (B, 17/11 09:29Z) | main 0 | review/* 0 for evA/adj96/rtCard k/srvMerit/tinLv.watch moves (stack review/one-core-dup2-r2 → arcs-r2v → roads-r1 merged as the base).
START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate) → rollover at ≈ 29 %, ceiling 60 %. Finished below the rollover line; no successor needed.

Branch **review/one-core-dup3 @ b9f8d5cf** (site rebuilt). Base: origin/main 9391f9a9 + review/one-core-dup2-r2 069188d7 (fd78888b) + review/one-core-arcs-r2v 6b2ab41b (8ee6d37f) + review/one-core-roads-r1 75bc9f05 (190bcf1e). main has not moved since (checked at push).

## 0. Merge notes (base)
- dup2-r2 × main: 12 code conflicts, all "main's trait refactor (nv() / BAL.net.k …) vs dup2's BAL cuts" → token-merged (main's reads + dup2's BAL.loy / wit / tinhLv / eff keys). dup2's dead-copy deletes kept (j10 sentPen / confessRisk / bribeServ — live copies in j29; j24 danger — live in j28). Generated files (index.html, sw.js, assets.json) main's, rebuilt at the end. assemble list = main's + jbaleff + jbalarc.
- arcs-r2v, roads-r1: generated files + baseline only (as the brief said).
- Post-merge guard found 4 new copies in **main's show-why code** (not from the stack): j8 nx + j75 rival night typed `[1,0,-1,-2]` (= BAL.night.mood) → read BAL.night.mood; jwhyn night words typed 6 / 3 → BAL.nightEnd.warm / normal, prep words 2 / 1 → new BAL.cut.nightPrep [1,2] (cfebbf41). Baseline 7475 → 4730 (= post-roads count).

## 1. Items
| # | item | result |
|---|---|---|
| 1 | road amt / e67heir after roads-r1 | recount: **0 left** (the 7 approved e67heir sites jend14 ×6 + jrd_thd ×1 read G[] / BAL.road.end.keHeir already; guard amt has no road entries) |
| 2 | guard kinds e67merit / e67srvUp / srvMerit | added to amt (+ amounts typed `.5`, NUMA); ONE `--update --allow-grow` 4730 → 4740 for exactly the newly seen sites (a05d5fc9): j42 srvMerit(.25)×3, (.5)×3, (1)×2, (3)×1, jrd_cnv e67merit(8)×1 — every one exists on origin/main (main counts 3/3/2/1, e67merit(8) 2 on main, one already moved by roads-r1). Then moved (91b16477): j42 → BAL.eff.j42.merit{Mis,Rec,Sweep,Tea,Nvp,Rite,Books} + srvErrandDone_2 / srvDoOrder_2, texts «công lao +0.25 …» print them (balSg); jrd_cnv lmmRk → BAL.road.cnvMaMerit. Baseline back to 4730 |
| 3a | evA / evStory evidence | guard amt sees evA / evStory: **161 typed sites / 49 modules**, all moved in the same commit (no grow): BAL.eff.<module>.ev<Site> (dev/measure/one-core-dup3-ev-move.js); the wipe −99 (7 sites) = ONE key **BAL.evWipe**. 89 texts print them («chứng cứ +1», «nắm 2 chứng cứ», «−1» kept as unicode minus) |
| 3b | j96 adj96 heat | 77 typed `adj96({h,t,sus,ev,rise,lt})` → **BAL.arc.h96**.<arc>.<beat>[option] / .E.<ending> / .month (jbalarc.js; dev/measure/one-core-dup3-h96-move.js); ternary amounts stay ternaries on [a,b]. New guard kind **h96** |
| 3c | maid / kid typed amounts (whole family) | person-stat writes `x.loyal / tin / tal / hp / fond / me ± N`: **125 sites / 40 modules** → BAL.eff.<module>.<stat><Site> (dev/measure/one-core-dup3-stat-move.js; the sign stays typed in the code, the stored amount is positive) + tsbLoyal(±N) ×3 + relDo(G,N) ×3 (guard amt sees tsbLoyal / relDo). ~110 texts print them |
| 3d | jroute rtCard khắc | 30 card costs (rtCard / step / mk) → **BAL.route.k.<card id>** (dev/measure/one-core-dup3-rtk-move.js). New guard kind **rtk** |
| 3e | jlost:242–243 LO.act texts | print `LO.act.duc` and **BAL.loyalCost** (lazy: get x / aoLz — jecon loads after jlost) |
| 3f | jkc «${maid} thiện cảm -5» | already prints −BAL.eff.jkc.mzL (dup2-r2); wording kept (VANPHONG L53). No other typed copy in jkc |
| 4 | one-core-bind LIMIT (same-option swap) | new SWAP pass: a text tied to a branch (AOUT pair element 0 win / 1 lose; option wt:[…] / lt:[…]) must print a key whose rule read sits on that branch (inside if(roll…) = win; its else / code after `if(roll){…return}` = lose; ok:()=> win, no / fail / bad:()=> lose; `!roll` swaps). Plant: AOUT.ally f_2↔f_3 → **CAUGHT** (both texts). Real one found: jtsb AOUT.batnat lose text printed tsbBulNpc_3 (the «làm nhục giữa đường» path) for the «kể khắp nơi» outcome → tsbBulNpc_4 (same value 12 today) |
| 5 | jroute 89/95 «Chủ tin 60+» | watcher (jtin, live) reads 60 twice → **BAL.tinLv.watch** 60; jroute ×2 prints it. Text and rule AGREED at 60 today. |

## 2. Text ↔ rule DISAGREEMENTS found (fixed: the text now prints what the rule applies)
1. **jlost «Sai cung nữ thân tín lấy đồ»** (laydol x + AOUT.laydol): text said «lòng -10», the rule (jlost loSteal self / jecon bribel) takes **BAL.loyalCost = 25** → now prints 25.
2. **j22 «Hẹn gặp riêng»** lock text said «lòng 60+» only, the live watcher (jtin) also needs Chủ tin 60 → now «(lòng 60+, Chủ tin 60+)» as jroute says (wording added — please check against VANPHONG).
3. jtsb AOUT.batnat printed the wrong site key (same value) — item 4.
4. j24 / jhouse / j10 servant «Thưởng / Phạt / Tha / Tra khảo / Che chở» rows typed lòng ±N for rules in j24 judgeServ / j10 servAct: now print those keys (values equal today).
Proof lists 1 and 2 as INTENDED (jlost ExpressionStatement + TryStatement, j22 talkOpts).

## 3. Guards / tools changed
- dev/test/one-core-guard.js: amt += e67merit, e67srvUp, srvMerit, evA, evStory, tsbLoyal, relDo; amounts typed `.5`; a `roll(N)` inside the call is an odds, not the amount (evA(v,t,roll(40)?…) — the old jkc kcAf(t,roll(50)…) entry was this false hit); new kinds h96, rtk; **every declared kind is frozen even at 0 sites** (before: a 0-site kind could be frozen later by a plain --update with whatever count appeared).
- dev/test/one-core-text.js: loads jbalarc.js (BAL.arc had no values: arc refs were never checked) and jecon's BAL tables; reads `x.p-BAL…` as a negative amount; a person-stat amount is not the number after another stat's word («Sức -15»); «nắm 2 chứng cứ» beside an ev amount counts.
- dev/test/one-core-bind.js: SWAP pass (item 4).
- dev/measure/one-core-dup2-same.js: NS + eff / road / arc / route / night / net / evWipe; values from every BAL file; printed texts compared as words; number tables / amount objects put back; **RX word-bounded** (BAL.loyalCost was read as BAL.loy + "alCost").
- New movers: dev/measure/one-core-dup3-{ev,stat,h96,rtk}-move.js.

## 4. Before / after
Frozen list (one-core-baseline.json): 7475 (roads-r1) → 4730 after the merge (same as the brief's post-roads count) → +10 (the one allowed grow, item 2) → **4718**. Moved sites are mostly kinds the guard did not count before (evA, adj96, stat writes, rtCard k), so they do not show in the total; per-file frozen-list changes: j83 58→57 · jkc 199→198 · jlost 41→39 · jpet 78→77 · jpoison 25→24 · jrcp 41→40 · jroute 2→0 · jtsb 99→96.
BAL refs put back by the proof, per module (vs 190bcf1e = base after the 3 merges, 66 modules, **436 refs**): j96 88 · jroute 36 · j8 27 · j42 23 · j70 18 · j72 17 · j10 14 · j24 13 · jkc 11 · jtsb 11 · j7 10 · j95 9 · j71 8 · j78 8 · jmen 8 · j2 6 · j22 6 · j68f 6 · jcmaid 6 · jface 6 · jpet 6 · j83 5 · j9 5 · jrcp 5 · j67 4 · j68h 4 · j92 4 · jcycle 4 · jecon 4 · jtin 4 · jwhy 4 · jwhyn 4 · j25 3 · j68g 3 · jaudit 3 · jlost 3 · jtruth 3 · j14 2 · j23 2 · j28 2 · j29 2 · j30 2 · j40 2 · jpoison 2 · jstip 2 · 1 each: j13 j21 j34 j53 j75 j85 j95b jact jagent jcoopworld jeitem jexam jhouse jmem jpromsv jrash jrd_cn jrd_cnv jreign jstaff jthaiy.

## 5. Gates @ b9f8d5cf (code = 180cd85c + site build)
| gate | result |
|---|---|
| one-core-guard | PASS, 0 fails, inline 4718 = baseline |
| one-core-text | PASS, 0 sites, 0 early reads |
| one-core-bind | PASS, 734 prints, 0 mismatches (incl. SWAP) |
| proof one-core-dup2-same 190bcf1e | **SAME**: 66 modules, 436 refs, only INTENDED differ (owner-ruled words from dup2 + §2 items 1–2) |
| proof negative checks | BAL.eff.j42.meritTea 0.25→0.3 → FAIL j42 srvCards · BAL.tinLv.watch 60→61 → FAIL jroute rtTtCards + jtin watcher · BAL.arc.h96.tm96a.a1[0].h 10→11 → FAIL j96 ARC67.tm96a |
| guard plants | old j96 → NEW h96 numbers · old jroute → 30 NEW rtk · bind: AOUT.ally f_2↔f_3 → SWAP ×2 |
| quickcheck | PASS 337 s: core gates PASS (guard + rules-one-source + kit-conform + coop-one-world hook), time-spill PASS, open 1371 ms 0 errors, OLD SAVE loads + plays a buổi, perf median new/live render 306/288 · tab 371/377 · buổi 1065/1022 ms |
| coop-e2e | 62/62 PASS (live Worker) |
| road-rare | ALL PASS, no page errors |
| road-end | 51/51 PASS |
| coop-one-world | PASS (seeds; old room + single player ok) |
KIT FIRST: no UI part touched (only numbers inside existing texts / kit rows). No rule value changed (proof); the only player-visible number change is §2.1 (jlost 10 → 25, the rule's value).

## 6. Open / for Foreman B
- Typed texts beside NON-moved numbers stay in the frozen list (e.g. «Lòng cung nữ +8» = apply({maid:8}) fx, j24 «Đức -3», «nàng nắm 2 chứng cứ» from caught()). Not this wave.
- SWAP pass only judges texts with a recognizable branch (AOUT pairs, wt / lt) and reads under a roll / ok / no; anything else is «no verdict» (listed as a limit, not silent PASS).
- §2.2 adds «Chủ tin 60+» to the j22 lock text — a wording change for the reviewer to accept or reject.
