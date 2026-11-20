# DESIGN7 — Thu (current outfit) t4–t8 layered neckline — owner Lượt 1361 (brief dev/handover/briefs/thu-comoi-t4t8-L1361.md)
depth 6 · START_CTX ≈ 5 % (get_session used_tokens read 0; own estimate) · coordinator Foreman C #6 · 0 credits, 0 gens, no builder change.

## Output (ChatGPT prompt text, refs: Image 1 = s62 face/style; Image 2 = royal-yellow swatch only t6–t8)
| file | base | chars | keep_check | store gate |
|---|---|---|---|---|
| dev/art/thu_comoi/s62_t4_THU_COMOI.txt | b26/s62_t4.txt | 9944 | PASS (19 allowed) | only Outfit sentence flagged (owner change) |
| dev/art/thu_comoi/s62_t5_THU_COMOI.txt | b26/s62_t5_v2.txt | 9903 | PASS (12) | only Outfit sentence flagged |
| dev/art/thu_comoi/s62_t6_THU_COMOI.txt | swap56/s62_t6_v2.txt | 9959 | PASS (14) | only Outfit sentence flagged |
| dev/art/thu_comoi/s62_t7_THU_COMOI.txt | rank8-s62/s62_t7.txt | 9751 | PASS (1) | Outfit + "Luminous…" (base already FAILs the same 2) |
| dev/art/thu_comoi/s62_t8_THU_COMOI.txt | rank8-s62/s62_t8.txt | 9909 | PASS (1) | Outfit + "Luminous…" (base already FAILs "Luminous…") |
Maker: dev/art/thu_comoi/make_thu_comoi.py (re-runnable). Sidecars: *.txt.keep. Gate run: `check_store.py <file> s62 --low N` / `--t7` / `--t8`.

## What changed (A17 diff, per file — everything else word for word)
- ALL: collar = the t1–t3 LAYERED NECKLINE (dapung4/s62_t3_COMOI_v2 wording): inner square-neck top (mint mist; t8 ice blue, since at t8 her colour is the collar/inner robe) edged by the rank's band, outer robe OPEN, front edges falling from both shoulders, neck + collarbones visible, NO crossed wrap collar. t4/t6 use the compact wording (same meaning) to stay ≤10 000. Caption → "Mùa Thu · Thiết kế hiện tại · <rank> · <signature> + cổ mở" (t7/t8 had none; added like t1–t3).
- t4 Tần: "a crossed collar" → layered neckline, edge = richer gold-brocade band. Pearl-net capelet kept whole (net, jade beads, gold flower studs, pearl fringe, curved petal lobes), re-seated OPEN at the front; the jade clasp kept but moved low on the chest below the square neckline on a short silk cord (was "at the throat"); "lying flat from the throat" → "from the shoulders"; "the robe closes only at the throat clasp" → "the outer robe closes only at the sash, never at the throat". Embroidery plum blossoms → lotus flowers (F2 s62 t4).
- t5 Phi: layered neckline (wide gold-embroidered band); both capes "OPEN at the front", + "never hiding the neck or the square inner neckline"; all cape details kept (gold embroidery, pearl edge, pearl-drop fringe, pearl net). peonies/peony → double hollyhocks/hollyhock (F2 t5).
- t6 Quý phi: layered neckline (pearl-edged gold band); vân kiên "OPEN at the front (lobes on shoulders and back, never covering the neck or the square inner neckline)"; tassels, pearl edge, jade/pearl drops, royal yellow all kept. peonies and plum blossoms → incurved chrysanthemums (F2 t6).
- t7 HQP: layered neckline (broad royal-yellow brocade band with pearls = her broad yellow collar); cloud-collar cape OPEN at the front. peonies → incurved chrysanthemums (F2 L1342: t7 = her t6 species).
- t8 HH: layered neckline (ice blue inner top, broad gold-brocade-and-pearl band, golden yellow outer robe); mantle "open at the front"; cloud collar with pearl fringes OPEN at the front. peonies → incurved chrysanthemums.
- Boilerplate trimmed for ≤10 000 (t4/t5/t6 only, all repeats, listed as allow lines): the 2nd "Full-body standing figure… soft even light; fair porcelain skin;" · "HAIR (rank law): ALL her hair is swept UP… nothing loose hanging down her back." (the Hair: clause still says ALL her hair swept UP into a high bun / chignon) · "HEAD AND BODY: …" (the ANGLE clause keeps "her head turns together with her shoulders and body") · t4/t6 "The item is in a contrasting colour, not the robe colour," (= HELD ITEM COLOUR rule). No outfit/embroidery/jewellery/hair word cut.

