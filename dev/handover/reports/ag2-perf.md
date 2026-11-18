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

## AG2-PERF #2 — deeds floor (worker session_01UV1SzimZ43DghURhgEAv8W, depth 8, START_CTX 5 %, 18/11)
PRIORITY #1 CHECK: MAIN ROOT-52 ruling (via C-AG #12 takeover prompt) | review/ag2-perf 25c66b1c (A cap 8, F1/F2/B) | pre-perf head review/ag-all-2-land 02466132 | deed counters reused: AG/AG2/AG3.stat.land, jagstaff window.__asN.n, jtruth deedAdd | no other claim.
Head **0e255c17** (review/ag2-perf). Change: `BAL.ag.day.redecideCap` default **0** (A off: every consort picks every buổi = the pre-perf path; A stays in code, >0 switches it on). New tool `dev/test/ag2perf-deeds.js` (deterministic harness of ag2perf-diff; count = AG.stat.land + AG2.stat.land + AG3.stat.land + __asN.n + every deedAdd split me / consort / servant of a consort / other servant / other). `ag2perf-probe.js` takes PRE; `ag2perf-a.test.js` switches A on with CAP (default 8).
**Khắc step timed = `spend(1)`** (one khắc through every wrapper: views, j95 final, agWatch…), 3 per buổi, 4x CPU (CDP Emulation.setCPUThrottlingRate 4), 40 buổi × seeds 1-3; buổi step = placeWhere + agFlush + nextBuoi. Reviewer: `node dev/test/ag2perf-probe.js <index.html> 40 <seed> 4 3` on both builds, alternating.

### Cap table (NPC deeds per 160 buổi, seeds 1 / 2 / 3; % of base 02466132)
| cap | deeds s1 | s2 | s3 | % of base | consort deedAdd s1/s2/s3 | servant deedAdd | re-pick blocked by cap (s1/s2/s3) |
|---|---|---|---|---|---|---|---|
| base 02466132 | 654 | 665 | 637 | 100 | 59 / 58 / 61 | 0 / 0 / 0 (servant deeds land via __asN: 17/19/18) | – |
| 8 | 546 | 516 | 555 | 83 / 78 / 87 | 55 / 51 / 46 | 0 | 20 / 15 / 17 |
| 12 = 16 = 24 = ∞ (999) | 539 | 562 | 494 | 82 / 85 / 78 | 55 / 50 / 38 | 0 | 0 (cap never binds at ≥ 12) |
| **0 (shipped)** | 654 | 665 | 637 | **100 / 100 / 100** | 59 / 58 / 61 | 0 | – (seeded diff 0 vs base, seeds 1-3 × 160) |
Finding: the deeds are lost by the CAUSE FILTER itself (kept consorts with no cause: 383-523 slots per run), not by the cap; a higher cap cannot reach 95 %. In the old draw a routine pick is already cheap (agPw over needs, no agOptsG); the cost A saved was the deeds themselves. → MAIN fallback applied: consorts (and so their servants) never capped. No far-NPC cap added: staff are already time-sliced (agLz), Emperor / Thái hậu are not far.

