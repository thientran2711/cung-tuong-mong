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
- quickcheck ALONE (`bash dev/tools/quickcheck.sh`, run once more after a first run failed on a truncated CDN assets.json download, not on the code): QUICKCHECK PASS · 213 s · open 2041 ms · old save ok · perf (median of 3, new/live): render 206/262 ms, tab 499/465 ms, buoi 1424/1522 ms, tasks>200ms 22/24 · core gates PASS.

## REVIEW r1 (small reviewer, review/figload-keep 935f52a6)
PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 (502c48c9 has none of it) | review/* sideline-dlg 3fb17db4 (reused by the worker) | archive 0.
LIVE did not move: origin/main = 502c48c9 is an ancestor of 935f52a6, so the MERGED head = the BARE head (no merge needed, index.html/sw.js already built by the worker).
Law checks: no UI/wording/number touched (laws 1-10 n/a); law 11 redone below; law 12 shots below; no custom UI.
- node dev/test/figload-keep.js (it takes no args; 'fold'/'ipad' args are ignored, device is fixed Fold) x3 -> "FIGLOAD KEEP: ALL PASS" each (25 ok: FIGS 3492, KIDIX 48, FIGXR 74, KCFX 84, KCHY 8, TY 84 kept after reject / 404 / empty).
- Existing tests touching these loaders, run on 935f52a6: fig-retry solo 755x1000@2 -> ALL OK (list 3492, KCDN.mretries 6, no page errors); fig-wiring (no arg + out-file arg) -> "PASS: 0 blanks", page errors 0; trung-y (url 755x1000@1) -> setup/dressed/confiscated/r0/r3/r7 sane, ok:true; mg-play2 (no args + args) -> "all 19 ok", no page errors. coop-pool-face needs the live co-op Worker: not touched by this diff, not run.
- Law 11 scan redone: git grep setInterval over dev/build/j*.js: 8 timed loaders (j39, j73, jfigx, jht, jkc, jkcg, jfighd, jty), table in the worker section is correct (jkcg/jfighd already kept; the other 6 fixed). All other setIntervals are UI/FX/co-op/rank-queue/poll-for-ready, none refetches an index. assets.json is read at start only (jload.js), not timed. One-shot manifest loader (jcdn.js, retries) is not periodic.
- GOOD refetch still replaces (own script, +1 row per FIGURES*.json injected): FIGS 3492->3495, KIDIX 48->49, FIGXR 74->75, KCFX 84->85, TY 84->85, no page errors.
- FIRST-LOAD failure (every FIGURES*.json aborted): no page error, game up, lists empty; after the files come back and the timers fire: KIDIX 48, FIGXR 74, KCFX 84, TY 84, FIGS 1296 (the periodic part; the rest of FIGS comes from the one-shot jcdn loader). Identical numbers on bare origin/main 502c48c9 -> not a regression. Note (accepted, small): j39 now needs all 3 lists non-empty to replace; if one of the three is unreachable on the very first load nothing loads until the next 5-min tick (before: partial list). Rare, small, self-heals within 5 min.
- Quickcheck ALONE: QUICKCHECK PASS · 263 s · open 2146 ms · old save ok · perf (median of 3, new/live): render 275/322 ms, tab 594/664 ms, buoi 1552/6755 ms, tasks>200ms 23/31 · core gates PASS.
- Shots after a forced failed refetch (fetch rejected, all 8 loaders re-run, FIGS still 3492): Fold 755x1000 and iPad Air 1180x820, looked 3x each, not in git. They show the first-run/title screens (picture-wait veil), full-width, no cut text, no overflow, no page error. Figures-in-game are covered by the numeric kept-list checks, not by a picture (limitation).
VERDICT: PASS.
