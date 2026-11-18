PRIORITY #1 CHECK: OD 39 (OD:L1482, L555, 03:42Z-04:25Z tail) | main jtoil.js toilRow/toilMkLayer + dev/art/mkfit (reused) | review/* toil-overlay-r1 d7354726 | claims toil-reveal-fix. Reviewer; nothing new built.

# review-toil-reveal-fix-r2 (reviewer sonnet) — VERDICT: FAIL (same picture still wrong in the game; data otherwise good)
Reviewed review/toil-overlay-r1 d7354726 (ladder changes of 04:44Z not judged). Trial merge onto current origin/main 4719d424: conflicts ONLY in generated files (assets.json, index.html, sw.js; coordinator rebuilds), all source .js merge clean.

## Verified OK
- Data: dev/art/toil-fit2.json 12966 keys, mk-fit 31504 entries (same counts as r1), anchor-table.py "pictures 5992 bad 0", exit 0. Independent re-check with verify.py (THR .10, report only) on 4 whole faces (c05 c07 c13 c24 = 744 pictures): 744 ok, 0 flag, max d .094. por-consort-c07-t3-a18: stored lip points now sit ON the lips (plotted over the picture, looked at).
- quickcheck d7354726: CORE GATES PASS (hooks 2), time-spill PASS, open 1290 ms 0 errors, old save loads. Hook anchor-table.sh now decides by exit code (read). on-upload.sh now runs mkfit.py --missing (read). cdn_sync anchor hook read, not run.
- Reveals (Fold, forced face, diêm dúa, game renderer, looked at): c22 t5 a18 and c28 tm4 a18: lips/brows/blush on the face.

## FAIL
1. consort-c07 t3 a18 and consort-c31 ty2 a18 (both 3/4-turned faces) STILL show a dark-pink lip patch on the CHIN, below the real mouth, in the makeup reveal close-up, although their stored points are on the lips and verify.py agrees. Hiding every `.ktrv .kfxf` removes the patch; hiding only the figure's layer does not, so it is drawn by the layer of the portrait patch (`.ktrv-pw .kfxf`), not by the figure. So the remaining bug is in the lip-colour RENDER (toilMkLayer / toilMkDraw, jtoil.js ~718-740: lips polygons P[0:12] + inner P[12:20]) for turned faces, NOT in the anchor table; the data tools cannot find it because they only compare points. The worker's "looked at 3x" check (anchor-sheet = dots through toilGeom/toilIdeal) does not draw the colour layer, so it could not see this. Please: look at c07 t3 a18 and c31 ty2 a18 in the real reveal (node dev/test/mk-reveal.js style, forced face) and in the minigame result; find why the polygon lands under the mouth (inner-lip points 12-20 / aspect / pivot of tilt -1 are my suspects, unproven); add a check that renders the colour layer and compares its lip box with the face-mesh lip box on the whole set (all 3/4 faces), not only dots.
2. Same cosmetic nit as r1: faint pink halo just outside the far cheek on turned faces (c24, c07, c32).

## CDN data (only after item 1 is fixed; data files themselves are valid)
dev/art/mkfit/consort-c01..c32.json + player-look1..4.json -> img/mk-fit/, dev/art/toil-fit2.json -> img/toil-fit2.json (not maid/mama). Back up old CDN copies first. Re-run on-upload.sh after Foreman C's repaint.
