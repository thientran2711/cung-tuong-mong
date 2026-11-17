PRIORITY #1 CHECK: OD 17/11 ~13:02Z read verbatim; KIT 33.9 + j59chips (the one placer) reviewed; review/kit-rcol-top-r1 8c84e6be trial-merged; CLAIMS row 762; reports/morechip-corners.md + shots read.

# review morechip-corners-r1 — PASS a66f274c (review/morechip-corners-r1 = review/morechip-corners 08ccd1bf + 1 fix commit; origin/main 6ca04148 already an ancestor)

## Fixed (small, stale rule text left behind)
1. dev/kit/KIT.md §33.9: the old sentence `"+N" chips (j59chips) are NEVER on a side column ... under the column when it fits, else BESIDE ... at its top` was still there under the rewritten line (contradicted the bottom-corner rule) -> deleted.
2. dev/build/jkit.js (rule text shown on the kit page): still said "TOP corners ... above the heads" -> rewritten to BIG chips in the BOTTOM corners, per side count, never on column / rail / name chip. Site rebuilt.

## Checks
- Owner line OD 17/11 13:02Z: chip bigger (1.05rem, 5/15 px, 2 px border, ~34 px), bottom-left = people off left, bottom-right = people off right, own count, hidden at 0. OK.
- Trial merge with review/kit-rcol-top-r1 8c84e6be (column 140 px): merged clean (j59/KIT auto), site rebuilt, morechip-scan on the MERGED build: Fold, iPad Air, iPad Pro, 412x1058, 390x844, 30 places x 2 pages each -> chips 27-28 places per size, ON column/rail 0, on name chip 0, too small 0, not bottom 0, page errors 0. MORECHIP OK.
- quickcheck --runs 5 on a66f274c vs live: PASS 259 s, old save ok, core gates PASS, perf new/live render 166/220, tab 316/347, buoi 1021/1140, tasks>200ms 14/14.
- LOOK (Fold 755x1000 home, iPad Air 1180x820 home on the merged build; worker shots Fold p1, iPad Pro p1): chip big, readable, clear of name tags and of the right column; Fold p1 chips at both true bottom corners.
- Note (not blocking): on page 1 the right chip stands at the right edge of the people zone, beside the column zone, not in the very corner (column reserved width); page 2 shows true corners.
- Not run: other batch gates (kit-part change; main's batch pass re-runs them).
