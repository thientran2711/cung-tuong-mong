# review-one-core-dup3-r1 — VERDICT: FAIL (2 items, one family)

PRIORITY #1 CHECK ('one-core-dup3 review'): OD 0 new (ONE CORE OD:L1267 read verbatim in START_CORE) | ledger 0 | claims B one-core-dup3 r1 = this session | main 7e264081 (moved since 9391f9a9: npc-agent-ag3-r1) | review/* review/one-core-dup3 b9f8d5cf (+ dup2-r2 069188d7, arcs-r2v 6b2ab41b, roads-r1 75bc9f05).
START_CTX ≈ 5 % of 1M (estimate) → rollover ≈ 30 %, ceiling 60 %. Finished below it; no handover needed.

Reviewed: review/one-core-dup3 @ b9f8d5cf. Reviewer branch: **review/one-core-dup3-r1 @ 607887ae** = b9f8d5cf + merge of latest origin/main 7e264081 (successor worker: start from this sha).

## 1. The merge — PASS
- Replayed 9391f9a9 × 069188d7 myself (merge-base 05ebe3da): 11 code conflicts (j10 j22 j24 j42 j43 j9 j92 jkc jtin jts jveil) + assemble.py + generated files. Token-level 3-way merge of each file vs fd78888b: **9 files identical to fd78888b**; j10 / j24 differ only by the dropped dead copies (j10 sentPen / confessRisk / bribeServ, j24 danger). Dead: one concatenated script (assemble.py), the live copies j28 danger / j29 sentPen, confessRisk, bribeServ load later and win; they carry main's nv() / BAL.net.k refactor. j10 bestSent kept with main's BAL.net.k.spySharp.
- Non-conflicted files: `git diff <auto-merge tree> fd78888b` touches only the conflicted files → nothing lost from either side. 8ee6d37f and 190bcf1e: same check, only generated files + baseline differ.
- assemble list b9f8d5cf = main 9391f9a9 + jbaleff + jbalarc (diffed).
- Main moved → merged 7e264081 (607887ae): one j42 conflict, token-merged clean (main's BAL.ag.maid tea / jealousy reads + stack's BAL.eff.j42 evSrvTalk / meritRec); assemble = main's (+ jagmaid) + jbaleff + jbalarc; main's hunks in jbal2 j3 j75 j8 jagemp jst14 carried byte-identical; jagmaid.js, agmaid_check.js, KIT_REQUESTS identical to main. Baseline 4718 → 4716 (main removed 2 j42 tin:-1). Site rebuilt.
- Proof one-core-dup2-same 190bcf1e 7e264081 @ 607887ae: **SAME, 69 modules, 436 refs**, only jagmaid "new file" (main's file) and the 2 INTENDED (j22 talkOpts, jlost). Negative checks (mine): evWipe −99→−98 + jbaleff loyalServAct 12→13 → FAIL j10 servAct, j8 judge, j95 j95accuse (as they should). (The tool cannot run vs 9391f9a9 directly: crashes on the new jagmaid file; main's side is proven by the merge checks above.)
- Load: Fold 755x1000 + iPad 1180x820: 0 page errors, no h-overflow, BAL.eff / arc.h96 / evWipe / tinLv.watch present, AOUT.laydol renders «lòng -25».

## 2. Leftovers — PASS except the text family in §FAIL
- Allow-grow a05d5fc9 (+10) = exactly j42 srvMerit(.25)×3 (.5)×3 (1)×2 (3)×1 + jrd_cnv e67merit(8)×1; main 9391f9a9 has 3/3/2/1 and e67merit(8)×2 (one moved by roads-r1). Every other commit 190bcf1e..b9f8d5cf: 0 grows.
- Spot checks: no typed evA/evStory amount left (only j40 evA(v,u,0), a 0 mark); BAL.evWipe one key, 14 reads; j96 0 typed adj96, 83 h96 reads; jroute 30 BAL.route.k reads, 0 typed costs; tinLv.watch 60 read by jtin watcher ×2 + j22 + jroute ×2; srvMerit / cnvMaMerit moved.
- Person-stat / merit / khắc / h96 typed-text scan near moved reads: clean (j42 apply({tin}), j7 kidHurt(k,25), j72 apply({tai:3}) are fx / non-moved kinds, frozen).

