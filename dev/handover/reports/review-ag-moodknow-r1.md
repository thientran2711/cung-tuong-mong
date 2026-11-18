PRIORITY #1 CHECK ('review ag-moodknow'): OD L1651 (g), L1668 (1), L1669 | main none | review/* review/ag-moodknow (worker), review/kit-figure-mood (seal art) | claims worker session_01UV1Szkwcqu7s9tTHPUXBrh
# REVIEW ag-moodknow r1 — BIG (opus) — FINAL VERDICT: FAIL (1 item, not small) · reviewer fixes on review/ag-moodknow-r1 @ a2a1f6b5
(The earlier 'PASS 1c964f88' covered 35dc69d0 only and is superseded: the foreman asked for ONE verdict on 86135854..da4a6e83.)

## FINAL (86135854..da4a6e83, Sims follow-up) — FAIL list for the successor
1. OWNER CHECK s35 Lượt 41 (GHEN): separation holds (mk causes never touch v.ghen; a Ghen cause ending leaves v.ghen unchanged, probed), BUT
   'every event that raises v.ghen also adds a short Ghen mood cause' is NOT done: v.ghen is written directly at 43 sites in 24 modules
   (jts 5, jtwoway 4, jtoil 4, j8 3, j7 3, j2 3, jvisit 2, jtsb 2, j75 2, j28 2, j1 ghenAll, jagacts3 p3GhenAll, j42, j34, j24, j20, jinv, jgift,
   jpet, jne, jthaiy, j70, jroute, jmood); only rivalUp/otherKid events give a Ghen feeling. Fix (whole group): ONE function ghenUp(v,n,why,by)
   = v.ghen += n (BAL.ghen as now) + emoEv/mkAdd a Ghen cause (true why, aimed at 'by', timer BAL.mood2.dur.e.<key>); route every RAISE site
   through it (decreases stay as they are); scan script + before/after table; test: each raise site adds a cause, its end never lowers v.ghen.
   Build it on review/ag-moodknow-r1 @ a2a1f6b5 (holds all fixes below).

## Reviewer fixes on a2a1f6b5 (= da4a6e83 + one commit)
- co-op one world: R.mck host-only (mckWorld) — da4a6e83 alone keeps the same FAIL; after: seeds 7+3 PASS, no world path changed (R.mk too).
- KHÓC at strength 100 never showed: the tears cause (s=min(100,val+1)) tied the đau cause and lost the summed seal; now s=val+1 (emo.v stays capped).
- a cause she knows stayed 'Nguyên do chưa rõ' on its khóc/hờn row (knowledge keyed by feeling+cause): mckHas/mckPubHas now match the cause text
  under any feeling (same event = same fact; a NEW cause text is still unknown, test 2 still PASS).
- 'Đã biết' stale mood fact: intelOf marks kind mood current:false ('nay đã khác') when that cause is gone (probe: true → false).
- old path (__mkOff) keeps the r1 emo2Row fix; ag-moodknow test: +1 khóc-row line, hờn NPC line reads the hờn cause (seal = strongest sum, a big
  mưu may outweigh it: was a 1-in-3 flake). 33/33 ×5 runs.
- site build (index.html, sw.js, assets.json).
## Checks on the Sims part
- per-cause khắc timers: BAL.mood2.dur (e/k/bar/def), one source; mkNow = tuần×(BUOI×J95.KH)+buổi×KH+khắc. Weekly decay gone (EMO_DECAY→MIN_VALUE,
  jmood drift off, box line 'phai dần theo khắc'). Summed seal one source: p.emo rebuilt by mkSync, read by kitEmotion/sealKeyFor. NPC parity: mkAll
  = her, rivals, staff, kids, Emperor, Thái hậu, maid, men, court. Old save: mkMigrate day→khắc + carry; quickcheck old save from live PASS.
- ag-know base vs branch ×4: base 1 FAIL run (G2/ONE RULE lines), branch 4/4 PASS → base randomness. ag-truth 10/10. one-core-guard PASS.
- ag-all p95 base 11.6/10.9 vs branch 10.1/12.8 ms: no added cost. QUICKCHECK a2a1f6b5: open/old save/perf PASS (render 141/171, tab 291/242,
  buổi 831/800 ms); CORE GATES: only G1 one-core-bind + frozen list, identical on base 86135854 (ag-all-2).
- Landing conditions A (after ag-all-2) and B (6 khóc/hờn seal files on the CDN first) unchanged.

## Earlier r1 part (35dc69d0)
Target review/ag-moodknow @ 35dc69d0 (foreman update), diff 86135854..35dc69d0 only. START_CTX ≈ 6 %.

