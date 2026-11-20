# EAR1 — earring + ngọc bội + túi hương try-on test (owner 20/11 ~06:20Z)
depth 1 · START_CTX ~3 % (1M window) · worker of Foreman C ROOT-66

## UPDATE 06:27Z — owner DROPPED ngọc bội / túi hương (ROOT-66 msg queued 06:19Z, reached me only after the work was done)
Demo is now EARRING ONLY (0.81 MB): one button «Đeo hoa tai» / «Tháo hoa tai» per figure, views Cận mặt + Toàn thân; screenshots re-taken. The two waist pictures (ngoc_boi.png, tui_huong.png) and their anchors stay in the folder/JSON for the record only. Budget note: the cut said ≤2 gens; 3 were already spent (earring + 2 waist items) before the message arrived — 1 over.

## Result (first version, before the drop)
- Demo: dev/art/earring-test/earring-demo.html (0.99 MB, self-contained, all pictures base64, no links). Toggles per figure: «Đeo/Tháo hoa tai», «Đeo/Tháo ngọc bội», «Đeo/Tháo túi hương». 3 views each: Cận mặt · Dải lưng · Toàn thân, checkerboard (transparent) backdrop. One card per row; checked at Fold 755x1000 and iPad 1180x820.
- Figures (FACE_CUTS_L703 cut-outs, looked at full size + 3x zoom):
  - c11 · Sắc sảo · FF (cut Cqn9IfbEEy): both ears free of hair, no earrings drawn → PAIR (right one mirrored).
  - c09 · Tinh nghịch · 3/4 (cut xSBWFuTjfW): one ear visible (picture-left), no earring drawn → ONE earring.
  - Rejected while picking: c16, c20, c05, c19, c15 have small earrings already drawn (or a dot at the lobe); c06/c14 ears under hair; c10 sash hidden by sleeve + book.
- Anchors: dev/art/earring-test/anchors.json (pixel coords in the 1024x2304 cut-out). Method: by eye on 3x zoom crops with a pixel ruler, then checked in the rendered page at 2x and corrected (first guesses sat just below the lobe / on the cheek). Waist = bottom edge of the sash, cord top of the item tied there.
- Screenshots: dev/art/earring-test/screenshots/{fold,ipad}_{c11,c09}_{off,on}.png + {fold,ipad}_page_off.png.
- Build: python3 dev/art/earring-test/build_demo.py (demo.src.html + anchors.json → earring-demo.html); node dev/art/earring-test/shots.js (screenshots).

## Gens (gpt-2-6 only, 1 try each, all kept) — 249 cr (87 769 → 87 520)
- earring gOmoB2gSXO → bg removed u5WGAppQLD (gold flower + chain + pearl + pale jade drop). Hook cropped off so the top loop sits on the lobe.
- ngọc bội lJtBXAGgv9 → fHzZRM2CDY (carved pale-jade disc, pink knot cord, pink tassel).
- túi hương 0eUsLE8TfW → Syh8oHaUb8 (rose-pink peony sachet, red tassel, jade bead).
3 gens of 4 allowed. No figure was redrawn.

## Notes / open
- c11 already has a small amethyst drop on the sash and a hand resting near it; both waist items hang left of the bow, so with both on they sit close together. c09 has a small blue bead pendant at the centre; items hang either side.
- Earrings are not hidden behind hair strands (plain overlay on top). For a real build, a hair mask per face would be needed when strands cross the lobe.
- Many v3 consorts already have tiny earrings drawn (A21: not a fault) → for the option, either use only faces without them, or accept a double earring.
