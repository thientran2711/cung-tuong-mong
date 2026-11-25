# flight-M1 — SOLO life, real taps, Fold 755x1000, SEED=101, profile cnv_mat (robot ROBOT-LIFE-M1)
PRIORITY #1 CHECK: OD robot rows 25/11 | main dev/measure/robot10.js (fast bot, JS calls — NOT usable for real taps) | review/* none | claims Foreman F flight round.
Build: LIVE origin/main 0756a05b (life started on 4da55ce8, switched to 0756a05b mid-life; save loaded fine). Harness: own real-tap driver (page.mouse at element centre after elementFromPoint hit-check on 7 points; no JS click); mini-games played with mg-bots skilled logic via KG82.peek() oracle but REAL mouse taps/drags. Files: /home/user/wt/m1/{ctl.js,core.js} (not in git).

## Lives
- Life 1 (Kiều Tịnh Dung, cnv_mat): VOID. Bot chose Hành sự card «Tạ ơn, xuất giá» («kết thúc kiếp này: được ban hôn») at age 27, y10 m8 = voluntary exit chosen while other cards existed. Blacklist added (xuất giá/ban hôn/kết thúc kiếp). Replayed.
- Life 2 (Sử Vân La, cnv_mat, road verified S.st.f14.road): played to a natural ending, ~100 real minutes (06:39→08:19Z), 26 game years, age 19→45, ~3,800 «Sang buổi» taps, 25 true reloads (one per game year: page.reload → title → Chơi một mình → Tiếp tục kiếp này), 13 mini-games played for real (312 board moves; 1 of 8 intro screens skipped = ~10 %).
- ENDING: «Làm ma ma đến già · Ánh mắt thành ân tình» (cung-kiep / cung-luanhoi), rank Ma ma, age 45, 0 children, mốc «cung nữ lên Chưởng sự cô cô», danh hiệu «Tích bảo». End scene NOT seen: my annual true reload fired in the same step as the ending (harness artefact) and the dead save is removed → slot «Chưa ghi». Ending text taken from luân hồi record.

## Bugs / findings (repro)
1. **JS errors on title with no life** (after death + reload): `TypeError: Cannot read properties of undefined (reading 'sung')` at showModal (index.html:5498) and console.error `kitStatusIcon open TypeError … 'find'`. Repro: finish a life (S.dead → slot removed), reload the page, tap Vào cung ngay (title home dialog), tap ✕ → errors.
2. **Title blank splash soft-lock**: on the title home dialog (Chọn sổ), the ✕ closes it and leaves only the title art, zero tappable elements (#title z50 covers everything, slots/buttons 0×0). Only a page reload recovers. Also reachable after ☰ → ✕. Same at life 2 end (bot stuck 40 tries).
3. **DEAD BUTTON (covered cards, Hành sự list)**: «Dâng trà, hầu điểm tâm», «Theo hầu chủ», «Đốc thúc cung nữ quét dọn» cards at (378,368/618) covered by `.kfoc-fig` / `.kfoc-veil` (focus-veil coach layer) at y5m5, y6m3, y12m8, y16m4, y22m1 — a focus veil still sits over the list after it should be gone (taps lost until it clears; persisted ≥350 ms across two scans). Not a permanent lock.
4. Stuck/loop notes (bot tapped same control ≥7 of 16 times): ‹ ›, ✕, «Hành sự», «Về phòng» at y1m11–12, y4m8, y5m1 — news/rail screens that need several ✕ to clear (repeated modal after modal, e.g. «Tin trong cung buổi này» then «Lệ tháng» reward). Early game: one stuck of ~3 min where ✕ re-opened news; self-resolved after ≥1 other tap.
5. **Mini-game strip with no board**: exam «Khảo hạch: Môn 1/2 · Lễ nghi» showed only a header strip (kg82box 0×0, hidden, Sẵn sàng 0×0) while KG82.phase=='play'; ✕ gave up Môn 1 (0/10) and went to Môn 2 intro. Possible race if the rules screen is dismissed quickly — could not reproduce after the first time (my bot had tapped ✕ on the rules screen at 120 ms pace).
6. **Promotion invisible**: Danh 100, Đức 100, Chủ tin 100, «Xét phẩm: đủ» chip not tappable; rank stayed cung nữ (rank 0) for ~24 years until a Khảo hạch card was prioritised. Player cannot tell where to promote. (Player-review item, not a code bug.)
7. Rail icons («Mục tiêu», «Thỉnh tranh») overlap the right info panel (Ân sủng/Công lao) at Fold after a few buổi (screens b00120-style): icons stacked over text.
8. HARNESS-only (not game): SIGKILL of the browser lost up to 12 months of unflushed localStorage save (y6m8 → reloaded y5m8); graceful reload never lost state (25/25 true reloads resumed the same buổi).
9. «Kiếp thứ hai» label appeared on the HUD of life 1 at the ending though it was the first life of that slot (also «Kiếp thứ nhất» earlier). Check kiếp counter.

## Zero: no crash, no save loss on graceful reload, no soft-lock in play except #2 (title) and brief #3/#4.
## Numbers (life 2): 15,300 taps, 3,577 buổi counted by driver, 177 sampled shots (scratch, not in git), 13 mini-games, 0 NaN stat checks (not instrumented), issues log 17 lines.
Report: ~95% xong / ~60% chơi được (one natural ending reached; romance end).
