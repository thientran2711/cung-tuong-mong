# tool-trial-3d — PlayCanvas trial: Emperor's card-flip tray in real depth
Worker: trial worker (tool-trial-3d). Code branch: review/tool-trial-3d (isolated demo, NOT wired into the game). Date 11/16/2026.

## Read this first (honest caveats)
- The PlayCanvas PLUGIN SKILLS were NOT available in this cloud session (plugin not enabled for cloud; ListSkills/ListPlugins empty). Per main's order the demo was built with the PLAIN PlayCanvas engine (npm playcanvas@2.8.2, pinned, vendored). So this trial judges the ENGINE look/weight, not the plugin's helper skills.
- The cloud box has no GPU (Chromium + SwiftShader software GL). FPS numbers below are therefore NOT iPad/Fold GPU numbers. They show only (a) main-thread CPU cost and (b) that software rasterising a large canvas is slow. A real-device FPS check on the owner's iPad/Fold is still required before any decision.
- Videos are rendered by stepping the scene clock frame by frame (24 fps, 14.0 s, real speed). That makes them smooth regardless of box speed. Captured at dpr 1 (CSS-pixel size) because dpr 2 took ~14 s/frame on software GL.
- Card faces/frames/backs/hand/seal/tray = existing CDN art (img/kit/cf-gplate-emp(-p), card-back, frame-consort-*, face-consort-*, cf-hand-emp, cf-seal-thitam). No new painting. Card back is cropped to the card shape and given a gold edge by code (demo shortcut).

## What was built (dev/demo/pc-tray/, 1 page + main.js + vendored engine)
Tray painting = textured plane. 8 cards = two back-to-back textured planes each (back = card-back, front = real kit frame + consort face composed on a canvas). Warm spot light at the painted lantern position with soft flicker (2 incommensurate sines) + real-time shadow map (PCF5, 1024) so lifted cards throw a shadow on the silk floor; slow camera drift/parallax so the lift has genuine depth. Beats (slow, 14 s): lamp-lit tray → Emperor's hand (existing art) reaches in from above → card lifts toward the camera → turns 180° in space with a tilt → travels to centre and grows, the other cards dim → THỊ TẨM seal drops with a small bounce → additive gold halo + a few drifting glints + warm light pulse. Replay button via ?ui.

## Videos (real speed, mp4 h264)
- dev/handover/reports/tool-trial-3d/pc-tray-755x1000.mp4 (Fold, 3.8 MB, 14 s)
- dev/handover/reports/tool-trial-3d/pc-tray-1180x820.mp4 (iPad, 4.9 MB, 14 s)
- stills: still-755x1000.jpg, still-1180x820.jpg
Self-check: frames viewed at 8 timestamps per size: tray + lacquer + gilt read as the painted game; cards keep the painted frames; no page errors. Weak spots: the lifted card is a flat plane (no thickness, so the turn reads as a paper flip, fine); the shadow is soft and subtle at rest, only clear while lifted; hand is large and covers neighbours while reaching; seal is a flat sprite (same as the 2D game).

## Measurements
Weight (download)
- Engine, full prebuilt playcanvas.min.mjs 2.8.2: 1,935,666 B raw / 484,816 B gzip.
- Engine tree-shaken with esbuild (only the classes used): 1,636,016 B raw / 411,855 B gzip. Not much smaller: the standard-material/shader chunks dominate.
- Scene art for the demo (CDN, already in the game cache except card-back/hand/seal reuse): tray 194 KB (landscape) / 182 KB (portrait), card-back 62, hand 27, seal 39, 4 frames ~220, 8 faces ~80 ≈ 0.6–0.7 MB total; ~0.1 MB is new to a player who already saw the 2D flip.
- Own code: ~12 KB.
- ADDED to the game if adopted: ≈ +412 KB gz engine (+0.6 MB art that the 2D scene mostly already ships). The PERFORMANCE BUDGET says centre art ≤ ~250 KB per scene: the engine alone is ~1.7× that, loaded for one scene.
First load (localhost, no network latency, CPU 4×): assets ready (decoded + textures built) 1.1–1.6 s; page "ready" 2.1–2.6 s incl. engine parse. On a real phone over the network add ~0.5 MB transfer.
Memory: JS heap 11–20 MB (measured). GPU: ~8 card textures 550×1037 + mips ≈ 25 MB + tray 1600×1200 ≈ 10 MB + shadow map 4 MB ≈ 40 MB, plus a SECOND WebGL context beside Pixi's (iOS Safari limits contexts; a second context roughly doubles canvas/backbuffer memory at dpr 2: 755×1000@2 = 6 MB per buffer ×2-3).
CPU/main thread (viewport 120×160 so the software rasteriser is negligible): at CPU 4× throttle 59.7 fps, p95 frame 26 ms, 0 long tasks over the whole 14 s scene; CPU 1×: 59.4 fps. So the JS/scene-graph side is cheap.
Full-size runs on SwiftShader at CPU 4× (NOT representative of GPU): 755×1000@2 3.0 fps; 1180×820@2 2.5 fps; at dpr 1: 7.4 fps / 6.5 fps; long tasks 3–5 per run (≈1–3 s total), all inside software GL draw. Real GPUs run this kind of scene (8 lit textured quads, 1 spot shadow) trivially, but shadow-mapped PCF5 + MSAA at dpr 2 on an iPad under the game's already-heavy Pixi page is untested.

