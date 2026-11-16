# Review — review/presentation (D11) — r1

Reviewed: review/presentation @ ddb4d1ff. Merged onto latest origin/main (695934d1) as review/presentation-r1; conflicts only in generated files (assemble.py kept main's list + `jpres.js` after `jsfx.js`; index.html / sw.js rebuilt with dev/site/build_site.sh).

## Results
- Code: `jpres.js` wraps only `showModal` + `musicCtx`; 0 createElement/innerHTML/style/CSS → no private chip/row/frame (kit-only; frame hooks are `data-kpres-*` only; K-A/K-B/K-C stay KIT REQUESTS for the kit keeper, not built privately).
- Every event group: dev/test/presentation.js, 75/75 categories (plan + dialog attrs, visible, sound, music = group track, story main/side/origin, Gọn starts no particle/edge), 0 page errors, 0 HTTP >= 400 at ALL 6 viewports: 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844. Longest frame gap with 12 cards in a row: 24–83 ms (software rendering).
- Audio does not stack: one group sting per card, suppressed when a keyword sound (jsfx SFXTXT) matches; voice only as fallback when j36 voKind found none; fx of the same kit kind throttled 6 s.
- coop-e2e on the merged build: 59/59 pass, 0 FAIL (worker reported 58/60 with 2 pre-existing FAILs; they do not reproduce on current main + branch, so nothing to attribute). Includes "solo: old save loads, no co-op".
- Screenshots looked at (755x1000@2: dau-doc, le-xuan): kit category frame intact, painted fx light, no object over the card text; deleted afterwards.

## Fix made by reviewer (test only)
dev/test/presentation.js: `KPRES_LOG` is capped at 80 entries, the test read `slice(k0)` from the pre-card length, so after the log filled the 75-category loop reported false `noPlan` (seen intermittently on the first/second size). Test now clears KPRES_LOG/KSFX.log before each card. No game code changed.

## Notes (non-blocking)
- Perf only measured headless; owner devices not measured (worker already asks for a re-check on a real device).
- Open art/kit requests in presentation.md (bgm-romance/court/joy/intrigue, K-A dialog frame by group/origin, K-B kitSceneEnd, K-C entrance animation) stay with the coordinator; OD 07:20Z "animation scenes end with a button" is not touched by this branch (K-B).

PASS 9ec1852a090c9cd0eb03b31bd273e1738142693e
