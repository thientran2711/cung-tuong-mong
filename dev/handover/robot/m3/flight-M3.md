# flight-M3 — FINAL (life 1 ended by death; filed 2026-11-26)

Runner M3 · Fold 755x1000 · SEED=103 · profile greedy · REAL taps only (touchscreen/mouse after elementFromPoint hit-check) · mini-games played for real (KG82 oracle logic, ~10% «Bỏ qua»). Builds: LIVE 9f72524b (first ~45 buổi) then 08e7d79f from 19:15Z 25/11.

## Result
- Character: Tiêu Lạc Anh (Kiếp thứ nhất). Rank history: Đáp ứng → **Phế phi · lãnh cung** (cold palace) in year 2.
- END: **natural death in the cold palace** at age **19**, year **2**, month 8 (tháng tám hạ tuần), 25/11 ~22:05Z. Last HUD: «Tâm bệnh · nặng», Sức 9/98, Danh 91, Sủng 0, Bạc 398.
- Buổi count ≈ **177** (13 + 36 + 1 + 62 + 65 across resume segments; counter resets on each resume). Real play time ≈ 4 h 30 min (17:36Z–22:05Z, plus ~2 h lost to two soft-locks and a mid-run kill at 16:xx).
- **Ending name: NOT CAPTURED.** The bot tapped through the death/ending screens in ~16 s with no shot (22:05:08–22:05:25: «Nhận» → «Tiếp theo» → «Chuyển kiếp» → «Tiếp» → «Bỏ qua» → identity sheet «Nhận thân phận» …). I mis-tracked the life for hours: the game then started **Kiếp thứ hai** (Mạnh Mi Trang, Đáp ứng, age 20) and the runner kept playing it until MAIN 153 told me to stop (06:xxZ 26/11). Kiếp thứ hai is NOT the M3 life.
- A replay from the 20:56Z save (ENDSHOTS=1) diverged (non-deterministic: real-time delays) and the character was still alive at month chạp year 2 when the 2 h task limit killed it; death screens therefore still uncaptured. Save of that replay is in save_dump_latest.json.gz.

## Own line — «Chuyển kiếp» no-confirm tap (for MAIN to route as a bug)
- Button: **«Chuyển kiếp»** (kit button on the death/ending flow, reached after «Nhận» → «Tiếp theo»), log 22:05:11Z (run-g/log.txt line ~1076).
- A single real tap on it (as a plain progress button, no confirm dialog, no «Bạn có chắc») started a brand new life (identity roulette → «Kiếp thứ hai»). A stray tap on the death screen therefore instantly leaves the ending; I could not verify from a screenshot whether a «Xem lại / Sổ luân hồi» screen exists first (no shots). Recommend: confirm step or at least a visible ending recap before «Chuyển kiếp».

## Verified
- TRUE RELOAD at every year change PASSED (save ≈594–730 KB intact, slot shows «Tiếp tục kiếp này», resume ~4 s). Many repeats.
- RESUME method works (harness/RESUME.md): restore localStorage dump via init script → «Chơi một mình» → «Tiếp tục kiếp này». Graceful stop at DURATION min flushes the save; SIGKILL/time-limit kill can lose it (the early «Chưa ghi» after a kill = harness artefact, not a game bug).
- KTUT («Lời dặn · Thỉnh an Thái hậu hoặc Hoàng hậu», «Đã hiểu»): Fold on 9f72524b — hit-check passed, real tap closed it ⇒ **KTUT LIVE: fixed (Fold)**. iPad 1180x820: NOT certified.
- Old build 4da55ce8: «Đã hiểu» covered by `.kpdr` (2/2 runs) — evidence in /home/user/wt/m3/evidence (not pushed).

## DEAD BUTTON / wrong-effect / stuck / error list (with repro)
1. **Option card centre tap → odds legend (9f72524b)**: in event sheets («Kính sự phòng báo tin» → «Tắm gội chờ giá»; «Tiếp tục»; «Phụ tuyển · Tân quân lập uy» → «Đứng ngoài, giữ mình») a tap at the card centre lands on the odds chip `.kodm`, opens «Thang cơ duyên» legend that covers the card; card never chosen; sheet cards also sit half off-screen at the bottom. ~30 min stuck per hit. Shots: evidence/0143-option-centre-tap-no-effect.png, evidence/option-card-odds-legend-covers-card.png. **No recurrence on 08e7d79f** in 150+ buổi with plain taps (NOSCROLL=1); exact «Đứng ngoài, giữ mình» card not re-met.
2. **Art tap → fullscreen image lightbox, no obvious close (9f72524b, Fold + iPad)**: tapping the card illustration on an option card opens a full-screen image; bot stuck 85 min. (Triggered by my retry tap; a real player can hit it too.)
3. **«Tin trong cung buổi này» chained news cards**: ✕ closes one, the next appears — looks like ✕ does nothing to a naive bot (DEAD-CLOSE false alarm ×many). Not a confirmed bug.
4. **Info sheets with ✕ plus an unlabeled « ! » control** («Bổng lộc tháng giêng», «Bộ sưu tập» / Bảng vàng đề tên, «Tâm trạng · Quý nhân …»): bot idle 15–25 min until stuck detector/true reload. Bot-side gap (patched: ✕ after 60 s idle) — but check the ✕ is the only exit on those sheets.
5. Hung `page.evaluate` froze the runner >8 min once (page unresponsive after a mini-game); recovered by kill + resume from save. Possible page freeze — unclear whether game or harness.
6. Bot-side only: year-parse flip nhất/hai caused spurious 2nd true reload; multi-round exam result card needed a ✕ tap; cinematics «Chạm để bỏ qua».
No JS errors (`PAGEERROR`) seen in any segment.

## Files
- harness/{bot.js,lib.js,RESUME.md}, save_dump_latest.json.gz, evidence/*.
- Review: dev/handover/robot/review/M3-life1-moments.md, M3-life1-review.md.
