# ROBOT-10 run thd · thd_tho · 20261124-0256 (UTC)

Game: http://127.0.0.1:45587/index.html · 50 lives (50 planned) · 2 parallel · wall 327.1 min · UI checkpoints every 150 buổi at fold 755x1000 + ipad 1180x820
Runner: node dev/measure/robot10.js thd thd_tho 10 5 /home/user/wt/out-R1 · repro: put saves/<file> into localStorage "hclh-save-v2-1", open the game, «Tiếp tục kiếp này» (Ô 1); seed = SEED for the bot page

## Bugs (103 distinct; one row per bug, lives = how many lives hit it)

1. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 25/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 25
   - JS heap 105 → 892 MB · DOM nodes 87630 → 199781 · listeners 4180 → 9776 over 1611 s
   - repro save: saves/20261124-0256-001.json

2. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 26/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 178
   - 12 presses, night flip S.nfX open @ năm 3 th1 t2 b3 (buổi #329)
   - repro save: saves/20261124-0256-002.json

3. **stuck** — no ending within the wall cap (1800 s)
   - lives 12/50 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-4, thd-thd_tho-skilled-5, thd-thd_tho-greedy-1 …) · hits 12
   - state {"year":16,"rank":5,"age":34,"dead":false}
   - repro save: saves/20261124-0256-003.json

