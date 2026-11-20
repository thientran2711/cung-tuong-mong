# rv-role-parity-drift-kyngo — reviewer E23r (sonnet)
PRIORITY #1 CHECK ('role-parity|P-ONLY|N-ONLY|onlyRisen|snapW'): OD 1 | ledger 0 | claims E23 (done) | main dev/tools/role-parity-scan.js | review/role-parity-drift-kyngo 41d620a5.

Worker sha reviewed: 41d620a5. Final-merged LIVE origin/main 66bd36cd (moved past 716be762). Result sha: see push (merge only).

**VERDICT: PASS** (probe-only; no game code, so no device shots).

## Checks
1. Diff: `git diff --stat origin/main` after final merge = dev/tools/role-parity-scan.js only (+25/-3). No game code, BAL, open/exempt list change; OPEN_MAX untouched.
2. Cause honest: «proof» world writes the NPC doer's proof into her own a.evm; snapW restored t.ev (her side) but never evm, so an NPC's proof leaked into later worlds. snapW now keeps evm (restored via Object.assign). Matches the worker's trace.
3. «proof-foe» world: records one real wrong per target first (deedAdd «bày mưu», cap 3; law 6a), then proofs + doer's own grudge/ill regard toward targets, doer→target only, every field in UNDO. Same for her and an NPC. Closed rows (cx3:tell, hh:judge) are reachable in real play: an NPC tells/judges only from proof + grudge (jagacts3 evG>0 & agSpite>0; AGHHG evG>=BAL.ag.ev.judge & rel<0), both states a real game produces; her side is the same card, now unlocked by a real wrong. No row closed by forcing a gate; no new exempt. HA.gv++ is only a cache-bust key (jagharm haOpts).
4. data-pct skip: person-card group tab (navigation); every group's buttons are still read.

## Gates (on LIVE 66bd36cd + branch)
| gate | result |
|---|---|
| role-parity.test ×2 | ALL PASS both, outputs byte-identical (md5 1166db5e…) |
| kyngo-eq | PASS (eqTol 1.25) |
| kyngo-unit | PASS |
| one-core-guard | PASS (fails 0) |
| quickcheck | PASS · old save ok · render 203/226 · tab 435/385 · buổi 1125/3275 · core gates PASS |
| role-parity-drift2-play | **2 FAIL** («A her: tapping it founds the faction», «A NPC: cx3:facFound / AGRUN founding») — **identical 2 FAIL on plain LIVE 66bd36cd**, so NOT from this branch (probe file is not used by that script). Faction founding (facAct "lap"/par3fac) is a LIVE regression or draw flake → FOREMAN E should assign it separately. |

## Notes (not gates)
- social/malice/disfavour/seen worlds still leak oán/regard to both sides (symmetric; flagged by worker; not a gate).
- drift2-play red on LIVE predates this branch; not a blocker for this probe fix.
