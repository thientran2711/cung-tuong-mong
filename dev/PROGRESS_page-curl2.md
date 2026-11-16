# PROGRESS review/page-curl2 (queue C32) — page turn: landscape curl, portrait paper slide, swipe only in Tuần lục

Owner rulings (OWNER_DECISIONS, docs branch, 15/11 session 8): "Fold page-turn looks stiff"; "page turn only on landscape, portrait uses another animation"
(slide APPROVED); "swipe only in Tuần lục; tab-change animation only on tap".

## LUẬT ƯU TIÊN SỐ 1 (what already existed)
- main already has the whole-sheet curl (kitSheetTurn/kitCurl, jbook.js) and the finger-drag curl inside the week book (j87 kitBook pointer handlers)
  — review/drag-curl (D37, orphan, owned by the main coordinator) is NOT touched; this branch changes nothing in the landscape drag/curl maths.
- main also had a GLOBAL swipe-the-panel-to-change-tab handler (jbook.js) — removed here.

## Changes
| file | change |
|---|---|
| dev/build/jbook.js | removed the global swipe-to-change-tab handler (any page outside the week book); new `kitSlideSheet` (+ `kitPortrait()`, `KIT_SLIDE_MS=300`, `kitSlideEase`), reached through the existing `kitSheetTurn({slide:true})` so every caller keeps its call shape; `kitCurlSwap` (tab TAP) slides in portrait, curls in landscape; Gọn fade 170 -> 120 ms |
| dev/build/j87.js | kitBook: `slideMode()` = single page AND portrait: sheet slides, follows the finger 1:1, release past 30 % snaps (otherwise springs back), ‹ › = quick slide (300 ms), Gọn (OPT.fxon=false) = swap with ~120 ms fade; landscape (spread, or 844x390 single page) unchanged curl |
| dev/test/page-curl2.js | new viewport test |

Kit note: no new kit part, no new CSS; the slide is a variant of the existing page-turn kit part (KIT §34 / §45-47 area) using its `.ksht*` classes. KIT keeper may want a one-line mention in §34.

## Scan (LUẬT SỬA CẢ NHÓM): every horizontal gesture / page-turn consumer
| place | before | after |
|---|---|---|
| #panel swipe = next/prev tab (jbook) | swipe anywhere | removed (tap only) |
| tab tap animation | curl everywhere | landscape curl, portrait slide |
| week book next/prev/drag | curl everywhere (even Fold portrait) | landscape curl, portrait slide |
| kitBookSpread (jbook, spread only) | curl | unchanged (landscape only) |
| other swipe handlers (jk2b __kpcUser touchstart = scroll flag only, jemo, jk4 = tap catchers) | n/a | none are tab/page swipes |
