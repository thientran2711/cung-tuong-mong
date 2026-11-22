# coop-one-world flake (quickcheck G4, 50-coop-one-world seed 3 "guest week changes the world", R.evm ×1)

PRIORITY #1 CHECK: OD n/a (flake ticket) | main LIVE b55a0e1c dev/test/coop-one-world.js + dev/tools/quickcheck.d/50-coop-one-world.sh | sibling family scan already on main: dev/test/timer-wait-scan.py (fixed-timer waits; does NOT cover wall-clock budgets) | game's own determinism switch window.__agAll (jagent.js:187, jagday.js:133/145) already used by ag-*.test.js | review/* none on this topic | CLAIMS row by Foreman B 22/11 11:04Z.

Worker: session_01N1tNP5NvgmvUdQD8GT9aXH (opus). Branch: review/coop-one-world-flake (base LIVE b55a0e1c). Verdict: **TEST TIMING ISSUE + a compare bug in the test; NOT a one-world bug.** No game code changed.

## Cause (two parts)
1. **Not replayable under any CPU.** The probe seeds Math.random, but the NPC agents decide in 3 ms wall-clock slices
   (jagent agSlice / jagday agLzRun, `BAL.ag.perf.slice=3`, performance.now()). What is left waits for a setTimeout(0) frame that the
   probe's one sync page.evaluate never yields, so HOW MANY NPCs decide each buổi depends on CPU speed. Same SEED=3 ⇒ a different week
   every run: LIVE idle 20 runs = 20 distinct outcome tables, LIVE under load 20 runs = 20 distinct (md5 of check-1 table per run).
   Load only shifts which rare branch a run lands in.
2. **The compare misread an empty own map.** `OWN=/…(rl|ro|gp|ep|evm)\./` skipped those maps WHOLE, but flat() writes an EMPTY map as one
   `'{}'` leaf `.R[#id].evm`, which the regex does not match. evm is the only one of the five that toCanon can leave empty (rl/ro/gp/ep
   always get `[pid]` written). So an NPC whose evm was `{}` at base and who found proof on HER during her week (`evm[902]`, her own
   row by the one-world rule, jcoopworld.js:8) reads as "R.evm changed" = the seed-3 flake. guestNet itself is right (unrollR keeps
   only her pid key, unrolls the rest). Seen live: load-10 has `R.evm 1` in check 1 (raw roll) — the same leaf.
   The same regex also hid a real gap: an NPC's proof on ANOTHER NPC (`evm[npc id]`, world data) was never checked.

## Fix (dev/test only)
- coop-one-world.js: `window.__agAll=1` for the seeded run (restored after) — the game's own switch, every slice at once, CPU-independent.
- coop-one-world.js: OWN now skips only the empty-map leaf of the five maps; every key inside is compared (her pid keys skipped by PID).
  This TIGHTENS the assert (NPC-on-NPC evm now checked). Added a compare self-check (fails the gate if the rule regresses).
- time-spill-guard.js (core gate, same family: seeded + turn engine): `window.__agAll=1` in the seed step.
- new dev/test/budget-race-scan.py (LAW 11 scan): flags seeded tests that run the turn engine without __agAll; exit 1 on a core gate.

