# merge-hot-1
Base origin/main a363cc14a. Merged --no-ff: (1) review/modal-scroll-r1 f6cddf761d, (2) review/book-fig-r1 251d62276.
index.html, sw.js, assets.json were conflicting generated files: took main's, rebuilt with dev/site/build_site.sh after each merge. No hand merges; no other conflicts.
Tests (merged build, 755x1000/1000x755/1180x820/1366x1024/844x390): modal-swipe 0 STUCK (Hoc Cam picker scrolls on touch); panel-size ok (btnOut PEND:plantpick at 1000x755/1180x820 pre-existing); stage-rail 5/5 PASS; book-fig-scale ALL OK; book-figwide ALL OK (incl. 844x390). Boot verified by every test loading the page, boot-flash not run.

## Update (coordinator add-on)
Also merged review/log-sync-r2 deabc2aa32 (an-tinh fix + 5 log fixes) and origin/main 02a0d3f1 (reign-road, jact). assemble.py conflicts resolved by hand: main's module list + jlogsync.js after jtruth.js (jrail.js kept). Generated files rebuilt, not hand-merged.
Re-tests on final build: modal-swipe 0 STUCK; stage-rail 5/5 PASS; book-fig-scale + book-figwide ALL OK; panel-size errs 0 at 5 sizes; log-sync-night PASS x4; log-sync-week 0 leaks; log-sync audit drift 2 (log-sync-r2 alone: 28).
Final: also merged origin/main c4e89f89 (rebuilt); same tests re-run green (stage-rail 5/5, modal 0 STUCK, book-fig ALL OK, log-sync-night 4/4).
Last: merged origin/main feba37e5 (rebuilt); stage-rail 5/5, modal 0 STUCK at 5 sizes, book-fig ALL OK, log-sync-night 4/4.
Last: merged origin/main 0c23da40; stage-rail 5/5, modal 0 STUCK, book-fig OK, log-sync-night 4/4.
Last: merged origin/main a942395b; stage-rail 5/5, modal 0 STUCK, log-sync-night 4/4.
Last: merged origin/main bd6342c7; stage-rail PASS, modal 0 STUCK, log-sync-night 4/4.
