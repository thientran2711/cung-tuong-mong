# ROBOT-10 runner R3 (Foreman E) — origin cnv
Main LIVE 14ba8768. Round 1. Seed default (SEED=1). PAR=2.

## Road cnv_chu — 50 lives (10 bots x 5), wall 225 min
35 distinct bugs, 0 crashes, 3 stuck types. Bug file: dev/handover/robot/cnv-20261124-0256-R3.md · results JSON beside it · saves/ · rates: dev/handover/robot/rates-20261124-0641.md
| # | type | bug | lives |
|---|---|---|---|
| 1 | mem | bot page heap/DOM/listeners keep growing (leak) | 28/50 |
| 2 | stuck | fold: after loading her save «Sang ngày mới» does not move clock (night flip S.nfX) | 11/50 |
| 3 | stuck | no ending within wall cap (year 18, rank 2) | 5/50 |
| 4 | stuck | inpage6 TIMEOUT (modal «Bỏ cuộc?» with no options, mưu Độc Cô Ninh Hương) | 2/50 |
| 5 | save | save→load→save changes state (S.logs text differs) | 50/50 |
| 6 | number | option «Bạc +8» but effect bac=20 («Bạc lạ») | 32/50 |
| 7 | number | stat out of range danh=101 | 4/50 |
Rest (28 more rows: number/lag/ui) are in the bug file. Row 5 hits all lives (28163 hits): likely a log-rewrite or a harness diff, Foreman E / fixer to judge.

<<<<<<< HEAD
## Road cnv_ban — 50 lives, wall ~4h40, DONE
31 distinct bugs, 0 crashes, 2 stuck types. Bug file dev/handover/robot/cnv-20261124-0641-R3.md · rates rates-20261124-1117.md. Saves stay on box /home/user/wt/out-R3-ban/saves (cnv_chu: /home/user/wt/out-R3/saves; save 018 on review/robot10-saves-r5).
Type counts: ui-text-overlap 15, number 5, lag 2, ui-covered-btn 2, ui-overlap 2, stuck 2, mem 1, save 1, js 1.
Same families as cnv_chu: mem leak 39/50, fold «Sang ngày mới» stuck after load 11/50, wall cap no ending 5/50, save→load→save diff 50/50 (here S.il.seq 27→29), «Bạc +8» vs bac=20 37/50, danh=101 2/50.
New vs cnv_chu: js console.error «econ card TypeError: Cannot read properties of null (reading 'queen')» 2/50 (scholar-2, rebel-3); many ui-text-overlap / ui-covered-btn / ui-overlap rows (see file).
Old harness (not 19183dca / 9e89619a). ROBOT R3 DONE.
=======
## Road cnv_ban — running (out-R3-ban), report when done.
## Rollover: none yet. Foreman E session = session_01DgYSWm2Gu8SUSJpayKmy6E.
>>>>>>> 01958043 (MAIN 122: test-mrfoot ruling + B order)
