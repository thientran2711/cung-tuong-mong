# REPORT cal-p2 — wk cal-p2 #1 (session_01Rc5AsHjxvLYP1FYexFncti) + #2 (session_01Rc5AsMmEgNigPGpiup9uKs) — DONE (proposal awaits owner)
PRIORITY #1 CHECK: OD L1990–2034 + brief sections 05:35Z…08:35Z | main eb056f7b: jmgcal.js (cal.k one profile), jmgt mgTier/mgLev/mgGrade, BAL.mgTier kAdj/kG/lev, BAL.slap, mg-bots.js | review/* mg-fair-hands 3fe87277 (read only, NOT merged), review/cal-p2 445bcaeb | claims: cal-p2 only.
Foreman: C-AG #28 session_01Rc5AsLarKgavDpQSsAHHYB (was #27). Branch review/cal-p2.

## STATE (wk cal-p2 #2, session_01Rc5AsMmEgNigPGpiup9uKs, 20/11)
- (1) Đầu hồ owner-bug DONE on review/cal-p2 445bcaeb (fix 6e456cf8 + merge of LIVE main eb056f7b). Sent C-AG #28 "SẴN SÀNG dauho 445bcaeb". Detail §D.
- (2) ONE numbers proposal DONE below: §A (ban/tat/ne/dauho), §C (one table, all 26 counted kinds), §E (identity result bonus + NPC + mg-fair-hands + sample contests), §F (expert verdict on MAIN 08:35Z). PROPOSAL ONLY — no BAL lands without the owner's OK (via ROOT-74).
- Player-2 profile (first brief) stays reverted (c29a7708). review/cal-p2 has no other game change than the Đầu hồ fix; mg-bots env knobs (0101f61f) are tool-only.

## HANDOVER
Nothing left for this worker after the two SẴN SÀNG messages. If the owner OKs §C/§E: one worker writes the BAL keys listed in §C/§E on review/cal-p2 (BAL only, law 4), adds the per-kind board test (bot-check each E row, n≥20/cell), re-measures BAL.slap.dodgeOdds after the ne change, and the NPC side of §E goes into review/mg-fair-hands (law 1). Scratch sims (may be wiped): /tmp/claude-0/…/scratchpad/{fling.js,tim.js,cont.js}; all numbers copied below.

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

## A — dauho / tat / ne / ban (analyst A, measured on 2ec6062e-equivalent engines; scratch p2a_*, an.js, run.sh, fl.js)
### A1 Đầu hồ = BUG, READY TO BUILD (lands alone)
- LIVE engine = "fling" (j91.js:312-314 Object.assign overrides j82:20 "aim"; all.js 28456 vs 27606). Bắn cung is ALONE on kg82Aim → NO shared engine / knob: the dauho edit cannot touch Bắn cung.
- Why unplayable (j91.js:70-104): physics throw flies 0.7–1.9 s but aim dots show only lev.dauho.aid 0.14–0.45 s (≈0.24–0.44 s on her calibration eases 4.8→1.6) → she never sees the landing; q=1 zone ±0.025·U·mouth ≈ ±8 px on phone; pull factor K=5.4 (1 px error ≈ 6 px landing); new wind + pot each throw. Real fault.
- Her-bot: MGBOT_PX=.2 reproduces her 1.1 (1.13, SD5 .51, n=16/board). Trained bot 7.1 only via oracle pull.
- EDIT (jbal2.js:254, BAL.mgTier.lev): dauho:{aid:[.14,.45],mouth:[.8,1.3]} → dauho:{aid:[.6,3.0],mouth:[1.4,2.2]}; kAdj.dauho stays 1.2.
  her-bot d=-2..2 before 1.4/1.2/0.8/0.8/1.0 base 1.1 SD .5 → after 8.6/7.6/6.9/6.9/5.4 base 7.1 SD .6 (law 5 kept: both levers rise with ease; ease 0 dots still only .6 s). Variants: aid[.35,2]+mouth[1,1.6]=4.6; aid[.5,2.5]+mouth[1.2,1.8]=6.0; aid[.5,2.5]+mouth[1.6,2.6]=6.8; for ≈7.5 try aid [.7,3.5] same mouth (not measured).
