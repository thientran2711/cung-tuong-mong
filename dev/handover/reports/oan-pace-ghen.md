# OAN-PACE-2 — GHEN pace + RV-163B fixes (F1 / F2 / F3 + strip gate) — worker report
Worker OAN-PACE-2 (session_01Rc5AsLW5LU5PeXKJxSXJE7), successor of OAN-PACE. Coordinator MAIN 163 → MAIN 164 (session_01Rc5AsMRACKNY1roydzvpF7). Reviewer RV-163B (session_01Rc5AsHo4hJGJQAnoeB8h8c).

PRIORITY #1 CHECK: OD «oán / ghen / ghét» rows 26/11 (~04:20Z, ~08:25Z, ~18:40Z rulings (a)–(f)); the «19:20Z relative-favour rule» is a MAIN 161 rec, not an owner row (MAIN 163 confirmed) | main LIVE 03a8c17c: BAL.oanFade (jbal.js), no pace-all | review/oan-pace 7c10f4c0 (base, FAIL by RV-163B: rv-163b.md) + review/lc25-sp 4cfcda61 (pace-all + stat-pace, lander stack; MERGED IN) | claims OAN-PACE → OAN-PACE-2.

## Branch
`review/oan-pace-ghen` = review/oan-pace 7c10f4c0 + merge of review/lc25-sp 4cfcda61 + this work. It REPLACES review/oan-pace at the lander (stack after lc25-sp; it already contains lc25-sp). Merge conflicts solved in source: j9 affAdd / oanAdd (oan-pace door THEN stat-pace spG), j14 cold release + jagacts3 p3Free (`oanAdd(v,S,BAL.ag.par3.cold.oanFree)` = one call, both paces, BAL number; no typed 20), assemble.py (lc25-sp list + joanpace after jagharm), CHANGE.txt (one new line), index.html / sw.js rebuilt.

