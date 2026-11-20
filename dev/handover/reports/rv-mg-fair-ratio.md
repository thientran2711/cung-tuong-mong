# rv-mg-fair-ratio — BIG opus review of review/mg-fair-ratio 996b17d0 — VERDICT: LAND READY 5ac8c186 (on LIVE 30e8714e; earlier c214eadd on 377d5ce3, PASS 950f7272)
PRIORITY #1 CHECK: OD 20/11 ~06:20Z / ~06:40Z / ~07:15Z / ~07:20Z (brief cag29-rv-mg-fair-ratio.md) | main eb056f7b: BAL.ag.mg2.hand {on,lo,hi,w,skew} + cal {up,dn,min,max} (jbal2.js), jmgcal mgCalBand, jmgt mgHand / mgNpcRaw | review/mg-fair-ratio 996b17d0 (from mg-fair-hands PASS 3fe87277); review/cal-p2 445bcaeb read only (has the Đầu hồ fix 6e456cf8, not merged here) | claims: wk session_01Rc5AsMnKfGBSQk1sEvtKda
Reviewer session_01Rc5AsJK6yD7rWjkFjs3So6 (foreman C-AG #29). START_CTX ≈ 4 % (1M window). final = 996b17d0 + reviewer fix 2b067168 + final-merge of LIVE origin/main 70bea3d3 (mg-visual; only index.html / sw.js conflicted, rebuilt) = **950f7272** (origin/main is its ancestor, checked at push). Re-run on 950f7272: mg-fair-hands 18, ag-mgcal 14, ag-mgh 10, origin-arts 8, mg-visual 8 all ok.

## Reviewer fix (2b067168) — law 4 one core
- The curve tails (±3 sd: mgZ clamp and mgCalBand lo / hi) and the slap scale (far = 2 sd, read by jslap slapNpcDraw) were numbers typed in code; mg-fair-hands had `far` in BAL, the bell curve deleted it and put 2·sd in jmgcal. Now BAL.ag.mg2.hand `zMax:3` and `slapZ:2` (named slapZ, not far, so the canon-overwrite test still finds no old thirds key `far`).
- jmgt `mgBand` had a private fallback curve (centre mgMedD(0), sd 1.5) and jmgcal `mgCalBand` had fallbacks `mgMedD(0)` / `1.5` — a second place computing centre / spread. Now `mgBand = mgCalBand` (jmgcal is always assembled; calls are at run time) and mgCalBand reads only BAL (`ctr[""]`, `sd[""]` always exist).
- Same values → same sig "n/m/sd" → no hand re-rolls, no behaviour change. Tests re-run on the fix (below).

## Checks
| # | check | result |
|---|---|---|
| 1 | law 4 one core | PASS after the fix. Every knob now in BAL.ag.mg2.hand {on,w,art,ctr,sd,eqZ,zMax,slapZ,grp}; mgCalBand is the one curve formula (mgHand, mgHandEff, jslap, jhd, mgCalShare read it). erf constants are maths, not knobs. |
| 2 | owner model | PASS. ctr {"":7} = average adult (OD ~07:20Z); eqZ .43 used only to read her place (mgCalShare); no fixed thirds anywhere: git grep finds no split / eq / far / skew / lo / hi / up / dn key on hand or cal (mg-fair-hands test 1 asserts it); mgcal_apply.py regex still matches the shorter cal line (mgcal-apply 8/8). grp covers all 31 KG82 kinds, no duplicates. |
| 3 | law 1 two-way | PASS. NPC vs NPC and NPC vs her use the same mgNpcRaw; NPCs get the upbringing (identity start bậc) lift, she gets the same rows in her own arts at start (j2, origin-arts 5); rank gives no skill to either side. Identity ±2 not built on either side (cal-p2's, as briefed). |
| 4 | law 5 harder with rank | PASS. Her own play falls with rank (contest occ hoi, L0, my run): co 8.9 → 8.0 → 7.2 → 6.3 at rank 0/2/4/6, dan 7.5 → 4.9, tat 4.1 → 1.5; same-rank NPC play falls the same way, so her P1st vs same-rank rivals stays level (co 47/45/45/43). Trials vs a fixed bar (exam) get harder. Same reading as rv-mg-fair-hands. |
| 5 | law 2/3, contest table | Table A reproduced (dev/measure/mg-fair-ratio.js, 1500 contests/cell; mg-bots.js measures engine plays, not contests, so the contest sim is this file), within ±3 points of the worker: c mean L−1..+2 16.8/62 · 33/80 · 57/94 · 78/99; a 2.8/25 · 7.8/41 · 22.5/60 · 40/75; r 4.3/18 · 8/24 · 14/29 · 20.8/39. **Flag: Đầu hồ = a sure loss in EVERY life on this branch** (0 % 1st, 0 % top-3 at every L and with +2 sở trường), because her b 1.1 comes from the broken board while NPCs now play the adult curve (on LIVE main NPC hands follow her b, so it is fair there). The fix exists: review/cal-p2 6e456cf8 (Đầu hồ owner-bug, "lands ALONE"). → **Landing order: land mg-fair-ratio only after (or together with) cal-p2's Đầu hồ fix.** Né / Điều hương / Tát are near-losses at L0 (top-3 1–3 %) but not sure losses (L+2: top-3 16 / 23 / 40 %; + sở trường higher). |
| 5b | reflex at L+2 (21 % 1st) | Low because her reflex b were taken on unfitted boards (tat 4.9, ne 4.1, dauho 1.1); ban (b 9.1) already wins 80 %. My run with her b at the cal-p2 / OD ~07:20Z target for weak kinds (6.5 / 7 / 7.5), L+2, P1st/Ptop3: tat 21/80 · 32/89 · 45/94; ne 19/79 · 31/87 · 41/93; dauho (board as today) 16/72 · 25/84 · 38/91; ban 22/79 · 32/89 · 44/94; td_ngon 10/61 · 16/73 · 27/83; duho 28/83 · 38/91 · 51/96 → reflex mean at L+2 ≈ 19 % / 29 % / 41 % 1st, top-3 ≈ 80–92 % (even share among 6 = 17 % / 50 %). **Yes, cal-p2's fitted boards + her re-test fix it**; the curve needs no change. Note: at L0 she is untrained while most court NPCs carry 1–2 upbringing bậc (+≈0.9 play), so at b = ctr she places below even at L0 and about even at L+1 — intended by the upbringing rule (OD ~01:50Z). |
| 6 | exam | BAL.ex.bar [22,25,28] / wPlay / jexam.js untouched (no diff vs main). C reproduced: bell 86.5 % mean (worker 86.4), median 100. Why not 99 % any more: the thirds centred NPC hands on HER b (9–10 on most careful kinds) → nearly every NPC cleared the bar; now hands centre on the adult average 7 whatever her b. Why above main 82.3: main's band also followed her b (b + w/2 + up / − dn, skewed down), so her low kinds (dauho 1.1, ne, huong) dragged NPC plays far below; the bell curve has no such drag. Level = exam bar vs average play 7 → a BAL.ex question if MAIN wants slower NPC promotions, not this branch. |
| 7 | old saves | PASS. No saved BAL; old p.mgHv sigs ("3/9.5", "t/…") re-roll on the curve (mg-fair-hands 5); C() fallback has no up / dn; quickcheck old save from LIVE loads and plays. |
| 8 | tests | see table |
| 9 | diff scope | PASS. vs origin/main: jbal / jbal2 / jmgt / jmgcal / jslap / jhd (BAL + mg logic), j1 / j2 / jorigins (origin-arts, from the mg-fair-hands PASS), dev/measure + dev/test, index.html / sw.js (site build). No UI, no player-visible text, no kit change → no shots. |
| L14 | canon overwrite | PASS. Old band / thirds keys and comments replaced in place (BAL, jmgt, jmgcal, jslap). |

## Tests (on the fix 2b067168 / final)
| test | result |
|---|---|
| assemble + build_site | ok |
| mg-fair-hands | 18/18 ok |
| ag-mgcal | 14/14 ok |
| ag-mgh | 10/10 ok |
| origin-arts | 8/8 ok |
| mgcal-apply.test.sh | ok |
| mg-skip | PASS |
| ag-mg2 | 23–24 ok; summons ×2 FAIL (pre-existing, same on main); "exam: an NPC can fail" FAIL in 2 of 4 runs (flaky, hands-OFF twin + origin start arts; inherited from mg-fair-hands, documented by rv-mg-fair-hands; not this branch) |
| slap-mg | TimeoutError waiting for #k91demo — **same on LIVE main eb056f7b** (pre-existing; mg-noword-a demo change; the old "marks" failure is masked by it) |
| quickcheck | PASS on 2b067168 (176 s, old save ok, core gates PASS); on final 950f7272 1st run FAIL perf tabMs 469 vs live 336 only (noise), rerun PASS (171 s, tab 320/454, old save ok, core gates PASS) |
Pre-existing on LIVE main (listed apart): ag-mg2 summons ×2; slap-mg #k91demo timeout.

## For C-AG #29 / cal-p2
- Land order: cal-p2 Đầu hồ (6e456cf8) first or together; else Đầu hồ is a sure loss for her in every life.
- cal-p2 hooks are clean: ctr[kind], sd[group], zMax / slapZ, mgCalGrp, mgCalBand, mgCalShare, mgNpcRaw (identity ±k on the result for NPCs, law 1).
- After fitted boards + her re-test, re-run dev/measure/mg-fair-ratio.js (tables D / A) — only her b moves.

VERDICT: **PASS 950f7272** (landing order above). Reviewer context ≈ 12 % at end.

## FINAL (after cal-p2 Đầu hồ landed, LIVE 377d5ce3; coordinator now MAIN ROOT-75)
- 62915be4 = merge LIVE 377d5ce3: one conflict in jbal2 BAL.ag.mg2.cal — kept the bell-curve line (no up / dn / min / max) with main's k (dauho 1.1 dropped, she re-tests); index.html / sw.js rebuilt.
- c214eadd = test fix (law 14 / 11): dev/test/cal-dauho.js 4 read the deleted hand.lo / hi → now checks the dauho curve centre = BAL.ag.mg2.hand ctr and no cal.k.dauho.
- Tests on c214eadd: mg-fair-hands 18, ag-mgcal 14, ag-mgh 10, origin-arts 8, mg-visual 8, mgcal-apply ok; cal-dauho ALL OK against base 70bea3d3 (pre-fix). Against the default base origin/main its check 3 "board easier than before" fails by design (main already has the fix: before = after) — same on main itself.
- QUICKCHECK PASS (173 s, old save ok, core gates PASS). origin/main 377d5ce3 is an ancestor of c214eadd (checked at push).
- The Đầu hồ sure-loss flag is resolved: no dauho base in the book until her re-test; NPCs play the adult curve on the fixed board.

## FINAL 2 (coordinator MAIN ROOT-76): LAND READY 5ac8c186 on LIVE 30e8714e
- fa5ac9b4 = merge LIVE 892e5bb0 (mg-score-same: mgLive / mgReach in jmgt, hud lines in jhd / jslap / engines) — no overlap with the hand lines (jhd hdNpc, jslap slapNpcDraw kept); only index.html / sw.js conflicted, rebuilt.
- 5ac8c186 = merge LIVE 30e8714e (fig-label, UI only) — only index.html / sw.js conflicted, rebuilt.
- Tests on 5ac8c186: mg-fair-hands 18, ag-mgcal 14, ag-mgh 10, origin-arts 8 ok; fig-label PASS (fold); on fa5ac9b4 also mg-visual 8, mg-score-same-scan (35 cells via one grade, 0 raw), mgcal-apply ok. QUICKCHECK on 5ac8c186: 1st run FAIL perf longTaskMaxMs only (noise: live buổi 2611 ms in the same run), rerun PASS (167 s, old save ok, core gates PASS); fa5ac9b4 PASS.
- cal-dauho now also fails check 1 "kg82Aim source identical" against a pre-fix base: mg-score-same added the live-mark hud line to kg82Aim on main — same on main; the test is a before/after check for the Đầu hồ land only.
