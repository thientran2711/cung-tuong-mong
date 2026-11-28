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
