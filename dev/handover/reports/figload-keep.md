# figload-keep report (branch review/figload-keep)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | origin/main 0 | review/* only review/sideline-dlg 3fb17db4 (the fix) | archive 0. Reused 3fb17db4 by cherry-pick; added only the one missed loader (jty).

## What changed
- Cherry-picked 3fb17db4 onto origin/main 502c48c9. Conflict only in generated index.html/sw.js (took main's, rebuilt). No sideline-dlg-only hunk was involved.
- Law 11 scan of every `setInterval(..., 300000)` loader (grep `300000` over dev/build/j*.js): found one more loader that wipes its index: jty `tyLoad` (img/FIGURES-ty.json). Fixed: an empty/failed refetch keeps TYF.ix.
- dev/test/figload-keep.js extended: also checks TYF.ix, expects >= 7 caught timers, waits for FIGXR/TYF before the "before" read.

## Scan table (before = origin/main, after = this branch)
| Loader (file) | Refetch failure before | After |
|---|---|---|
| loadFigs (j39) FIGS | wiped 3492 -> 0 | kept |
| kidLoad (j73) KIDIX | wiped 48 -> 0 | kept |
| figxLoad (jfigx) FIGXR | wiped 74 -> 0 | kept |
| htLoad (jht) | wiped | kept |
| kcFigLoad (jkc) KCFX | wiped 84 -> 0 | kept |
| kcgHyLoad (jkcg) KCHY | kept already | kept |
| load (jfighd) KFHD.map | kept already (assigns only on success) | kept |
| tyLoad (jty) TYF.ix | wiped 84 -> 0 on 404/empty | kept (new in this branch) |
Other setIntervals (UI/FX/co-op/rank queue) fetch no index/list. No other timed list loader exists.

## Tests
- Bare main + new test: `node dev/test/figload-keep.js` -> FIGLOAD KEEP: 14 FAIL (FIGS 3492->0, KIDIX 48->0, FIGXR 74->0, KCFX 84->0, TY 84->0).
- Branch: no args -> ALL PASS (25 ok); with arg (`node dev/test/figload-keep.js fold`) -> ALL PASS.
- Shots (forced fetch reject after load, then loaders re-run; FIGS still 3492): Fold 755x1000 shows the full-body figure + portraits; iPad Air 1180x820 shows the Luan hoi picker with all scene paintings. (Shots not in git.)
- quickcheck: see last lines below.
