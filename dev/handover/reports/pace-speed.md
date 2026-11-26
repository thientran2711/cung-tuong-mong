PRIORITY #1 CHECK ('promoGap|thi lên phẩm|tốc độ game|pace-speed|stp.ceil|soft ceiling'): OD 5 | ledger 0 | claims 0 | main 2 (j8 promoGap typed formula) | review/* 0 new — reused review/bal-ranks-law4-rv 2f78c51c key name BAL.promo.gap (PASS 24/11, never landed) and stat-pace BAL.stp / spG (lc24-sp).

# review/pace-speed — PACE-SPEED (MAIN 161 → 162 → 163) — owner OD 26/11 ~19:10Z rulings (A) + (D); MAIN 162/163 add-ons
depth 1 · START_CTX ~2 % · ROLLED at ~46 % (26/11 23:40Z) · session session_01Rc5AsKJ9DLM7DBrbT3Yua3 · branch review/pace-speed 7c619951 = lc24-sp 23b0b3d3 (stat-pace) + LIVE 504d2e6a merged + the rulings below.

## What the branch does (tip 7c619951; all numbers BAL, law 4; same rule for her and every NPC, law 1)
1. (A) BAR-TIED CEILINGS `BAL.stp.bar` {sung f s, danh f d, m 8 (MAIN 164: was 6), x 0, top 100} — jstatpace spCeil(rk,k)/spTop: Sủng/Danh ceiling = NEXT rank's bar + 8; they land just at the bar (robot: +1…+6 at promotion vs LIVE +14…+90).
2. `BAL.promo.gap` [2,2,3,4,6,8,10,12] (jpromo; j8 promoGap reads it — was typed [3,3,3,5,7,9,11,13]; high ranks per MAIN 164).
3. (D) `BAL.ex.bar` [22,25,28] → [21,26,30].
4. `BAL.qBlock` {after 6, ease 5} — j8 qBlockAt: the Hoàng hậu block bar (BAL.qBlockHh −40) eases 5 per month waited past 6 months since the last decree (MAIN 164; was a 2–4-year stall at Quý nhân).
5. Emperor natural death RARE + WIDE `BAL.mort.life.dice.emp` {70, 18, 30–95} (owner ~21:20Z; natural death within 10/15/20/25 y of reign 1/3/6/10 %). Reign end = REIGN-END worker (session_01Rc5AsKDTgMubUASiLMBaba) builds events + removes her age-40 end — NOT here.
6. Sắc · Tài · Tâm cơ through stat-pace (sếp FINAL ~23:24Z): SP_K + `BAL.stp.abs` {pow 2, min .15} against 100, band [2,5,8], no rank ceiling, never taken away. statpace-scan.py covers them (new raw-rise sites = wear-bonus builders b.sac only).
7. PROPORTIONAL ADJUSTMENT AT EACH PROMOTION (owner ~23:35Z): `BAL.stp.scale` {t .85, keys danh/duc/sung per NEW rank group (T = ceil[rank]×.85, Đức ≥ floor 80, Danh/Sủng ≥ next bar), pal sac/tai/tamco palace-wide T = tq 85}; top > T → all × T/top (order + ratios kept). jstatpace spScaleAt; hooks promoteP / exDirectUp / exGraceUp (line on the decree text) + a rank watcher at render (other roads: geRank in jge, story decrees). Gate scan dev/measure/scale-gates.py: highest gates Sắc 80 / Tài 70 / Tâm cơ 60, 0 above T.
DROPPED on owner/MAIN word (all code removed): zero-choice card trim (jtrim), Emperor curve 36/7, fixed 3-month exam rhythm, monthly drift / monthly rescale.
Tests: dev/test/pace-speed.js (gap, qBlock, abs pace, promotion adjustment, Emperor curve) PASS · dev/test/stat-pace.js PASS (on the A/D build; rerun on tip) · gates: statpace-gates.py (bar rule: 67 low-rank gates rank-tied = ruling A, prefix-only) · scale-gates.py exit 0.

