# bongloc-options — BIG review (E47r) — round 1: FAIL
depth 2 (get_session lineage.depth 2 / limit 8). Reviewer E47r session_01DgYSWov9PiUe5YSGw6Kh4P, opened by FOREMAN E #29. Fixer E47 session_01DgYSWo9a1SYVhzmGV7E3Se.
PRIORITY #1 CHECK ('Bổng lộc|bongloc|blopt|M83'): OD 5 | main j20.js:12, j19.js:90 | review/* review/bongloc-options 6803e362 (E47) | claims E47.
Reviewed: 6803e362 merged with newest origin/main f44060d4 on review/bongloc-options-r a409727c (local; conflicts only index.html/sw.js → rebuilt). E47's follow-up head not on origin yet at verdict time.

## Gates run (a409727c)
- quickcheck ALONE: **PASS** (core gates PASS incl. G1 one-core; old save loads + plays a buổi; open 1496 ms 0 errors; perf new/live render 227/194, tab 426/366, buổi 1044/1058, tasks>200ms 18/18).
- law4-typed: 0 typed. bongloc-options.test.js: 5 runs → 4× PASS 13/13, 1× **FAIL 2/13** (flaky, see 3).
- stipend.js: «ev» step shown:false (stale, E47 already fixing).
- coop-e2e / both-seat / role-parity ×2: NOT run on this head (FAIL found first; run on the fix head).
- Shots: E47's 4 (Fold + iPad, cut + cấm túc) looked at: kit frame, «!» beside Bổng / Bị cắt xén, no Ghi chú row, reason line under cấm túc, odds in words. OK. (Fold option pictures still loading — CDN lazy.)

