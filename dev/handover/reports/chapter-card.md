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
