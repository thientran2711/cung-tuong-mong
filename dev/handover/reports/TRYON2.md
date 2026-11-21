# TRYON2 — sachet + jade try-on redo (owner L1701: v1 "làm ẩu")
STATUS: depth n/a (worker), START_CTX ~3 %, finished well under roll line. 0 gens, 0 cr, no Magnific calls.
Artifact (NEW): https://claude.ai/artifact/JCF5Vc2puZwrtwa9UMQusz  (old v1 1Vq6sMKho8gTbHYi1DdfzN left untouched)
Code: dev/art/sachet-tryon2/ (params.json = hand-measured pixel coords on the 752x1344 bases; fit_items.py; build_page.py; shots.js; sachet-tryon2.html)
Screenshots: dev/art/sachet-tryon2/screenshots/{pg_full_tui,pg_close_tui,pg_close_ngoc,pg_phone}.png

## What was wrong in v1
One sprite at 0.44 scale, one crude rectangle "front" polygon per maid, item top dropped on the hand area. Nothing followed each figure's hands / held item / sash.

## Per-maid fixes (all hand-measured from 3x gridded crops)
- Method for all: item = drawn cord (antialiased, tied at a point ON the sash band) + existing sprite (earring-test/tui_huong.png, ngoc_boi.png, loop cropped off, cord drawn instead). Occluder polygons per hand, held item, sleeve cut the item away, so cord runs BEHIND hands/held item, emerges below, lies in FRONT of vạt/robe. Soft shadow. Scale per figure (sprite body ≈ painted sachet width).
- tam: sash tie (452,467) on the blue sash band; occluders = left hand, lược box, right hand, right sleeve; item emerges under the right hand at (462,590), scale 0.38, over the pink flap/skirt edge. Fixed a first-pass bug (tie knot poking above the box).
- nhị: tie (452,458); occluders = envelope (held), both hands; item emerges below the envelope hem at (452,556), scale 0.40, over the blue skirt.
- nhất (worst in v1): tie (452,458) on the red bow sash; occluders = handkerchief (21-pt outline), both hands; cord visible on the vest panel above the right hand, hidden behind hand + handkerchief, emerges under the handkerchief's right bottom edge at (474,642) on the side tà, scale 0.38, kept clear of the painted sachet (no overlap) and of the right sleeve.
- Painted-sachet note kept on every card (all 3 bases already have one painted sachet; not painted over; new one hangs on the right).
- Page structure/ticks as v1 (Đeo/Tháo túi thơm, Đeo/Tháo ngọc bội, Toàn thân / Cận eo, tags 0 cr, TỔNG 0 cr). Note text updated.

## LOOKED
Close-ups of all 6 states (3 maids × sachet/jade) at 3x–4x incl. nhất tie + emergence under handkerchief, plus the full page; no overlap with hands/held items; no stair-stepped cord. Not re-checked: phone-width layout beyond the unchanged v1 CSS (screenshot pg_phone.png saved, not opened).
Honest limits: the sprite art is the old pink-red sachet / jade disc (not recoloured per maid); on nhất the tie sits where the sash meets the vest edge at the right of the bow.

## A38/keep
No prompt edited → no .keep needed (keep_check not applicable).
Commit: see below.
