# flight2-s9h (real-tap harness 8ea10d7e, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s9h | Xuất gia — Xuất gia làm ni cô | 30 | 1503 | 2966 | 0 | 0 | 11 | — | 105 / 43 (decree 98, select 7) |

## Dead buttons


## Bugs

- [harness] ×3 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-binh kemo-live kemo-m-nod»
- [harness] ×1 NO-EXIT DIALOG .kmov «» (div.kmov.kcf.km-full): picker stalled 96 steps, no close / next → later visits unstuck at once by taps
- [harness] ×1 picker stalled 96 steps / 60 s on .kmov «» without a real tap (area 96, deadEnd 1; last refused tap: gone «Chuẩn bị thị tẩm») → tapped «Ta biết rồi»
- [harness] ×4 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-ghen kemo-live kemo-m-flicker»
- [game] ×1 no way out: no button of the dialog can be reached (all below the screen / clipped, nothing scrolls): #kdaytc «» — lost: Ô lưu / Xem bản thân / Sắc73Tài45Tâm cơ26Đức60D / Bạc129Sức99/99
- [harness] ×2 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-gian kemo-live kemo-m-shake»
- [game] ×1 no way out: no button of the dialog can be reached (all below the screen / clipped, nothing scrolls): #kdaytc «» — lost: Ô lưu / Xem bản thân / Sắc73Tài45Tâm cơ27Đức71D / Bạc73Sức100/100
- [harness] ×2 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-tinhtu kemo-live kemo-m-sway»
- [harness] ×3 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-vui kemo-live kemo-m-sway»
- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-lo kemo-live kemo-m-bob»
- [harness] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «kemo kemo-act-ghen kemo-live kemo-m-flicker»

## Notes (runner s9h #2, 11/26-27/2026)

- game f573dc94 (CTM_BI s b881686f+, b cc68dcfd2b1b, t 2026-11-26T15:46Z), served locally, pin=1 (BUILD PIN on http://127.0.0.1:8914/); harness 8ea10d7e, Fold 755x1000, persona speed, seed 2026112539, fresh profile; same build for the whole life.
- robot-audit.js: VALID (real taps, jsClicks 0, no cap, exitPick null; «game-imposed: last bot tap was a non-exit option «Sang ngày mới»»). Promotion roads 105 seen / 43 picked.
- ending: Xuất gia — Xuất gia làm ni cô, age 30, year 11, rank 0: the emperor (Thiên Hựu) died at 32, no children and low rank → by old custom she is sent to a nunnery. Imposed by the game (no exit pick).
- wrapper 2 h limit re-arms from fresh ckpts at 20:47Z (b485) and 22:47Z (b1085): save restored in full each time («1497245 of 1497245», «2487297 of 2487297»), 0 buổi lost; no save quota split (save peaked ~3.1M chars).
- GAME BUG ×2: no way out: no button of the dialog can be reached (clipped, nothing scrolls): #kdaytc «» — lost: Ô lưu / Xem bản thân / Sắc… (Fold 755x1000, 2 occurrences).
- GAME BUG: .kmov dialog scrolled to the end has no close / next (harness unstuck by tap «Ta biết rồi»).
- harness lines: «kemo» area taps blocked ×15 (a button sat under the area point; not game bugs).
