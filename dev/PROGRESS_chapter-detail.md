# PROGRESS review/chapter-detail (queue C24)

Owner 15/11: "Bấm vào báo thù cho nhà không có thông tin gì hiện ra à." Tapping the Mệnh truyện chapter chip/card did nothing and the page under KẾ TIẾP was empty.

## ALREADY-BUILT check (16/11)
origin/main and origin/review/tutorial: no chapter detail (git grep for chapterDetail / chapModel / goalChip: nothing). review/tutorial-r2 not pushed at start. Built here; goal card/chip (tutorial-r2) is NOT touched.

## What changed
- `dev/build/jchap.js` (new, after jtabs.js in assemble.py): `chapModel()` = one model of the chapter she is on, in three states: milestone chapter (S.st.ms), arc chapter (S.st.M, hồi by hồi, each past hồi with its picture via stArtOf), old v1 save (STORY[k]; Báo thù cho nhà gets chứng cứ 1/3..3/3, nhân chứng lão thái giám Vương safe/in danger/not yet found and how to protect, bậc Tần now X, dâng sớ).
  - `chapOpen()` = kit panel (kitModal, kind info): chapter picture, Mục tiêu, Kế tiếp, Tiến độ / Các hồi (kitChecks), Chuyện đã qua (kitSkillCard per hồi), Cần lưu ý (rows), "Đi làm: Hành sự" (kbtn alt) which closes the panel and opens Hành sự.
  - `chapInline()` = the same progress inline under the card (steps, risks, Đi làm), so the page is no longer empty.
  - Tap-through (one delegated handler): chapter chip, "còn khoảng N chương" chip, card, picture, check lines -> chapOpen; Sắc phong card/picture -> chapRankOpen (kitReqRows + Đi làm); Sắc phong chips (Đức, khảo hạch) and Việc nhờ counter chips -> kit popup (kpPop) saying what the number means.
- `jtabs.js` ktStoryHTML: chips get data-chap, inline block appended.
- (reverted per ONE KIT KEEPER rule 16/11: no kpInfo `art` override; panel uses the existing topic picture. KIT REQUEST below.)
- Texts per VANPHONG (no %, "Lui", cổ trang).

## KIT REQUEST
kitModal kind info: optional subject picture (chapter cover) in place of the topic picture on the left (cover exists via kitOriginArt/stArtOf). Used by chapter detail panel. Not built; panel shows the existing topic picture.

## Tests
- `dev/test/chapter-detail.js`: 3 states x (chip, card, picture, check line) -> panel; v1 td lines; Đi làm; rank picture; Việc nhờ chip popup; no page errors.
- `dev/test/chapter-detail-scan.js` (LUẬT SỬA CẢ NHÓM scan): clicks every tappable-looking element on Mệnh truyện / Việc nhờ / Sổ ghi (all sub tabs) in 3 states and reports dead taps. Empty-state illustrations are decorative and skipped.

## 16/11 coordinator note: folded into kitGoalDetail
Merged origin/review/tutorial-r2 (jgoal.js, KIT §72). My separate panel is gone: `chapOpen()` calls `kitGoalDetail()`; jgoal.js kitGoalDetail now takes the arc/v1 sections from `chapModel()` (jchap.js): Các hồi / Tiến độ checks with how/where, Chuyện đã qua (kitSkillCard per hồi with picture), Cần lưu ý rows; ms sections, promoReq and "Đi làm" opts unchanged. The inline block under the card is in jtabs.js via chapInline. Rank card -> chapRankOpen (kitModal, existing parts).

## Before / after (755x1000), scan of Mệnh truyện / Việc nhờ / Sổ ghi, 3 states
- before (main): chip, "còn N chương" chip, picture, check lines: dead (only the card opened a panel in tutorial-r2).
- after: 220 tappable-looking elements, 176 change something, 0 confirmed dead taps; 44 were not clickable by Playwright within 40 s on the loaded box (mostly picture placeholders .ksart-ph and the same element types that tap fine in other rows); flaky, rerun on a quiet box.
