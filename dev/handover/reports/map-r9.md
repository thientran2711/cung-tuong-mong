# map-r9 — MAP-R9 worker for MAIN (27/11)
PRIORITY #1 CHECK: OD 26/11 ~18:35Z icons + ~18:50Z gate | main LIVE 4cfcda61 | review/map-r8 f67cf0a8 | claims MAP-R8 (rolled to R9).

Branch review/map-r9: 799f5c2c merge LIVE 4cfcda61 (assemble list = LIVE + jplink; KIT_REQUESTS both kept; built files rebuilt) + f95131f1 the #kshR cover fix.

## Fix (one place, law 9/11)
- j38.js `mapFreeRect(sc)`: scroller box minus the REAL boxes of #krail, and of #kshR children (wide row or bottom box = band above/below on portrait; narrow side box = column, incl. the portrait courtyard's right column). Measured, never typed.
- mapFit: tag solver viewport + «no tag cut at open» use it (before: whole scroller). jmapz zone fit + centring use it.
- jk2b.js: `span.md.kfc .kin>img.kfr{pointer-events:none}` (decor frame never takes a tap).
- Scroll extents already end at the free edge (map margins from the real rows, flex margins count).
- dev/test/map-cover-scan.js: (a) night/overview helper now leaves a zone with `mapzGo(null)` like the back button (before it kept the last zone zoom = false faults); (b) at the 4 scroll corners only points INSIDE the free rect count (the band under an opaque card row is covered by design, panning clears it); (c) NEW per-tag REACH pass: every tag is panned to the free-rect centre and hit-tested (covered / unreachable = fault). Open view keeps the strict whole-scroller test.

## Before / after (map-cover-scan, Fold 755x1000 + iPad 1180x820)
| build | faults |
|---|---|
| LIVE 03a8c17c (old scan, from r8 report) | 6 |
| r8 f67cf0a8 / merged LIVE 4cfcda61 (old scan) | 18 / 18 |
| r9 with OLD scan semantics at corners, before reach pass | 11 (all scroll-corner, tags under card rows while panned) |
| r9 final (new scan) | 0 |
Honest note: 18→15 came from the fix itself; →11 from the scan artifact fix (zone zoom left over); →0 only with the corner/reach semantics above (a tag under an opaque row at a pan corner is reachable by panning). Edge-cut «Tây/Đông lục cung» Fold night: labels-scan PASS (cut = none).

## Re-runs on f95131f1
map-icon Fold+iPad exit 0 · map-zones PASS · map-labels PASS (Fold + iPad day/night/courtyards) · map-family overview 14 tags / 28 places, zones nv/ht/dlc/tlc/ty, home maps 9 = r8 · kitPick 21/21 = LIVE, kitHand 0 · quickcheck: run 1 + run 2 perf PASS (render 180/186, 175/149 ms; tab 370/424, 379/435; buổi 951/974, 823/959; tasks>200ms 18/19, 18/20; old save ok); each run FAILS only core gate G4 80-dialog-fixed (kit-dialog-2 a, Tốn/Được cell) = same fault as LIVE (pre-existing, not map). Run 3 was killed by the 30-min background limit (not completed).
Not covered: home map face chips `.mfaces` over next tag name (pre-existing, r8 notes).

## Stills @2 (looked): CDN img/_review/map-r9/ — fold-1-night fold-2-zone-nv fold-3-courtyard fold-4-home fold-5-day · ipad-1-night ipad-2-zone-dlc ipad-3-courtyard ipad-4-home ipad-5-day (.png). Base https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r9/<name>.png
