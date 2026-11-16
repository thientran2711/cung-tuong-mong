# review-nw-lantern-r1 (family B, Thắp đèn replaces Đố đèn)

Branch reviewed: review/nw-lantern @ 877a2585. Review branch: review/nw-lantern-r1 (merged on origin/main 802fe821).

## Checks
- Merge: conflicts only in jevban.js (KIT_DLGMAP), assemble.py, generated index/sw/assets; resolved (main's side + "thi thắp đèn" wording, jlant.js after jbal2.js), site rebuilt.
- No word puzzle left for this art at any entry point: lantern-scan.py 45 -> 2 hits (header comment only). Checked contests (j71 SC7 nguyentieu/trungthu/Bắc Địch event key doden -> engine lamp), j82 KG82_KIND, lessons/works (j83 has no doden kind), festivals (j31, jevban KIT_DLGMAP), j71 text, jkc, jmcal, jcui prize "Đăng khôi". Riddle bank + k91Lantern removed.
  Out of scope, noted: other "đố/đoán" event lines (j68e, j68g, j71 Ba Tư hương) belong to other families.
- Kit-only: game frame j82 (kg82Canvas, k91Btns, k91DemoCard, k91Pointer), doden-bg painting; no private CSS/chip/row. Canvas-drawn sample cards use the same k91RR/K91C helpers as the other j91 games.
- Old saves: key doden unchanged, demo flag doden2 is new; S.mgSeen tolerant. No page errors.
- Rotate prompt at 390x844 shown ("Xoay ngang điện thoại để chơi"), no overflow.

## Findings fixed by me (pushed)
1. 844x390: the board (260 px) was taller than the visible scroll area (298 px minus sticky Gợi ý 51 px) and canvas has touch-action:none, so the lower lantern rows hid behind the Gợi ý button and the sample card scrolled away; oracle raw dropped to 8. Fix: kg82Canvas got an optional hMin (default 260, other games unchanged); jlant uses BAL.lantern.short (h 520, min 240) and scrolls the dialog so the whole board sits above the Gợi ý button. Now oracle 10 at 844x390; skilled bot LV4 mean 7.25 -> 8.63. Looked at screenshot: sample + all rows visible. (Timer/score chips scroll above the fold on this size — known j82 frame limit.)
2. Hard-coded numbers in jlant.js moved to BAL.lantern: timeout .6, autoHint .5, bad [1300,1300,500], glow 3500, pause [900,1100], short {h,min}.

## Test results (oracle, LV0/2, all pass raw 10, no errors, no overflow)
755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2 (after fix), 390x844 (rotate prompt). Skilled bot 844x390 LV4 n=8: 9,7,9,9,9,9,9,8.

## Advisory (not blocking)
Skilled bots still cluster at raw 9 (mean 8.6–8.9); with raw+level+material >= 14 (j83) the 20–30 % Tuyệt phẩm target (OD:L1266) depends on mg-balance's mgTier hook, which is not on main yet. Knobs: BAL.lantern.lim / speed / miss / tier. Foreman B should re-measure when mg-balance lands.
Owner questions in worker report (Đăng khôi title, talent formula, art key rename) are the coordinator's to relay, not blocking.

PASS 9696bc72f20e7a52a3ac6f3f351100d0c0ebe062
