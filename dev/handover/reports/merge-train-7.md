# merge-train-7

Branch review/merge-train-7, built from origin/main 92668096 (main may move; re-merge after merge-train-6 GO). All merges --no-ff, one at a time. Generated files rebuilt with dev/site/build_site.sh.

## IN (5), each at its PASS sha
1. servant-mline-r3 b82d3bf3  2. scene-end-sweep-r1 67db47f6  3. reign-road-fix-r1 90c5b9e5  4. act-split-w2-r1 072687e2  5. balance-after-truth-r1 614138eb (measures/tools only)

## NOT included (as ordered)
slap-mg-r3 (needs mg-balance), entry-exam (needs kc-roads fix), coop-chat-r1 (needs coop Worker deploy).

## Conflicts and resolution
- index.html, sw.js: took main's, rebuilt.
- dev/build/assemble.py: union of module lists (added jmline.js after jhouse.js; jact2.js after jact.js).
- No other source conflicts.

## Tests (final build, 755x1000@2 and 1180x820@2, local static server)
- PASS, no page errors, both sizes: mline-guest, scene-end-sweep, unmet-names-scan, opt-overflow-scan, reign, act-split-w2, mk-e2e, boot-flash. kit-conform: no non-conforming dialog (755: CONFORMS 83 / MISSING 16 = dialogs the scan could not open).
- Once: act-split-scan (DUP_AFTER 0), act-split-vp (FAIL 0), unmet-list-family (0 errors), scene-end-scan (ALL PASS), coop-e2e (live Worker) 59/59.
- kit-table: 3 fails at both sizes, all "Mệnh truyện / Triều cục" kit-adjacent, spread 47.9 px (steps story/q72/log .0.0.3). SAME 3 fails on clean origin/main 92668096 at 755x1000 (full run), so pre-existing, not from this train. Needs a kit-keeper look (two adjacent kit tables whose value columns differ).
- Not run: mline-oldsave (needs an old-build URL).

## Rules
KIT FIRST: no private styles added in this train (merge + build only). ONE CORE: no BAL numbers touched.
