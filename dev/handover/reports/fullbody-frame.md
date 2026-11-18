# fullbody-frame step 1 — Tuần lục sample (worker session_01UV1SzjVbe2rs236yVuGUDn)
PRIORITY #1 CHECK: OD 18/11 ~06:45Z + ~06:55Z (verbatim) | main dev/build/jsl.js:111 kitBookFigClamp, j87.js:586 .kbk-por | review/* review/book-figsize-r5 ce8a6d48 (seal slot reused; crop rule dropped) | claims fullbody-frame (this session)

## What (review/fullbody-frame @ 10124f62, from origin/main 1c3abe3)
- BAL.bookFrame {ar .4824, maxCol .56} (jbal2.js): frame = tight box of the widest person (c03 t6, 1292x2678 of 1520x2688).
- jsl.js kitBookFigClamp rewritten: frame width = min(column height x ar, .56 x inner page width) via --porf on the person box (text column takes the rest); the figure is fitted INTO the frame by its painted box (kitFigBody l..r x t..b), aspect kept, centred, feet on the frame floor, equal-gap raise only when there is slack. No crop; .kbk-por overflow visible.
- Same kit part => Mệnh truyện and Sổ luân hồi pages (kbk-person.kbk-full) follow automatically. Other frames (notices/info/tin trong cung) NOT touched (step 2).
- r5c seal slot reused (jfigseal.js kfsHost + book slot, j87 .kbk-phead padding-right 52): "?" chip in the name row, never on the figure. KIT.md 56.3 rewritten in place. Scan: dev/test/fullbody-frame-scan.js.

## Numbers (CSS px; cut = painted box outside frame; all squeeze 1.000, text overlap 0)
Fold 755x1000: frame 330x793 (before 220x793), text col 243 (before 353).
 c03 t1 fig 309x793 | t6 330x681 (widest, fills width) | t8 330x791 | old maid(wide pink) 330x664 | old emperor 304x793 | old consort 276x793. cut 0 on all (t6 L 0.1 px rounding).

iPad 1180x820: frame 273x631 (before 183x631), text col 199 (before 289). t1 246x631 | t6 273x564 | t8 263x631 | old maid 273x550 | emperor 242x631 | consort 220x631. cut 0.
Before (main): figure only 220 wide (maid 220x443 Fold / 183x369 iPad) in a column 56 % of the height.
Because the frame is capped at 56 % of the inner width, t6 (the widest) is width-limited, so it is 681/793 tall on Fold, not full height; raising maxCol to .64 would fill it but leaves text ~190 px on Fold. Owner to judge.

## Shots (CDN, left BEFORE main, right AFTER; LOOKED at each)
https://ctm-img.victoria-tntt.workers.dev/img/_review/fullbody-frame/<dev>-<case>.jpg with dev = 755x1000 | 1180x820, case = c03-t1 | c03-t6 | c03-t8 | old-maid-wide. Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review fullbody-frame.
Page error "Unexpected token '<'" appears in before and after: harness route serves html for JSON (not a game bug).
~60% xong / ~35% chơi được (step 1 only).

## r2 (ROOT-47 feedback: ONE scale) — review/fullbody-frame @ 5e1b8e66
- Frame = ar .4824 x column width (Fold 330 -> 684 tall, iPad 273 -> 566), cap .56 kept (text col 243 / 199). c03 canvas drawn through the crop box (x -117, y 0, 1292x2678): same body height on every tier. Old figures: same body height (head-top to feet) as c03, centred, feet on the frame floor; scaled down only if the painted box would exceed the frame (never cut).
- Fold body px: c03 t1 682.5 | t6 679.8 | t8 681.1 (spread 0.4 %). Old: maid 618 (width-limited, painted width = frame), emperor 643, consort 651 (their painted crown above head-top makes the painted box taller than the frame). iPad: t1 564.6 | t6 562.4 | t8 563.5; maid 511, emperor 532, consort 539. cut 0 (t1 bottom 1 px = alpha edge), squeeze 1.000, text overlap 0, ALL OK.
- Shots replaced on CDN (same URLs, before|after). Fold strip t1|t6|t8|old maid LOOKED: feet on one line, same height.
~65% xong / ~40% chơi được.