## Counter word diff (base → new; words that went DOWN)
```
t4 (b26/s62_t4.txt): lost-word count 68; words GONE entirely: anatomy, bậc, contrasting, direction, loose, mờ, plum, standing, vải
   fewer: all-1, and-2, back-1, blossoms-2, body-2, bun-1, centered-1, chignon-1, clasp-1, colour-2, down-1, even-1, fair-1, feet-1, figure-1, frontal-1, full-body-1, hair-2, hanging-1, head-4, her-3, high-1, in-1, into-1, is-2, item-1, law-1, light-2, natural-1, not-1, nothing-1, parchment-1, porcelain-1, rank-1, same-1, skin-1, soft-1, swept-1, throat-2, to-1, together-1, turned-1, turns-1, up-1, đoạn-1
t5 (b26/s62_t5_v2.txt): lost-word count 53; words GONE entirely: anatomy, bậc, direction, loose, mờ, peonies, peony, standing, turned, vải
   fewer: all-1, back-1, body-2, bun-1, centered-1, chignon-1, even-1, fair-1, feet-1, figure-1, frontal-1, full-body-1, hair-2, hanging-1, head-4, her-2, high-1, into-1, is-1, law-1, light-2, natural-1, nothing-1, parchment-1, porcelain-1, rank-1, same-1, skin-1, soft-1, swept-1, to-1, together-1, turns-1, up-1, đoạn-1
t6 (swap56/s62_t6_v2.txt): lost-word count 60; words GONE entirely: anatomy, blossoms, bậc, contrasting, direction, loose, peonies, plum, turned
   fewer: all-1, and-2, body-2, bun-1, centered-1, chignon-1, colour-2, down-1, even-1, fair-1, feet-1, figure-1, frontal-1, full-body-1, hair-2, hanging-1, head-4, her-3, high-1, in-1, into-1, is-2, item-1, law-1, light-2, natural-1, not-1, nothing-1, parchment-1, porcelain-1, rank-1, same-1, skin-1, soft-1, standing-1, swept-1, to-1, together-1, turns-1, up-1
t7 (rank8-s62/s62_t7.txt): lost-word count 1; words GONE entirely: peonies
   fewer: 
t8 (rank8-s62/s62_t8.txt): lost-word count 1; words GONE entirely: peonies
   fewer: 
```
(plum/peonies/peony = F2 swap; bậc/vải/mờ = old caption "Bậc Tần · Vải đoạn mờ" (fabric still "satin (đoạn)" in the outfit); throat/clasp = t4 clasp moved; the rest = the trimmed repeats above.)

## Rules / conflicts
- Logged ART_RULES_CONFLICTS #16: L1361 layered neckline overrides "Tần back to pre-G22 crossed collar" and "t6–t8 always crossed" / G25 Thu crossed — for these prompts only; foreman to fold into rules if the owner duyệt.
## Open questions for the owner (via C #6)
1. t4 jade clasp: kept, moved from the throat to low on the chest (an open capelet cannot close at the throat). OK, or drop the clasp?
2. Hair flower t4–t6 is still unnamed ("ONE fresh flower") as in the bases; F2 says hair = same species (lotus / double hollyhock / incurved chrysanthemum). Name it? (not done — brief said embroidery.)
3. t1–t3 COMOI_v2 still embroider plum blossoms (pre-F2), t4–t8 now use F2 species → the ladder mixes. Update t1–t3 to F2 too?