- MUST GO WITH: (1) BAL.ag.mg2.cal.k.dauho b 1.1 was taken on the broken board → NPC band lo 1/hi 4.1 vs her ≈7 now: REMOVE the entry until her re-test (NPCs fall back to default 3/9.5) or put a temporary 7.1 — recommend remove (first-try rule: her re-test on the fixed board = her first valid try; ask MAIN). (2) Pot picture is mouth-sized (w = 2·mh/.42): at mouth 2.2 ≈ .52·U wide vs .31·U; on portrait phone a pot at x=.82·W can overflow the right edge ≈8 % (picture only) → LOOK on Fold 755x1000 + iPad 1180x820; if bad use mouth [1.4,1.9] + longer aid. (3) Oracle bots now hit 9.5–9.9 (bot shrinks scatter .1/aid, too kind) — trust the her-bot.
- Optional later (typed in j91): wind H*.55 (l.72 setThrow), K=5.4, EAR=1.6, mouth base U*.05 (l.71-72).
### A2' tat / ne / ban (proposal only; target her base 7–8)
- Her-bot tat/ne: MGBOT_AIM=70 (one value both kinds) → tat 5.09 analytic/5.16 bot (her 4.9), ne 4.04/3.64 (her 4.1): a normal adult with ≈±70 ms timing error on a fast needle (trained ±40). Skill: anticipation timing; needle 1.4–1.75 s (BAL.slap.bar.w / dodge.w); ban same skill on a slower marker (3.0 s → 1.8 s over 6 shots, j82:314), no time limit → explains 9.1 vs ≈5 with one hand. Sources: Williams 1985 https://informahealthcare.com/doi/full/10.1080/00222895.1985.10735357 · life-span timing https://informahealthcare.com/doi/abs/10.1080/03610738008258380 · Thompson 2014 https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3981764/ · touch latency https://pubmed.ncbi.nlm.nih.gov/35953659/
- Minor faults: tat red window ±9–20 ms on her boards < one 60 fps frame (16.7 ms), tap read at handler time (jslap.js:62) → "nặng" partly luck; ne = one tap scored 10/0 → 5-round SD ≈2.1 (her 4.1 vs Kingston 2.1 = one tap).
- tat: BAL.slap.bar (jbal2.js:493) redMs [8,11,14,18,22,28]→[28,38,49,63,77,98], amberMs [40,50,58,66,76,88]→[76,95,110,125,144,167] → her-bot 5.2→7.3 (analytic 7.65; rounds 8.9/7.9/7.2/6.1/6.0; SD5 1.2). Means more "nặng" slaps in play.
- ne: BAL.slap.dodge.safeMs (jbal2.js:494) [20,28,36,45,55,66]→[45,63,81,101,124,148] (×2.25) → ≈7.5 analytic (rounds 9.0/8.3/7.5/6.6/5.4; SD5 1.9); bot-checked ×2.5 [50,70,90,112,138,165] = 8.2.
- With tat/ne: re-measure BAL.slap.dodgeOdds [75,55,35] (Né card odds; her Vừa rate ≈39 % today) and BAL.ag.mg2.tat (NPC slap tiers); her cal tat 4.9 / ne 4.1 need a re-test.
- ban: BAL.mgTier.kAdj.ban 3 → −0.5 (today kAdj 3 clamps rounds 1–3 to ease 5 = identical) → eases 3.1/2.3/1.5/0.7/−0.1, her 7.9 (analytic ±45 ms fit to her 9.07; rounds 8.6/8.3/7.9/7.4/6.8; SD5 ≈.4). Alt kAdj 0 → 8.15; kAdj 0 + kG.ban .8→1 → 7.7. mg-bots cannot anticipate on ban (7.2/8.0/8.8 avg/trained/master < her) → analytic. Her ban b 9.1 needs re-test.
| kind | her (K) | skill | fault | knob before→after | her-bot base before→after | SD5 |
| dauho | 1.1 (1.7) | fling aim+power, wind, landing unseen | UNPLAYABLE | lev.dauho aid [.14,.45]→[.6,3.0], mouth [.8,1.3]→[1.4,2.2] | 1.1→7.1 (bot PX .2) | .6 |
| tat | 4.9 (6.1) | anticipation timing, fast needle | minor (sub-frame red) | slap.bar redMs ×3.5, amberMs ×1.9 | 5.2→7.3 (bot AIM 70) | 1.2 |
| ne | 4.1 (2.1) | anticipation timing, 1 tap 10/0 | minor | slap.dodge.safeMs ×2.25 | 4.0→≈7.5 (analytic; ×2.5 bot 8.2) | 1.9 |
| ban | 9.1 (9.3) | anticipation timing, slow marker | ease-5 clamp rounds 1–3 | kAdj.ban 3→−0.5 | 9.1→7.9 (analytic) | .4 |
Kingston: every gap to her is inside one 5-round try's noise. Uncertainty: dauho after rests on a scatter model (her re-test is the check); ban analytic; bot cells n=16–30 (±.3).

