# ending-screens-land — OPUS BIG re-merge (Foreman B ROOT-5 → ROOT-6; brief b5-ending-screens-land.md, MAIN 92 order 08:53Z)
PRIORITY #1 CHECK: OD 21/11 marks #48 #50 #51 #52 #84 | main e391b85f: quickcheck.d/80-dialog-fixed.sh + dev/test/dialog-fixed.js (G4, kit-dialog 686807ef) | review/* review/ending-screens-rv c073f8d4 (PASS), review/ending-screens-2-r1 da613d5a (PASS) | claims CLAIMS row ending-screens-land (this session)
START_CTX ≈ 5 %; finished ≈ 20 % (no rollover).

## SHAs (land order: (1) first, then (2))
1. **review/ending-screens-land 6d59c2d94cacae33bdea0cc93c8b1bb99a05b76c** = c073f8d4 + LIVE main f13dc915 + fix + LIVE main e391b85f. TIER BIG.
2. **review/ending-screens-2-land df03ad2683e52f5d3621199e8820c45961dcb8bb** = da613d5a + (1) 6d59c2d9 (main e391b85f is an ancestor). TIER BIG.
Main moved to 94cbe0cd (quest-rows-2) after the tests: `git merge-tree` shows ONLY index.html/sw.js conflict → land = take main + assemble.py + build_site.sh.

## Fault + fix (laws 9/10/11)
- G4 80-dialog-fixed (f) FAILED on Fold: the ending frame had its OWN size (KIT §91.4b: width min(100% − 2×margin, 1180px), height = content) → Đại kết cục / Kết cục thua / quiet frame 672x559 Fold, 1052x549 iPad, left figure 220x445 instead of the kit XL 220x666 (Fold).
- jend.js: the ending-only width/height/max-height override is GONE; the ending frame = the kit XL frame (`--kszw`, kit height). The ending keeps only the top offset (flower room) + tone ring. Result: every ending frame = 562x770 Fold / 860x548 iPad, same as every other XL dialog; dialog-fixed all pass.
- KIT §91.4(b) rewritten in place (canon overwrite). Merge conflicts: assemble.py = main list + `jend.js` last; KIT.md = main's 21b–21d/6.2f + §91; index.html/sw.js rebuilt.

## Family scan (law 11) — dev/test/ending-screens.js now prints a figure table and FAILS if endings of one device in the same kit frame + same header/footer height do not share the same figure slot (.kszfig)
| case (Fold / iPad) | before (c073f8d4) frame | after frame | figure slot after |
|---|---|---|---|
| death, exile, leave, throne, grand-exit, rare-exit (life end card, footer button) | ≈672 wide / 1052 wide, content height | XL 562x770 / 860x548 | 220x646 @53 / 220x424 @53 |
| grand, fail (option dialog) | 672x559 / 1052x549 | XL 562x770 / 860x549 | 220x704 @53 / 220x483 @53 |
| fate (Bảng Thiên mệnh), rare result (header 58 px) | 672 / 1052 | XL 562x770 / 860x548 | 220x688 @69 / 220x466 @69 |
ending-scan: 40 ending callers, untyped 0 (every caller goes through kitEndScreen).
**KIT REQUEST filed** (dev/kit/KIT_REQUESTS.md, kit keeper): the kit takes the footer button row (#mr) and a taller header from the figure column for EVERY dialog, and the 2-line name plate from the picture → in one frame size the figure is not one slot for button-only dialogs. Not ending-specific (endings add no size now); dialog-fixed (f) only measures option dialogs.

## Tests
(1) on 6d59c2d9 (and f41dba60 before the last main merge):
- bash dev/tools/quickcheck.sh: QUICKCHECK PASS · core gates PASS (incl. G4 80-dialog-fixed) · old save ok · render 271/313, tab 437/553, buổi 2972/1989 ms (f41dba60: PASS too)
- dialog-fixed.js Fold+iPad: all pass (c073f8d4+main before fix: 1 FAIL as in the order)
- ending-screens.js Fold+iPad @2 (OLD=live main): 272/272 (shots looked 3×: death/grand/fate/exile both devices); @1 on 6d59c2d9: 272/272; --noart @1: 250/252 → the 2 were the figure-slot grouping before header grouping, rerun with art after the fix 272/272
- coop-ending-screens.js 8/8 · COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc coop-e2e 92/92 (f41dba60) · ending-scan 40/untyped 0
(2) on df03ad26:
- fullscreen-scenes.js Fold+iPad 178/178 · night-end-r3 Fold+iPad picFull true, capClearOfBtn true, afterBtn 1 · scenes3 errs [] · dialog-fixed all pass · quickcheck PASS (core gates PASS, old save ok, render 317/317, tab 685/664, buổi 1820/1851 ms) · coop-e2e 94/94
- Shots looked (Học thành tài Fold, Bình minh mùa xuân iPad): full screen, words + one button clear.
Shots in scratch only (/home/user/wt/esl-out), not in git / CDN.

## Notes for reviewer
- Placeholder overlay pieces in the test shots are the test's stand-in pictures (real flower/drape art = Foreman C, still pending). On iPad the drapes (38 % inside the frame edge) touch the last letters of long right-column lines — same as on c073f8d4 (design of §91.4c, not changed here); worth a check when C's art lands.
- Pre-existing jfx death silk over the card (rv-ending-screens note) unchanged.
- 81c kitFullPic vs §91 .kes-bg (r1 note: rebuild .kes-bg on kitFullPicHTML) NOT done — out of this order's scope.
