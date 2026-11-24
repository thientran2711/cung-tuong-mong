PRIORITY #1 CHECK: OD 1 (23/11 ~19:20Z ROBOT PLAYTEST) | main dev/measure/robot10.js LIVE | review/robot10-e-fix-2 19183dca (harness fix, used for bd_hen) | claims: E runner R8.
# ROBOT-10 R8 (Foreman E) — origin bd, roads bd_tuyet then bd_hen
Game: origin/main 14ba8768 (LIVE 1ddbe155). Harness for bd_tuyet: main robot10 (before E-FIX-2). bd_hen: main + E-FIX-2 cherry-pick (conflict in memSample resolved to the fix side).

## Road 1 bd_tuyet — DONE, 50 lives, 94 distinct bugs
File: dev/handover/robot/bd-20261124-0256-R8-bd_tuyet.md (+ .json, saves/R8-bd_tuyet/, rates-20261124-0851*)
| family | rows | lives | note |
|---|---|---|---|
| mem leak bot page | 1 | 32/50 | known |
| «Sang ngày mới» stuck after load | 1 | 40/50 | known |
| save->load->save differs | 1 | ? | known |
| no ending within cap 1800 s | 1 | 11/50 | CAP at rank 5-7 (year 15, age 34); NEW candidate |
| TIMEOUT stuck, modal «Bỏ cuộc?» open with no options | 1 | 7/50 | NEW candidate (harness answers it in E-FIX-2) |
| js econ card TypeError null.queen | 1 | 1 (cautious-3) | NEW |
| stat out of range danh/duc/sac/tai | 4 | few | NEW |
| option text «Sức +6» but effect suc=-2 | 1 | | known-style (number audit) |
| forced road bd_tuyet not played (life null) | 1 | speed-2 (0 buổi) | NEW |
| tab lag, covered/overlap buttons, text-over-text (fold kbk/kmtake, ipad go mspot/mmeta) | ~75 | | known tab overlap family, many tab variants |
Ending mix: Hồng nhan bạc mệnh deaths, Thái phi, Xuất gia (speed bot, 25-90 buổi).
## Road 2 bd_hen — in progress (2-bot chunks, run_in_background)
