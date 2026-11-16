# review/tab-underline (C39) - progress
Owner reports: (1) a stray brown bar crosses the selected category chip (Hanh su chips); (2) a grey scroll track/bar under the chip row (Tu trang > Tui do chips).
Causes
1. jfx.js `kfTabs` drew a JS-positioned sliding line (`.kftl`, absolute, inside the row) for `.pctabs` (every kcattabs chip row) and `.ksubs`. In a sideways-scrolling row whose layout changes after the last click (pane bar reparenting, fonts, scroll) the line kept a stale x/y, so it ran through chip text. The selected chip is already marked by its own fill, so the line was redundant.
2. Chip rows set `overflow-x:auto;scrollbar-width:thin` (jk3, jk2b), so touch browsers showed the scrollbar track (grey) and thumb (brown).
Fix (whole family)
- jfx.js: KF_TABS now only `#tabs` (main nav). `kfTabsClean()` removes any `.kftl` outside `#tabs` (also covers old DOM).
- jk3.js: kit CSS, one rule for every sideways chip/tab row (`.pctabs .kcattabs .ksub .ksubs .kmc-tabs .kchips .chips .relsel .hud2 .j59strip`): scrollbar hidden (scrollbar-width:none + ::-webkit-scrollbar). Overflow is hinted by a 22px edge fade (`kitTabFade` sets `.kfl/.kfr` on the side with more chips; scroll/resize/DOM change).
- Removed `scrollbar-width:thin` from jk3 `.kcattabs` and jk2b `.kpnar .pctabs`.
Scan: `node dev/test/tab-underline-scan.js <url> [sizes]` - visits every main tab and clicks up to 14 sub-tabs/chips per tab; counts rows, rows that scroll sideways, rows with a visible scrollbar track, `.kftl` lines outside `#tabs`. Real scrollbars forced on (--hide-scrollbars off).
Before/after (visibleTrack / strayLine; rows scanned ~280 per viewport)
| viewport | scrolling rows | before track | before stray | after track | after stray |
|---|---|---|---|---|---|
| 755x1000@2 | 2 | 2 | 100 | 0 | 0 |
| 1000x755@2 | 9 | 9 | 100 | 0 | 0 |
| 1180x820@2 | 8-10 | 10 | 98 | 0 | 0 |
| 1366x1024@2 | 9-10 | 10 | 98 | 0 | 0 |
| 844x390@3 | 15 | 14+ | 98 | 0 | 0 |
| 390x844@3 | 7-15 | n/a | 94 | 0 | 0 |
| 412x1058@2 | 15 | n/a | 94 | 0 | 0 |
Page errors: 0 in all viewports (before and after). Act cards untouched. No new images, no kit part missing.
- review r1: merged main 2d038139; KIT.md §46 documents the edge fade; mutation-driven fade check throttled to 150 ms.
