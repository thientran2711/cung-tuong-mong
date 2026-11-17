# smudge-code — makeup smudge (phấn son lem nhem) as a CODE effect

PRIORITY #1 CHECK: OD 17/11 ~23:30Z (smudge = CODE on the makeup layer, not Magnific), ~16:20Z (g), ~16:40Z levels | main jlooks.js:78 lkSmudge + z24 kitFxLayers entry (fx-smu-N.png art never painted) | review/* none | claims MAIN s38.

## What
- `dev/build/jlooks.js`: new block `lkSmuDraw / lkSmuImg` (before the face-fx entries). The "lkface" entry now draws `smu` as ONE `<img class="klk klk-smu">` made in a canvas (cached per picture + level + colours, same recipe/pattern as jtoil `toilMkDraw`), instead of the fx-smu-N.png overlay. No Magnific art for smudge; other marks (ink, pox, stains) untouched.
- Reads her face points (img/mk-fit, read-only) and her colours (toilette son / má / mắt / mày); every other woman: lip / blush colour sampled from her picture. Shapes are directional (gravity) SMEARS of the makeup's own shapes: blush disc dragged down + softened (blotchy at nặng), eyeshadow run from the lower lid, lip colour bled past the line toward one corner (+ faint drag), grey-brown lash-run tear lines. Everything clipped to a jaw-shaped window, no hard edges, shaded by the picture's own light.
- Levels live in `BAL.looks.smuFx` (no typed numbers in the draw): 0 none · 1 nhẹ = blush streaked down + a little lid run · 2 vừa = + lash-run lines, lipstick bled a bit · 3 nặng = longer runs, 2 lines per eye, blotchy blush, lips smeared more. Crying = at least a short lash-run (`smuFx.cry`).
- Order unchanged (kitFxLayers z24, above the makeup layer, layer law kept). Works in every place kitFxLayers draws a face (stage, mirror zoom; portrait/avatar stay ID-card = no makeup/no smudge by OD 18:10Z).

## Tests
- `node dev/test/smudge-code.js <url> [outdir]`: layer present exactly once at levels 1-3 and absent at 0, below-order, pixel mass grows 0.025 < 0.056 < 0.092, no makeup → none, stage figure carries it, no face points → nothing, BAL keys. All true, 0 page errors.
- `node dev/test/looks-2.js <url>`: full old suite unchanged (scan all ok, all checks true).

## Samples (4 separate images, 1260 px, dpr 3, in-room kitFaceZoom close-up + small stage figure strip)
0 https://ctm-img.victoria-tntt.workers.dev/img/_review/smudge/smudge-0.png
1 https://ctm-img.victoria-tntt.workers.dev/img/_review/smudge/smudge-1.png
2 https://ctm-img.victoria-tntt.workers.dev/img/_review/smudge/smudge-2.png
3 https://ctm-img.victoria-tntt.workers.dev/img/_review/smudge/smudge-3.png
(wipe with `cdn_sync.py --wipe-review smudge` after the verdict)

## Known gaps / honest notes
- NOT done: "no makeup + crying = lash-run only". `lkGive`/`lkItem` still require makeup for `smu` (LK_MK, looks-2 test noMakeupNoSmu). Needs a decision: a separate "tears" state without makeup.
- NPC women path (sampled colours) is coded but I could not exercise it: the test NPC's figure was `unknown-fig-f.webp` (no face points). Not shot.
- Some pictures' img/mk-fit points sit off the painted face (seen on one random face: makeup lip itself landed on the chin). The smudge follows the same points, so it is off there exactly like the makeup; samples use a good face (por/fig-consort-c17-tcold-a18).
- Small figure faces are only ~40 px: nhẹ is barely visible there, vừa/nặng read as a tear stain.
- Shots outside git; built root files (index.html, sw.js, assets.json) not committed.

## State
branch review/smudge-code b074f4e (pushed). Waiting for MAIN's verdict.
