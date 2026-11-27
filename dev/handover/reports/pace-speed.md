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

## PACE-SPEED-2 (session_01Rc5AsN2DLjhrFeTq7DV51d, 27/11 00:00–02:30Z) — branch review/pace-speed b7430190
PRIORITY #1 CHECK: OD 26/11 23:24Z / 23:35Z / 23:47Z / 23:55Z + «Ok làm chỉ số như khuyến nghị» | main LIVE 4cfcda61 | review/pace-speed 7c619951 | claims PACE-SPEED-2.
BUILT (owner 23:55Z confirmed row, CANON OVERWRITE of 23:35Z):
- ONE SOFT CEILING for the six (BAL.stp.soft; jstatpace spSoft → spTop 100): above the ceiling a rise × dm.min, never a hard stop below 100. Sủng/Danh = next bar + 8,
  Đức = rank ceil but ≥ floor 80, Sắc/Tài/Tâm cơ = 100. Curve = the approved example (a raw +8 is first cut by the existing size band, kept).
- Promotion adjustment REMOVED (spScaleAt, hooks, watcher, BAL.stp.scale, scale-gates.py).
- Sủng neglect fade (BAL.fade.sung {first 2, step 1, max 5}; month with no night: p.nightLog / p.empSeenW) + Sắc −1/yr from 28 (BAL.fade.sac); her + NPCs; queen rank exempt;
  her fade = Sổ ghi line «Lâu không được gặp Hoàng thượng (N tháng): Sủng a → b.» (result card kitWhy reads it). Old weekly −1 Sủng (j3/j75) = BAL.fade.sung.wk 0 (MAIN 167: keep 0).
- One-line player rule (owner wording) appended to the kit glossary meaning of the six stats (kitGlossText); CHANGE.txt line updated.
- Tâm cơ too fast (MAIN 167 flag): robot source tally (pacespeed.js ps.tsrc): card options («runOpt») gave Tâm cơ ~110 times / 40 months → BAL.stp.abs.tamco {pow 2, min .15, k .4}
  (k = share of a raw rise that counts). Robot after: +14–19 a year mid-range, 70 at m36 / m58 (before: 90 at m19–34; LIVE m12–15).
- Test family (stat-pace): title-sys gSung/gDanh/gTren/gHau/NPC gSung (one huge rise was cut by the band; Math.random pinned .5) → several in-band rises; title-sys2 Danh +danhG
  expects the paced spG; balance-core Tâm cơ +20 = stat-pace. NOT stat-pace (→ TITLE-BAL): title-sys «no dialog», «place/festival style name», «thai a,b»; title-sys2 «loss dialog:
  no item frame», random «hiệu not back» / «NPC lập công did not restore».
- Tests on tip: pace-speed.js PASS · stat-pace.js PASS (1 flaky FAIL under robot CPU load, 3 reruns PASS) · balance-core PASS · title-sys stat items PASS.
ROBOT (3 lives each, ≤240 mo, 60-min cap; raw jsonl not in git): months to 70/80/90 per life
| stat | LIVE 4cfcda61 | BRANCH (soft ceiling + fade; tamco k before the .4 tune) |
|---|---|---|
| Sắc | 40·1·1 / 76·1·1 / 85·1·4 (starts 61/100/100) | –·1·1 / –·7·1 / –·–·1 (starts 51/80/92) |
| Tài | 22·1·43 / 41·4·72 / 62·9·129 | 1·–·218 / 1·–·– / 3·–·– |
| Tâm cơ | 9·11·12 / 10·13·14 / 12·15·15 | 13·–·17 / 18·–·25 / –·–·34 |
| Đức | 58·22·55 / 67·30·65 / 83·53·94 | 14·13·18 / –·–·24 / –·–·60 |
| Danh | 54·16·51 / 65·22·64 / 76·28·76 | –·–·22 / –·–·36 / –·–·54 |
| Sủng | 52·14·34 / 60·22·57 / 73·30·66 | –·–·14 / –·–·19 / –·–·24 |
Lives: LIVE ended m112 Đại kết cục, m168 Mẫu hậu Hoàng thái hậu, cap m200 (to Hoàng hậu m78/m61/m110). BRANCH ended m19 Xuất gia, m18 Hồng nhan bạc mệnh, cap m229 (Hoàng hậu m75).
min/game yr LIVE 30 · BRANCH 31. Sủng after 3 / 6 months of neglect (her): 23 (Thường tại) · 38 → 54 (Quý nhân → Tần) · 67 → 72 (Tần → Quý phi); longest neglect run her 5–7 mo, NPC 10–17 mo.
Per rank months LIVE → BRANCH: Thường tại 23 → 3 · Quý nhân 6 → 3.5 · Tần 5 → 7. Stats at promotion vs bar LIVE +10…+36 → BRANCH +3…+14.

