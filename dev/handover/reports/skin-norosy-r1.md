# skin-norosy-r1 review (reviewer session, 11/16/2026)
Verdict: PASS review/skin-norosy-r1 @0ee35a63 (fast-forwardable onto origin/main ee5d33de; re-merged + rebuilt after main moved, figpages 755x1000@2 0 broken/0 errs and sw-norosy 87/87 re-run). START_CTX ~5 % of window.

## 1. Merge + rebuild
- Merged origin/main e9c6021d into review/skin-norosy @95f8d7cd. Only conflict: sw.js (build hash) -> took main's, then `bash dev/site/build_site.sh` regenerated index.html (identical to main), assets.json, sw.js (shell 7627bb56362b). No hand-merged hashes.
- assets.json vs main: exactly 2432 keys changed hash (por 959, fig 944, hd/fig 389, tn/por 72, tn/fig 68); 0 added, 0 removed; nothing outside fig/por families changed.

## 2. Pictures
- 40 random hashed URLs (fig/por/hd/tn) fetched with ?h=md5: 40/40 HTTP 200, md5 prefix and byte size equal assets.json.
- Face a* (Lab, central face box, 12 random portraits per group): emperor 7.5, thaihau 8.2, player 7.6, consort 8.2, eunuch 7.4, mama 8.6, official 7.5, physician 7.6, man 8.2, kid 8.4, maid 8.5 (all groups in one 7.4-8.6 band, no outlier group; worker's before-fix value was ~ +6 higher on rosied ones).
- Rosy pass only ever touched fig/por (+hd/tn twins); event/act/pl/face pictures were never rosied, so nothing to undo there.
- figpages.js (boot + every tab, fig/por shown/broken): 755x1000@2 and 1180x820@2 -> 0 broken, 0 page errors.

## 3. Tests (node dev/test/cdn-overlay-serve.js 8765 <root> <empty list>)
- game-feel.js fold+ipad (755x1000@2, 1180x820@2): errs 0, offlineErrs [], old save loads. Same run on main for comparison: only timing numbers differ.
- kit-conform.js 755x1000 and 1180x820: CONFORMS 84-86, MIXED/CUSTOM 0, floats none (MISSING 15 vs main 14 = dialogs not reachable in the scripted state, run-to-run variance, no violations).
- kit-conform takes no dpr argument (runs at 1x); fold/ipad @2 covered by figpages + game-feel.

## 4. Service worker
- New dev/test/sw-norosy.js: fresh profile, SW active, game started, 3 tabs opened -> 87 fig/por URLs cached, 87/87 with ?h= equal to the new assets.json hash, 0 stale. Since 2432 hashes changed vs main, an existing install fetches the new pictures (old ?h= keys are not reused).
- Caveat (worker's note): plain URL loads without SW can serve the old same-name picture up to 7 days from CDN cache.

## Not checked
- Pictures cannot be compared to the pre-rosy originals here (not in git); relied on worker's measurements + group a* consistency.
