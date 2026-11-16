# PROGRESS review/merge-hot-2
- Branch from origin/main 0a311183, merged review/facefx-all-r2 @ 2cc69dfaf4 (generated index.html/sw.js/assets.json conflicts: took main's, rebuilt with dev/site/build_site.sh), then merged newer origin/main 02a0d3f1 (same: rebuilt).
- Fix on main's bug: jbook.js defined a 2nd global kitPortrait() (orientation, boolean) that shadowed the kit's j60 kitPortrait(p,{size}). Renamed to kitIsPortrait(); j87 slideMode and jbook kitSlideSheet callers moved to it. KIT.md §4 note added: one kitPortrait only.
- Tests: see dev/handover/reports/merge-hot-2.md on the handover branch.
- Re-merged origin/main c4e89f89 (coordinator request), rebuilt; podium/appearance-port/facefx-scan re-run OK.
