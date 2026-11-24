# robot10 nc RUNNER B (sonnet) — report
START_CTX ≈ 8 % (estimate), rollover at ≈ 33 %, ceiling 60 %.
PRIORITY #1 CHECK: brief D-robot10-nc-runner.md; harness = review/robot10-harness-rv merged locally (not on main); prior bug file nc-20261123-2308.md (35 rows).

## Round 1 (LIVE bba42773 + harness)
| road | lives | status | bug file |
|---|---|---|---|
| nc_tuc | 20/20 | done (1800s cap on 8 lives, TIMEOUT stall on 4 [lazy x2, speed-1 early at 9 buoi]) | dev/handover/robot/nc-20261124-0057-tuc.md (36 distinct rows; results+saves in dev/handover/robot/nc-B-tuc/) |
| nc_vuong | 0/20 | running | pending |

## nc_tuc new vs nc-20261123-2308.md
- JS: `econ card TypeError: Cannot read properties of null (reading 'queen')` (cautious-1) — NEW real crash
- stat out of range (101): tai, sac, tamco NEW (danh, duc already known)
- ui-cut span.j59t [ipad act]; ipad buttons overlap mspot.off x mspot.sm, mspot x mspot.sm; fold rel p.past x p — NEW UI
- CORS fetch to ctm-rank worker on localhost — harness false positive (not a game bug)
- Not reproduced this run: harness nc_su row, Bạc +/- option-text mismatches (only Sức +6 / suc=-2 remains), HUD Sức 87 vs 90.
Round NOT clean.