## A3 — independent cross-check of §A by worker #2 (own timing / fling models, not analyst A's scripts)
Engines: ban = j82 kg82Aim (needle swing, tap on centre; q by distance ÷ mgTol); tat / ne = jslap kg82SlapBar (ONE tap; time windows in ms from BAL.slap.bar / .dodge, indexed by ease 0..5); dauho = j91 k91Fling (drag-throw; NOT the aim engine — see §D).
Method: timing model = tap error N(0, σ) ms on a predictable crossing (coincidence-anticipation timing); her cal base = mgCalBase over the ladder d −2..2 (ease = 2 − .8d + kAdj), 20k draws/cell. σ fitted to HER first tries: tat σ≈70 ms → 5.07 (her 4.9), ne σ≈70 → 4.02 (her 4.1), ban σ≈45 → 9.09 (her 9.1). One σ explains both slap boards (same single-tap feel); ban is lower (6 shots of a steady swing = warm-up inside the game). Adult CAT error SD 20–50 ms in the lab (Bard et al. 1990; Lobjois et al. 2006 age effects), + touchscreen latency jitter + a first try → 70 ms is plausible.
| kind | her | skill | knob before → after (BAL) | her base before → after | M/E |
| ban | 9.1 | anticipation timing | kAdj.ban 3 → 1.5 + kG.ban .8 → 1.3 | 9.09 → ≈7.8 (kAdj 1 → 7.63; hard end ease 0 ≈5.4) | M (model) |
| tat | 4.9 | single-tap timing | BAL.slap.bar.redMs [8,11,14,18,22,28] → [22,30,38,49,59,76], amberMs [40,50,58,66,76,88] → [68,85,99,112,129,150] (×2.7 / ×1.7) | 5.07 → ≈7.1 | M (model) |
| ne | 4.1 | single-tap timing | BAL.slap.dodge.safeMs [20,28,36,45,55,66] → [40,56,72,90,110,132] (×2) | 4.02 → ≈6.9 | M (model) |
| dauho | 1.1 (broken) | drag aim + judgement | BUG FIX landed on review/cal-p2 (§D) | 1.3 → ≈7.6–7.8 | M (model) |
Agreement with analyst A (§A): same engines found (dauho = fling, Bắn cung alone on kg82Aim), same σ ≈70 ms for tat/ne and ≈45 ms for ban, same knob directions and sizes within the target difference (A aimed 7.3–7.9 flat; §C aims the keep-order band, so tat/ne/ban get slightly smaller easing here). Two independent models agreeing = the E→M upgrade for these four rows.
Side effect: BAL.slap.dodgeOdds [75,55,35] (the odds word on the "Né đòn" card = measured dodge rate) must be re-measured after the ne change (one core: the card must read the new board). tat/ne also drive NPC slaps (raw per tier) — same table, law 1 kept.

