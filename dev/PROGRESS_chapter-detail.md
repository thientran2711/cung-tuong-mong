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
- `j79.js` kpInfo art: `spec.art` (+ `artLabel`) overrides the topic picture with the picture of the subject (KIT note below).
- Texts per VANPHONG (no %, "Lui", cổ trang).

## KIT note (for KIT.md, docs branch)
kitPanel/kitModal spec gains optional `art` (+`artLabel`): the left picture of a rule/info panel is the subject's own picture (chapter cover), default stays the topic picture.

## Tests
- `dev/test/chapter-detail.js`: 3 states x (chip, card, picture, check line) -> panel; v1 td lines; Đi làm; rank picture; Việc nhờ chip popup; no page errors.
- `dev/test/chapter-detail-scan.js` (LUẬT SỬA CẢ NHÓM scan): clicks every tappable-looking element on Mệnh truyện / Việc nhờ / Sổ ghi (all sub tabs) in 3 states and reports dead taps. Empty-state illustrations are decorative and skipped.

## Before / after (755x1000)
See the table in the final report / below.
