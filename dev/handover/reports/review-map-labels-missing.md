# review-map-labels-missing (SMALL reviewer, MAIN ROOT-53) — FAIL on 98c0e0a3

PRIORITY #1 CHECK: OD L1032, L1416, L1417, 18/11 ~18:20Z | main j38 mapFit | review/* review/map-labels-missing 98c0e0a3 | claims worker session_01Rc5AsJKHtNXkYtCxgvCzAL
Reviewed on newest origin/main 94d11623 (merge + real build_site.sh rebuild of index.html/sw.js, conflicts were only those two built files): branch review/map-labels-missing-r6 (local merge sha 58f61704, NOT pushed as PASS).

## What passed (this session, with CDN, real pictures)
- QUICKCHECK PASS (153 s; open 1271 ms; old save ok; perf render 191/204, tab 374/339, buổi 944/1111; core gates PASS; time-spill PASS; build matches).
- dev/test/map-labels-scan.js, Fold 755x1000 + iPad 1180x820, day + night: 28/28 tags visible, 0 overlapping (festival Thanh minh day picture + xuân-tối night picture).
- Never-hide fix works; grey/lock/reason untouched; courtyard level untouched.

## FAIL list (owner bug is "tag must be readable AND belong to its own palace", OD L1032 + L1416)
Shots looked 3x (NE corner crops, Fold panned to the east edge + iPad), day + night:
1. **Meta row text cut by a neighbour tag.** Fold day + night: Hàm An's info row ("N bóng · 2 khắc · bái kiến") is covered at its left end by the Trường Xuân tag, only "ng · 2 khắc · bái kiến" / "? bóng…" shows. The scan only compares `.mlab` rects, so it reports "overlapping=0"; j38 `pairs()` uses the union box so it did not push Trường Xuân away either (Hàm An is a non-nudged big-rank tag, Trường Xuân lower rank was left in place). Needs: scan on label+meta union boxes (the same box j38 uses) and the placement must really clear them.
2. **Leader lines point under OTHER palaces' tags (the A ca sở lesson, L1416).** Fold night: Chung Tú's leader runs from its tag to a dot that sits ON the Trường Môn viện tag (bottom of "viện"), the dot also covers the text "viện"; Trường Môn viện's own leader goes to a dot beside Hàm An's info row. Fold day: Khải Tường's tag was pushed ~200 px down, its dot lands under Chung Tú's info row and the line crosses Cảnh Phúc's tag; Hàm An's dot sits at the edge of the Trường Xuân tag. A player reads these as Chung Tú = Trường Môn viện etc. Needs: the leader end/dot must not land on or beside another visible tag; tags must not sit on top of another place's building (priority: keep tag nearest its own building, nudge the one that is NOT over its own building).
3. **Leader lines cross each other / cross other tags (iPad day).** NE corner: Trường Môn viện's line and Chung Tú's line form an X right between Hàm An and A ca sở; Trường Môn viện tag sits directly under A ca sở tag so A ca sở's "2 khắc" row reads as Trường Môn viện's or vice versa. Needs: no two leaders cross, no leader crosses a third tag; add to the scan (segment vs tag rects, segment vs segment).
4. Scan gaps to close with the fix (so it cannot say 0 again while the picture is wrong): overlap on union boxes; leader dot inside any other tag; leader crossing; run with deviceScaleFactor 2 and several saves/ranks (rank changes the number of "!" / protected tags; the worker only ran one fresh save).
Fold note (not a fail): tags at the far east edge need a pan by design (§85.8); the map is not cut, but fix 1-3 must hold after panning.

## Not done
Land/push skipped on FAIL. Other ranks/saves not run (verdict is already FAIL on the default save). Shots only in scratch (never in git/CDN); shots dir dev/handover/shots/map-labels-missing/ deleted from this branch with this report.
