# flight2-s18b bugs (iPad 1180x820, persona bold, seed 2026112549)
Game build a7f223b6780d (main 611fca61, CTM_BI.s 4c4f7d0f+). Harness review/robot-realtap f65d019b.
Result: LIFE DONE «Ban hoa — Bị ban hoa, xuất cung» · age 20 · year 1 · buoi 1 (≈4 min) · 202 real taps · dead 1 · stuck 1 (no-clock loop, unstuck) · jsClicks 0 · exitPick none. robot-audit.js: VALID (ending imposed by the game; the only buttons the game left led on).
This is the known open bug «Ban hoa at b1 after Sân chờ»: a tú nữ is dismissed at buoi 1 of year 1 (stats Sắc 59 Tài 56 Tâm cơ 29 Đức 31 Danh 8, bạc 570, quẻ Hạ hạ) — the life counts as played; the foreman decides on a rerun with another seed.

## GAME bugs
1. [game, known] Ban hoa at buoi 1 (see above), after the Đông sở / Sân chờ road.
2. [game] .dlg «Đông sở» (div.dlg.kpsc.kstage): scrolled to its end there is no close / next button (NO-EXIT DIALOG; later visits were unstuck at once by taps).
3. [game] .dlg «Tin báo» button «Để sau»: tapped 3× for real, the dialog stays (NO EFFECT, 1 dead; shot in out dir, not in git).
4. [harness, stuck] no-clock loop: 150 taps without a clock step on .mapsc (map screen) while Đông sở / Tin báo were open.
Console: not recorded here. No JS page error in this life.
