# merge-hot-2 — review/merge-hot-2 @ ba07c65e6071583b1f47af9fa67de7b817d310cb (descends from main c4e89f89; includes facefx-all-r2 @ 2cc69dfaf4)
Changed: (1) merged review/facefx-all-r2 (one face-mark rule), generated index.html/sw.js/assets.json rebuilt with dev/site/build_site.sh (never hand-merged); re-merged newer main 02a0d3f1 and rebuilt again. (2) Root fix of the main bug: jbook.js defined a second global kitPortrait() (orientation, boolean) that shadowed the kit's j60 kitPortrait(p,{size}); renamed to kitIsPortrait(). KIT.md note: ONE kitPortrait (j60).

## kitPortrait callers (dev/build, grep of every call)
| caller | expects | before (main) | after |
|---|---|---|---|
| j60.js:84 definition | HTML | overridden by jbook (load order) | the only definition |
| j90.js:30 podium fallback `kitPortrait(p,{size:"lg"})` | HTML string | got boolean -> "false" in .kpod-fb | HTML frame (3/3 fallbacks are real frames) |
| jbook.js:250 kitSlideSheet orientation | boolean | boolean (own def) | kitIsPortrait() boolean |
| j87.js:134 slideMode | boolean | boolean (jbook's) | kitIsPortrait() (with kit version it would have been truthy HTML = always slide mode, so it had to change too) |
| dev/test small-bugs-2, tassel-sites, appearance-port, facefx-scan | HTML | tests worked around it | now valid directly (workaround still harmless) |
Docs only: KIT.md §4, PROGRESS_page-curl2.md.

## Tests (local http server, Chromium; 755x1000, 1000x755, 1180x820, 1366x1024, 844x390)
- appearance-port.js: bad=[] errs=[] at all 5 sizes. facefx-scan.js: 11 rows all true (fit/lg/sm/stage/podium/room), errs [].
- Podium/j90 (own script, stranger on dais, kitKnown false): 3/3 .kpod-fb are real frames at all 5 sizes, no x-overflow, no page errors. kitPortrait(p,{size}) returns string, kitIsPortrait() boolean = innerHeight>innerWidth at all 5 sizes.
- book-figwide.js (Tuần lục person pages, book-fig): ALL OK.
- Boot/smoke + #kit sample page: loads, renders, no page errors, no overflow at all 5 sizes. After the last main merge: load + kitPortrait/kitIsPortrait re-checked.
- Not run: dev/test/podium.js (stale harness, times out on #kg82skip also unrelated to this change); portrait page-slide animation not exercised by hand (caller is identical, only the name changed).
SẴN SÀNG KIỂM
Update: re-merged main c4e89f89, rebuilt; podium 5 sizes, appearance-port (3 sizes), facefx-scan re-run: all OK.
