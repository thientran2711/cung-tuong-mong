# ALLOT-PACE — allot-season made to fit pace-speed (worker for Foreman C ROOT 4, 27/11)

## ★ r3 gates — ALLOT-PACE-3 (session_01PEhRbuUnuv3S5Duzh9rAtx, depth 5, START_CTX ~4 %) 28/11 ~10:20Z
PRIORITY #1 CHECK: Foreman C BASE CHANGE 08:23Z/08:30Z (3b 2849705d FAILED G1 law 4 → base review/lc34-3b-r2-rv184 2d9f07c7 on LIVE a96564ad; 1a6a1aed/b3bc99f3/f857c7f3 VOID) | main LIVE a96564ad at order time (aecbc267 now) | review/allot-pace-r2 0eab2be1 (superseded) → **review/allot-pace-r3 @8752fc49** | claims ALLOT-PACE-3.
BRANCH review/allot-pace-r3 = 2d9f07c7 + the same 6 picks as r2 (6d646253 152d4b0d c77569dc 23027243 026f6e76 a186a088) + 868b74e9 build + 8752fc49 role-parity-scan fix (test tool only).
- Only conflict: assemble.py → base list + jseason.js after jeitem.js. j20/jinv/jstip/jseason/monthly-allotment diffs byte-identical to r2's resolution (base did not touch them).
- Module list 491 ⊇ LIVE a96564ad's 487 (jkring-item.js + ../../rank/worker/src/score.js present; extras jsideq jreignend jseason joanpace). webkit-syntax: parse hits 0. assets.json unchanged.
GATES on r3 (Fold 755x1000@2 + iPad 1180x820@2 where sized):
| gate | r3 | note |
|---|---|---|
| monthly-allotment | ALL PASS | r2 run FAIL 5 was harness: start() sometimes locks to a maid life for the whole page (seen on base 3b 2849705d too, 1 of 8 loads) → 400× start loop (19 min) probes a servant. Not this branch |
| allot-season | ALL PASS | |
| door-onetap | PASS (F ok) | r2 run had one random law-6c «never picked» |
| kit-std-scan REPORT_ONLY | 16 (X06 ladder word on court plaques, X08 chapter title ellipsis) | IDENTICAL line-for-line to base 2d9f07c7 (16) → baseline |
| pace-speed / reignend | PASS / PASS | |
| balance-core | 39 PASS 0 FAIL | |
| npc-harm-heat | H3 flaky | H3 «pace off reopened 0/1» flips on BOTH: base 2d9f07c7 failed 2/4 runs, r3 1/4 → pre-existing flaky check, not this branch |
| role-parity.test | FAIL 1 only (pre-existing gap list, unchanged) | FAIL 2 PROMO onlyBorn «cx:mendGo» FIXED in 8752fc49 (below) |
| quickcheck vs LIVE a96564ad --runs 3 | QUICKCHECK PASS | core gates PASS (hooks 17), time-spill PASS, open 1808 ms, old save ok, perf new/live render 254/260 tab 509/479 buổi 1852/1449 tasks>200 31/30 |
role-parity FAIL 2 (law 11, same family as f56802bc «drop»): probe-only. The VAR runs (social oanAdd/affAdd/relAdd, liked) are not undone by snapW; the risen maid is probed FIRST, so her runs raise her regard of the twin clone (affAdd(n,b)); the clone, probed second, then finds the risen maid as her go-between (jmend mendGoOf: aff(m,a) ≥ quen) → mendGo for born only. Fix: every person's relation stores (rl ro aff opz rel oan) put back before the second doer; and the clone copy made generic (every per-person store keyed by the risen maid's id — joanpace's daily cap holder.opz[id] was missing). Game rule unchanged (law 1 holds). After: NPC promo {risen:[],born:[]}.

