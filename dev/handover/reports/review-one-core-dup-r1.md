# review-one-core-dup-r1 — independent opus reviewer (BIG tier), session_01N1tNP6WJifjTnmrtNwmBm4, coordinator Foreman B ROOT

PRIORITY #1 CHECK ('one-core|duplicate-rule|BAL.eff|BAL.odds|ageBand'): OD 6 | ledger 0 | claims 8 | main 15 | review/* one-core, one-core-land(-r1) (gate live), one-core-dup (this) | claims B one-core-dup session_01N1tNP65Hp1rVzsB41r5fFh
START_CTX ≈ 5 % of window. Reviewed review/one-core-dup @ 648461b5; work branch review/one-core-dup-r1 @ 3d43d535 (= 648461b5 + merge origin/main 6c4f21c3 + reviewer fixes, site rebuilt).

## VERDICT: FAIL (one item: check 3 — player texts still type the moved amounts). Everything else PASS.

## 1. No rule value changed — PASS
- one-core-dup-same (run myself on the 16d4925f tree vs 4719d424): 4399 live top-level functions before / 4399 after / 4399 byte-identical, 0 differ. The game is ONE concatenated script (assemble.py → one <script>), so a top-level `function X` is hoisted and only the LAST declaration ever runs: the 28 deleted copies were dead. 
- 12 dead fallbacks: every key is set at load (jbal / jbal2 Object.assign coopEmpY+srvBar+srvCd / jrest restLat* / jecon selfMinus 8 + loyalCost 25 / jlux ctFit+ctPlainK / jaudit thieuLe / jbal hint*), all before any runtime call; no code reassigns BAL. The 3 disagreeing typed copies (12 vs 8, 10 vs 25, 5-long srvBar) never ran.
- one-core-eff-same (076aa4ed tree vs 16d4925f): 42 modules, 326 refs, AST identical, 0 fails. Independent spot-check of 24 random BAL.eff refs vs the old line text (jkc fail_3 −5, j72 q72Npc [6,−4], j95 j95silent 15 / j95caught 25, jtsb go_13 −3, jkc fail_17 −8, jpoison pgGive −6, jreign rgMine_2 −8, j28 run_7 [3,−6], jwhy f −8, j55 tdImpeach_3 −5 / tdSoMonth_4 −2 / tdImpeach −6, jtwoway run_2 −2, j28 run_2/3/6 5/4/10, j8 f_6 −20, j24 go_3 12, jthaiy npcMonth 8, jlost loHolderMove 3, jkc o_19 3 / fail_8 −10, j9 run_12 −5): 24/24 equal.
- Load order: an AST scan finds no load-time (outside a function) read of BAL.eff / BAL.odds / BAL.ageBand before its module (only jsgame SG_LO/SG_HI, loaded after jbal). KIT_ODDS (j79) is read by word() only at run time.
- Odds ladder: word / kitOddsLv / sgLv / SG_LO=[5,31,46,56,66,81,91] / SG_HI=[30,45,55,65,80,90,95] same words at the same cuts as live (31/46/56/66/81/91, lo 5, hi 95); NaN/null → step 0 as before. Age bands band4 / kcBand / pidBand same cuts 26/36/51, null kept.
- Seeded bot run (bot-same.js, origin/main vs r1): INCONCLUSIVE — the harness is not deterministic on today's main (A vs A and B vs B also differ: turn 1/rank 2 vs turn 2/rank 0), so it cannot judge this branch; the AST/function proofs above are the stronger evidence. Page errors 0 on both.

## 2. Guard — PASS (one known limit)
- one-core-guard 0 fails; baseline only shrinks (frozen 11965 at 16d4925f with new kinds → 11646 at 648461b5 → 11645 at r1); no --allow-grow in any commit; per-module per-kind growth vs origin/main: 0. coregates G1 live-kinds compare OK.
- Planted in scratch copies of dev/build: second `function band4` in jkc → FAIL "defined at the top level of j35.js + jkc.js"; `const MYCUT=[31,46,56,66,81,91]` → FAIL "typed table … copy of the one in BAL (jbal.js)"; a new relAdd(x,"a",7) + a 91/81 ternary → FAIL amt + ladder. SHADOW_OK = fillStaff only (plus an env OC_SHADOW_OK that no gate sets).
- Known limit (not blocking): the typed-table detector needs ≥4 numbers, so a typed copy of a 3-long table (BAL.ageBand [26,36,51]) is NOT caught. Lowering to 3 gives 39 false hits ([1,2,3], [0,1,2] …), so left as is; the ternary-ladder kind does catch the usual `a>=51?…` form.

