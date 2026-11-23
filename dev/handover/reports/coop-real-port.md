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
