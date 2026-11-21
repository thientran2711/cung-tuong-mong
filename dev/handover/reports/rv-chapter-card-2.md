# rv chapter-card-2 (SMALL reviewer, sonnet) — for MAIN CHÍNH 87
PRIORITY #1 CHECK: OD 21/11 marks #26-#29, #43 (OWNER_MARKS_2111 rows) | main LIVE 6e07f837 | review/chapter-card-2 85386b37 (= r2 52657663 + LIVE + khuê các kitSlide) | worker claim session_01Rc5AsMDAsVpNsL2CKbpUuC.

Result: **PASS** after two small reviewer fixes (branch review/chapter-card-2-rv, FF of main 6e07f837).

## Found and fixed (both worker misses; neither is caught by the worker's tests)
1. **khuê các Mệnh truyện printed «NaN»** under the slide: `kcStoryHTML` (jkc.js) had `+  +kitRows(...)` (unary plus on a string). Fixed (the two fact rows «Kết hiếm ngoài cung đã gặp» / «Phúc duyên khi qua tuyển tú» now show). The worker had no shot of a khuê các life.
2. **#43 on the Fold (kv1): chapter dialog picture collapsed to 11x6 px** (blank band, dialog title wrapped over 3 lines). Cause: jkslide.js kv1 rule gave `.ksart` no width inside the flex `.kpsubj`. Fixed with `width:100%;flex:1 1 100%`. Now 530x298 (16:9), picture fills the dialog; iPad (kv2, picture fills its column) was already right.

## Checks
- kitSlide is ONE kit part (jkslide.js, KIT.md §21c/§21d + sample §21c). No private styles found in the slide users. Keeper OK of §21c: asked via send_message (answer pending, not blocking the PASS).
- Slide = Chương này, Đã qua, Triều cục, and now khuê các (Chương ngoài cung / Tuyển tú / Thanh mai); chapter list gone, «Mục lục» corner button opens the list (Triều cục and khuê các popups looked); Sắc phong keeps 2-column condition rows under a big picture (#27); dialog picture fills (#43). Cổ trang words; no % shown.
- Gates: quickcheck PASS x3 (final on merged 02b5d604: core gates PASS, old save ok); coop-e2e tt/nc 92/92; dev/test/chapter-detail.js all ok (755x1000); chapter-card-shots (ms, past, rg, rg2, rgm, rank, dlg) Fold + iPad looked 3x; khuê các life (origin tt, home road «Ở nhà chờ tuyển tú») Fold + iPad: slide 1/2, 2/2, Mục lục popup looked.
- Not blocking, noted: on the Fold the header line «Tuyển tú còn 23 tháng» is partly covered by the news chip in one frame (pre-existing header layout, not this branch).
- Merge: newest main 6e07f837 merged; index/sw taken from main and rebuilt; assemble.py keeps jkslide.js.
