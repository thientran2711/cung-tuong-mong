# calendar report (mark #42, session_01Rc5AsKtxDx5RQDYwoX6exA)
PRIORITY #1 CHECK: OD 13 | ledger #155 | main dev/build/jmcal.js kitMonthCal (the one builder; entries: jrail "cal" button, kit sample page §58*; the room desk calendar is retired by jrail) | review/* none | claims none.

Branch review/calendar @ 40d20ee1 (base main 56ff0db0). Context start ~0 %, finished well under +25 %: no rollover.

## What changed (kit part kitMonthCal, KIT.md §58 + kit samples in the same branch; no per-screen variant)
- Wall of 13 month chips REMOVED. Header "‹ Tháng ba · năm thứ nhất ›" (mcMonName/mcYearName, never typed), two 44 px kit buttons, swipe left/right, arrow disabled before last month / after +11, short slide (off under reduced motion).
- Grid = equal SQUARE cells (aspect-ratio 1), per tuần a light label strip (Thượng/Trung/Hạ tuần + "Tuần này" + quẻ) over 2 rows x 5 cells. DECISION: 5 columns, not 10: Fold dialog is ~290 px wide (10 cols = 27 px squares, unreadable). Today = current tuần strip gold (game has no day inside a tuần). Grid capped 560 px.
- Festival cells keep the painting + name; day box (kitRows), festival popover, sổ hẹn, her cycle, co-op friend days, thaiy etc. unchanged (same mcExtra / mcDayBox).
- Removed .kmc-tabs from jk3 / tab-underline-scan lists (row no longer exists).
- dev/test/month-cal.js: was stale on main (desk calendar retired -> "no desk calendar"); now opens via the rail, checks arrows, no chip row, 30 equal squares in 6 rows, swipe both ways.

## Whole-group scan (every place the month calendar shows) = ONE builder kitMonthCal
| place | before | after |
|---|---|---|
| rail "Lịch tháng" -> kitMonthCalOpen (modal) | 13 chips + 3x10 uneven cells (46-96 px high) | arrows/swipe + 6x5 equal squares |
| kit sample page §58 / §58.1 / §58.3 | same builder | same builder, new look |
| desk calendar in room | retired (jrail) | unchanged |
Scan: month-cal.js asserts per size: 2 arrows >=44 px, no .pct/.kcattabs/.kmc-tabs, 30 cells |w-h|<=1.5 and equal width, 6 distinct rows, cell >=40 px, head text matches /^Tháng .+ · năm thứ/.

## Tests
quickcheck 40d20ee1 PASS (core gates, open 1666 ms, old save ok, perf ~ live); coop-e2e (tt/nc) 92/92; month-cal 755x1000@2 + 1180x820@2 bad 0; tab-underline-scan ok. Shots looked 3x (Fold + iPad, month, festival popover, next month); kept outside git.
No ART REQUEST (existing img/ev-fest-*.webp reused). No KIT REQUEST (arrows = existing kbtn alt).
