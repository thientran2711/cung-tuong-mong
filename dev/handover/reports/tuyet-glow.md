# tuyet-glow (SAMPLE only) — review/tuyet-glow @ 3bb19bde
Owner OD 17/11 ~21:50Z + ~21:55Z: Khuynh thanh skin glow = smooth glossy skin + one soft light streak gliding over forehead / nose bridge / cheekbones. Not sparkles. Khuynh thanh only. Sample first.
NOTE: branch is built on review/toil-looks9 e227451c (not plain origin/main): main has no Khuynh thanh makeup look yet (toil-looks5 v12-v18 unmerged).

## What
- dev/build/jtoil.js: `toilGlowLayer(file,col)` hooked in `toilFaceLayer` for look `tuyet` only (so it follows kitFxLayers: stage, portrait, mirror, others' views).
  One kit-fx element `<i class="kff kglw">` in the makeup layer box, placed by the existing mk-fit points (read-only, no re-fit).
  - `.kg-base`: static pearly gloss (pink-white 255,240,236) on forehead / nose bridge / cheekbones / chin + faint whole-face lift.
  - `.kg-sweep`: soft pink-white band, `mix-blend-mode:screen`, CSS animation `kglide` (no JS per frame) moving left to right through a MASK of the same zones.
  - Both clipped to face outline x skin colour minus eyes, lips, brows (same method as the makeup skin pass). Never yellow, never greys the face.
- Numbers: `BAL.toil.glow` {dur 3200 ms, face .26, band .32, sweepA .92, baseA .58, lift .05, col, sweepCol, per-zone fore/nose/cheek/chin}.
- Sampler: dev/measure/tuyet-glow.js (in-room stage crop + head-and-shoulders crop, face pinned, paused-animation frames).
## Samples (CDN, delete after verdict: `cdn_sync.py --wipe-review tuyet-glow`)
- still: https://ctm-img.victoria-tntt.workers.dev/img/_review/tuyet-glow/tuyet-glow-still.png
- loop (3.2 s, 24 frames): .../tuyet-glow-loop.webp and .../tuyet-glow-loop.gif
## Open before BUILD
- Streak is visible ~1.1 s of each 3.2 s cycle (rest in between); period/rest tunable in BAL/CSS keyframes.
- Phone heat: owner accepts. Per face cost = 1 canvas pass (cached), animation is CSS only.
- Build everywhere = check portrait / mirror / others' views on real sizes; quickcheck not yet run (sample only).
