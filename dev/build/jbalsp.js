/* ================= jbalsp: BAL.stp + BAL.evc — STAT PACE and the DAILY BIG-EVENT CAP (owner OD 26/11 ~01:25Z «1 ngày ấp tới 1 đống sự kiện»
   and ~04:20Z «chơi mới được 1 năm trong game đã full 100 điểm toàn bộ … mà tôi còn đang ở bậc đáp ứng»; law 4 ONE CORE, law 5 harder as she climbs).
   sp = the ONE rule every RISE of Danh / Đức / Sủng / thiện cảm (Thái hậu th, Hoàng hậu hh, a person's rel / rl) / oán (oan / ro) goes through
   (jstatpace spG; funnels apply / ap / affAdd / oanAdd / spAdd), for her AND every NPC (law 1 two-way). A fall is never touched.
     band[k]  = size bands of ONE change: [small max, normal max, big max]; a raw rise above «normal» counts only by over (a share) and never
                passes «big» (kỳ ngộ «thiện cảm +30–40» → about +12).
     ceil[r]  = rank-linked ceiling (rank of the one who RECEIVES: her Sủng at her rank; a consort's thiện cảm / oán toward her at HER rank):
                a rise stops there; a value already above it (old save, after a demotion) is kept, it only stops rising. Each ceiling stays above
                what the next rank needs (RANKS[r+1].s / .d), so the road up never closes.
     dm       = diminishing returns: a rise × max(min, 1 − (now / ceiling)^pow); fractions carry over per person and stat (p.spc), nothing is lost.
     relOf    = thiện cảm / oán use the scale 0..100 of the positive side (rel −100..100: only the part above 0 is slowed). */
BAL.stp={on:1,
 band:{sung:[2,5,8],danh:[2,5,8],duc:[2,5,8],th:[4,8,12],hh:[4,8,12],rel:[4,8,12],oan:[4,8,12],ghen:[3,6,9]/* review/oan-pace-2: the size band of ONE jealousy cause (j1 ghenUp / pgUp via joanpace opBand; MAIN 163 21:09Z «ONE cap per stat = the stat-pace band»; not a paced stat of spG) */},over:.3,
 ceil:[45,55,65,75,85,92,97,100],
 dm:{pow:3,min:.15},
 /* floor[k] = the highest GATE of that stat the game asks at any rank (dev/measure/statpace-gates.py lists all 155 gates + ladder steps; it FAILs when a gate
    is above floor / ceiling): a rise slows to dm.min above the rank ceiling but only STOPS at max(ceil[rank], floor[k]), so no working
    rule closes at a low rank (Ẩn dật Đức BAL.route.anDuc, «Khách lạ ở chùa» Danh BAL.danhG.kcVihanh, Đức → Thái hậu BAL.ducLv.up, …).
    duc: «hiền đức» BAL.ducLv.word[3] 80 · danh: BAL.succN.rareCDanh 80 · sung: jpet 75 · th: netTh("th","than2") of the slowest archetype (Quyền uy 65; Thái hậu's own nết, ROW 9) · hh: jpet 60 ·
    rel / oan: BAL.net.thClamp top (than2 80) — a consort's liking / grudge toward her can still reach every net threshold (law 6). */
 floor:{duc:80,danh:80,sung:75,th:65,hh:60,rel:80,oan:80},
 /* PACE-SPEED (owner OD 26/11 ~19:10Z ruling (A): stats rise moderately and land JUST AT the next rank's bar, no overshoot far above it):
    bar[k] = a stat tied to the rank bars: f = the RANKS field (s Sủng / d Danh), m = margin above the NEXT rank's bar = this stat's ceiling at that
    rank (it replaces ceil[] and floor[] for this stat: a rise slows toward it); top = the ceiling at the top rank (Hoàng hậu);
    x = how far above that ceiling a rise may still creep at the slow share dm.min before it stops (0 = stops at the ceiling). */
 bar:{sung:{f:"s",m:8,x:0,top:100},danh:{f:"d",m:8,x:0,top:100}}};/* m 6 → 8 (MAIN 164 ruling 26/11 ~22:25Z: with m 6 any fall dropped her under the bar = the #1 stall) */
/* sếp's two options (report dev/handover/reports/stat-pace.md «Cách A / Cách B»): ONE switch BAL.stpPick. A = recommended (default);
   B = stricter: lower rank ceilings, steeper slowdown, at most 2 big events a day. */
