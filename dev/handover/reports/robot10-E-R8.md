PRIORITY #1 CHECK: OD 1 (23/11 ~19:20Z ROBOT PLAYTEST) | main dev/measure/robot10*.js | review/robot10-e-fix-2(-r3m) harness fixes used | claims: E runner R8.
# ROBOT-10 R8 (Foreman E) — origin bd, roads bd_tuyet then bd_hen — DONE
100 lives (10 bots x 5 kiếp per road). Saves stay on the R8 box (/home/user/wt/out-R8*, SAVES_NOT_IN_GIT); two-three single saves are on review/robot10-saves-r5.
| road | lives | game sha / harness | bug rows | file |
|---|---|---|---|---|
| bd_tuyet | 50 | main 14ba8768, main harness | 94 (many tab-variant dupes) | robot/bd-20261124-0256-R8-bd_tuyet.md |
| bd_hen c1 skilled,random | 10 | 14ba8768 + E-FIX-2 r1 | 21 | robot/bd-20261124-0921-R8-bd_hen-c1.md |
| bd_hen c2 cautious,schemer | 10 | same | 22 | robot/bd-20261124-1036-R8-bd_hen-c2.md |
| bd_hen c3 lazy,rebel | 10 | 9e89619a (fix-2 r3m) | 11 | robot/bd-20261124-1154-R8-bd_hen-c3.md |
| bd_hen c4 scholar,lover | 10 | 9e89619a | 15 | robot/bd-20261124-1351-R8-bd_hen-c4.md |
| bd_hen c5 speed,greedy | 10 | 9e89619a | 8 | robot/bd-20261124-1551-R8-bd_hen-c5.md |
Rates: robot/rates-20261124-0851* (bd_tuyet), robot/rates-20261124-1721* (bd_hen, 50 lives).
## Findings (both roads)
- NEW candidates: no-ending at wall cap 1800 s at rank 3-7 (bd_tuyet 11, bd_hen ~24 lives; skilled/cautious/lover/scholar/greedy/rebel/lazy bots) + TIMEOUT (bd_tuyet 7, bd_hen 3 incl. 2 after fix-2 r3); econ-card TypeError null.queen (bd_tuyet, 1 life); stats danh/duc/sac/tai out of range (bd_tuyet, bd_hen c1/c2); forced road not played (bd_tuyet speed-2); real-page TypeError «reading '1'» fold+ipad on every non-speed life of bd_hen; real fold page memory leak (c4); ipad act tab text cut span.j59t (c4).
- KNOWN: bot-page mem leak, «Sang ngày mới» stuck after load, save round-trip diff, tab lag, mspot/kmrow overlaps and text-over-text.
- FALSE positives on r1 harness: «Sủng ±n» vs applied sung (gone on r3m).
- Harness-only: chunk 1 first attempt killed by the 30-min background limit (rerun with 2 h); c4 lover-5 «Target page closed».
- bd_tuyet saves for the fixer: review/robot10-saves-r5 R8-cautious-3 / R8-skilled-2; bd_hen R8-hen-skilled-1.
