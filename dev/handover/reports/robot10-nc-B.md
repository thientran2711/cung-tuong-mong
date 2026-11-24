# robot10 nc RUNNER B (sonnet) — report
START_CTX ≈ 8 % (estimate), rollover at ≈ 33 %, ceiling 60 %.
PRIORITY #1 CHECK: brief D-robot10-nc-runner.md; harness = review/robot10-harness-rv merged locally (not on main); prior bug file nc-20261123-2308.md (35 rows).

## Round 1 (LIVE bba42773 + harness)
| road | lives | status | bug file |
|---|---|---|---|
| nc_tuc | 20/20 | done (1800s cap on 8 lives, TIMEOUT stall on 4 [lazy x2, speed-1 early at 9 buoi]) | dev/handover/robot/nc-20261124-0057-tuc.md (36 distinct rows; results+saves in dev/handover/robot/nc-B-tuc/) |
| nc_vuong | 20/20 | done (62 distinct rows; wall-cap 5 lives, TIMEOUT: lazy-1, speed-1 at 27 buoi, speed-2 at 2 buoi) | dev/handover/robot/nc-20261124-0354-vuong.md (results+saves in dev/handover/robot/nc-B-vuong/) |

## nc_tuc new vs nc-20261123-2308.md
- JS: `econ card TypeError: Cannot read properties of null (reading 'queen')` (cautious-1) — NEW real crash
- stat out of range (101): tai, sac, tamco NEW (danh, duc already known)
- ui-cut span.j59t [ipad act]; ipad buttons overlap mspot.off x mspot.sm, mspot x mspot.sm; fold rel p.past x p — NEW UI
- CORS fetch to ctm-rank worker on localhost — harness false positive (not a game bug)
- Not reproduced this run: harness nc_su row, Bạc +/- option-text mismatches (only Sức +6 / suc=-2 remains), HUD Sức 87 vs 90.
Round NOT clean.

## nc_vuong new vs nc_tuc
- econ card `null.queen` TypeError REPRODUCES on nc_vuong -> confirmed real game crash, both roads.
- NEW UI family (fold, every tab: go/act/court/rel/kid/inv/art/story): text over text in the kbk-* kit block: span x small.kbk-ts, span.kbk-ls x span.ef.n, div.kbk-rh x div.kbk-rh (27 rows) + rel/kid `#panel > p.past` x b.kname/span.kti, em.pcs x span.kfoc-sayn. Fix as one family (kit part kbk).
- ipad tab-switch lag >400ms, fold button.mspot x mspot.sm overlap also seen.
- Early stalls: speed bot TIMEOUT at 2 buoi (nc_vuong speed-2), 9 buoi (nc_tuc speed-1), 27 buoi (nc_vuong speed-1) -> softlock in first buoi; lazy-1 stalls both roads (spyQueen/dilemma loop @home, see bug row 'life stuck').
Rates: dev/handover/robot/rates-20261124-0627.md (+csv). Round 1 DONE: 40 lives, NOT clean.
