# review face-reveal-anim — PASS 97de885 (reviewer session_01UV1SzimcXuUf9Ahi1zHTBi)
PRIORITY #1 CHECK: brief + report face-reveal-anim read; OD 18/11 ~06:20Z (face reveal) verbatim; KIT 79; git grep k61Know/k61Meet/unknown- on the branch; claims row MAIN.

SHA reviewed: 97de885 = 8f5ea90 + merge of origin/main 4dcd50e. Fast-forward of live main 4dcd50e7: yes. Extra diff vs main = 11 files, all the branch's own (jreveal.js, jbal2, assemble, KIT.md, face-reveal tests, index.html, sw.js).

## Checks
- One kit part: kitReveal (jreveal.js) wraps pcPort (tall frame, also pframe), mdH (small avatar), kitStageFig (event figure + week book) and renderStage tokens (#tokens .tok.fig). Wrappers only mark; one player. PASS.
- Every face-learn path: all of them go through k61Know / k61Meet (git grep: greet, arrival, scouting, reports, festival, kid, men, kc, ts, staff...); both wrapped. A place drawn grey then drawn with the face also triggers (covers npcLearn/met61 flips). None instant. PASS.
- In place, no scene change, no layout change: grey ghost sits over the real picture, pointer-events none, follows the picture box; removed on animationend/timer. Seen in shots. PASS.
- Slow: BAL.faceReveal.ms = 1000 x BAL.pace (1.75) = 1750 ms, one core (BAL only); Gọn/reduced = 350 ms fade. PASS.
- Co-op: render of local state only, nothing sent (no net calls in jreveal.js). Old save: fires only on a flip; known people/save load play nothing (test knownVeils 0). PASS.
- Tests (run by me): face-reveal.js PASS (grey before, 4 veils, removed, 2nd look 0, Gọn lite, known 0, 0 errors); face-reveal-stage.js 1180x820 veil on stage token running krvwipe, 0 errors; greet-stranger.js PASS; one-core-guard PASS (fails 0).
- LOOKED fold-stage-slow, fold-dialog-slow, ipad-dialog-slow: stage grey silhouette clears from the head down into the real figure in place; dialog grey bust clears to the real portrait in place. OK.

## Tickets (not FAIL)
1. Pre-existing 1 blank stage frame when the greeting re-renders tokens: not worse here.
2. Podium (kpod-img via kitFigOf, j90) and the grey-ghost silhouette on a cold CDN are not covered by a place hook; podium shows people already known in practice. Low.
3. MutationObserver on body subtree runs a cheap querySelectorAll per mutation batch; watch perf on the busiest stage if she reports lag.

Verdict: PASS 97de885. img/_review/face-reveal-anim to wipe by the coordinator/CDN owner after PASS (I have no CDN delete tool here).
