# EAR1 — earring + ngọc bội + túi hương try-on test (owner 20/11 ~06:20Z)
depth 1 · START_CTX ~3 % (1M window) · worker of Foreman C ROOT-66

## UPDATE 4 ~07:25Z — c09 new picture refit; vòng cổ fitted; vòng tay + phi bạch sprites painted (NOT fitted yet)
- c09 now uses the new approved cut UPvIb4owny; old xSBWFuTjfW is retired. The new picture is a full redraw (40 % of pixels differ), so it got new SAM masks (hair nVsr3HpYQD, face s7IXKDtl8e, 70 cr) and new anchors: near lobe (403,276), far (577,250) at 0.8x under the face layer, waist (590,718)/(466,718), slots moved. LOOKED at 2x: OK. Pushed 4e5c531.
- Owner approved the earring look ("hoa tai ổn, ok nha") → it becomes a Tư trang wear option.
- VÒNG CỔ: gpt-2-6 8ai4pTeIrU → bg lJtBrMOgv9 → sprites/vong_co.png (gold chain, pearls, longevity lock with 3 pearl dangles). LOOKED: good.
  - Fit: these consorts wear HIGH cross-collars, so almost no neck skin shows. The natural way is the drama way: worn OVER the collar.
  - z 'neck' sits under 2 new things: the hairneck layer (hair beside the neck/shoulders) and the face/neck layer. So the upper chain disappears behind the neck and hair, and the arc and pendant lie on the collar.
  - Verdict: c09 and c22 look natural at 2x. On c11 the chain crosses OVER her held round fan, which is FAKE-looking → needs a 'held item' layer (SAM "the round fan", 35 cr) or the necklace hidden on figures holding things at the chest.
  - The pendant was not checked at 3x yet.
- VÒNG TAY: gpt-2-6 DoOUWAlpcl → bg eIP7TLudqL → sprites/vong_tay.png (jade bangle, gold peony inlay, ellipse). LOOKED: good. NOT fitted.
  - Plan: split the sprite into a back half (upper rim) under the wrist/hand layer and a front half above it, with a separate cuffs layer above both. That needs make_layers.py to output 'cuffs' separately from 'hands'.
  - Wrists: c22 = wrists almost fully inside the cuffs (bangle would be mostly hidden). c11 = right hand on the sash (wrist under the sleeve edge). c09 = raised hand holding the lantern stick + a hand at the skirt; check which wrist shows.
- PHI BẠCH (A, layered): gpt-2-6 N2quJwD6D9 → bg s7IX1M4l8e → sprites/phi_bach.png (lilac-pink sheer shawl, U behind the shoulders, ends to the knees). LOOKED: good. NOT fitted.
  - Plan for c22: split the sprite → the back U goes under the body (behind the hair/shoulders), the side drapes over the forearms ABOVE the sleeves, the ends hang beside the skirt.
- PHI BẠCH (B, edit the real picture): NOT started. 1 of the 3-gen budget is used (the sprite), so 2 remain.
  - Check: images_retouch with a mask (SAM "her arms and shoulders" region) or gpt-2-6 images_generate with c22 as reference; run simulate_cost first.
  - B's price per picture = the per-picture price for all 90.
- Credits this round: 3 gens 240 + 3 bg 9 + 2 masks 70 ≈ 319 cr.

HANDOVER (EAR1 → successor; the foreman opens it): depth 1; START_CTX ~3 %; context now ~27 % = roll line.
- Files: dev/art/earring-test/ (anchors.json = all coords; make_layers.py <dir of full cut-outs> needs c09.png (= NEW cut UPvIb4owny), c11.png (Cqn9IfbEEy), c22.png (rgXY1yHxtc) downloaded via creations_get url; build_demo.py; shots.js; sprites/; layers/; masks/).
- TODO, in order:
  1. vòng tay fit (c22 / c11 / c09) with a cuffs layer.
  2. phi bạch A on c22.
  3. phi bạch B edit (≤2 gens, simulate_cost first).
  4. fix c11 necklace vs fan.
  5. pendant check at 3x.
  6. screenshots Fold + iPad, push, report.

## UPDATE 3 ~07:05Z — REAL LAYERS + hairpins + flowers (owner: tách lớp như Photoshop; trâm/hoa chỉ 2–3 chỗ đẹp, bấm là tự vào)
Demo dev/art/earring-test/earring-demo.html (2.29 MB). Legend on the page: người → hoa tai tai xa → MẶT → hoa tai tai gần → TÓC TRƯỚC → thân trâm → TÓC → đầu trâm/hoa → ngọc bội/túi hương → TAY.
- Layers per figure (make_layers.py, masks in masks/): SAM 3.1 via Magnific images_segment, 35 cr per mask. face = "her face, ears and neck skin"; hair = "her hair"; hands (c22) = "her two clasped hands".
  - fronthair = hair over the face, using the face mask closed by ~44 px, alpha weighted by darkness.
  - hairtop = hair above the earlobe line; it hides the pin shafts.
