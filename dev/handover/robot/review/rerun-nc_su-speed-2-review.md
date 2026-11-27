# nc-nc_su-speed-2 — end-of-life review (persona: speed runner; origin nc, road nc_su; Fold 755x1000)
Basis: harness log (json/stdout, 5881 steps, real taps via realtap.js, 0 JS clicks) + end shot; the runner did not watch every buổi live, so scores are log-based (no live moment log).
1. Summary: age 21, year 4, rank 2 at end, 485 buổi, ending «Hồng nhan bạc mệnh» (Khó sinh, băng huyết mà chết) — death, no exit pick (VALID). Harness review/robot-realtap 073380f9 + F10 hang watchdog (resumed from checkpoint on page freezes / 2 h job limits).
2. Scores (log-based): first 15 min 6 · loop/pacing 4 (≈1 buổi/min, repeated dialogs) · buttons/UI 8 (0 dead buttons, 0 stuck, 1 bugs) · story 5 · characters 5 · choices 5 · rewards/feedback 5 · mini-games n/a · visuals 6 · co-op n/a.
3. Hated: freeze: page froze: no harness step for 10 min (page.evaluate hung) at buổi 297.
4. BUGS (json bugs[], 1): 1× freeze: page froze: no harness step for 10 min (page.evaluate hung) at buổi 297. Shots container-local (not in git).
5. Suggestions: dedupe pending-dialog queue; make «Sang ngày mới» flush the «Tin trong cung buổi này» queue; no-clock loops need a visible way out. (Feature suggestions → MAIN PARKING_LOT per law 18.)
