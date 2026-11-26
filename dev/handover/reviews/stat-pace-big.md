PRIORITY #1 CHECK (reviewer): OD 254 | ledger 16 | claims D2 row (worker #2 session_01D3E3NXn2KvRU5meXSH17rD) | main 15 | review/* review/stat-pace (this), review/balance-pace (lesson pace only, not landed) — no other branch on stat pace / daily cap.

# BIG REVIEW — review/stat-pace @ 81d0f3d4 (= d693723f + report-only commit) — VERDICT: FAIL
Reviewer: session_01D3E3NXKn1Hw6DCUdV6BXbE (opus) · depth 3 · START_CTX ~3 % (estimate; tool read 0).
LIVE origin/main = 6b5d3d05, has not moved; it is an ancestor of 81d0f3d4 (FF possible once the fixes are in).
Read: START_CORE (18 laws), START_WORKER, START_REVIEWER, brief D-owner-bugs-2611 §D2, OD rows 26/11 ~01:25Z…~04:20Z + ~05:20Z (verbatim), reports/stat-pace.md.

## What passed
- Build: `bash dev/site/build_site.sh` on 81d0f3d4 → index.html differs from the committed one only in the build-info line (sources = built page).
- `node dev/test/stat-pace.js index.html 45`, preset A: PASS (31 unit checks; 47 days, worst day 2 of cap 3, 0 over, mean 1.21).
  Same with `BAL.stpPick="B"`: PASS (45 days, worst day 2 of cap 2, 0 over, mean 0.64). The test is seeded (Math.random 4242), so repeated runs are identical.
- `node dev/test/one-core-guard.js`: PASS (fails 0).
- Law 1 two-way: one rule `spG` in the funnels apply / ap / affAdd / oanAdd + `spAdd`; NPCs are paced the same way, and the ceiling uses the rank of the one who receives. OK.
- Law 4: every new number is in BAL.stp / BAL.stpPre / BAL.stpPick / BAL.evc / BAL.kyngo.cd. Nit: `spRk` returns a typed `7` for a queen (should be `RANKS.length-1`).
- Law 16: preset A is the default, and B is a one-line switch (`BAL.stpPick` in jbalsp.js). OK.
- Law 7 / law 9: no new player-visible wording and no UI. The Kỳ ngộ result lines print the real (paced) rise.
- Sample regressions: cold-faction PASS, receiver-choice PASS, visitor-scene PASS, kyngo-unit PASS. npc-purpose-g1d: FAIL once and then PASS on a re-run (same on LIVE), so it is flaky and not this branch.
- Videos (frames extracted and looked at, Fold 755x1000 + iPad 1180x820): Kỳ ngộ → result «… thiện cảm +12»; the day is full, so «Có người đến» waits and comes the next day. Layout is clean, and the odds words are cổ trang.
  The grey stage silhouettes (Thái hậu / Tổng ma ma) in the last frames are art still loading in the recorder, not this branch.

## FAIL — numbered list for the worker
1. **LAW 11 + LAW 16: the rank ceiling silently closes stat gates below the rank they belong to.** The worker checked only RANKS[r+1].s/.d. A whole-family scan of every `S.danh/sung/duc/th/hh >= <gate>` (60 sites) shows that with preset A (ceil 45/55 at rank 0/1) these can no longer be reached by rises:
   - jroute «Ẩn dật» ending `ad_an`: Đức ≥ BAL.route.anDuc 60 after 36 months. The route is for a low seat, and her rank does not rise while she is in ẩn dật. With ceil 45/55 the ending is unreachable.
   - jroute «Dâng biểu xuất gia» `hl_tu`: Đức ≥ BAL.route.tuDuc 50. At Đáp ứng (ceil 45) it is impossible.
   - jroute rtDuc / guiltDuc 60 (Tư tình route): these weigh in only above the ceiling.
   - jkc / jkcg before entering the palace: «Khách lạ ở chùa» (vi hành) needs Danh ≥ BAL.danhG.kcVihanh 60, and kcR5 needs Danh ≥ 50 and Đức ≥ 70, at rank 0 (ceil 45).
   - j3 monthTick: the Đức → Thái hậu +1/month rule needs Đức ≥ BAL.ducLv.up 60. It is dead at ranks 0–1, for her and for every NPC (j8 rivalsMonth). That changes a working rule without asking.
   - Smaller: j20 sinh thần bestow needs Sủng ≥ 50 (dead at rank 0); j14 lãnh cung release «Thái hậu mở lòng từ bi» needs th ≥ 50 (her rank there is low); jrd_ch road trust needs th ≥ 50.
   Fix: write the scan (gate value vs ceil of every rank the gate is meant for; script + before/after table). Then make every such gate reachable, for example by setting a floor so that no ceiling is below the highest gate of its rank, or by keeping Đức off the rank ceiling. Re-measure A and B after the change.
