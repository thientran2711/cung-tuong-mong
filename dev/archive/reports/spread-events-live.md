# spread-events-live (D13 go-live prep, Foreman B worker)

Branch review/spread-events-live = review/spread-events-r3 (1c4ea5810b79efd8a9c4da4d52ee0f8ad95af80d, reviewer PASS) + origin/main 8f476f6f9ece73d6994f51a9b7452c180061c3a1 (schedules3-r5 + mg-train-r1).
Merged sha: 2934bedee376d456daf5d15dc0f423d9f55cd2a9

## Conflicts and resolution
| file | resolution |
|---|---|
| dev/build/assemble.py | main's module list kept (jmgt, jslap added); jspread.js re-inserted right after jqsave.js, before jkpc.js (same place as r3) |
| dev/build/jbal2.js | both blocks kept: BAL.spread (D13) and BAL.slap + mgTier.occ (main) |
| index.html, sw.js, assets.json | generated: not hand-merged; took main's then re-ran bash dev/site/build_site.sh (assemble.py rebuilt, 0 conflict markers) |

## Tests on the merged sha
| test | result |
|---|---|
| spread-e2e (A 6 viewports incl. 755x1000@2, 1180x820@2; B old save from origin/main index.html loaded on this build at 755x1000@2 and 1180x820@2; C reload keeps waiting card) | PASS, 0 page errors, no overflow |
| coop-e2e (live Worker) | 59/59 passed |
| old-save load, screenshots 755x1000@2 and 1180x820@2 (looked at both) | loads, 0 page errors, no horizontal overflow; main's "Điều mới trong cung" notice and game screen render normally |

Not re-run: roster_audit / bot histograms (reviewer numbers from r3 stand; merge touched only build lists, BAL blocks and generated files).

READY 2934bedee376d456daf5d15dc0f423d9f55cd2a9
