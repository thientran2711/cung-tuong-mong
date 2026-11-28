# flight2-s21g bugs (interim, life still running; build b=0b372aa14258 s=ca4a1689 = LIVE 5fb13d60)
## FIND: «Sang ngày mới» dead 3 taps, queued dialog never opens (3 rows, all in the first 50 buổi)
| # | game clock | queued dialog Q | tabs / last taps before the 3 dead taps | shot |
|---|---|---|---|---|
| 1 | year 1, turn 1, tuần 2, buổi 3 (evening), Chung Tú cung / Minh Hòa hiên, rank 1 Thượng tại | Thái hậu triệu | «Tất cả 228» then «Tài nghệ» tab open, then «Sang ngày mới» x3 | noturn-1.png |
| 2 | year 1, turn 3, tuần 1, buổi 3 | Nghe đồn | «Con gái Tể tướng 0/16», «Lật thẻ Rất thấp», then «Sang ngày mới» x3 | noturn-2.png |
| 3 | year 1, turn 3, tuần 2, buổi 3 | Kẻ hầu xin | «Xem đủ trong Sổ ghi», «Lật thẻ Rất thấp», then «Sang ngày mới» x3 | noturn-3.png |
Common: dump top=null (no modal on top), qs.Q has exactly 1 queued dialog, DQ.want=null, DQ.park=null, so nothing asked to show it; red «Sang ngày mới» visible; 3 real taps, buổi does not turn. Harness unstuck and play continued (not a permanent lock, no stuck row), so the player loses 3 taps + a visible dead button and a hidden event. Dumps here have the localStorage "ls" field stripped (packed save, large).
Class guess: dialog queued while a right-panel tab/overlay was open is held (DQ.stat modalHeld/actHeld high: 46/10, 101/14, 16/2) and not re-armed on the Sang ngày mới tap.
## Other
- SAVE STALE rows: harness CTMZ unreadable (HARNESS FIXER #24 item viii), not a game bug.
- Dead buttons 0, stuck 0 so far.
## Update 00:5x: more noturn rows
- noturn-4 / noturn-5: same signature (3 dead «Sang ngày mới» taps, queue Q=1). noturn-5 Q = «Một ánh mắt» (ckpt clock at 3441), year 2 (21 tuổi, Thượng tại, Khải Tường cung). See the dumps for state S and queue; "ls" stripped.
- noturn-N-save.json = decoded saves at the moment of each dead-tap row (repro seeds).
## Early Lãnh cung chain (year 3, 22 tuổi, Tháng giêng hạ tuần; Sủng 0, Danh 4)
Cấm túc (m-new-275-292) → Bị soát phòng (m-new-276-293) → Bị thu hiệu ban (m-new-277-294) → rank 1→0 (m-rank-277-295) → Lãnh cung card (m-new-278-296): AI XỬ Hoàng thượng · VÌ SAO "Bị bỏ quên, đưa vào lãnh cung" · HÌNH PHẠT "ở ít nhất 3 ngày mới được xét tha" · "Chưa hết đường: minh oan, cầu xin, nhờ người bên ngoài, hay chờ ân xá". Files in flight2-s21g-lanhcung/. Question for MAIN: the reason given ("bị bỏ quên") is vague next to the visible chain; check each chain card names the offence.
- noturn-6: another dead-tap row INSIDE Lãnh cung (place lc, y3 turn26 tuần2 buổi3, Q=Nghe đồn). noturn-7 added at buổi ~608 (see dump).
- noturn-8 added at buổi ~813 (see dump S/Q).
- noturn-9 added at buổi ~1100 (see dump S/Q). 9 rows total.
## Update (buổi ~1350, year 10, 29 tuổi, Phế phi · lãnh cung, Trường Môn viện, build b=0b372aa14258)
- STUCK + SOFTLOCK (game): loop-13.png / loop-14.png (dir flight2-s21g-stuck/). Buổi 3 (night), page «Trường Môn viện», the bottom-right button is the greyed «Chờ tin» (disabled) instead of «Sang ngày mới», queue holds 10 dialogs (Tin báo / Tin chờ người sai đi / Chương 7 · Đêm ngài ghé cung ×3 / Lịch tháng ...) but NO dialog shows; 150 taps without a clock step ("no-clock loop"). Same family as NO-TURN (queued dialogs not opening at buổi 3), now with a disabled button. Hint: Hoàng thượng Giận, Thái hậu -29, Hoàng hậu -42 shown in Chí tôn panel.
- NO-TURN rows now 12 (noturn-10/11/12 added, see dir).
- Runner + server died silently between 04:34Z and 05:34Z (container idle); resumed at 05:3xZ with resume=1 on the same pinned build (served from origin/main 5fb13d60 → CTM_BI s=ca4a1689), save restored identical (hash ee575583), buổi 1348.
- Also seen after resume: LATE BUTTON .kmov «Ta biết rồi» 10.4 s after open (game).
- noturn-13/14 added by buổi ~1559 (year 11); NO-TURN shots on disk: 14.
- noturn-15/16 added by buổi ~2053; NO-TURN shots on disk: 16.
## FINAL (LIFE DONE)
Ending: "Lãnh cung — Tuổi xuân qua đi" (card «Xuân tàn lãnh cung»), age 40, year 21, buổi 2897, rank 0 (Phế phi · lãnh cung), 16542 real taps, build b=0b372aa14258 (LIVE 5fb13d60) all life (runner+server died once ~04:34-05:34Z, resumed from ckpt on the same pinned build, save identical hash ee575583).
Bugs (9 rows): 
- SAVE STALE (28×): harness: CTMZ unreadable (HARNESS FIXER #24 item viii), not a game bug.
- «Sang ngày mới» NO-TURN: 3 dead taps, buổi 3, 1 queued dialog never opens (rows: Thái hậu triệu, Nghe đồn ×9, Kẻ hầu xin, Một ánh mắt ×3, Có người đến ×4 = 18 shots in flight2-s21g-noturn/) — routed to DAYQ-NOTURN.
- «Chờ tin» softlock: disabled button, Q=10, no dialog, 150 taps no-clock loop (y10 in Lãnh cung, loop-13/14); self-cleared, play continued.
- LATE BUTTON «Ta biết rồi» 10.4 s after a .kmov opened.
Illness log: NO personal-illness dialog, no danger word, no cure road (Tĩnh dưỡng | Truyền thái y) was ever offered in 21 years. Only HUD signs: "Tâm bệnh · nhẹ" with Sức cap 88/98 (y6, Lãnh cung) and later Sức 88/99, 96/99, 93/92 (end) flickers; mood Hờn tủi / Phiên muộn. Pick never exercised. Finding: illness/Sức-cap loss shown on HUD only, no dialog or cure road.
Lãnh cung: 4+ stays (first y3 22 tuổi after Cấm túc → soát phòng → thu hiệu ban, card reason "Bị bỏ quên"); life ended in Lãnh cung at 40.
Promotion roads: 319 seen / 235 picked (314 decree + 5 select); never rose above Đáp ứng / Thượng tại; rank 0 at end.