### 4x CPU timings (ms; mean of per-run means; box shared/noisy)
| build | khắc mean | khắc median | buổi mean | buổi median | runs |
|---|---|---|---|---|---|
| set A, live 12a1e4be | 4.27 | 1.05 | 106.7 | 40.3 | 6 |
| set A, cap 0 | 3.82 (−11 %) | 1.82 | 139.3 (+31 %) | 67.8 | 6 |
| set A, cap 8 | 3.50 (−18 %) | 1.73 | 129.7 (+22 %) | 63.6 | 6 |
| set A, cap ∞ | 3.63 (−15 %) | 1.77 | 139.4 (+31 %) | 67.0 | 6 |
| set B, live 94a93759 (quickcheck's live) | 3.52 | 1.13 | 105.9 | 38.1 | 9 |
| set B, cap 0 (head 0e255c17) | 4.49 (**+28 %**) | 2.10 | 150.3 (+42 %) | 72.3 | 9 |
| set B, cap 8 | 3.92 (+11 %) | 1.90 | 143.6 (+36 %) | 68.3 | 9 |
| set B, base 02466132 | 6.48 (+84 %) | 2.17 | 150.8 (+42 %) | 72.2 | 9 |
Plain quickcheck 0e255c17 vs live 94a93759 (cpu 4, 3 runs): **PASS** · render 228/179 · tab 378/356 · buổi 1181/851 · tasks>200 17/13 · old save ok · core gates PASS.
Verdict: deeds floor MET (100 %). Per-khắc ≤ live: met vs 12a1e4be (−11 %), NOT met vs the current live 94a93759 (+28 %; cap 8 is +11 % and loses 13-22 % of deeds). Live per-khắc itself moved 4.27 → 3.52 between the two lives / sets (noise ±30 % run to run). No setting of A meets both on the current live → MAIN decides: (1) ship cap 0 (all deeds, khắc ≈ +28 % vs current live, −31 % vs base), or (2) a new perf order on the khắc step of the deeds themselves (profile spend(1) cap 0 vs live 94a93759).

### Gates (head 0e255c17)
| gate | result |
|---|---|
| seeded diff head (cap 0) vs base 02466132, seeds 1/2/3 × 160 | 0 / 0 / 0 |
| quickcheck (cpu 4, 3 runs) | PASS |
| G4 coop-one-world seeds 7+3 ×2 | 4/4 PASS |
| ag suites 12 (ag-all 21, betray 20, carry 9, know 25, later 9, paywin 9, sell 19, soft 20, taimat 25, taimat2 16, truth 11, walk 10) | 12/12 PASS (ag-all once FAILED its own day-draw p95 12.3 > 8 ms while 4 suites ran in parallel; alone ×2: p95 6.4 / 6.5, 21/21 PASS) |
| ag2perf-a.test CAP=8 seeds 1, 2 | PASS |

### Split mode (C-AG #12 13:51Z) — head ece17b1b
`BAL.ag.day.redecideScope` "consort" (default; the filter on consorts when cap > 0) | "far" = consorts + their maids/eunuchs + hers pick every buổi as before; only FAR staff (ownerOf(s) null) re-pick with a cause (touch/need/new/done/urge), cap per buổi, else her duty row (jagday agRdcFar in agLzRun; agRdcKeep takes the kind's AGBASE row).
Measured: the day draw (agDayList) holds emp 1, th 1, consorts 10, maids 13, servants 7 — all 20 staff belong to a consort or to her; **far staff = 0**. So "far" + cap 8 = cap 0 exactly: deeds 654 / 665 / 637 = 100 % (agLand0 consort 368/380/354, other doers 32/22/28, deedAdd consort 59/58/61, servant deedAdd 0, staff landings __asN 17/19/18), no rd marks. Emperor / Thái hậu are not "far" (kept). Seeded diff ece17b1b (default) vs 02466132: 0/0/0. ag-all 21/21, G4 seed 7 PASS, ag2perf-a CAP=8 PASS.

### Live baseline shift explained
quickcheck's "live" 94a93759 was this clone's stale origin/main (2026-11-18 03:37Z), OLDER than 12a1e4be (11:28Z, in main); it lacks later main code (jcoopthine, jpq, jreveal, jplst … −1834 lines in dev/build). Current live main = f60b4024 (13:38Z, contains 12a1e4be). Set A's 4.27 ms for 12a1e4be was noise (two of six runs had 50 ms p95 spikes); f60b4024 measures 3.28.
| set C (9 runs alternating, 4x CPU, spend(1)) | khắc mean | vs live | khắc median | buổi mean | vs live |
|---|---|---|---|---|---|
| live f60b4024 | 3.28 | – | 1.11 | 111.5 | – |
| cap 0 = split "far" (ece17b1b default) | 4.61 | **+41 %** | 2.09 | 150.1 | +35 % |
| cap 8 (consorts filtered) | 4.13 | +26 % | 1.99 | 146.8 | +32 % |
| (set B) base 02466132 vs its live | – | +84 % | | | |
Conclusion: the per-khắc gap to live is the AG-ALL-2 feature itself (NPCs acting by the same rules as her: deeds land per khắc), which live does not have; A saved time only by dropping deeds. With every deed kept, review/ag2-perf is −29 % per khắc vs 02466132 (F1/F2/B) but +41 % vs live. Options for MAIN: (1) ship cap 0 (100 % deeds, +41 % khắc vs live); (2) cap 8 consorts (−17 % deeds, +26 %); (3) a new perf order on the cost of a landing deed inside spend(1) (profile cap 0 vs f60b4024).

### Handover
Depth 8: no children. Scratch (container only): /home/user/wt/ag2out (bench*.sh/log, deeds json). Worktrees ag2p2 (branch), ag2base (02466132), ag2live (12a1e4be), ag2live2 (94a93759), ag2live3 (f60b4024).
~83% xong / ~62% chơi được
