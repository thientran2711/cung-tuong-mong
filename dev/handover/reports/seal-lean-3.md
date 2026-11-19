PRIORITY #1 CHECK: OD 19/11 ~06:55Z + ~07:05Z + ~07:10Z real | main dev/build/jemoseal.js KIT_EMOSEAL.lean, KIT.md §38.4 (no second implementation) | review/seal-lean(-2) landed | claims seal-lean-3.

# seal-lean-3 — branch review/seal-lean-3 @ cc7297fa (on main 5400c87b)
Files: dev/build/jemoseal.js (+ rebuilt index.html/sw.js), dev/kit/KIT.md §38.4 (canon overwritten in place), dev/test/fig-seal.js, dev/test/seal-lean-video.js.

## What
- Lean-in POPS OUT FAST: KIT_EMOSEAL.lean.grow .5 s (ease-out). Hold unchanged (>=5 s AND >=2 loops, painted loop plays). SHRINKS SLOWLY: lean.shrink 1.8 s (was 1.6).
- MAX SIZE (owner ~07:10Z canon overwrite, NO per-figure measuring): ONE relative frame = lean.head.f .2 x the stage's standard figure height (#stage dataset kmlH x scale, same value the head markers use). .2 = head with hair of a typical stage figure (probe: player figure .208 of body; crowned empress .30 not used). Same for every seal; seal never shrinks below its own size; stays inside the screen (clamped, margin .16) and above UI (z 9990). Panel/dialog seal: f x dialog figure height, else lean.head.panel .1 x short screen side. Old scale/minFrac/maxFrac removed.
- ADD (OD ~07:05Z/main): feelings without a painted loop (vui, binh, ...) now get clearly stronger slow CSS motions (amplitudes ~2x: sway +-9deg + lift, nod 7% + +-5deg, bob 10%, wince, tremble, flicker, glint pulse) from KIT_EMOSEAL.keys data. animKey is alias-only: a feeling with no alias probes img/kit/emo-anim/<set><key>.webp by its own key, so a new loop file (vui, binh...) is picked up by adding the file.

## Tests (MOTION=1 SECS=40 node dev/test/fig-seal.js, leanCheck asserts grow<1 s, shrink>=1.5 s, hold>=5 s, big <= head frame)
| device | leans | grow s | hold s | shrink s | big px | frame px | inside | overlaps | errors | leanCheck |
|---|---|---|---|---|---|---|---|---|---|---|
| Fold 755x1000@2 | 3 | 0.23-0.25 | 6.58 | 1.57 | 107 | 107 | yes | 0 | 0 | PASS |
| iPad 1180x820@2 | 3 | 0.22-0.24 | 6.61 | 1.53-1.56 | 83 | 83 | yes | 0 | 0 | PASS |
| 1366x1024@1 | 3 | 0.25-0.27 | 6.58 | 1.53-1.55 | 108 | 108 | yes | 0 | 0 | PASS |
(grow/shrink measured to 95 % of size; css values .5 / 1.8 s.) stillAvatars: avatarOrOtherLive 0, topBarLive 0 on all.
quickcheck (cc7297fa): PASS 174 s, open 1290 ms, old save ok, perf new/live render 196/201, tab 429/378, buoi 898/1278, tasks>200ms 17/18, core gates PASS.

## Videos (real mp4, game fills the frame, LOOKED at frame sheets)
Base https://ctm-img.victoria-tntt.workers.dev/img/_review/seal-lean-3/
- full-755x1000.mp4 (Fold), full-1180x820.mp4 (iPad): natural take 34 s, 3 stage leans each (head seals of the two figures).
- close-{gian,buon,vui,binh}-{755x1000,1180x820}.mp4: close-ups 720x720, one full cycle (pop-out -> hold -> shrink). binh/vui = green ordinary face with the new stronger motion.
Frame check: seal pops to about head size above the figure, giận shows the painted loop + smoke, binh sways visibly, shrinks slowly back to the small still; inside screen; avatars still. NOTE: the painted loop for vui/binh does not exist yet (Foreman C), so those show CSS motion. Delete the CDN folder after the verdict (--wipe-review seal-lean-3).
