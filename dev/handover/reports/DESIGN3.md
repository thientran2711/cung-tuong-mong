# DESIGN3 — rank SIGNATURE pieces added to Hán prompts t4–t8 (owner Lượt 1263/1266/1268) — prompts only, 0 gens, 0 credits
depth 5 (child of Foreman C #4) · START_CTX ≈ 5 % (own estimate)

Edited dev/art/seasons4/make_han_bac.py (SIG dict + OPEN clause) and regenerated s62_t{4..8}_HAN_BAC.txt. Piece is worn OVER the Hán robes, "worn open so the wide collar and V stay visible"; fabric = đoạn t4–t6, gấm t7–t8. Builder files untouched (SWAP56 owns them); shape words read from build.py (TAN_CAPE_PEARLS, PHI_VAR F/G) and ladder_base.

| Bậc | Signature piece | Caption (G31) |
|---|---|---|
| t4 Tần | short round satin capelet + jade clasp + airy sparse pearl/jade bead net over the WHOLE capelet, short pearl fringe | …Tần · Khúc cư đoạn + choàng ngắn lưới ngọc trai |
| t5 Phi | TWO layered SHORT shoulder capes (upper shorter, lower longer, pearl-edged), never covering the neckline | …Phi · Trực cư đoạn + choàng vai hai lớp |
| t6 Quý phi | VÂN KIÊN (yunjian) cloud collar, scalloped gold-thread edge, small gold tassel fringe (shape only; no t6 yellow/luxury added) | …Quý phi · Khuê y đuôi én + vân kiên |
| t7 HQP | jewelled brocade cloud-collar cape edged with pearls and gold | …Hoàng quý phi · Đại bào gấm + choàng vân kiên ngọc |
| t8 HH | wide jewelled gold-brocade + pearl cloud collar, layered pearl fringes | …Hoàng hậu · Lễ phục gấm kim tuyến + vân kiên ngọc trai |

## Diff vs DESIGN2 (A17) — v2 after Foreman C #4 review (outfit wording fully restored)
- Rebuilt from DESIGN2's 02cd263 builder: ALL outfit/embroidery/jewellery wording of DESIGN2 is back word-for-word (my first push f2e12fe trimmed it — reverted). Only changes: NOC -> "no shawl"; SIG[...] signature piece inserted before it; t4 old "her ONE signature piece:" label (collar bands) renamed "RANK BLOCK:"; captions got "+ piece"; the "cape"->"over-robe" swaps in t6/t7 colour rules reverted (capes exist again).
- t6 vân kiên keeps the builder's shape words (scalloped gold-thread edge, fringe of small gold tassels — from ladder_base Phi yunjian text).
- Trimmed ONLY duplicated non-outfit boilerplate to fit ≤10 000 (each stated elsewhere in the same prompt):
  - t4: "Hair: her own hair colour, ALL her hair swept UP … rich like her rank." (dup of HAIR rank law + HAIR FLOWER SIZE); "GRACE (pose variety…)…" ; "Everyone beautiful at every age."; "; her signature colour family … stays the MAIN robe colour …; the robe itself is clearly … silk, NOT a cream, beige or all-gold robe" (dup of COLOUR RULE + TWO-COLOUR RULE).
  - t5: nothing trimmed.
  - t6: same "Hair:" , "GRACE" and "Everyone beautiful" sentences.
  - t7: "INNER LAYER EMBROIDERED (t7/t8)…" (dup of the DENSE all-over embroidery clause); "Everyone beautiful at every age."
  - t8: "INNER LAYER EMBROIDERED (t7/t8)…".
  Approved/gated sentences (CAPELET CUT S13, HAIR rank law, HEAD AND BODY, forehead…) are untouched — I tried cutting them first and the gate refused.
- Lengths (chars): t4 9887 · t5 9771 · t6 9923 · t7 9968 · t8 9965.
- Note t4: the store's approved CAPELET CUT sentence (petal lobes, "robe closes only at throat clasp") sits against my "not scalloped / worn open" capelet words — kept because gated; watch in tests.

## Gate (`check_store.py <f> --scope tpN --age a18`)
- t7 PASS · t8 PASS.
- t4: FAIL M06+M07+S12; t5: FAIL M06+M07+S12; t6: FAIL M07+S12 (no new failures). S12 = known S12 vs G32 conflict (not faked). M06/M07 = the owner's Lượt 1262 đoạn fabric swap (verified identical FAIL on DESIGN2's committed files — not new, DESIGN2 did not list them). Both need a Hán exemption before any Magnific use.

## Watch in ChatGPT tests
Only a "signature piece open at the front" tests whether wide collar still shows; t5 two capes vs t4 capelet may look alike — compare. SWAP56 may change main-builder t5/t6 words later; re-read if so.
Gens 0 · credits 0.
