# REPORT cal-p2 — worker wk cal-p2 (opus, session_01Rc5AsHjxvLYP1FYexFncti) — PARTIAL + HANDOVER
PRIORITY #1 CHECK: OD L1990–1999 + brief sections 05:35Z…08:35Z | main: jmgcal.js (cal.k one profile), jmgt mgTier/mgHand, BAL.mgTier kAdj/kG/lev, mg-bots.js | review/* mg-fair-hands (read only, NOT merged) | git grep lvStep / per-kind fit key: none | claims: this worker only.
Foreman: C-AG #28 session_01Rc5AsLarKgavDpQSsAHHYB (was #27). Branch review/cal-p2.

## STATE (05:59Z)
- Player-2 profile (first brief) was built and pushed (9144ec1b, 78d767f1), then REVERTED on review/cal-p2 (c29a7708) after the owner overwrite 05:35Z. No k2 / --p2 / co-op path anywhere.
- review/cal-p2 = LIVE origin/main 2ec6062e (merged, 399e81d4) + ONE tool-only commit 0101f61f: dev/measure/mg-bots.js env knobs MGBOT_AIM/THINK/SLIP/THINKD/SLIPD (defaults = adult skilled bot, unchanged). No game file changed.
- Methods followed in order as the brief changed: 05:35Z child ref → 05:45Z objective → 05:50Z marks → 06:00Z feel → 06:10Z adult scale → 06:35Z small easing → 07:05Z/07:15Z identity sở trường/sở đoản → 08:20Z 3 levels → 08:30Z ONE fitted board + identity ±2 on the RESULT (CURRENT). Target used: her base on the fitted board ≈ 7.5 (band 7–8, MAIN 08:35Z) so +2 is not eaten by the 10 cap and −2 leaves ≈ 5.5 (still placing).
- Đầu hồ (owner-bug, lands ALONE): NOT BUILT YET — analyst A's numbers pending (see §A when present). 

## HANDOVER (rollover at START_CTX 6 % + 25 % = 31 %; written at 28 %)
Next session (opened by the coordinator):
1. Fetch review/cal-p2 (sparse worktree), merge newest LIVE. Build Đầu hồ per §A (per-kind dauho BAL knobs; Bắn cung board unchanged; law 5 kept; target her ≈ 7.5 on the fitted board) + a test for both kinds (dauho playable for the default skilled bot; ban byte-identical board: compare mgLev/engine values for ban before/after). Run: assemble + build_site, mgcal-apply.test.sh, ag-mgcal, ag-mgh, ag-mg2, mg-skip (args: url 755x1000@1 outdir), slap-mg (url 755x1000@1 outdir), quickcheck. Pre-existing FAILs on main (shown same on main 2026-11-20): ag-mgh 7 "strong hands rare", ag-mg2 summons ×2, slap-mg fails ["marks"]; ag-mgh 4 is flaky (unseeded world; passed 3/3 reruns). Restore `_aa.html` if a test deletes it (tracked file). Then send C-AG #28 "SẴN SÀNG dauho <sha>".
2. Then finish the ONE numbers proposal (08:30Z): §B (fitted board per kind) + §A (tat/ne/ban) + identity ±2 on the result (BAL knob, e.g. BAL.orig.res={tr:2,doan:-2}, clamp 0–10, NPCs same) using §A2's sở đoản list + mg-fair-hands combination + sample contests; expert verdict on MAIN's 08:35Z view (point by point, law 8). Note A2 was done under 07:05Z (eased board); under 08:30Z the shift moves to the RESULT (+2/−2) — re-run its contest sim with ±2 on her play instead of the board lift (script /home/user/wt/cal-p2-out/idsim.js may be gone; re-derive).
3. Scratch (may be wiped): /home/user/wt/cal-p2-out/ (A2-identity.md, B-boards.md, c2_*, idsim.js, doan.js). Everything needed is copied below.


