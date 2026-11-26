/* ================= jbalsp: BAL.sp + BAL.evc — STAT PACE and the DAILY BIG-EVENT CAP (owner OD 26/11 ~01:25Z «1 ngày ấp tới 1 đống sự kiện»
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
BAL.sp={on:1,
 band:{sung:[2,5,8],danh:[2,5,8],duc:[2,5,8],th:[4,8,12],hh:[4,8,12],rel:[4,8,12],oan:[4,8,12]},over:.3,
 ceil:[45,55,65,75,85,92,97,100],
 dm:{pow:2,min:.15}};
/* evc = ONE cap on the BIG events that reach her in one game day (tuần): festival (fixed date, always kept), harm / plots against her, people
   coming to find her (j24 «Có người đến», jgreet stage visitor), Kỳ ngộ, other optional life events (j68 / j72 / jreign / j71 «Lập công» / Việc khó xử).
   cap = total per day; q = most of one kind per day; pri = priority order (a kind earlier in the list is never refused while the day has room;
   later kinds also leave room for the ones before them: res = slots kept free for each earlier kind not yet seen today).
   A refused event is not lost: its own gate keeps its wait / pity, so it comes on a later day; a world card that reaches a full day waits
   (jevc EVCW) and comes on a later day with room, at most wait days, then it is let go. */
BAL.evc={on:1,cap:3,q:{fest:2,harm:1,visit:1,ky:1,opt:1},pri:["fest","harm","visit","ky","opt"],res:0,wait:3};
