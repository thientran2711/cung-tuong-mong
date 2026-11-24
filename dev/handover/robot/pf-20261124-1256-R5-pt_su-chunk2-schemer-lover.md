game sha 14ba876800413622b83814e8a8cdd848ac0ed241
# ROBOT-10 run pf · pt_su · 20261124-1256 (UTC)

Game: http://127.0.0.1:40275/index.html · 10 lives (10 planned) · 2 parallel · wall 101.9 min · UI checkpoints every 150 buổi at fold 755x1000 + ipad 1180x820
Runner: node dev/measure/robot10.js pf pt_su schemer,lover 5 /home/user/wt/out-R5d · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page

## Bugs (10 distinct; one row per bug, lives = how many lives hit it)

1. **crash** — browser tab crashed mid-life (renderer out of memory?)
   - lives 3/10 (pf-pt_su-schemer-4, pf-pt_su-schemer-5, pf-pt_su-lover-3) · hits 3
   - after 1780 s of play · last bot-page sample [s, heap MB, nodes, listeners, docs] [1494,785,294020,6126,6,10] (first [268,83,1641,427,2,1]) · renderer RSS MB [1494,11185]

2. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 3/10 (pf-pt_su-lover-1, pf-pt_su-lover-4, pf-pt_su-lover-5) · hits 3
   - JS heap 88 → 255 MB · DOM nodes 64105 → 82125 · listeners 4143 → 4466 over 1881 s · in the document 1430 → 842 nodes (rest = detached, held by JS) · biggest holder ["#game",192] · S.logs 5 → 150
   - repro save: saves/20261124-1256-001.json

3. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 8/10 (pf-pt_su-schemer-1, pf-pt_su-schemer-2, pf-pt_su-schemer-3, pf-pt_su-schemer-5 …) · hits 20
   - 12 presses, night flip S.nfX open @ năm 2 th1 t2 b3 (buổi #152)
   - repro save: saves/20261124-1256-002.json

4. **stuck** — no ending within the wall cap (1800 s)
   - lives 2/10 (pf-pt_su-lover-1, pf-pt_su-lover-4) · hits 2
   - state {"year":6,"rank":5,"age":25,"dead":false}
   - repro save: saves/20261124-1256-003.json

5. **save** — save→load→save changes the state
   - lives 7/10 (pf-pt_su-schemer-1, pf-pt_su-schemer-2, pf-pt_su-schemer-3, pf-pt_su-lover-1 …) · hits 891
   - save.S.visit.people.2: {"kind":"npc","sid":18,"name":"Tiểu Lương Tử","ini":"T","col → undefined @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-1256-004.json

6. **lag** — [fold] tab switch freezes over 400 ms
   - lives 10/10 (pf-pt_su-schemer-1, pf-pt_su-schemer-2, pf-pt_su-schemer-3, pf-pt_su-schemer-4 …) · hits 121
   - 1953 ms longest · 5 long tasks @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-1256-005.json

7. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 2/10 (pf-pt_su-lover-1, pf-pt_su-lover-4) · hits 4
   - 1565 ms @ năm 5 th12 t0 b0 (buổi #816) @ năm 5 th12 t0 b0 (buổi #816)
   - repro save: saves/20261124-1256-006.json

8. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 2/10 (pf-pt_su-schemer-2, pf-pt_su-schemer-4) · hits 3
   - Trường Môn viện3 bóng · đang ở lãnh cung @ năm 2 th2 t0 b3 (buổi #152)
   - repro save: saves/20261124-1256-007.json
   - screenshot: shots/pf-pt_su-schemer-2-ipad-45.png (not in git)

9. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 1/10 (pf-pt_su-lover-4) · hits 1
   - Phật đường1 bóng · 2 khắc × Chung Tú4 bóng · 2 khắc @ năm 1 th3 t0 b1 (buổi #1)
   - repro save: saves/20261124-1256-008.json
   - screenshot: shots/pf-pt_su-lover-4-fold-3.png (not in git)

10. **ui-cut** — [ipad] tab act: text cut: span.j59t
   - lives 1/10 (pf-pt_su-lover-2) · hits 1
   - Cung nữ thân tín tam đẳng @ năm 2 th2 t1 b3 (buổi #161)
   - repro save: saves/20261124-1256-009.json
   - screenshot: shots/pf-pt_su-lover-2-ipad-44.png (not in git)


## Lives

| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| pf-pt_su-schemer-1 | schemer | pt_su | Hồng nhan bạc mệnh [death: Bị ban chết vì đầu độc Công chúa Thuần Hy] | Thường tại | 1.08 (age 19) | 234 | 3 | 4 | 382 s (play 372, UI 295) | buổi p50/p95/max 37/188/562 ms · save rt 76×, 43.4 ms | 2621365542 |
| pf-pt_su-schemer-2 | schemer | pt_su | Hồng nhan bạc mệnh [death: Bị ban chết vì đầu độc Công chúa Hòa Đoan] | Thường tại | 1.92 (age 20) | 327 | 4 | 5 | 478 s (play 467, UI 382) | buổi p50/p95/max 26/205/591 ms · save rt 161×, 58.4 ms | 483804791 |
| pf-pt_su-schemer-3 | schemer | pt_su | Lãnh cung [death: Phát điên trong lãnh cung] | Thường tại | 1.83 (age 20) | 316 | 4 | 4 | 538 s (play 528, UI 447) | buổi p50/p95/max 21/156/528 ms · save rt 155×, 54.3 ms | 4069348208 |
| pf-pt_su-schemer-4 | schemer | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 11 | 4 | 1780 s (play 0, UI 921) | buổi p50/p95/max  ms · save rt  | 1931787457 |
| pf-pt_su-schemer-5 | schemer | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 6 | 4 | 1358 s (play 0, UI 781) | buổi p50/p95/max  ms · save rt  | 1471297058 |
| pf-pt_su-lover-1 | lover | pt_su | CAP [no ending] | 6 |  (age 25) | 930 | 8 | 7 | 1894 s (play 1880, UI 1467) | buổi p50/p95/max 74/325/1565 ms · save rt 138×, 106.1 ms | 3108502015 |
| pf-pt_su-lover-2 | lover | pt_su | Hồng nhan bạc mệnh [death: Hoàng thượng niên hiệu Thừa Bình băng hà, thọ 26 t] | Tần | 1.83 (age 20) | 352 | 4 | 4 | 576 s (play 565, UI 404) | buổi p50/p95/max 58/221/940 ms · save rt 58×, 48.2 ms | 1487979278 |
| pf-pt_su-lover-3 | lover | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 8 | 4 | 1773 s (play 0, UI 1234) | buổi p50/p95/max  ms · save rt  | 1948469677 |
| pf-pt_su-lover-4 | lover | pt_su | CAP [no ending] | 4 |  (age 25) | 1024 | 8 | 8 | 1817 s (play 1806, UI 1269) | buổi p50/p95/max 81/501/5214 ms · save rt 165×, 133.0 ms | 3933325524 |
| pf-pt_su-lover-5 | lover | pt_su | Hồng nhan bạc mệnh [death: Bị ban chết vì tư thông với Thị vệ Điền Phụng Chi] | Hoàng quý phi | 4.58 (age 23) | 831 | 7 | 5 | 1488 s (play 1475, UI 1140) | buổi p50/p95/max 65/291/995 ms · save rt 138×, 84.7 ms | 4103305739 |
