# tuyet-glow (SAMPLE only) — review/tuyet-glow @ 87b063e8 (v5b)
Owner OD 17/11 ~21:50Z, ~21:55Z, ~22:05Z, ~22:35Z, ~23:05Z, ~23:10Z. Based on review/toil-looks5 68e520f6 (owner row-3 blush). Sample only, nothing built into the game flow beyond the glow layer in jtoil.js.
## History (rejected by owner)
v1 painted patches, v2 stronger patches, v3 travelling band + global pulse ("curtain", fake), v4 skin highlights incl. lips ("close, not yet").
## Current (v5b)
- dev/build/jtoil.js: `toilGlowLayer` (look `tuyet` only, via toilFaceLayer / kitFxLayers = stage, portrait, mirror, others' views). One `<i class="kff kglw">` over the whole picture box, built once per picture (canvas, cached).
- Calm base: skin high points (cheekbones, brow bone, nose bridge, forehead; NO lips/chin/nose tip) = the picture's own luminance above its surroundings (skin-hue mask by g/r, b/r ratios; face points read-only), soft pink-white screen blend, each breathing on its own 2/4/8 s phase + a faint skin haze.
- Burst: every 8-15 s random (BAL.toil.glow.gap, first, burstMs 2600) class `.on` on the layer: soft 4-point stars (pink-white, some gold, varied size) on cheekbones, brow, temples, outer eye corners, forehead + iris catchlight twinkles, then calm.
- Variants via BAL.toil.glow.use = A / B / C (haze, stars 8/13/19, amp). Flag BAL.toil.glow.scope = "face" ("body" reserved for the dressing result; not implemented).
- Sampler dev/measure/tuyet-glow.js (env GLOW json, MODE stage|face, SECS, FPS, BURSTS, auto=false).
## Samples (CDN img/_review/tuyet-glow/; wipe after verdict: `cdn_sync.py --wipe-review tuyet-glow`)
v5b-A/B/C.mp4 (face 960 px, 16 s), v5b-B-room.mp4; older v1-v5 files also there.
## Open before BUILD
- Source figure pictures are 350 px wide, so close-ups are soft and iris sparkles small.
- Room backdrop shifts colour in the recordings (game's own backdrop), not part of the effect.
- Cost: one canvas pass per picture (cached) + CSS animations; quickcheck not run (sample only).
