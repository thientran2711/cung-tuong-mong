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

# RE-CHECK 790cda59 (r2d) — PASS
Reviewed on 790cda59 (already contains main fa411d6 = newest origin/main; no merge needed).
- map-labels-scan.js DSF 2, Fold 755x1000 + iPad 1180x820, day+night, ranks default/3/6: all PASS; courtyards 13 slots / 8 grey PASS. Fold: maxLeader ≤14 px, maxDist ≤119 px (was 277), dotUnder40 ≤1; iPad: no leaders, maxDist ≤81 px.
- FAIL 1 (leader in air): fixed — only tiny leaders remain, each touching its own slip (Fold day Hàm An 13 px). FAIL 2 (long/ambiguous): fixed — no 400 px lines; iPad day Trường Môn viện / A ca sở / Hàm An read cleanly. FAIL 3 (Fold east edge): Trường Môn viện, A ca sở, Đông cung, Thượng thư phòng are fully off-view on Fold day and night with NO stray dot or line (looked 3x at the full Fold shots); on iPad all four show the whole name tag.
- OD 21:50Z: empty palaces show only the grey name (no «cung trống» row) day + night; reasons/locks kept on grey non-empty places.
- Marker rim glow under-layer in the rank colour looked at (rank 3 pink, rank 6 orange), kit token.
Not done: quickcheck script not found in this checkout (worker reports PASS), 412x1058, old-save load. Shots scratch only, deleted.
Verdict: PASS LAND READY 790cda59
