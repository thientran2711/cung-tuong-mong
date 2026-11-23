# coop-real-port report (worker for Foreman D #20)

PRIORITY #1 CHECK: OD 0, ledger 0; main has lib/coop-real.js + coop-setup-scan.js; coop-flakes landed (LIVE d1a36374) and merged; LIVE d2cc5679 merged too.

## Scan before/after (node dev/test/coop-setup-scan.js)
| | real | n/a | origin forced | RISK |
|---|---|---|---|---|
| before | 1 | 0 | 2 | 30 |
| after (merge with LIVE d2cc5679) | 30 | 1 | 2 | 0 |

Excluded (other worker): coop-pets, coop-guest-maid, coop-guest-men. coop-guest-agent.js is one page, no room: marked `coop-real: n/a` (scan learns the marker).

## What changed (test-only)
- lib/coop-real.js: ADDED waitReal, bothReal, bothLow, realize, weekGeneric (existing helpers untouched; merged with coop-flakes syncFr/PETK).
- 29 drivers: forced consort origin (host tt, guest dtq) + realize() = REAL check, running the driver's own merged week once if not yet real. thin-e, thin-e-net, week-lag, b1, r2, rev2 use {low:1} (driver never sets rank, rank stays below PAL_HEAD; each seat sees the other's real rank). No assertion weakened.

## Gates on the final merge (b4c12bb6830133b09d2ea788f5394b05dc08a8ed)
- coop-setup-scan: risk 0. coop-e2e: 141/141. quickcheck.sh: PASS (core gates PASS, 668 s).

## Per-driver runs (fails per run; r1/r2 pre-merge, r3 on LIVE d1a36374 merge; live2 = same driver on LIVE d1a36374)
Clean in r1, r2 AND r3 (0 fails): c4-stuck* (r3 1 fail, see flakes), cold-faction, craft-hand, cyhold, ge-npc, mg11-hand, palace-life, places, relms-both, thancan, thin-c-perf, thin-e-perf, thin-f2, thin-f4.
Clean ≥2 of 3 runs, remaining failures flaky: arrive-see (r2 1), thin-f3 (r1 1), thin-e (r1 1), thin-e-net (r1 1), week-lag (r1 1), thin-c (r1/r2 "C4: week merged once"; passed r3 after coop-flakes 1.5s hold), c4-stuck (r3 S4 "week merged once", 0 in r1, r2, live2).
Fail the same way on LIVE (pre-existing, not caused by port; same failing steps, counts r3 vs live2): b1 1/3, b2b5 6/7, cyc 12/12 (night / Kính sự phòng draws), p2 3/2, r2 18/16 (laydo / NPC takeaway steps), rev2 2/2, thin-d-probe 1/1, thin-d 8/8 (kit DOM-diff counters), thin-f1 1/1.
No driver fails on the branch that passes on LIVE, other than the flakes above (all re-pass). Game code untouched; these LIVE failures are for the owner of those drivers to fix. Logs: /home/user/wt/crp-logs (container, ephemeral).

## Handover
Done, no rollover needed. Worktrees to be deleted after push.

SẴN SÀNG KIỂM review/coop-real-port b4c12bb6830133b09d2ea788f5394b05dc08a8ed

## REVIEW D20 (reviewer, LIVE 81d76c8b merged)
PRIORITY #1 CHECK: brief D20-coop-real-port-review.md, worker report above, claims coop-real-port, LIVE bda5b75b → 81d76c8b (both merged; final merge FF-clean).
- Test-only: git diff --stat vs LIVE = 32 files, all dev/test (lib/coop-real.js only ADDED helpers; removed lines = the mk() signature lines re-added with origin forced). No game file, index.html/sw.js identical to LIVE. No assert removed or loosened; {low:1} is a justified rank check for drivers that keep the guest below PAL_HEAD.
- coop-setup-scan: 33 drivers, real 30 / n/a 1 (coop-guest-agent: one page, no room, marker justified) / forced 2 (coop-guest-maid, other worker; coop-thin-b-r1, unchanged) / risk 0.
- coop-e2e 141/141 (twice: LIVE bda5b75b and 81d76c8b merge). quickcheck PASS twice (core gates PASS).
- Ported drivers, 2 runs of 5: cold-faction 0/0, craft-hand 0/0, places 0/0, palace-life 1 fail in 1 of 4 branch runs (P3 flake; 0 on LIVE 3 runs), thancan flaky same on LIVE (LIVE: 4 and 2 fails, same T0/T1/T2 steps; branch 1,0,4,1,0).
- Pre-existing on LIVE, same step + same message: thin-d-probe (P6 withSeat round trip), thin-f1 (F1 real tap doAct result card): identical. b1: passes on branch, LIVE flakes at step 8.
LAND READY review/coop-real-port-rv 52ad65b3c7c1ad1fbc36c22b71cf6ef3a56caf6d
