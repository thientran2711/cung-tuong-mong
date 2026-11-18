# REVIEW pcard-facts-2 r1 (sonnet) — PASS ab50f1c5 (review/pcard-facts-2-r1; ancestor = origin/main 7e0250ec)
PRIORITY #1 CHECK: OD ~15:25Z (6) + 16/11 s21 (square-by-content, reversed on purpose) | main kitPcKeyFit/kpDateFull none on main (new) | review/* pcard-facts-2 7ec2aa9b | claims worker session_01UV1Szh5bDFLJ7XCmCJoDvp.

Merged origin/main 7e0250ec (only generated index.html/sw.js conflicted; site rebuilt). Added by me: KIT.md fix + opt-pics.js expectation (see FAIL→fixed below).

## Checks
1. Date form: fact pop-up and Thích pop-up both "Khi nào: Tháng ba, năm thứ nhất, trung tuần" (pcard-facts.js); kpPop converts any T3/1 date in a tip pop-up (j79:277). OK.
2. iPad left block clip: pcard-fill leftClip = 0 on rv0 rv1 court0 court1 at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844; errs [] everywhere; no hscroll / overflow. Viewed 1180x820 rv1: key block fully visible. OK.
3. Top block own frame: `.pcf` overflow auto, 1 px border, scrollbar thin (computed). Real data never overflowed (Đã biết ≤ 2 rows, h 52–132 px < 24 kvh) so the scroll itself was not reproduced by me; worker saw it true at 412 court0. Frame + thin bar confirmed in CSS/computed, Fold + iPad shots look right. OK (low risk).
4. Act-card boxes: person cards (rv, court) 76x76 at all 5 sizes; dialog `.kopt` (opt-pics, 9 dialogs x 2 sizes) 76x76 everywhere (main had 38/56/58/60/71/73/74/84 = 8 sizes; now 1). Pictures loaded (complete, naturalWidth>0, loading=eager) after ≤10 s; at 5 s on Fold two were still in flight (CDN latency, not empty). Tall art cover-cropped: LOOKED, heads/faces not cut (Đến cung nàng ta thăm, Mời nàng ta sang cung show the lady's head whole). Hành sự tab uses the big card (170x227) — not compact, unchanged by design.
5. Perf/quickcheck on 3cb771cb: PASS 127 s · open 1630 ms · old save ok · core gates PASS · render 167/157, tab 243/214, buổi 794/847 (new/live). Eager pictures did not slow first open.

## FAIL found → fixed by me (ab50f1c5)
- KIT.md still said "tall 3:4 84x112 / square by content" in §6.2 intro, §6.2 layout, §6.2b, §43.1 and the opt-pics bullet; the worker only added 73.1. Overwritten in place (canon overwrite): §6.2b is now "ONE PICTURE BOX SIZE … KIT_ACT_ART=76, reverses 16/11 s21".
- dev/test/opt-pics.js asserted 84x112 → now 76x76 (before: 61 false fails).

## Notes for main (not blockers)
- dev/test/kit-fit.js still measures the old "empty under short text" rule → 64 VIOL lines now (e.g. "Tiếp" 39 px empty). Expected consequence of the owner's one-size rule; retire or rewrite that test later. Dead code kitOptFit/KIT_OPT_SQ remains (off).
- Several acts show the grey/pink placeholder art (ph-act-light/dark: Xin hầu cờ, Xin đánh đàn, Mời ngài dạo ngự hoa viên, Dâng quà lên Hoàng thượng, Nghỉ ngơi một lát, …) = KIT §59 placeholder, pre-existing; they need real art (art task) for "real picture everywhere".
- opt-pics still lists 2 fails "Váy sa xanh ngọc" (giftpick, box 0x0), identical on main = pre-existing item option without art slot.
- act-compact.js header comment still says 3:4 (test measures other things; not run to completion, browser closed on my try).
Shots: not uploaded; worker's CDN folder img/_review/pcard-facts-2/ wiped after the verdict.
