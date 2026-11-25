# REVIEW button-crawl-fix-3 6b401cfc — BIG REVIEWER #4 (session_01UV1Szh4xkQ1qFN3jffTKyr), 25/11
PRIORITY #1 CHECK ('button-crawl-fix-3|G1 mefig|krail left'): claims BIG REVIEWER #2/#3 rows (F) | review/button-crawl-fix-3 6b401cfc, review/robot-realtap 93812531, review/robot-realtap-r cd89d545 (older, bfe29c95) | reports dev/handover/reports/button-crawl.md row 8, dev/PROGRESS_test-path-fix.md (finding G1).
Local server: python3 http.server on 127.0.0.1 started fine (no refusal). START_CTX 4 %, depth 8.

## VERDICT: PASS 6b401cfc (fast-forward of LIVE origin/main 9f72524b, checked on origin 25/11 ~11:20Z; index.html/sw.js already rebuilt on the branch)

## What was checked
- Code read (#3 did it, re-read here): jrail.js clears the header-slot inline left/flex-direction when #krail returns to the stage/dock; j59.js reserves the right strip only for a #hud2 panel on the RIGHT half and the left strip only for a #krail on the LEFT half. Layout-only, no new UI part, no player-visible words, no numbers (laws 4/7/9 not touched; law 11: the fix covers every token/slot of the stage, not one spot).
- G1 before/after with the same real-tap test (dev/test/toil-overlay.js, Fold 755x1000@2): LIVE 9f72524b = 7 DEAD tokens (covered by img#mefig) · branch 6b401cfc = 0 DEAD / 27 taps. iPad 1180x820@2: 0 DEAD / 27 taps.
- Clean-play probe (new life, no injected state, real taps via realtap.js, 5 token → focus → ✕ cycles): branch Fold 0 dead (her figure x 91..341, token 375..548, separate slots), iPad 0 dead / 10 taps, 0 page errors. Screenshots looked at (Fold room + iPad room): two people in separate slots, rail on the left, nothing overlapping.
- Tests (built root index.html, real taps): toil-overlay Fold+iPad rc 0 (33 checks, 0 bad) · toilette Fold+iPad rc 0 · hoa-dien Fold+iPad rc 0.
- Old save: dev/test/care-oldsave.js LIVE 9f72524b save → branch: ok, no banner/body overlap, 0/0 page errors.
- Note (not a fail): toilette under 8 parallel browsers once failed on «#k3tt [data-k3=toil]» DEAD/NOT VISIBLE; rerun alone on Fold and iPad = rc 0 (CPU load, not the branch).

## Landing note
dev/test/realtap.js here is the older 78af2325-line copy; review/robot-realtap-r2 5e504d79 (child of 6b401cfc) carries the newer harness version — land fix-3 first, then r2 fast-forwards on top.
Shots: scratch only, deleted; none in git.
