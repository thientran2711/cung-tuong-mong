# fig-headtop — report (branch review/fig-headtop, head 2ba1217b)

PRIORITY #1 CHECK: OD headTop 0 (verbatim line OD:L1539) | main 2 (b.ht existed, used only in jk4:344) | review/* none | claims none. Reused b.ht; no new part.

## Root cause (found by measuring real art, not guessed)
`kitFigBody` (jkit.js) derived `b.ht` with a colour test "fair forehead skin". A gold crown / hairpin passes that test, so for almost every crowned figure `ht` = painted top (measured: ht-t = 0.000 on 420 sample figs). So even the layouts that already used `b.ht` (jk4:344, kitBookFig, j59bt, jksize, j79, jpromo) scaled by the crown. Three layouts also ignored `ht` outright (dialog column jk4 `at()`, single dialog jpdlg:36). Crown/body ratio is 5 % (t1, cold) .. 11 % (t8): a t8 beside a t1 was 5 % shorter on average (up to 8.8 %), exactly the owner's screenshot.

## Fix (one shared measure)
1. DATA, once: `dev/art/headtop/headtop.py` runs the MediaPipe face mesh (same model as dev/art/mkfit) on all 8890 `fig-*.webp` of the CDN index (women, men, eunuch, kids, official... every file; 1 face the mesh cannot read, `fig-maid-m15-t8-a18`, is set by eye in MANUAL) and writes `img/fig-ht.json` {file: head top in 1/4000 of picture height} (288 KB, on the CDN, copy in `dev/art/headtop/fig-ht.json`). Head top = face-mesh landmark 10 − 0.30 × face height (K calibrated on plain-hair figures; a ±0.1 error is ≤ 1 % of body). 3 rows for the grey silhouettes (`unknown-fig-f|m|k`, head top = painted top + 0.046 × body, same allowance as a plain-hair figure).
2. ONE function `kitFigTop(b)` (jkit.js) = head-top line of a measured figure; used by j59 (stage), jk4 kitEsOvFit (event stage) + dialog column, kitBookFig (book pages, new-game preview), jpdlg. `kitFigBody` now waits for the table, then `b.ht` comes from it (old colour test removed). Table load failure → painted top for ≤ 20 s, then re-measured (never cached wrong).
3. Dialog column (`kitDpFit.at`): body = head top→feet; one column scale set by the figure whose crown needs most headroom (crowns stay in the column, bodies keep the kit ratio, equal head tops).
4. Silhouettes (add-on from s30, owner "exactly location" + gap): they now use the same measure; their art extents (l..r, which `kitSlotIn` clamps) are a standard figure's (`KIT_FIG_HALF`), because the grey shape fills the whole picture width and was pushed inwards by the stage-edge clamp.

## Scan (dev/test/fig-headtop.js, live in Chromium; head top read from the table, independent of the build)
Event/room stage, Hoàng hậu t8 crowned beside low rank (random identities each run):
| view | build | head-top spread / body | feet |
|---|---|---|---|
| Fold 755x1000@2 | main (before) | 4.4 % | same |
| Fold 755x1000@2 | fig-headtop | 0.02–0.07 % | same |
| iPad 1180x820@2 | main (before) | 6.0 % | same |
| iPad 1180x820@2 | fig-headtop | 0.1 % (one run 4.0 %: bodies 427 vs 445 px; most likely the real-age factor KIT_FIG.kid(age) for a figure under 18, not checked further) | same |
Random pairs of 420 figures (c01..c20 × t1,t2,t4,t6,t7,t8,cold × a18/36/51), head-top line above feet, before = scaled by painted top: mean 2.3 %, p95 5.6 %, max 8.8 %, 48 % of pairs > 2 %; t8 beside t1: mean 5.0 %, max 8.8 %. After: 0 by construction (all bodies = head top→feet at KIT_FIG), confirmed live above.
Silhouette vs real person in the same slot (stage, 1 real + 1 grey, same slots):
| view | build | Δ centre x | Δ head top | Δ feet | gap between centres (real pair / silhouette pair) |
|---|---|---|---|---|---|
| Fold | main | 33 px (silhouette pushed inwards) | 1.4 px | 0 | 214 / 247 (−13 %) |
| Fold | fig-headtop | 0 px | 0.2 px | 0 | 247 / 247 |
| iPad | main | 33 px | 8.8 px (1.9 %) | 0 | 145 / ~178 (−18 %) |
| iPad | fig-headtop | 0 px | 0.1 px | 0 | 174 / 178 (2 %) |
Shots (Fold 755x1000@2, iPad 1180x820@2; crowned Hoàng hậu beside low rank, looked at; not committed): head tops level, crowns above.

## Not changed / notes
- Pets (own measure, no head). `jk4.js:502` head check keeps the painted top (it guards against clipping).
- Dialog single column (jpdlg): body = head top→feet but capped so the crown stays in the column (rel ≤ 1); the crowned woman is therefore as before there; side-by-side dialog columns are level.
- Re-run when art changes: `python3 -I dev/art/headtop/headtop.py --model face_landmarker.task --cdn --jobs 12` then `python3 dev/site/cdn_sync.py img/fig-ht.json` (needs apt libegl1 libgles2, pip mediapipe).
- Built files (index.html, sw.js, assets.json) NOT committed on the branch: coordinator rebuilds at merge. `python3 dev/build/assemble.py` + `build_site.sh` ran clean.

## Context handover
Starting context low; finished well under ceiling, no rollover needed.
