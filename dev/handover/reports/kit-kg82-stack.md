# kit-kg82-stack — report (kit-mark; owner Fold shot via MAIN CHÍNH 82/83)

Branch `review/kit-kg82-stack` @ 50751774 (from LIVE b1033eb0). `bash dev/tools/quickcheck.sh 50751774` PASS (209 s, core gates PASS, old save ok, perf like live). mg-ui-rest 39/39, mg-noword-b ALL OK. `golive.sh` not run (classifier refuses).

## Owner shot
«Thử tay: Tài nghệ các môn» (jmgcal pick()), Fold: the long «Đã thử» row, the «Thử tiếp…» button and the «Hoặc chọn một môn» heading are drawn UNDER the kind-button grid.

## Cause
`.kg82 .kg82act{position:sticky;bottom:0;…z-index:2}` (jcui) applied to EVERY `.kg82act`. A screen with several of them (a button, a heading, the 31-button grid, the copy button) pinned them all to the same bottom edge; the big grid, pinned, was drawn over the rows / heading / button above it.

## Fix (KIT §13.17)
Every `.kg82act` stacks in the normal flow and takes its own height. Only the LAST `.kg82act` of a screen is the sticky bottom bar, and only on a screen with no grid block (a `.kg82act` with 4+ buttons): a grid screen scrolls as ONE column and nothing is pinned over it. Pure CSS in the kit (jcui), no per-screen patch.

## Scan + before / after (dev/test/kit-kg82-stack.js, Fold 755x1000 + iPad 1180x820)
Screens: (a) the pick screen with 31 kinds (same markup as jmgcal pick()), (b) the rules screen of every kg82 kind (31), (c) a result-like screen (rows + 2 buttons), (d) a long row + 3 kg82act blocks.
| | before (LIVE b1033eb0) | after |
|---|---|---|
| iPad, pick screen: overlapping blocks | 4 (heading, rows, button, heading all under the grid) | 0 |
| pinned (sticky) blocks on the pick screen, both devices | 3 | 0 (one scrolling column) |
| result-like / multi-block screens | stack (overlaps hidden by sticky semantics) | 0 overlaps, ONE sticky bar kept on the result-like screen |
| rules screen of each of the 31 kinds | 0 overlap | 0 overlap (unchanged; their single action bar stays sticky) |
Before 3/12 FAIL, after 12/12 PASS (the same script on LIVE).

## Honest limits
- On Fold my rebuilt screen did not reproduce the exact overlap of her screenshot (my row text is shorter than hers), so on Fold the proof is the mechanism (3 pinned blocks → 0), not a measured overlap; iPad measured the overlap before (4) → 0.
- I scanned the kind rules screens + synthetic result / multi-block screens, NOT every real result screen of every game (exam, summons, cal results) in play; a screen that relied on its non-last `.kg82act` being pinned would now scroll with content — none found among the scanned ones.