## What changed (all numbers in BAL, law 4)
| item | done | where |
|---|---|---|
| F1 ONE cap per stat (MAIN 163 ruling) | the size of ONE oán rise / liking fall = stat-pace's band (BAL.stp.band.oan / rel). `BAL.oanPace.step` and `ghet.step` are GONE; oanPace keeps only: same incident never stacks, per-day cap (`day` 16, `ghet.day` 16), fade, vent, act gate | joanpace opStep, jbal BAL.oanPace |
| F1 ONE preview rule | `balOanUp` / `balGhet` removed; every call site prints `spSee("oan",n)` / `balSg(spSee("rel",n))`; `balOan` (relAdd → oán) asks spSee | jbal, j14, j55, j78, j95, jgift, jmen, jpoison |
| F2 whole shown-number family | scan `dev/measure/oan-shown-scan.py` (oán rise / liking change printed after «oán …», «quý …», «thiện cảm …»): BEFORE BAD 179 → AFTER BAD 0 (OK 230, STATE 21 = names / current levels / motive readouts, listed). Incl. j78 f_5, j95 j95silent + accFail RESULT text, jmen menChoose / menReport / menReport_3, jtsb go_3, jemoact / jfeel «kẻ ganh ghen +ghenN(..)» | 49 files; table `dev/handover/reports/oan-pace-2-scan.md` |
| F3 receiver-choice «Kết giao law 2» | cause = the TEST's floor: the foe's liking gain goes through affAdd × the foe's own trust nết (j28 G12, can be < 1: 0.64 / 0.96 / 1.1 seen run to run because start() is not seeded) — the old «≥ f_2 × half» floor failed whenever the random foe was distrustful (LIVE 4/4 was luck of the draw). Now checked against the same door (control affAdd); PASS 3/3 | dev/test/receiver-choice.test.js |
| strip plot gate (RV-163B via MAIN 163) | jty `tyEnemies` (npcWhy tyPlot / tyRob) needs `opHeatOK` (BAL.oanPace.act) | jty.js, test T1 |
| outside push gated too | a hostile choice opened by an outside reason (coerced by proof / a faction leader's order, j95except) now needs the PUSHER to pass the same heat gate (robot: most second-half lie rumours came from tellers at heat 0–10 pushed by one angry leader) | joanpace opEx |
| GHEN rise | j1 ghenUp (her path; NPC-caused jealousy already becomes oán between the two): size band `BAL.oanPace.ghen.band` [3,6,9] (stat-pace style, `opBand`, over = BAL.stp.over; j1 ghenN shows the banded number, ghenAll bands once) × RELATIVE favour clamp(1 + (her Sủng − that consort's Sủng) ÷ `rel.span` 40, `rel.min` .25, `rel.max` 1) → same incident never stacks, ≤ `day` 9 a day (store v.opg); rounding with ± carry like spG | joanpace opGhenIn, j1 |
| GHEN fade | j28 ghenCool × `opGfK`: left alone faster (BAL.oanCool.quiet / alone, from the last cause; her looks — the daily «nhan sắc» +1, a standing cause — do not restart it), deep slower (ghen ≥ `deep` 60 → × BAL.oanCool.deep.k), × clamp(1 − gap ÷ span, `fmin` .75, `fmax` 2) (closed favour gap → faster) | j28, j8 |
| GHEN vent | acting against her (runAct H95, AGHOST talk deeds, j95bSeed lie) spends `vent.share` .35 of that consort's Ghen (≥ `vent.min` 3) | joanpace opGvent |
| newcomer | BAL.ghenNew 15 → 4 (a new face starts near 0 jealousy; also the co-op rebase, same one core) | jbal |
| two-way (law 1) | HER jealousy of a consort (v.pg): pgUp same band / rel (gap = that consort's Sủng − hers) / day; pgCool (was flat −1) = base + pct × pg × the same opGfK; she spends it when she acts against that consort; j20 bestow `p.pg+3` (typed) → `pgUp(p,BAL.ghen.bestow)` | j1, j8, j20, joanpace |
| GHÉT fade (owner OD ~18:40Z «điểm ghét … giảm quá chậm») | a dislike between her and a consort (thiện cảm < 0, both ways) eases toward 0 each day: (`ghet.fade.base` .5 + `pct` .03 × |thiện cảm|) × nết forgive (her: BAL.oanCool.me) × left-alone speed-up × deep.k at |thiện cảm| ≥ `fade.deep` 50; never past 0 (robot: dislike was the main heat of lie tellers) | joanpace ghetCool (daily, after rivalsTurn) |
| whole family of direct jealousy writes | jration tribute, jshelf (2) direct `ghen +=` → ghenUp; j20 → pgUp | |
Rollback: `BAL.oanPace.on = 0` (old rises, no gates, no vent, no ghét fade, old ghen fade).

## Robot (dev/measure/oan-pace.js, inpage6 sensible bot, seeds 0–5, 12 months = 36 days; summary dev/measure/oan-pace-sum.py, now with quarters + half ratio + ghen sources + rumour-teller heat parts). 0 page errors in all 24 lives.
| | LIVE 03a8c17c | oan-pace 7c10f4c0 | BRANCH (act 25, committed) | branch + act 20 (option) |
|---|---|---|---|---|
| targetings/day year 1 | 0.85 | 0.62 | 0.37 | 0.31 |
| days with ≥ 2 / with any | 23 % / 52 % | 15 % / 38 % | 8 % / 26 % | 6 % / 23 % |
| first targeting day (6 lives) | 6, 1, 1, 1, 0, 1 | 17, 8, 7, 9, 7, 10 | 1, 10, 1, 20, 11, 25 | 10, 13, 7, 13, 16, 23 |
| targetings/day Q1 · Q2 · Q3 · Q4 | .85 · .85 · .98 · .72 | .07 · .76 · .85 · .81 | .06 · .20 · .46 · .76 | .02 · .13 · .48 · .63 |
| half 1 · half 2 (ratio) | .85 · .85 (1.0) | .42 · .83 (2.0) | .13 · .61 (4.7) | .07 · .56 (7.5) |
| oán to her mean Q1 · Q2 · Q3 · Q4 | 10.2 · 18.8 · 26.0 · 29.5 | 2.8 · 6.1 · 7.2 · 8.8 | 2.3 · 3.4 · 5.5 · 8.1 | 2.3 · 3.6 · 4.5 · 5.8 |
| oán max Q1 · Q2 · Q3 · Q4 | 33.7 · 55.1 · 81.5 · 90.0 | 12.5 · 20.3 · 21.1 · 26.6 | 10.7 · 15.9 · 21.4 · 25.5 | 12.3 · 13.1 · 16.1 · 20.2 |
| GHEN mean Q1 · Q2 · Q3 · Q4 | 49.6 · 82.3 · 94.6 · 97.6 | 23.8 · 46.5 · 65.7 · 72.7 | 8.7 · 21.7 · 38.0 · 53.4 | 7.1 · 16.6 · 27.1 · 39.0 |
| GHEN max Q1 · Q2 · Q3 · Q4 | 76 · 100 · 100 · 100 | 38 · 74 · 93 · 96 | 18 · 36 · 59 · 79 | 17 · 33 · 49 · 65 |
| consorts at Ghen ≥ 60, Q4 | 17.0 | 14.4 | 7.4 | 3.3 |
Tuning runs (4 lives each, same robot) on the way: before the ghét fade / push gate the second half was .64–.82/day; the outside-push gate took it to ~.2–.5.
Reading: every quarter of the branch is quieter than LIVE and than oan-pace, Ghen no longer reaches 100 in year 1 (Q4 mean 53 vs 97 LIVE), the second half is ~.6/day (LIVE .85).
NOT MET: «second half ≤ first half + 50 %, never 0». The first season is quiet ON PURPOSE (owner OD ~18:40Z (e) newcomer starts at 0, (f) «a quiet first season sees few targetings»), so half 1 is ~.1/day and any normal growth of grudges makes the ratio large; some months of the first season have 0 targetings (m2–m3). Act 20 vs 25 is within the noise of 6 lives (both ~.6 in half 2). Levers, one number each, for MAIN: raise the first season (lower `BAL.oanPace.act`, e.g. 15 — goes against (f)) or lower the second (a smaller `ghen.band` / `day`, or `BAL.net.heat.ghenK`); my rec: keep act 25 and the ratio as is (owner asked first of all for a quiet start and fewer targetings; both hold).

## Tests (on the branch build)
- oan-pace.js ALL PASS 33 (E1, B1 band = stat-pace, B2–B6, C1–C3, D1–D2, F1–F5, G1–G5 incl. ghét fade, H1–H9 ghen, T1 strip gate, R1 rollback).
- pace-all ALL PASS 32 · stat-pace PASS · cold-faction ALL PASS 20 · moodknow-step0 19/19 (reads the ghen band; each check a fresh incident) · ag-moodknow 33 PASS · net-build 189/189 · one-core-guard / bind / text / text-rule PASS.
- ghen-shown: every LIVE card shown == applied (pool / artActs / deal / phoenix / pregFind / bestow card + log, with and without đa tình); scan BAD 5 → 0. The «mood ghenN» unit lines FAIL the same way on review/oan-pace 7c10f4c0 (pre-existing: the test's mood setup does not reach the joyful band).
- receiver-choice: «Kết giao law 2» PASS 3/3. Still failing: «one core: no BAL.rcv.kw copy» (also on lc25-sp, 3/3), and flakes «act:blockf UNREACHED» (lc25-sp 2/3), «Ngự giá … all seen» (both). «NPC receiver of a gift: back and keep both seen» failed 1 of 3 runs here after the fix (300 gift tries in one day; the per-day pace is now off for that scan) and 0 of 3 on lc25-sp — reviewer: please re-run 3×; if it stays branch-only it is the stat-pace + ghét-fade liking path, not the gate.
- Not run here: the full 63-test regression list (/home/user/wt/opg-out/tests.txt rule: every dev/test/*.js matching ghenUp|ghenAll|.ghen|pgUp|.pg|ghenCool), quickcheck, coregates, coop-e2e — CPU went to the robot.


## Round 2 — RV-163C FAIL list (fe3d0888) → fixed (base LIVE is now 4cfcda61 = lc25-sp; this branch is a fast-forward on it)
| item | cause | fix | result |
|---|---|---|---|
| Nit one table | ghen band lived in BAL.oanPace.ghen.band | moved to `BAL.stp.band.ghen` [3,6,9] (the stat-pace table; read by joanpace opBand / j1 ghenN; not a spG-paced stat) | tests read it |
| R2 mood-mem «pgUp … d 6 want 8» | test typed the raw 8; pgUp floored the carry | pgUp rounds like ghenUp (± carry); test reads the band, same favour, fresh incident | 16/16 (was 14/16) |
| R2 «rivalNight raises v.pg … true why» | the night came in the SAME buổi as the test's pgUp → same incident, smaller cause adds 0 (by design: no stacking) | test starts the night as a fresh incident | PASS |
| R3 receiver-choice «act:blockf UNREACHED» | scan setup affAdd(S,v,300) held back by the paces (stat-pace on LIVE did it too: 2/3 there) | setup written with BAL.stp / BAL.oanPace off (dev/tools/receiver-choice-scan.js) | 3/3 clean (only pre-existing «BAL.rcv.kw copy», also LIVE) |
| R3 «gift back and keep both seen» | 300 gifts in one day vs the per-day pace | pace off for that variety scan (round 1) | 3/3 PASS |
| R1 role-parity riseCore | the master's jealousy goes through the ONE door ghenUp: toward HER = ghen pace (band × relative favour with her Sủng AFTER the rise × slow near the top); toward an NPC = pace-all's rule (a grudge o → n × BAL.oanCool.ghen.npc, ghen 0 — this rule is LIVE now and FAILS the old want on LIVE too) | the test's want = what that door gives (her: computed after riseCore; NPC: ghen 0 + the grudge) — MAIN please confirm this want change | PASS (LIVE 4cfcda61: FAIL) |
| R1 role-parity world setups | scan setups (oanAdd 40–80, liking ±50) were held back by the paces; the incident store is not in snapW | each VAR setup written with the paces off (RAWP in dev/tools/role-parity-scan.js); the heat gate still applies when acts are probed | see below |
| ob-oan-enc (WORKLIST 38, MAIN 167) | not the oán-pace root: (a) the test tapped the «Làm lành» card before the panel built it (busy box, iPad) and (b) another consort's dislike could outrank the hater out of the panel's top 3 | waitForFunction for the card + clear other consorts' dislike in the setup | card PASS both sizes; one remaining «oán 7 → 7 after the tap» seen only while the box was out of memory — a direct run of the same «Nhún nhường» lowers oán −8 on LIVE and branch alike (probe) → re-run on an idle box |
Role-parity gap sets (same seeded scan; the set still moves run to run on the SAME build — LIVE run 1 had apol P-RANK ×6 + PROMO cx:mendGo, LIVE run 2 had cx3:facFound P-ONLY ×7 + riseCore):
LIVE 4cfcda61 = cx2:flat ×9, cx2:true ×9, cx3:facFound ×7 (or apol P-RANK ×6), riseCore FAIL · BRANCH = cx2:flat ×9, cx2:true ×9, apol P-RANK ×6, cx3:teachD t1, PROMO harm:taint, riseCore PASS. Branch-only vs both LIVE runs: cx3:teachD (1 row) and the PROMO row's act name (taint vs mendGo; the PROMO check fails on both). Reviewer: 2 runs each side recommended.
R4 regression (dev/measure/regress-two.sh, every dev/test/*.js touching ghenUp|ghenAll|.ghen|pgUp|ghenCool|oanAdd|affAdd = 72, each run in its OWN tree with no argument so URL / shots-dir / number tests run as written; LIVE tree = 4cfcda61): 67 same exit code; 5 differed in the first pass — oan-pace (test of this branch, absent code on LIVE) and 4 that hit the time limit on LIVE (coop-r2, coop-guest-maid, coop-relms-both, emperor-visit) → re-run with 900 s: all 4 SAME exit code on both. Table: dev/handover/reports/oan-pace-2-regress.tsv (47 tests exit 1 on BOTH trees = pre-existing / box load).

## Handover / open items
1. Ratio aim not met (see Robot) — MAIN decides the lever.
2. Liking RISES printed under «quý / thiện cảm» are also paced by stat-pace; the F2 transform routed every balSg(...) liking print it found through spSee, but plain-variable liking gains printed without balSg were not part of this family.
3. Direct `.rel` writes (55 modules) stay outside the affAdd door (predecessor's item 3), e.g. j8 rivalsTurn `v.rel -= 1` when she is more favoured — a favour-driven dislike; it now eases back through the ghét fade.
4. Typed numbers seen, not this family: j95 «nàng bớt oán ngươi 10», j55 «quý ngươi -30», pvOanAny «oán ta +13» (RV-163B small notes).

## Tóm tắt cho sếp
Ghen giờ theo cùng nhịp như oán/ghét: mỗi chuyện chỉ tăng một nấc (tối đa ~9), cùng một chuyện không cộng dồn, mỗi ngày mỗi người tăng có hạn; ghen tính theo việc sếp được sủng HƠN người đó bao nhiêu (người được sủng ngang hoặc hơn sếp thì gần như không ghen); để yên thì nguôi nhanh, ghen sâu nguôi chậm; ai ra tay hại sếp xong thì hả bớt ghen; người mới vào gần như không ghen. Sếp ghen người khác cũng y luật đó. Thêm: ghét (thiện cảm âm) nay cũng tự nguôi theo ngày; kẻ bị ép/vâng lệnh chủ phe chỉ ra tay khi chính người ép cũng đủ giận; lột đồ cũng phải đủ giận. Mọi con số in trên thẻ = số thật trúng. Robot 1 năm: bị nhắm 0,85 → 0,37 lần/ngày; ghen trung bình cuối năm 97 → 53, không còn ai 100. Mùa đầu vẫn yên (theo ý sếp), nửa năm sau ~0,6 lần/ngày — vẫn cao hơn nửa đầu nhiều lần vì nửa đầu cố ý rất yên.
