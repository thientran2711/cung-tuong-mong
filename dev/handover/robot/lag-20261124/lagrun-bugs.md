# ROBOT-10 run nc · spread · 20261124-0123 (UTC)

Game: http://127.0.0.1:36269/index.html · 2 lives (2 planned) · 2 parallel · wall 29.6 min · UI checkpoints every 80 buổi at fold 755x1000 + ipad 1180x820
Runner: node dev/measure/robot10.js nc spread 2 1 /home/user/wt/lag-out/lagrun · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page

## Bugs (12 distinct; one row per bug, lives = how many lives hit it)

1. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 2/2 (nc-nc_gian-skilled-1, nc-nc_su-random-1) · hits 3
   - 12 presses, night flip S.nfX open @ năm 2 th2 t2 b3 (buổi #168)
   - repro save: saves/20261124-0123-001.json

2. **stuck** — no ending within the wall cap (1500 s)
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 1
   - state {"year":4,"rank":5,"age":22,"dead":false}
   - repro save: saves/20261124-0123-002.json

3. **save** — save→load→save changes the state
   - lives 2/2 (nc-nc_gian-skilled-1, nc-nc_su-random-1) · hits 109
   - save.S.visit.people.3: {"kind":"npc","sid":13,"name":"Chi Nhi","ini":"N","col":"#b9 → undefined @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-003.json

4. **lag** — [fold] tab switch freezes over 400 ms
   - lives 2/2 (nc-nc_gian-skilled-1, nc-nc_su-random-1) · hits 18
   - 3804 ms longest · 3 long tasks @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-004.json

5. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × button.kfoc-next
   - lives 2/2 (nc-nc_gian-skilled-1, nc-nc_su-random-1) · hits 2
   - Còn 2 phi tần ta chưa quen biế × Tiếp ▸ @ năm 2 th8 t2 b2 (buổi #258)
   - repro save: saves/20261124-0123-005.json
   - screenshot: shots/nc-nc_gian-skilled-1-fold-76.png (not in git)

6. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × span.mmeta
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 15
   - 6 bóng · × 1 bóng · @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-006.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-10.png (not in git)

7. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 11
   - 6 bóng · × đang cấm túc (2 tháng) @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-007.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-10.png (not in git)

8. **ui-text-overlap** — [ipad] tab go: text over text: em × span.mmeta
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 17
   - đang cấm túc (2 tháng) × 1 bóng · @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-008.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-10.png (not in git)

9. **ui-text-overlap** — [ipad] tab go: text over text: em × em
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 13
   - đang cấm túc (2 tháng) × đang cấm túc (2 tháng) @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-009.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-10.png (not in git)

10. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em.ok
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 4
   - 1 bóng · × còn 1 khắc @ năm 1 th3 t1 b3 (buổi #8) (night flip pending)
   - repro save: saves/20261124-0123-010.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-29.png (not in git)

11. **ui-text-overlap** — [ipad] tab go: text over text: em × em.ok
   - lives 1/2 (nc-nc_gian-skilled-1) · hits 4
   - đang cấm túc (2 tháng) × còn 1 khắc @ năm 1 th3 t1 b3 (buổi #8) (night flip pending)
   - repro save: saves/20261124-0123-011.json
   - screenshot: shots/nc-nc_gian-skilled-1-ipad-29.png (not in git)

12. **ui-text-overlap** — [fold] tab story: text over text: span.kchkt × span.kfoc-sayn
   - lives 1/2 (nc-nc_su-random-1) · hits 1
   - Hoặc qua chín tháng đầu (0/9), × Diêu Thục Hoa @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0123-012.json
   - screenshot: shots/nc-nc_su-random-1-fold-8.png (not in git)


## Lives

| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| nc-nc_gian-skilled-1 | skilled | nc_gian | CAP [no ending] | 5 |  (age 22) | 521 | 8 | 16 | 1775 s (play 1767, UI 1592) | buổi p50/p95/max 69/205/541 ms · save rt 75×, 75.0 ms | 3248122326 |
| nc-nc_su-random-1 | random | nc_su | Xuất gia [thường: Xuất gia] | Quý nhân | 0.75 (age 18) | 140 | 3 | 6 | 428 s (play 418, UI 369) | buổi p50/p95/max 59/161/315 ms · save rt 34×, 42.4 ms | 3857262870 |
