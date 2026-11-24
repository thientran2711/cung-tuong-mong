# kit-woodskin review (KIT §98 kitPick / kitDim / place title)
## REVIEW r1 (reviewer session_01N1tNP6zFURqiCMvwK3meUK, 11/24/2026)
PRIORITY #1 CHECK: OD 0 | main none | review/* review/kit-woodskin (09c4386c) | claims KK21
Heads: bare 09c4386c; merged = origin/main 502c48c9 is already its parent, so merged head = review/kit-woodskin-r1 10ad54ff (bare + built index.html/sw.js, pushed). Same sources, so bare and merged results are identical.
**VERDICT: KIT FAIL kit-woodskin -> KK21** (numbered list below).

## Tests (commands -> result)
- `node dev/test/kit-pick.js file://…/index.html <out>` (no args: 755x1000, 1180x820): both ALL PASS.
- same with `755x1000,1180x820,412x1058,390x844`: 755/1180/412 ALL PASS; 390x844 FAIL "plaque outside the stage 1" (known secondary gap, noted, not a fail by itself).
- `node dev/test/kit-focus.js` no args PASS x2; with 4 sizes: 412x1058 + 390x844 FAIL "button outside layer 9 / text out of button". SAME on baseline main 502c48c9 (pre-existing, not caused by this branch).
- `DEV=fold|ipadAir node dev/test/place-stage-scan.js`: 20 places each, min gap title->rail chip 406 px (Fold) / 352 px (iPad), no overlap, title h <= 42.
- `node dev/test/duodo-focus-view.js`: first run TypeError (random seed, no talkable rival), reruns 2/2 ALL OK; baseline ALL OK. Flake, not the branch.
- `node dev/test/stage-rightcol.js`: bad 17 on branch vs 25 on baseline (random-seed counts, not worse).
- `node dev/test/map-tap-go.js fold|ipadAir`: ALL OK both.
- `bash dev/tools/quickcheck.sh` ALONE on 10ad54ff: `QUICKCHECK PASS · 310 s · open 2417 ms · old save ok · perf (median of 3, new/live): render 322/356 ms, tab 689/613 ms, buổi 2308/2274 ms, tasks>200ms 31/27 · core gates PASS`. Old save loads.
- Shots (DSF 2, looked 3x): Fold 755x1000 and iPad 1180x820 (iPad re-shot with the dawn veil cleared; the test's own iPad shots were taken under the dawn cover = useless, see item 6).

## Owner rows (OD ~09:05Z, ~15:30Z, ~15:40Z)
- ~09:05Z one dim, figures only, background untouched: kitDim code OK (test: filter b .7 / s .75 from BAL.kdim, opaque, bg same). BUT nothing calls it (item 1).
- ~15:40Z hanging wood plaques beside the chosen person: plaques look right (wood, cords, drop-in), low, below the face.
- Title wraps instead of running under the chip: OK in scan + 4 long titles x 117 in kit-pick.
## Laws
- Law 4: all numbers read BAL.kdim; KIT_PICK px knobs are layout knobs like KIT_FOC; DIM() has a typed fallback {b:.7,s:.75,ms:220} duplicating BAL.kdim (nit: drop the fallback).
- Law 9: kitPick is built on kitFocus.btn (kit button) + .pctabs: OK. But call-site scan (`git grep "kitPick\.|kitDim\." dev/build` outside jkpick.js) = ZERO. Old person-interaction pickers still in place: kitFocus acts via jdfv.js:35/59, person card #popw (j6.js:24, jdf.js dfActs), NPC encounter say/choices (jfocus). Listed per brief; adoption is a later order, but it must be said to the owner that she has not seen it in the game.
- Law 11 table (place titles): before = nowrap, could run under the chip; after = wrap + --krw, all 20 places x 2 devices gap > 0. kitDim/§92/§93/§95 veils still darken whole screens (reported, not changed, as KIT §98.3 says).
- Law 12: Fold + iPad shots looked; defects below.

## FAIL list for KK21
1. Plaques + group tabs cover the stage's own right column (Ân sủng / Nguy hiểm chung panels, kshR): Fold shot tabs sit on «Nguy hiểm chung» text; iPad shot tabs + rail sit on the Ân sủng rows («Có thai», «Lật thẻ», «tuần» cut). `avoid` only lists other figures, not kit parts on the stage. Fix: avoid-rects must include .kshR / count chip / title, or place the rail below them.
2. iPad: the plaque band laps the neighbour person's name tag («Tiểu Mãn» cut by plaque 6) and her skirt; kit-pick test says otherOver 0 because the test mock has only one other figure measured. Add the name tags to avoid + make the test use the real stage figures and scan the tags.
3. Fold: plaque 6 overlaps the round corner button at the stage bottom-right (clipped at x≈1480).
4. kitPick and kitDim have zero call sites; list of old pickers above. (Kit-part delivery may be fine, but tell the owner it is not visible in the game yet.)
5. 390x844: 6 acts overflow by one plaque (known gap, noted only). kit-focus 412/390 failing is pre-existing.
6. dev/test/kit-pick.js shots on iPad are taken while the dawn cover is up (pick-a/pick-b = cover picture): clear #dawn before each screenshot (I did locally, not committed). Add a check that the screenshot has the stage.

## KK22 r2 (24/11 ~20:15Z) review/kit-woodskin ba0e069 (on 66bf8bb5)
1. FIXED: band chosen by cost, stage kit parts HARD (right column, rail, title, chips, name tags) — Fold: right, compact tier, below Ân sủng/Nguy hiểm; iPad: left of her. overObst 0 both; kit-pick.js ×3 runs ALL PASS Fold + iPad.
2. FIXED: name tags are obstacles; iPad now covers the OTHER person's body/skirt (soft), never a tag/panel; Fold 0.
3. FIXED: Fold plaque 6 no longer meets the corner «+N» chip.
4. NOT DONE (needs MAIN order): kitPick/kitDim call sites (kitFocus acts jdfv.js, #popw j6.js, jfocus) = game wiring, users RING-DESIGN-4 / MOTION-DESIGN-4. Not visible in the game yet.
5. 412x1058: 1 kit part covered; 390x844: 3 + 1 plaque out — phone shells, reported not asserted.
6. FIXED: test clears #dawn before shots + fails if dawn up; DIM fallback removed (BAL.kdim only). KIT §98.9.