/* abs = Sắc · Tài · Tâm cơ through the same slowdown (sếp FINAL 26/11 ~23:24Z via MAIN 164; replaces the monthly rescale): a rise × max(min, 1 − (now/100)^pow),
   band cap per change BAL.stp.band[k]; no rank ceiling, no hard stop below 100, never taken away; same rule for every NPC. Target: a focused year ≈ +20–25 from 50,
   80 → 90 ≈ 3 years (robot table in dev/handover/reports/pace-speed.md). */
BAL.stp.abs={sac:{pow:2,min:.15},tai:{pow:2,min:.15},tamco:{pow:2,min:.15,k:.4}};
/* tamco (PACE-SPEED-2 robot 27/11, MAIN 167 flag «Tâm cơ 80 → 90 far too fast»): card options give Tâm cơ ~110 times in 40 months (raw ≈ +5 a month, source tally
   dev/measure/pacespeed.js ps.tsrc «runOpt»), so 90 came in 19–34 months (LIVE 12–15). k = the share of a raw rise that counts (.4; robot: k .5 + pow 1 was too slow in the middle, +7–15 a year), pow 2 as Sắc · Tài;
   the slow share min .15 (the soft-ceiling rule) is kept. Robot (k .4, pow 2, 2 lives × 60 mo): Tâm cơ +14–19 a year in the middle (37 → 56 → 70), 70 first at m36 / m58 (before: 90 at m19–34, LIVE m12–15). */
/* soft = ONE SOFT CEILING for the six palace stats (owner OD 26/11 ~23:55Z, confirmed «Ok làm chỉ số như khuyến nghị»; replaces the hard stop and the
   dropped promotion adjustment): near / above its ceiling a stat still rises at dm.min (abs: abs[k].min), never a hard stop below 100 (jstatpace spSoft / spTop).
   Example (approved): Sủng ceiling 58, a +8 event → +7 at 30, +4 at 45, +1 at 55+; Sắc +6 at 50, +3 at 80, +1.5 at 90, +1 at 95+. */
BAL.stp.soft=["sung","danh","duc","sac","tai","tamco"];
/* fade = what falls BY ITSELF (owner OD 26/11 ~23:47Z rec, kept at ~23:55Z; law 1 her and every NPC; jstatpace spFadeMonth at each month end):
   sung: a month in which Hoàng thượng did not see her (no night with him: p.nightLog, nor p.empSeenW) → − first, then − step more each further month,
   at most − max a month; seen again → the run stops (p.ngM = 0); never demotes by itself. wk = the old unconditional weekly fade (j3 endTurn / j75 NPCs,
   «ân sủng nhạt dần» −1 a week), now 0: the neglect fade replaces it (law 14).
   sac: from age from, − per each new year. Danh · Đức · Tài · Tâm cơ never fade by themselves (only events / punishment).
   History check (law 8): «以色事人者，色衰而愛弛» (Sử ký / Hán Phi Tử — beauty fades, love slackens); Qing Kính sự phòng records: favour followed the nights
   summoned, a consort not summoned for months counted as thất sủng (Chân Hoàn truyện, Diên Hy công lược, Như Ý truyện show the same arc). */
BAL.fade={sung:{first:2,step:1,max:5,wk:0},sac:{from:28,per:1}};
Object.assign(BAL.stp.band,{sac:[2,5,8],tai:[2,5,8],tamco:[2,5,8]});
BAL.stpPre={A:{ceil:[45,55,65,75,85,92,97,100],pow:3,cap:3},B:{ceil:[40,50,60,70,80,90,96,100],pow:2,cap:2}};
BAL.stpPick="A";
/* evc = ONE cap on the BIG events that reach her in one game day (tuần): festival (fixed date, always kept), harm / plots against her, people
   coming to find her (j24 «Có người đến», jgreet stage visitor), Kỳ ngộ, other optional life events (j68 / j72 / jreign / j71 «Lập công» / Việc khó xử).
   cap = total per day; q = most of one kind per day; pri = priority order (a kind earlier in the list is never refused while the day has room;
   later kinds also leave room for the ones before them: res = slots kept free for each earlier kind not yet seen today).
   A refused event is not lost: its own gate keeps its wait / pity, so it comes on a later day; a world card that reaches a full day waits
   (jevc EVCW) and comes on a later day with room, at most wait days, then it is let go. */
BAL.evc={on:1,cap:3,q:{fest:2,harm:1,visit:1,ky:1,opt:1},pri:["fest","harm","visit","ky","opt"],res:{harm:1},wait:3};/* res: slots kept free each day for a kind that can never wait (a plot's warning / aftermath) until that kind has come that day */
(function(){const o=BAL.stpPre[BAL.stpPick]||BAL.stpPre.A;BAL.stp.ceil=o.ceil.slice();BAL.stp.dm.pow=o.pow;BAL.evc.cap=o.cap})();
