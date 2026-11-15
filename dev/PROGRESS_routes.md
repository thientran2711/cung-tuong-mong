# PROGRESS — review/routes (Lối riêng, jroute.js)

Base: origin/review/book-release + origin/review/men + origin/review/outside (merged; conflicts only assemble list / LOG / sw.js).
Plan: dev/STORY_ROUTES_PLAN.md. Module: dev/build/jroute.js (after jmen, before j84). Fix in jmen: "buổi tối" = B4L (4 buổi).

## Done
- Four routes as kit act cards in Hành sự, category «Lối riêng» (KIT_CAT loi-rieng, k3CatTabs): tư tình (real man in S.men, spot by
  S.menW / buổi, watcher, heat «Lời ra tiếng vào», witnesses = consorts at the spot, blackmail / report / exposure, night → pregnancy with
  k.tf on the child, promise → escape), trốn cung (7 prep steps + 5 methods, final odds from preps − heat − watch − Đức + difficulty),
  rời cung hợp lệ (xuất gia, nhờ Thái hậu, ban hôn Vương gia, về quê, phế làm thứ dân), ẩn dật (no tablet, less danger, 3 years → ending).
- Trích huyết nghiệm thân (owner 15/11): accuser (Hoàng thượng / Thái hậu / phi tần), prep cards (mua chuộc thái y, đổi bát, bỏ phèn, dò bát),
  ceremony (bằng lòng / tố ngược / nhận tội → nghiệm lại / kêu oan), outcomes vindicated / exposed / framed; NPC mothers same rule;
  she can demand a test on an NPC child (honest or oil frame). Tampering = mini-game on the shared j82 frame (gaze cones, «Ra tay», 3 hồi);
  bowl scene (two drops merge / part), reduced motion = final frame. Bowl/drops/cones are live canvas marks over the painted mg-huong-bg board.
- Dialogs = PEND (save/load safe) with showOut (full Cần/Tốn/Được/Mất + odds) — owner rule for route choices.
- Endings ledger localStorage "ctm-routes" → Sổ luân hồi «Lối riêng x/y»; Mệnh truyện section «Lối riêng» (steps ✓/✗, heat, blackmail, secret child).
- PD_END for the new living endings. NPC: escape plans (v.rtEsc), encounter at night (Báo / Giúp / Uy hiếp / Làm ngơ), xuất gia, blood test.
- Balance bots (window.__bot without __rtPol) never see route cards; dev/measure/routes.js is the route-seeking bot.
- Tests: dev/test/routes.js (Fold 686x880@2.2 + iPad 1180x820@2, reducedMotion), dev/test/outside/oldsave.js — 0 errors, 0 overflow, old save loads.

## Open / ideas
- Painted bowl sprite (mg-nghiem-bowl) + a dedicated board would replace the canvas bowl — needs owner OK for new Magnific art.
- Route art uses existing event pictures as placeholders (ev-tu-tinh, ev-mat-uoc, ev-cung-nu, ev-hoi-lo, ev-thu-nha, ev-hoa-hoan, act-xuat-gia…).

## Phiên 15/11 (tiếp) — xong, SẴN SÀNG KIỂM
- Gộp origin/review/book-release @4bbed569 (hộp thoại chỉ cuộn lựa chọn KIT 32.5, người đứng trên tranh KIT 32.6, sân khấu 3/2 người) — không xung đột.
- Bot: rtCards mở cho bot chỉ khi `window.__rtGo` (bật trong lúc chính sách tìm lối chọn thẻ, có chặn gọi lồng) → bot cân bằng không bao giờ bấm thẻ Lối riêng.
- Chỉnh: trốn cung gốc 12/16/10/22/8, trần 45, hỏa hoạn 1,2 %/tháng (chuyện thật của cả cung, không còn chỉ xảy ra khi nàng đang tính trốn);
  xuất gia cần 2 năm trong cung + Thái hậu 40, cơ may −12 + Thái hậu/3 + (Đức−50)/3 − Sủng/3 (+8 khi Thái hậu nói giúp), bị bác đợi một năm;
  phi tần trốn cùng cơ may như nàng (22 + 11 khi được nàng giúp, mỗi tháng 40 % là đêm thử sau 3 tháng chuẩn bị; hỏng là bị bắt).
