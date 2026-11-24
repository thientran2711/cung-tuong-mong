PRIORITY #1 CHECK: OD 1 (23/11 ~19:20Z robot playtest) | main dev/measure/robot10*.js | review/* robot10-nc-fix-* | claims: R4 runner cnv.
# ROBOT-10 E R4 — origin cnv (LIVE 14ba8768, SEED 1, PAR 2)
## Round 1, road cnv_mat — done (50 lives, 249 min)
Bug file: dev/handover/robot/cnv-20261124-0705-R4.md · results JSON beside it · saves/ · rates-20261124-0705.*
Rows 59: ui-text-overlap 43, number 5, stuck 3, ui-covered-btn 2, ui-overlap 2, lag 2, mem 1, save 1. Crashes 0.
Top: #1 mem leak (28/50 lives, heap 139→1072 MB, DOM 1.7k→200k); #2 stuck after load «Sang ngày mới» no move, night flip S.nfX open (14 lives); #3 no ending within 1800 s cap (8 lives); #5 save→load→save differs S.visit.people.0.sk (50/50); #6 «Bạc +8» vs bac=20 (40 lives); #7 danh=101 (2 lives).
## Road cnv_ma — running (out /home/user/wt/out-R4b), will be appended.
## Road cnv_ma — done (50 lives, 239 min, old harness, SEED 1)
Bug file dev/handover/robot/cnv-20261124-1104-R4.md · results JSON · rates-20261124-1104.*; saves kept on runner box /home/user/wt/out-R4b/saves (not in git).
Rows 33: ui-text-overlap 16, number 5, stuck 3, ui-covered-btn 2, ui-overlap 2, lag 2, js 1, mem 1, save 1. Crashes 0.
Same families as cnv_mat: mem leak 29/50, post-load «Sang ngày mới» stuck 7/50, wall cap 5/50, TIMEOUT 1 (speed-4, modal «Bỏ cuộc?» empty opts at home), save round-trip diff 50/50, «Bạc +8» vs bac=20 32/50, stat 101 (duc/sac/tai).
ROBOT R4 DONE. No rollover needed.
