# merge-train-7

Branch review/merge-train-7, re-merged on origin/main e9c6021d (merge-train-6 live) after s16 GO. All merges --no-ff, one at a time. Generated files rebuilt with dev/site/build_site.sh.

## IN (5), each at its PASS sha
1. servant-mline-r3 b82d3bf3  2. scene-end-sweep-r1 67db47f6  3. reign-road-fix-r1 90c5b9e5  4. act-split-w2-r1 072687e2  5. balance-after-truth-r1 614138eb (measures/tools only)

## NOT included (as ordered)
slap-mg-r3 (needs mg-balance), entry-exam (needs kc-roads fix), coop-chat-r1 (needs coop Worker deploy).

## Conflicts and resolution (re-merge with main e9c6021d)
- index.html, sw.js, assets.json: took main's, rebuilt with dev/site/build_site.sh.
- dev/build/assemble.py: union of module lists (jmline.js, jact2.js on top of main's jmort/jtoilr/jlux/jne/jbac/jdis/jmem/jorigins/jeitem).
- dev/build/jbal2.js: kept both BAL blocks (mline from this train, mem/hook from main).
- dev/build/j2.js: main's "Hỏi sở thích" line + kitNameList in the sổ thị tẩm line.
- dev/build/jreign.js: main's merged rows67 block; `mem` now uses kitNameList (reign-road-fix intent kept).
- dev/measure/inpage6.js (BAD regex), dev/measure/pass/mkinp.sh: kept this side (superset: Đẩy xuống hồ sen, inbirth).
- Harness: dev/test/mk-e2e.js taps the KIT 81 .kmend in front of the makeup reveal (main's scenes now wait for the button). Harness only.

## Tests (final build 423f6b26, 755x1000@2 and 1180x820@2)
- PASS both sizes: mline-guest, scene-end-sweep, unmet-names-scan, opt-overflow-scan, reign, act-split-w2, mk-e2e (755 run inside the suite ran before the harness fix; re-run alone after it: PASS, no page errors), boot-flash, kit-table 0 fails (the 3 Triều cục fails seen before the re-merge are gone: main merged the faction rows into one kit table), kit-conform (CONFORMS 84-85 / MISSING 15 = dialogs the scan could not open).
- Once: act-split-scan DUP_AFTER 0, act-split-vp FAIL 0, unmet-list-family 0 errors, coop-e2e (live Worker) 59/59.
- Not run: mline-oldsave (needs an old-build URL).

## Rules
KIT FIRST: no private styles added (merge + build only). ONE CORE: no BAL numbers changed; both BAL blocks kept.