## What PlayCanvas could add (2–3 big moments)
1. The Emperor's card-flip tray (this demo): real depth, lamp flicker with shadows moving as cards lift, parallax drift. The strongest case.
2. Edict / memorial scroll unrolling on the Emperor's desk (a curved cloth surface lit by the lamp: hard to fake in 2D).
3. Night lantern scenes (lamp-lit table, banquet, Thị tẩm bed curtains drifting) where dynamic light + shadow on painted props is the whole effect.
Everything else (HUD, tabs, kit panels, maps, minigames) gains nothing.

## Gain vs risk
Gain: a visibly richer "weight" in 2–3 once-a-week scenes: live shadows under the lifted card, light that breathes, camera parallax. In stills/video the improvement over the current 2D flip is real but modest; the painted tray already carries the style, and the engine mostly adds shadow + parallax.
Risks
- LAG (owner's first priority): a second WebGL context + ~40 MB GPU next to Pixi on iPad/Fold. Likelihood: can happen (unmeasured on device). Severity: large (the owner's #1 complaint). Detect: real-device FPS + memory check; fix by dropping the scene to the 2D fallback ("Gọn" mode) — possible but means maintaining two versions.
- Weight +412 KB gz for a once-a-week scene vs the ≤250 KB per-scene budget. Likelihood: certain. Severity: medium (lazy-load on demand softens it, but first week-end flip then waits ~1 s and costs mobile data). Fix: lazy-load + SW cache.
- Style drift (lit/tone-mapped 3D vs painted 2D look). Likelihood: can happen. Severity: small–medium. Detect: owner viewing; fix by tuning light/tonemap.
- Maintenance: a second render stack with its own coordinate system, co-op sync rules, reduced-motion fallback, kit rule ("all visuals from kit"). Likelihood: certain. Severity: medium, grows with each scene.
- Texture memory / context loss on iOS when the tab is backgrounded. Likelihood: can happen. Severity: medium (scene must recover). 
Weighed: Mất lớn hơn for the whole engine; the visible gain can be reproduced in Pixi for ~0 KB.

## ONE recommendation
Do NOT adopt PlayCanvas. Keep the game on Pixi and copy the three things that actually looked better here, as 2D tricks inside the existing kit card-flip: (1) a soft blurred shadow sprite that grows/shifts under the lifted card, (2) a slow ±2–3% scale/translate parallax drift on the tray vs. cards, (3) a gentle lamp flicker (opacity breathing of the existing .kcf-lamp gradient). That keeps the weight at ~0 KB and avoids a second WebGL context. Revisit PlayCanvas only if the owner, after watching the videos on her iPad, says the real-3D turn is worth +0.4 MB and a device FPS check on iPad/Fold passes; run that check first with ?ui&dpr=2 on the demo page (dev/demo/pc-tray/index.html).

## Files
Code (branch review/tool-trial-3d): dev/demo/pc-tray/{index.html,main.js,vendor/playcanvas.min.mjs}, dev/test/pc-tray-{serve.sh,shots.js,frames.js,measure.js}. Serve: `python3 -m http.server <port>` from repo root, open /dev/demo/pc-tray/index.html?ui. Frames: `node dev/test/pc-tray-frames.js <base> <out> 755x1000 1 24 14`, encode with ffmpeg (pad width to even).

## HANDOVER (context rollover)
Worker finished; nothing pending except coordinator relaying the videos to the owner.
