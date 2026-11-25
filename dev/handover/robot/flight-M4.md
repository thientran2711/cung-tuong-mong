# flight-M4 — ROBOT-LIFE-M4 (solo, Fold 755x1000, SEED=104, profile cautious) — IN PROGRESS
PRIORITY #1 CHECK: OD robot rows 25/11 | main dev/measure/robot10.js (in-page bot; NOT used: M4 plays REAL taps via a Playwright driver) | review/* none | claims Foreman F flight robot round.
Reports to MAIN 134 (root session_01V1ZZH27MyRxU8SxKGA7Hjq).

## Life
Origin: Cháu gái Thái hậu (roulette, seed 104). Bạch Nghê Thường → Quý nhân (19 tuổi). Game build: origin/main 0756a05b (started on 4da55ce8, switched at ~05:48Z; save loaded fine across builds).
Last status line: 06:26:21 STATUS buổi#11 Buổi chiều | Bạch Nghê Thường Quý nhân 19 tuổi Kiếp thứ nhất Tháng bảy · thượng tuần · năm thứ nhất | Sắc 94 Tài 66 Tâm cơ 27 Đức 40 Danh 35 Sủng 20 | Bạc 37 Sức 100/100 | 
Life is NOT finished (year 1). A life = ~40 s real per buổi incl. mini-games; a full life is many hours.

## Harness (dev/handover/robot/m4/)
drv.js (Playwright persistent context, control server :8200, REAL mouse/touchscreen taps after elementFromPoint hit-check, mini-game player = port of mg-bots.js skilled logic via KG82.peek oracle with real taps/holds/drags, true reload each in-game year via title buttons, stuck detector 15 min, NO-EFFECT detector), policy.js (hot-reloaded picker: cautious = highest KIT_ODDS rank, exit roads blacklisted, mini-games PLAY with 10% Bỏ qua, keeps Bạc>=60), tt.py/c.sh (manual helpers). Run: NODE_PATH=$(npm root -g) node drv.js ; tap title «Chơi một mình» → «Tiếp tục kiếp này» ; GET :8200/auto?n=100000. Save lives in the runner box profile (saves are NOT pushed: SAVES_NOT_IN_GIT.md); the life is container-bound.

## Findings so far (details + shots: moments.md, notes.txt)
- NOT game bugs (harness): NO-EFFECT x3 were my picker tapping the .kpopts container.
- Mini-game «Bỏ qua» gives 10/10 Xuất sắc for free (law 2/5 smell).
- «Sang ngày mới» disabled with no cue: needs «Về phòng» tap (away from room) or dismissing the guided overlay «Tiếp ▸/✕» (kfoc); newcomer dead end.
- «Nhận thân phận» must be tapped twice at start.
- «Nghỉ ngơi một lát» Rất vững shows BẠI toast.
- Đêm thị tẩm: option list scrolls («Kéo xuống»); best option below fold.
- Bạc 160→1 within ~2.5 months for a cautious bot.
- Mini-games played for real so far: mua x3, hat x3, dan x1 (all reach result).
No DEAD BUTTON / soft-lock / crash / save-loss confirmed yet. True reloads: restarts counted (see log-tail.txt).
