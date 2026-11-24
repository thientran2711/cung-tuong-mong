game sha 14ba876800413622b83814e8a8cdd848ac0ed241
# ROBOT-10 run pf · pt_su · 20261124-1438 (UTC)

Game: http://127.0.0.1:38069/index.html · 10 lives (10 planned) · 2 parallel · wall 120.0 min · UI checkpoints every 150 buổi at fold 755x1000 + ipad 1180x820
Runner: node dev/measure/robot10.js pf pt_su scholar,rebel 5 /home/user/wt/out-R5e · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page

## Bugs (13 distinct; one row per bug, lives = how many lives hit it)

1. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 5/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-2, pf-pt_su-scholar-3, pf-pt_su-scholar-4 …) · hits 5
   - JS heap 95 → 410 MB · DOM nodes 65431 → 72429 · listeners 4174 → 4508 over 2091 s · in the document 1430 → 756 nodes (rest = detached, held by JS) · biggest holder ["#game",187] · S.logs 5 → 150
   - repro save: saves/20261124-1438-001.json

2. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 9/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-2, pf-pt_su-scholar-3, pf-pt_su-scholar-4 …) · hits 30
   - 12 presses, night flip S.nfX open @ năm 4 th10 t1 b3 (buổi #620)
   - repro save: saves/20261124-1438-002.json

3. **stuck** — no ending within the wall cap (1800 s)
   - lives 5/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-2, pf-pt_su-scholar-3, pf-pt_su-scholar-4 …) · hits 5
   - state {"year":8,"rank":6,"age":25,"dead":false}
   - repro save: saves/20261124-1438-003.json

4. **save** — save→load→save changes the state
   - lives 9/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-2, pf-pt_su-scholar-3, pf-pt_su-scholar-4 …) · hits 1401
   - save.S.roster.P.mm:me.2.3 (text differs at char 0): «…theo hầu ngươi ở Cần Chính điện (đi cùng» → «…ngươi sang Cần Chính điện: ngươi đi gấp,» @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1438-004.json

5. **number** — stat out of range: duc
   - lives 2/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-4) · hits 2
   - duc=101 pf
   - repro save: saves/20261124-1438-005.json

6. **number** — stat out of range: sac
   - lives 2/10 (pf-pt_su-scholar-2, pf-pt_su-scholar-4) · hits 10
   - sac=101 pf
   - repro save: saves/20261124-1438-006.json

7. **harness** — runner error: page.evaluate: Target page, context or browser has been closed
   - lives 1/10 (pf-pt_su-rebel-5) · hits 1
   - page.evaluate: Target page, context or browser has been closed     at uiCheck (/home/user/wt/R5fix2/dev/measure/robot10.js:225:14)     at async life (/home/user/wt/R5fix2/dev/measure/robot10.js:176:23)     at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:173     at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:2

8. **lag** — [fold] tab switch freezes over 400 ms
   - lives 10/10 (pf-pt_su-scholar-1, pf-pt_su-scholar-2, pf-pt_su-scholar-3, pf-pt_su-scholar-4 …) · hits 138
   - 440 ms longest · 1 long tasks @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1438-007.json

9. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 1/10 (pf-pt_su-scholar-5) · hits 2
   - 1658 ms @ năm 7 th4 t1 b0 (buổi #1084) @ năm 7 th4 t1 b0 (buổi #1084)
   - repro save: saves/20261124-1438-008.json

10. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 2/10 (pf-pt_su-scholar-2, pf-pt_su-rebel-5) · hits 6
   - Hàm An7 bóng · 2 khắc · bái kiến @ năm 3 th1 t1 b2 (buổi #319)
   - repro save: saves/20261124-1438-009.json
   - screenshot: shots/pf-pt_su-scholar-2-ipad-67.png (not in git)

11. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 2/10 (pf-pt_su-scholar-2, pf-pt_su-rebel-1) · hits 2
   - Thừa MinhTa + 10 bóng · còn 4 khắc @ năm 8 th4 t2 b3 (buổi #1252)
   - repro save: saves/20261124-1438-010.json
   - screenshot: shots/pf-pt_su-scholar-2-ipad-175.png (not in git)

12. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 3/10 (pf-pt_su-scholar-2, pf-pt_su-rebel-3, pf-pt_su-rebel-5) · hits 8
   - Hàm An7 bóng · 2 khắc · bái ki × Trường Xuân5 bóng · 3 khắc · b @ năm 3 th1 t1 b2 (buổi #319)
   - repro save: saves/20261124-1438-011.json
   - screenshot: shots/pf-pt_su-scholar-2-ipad-67.png (not in git)

13. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 1/10 (pf-pt_su-scholar-2) · hits 1
   - Đức Thọ cung4 bóng · 2 khắc ·  × Tân Giả khố4 bóng · 2 khắc · b @ năm 4 th10 t1 b3 (buổi #625)
   - repro save: saves/20261124-1438-012.json
   - screenshot: shots/pf-pt_su-scholar-2-ipad-103.png (not in git)


## Lives

| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| pf-pt_su-scholar-1 | scholar | pt_su | CAP [no ending] | 6 |  (age 25) | 1250 | 10 | 7 | 2100 s (play 2091, UI 1602) | buổi p50/p95/max 71/386/1455 ms · save rt 180×, 103.3 ms | 136898467 |
| pf-pt_su-scholar-2 | scholar | pt_su | CAP [no ending] | 4 |  (age 26) | 1279 | 10 | 11 | 2066 s (play 2056, UI 1568) | buổi p50/p95/max 68/368/1330 ms · save rt 216×, 103.0 ms | 2813902882 |
| pf-pt_su-scholar-3 | scholar | pt_su | CAP [no ending] | 6 |  (age 25) | 1304 | 10 | 6 | 1819 s (play 1812, UI 1439) | buổi p50/p95/max 49/242/836 ms · save rt 247×, 84.6 ms | 3274393281 |
| pf-pt_su-scholar-4 | scholar | pt_su | CAP [no ending] | 5 |  (age 27) | 1250 | 10 | 8 | 1866 s (play 1858, UI 1465) | buổi p50/p95/max 55/244/1011 ms · save rt 226×, 89.5 ms | 1116986736 |
| pf-pt_su-scholar-5 | scholar | pt_su | CAP [no ending] | 6 |  (age 26) | 1205 | 9 | 7 | 1811 s (play 1803, UI 1389) | buổi p50/p95/max 62/311/2072 ms · save rt 185×, 91.5 ms | 1826410615 |
| pf-pt_su-rebel-1 | rebel | pt_su | Hồng nhan bạc mệnh [death: Sổ Kính sự phòng không ghi đêm thị tẩm nào trước k] | Tần | 4.58 (age 22) | 795 | 7 | 5 | 1055 s (play 1048, UI 848) | buổi p50/p95/max 49/181/469 ms · save rt 145×, 55.4 ms | 2779979433 |
| pf-pt_su-rebel-2 | rebel | pt_su | Hồng nhan bạc mệnh [death: Trúng độc, không qua khỏi] | Đáp ứng | 1.17 (age 21) | 197 | 3 | 3 | 344 s (play 336, UI 285) | buổi p50/p95/max 45/138/200 ms · save rt 38×, 32.7 ms | 9388212 |
| pf-pt_su-rebel-3 | rebel | pt_su | Hồng nhan bạc mệnh [death: Sổ Kính sự phòng không ghi đêm thị tẩm nào trước k] | Tần | 4.42 (age 22) | 784 | 6 | 5 | 948 s (play 940, UI 737) | buổi p50/p95/max 55/196/552 ms · save rt 122×, 64.2 ms | 2347588843 |
| pf-pt_su-rebel-4 | rebel | pt_su | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 1] | Phi | 1.08 (age 19) | 192 | 3 | 4 | 447 s (play 440, UI 388) | buổi p50/p95/max 45/124/262 ms · save rt 42×, 30.2 ms | 4006441326 |
| pf-pt_su-rebel-5 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 7 | 6 | 1034 s (play 0, UI 798) | buổi p50/p95/max  ms · save rt  | 171964429 |