## C — THE ONE NUMBERS PROPOSAL: one fitted board per kind (26 counted kinds)
TARGET (owner 08:30Z "vừa với cái tay của tôi … đừng có khó quá cũng đừng dễ quá" + brief "her strong-vs-weak order preserved" + MAIN 08:35Z "7–8, not 10"): KEEP-ORDER BAND T = 7.0 + (b − 4.1)/5.9 → her weakest kind (ne 4.1) sits at 7.0, her best (10) at 8.0, every kind in between keeps her order. Why a band and not flat 7.5: flat 7.5 erases who she is (Cờ = Né); 7–8 keeps every game "playable, not too easy" and leaves room for +2 (8 + 2 = 10, the cap) and for −1/−2 (7 − 2 = 5, still placing — owner 06:35Z).
Knob rule: §B / §A knobs were sized for ≈7.5; for T ≠ 7.5 add Δ kAdj ≈ −(T − 7.5) × 1.0 per kind where kAdj bites (≈1 play point per ease unit near the matching board, mgMedD slope); for kinds where only kG / lev bite, the §B value is within ±.5 of T (inside one-try noise SD .3–1.4) → keep.
| kind | her b | T | skill | board knob (BAL) | est. her base after | M/E |
| may | 10 | 8.0 | fine trace | kG.may .82 → 1.8 | ≈8.0 | E |
| td_cong | 10 | 8.0 | fine trace | lev.td_cong.tol [.0075,.028] → [.005,.016], kG 1.3 → 1.8 | ≈7.9 | M |
| doden | 9.9 | 8.0 | visual search + speed | lev.doden.fast [.05,.175] → [.03,.11] | ≈8.0 (bot slower than her; re-test) | E |
| le | 9.9 | 8.0 | search + speed | lev.le.fast [.075,.25] → [.04,.13] | ≈8.0 | E |
| kinh | 9.9 | 8.0 | fine trace | kG.kinh .9 → 1.8 | ≈8.0 | E |
| co | 9.7 | 7.95 | reading + speed | kAdj.co −1 → −1.6, lev.co.lim [8000,20000] → [6500,20000], lev.co.extra [5,0] → [6,0], kG.co 3 → 4 | ≈8.1 | M |
| theu | 9.7 | 7.95 | spatial memory | typed R0/SHOW/LIM (j82:258) → BAL.mgTier.lev.theu {show:[1500,2700], add:[2,0]} (law 4 fix too) | untestable by bot → her re-test | E |
| ve | 9.5 | 7.9 | fine trace | kAdj.ve −1.6 → −3.6 | ≈7.9 | E |
| tc | 9.5 | 7.9 | logic + speed | lev.tc.fast [.05,.175] → [.035,.12], kAdj −1.2 | ≈7.9 | E |
| xa | 9.5 | 7.9 | logic + speed | lev.xa.fast [.05,.1] → [.035,.07], kAdj −1.2 | ≈7.9 | E |
| td_hanh | 9.3 | 7.9 | counting under time | kAdj.td_hanh −1.4 → −2.6 | ≈7.9 | E |
| doi | 9.1 | 7.85 | matching + speed | kAdj.doi 0 → −1.2, lev.doi.fast [.05,.425] → [.05,.25] | ≈7.9 | E |
| ban | 9.1 | 7.85 | anticipation timing | kAdj.ban 3 → 1.5, kG.ban .8 → 1.3 | ≈7.8 | M |
| tho | 8.7 | 7.8 | fine trace | kAdj.tho 0 → −.7 | ≈7.8 | E |
| thq | 8.5 | 7.75 | — | kAdj.thq 0 → −.5 | ≈7.8 | E |
| dan | 8.3 | 7.7 | rhythm timing | kAdj.dan 0 → −.4 | ≈7.7 | E |
| hat | 8.1 | 7.7 | hold timing | kAdj.hat 0 → −.3 | ≈7.7 | E |
| hoa | 7.9 | 7.65 | arrangement | keep | 7.9 (in band) | – |
| duho | 7.9 | 7.65 | — | keep | 7.9 (in band) | – |
| kim | 7.7 | 7.6 | — | keep | 7.7 | – |
| td_ngon | 6.7 | 7.45 | reflex | kAdj.td_ngon −.9 → −.2 | ≈7.4 | E |
| mua | 6.3 | 7.35 | sequence memory + beat | kAdj.mua 0 → +.7 (alt lev.mua.beat [1300,2600]); cue-gap fix first (§B) | ≈7.4 | E/M |
| banh | 6.1 | 7.35 | lag control | kAdj.banh −.1 → +.5 | ≈7.35 | E |
| tat | 4.9 | 7.15 | single-tap timing | BAL.slap.bar redMs ×2.7, amberMs ×1.7 (values §A) | ≈7.1 | M |
| huong | 4.5 | 7.05 | colour judgement (REAL FAULT) | kG.huong 3.65 → 1.0 + «khớp» word thresholds to BAL (.32·mgTol) | ≈7.1–7.4 | M |
| ne | 4.1 | 7.0 | single-tap timing | BAL.slap.dodge.safeMs ×2 (values §A) | ≈6.9 | M |
Not counted (broken / re-test first): dauho (fixed §D, re-test), td_dung 0.3, chai 4.9, den 4.7, hoadien 5.5 → same band rule after her re-test.
Law 5 (harder as she climbs) untouched: every knob above moves the matching-board point only; ease still falls with d = stake − lv (BAL.mgTier mid/slope), every lev pair still runs hard → easy.
Cờ 9.7 explained (§B): board shows rounded RAW points, result shows GRADED; real fault = scoreboard/result mismatch in every j82/j91 engine → separate family fix (show the graded score in play).

