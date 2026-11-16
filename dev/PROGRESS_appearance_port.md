# PROGRESS — review/appearance-port (D39, re-port of review/appearance + review/items-earned jrash)

Spec: OWNER_DECISIONS L107, L121-130 (all 8 conditions approved; scope cut to ill, poison, slap/punishment + rash; expressions REMOVED 22:50Z).
Base: origin/main b2690dfb3.

## Ported (hand re-apply; cherry-pick was too heavy on the shallow history)
- dev/build/jface.js: KIT_FACEFX registry (KIT.md 28.8b) with entries ill (CSS pallor), doc (poison, CSS), tat (img/fx-slap.png), phat (chip only);
  acts Tát / Phạt quỳ, Hạ độc / Hạ độc dần hooks, maid-path causes, her cards (pzcard), weekly wear-off. Expressions stay removed (no jexpr, no face-lm).
- dev/build/jrash.js: Nổi mẩn (dị ứng) for everyone: causes (spring pollen, son phấn, bad luck, act "Bỏ phấn lạ"), heal 1-4 tuần, Thái y / herbs, her card, img/rash-1..3.png (approved, ready=true), registry entry z20.
- jveil.js: vlNeed(p) = scar or rash, so a veil works for a rash (same grade rule, Vượt phẩm rule).
- assemble.py: jveil, jface, jrash, jearn order. KIT.md 28.8b restored. Overlay art uploaded to CDN (rash-1..3.png, fx-slap.png; already approved, no new art).
- Her own allergy in recipes (PM:L326): NOT ported as a separate system; the rash causes already include son phấn / food bad luck. Open: recipe-specific allergy (jrecipes) if owner wants ingredient allergies.

## Adaptations to current main (fixes of old-branch faults)
- Name clash: old `const FX` in jface clashed with jfx.js FX (build failed) -> renamed FXF.
- Name clash: jrash `rashOf` overwrote j40 `rashOf` (mood "rash" rule) -> renamed rshOf (jrash, jveil).
- jk4.js kitStageFig had its own KIT_RASH layer (called KIT_RASH.src(q) with a person -> "[object Object]" 404, and double layer): removed; kitFxLayers carries every face layer.
- The `.kfxf` transform copy from old branch not needed: current jk2b kitFigFx lays the box over the drawn picture; overlay aligned in tests.
- fig-bg: no code on main yet (KIT §61 reserved); layers use kitFxLayers/KIT_FIG boxes only.

## Tests (dev/test/appearance-port.js, dev/test/ap-zoom.js)
- 1180x820, 755x1000, 1366x1024, 844x390@2: new game; rash 1/2/3 (Sắc 60/55/49 from 65), ill (-4), poison (-7), slap (-3), pen; veil over rash (Sắc loss x cover); layers in DOM; no page errors, no image 4xx, no horizontal overflow.
- Zoom sheet checked by eye: pallor, grey poison, faint handprint, rash and veil sit on the face of her stage figure; faces stay serene.
- Not run: 390x844 rotate prompt (unchanged), Safari backdrop-filter (known degrade to tint), NPC rash chip only when known (K, logic).
- Old saves: all new fields (p.rash, p.pz, p.slap, p.pen) are optional; vlSync/vlMig handle missing.
