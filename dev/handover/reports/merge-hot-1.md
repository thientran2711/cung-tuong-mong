# merge-hot-1 — SẴN SÀNG KIỂM
Branch review/merge-hot-1, final sha aa3a4863c30003a00687c117bd3a00b17bbf54f5 (merge commits: modal-scroll 'e6630898', book-fig '79d52f4f').
In (--no-ff, on origin/main a363cc14a): review/modal-scroll-r1 f6cddf761d, review/book-fig-r1 251d62276. Both fully in.
Conflicts: only generated files (index.html, sw.js, assets.json) — took main's side and rebuilt with dev/site/build_site.sh after each merge. No source conflicts, nothing guessed.
Tests at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: modal-swipe 0 STUCK (Hoc Cam picker scrolls by touch swipe at all sizes); panel-size ok (btnOut PEND:plantpick at 1000x755/1180x820 is pre-existing); stage-rail 5/5 PASS; book-fig-scale ALL OK; book-figwide ALL OK (844x390 passes too, not worse than main). Boot: every test boots the page without errors; boot-flash not run.
origin/main (a363cc14a) is an ancestor of the sha: confirmed.
Ready for main fast-forward.
