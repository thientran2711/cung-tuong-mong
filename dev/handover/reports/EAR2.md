# EAR2 — vòng tay · dây chuyền · phi bạch + c09 refit (owner 20/11, after EAR1)
depth 1 · START_CTX ~4 % (1M window; get_session read 0, so this is my estimate) · worker of Foreman C ROOT-66 · roll line ~29 %, not reached

Demo: dev/art/earring-test/earring-demo.html (3.1 MB, self-contained). The foreman republishes it to artifact CqntDwf5Jb8hesH4TcWZoN.
New buttons: «Đeo/Tháo vòng tay», «Đeo/Tháo dây chuyền», «Đeo/Tháo phi bạch» (c22 only). New view «Cổ tay». New card «Phi bạch trên c22 — hai cách» (A | B | c11 look reference | B try 1 ✗).

## 1. c09 refit on the NEW cut UPvIb4owny (gen w4atqqr7EI); old xSBWFuTjfW retired
- c09_cut.webp replaced. New SAM masks (35 cr each): hair, face/ears/neck, hands.
  - SAM "her two hands" returned only the lantern hand, and a point prompt on the lowered hand was refused.
  - The lowered left hand was therefore added with a skin-colour threshold in a box (0 cr).
- Earrings: near (399,276) at full size; far (585,236) at 0.8x, under the face layer.
- Slots: (384,84) temple, (486,66) crown (moved down after the 3x check: it floated above the head), (568,118) far side.
- Waist: ngọc bội (480,750), túi hương (600,748). Views updated.

## 2. Vòng tay — 1 gen bxMcu0g5Y2 (jade + gold flower caps, ellipse view) → bg cut tCRNogAmZJ
- Split along the long axis. The back arc goes UNDER the hand layer and the front arc ABOVE it; the cuff layer (sleeve edge minus hand) goes over its end.
- Each wrist has its own centre, angle (perpendicular to the forearm), width and squash.
- Fitted (all looked at 3x, adjusted 3 rounds):
  - c09 lowered left wrist (tiny: ~35 px of skin under the sleeve; the cuff polygon follows the cloth line).
  - c11 fan-hand forearm (best: reads like a real bangle); c11 right wrist at the cuff edge.
  - c22 both wrists at the cuffs.
- Hidden: c09's lantern-hand wrist (sleeve + stick cover it; a ring there sat on the hand, so it was dropped). c22's wrists are mostly inside the cuffs, so only the ring's inner end shows.
- Fixes after LOOK:
  - The first rings were too narrow, so their tips ended on bare skin and read like hooks. They were widened and thickened (squash 0.45–0.5).
  - c22's left ring had its front arc on the cuff side and was flipped.
  - A c09 cuff polygon cut the ring flat on skin and was redrawn on the cloth edge.

## 3. Dây chuyền — 1 gen Lw8dkBzswO (gold chain, pearls, flower pendant, jade drop) → bg cut cpSLnHG0eP
- The page CLIPS the necklace group to the neck-skin mask (layers/<id>_skin.png). Everything outside the skin therefore goes under both cross-collar edges and under the hair, following the neckline by itself.
- The chain is stretched to each neck; the pendant keeps its true shape (the stretched one looked squashed). Placed at the neck base, not the jaw (first try sat too high).
- Result: c22 is best (pendant in the V, jade drop tucked under the collar). On c09 and c11 the pendant is half under the collar; c11's fan covers the left side. Natural, small.

## 4. Phi bạch on c22 — honest verdict
- A, layered sprite: 1 gen Lw8dko8swO (sheer rose-pink pibo, ghost-mannequin front view).
  - Colour-to-alpha against white, then cut into 3 pieces: back arc (under the whole figure), swag (under the hands), sides (over the sleeves, fading in at the shoulder). Long hair is laid back over the sides.
  - VERDICT: FAKE-LOOKING. It reads as a pink tint/filter over the sleeves, not as a shawl. The flat front-view sprite cannot wrap round the arms or follow the sleeves' folds, the back arc barely shows, and the ends beside the skirt are faint. Not recommended.
- B, Magnific edit (images_retouch mode=edit, 80 cr each, price checked first).
  - Try 1 dt4JMSbXSL, WITH c11 as reference image: FAIL. It turned c22 into c11 (other face, fan, red robe). Shown small, marked ✗.
  - Try 2 EbYAamsuuO, no reference: GOOD.
    - Same face, hands, pose and robe. At 3x the face is very slightly softened/redrawn.
    - Output is 910x2048 (lower than the 1024x2304 cut; every pixel is re-rendered, so technically it is a redraw).
    - Peach-pink sheer shawl over the shoulders, falling outside the sleeves to the hem, gold edge.
    - It goes behind/outside the forearms rather than draped over them.
  - VERDICT: natural, looks hand-painted.
  - Caveat: each figure × outfit becomes its own picture, and needs an owner OK (A20: it is a full re-render). It is not a toggle layer.

## Gens / credits
- gpt-2-6: bangle bxMcu0g5Y2, necklace Lw8dkBzswO, phi bạch Lw8dko8swO.
- Edits: dt4JMSbXSL (✗), EbYAamsuuO.
- Total: 5 (within ≤ 5). No figure was redrawn: B is a test image only, not stored as a figure.
- SAM: 4 masks (c09 hair/face/hands, c11 hands); 1 refused. BG cuts: 2.
- Credits 86 374 → 85 567 = 807 cr.
  - Items I can account for: 3×80 + 2×80 + 4×35 + 2×3 = 546.
  - The other ~261 were not itemised; my guess is the refused SAM call plus the edit model costing more than estimated.

## Files
- make_jewelry.py (sprite prep); make_layers.py (+ wcuffs, skin clip, hairlong, c09 hand note); build_demo.py; demo.src.html; anchors.json (wrists/neck/phibach).
- sprites/: bangle_*, necklace*, phibach_*; c22_phibach_B.webp + _try1.
- Screenshots: screenshots/{fold,ipad}_{c09,c11,c22}_{off,on}.png, {fold,ipad}_phibach_AB.png, _compare, _page_off.

## Open
- Owner verdict: bangle/necklace look; phi bạch A vs B.
- If B is chosen: one edit per figure × outfit (~80 cr each, plus the owner OK per picture).
