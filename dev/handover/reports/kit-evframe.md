# kit-evframe — report

## REVIEW r1 (sonnet reviewer-lander #2 · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: KIT.md §93.4 (overwritten in the branch), KIT_SCN in jkitsel.js, OD 24/11 ~04:35Z | review/kit-evframe 0b548a91 | only caller of Sc.pair = kit-selscene test + kit page §93 demo (git grep) | claims B.
Branch review/kit-evframe-r1 = 0b548a91 + merge LIVE 68799300 (auto-merge KIT.md) + rebuild + new test → 298ba4e4fffdf7e175d8b6b8964b7ad32ff1a42b.
| check | result |
|---|---|
| Consistency scan | ONE geometry table KIT_SCN.fold|ipad (mfh, msgrX, boxX/boxW, cTop/cX/cW, hfh, meX, nmX, nbW); Sc.pair is the only layout-A entry, solo path unchanged; KIT.md §93.4 canon-overwritten (old «two figures stacked on the left» removed); no per-place variant |
| node dev/test/kit-selscene.js OUT 755x1000,1180x820 (bare 0b548a91 changed it for the half-body no-clip rule; merged head run) | all ok incl. «pair layout A» (cards 4), 0 page errors both devices |
| Tests: branch tests only the WITH-choice layout → I added dev/test/kit-evframe.js (no args = both devices): with choice: speaker LEFT full body (cx .22/.17, not clipped), her RIGHT half body (cx .82/.84, cut by the bottom on purpose), story box right-top (tail left), choice box BELOW and left of it (over the left figure, tail right); NO choice: BOTH full body, one each side, never clipped, ONE box between | ALL PASS Fold + iPad, 0 page errors |
| bash dev/tools/quickcheck.sh | PASS 253 s · core gates PASS · open 1981 ms · old save ok · perf render 268/251, tab 512/507, buổi 2684/1357 (one-box median; the buổi figure is 2× live on this run but quickcheck's own threshold passed — scene layer is not part of a buổi; watch if it repeats) |
| Shots Fold + iPad (with choice, no choice), looked | layout as the owner described, nothing cut, boxes inside the layer, options scroll inside the choice box only |
Notes: cross-branch: sqopt-r1 gives `.kscn-box` option cards the square tier picture; in this branch alone the cards in the choice box still show the old tall picture (expected until sqopt lands first). No co-op part.
Verdict: **PASS** 298ba4e4fffdf7e175d8b6b8964b7ad32ff1a42b.
