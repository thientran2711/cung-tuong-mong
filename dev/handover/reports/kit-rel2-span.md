# kit-rel2-span (KIT keeper, MAIN 85 follow-up, OD 21/11 ~02:14Z «chiếm hết cả một nửa cái khung nền»)

Branch `review/kit-rel2-span` 23afdbea (from LIVE 32c0e33b). One CSS rule in `dev/build/jkrel.js`: `.kr2-n1` (a kitRel2 with ONE direction) was `minmax(0,calc(50% - .25em))` = half the row, right half empty; now `minmax(0,1fr)` = the whole row. Two directions unchanged (two equal columns, stack under 260 px). KIT.md §49.1 overwritten (the 16/11 «one column wide» rule is gone).
Whole group: every caller goes through kitRel2 (Ân oán pair view, week book, person-card key block, Hoàng thượng/Thái hậu one-direction rows), so the one rule covers all.
Test: `node dev/test/kit-rel2-span.js <url>` — lone box width == wrapper width at 220/300/460/640 px on 755x1000, 1180x820, 390x844: PASS (before: 50 %); two boxes equal width/height: PASS. quickcheck 23afdbea PASS (tab 469/438 ms, render 219/220, buổi 1157/1055).