## Robot measure (dev/measure/pacespeed.js + pacespeed-sum.py)
(tables below)

Tools: dev/measure/pacespeed.js (one life per seed to the ending or cap; promotions with stats vs bar, taps by source, monthly stall cause, months to 70/80/90, yearly same-rank mean) + pacespeed-sum.py (calibration LIVE = 30 real min / game year from M5b ~25 + M2 40–45; «Ra ngoài khi mặc trung y?» bot artefact removed) · dev/measure/artpace.js (art pace family, ready, not run).

### Results so far (3 lives each, ≤240 mo, 60-min cap)
| arm | min / game yr | ended | first ending m · h | ≤ 4 h | to Hoàng hậu (h) | waiting at top (h) |
|---|---|---|---|---|---|---|
| LIVE f573dc94 | 30 | 1/3 | 85 · 3.9 | 1/3 | never · 3.4 · 3.2 | – · 3.7+cap · 4.2+cap |
| LIVE 504d2e6a | 30 | 1/3 | 138 · 5.3 | 0/3 | (in live5.jsonl) | |
| branch (A+D, rare Emperor; before m 8 / gap / qBlock) bc3cb096 | 28 | 1/3 | 37 · 1.6 | 1/3 | never · 3.3 · 2.5 | – · 4.7+cap · 5.1+cap |
Per rank months LIVE → branch: Thường tại 4 → 2 · Quý nhân 32 (Tần seats full) → 3.5 · Tần 7 → 7 · Phi 8 → 7.5 · Quý phi 9 → 9 · HQP 3 → 6. Stats at promotion vs bar: LIVE +14…+71 → branch +1…+6.
Stall months by cause (below Hoàng hậu): LIVE seat 31–46 · gap 25–27 · qBlock 0–9; branch stat 16–44 · gap 10–44 · qBlock 0–10 · seat 0–9 → MAIN 164 ruled m 8, gap [4,6,8,10], qBlock ease (built).
Reign length: PENDING REIGN-END (with the rare natural death most lives run to the cap; «her end at 40» = obsolete).

## HANDOVER (for the successor; MAIN opens it)
STATE: branch review/pace-speed 7c619951 pushed. Robots that were running in my container (results NOT in git): br5 = branch before the promotion adjustment (49159ddd build) · br7 = tip 7c619951 · live6 = LIVE 504d2e6a with the new 70/80/90 tally. The successor must RERUN in its own container:
  `PAR=3 CAP=3600 node dev/measure/pacespeed.js <live index.html> 3 240 0 > live.jsonl` and the same on the branch build (dev/index.html after `python3 dev/build/assemble.py`), then
  `python3 dev/measure/pacespeed-sum.py LIVE=live.jsonl BRANCH=br.jsonl` (+ a small script over ps.reach for «months to 70/80/90 per stat»).
TODO in order: (1) robot table LIVE vs tip: min/game yr, per-rank months, stall by cause, months to 70/80/90 for all six stats (target: focused year ≈ +20–25 from 50; 80 → 90 ≈ 3 y — tune BAL.stp.abs pow/min if off) → MAIN 166; (2) `bash dev/tools/quickcheck.sh HEAD --runs 3` (needs a quiet CPU; my run was stopped) + dev/test/stat-pace.js on tip → RV READY to RV-163C session_01Rc5AsLFUVRepsLs2do3jnh; (3) art-pace family (MAIN 164): `node dev/measure/artpace.js <page> srv|consort 3 36` LIVE → find the cnv duty-act source of fast Y thuật (TITLE-BAL review/title-bal 3f8eb36a «FINDING for MAIN») → BAL-only proposal per road so top bậc = a life's effort; table LIVE vs branch.
NOTE: inpage6 bot overrides render(), so in robot runs the render watcher of item 7 does not fire (decree roads still do). The branch is on lc24-sp (stat-pace) which is not LIVE yet — the lander stacks it after lc24-sp.

