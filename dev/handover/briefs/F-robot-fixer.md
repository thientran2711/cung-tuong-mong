PRIORITY #1 CHECK ('robot-fix|robot fixer|R3.md|R4.md|robot10'): OD 2 | ledger 0 | claims 8 | main 5 | review/* 10 | archive 0 — reuse: D's nc fixes already on main (robot10 nc-fix save drift j24.js:94, j8.js:28, jemo.js:157, jdfv.js:84; review/robot10-nc-fix-1/-2 + reports/robot10-nc-fixer.md), E's fixer triage reports/robot10-E-fixer.md, harness dev/measure/robot10*.js.

# ROBOT BUG FIXER — cnv families (opus; save/time core) — Foreman F #2 session_01UV1Szk1htSVo3vfJftFhGY

Read first: dev/rules/START_CORE.md (18 LAWS at top; every fix keeps them, esp. 4 ONE CORE/BAL, 7 wording, 9 KIT FIRST, 11 FIX THE WHOLE GROUP) + dev/rules/START_WORKER.md, branch claude/cung-tuong-mong-handover-hj0h8w. Sparse worktree under /home/user/wt; fetch --depth=30 with explicit refspec under flock /home/user/wt/fetch.lock; never full-clone, never git pull.

ORDER FROM MAIN 119 (24/11 07:40Z, verbatim): "ROBOT BUG FIXER (opus; save/time core): fix the top families from Foreman E's robot files dev/handover/robot/cnv-20261124-0256-R3.md + cnv-20261124-0705-R4.md: (1) save→load→save differs (S.logs) 50/50 lives; (2) Fold load stuck on «Sang ngày mới» 11–14/50; (3) «Bạc +8» shown vs bac=20 32–40/50 (law 4 one core); (4) bot-page memory leak 28/50 (harness or game — find out). Law 11 whole family + scan + before/after table; tests + quickcheck + old save + coop-e2e both seats; review/robot-fix-cnv; LAND READY here (BIG reviewer you open)."
FROM MAIN 119 07:40Z to E (verbatim): "ROBOT bug families (save round-trip diff, Fold «Sang ngày mới» stall, «Bạc +8» vs bac, bot-page leak) MOVED as one whole job to FOREMAN F (idle) → keep your fixer seat for other families only; send any new robot files' links to F too."
Owner rule (OD ROBOT PLAYTEST, 23/11 ~19:20Z, part, verbatim): "những cái lỗi về cái quá trình mà chơi, lỗi tính năng nè, lỗi luật và số nè, nó cộng sai số nè, hoặc là lỗi lag game nè ... Tất cả các cái lỗi, bất cứ cái gì có trong game mà có lỗi là phải báo về đó."

INPUT: dev/handover/robot/cnv-20261124-0256-R3.md + cnv-20261124-0705-R4.md (+ .json); the SAME four families also show in thd-…-R1-partial, pf-…-R5/R6, bd-…-R7 files — use them as extra evidence (fix once for all origins). Foreman F forwards new robot files.

OVERLAP — read first, do NOT duplicate:
- E's fixer (session_01DgYSWmGEnSrXt1ri867YPN, reports/robot10-E-fixer.md) owns: econ card null.queen, harness number rows / kbk overlap / «Bỏ cuộc?» TIMEOUT, stuck mini-games, stat clamp. It was also handed «shown gain ≠ applied gain» (Sủng/Sức, R5) — that is the SAME family as (3) «Bạc +8» and per MAIN 07:40Z it is YOURS: send_message E's fixer once that you take the whole shown≠applied family, and say so in your report.
- D's nc fixes (save drift) are already on main: start from newest origin/main, re-measure first; fix only what still drifts, extend their code, never a second mechanism.
- «Sang ngày mới» stuck: review/fix-evening-softlock landed (14ba8768) — check whether the Fold stall is the same path or a new one.
- Memory leak (4): first decide harness vs game (reports/robot10-lag.md, review/robot10-lag); harness → fix in dev/measure only (test-only); game → fix the leak family.
- Any visual part missing from the kit → STOP that row, file in dev/kit/KIT_REQUESTS.md, tell Foreman F.

DO:
1. Triage table first in dev/handover/reports/robot-fix-cnv.md (row → family → game/harness/owned → plan). Push it.
2. Per family: scan script + before/after table (law 11). Branch review/robot-fix-cnv from newest origin/main (one branch; split into -2 only if unrelated and big). Build python3 dev/build/assemble.py + dev/site/build_site.sh; run dev/test quickcheck + tests touched + old-save load + coop-e2e BOTH seat orders; re-run the robot on one cnv branch (5 lives, dev/measure/robot10.js) to show the four rows gone.
3. Ready → push, SSK line + sha in your report, send_message Foreman F. F opens the BIG reviewer. Stay on call for FAILs and new robot files.
4. Rollover: START_CTX % + 25 % of the window (ceiling 60 %) → handover in your report, tell Foreman F (F opens your successor).
Never push to main; no pull requests. Keep context low: tail/grep big files, never cat logs.
