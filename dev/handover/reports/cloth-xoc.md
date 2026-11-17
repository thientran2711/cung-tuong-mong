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
