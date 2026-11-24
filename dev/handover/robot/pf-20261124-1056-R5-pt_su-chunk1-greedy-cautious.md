game sha 14ba876800413622b83814e8a8cdd848ac0ed241
# ROBOT-10 run pf · pt_su · 20261124-1056 (UTC)

Game: http://127.0.0.1:46081/index.html · 10 lives (10 planned) · 2 parallel · wall 119.9 min · UI checkpoints every 150 buổi at fold 755x1000 + ipad 1180x820
Runner: node dev/measure/robot10.js pf pt_su greedy,cautious 5 /home/user/wt/out-R5c · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page

## Bugs (17 distinct; one row per bug, lives = how many lives hit it)

1. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 6/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-4, pf-pt_su-greedy-5 …) · hits 6
   - JS heap 102 → 383 MB · DOM nodes 2038 → 126858 · listeners 901 → 6251 over 1877 s · in the document 1430 → 786 nodes (rest = detached, held by JS) · biggest holder ["#game",187] · S.logs 5 → 150
   - repro save: saves/20261124-1056-001.json

2. **mem** — [ipad] real page memory keeps growing over the life (leak)
   - lives 1/10 (pf-pt_su-cautious-1) · hits 1
   - JS heap 62 → 72 MB · DOM nodes 12471 → 58897 · listeners 1162 → 4339 over 1810 s
   - repro save: saves/20261124-1056-002.json

3. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 8/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-4, pf-pt_su-greedy-5 …) · hits 37
   - 12 presses, night flip S.nfX open @ năm 2 th1 t1 b3 (buổi #152)
   - repro save: saves/20261124-1056-003.json

4. **stuck** — no ending within the wall cap (1800 s)
   - lives 5/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-4, pf-pt_su-greedy-5 …) · hits 5
   - state {"year":9,"rank":4,"age":27,"dead":false}
   - repro save: saves/20261124-1056-004.json

5. **save** — save→load→save changes the state
   - lives 8/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-3, pf-pt_su-greedy-4 …) · hits 1344
   - save.S.roster.P.mm:me.2.3 (text differs at char 0): «…theo hầu ngươi ở Cần Chính điện (đi cùng» → «…ngươi sang Cần Chính điện: ngươi đi gấp,» @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1056-005.json

6. **number** — stat out of range: danh
   - lives 3/10 (pf-pt_su-greedy-5, pf-pt_su-cautious-1, pf-pt_su-cautious-2) · hits 6
   - danh=101 pf
   - repro save: saves/20261124-1056-006.json

7. **number** — stat out of range: duc
   - lives 1/10 (pf-pt_su-greedy-1) · hits 2
   - duc=101 pf
   - repro save: saves/20261124-1056-007.json

8. **number** — stat out of range: sac
   - lives 1/10 (pf-pt_su-greedy-4) · hits 2
   - sac=101 pf
   - repro save: saves/20261124-1056-008.json

9. **number** — stat out of range: tai
   - lives 1/10 (pf-pt_su-cautious-1) · hits 2
   - tai=101 pf
   - repro save: saves/20261124-1056-009.json

10. **harness** — runner error: page.evaluate: Target page, context or browser has been closed
   - lives 2/10 (pf-pt_su-cautious-4, pf-pt_su-cautious-5) · hits 2
   - page.evaluate: Target page, context or browser has been closed     at uiCheck (/home/user/wt/R5fix2/dev/measure/robot10.js:212:10)     at life (/home/user/wt/R5fix2/dev/measure/robot10.js:176:29)     at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:173     at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:2

11. **harness** — lag probe failed: page.evaluate: Target page, context or browser has been closed
   - lives 1/10 (pf-pt_su-cautious-4) · hits 1
   - 

12. **lag** — [ipad] tab switch freezes over 400 ms
   - lives 10/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-3, pf-pt_su-greedy-4 …) · hits 147
   - 1451 ms longest · 2 long tasks @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1056-010.json

13. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 4/10 (pf-pt_su-greedy-2, pf-pt_su-greedy-4, pf-pt_su-greedy-5, pf-pt_su-cautious-1) · hits 6
   - 1781 ms @ năm 7 th10 t1 b0 (buổi #1164) @ năm 7 th10 t1 b0 (buổi #1164)
   - repro save: saves/20261124-1056-011.json

14. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 2/10 (pf-pt_su-greedy-2, pf-pt_su-greedy-4) · hits 3
   - Trường Môn viện3 bóng · 1 khắc · bị giật @ năm 7 th5 t1 b3 (buổi #1093)
   - repro save: saves/20261124-1056-012.json
   - screenshot: shots/pf-pt_su-greedy-2-ipad-154.png (not in git)

15. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 1/10 (pf-pt_su-greedy-1) · hits 1
   - Trường Môn viện5 bóng · đang ở lãnh cung @ năm 5 th8 t1 b3 (buổi #767)
   - repro save: saves/20261124-1056-013.json
   - screenshot: shots/pf-pt_su-greedy-1-ipad-120.png (not in git)

16. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 5/10 (pf-pt_su-greedy-1, pf-pt_su-greedy-2, pf-pt_su-greedy-4, pf-pt_su-greedy-5 …) · hits 6
   - Phật đường1 bóng · 2 khắc × Chung Tú6 bóng · 2 khắc @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1056-014.json
   - screenshot: shots/pf-pt_su-greedy-1-fold-3.png (not in git)

17. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 1/10 (pf-pt_su-greedy-3) · hits 1
   - Thái y viện5 bóng · 2 khắc × Ngự thiện phòng1 bóng · 2 khắc @ năm 2 th2 t1 b1 (buổi #159)
   - repro save: saves/20261124-1056-015.json
   - screenshot: shots/pf-pt_su-greedy-3-fold-39.png (not in git)


## Lives

| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| pf-pt_su-greedy-1 | greedy | pt_su | CAP [no ending] | 4 |  (age 27) | 1396 | 11 | 9 | 1883 s (play 1876, UI 1451) | buổi p50/p95/max 58/285/1154 ms · save rt 208×, 89.7 ms | 2937005677 |
| pf-pt_su-greedy-2 | greedy | pt_su | CAP [no ending] | 6 |  (age 25) | 1167 | 9 | 9 | 1820 s (play 1813, UI 1421) | buổi p50/p95/max 66/336/1781 ms · save rt 160×, 100.0 ms | 1756174360 |
| pf-pt_su-greedy-3 | greedy | pt_su | Hồng nhan bạc mệnh [death: Bà đỡ quỳ ngoài điện: ngươi khó sinh, chỉ giữ được] | Phi | 1.67 (age 20) | 294 | 3 | 4 | 379 s (play 371, UI 288) | buổi p50/p95/max 44/128/362 ms · save rt 60×, 37.1 ms | 4097038015 |
| pf-pt_su-greedy-4 | greedy | pt_su | CAP [no ending] | 5 |  (age 26) | 1385 | 11 | 10 | 1848 s (play 1840, UI 1352) | buổi p50/p95/max 58/292/2026 ms · save rt 252×, 136.9 ms | 3473878858 |
| pf-pt_su-greedy-5 | greedy | pt_su | CAP [no ending] | 2 |  (age 25) | 1236 | 10 | 9 | 1915 s (play 1908, UI 1490) | buổi p50/p95/max 60/298/1653 ms · save rt 203×, 103.9 ms | 1250053385 |
| pf-pt_su-cautious-1 | cautious | pt_su | CAP [no ending] | 6 |  (age 27) | 1363 | 10 | 11 | 1817 s (play 1809, UI 1366) | buổi p50/p95/max 53/283/1527 ms · save rt 222×, 85.6 ms | 2750626096 |
| pf-pt_su-cautious-2 | cautious | pt_su | Thái phi [death: Thành Thái phi] | Phi | 8.08 (age 27) | 1407 | 11 | 6 | 2151 s (play 2143, UI 1686) | buổi p50/p95/max 53/252/1411 ms · save rt 221×, 81.1 ms | 1763133829 |
| pf-pt_su-cautious-3 | cautious | pt_su | Xuất gia [thường: Xuất gia làm ni cô] | Quý nhân | 0.42 (age 18) | 92 | 2 | 3 | 209 s (play 202, UI 175) | buổi p50/p95/max 50/140/298 ms · save rt 18×, 26.1 ms | 1302643430 |
| pf-pt_su-cautious-4 | cautious | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 9 | 5 | 1438 s (play 0, UI 1064) | buổi p50/p95/max  ms · save rt  | 1770537827 |
| pf-pt_su-cautious-5 | cautious | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 6 | 4 | 909 s (play 0, UI 659) | buổi p50/p95/max  ms · save rt  | 1600557612 |
