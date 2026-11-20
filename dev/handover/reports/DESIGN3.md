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
- v3 (Foreman review 2): "Hair:" line (ONE fresh flower + gold hairpins trâm) restored in t4/t6 and "INNER LAYER EMBROIDERED" restored in t7/t8, verbatim. Nothing of outfit/embroidery/jewellery is trimmed. Trimmed only generic non-outfit text:
  - t4/t6/t7/t8 (all gate-tested, no new FAIL): "GRACE (pose variety…)" sentence (t4, t6, t7, t8); "Everyone beautiful at every age." (t4, t6, t7); ", never back-turned" and ", never in profile" (angle clause, rest of the head-turn sentence kept); t7/t8 also ", never a single flat colour all over" and ", never copy anything but its colour" (Image 2 sentence); t4 only: "; her signature colour family … robe" colour restatement (dup of COLOUR RULE/TWO-COLOUR).
  - my own signature wording: OPEN clause shortened to "worn open at the front so the wide collar and V stay visible".
  - Tried and refused by the gate (kept): CAPELET CUT, HAIR rank law, HEAD AND BODY, forehead, "The item is in a contrasting colour…" (S16), "never a single flat colour" on t4/t6 (S01/X02), whole head-turn clause (E1).
- Lengths (chars): t4 9998 · t5 9744 · t6 9977 · t7 9922 · t8 9935.
- Note t4: the store's approved CAPELET CUT sentence (petal lobes, "robe closes only at throat clasp") sits against my "not scalloped / worn open" capelet words — kept because gated; watch in tests.

## Gate (`check_store.py <f> --scope tpN --age a18`)
- t7 PASS · t8 PASS.
- t4: FAIL M06+M07+S12; t5: FAIL M06+M07+S12; t6: FAIL M07+S12 (no new failures). S12 = known S12 vs G32 conflict (not faked). M06/M07 = the owner's Lượt 1262 đoạn fabric swap (verified identical FAIL on DESIGN2's committed files — not new, DESIGN2 did not list them). Both need a Hán exemption before any Magnific use.

## Watch in ChatGPT tests
Only a "signature piece open at the front" tests whether wide collar still shows; t5 two capes vs t4 capelet may look alike — compare. SWAP56 may change main-builder t5/t6 words later; re-read if so.
Gens 0 · credits 0.
