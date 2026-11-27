# ALLOT-PACE — allot-season made to fit pace-speed (worker for Foreman C ROOT 4, 27/11)
depth 1 · START_CTX ~4 % of 1M window

PRIORITY #1 CHECK: OD allot-season (sếp 06:36Z 27/11), PACE-SPEED-3 (sếp FINAL 26/11 ~23:24Z), makeup-set (OD 25/11 ~23:20Z «greyed, never hidden») | main 772bee4f: no allot-season | review/* review/allot-season-rv163g 72a6e1c8, review/pace-speed-rv163e d64f53cf, review/lc31-b3b 07f7cd16 (base; no land-chain-32.md yet) | claims none.
KIT CHECK: reuses existing parts only (kitRows month frame «ĐỒ PHÁT» row, blCard kitRows, mirror lxColRows greyed sets, log line); no new part, no new CSS. Visible change = words only.

## Branch
review/allot-pace @ 12a8cf67 (on review/lc31-b3b 07f7cd16)
- cce32a0e allot-season back: revert of lc31-3bx revert 623b1ed0 (= allot-season-rv163g 72a6e1c8 content). Conflicts: assemble.py (3b list + jseason.js after jeitem.js), jecon blCard (kept 3b: chanceW + stipRankTxt guard), jstip stipRankTxt (allot-season content, 3b comma joins of BIG #10 1c).
- 44f3b311 the fix (jallot alLight + monthly-allotment test).
- 3fcab9fa jseason month line: «; » between issued goods and the quy bạc / mốc clauses (was a «·» chain; BIG #10 1c family).
- 70feb63d build (index.html, sw.js).
- aeeff8d6 kit-std-scan harness fix (see below).
- 12a8cf67 role-parity-scan fix (3B-GREEN b, see below).

## Root cause of each monthly-allotment.js fail
Both fails are PRE-EXISTING on 3b 07f7cd16 WITHOUT allot-season (same 2 FAIL lines: run on a clean 3b build). Stacking allot-season did not cause them.
1. «evening» — test asserted the raw rise `S.tai >= t1 + 2 + light.add`. PACE-SPEED (sếp FINAL 26/11 ~23:24Z) sends every Tài rise through the one funnel spG: rise × max(.15, 1 − (tai/100)²) with fraction carry (BAL.stp.abs.tai). So the raw sum no longer holds at any real Tài. The candle itself worked (burned 1, added its paced rise). Game-side defect found on the way: the candle log printed the RAW «Tài +1 thêm» even when the paced rise was smaller/0 (text ≠ effect). Fix: alLight measures what truly rose (got) and the log prints that; under one point it says «<stat> thêm chút ít» (the fraction waits in the carry, never lost — law 3 kept: the candle always has a gain).
   Test (updated per PACE-SPEED ruling, not weakened): same evening card from a fixed Tài 40 and zero carry, WITHOUT then WITH a candle → candle burns exactly 1 and the rise is strictly larger (g0 2 → g1 3).
2. «presetsHidden» — test encoded the OLD rule (Kiểu cầu kỳ sets hidden without oil). Owner makeup-set ruling OD 25/11 ~23:20Z replaced it: sets needing an item she lacks stay visible GREYED with why / where to get it (jallot lxColRows wrapper already does that). Test now = presetsGreyed: every diem set item off + why «thiếu …».

## 12-month bot (dev/measure/allot-season-bot.js, never uses anything = worst pile-up), stock at year end
Ceilings BAL.stip.keep: vải 2 · trà 2 · yến 2 + sâm 2 (=4) · than 3 · son phấn 2 per part ×4 (=8) · dầu 1 · nến 3.
BEFORE = 3b 07f7cd16 (no allot-season):
| rank | who | vải | trà | yến, sâm | than | son phấn | dầu | nến | quy bạc |
|---|---|---|---|---|---|---|---|---|---|
| 0 | her | 12 | 12 | 0 | 3 | 24 | 12 | 36 | 0 |
| 0 | NPC | 1 | 1 | 0 | 2 | 6 | 2 | 6 | 0 |
| 3 | her | 12 | 12 | 0 | 3 | 24 | 12 | 36 | 0 |
| 3 | NPC | 1 | 1 | 0 | 2 | 5 | 2 | 6 | 0 |
| 7 | her | 24 | 24 | 24 | 9 | 24 | 12 | 36 | 0 |
| 7 | NPC | 1 | 2 | 2 | 3 | 6 | 1 | 3 | 0 |
AFTER = review/allot-pace:
| rank | who | vải | trà | yến, sâm | than | son phấn | dầu | nến | quy bạc (share of bổng) |
|---|---|---|---|---|---|---|---|---|---|
| 0 | her | 2 | 2 | 0 | 3 | 8 | 1 | 3 | 72 (.150) |
| 0 | NPC | 2 | 2 | 0 | 3 | 6 | 1 | 3 | 53 (.110) |
| 3 | her | 2 | 2 | 0 | 3 | 8 | 1 | 3 | 144 (.126) |
| 3 | NPC | 2 | 2 | 0 | 3 | 4 | 1 | 3 | 93 (.082) |
| 7 | her | 2 | 2 | 4 | 3 | 8 | 1 | 3 | 540 (.161) |
| 7 | NPC | 2 | 2 | 4 | 3 | 6 | 1 | 3 | 352 (.105) |
Every line ≤ ceiling; her and NPC same rule (law 1); excess paid as bạc (law 3/6c: nothing vanishes). Page errors none.

## Tests (AFTER, final build) — and BEFORE = clean 3b 07f7cd16
| test | allot-pace | 3b without change |
|---|---|---|
| monthly-allotment.js | ALL PASS | FAIL 2 (presetsHidden, evening) |
| allot-season.js | ALL PASS (Fold 755x1000 + iPad 1180x820) | n/a (file not on 3b) |
| pace-speed.js | PASS | PASS |
| reignend.js | PASS | PASS |
| balance-core.js | PASS | PASS |
| stipend.js | FAIL all 5 sizes: ev.shown false / opts 0 (skim event card not shown) | SAME fail, same fields (pre-existing) |
| monthly-ration.js | crash «Cannot read properties of undefined (reading 'run')» in page.evaluate | SAME crash (pre-existing, stale test) |
| quickcheck (vs live 772bee4f, --runs 3) | QUICKCHECK PASS (open 2027 ms, old save ok, perf new/live render 299/240 tab 431/436 buổi 1794/1347 tasks>200 27/22); CORE GATES: G4 94-q-softlock FAIL 4 in-gate, then standalone q-softlock PASS on allot-pace and FAIL 5 on clean 3b = flaky / pre-existing | |
| role-parity.test.js | FAIL 1 only (pre-existing LIVE gap list, per Foreman C do not chase); FAIL 2 promo now ok | FAIL 1 + FAIL 2 |
Test args: allot-season / monthly-allotment / bot take the worktree dir; pace-speed / reignend / balance-core take index.html path; stipend file://…/index.html; monthly-ration needs an http url.

## kit-std-scan (gate G4 / hook 96) — harness bug found and fixed
First quickcheck: CORE GATES FAIL G4 96-kit-std-scan = the scan CRASHED (no json), not a rule fail. Root cause: the scan's route answered EVERY http://ctm.test/** request (vendor/pixi js, json …) with the whole ~20 MB build html; once the build passes ~20.65 MB the browser drops the devtools pipe on the first tab click («Connection terminated while reading from pipe», no OOM, no page error). Proof: 3b + allot-season with jseason.js replaced by a 7.3 KB COMMENT crashes identically; jseason emptied → no crash. So ANY +7 KB on 3b would trip it (not an allot-season defect). Fix (aeeff8d6): serve the html only at /index.html, 404 elsewhere (those requests already failed as «Unexpected token '<'», which the scan ignores).
KIT CHECK result (REPORT_ONLY, Fold 755x1000 + iPad 1180x820): allot-pace FAIL 38 (X02 20 · X06 12 · X08 6) = 3b 07f7cd16 FAIL 38, same 3 rules, same lines (one X08 line names span.krv vs span.kone-t for the same truncated «Trong cung: Chương 1…» text). No new finding.

## Shots (looked at; kept outside git)
Fold 755x1000 + iPad 1180x820: month frame «Bổng lộc tháng tư» (ĐỒ PHÁT row with quy bạc clause), Bổng lộc rank panel (đầu mùa cloth line), mirror no-oil (Kiểu cầu kỳ sets greyed + red «Dầu chải tóc hết» row), mirror with oil. Produced by allot-season.js / monthly-allotment.js (outdir arg) — reviewer reruns to regenerate.

## Laws
1 two-way: ceiling + quy bạc + candle rule same for NPC (bot rows). 2 tiers: Nhẹ/Vừa/Nặng unchanged from allot-season. 3 gain-and-loss: candle always gains (paced, carry). 4 one core: no new number; BAL.stp.abs / BAL.allot.light / BAL.stip.keep. 6c: excess → bạc, stale tea → Trà mốc item, nothing vanishes. 7 wording: no %, new words «thêm chút ít», «; » joins. 9 kit: no new part.

## 3B-GREEN (b) role-parity FAIL 2 «promoted maid holds EXACTLY the act set of her born clone» {risen:[],born:["drop"]}
Owner: act-move-law3-r2 d8f4d213 made TW.drop.req need a real cold foe (twColdFoes: someone with oán > 0 toward both doer and target; law 3). That exposed TWO probe bugs in dev/tools/role-parity-scan.js (game rule itself is the same for both — law 1 holds):
1. the born clone's oán copy wrote t.oan[b.id] (t.oan is a NUMBER = oán toward the player; NPC→NPC oán lives in t.ro[id], j9 oan) → the clone stood in a different world; now copies t.ro + S.rl/S.ro.
2. a social act's target (jagent AGSOC) is ONE mindPickBy pick keyed on the doer id → drop showed for one id only. Drift-2 method (as E22e/E22g): every other person is asked as the pick in turn. No exempt.
Result on allot-pace build: promo NPC + player ok (risen [] / born []). FAIL 1 gap list, old scan vs new scan on the SAME build: IDENTICAL (25 = 25, new-only [], old-only []); old scan reproduces FAIL 2 {born:["drop"]}, new scan clears it. The new pass adds no gap.

## HANDOVER (worker roll, context ~29 %) — for the successor (opened by Foreman C)
DONE + pushed: (a) monthly-allotment green (evening + presetsGreyed) with allot-season back; (b) role-parity promo fix (probe). Branch review/allot-pace 12a8cf67 = 3b 07f7cd16 + allot-season + fixes, BUILT (index.html/sw.js committed at 70feb63d; rebuild after any merge).
TODO:
1. Re-merge on LIVE 8330e8b8 (Foreman C order). Tried: `git merge 8330e8b8` conflicts in assemble.py, j2 j24 j25 j27 j92 j95 jallot jbancung jecon jemoact jne jration jstip jts jtsb + index.html/sw.js — this is the whole 3b stack vs LIVE (land-chain scale). Best path: take LC32's restacked 3b (reports/land-chain-32.md) when it exists and cherry-pick my 6 commits (cce32a0e revert-of-revert, 44f3b311, 3fcab9fa, aeeff8d6, 12a8cf67; skip 70feb63d build) on it; then rebuild + rerun monthly-allotment / allot-season / pace-speed / reignend / balance-core / role-parity / kit-std-scan / quickcheck.
3. (c) RV-163L finding (MAIN 180 20:27Z, reports/rv-163l.md): NPC grouped/tiered harm choices appear 15/15 runs on LIVE but 7/15 on lc31-b3b 07f7cd16. Bisect act-move-law3-r2 d8f4d213 vs oan-pace-ghen fa35bacd (build each on LIVE, run RV-163L's probe 15×). If act-move-law3-r2 meant it (law 3 merge of same-result options) → record why + test; if it is a law-1 parity loss (NPC can do less to her than she to them) → fix. Answer here AND send_message RV-163L session_01Rc5AsL7cUEBT1XLPxhuwSm. NOT STARTED.
Notes: tests need http (python3 -m http.server) for monthly-ration / q-softlock; worktree-dir arg for allot-season / monthly-allotment / bot; role-parity test takes ~20–40 min; never run two Chromium suites at once (timeouts).