## B — one fitted board per kind (her base → ≈7.5, band 7–8), analyst B (tho/theu/mua/huong/banh/ceilings), M = bot-measured, E = estimate
Method: mg-bots.js on ladder d=-2..2 (hoc/0/2,hoc/0/1,hoc/0/0,hoc/2/0,hoc/4/0); raw float KG82.rawF re-graded with mgGrade + kind kG, mgMedD correction (med [[-2,8.9],[0,7.5],[2,5.8]]). Bots: trained = default; MASTER RT40 PX.010 AIM20 THINK250 THINKD450 SLIP.02 SLIPD.03; AVG RT110 PX.028 AIM65 THINK650 THINKD1250 SLIP.09 SLIPD.18. Her-bot = closest base; her after = her + her-bot delta. n=10–20/cell; SD = spread of one 5-round base. Scratch: /home/user/wt/cal-p2-out/c2_*, an.py, c2_tier.py, c2_sim.py.
Ease does not bite: co — mgLev clamps ease at 0 (jmgt.js:66) so kAdj moves ≤ −0.8; lever kAdj −1→−1.6 + lev.co.lim [8000,20000]→[6500,20000] + lev.co.extra [5,0]→[6,0]: MASTER 9.22→8.11; + kG 3→5: 7.19 (kG 4 ≈ her 8.1). doden — content tier-based, flat; only time part bites; lev.doden.fast [.05,.175]→[.02,.06] (E; milder [.03,.11] = −0.3 on MASTER); bot slower than her (8.4 vs 9.9). theu — flat for every bot (no memory model); real levers typed j82.js:258 (R0 [3,4,4,5,6], SHOW=2300+lv*160, LIM=9000) → propose BAL.mgTier.lev.theu {show:[1500,2700], add:[2,0]} (E, needs her re-test; Kingston 9.9≈her 9.7 supports ceiling). doi — saturates past d1.5; kAdj 0→−1.6 (≈8.1) + lev.doi.fast [.05,.425]→[.05,.2] (≈7.7, E). td_cong — lev.tol [.0075,.028]→[.005,.016] + kG 1.3→2: MASTER 9.79→7.33 (M).
huong 4.5 = REAL FAULT: board word «khớp» at dist ≤.05 (typed j91.js:301 .22/.12/.05) can still grade 2/10 with mgTol .4–.45 + kG 3.65 (kG set on an oracle bot; trained bot flat ≈8 = does not measure). Fix kG.huong 3.65→1.0: AVG (≈her 4.19) → 7.07 ⇒ her ≈7.4 (M); + move word thresholds to BAL scaled .32·mgTol. SD 1.0–1.4.
mua 6.3: trained 6.05≈her; kAdj 0→+.8 ⇒ ≈7.6 (E; keeps the 1-step retry at d=0, today retry 1→0 between d−1 and 0); alt lev.mua.beat [1000,2600]→[1300,2600] trained +.86 ⇒ ≈7.2 (M). Faulty input: cue lit SP·.72 ≈375–555 ms; repeated same-cushion steps dark gap only ≈150–215 ms → with dim cue two steps look like one (mg-visual fix may explain part; re-test after).
banh 6.1: kAdj −.1→+.7 ⇒ ≈7.5 (E, AVG curve 10/9.3/8.1/6.0/2.7); lag lever .6→.45 only +.3.
Cờ felt 10 → 9.7: scoreboard shows rounded RAW pts (j82 kg82Go Math.round(pts)/10) while the result shows GRADED round(10·(raw/10)^3) (kG.co 3); time part mgPace: on Khó Cờ ease 0 → 8 s limit, full marks need capture ≈0.8 s; capture at 1.5 s = raw 9.78 → board "10/10", result 9. Rounds 10,10,10,9,9 → b = mean(10−1.4, 10−.7, 10, 9+.85, 9+1.7) = 9.69 → 9.7 exactly. A perfect run CAN read 10 (all Khó captures ≤ ≈1.1 s) — cap not wrong, strict by design. REAL FAULT = scoreboard/result mismatch in every j82/j91 engine → code fix (show graded score during play, whole family), pair with any kG raise.
Contest: placing depends more on whether her b is in cal.k than on the board (main lacked mua/banh/huong; fair-hands only dan); under fair-hands unwritten kinds centre on bot median: banh P1 .02, huong .03, mua .12; with her b: P1 .13–.24, Ptop3 .50, mean place 3.5 by design; +.7 easing ≈ +.10 P1 before re-test.
Sources: Pagulayan 2006 https://pubmed.ncbi.nlm.nih.gov/16822742/ (Corsi span plateaus early adolescence) · Paramei & Oakley 2014 https://hira.hope.ac.uk/id/eprint/494/1/Paramei%20&%20Oakley_JOSA%20A%202014_Post-print.pdf (hue discrimination declines ~35–40) · Thompson 2014 https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3981764/ (in-game RT slows from 24) · Li et al. https://www.psychologicalscience.org/news/releases/playing-action-video-games-boosts-visual-motor-skill-underlying-driving.html
| kind | her | skill | knob before→after | her-bot base before→after | M/E | SD |
| td_cong | 10 | fine trace | lev.tol [.0075,.028]→[.005,.016] + kG 1.3→2 | 9.79→7.33 (master) ⇒ ≈7.5 | M | .15 |
| may | 10 | fine trace | kG .82→2 | ⇒ ≈7.7 | E | – |
| doden | 9.9 | visual search+speed | lev.doden.fast [.05,.175]→[.02,.06] | bot slower than her | E | .3 |
| le | 9.9 | search+speed | lev.le.fast [.075,.25]→[.03,.1] | – | E | – |
| kinh | 9.9 | fine trace | kG .9→2 | ⇒ ≈7.6 | E | – |
| co | 9.7 | reading+speed | kAdj −1→−1.6, lev.co.lim [6500,20000], extra [6,0], kG 3→5 | 9.22→7.19 (master) ⇒ ≈7.7 | M | .5–.8 |
| theu | 9.7 | spatial memory | typed R0/SHOW/LIM j82:258 → lev.theu {show:[1500,2700],add:[2,0]} | flat, untestable by bot | E | .4–1.2 |
| ve | 9.5 | fine trace | kAdj −1.6→−4.0 (or −3.2 + kG .9→1.5) | 9.44→≈7.7 (master) ⇒ ≈7.6 | E | .2–.5 |
| tc / xa | 9.5 | logic+speed | lev.tc.fast [.05,.175]→[.03,.1], lev.xa.fast [.05,.1]→[.03,.06], + kAdj −1.6 | ⇒ ≈7.8 | E | – |
| td_hanh | 9.3 | counting under time | kAdj −1.4→−3.0 | ⇒ ≈7.7 | E | – |
| doi | 9.1 | matching+speed | kAdj 0→−1.6 + lev.doi.fast [.05,.425]→[.05,.2] | 8.82→≈7.4 (master) ⇒ ≈7.7 | E | .2 |
| tho | 8.7 | fine trace | kAdj 0→−1.0 | ⇒ ≈7.6 | E | – |
| thq | 8.5 | – | kAdj 0→−.8 | ⇒ ≈7.7 | E | – |
| dan | 8.3 | timing | kAdj 0→−.6 | ⇒ ≈7.7 | E | – |
| hat | 8.1 | hold timing | kAdj 0→−.5 | ⇒ ≈7.6 | E | – |
| hoa/duho/kim | 7.9/7.9/7.7 | – | keep | – | – | – |
| td_ngon | 6.7 | reflex | kAdj −.9→−.2 | ⇒ ≈7.4 | E | – |
| mua | 6.3 | sequence memory+beat | kAdj 0→+.8 (alt beat [1300,2600] M ≈7.2) | 6.05→≈7.4 (trained) ⇒ ≈7.6 | E/M | .5–.8 |
| banh | 6.1 | lag control, timing | kAdj −.1→+.7 | 7.31→≈8.8 (avg) ⇒ ≈7.5 | E | .3–.5 |
| huong | 4.5 | colour judgement; faulty cue/grade | kG 3.65→1.0 (+ word thresholds to BAL) | 4.19→7.07 (avg) ⇒ ≈7.4 | M | 1.0–1.4 |
Caveats: bot has no memory span / colour model (theu, huong, part of mua uncertain); MASTER only a proxy (co, td_cong, ve, doi); all E rows need her re-test or a short bot run before BAL. tho/doi/doden/le/tc/xa/thq change content by tier (band 1.5) → kAdj response is stepwise.
Kingston side note: theu 9.9≈her 9.7 fits the ceiling; tho 7.1<8.7, mua 4.9<6.3 fit normal fine-motor/timing maturity.

