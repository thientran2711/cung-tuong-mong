# flight-M3 — INTERIM note (life still running; full write-up at death/ending)

Runner: M3, Fold 755x1000, SEED=103, profile "greedy", REAL taps only (touchscreen/mouse after elementFromPoint hit-check), mini-games played for real (KG82 oracle, ~10% «Bỏ qua»).
Written 2026-11-26 ~00:45Z. Bot: /home/user/wt/m3/bot.js (not committed); save dumps in save_dump_latest.json.gz (this folder).

## Life state
- Character: Tiêu Lạc Anh, Kiếp thứ nhất, age 21 (hourly 00:35Z: buổi counter 54 since last resume), in year 2.
- Rank history: Đáp ứng (age 18-19) -> fell to «Phế phi · lãnh cung» (cold palace) by age 19. Stats at ~21:31Z: Sức 36/99, Danh 96, Sủng 0, Bạc ~400.
- NO death, NO ending yet. Total ~150+ buổi across segments. Life is the same one across relaunches.
- Build: LIVE 9f72524b for the first ~45 buổi, then 08e7d79f (kit option-reach) from 19:15Z.

## Verified
- TRUE RELOAD at in-game year change 1->2 (20:14Z) PASSED: localStorage hclh-save-v2-1 ≈594 KB intact, slot shows «Tiếp tục kiếp này», tap resumes in ~4 s. Repeated several times.
- RESUME method (copy of M2 RESUME.md): restore localStorage dump via init script, title -> «Chơi một mình» -> «Tiếp tục kiếp này». Works. Graceful stop at DURATION=100 min writes a flushed save; SIGKILL loses the save (localStorage not flushed) — that was the earlier «Chưa ghi» "save loss", a harness artefact, NOT a game bug.
- KTUT (Thỉnh an tutorial «Đã hiểu»): Fold on 9f72524b — hit-check ok, real tap closes it = fixed. iPad 1180x820 NOT certified (no confirmed exact tutorial hit).

## Play-stoppers / bugs (game side)
1. [9f72524b] Option cards (e.g. «Tắm gội chờ giá», «Tiếp tục», «Đứng ngoài, giữ mình» in «Phụ tuyển · Tân quân lập uy»): a centre tap lands on the odds chip (.kodm) and opens the «Thang cơ duyên» legend, which then covers the card; the card is never chosen. On long sheets the card also sits half off-screen at the bottom. Cost ~30 min per occurrence. Evidence: evidence/option-card-odds-legend-covers-card.png, evidence/0143-option-centre-tap-no-effect.png.
   NO RECURRENCE on 08e7d79f in ~100+ buổi with NOSCROLL=1 (plain taps, no wheel scroll). The exact «Đứng ngoài, giữ mình» card was not re-met, so exact-spot verdict = not seen again.
2. [9f72524b, iPad and Fold] Tapping the card art on option cards opens a fullscreen image lightbox with no obvious close; bot sat 85 min. (Cause: my retry tap hit the art. Real players could hit it too.)
3. Chained «Tin trong cung buổi này» news cards: each ✕ closes one and the next appears; looks like a ✕ that does nothing to a naive bot (DEAD-CLOSE false alarm), not a confirmed bug.

## Bot-side gaps found (not game bugs)
- Info sheets with ✕ plus an unlabeled « ! » control («Bổng lộc tháng giêng», «Bộ sưu tập») were not closed -> 15-25 min idle. Patched (✕ tap after 60 s idle).
- A hung page.evaluate can freeze the loop for >8 min with no stuck report; recovered by kill + resume from save. TODO: hard watchdog.
- Year-parse flips «nhất»/«hai» cause a spurious second true reload (harmless).

## Open
- Wait for death / real ending; then final.md-style details: age/rank at end, ending name, buổi count.
- Moment log + 10-area player review (dev/handover/briefs/ROBOT-PLAYER-REVIEW.md) not written yet.
- iPad KTUT retest.
