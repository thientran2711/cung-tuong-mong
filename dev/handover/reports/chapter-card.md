# chapter-card report (worker session_01Rc5AsMDAsVpNsL2CKbpUuC for MAIN CHÍNH 85)
PRIORITY #1 CHECK: OD 0 earlier (marks #26/#27 + 21/11 03:02Z) | main dev/build/jgoal.js:78-105 (chapter detail), jtabs.js ktStoryHTML | review/* none | claims none before this row.

Branch review/chapter-card @ 3d52f838 (base origin/main a88b14f0). START_CTX ~0% (no rollover needed).

## What changed (kit first, law 9)
One kit option, no private CSS: `kitSkillCard({big:true, body})` + `kitEmpty(title,line,true)` in dev/build/j79.js (CSS `.kskill.kbig`, `--kbw:170px` = the big Hành sự act-card picture width, 3:4). Picture left, title/steps/body (kit rows or chips) right; two-column rows (kitReqRows / rows67) and checks + «Đi làm» stay below. KIT.md §21b, kit sample §21, KIT_REQUESTS row (DRAFT, kit keeper to OK).

## Before / after (whole group, law 11)
| Sub-tab | before | after |
|---|---|---|
| Chương này (milestone / arc / v1) | 64 px thumb, rows under card | big picture left; title, steps, Mục tiêu / Bước bước này / Hạn right; checks + Đi làm below |
| Sắc phong | thumb; rows; chips below | big picture; Đức + Khảo hạch chips right; the 2-column condition rows kept below |
| Đã qua | plain rows | big card «Đã qua · n chương đã khép», rows inside right column; empty state big |
| Triều cục | thumb | big picture; Mục tiêu / Chương / Triều cục right; phe rows + checks below |
| Tâm nguyện | no picture | big picture; Đã thành / Còn lại right; people rows below |
| Phụ tuyến (nhCard) | thumb | big |
| Empty states (Chương, Sắc phong, Đã qua, Triều cục, Phụ tuyến, Việc nhờ ×3) | small | big |
Not changed: Việc nhờ / Sổ ghi cards (q72Card option cards = a different kit part), arts / pets / mood skill cards (small thumb stays).

## Tests
- QUICKCHECK PASS · 223 s · old save ok · core gates PASS (first run failed one-core-guard on my typed «3 tháng» in the kit sample; reworded).
- `COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js`: 92/92 passed.
- dev/test/chapter-detail.js 755x1000: all ok (tap chip/card/picture/check, Đi làm, old v1 save).
- Shots (host mode, Fold 755x1000 + iPad 1180x820, LOOKED 3x): dev/test/chapter-card-shots.js; states ms, rank, past, rg, rgl. Shots kept outside git.
- Not shot filled: arc/v1 Chương này (covered by chapter-detail.js), Phụ tuyến (same big option).

## Handover / open
No art request (reused kitOriginArt / kitInfoArt). Kit keeper OK of the draft part pending. ~95% xong / ~95% chơi được.

## ROUND 2 (addenda marks #28/#29 from MAIN 85, #43 from MAIN 86) — sha 52657663, base LIVE 56ff0db0 merged
PRIORITY #1 CHECK: OD rows «21/11 ~03:05Z/~03:07Z/~03:45Z real» | main none | review/* only this branch | claims chapter-card. Note: r1 (3d52f838) missed the ~02:43Z addenda (they reached me while I was busy); fixed here.
- NEW kit part `kitSlide` (dev/build/jkslide.js, KIT.md §21c, kit sample §21c, DRAFT for the kit keeper): wide 21:9 picture with «Chương N / tên / Hồi x/y» written on it, arrows + swipe, rows below follow the slide, «Mục lục» button in the bottom-right corner opens the chapter list (done/now/next), no chapter list printed.
- Applied: Mệnh truyện › Chương này (past chapters + current slide; Đi làm inside the current slide), Đã qua (every closed chapter + rare endings), Triều cục (the six chapters, hồi checks inside the slide, the «Chương 1…6» list removed).
- #43: info/chapter dialog (kitGoalDetail + every `.kpb.kpinfo>.kpsubj.kpiart.kpev`): picture fills its column (kv2: 40 % column, 1.5x act height, cover); kv1 (Fold) stacks a 16:9 band over the rows (the dialog is ~250 px, the 170 px tile had squeezed the text to 64 px). KIT.md §21d.
- Chapter-place scan (whole group): slide = Chương này, Đã qua, Triều cục. Big card (not a slide, one chapter only) = Sắc phong, Tâm nguyện, Phụ tuyến card. NOT converted (not a chapter list, single cards): khuê các «Chương ngoài cung / Tuyển tú / Thanh mai» (jkc.js:631, jkc2.js:454), home chapters. Open for MAIN: say if those should become a slide too.
- Tests @52657663: QUICKCHECK PASS (core gates PASS, old save ok); coop-e2e tt/nc 92/92; chapter-detail.js all ok (selectors updated to the slide); shots Fold + iPad of ms, past, rg, rg2 (swiped), rgm (Mục lục popup), dlg looked.

## ROUND 3 — review/chapter-card-2 @ 85386b37 (base LIVE 0d60ae54 merged; MAIN 87 decision: khuê các chapter cards → slide too)
PRIORITY #1 CHECK: OD «21/11 ~03:07Z» (#29 every chapter place) + MAIN 87 order | main none | review/* chapter-card (r2 under review) | claims chapter-card.
- Khuê các «Chương ngoài cung / Tuyển tú (or Ngày lên đường / Ngày tuyển cung nữ) / Thanh mai trúc mã» (jkc.js kcStoryHTML, jkc2.js override) = ONE kitSlide via `kcSlideHTML` (rows under the slide follow it, «Mục lục chương» corner button); the facts rows below stay.
- Tests: QUICKCHECK PASS (core gates PASS, old save ok). Structural check in the harness: origins tt and dtq with kcInit → `#panel .kslide` with 3 slides, no page errors. Visual shot of this tab NOT obtained (the harness leaves the «Sửa soạn nhập cung» scene over the panel when kcInit is forced); same kitSlide as the verified Mệnh truyện slides. Reviewer: please look at a real khuê các life (Fold + iPad).
- Not run again: coop-e2e (no co-op code touched).