## 3. Texts print the constant — FAIL
71 player-visible texts still TYPE an amount that now lives in BAL.eff (the rule reads BAL.eff, the words beside it do not: change the BAL value and the text lies = the OD:L1267 example "50 vs 55"). Per module: j55 14 · jkc 13 · j9 8 · j72 7 · jtsb 7 · j24 4 · j70 4 · jlost 4 · j2 2 · j71 2 · jpoison 2 · j25 1 · j68e 1 · j8 1 · jaudit 1 · jts 1. Examples:
- j9.js:60 `affAdd(v,S,BAL.eff.j9.run)` beside "Nàng quý ngươi -2."
- jkc.js:217 `BAL.eff.jkc.go_4` (8) beside `${mom.t} với ngươi +8`; jkc.js:244 go_9 (−15) beside "tổ mẫu với ngươi -15"
- jlost.js:216/219/221 loUI* beside "Thân -4." / "Thân +4." / "Thân +6"
- jtsb.js:231–234 go_8/10/12/13 beside "thiện cảm +20 / -5 / +5 / -3"
Full list (module:line key=value), produced by a scan of every BAL.eff ref whose ±|value| appears in a Vietnamese string within 260 chars on the same line:
    j2.js:142 j2.go=9
    j2.js:145 j2.go_2=-15
    j24.js:19 j24.go=20
    j24.js:20 j24.go_3=12
    j24.js:22 j24.go_5=-10
    j24.js:23 j24.go_7=5
    j25.js:84 j25.go=10
    j55.js:68 j55.tdProbe=-8
    j55.js:68 j55.tdProbe_2=8
    j55.js:74 j55.tdLeak_2=25
    j55.js:82 j55.top=2
    j55.js:83 j55.top_2=3
    j55.js:87 j55.top_3=6
    j55.js:88 j55.top_4=-8
    j55.js:89 j55.top_5=-6
    j55.js:91 j55.top_6=8
    j55.js:92 j55.top_7=-10
    j55.js:123 j55.tdSoMonth_4=-2
    j55.js:136 j55.tdImpeach_3=-5
    j55.js:163 j55.go=-3
    j55.js:163 j55.fail=-3
    j68e.js:100 j68e.ok=-5
    j70.js:229 j70.no=5
    j70.js:236 j70.ok=12
    j70.js:340 j70.ordMonth70=6
    j70.js:431 j70.ok_3=-3
    j71.js:124 j71.go_4=-3
    j71.js:186 j71.ok=-2
    j72.js:366 j72.fn_2=-8
    j72.js:366 j72.fn_3=5
    j72.js:366 j72.fn_4=4
    j72.js:393 j72.fn_5=-4
    j72.js:457 j72.fn_6=5
    j72.js:477 j72.fn_7=4
    j72.js:507 j72.fn_10=-12
    j8.js:384 j8.maidMonthP=-10
    j9.js:52 j9.run=-2
    j9.js:55 j9.run_5=-3
    j9.js:57 j9.run_7=-2
    j9.js:58 j9.run_8=-15
    j9.js:59 j9.run_9=-8
    j9.js:59 j9.run_10=2
    j9.js:60 j9.run_11=10
    j9.js:60 j9.run_12=-5
    jaudit.js:25 jaudit.run=-3
    jkc.js:211 jkc.go=4
    jkc.js:212 jkc.go_2=5
    jkc.js:213 jkc.go_3=4
    jkc.js:217 jkc.go_4=8
    jkc.js:218 jkc.go_5=6
    jkc.js:228 jkc.go_7=6
    jkc.js:242 jkc.go_8=10
    jkc.js:244 jkc.go_9=-15
    jkc.js:246 jkc.go_10=-10
    jkc.js:248 jkc.go_12=-15
    jkc.js:252 jkc.go_13=8
    jkc.js:253 jkc.go_14=6
    jkc.js:261 jkc.go_15=6
    jlost.js:216 jlost.loUI=-4
    jlost.js:219 jlost.loUI_2=4
    jlost.js:221 jlost.loUI_3=6
    jlost.js:221 jlost.loUI_4=-6
    jpoison.js:82 jpoison.found=-15
    jpoison.js:88 jpoison.go_2=-4
    jts.js:198 jts.go=3
    jtsb.js:140 jtsb.go=10
    jtsb.js:168 jtsb.go_4=8
    jtsb.js:169 jtsb.go_6=8
    jtsb.js:231 jtsb.go_8=20
    jtsb.js:232 jtsb.go_10=-5
    jtsb.js:233 jtsb.go_12=5
    jtsb.js:234 jtsb.go_13=-3FIX (worker): print the constant in each text (one signed-number formatter, VANPHONG; keep the same words), then rerun the scan above → 0, plus one-core-eff-same (extend it to allow the text change) and the gates below.

## 4. Tests on r1 3d43d535 — PASS
quickcheck PASS (build own, CORE GATES PASS: one-core-guard · rules-one-source · kit-conform · coop-one-world hook; time-spill PASS; open 1294 ms 0 errors; OLD SAVE from live loads and plays a buổi; perf new/live render 223/220, tab 281/290, buổi 820/778). coop-e2e 60/60 (live Worker; fold/ipad/solo no page errors). Both players read the same BAL (one script, BAL is not synced or rebuilt per seat).

## 5. Merge — PASS
Merged origin/main 6c4f21c3 into r1: only generated files conflicted (assets.json, index.html, sw.js → rebuilt). Guard on the merged tree: 0 fails, nothing new from main.

## Reviewer fixes on r1 (LUẬT SỬA CẢ NHÓM, same concepts the worker missed; values identical, checked over −50…150 / 0…120 and NaN/null)
- j28 ageBandOf (young/mid/old) typed 26/36 → reads BAL.ageBand.
- j13 LADW (typed copy of KIT_ODDS words) deleted; ladI → oddsLv(cl(round(o),BAL.odds.lo,BAL.odds.hi)).
- j19 oddsChip word→step map typed → KIT_ODDS.indexOf (+ "Chắc chắn" 7 kept).
- (not touched: j8 nx() night-score words — a different scale, not the odds cuts.)

Next: worker fixes item 3 on top of review/one-core-dup-r1 3d43d535 (it already holds the main merge + fixes); then re-review.
