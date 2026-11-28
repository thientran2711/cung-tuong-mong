# flight2-s2i review (honest note first)

**Honesty note.** Supervisor only: the runner session started the harness and read the log, moments and trace; it looked at one screenshot (end.png, the HUD before the ending). It did NOT play. Art / text / pacing scores are N/A.

## Life
- life flight2-s2i, persona cautious + pick="Tĩnh dưỡng|Truyền thái y", dev fold, seed 2026112567, fresh profile, harness review/robot-realtap-live-r22c 795f87ec, game 5fb13d60+ (b 8af7b3429f38, = origin/main 18003079) served locally, pin=1, single build.
- END: «Ban hoa — Bị ban hoa, xuất cung», age 18, year 1, buổi 1, 60 taps, 0 dead, 0 stuck, 0 bugs. Real taps (jsClicks 0), exitPick none. robot-audit: VALID (end imposed by the game). Character: Tào Thanh Hoan, tú nữ, Sắc 58 Tài 75 Tâm cơ 14 Đức 31 Danh 7 Sủng 8, Bạc 380, Sức 95/100.
- The ending came at the selection audition, 4 taps after the last dialog: trace = «Điện tuyển» «Quỳ xuống thỉnh an» → «Thái hậu» «Tay con từng bóp thuốc, chăm sóc cha mẹ khi ốm…» → «Hoàng thượng» «Cúi đầu chờ xét» → page «Tiếp ▸» → «Thái hậu» «Thần thiếp thưa rằng trâm lỏng do mình không cài kỹ…» → ending. Whether the rejection was forced by a stat (Đức 31, Tâm cơ 14, Danh 7) or by the answers is not established here.
- Too short to study illness (no illness in 1 buổi).

## Harness note (found at start)
- The sparse harness worktree lacked dev/build: first start printed «rt-save: slotDec not loaded (ENOENT dev/build/j6.js) — CTMZ saves unreadable». Fixed by `git sparse-checkout add dev/build` and a fresh restart (profile deleted). The seat recipe should list dev/build.
- This build stores the save CTMZ-compressed (≈12 KB at the start): use rt-save.js state() to read S (rank, suc, ill …); a JSON.parse of the stored string fails.
