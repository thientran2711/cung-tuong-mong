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

## r2 (verdict s39)
- nhẹ now = short faint lash-run under each eye + blush drag/blur (BAL.looks.smuFx.tear/blush level 1); 1 < 2 < 3 read clearly.
- Lip off the mouth in r1 samples = the FROZEN face-fit (the §60 colour layer's own lip is already off at level 0 on that picture; the smudge follows the same img/mk-fit points). A contact sheet of 24 consorts showed ~half have the pasted-lip fit. Samples re-shot on por/fig-consort-c19-kc-a18 whose lips fit. No re-fit done (OD 04:05Z).
- NPC path checked: dev/test/smudge-code.js lifts the 'seen' rule for one NPC woman (rival, own portrait with face points) and confirms the klk-smu layer is drawn (sampled colours). In play an unscouted woman shows no marks (fxSeen).

## r3 (verdict s39 r2)
- (a) every smudge layer (all levels, NPC path too — same function) is multiplied by a skin mask measured from the picture's own skin-coloured pixels (blurred so eyes/lips are bridged, soft edge inside the real face edge, cut at the chin): nothing on hair / background / neck.
- (b) lip smear = soft halo along the lower lip + a feathered drag from one corner that fades out; no polygon, no hard edge, smaller.
- Decision recorded (s39): lash-run only when there is eye makeup; no makeup + crying = red eyes/nose tint (LOOK_DECALS B), no grey streaks → not in this branch.

## r4 (owner: use the tuyet-glow face)
- Face = fig-consort-c11-tcold-a18 (tuyet-glow sampler default FACE c11-tcold-a18), close-up on its FIGURE picture, as in the v5b videos. Level 0 lips sit exactly on the painted lips (looked at).
- IMPORTANT finding: the CDN img/mk-fit/consort-c11.json differs from the repo's dev/art/mkfit/consort-c11.json (fig lip points ~1 % of width left / 0.4 % up). With the CDN table the colour layer's lips (the makeup itself, level 0) are off the mouth on this face; with the repo table (what the tuyet-glow sampler injected from dev/art) they fit. Samples were shot with LOCALFIT=1 (repo table) on a scratch merge of main + review/toil-looks5 (toil-looks5's lip handling is not on main yet). Someone should compare/push dev/art/mkfit to the CDN (owner's lips complaint = that mismatch).
- lip zone is now allowed through the skin mask (lips are not skin-coloured) so the soft lip halo + corner drag show; tears/blush stay clipped to skin.

## r5 (owner on r4: nhẹ ok; vừa one side short / one long; nặng fewer details)
- vừa: BAL.looks.smuFx.tear.pair[2] = [.5, 1.5] u — one eye's lash-run short, the other long (which eye is seeded per face). nặng: one clean run per eye (n 1), softer blush blot / drag, smaller lip smear (BAL smuFx values), still heavier than vừa. nhẹ untouched. smudge-2 / smudge-3 re-uploaded.

## r6 (owner: vừa blush must bleed into the skin; nặng back to the first heavy look but prettier)
- BAL.looks.smuFx.blush.wash: a wide feathered halo from each cheek (down / outward, heavily blurred) so the blush bleeds into the skin, vừa .3 / nặng .42. nặng: 3 lash runs per eye (n 3, lengths 1 / .62 / .38), tear.fine: thin at the lash line tapering to nothing, wandering, broken, soft; blush streak + blot back to r4 strength; lip drag soft. vừa tears untouched (approved). Known: where the skin mask meets the face edge the wash ends in a faint straight edge on the far cheek.

## r7 (s39: far-cheek straight edge of the wash)
- Skin mask edge feathered (wider blur, wider ramp, window 1.7u ramp .5u) and the blush wash is multiplied by a deep-skin core (blur .3u) so it fades out well before the face contour; applies to every level and the NPC path (same function). Removes the r6 'known' faint straight edge.

## r8 (owner: wash leaks off the face; pink run lighter + diffuse)
- ROOT: the clip was the pixel skin mask (ears, neck, jaw shadow count as skin). Now every layer (streaks, wash, lip drag, tears) is multiplied by a FACE OVAL built from the face points: eye-corner extents at the eyes, narrowing through the mouth to the chin, inset .06u (~3 % of face width), feather .16u. Same function for all levels + NPC path. (The old skin-pixel mask is only used by nothing now except the wash core: removed from the clip.)
- Pink streak run: BAL.looks.smuFx.blush.sgain [0,1,.5,.5] (half opacity at vừa/nặng), streak breakup .3, extra blur .05u+.03u so no band edges; the wide wash (feathered bleed) unchanged. nhẹ untouched.
- Test harness now waits for the picture to load before the shot.

## r9 (s39: near-eye lash runs lost to the oval; jaw edge too firm)
- mkFace(): two ovals from the same face points: wash / pink run / lip drag = inset .06u, feather .3u (≈ 13 % of the face width on the jaw curve, no firm edge); lash runs = roomier oval (eye extents ±.55u, no inset, feather .12u) so the under-eye area of BOTH eyes is inside → nặng shows 3 runs per eye again (near eye included). vừa short run floor-visible (pair [.55, 1.5], breaks floored at .8).

## r10 (owner: pink must not read as vertical streaks; paler)
- vừa / nặng: the pink vertical run (smear) is removed entirely; the pink is only the diffuse flush from the blush (BAL.looks.smuFx.blush.wash .16 / .22, blur .2u + .1u ≈ 13 % of face width, no direction, no blot). nhẹ keeps its small downward blush drag. Grey lash runs untouched. Checked at 420 px width (phone size): no pink stripe visible.

## r11 (owner: the smudge's own pink much paler — the makeup blush is already pink below)
- BAL.looks.smuFx.blush.wash [0,0,.055,.075] (about 1/3 of r10): only a hint of a smeared spread, no new colour. Grey runs, lip drag, nhẹ untouched. Checked at 420 px.

## r12 (owner 00:58Z: pick the smear strength by numbers)
- ONE knob family BAL.looks.smuFx.pct = {blush:[0,0,P,P], lip:[0,0,P,P]} = opacity of the smudge's own pink smear and of the lip smear at vừa / nặng (null = older wash / lip.a numbers). Default .10. Grey eye runs + nhẹ untouched. Options rendered with both at the same %: CDN img/_review/smudge/opt-<2|3>-<5|10|15|20>.png (2 = vừa, 3 = nặng), c11-tcold, labels 'Lem vừa · 5 %' … 'Lem nặng · 20 %'. Test: PCT=10 node dev/test/smudge-code.js <url> <outdir>.

## r13 (owner 01:21Z: grey runs too opaque; pink still a vertical stripe at any %)
- ROOT of the pink stripe: not the wash but the EYESHADOW RUN (layer 2: lid colour smeared straight down the cheek = two vertical slabs, seen by dumping the layer's alpha). Removed at vừa / nặng (smuFx.lid.a [0,.24,0,0]; nhẹ unchanged). The smudge pink at vừa / nặng is now ONLY a soft radial bloom, the same gradient shape as the makeup blush (full at the centre, .55 at .35, 0 at the rim), a little larger / lower / outward; no smear, no skin-mask cut, only the face oval. Lip smear: soft splat halo, same falloff (unchanged shape, opacity from the knob).
- Grey lash runs: more transparent (tear.a [0,.2,.27,.34]) and softer (blur .016u / .022u).
- Measure (dev/test/smudge-code.js, pink layer alone, row through the cheek band, 20 %): max ABSOLUTE alpha step between neighbouring pixels = .012 at vừa and nặng (≈ 3/255 per pixel, threshold .02) = smooth, no step. Looked at 3x crops of both cheeks at nặng 20 % and vừa: no vertical line / edge.
- Options re-rendered: CDN img/_review/smudge/opt-<2|3>-<5|10|15|20>.png.

## Open items / follow-ups
- Small figure faces (~40 px): nhẹ barely visible, vừa/nặng read as a tear stain.
- Shots outside git; built root files not committed.

## State
branch review/smudge-code 6e56871 (pushed). Waiting for verdict.
