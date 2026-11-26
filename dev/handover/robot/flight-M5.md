# flight-M5 FINAL — robot life Nam Cung Ngưng Sương (dtq), SEED 105, profile random, Fold 755x1000 (M5 + M5b)
Builds played: 0756a05b (M5, M5b start) -> 17dfa64d -> 351122ba -> 5e013076 (MAIN 144 ordered the switch at relaunch). Tag every finding with the build sha.
## Result
- Origin dtq, rank 1 at start (Thường tại) -> Quý nhân at the end (rank 2), reached age 34, turn 193 (week 2, buổi 0), PREGNANT (tháng bảy), Sức 94/94, Bạc 43, Sủng 74, Danh 0 at death.
- DEATH came right after «Sang ngày mới» (two «Ta biết rồi» notices tapped, then the death state). Real ending NAME / cause: NOT CAPTURED. The driver's «priority» taps (Nhận, Chuyển kiếp) went through the ending screens without a screenshot; the death screenshot 0386 'dead' is only the Bổng lộc screen. Fix in bot.js (next runs): screenshot on DEAD STATE before any tap. The game then rolled to a new life (La Lưu Ly, origin thd) and the bot was stopped there.
- Real minutes: M5 ~? + M5b ~7 h wall (many 2 h runs; container paused ~30 min once).
## Findings (tag: build)
1. [0756a05b] SOFT-LOCK ×3+: Hành sự -> Mưu kế card with one thân tín -> VIỆC «Chọn người theo hầu» shows only the mood panel, no picker/buttons/✕ (M5 finding 1; not re-seen by M5b on 5e013076 — recheck on LIVE).
2. UI (all builds seen): odds chip «Rất vững» at the centre of single-option event cards steals centre taps (opens 'Thang cơ duyên'); picker cards (e.g. «Sai … đi dò la» / «Đáp ứng · Phó Nhã Ninh») are clipped at the dialog bottom and the centre tap lands on the portrait = no action; a human must tap the title text or scroll. Bot looped ~30 min [5e013076].
3. SAVE-DRIFT on true reload (autosave not per action): 3 buổi (M5), ~7 turns (351122ba relaunch, 101 -> 94), 1 turn (5e013076). A crash/reload loses progress.
4. PAGE HANG ~35 min once [351122ba] (chromium ~58 % CPU, bot idle); cleared by restart; cause unknown. DAWN-WAIT ~6 min with nothing tappable after «Sang ngày mới» (turn 190, age 34) [5e013076], cleared by the bot's true reload. Save size ~5.2 MB.
5. NOT A BUG (MAIN 142 verified on LIVE): pet-shop modal with one nameless card / dead ✕ (robot tapped tiles under the open item card).
6. DRIVER (not game): Khảo hạch result bar «Môn 1/2 · 9/10» leaves KG82.phase='play' with kg82box hidden until ✕ is tapped; the bot idled 12 min ×4 before the patch (tap ✕ after 6 s with no peek state). 54 mini-games ended; 23 were skipped/very short (acts 0, ~1 s).
7. issues.log: ~800 [DEAD BUTTON] candidates (mostly covered-by-popover false positives: DIV#tabs, DIV.kpbar, DIV.kginfo, BUTTON#next.kcwait). Real ones need human-centre tap recheck.
## Files
dev/handover/robot/flight-M5/ (bot.js patched, lib.js, findings-running.md M5, findings-m5b.md M5b); review/M5-dtq-1-moments.md + -review.md. Saves/shots are NOT in git (container-only).

## UPDATE (M5b, build f009e1a6, ~05:00Z) — ENDING CAPTURED
- The dtq life came back after a reload at turn 190 (REBIRTH NOT PERSISTED: the first death at turn 193 + new life La Lưu Ly were never saved) and DIED AGAIN at turn 195 (age 34, not pregnant at that moment, Sức 94/94, Bạc 63, Sủng 78) on f009e1a6.
- ENDING screen 1 (black ink): «Hương tiêu ngọc vẫn» / «Mở Sổ luân hồi» (button Tiếp theo). Screen 2 card KIẾP «Hương tiêu ngọc vẫn»: HỒNG NHAN BẠC MỆNH — «Tráo con bị bắt quả tang, tội khi quân.» KẺ THÙ CÒN SỐNG: Hoàng hậu Hoa Ngọc Dao, Thục đáp ứng Thượng Quan Lệ Hoa, Thường tại Đổng Đường Chi Nhi. MỘT KIẾP NHÌN LẠI: Nam Cung Ngưng Sương · Con gái Đại tướng quân; 17 năm · 34 tuổi; phẩm cao nhất Tần; con cái 1 hoàng tử, 0 công chúa; mệnh tận: Tráo con bị bắt quả tang, tội khi quân. Button Chuyển kiếp. Shots: out/shots/0082-dead, 0084-end1, 0085-end2 (container only).
- Cause: the bot chose the «Giả mang thai» route earlier (fake pregnancy + baby swap); a full ending, not a bug. Review notes: the ending cards read well (cổ trang wording, enemies list, life summary), but the death arrives with no HUD warning (Sức full).
- Death was NOT deterministic with the same SEED (first run died at 193, replay passed 193 and died at 195).
- Screenshot-on-death fix works (ENDSHOT).
