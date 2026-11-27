# flight2-s7b (real-tap harness f65d019b, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s7b | Lãnh cung — Tuổi xuân qua đi | 40 | 3018 | 2626 | 0 | 0 | 11 | — | 687 / 290 (decree 468, exam 207, select 12) |

## Dead buttons


## Bugs

- [harness] ×1 picker stalled 97 steps / 60 s on .kmov «» without a real tap (area 97, deadEnd 1; last refused tap: gone «Ta biết rồi») → tapped «Ta biết rồi»
- [game] ×134 dialog scrolled to the end has no close / next button: .kmov «»
- [game] ×1 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls (Biếu quà làm lành)
- [harness] ×1 NO-EXIT DIALOG .kmov «» (div.kmov.kcf.km-full): no close / next after scrolling to its end → later visits unstuck at once by taps
- [game] ×1 no way out: no button of the dialog can be reached (all below the screen / clipped, nothing scrolls): #kdaytc «» — lost: Ô lưu / Xem bản thân / Sắc80Tài81Tâm cơ37Đức63D / Bạc297Sức100/100
- [game] ×1 no way out: no button of the dialog can be reached (all below the screen / clipped, nothing scrolls): #kdaytc «» — lost: Ô lưu / Xem bản thân / Sắc73Tài99Tâm cơ85Đức95D / Bạc728Sức100/100
- [harness] ×3 BOARD theu still in play after 6 min (27 moves) — the round never ended
- [harness] ×6 BOARD theu still in play after 6 min (0 moves) — the round never ended
- [game] ×1480 QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [game] ×7 KG82.phase stays «play» after the round ended: board theu shows its result / next («#kg82ok Xem kết quả», #kg82box hidden) — the game never set phase «result»
- [game] ×4 SAVE STALE: the stored save stopped following the live game (QuotaExceededError)