- Cost per figure: 2 masks = 70 cr (hair + face); +35 for hands when the hands cover the belly.
- Mask quality (looked at 3x): hair and face edges are clean, though binary (hard edge, 1 px). The hands mask is clean.
- SAM could NOT isolate the sleeve cuffs: twice it returned the whole robe ("…hands + sleeve cuffs" and point clicks). Text prompts naming the cuff failed ("not found"). The cuffs therefore remain hand-placed polygons (c22 only).
- Scale to all ~90: ~70–105 cr each ≈ 6–9k cr, about 2–3 calls per figure, fully scripted. Per figure, hand work = picking 2–3 head slots + ear/sash points (~5 min each by eye) + cuff polygons only when sleeves hang in front.
- Hairpins (0 gens): the 8 old sprites from hairpin-tryon; 5 used (dangle, peony, plum, butterfly, floralfork).
  - Each pin is split at its ornament base. The shaft is rotated to the slot angle, runs nearly horizontally INTO the hair along the head (±95–105°), is shortened, and goes UNDER the hair layer.
  - The ornament stays upright with a 4–14° tilt, so dangles hang straight down. It gets a soft contact shadow.
- Flowers: 1 gpt-2-6 gen N2qujKT6D9 (80 cr) + bg removal aFGRMR8fSh → 6 sprites (mẫu đơn, mai, đào, sen nhỏ, nhài, lan) in sprites/.
- Slots (anchors.json): 2–3 per figure, fixed position, angle and size. They copy where the person's approved rank pictures carry their flower/pin: upper side of the head above the temple (main); crown/back of the knot; far side smaller.
  - c11 already has a painted pin on the left, so it gets 2 slots; c09 and c22 get 3.
  - Tapping an item fills the next free slot; tapping it again removes it. When all slots are full, the other buttons grey out.
- Naturalness card: c09 Thường tại approved picture (painted peony) | c09 bare head + peony on layers | c11 painted pin (left) vs layered plum pin (right).
- Fixes after LOOK:
  - The crown pin shaft crossed the forehead → shafts now run along the head and are shortened.
  - The near earring was hidden by a too-wide front-hair layer → front hair is now limited to the face area.
  - The far-side flower and c22's side pins stood outside the hair → slots moved inward.
- Crown (Hoàng hậu): NOT painted. It would be the TOP layer above hair, anchored to the crown of the head; it takes the place of all head slots (no pins with it).
- Credits this round: 86 984 left (87 520 before) = 536 cr. That is 8 SAM masks ≈ 280 + flower gen 80 + bg 3; the rest is probably the 2 refused SAM calls / rounding (not checked per call).
- Screenshots: screenshots/{fold,ipad}_{c11,c09,c22}_{off,on}.png, {fold,ipad}_page_off.png, {fold,ipad}_compare.png.
- Superseded: the hand-cut occluders (c09_occ_cheek, c22_occ_hands) were removed from the folder; make_occ.py is kept for the record.

HANDOVER (if a successor continues): depth 1; START_CTX ~3 %; context now near the START+25 % roll line.
Open items: owner verdict on the layered look; per-figure slot picking for the other ~87 figures; antialiasing the binary SAM edges (feather 1 px) if the owner sees hard edges.

## UPDATE 2 ~06:45Z — owner feedback: c09 far ear + hands over belly; waist items back in (0 cr)
- Demo dev/art/earring-test/earring-demo.html (1.73 MB): 3 figures, buttons «Đeo/Tháo hoa tai», «Đeo/Tháo ngọc bội», «Đeo/Tháo túi hương»; views Cận mặt · Dải lưng · Toàn thân.
- c09 (3/4): far ear now wears an earring too — anchor (584,258), 0.8x size (perspective), HALF behind the cheek, hair strands across it (occluder c09_occ_cheek.png). Checked at 3x.
- NEW c22 · Đoan trang · FF (cut rgXY1yHxtc): both ears clean, no earrings drawn, both hands clasped over the belly just under the sash. Layer order figure → items → occluder (c22_occ_hands.png = her own hands + both sleeve cuffs cut from the picture). Ngọc bội (548,880) + túi hương (622,880): cords run under the fingers, pendant/sachet + tassels hang below the hands, the sachet's edge goes behind the right cuff. Earring pair (443,261)/(608,247).
- Method: occluder = piece of the SAME figure placed exactly on top, so it is invisible except where it covers an item. Masks: skin-colour threshold (hands, cheek) + darkness-weighted hair alpha + hand-placed polygons along the cuff inner edges. Script make_occ.py (no segmentation calls, 0 cr).
- Screenshots: screenshots/{fold,ipad}_{c11,c09,c22}_{off,on}.png + {fold,ipad}_page_off.png.

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
