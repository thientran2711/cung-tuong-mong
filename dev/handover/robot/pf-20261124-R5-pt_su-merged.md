game sha 14ba876800413622b83814e8a8cdd848ac0ed241
# ROBOT-10 pf · pt_su (R5) · 50 lives merged from 4 chunks (harness 19183dca for skilled+random, 9e89619a for the rest)

## Bugs (29 distinct)

1. **lag** — [fold] tab switch freezes over 400 ms
   - lives 47/50 · hits 279
   - 1318 ms longest · 2 long tasks @ năm 1 th3 t0 b2 (buổi #2)

2. **lag** — [ipad] tab switch freezes over 400 ms
   - lives 47/50 · hits 297
   - 3157 ms longest · 3 long tasks @ năm 1 th3 t0 b2 (buổi #2)

3. **save** — save→load→save changes the state
   - lives 45/50 · hits 6342
   - save.S.visit.people.0.kind (text differs at char 0): «…elder» → «…maid» @ năm 1 th3 t0 b2 (buổi #2)

4. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 36/50 · hits 120
   - 12 presses, night flip S.nfX open @ năm 2 th2 t2 b3 (buổi #169)

5. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 25/50 · hits 25
   - JS heap 107 → 373 MB · DOM nodes 56076 → 184836 · listeners 3379 → 9258 over 1569 s · in the document 1430 → 762 nodes (rest = detached, held by JS) · biggest holder ["#game",192] · S.logs 6 → 95

6. **stuck** — no ending within the wall cap (1800 s)
   - lives 20/50 · hits 20
   - state {"year":8,"rank":0,"age":26,"dead":false}

7. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 12/50 · hits 21
   - 1828 ms @ năm 7 th4 t1 b0 (buổi #1067) @ năm 7 th4 t1 b0 (buổi #1067)

8. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 10/50 · hits 14
   - Thừa MinhTa + 7 bóng · còn 4 khắc @ năm 4 th11 t1 b1 (buổi #652)

9. **number** — stat out of range: danh
   - lives 7/50 · hits 11
   - danh=101 pf

10. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 7/50 · hits 8
   - Phật đường1 bóng · 2 khắc × Chung Tú5 bóng · 0 khắc @ năm 1 th3 t0 b1 (buổi #1)

11. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 6/50 · hits 12
   - Trường Môn viện5 bóng · 1 khắc × Hàm An5 bóng · 2 khắc · bị giậ @ năm 4 th9 t2 b3 (buổi #612)

12. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 5/50 · hits 10
   - Trường Môn viện5 bóng · 1 khắc · bị giật @ năm 4 th9 t2 b3 (buổi #612)

13. **number** — stat out of range: sac
   - lives 5/50 · hits 14
   - sac=101 pf

14. **number** — stat out of range: duc
   - lives 4/50 · hits 8
   - duc=101 pf

15. **stuck** — life stuck (inpage6 TIMEOUT: no progress in one buổi)
   - lives 4/50 · hits 4
   - {"used":0,"Q":1,"mg":false,"buoi":3,"place":"home","q0":{"t":"Bày mưu","opts":["Ra tay ngay: hủy dung|{}","Bày mưu: trộn độc vào phấn thoa mặt|{\"bac\":-30}","Bày mưu: bát canh nóng lỡ tay|{\"bac\":-20}","Bày mưu: dụ mèo dữ, ong độc|{\"bac\":-10}","Bày mưu: son phấn hỏng tặng làm quà|{\"bac\":-15}",

16. **number** — stat out of range: tai
   - lives 3/50 · hits 5
   - tai=101 pf

17. **harness** — runner error: page.evaluate: Target page, context or browser has been closed
   - lives 3/50 · hits 3
   - page.evaluate: Target page, context or browser has been closed
    at uiCheck (/home/user/wt/R5fix2/dev/measure/robot10.js:212:10)
    at life (/home/user/wt/R5fix2/dev/measure/robot10.js:176:29)
    at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:173
    at async /home/user/wt/R5fix2/dev/m

18. **number** — option text «Sủng +4» but the effect applies sung=5
   - lives 2/50 · hits 2
   - «Theo ngài lên núi | ngay: Sức -15 · Sủng +4» in «Tết Trùng cửu» fx={"suc":-15,"sung":5} @ năm 2 th9 t0 b1 (buổi #252)

19. **number** — option text «Sủng +2» but the effect applies sung=3
   - lives 2/50 · hits 2
   - «Khóc kể với Hoàng thượng | ngay: Sủng +2 · thành: cả hậu cung bị tra, ai cũng ghen +5» in «Việc khó xử» fx={"sung":3} @ năm 5 th3 t2 b2 (buổi #704)

20. **number** — option text «Sủng -3» but the effect applies sung=-2
   - lives 2/50 · hits 5
   - «Đóng cửa giữ mình | ngay: Sủng -3 · thành: · thành: 2 tuần: mưu hại nhắm vào ngươi thành ít đi một nửa · kèm: ít gặp Hoàng thượng» in «Lời cảnh báo» fx={"sung":-2} @ năm 1 th3 t2 b1 (buổi #12)

21. **number** — option text «Sủng +7» but the effect applies sung=5
   - lives 1/50 · hits 1
   - «Theo ngài lên núi | ngay: Sức -15 · Sủng +7» in «Tết Trùng cửu» fx={"suc":-15,"sung":5} @ năm 1 th9 t0 b1 (buổi #87)

22. **number** — option text «Sủng +4» but the effect applies sung=6
   - lives 1/50 · hits 1
   - «Báo tin cho Hoàng thượng | ngay: Sủng +4 · Thái hậu → ta: thiện cảm +5 · thành: các phi tần ghen +6 · kẻ ác có thể nhắm vào thai» in «Thái y bắt mạch» fx={"sung":6,"th":5} @ năm 4 th11 t0 b3 (buổi #634)

23. **js** — console.error: econ card TypeError: Cannot read properties of null (reading 'queen')
   - lives 1/50 · hits 1
   - 

24. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 1/50 · hits 1
   - Thái y viện5 bóng · 2 khắc × Ngự thiện phòng1 bóng · 2 khắc @ năm 2 th2 t1 b1 (buổi #159)

25. **mem** — [ipad] real page memory keeps growing over the life (leak)
   - lives 1/50 · hits 1
   - JS heap 62 → 72 MB · DOM nodes 12471 → 58897 · listeners 1162 → 4339 over 1810 s

26. **harness** — lag probe failed: page.evaluate: Target page, context or browser has been closed
   - lives 1/50 · hits 1
   - 

27. **harness** — runner error: page.waitForTimeout: Target page, context or browser has been closed
   - lives 1/50 · hits 1
   - page.waitForTimeout: Target page, context or browser has been closed
    at boot (/home/user/wt/R5fix2/dev/measure/robot10.js:59:10)
    at async life (/home/user/wt/R5fix2/dev/measure/robot10.js:155:39)
    at async /home/user/wt/R5fix2/dev/measure/robot10.js:272:173
    at async /home/user/wt/R5fi

28. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 1/50 · hits 1
   - Đức Thọ cung4 bóng · 2 khắc ·  × Tân Giả khố4 bóng · 2 khắc · b @ năm 4 th10 t1 b3 (buổi #625)

29. **harness** — forced road pt_su not played (life got null)
   - lives 1/50 · hits 1
   - arcOk67 false at start? (road locked)

