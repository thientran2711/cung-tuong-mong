# rvbot: life-bot A/B harness (review balance-core-r3, reviewer session_01964izGMDXZAV9nnY7QGK4P)
Compares main against a branch on the same seeds; method used in reports/review-balance-core-r3.md.

- run.sh `<main|br> <seed> <lives> <capSec>`
  - env: BR (branch worktree, also supplies runb.js/inpage6.js/inbc.js), MAIN (main worktree), OUT (output dir).
  - Uses HHSTOP=1 and adds INP2 indt.js.
  - Output: OUT/life-<arm>-<seed>.json (written after every life, so an OOM-killed run keeps its finished lives) and log-*.txt.
  - Seeds used in r3: 21–25 per arm.
  - Run ≤4 processes at once: renderers grow to ~3 GB.
- indt.js (in-page tracer):
  - Accessor on S.danh; each change is keyed by context (card / talk / scheme / dialog option) plus call frames.
  - Monthly row `me=[t,sac,tai,tamco,duc,danh,sung,rank,maxArtRaw,artSum,maxBậc]`, attached to EVERY life, HH-STOP included (inbc's `bc` row is not).
- table.py: before/after table plus the per-origin table (env OUT).
- agg.py `<arm> <files…>`: Danh gained before m36 per life, by source (env MAIN/BR to map index.html lines back to dev/build files).
- ladder.py: first month an art reaches bậc 3 / bậc 5, and Danh gain/loss per life (env OUT).
- Data and shots never go in git.
