# AG2-PERF — make ag-all-2 fast enough (worker session_01UV1SzgvfBYs38MJqH9wsxK, depth 8, 18/11)
PRIORITY #1 CHECK: OD perf gate (C-AG #11/#12 >+10 % = FAIL; owner OD L1637 17/11 ~15:45Z per-khắc re-decide + 4x CPU gate) | main: none | review/*: review/ag-all-2-land 02466132 (dev/test/eng-probe.js), BAL.ag.day.replan exists (no re-decide cap key before) | claims: me only.
Branch: review/ag2-perf (base review/ag-all-2-land 02466132). START_CTX 3 %. Orders: C-AG #12 12:15Z (B yes) + 12:16Z (MAIN ROOT-51: A and B).

## Fixes
| # | what | file | outcome |
|---|---|---|---|
| F1 | knSellTick: the facts below j95's habit die (j78 + jdis + jmind + jtruth, no dice) read once per owner per pass (window.J78MEMO); any sale clears it. The habit wrapper still rolls its own die per call. | j95.js, jagknow.js | seeded diff 0 |
| F2 | toilTasteOf / toilLvTasteOf joined the TL2M per-pass memo (toilTasteOf("th") built pTH() + portrait lookups per imagined sitting) | jagtoil.js | seeded diff 0 |
| B | stage redraw inside a sim step (j95 final wrapper) runs every renderStage wrapper in the step (their state work: tyCharge, j94 sync, lifePlace, resApply, the stage list…) but its layout fits (renderAfter: k3Stage, krail, kitFloorFit, j59tt, …) wait for the next animation frame (window.__rdefer; coalesced per key; a render() before then flushes them) | jlag2.js, j95.js | seeded diff 0 |
| A | owner OD L1637 "chỉ người bị ảnh hưởng mới nghĩ lại": at a new buổi a consort picks her deed again only with a cause — ill / rain / touch / need (top need changed since last buổi) / new / done (last buổi had a deed) / urge (Σ needs × needW × mood × intent > routine × mood: the agDrawB weights); else she keeps her schedule row (no deed). Cap ONE key BAL.ag.day.redecideCap = 8 per buổi (0 = old HYBRID). Cause on every slot (slot.rc, day-draw = "day"), counted in AGD.stat.rd. jagday.js HYBRID comment (old line 104) rewritten. | jagday.js, jbal2.js | NOT identical (design change, ordered); cap 0 → seeded diff 0 vs base |
Not done: deferring the whole renderStage (it changes the stage list S.visit.people → outcome diff), kitBook weekly book layout (kit code, not ours), agOptsG providers (flat over ~200 fns, haOpts already cached).

## Proof
- dev/test/ag2perf-diff.js: seeded Math.random + crypto, frozen clock (time-sliced agSlice / agLz deterministic), RNG re-seeded right before start() in one evaluate; per-buổi hash of S + RNG count. Base 02466132 vs F1+F2+B (+A with redecideCap 0): seeds 1/2/3 × 160 buổi diff 0.
- dev/test/ag2perf-a.test.js: every consort slot has a cause or "keep"; kept slots carry no deed; ≤ cap re-deciders per buổi; cap 0 → no rc (old path). PASS seeds 1, 2.
- A effect (seed 1, 160 buổi, AGD.stat): picks with cause ≈ 2/3 of consort-buổi (urge 111, done 82, rain 17, need 4, touch 3, ill 1 over 40 buổi; day 96; keep 70); deeds 552 → 425, landed 331 → 254 (≈ −23 % NPC deeds at cap 8; cap binds on busy buổi — raise the cap for a livelier court, lower for speed).

## Numbers (this box is shared/noisy: same build ±30 % run to run; medians/means of alternating runs)
| measure | live 12a1e4be | base 02466132 | ag2-perf | ag2-perf vs live |
|---|---|---|---|---|
| eng-probe N80 plain, ms/buổi (median of 3 rounds × seeds 1-3; base 2 rounds) | 29.2 / 29.7 | 41.9 (+41 %) | 34.9 | **+19.5 %** |
| 4x CPU (ag2perf-probe 40 buổi × seeds 1-3 × 2), buổi step mean | 116.2 | 167.2 (+44 %) | 148.3 | **+28 %** |
| 4x CPU, buổi step median (mean of 6) | 41.4 | 81.2 | 71.7 | +73 % |
| 4x CPU, khắc step (spend 1) mean | 5.3 | 7.5 (+40 %) | 4.5 | **−16 %** |
| 4x CPU, khắc step median | 1.1 | 2.2 | 1.8 | +64 % (≈0.7 ms) |
Earlier profile (seed 1, 120 buổi, base − live, ms/buổi): agDayEnsure 3.1 · renderStage in step 3.1 · dawn/kitBook +1.8 · tl2Meet 1.8 · knSellTick 1.6 · agLand/agSlice +0.7 · fxInvite7 +0.4 · monthTick +0.3.
Verdict: still > +10 % on the plain probe and the 4x buổi step; khắc step is at/below live. C-AG takes it to MAIN for accept/park.

## Gates
Head 25c66b1c (code = ef06b487 + site build). Seeded diff with redecideCap 0 (F1+F2+B vs base 02466132): seeds 1/2/3 × 160 = 0 / 0 / 0.
| gate | result |
|---|---|
| quickcheck HEAD 25c66b1c (cpu 4, 3 runs) | **PASS** · old save ok · render 202/191 · tab 443/370 · buổi 1107/1164 ms · tasks>200 17/15 · core gates PASS (one-core-guard, rules-one-source, kit-conform, co-op hook) |
| G4 coop-one-world seeds 7+3 ×2 | 4/4 PASS |
| ag suites (ag-all 21, betray 20, carry 9, know 25, later 9, paywin 9, sell 19, soft 20, taimat 25, taimat2 16, truth 11, walk 10) | 12/12 ALL PASS |
| ag2perf-a.test seeds 1, 2 | PASS |
(An earlier quickcheck on ef06b487 failed only "NOT BUILT" (site build not committed) + one G3 kit-conform flake (tutorial intro pages 0/4); on the built head both pass.)

## Handover (if a successor is needed)
Tools in git: dev/test/ag2perf-diff.js (PRE='BAL.ag.day.redecideCap=0' for the identical check), dev/test/ag2perf-probe.js (4x CPU), dev/test/ag2perf-a.test.js. Scratch (container only): /home/user/wt/ag2p (bench2.sh, tree.js, selfin.js, anc.js profile helpers). Next levers if MAIN wants more: lower redecideCap (speed vs NPC liveliness), kitBook weekly-book layout (kit keeper), renderStage stage-list side effects moved out of renderStage so the whole stage DOM can wait for a frame.
~82% xong / ~60% chơi được
