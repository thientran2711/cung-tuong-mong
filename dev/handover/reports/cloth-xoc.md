# cloth-xoc — sloppy / creased outfit as a CODE filter (SAMPLE FIRST)

PRIORITY #1 CHECK: OD 0 (+ new OD 17/11 ~23:20Z, ~22:20Z) | main jlooks.js:9,48 (looks-2 CLOTHES 'xoc', overlay never painted) | review/* 0 | claims MAIN s38

Branch review/cloth-xoc @ c09629a (from origin/main c7375c0). Files: dev/build/jcloth.js (new, assembled right after jlooks.js), dev/build/assemble.py (+1 name).

## What
One kit effect `clothXocBake` (pure functions, usable by any dressing result) + wiring into the face-fx path:
- (a) cloth mask = figure alpha − skin (colour-matched to HER OWN face box, small skin-like specks dropped) − hair (dark pixels joined to the head) − head zone.
- (b) crease strokes (tapered valleys with a lit ridge beside, radiating from belt knot / hips / elbows, vertical along the fall) + soft sag lumps → relief shading + thin dark crease + small highlights, shadows are the cloth's own colour, mean brightness kept.
- (c) hem wave + tilt, collar/lapel drift, upper-robe lean (displacement warp). The underlay keeps only the interior so the outline can move without a ghost.
- Baked canvas image per picture + level (cached 24) laid as `img.kclo` in the kit fx box UNDER makeup/marks; the plain picture is hidden (`kclo-on`).
- Numbers: BAL.looks.xoc (`on:0` = live feature OFF until the owner approves; lv[1..3] = nhẹ/vừa/nặng). Wired to looks-2 item `xoc` (Áo xốc xếch) via KIT_FACEFX "lkcloth".

## Samples (same character, same room, host-less direct run, dpr 3, stage view + waist-up native crop)
CDN img/_review/cloth-xoc/xoc-0..3.png (1200x2325): 0 chỉnh tề · 1 nhẹ · 2 vừa · 3 nặng
https://ctm-img.victoria-tntt.workers.dev/img/_review/cloth-xoc/xoc-0.png (…-1, -2, -3)

## Honest notes
- Reads as creased fabric (satin-like folds), not dirt; level 3 covers the robe fairly evenly. Dark crease lines were cut down after the first tries looked like ink.
- The "askew" part (hem/collar warp) is subtle at stage size; levels already 5–9 % of figure width at heavy. Needs the owner's eye: more or less?
- Pictures with a very skin-like robe colour, or dark robes + dark hair, rely on the face-colour mask: checked on 3 figures only (cream, grey-beige, sage); a scan of all figures is the next step after approval.
- No tests added yet (sample only). Not scanned: other places that draw figures (podium, event stage) — they use kitFxPut too but untested.
- Shots stay on CDN review folder until the verdict (then `python3 dev/site/cdn_sync.py --wipe-review cloth-xoc`).