Compare rule, before/after (node, the test's own flat/skip):
| case | old | new |
|---|---|---|
| own: evm {} → {902:2} | FLAGGED `.R[#5].evm` (false fail) | ok |
| own: evm {902:1} → {} | FLAGGED (false fail) | ok |
| world: evm {} → {41:1} | flagged only as `.R[#5].evm` | `.R[#5].evm.41` |
| world: evm {7:1} → {7:1,41:1} | MISSED | `.R[#5].evm.41` |

LAW 11 family table (`python3 dev/test/budget-race-scan.py`, scope coop-*.js + core gates):
| file | before (LIVE) | after |
|---|---|---|
| coop-one-world.js (G4) | CORE flagged | fixed |
| time-spill-guard.js | CORE flagged | fixed |
| coop-host-lag-scan.js | flagged | ok, not a member (endTurn months run unseeded into one snapshot both seats load; seeded part = face picks) |
| other coop-*.js | 0 | 0 |
| TOTAL | 3 (2 core) | 0 |
`--all` (every dev/test/*.js): 49 non-gate probes still flagged (dress*/night-steal*/pets/world_check…) — report only, not gates, outside this ticket.

## Runs (seed 3, 4-core box; load = 4 lanes in parallel + 4 busy-loop burners, load avg ~18)
| build / test | runs | PASS | distinct outcomes |
|---|---|---|---|
| LIVE test, idle | 20 | 20 | 20 |
| LIVE test, load | 20 | 20 | 20 (one with the R.evm leaf in check 1) |
| fixed test, load | 10 | 10 | 10 (still not replayable: see OPEN below) |
Forced-budget sweep on LIVE (BAL.ag.perf.slice=0 / __agAll, seeds 1–10): 12/12 PASS (stopped early: part 2 already explains the fail).
Gates on the branch: quickcheck hook 50-coop-one-world (seeds 7+3) PASS · time-spill-guard PASS (79 checks, 0 bad) · budget-race-scan 0 flagged · timer-wait-scan 24 (unchanged, no new waits). No game file changed, so coop-e2e / one-core / role-parity are not affected (not re-run).

## OPEN (report only, for Foreman B — wider than this ticket)
Even with `__agAll` and a virtual clock (Date.now/performance.now replaced inside the evaluate) the SAME seed still gives a different
life: `ser()` right after start() already differs between runs (S.arts, S.fseen face picks `face-consort-12` vs `@W24`, staff fid,
S.st.ch.pool order), also after waiting for readyState 'complete' + figxReady(). A Math.random call-site trace (3000 draws) is
identical up to draw ~1820, then gmTick/agPw sees a different set of people. So some RNG draws depend on ASSET/DATA LOAD timing
(face/fig picks that branch on what has loaded), not on CPU budget. Effect: every seeded probe that boots the page (the 49 above +
these two gates) is not replayable; the SEED only fixes the stream, not the life. Not a co-op bug; the fixed compare is what keeps
the gate honest. Suggested follow-up ticket: find the load-dependent pick (start with face picks feeding S.fseen) and give probes one
'assets settled' wait, then re-run budget-race-scan --all.
`__agAll` is kept: it removes the CPU-budget source (acts per run spread 77–96 → same code path on any CPU), cheap and safe.

## Handover
Done; nothing left. Scratch logs /home/user/wt/cowf-logs (not in git).

## REVIEW r1 (reviewer sonnet, SMALL, 22/11) — PASS f4cb9ceb118163c774e2c583b0a3fbb8fe5421f5
PRIORITY #1 CHECK: ticket FROM MAIN 105 10:09Z | main LIVE b55a0e1c | review/coop-one-world-flake f4cb9ceb is already on top of LIVE (FF, no merge needed).
1. Diff = dev/test/coop-one-world.js, time-spill-guard.js, budget-race-scan.py (new), this report. NO game file (dev/build, BAL, save, co-op runtime). SMALL confirmed.
2. Tighter, not looser. Mutation: guestNet (dev/build/jcoopworld.js, reverted after) writes evm["41"] (NPC-on-NPC) on an NPC that already has evm keys, seed 3.
   New test: FAIL ("guest week changes the world", R.evm 8). LIVE old test: PASS (miss, the old regex skipped evm.* whole). Mutation on an NPC with EMPTY evm: both fail (the '{}' leaf), as expected.
3. Runs on the branch build, seed 3, 4 cores: coop-one-world idle 10/10 PASS; under load (4 parallel lanes + 4 busy loops) 10/10 PASS; quickcheck hook 50 (seeds 7+3) PASS; time-spill-guard PASS (79 checks, 0 bad).
4. LAW 11 scan real: budget-race-scan 0 flagged (core 0) of 97; on LIVE, coop-one-world / time-spill-guard have no __agAll (flagged), coop-host-lag-scan allow-listed with a valid reason (endTurn unseeded, only face picks seeded).
5. LAW check: no law touched (test-only). OPEN item (asset-load-dependent RNG) accepted as follow-up for Foreman B, not a blocker.
