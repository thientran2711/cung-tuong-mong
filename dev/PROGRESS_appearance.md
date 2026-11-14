# PROGRESS — review/appearance (dung mạo theo tình trạng)

Base: origin/review/items-earned (jrash/jveil). Owner 11/14 01:15Z approved 8 appearance conditions; coordinator then CUT scope to save credits:
build ONLY (1) ốm yếu, (2) trúng độc, (3) bị tát + phạt quỳ/trượng. Glow (dưỡng nhan), tóc bạc sớm, đậu mùa = postponed (no art) —
the shared registry (kitFaceFx) is built so they plug in later.

## Done
- KIT_RASH.ready=true (owner approved rash overlays) — commit 3ae3ddbc, also pushed to review/items-earned.
- Pilot art: ốm / trúng độc = CSS only (backdrop-filter saturate+brightness masked to the face oval, faint cool tint, soft under-eye shadow,
  lip tint: pale for ốm, faint blue-violet for độc), no paid art. Bị tát = one painted handprint (gpt-2-6, Magnific folder ba4aecfe,
  creation "XmPyFy8Bfo" mirrored → img/fx-slap.png via items/rash mkalpha.py), placed in the scar-fit box (cheek facing the viewer).
- Pilot sheets (portrait row 2x + figure head row 3x): dev/shots/appearance-pilot/pilot-c05-t2-a18.jpg, pilot-c18-t2-a26.jpg
  (Lành / Ốm nhẹ / Ốm nặng / Trúng độc / Bị tát). Sheet tools: scratchpad app/pilot (mk.js, shot.js, sheet.sh, fx.css).

## Next
- jface.js: kitFaceFx registry (overlay img or CSS layer + chip + Sắc), port KIT_RASH into it; conditions ill/doc/tat/phat; KIT.md doc.
- Keep KIT_FACEFX.ready=false (per entry) until the owner approves the pilot.
