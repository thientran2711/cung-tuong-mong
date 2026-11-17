PRIORITY #1 CHECK ('bisect|merge differs|50-coop-one-world'): OD 1 | ledger 0 | claims 8 (this order = CLAIMS row "BISECT G4 …", D; NOT the same as Foreman B's coop-b1-regress laydo/takeaway session_01N1tNP6usJ5fWhrv4JU1m4R — read its row, do not overlap) | main 2 (dev/test 50-coop-one-world, quickcheck G4) | review/* 0

# BISECT quickcheck G4 50-coop-one-world "merge differs from the host" (D10, 17/11 ~17:45Z)
Worker session_01964izD7hcJWkGEuNzDXbC7 (opus), order MAIN s34 ~16:26Z. START_CTX ~6 %; finished at ~12 %.

## Result
- Guilty change: **world-events r1** (C-AG), first on main at **abe056c3** (landed on main by ce29592e). Diverging field: **`S.wwin`** (7–8 diff paths per failing run, nothing else).
- Already fixed on main: **world-events-2 r1 e8b1906f** (live 16:20Z; also in today's newest main **086f1d6**). Current main passes 25/25 runs.
- mg-snap 2de320ac, trait-rename bbb3b4ca, staff-root 7e0250ec: **not guilty** (they only carry the abe056c3 code that was already on main).
- **The probe is FLAKY**: same SEED, different result run to run (abe056c3 seed 1: PASS, FAIL, FAIL, PASS, FAIL…). It is not a deterministic regression test (see "Why flaky").

## Root cause (S.wwin)
world-events r1 (dev/build/jworld.js, `S.wwin` = co-op WORLD key pushed into COOPW.X.W_KEYS) stored HER choice inside the shared window record: đại xá `start()` wrote `w.x.me = S.out && … ? 1 : 0` (and batch-2 windows kept `me` / `acc` in `w.x`). jcoopworld maps a `me` KEY to the seat's own pid, so the host copy and the guest copy of the SAME window differ → merge3 sees "host removed / ended it, guest changed it" and keeps the ended window → merged world ≠ host on S.wwin. It only shows when a run's life opens such a window, so it fires on some lives only.
Fix (already on main, e8b1906f, C-AG's own review r1 — whole family): her choice lives in her own `S.wwMe[w.id]` (personal, like S.wwSeen); đại xá card checks her own eligibility at the card; batch-2 person fields use the seat-translated names (mo→who, old/nw→from/to, t→tgt). No co-op code touched by me (owner 17/11 02:05Z: no co-op patching).

## Runs (each sha built with dev/build/assemble.py in its own sparse worktree; probe + merge.js from the same sha; seeds 1 7 3 2 11 42 rotated)
| sha | what | runs | FAIL | failing path |
|---|---|---|---|---|
| 25bfd7c | main before world-events (makeup-theme land) | 36 | 0 | – |
| abe056c | world-events r1 (first main sha with S.wwin) | 32 | 5 (all seed 1) | S.wwin 7–8 |
| 7e0250e | staff-root land (reported failing) | 31 (13 + 18) | 0 here | – (reviewers saw S.wwin here: staff-root reviewer 4/5 at seed 7, loading-words-2 reviewer 1×; same w.x.me code as abe056c) |
| e8b1906 | world-events-2 r1 (fix) | 24 | 0 | – |
| 086f1d6 | newest origin/main | 25 | 0 | – |
Logs: /home/user/wt/bisect-g4-logs (scratch, not in git).

## Why flaky (probe, not co-op code)
dev/test/coop-one-world.js seeds `Math.random` only. `j67 rnd67()` (arc picks) uses `crypto.getRandomValues` (dev/build/j67.js:10), and some code reads `Date.now()`, so every run plays a different life even with the same SEED; a bug that needs a particular world window (đại xá / vu cổ …) to be open only shows on some lives. This also explains "7e0250e fails for them, passes for me" and the "flaky G4" note in reports/toil-looks2.md.
Suggestion to the probe owner (test only): in the probe's init script also seed `crypto.getRandomValues` (and pin `Date.now`) so one SEED = one replayable life; and run more seeds (e.g. 6) in 50-coop-one-world.sh.

## Hand-off
- FOREMAN_C_STATUS.md (C-AG, owner of world-events): FIX REQUEST line = already fixed by e8b1906f, nothing to redo; optional probe seeding suggestion.
- FOREMAN_B_STATUS.md: coop-thin-b-r3 (blocked at b3d81c32 on S.wwin, reports/land-b-passes.md) → merge newest main (has e8b1906f) and rerun; staff-root / trait-rename / mg-snap are cleared.
- No fix branch made (the root fix is already live).

BISECT DONE: abe056c3 (world-events r1, C-AG) — her choice stored as seat-relative `w.x.me` inside the shared co-op world key S.wwin, so host/guest copies differ and merge3 keeps an ended window; already fixed live by e8b1906f (S.wwMe), main 086f1d6 PASS 25/25; probe flaky (crypto RNG not seeded) → C-AG (no action left) / Foreman B (coop-thin-b-r3: merge newest main)
