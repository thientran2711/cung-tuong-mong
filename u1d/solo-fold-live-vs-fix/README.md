# solo Fold 755x1000 rooms: bare LIVE 5e013076 (BASE, build fa8da73cecdc) vs LIVE + c20aaa6e jinv/jksize (FIX, build 8dde70d62141); harness 5edf09f6 + patch #27; robot-rt.js slice 90/100, stuckMin=5
| seed | BASE | FIX |
|---|---|---|
| 135 | rerun: buổi 90 clean (first run WEDGED at buổi 63 «Sang buổi», saves e6cd2e040 u1d/solo-fold-live135-wedge) | buổi 100 clean, 1700 taps, 0 stuck |
| 136 | buổi 100 clean, 1551 taps, 0 stuck | buổi 100 clean, 1632 taps, 0 stuck |
| 137 | buổi 100 clean, 1796 taps, 0 stuck | buổi 100, 1503 taps, 1 «stuck» = PRE-START (title art, menu buttons not loaded within 5 min at 09:18Z while 4 rooms were loading; life ran on to buổi 100) |
Total: 1 wedge in 5 base solo-Fold rooms (the first seed-135 run), 0 in 3 fix rooms. soloWatch.log = the 90 s-silence/CPU + CDP-trace detector (never fired after the first run).
