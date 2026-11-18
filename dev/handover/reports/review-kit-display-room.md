PRIORITY #1 CHECK: OD 17/11 ~18:30Z (A),(c),(d) + ~18:33Z (3) | main: no jshelf/shelfOf (rail icon correctly hidden) | review/* kit-display-room c35952b7, review/display-shelf | claims kit-display-room.
# review kit-display-room r1 — PASS c6d84567
Branch review/kit-display-room-r1 = origin/main c114ab9e + review/kit-display-room c35952b7 (clean merge) + rebuilt index.html/sw.js. Ancestor of main OK.
Tests: node dev/test/display-room.js on rebuilt host build: fold 755x1000, ipadAir 1180x820, ipadPro 1366x1024, foldLand 1000x755 = 4/4 PASS, 0 page errors. Build: img-allowlist OK. 412x1058/390x844 not run (rotate prompt, OD:L339).
Looked at shots (scratch, nothing in git/CDN): fold, fold+drawer, ipadAir, ipadAir+drawer, foldLand+drawer.
- Layout: room between top bar and bottom bar, both visible; iPad 2x6 no scroll; Fold 1x12 scrolling. Cut-out items on plank, no item frame; kit chips/✕/kitItem slots/item card only (no private chip/frame).
- Drawer: only that group's items, Đang bày row, Vượt phẩm mark, Trưng bày -> placed + drawer/card close, Cất xuống OK.
- Rail icon hidden until API (test apiHidden + noFixtureOpen PASS); no stored state, old saves unaffected.
Non-blocking notes (for builder / display-shelf step):
1. Fold: no explicit scroll cue; only the half-cut 7th label hints at scrolling.
2. Drawer covers the lower rows; tapping shelf 5-6 on iPad (no scroll) or the last shelves on Fold hides the selected shelf behind the drawer (header names the group, so usable). Suggest scrollIntoView on phone.
3. Fold drawer shot: 2nd tile art blank at 350 ms (lazy CDN image); iPad fine — probably timing, re-check with real data.
4. Items small on iPad rows (~82px); fine for hairpin fixtures, recheck with painted décor.
5. Perf smoke Fold: no errors, instant; no profiler run.
~85% xong / ~70% chơi được.