## ★ HANDOVER ALLOT-PACE-2 → successor (28/11 ~07:35Z; context 40 % > START_CTX 6 % + 25 %) — Foreman C ROOT 4-1-1-1-1 session_01PEhRbwetRyRvTwxH84sUAe opens it
PRIORITY #1 CHECK: Foreman C GO 07:25Z (base review/lc34-3b-r1-rv 2849705d = lr-rules caa95310 on LIVE 5ad52416 + tmk-oanpace-fix-rv 4206db2c + RV-181 pvOan) | main LIVE 5ad52416 | review/allot-pace-r2 0eab2be1 (PUSHED) | claims ALLOT-PACE → successor.
DONE: branch review/allot-pace-r2 @ 0eab2be1 on 2849705d = 6 cherry-picks + build:
- 230fd0d3 (cce32a0e allot-season back): conflicts resolved by hand — assemble.py = 3b list + jseason.js after jeitem.js; j20 blCard = 3b line (payCutTxt law 4) with `stipRankTxt(i)` (fallback BLG[i]); jinv = 3b lines (BAL.btn.itemUse.k / BAL.time.cost.give) + allot-season ssSewTxt «May áo» text + «Ban cho kẻ hầu» button; jstip = 3b E-FIX-3 counted stock line kept, NPC old trim guarded `!(BAL.stip.keep&&BAL.stip.keep.on)` (allot-season ceiling).
- 371d95b1 (44f3b311): jallot = 3b `ilUsedUp(e,p)` kept + paced `got` measurement.
- cfacceed (3fcab9fa), f56802bc (12a8cf67), 72e7a0fd (694836de), d14c1063 (c35ab5ce): clean.
- aeeff8d6 DROPPED: 3b already has the same kit-std-scan route fix (rv-plr4 r8).
- 0eab2be1 build (build_site.sh). webkit-syntax: 488 modules, parse-level hits 0 (only the known jkring-item string info line). No lookbehind added (0 in the diff).
TESTS so far on 0eab2be1: pace-speed PASS · reignend PASS · balance-core PASS · npc-harm-heat ALL PASS. Running when I stopped (rerun to be sure): door-onetap, kit-std-scan (REPORT_ONLY), role-parity, quickcheck.
TODO (successor, serial, never two Chromium suites at once; outputs under your scratchpad):
1. node dev/test/monthly-allotment.js <worktree> <outdir>   and   node dev/test/allot-season.js <worktree> <outdir>   (BOTH need an outdir — my first run lacked it).
2. node dev/test/door-onetap.js (F section must be ok; random law-6c / tap fails seen on LIVE too) · REPORT_ONLY=1 node dev/test/kit-std-scan.js (expect the 3b baseline count; compare with 2849705d if it differs) · node dev/test/role-parity.test.js <worktree>/index.html (20–40 min; FAIL 1 gap list is pre-existing) .
3. CTM_LIVE_REF=origin/main bash dev/tools/quickcheck.sh HEAD --runs 3 (vs LIVE 5ad52416; old save load). Fresh worktree: run python3 dev/build/assemble.py first.
4. Write results here, then the line «RV READY (BIG) review/allot-pace-r2 <sha> on 2849705d» at the end of dev/handover/FOREMAN_C_STATUS.md + send_message the CURRENT Foreman C.

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

## Owner ruling followed by each edited test (Foreman C ROOT 4-1 ask; tests changed to the NEWER ruling, never weakened)
- monthly-allotment «evening» (pace-funnel rewrite) follows OD L2689 (26/11 ~23:24Z, MAIN CHÍNH 164, owner-approved curve, CANON OVERWRITE of the ~23:00Z monthly rescale), quoted: «ONE GROWTH CURVE, no jumps. (1) Sắc · Tài · Tâm cơ get the same slowdown rule as the stat-pace system (BAL.stp dm): every RISE × max(min, 1 − (now/100)^pow), plus the band cap on one change … no hard ceiling, nothing is taken away. … (3) Same rule for every NPC (law 1)». The old assert «Tài ≥ t1 + 2 + light.add» encodes the pre-curve raw gain. The new check is STRICTER on the candle itself: it must burn exactly one AND give a strictly larger rise than the same card without it, from the same Tài and carry (g0 2 → g1 3).
- monthly-allotment presetsHidden → presetsGreyed follows OD L2522–2523 (25/11 ~23:20Z, MAIN CHÍNH 147, OWNER BUG verbatim «Ủa tôi nhớ lúc trước cái chỗ trang điểm này là nó có chọn bao nhiêu, như là 3 màu tông lạnh, 3 màu tông ấm … Mình chọn vô là nó sẽ ra một cái cụm đủ 4 màu luôn»), ruling quoted: «show every preset set as one block (owned ones pickable; a set needing an item she lacks shows why / where to get it, per allot rules)». jallot already greys Kiểu cầu kỳ sets with why; the test now asserts every such set item is off AND carries a «thiếu …» why.

## ALLOT-PACE-2 (session_01PEhRbuTZEnWvksGsZQg5dP, depth 2, START_CTX ~6 %) — successor, 27/11 ~20:30Z →
PRIORITY #1 CHECK: OD L2638 PACE-SPEED + L2523 makeup-set; oan-pace OD 26/11 ~18:40Z + nết thresholds OD L2308 | main LIVE 8330e8b8 | review/allot-pace 12a8cf67 → c35ab5ce, review/lc31-b3b 07f7cd16 (no LC32 restack of 3b yet: land-chain-32.md last line 20:30Z) | claims ALLOT-PACE → this session.

### Task 1 (restack) — WAITING (Foreman C ruling «B», 20:34Z)
Trial merge allot-pace × LIVE 8330e8b8 (base 772bee4f): 16 source files / 18 hunks conflict (assemble.py j2 j24 j25 j27 j92 j95 jallot jbancung jecon jemoact×2 jne jration jstip jts×2 jtsb) + built files = rv26 save stack × ui2l/3a/3b. Not resolved by hand (LC32 restacks ui2l → 3a → 3b anyway). When LC32 posts the restacked 3b sha: cherry-pick cce32a0e 44f3b311 3fcab9fa aeeff8d6 12a8cf67 694836de c35ab5ce (skip build 70feb63d), rebuild, rerun monthly-allotment / allot-season / pace-speed / reignend / balance-core / role-parity / kit-std-scan / quickcheck + npc-harm-heat / door-onetap.

