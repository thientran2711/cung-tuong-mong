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