## A2 — identity shift (sở trường / sở đoản) for her — proposal (analyst read origin/review/mg-fair-hands 3fe87277, not merged)
mg-fair-hands: BAL.ag.mg2.hand={on:1,w:4,split:[1,1,1],eq:.5,far:2.5,art:.2} (jbal2:1093); mgCalBand centre c = her b + w/2 (jmgcal:27); jmgt:98-110 hands = c + third offset (±.5 / +.5..2.5 / −.5..2.5, hash on name+kind, no top cap); jmgt:73 mgNpcRaw; upbringing jmgt:112-124: mgOrgLv = max start bậc of BAL.orig.art[origin][road] over the kind's arts; NPC level lp = max(own, upbringing) → (a) board d = stake − lp, (b) hand + hand.art(.2)×(lp − her level). mgOrgLv(S) hard 0 (her row copied to S.arts at new game, j2.js:22; old saves never).
Kind→art: ve/theu/kim/hoa→hoa; dan→cam; co/dauho→ky; tho/doi/doden→thi; mua/tat/ne/ban→vu; huong→y; banh→y/nau.
RECOMMEND (A) eased board = exact mirror of NPC upbringing (law 1): her level for mgTier + mgHandEff reference = max(own, identity bậc) (drop p===S→0). No new size key: bậc in BAL.orig.art (main 2, side 1) ≈ .7–.85 play pts/bậc (mgMedD slope) + .2 hand ≈ one grade step per bậc.
SỞ ĐOẢN: same table, negative bậc (e.g. tt_co:{ky:2,cam:2,thi:2,dung:1,nau:-1,vu:-1}); level = own + v (floor −2); size −1 bậc; slow study: BAL.orig.doan={study:.5} multiplier on lesson points in weak arts (hook NOT traced). NPCs same via mgOrgLv.
Proposed sở đoản (2 untrained arts, never a strong art of that road; script-checked 40 roads): tt nấu,vũ · dtq thêu,cầm · muối họa,vũ · cn kỳ,vũ · nc thi,thêu (nc_vuong thêu,hạnh; nc_tuc thi,cầm) · bd thi,thêu (bd_tuc thi,họa) · td vũ,nấu · ch nấu,thêu (ch_benh thêu,kỳ) · thd vũ,cầm · cnv thi,kỳ.
CONTEST SIM (6 entrants, her play = round(b+N(0,1.2)+mgMedD(stake−lv)−7.5); NPC per mgNpcRaw; NPC upbringing random by BAL.orig.ow; NPC own lv 0; 20–40k runs). Cells P1st/Ptop3/mean place at her level −1/0/1/2:
| kind (b) | centre = her b (mg-fair-hands as is) | centre = 7.5 (realistic adult) |
| ve 9.5 | 3/23/4.7 · 9/48/3.8 · 25/74/2.8 · 46/91/2.0 | 22/72/2.9 · 45/90/2.0 · 70/98/1.5 · 87/100/1.2 |
| co 9.7 | 2/14/5.0 · 6/36/4.2 · 17/64/3.2 · 34/86/2.4 | 17/65/3.2 · 36/86/2.3 · 59/96/1.7 · 80/99/1.3 |
| dan 8.3 | 2/20/4.8 · 7/44/3.9 · 20/70/3.0 · 42/89/2.1 | 5/37/4.1 · 16/64/3.2 · 36/85/2.3 · 60/96/1.6 |
| mua 6.3 | 2/19/4.8 · 7/44/3.9 · 20/70/3.0 · 41/89/2.1 | 0/5/5.5 · 1/17/4.9 · 6/40/4.1 · 18/67/3.1 |
| tat 4.9 | 2/20/4.8 · 7/43/3.9 · 20/70/3.0 · 41/89/2.1 | 0/0/5.9 · 0/3/5.6 · 1/12/5.1 · 4/31/4.3 |
Samples: ch_ho ve1 dan2 mua2 tat2 · td_ke ve2 co2 dan1 mua−1 tat−1 · tt_co co2 dan2 mua−1 tat−1 · dtq_bien co1 mua2 tat2 dan−1 · cnv_mat mua1 tat1 co−1.
ORDER: centre = her b FLATTENS her profile (≈7% 1st everywhere at lv0; identity alone decides: tat bậc2 41% beats ve 9%) → breaks 06:10Z. Centre = 7.5 KEEPS it (ve no match 45% 1st; tat bậc2 4%/31% top3; ve as weak art −1 still 22%/72%).
OPEN for owner: (1) band centre: per kind on realistic adult scale (7.5 / measured) vs her b — conflicts with her 01:10Z "1/3 equal,1/3 better,1/3 worse"; (2) startContest score = talent (9/bậc dan/ve/co/mua, 4 tat) + raw×3 → talent dominates; NPC talent ignores upbringing = law-1 gap in her favour; (3) sở đoản on vũ double-hits her weak reflex kinds → floor; (4) NPC own art lv assumed 0; (5) doan.study hook not traced.

## A — tat / ne / ban / dauho (analyst A): PENDING at 05:59Z (appended below when it arrives)
