# flight2-s19c bugs / infra (Fold 755x1000, persona scholar→default, seed 2026112552)

Build fddb4bfbce60 (main 00dca386, self-check OK), harness f65d019b, pin=1, fresh profile. Real taps only. Persona «scholar» has no table entry → default weights (logged «scholar→default», F ROOT #4). No INFRA events, no resume.

## Game bugs (all at buổi 0, year 1, before the Điện tuyển audience ended the life)
1. DEAD close: `.dlg «Tin báo»` button «Để sau» — tapped 3× for real, dialog stays (NO EFFECT). Shot noeffect-*.png (not in git).
2. STUCK no-clock loop: 150 taps without a clock step on `.mapsc` (Dư đồ map panel, no buttons labelled) at the start of the life; dump loop-1-dump.json (not in git).
3. JS page error: `TypeError: Cannot read properties of undefined (reading 'tile')` at kriFocus (build line ~101887).

## Result
LIFE DONE: «Ban hoa — Bị ban hoa, xuất cung» age 20, buổi 1 (ended in the opening Điện tuyển: Thái hậu / Hoàng thượng dialogs, «Dâng Họa / Dâng Kỳ / Cúi đầu chờ xét»), taps 224, exitPick none. robot-audit: VALID. Note: a life of 1 buổi is a game-imposed selection ending (same shape as s21/s72 «Ban hoa» at buổi 1) — foreman to judge whether to replay for a longer life.