## HANDOVER (for the successor; MAIN opens it)
STATE: review/pace-speed b7430190 pushed (robot jsonl lost on rollover; rerun: `PAR=3 CAP=3600 node dev/measure/pacespeed.js <page> 3 240 0`, then
`python3 dev/measure/pacespeed-sum.py LIVE=… BRANCH=…`; per-stat 70/80/90 + neglect from ps.reach / ps.ng; Tâm cơ sources from ps.tsrc).
TODO: (1) quickcheck ×3 result → RV READY to RV-163D session_01Rc5AsMQU1ehAQ8bwbw6pWo + MAIN (see the last report line below if done);
(2) art-pace family (MAIN 164): `node dev/measure/artpace.js <page> srv|consort 3 36` LIVE → the cnv duty-act source of fast Y thuật (TITLE-BAL FINDING,
review/title-bal 3f8eb36a report line 51) → BAL-only proposal per road; NOT started.
(3) a full 3-life robot on tip b7430190 (Tâm cơ k .4 checked only with 2 × 40–60-month lives).
QUICKCHECK b7430190 --runs 3: open / old save / perf PASS (median new/live: render 224/234 ms, tab 582/637, buổi 1504/1315, tasks>200ms 32/28) · CORE GATE G4 80-dialog-fixed FAIL
«kit-dialog-2 a no empty Tốn / Được cell» at 755x1000 + 1180x820 — the SAME 2 FAIL on LIVE main 4cfcda61 (pre-existing, not this branch; kit-dialog owner). RV READY sent 27/11 ~02:45Z.
ROLLED (context) after RV READY: successor = TODO (2)(3) above.

## PACE-SPEED-3 (session PACE-SPEED-3, opened by MAIN 170 → MAIN 171; 27/11 03:00–05:00Z) — branch review/pace-speed 47bbe2e8
PRIORITY #1 CHECK ('Danh.*Đức.*(band|cao|high)|long life|stp\.(ceil|floor)|dm\.pow'): OD 7 | ledger 0 | claims 2 | main 12 (jstatpace/jbalsp LIVE stat-pace) | review/* 0 new | archive 3. START_CTX ~3 %.
JOB (OWNER OK 02:50Z via MAIN): do Danh and Đức still reach high bands in a long life? If not, tune BAL before RV-163E's final review.
1. RV-163E §1 (law 1) FIXED 47bbe2e8: jagmaid riseCore — an NPC maid now carries her servant Danh (staff record has none = 0) × BAL.danhG.srvRise exactly like the
   player maid, then the same D.danh (BAL.ag.maid.rise.danh 5). It kept her born Đáp ứng Danh ~8–10, and under the bar-tied soft ceiling (rank 0: Thường tại bar 10 + m 8 = 18)
   the same +5 counted 4 for her vs 5 for the player. No new number. role-parity.test.js on the branch: riseCore Danh 5 / 5 ✓; remaining 3 FAIL = LIVE baseline
   (gap set N-ONLY cx2:flat; drifting NPC act set born ["cx:mendGift"]; old-master ghen 4 vs 5 — the same on LIVE 17f23656 per rv-163e.md §1).
2. LONG-LIFE ROBOT (dev/measure/pacespeed.js, PAR 2, CAP 3600 s, ≤240 months, 3 lives each; raw jsonl not in git). LIVE = origin/main 17f23656, BRANCH = b7430190
   (life 3 of the branch ran on the 47bbe2e8 build; the fix touches only an NPC maid's Danh at her rise).
| life | arm | end | to Hoàng hậu (m) | Danh first 70/80/90 (m) | Đức first 70/80/90 (m) | Danh yearly at top rank | Đức yearly at top rank |
|---|---|---|---|---|---|---|---|
| 0 | LIVE | cap m227 | 114 | 99 / 104 / 110 | 103 / 107 / 120 | 89–96 | 86–91 |
| 1 | LIVE | m168 Mẫu hậu Hoàng thái hậu | 61 | 14 / 27 / 42 | 25 / 44 / 81 | 89–96 | 79–92 |
| 2 | LIVE | cap m236 | 56 | 12 / 17 / 29 | 12 / 31 / 47 | 83–100 | 85–93 |
| 0 | BRANCH | cap m236 | 83 | 65 / 81 / 87 | 13 / 58 / 68 | 74–99 | 84–91 |
| 1 | BRANCH | cap m234 | 69 | 28 / 69 / 73 | 15 / 62 / 76 | 84–99 | 86–93 |
| 2 | BRANCH | m238 Lãnh cung | 116 | 43 / 67 / 75 | 11 / 40 / 81 | 87–100 | 86–92 |
VERDICT: yes — on the branch Danh and Đức both reach 90 in every long life (Danh 90 at m73–87, Đức 90 at m68–81) and sit at ~87–99 / ~86–93 once she is
Hoàng hậu, the same band as LIVE (~90). The «~54–60» was MID-RANK Danh (ruling A: Danh ceiling = next rank's bar + 8, e.g. Quý nhân 38, Phi 63): Danh climbs with
the rank, not ahead of it. LIVE climbs Danh to 70–90 by m12–42 while still at Tần–Quý phi (the overshoot ruling A removed). Đức on the branch reaches 70 earlier
than LIVE (m11–15 vs m12–103). NO BAL TUNE (MAIN 171 accepted 04:14Z). Both arms keep dropping 7 → 6 → 7 at the top (same on LIVE; not this branch).
STATE: review/pace-speed 47bbe2e8 = RV READY to RV-163E (final BIG); reign-end 85791268 lands after it.
RESULT (27/11 06:11Z): RV-163E PASS d64f53cf (review/pace-speed-rv163e = 47bbe2e8 on LIVE 4cd3f974; title-sys merged with LIVE nn()/NN() counts). Nothing owed. PACE-SPEED-3 done.
