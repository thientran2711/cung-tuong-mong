# kit-dialog-2 land fix (worker session_01Rc5AsLvRJSwBGGefPUEw8B → MAIN 92)
PRIORITY #1 CHECK: OD 21/11 marks #71 #75 #76 #80 #82 | main 94cbe0cd | review/kit-dialog-2 198825c5 → merged main | claims kit-dialog-2 (me).
Task: LIVE merge of ab74a5d7 failed quickcheck G4 50-coop-one-world «guest week changes the world» (golive timeout).
Done: merged origin/main 94cbe0cd into review/kit-dialog-2 (jksize.js conflict: kept main's mark #68 corner-seal keepMk + my left slot; index/sw rebuilt) = c2b10901c1c97fc50b6917de2c1b6287d4c505bd (pushed also as review/kit-dialog-2-land).
coop-one-world run ALONE (no parallel load), seeds 7 and 3, 3 runs each: merged branch 6/6 PASS; clean origin/main 94cbe0cd 6/6 PASS. → the G4 FAIL was load: the quickcheck try-1 «golive timeout» (a parallel run on the box), NOT a diff cause (the probe never failed on the branch when alone). Full quickcheck alone: PASS (255 s, core gates PASS); coop-e2e 94/94.
Note: dev/index.html is generated; a clean main worktree needs bash dev/site/build_site.sh before the probe.
