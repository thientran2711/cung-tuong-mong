# ROBOT-10 R1 · thd · thd_tho · PARTIAL 48/50 lives (run still going)

Runner: PAR=2 node dev/measure/robot10.js thd thd_tho 10 5 · saves not attached (partial JSON strips them; full .md follows when the run ends)

## Bugs (91 distinct)

1. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 32/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 32
   - JS heap 105 → 892 MB · DOM nodes 87630 → 199781 · listeners 4180 → 9776 over 1611 s

2. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 35/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 223
   - 12 presses, night flip S.nfX open @ năm 3 th1 t2 b3 (buổi #329)

3. **stuck** — no ending within the wall cap (1800 s)
   - lives 13/48 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-4, thd-thd_tho-skilled-5, thd-thd_tho-greedy-1 …) · hits 13
   - state {"year":16,"rank":5,"age":34,"dead":false}

4. **stuck** — life stuck (inpage6 TIMEOUT: no progress in one buổi)
   - lives 10/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-random-1, thd-thd_tho-random-3 …) · hits 10
   - {"used":2,"Q":0,"mg":false,"buoi":0,"place":"lc","out":1,"modalHidden":true,"ov":"","logs":["T7/14 thượng tuầnHoàng thượng không vừa mắt: Xin lỗi (“Trẫm chỉ nhìn, không nói) — Ta cúi đầu nhận lỗi; Hoàng thượng nguôi giận phần nào.","T7/14 thượng tuầnHọc với thầy Thi. Tiến bộ +1.","T7/14 thượng tuầnT

5. **js** — console.error: econ card TypeError: Cannot read properties of null (reading 'queen')
   - lives 3/48 (thd-thd_tho-skilled-3, thd-thd_tho-cautious-4, thd-thd_tho-lover-3) · hits 3
   - 

6. **js** — [fold real page] Cannot read properties of undefined (reading 'replace') at renderHud2 (http://127.0.0.1:45587/index.html:2735:356)
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 4
   - 

7. **js** — [fold real page] console.error: TypeError: Cannot read properties of undefined (reading 'sl')
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 4
   - 

8. **js** — [ipad real page] Cannot read properties of undefined (reading 'replace') at renderHud2 (http://127.0.0.1:45587/index.html:2735:356)
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 48
   - 

9. **js** — [fold real page] kitImgErr is not defined at HTMLImageElement.onerror (http://127.0.0.1:45587/index.html:1:1)
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 14
   - 

10. **js** — [fold real page] Cannot read properties of undefined (reading 'sl') at http://127.0.0.1:45587/index.html:1761:47
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - 

11. **save** — save→load→save changes the state
   - lives 48/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 11482
   - save.S.visit.tk: {} → undefined @ năm 1 th3 t0 b2 (buổi #2)

12. **number** — stat out of range: danh
   - lives 16/48 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4, thd-thd_tho-skilled-5 …) · hits 41
   - danh=101 thd

13. **number** — stat out of range: tai
   - lives 15/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-greedy-3 …) · hits 30
   - tai=101 thd

14. **number** — stat out of range: sac
   - lives 12/48 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4, thd-thd_tho-greedy-2 …) · hits 28
   - sac=101 thd

15. **number** — stat out of range: duc
   - lives 7/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-5, thd-thd_tho-lover-3 …) · hits 14
   - duc=101 thd

16. **number** — option text «Sức +6» but the effect applies suc=-2
   - lives 3/48 (thd-thd_tho-skilled-5, thd-thd_tho-scholar-2, thd-thd_tho-scholar-3) · hits 3
   - «Thay hết nước, đồ ăn | Sức +6 · kèm: không biết nguyên do» in «Chuyện lạ cần tra» fx={"bac":-5,"suc":-2} @ năm 13 th6 t0 b1 (buổi #2173)

17. **lag** — [fold] tab switch freezes over 400 ms
   - lives 48/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 903
   - 1553 ms longest · 2 long tasks @ năm 1 th3 t0 b2 (buổi #2)

18. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 23/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 1220
   - 1535 ms @ năm 7 th10 t1 b0 (buổi #1154) @ năm 7 th10 t1 b0 (buổi #1154)

19. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × span.mmeta
   - lives 40/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 710
   - 3 bóng · × 5 bóng · @ năm 1 th3 t0 b2 (buổi #2)

20. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em
   - lives 40/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 717
   - 3 bóng · × đang cấm túc (1 tháng) @ năm 1 th3 t0 b2 (buổi #2)

21. **ui-text-overlap** — [ipad] tab go: text over text: em × span.mmeta
   - lives 40/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 707
   - đang cấm túc (1 tháng) × 5 bóng · @ năm 1 th3 t0 b2 (buổi #2)

22. **ui-text-overlap** — [ipad] tab go: text over text: em × em
   - lives 40/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-4 …) · hits 709
   - đang cấm túc (1 tháng) × đang cấm túc (1 tháng) @ năm 1 th3 t0 b2 (buổi #2)

23. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × em.ok
   - lives 15/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-1, thd-thd_tho-greedy-2 …) · hits 55
   - 2 bóng · × còn 4 khắc @ năm 11 th2 t2 b1 (buổi #1749)

24. **ui-text-overlap** — [fold] tab go: text over text: em × em.ok
   - lives 13/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-3, thd-thd_tho-greedy-1, thd-thd_tho-greedy-5 …) · hits 32
   - đang cấm túc (1 tháng) × còn 4 khắc @ năm 11 th2 t2 b1 (buổi #1749)

25. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × span.mmeta
   - lives 12/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-5, thd-thd_tho-greedy-2 …) · hits 32
   - còn 4 khắc × 3 bóng · @ năm 3 th12 t2 b3 (buổi #489)

26. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em
   - lives 12/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-skilled-5 …) · hits 30
   - còn 4 khắc × đang cấm túc (1 tháng) @ năm 3 th12 t2 b3 (buổi #489)

27. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 10/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-skilled-5, thd-thd_tho-cautious-1 …) · hits 18
   - Chung TúTa + 8 bóng · còn 4 khắc @ năm 3 th12 t2 b3 (buổi #489)

28. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 10/48 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-random-5, thd-thd_tho-greedy-2 …) · hits 24
   - Trường Môn viện14 bóng · 1 khắ × Hàm An2 bóng · 2 khắc @ năm 11 th12 t2 b2 (buổi #1870)

29. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × button.kfoc-next
   - lives 9/48 (thd-thd_tho-skilled-1, thd-thd_tho-skilled-2, thd-thd_tho-greedy-5, thd-thd_tho-cautious-3 …) · hits 10
   - Còn 1 phi tần ta chưa quen biế × Tiếp ▸ @ năm 10 th4 t1 b2 (buổi #1595)

30. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 9/48 (thd-thd_tho-skilled-2, thd-thd_tho-skilled-3, thd-thd_tho-greedy-2, thd-thd_tho-greedy-5 …) · hits 16
   - Trường Môn viện14 bóng · 1 khắc @ năm 11 th12 t2 b2 (buổi #1870)

31. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em.ok
   - lives 7/48 (thd-thd_tho-greedy-2, thd-thd_tho-greedy-5, thd-thd_tho-scholar-2, thd-thd_tho-scholar-3 …) · hits 11
   - 2 khắc × 2 khắc @ năm 2 th11 t2 b3 (buổi #306)

32. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 6/48 (thd-thd_tho-skilled-3, thd-thd_tho-greedy-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3 …) · hits 13
   - Đức Thọ cung2 bóng · 2 khắc × Vĩnh Thọ2 khắc · bị giật y phụ @ năm 10 th1 t2 b2 (buổi #1572)

33. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mlab
   - lives 6/48 (thd-thd_tho-schemer-3, thd-thd_tho-lover-1, thd-thd_tho-lover-5, thd-thd_tho-scholar-3 …) · hits 16
   - Trường Môn viện × Hàm An @ năm 2 th2 t0 b2 (buổi #155)

34. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mmeta
   - lives 5/48 (thd-thd_tho-cautious-1, thd-thd_tho-schemer-3, thd-thd_tho-scholar-3, thd-thd_tho-lazy-1 …) · hits 7
   - Trường Môn viện × 4 bóng · @ năm 14 th10 t1 b1 (buổi #2351)

35. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × p
   - lives 4/48 (thd-thd_tho-greedy-5, thd-thd_tho-lover-1, thd-thd_tho-scholar-1, thd-thd_tho-scholar-2) · hits 4
   - Còn 1 phi tần ta chưa quen biế × buông một câu ngọt như mật mà  @ năm 11 th1 t2 b2 (buổi #1708)

36. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × em
   - lives 4/48 (thd-thd_tho-cautious-1, thd-thd_tho-schemer-3, thd-thd_tho-lazy-1, thd-thd_tho-speed-2) · hits 5
   - Trường Môn viện × đang ở lãnh cung @ năm 14 th10 t1 b1 (buổi #2351)

37. **ui-text-overlap** — [fold] tab act: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 18
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

38. **ui-text-overlap** — [fold] tab kid: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 18
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

39. **ui-text-overlap** — [fold] tab inv: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 18
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

40. **ui-text-overlap** — [fold] tab art: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 18
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

41. **ui-text-overlap** — [fold] tab story: text over text: div.kbk-rh × div.kbk-rh
   - lives 4/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 18
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

42. **ui-text-overlap** — [fold] tab act: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

43. **ui-text-overlap** — [fold] tab act: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

44. **ui-text-overlap** — [fold] tab go: text over text: div.kbk-rh × div.kbk-rh
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-scholar-3, thd-thd_tho-speed-4) · hits 15
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

45. **ui-text-overlap** — [fold] tab court: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

46. **ui-text-overlap** — [fold] tab court: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

47. **ui-text-overlap** — [fold] tab court: text over text: div.kbk-rh × div.kbk-rh
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 9
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

48. **ui-text-overlap** — [fold] tab rel: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

49. **ui-text-overlap** — [fold] tab rel: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

50. **ui-text-overlap** — [fold] tab rel: text over text: div.kbk-rh × div.kbk-rh
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 9
   - Tuần lục · Tháng ba, năm thứ n × Tuần lục · Tháng ba, năm thứ n @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

51. **ui-text-overlap** — [fold] tab kid: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

52. **ui-text-overlap** — [fold] tab kid: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

53. **ui-text-overlap** — [fold] tab inv: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

54. **ui-text-overlap** — [fold] tab inv: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

55. **ui-text-overlap** — [fold] tab art: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

56. **ui-text-overlap** — [fold] tab art: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

57. **ui-text-overlap** — [fold] tab story: text over text: span × small.kbk-ts
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

58. **ui-text-overlap** — [fold] tab story: text over text: span.kbk-ls × span.ef.n
   - lives 3/48 (thd-thd_tho-schemer-5, thd-thd_tho-schemer-4, thd-thd_tho-speed-4) · hits 3
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

59. **ui-text-overlap** — [fold] tab go: text over text: span × small.kbk-ts
   - lives 2/48 (thd-thd_tho-schemer-5, thd-thd_tho-speed-4) · hits 2
   - Tuần × Những điều chính của tuần qua @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

60. **ui-text-overlap** — [fold] tab go: text over text: span.kbk-ls × span.ef.n
   - lives 2/48 (thd-thd_tho-schemer-5, thd-thd_tho-speed-4) · hits 2
   - Tháng ba, năm thứ nhất, trung  × Xuân · trời quang @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

61. **ui-text-overlap** — [fold] tab act: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

62. **ui-text-overlap** — [fold] tab court: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

63. **ui-text-overlap** — [fold] tab rel: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

64. **ui-text-overlap** — [fold] tab kid: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

65. **ui-text-overlap** — [fold] tab inv: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

66. **ui-text-overlap** — [fold] tab art: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

67. **ui-text-overlap** — [fold] tab story: text over text: span.kbk-ls × span.krl
   - lives 1/48 (thd-thd_tho-schemer-4) · hits 1
   - Tháng mười một, năm thứ tư, hạ × Tiết @ năm 4 th11 t1 b3 (buổi #627)

68. **ui-text-overlap** — [fold] tab act (opened a card): text over text: div.kbk-rh × div.kbk-rh
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 9
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)

69. **ui-text-overlap** — [fold] tab rv: text over text: div.kbk-rh × div.kbk-rh
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 9
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)

70. **ui-text-overlap** — [fold] tab staff: text over text: div.kbk-rh × div.kbk-rh
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 9
   - Sổ tuần · Tháng mười, năm thứ  × Sổ tuần · Tháng mười, năm thứ  @ năm 12 th10 t1 b3 (buổi #2050)

71. **ui-covered-btn** — [fold] tab go: button covered: button.mspot under div.mspot.off
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Ngự hoa viên2 khắc @ năm 13 th9 t2 b3 (buổi #2216)

72. **ui-covered-btn** — [fold] tab go: button covered: button.mspot under div.mspot.sm
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Kính sự phòng1 bóng · 1 khắc @ năm 13 th9 t2 b3 (buổi #2216)

73. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Thái y viện1 bóng · 2 khắc × Kính sự phòng1 bóng · 1 khắc @ năm 13 th9 t2 b3 (buổi #2216)

74. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × button.acb
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Ngự hoa viên × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)

75. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × b
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Ngự hoa viên × Chắc @ năm 13 th9 t2 b3 (buổi #2216)

76. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × span.mwhy
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Ngự hoa viên × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)

77. **ui-text-overlap** — [fold] tab go: text over text: em.ok × button.acb
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 2
   - 2 khắc × Lẻn vào @ năm 13 th9 t2 b3 (buổi #2216)

78. **ui-text-overlap** — [fold] tab go: text over text: span.mwhy × span.mlab
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - tẩm điện Hoàng thượng: chỉ vào × Cần Chính điện @ năm 13 th9 t2 b3 (buổi #2216)

79. **ui-text-overlap** — [fold] tab go: text over text: button.acb × span.mwhy
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Xin yết kiến × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)

80. **ui-text-overlap** — [fold] tab go: text over text: button.acb × button.acb
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 2
   - Xin yết kiến × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)

81. **ui-text-overlap** — [fold] tab go: text over text: button.acb × i
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Xin yết kiến × ngài vắng @ năm 13 th9 t2 b3 (buổi #2216)

82. **ui-text-overlap** — [fold] tab go: text over text: b × span.mwhy
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Chắc × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)

83. **ui-text-overlap** — [fold] tab go: text over text: b × button.acb
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 2
   - Chắc × Xin yết kiến @ năm 13 th9 t2 b3 (buổi #2216)

84. **ui-text-overlap** — [fold] tab go: text over text: b × i
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Chắc × ngài vắng @ năm 13 th9 t2 b3 (buổi #2216)

85. **ui-text-overlap** — [fold] tab go: text over text: i × span.mwhy
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - 3 khắc × nơi Hoàng thượng phê tấu: chỉ  @ năm 13 th9 t2 b3 (buổi #2216)

86. **ui-text-overlap** — [fold] tab go: text over text: button.acb × b
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Lẻn vào × Năm ăn năm thua @ năm 13 th9 t2 b3 (buổi #2216)

87. **ui-text-overlap** — [fold] tab go: text over text: b × b
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 1
   - Khó × Năm ăn năm thua @ năm 13 th9 t2 b3 (buổi #2216)

88. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × span.mlab
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 7
   - 1 bóng · × Cảnh Phúc @ năm 13 th9 t2 b3 (buổi #2216)

89. **ui-text-overlap** — [fold] tab go: text over text: em.ok × span.mlab
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 4
   - 1 khắc × Cảnh Phúc @ năm 13 th9 t2 b3 (buổi #2216)

90. **ui-text-overlap** — [fold] tab go: text over text: span.mlab × em.ok
   - lives 1/48 (thd-thd_tho-scholar-3) · hits 2
   - Diên Huy × 2 khắc @ năm 13 th9 t2 b3 (buổi #2216)

91. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.off × button.mspot.sm
   - lives 1/48 (thd-thd_tho-lazy-4) · hits 1
   - Càn Ninh cungTa + 8 bóng · còn × Vĩnh Hòa2 khắc · bị giật y phụ @ năm 13 th10 t1 b3 (buổi #2162)

## Lives

| life | ending | max rank | years | buổi | bugs | s |
|---|---|---|---|---|---|---|
| thd-thd_tho-skilled-1 | TIMEOUT [no ending] | 7 | ? | 2361 | 24 | 1617 |
| thd-thd_tho-skilled-2 | CAP [no ending] | 6 | ? | 2693 | 24 | 1831 |
| thd-thd_tho-skilled-3 | TIMEOUT [no ending] | 7 | ? | 2410 | 27 | 1574 |
| thd-thd_tho-skilled-4 | CAP [no ending] | 6 | ? | 2712 | 13 | 1828 |
| thd-thd_tho-random-1 | TIMEOUT [no ending] | 0 | ? | 32 | 3 | 51 |
| thd-thd_tho-random-2 | Xuất gia [thường] | Đáp ứng | 0.92 | 182 | 3 | 90 |
| thd-thd_tho-random-3 | TIMEOUT [no ending] | 0 | ? | 19 | 4 | 65 |
| thd-thd_tho-random-4 | TIMEOUT [no ending] | 0 | ? | 128 | 4 | 84 |
| thd-thd_tho-random-5 | TIMEOUT [no ending] | 0 | ? | 35 | 5 | 50 |
| thd-thd_tho-skilled-5 | CAP [no ending] | 4 | ? | 2550 | 20 | 1808 |
| thd-thd_tho-greedy-1 | CAP [no ending] | 4 | ? | 2664 | 14 | 1812 |
| thd-thd_tho-greedy-2 | Hồng nhan bạc mệnh [death] | Quý phi | 8.17 | 1491 | 17 | 836 |
| thd-thd_tho-greedy-4 | Hồng nhan bạc mệnh [death] | Quý phi | 9.67 | 1689 | 14 | 930 |
| thd-thd_tho-greedy-3 | Hồng nhan bạc mệnh [death] | Hoàng quý phi | 10.08 | 1789 | 11 | 1013 |
| thd-thd_tho-greedy-5 | CAP [no ending] | 6 | ? | 2675 | 33 | 1807 |
| thd-thd_tho-cautious-2 | Hồng nhan bạc mệnh [death] | Thường tại | 0.92 | 161 | 9 | 126 |
| thd-thd_tho-cautious-1 | CAP [no ending] | 7 | ? | 2669 | 17 | 1884 |
| thd-thd_tho-cautious-4 | Hồng nhan bạc mệnh [death] | Quý phi | 9.5 | 1643 | 13 | 1287 |
| thd-thd_tho-cautious-3 | CAP [no ending] | 7 | ? | 2701 | 22 | 1881 |
| thd-thd_tho-schemer-1 | Hồng nhan bạc mệnh [death] | Đáp ứng | 4.17 | 741 | 9 | 365 |
| thd-thd_tho-schemer-2 | Hồng nhan bạc mệnh [death] | Thường tại | 1.25 | 211 | 7 | 130 |
| thd-thd_tho-schemer-3 | Hồng nhan bạc mệnh [death] | Đáp ứng | 1 | 218 | 11 | 121 |
| thd-thd_tho-cautious-5 | CAP [no ending] | 7 | ? | 2703 | 25 | 1835 |
| thd-thd_tho-schemer-5 | Hồng nhan bạc mệnh [death] | Thường tại | 3.08 | 560 | 33 | 272 |
| thd-thd_tho-schemer-4 | Hồng nhan bạc mệnh [death] | Thường tại | 11.08 | 1945 | 43 | 1675 |
| thd-thd_tho-lover-2 | Xuất gia [thường] | Tần | 5.17 | 923 | 9 | 468 |
| thd-thd_tho-lover-1 | CAP [no ending] | 6 | ? | 2470 | 24 | 1835 |
| thd-thd_tho-lover-3 | Tư thông bị phát giác [death] | Phi | 12.58 | 2212 | 18 | 1504 |
| thd-thd_tho-lover-4 | CAP [no ending] | 4 | ? | 2564 | 18 | 1815 |
| thd-thd_tho-lover-5 | Hồng nhan bạc mệnh [death] | Quý phi | 10.08 | 1754 | 18 | 1198 |
| thd-thd_tho-scholar-1 | Thái phi [death] | Hoàng quý phi | 7.5 | 1325 | 16 | 906 |
| thd-thd_tho-scholar-2 | CAP [no ending] | 7 | ? | 2539 | 25 | 1811 |
| thd-thd_tho-scholar-3 | CAP [no ending] | 7 | ? | 2604 | 63 | 1821 |
| thd-thd_tho-rebel-1 | Hồng nhan bạc mệnh [death] | Tần | 1.58 | 288 | 8 | 165 |
| thd-thd_tho-rebel-2 | Hồng nhan bạc mệnh [death] | Phi | 2.67 | 472 | 11 | 246 |
| thd-thd_tho-rebel-3 | Hồng nhan bạc mệnh [death] | Quý nhân | 1.33 | 254 | 7 | 140 |
| thd-thd_tho-rebel-4 | Hồng nhan bạc mệnh [death] | Tần | 4.58 | 797 | 11 | 415 |
| thd-thd_tho-rebel-5 | Hồng nhan bạc mệnh [death] | Quý phi | 10.17 | 1804 | 20 | 979 |
| thd-thd_tho-lazy-1 | Đại kết cục · Thơ theo gió đi [đại kết cục] | Quý nhân | 13.08 | 2256 | 18 | 1065 |
| thd-thd_tho-lazy-2 | Hồng nhan bạc mệnh [death] | Quý phi | 7.75 | 1353 | 16 | 528 |
| thd-thd_tho-lazy-3 | TIMEOUT [no ending] | 6 | ? | 739 | 10 | 294 |
| thd-thd_tho-lazy-5 | Hồng nhan bạc mệnh [death] | Quý nhân | 5.83 | 1043 | 9 | 403 |
| thd-thd_tho-lazy-4 | CAP [no ending] | 7 | ? | 3124 | 25 | 1892 |
| thd-thd_tho-speed-1 | Xuất gia [thường] | Đáp ứng | 0.42 | 74 | 7 | 66 |
| thd-thd_tho-speed-2 | Xuất gia [thường] | Đáp ứng | 1.17 | 197 | 10 | 128 |
| thd-thd_tho-speed-3 | TIMEOUT [no ending] | 0 | ? | 29 | 4 | 88 |
| thd-thd_tho-speed-4 | TIMEOUT [no ending] | 0 | ? | 12 | 28 | 54 |
| thd-thd_tho-speed-5 | TIMEOUT [no ending] | 0 | ? | 5 | 4 | 98 |
