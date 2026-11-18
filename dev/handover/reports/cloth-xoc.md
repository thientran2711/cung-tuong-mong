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
