game sha 14ba876800413622b83814e8a8cdd848ac0ed241
# ROBOT-10 interim pf · pt_su (R5) · 14 lives done (partial, run still going)

## Bugs (22 distinct)

1. **lag** — [fold] tab switch freezes over 400 ms
   - lives 14/14 · hits 71
   - 1318 ms longest · 2 long tasks @ năm 1 th3 t0 b2 (buổi #2)

2. **lag** — [ipad] tab switch freezes over 400 ms
   - lives 14/14 · hits 74
   - 3157 ms longest · 3 long tasks @ năm 1 th3 t0 b2 (buổi #2)

3. **save** — save→load→save changes the state
   - lives 12/14 · hits 1447
   - save.S.visit.people.0.kind (text differs at char 0): «…elder» → «…maid» @ năm 1 th3 t0 b2 (buổi #2)

4. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 11/14 · hits 32
   - 12 presses, night flip S.nfX open @ năm 2 th2 t2 b3 (buổi #169)

5. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 6/14 · hits 6
   - JS heap 107 → 373 MB · DOM nodes 56076 → 184836 · listeners 3379 → 9258 over 1569 s · in the document 1430 → 762 nodes (rest = detached, held by JS) · biggest holder ["#game",192] · S.logs 6 → 95

6. **number** — stat out of range: danh
   - lives 4/14 · hits 7
   - danh=101 pf

7. **number** — option text «Sủng +4» but the effect applies sung=5
   - lives 4/14 · hits 4
   - «Theo ngài lên núi | ngay: Sức -15 · Sủng +4» in «Tết Trùng cửu» fx={"suc":-15,"sung":5} @ năm 2 th9 t0 b1 (buổi #252)

8. **number** — option text «Sủng +2» but the effect applies sung=3
   - lives 4/14 · hits 4
   - «Khóc kể với Hoàng thượng | ngay: Sủng +2 · thành: cả hậu cung bị tra, ai cũng ghen +5» in «Việc khó xử» fx={"sung":3} @ năm 5 th3 t2 b2 (buổi #704)

9. **stuck** — no ending within the wall cap (1800 s)
   - lives 4/14 · hits 4
   - state {"year":8,"rank":0,"age":26,"dead":false}

10. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 2/14 · hits 4
   - Thừa MinhTa + 7 bóng · còn 4 khắc @ năm 4 th11 t1 b1 (buổi #652)

11. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 2/14 · hits 3
   - 1828 ms @ năm 7 th4 t1 b0 (buổi #1067) @ năm 7 th4 t1 b0 (buổi #1067)

12. **number** — option text «Sủng -3» but the effect applies sung=-2
   - lives 2/14 · hits 5
   - «Đóng cửa giữ mình | ngay: Sủng -3 · thành: · thành: 2 tuần: mưu hại nhắm vào ngươi thành ít đi một nửa · kèm: ít gặp Hoàng thượng» in «Lời cảnh báo» fx={"sung":-2} @ năm 1 th3 t2 b1 (buổi #12)

13. **harness** — runner error: page.evaluate: Target page, context or browser has been closed
   - lives 2/14 · hits 2
   - page.evaluate: Target page, context or browser has been closed
    at life (/home/user/wt/R5fix/dev/measure/robot10.js:173:19)
    at async /home/user/wt/R5fix/dev/measure/robot10.js:272:173
    at async /home/user/wt/R5fix/dev/measure/robot10.js:272:2

14. **number** — stat out of range: tai
   - lives 1/14 · hits 1
   - tai=101 pf

15. **number** — option text «Sủng +7» but the effect applies sung=5
   - lives 1/14 · hits 1
   - «Theo ngài lên núi | ngay: Sức -15 · Sủng +7» in «Tết Trùng cửu» fx={"suc":-15,"sung":5} @ năm 1 th9 t0 b1 (buổi #87)

16. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 1/14 · hits 1
   - Phật đường1 bóng · 2 khắc × Chung Tú5 bóng · 0 khắc @ năm 1 th3 t0 b1 (buổi #1)

17. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 1/14 · hits 1
   - Trường Môn viện5 bóng · 1 khắc · bị giật @ năm 4 th9 t2 b3 (buổi #612)

18. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 1/14 · hits 1
   - Trường Môn viện5 bóng · 1 khắc × Hàm An5 bóng · 2 khắc · bị giậ @ năm 4 th9 t2 b3 (buổi #612)

19. **number** — option text «Sủng +4» but the effect applies sung=6
   - lives 1/14 · hits 1
   - «Báo tin cho Hoàng thượng | ngay: Sủng +4 · Thái hậu → ta: thiện cảm +5 · thành: các phi tần ghen +6 · kẻ ác có thể nhắm vào thai» in «Thái y bắt mạch» fx={"sung":6,"th":5} @ năm 4 th11 t0 b3 (buổi #634)

20. **js** — console.error: econ card TypeError: Cannot read properties of null (reading 'queen')
   - lives 1/14 · hits 1
   - 

21. **number** — stat out of range: sac
   - lives 1/14 · hits 3
   - sac=101 pf

22. **harness** — lag probe failed: page.evaluate: Target page, context or browser has been closed
   - lives 1/14 · hits 1
   - 

