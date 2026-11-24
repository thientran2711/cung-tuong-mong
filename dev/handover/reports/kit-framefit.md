# kit-framefit — report

## REVIEW r1 (sonnet reviewer-lander session_01N1tNP2F8nQScURNNfgLvQr · 24/11)
START_CTX ~3 %. PRIORITY #1 CHECK: OD 0 | ledger 0 | claims KK16 | main kszFootUp/KIT 56.x jksize.js | review/kit-framefit 055baec6 | KIT_REQUESTS KK16 audit.
Branch review/kit-framefit-r1 = 055baec6 + merge LIVE 27240ccb (conflicts only in generated index.html/sw.js/assets.json → rebuilt; KIT_REQUESTS.md kept both blocks) + fix commit → 0bc95692c17e79404d29452ec529accedbda3100.
| check | result |
|---|---|
| Merge newest origin/main, rebuild | merged, build OK, built files committed (sha holds its own build) |
| Consistency scan (laws 9/10/11) | FAULT FOUND + FIXED: KIT.md had TWO §56.18 (figure slot vs existing «ONE SCROLL RULE»); figure-slot part renumbered §56.21 in KIT.md, KIT_REQUESTS, jksize.js comments, ending-screens.js label. Scroll-rule refs (56.18) untouched. Users of the changed parts: kszFootUp/min-height 58 → every .kszf/.ksz3/.kszlive frame via kitFrameApply3 + kitFrameApplyLive3 (one place each, no per-place variant); .kcf-tag backing in one CSS rule; kitHintPhrase rows in jk2b (one table) |
| node dev/test/ending-screens.js | 268/268 (Fold 755x1000 + iPad 1180x820, 11 endings incl. old save), 0 page errors |
| node dev/test/dialog-fixed.js | all pass (both devices, 0 page errors) |
| node dev/test/hint-dedup.js | dupAfter 0, errs [] |
| node dev/test/cardflip.js (48.1 tag over tassel) | tag has paper backing on Fold + iPad, tassel behind it, rank word readable |
| quickcheck | PASS 255 s · core gates PASS · time-spill PASS · open 2228 ms · old save loads + plays a buổi · perf new/live render 300/264, tab 554/492, buổi 1832/1642 (noise level, one box) |
| Old save | LIVE-built save loads, name kept, 0 errors; ending-screens old-save case pass |
| Shots Fold + iPad full screen, each looked 3× (law 12) | death, grand, leave/throne, fate dialog, card-flip picked card: figure slot same size across endings, button at foot of info column, nothing cut, no overflow |
| Wording (law 7) | «chủ thêm/bớt tin dùng kẻ hầu», «Hoàng thượng để ý/bớt để ý đến kẻ hầu»: cổ trang, no %, signs via kitHintSign |
Note (not a fault, author's residual): iPad frames of endings with a long info column grow 0–11 px. Test overlay drapes in shots are stand-in art (test only).
Verdict: **PASS** 0bc95692c17e79404d29452ec529accedbda3100. Shots scratch only, nothing in git/CDN.
