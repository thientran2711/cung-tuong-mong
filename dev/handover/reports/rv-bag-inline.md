# rv-bag-inline (reviewer session_01Rc5AsNNxkaFhociEYPGYWR, MAIN CHÍNH 85) — review/bag-inline a8ef23ce → review/bag-inline-rv 5e1f97ef

PRIORITY #1 CHECK: OD 21/11 ~02:45Z (#21 Túi đồ inline) + ~02:50Z (#23 Việc pictures) | main KIT §70.3 strips existed, §70.6 only on this branch | review/* bag-inline (worker) | claims worker session_01Rc5AsJTtZMnTMg6ibPv5H7 + this row.

## VERDICT: PASS (with 4 follow-ups for MAIN, none blocks landing)
Branch review/bag-inline-rv = a8ef23ce + merge of LIVE origin/main 32c0e33b (index/sw: took main's, rebuilt assemble + build_site; no markers) + tests. origin/main is an ancestor → FF.

## Gates
- quickcheck 471a6cd9 (merge, before the test-only commit): PASS 461 s · open 2363 ms · old save ok · perf render 241/238, tab 514/531, buổi 1508/1436 vs live · core gates PASS · time-spill PASS. 5e1f97ef adds dev/test files only (index.html/sw.js unchanged).
- coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc): 92/92 passed.
- dev/test/bag-inline.js (NEW, Fold 755x1000 + iPad 1180x820): PASS, 0 page errors. Checks: empty strip + chips; tap → strip UNDER grid, picture LEFT (88x96 incl. grade tag), chips RIGHT as vertical column, no ✕, no modal, one gold ring; 2nd tap swaps; Bên mình slot → strip, no modal; Việc: 6 act cards, all with pictures.
- dev/test/item-info.js step 2 now taps the tile and reads the strip (labels, no modal) — run Fold + iPad, 0 errors, other steps unchanged (dress pick, slot card, shop, reward, tag, Hội phối đồ, other's slot, kit sample). item-info-scan.js: bag site classed «INFO (inline strip KIT §70.6, no pop-up)»; doc-comment hit in jkinl.js classed DEF; totals vs main: no new BLIND/NOTAP, UNKNOWN 5 = same pre-existing sites (jdisp 96/100, jksize 227/472, jlost 42).
- Old save: quickcheck «old save from LIVE loads, plays a buổi» ok.
- 6 Việc picture files fetched from CDN: all HTTP 200. ART REQUEST «Chợ đen ở cửa Thần Vũ» present in FOREMAN_C_STATUS.md L1072.

## Laws touched
L9 KIT FIRST: ONE part §70.6 (jkinl.js), registered in KIT.md §70.6 + kit sample (renders: kinldet + kinlchips + empty text) ✔. L11 whole group: every opener that goes through kinvOpen (jecon works, jrcp, jshelf, jmark, jwdinv) fills the strip by the one capture path ✔; pop-ups that are acts stay ✔. L7: «Chạm một món để xem.», no % ✔. L12: Fold + iPad both looked (bag empty/item1/item2/slot, item7 top+bottom, Việc, dress picker, Hội phối đồ). L6c items still traceable (no item path changed). L4 no numbers added.

## Follow-ups (MAIN decides; not FAIL because the owner's pain = pop-ups that hide the grid, which is gone for her bag)
F1 (law 11, look): the OTHER item grids with a strip (dress picker jtoil, Hội phối đồ, veil, gift picker = KIT §70.3 beside/under the grid) still show Sắc/Xa xỉ as a loose chip line UNDER the grid, not in the right column like Túi đồ; strip proportions differ (see Fold dress-pick shot). Owner drew the chip column on the bag only; if she wants the same everywhere, move §70.3 grids to §70.6.
F2: info pop-ups from tiles that remain: pets tile/«Ô thú nuôi» (jpet.js:255/261), other people's worn slots (jdress.js:143, jk2b.js:840 kitModal; jgift kitItemCard). Worker flagged pets/others' slots as out of scope.
F3 iPad 1180x820: right column is only ~600 px tall, so with an item selected the panel scrolls for almost every item (scrollHeight−clientHeight 117–281 px; 1-act item 117, 4-act item «Son sáp» 281). Content truly overflows (grid ≥2 rows + info rows wrapping in a ~230 px column + acts); name, picture, rows and chips stay visible at scrollTop 0, only the lower act cards are below the fold. Fold 755x1000: 0 scroll for most items, 30–128 only with 3–4 acts. Idea: act cards in 2 columns on wide-short viewports, or larger strip column.
F4 (cosmetic, Fold item picture): the strip picture is 88x96 (square frame + grade tag under it), reads as a small square.

## Shots (scratch /home/user/wt/rv-shots, not in git)
a/b/c/d: 755x1000-{1-bag-empty,2-bag-item1,3-bag-item2,4-slot,5-viec}, 1180x820-{…,6-item7-top,6-item7-bottom}; ii/: dress pick 755, Hội phối đồ 1180. Offline runs without CDN show «Đang thỉnh tranh» tiles — d/ ran with the CDN allowed and shows real pictures.
