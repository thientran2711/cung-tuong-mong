# D20 — coop-flakes (opus, report-first; BIG co-op if a game fix is needed)
PRIORITY #1 CHECK ('stress round 3' / 'links moved'): OD 0 | ledger 0 | claims 0 real (only fuzzy hits) | main 0 | review/* 0 | archive 0 — first seen by rv F5fcyai6 on review/coop-guest-staff-rv3 40cc2b92 (reports/coop-guest-staff.md, end).

READ FIRST, in full: dev/rules/START_CORE.md + dev/rules/START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w), then only the dev/rules/topic files your task touches. All 18 laws apply verbatim.

TASK — two co-op test flakes, root cause first:
(a) dev/test/coop-pets.js «stress round 3: week merged» fails ~1 in 5 (guest pend:true, sent 4 vs 5). Base = review/coop-guest-staff-rv3 40cc2b92 (contains LIVE b238857f) — use it, it has lib/coop-real.js; if that branch is LIVE by the time you start, base on LIVE.
(b) dev/test/coop-guest-maid.js «her links moved to the world id» thiện cảm drift (rel 25 → −3), ~1 in 3 at the coop-guest-staff worker, 0 in 2 at the rv.
For each: run ≥5× on the base and ≥5× on LIVE; decide REAL GAME BUG vs TEST RACE with proof (log lines, file:line). Test race → fix the test (via lib/coop-real.js, whole family: scan every co-op driver with the same pattern). Real bug → fix the game, whole family (LUẬT SỬA CẢ NHÓM, scan + before/after table), law 1 two-way + law 6 real objects/people; one core (BAL) for any number.
Do not touch review/coop-guest-men (another worker is on jcoopask.js) — if your fix needs jcoopask.js, stop and report to Foreman D first.

GATES: the two tests ≥5× clean each, coop-e2e, coop-guest-maid, coop-pets, coop-famops-unit, one-core-guard, role-parity, quickcheck.sh (old save, perf). Memory tight: one browser test at a time.
DELIVER: push review/coop-flakes only (never main, no PR). Report dev/handover/reports/coop-flakes.md on the handover branch (fetch with flock /home/user/wt/fetch.lock git fetch --depth=30; checkout -f -B; append; push; never rebase): root per flake, scan table, gates, last line «SẴN SÀNG KIỂM review/coop-flakes <full sha>». Then send_message Foreman D (session id in dev/handover/FOREMAN_D_STATUS.md, newest PICKUP line).
ROLLOVER: at START_CTX % + 25 % of the window (ceiling 60 %) write a handover in your report and tell Foreman D; the coordinator opens the successor.
Work in a sparse worktree under /home/user/wt; never full-clone.
