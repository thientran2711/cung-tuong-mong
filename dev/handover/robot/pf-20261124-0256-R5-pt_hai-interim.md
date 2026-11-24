# ROBOT-10 interim pf · pt_hai (R5) · 36 lives done (partial, run still going)

## Bugs (46 distinct)

1. **save** — save→load→save changes the state
   - lives 36/36 · hits 9608
   - save.S.visit.tk: {} → undefined @ năm 1 th3 t0 b2 (buổi #2)

2. **lag** — [fold] tab switch freezes over 400 ms
   - lives 35/36 · hits 319
   - 454 ms longest · 1 long tasks @ năm 1 th3 t0 b2 (buổi #2)

3. **lag** — [ipad] tab switch freezes over 400 ms
   - lives 33/36 · hits 350
   - 3665 ms longest · 3 long tasks @ năm 1 th3 t0 b2 (buổi #2)

4. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × span.mmeta
   - lives 32/36 · hits 487
   - 1 bóng · × 8 bóng · @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

5. **ui-text-overlap** — [ipad] tab go: text over text: em × span.mmeta
   - lives 32/36 · hits 483
   - đang cấm túc (3 tháng) × 8 bóng · @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

6. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em
   - lives 31/36 · hits 490
   - 1 bóng · × đang cấm túc (3 tháng) @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

7. **ui-text-overlap** — [ipad] tab go: text over text: em × em
   - lives 31/36 · hits 483
   - đang cấm túc (3 tháng) × đang cấm túc (3 tháng) @ năm 1 th3 t0 b3 (buổi #4) (night flip pending)

8. **stuck** — [fold] after loading her save, «Sang ngày mới» does not move the clock (soft-lock after load)
   - lives 30/36 · hits 163
   - 12 presses, night flip S.nfX open @ năm 3 th1 t1 b3 (buổi #320)

9. **mem** — bot page (game, render off) memory keeps growing over the life (leak)
   - lives 26/36 · hits 26
   - JS heap 98 → 991 MB · DOM nodes 2023 → 189001 · listeners 826 → 8343 over 1829 s

10. **lag** — one buổi change took over 1.5 s (bot page, render off)
   - lives 16/36 · hits 918
   - 1841 ms @ năm 9 th4 t1 b0 (buổi #1401) @ năm 9 th4 t1 b0 (buổi #1401)

11. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × em.ok
   - lives 15/36 · hits 25
   - 3 bóng · × còn 4 khắc @ năm 6 th8 t1 b3 (buổi #940)

12. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × span.mmeta
   - lives 15/36 · hits 44
   - 2 bóng · × 3 bóng · @ năm 8 th6 t2 b1 (buổi #1260)

13. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × em
   - lives 15/36 · hits 43
   - 2 bóng · × đang cấm túc (2 tháng) @ năm 8 th6 t2 b1 (buổi #1260)

14. **ui-text-overlap** — [fold] tab go: text over text: em × span.mmeta
   - lives 14/36 · hits 34
   - đang cấm túc (2 tháng) × 3 bóng · @ năm 8 th6 t2 b1 (buổi #1260)

15. **ui-text-overlap** — [fold] tab go: text over text: em × em
   - lives 14/36 · hits 33
   - đang cấm túc (2 tháng) × đang cấm túc (2 tháng) @ năm 8 th6 t2 b1 (buổi #1260)

16. **ui-text-overlap** — [ipad] tab go: text over text: em × em.ok
   - lives 13/36 · hits 21
   - đang cấm túc (3 tháng) × còn 4 khắc @ năm 6 th8 t1 b3 (buổi #940)

17. **number** — stat out of range: danh
   - lives 12/36 · hits 37
   - danh=101 pf

18. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under div.mspot.sm
   - lives 11/36 · hits 14
   - Chung TúTa + 5 bóng · còn 4 khắc @ năm 11 th2 t1 b3 (buổi #1719)

19. **number** — option text «Sủng +2» but the effect applies sung=-1
   - lives 10/36 · hits 10
   - «Mang mảnh áo lên Hoàng thượng | Sủng +2 · Danh +1 · ngài thấy người Phù Tang bị bắt thật · kèm: ngài muốn đánh – có thể hại con tin» in «Chính tuyến · Người con gái bên kia bể · Chương 8 · Hồi 1/5» fx={"sung":-1} @ năm 5 th11 t0 b1 (buổi #800)

20. **stuck** — no ending within the wall cap (1800 s)
   - lives 10/36 · hits 10
   - state {"year":15,"rank":6,"age":34,"dead":false}

21. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × button.kfoc-next
   - lives 9/36 · hits 10
   - Còn 1 phi tần ta chưa quen biế × Tiếp ▸ @ năm 8 th5 t0 b2 (buổi #1233)

22. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × span.mmeta
   - lives 9/36 · hits 16
   - còn 4 khắc × 6 bóng · @ năm 11 th2 t1 b3 (buổi #1719)

23. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mlab
   - lives 9/36 · hits 12
   - Trường Môn viện × Hàm An @ năm 5 th8 t0 b3 (buổi #775)

24. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em
   - lives 8/36 · hits 13
   - còn 4 khắc × đang cấm túc (1 tháng) @ năm 11 th2 t1 b3 (buổi #1719)

25. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × span.mmeta
   - lives 8/36 · hits 9
   - Trường Môn viện × 8 bóng · @ năm 13 th8 t0 b3 (buổi #2203)

26. **ui-text-overlap** — [ipad] tab go: text over text: span.mlab × em
   - lives 8/36 · hits 10
   - Trường Môn viện × đang ở lãnh cung @ năm 13 th8 t0 b3 (buổi #2203)

27. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 6/36 · hits 8
   - Hàm An2 bóng · 2 khắc × Trường XuânTa + 8 bóng · còn 4 @ năm 7 th7 t2 b2 (buổi #1102)

28. **number** — option text «Sủng +3» but the effect applies sung=-1
   - lives 6/36 · hits 6
   - «Mang mảnh áo lên Hoàng thượng | Sủng +3 · Danh +1 · ngài thấy người Phù Tang bị bắt thật · kèm: ngài muốn đánh – có thể hại con tin» in «Chính tuyến · Người con gái bên kia bể · Chương 8 · Hồi 1/5» fx={"sung":-1} @ năm 5 th12 t0 b2 (buổi #811)

29. **number** — stat out of range: duc
   - lives 6/36 · hits 13
   - duc=101 pf

30. **ui-covered-btn** — [ipad] tab go: button covered: button.mspot.sm under button.mspot.sm
   - lives 5/36 · hits 7
   - Hàm An2 bóng · 2 khắc @ năm 7 th7 t2 b2 (buổi #1102)

31. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.sm × button.mspot.sm
   - lives 4/36 · hits 4
   - Trường Môn viện3 bóng · 1 khắc × A ca sở2 bóng · 1 khắc @ năm 9 th5 t1 b1 (buổi #1418)

32. **number** — stat out of range: sac
   - lives 4/36 · hits 8
   - sac=101 pf

33. **number** — option text «Sức +6» but the effect applies suc=-2
   - lives 4/36 · hits 4
   - «Thay hết nước, đồ ăn | Sức +6 · kèm: không biết nguyên do» in «Chuyện lạ cần tra» fx={"bac":-5,"suc":-2} @ năm 8 th6 t0 b2 (buổi #1279)

34. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 3/36 · hits 3
   - Thái y viện3 bóng · 2 khắc × Ngự thiện phòng1 bóng · 2 khắc @ năm 9 th5 t1 b1 (buổi #1418)

35. **ui-text-overlap** — [ipad] tab go: text over text: em.ok × em.ok
   - lives 3/36 · hits 3
   - 1 khắc × 2 khắc @ năm 5 th9 t1 b3 (buổi #792)

36. **number** — stat out of range: tai
   - lives 3/36 · hits 6
   - tai=101 pf

37. **stuck** — life stuck (inpage6 TIMEOUT: no progress in one buổi)
   - lives 2/36 · hits 2
   - {"used":2,"Q":402,"mg":false,"buoi":0,"place":"home","q0":{"t":"Bỏ cuộc?","opts":[]},"modalHidden":false,"ov":"MƯUTung tin đồn: Truyền lời✕Cách chơiChạm từng người một, từ «Ngươi» tới «Cung nàng». Mỗi chặng có một tới ba chấm tin cậy: ít chấm thì dễ bị lần ra. Chạm lại người cuối để lùi.Phần0/10Hồi–

38. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot × button.mspot.sm
   - lives 2/36 · hits 2
   - Đức Thọ cung3 bóng · 2 khắc × Tân Giả khố6 bóng · 2 khắc @ năm 9 th2 t1 b2 (buổi #1399)

39. **ui-text-overlap** — [fold] tab rel: text over text: #panel > p.past × p
   - lives 2/36 · hits 2
   - Còn 1 phi tần ta chưa quen biế × Ở Khải Tường cung · Sùng Đức đ @ năm 7 th6 t2 b1 (buổi #1087)

40. **ui-text-overlap** — [fold] tab go: text over text: span.mmeta × em.ok
   - lives 1/36 · hits 1
   - 4 bóng · × còn 4 khắc @ năm 8 th6 t2 b1 (buổi #1260)

41. **ui-text-overlap** — [fold] tab go: text over text: em × em.ok
   - lives 1/36 · hits 1
   - đang cấm túc (2 tháng) × còn 4 khắc @ năm 8 th6 t2 b1 (buổi #1260)

42. **ui-overlap** — [ipad] tab go: buttons overlap: button.mspot.off × button.mspot.sm
   - lives 1/36 · hits 1
   - Cần Chính điệnChỉ có ta · còn  × Cảnh Phúc2 khắc · bị giật y ph @ năm 3 th10 t2 b3 (buổi #455)

43. **ui-text-overlap** — [ipad] tab go: text over text: span.mmeta × span.mlab
   - lives 1/36 · hits 1
   - 1 bóng · × Hàm An @ năm 5 th8 t0 b3 (buổi #775)

44. **ui-text-overlap** — [ipad] tab go: text over text: em × span.mlab
   - lives 1/36 · hits 1
   - đang ở lãnh cung × Hàm An @ năm 5 th8 t0 b3 (buổi #775)

45. **ui-overlap** — [fold] tab go: buttons overlap: button.mspot.kmnw × button.mspot.sm
   - lives 1/36 · hits 1
   - Đức Thọ cung3 bóng · 2 khắc ·  × Tân Giả khố4 bóng · 2 khắc · b @ năm 9 th2 t1 b2 (buổi #1399)

46. **ui-text-overlap** — [ipad] tab kid: text over text: em.pcs × span.kstv
   - lives 1/36 · hits 3
   - Đã mất × Nhiều chuyện @ năm 15 th2 t2 b2 (buổi #2416)

