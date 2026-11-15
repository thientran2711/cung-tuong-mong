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

## Where I stopped (handover 15/11 — coordinator STOP; resume from here)
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
