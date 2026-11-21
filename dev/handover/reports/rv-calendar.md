# rv-calendar report (REVIEW of review/calendar @40d20ee1, session_01Rc5AsKHZyzLGYRFR43QaZN)
PRIORITY #1 CHECK: OD:L1241-era rules + OD 21/11 #42 | main dev/build/jmcal.js kitMonthCal | review/calendar 40d20ee1 | claims worker session_01Rc5AsKtxDx5RQDYwoX6exA

Result: PASS review/calendar-rv @ 2b2c970b (merge of main 9c1dd605 + 1 small fix; FF of main).
- Merge: index/sw took main's, rebuilt (assemble + build_site); no markers.
- Her row checked: header «‹ Tháng ba · năm thứ nhất ›» from mcMonName/mcYearName; 2 arrows >=44 px + swipe; no chip wall; equal squares; festival pictures in cells; current tuần strip gold = today (game has no day inside a tuần); tap day -> day box + kitRows; rail entry works; one builder kitMonthCal (law 9), KIT §58 updated. Wording cổ trang, no %.
- Fix on rv: Fold (~290 px dialog) keeps 5 columns x 2 rows per tuần; iPad had ~100 px squares and the month needed scrolling -> container query (.kmc >= 470 px) = 10 cells per tuần (~50 px squares, whole month visible without scroll). KIT §58 text + month-cal test (6 rows narrow / 3 rows wide) updated.
- Gates on 2b2c970b: quickcheck PASS (core gates, open 1368 ms, old save ok, perf ~ live); coop-e2e tt/nc 92/92; month-cal 755x1000, 1180x820, 1366x1024 bad 0 (arrows, swipe, equal squares, 18 festival squares, popover). Shots Fold + iPad, month and tapped day, looked 3x (kept outside git).
- Minor note (not a fail): Fold header wraps to 2 lines ("Tháng ba · năm thứ / nhất").
Laws touched: 7, 9, 10, 11, 12 ok.
