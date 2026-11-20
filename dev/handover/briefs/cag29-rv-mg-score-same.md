PRIORITY #1 CHECK: OD 20/11 ~06:50Z (owner bug: plays look 'đạt hết', result 9/10) + ~07:35Z (only broken grading fixed, no board retune) + ~07:15Z(c) («n/10» chip + amber clock approved → MAIN kit keeper review/kit-mark) | main dev/build/jmgt.js mgGrade/mgPace, kitGameClock (KIT §13) | review/mg-score-same c07604e0; review/kit-mark (MAIN, based on mg-score-same) | claims: wk session_01Rc5AsMwgUZdbs4boL9VMtH
# REVIEW mg-score-same (BIG, opus — scoring path in 31 engines) — Foreman C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d

## READ FIRST
- Handover branch claude/cung-tuong-mong-handover-hj0h8w: dev/rules/START_CORE.md (★ THE 18 LAWS block first) + START_WORKER.md + START_REVIEWER.md; dev/handover/briefs/cag28-mg-score-same.md (in full) + reports/mg-score-same.md; dev/kit/KIT.md §13 + KIT_REQUESTS.md; VANPHONG.md.
- branch: dev/build/jmgt.js (mgLive, mgGrade, mgPace), every engine family file the diff touches, dev/measure/mg-bots.js.

## TARGET
review/mg-score-same c07604e0. Claimed: one helper jmgt mgLive = graded mark in hand (ends = result exactly) used by all 31 engines' HUD/bots/tests; board = given mark 31/31 (before 13/31); round pop turns gold when that round was time-cut; no BAL change, no UI/kit change (solo PHẦN row stays hidden per owner 17/11 — never un-hidden); time-window numbers = proposal only (HOLD); 2 KIT REQUESTS filed (mark chip «n/10» beside kitGameClock, amber clock) — built by MAIN's kit-mark, not here.

## CHECK (FAIL on any)
1. Law 4: ONE grading path — the live mark and the result call the same function; grep for any engine still computing its own shown number.
2. Whole family (law 11): all 31 kinds covered; reproduce the before/after table (shown vs given) with mg-bots.js; all-hit normal-speed run gives what the board said.
3. No BAL value change (git diff origin/main..c07604e0 -- dev/build/jbal*.js empty or display-only); no kG/pace retune (owner ~07:35Z).
4. No new private UI part (law 9): gold pop uses existing kit pop styling/tokens; PHẦN row not un-hidden (law 16).
5. MAIN FYI fast windows: xa 0.8 s, kim 0 — say whether grading there is a real fault; if a real fault and unfixed, FAIL with the fix; if not a fault, note it.
6. LOOK (law 12): Fold 755x1000 + iPad 1180x820, 3 kinds incl. one with a time cut (gold pop visible), look at each.
7. Tests: assemble + build_site, ag-mgcal, ag-mg2, mg-skip, mg-noword-a/b if on main, kit tests touched, quickcheck incl. old save. Pre-existing main FAILs listed separately.
8. Compatible with review/kit-mark (MAIN's, based on this branch): note conflicts if any.

## IF PASS
Final-merge NEWEST origin/main (git ls-remote origin main) into review/mg-score-same-rv (from the target), rebuild index.html/sw.js if needed, rerun tests, confirm `git merge-base --is-ancestor origin/main <final>`. Push review/mg-score-same-rv only.

## VERDICT
dev/handover/reports/rv-mg-score-same.md (handover branch; python-script edit; fetch-reset-reapply on reject; never rebase). send_message C-AG #29 session_01Rc5AsJ8GMpdM1fyxzYaf1d "PASS <final sha>" or "FAIL <sha> <n fixes>" (+ list; fixes go to wk MwgUZdbs). Never push main, no PR. Fetch with '+' refspecs under flock /home/user/wt/fetch.lock, --depth=30; sparse worktrees; never full-clone. Rollover: START_CTX % + 25 % (ceiling 60 %) → handover in the report, tell C-AG #29.
