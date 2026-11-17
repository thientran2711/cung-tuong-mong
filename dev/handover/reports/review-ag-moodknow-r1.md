PRIORITY #1 CHECK ('review ag-moodknow'): OD L1651 (g), L1668 (1), L1669 | main none | review/* review/ag-moodknow (worker), review/kit-figure-mood (seal art) | claims worker session_01UV1Szkwcqu7s9tTHPUXBrh
# REVIEW ag-moodknow r1 — BIG (opus) — VERDICT: PASS 1c964f88 (review/ag-moodknow-r1), with 2 landing conditions
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
