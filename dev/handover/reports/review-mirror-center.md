# review mirror-center r1 - FAIL ad226ed0

PRIORITY #1 CHECK: OD 12 (mirror view approved, owner bug OD ~18:00Z) | main jtoil mirror view | review/mirror-center ad226ed0 | claims mirror-center MAIN s35.

Merged ad226ed0 onto origin/main 03a776e (only index.html/sw.js conflicted, resolved by rebuilding the site) = 1413f20 (local, not pushed). Served over http, real makeup runs, `node dev/test/mirror-center.js`.

## Verdict: FAIL. The test passes but the owner's bug is still visible.
The worker's test takes "face" from the mk-fit mesh (`toilAxisX`) and "glass" from its own constant (628/1200), so it only proves the code agrees with itself. I overlaid the screen-centre line (= glass centre by the worker's own numbers) on the shots and read the real eye midpoint by eye.

| viewport | test says (face-glass) | eye midpoint vs centre line, by eye (css px) |
|---|---|---|
| Fold 755x1000 c09 | 0.0 | eyes at x~595/795 of 1510 -> mid 695 vs 755: about 30 px LEFT (12 % of face width) |
| Fold 755x1000 c28 | +1.5 | eyes ~575/785 -> mid 680 vs 755: about 37 px LEFT |
| Fold 755x1000 c01 | -0.1 | slightly left (~6 px) |
| 412x1058 c25 | -0.2 | clearly left, ~35 px |
| 390x844 c28 | -0.1 | ~12-25 px LEFT |
| 1366x1024 c10 | -0.1 | ~10 px left |
| iPad 1180x820 c13 | +2.2 | centred (mid 705 vs 708 of 1416 crop) - the only good one |
So the face is still left of centre on the owner's Fold (and phones), exactly the reported symptom. The mesh eye midpoint (`toilAxisX`) does not equal the visible eye midpoint on many portraits (c09/c28 off by 30-40 css px), or the `.ktrv-pw` rect used by the test is not the picture's visible box.

## What the worker must do (numbered)
1. Find why mesh eye-ring midpoint != visible eyes (check which mesh indices 20..39 are the eye rings; check `.ktrv-pw` box vs the drawn picture box; check the portrait's own face-fit offset in TOIL_FIT). Prove it with a pixel check, not the mesh.
2. Rewrite the test to measure from pixels: screenshot, detect the eye midpoint (or read the eye positions from the fit data that the makeup board really draws on) and the glass ring centre from the plate image, instead of reusing the same constants.
3. Re-verify glass centre x=628/1200 on the painting at each viewport (in the c09 Fold shot the crest apex sits right of the screen centre, so check it too).
4. Pass criterion: eye midpoint within ~2 css px of glass centre on Fold, iPad, 1366, 412, 390, over at least 5 different portraits per viewport (not 1).
5. Side note (not a blocker, makeup look is owner-approved): the cheek/lip blush smear in the Fold shots sits right of the mouth; check once the axis is fixed that the makeup layer still lines up.

## Not reached (stopped at the first blocker)
Whole-family scan, small avatar frames untouched check, quickcheck, old save: not run; re-review after fix. Shots were local scratch only, not uploaded (nothing to wipe on CDN).

# r2 re-review of ea709be7 - PASS 0f0954fb

PRIORITY #1 CHECK: OD 12 + owner bug OD ~18:00Z | main jtoil | review/mirror-center ea709be7 | claims mirror-center MAIN s36.
Merged ea709be7 onto latest origin/main = **0f0954fb** (review/mirror-center-r2, pushed; origin/main is its ancestor; only generated index.html/sw.js conflicted, rebuilt).
- Pixel test `node dev/test/mirror-center.js` over http, 6 portraits x 5 viewports (Fold 755x1000@2, iPad 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3): bad 0, page errors 0; |centroid - glass| max 4.4 css px (iPad), mean 0.9-2.4.
- Independent by eye: contact sheets with the screen-centre line over all 30 shots; the eye midpoint / nose sits on the line in every one (c14 3/4-turn too). The r1 FAIL (30-37 px left on Fold) is gone.
- quickcheck PASS (old save ok, core gates PASS, open 1435 ms); toil-draw 755 PASS 10 (board anchors, no page errors).
- Diff is jtoil.js + KIT.md §60 + test + rebuild only: makeup look/scoring and small avatar frames untouched.
- CDN img/_review/mirror-center/ wiped (6 objects); scratch shots deleted.
Notes (not blockers): the 2nd estimator `d` (cheek-extent mid) skews up to -26 px on hair/ear-heavy portraits (informative only; eyes/nose are on the line by eye). At 412x1058 the game shows the "Xoay ngang" rotate prompt over the close-up (pre-existing, 412 is secondary). Worker's side finding is valid: mk-fit/toil-fit files sit up to 10 % right of the painted face, which likely affects the blush/lip/veil layers elsewhere; suggest a re-fit-from-pixels ticket for MAIN.
