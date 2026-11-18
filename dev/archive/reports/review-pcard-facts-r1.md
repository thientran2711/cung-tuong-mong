# review pcard-facts r1 — PASS d5f1abb2 (branch review/pcard-facts-r1 = 87c73de4 + merge origin/main abe056c3, site rebuilt)
PRIORITY #1 CHECK: OD ~14:15Z + ~14:40Z; main kitPcKey/pcard; review/pcard-facts 87c73de4; claims pcard-facts worker READY.
## Verdict: PASS (2 non-blocking notes)
- Rows Sở trọng / Đã biết / Dạo này kept; fact first and short; dotted underline = tappable; when/how/source only in kit pop-up (kpPop). One kit function (kitFactRows/kitFactTap/kitFactDetail, j79) feeds person card right panel, left Thích/Ghét items and relation-card "Đã biết về X". No "..." trailing rows, no .krv clamp, no date prefix.
- Own clean shots (no result toast; waited for #rtoast to clear): Fold 755x1000@2 and iPad 1180x820@2, plain + popup on a heard fact + popup on a Thích item. LOOKED at all 6. Popup opens below the tapped row on both devices, never covers its own row (bbox check overlap=false in all 4 taps).
- Tests: pcard-facts.js ok both sizes (popup text Khi nào / Cách biết / Nguồn, no clamp, no prefix); pcard-fill.js at 755x1000, 1180x820, 1366x1024, 412x1058, 390x844: errs [] , no hscroll, no fill overflow, key visible; quickcheck PASS 247 s (core gates, old save ok, open 1396 ms, perf new/live render 147/182, tab 242/234, buổi 659/800).
## Notes (non-blocking, for a follow-up)
1. Pop-up "Khi nào" wording differs by path: heard fact "Tháng ba, năm thứ nhất, trung tuần" vs Thích item "Tháng ba · trung tuần · năm thứ nhất" (the Thích path passes a preformatted string; route it through kpDateText too).
2. iPad 1180x820: left key block's last line (Ghét ... "Thêu thùa") is clipped at the card bottom when Ghét wraps to 2 lines (same as before, person-leftcol layout; kitPcKeyFit). Fold fine.
Shots: CDN img/_review/pcard-facts/r1-{755x1000,1180x820}-{plain,popup0,popup1}.jpg (old worker shots wiped). Delete after the verdict.
