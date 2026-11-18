# review-map-labels (SMALL reviewer, MAIN ROOT-55) — FAIL on 718c249b

PRIORITY #1 CHECK: OD 18/11 ~18:20Z, ~19:05Z/19:10Z/19:15Z, L1416/L1417 | main j38 mapFit | review/* review/map-labels-missing 718c249b | claims map-labels-r2 session_01Rc5AsN8Rec5Ewr4xGzqVCe
Reviewed on merge of origin/main 9366028 (conflicts only index.html/sw.js, rebuilt with build_site.sh): local review/map-labels-missing-r7 ffb3c27, NOT pushed.
Laws touched: 9 KIT FIRST (kit tag only: OK), 11 whole group (one solver: OK), 12 two devices (looked Fold + iPad), 7 wording («cung trống», «Lẻn vào»: OK).

## Passed
- map-labels-scan.js DSF 2, Fold 755x1000 + iPad 1180x820, day+night, ranks default/3/6: all PASS (28/28 tags, union overlap 0, cut 0, grey==unreachable); courtyards 13 slots / 8 grey PASS both.
- Grey look-only look is right (.mgrey whole tag, «cung trống», lock kept), kit slip only.

## FAIL list (the scan passes but the PICTURE still breaks OD L1416 "tag belongs to its own palace")
1. **Leader ends in empty air, not on its tag.** The leader goes to the nearest point of the UNION box (slip + info row), which is an empty corner when the slip is narrower than the info row. iPad day: Chung Tú's line runs horizontally from its dot (beside Vĩnh Hòa/Khải Tường) and stops ~75 px short of the Chung Tú slip, above the «6 bóng · 3 khắc · bái kiến» row. Fold night: Hàm An's line (dot at the NE next to the Trường Môn viện dot) ends at x≈905 above Hàm An's info row, touching no text or slip. Needs: leader must end on the visible slip or info-row rect itself (nearest of the two rects, not the union box), and the scan must assert the end touches a real child box.
2. **Leader far too long / dot reads as another place.** Fold night default view: Hàm An's leader is ~425 px long and its dot sits 100 px from Trường Môn viện's dot; maxDist in the scan is 277 px (Fold night rank 2), far above the r2 claim "≤90 px". iPad day: Trường Môn viện's dot sits 25–45 px right of Hàm An's tag and 20 px left of A ca sở's tag, so it reads as Hàm An's or A ca sở's. Needs: put the tag next to its own building even if a lower-priority tag has to give way; if a leader is still needed, ≤ ~100 px, dot never within ~40 px of another visible tag; add maxDist and dot-to-other-tag distance (not only 4 px) to the scan as hard limits.
3. **Fold day: dot + leader run off the east edge to a tag that is not on screen** (Trường Môn viện, top right), i.e. at the default view a place shows a dot and no name. Owner rule is a readable tag on every place; r2b admits it. Needs: either keep the tag whole inside the view (leader pointing out of the view is not acceptable) or fit the Fold map so every tag is on screen; owner decides §85.8 only if the worker proves the first is impossible.
Not a fail: no tag cut by the edge, no tag overlap, grey logic, courtyards.

## Not done
QUICKCHECK and old-save run skipped (verdict already FAIL); 412x1058 not run. Shots only in scratch (never in git/CDN), deleted with this verdict. No push of a PASS sha; no push to main.
