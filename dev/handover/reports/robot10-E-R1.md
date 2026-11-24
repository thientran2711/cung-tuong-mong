# ROBOT-10 report E · R1 · origin thd · road thd_tho (round 1)
PRIORITY #1 CHECK: OD 23/11 ROBOT PLAYTEST | main robot10.js LIVE | claims E runner R1.

- Lives: 48 valid of 50 planned (scholar-4/5 not rerun). Harness: main 14ba8768 (not fixed harness 19183dca). 17 lives of first pass were invalid (my worktree lost inpage6.js) and were rerun: rebel, lazy, speed; scholar-4/5 dropped.
- Endings: Hồng nhan bạc mệnh 18, Xuất gia 4, Thái phi 1, Tư thông bị phát giác 1, Đại kết cục «Thơ theo gió đi» 1, CAP no-ending 13, TIMEOUT 10. Crashes 0.
- Bug file: dev/handover/robot/thd-20261124-R1-tho-merged.md (+ .json), rates-20261124-0930.*; 91 distinct rows.
- Softlocks: 10 TIMEOUT lives (random 4/5, speed 3/5 stuck at 5-12 buổi at rank 0), mostly the MƯU mini-game «Tung tin đồn: Truyền lời» (no options); 13 CAP no-ending lives (skilled/greedy/cautious/lover/scholar/lazy play 1800 s without ending).
- New families vs R3/R4/R7: Tung tin đồn stuck; console.error econ card «reading 'queen'»; renderHud2 «reading 'replace'»; «reading 'sl'»; kitImgErr not defined; stat out of range tai; kbk-* text overlap on fold tabs.
- Repro save: review/robot10-saves-r1 (Tung tin đồn, gz). Other saves on box /home/user/wt/out-R1/saves.
