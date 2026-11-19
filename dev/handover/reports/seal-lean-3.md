PRIORITY #1 CHECK: OD 19/11 ~06:55Z + ~07:05Z + ~07:10Z real | main dev/build/jemoseal.js KIT_EMOSEAL.lean, KIT.md §38.4 (no second implementation) | review/seal-lean(-2) landed | claims seal-lean-3.

# seal-lean-3 — branch review/seal-lean-3 @ 358fe51b (merged main 5dc5d9e0) — r2 below supersedes sha/hold/videos
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

## r2 (OD ~07:25Z + main msg) @ 358fe51b
- HOLD = 3 s (lean.holdMin 3, loops 0; n = 3/d loops, fractional OK) -> lean = .5 + 3 + 1.8 = 5.3 s. KIT.md 38.4 overwritten in place.
- EVENT DIALOG: seal beside the figure in every .ksz3 dialog leans ONCE per opening (lean.open ".ksz3", openDelay .7 s, forced: ends a running stage lean which is rescheduled; root.__kl = once). Stage/panel seals unchanged.
- 3-PART LOOPS: lean.parts {out:"-out",back:"-back"}: if <k>-out.webp + <k>.webp + <k>-back.webp exist: out while popping, loop during hold, back while shrinking; else single loop.
- Test fig-seal (MOTION=1 SECS=30; leanCheck + eventLean): Fold/iPad/1366 all pass: grow .22-.29, hold 3.58-3.65 (measured at 95 % size incl. ramps = 3 s css), shrink 1.45-1.57, big <= frame (Fold 107/74 in dialog, iPad 83/67), leansInDialog 1 on each, 0 overlaps, 0 errors.
- quickcheck PASS 186 s (open 1462 ms, perf 195/207 render, tab 399/349, buoi 1067/927).
- Videos (CDN  base above, replaced): full-*, close-{gian,buon,vui,binh}-*, NEW event-755x1000.mp4 + event-1180x820.mp4 (full-screen: dialog opens, seal pops to head size beside the figure, holds, shrinks; LOOKED on frame sheets).
Note: Fold event take = seal pops beside the figure at the dialog's left; stays inside the dialog/screen.

## r3 @ b66869d6 (merged LIVE main 950508fc)
- Fix: the once-per-opening flag sits on the figure column (lean.openKey .kszfig), because the .ksz3 shell persists between openings (a stale flag made the dialog lean fail ~1 in 4 runs). fig-seal Fold/iPad/1366 x2 each: pass, leansInDialog 1 every time, 0 errors.
- Fix: a seal already bigger than the head frame (box not laid out / mid-transition: one video take showed a 435 px pop) never leans (kesLean skips + reschedules); kesHead no longer max()es with the seal's own width.
- quickcheck PASS 193 s (open 1538 ms; render 247/185, tab 442/454, buoi 1185/1379, tasks>200ms 21/20; core gates PASS).
- Videos re-recorded on b66869d6 (same CDN names, folder img/_review/seal-lean-3/): full-*, event-*, close-{gian,buon,vui,binh}-* for 755x1000 + 1180x820. Note: a stage seal may still lean over an open dialog (above UI by the owner's word); the dialog's own seal leans once on open.

## r4 @ 08bd4868 (merged LIVE main 62055a31) — ROOT-66 fixes + ROOT-65 giận 3-part test
- Stage seals never lean under ANY open dialog/sheet/book page (kesBlocked: kitDialogOpen() + body.kbk-open; seals inside lean.modalIn are exempt; a running lean ends within 250 ms). Only the seal beside the person in the dialog leans.
- No empty disc: a seal whose still is not loaded is hidden (kemo-wait) until load/error.
- 3-PART giận: KIT_EMOSEAL.three.gian = {out 1.65, back 2.64, c0 .569, c1 .833} (measured from the 288 px clips); files <set><k>-out/.webp/-back probed + preloaded (kesPre), lean waits until known, falls back to single loop when a part is missing (live img/kit/emo-anim/gian.webp untouched, no -out/-back there => old behaviour live). Out plays while popping (grow = 1.65 s, CSS envelope ease-in-out, kemo-3p), loop holds 3 s, back plays while shrinking (2.64 s) and ends on the still. Box = head frame / c1 (loop circle = head frame, 129 px box on Fold, 99 iPad), never clipped (hands/smoke leave the circle), start/end scale puts the clip's small circle on the small seal. No CSS shake / fx sprite in this mode. Total lean 7.3 s. Test base: GIAN3=<base> env in fig-seal.js + seal-lean-video.js sets KIT_EMOSEAL.anim at runtime.
- NOTE for owner OD: grow of the giận set is 1.65 s (the clip's own pop), not < 1 s; the single-loop path stays .5 s.
- fig-seal Fold/iPad/1366 (default + GIAN3): pass, 0 errors, dialog lean 1; GIAN3 Fold: giận leans 129 px box (circle 107 = frame), grow ~.5 (95 % of box) hold 4.7 shrink 2.1. quickcheck PASS 216 s (open 1641, render 234/255, tab 472/483, buoi 1418/1346).
- Videos (CDN img/_review/seal-lean-3/, replaced, game fills frame; LOOKED): full-755x1000 / full-1180x820 (natural, stage giận leans with out/loop/back + green seal), event-755x1000 / event-1180x820 (dialog opens, the dialog person's REAL giận seal leans out->loop->back, ends on the still; no stage lean over the dialog), close-{gian,buon,vui,binh}-*. anim/ = Foreman C's 3 clips (kept).

## r5 @ bd012c4e (up to date with LIVE main 62055a31) — ROOT-67 FAIL: beige square at part changes
- ROOT CAUSE: the big seal was ONE <img> whose src was swapped between parts; Chrome painted the new picture as an opaque beige rectangle (with the drop-shadow outline) for 1-3 frames before it was decoded, and a webp clip (loop count 0 = forever, ANIM background colour opaque white ffffffff in Foreman C's files, frame 0 a sub-rectangle) wraps to frame 0 if the swap timer is late. Seen at lean start, out->loop and loop->back, stage and dialog alike.
- FIX (whole family: stage, dialog, panel, single-loop and 3-part): the big seal is now a box span.kemo-big (envelope + feeling motion + shadow unchanged) holding ONE <img> per picture; every picture is created, img.decode()d BEFORE it is shown, put on top, and the previous <img> is removed 2 frames later (kesShow). No src swap inside a displayed image, no background on any box. out->loop swap is lean.partLead .12 s BEFORE the out clip's last frame, the lean ends .12 s before the back clip wraps. Selectors img.kemo-big -> .kemo-big (jemoseal css, kesSweep, tests).
- Frame-stepped at 25 fps (cropped on the dialog seal, whole lean, both devices; DOMLOG=1 also logs the DOM every 20 ms): 0 beige squares (before: 2-3 frames at each swap). The one blurry frame at ~6.4 s is the screencast encoder (the figure next to it is blocky too), not the seal.
- NOTE for Foreman C / ROOT-65 (optional hardening): export gian-out/-back with loop count 1 and ANIM background 00000000 (I patched the bytes into img/_review/seal-lean-3/anim2/ to test; it did not change the glitch, the decode fix did).
- fig-seal Fold/iPad (default + GIAN3) pass; quickcheck PASS 203 s (open 1534, render 235/219, tab 470/501, buoi 1409/1121). Videos re-recorded (same CDN names): full-*, event-*, close-{gian,buon,vui,binh}-* for 755x1000 + 1180x820 (GIAN3 base .../anim/).