4. **stuck** — life stuck (inpage6 TIMEOUT: no progress in one buổi)
   - lives 6/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-random-1, thd-thd_tho-random-3 …) · hits 6
   - {"used":2,"Q":0,"mg":false,"buoi":0,"place":"lc","out":1,"modalHidden":true,"ov":"","logs":["T7/14 thượng tuầnHoàng thượng không vừa mắt: Xin lỗi (“Trẫm chỉ nhìn, không nói) — Ta cúi đầu nhận lỗi; Hoàng thượng nguôi giận phần nào.","T7/14 thượng tuầnHọc với thầy Thi. Tiến bộ +1.","T7/14 thượng tuầnTừ Tịch Nguyệt nghe ngóng trở về: Từ Tịch Nguyệt nghe ngóng được về Đáp ứng Trưởng Tôn Hứa Hàm Tiếu (
   - repro save: saves/20261124-0256-004.json

5. **js** — console.error: econ card TypeError: Cannot read properties of null (reading 'queen')
   - lives 3/50 (thd-thd_tho-skilled-3, thd-thd_tho-cautious-4, thd-thd_tho-lover-3) · hits 3
   - 
   - repro save: saves/20261124-0256-005.json

6. **js** — [fold real page] Cannot read properties of undefined (reading 'replace') at renderHud2 (http://127.0.0.1:45587/index.html:2735:356)
   - lives 1/50 (thd-thd_tho-scholar-3) · hits 4
   - 

7. **js** — [fold real page] console.error: TypeError: Cannot read properties of undefined (reading 'sl')
   - lives 1/50 (thd-thd_tho-scholar-3) · hits 4
   - 

8. **js** — [ipad real page] Cannot read properties of undefined (reading 'replace') at renderHud2 (http://127.0.0.1:45587/index.html:2735:356)
   - lives 1/50 (thd-thd_tho-scholar-3) · hits 48
   - 

9. **js** — [fold real page] kitImgErr is not defined at HTMLImageElement.onerror (http://127.0.0.1:45587/index.html:1:1)
   - lives 1/50 (thd-thd_tho-scholar-3) · hits 14
   - 

10. **js** — [fold real page] Cannot read properties of undefined (reading 'sl') at http://127.0.0.1:45587/index.html:1761:47
   - lives 1/50 (thd-thd_tho-scholar-3) · hits 1
   - 

11. **save** — save→load→save changes the state
   - lives 33/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 9396
   - save.S.visit.tk: {} → undefined @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-006.json

12. **save** — [fold] save does not load in the real game: throws: Failed to execute 'setItem' on 'Storage': Setting the value of 'hclh-save-v2-1' exceeded the quota.
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - năm 17 th10 t2 b3 (buổi #2955)
   - repro save: saves/20261124-0256-007.json

13. **number** — stat out of range: danh
   - lives 16/50 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4, thd-thd_tho-skilled-5 …) · hits 41
   - danh=101 thd
   - repro save: saves/20261124-0256-008.json

14. **number** — stat out of range: tai
   - lives 12/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-greedy-3 …) · hits 24
   - tai=101 thd
   - repro save: saves/20261124-0256-009.json

15. **number** — stat out of range: sac
   - lives 10/50 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4, thd-thd_tho-greedy-2 …) · hits 23
   - sac=101 thd
   - repro save: saves/20261124-0256-010.json

16. **number** — stat out of range: duc
   - lives 7/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-5, thd-thd_tho-lover-3 …) · hits 14
   - duc=101 thd
   - repro save: saves/20261124-0256-011.json

17. **number** — option text «Sức +6» but the effect applies suc=-2
   - lives 3/50 (thd-thd_tho-skilled-5, thd-thd_tho-scholar-2, thd-thd_tho-scholar-3) · hits 3
   - «Thay hết nước, đồ ăn | Sức +6 · kèm: không biết nguyên do» in «Chuyện lạ cần tra» fx={"bac":-5,"suc":-2} @ năm 13 th6 t0 b1 (buổi #2173)
   - repro save: saves/20261124-0256-012.json

18. **harness** — runner error: ENOENT: no such file or directory, open '/home/user/wt/R1/dev/measure/inpage6.js'
   - lives 16/50 (thd-thd_tho-scholar-5, thd-thd_tho-rebel-1, thd-thd_tho-rebel-2, thd-thd_tho-rebel-3 …) · hits 16
   - Error: ENOENT: no such file or directory, open '/home/user/wt/R1/dev/measure/inpage6.js'     at Object.readFileSync (node:fs:440:20)     at rd (/home/user/wt/R1/dev/measure/robot10.js:52:16)     at life (/home/user/wt/R1/dev/measure/robot10.js:141:19)     at async /home/user/wt/R1/dev/measure/robot10.js:255:173     at async Promise.all (index 1)     at async /home/user/wt/R1/dev/measure/robot10.js

19. **harness** — runner error: page.evaluate: TypeError: Cannot read properties of undefined (reading 'turn')
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - page.evaluate: TypeError: Cannot read properties of undefined (reading 'turn')     at gt (eval at evaluate (:311:30), <anonymous>:1:23)     at eval (eval at evaluate (:311:30), <anonymous>:1:70)     at UtilityScript.evaluate (<anonymous>:313:16)     at UtilityScript.<anonymous> (<anonymous>:1:44)     at nightAfterLoad (/home/user/wt/R1/dev/measure/robot10.js:218:59)     at uiCheck (/home/user/wt/R

20. **lag** — [fold] tab switch freezes over 400 ms
   - lives 34/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 724
   - 1553 ms longest · 2 long tasks @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-013.json

21. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 20/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 1070
   - 1535 ms @ năm 7 th10 t1 b0 (buổi #1154) @ năm 7 th10 t1 b0 (buổi #1154)
   - repro save: saves/20261124-0256-014.json

22. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 9/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-5, thd-thd_tho-cautious-1 …) · hits 23
   - Chung TúTa + 8 bóng · còn 4 khắc @ năm 3 th12 t2 b3 (buổi #489)
   - repro save: saves/20261124-0256-015.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-83.png (not in git)

23. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 6/50 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-greedy-2, thd-thd_tho-greedy-5 …) · hits 9
   - Trường Môn viện14 bóng · 1 khắc @ năm 11 th12 t2 b2 (buổi #1870)
   - repro save: saves/20261124-0256-016.json
   - screenshot: shots/thd-thd_tho-skilled-2-ipad-246.png (not in git)

24. **ui-covered-btn** — [fold] tab go: button covered: button.mspot under div.mspot.off
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 3
   - Ngự hoa viên2 khắc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-017.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

25. **ui-covered-btn** — [fold] tab go: button covered: button.mspot under div.mspot.sm
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 3
   - Kính sự phòng1 bóng · 1 khắc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-018.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

26. **ui-covered-btn** — [fold] tab go: button covered: button.mspot under button.mspot.sm
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - Thái y viện1 bóng · 2 khắc @ năm 16 th2 t2 b3 (buổi #2653)
   - repro save: saves/20261124-0256-019.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-336.png (not in git)

27. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 8/50 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-random-5, thd-thd_tho-greedy-2 …) · hits 16
   - Trường Môn viện14 bóng · 1 khắ × Hàm An2 bóng · 2 khắc @ năm 11 th12 t2 b2 (buổi #1870)
   - repro save: saves/20261124-0256-020.json
   - screenshot: shots/thd-thd_tho-skilled-2-ipad-246.png (not in git)

28. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 5/50 (thd-thd_tho-skilled-3, thd-thd_tho-greedy-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3 …) · hits 26
   - Đức Thọ cung2 bóng · 2 khắc × Vĩnh Thọ2 khắc · bị giật y phụ @ năm 10 th1 t2 b2 (buổi #1572)
   - repro save: saves/20261124-0256-021.json
   - screenshot: shots/thd-thd_tho-skilled-3-fold-202.png (not in git)

29. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Thái y viện1 bóng · 2 khắc × Kính sự phòng1 bóng · 1 khắc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-022.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

30. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × span.mmeta
   - lives 29/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 602
   - 3 bóng · × 5 bóng · @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-023.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-10.png (not in git)

31. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em
   - lives 28/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 603
   - 3 bóng · × đang cấm túc (1 tháng) @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-024.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-10.png (not in git)

32. **ui-text-overlap** — [ipad] tab go: text over text: em × span.mmeta
   - lives 28/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 594
   - đang cấm túc (1 tháng) × 5 bóng · @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-025.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-10.png (not in git)

33. **ui-text-overlap** — [ipad] tab go: text over text: em × em
   - lives 28/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 596
   - đang cấm túc (1 tháng) × đang cấm túc (1 tháng) @ năm 1 th3 t0 b2 (buổi #2)
   - repro save: saves/20261124-0256-026.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-10.png (not in git)

34. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × em.ok
   - lives 12/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-1, thd-thd_tho-greedy-2 …) · hits 47
   - 2 bóng · × còn 4 khắc @ năm 11 th2 t2 b1 (buổi #1749)
   - repro save: saves/20261124-0256-027.json
   - screenshot: shots/thd-thd_tho-skilled-1-fold-218.png (not in git)

35. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × span.mmeta
   - lives 10/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-5, thd-thd_tho-greedy-2 …) · hits 24
   - còn 4 khắc × 3 bóng · @ năm 3 th12 t2 b3 (buổi #489)
   - repro save: saves/20261124-0256-028.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-83.png (not in git)

36. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em
   - lives 9/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-5 …) · hits 22
   - còn 4 khắc × đang cấm túc (1 tháng) @ năm 3 th12 t2 b3 (buổi #489)
   - repro save: saves/20261124-0256-029.json
   - screenshot: shots/thd-thd_tho-skilled-1-ipad-83.png (not in git)

37. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × button.kfoc-next
   - lives 9/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-greedy-5, thd-thd_tho-cautious-3 …) · hits 10
   - Còn 1 phi tần ta chưa quen biế × Tiếp ▸ @ năm 10 th4 t1 b2 (buổi #1595)
   - repro save: saves/20261124-0256-030.json
   - screenshot: shots/thd-thd_tho-skilled-1-fold-202.png (not in git)

38. **ui-text-overlap** — [fold] tab go: text over text: em × em.ok
   - lives 9/50 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-1, thd-thd_tho-greedy-5 …) · hits 28
   - đang cấm túc (1 tháng) × còn 4 khắc @ năm 11 th2 t2 b1 (buổi #1749)
   - repro save: saves/20261124-0256-031.json
   - screenshot: shots/thd-thd_tho-skilled-1-fold-218.png (not in git)

39. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em.ok
   - lives 5/50 (thd-thd_tho-greedy-2, thd-thd_tho-greedy-5, thd-thd_tho-scholar-2, thd-thd_tho-scholar-3 …) · hits 8
   - 2 khắc × 2 khắc @ năm 2 th11 t2 b3 (buổi #306)
   - repro save: saves/20261124-0256-032.json
   - screenshot: shots/thd-thd_tho-greedy-2-ipad-65.png (not in git)

40. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mlab
   - lives 5/50 (thd-thd_tho-schemer-3, thd-thd_tho-lover-1, thd-thd_tho-lover-5, thd-thd_tho-scholar-3 …) · hits 325
   - Trường Môn viện × Hàm An @ năm 2 th2 t0 b2 (buổi #155)
   - repro save: saves/20261124-0256-033.json
   - screenshot: shots/thd-thd_tho-schemer-3-ipad-44.png (not in git)

41. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × p
   - lives 4/50 (thd-thd_tho-greedy-5, thd-thd_tho-lover-1, thd-thd_tho-scholar-1, thd-thd_tho-scholar-2) · hits 4
   - Còn 1 phi tần ta chưa quen biế × buông một câu ngọt như mật mà  @ năm 11 th1 t2 b2 (buổi #1708)
   - repro save: saves/20261124-0256-034.json
   - screenshot: shots/thd-thd_tho-greedy-5-fold-222.png (not in git)

42. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mmeta
   - lives 4/50 (thd-thd_tho-cautious-1, thd-thd_tho-schemer-3, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 23
   - Trường Môn viện × 4 bóng · @ năm 14 th10 t1 b1 (buổi #2351)
   - repro save: saves/20261124-0256-035.json
   - screenshot: shots/thd-thd_tho-cautious-1-ipad-300.png (not in git)

43. **ui-text-overlap** — [fold] tab act: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 33
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-036.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-91.png (not in git)

44. **ui-text-overlap** — [fold] tab kid: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 33
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-037.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-95.png (not in git)

45. **ui-text-overlap** — [fold] tab inv: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 33
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-038.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-96.png (not in git)

46. **ui-text-overlap** — [fold] tab art: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 33
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-039.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-97.png (not in git)

47. **ui-text-overlap** — [fold] tab story: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 33
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-040.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-98.png (not in git)

48. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × em
   - lives 3/50 (thd-thd_tho-cautious-1, thd-thd_tho-schemer-3, thd-thd_tho-scholar-4) · hits 12
   - Trường Môn viện × đang ở lãnh cung @ năm 14 th10 t1 b1 (buổi #2351)
   - repro save: saves/20261124-0256-041.json
   - screenshot: shots/thd-thd_tho-cautious-1-ipad-300.png (not in git)

49. **ui-text-overlap** — [fold] tab go: text over text: div.kbk-rh × div.kbk-rh
   - lives 3/50 (thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 30
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)
   - repro save: saves/20261124-0256-042.json
   - screenshot: shots/thd-thd_tho-schemer-5-fold-21.png (not in git)

50. **ui-text-overlap** — [fold] tab act: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-043.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-91.png (not in git)

51. **ui-text-overlap** — [fold] tab act: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-044.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-91.png (not in git)

52. **ui-text-overlap** — [fold] tab court: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-045.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-93.png (not in git)

53. **ui-text-overlap** — [fold] tab court: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-046.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-93.png (not in git)

54. **ui-text-overlap** — [fold] tab court: text over text: div.kbk-rh × div.kbk-rh
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 6
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-047.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-93.png (not in git)

55. **ui-text-overlap** — [fold] tab rel: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-048.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-94.png (not in git)

56. **ui-text-overlap** — [fold] tab rel: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-049.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-94.png (not in git)

57. **ui-text-overlap** — [fold] tab rel: text over text: div.kbk-rh × div.kbk-rh
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 6
   - Tuần lục · Tháng mười một, năm × Tuần lục · Tháng mười một, năm @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-050.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-94.png (not in git)

58. **ui-text-overlap** — [fold] tab kid: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-051.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-95.png (not in git)

59. **ui-text-overlap** — [fold] tab kid: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-052.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-95.png (not in git)

60. **ui-text-overlap** — [fold] tab inv: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-053.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-96.png (not in git)

61. **ui-text-overlap** — [fold] tab inv: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-054.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-96.png (not in git)

62. **ui-text-overlap** — [fold] tab art: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-055.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-97.png (not in git)

63. **ui-text-overlap** — [fold] tab art: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-056.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-97.png (not in git)

64. **ui-text-overlap** — [fold] tab story: text over text: span × small.kbk-ts
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-057.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-98.png (not in git)

65. **ui-text-overlap** — [fold] tab story: text over text: span.kbk-ls × span.ef.n
   - lives 2/50 (thd-thd_tho-schemer-4, thd-thd_tho-schemer-5) · hits 2
   - Tháng mười một, năm thứ tư, hạ × Đông · sương giá @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-058.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-98.png (not in git)

66. **ui-text-overlap** — [fold] tab act (opened a card): text over text: div.kbk-rh × div.kbk-rh
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 27
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)
   - repro save: saves/20261124-0256-059.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-254.png (not in git)

67. **ui-text-overlap** — [fold] tab rv: text over text: div.kbk-rh × div.kbk-rh
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 27
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)
   - repro save: saves/20261124-0256-060.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-257.png (not in git)

68. **ui-text-overlap** — [fold] tab staff: text over text: div.kbk-rh × div.kbk-rh
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 27
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)
   - repro save: saves/20261124-0256-061.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-258.png (not in git)

69. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × button.acb
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Ngự hoa viên × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-062.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

70. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × b
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 4
   - Ngự hoa viên × Chắc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-063.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

71. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × span.mwhy
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 34
   - Ngự hoa viên × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-064.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

72. **ui-text-overlap** — [fold] tab go: text over text: em.ok × button.acb
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 10
   - 2 khắc × Lẻn vào @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-065.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

73. **ui-text-overlap** — [fold] tab go: text over text: span.mwhy × span.mlab
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 93
   - tẩm điện Hoàng thượng: chỉ vào × Cần Chính điện @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-066.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

74. **ui-text-overlap** — [fold] tab go: text over text: button.acb × span.mwhy
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Xin yết kiến × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-067.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

75. **ui-text-overlap** — [fold] tab go: text over text: button.acb × button.acb
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 9
   - Xin yết kiến × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-068.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

76. **ui-text-overlap** — [fold] tab go: text over text: button.acb × i
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Xin yết kiến × ngài vắng @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-069.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

77. **ui-text-overlap** — [fold] tab go: text over text: b × span.mwhy
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Chắc × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-070.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

78. **ui-text-overlap** — [fold] tab go: text over text: b × button.acb
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 9
   - Chắc × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-071.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

79. **ui-text-overlap** — [fold] tab go: text over text: b × i
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - Chắc × ngài vắng @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-072.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

80. **ui-text-overlap** — [fold] tab go: text over text: i × span.mwhy
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 5
   - 3 khắc × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-073.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

81. **ui-text-overlap** — [fold] tab go: text over text: button.acb × b
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 4
   - Lẻn vào × Năm ăn năm thua @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-074.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

82. **ui-text-overlap** — [fold] tab go: text over text: b × b
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 4
   - Khó × Năm ăn năm thua @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-075.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

83. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × span.mlab
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 34
   - 1 bóng · × Cảnh Phúc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-076.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

84. **ui-text-overlap** — [fold] tab go: text over text: em.ok × span.mlab
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 15
   - 1 khắc × Cảnh Phúc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-077.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

85. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × em.ok
   - lives 2/50 (thd-thd_tho-scholar-3, thd-thd_tho-scholar-4) · hits 8
   - Diên Huy × 2 khắc @ năm 13 th9 t2 b3 (buổi #2216)
   - repro save: saves/20261124-0256-078.json
   - screenshot: shots/thd-thd_tho-scholar-3-fold-275.png (not in git)

86. **ui-text-overlap** — [fold] tab act: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-079.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-91.png (not in git)

87. **ui-text-overlap** — [fold] tab court: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-080.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-93.png (not in git)

88. **ui-text-overlap** — [fold] tab rel: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-081.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-94.png (not in git)

89. **ui-text-overlap** — [fold] tab kid: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-082.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-95.png (not in git)

90. **ui-text-overlap** — [fold] tab inv: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-083.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-96.png (not in git)

91. **ui-text-overlap** — [fold] tab art: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-084.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-97.png (not in git)

92. **ui-text-overlap** — [fold] tab story: text over text: span.kbk-ls × span.krl
   - lives 1/50 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)
   - repro save: saves/20261124-0256-085.json
   - screenshot: shots/thd-thd_tho-schemer-4-fold-98.png (not in git)

93. **ui-text-overlap** — [fold] tab go: text over text: span × small.kbk-ts
   - lives 1/50 (thd-thd_tho-schemer-5) · hits 1
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)
   - repro save: saves/20261124-0256-086.json
   - screenshot: shots/thd-thd_tho-schemer-5-fold-21.png (not in git)

94. **ui-text-overlap** — [fold] tab go: text over text: span.kbk-ls × span.ef.n
   - lives 1/50 (thd-thd_tho-schemer-5) · hits 1
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)
   - repro save: saves/20261124-0256-087.json
   - screenshot: shots/thd-thd_tho-schemer-5-fold-21.png (not in git)

95. **ui-text-overlap** — [fold] tab go: text over text: span.mwhy × span.mwhy
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 47
   - cấm túc 1 tháng × cấm túc 1 tháng @ năm 2 th3 t2 b2 (buổi #179)
   - repro save: saves/20261124-0256-088.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-38.png (not in git)

96. **ui-text-overlap** — [fold] tab go: text over text: span.mwhy × span.mmeta
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 7
   - cấm túc 1 tháng × 1 bóng · @ năm 4 th11 t2 b1 (buổi #639)
   - repro save: saves/20261124-0256-089.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-90.png (not in git)

97. **ui-text-overlap** — [fold] tab go: text over text: span.mwhy × em
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 7
   - cấm túc 1 tháng × đang cấm túc (1 tháng) @ năm 4 th11 t2 b1 (buổi #639)
   - repro save: saves/20261124-0256-090.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-90.png (not in git)

98. **ui-text-overlap** — [fold] tab go: text over text: em × span.mlab
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 8
   - đang cấm túc (1 tháng) × Khải Tường @ năm 4 th11 t2 b1 (buổi #639)
   - repro save: saves/20261124-0256-091.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-90.png (not in git)

99. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × button.acb
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 2
   - 1 bóng · × Xin yết kiến @ năm 8 th4 t2 b3 (buổi #1251)
   - repro save: saves/20261124-0256-092.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-165.png (not in git)

100. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × b
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - 1 bóng · × Khá chắc @ năm 8 th4 t2 b3 (buổi #1251)
   - repro save: saves/20261124-0256-093.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-165.png (not in git)

101. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × i
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - 1 bóng · × ngài vắng @ năm 8 th4 t2 b3 (buổi #1251)
   - repro save: saves/20261124-0256-094.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-165.png (not in git)

102. **ui-text-overlap** — [fold] tab go: text over text: em.ok × b
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - 3 khắc × Khá chắc @ năm 8 th4 t2 b3 (buổi #1251)
   - repro save: saves/20261124-0256-095.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-165.png (not in git)

103. **ui-text-overlap** — [fold] tab go: text over text: em.ok × i
   - lives 1/50 (thd-thd_tho-scholar-4) · hits 1
   - 3 khắc × ngài vắng @ năm 8 th4 t2 b3 (buổi #1251)
   - repro save: saves/20261124-0256-096.json
   - screenshot: shots/thd-thd_tho-scholar-4-fold-165.png (not in git)


## Lives

| life | bot | road | ending | max rank | years | buổi | UI cps | bugs | time | perf | seed |
|---|---|---|---|---|---|---|---|---|---|---|---|
| thd-thd_tho-skilled-1 | skilled | thd_tho | TIMEOUT [no ending] | 7 |  (age 20) | 2361 | 16 | 24 | 1617 s (play 1610, UI 645) | buổi p50/p95/max 73/494/3755 ms · save rt 274×, 160.9 ms | 795064746 |
| thd-thd_tho-skilled-2 | skilled | thd_tho | CAP [no ending] | 6 |  (age 34) | 2693 | 19 | 24 | 1831 s (play 1823, UI 688) | buổi p50/p95/max 57/520/3730 ms · save rt 525×, 252.5 ms | 286280747 |
| thd-thd_tho-skilled-3 | skilled | thd_tho | TIMEOUT [no ending] | 7 |  (age 19) | 2410 | 17 | 27 | 1574 s (play 1566, UI 479) | buổi p50/p95/max 65/582/3322 ms · save rt 449×, 343.7 ms | 2243047412 |
| thd-thd_tho-skilled-4 | skilled | thd_tho | CAP [no ending] | 6 |  (age 33) | 2712 | 19 | 13 | 1828 s (play 1821, UI 613) | buổi p50/p95/max 62/643/4363 ms · save rt 525×, 296.2 ms | 2405623629 |
| thd-thd_tho-skilled-5 | skilled | thd_tho | CAP [no ending] | 4 |  (age 34) | 2550 | 18 | 20 | 1808 s (play 1801, UI 695) | buổi p50/p95/max 66/539/4049 ms · save rt 437×, 355.8 ms | 1945133230 |
| thd-thd_tho-random-1 | random | thd_tho | TIMEOUT [no ending] | 0 |  (age 19) | 32 | 2 | 3 | 51 s (play 44, UI 27) | buổi p50/p95/max 55/121/135 ms · save rt 6×, 24.2 ms | 1077992375 |
| thd-thd_tho-random-2 | random | thd_tho | Xuất gia [thường: Xuất gia] | Đáp ứng | 0.92 (age 20) | 182 | 3 | 3 | 90 s (play 83, UI 37) | buổi p50/p95/max 28/108/222 ms · save rt 49×, 27.9 ms | 3215553126 |
| thd-thd_tho-random-3 | random | thd_tho | TIMEOUT [no ending] | 0 |  (age 18) | 19 | 2 | 4 | 65 s (play 59, UI 45) | buổi p50/p95/max 60/127/149 ms · save rt 5×, 18.8 ms | 3676043525 |
| thd-thd_tho-random-4 | random | thd_tho | TIMEOUT [no ending] | 0 |  (age 18) | 128 | 2 | 4 | 84 s (play 77, UI 35) | buổi p50/p95/max 55/129/223 ms · save rt 20×, 31.6 ms | 3513467308 |
| thd-thd_tho-random-5 | random | thd_tho | TIMEOUT [no ending] | 0 |  (age 19) | 35 | 2 | 5 | 50 s (play 44, UI 25) | buổi p50/p95/max 57/126/184 ms · save rt 6×, 21.8 ms | 3683447523 |
| thd-thd_tho-greedy-1 | greedy | thd_tho | CAP [no ending] | 4 |  (age 34) | 2664 | 19 | 14 | 1812 s (play 1804, UI 605) | buổi p50/p95/max 68/633/6055 ms · save rt 451×, 283.1 ms | 372282412 |
| thd-thd_tho-greedy-2 | greedy | thd_tho | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 2] | Quý phi | 8.17 (age 27) | 1491 | 11 | 17 | 836 s (play 828, UI 332) | buổi p50/p95/max 68/373/2888 ms · save rt 175×, 103.8 ms | 3679757441 |
| thd-thd_tho-greedy-3 | greedy | thd_tho | Hồng nhan bạc mệnh [death: Khó sinh, băng huyết mà chết] | Hoàng quý phi | 10.08 (age 30) | 1789 | 13 | 11 | 1013 s (play 1004, UI 360) | buổi p50/p95/max 59/352/3260 ms · save rt 329×, 195.2 ms | 3219267042 |
| thd-thd_tho-greedy-4 | greedy | thd_tho | Hồng nhan bạc mệnh [death: Hoàng thượng niên hiệu Gia Thịnh băng hà, thọ 33 t] | Quý phi | 9.67 (age 29) | 1689 | 12 | 14 | 930 s (play 923, UI 395) | buổi p50/p95/max 55/317/1333 ms · save rt 300×, 109.0 ms | 2231774775 |
| thd-thd_tho-greedy-5 | greedy | thd_tho | CAP [no ending] | 6 |  (age 33) | 2675 | 19 | 33 | 1807 s (play 1800, UI 650) | buổi p50/p95/max 59/574/4223 ms · save rt 522×, 286.6 ms | 1522350896 |
| thd-thd_tho-cautious-1 | cautious | thd_tho | CAP [no ending] | 7 |  (age 34) | 2669 | 19 | 17 | 1884 s (play 1877, UI 793) | buổi p50/p95/max 52/562/3774 ms · save rt 594×, 272.6 ms | 3360402025 |
| thd-thd_tho-cautious-2 | cautious | thd_tho | Hồng nhan bạc mệnh [death: Hoàng thượng niên hiệu Vĩnh An băng hà, thọ 25 tuổ] | Thường tại | 0.92 (age 19) | 161 | 3 | 9 | 126 s (play 120, UI 70) | buổi p50/p95/max 38/99/223 ms · save rt 34×, 28.2 ms | 589810804 |
| thd-thd_tho-cautious-3 | cautious | thd_tho | CAP [no ending] | 7 |  (age 33) | 2701 | 19 | 22 | 1881 s (play 1874, UI 776) | buổi p50/p95/max 61/606/3223 ms · save rt 468×, 252.9 ms | 2928011435 |
| thd-thd_tho-cautious-4 | cautious | thd_tho | Hồng nhan bạc mệnh [death: Hoàng thượng niên hiệu Hưng Long băng hà, thọ 30 t] | Quý phi | 9.5 (age 27) | 1643 | 12 | 13 | 1287 s (play 1279, UI 454) | buổi p50/p95/max 60/415/1759 ms · save rt 267×, 107.1 ms | 291896622 |
| thd-thd_tho-cautious-5 | cautious | thd_tho | CAP [no ending] | 7 |  (age 34) | 2703 | 19 | 25 | 1835 s (play 1828, UI 692) | buổi p50/p95/max 62/529/3714 ms · save rt 463×, 222.8 ms | 752387021 |
| thd-thd_tho-schemer-1 | schemer | thd_tho | Hồng nhan bạc mệnh [death: Lao phổi nguy kịch, không qua khỏi] | Đáp ứng | 4.17 (age 23) | 741 | 6 | 9 | 365 s (play 358, UI 140) | buổi p50/p95/max 46/155/400 ms · save rt 139×, 51.5 ms | 3130454005 |
| thd-thd_tho-schemer-2 | schemer | thd_tho | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 2] | Thường tại | 1.25 (age 21) | 211 | 3 | 7 | 130 s (play 123, UI 64) | buổi p50/p95/max 42/130/329 ms · save rt 43×, 35.1 ms | 4117946272 |
| thd-thd_tho-schemer-3 | schemer | thd_tho | Hồng nhan bạc mệnh [death: Bị ban chết vì đầu độc Hoàng tử Vĩnh Diễn] | Đáp ứng | 1 (age 19) | 218 | 3 | 11 | 121 s (play 114, UI 62) | buổi p50/p95/max 44/112/282 ms · save rt 42×, 32.3 ms | 553191207 |
| thd-thd_tho-schemer-4 | schemer | thd_tho | Hồng nhan bạc mệnh [death: Bị ban chết vì vu Hoàng tử Vĩnh Tường trù ẻo thánh] | Thường tại | 11.08 (age 29) | 1945 | 14 | 43 | 1675 s (play 1667, UI 474) | buổi p50/p95/max 53/384/2484 ms · save rt 389×, 154.5 ms | 1540683474 |
| thd-thd_tho-schemer-5 | schemer | thd_tho | Hồng nhan bạc mệnh [death: Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 2] | Thường tại | 3.08 (age 23) | 560 | 5 | 33 | 272 s (play 265, UI 100) | buổi p50/p95/max 42/163/402 ms · save rt 113×, 50.6 ms | 2001173873 |
| thd-thd_tho-lover-1 | lover | thd_tho | CAP [no ending] | 6 |  (age 32) | 2470 | 18 | 24 | 1835 s (play 1828, UI 651) | buổi p50/p95/max 63/526/4197 ms · save rt 478×, 365.5 ms | 1915499756 |
| thd-thd_tho-lover-2 | lover | thd_tho | Xuất gia [thường: Xuất gia làm ni cô] | Tần | 5.17 (age 23) | 923 | 7 | 9 | 468 s (play 460, UI 176) | buổi p50/p95/max 56/238/1002 ms · save rt 169×, 83.6 ms | 928007489 |
| thd-thd_tho-lover-3 | lover | thd_tho | Tư thông bị phát giác [death: Ban chết: tư thông bại lộ] | Phi | 12.58 (age 32) | 2212 | 16 | 18 | 1504 s (play 1496, UI 569) | buổi p50/p95/max 62/530/2971 ms · save rt 399×, 230.2 ms | 467517090 |
| thd-thd_tho-lover-4 | lover | thd_tho | CAP [no ending] | 4 |  (age 32) | 2564 | 18 | 18 | 1815 s (play 1808, UI 642) | buổi p50/p95/max 70/584/4216 ms · save rt 337×, 268.4 ms | 3774992119 |
| thd-thd_tho-lover-5 | lover | thd_tho | Hồng nhan bạc mệnh [death: Khó sinh, băng huyết mà chết] | Quý phi | 10.08 (age 30) | 1754 | 13 | 18 | 1198 s (play 1190, UI 570) | buổi p50/p95/max 60/372/2102 ms · save rt 336×, 144.9 ms | 3065568240 |
| thd-thd_tho-scholar-1 | scholar | thd_tho | Thái phi [death: Thành Thái phi] | Hoàng quý phi | 7.5 (age 25) | 1325 | 10 | 16 | 906 s (play 897, UI 426) | buổi p50/p95/max 56/279/1358 ms · save rt 251×, 122.1 ms | 3271678344 |
| thd-thd_tho-scholar-2 | scholar | thd_tho | CAP [no ending] | 7 |  (age 34) | 2539 | 18 | 25 | 1811 s (play 1803, UI 678) | buổi p50/p95/max 64/539/3298 ms · save rt 469×, 327.8 ms | 2284186077 |
| thd-thd_tho-scholar-3 | scholar | thd_tho | CAP [no ending] | 7 |  (age 32) | 2604 | 18 | 63 | 1821 s (play 1813, UI 519) | buổi p50/p95/max 76/644/5538 ms · save rt 332×, 316.2 ms | 1844484030 |
| thd-thd_tho-scholar-4 | scholar | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 21 | 64 | 1775 s (play 0, UI 195) | buổi p50/p95/max  ms · save rt  | 2312378427 |
| thd-thd_tho-scholar-5 | scholar | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 2121609860 |
| thd-thd_tho-rebel-1 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 803896178 |
| thd-thd_tho-rebel-2 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 2442647411 |
| thd-thd_tho-rebel-3 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 2251878844 |
| thd-thd_tho-rebel-4 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 267022997 |
| thd-thd_tho-rebel-5 | rebel | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 4101499894 |
| thd-thd_tho-lazy-1 | lazy | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 3646269410 |
| thd-thd_tho-lazy-2 | lazy | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 969264995 |
| thd-thd_tho-lazy-3 | lazy | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 799284780 |
| thd-thd_tho-lazy-4 | lazy | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 961860997 |
| thd-thd_tho-lazy-5 | lazy | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 501370598 |
| thd-thd_tho-speed-1 | speed | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 608519237 |
| thd-thd_tho-speed-2 | speed | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 1596011504 |
| thd-thd_tho-speed-3 | speed | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 2305435383 |
| thd-thd_tho-speed-4 | speed | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 3292927650 |
| thd-thd_tho-speed-5 | speed | ? | HARNESS [no ending] | -1 |  (age undefined) | undefined | 0 | 1 | 1 s (play 0, UI 0) | buổi p50/p95/max  ms · save rt  | 3753418049 |
