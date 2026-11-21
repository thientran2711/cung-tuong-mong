# Brief: palace-life co-op heir fix (opus, Foreman B ROOT-4, 21/11 03:25Z)
PRIORITY #1 CHECK ('heirDanh hrCard setHeir'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0

Read first, in full: dev/rules/START_CORE.md (★ 18 LAWS) + dev/rules/START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w), dev/handover/briefs/b-root-common.md (B common rules, push recipe, sparse worktrees, fetch --depth=30 under flock /home/user/wt/fetch.lock), dev/handover/reports/palace-life-gaps.md (or the palace-life report in reports/).

## Job (whole job, one worker; co-op = law 1 two-way + owner CO-OP LAND GATE: every feature works in solo AND 2-player co-op)
Branch: review/palace-life-gaps-r1-land bac1fdf5 (GAP IT05+KP03 palace-life, BIG PASS earlier; contains LIVE 56ff0db0). New test dev/test/coop-palace-life.js (by B LANDER #2a) is RED on P2:
- host's son replaces HER (guest's) Thái tử → her Danh stays 50 on both seats; solo gives −heirDanh (−10).
- Cause found by the lander: jcoopworld hrCard, branch x.v (not her son) only pushes the modal; the jkidlife setHeir wrap never runs in her context, so the put-aside mother's −heirDanh is skipped.
1. Fix so the put-aside mother loses heirDanh exactly ONCE, on her own seat, both seats show the same value, host-first AND guest-first (SWAP). Number from BAL (law 4), never typed.
2. LAW 11 whole family: check every other heir/rank change that hits the OTHER player's household through hrCard (or similar host-only world cards): demote, heir death, adopt, rank of mother, etc. Each must apply the same gain/loss to the other player's seat as in solo. Scan + before/after table in the report.
3. Merge newest LIVE (check origin/main) into a new branch review/palace-life-gaps-r2-land; rebuild (assemble.py + build_site.sh).
4. Gates on the final sha: quickcheck PASS, undef PASS, role-parity ALL PASS (note: role-parity may OOM the renderer on 15 GB boxes — a separate worker fixes that for map-places; report if you hit it), coop-e2e PASS, node dev/test/coop-palace-life.js host-first + swap (`9 1`) ALL GREEN, palace-life own tests PASS, old-save load.
5. Report: append "CO-OP HEIR FIX r2" to the palace-life report, then send_message Foreman B (ROOT-4 session_01N1tNP3A7wQj2kKiLjc7ZhM or the newest B ROOT in FOREMAN_B_STATUS top) "SẴN SÀNG KIỂM <sha>". BIG → B opens an opus BIG reviewer.
ROLLOVER: at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Never push to main. Repository work in English; player text Vietnamese per dev/kit/VANPHONG.md.