## r2 (after main s39 verdict FAIL look: uniform ripple, warped hands/pendant) — ROLLOVER HANDOVER
State: review/cloth-xoc HEAD b6a9824 (pushed). Redone per verdict: few body-placed creases (waist-tie fan, above-belt, elbows, hem, shoulder→waist drag), per-level counts/depth in BAL.looks.xoc.lv, protect map (skin/hair/items) keeps hands/pendants out of the warp, warp only hem + lapel. The skin mask now drops skin-coloured blobs that are too big (a robe), which fixes slivers on pink/beige robes.
STILL FAILS the look: strokes render as swirly bright/dark smears (zebra / glass) instead of soft cloth folds; drag lines bend into arcs; relief gradient is too sharp for the stroke width.
Next worker: (1) each crease = soft dark band (gaussian 4–8 px, ~10–18 % darker in the robe's own colour) with a thinner light edge at 30–40 % of it; replace the ±1 clamp of the relief by tanh with lower gain; straighten drag lines (bend ≤ .1). (2) keep the mean-brightness compensation. (3) test cream, pink-beige, sage, dark robes and figures holding items (broom, cup, lantern). The sample figure is random per run: pin her figure in the shot script (scratch, not in repo). Sample layout asked by main: waist-up crop on top (native pixels) + small full figure, Vietnamese label only.
Stain decals (ADD from main s38/s39; decal art from the look-decals worker): NOT STARTED. Plan: reuse clothMask (mk.m = cloth, mk.protS) — anchors chest (cx, y0+.27fh), sleeve (x0+.2fw, y0+.5fh), hem (bottom 12 %); clip by mask, multiply / soft-light so folds show; levels + positions in BAL.looks.stain; hook KIT_FACEFX "lkcloth" for tra/uot/bun in the same baked-layer path as clothXocLayer.
CDN img/_review/cloth-xoc/xoc-0..3.png = r2 WIP (not for the owner).

## r3 (session_01UV1SzkYmApqhLJ8fozxZi3, MAIN s39) — ROLLOVER HANDOVER
PRIORITY #1 CHECK ('xốc xếch crease cloth'): OD 23:20Z/23:45Z/00:00Z/00:05Z read | main jlooks.js:22,48 (xoc item) | review/cloth-xoc b6a9824 reused | claims r1/r2 session_01UV1SzgpiW9BQi7g48amRNv
State: review/cloth-xoc HEAD 57afd8a (pushed). BAL.looks.xoc.on stays 0. Only dev/build/jcloth.js changed.
What changed (TASK 1, crease look):
- Removed the gradient-relief height field completely (root cause of glass/zebra: lighting a height field whose stroke width ~ blur radius gives alternating bright/dark rims). New clothField returns dk (darkness) + lt (ridge light) directly.
- Each crease = straight stroke, tapered both ends; dark gaussian band, crisp on the lit side (BAL ridge.edge .45) and soft on the shade side; thin light ridge beside it on the light side (ridge off/w/k). No bend/arcs, no noise.
- Shadow colour = the cloth colour multiplied by itself (v*v/255: richer own hue, warm beige on cream, deep red on red), then slightly darker; ridge = screen. Mean brightness kept (comp .85).
- Placement (BAL.looks.xoc.body: waist .34, elbowX .24, elbowY .43, shoulder .17): waist fan SPLAYED ±70° out of the knot (vertical folds vanish into the robes' painted vertical pleats — creases must go against the fall to read); bunches of 3 near-parallel short creases (bunchK) above the belt, at the inner elbows, above the hem; drag lines shoulder → past the centre line (opposite hip).
- Levels in BAL.looks.xoc.lv: counts + dep + sg + dark/lite (lv1 3/3/2/3/0, lv2 5/6/4/9/1, lv3 8/9/6/15/2).
- Skin mask fix: skin-coloured components that are tall-thin (bh/bw > 2.6) or ragged (fill < .25) are robe trim/embroidery, not skin (c01 peach lapel was blocking creases). Hands still detected on c01/c03/c30.
- Warp (hem/lapel) unchanged from r2.
Look status (my honest eye, renders below in scratch only, NOT uploaded): lv3 now reads as creases on cream (c30) and red (c01) at waist-up 2x; green patterned c03 weaker. lv1 still barely visible at game size; lv2 subtle. NOT ready for owner samples. Old r2 CDN xoc-0..3 still there (WIP, not for owner).
Next worker:
1. Push lv1/lv2 visibility (counts or dark) until all three clearly differ on Fold; check the drag line's bright ridge near the cup (c01 lv3) does not read as glare.
2. Belt bunches are often hidden under hands (protect) — consider placing them left/right of the hands.
3. Test 3+ figures: fig-consort-c01/c03/c30-t2-a26 (red patterned + cup, green patterned + beads, cream-blue + branch) + one dark robe + one holding a broom/lantern (servant figure). Harness: a static page that loads jcloth.js with `window.BAL={looks:{}}` + `cl()` stub, fetches the figure webp from CDN img/ (save locally, serve with python http.server to avoid canvas taint), face box from CDN img/veil-fit.json, calls clothXocBake; debug view = paint o.field.dk / o.field.lt / o.mask.skin / o.mask.prot (bake now returns field).
4. Then samples (1200 px, waist-up big + small full figure, label "Áo xốc xếch · 1 nhẹ"), unit tests (node: mask has hands as skin, dk>0 only inside mask and never on protS, lv3 count > lv1), quickcheck + one-core-guard.
5. TASK 2 stain-decal layer: NOT STARTED (plan in r2 section above).

## r4 (session_01UV1SzjnD2foC6FyKie4bD3, MAIN s39) — ROLLOVER HANDOVER (early, look still NOT ready)
PRIORITY #1 CHECK ('xốc xếch crease cloth'): brief cloth-xoc-r4 + reports r1-r3 read | review/cloth-xoc 57afd8a reused | claims r3 session_01UV1SzkYmApqhLJ8fozxZi3
State: review/cloth-xoc HEAD = see push (only dev/build/jcloth.js changed; BAL.looks.xoc.on stays 0). No samples uploaded, no tests, no stain layer yet.
Changed: lv table (counts up, sg 4.2-4.6, dark .62/.62/.74, lite .16-.24), ridge {off 1.3,w .55,k .8,edge .5}, shadow mix capped (Math.min(.8,a*2), factor .3), drag lines S*.75 / D*.32.
Findings (my eye, 3 figures c01 red+cup, c03 green+beads, c30 cream-blue+branch, waist-up 2x):
- Wide bands (sg 5-6, shadow mix a*2.6) read as dirty brown leaf smears on pale robes and fat dark drag lines on red; narrowing + capping fixed that.
- Now clean but too faint: lv1 is invisible, lv2/lv3 read as soft smudges, not as folds. Busy painted pleats swallow them.
Next worker ideas: (1) make the fold itself a pair (dark band + clear light ridge on the lit side) at contrast ~25-35 %, ridge sharper (edge .3) so it reads as a crease edge, not a smudge; (2) lengthen strokes (waist fan 1.6x, bunch len 1.4x) and add a few 2-3 px "hard" crease lines inside the bands; (3) lv1 = 4-5 clearly visible bunches, lv3 = 2x lv1; judge on Fold at 1x, not 2x; (4) then samples, unit tests, stain layer.
Harness (scratch, rebuild in 5 min): node script evals jcloth.js with window=global, BAL={looks:{}}, cl stub; RGBA from PIL (Image.open(webp).convert("RGBA").tobytes()); face box from CDN img/veil-fit.json[<file>.webp] (percent x,y,w,h); figures at https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-c01|c03|c30-t2-a26.webp (299x900). No browser needed. Servant/dark-robe figures not tested yet.

## r4 UPDATE (same session) — SẴN SÀNG KIỂM MẪU cloth-xoc a4bccf5 (TASK 1 only)
Supersedes the "early rollover" note above (MAIN s39 said keep going). review/cloth-xoc a4bccf5 pushed. BAL.looks.xoc.on stays 0.
Changes (jcloth.js): ridge sharp+thin (off 1.2, w .3, edge .3), longer strokes (waist fan 1.6x, bunches 1.4-1.5x), bunchK 2, per-level dark .8/.95/1.1 + lite .2/.25/.3 + sg 3.6/3.8/4, shadow mix cap .85, drag lines thin/faint, strokes now also avoid the item protect map (scroll, cup, beads).
Tests: dev/test/cloth-xoc.js (node, synthetic figure: hands = skin, dk only inside cloth and never on protS, hand interior pixels unchanged, lv3>lv2>lv1, default OFF) OK; one-core-guard PASS; assemble.py builds. quickcheck (browser) NOT run: effect is off and only jcloth.js + a test file changed — run it at go-live.
Looked at (1x/2x waist-up, lv1-3): c01 red+cup, c03 green+beads, c30 cream-blue+branch, maid m02 sage, c12 green-cream+cup, c20 pink+scroll. Levels now clearly differ; reads as soft crumpled drape; busy green c03 is weakest; the waist fan still has a slightly "claw" look on pale robes; at small full-figure size lv1 is subtle. My honest verdict: borderline, needs main's eye. Not tested: a really dark robe.
Samples: CDN img/_review/cloth-xoc/xoc-0..3.png (1200 px, c01, waist-up big + small full, label "Áo xốc xếch · n …").
NOT DONE: TASK 2 stain layer (plan in r2 section); dark-robe check.
Harness (scratch): node eval of jcloth.js with window=global, BAL stub, RGBA via PIL, face box from CDN img/veil-fit.json; no browser.

## r4b (after MAIN verdict on a4bccf5) — review/cloth-xoc 7545e2a
Done per verdict: (1) output is BYTE-IDENTICAL to the picture away from creases and the hem/lapel warp (global brightness comp removed; test in dev/test/cloth-xoc.js, >97 % of untouched non-warp pixels identical). (2) creases short (fan <= .13 fh, clusters of 4 near-parallel, gap .0065 fh), placed at waist knot, belt, bust SIDES, inner elbows, above hem; core sg 1.8/2/2.2, crisp lit side, soft shade side x2.4, thin light ridge; drag diagonals removed (drag:0); colour = robe hue scaled darker (no brown cast), cap .34. (3) lv3 hem zig-zag (L.zig 1.3 % fw). Effect still OFF. Tests: cloth-xoc.js OK, one-core-guard PASS.
Samples re-uploaded (c01 + cream c30, big crop + small full, 1200x654): CDN img/_review/cloth-xoc/xoc-0..3.png.
My honest eye: clean (no brown streaks, no blur) but at 1x the clusters read like regular horizontal BARS (venetian blind), not crumpled silk; lv1 faint on red. The a->darkness mapping (jcloth.js clothXocBake `Math.min(.34,a*.5)`) is steppy: .28/.38 looked faint, .42/.6 looked like ink.
Next ideas: break the regularity (random length/angle +-25°, vary gap, taper opacity along each stroke, some strokes diagonal), fewer but softer clusters + a wide very-low-contrast (6-8 %) shade patch behind each cluster so it reads as a fold, lv1 more visible on saturated robes. Stain layer (TASK 2) and a dark-robe check NOT done.

## r4c TASK 2 stain layer — test-ready (review/cloth-xoc, see sha in MAIN message)
jcloth.js: `drawDecalOnCloth(out,W,H,mk,dec,ax,ay,scale,rot,op,blend)` (generic: any decal, multiply|soft|normal, clipped by cloth mask, off skin/hair/items, alpha untouched; crease decals can reuse it) + `clothStainBake(d,W,H,kind,lv,decals,opt)` for tra/uot/bun (opt.base chains after the xoc bake). BAL.looks.stain {on:0, lv n/sc/op/wet per level, anchor chest/sleeve/hem/hemL/hemR, kind pos/blend/variants}. Wet (uot) also darkens the whole robe by lv. Game wiring: lkcloth html now builds ONE baked layer per picture + effect set (xoc + tra/uot/bun), decals fetched from CDN img/fx-stain-<kind>-<n>.webp (missing file = skipped). Both effects OFF by default (xoc.on / stain.on = 0).
Tests: dev/test/cloth-stain.js (synthetic blob decal; multiply never brightens, nothing outside cloth/alpha/protect map, lv3 > lv1, hem lower than chest, deterministic, opacity 0 = identity) OK; cloth-xoc.js OK; one-core-guard PASS; assemble builds. quickcheck (browser) not run. No stain samples yet: decal art from look-decals worker not seen; no real-decal look check done.
Open: crease decals (owner decision pending at MAIN), real decal look + sample images per level when fx-stain-*.webp exist.

## r4d FINAL STATE — review/cloth-xoc bb64e3d (QUICKCHECK PASS, tests OK; both effects OFF: BAL.looks.xoc.on = BAL.looks.stain.on = 0)
- Creases = Magnific DECALS (owner 17/11): fx-crease-1..4 vertical patches down the skirt, fx-crease-hem-1 strip; knot decal exists but is OFF at all levels (owner: no starburst). lv1/lv2/lv3 = 2/4/6 patches (+ hem at lv3). Blend 'shade' in drawDecalOnCloth: (grey - patch mean) scales the robe's own colour, weaker channels darken more (robe's deeper hue, no grey), feathered rim, clipped by cloth mask, off skin/hair/items. BAL.looks.xoc.dec {mode 'decal'|'code', lv, pos, knotAt, hemAt, rot, shadeK}; the older stroke code stays behind dec.mode='code'.
- Stains: drawDecalOnCloth + clothStainBake tra/uot/bun (BAL.looks.stain). Tea = translucent tea-brown multiply (op x.6, tint 150,95,45), mud = wide hem strip varied rotation/height, wet = robe's own colour self-multiplied (.09/.2/.3 x2.2), hem gradient, soft sheen, drip decals only at sleeve ends/hem, clear of hands.
- Game wiring: KIT_FACEFX lkcloth html builds ONE baked layer per picture + effect set (xoc + tra/uot/bun), decals fetched from CDN (missing = skipped). Tests: dev/test/cloth-xoc.js, dev/test/cloth-stain.js. Samples on CDN img/_review/cloth-xoc/{xoc-0..3,stain-{tra,uot,bun}-{1,2,3}}.png (wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review cloth-xoc).
- Not done: dark-robe check, servant figure check, other figure draw places (podium, event stage) untested; moc/khoi/muoi stains not built.

## r5 — shared skin exclusion for ALL cloth layers (owner 00:47Z: wet covered the neck, halo at hands) — review/cloth-xoc 501ee0b, QUICKCHECK PASS
Root cause: (1) the neck / V-neckline skin strip is tall + thin, so the 'lapel trim' rule (asp > 2.6) dropped it from the skin mask → every stain layer treated it as cloth; (2) protect map used hard x3 / x1.6 multipliers → halo and seam at hands.
Fix (one place, jcloth.js clothMask + stain layers): a skin component touching the head zone is always skin (neck rule); new `protF` = skin+hair map with a soft 2-3 px feather (used by wet, tea, mud); neckline wedge (|x-cx| < .15 fw, y < y0 + .3 fh) is never stained or wetted. Creases keep protS / old behaviour (owner approved them; only effect = no skin touch).
Before/after (mean luminance drop in the neck box under the chin, wet lv3 / tea lv3): c01 26.8 -> 1.7 / 0.3 -> 0.2; c30 22.5 -> 7.3 / 2.9 -> 2.0; c03 30.9 -> 6.6 / 2.5 -> 1.5; c12 31.7 -> 10.7 / 8.8 -> 6.6 (rest = collar cloth). Mud 0 everywhere (hem only); creases ~0 before and after.
Zoom-checked neck + both hands, wet lv3, on c01, c30, c03, c12: neck stays natural, no halo around hands. Samples re-uploaded (stain-*-1..3 on c01 + c30). Known: the skin colour mask still marks some peach lapel / face-lower pixels as skin (only protects extra, no harm).

## r5c ROLLOVER HANDOVER (session_01UV1SzjnD2foC6FyKie4bD3) — review/cloth-xoc 8dab3d4, QUICKCHECK PASS, effects OFF
Done: creases (owner approved lv1-3, DO NOT TOUCH), skin exclusion for all stain layers (neck rule, protF dilated 2 px + 2 px feather, neckline wedge), tea (translucent 'stain' blend, OK), wet (uneven patches, pale robes sparse, never lighter than dry: measured 0 px lighter, mean L 162->114 red lv3, 196->156 pale lv3 on c01/c30/c03/c12), mud vertical (strip decal turned vertical).
Samples on CDN img/_review/cloth-xoc/: stain-{uot,bun,tra}-{1,2,3}.png (2400 px tall, c01|c30), stain-uot-{1,2,3}-{neck,hand-l,hand-r}.png (7x crops).
OPEN (successor): MUD. Owner: lv1 OK, lv2/lv3 look forced/crude; main s40: plume shapes read as grass tufts. Wanted: (1) dirty brown-grey wash band hugging the real wavy hem, darkest at the edge, soft top edge; (2) above it sparse splash DROPS (round/oval, some with a short drip tail down the fold), thinning up; (3) a few dried drag streaks along fold ridges; levels = natural progression of lv1 (more coverage/height, finer, softer). Needs 3-4 NEW Magnific gpt-2-6 decals (opaque mud on transparent): hem band strip, drops cluster, drip streaks -> CDN img/fx-stain-bun-3.. then place in clothStainBake (K.scatter branch, jcloth.js) using the cloth mask; hem band should follow the hem curve (mask bottom edge per column). Magnific tools were disconnected in my session (may be back: ToolSearch).
Harness (scratch): jc_new.js copy of jcloth.js, node scripts stain.js / xoc.js / zoom.js (window=global, BAL stub), RGBA from PIL, face box from CDN img/veil-fit.json; figures c01/c30/c03/c12 t2-a26 at CDN img/. Tea lv1 on warm robes already +30 %.

## r6 (session_01UV1SzjMK4RUBPdS1ZMuLds, MAIN s41) — SẴN SÀNG KIỂM review/cloth-xoc b5d7efe (QUICKCHECK PASS, tests OK, effects still OFF)
PRIORITY #1 CHECK: OD 18/11 00:47Z, 01:06Z, 02:30Z, 02:45Z read verbatim | main none | review/cloth-xoc 8dab3d4 reused | claims r4/r5 SzjnD2f -> r6 (row already mine)
### (1) Wet grey on c30 — root cause + fix
Root causes: (a) the wet DECALS fx-stain-uot-1/2 are near-black blue (mean RGB ~(0,4,24)) and were painted with multiply tinted 40 % toward neutral (110,95,85) -> neutral grey blotches with hard tops (the blotches main saw at sleeve ends / skirt); (b) the wet field itself darkened with a NEUTRAL factor (1-.13w) and a 'cling' term added equally to R,G,B -> on ivory (no chroma for self-multiply to amplify) that is grey; (c) hem wet zone was a horizontal band (clothSmooth on fy).
Fix (jcloth.js, one shared function): `clothWetDeepen` = each channel x (local robe colour channel / brightest)^P x (1-dark·s), local colour = cloth-only blur (r 5, + r 20 for near-white pixels, warm floor [1,.97,.88]) -> ivory goes warm deeper ivory, blue deeper blue, red deeper red; output min(v,o) so never lighter. Wet decals now add only their SHAPE to the wet field (`clothFieldDecal`); drips also join the field (no neutral `*=1-g`). Hem wet line per column (fbm tongues, hemV .34) = wicks up the pleats, no horizontal edge. Front panel waist->knee wet at lv2/3 (front [0,.5,.75,1]; owner 02:30Z 'trắng bóc'). Params BAL.looks.stain.kind.uot.deep. Test added (cloth-stain.js): wet never lighter in any channel, never lower channel spread (greyer) on lv1-3.
Wet table (changed cloth pixels; dC* = Lab chroma change, >= 0 means not greyer):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 44900 | -11.1 | -6.3 | 0 | +4.16 | 0 | -2.1 |
| c01 | 2 | 98656 | -17.5 | -9.4 | 0 | +6.47 | 0 | -2.7 |
| c01 | 3 | 118985 | -22.1 | -13.6 | 0 | +9.34 | 0 | -3.4 |
| c03 | 1 | 76383 | -9.5 | -4.0 | 0 | +2.91 | 0 | -1.4 |
| c03 | 2 | 100149 | -15.1 | -7.4 | 0 | +5.24 | 0 | -2.4 |
| c03 | 3 | 133671 | -18.5 | -10.8 | 0 | +7.34 | 12 | -3.5 |
| c12 | 1 | 36429 | -8.5 | -3.1 | 0 | +1.95 | 0 | -1.2 |
| c12 | 2 | 49998 | -13.7 | -7.0 | 0 | +4.17 | 0 | -2.4 |
| c12 | 3 | 104896 | -17.9 | -8.6 | 0 | +5.18 | 0 | -3.0 |
| c30 | 1 | 38765 | -8.3 | -4.6 | 0 | +1.49 | 0 | -1.6 |
| c30 | 2 | 67500 | -12.8 | -6.3 | 0 | +1.91 | 0 | -2.0 |
| c30 | 3 | 108134 | -16.1 | -9.0 | 0 | +2.55 | 106 | -3.0 |
(c30 lv3 106 px / 108k with dC* < -3 = dark lavender wisteria blossoms getting darker, not grey cloth.) Before (8dab3d4): c30 lv3 min dL* -49.5, mean dC* +1.28, 258 greyer px; c01 lv3 2422 greyer px.
### (2) Mud lv2/lv3 rebuilt
lv1 BYTE-IDENTICAL to 8dab3d4 (checked with cmp on c01, c30; base strips use decals 1..2 only, BAL bun.base 2). lv2/lv3 = the lv1 vertical strips (n 8/9 instead of 13/22) + painted pieces placed by code (BAL.looks.stain.kind.bun.add): lv2 = hem band bun-7 x2 (op .45) + drop clusters bun-3 x2 + 1 drip bun-5, all low (fy .9-.96); lv3 = bun-7 x3 + bun-3 x4 + bun-5 x2 + splash bun-4 x2 + pleat wicks bun-6 x3. 'hem' pieces stand on the REAL hem of their column (lowest cloth pixel). Multiply, earth brown, clipped by cloth mask + skin/item protect. Knee scuff bun-8 DROPPED (read as a grey-brown blotch mid-skirt on c30). Game loads fx-stain-bun-1..8 (variants 8).
Mud table (dL* on changed px; strong local darkening is expected for mud):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 2005 | -55.1 | -15.1 | 0 | +2.92 | 9 | -0.6 |
| c01 | 2 | 6403 | -56.4 | -16.2 | 0 | +3.89 | 42 | -2.3 |
| c01 | 3 | 7998 | -61.5 | -17.0 | 0 | +4.23 | 40 | -1.7 |
| c03 | 1 | 2356 | -46.8 | -14.6 | 0 | +0.67 | 122 | -11.0 |
| c03 | 2 | 5390 | -49.9 | -15.5 | 0 | +2.41 | 155 | -11.3 |
| c03 | 3 | 9523 | -68.3 | -20.4 | 0 | +4.32 | 245 | -13.3 |
| c12 | 1 | 2968 | -57.5 | -15.3 | 0 | +3.43 | 2 | -9.3 |
| c12 | 2 | 8052 | -58.1 | -17.1 | 0 | +4.83 | 3 | -10.1 |
| c12 | 3 | 11698 | -72.1 | -20.4 | 0 | +6.17 | 1 | -11.4 |
| c30 | 1 | 2837 | -50.5 | -16.7 | 0 | +6.27 | 0 | -4.6 |
| c30 | 2 | 7357 | -62.4 | -18.5 | 0 | +7.23 | 1 | -8.0 |
| c30 | 3 | 10579 | -60.8 | -19.3 | 0 | +7.98 | 2 | -8.9 |
### Looked at
1.5x/3x crops of c01, c30, c03, c12 all levels; neck, both hands, cup/branch/beads at lv3: clean, no halo, no grey. Mud reads as a natural progression of lv1 (more at the hem, finer pieces), all vertical.
### Samples (2400 px tall, c01 | c30 | c03 | c12, label in Vietnamese)
https://ctm-img.victoria-tntt.workers.dev/img/_review/cloth-xoc/stain-uot-1.png (-2, -3) and stain-bun-1.png (-2, -3). Older r5 crops stain-uot-*-neck/hand-* still there (stale). Tea unchanged. Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review cloth-xoc
Tests: cloth-stain.js OK (+wet never lighter/greyer), cloth-xoc.js OK, one-core-guard PASS, quickcheck PASS (b5d7efe, site rebuilt).

## r6b (after MAIN s41 FAIL on b5d7efe: mud speckle/spikes/shoe; wet needs dry panels; c03 lotus glow) — SẴN SÀNG KIỂM review/cloth-xoc 11648eb (QUICKCHECK PASS, tests OK, effects OFF)
Root causes + fixes (jcloth.js):
1. Mud speckle = the 768 px decals were drawn at 20-60 px by point-sampling one bilinear tap per screen pixel (no prefilter) -> aliased dots. `clothDecalMip`: premultiplied 2x2 box halvings cached on the decal, every non-crease decal draw (mud, tea, wet shapes) samples a copy <= 2x its drawn size -> soft edges as on the decal sheet. Creases ('shade' blend, approved) untouched. Side effect: lv1 mud strips + tea are now soft-edged too (same shapes/positions; lv1 no longer byte-identical, only anti-aliased).
2. Mud lv2/lv3: no more bun-6 wicks / bun-7 rows. New soft TIDE BAND in code (BAL bun.tide): per-column uneven height (fbm), darker at the hem, blurred top edge with a faint tide line, multiply mud colour [122,84,50]; + sparse pieces: lv2 drops bun-3 x2 + drip bun-5 x1; lv3 drops x3 + drips x2 + one splash bun-4. Shoes: centre bottom 5 % restored to 85 % clean (BAL bun.shoe).
3. c03 lotus 'glow' was NOT the art (dry panel shows no glow): the stain protect map (skin colour test + held-item colour test, blurred wide) caught the pink lotus embroidery, so wet/mud left a dry halo round it. New mk.protL for stain layers only: protect fades out below .55-.65 of the figure (hands never go there; BAL xoc.lowA/lowB). Creases keep protS/prot unchanged.
4. Found while checking 3: black specks on c01 lv2/3 — local robe colour = 0 where the mask was excluded; now the local colour uses protL and falls back to the pixel's own colour. Fixed (min dL* back to -22).
Wet table (r6b):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 45468 | -11.1 | -6.3 | 0 | +4.16 | 0 | -2.1 |
| c01 | 2 | 99850 | -17.5 | -9.4 | 0 | +6.45 | 0 | -2.7 |
| c01 | 3 | 120449 | -22.1 | -13.5 | 0 | +9.33 | 0 | -3.4 |
| c03 | 1 | 78548 | -9.5 | -4.0 | 0 | +2.91 | 0 | -1.4 |
| c03 | 2 | 102545 | -15.1 | -7.4 | 0 | +5.23 | 0 | -2.4 |
| c03 | 3 | 136113 | -18.5 | -10.8 | 0 | +7.31 | 13 | -3.5 |
| c12 | 1 | 36427 | -8.5 | -3.1 | 0 | +1.95 | 0 | -1.2 |
| c12 | 2 | 50011 | -13.7 | -7.0 | 0 | +4.17 | 0 | -2.4 |
| c12 | 3 | 104887 | -17.9 | -8.6 | 0 | +5.18 | 0 | -3.0 |
| c30 | 1 | 38765 | -8.3 | -4.6 | 0 | +1.49 | 0 | -1.6 |
| c30 | 2 | 67497 | -12.8 | -6.4 | 0 | +1.91 | 0 | -2.0 |
| c30 | 3 | 108120 | -16.1 | -9.0 | 0 | +2.55 | 106 | -3.0 |
Mud table (r6b):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 3340 | -46.6 | -7.8 | 0 | +1.36 | 0 | -0.2 |
| c01 | 2 | 16481 | -54.3 | -9.4 | 0 | +1.18 | 11 | +0.0 |
| c01 | 3 | 24718 | -65.4 | -13.4 | 0 | +1.49 | 116 | +0.1 |
| c03 | 1 | 3576 | -42.1 | -8.4 | 0 | +0.18 | 80 | -6.2 |
| c03 | 2 | 18078 | -47.4 | -10.3 | 0 | +1.28 | 203 | -5.1 |
| c03 | 3 | 26817 | -59.2 | -15.0 | 0 | +1.88 | 670 | -7.2 |
| c12 | 1 | 4701 | -40.2 | -8.6 | 0 | +1.72 | 0 | -5.2 |
| c12 | 2 | 20356 | -52.9 | -10.9 | 0 | +2.29 | 0 | -4.8 |
| c12 | 3 | 28600 | -61.1 | -16.0 | 0 | +3.34 | 0 | -6.6 |
| c30 | 1 | 4758 | -44.9 | -9.0 | 0 | +3.04 | 2 | -2.7 |
| c30 | 2 | 19713 | -52.9 | -10.9 | 0 | +3.48 | 0 | -3.3 |
| c30 | 3 | 27181 | -63.6 | -16.6 | 0 | +5.39 | 0 | -3.9 |
Samples (CDN img/_review/cloth-xoc/): drywet-uot-{c01,c30,c03,c12}.png and drywet-bun-{c01,c30,c03,c12}.png = DRY | lv1 | lv2 | lv3, waist->hem, 2x; stain-{uot,bun}-1..3.png full figures 2400 px. Looked at all: no grey, no speckle, no lotus halo, shoes clean, neck/hands clean.

## r6c (after MAIN s41 on 11648eb: MUD OK; WET FAIL 'lighter-than-dry white bands' c01/c30) — SẴN SÀNG KIỂM review/cloth-xoc 5444f0d (QUICKCHECK PASS, tests OK, creases byte-identical to 8dab3d4, effects OFF)
Whole-figure FINAL vs DRY diff (every pixel, all 4 robes x 3 levels): max ΔL* = 0.00, pixels ΔL*>+2 = 0, max channel increase = 0, alpha changed = 0 (map img/_review/cloth-xoc/wet-lighter-map.png = all empty). So nothing is lighter than dry; the 'white bands' were DRY slots left between the vertical wet streaks next to deepened cloth (contrast), plus pixels the mask never wetted. Root causes killed:
1. Dry slots: lv2/lv3 now add a soak FLOOR over the whole robe below the chest (BAL uot.deep.floor [0,0,.6,.92], soft noise), per-level darkness darkL [0,.2,.22,.3]; light pixels no longer deepen less than dark ones (removed (1-.3·L) factor). lv3 reads clearly soaked in the robe's own hue.
2. Never-wetted spots: the cloth mask drops every skin-coloured pixel, so cream/pink embroidery (c03 lotus, c01 peony) and cream lining touching the hands stayed dry and glowed. New stain-only masks in clothMask: skinT = neck + hand blobs near the body centre (|x-cx| < .2 fw, above the knees) trimmed to <= 3 px around a core of tight face-colour pixels (BAL xoc.skin.handX .2, core .35); mS = cloth mask built with skinT; protL uses skinT + held items with a 2 px feather near the centre only. Creases still use the old m/protS/prot (checked: crease output hash identical to 8dab3d4).
Wet table (r6c):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 47115 | -14.2 | -7.8 | 0 | +5.11 | 0 | -2.5 |
| c01 | 2 | 154713 | -24.6 | -12.3 | 0 | +7.76 | 0 | -3.2 |
| c01 | 3 | 155010 | -35.7 | -23.1 | 0 | +9.02 | 56 | -4.2 |
| c03 | 1 | 81969 | -11.4 | -5.1 | 0 | +3.60 | 0 | -1.8 |
| c03 | 2 | 155195 | -18.8 | -10.1 | 0 | +6.11 | 3 | -3.2 |
| c03 | 3 | 155290 | -30.6 | -20.2 | 0 | +6.90 | 327 | -4.6 |
| c12 | 1 | 37329 | -9.9 | -3.9 | 0 | +2.42 | 0 | -1.4 |
| c12 | 2 | 151543 | -16.7 | -8.9 | 0 | +4.88 | 27 | -3.0 |
| c12 | 3 | 155380 | -29.0 | -19.6 | 0 | +6.49 | 58 | -4.7 |
| c30 | 1 | 40305 | -9.6 | -5.8 | 0 | +1.85 | 0 | -2.0 |
| c30 | 2 | 144917 | -15.9 | -8.5 | 0 | +2.15 | 36 | -2.7 |
| c30 | 3 | 148165 | -25.8 | -18.8 | 0 | +3.05 | 652 | -3.9 |
Mud table (r6c, look unchanged except embroidery now takes mud too):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 3453 | -46.6 | -7.7 | 0 | +1.36 | 0 | -0.2 |
| c01 | 2 | 17534 | -54.3 | -9.9 | 0 | +1.28 | 11 | +0.1 |
| c01 | 3 | 25978 | -65.4 | -14.1 | 0 | +1.63 | 113 | +0.2 |
| c03 | 1 | 3716 | -49.0 | -8.6 | 0 | +0.29 | 80 | -6.2 |
| c03 | 2 | 18681 | -52.7 | -10.3 | 0 | +1.30 | 203 | -5.1 |
| c03 | 3 | 27661 | -60.2 | -15.2 | 0 | +1.92 | 670 | -7.2 |
| c12 | 1 | 4701 | -40.2 | -8.6 | 0 | +1.72 | 0 | -5.2 |
| c12 | 2 | 20356 | -52.9 | -10.9 | 0 | +2.29 | 0 | -4.8 |
| c12 | 3 | 28600 | -61.1 | -16.0 | 0 | +3.34 | 0 | -6.6 |
| c30 | 1 | 4758 | -44.9 | -9.0 | 0 | +3.04 | 2 | -2.7 |
| c30 | 2 | 19713 | -52.9 | -10.9 | 0 | +3.48 | 0 | -3.3 |
| c30 | 3 | 27181 | -63.6 | -16.6 | 0 | +5.39 | 0 | -3.9 |
Samples (CDN img/_review/cloth-xoc/): drywet-{uot,bun}-{c01,c30,c03,c12}.png (DRY | lv1 | lv2 | lv3, waist->hem, 2x), stain-{uot,bun}-1..3.png (2400 px full), wet-lighter-map.png. Looked at 3-5x zooms of hands/beads/cup/branch/neck on all 4: no halo ring, no dry lobes; the remaining light folds are in the dry art too (uniform multiplicative deepen, s .76-.95 measured there).

## r6d (owner OD 18/11 ~02:40Z on mud panels, relayed by s41) — SẴN SÀNG KIỂM review/cloth-xoc 504b228 (QUICKCHECK PASS; wet = r6c unchanged)
Mud: lv1 now has a small soft tide band at the hem (h .03, op .3) under its strips; lv2 tide h .08 and drops/drips reach higher (fy .8-.9); lv3 tide h .15 (climbs highest) + drops up to fy .72, drips, one splash. Shoes ~clean. Panels re-shot: CDN img/_review/cloth-xoc/drywet-bun-{c01,c30,c03,c12}.png + stain-bun-1..3.png. Table:
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 12241 | -49.0 | -6.8 | 0 | +0.84 | 0 | +0.1 |
| c01 | 2 | 22320 | -55.1 | -10.8 | 0 | +1.28 | 44 | +0.1 |
| c01 | 3 | 36677 | -65.6 | -14.9 | 0 | +1.60 | 241 | +0.3 |
| c03 | 1 | 13081 | -49.0 | -7.4 | 0 | +0.81 | 100 | -3.9 |
| c03 | 2 | 23926 | -56.2 | -11.5 | 0 | +1.45 | 308 | -5.4 |
| c03 | 3 | 40728 | -63.7 | -15.5 | 0 | +1.77 | 999 | -7.5 |
| c12 | 1 | 14717 | -45.0 | -7.6 | 0 | +1.54 | 0 | -3.6 |
| c12 | 2 | 25247 | -54.0 | -12.1 | 0 | +2.51 | 0 | -5.2 |
| c12 | 3 | 40577 | -66.2 | -16.7 | 0 | +3.38 | 1 | -6.6 |
| c30 | 1 | 14053 | -48.6 | -7.7 | 0 | +2.40 | 2 | -2.4 |
| c30 | 2 | 24273 | -52.9 | -12.3 | 0 | +3.85 | 5 | -3.2 |
| c30 | 3 | 39644 | -64.0 | -16.9 | 0 | +5.52 | 4 | -3.4 |

## r6e (owner via s42: WET FINAL all 3 levels (r6c); MUD shift: new lv1 = old lv2, new lv2 = old lv3, new lv3 darker + higher; must read on warm/red robes) — SẴN SÀNG KIỂM review/cloth-xoc 7270a76 (QUICKCHECK PASS)
Mud: BAL bun.lv/add/tide shifted one level; lv3 = 12 strips, 6 drop clusters up to fy .62, 4 drips, 2 splashes, tide h .23 op .7. Root cause of 'nhẹ hầu như không thấy' on orange/red: brown MULTIPLY on saturated red stays red. New blend 'mud' (drawDecalOnCloth) + tide: multiply then pull toward the mud colour by saturation (BAL bun.tm/warm .35), never lighter. Zoom 3x c01 lv1/lv3: soft, brown, no grey, no speckle. Full-body panels: CDN img/_review/cloth-xoc/full-bun-{c01,c30,c03,c12}.png. Table:
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 22489 | -54.1 | -12.2 | 0 | +0.78 | 376 | +0.8 |
| c01 | 2 | 36768 | -63.4 | -16.7 | 0 | +0.84 | 2854 | +1.2 |
| c01 | 3 | 53929 | -66.7 | -21.2 | 0 | +0.84 | 8012 | +1.6 |
| c03 | 1 | 24180 | -55.8 | -12.5 | 0 | +1.43 | 289 | -5.8 |
| c03 | 2 | 40952 | -62.8 | -16.9 | 0 | +1.67 | 948 | -8.0 |
| c03 | 3 | 58574 | -67.9 | -22.2 | 0 | +2.17 | 2131 | -10.8 |
| c12 | 1 | 25210 | -53.7 | -13.2 | 0 | +2.49 | 0 | -5.3 |
| c12 | 2 | 40956 | -65.3 | -17.9 | 0 | +3.27 | 102 | -6.7 |
| c12 | 3 | 59066 | -69.6 | -23.5 | 0 | +4.26 | 467 | -8.8 |
| c30 | 1 | 24079 | -53.4 | -12.8 | 0 | +3.99 | 6 | -3.2 |
| c30 | 2 | 40550 | -62.9 | -17.1 | 0 | +5.52 | 1 | -3.4 |
| c30 | 3 | 58257 | -65.7 | -22.8 | 0 | +7.55 | 39 | -3.4 |

## r6f (s42: TEA, owner 00:18Z + again now: faint/small on orange) — SẴN SÀNG KIỂM review/cloth-xoc be9d08e (QUICKCHECK PASS; mud = r6e, wet = r6c final)
Root cause: same as mud — tea-brown multiply on saturated red/orange stays red. 'stain' blend now pulls toward tea brown by cloth saturation (BAL stain.tea.pull .45, tra.tm .9), never lighter. Look: translucent amber core + tide ring (tea.core .2, ring .6, cap .5) instead of the near-opaque blob; sizes .3/.36/.44 of robe width; second splash moved from hem to the lap (hem clipped it into a flat horizontal patch). Full-body panels CDN img/_review/cloth-xoc/full-tra-{c01,c30,c03,c12}.png. Table (Lab chroma drop on c01/c03 = red/green turning tea-brown, intended):
| fig | lv | changed px | min dL* | mean dL* | lighter px | mean dC* | greyer px (dC*<-3) | mean dhue° |
|---|---|---|---|---|---|---|---|---|
| c01 | 1 | 2824 | -37.1 | -13.3 | 0 | -2.72 | 1266 | +4.7 |
| c01 | 2 | 10851 | -38.0 | -16.4 | 0 | -2.06 | 4718 | +4.9 |
| c01 | 3 | 22756 | -38.1 | -17.4 | 0 | -1.21 | 6327 | +4.5 |
| c03 | 1 | 5869 | -35.8 | -11.7 | 0 | -0.44 | 700 | -12.9 |
| c03 | 2 | 15455 | -36.5 | -14.9 | 0 | +0.39 | 983 | -13.4 |
| c03 | 3 | 29523 | -36.0 | -16.1 | 0 | +1.04 | 1060 | -13.1 |
| c12 | 1 | 5189 | -36.3 | -17.9 | 0 | +3.41 | 0 | -11.1 |
| c12 | 2 | 17989 | -37.0 | -18.7 | 0 | +3.58 | 19 | -11.1 |
| c12 | 3 | 32227 | -37.2 | -18.6 | 0 | +3.43 | 18 | -11.1 |
| c30 | 1 | 6334 | -31.3 | -17.8 | 0 | +8.18 | 0 | -9.1 |
| c30 | 2 | 18167 | -30.5 | -16.5 | 0 | +7.47 | 3 | -5.5 |
| c30 | 3 | 28403 | -48.6 | -16.3 | 0 | +7.20 | 108 | -4.2 |

## Branch note (r6f) — tea moved to review/cloth-tea
MAIN s42 order (arrived after the tea push): freeze review/cloth-xoc at 7270a76 (mud + wet, owner-approved), tea on review/cloth-tea. Done: review/cloth-tea = be9d08e (= 7270a76 + 4 tea-only commits 542a907, 4ce7c71, f98eae5, be9d08e: jcloth.js tea params + 'stain' saturation pull + site rebuild). review/cloth-xoc still points at be9d08e because my force-push back to 7270a76 was refused by the session permission guard. Reviewer of cloth-xoc: review sha 7270a76 (`git diff 7270a76 be9d08e` = tea only). Coordinator may reset review/cloth-xoc to 7270a76 or keep it.