- «Một đời giấu kín» ghi cả khi nàng có con riêng mà chưa từng mở lối (S.rt chưa có).
- dev/measure/routes_reach.js: chơi thẻ/hộp thoại thật theo thứ tự cho 15 kết cục → 15/15.
- Ảnh dev/shots/routes2 (755x1000@2, 1180x820@2, reducedMotion): 0 lỗi trang, 0 tràn ngang, 0 chữ bị cắt. Sổ cũ (dev/test/outside/oldsave.js) nạp được, 0 lỗi.
- Số đo: xem dev/STORY_ROUTES_PLAN.md «Kết quả đo 15/11».
- Mục 11 «mật ước sinh con khi Hoàng thượng vô sinh»: sếp bỏ (02:15Z) — đã gỡ sạch, không còn gì trong code.

## TẠM DỪNG (coordinator: đĩa đầy) — chỗ nối tiếp
- Đã gộp origin/main b165b1f7 (merge, không rebase để khỏi force-push): jmen lấy bản main + buổi tối theo B4L; assemble thêm jinv/jcoop*/jload.
- Sau gộp: routes_reach 15/15, dev/test/routes.js (đã bỏ qua vòng Luân hồi #kroul) 755x1000@2 + 1180x820@2: 0 lỗi, 0 tràn, 0 chữ cắt; sổ cũ OK.
- CHƯA XONG: đo cân bằng lại SAU khi gộp main (lần đo trước gộp: n=30 HH 33 %, chết sớm 23 % — bằng mức gốc của game theo PROGRESS_balance;
  lần đo sau gộp mới được n=7, HH 29 %, chết sớm 43 % — quá ít để kết luận). Chạy lại: tạo zz-test.html (dev/index.html + meta charset),
  `GAME=$PWD/zz-test.html INP=inpage6.js INP2=inx.js HHSTOP=1 XJS='<xoay 9 thân phận>' node dev/measure/runb.js sens 12 out.json` ×3, `python3 dev/measure/anx.py`.
- Bot ẩn dật (dev/measure/routes.js ad): bản mới (hại người → ở yên, vẫn tốn thời gian) chưa đo xong; bản trước cho thấy bot thường hại người nên chưa có kết an nhiên.

## Còn mở (hỏi sếp, không tự làm)
- Bát nước vẽ tay (mg-nghiem-bowl) thay bát vẽ bằng canvas — cần sếp cho vẽ.
- Dấu khung trò nghiệm thân đang là «TÀI NGHỆ»; có thể đổi sang dấu «MƯU» khi review/scheme-games gộp.

## (cũ) Where I stopped (handover 15/11) — đã xử lý ở trên
Last measure (dev/measure/routes.js, 80000 bot iterations each, build with escape bases 20/24/20/30/18, prep +8/+6/+5/+4, heat/2.5, cap 60):
- tc careful: 21 lives, 24 escape attempts → 10 out (42 % per attempt, ~48 % of lives), 11 caught. STILL TOO EASY vs target 10–25 %.
- tc careless (arg 0): 22 lives, 41 attempts → 8 out, 33 caught (~36 % of lives).
- hl: 27 lives, Dâng biểu xuất gia 55 tries → 19 granted (too easy: 70 % of lives). Ban hôn 1 try, về quê 0, phế 1.
- tt / ad runs were killed before finishing (no numbers yet).
- Bot caveat: while window.__rtPol is set the inpage6 sensible bot also plays route cards (tt_start ~1300 = "Để ý"/"Cắt đứt" loop, ad_start every life):
  rtCards gate should check a flag only the route policy sets per call (or make the policy filter deck for the sens bot). Fix before trusting numbers.
Next steps:
1. Tune: escape bases down ~6 more (or fire chance 2.5→1.2: «Nhân lúc hỏa hoạn» is the method the bot used most), per-attempt success ~20 %;
   xuất gia odds 18+th/2+(Đức−50)/2−Sủng/3 → lower base (≈5) and require ≥2 years in palace / Thái hậu 40.
2. Rerun tc/tt/hl/ad (≥20 lives each), write numbers into the plan.
3. Shots already in dev/shots/routes (686 + 1180): 1-entry, 2-steps, 3-story, 4-nghiem, 4b/4c mini-game, 4d bowl, 5-ending. 0 errors, 0 overflow.
   Re-shoot after tuning (node dev/test/routes.js dev/shots/routes 686 880 2.2 1180 820 2). Old save: dev/test/outside/oldsave.js OK.
4. Trích huyết nghiệm thân animation + tamper mini-game are DONE in jroute.js (rtNgSleight / rtNgScene on the j82 kg82Open frame, kmReduced → static);
   open: painted bowl sprite needs owner OK (canvas bowl now); frame seal reads «TÀI NGHỆ» (kpHeader "game") — maybe a kit seal for scheme games
   once the harm-scheme minigame worker adds one.
5. Not done: report "SẴN SÀNG KIỂM".
