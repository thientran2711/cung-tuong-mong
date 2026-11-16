# merge-hot-1
Base origin/main a363cc14a. Merged --no-ff: (1) review/modal-scroll-r1 f6cddf761d, (2) review/book-fig-r1 251d62276.
index.html, sw.js, assets.json were conflicting generated files: took main's, rebuilt with dev/site/build_site.sh after each merge. No hand merges; no other conflicts.
Tests (merged build, 755x1000/1000x755/1180x820/1366x1024/844x390): modal-swipe 0 STUCK (Hoc Cam picker scrolls on touch); panel-size ok (btnOut PEND:plantpick at 1000x755/1180x820 pre-existing); stage-rail 5/5 PASS; book-fig-scale ALL OK; book-figwide ALL OK (incl. 844x390). Boot verified by every test loading the page, boot-flash not run.
