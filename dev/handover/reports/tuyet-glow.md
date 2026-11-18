# tuyet-glow — review/tuyet-glow @ 1c4ea403 (v8, APPROVED FINAL by owner 18/11 01:24Z; in review/looks-s40)
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

## v6 BUILD (owner OK 17/11 ~23:2xZ: whole face, fewer stars)
- Based on origin/review/toil-looks5 2712920c (NOT main: main eb3675a6 has no Khuynh thanh look; toil-looks5 must land first). History squashed (old v1-v5 commits dropped).
- BAL.toil.glow: zones (9 zones x 2 spots over the whole face, none on the lips), stars 7 per burst (random zones per burst, `toilGlowOn`), gap [8000,15000] ms, burstMs 2600, scope "face" ("body" reserved), variants A/B/C (use "B").
- Hook: toilFaceLayer (look tuyet) -> every place kitFxLayers draws her: stage/podium (kitFxPut), avatar frames (jk4:191), mirror kitFaceZoom, toilette reveal, others'/co-op views.
- Gates (4cc143ce): QUICKCHECK PASS 134 s (render 166/165 ms, tab 360/355, buoi 768/704), core gates PASS (one-core-guard fixed: skin tolerance ladder -> BAL.toil.glow.tolK), time-spill PASS.
- Shots: https://ctm-img.victoria-tntt.workers.dev/img/_review/tuyet-glow/shot-fold.png (755x1000@2) and shot-ipad.png (1180x820@2); videos v6.mp4 / v6-room.mp4. Delete after verdict: cdn_sync.py --wipe-review tuyet-glow.

## Final (v7 lower face, v8 smaller grains)
v7: >= BAL.toil.glow.loMin (2) of each burst's 7 stars on chin/jaw/lower cheeks. v8: BAL.toil.glow.size .72 (stars + iris twinkles). Quickcheck PASS 133 s at 1c4ea403, core gates PASS. Review shots wiped from the CDN (img/_review/tuyet-glow/).