## D — Đầu hồ owner-bug fix (LANDED on review/cal-p2 445bcaeb, awaiting reviewer)
Engine: j91 k91Fling (drag back, release; wind changes each throw). Bắn cung = j82 kg82Aim → no shared knob; the fix cannot touch Bắn cung (test proves it).
Cause (measured with a copy of the engine physics, canvas 700×430 = Fold / iPad): the aim dots showed only .14–.45 s of a 1.0–1.3 s flight, so she never saw where the arrow comes down; and 1 px of drag moved the landing 7–13 px against a ±9–12 px full-marks half-mouth (±17–24 px for any score). The skilled oracle bot (knows the landing) got 6.7 at d=0; a human cannot.
Fix (BAL only): BAL.mgTier.lev.dauho aid [.14,.45] → [.6,2], mouth [.8,1.3] → [1.3,2.1], NEW pull [.8,.6]; k91Fling K = 5.4·pull and MAXD = .45U/pull (strongest throw unchanged). Law 5: ease 0 = .6 s dots, mouth 1.3, pull .8 (touchy); ease 5 = full path, mouth 2.1, pull .6.
Human model (release jitter 2.5 px + landing judgement error 200 px per unseen second + 4 px reading; calibrated to her 1.1 on the old board): ease 4.8/3.2/1.6/0 before 1.8/1.3/1.0/0.9 → after 8.9/7.8/5.2/2.5 ⇒ her matching base ≈7.6–7.8 (target band 7–8). Oracle bot (mg-bots skilled n=12): before 8.2/6.7/5.4/3.6 → after 9.9/9.4/9.7/8.9 (playable).
Test dev/test/cal-dauho.js: kg82Aim source, KG82_KIND.ban, ban BAL knobs, mgTier("ban").ease for 5 occasions × 8 ranks × 6 levels byte-identical to main; dauho knobs + law 5 direction. Pot picture (analyst A caution: picture width = 2·mh/.42): measured in the built game, worst pot position (x = .82·W) at the easiest board (mouth 2.1): Fold 755×1000 canvas 681 px → pot right edge 666; iPad 1180×820 canvas 609 → 607; matching board (1.81) Fold 651 → inside on both primary devices (phones play landscape, rot.js). cal.k.dauho b=1.1 kept in this branch: it was taken on the broken board, so until her re-test NPC dauho hands centre low (band lo 1 / hi 4.1). Analyst A recommends REMOVING the entry until her re-test (NPCs fall back to the default band) — a BAL data call for MAIN/owner (first-try rule), not made by this worker.

