# rv-kit-dialog (reviewer, MAIN CHÍNH 87)
PRIORITY #1 CHECK: OD 21/11 marks #44 #47 #49 #56 (OWNER_MARKS_2111 rows); worker report kit-dialog; review/* kit-dialog e8d30ca7; main d31c8ec0.
Verdict: PASS. Branch review/kit-dialog-rv = e8d30ca7 + merge main d31c8ec0 (index/sw taken from main, rebuilt via assemble.py + build_site.sh, no markers).
Gates: quickcheck 43a23b4d PASS (core gates, hook 80-dialog-fixed, old save ok, perf new<=live); dialog-fixed 55 ok / 0 FAIL (Fold 755x1000 + iPad 1180x820); coop-e2e tt/nc 92/92; seal-events 3 sizes (755x1000, 1000x755, 1180x820) 184 event dialogs ALL tr:34, 0 FAIL (4th size cut by timeout).
Looked at 6 shots (hồi kết nhánh 1/2 Fold+iPad, đại kết cục Fold+iPad, kết cục quiet/thua): #49 odds on title row, iPad 2 columns (3 cards: 2+1), picture fills card, only list scrolls; #56 picture on every card incl. "Tiếp tục/Tạ ơn"; #47 figure same place per frame; #44 seal top-right of header left of close slot, one size.
Note (not blocking): iPad đại kết cục shot caught a transient toast chip "Hoàng hậu → ta: thiện cảm +8" over the card text — floating toast, pre-existing, not from this change.
Law check: option card via kit part only (no per-dialog variants, laws 9/11). Hook is meaningful (old main: 33 FAIL per worker).
