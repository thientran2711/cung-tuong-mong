PASS c8734770b1abe619a9a00f7bcfee9e21e01ea235
(branch review/fig-bg-k1-r1; ancestor = origin/main bad941b4; independent reviewer, C8 fig-bg step 2, KIT §61)

## Result
PASS after 3 small fixes by the reviewer (the kit keeper's c2cbe401 had 2 real regressions on current main; both fixed on the review branch).

## Merge
c2cbe401 + origin/main bad941b4. Conflicts: assemble.py (jfigbg.js kept LAST), jsl.js (main's new KIT 34.6 kitBookFig sizing kept; the scroll early-return re-added after it), index.html/sw.js/assets.json regenerated with dev/site/build_site.sh.

## Fixes (on review/fig-bg-k1-r1)
1. Dialog name chip cut by the scroll (FAIL, visible at 755x1000 and 844x390): a long name ("Thượng Quan Thục Nghi") was nowrap and cropped by the silk window ("hượng Quan Thục Ngl"). dev/test/figbg/scroll.js did NOT catch it (it checks the chip against the border box). Fix: jfigbg CSS wraps the chip inside the window (white-space normal, max-width = window); kitDpFit clamps the chip to the inner box (minus the scroll border). Before/after screenshots looked at: name now on two lines above the head, no cut.
2. Book column widened by scroll figures (FAIL): dev/test/book-figwide.js was ALL OK on main but 16 FAIL on the branch (text column 196 px < 220 for Thái hậu / maid m33 / c10 at 1180x820 and 1366x1024; torso/face cut at 1000x755 for maid and c10). Fix: kitBookFigCol returns "" when the figure carries data-fb (the scroll crops a wide robe; the column keeps its normal width). Now ALL OK at 1180x820, 1000x755, 1366x1024. Same pass keeps main's KIT 34.6 vertical offset on the scroll early-return.
3. KIT.md §61.1 documents both, and notes the stale sentence "dialog column widens by the border" (kit keeper moved the border inside the capped column).

## Open points from the status row
- "390x844 rival dialog image height 0": at 390x844 direct the game shows the rotate prompt "Xoay ngang điện thoại để chơi" over a non-supported layout; the dialog column is ~92 px wide there even on plain main (probe with the scroll style removed: img 113x249 vs 23x47 with it). Not supported, not a scroll regression; nothing to fix. (I did not run ?khost=1 separately; the direct run showed the prompt as designed.)
- "2-person dialog shows one scroll": by design, KIT 50.1 = ONE person in the dialog column (second person named in the text). Probe with 2 stage persons: 1 column, 1 scroll. Closed.

## Checks
- 14 scroll pictures downloaded from the CDN (all 200, 8–51 KB, 448x800), contact sheet looked at: all empty of people, rod at top AND bottom, colour+motif per status (c0..c7 tier colours, cold grey plain, emp ochre dragon, th mauve pine/crane, serv hemp willow, man ink bamboo/mist, unk beige mist). Coherent set, no outlier.
- Consistency scan (every figure column of the same kind): Tuần lục person page .kbk-por and event dialog .kes (kitEventDp) both get the scroll only through data-fb written by kitStageFig; scroll.js checks key = kitFigBgKey for rival / emp / th / maid in book and rival / emp in dialog at 6 viewports: 36/36 rows, rod width identical per kind (book 20/22, dialog 16/17, short screens 11/12 and 10/11). No per-place variant, no private CSS/frame (single `kit-figbg` style block).
- Tests (merged build, own http server on 127.0.0.1, own PID): dev/test/figbg/scroll.js PASS at 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (before fixes) and PASS again at 1180x820, 755x1000, 844x390, 1000x755 after fixes; book-fig-scale ALL OK (1366x1024, 844x390); book-figwide ALL OK after fix 2; stage-fig-size (visit/emp/man/two/thtrieu) no errors, no distortion, over 0 at 755x1000, 1180x820, 844x390 (rows emp/two show figH 0 = test kinds not opening a person dialog in this run, same on both builds — not investigated); dialog-art 37 checked, no fallback. No page errors in any run.
- Not run: dev/test/podium-plaque.js (lives on review/kit-keeper-1, not on main or this branch); old-save test (no scroll-specific save data; scroll is CSS/DOM only, localStorage untouched; palace-oldsave needs a second old build — not run); co-op e2e (not touched); ?khost=1 screenshots not separately taken.
- Shots looked at: 755x1000 book + dialog, 1180x820 book Thái hậu (before and after), 844x390 dialog, 390x844 (rotate prompt), scroll sheet.

## Notes for the coordinator
- Suggest the kit keeper add to scroll.js: a long-name chip case (chip must be inside the inner window), and a book-figwide run in the figbg checklist.
