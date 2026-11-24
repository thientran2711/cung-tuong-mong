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

## Road cnv_ban — running (out-R3-ban), report when done.
## Rollover: none yet. Foreman E session = session_01DgYSWm2Gu8SUSJpayKmy6E.
