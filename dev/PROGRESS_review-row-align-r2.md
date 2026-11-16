# review/row-align-r2 progress
- Merged origin/main 0a311183 (conflicts only in generated index.html/assets.json/sw.js; rebuilt via build_site.sh).
- FIX (small): Triều cục pane (jreign.js rgPaneHTML) had two adjacent rows67 tables (kit-adjacent/kit-block spread 47.9px at 1180x820, 1366x1024). Merged into one kit table (§51.1 one block = one label column). After: 0 fails.
- kit-table.js (tabs step on final build): 1180x820@2 0 fails; 1366x1024@2 0 fails; 844x390@3 0 fails (earlier r1: 755x1000@2, 1000x755@1 PASS).
- panel-size.js 7 viewports (incl. 390x844): 0 errs, widths uniform per viewport; btnOut PEND:plantpick at 1000x755/1180x820/390x844/412x1058 is IDENTICAL on origin/main (pre-existing, not a regression; follow-up).
- kit-table `ovf` flag on Việc hôm nay skill-card Cần/Tốn/Được rows at 1366: not a fail, visually fine, unrelated to this branch.
- Cross-tab scan: kit-table lists every tab/dialog list incl. kit-adjacent/kit-block kinds: 0 spread>1 after fix.
