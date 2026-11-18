PRIORITY #1 CHECK ('Dư đồ.*(blank|trống)|map view blank|du-do-blank|dudo.*blank'): OD 3 (= 16/11 "A ca sở" label placement, a different bug) | ledger 0 | claims 3 (= D's 19:08Z ticket only) | main 0 | review/* 0 → nobody on it (MAIN s37 order 20:24Z).

# review r1 — review/dudo-blank @ f59c965a (Dư đồ blank while the picture loads)

Verdict branch: **review/dudo-blank-r1 @ 2270c4c56fc9196179ea0eec035f5d942590817f** = f59c965a + merge of NEWEST origin/main 4c8568f5 (generated index.html / sw.js / assets.json conflicts resolved by rebuilding with dev/site/build_site.sh; main is an ancestor → fast-forwardable). No code change by the reviewer.

## 1. Reproduce on LIVE, then the branch (picture delayed 6 s, dev/test/dudo-slow.js)
| size | LIVE early (.mapw w x h) | BRANCH early | BRANCH late |
|---|---|---|---|
| Fold 755x1000@2 | 1029 x **0** FAIL | 1029 x 574 PASS (26 spots in view) | same, art loaded |
| Fold cover 412x1058@2 | 1029 x **0** FAIL | 1029 x 574 PASS (15 in view) | same |
| iPad 1180x820@2 | 958 x **0** FAIL | 958 x 535 PASS (29/29) | same |
| iPad Pro 1366x1024@2 | 1144 x **0** FAIL | 1144 x 638 PASS (29/29) | same |
Bug is REAL on live at every size; fixed at every size. Courtyard detail (DETAIL=1, Fold): PASS, 1353 x 769 from the first frame (that box was already held by r3 `.kpmv .mapw` aspect 1.76).
Worker probes on the branch: dudo-blank 4/4 PASS (art 38/38, 26/15/29/29 spots in view), dudo-title 4/4 PASS, dudo-slow 4/4 PASS.

## 2. Family scan (own scan, not the worker's list)
Every `.mapw`/`.mapimg` use (grep dev/build + all.js): j27:70 Dư đồ, jpm:76 courtyard detail — only two, both now boxed (p1:345 aspect 1792/1000; jpm:146 aspect 1.76). Other picture-sized boxes checked for "height only from the image": `.kne-pic` (aspect-ratio 4/3), `.kbk-evart` (3em x 4em), `.kpod-medal` (width-only img inside a fixed medal, text overlay positioned in %, loads in-box), `.kmpeony/.kmbox-*` (absolute overlay animations), figures/portraits (aspect-ratio 3/4 kit), room scenes (CSS background on a sized stage). None collapses. 0 left.

## 3. Title vs −/+ buttons
LOOKED at the loaded Dư đồ at 755 and 1180 (title cartouche "Dư đồ" top-left, −/+/Ra vào/Danh sách row right, no overlap; detail hides the tools row). dudo-title probe 4 sizes PASS. Cause fix lives in the shared kit part (`.mapw` in p1.html, KIT §85.9 written in dev/kit/KIT.md in the same branch); the kit sample page shows the same map through the same CSS/JS (no separate copy). Fast-load and slow-load both fine.

## 4. Pan / zoom / tap (own probe, scratch, not committed)
755/412/1180/1366: "+" grows the frame, "−" shrinks, drag/scroll pans (scroll offsets change), frame ratio 1.792 = img ratio 1.792 at default and zoomed (no stretch), tap on Đức Thọ cung → card opens. My label-position heuristic flagged labels at zoom on BOTH builds (live flags more: 25 vs 6 at 412) — not a regression; labels sit on their places in the shots.

## 5. Gates (on 2270c4c5)
- one-core-guard: 0 fails. coregates PASS (rules-one-source, kit-conform, coop one-world), time-spill guard PASS.
- quickcheck.sh PASS twice. --runs 7 interleaved vs live 4c8568f5: render 167/196 ms, tab 346/341, buổi 826/865 (−4.5 %), tasks>200ms 14/13, open 1327 ms, old save loads + plays a buổi. (runs of 3: 194/179, 380/380, 924/843, noisy as known.)
- coop-e2e on the branch: 63/63 passed (regression guard; live cannot be better than all-pass). No co-op code touched.
- Shots only in scratch; no images in git, no CDN review folder used.

PASS 2270c4c56fc9196179ea0eec035f5d942590817f