2. **Regression vs LIVE: dev/test/ag-carry.test.js FAILs on 81d0f3d4, twice** («FAIL 5 bot 3 seeded lives × 16 days: last-khắc news reaches her next buổi … carry 0, lives [0,0,0]»). It PASSes on LIVE 6b5d3d05 (ALL 26). It PASSes on the branch with `BAL.evc.on=0`, and still FAILs with `BAL.stp.on=0`, so the daily cap causes it.
   Cause: the jevc wrap on agScene drops the «Có người tìm đến» shared act (agSeekCard with her choice). The deed lands later with no card and no choice for her. The report says ag-carry passes; that run was before the cap leaks fix and the LIVE merge.
   Fix: either let a deed aimed at her wait (or come as the day's harm/visit slot) so she still gets her choice, or show in the report why dropping the choice is right and switch the test's cap off with a reason, as was done for cold-faction. Then re-run the full regression list (statpace-tests.txt) on the final sha, LIVE vs branch.
3. **LAW 11: rises not routed through the rule**, missed by the scan because the `directMap` class is not checked for rises:
   - jcoopworld.js:824: `S.rl[fpid] += g.rel`, `S.ro[fpid] += g.oan` (co-op: the friend's act on her).
   - jcoopworld.js:1259 `brbAff`, jkcco.js:34 `bond` (co-op regard rows).
   - jts.js:288 `tsLeNpc`: NPC→NPC `v.rl[p.id] += 2` raw, which can climb to 100 unpaced (this should be `affAdd(v,p,…)`).
   Route them through spG / affAdd (her regard toward the friend: ceiling at the friend's rank) and add `directMap` rises to statpace-scan.py, with a before/after table.
4. **Evidence (c) for the default preset is too thin:** the A row of the life table is «2 lives so far». The brief asks for month → value per stat by rank, LIVE vs branch, with rank progress (robot evidence: lives stuck at rank 0–1 and 4/6 in lãnh cung).
   Re-run A and B for ≥6 lives × 24 months after fix 1 (`dev/measure/statpace.js`), and add rank and lãnh-cung counts to the table.
5. **Report gaps:** «FINAL full re-run: see line below» and «perf re-run: see below» were never filled in. The LAND READY line must say «preset A default, B = one-line switch (BAL.stpPick)».
6. Cap family (judge and document, not necessarily change): the branch probe (47 days, all cards shown) found cards outside the five kinds that still reach her: «Có người bán tin» 10 (a person coming to her), «Ngươi bắt gặp» 6 (witnessed deeds). Each must be either in the cap or listed as exempt with a reason.
   Also: EVCW (held cards) lives only in memory, so a held visitor is lost on save/reload (same pattern as j68 EVHOLD). Record it as known, or save it.

Known pre-existing on LIVE too (not this branch, not counted): quickcheck G4 80-dialog-fixed «kit-dialog-2 a», 90-button-crawl «Ô lưu · Lui».
Review shots/frames: scratch only (/home/user/wt/spr-vid), none in git.
