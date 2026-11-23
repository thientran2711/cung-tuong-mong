# D20 — REVIEW coop-real-port (sonnet, SMALL test-only)
PRIORITY #1 CHECK: worker report dev/handover/reports/coop-real-port.md (handover 3dee2604) | brief briefs/D20-coop-real-port.md | main dev/test/lib/coop-real.js + coop-setup-scan.js | review/* review/coop-real-port b4c12bb6 (merged LIVE d2cc5679) | claims coop-real-port FXSeyvCr.

READ FIRST, in full: dev/rules/START_CORE.md + START_WORKER.md + START_REVIEWER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w), then only topic files your task touches. All 18 laws.

REVIEW review/coop-real-port b4c12bb6830133b09d2ea788f5394b05dc08a8ed — 29 co-op drivers ported to lib/coop-real.js (consort origin + REAL check), test-only.
1. If LIVE moved past d2cc5679, merge newest LIVE into review/coop-real-port-rv first; run gates on the merge.
2. TEST-ONLY: zero dev/build / game-file changes (git diff --stat vs LIVE; index.html/sw.js only if rebuilt identically).
3. No weakened check: compare each ported driver's assertions with LIVE (no removed/loosened asserts, no skipped steps). lib/coop-real.js: only ADDED helpers; existing helpers unchanged.
4. coop-setup-scan: risk 0 (real 30 / n/a 1 / forced 2) — check the n/a (coop-guest-agent) and 2 forced are justified.
5. The worker says b1, b2b5, cyc, p2, r2, rev2, thin-d-probe, thin-d, thin-f1 fail THE SAME WAY ON LIVE (pre-existing) — verify on at least 3 of them (same step + same message on LIVE vs branch); a driver that fails on the branch but not on LIVE = FAIL.
GATES on the merge: coop-setup-scan, coop-e2e, quickcheck.sh, ≥2 runs of 5 ported drivers of your choice. One browser at a time.
DELIVER: PASS → push review/coop-real-port-rv (FF of LIVE), write «LAND READY review/coop-real-port-rv <full sha>» in dev/handover/reports/coop-real-port.md (handover branch: flock fetch --depth=30, checkout -f -B, append, push, never rebase) and send_message Foreman D (session id = newest PICKUP line in dev/handover/FOREMAN_D_STATUS.md). FAIL → list in the report, send_message the worker session_01964izFXSeyvCrYfhAxY8EG and Foreman D.
ROLLOVER: START_CTX % + 25 % (ceiling 60 %) → handover in the report, tell Foreman D.