### Task 2 — RV-163L finding «NPC grouped harm 15/15 LIVE vs 7/15 lc31-b3b»: ANSWER = oan-pace intent hit by an out-of-date TEST SETUP; NOT a law-1 loss
Probe = door-onetap.js section F (12-scene NPC loop), fresh page per run (scratch script, same code as the test).
| point on 3b first-parent chain | runs with a grouped choice | NPC harm options / run |
|---|---|---|
| 3a 05804755 (no oan-pace) | 13/15 | ~8 |
| 3b-pre 0941389 (+ oan-pace-ghen fa35bacd, pace-speed …) | 9/15 | ~3 |
| 3b tip 07f7cd16 (+ act-move-law3-r2 d8f4d213) | 3/15 (RV-163L 7/15) | ~1 |
| 3a, oán set to the top (v.oan = BAL.linkRange.ro[1]) | 10/10 | ~79 (≈31 grouped) |
| 3b tip, oán set to the top | 10/10 | ~79 (≈31 grouped) |
Root cause: the test sets the grudge with `oanAdd(v,S,100)`. That lands ONE paced step (stat-pace band cap, already on LIVE: oán ≈12 on 3a and 3b alike). review/oan-pace (f) (joanpace motiveOK wrapper, owner OD 26/11 ~18:40Z «điểm oán nó tăng quá nhanh», nết thresholds OD L2308) lets an NPC plan harm only at grudge heat ≥ BAL.oanPace.act (25) or an outside reason (opEx). Heat 12 < 25 → most probe NPCs had no harm road, so no group. With a REAL grudge the 3b NPC has exactly the 3a deed set (law 1 holds: haOpts0 = the player's ACT table, same tier grouping). act-move-law3-r2 changes no NPC harm rule (its 3b-tip dip is noise around the same low-heat state: 3/15 vs 8/15 with pace off at setup).
Law-1 note for RV: the heat gate binds NPC choices only (opHeatOK: a===S passes) — that is the approved oan-pace motive rule (NPC acts from a real grudge, law 6b), not a capability gap; changing it would need the owner (law 16).
Fix + test (no assertion weakened):
- door-onetap.js F: exact setup write `v.oan = BAL.linkRange.ro[1]` (PUNISH-TIER-8 precedent). Branch runs: NPC harm options 71/81/84/76, grouped 28/33/34/32 (4/4 F ok). Runs 1–2 ALL PASS; run 3 FAIL 2 and run 4 FAIL 1 (law 6c «Cảnh báo nàng» never picked) = random seeded coverage / tap items (RV-163L saw the same random P13r/P9 tap fails on LIVE), not section F.
- NEW dev/test/npc-harm-heat.js: H1 grudge one point under the bar → no NPC harm on her (60 NPC cases, 0 harm); H2 full grudge → harm toward her (59–60/60), grouped (236–247), one per door+tier+target, no tier mix; H3 pace off → harm reopens (3). ALL PASS on branch. Mutation MUT=1 (gate off) → FAIL H1 (Nam Cung Tương Quân, Tào Uyển Hề plan P7/P8 harm at heat 24).

### Law 11 family scan — tests that set oán with oanAdd (big values) and never switch the pace off (22 files; setup-only ones run on branch vs 3a)
| test | branch (allot-pace) | 3a 05804755 | verdict |
|---|---|---|---|
| door-onetap | F was 3/15 → fixed (4/4) | 13/15 | FIXED (694836de) |
| two-way-acts | 3 FAIL → 1 after fix | 2 FAIL | FIXED (c35ab5ce): «Hạ nhục oán +» + «31 accusation» spent the pair's one-day bound (opz) earlier in the run; SOC.ally pre-existing |
| charge-trinh-punish | ALL PASS | — | ok |
| ag-all-c | FAIL 2 (options n 0, Dò la land) | same FAIL 2 | pre-existing |
| cycle | FAIL (book/pop-up/Tổng quản) | same | pre-existing |
| feelings18 | 33/34 (hờn bỏ về Sủng) | same | pre-existing |
| thaiy | FAIL 6 | FAIL 8 (overlapping, random set) | pre-existing/broken on both; branch-only «hostile rival bribes the physician» uses hostility()+npcWhy, not the heat gate — not this family |
| d19-gift | FAIL 2 («item road») | LIVE same (LC32 19:45Z) | pre-existing |
Others (road-*-same, typed-stat, kit-relrows-ms, result-sieve-card, viecnho-fix, pace-all, stat-pace, rel-men-servants, coop-relms-both, ts-a) use oanAdd as a stub, a display value or the paced rise itself — not setup of a hostile choice; not run.

### State
review/allot-pace @ c35ab5ce (on lc31-b3b 07f7cd16; built index.html is the 70feb63d build — test-only commits after it). Task 2 DONE. Idle until LC32 posts the restacked 3b.
