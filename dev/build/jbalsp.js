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
 band:{sung:[2,5,8],danh:[2,5,8],duc:[2,5,8],th:[4,8,12],hh:[4,8,12],rel:[4,8,12],oan:[4,8,12]},over:.3,
 ceil:[45,55,65,75,85,92,97,100],
 dm:{pow:3,min:.15},
 /* floor[k] = the highest GATE of that stat the game asks at any rank (dev/measure/statpace-gates.py lists all 155 gates + ladder steps; it FAILs when a gate
    is above floor / ceiling): a rise slows to dm.min above the rank ceiling but only STOPS at max(ceil[rank], floor[k]), so no working
    rule closes at a low rank (Ẩn dật Đức BAL.route.anDuc, «Khách lạ ở chùa» Danh BAL.danhG.kcVihanh, Đức → Thái hậu BAL.ducLv.up, …).
    duc: «hiền đức» BAL.ducLv.word[3] 80 · danh: BAL.succN.rareCDanh 80 · sung: jpet 75 · th: netTh("th","than2") of the slowest archetype (Quyền uy 65; Thái hậu's own nết, ROW 9) · hh: jpet 60 ·
    rel / oan: BAL.net.thClamp top (than2 80) — a consort's liking / grudge toward her can still reach every net threshold (law 6). */
 floor:{duc:80,danh:80,sung:75,th:65,hh:60,rel:80,oan:80}};
/* sếp's two options (report dev/handover/reports/stat-pace.md «Cách A / Cách B»): ONE switch BAL.stpPick. A = recommended (default);
   B = stricter: lower rank ceilings, steeper slowdown, at most 2 big events a day. */
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
