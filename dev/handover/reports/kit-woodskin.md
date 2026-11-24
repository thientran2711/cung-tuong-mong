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

## REVIEW r2 (reviewer session_01N1tNP3y9AYuaXKRn7EAaz3, 11/24/2026)
PRIORITY #1 CHECK: OD 0 | main none | review/* review/kit-woodskin ba0e0692 (brief said 66bf8bb5 = its PARENT; the r2 commit «band placed by cost…» is ba0e0692, so ba0e0692 was reviewed) | claims KK21.
Heads: bare ba0e0692 (index.html/sw.js NOT BUILT: stale, no KIT_PLAQUE in it; quickcheck says «NOT BUILT»). Origin/main 502c48c9 is already an ancestor, so merged head = bare + built files = review/kit-woodskin-r2 e47e113e (pushed).
**VERDICT: KIT FAIL kit-woodskin r2 -> KK22** (geometry rows fixed; law 9 row still open).

## r1 FAIL rows re-checked
1. Plaques/tabs over the stage right column (Ân sủng / Nguy hiểm chung): FIXED. Fold 755x1000 + iPad 1180x820 shots (DSF 2, stage visible, looked 3x): band sits below the panels / left of them, nothing on «Nguy hiểm chung» or the Ân sủng rows. Test now reports overObst 0 with 11-12 stage kit obstacles.
2. Band laps neighbour's name tag: FIXED on both devices (nameplates «Đáp ứng …» / «Cung nữ thân tín…» clear, plaque 6 ends above them). Residual: iPad band still covers part of the OTHER person's body (test bodyOver 538-589 px²; not a face, not her tag).
3. Plaque over the round corner button (Fold): FIXED (plaque 6 ends above the «+1» chip).
4. LAW 9: **STILL OPEN.** `git grep -nE "kitPick\.|kitDim\." dev/build` outside jkpick.js = 0 call sites. Old person-interaction pickers all remain (jdfv.js kitFocus acts, #popw person card j6/jdf dfActs, jfocus choices). No reason / adoption order is written in KIT.md §98 or the code. Brief asks for real call sites or a listed reason -> FAIL. Fix: wire kitPick into the person focus view (replace the old act list) and kitDim on non-chosen people, OR write the reason + the adoption order in KIT.md §98 and tell the owner it is not in the game yet.
5. 390x844: this run = «no stage figure» (test cannot open the scene; r1 saw «plaque outside stage 1»). 755/1180/412 ALL PASS. Secondary, noted.
6. Shots under a veil: the TEST's own shots are STILL covered, now by a random event modal («Hội phối đồ: báo đề») instead of the dawn cover (both pick-a shots had the event dialog over the stage). dawn is cleared but #modal is not. Fix: hide/close #modal (and use dev/test/lib/veil.js V.guard) before each shot, assert the stage is visible. I re-shot with #modal hidden (scratch copy of the test) for the checks above.
7. NEW: the branch head had a stale built index.html/sw.js (quickcheck «NOT BUILT»). Fixed by my commit e47e113e.

## Tests (commands -> result)
- `DSF=2 node dev/test/kit-pick.js file://…/index.html out` no args: 755x1000 ALL PASS, 1180x820 ALL PASS (also with #modal hidden).
- args `755x1000,1180x820,412x1058,390x844`: 755/1180/412 ALL PASS; 390x844 FAIL «no stage figure».
- `node dev/test/kit-focus.js` no args: 755x1000 PASS, 1180x820 PASS.
- `DEV=fold|ipadAir node dev/test/place-stage-scan.js`: runs, rows emitted (no pass/fail line; its header usage names place-banner-scan).
- `node dev/test/stage-rightcol.js`: Terminated by my 280 s timeout (r1 got a result; slow, not a branch fault as far as seen).
- `bash dev/tools/quickcheck.sh` ALONE on ba0e0692 (+ local build): `QUICKCHECK PASS · 216 s · open 1843 ms · old save ok · perf (median of 3, new/live): render 236/240 ms, tab 471/428 ms, buổi 1350/1551 ms, tasks>200ms 26/22`; final line «FAIL · NOT BUILT» because the committed built files were stale (cause 7, fixed in e47e113e; same sources). Old save loads.
- Law 11: kit parts touched = §98.1 plaque band, §98.2 title, §98.3 dim; band placement before = fixed side, laps right column/name tags; after = placed by cost with stage parts as hard obstacles, 0 overlaps on Fold + iPad.
