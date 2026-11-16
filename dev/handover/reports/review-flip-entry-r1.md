# Review flip-entry r1 — PASS
Reviewer session_01UV1SzhYZgDLd2pYjePziwY (BIG tier). Branch review/flip-entry-r1 = review/flip-entry @32749179 + merge origin/main 2ee134c5.
START_CTX ~8 % (estimate); finished well under the rollover line.

## Merge
- Conflicts index.html / sw.js / assets.json → main's; assemble.py = main's list + `jfe.js` right before `jcoopone.js` (jcoopone stays LAST). Site rebuilt (bash dev/site/build_site.sh). No conflict markers.
- Commits: 39f7a824 (merge + build), 20223e40 (test fix below).

## Code check (jfe.js)
- Self-contained: no-op when `window.nfOn` exists (night-final jnf.js), only touches S.nfP / S.nfF (same names as jnf). Safe for night-final to delete it + its assemble entry.
- Whole group of flip() callers: j2 start(), j3 endTurn (new day), jcoopworld cyFree, jcycle option → all deferred at buổi < tối (S.tonight=null, S.nfP=day). j42 servant and jkc home routes excluded by on() (unchanged behaviour; jkc flips silently).
- Real flip runs once on entering tối (nextBuoi wrapper) or via render (co-op buổi pulled in / save at tối with tablet waiting). Night already taken (ntTaken) = no flip.
- Wrapper order with main's new modules: jlag2 render wrapper (setTimeout 0) wraps outside jfe's — both pass through, no conflict.

## Tests (on the merged build)
| test | result |
|---|---|
| flip-entry.js 755x1000@1 | ALL OK (10 origins + servant + new life + load save; flip runs at tối) |
| flip-entry.js 1180x820@2 | ALL OK |
| flip-entry.js on live main 2ee134c5 | FAIL 11 (bug reproduced) |
| own probe: 8 days in a row | exactly 1 real flip per day, always on entering tối, 0 in sáng/trưa/chiều; morning flip() deferred |
| cardflip.js Fold 755x1000@2 + iPad 1180x820@2 | scene plays (real case + demo), old save ok, errs [] — shots looked at: tray, picked card, result card, button all inside screen |
| night-steal-unit.js | 0 FAIL |
| flip-newlife.js 755x1000 | ALL OK |
| coop-one-world.js | PASS |
| coop-e2e.js | run 1 56/59 (start name null, 'friend starts as Người lạ', CDN CORS console error = known flakes/env), run 2 59/59 |
| coop-night.js | run 1 98/105 (all 7 = "X sees the wait" presence freeze), run 2 104/105 (1× "14 host: guest sees the wait"); main alone 105/105 once. Same class the worker logged on unchanged main under Worker load → Worker presence timing, not this fix (none of these cases depends on the flip). |
| quickcheck.sh 39f7a824 | PASS (open 1685 ms, old save ok, render 191/247, buổi 715/979 ms new/live) |
Co-op entry shot (coop-e2e 05-world-fold): host at buổi sáng with "Hảo hữu vào cung" card, no card-flip.

## Fix made by reviewer
- dev/test/cardflip.js: its "real week end" case expected the scene right after endTurn (morning flip) → NO SCENE under jfe. Now walks the new day to buổi tối before waiting for the scene. Test-only.

## Notes (not blocking)
- OD 16/11 ~22:45Z (canon overwrite of the 22:38Z night rule) says the flip plays when tối's 4th khắc ENDS; jfe (and this brief) flip at the START of tối. jfe is a stop-gap for the entry bug; night-final (jnf) must follow the 22:45Z timing when it replaces jfe.
- deal() is re-run when the tablet turns at tối (fresh deck at tối; same as jnf part 1).
- No shots in git; scratch shots deleted.
