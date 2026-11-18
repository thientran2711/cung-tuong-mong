# flip-hand review r1 (SMALL tier) — PASS 673dafc09
Reviewer session_01UV1SzhQEsHLJz1pK4VbSsS. Branch review/flip-hand-r1 = review/flip-hand 745e1ab8 + origin/main 12f52db7 (conflicts only in generated index.html/sw.js; rebuilt with dev/site/build_site.sh). Descends from current origin/main, FF-able. Not pushed to main.

## Verdict: PASS 673dafc09
Flags (owner may want to look, not failures):
1. 1180x820, "me" card (left column, near left edge): at the touch moment only a small brocade cuff shows in the top-left corner; the visible part is mostly a long bare forearm + hand (sleeve mostly off-screen). At 755x1000 the touch frame shows the full cuff + brocade sleeve + hand, good.
2. Long tasks per scene are high in this harness (SwiftShader + video recording, 7.7 s total at 755 me); same class as the worker's note, not measured on a real device.

## Checks
- Merge: clean except generated files; rebuilt; kitEmpHand registered in KIT.md §67b (1 row), part used by jflip only (no private hand elsewhere).
- cardflip.js 755x1000 + 1180x820: demo scenes OK (cards in tray, picked card on screen, no h-scroll, tap-skip, reduced-motion still, old save ok). Real-week-end step = NO SCENE on BRANCH AND MAIN alike (harness queue busy) = environment, not the branch. Page errors only file:// audio fetches (artefact of file URL).
- flip-hand.js (hand rect per frame), localhost server: cut-edge-inside frames 0 in all 4 runs (755 me/right col, 1180 me/right col); hand/card height 4.4 / 4.2 (755), 3.6 / 3.6 (1180). No page errors from the game.
- Looked at frames: 755x1000 whole arm + sleeve enters from the top edge, dip, lifts with the card, shadow on the tray, no fade, not pasted-on. 1180x820: see flag 1.
- Old-save load: cardflip "old":{"ok":true}; game-feel oldLoad ok on main and branch.
- kit-conform 755x1000: branch 87/16 vs main 88/15 (event-dialog sampling varies run to run; no flip dialog involved; floats: kloadchip on both).
- game-feel (worker's crash 'inv' of undefined): rerun on main AND branch (own sw-serve ports, alone and concurrent): NO crash on either; ran to the end, oldLoad ok. Only difference seen: the offline step's pixi cache (swCached) is empty in some runs on BOTH main and branch (main alone: empty; main concurrent: filled; branch both: empty) = lazy CDN-cache timing of this sandbox, not caused by the branch. The worker's crash was not reproduced; likely the harness (old/offline switch while S undefined), unrelated to this branch.
- Perf: only transform/opacity WAAPI, 1 wrapper + 2 img + shadow pad; no new network bytes. Not measured on real Fold/iPad GPU.

## Handover
Nothing pending. Coordinator may fast-forward main to 673dafc09 (SMALL tier, owner-visible look at 1180 touch moment optional).