## FAIL items (fixer E47)
1. **Law 6 (real world) — she walks to Nội vụ phủ while under cấm túc.** `dev/build/jstip.js` stipEvent, the new `else{…O.push({n:"Đòi lại phần bị cắt xén"…` (no-maid road): offered and unlocked when `S.confined>0`. cấm túc is itself a skim cause (jstip.js:76), so cấm túc + cut + no usable cung nữ is a common case. The game forbids leaving the cung under cấm túc (j27.js:61 mapHTML disR «đang cấm túc»). Probe: rank 3, month 5, confined 2, maid spyFor → opts = Nhịn · Lót tay · **Đòi lại phần bị cắt xén** (no lock) · Tố lên Hoàng hậu · Ghi nhớ. Fix: when confined, lock it with the reason in kit words (e.g. «Đang cấm túc, không ra khỏi cung được») or leave it out; add the case to bongloc-options.test.js.
2. **Law 4 + law 11 — typed numbers in the sibling answers on the same frame.** The brief: every number of the cut answers from BAL. `jstip.js:66` stipAskOdds `/3`, `/4`, `-25` (the 25 duplicates the new BAL.blopt.sup); «Tố lên …» odds `T.risky?5`, `/2`, `/5`, `*15`; «Ghi nhớ» `eyes(S)*10`. Move them into BAL.blopt (or BAL.stip) and read them there; one source for the sup penalty.
3. **Flaky test.** bongloc-options.test.js «no cung nữ» check calls stipend() once; the skim is random, so with no cut the frame shows only Chu toàn / Bớt (seen: FAIL 2/13 in 1 of 5 runs). Loop until a cut (as the shot block does) or force the cut; same for any other single-roll check.
4. stipend.js stale «ev» step (already on E47's list).
Note (not blocking): the self road costs no khắc while the maid road is a parallel-time trip — consider a khắc cost when she goes herself (law 3 «time is its cost»).

## Laws checked
1 two-way OK (lót tay / đòi / tố / ghi nhớ answer the cut) · 2/3 OK (each answer has gain + cost; Đáp ứng now 2 bạc vs Danh −1) · 4 FAIL (item 2) · 6b OK (eunuch = S.court.ped via stipEunName) · 6c OK (cut goods restored by stipRestore; missing items shown «thiếu …») · 6 real-world FAIL (item 1) · 7 OK (no %) · 9 kit OK (kitRows, kitNoteBang, option cards; no private part) · 11 group scan table verified against the code (jecon month card + jstip cut card were the only periodic choice cards that lost options).

VERDICT: **FAIL** (items 1–3). Re-gate on E47's fix head: quickcheck alone, bongloc ×3, stipend.js, law4, coop-e2e full + both-seat, role-parity ×2, shots both devices.

# Round 2 — head 874e8270 (game code 79988d42) — **PASS**
Reviewer branch `review/bongloc-options-r2`, final sha **c7ae6d07** = 874e8270 + LIVE 04afaeb7 (index.html/sw.js rebuilt, assets.json left as main) + `dev/test/bongloc-coop-catch.js` (repro, logs only).
## Round-1 items
1. Self «Đòi lại phần bị cắt xén» under cấm túc → LOCKED with kit words «đang cấm túc: không được ra khỏi cung…»; also locked with no khắc; her trip costs BAL.blopt.selfKhac (1 khắc). Verified in code + test case. FIXED.
2. stipAskOdds / Tố lên / Ghi nhớ read BAL.blopt (loyD, sungD, sup, repStatD, repDanhD, repEv, repRisky, memEyes); one sup value. law4 0, one-core-guard PASS. FIXED.
3. bongloc test stages the cut deterministically (Math.random pinned for one stipend call). 3+1+1 runs 14/14. FIXED.
4. stipend.js updated, STIPEND PASS Fold + iPad. FIXED.
## Gates
- On 79988d42 + main 3fc8a93a: quickcheck PASS (G1, old save) · bongloc ×3 14/14 · law4 0 · stipend PASS 2 sizes · ptime2 ALL OK · coop-e2e 124/124 · role-parity ×2 ALL PASS · bongloc-coop ×6 3 PASS / 3 FAIL (10-bạc one-world, see below).
- On 874e8270 + LIVE e804edfc (5c20774a): quickcheck PASS · bongloc 14/14 · law4 0 · coop-e2e 124/124 · bongloc-coop ×2 15/15.
- On 874e8270 + LIVE 04afaeb7 (c7ae6d07, coop-cyhold landed): bongloc 14/14 · bongloc-coop ×2 15/15 · law4 0 · quickcheck PASS (old save ok, perf 226/215 render) · coop-e2e: see STATUS line.
## Co-op one-world lag — PRE-EXISTING (not this branch)
Catch-up probe = bongloc-coop.js + N more merged weeks, guest bạc on her phone vs host copy (withSeat b):
| build | runs | gaps seen (host − phone) | healed next week? |
|---|---|---|---|
| branch, 3 wk | 3 | +10 after Lót tay (x2), month change −53 (x2), wk3 −40 (last week) | all mid-run gaps yes |
| branch, 5 wk | 3 | wk1 −10, month change −92 (last week) | mid-run yes |
| branch, 6 wk (c7ae base) | 2 | month change −53/−52/−52, wk6 −10 (last week) | every month-change gap healed the next week |
| main 3fc8a93a, 3 wk | 3 | −10 after Lót tay (one-world check FAIL on main too), month change +42 | yes |
No gap ever outlived the week after it appeared; no growth over 6 weeks. Same mechanism on main: a thin guest's month-card choice / some weekly bạc lines reach the host one merged week late. The branch shows it more often only because the month frame now has a choice every month (owner's ask).
TICKET (for MAIN): «co-op one-world lag: the thin guest's month-card choice (Bổng lộc lễ nghĩa / cut answers) and some weekly bạc lines reach the host one merged week late — host copy vs her phone differ 10–92 bạc for one week, then equal. Repro: node dev/test/bongloc-coop.js (one-world check FAILs ~50 % on main and branch) + node dev/test/bongloc-coop-catch.js (CATCH lines). Pre-existing on main 3fc8a93a.»
## Laws
1 OK · 2/3 OK (self road now costs 1 khắc + odds; locked roads say why) · 4 OK · 6 OK (cấm túc lock) · 7 OK · 9 kit OK · 11 OK (whole frame's answers on BAL) · co-op land gate: coop-e2e 124/124, both seats 15/15, lag pre-existing.
VERDICT: **PASS c7ae6d07** (FF on LIVE 04afaeb7).