## Fixes made by the reviewer (review/ag-moodknow-r1 = 35dc69d0 + 1c964f88)
1. CO-OP ONE WORLD FAIL caused by this branch (base 86135854 PASS, branch FAIL both seeds: "guest sent week, world paths changed: R.mck 31").
   NPC mood-cause knowledge (rival.mck) was written on the guest seat (morning eyes, prune, NPC learn paths). Fix: mckWorld() = worldOn();
   mckLearn for an NPC knower, the NPC part of mckEyes and the NPC prune run on the host only. After: coop-one-world seeds 7 + 3 PASS.
2. KHÓC/HỜN broke the mood box: emo2Turn turned e.k into khoc/hon AFTER jevb had stored the history row (k = dau/buon/gian), so a KNOWN cause
   showed "Nguyên do chưa rõ" in the box (row sig mismatch) and the row kept the old mood. Fix: emo2Row() moves that row to the new mood.
   Before: rows ["dau|Nguyên do chưa rõ"] with moodCauseKnown = cause; after: ["khoc|<cause>"]. New test line in ag-moodknow.test (24/24 PASS).
3. Root index.html was not built at 35dc69d0 (quickcheck "NOT BUILT"): build_site.sh run and committed (index.html, sw.js, assets.json).

## Checks
1 Gate: moodCauseKnown / moodCauseKnownBy one rule (her + NPC). Group scan of every cause display: kitEmotion (seal popover, emoBadge title,
  jemo:209), emoCauses (mood box rows, jpcf card, jmood own = her, exempt), emoBoxArt/emoCauseArt (picture + caption), S.cm.th.why (no display),
  motiveOK why strings (only into S.roster.acts, not shown), j78 intelOf "Đã biết" (only facts she learned). Runtime leak probe: unique tag on a
  SECRET cause of every rival, 4 bot days × 6 runs, tag searched in badge/rows/pcf/open box DOM: every hit was a cause she had learned (S.mck). OK.
2 PUBLIC vs SECRET: public leaks by BAL.mck.pub (clamped, ≤ max lines) in "Tin trong cung"; secret only via intel/sellers (paid, offer text
  generic "nghe một tin thật")/Tai mắt/eyes/NPC errands. No free path found. OK.
3 khoc/hon inside the ONE jemo bar (EMO/EMO_DECAY/EMO_W/... extended from BAL.emo2), NPC parity, hờn motive gate (NPC only; her own acts are the
  player's choice as in every jemo gate). No private UI part. Keys handed over: KIT REQUEST emo-khoc/hon, emo-m-*, emo-mo-* (worker report).
4 ONE CORE: one-core-guard PASS (before and after fix). VANPHONG: "Khóc", "Hờn", "Nguyên do chưa rõ", leak line cổ trang, no %.
5 Old save: test 5 PASS; quickcheck old save from live loads + plays a buổi. Co-op: see fix 1.
6 Tests (after fix): ag-moodknow 24/24 (×3), ag-know 23/23, ag-truth 10/10, one-core-guard PASS, coop-one-world 7+3 PASS.
  QUICKCHECK --cpu 4 on 1c964f88: open/old save/perf PASS (render 141/150, tab 290/265, buổi 1002/689 ms — run 1 was 858/899: box noise),
  TIME-SPILL PASS, CORE GATES FAIL only on G1 one-core-bind (6 j25/j78 mismatches) + "frozen list grew 3843 -> 5093": BOTH identical on the
  base 86135854 (ag-all-2), untouched by this diff → ag-all-2's reviewer/coordinator, not this branch.
  ag-all.test perf p95 (budget 8 ms) base vs branch, 2 runs each: base 11.5 / 21.7 ms, branch 23.8 / 13.9 ms → same noise band, no real cost.
7 Shots Fold 755x1000@2 + iPad 1180x820@2, mood box known ("bị giáng phẩm · tuần này") and unknown ("Nguyên do chưa rõ · tuần này"): no
  overflow, no page errors. (Shots in scratch only, deleted.)

## LANDING CONDITIONS (coordinator)
A. Lands right after review/ag-all-2 (1c964f88 is built on it; origin/main is not its ancestor until ag-all-2 lands; then fast-forward/rebase).
B. SEAL ART GATE: img/kit/emo-khoc, emo-hon, emo-m-khoc, emo-m-hon, emo-mo-khoc, emo-mo-hon are 404 on the CDN today. The badge removes itself
   (onerror) → a crying/sulking person shows NO mood seal, against OD L1668 (1) "the seal is visible to anyone who sees the person".
   Do not go live before kit-figure-mood (Foreman C art) puts the 6 files on the CDN, or land them together.

## Not changed (notes)
- Card "Đã biết" (intelOf) keeps the mood fact line ("đang buồn, vì …") after the mood has changed (intelOf has no 'now' rule for kind mood);
  true when learned, but reads as current. Small follow-up for the worker (now = sig still current).
- Mood box picture area was empty in the iPad "known" shot at 1.2 s (event picture still loading); base behaviour, not this diff.
