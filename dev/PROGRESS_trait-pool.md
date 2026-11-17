# PROGRESS — review/trait-pool (ONE TRAIT POOL, Foreman C opus worker, 17/11)
Base: review/trait-rename 27886326 (= origin/main 6c4f21c3 + Foreman B's Hiểm độc→Xảo quyệt rename, one commit). Review trait-rename first or both together.
## Built
- THE trait table `BAL.net` (dev/build/jbal2.js, end): 3 groups × 8 nết in 4 symmetric pairs, female pool F / male pool M (only pair 4 of Tính tình differs:
  Kiêu ngạo↔Khiêm nhường for women, Cương trực↔Xu nịnh for men), every row: tend, gain, cost (balance law), PERS act weights `w`, fields
  (dang, mal, slight, forgive, trust, gift, ghen, harmGate, lavish, riseGift), memory fade, servant/agent qualities `q`, first trọng `v`, bans.
  `BAL.net.old` maps every old word (consort 16, servant 5, men 5, court heads 4) into the pool; `BAL.net.k` the two new constants.
- Engine `dev/build/jnet.js` (assembled right after jtrong.js): `netOf(p)` = p.net [tt, ld, ch], deterministic hash draw per person (co-op/reload safe),
  sex → pool (eunuchs, men, physicians, court heads, kin father/brothers = M), old saves seed their old nết into the right group, the missing groups drawn;
  `traitsOf` wrapped (Emperor + Thái hậu keep their own answer); API hasT / netQ / netIs / nq / qv / tv / netRx / netTxt / netTip / netRow.
  persF fixed (harmGate was ×0 = dead; now max), malice from nết, first trọng from the Lòng dạ nết (2nd stays), old trK/thTrait mapped.
- Whole-family code migration `dev/tools/netmig.py` (388 sites / 64 files) + manual sites (j55 court heads, jkc kin, j29 servants, jst14, jtoil, jwhy, j24 rule text).
- Tests: dev/test/trait-pool.js (18/18), dev/test/net-scan.py (family scan, all "old" rows 0 except the migration map/labels), coop-e2e 60/60,
  trait-rename-oldsave 9/9. trong-check stops at a pre-existing harness error (showSelf → WAGE undefined) on the base build too.
## Next (not this job)
SHOW-WHY-A-NUMBER (netTip + PERS fields per factor), greeting name rule (hasT(p,"Kiêu ngạo"/"Lạnh lùng")), AG-MEET (persW over the 3 nết), voice by Tính tình (traitsOf(p)[0]).
