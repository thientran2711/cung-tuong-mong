PRIORITY #1 CHECK: OD 13 | main 16 sites (jtoil) | review/* mirror-center only | claims s35 row (this one) -> r2 of own branch.

# mirror-center r2 (worker, sonnet) - SẴN SÀNG KIỂM ea709be7

Branch `review/mirror-center` = origin/main d5ea786d + ad226ed0 (r1) + **ea709be7** (r2). Answers reviewer FAIL r1 point by point.

## Root cause (reviewer was right, my r1 test was circular)
1. **The fit files lie.** I overlaid mk-fit eye rings and the toil-fit mouth on the portraits themselves: for c25-t1 they sit ~9 % of the picture width right of the painted face (eyes/mouth visibly outside the face). Across 229 portraits the skin-pixel face centre is on average **3.0 % of the picture width LEFT of the mesh eye midpoint (sd 2.0 %, up to 10.4 %)**; at Fold zoom ~24 px mean, ~80 px worst. r1 centred that wrong axis, so the face still looked left (the owner's and reviewer's symptom). My r1 "eye pixel check" searched only inside windows around the mesh, so it could not see it.
2. Glass axis: re-measured by left/right symmetry of the frame on the painting (rows 60-470): x = 629.5-631 of 1200 (r1 had 628). Now 630/1200 (`TOIL_PLATE.gx`).
3. Dark-pixel eye detection was tried and rejected (picks hair/earrings, -8 % bias).

## Fix (jtoil.js only; kit text KIT.md §60 'FACE AXIS')
- `toilEyePx(file)` (async, once per picture, cached): face centre = centroid of the skin pixels (colour test) in the face band (eyes-6 % .. mouth+2 % of the height, x window from the fit) of the HEAVIEST run of skin columns (a hand/sleeve beside the face is dropped; c01-t1 had a hand). Needs CDN CORS (present). Fit data only chooses rows/x window.
- `toilAxisX(file)` = that pixel centre; until it is read: mesh eye midpoint + `TOIL_AXIS_BIAS` -0.03 (measured mean). Used by the close-up camera (`toilReveal`, figure slid by `--ktdx` onto the glass axis, camera re-aims when the pixels arrive), the makeup board `toilGeom` (re-anchors if the data arrives late; `toilMkPre` preloads at the dress step) and `kitFaceZoom`.
- Makeup look, colours, scoring, small avatar frames untouched. Vertical placement unchanged.

## Test (rewritten, pixel based): `node dev/test/mirror-center.js <url> <WxH@dpr> <shotdir|->`
Glass axis measured IN THE TEST from the painting (symmetry) and mapped through the real plate rect; face measured from the portrait picture pixels and mapped through the real portrait rect; 6 portraits (c09-t2, c28-t2, c01-t1, c25-t1, c14-t3, c10-t1), real makeup reveal, look 'dep'. dc = game's centroid vs glass, d = a second estimator (cheek-to-cheek extent; ears/neck skew it on turned heads, informative only, bound 30).
| viewport | |dc| per portrait (css px) | mean |
|---|---|---|
| Fold 755x1000 | 0.1 0.1 1.4 1.8 2.1 3.9 | 1.6 |
| iPad 1180x820 | 2.2 4.4 2.9 -0.1 2.0 2.1 | 2.3 |
| iPad Pro 1366x1024 | 2.9 2.3 1.7 2.2 2.6 2.4 | 2.4 |
| 412x1058 | 0.9 1.2 0.2 1.0 1.2 1.1 | 0.9 |
| 390x844 | -0.1 2.2 0.7 1.0 0.1 2.0 | 1.0 |
FAIL rule: any |dc| > 6, mean > 4. Honest limit: 'centre of a turned head' is ambiguous by ~1 % of the picture width (~8 px on the Fold) between estimators; the reviewer should eyeball the shots. I looked at c09, c10, c14 (iPad): the line through the forehead mark/nose bridge splits the face evenly in the glass; c01 (hand beside the face) and c25 (frontal) fine.
- Before (r1/main) in the same pixel terms: c25-t1 ~59 px left on iPad (seen), c28/c09 ~12-37 px left on the Fold as the reviewer found.
- quickcheck --runs 3: **PASS** 186 s, old save ok, core gates PASS, perf render 218/225, tab 309/396, buổi 989/1118, tasks>200ms 14/17 (new/live). toil-draw 755x1000: PASS 10.
- Shots on CDN (wipe after verdict): img/_review/mirror-center/r2-{755x1000,1180x820}-{c25-t1,c09-t2,c01-t1}.jpg under https://ctm-img.victoria-tntt.workers.dev/ . r1 shots were wiped.
- Reviewer point 5 (blush smear right of the mouth): not touched (colour layer follows the toil-fit mouth, which is itself right-shifted on some portraits; separate family 'fit files off', worth a ticket: re-fit toil-fit/mk-fit from pixels).

## Open for MAIN
The fit files being off by up to 10 % probably also hurts every other place that uses toil-fit/mk-fit (makeup colour layers, veil, scar). Not changed here.
START_CTX ~12 %, now ~55 %: no more work needed, stop after this report.