## 3. Wording — accepted
- jlost «lòng -10» → prints BAL.loyalCost: correct. Main's rule was `BAL.loyalCost||10` and jecon (loaded before any act runs) sets 25, so players lost 25 while told 10. Lazy getter / aoLz fine (0 load errors).
- j22 «(lòng 60+, Chủ tin 60+)»: allowed — «Chủ tin» is a VANPHONG L83 word; it is the same wording jroute already shows on main; watcher needs both (staff and maid branch). Plain text in the existing option lock line, no UI part.
- jtsb batnat: correct — the «kể khắp nơi» path reads tsbBulNpc_4 + evTsbBulNpc_2.

## 4. bind SWAP — PASS
Plant j17 ally aoLz f_2↔f_3 → CAUGHT ×2 (SWAP win/lose); restored → 737 prints, 0 mismatches.

## 5. Gates @ 607887ae
quickcheck PASS 337 s (core gates, time-spill, open 0 errors, old save loads + plays a buổi, perf new/live 307/328 · 362/489 · 1216/1083) · one-core-guard PASS 4716 · one-core-text PASS (but see FAIL 2) · one-core-bind PASS 737/0 · coop-e2e 62/62 · coop-one-world PASS (old room + single player) · road-rare ALL PASS · road-end 51/51. Late-life old save solo/co-op not run separately (re-run on the fix).

## FAIL
1. **ONE CORE text family — evidence counts still typed.** Item 3a moved every evA / evStory amount into BAL (incl. caught(): `evA(t,a,BAL.eff.j8.evCaught)`, moved in ae998827), but player texts still type the count. Report §6 says «nàng nắm 2 chứng cứ from caught()» is beside a NON-moved number — wrong, it is moved. Verified copies (value equal today): j22:25 «nắm 1 chứng cứ» (evGo) · j17:70 rumor lose «nàng nắm 1 chứng cứ» (j8 evF) · j17:66/72/75 + jlost:242/243 «nắm 2 chứng cứ» (evCaught; jlost lines were rewritten in this wave) · jtsb:125 «chứng cứ +1», :139 «trả lại 1 chứng cứ», :147 «dùng 1 chứng cứ» (evGo/_2/_3) · jpet:184 · j70:256 «nắm thêm 1» (evNewPlot70) · jthaiy:166 · jtruth:117 «tốn: 1» · j92:348 · j78:113–115. Whole list to classify (76 lines with a typed «N chứng cứ» / «chứng cứ ±N», thresholds «cần N» excluded): jsgame 247 · j42 268 · jecon 159 · jtsb 57,78,125,139,146 · j8 97,175,475 · jpoison 70,85,86 · j17 66,70,72,75 · j78 113,114,115,127,189 · jlost 175,176,177,186,242,243 · jcoopworld 801 · jtruth 117 · jgift 28 · j55 73 · j70 256 · jksize 171 · j4 24,60,65,120 · jgrey 37 · jcycle 13,14,46 · jhouse 38,49 · j15 65 · j2 148 · jopic 212 · j92 348,353 · jthaiy 166 · jaudit 35,87,89,90 · jdress 60 · j25 11 · jwhy 51,68,74 · j29 47 · j79 720,721,1010 · j83 175,225,226,227,239,245 · j21 17 · j22 25 · jpet 28,184,212 · j63 253 (line numbers @ 607887ae). Each: print the key the rule reads (balAb / balSg), or list it as not-a-copy with the reason (comment, threshold, a rule that still types it).
2. **Gate gap:** one-core-text reports 0 sites while the above exist. Extend it so a typed evidence count beside / tied to an ev amount is caught (same line, AOUT pair or x/go of one option, result text of the act, caught() wording); plant j22:25 «nắm 1 chứng cứ» must be CAUGHT; one-core-bind then checks the new prints. Re-run proof SAME (only words → keys) + gates.

Everything else (merge, leftovers 1–5, wording, SWAP) PASS; the fix is text-only + the gate.
Shots: scratch only (/home/user/wt/r-dup3-shots, deleted with the verdict), none in git.