## E — identity changes the RESULT (owner 08:30Z), NPCs the same (law 1)
BAL knob (one core): BAL.orig.res = {tr:2, doan:-1, doan2:-2, lo:0, hi:10} — final score = clamp(graded play + bonus, lo, hi); bonus = tr when the kind's art is a SỞ TRƯỜNG of her current identity (BAL.orig.art on mg-fair-hands, main road/side road), doan for her 1st sở đoản, doan2 only for an identity whose story says she truly cannot (rare). Kind→art map from §A2 (ve/theu/kim/hoa→hoa; dan→cam; co/dauho→ky; tho/doi/doden→thi; mua/tat/ne/ban→vu; huong→y; banh→y/nau).
Sở đoản lists: §A2 list stands (2 untrained arts per road, never a strong art of that road), now read as a RESULT malus instead of a negative bậc / eased board. Slow study in a weak art (owner 07:15Z): BAL.orig.doan.study .5 (lesson gain multiplier) — hook still to trace.
NPCs: the same BAL.orig.res on mgNpcRaw's result by their upbringing (mgOrgLv roads); under 08:30Z the mg-fair-hands upbringing lift (board d + hand.art .2) should become this result bonus so both sides use ONE mechanism (law 1) — a change for review/mg-fair-hands when it lands.
mg-fair-hands combination (§A2 finding kept): centre NPC hands on 7.5 (the matching-board adult), NOT on her b — after §C her b sits at 7.0–8.0 anyway, so the two now nearly coincide and her order is kept by the band, not flattened.
CONTEST SIM (6 entrants; her play = T + N(0,1.2) + bonus; NPC = 7.5 + third offset (±.5 / +.5..2.5 / −.5..2.5) + N(0,1.2) + their own identity (+2 p .30, −2 p .15); 40k runs). P1st / Ptop3 / mean place:
| her board T | sở đoản −2 | sở đoản −1 | ordinary | sở trường +2 |
| 7.0 | 0/5/5.3 | 1/14/4.8 | 3/32/4.1 | 25/76/2.6 |
| 7.5 | 0/9/5.1 | 2/22/4.5 | 6/43/3.7 | 33/84/2.3 |
| 8.0 | 1/15/4.8 | 3/32/4.1 | 10/55/3.3 | 43/90/2.0 |
(without NPC identity bonus: +2 → 37–58 % first, 83–95 % top 3.)
Samples per identity (T from §C; trường +2, đoản −1):
| identity | ve | co | dan | mua | tat |
| ch_ho (trường ve dan mua tat) | +2 41/89 | 0 10/53 | +2 37/87 | +2 31/82 | +2 27/79 |
| td_ke (trường ve co dan; đoản mua tat) | +2 41/89 | +2 42/90 | +2 38/87 | −1 1/20 | −1 1/16 |
| tt_co (trường co dan; đoản mua tat) | 0 10/53 | +2 42/90 | +2 38/87 | −1 1/20 | −1 1/17 |
| dtq_bien (trường co mua tat; đoản dan) | 0 10/53 | +2 42/90 | −1 2/26 | +2 31/82 | +2 27/78 |
| cnv_mat (trường mua tat; đoản co) | 0 10/53 | −1 3/31 | 0 8/48 | +2 31/82 | +2 28/78 |
Read: every life plays differently (td_ke wins the arts, loses the dances; dtq_bien the reverse). Sở trường ≈ a top-3 nearly always and a win 1 in 3 — not "sure" while 1/3 of NPC hands are better and 30 % of NPCs also have that art as a strength (law 1). If she wants "≈ sure win" in sở trường: tr 3 (→ ≈55 % first, ≈95 % top 3) — her call, not ours. Sở đoản −2 gives ≤1 % first / 5–15 % top 3 = breaks 06:35Z ("không có nghĩa rằng là tôi cứ thua hoài"); −1 keeps a top-3 1 time in 5 → recommend −1 as the default.
Still open (from §A2): startContest total = talent + raw×3 lets talent dominate and ignores NPC upbringing (law-1 gap) — separate fix, not in this package.

## F — expert verdict on MAIN's 08:35Z view (law 8)
(1) "Tune each board so her usual score is ≈7–8, not 10" — AGREE. Flat bonuses only mean something when the base sits mid-range and well below the cap: D&D 5e "bounded accuracy" keeps targets mid-range so a +2 always shows (Mearls/Crawford, PHB 2014 design notes); learning research puts the best challenge near 80–85 % success (Wilson, Shenhav et al., "The Eighty Five Percent Rule for optimal learning", Nature Communications 2019; flow channel, Csikszentmihalyi 1990; Hunicke 2005 dynamic difficulty). With base 10, +2 is fully eaten by the 0–10 clamp; with base 8 the average loss is ≈.5, with 7.5 ≈.25. Refinement: a 7–8 band that keeps her order (§C), not one flat 7.5.
(2) "Sở trường +2 / sở đoản −2 on the RESULT, shown as a small seal line" — AGREE on the result + the visible line; DISAGREE on symmetric −2. Players accept modifiers they can see (XCOM shot breakdown, Civilization combat preview, Disco Elysium check tooltips list every +/−); a hidden −2 reads as a broken game. Losses weigh about twice gains (Kahneman & Tversky 1979, prospect theory), so −1 already feels as strong as +2; the sim shows −2 leaves ≤1 % wins, against her 06:35Z words. → sở trường +2, sở đoản −1 (−2 only for a story-level "cannot"). The line must be cổ trang words from the kit result row (e.g. «Sở trường: thêm 2 điểm» / «Sở đoản: bớt 1 điểm»; numbers of points are allowed, no %), via the existing kit result rows — no new part.
(3) "Optional: a little extra time / tolerance for sở trường, less for sở đoản" — DISAGREE (park it). It double-counts the same strength (+2 AND an easier board), contradicts her own 08:30Z line "identity changes the RESULT, not the board", hides the size of the effect (players cannot read a 5 % wider window), and is a new feature under law 18. If she wants the strength "felt in the hands", the honest way is the visible +2 line at the end, plus the intro row naming the art as sở trường before play.
Summary for ROOT-74: boards → her band 7–8 keeping her order (§C, 26 kinds, BAL only, law 5 kept); result bonus BAL.orig.res tr +2 / doan −1 (doan2 −2 rare), clamp 0–10, NPCs the same (law 1); show the bonus as a kit result line; no board-feel option. Owner decides.
