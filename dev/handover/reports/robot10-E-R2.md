game sha 14ba8768 (origin/main). Harness: first 31 thd_tro lives on main's robot10; later chunks on review/robot10-e-fix-2 / -r3m (9e89619a).
# ROBOT R2 report (origin thd, roads thd_tro + thd_hoc)
PRIORITY #1 CHECK: OD 23/11 ~19:20Z ROBOT PLAYTEST | main dev/measure/robot10*.js | claims E runner brief | reuse only.

| road | lives | files (dev/handover/robot/) |
|---|---|---|
| thd_tro | 50 (31 partial-json only: thd-20261124-0256-R2-partial.json; 10 scholar+rebel: 0753; 10 lazy+speed: 0842) | md rows 33 + 20 |
| thd_hoc | 48/50 | skilled+random 0946 (11 rows); scholar+rebel 1055 (13 rows; rebel-4/5 harness browser-closed); greedy+cautious 1256-partial json only (8/10, chunk killed at 2h cap, 2 cautious harness); schemer 1456 (6 rows); lover 1543 (9 rows); lazy+speed 1651 (8 rows) |

Notes: speed bot hits TIMEOUT at ~28 buổi in 3/5 lives on thd_hoc (stuck, see 1651 md). Saves stay on box /home/user/wt/out-R2/saves (not in git); single save pushed: review/robot10-saves-r5 fd87f9f2 (rebel-3). Zero harness-vs-game triage done by me; rows are as the harness flagged.
No handover needed beyond: worktree /home/user/wt/r2 (main+harness overlay), out folder /home/user/wt/out-R2.
