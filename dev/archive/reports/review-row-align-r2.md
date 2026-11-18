PASS 69e6d56f18c555763acd3dd0eb291b3736ad022e

review/row-align-r2 @ 69e6d56f18c555763acd3dd0eb291b3736ad022e contains origin/main ba07c65e (fast-forwardable).
- Merged newest main twice (generated index.html/assets.json/sw.js conflicts only; rebuilt with build_site.sh).
- Small fix: Triều cục pane (jreign.js rgPaneHTML) had two adjacent kit tables with 47.9px value spread (kit-adjacent/kit-block FAIL at 1180x820, 1366x1024). Merged into one kit table. After: 0 fails.
- kit-table.js: 1180x820@2 0 fails, 1366x1024@2 0 fails, 844x390@3 0 fails (also re-run after last main merge); r1: 755x1000@2, 1000x755@1 PASS. 0 page errors.
- panel-size.js 7 viewports incl. 390x844: 0 errs, one width per viewport. Note: btnOut PEND:plantpick at 1000x755/1180x820/390x844/412x1058 is identical on origin/main (pre-existing, not from this branch) -> separate follow-up.
- Cross-tab scan of kitRowsAlign: all lists in every tab/dialog (incl. adjacent/block kinds) align (spread <=1px, no one-word labels).
- Screenshots: could only inspect court skill cards at 1366 (fine); other shots were blocked by random-event modals/rebirth screen, so visual check relied on measured scan.
