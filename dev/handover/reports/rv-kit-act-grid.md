# rv-kit-act-grid — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (L980–981 «nút to nút nhỏ» x3, #24 21/11 ~04:52Z), CLAIMS, reports (rv-kit-pcrow-square, rv-kit-leftcol-read), KIT.md §6.3/§6.3b/§6.3g; extends the ONE act-card form (kitPcActSplit / kitCompactCSS / kitOptFit0) to .kpanec hosts, no new card, no custom chip.

Branch: review/kit-act-grid-rv = keeper 39cc5bc7 + LIVE fafe0f62 (index/sw rebuilt; contains newest LIVE), sha d65e535b31d3af99d32c869509958c2faa595def.

Checks
- act-grid-scan.js PASS at 755x1000 (84x84), 1000x755/1180x820/1366x1024/844x390 (96x96) on art, inv-viec, tab-rv, tab-staff, pop-maid. Note: its «act» scene finds 0 cards (vacuous) — Hành sự deck is out of scope by design.
- My own whole-group scan (every tab, Fold + iPad): every act card outside the deck/dialogs is square, ONE size per device — Fold 84, iPad 96; Hành sự deck .cards (158x214 on iPad) and dialog .kopt untouched as stated.
- Looked at Fold + iPad shots 3×: Tài nghệ (square picture + title + Tốn/Được beside, Ghi chú box full width under, one card per line), Tư trang › Việc (84 px square, Bại/Kèm box under), person tab. Before/after from keeper: Tài nghệ 72/96/56 in a 2-col grid heights 74–182 → one size one column.
- pcrow-square.js regression check: pass except gift-wk (pre-existing, fails on LIVE, keeper is dropping that scene) and pop-maid@1180x820 which flakes on LIVE too (1 of 8 on LIVE, 3 of 12 on branch — async split timing, known load-sensitive; same test, same fault type kr-bai/kr-note not yet moved at measure time).
- coop-e2e 92/92. QUICKCHECK PASS 228 s (render 255/258, tab 521/566, buổi 1247/1533, core gates PASS, old save ok).
