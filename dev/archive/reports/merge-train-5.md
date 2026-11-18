READY 399483e3c08d2356a8ba7d34439043850f586c86

(review/merge-train-5 @ 399483e3, descends from origin/main 2940a545; boot x5 OK, coop-e2e 59/59 after the last re-merge. Full report: dev/handover/reports/merge-train-5.md on review/merge-train-5.)

# merge-train-5

Branch review/merge-train-5, built from origin/main 0c23da40, then origin/main bad941b4 merged again (main moved during the run). All merges --no-ff, in this order.

## IN (5)
1. review/personality-r1 @ 99b5e315 (D7). assemble.py: jtrong.js right after jaudit.js.
2. review/tuduc-pic-r1 @ 2954ff9f (C41b). Brings jtd.js (tuduc-mg lineage).
3. review/newgame-ui-r3 @ f484d226 (D-R1). Only generated-file conflicts.
4. review/opt-pics3-r1 @ f02abdc4 (D53b). Contains placeholder-pics3-r1 + tuduc-sub-r1 (D16, jtds.js); assemble.py: jtds.js, jwkpics.js appended, jwkpics after jtds.
5. review/skin-audit-r1 @ d16535c6 (D52). Notes/scripts only, clean merge.

## SKIPPED
None (no branch was an ancestor of origin/main or origin/review/merge-train-4).

## OVERLAP WITH merge-train-4 (for the coordinator)
Content overlap, not commit overlap: opt-pics3-r1 carries tuduc-sub-r1 (jtds.js) and tuduc-pic-r1 carries the tuduc-mg lineage (jtd.js); train-4 also contains both. The assemble.py module lists are compatible (jtd.js ... jtruth, jtds.js, jwkpics.js, jact.js, jkc.js outermost). Expect trivial generated-file conflicts when the second train lands: rebuild with dev/site/build_site.sh.

## Conflicts and how they were resolved
- index.html, sw.js, assets.json: never hand-merged. Took main's side, rebuilt with dev/site/build_site.sh after every merge.
- dev/build/assemble.py: union of module lists (main's order + new modules inserted after their predecessor in the branch's list).
- No real source conflicts.

## Extra commits
- CLAUDE.md "START HERE" first bullet under "Rule sources" (coordinator request).
- dev/test/tuduc-mg.js: train-4's step that handles tuduc-sub's work/teacher dialog, plus a longer wait between that dialog and the material dialog (the material dialog now has pictures from opt-pics3; the old 500 ms wait made the harness give up). Harness only, no game code.

## Tests (on the merged build)
- trong-check.js (personality): 6 viewports, old save loads, ERRS [] (re-run on final sha: ERRS []).
- tuduc-mg.js (tuduc-pic): 4 games x self+master at 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@2: 48/48 pass, page errors none.
- newgame-ui.js 755x1000, 1180x820, 844x390: figure tier 321/988, 689/810, 328/385 (same as the reviewer's numbers), pick tap->paint 11-58 ms at default CPU.
- panel-size.js 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: exit 0, 844x390 58 cases / errs 0.
- Boot (no page errors, no horizontal overflow) at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: OK (also after the second main merge).
- coop-e2e: 59/59 on the first build and again 59/59 on the final sha (after the second main merge).
- Not run: opt-pics3 all_recipes.js (needs CDN, 150 recipes) and the stage-fig-size run; art reviews of skin-audit rest on the reviewer's report.

## Notes
- First attempt at tuduc-mg after the opt-pics3 merge failed only because of the harness (see Extra commits), not the game.
- After the second main merge also re-run on the final sha: boot x5 OK, tuduc-mg cong+hanh at 844x390 4/4 pass.
- Third merge of origin/main 2940a545 (GO from s13; new main module jhouse.js kept last as on main): boot x5 OK (no page errors/overflow), coop-e2e 59/59.

## Post-deploy smoke (live, main = 399483e3)
- Live site served the new build (hash equals branch index.html); 755x1000 and 1180x820: HTTP 200, no page errors, no overflow. SMOKE PASS.
