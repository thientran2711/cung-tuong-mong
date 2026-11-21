# COLORFIX1 — season colours → own season palette (owner L1560 "Ok sửa")
depth 4 · START_CTX ~5 % (used_tokens read 0; estimate) · 0 gens, 0 credits · child of Foreman C #13.

Source: dev/art/face-common/palettes_season_deep.json (P6, owner "Bản màu ổn rồi đó" L1042; same source as phoenix_L1536.json).
Method (A39): new `_c` file = old current prompt with ONLY colour names + hexes swapped (+ phoenix plumage words per G33 option B where a plumage sentence exists). Each has a `.keep` (base = old file, allow lines = only the colour-changed phrases).
Maker (re-runnable, scratch): mapping is in the table below.

| file (→ new `_c`) | season | old colours | new colours |
|---|---|---|---|
| seasons4/s62_t4_HAN_BAC_open5c, t5_open3c, t6_open5c, t7_open8c, t8_open11c | XUÂN | light clear warm plum #DF9ED9 + bright blush pink (= s62 THU) | soft peach-blossom pink #EB8186 + ivory white |
| seasons4/s62_t{4,5,6}_ha_DUONG | HẠ | light peach orange #F8B287 + soft indigo-violet | OK — no change |
| thu_comoi/s62_t4_THU_COMOIc, t5c, t6c, t7_v8c, t8_v10c | THU | ice blue #71B5D7 + mint mist (= s62 ĐÔNG) | light plum #DF9ED9 + blush |
| dapung4/s62_t{1,2,3}_COMOI_v2c (thu base) | THU | ice blue #71B5D7 + mint mist | light plum #DF9ED9 + blush |
| t7_v8c / t8_v10c phoenix (G33 B) | THU | plumage "in shades of ice blue and mint mist"; crown inlay ice blue + mint mist | OUTER blush, inner light plum, tips/eyes deeper light plum, gold outline; crown inlay blush + light plum |
| thu_comoi/m02_t8_THU_COMOI_v6c, m02_t7_THU_builder_nnc | THU (root) | moss green #A8C379 + coral rose #CF8377 | leaf green #A5C56A + coral rose #CF8377 |
| thu_comoi/m28_t8_THU_COMOI_v6c, m28_t7_THU_nnc | THU | coral pink #D9998C + indigo blue #4E5D97 (= m28 XUÂN root in deep file) | rich plum #AF71A1 + smoke lilac #E7DAFF |
| dong_hientai/s62_t{4,5}_cloak8, t6_cloak6, t{7,8}_cloak9 | ĐÔNG | ice blue #71B5D7 + mint mist | OK — no change |
| dong_hientai/m02_t7_DONG_HIENTAI_cloak9c, m02_t8_…cloak9c | ĐÔNG | sky blue #97C9D4 + cool rose pink #CE8AA7 (old B20 palettes_season.json) | light clear cool jade #6CD8BA + smoke lilac #F2EAFF |

Royal yellow #EFBD69 (G12 HH t8 yellow set / t7 three-colour rule) untouched everywhere. Skin words ("softly blushed cheeks", "pinkish-white") untouched.

## Checks
- keep_check --sidecar PASS ×19; `keep_check.py --all` 234 PASS.
- All 19 ≤ 10 000 chars (max 9 993).
- check_store with `--season <xuan|thu|dong>`: no colour-sentence fails; remaining fails are non-colour and already in the bases (S21/S23 thu t4–t6, B12/S07/M07 Hán, W03 m02 t8 đông, E1 Hán t8, the Hán t7/thu t7 store-sentence set). Without `--season`, the store checks against her ROOT colours, so s62_t6_THU_COMOIc shows 2 extra colour sentences (expected).

## Flags for foreman / owner
1. NAMES SHORTENED to stay ≤ 10 000 chars (hex unchanged): xuân "soft peach-blossom pink" (palette: soft clear cool peach-blossom pink), thu "light plum" + "blush" (palette: light clear warm plum + bright blush), m02 thu "leaf green" (soft leaf green), m02 đông sec "smoke lilac" (bright smoke lilac). Same name across every rank of a set (G13). Hạ already used the short "light peach orange".
2. m02 THU = her ROOT: deep file has soft leaf green #A5C56A ("changed" from drawn moss green #A8C379); L27/A31 say drawn roots keep root_drawn. I followed the deep file per the brief; if the root should stay moss green, use the old file (m02 thu bases unchanged).
3. m28 root season differs between files: old palettes_season.json = thu root (coral pink + indigo), deep = xuân root. Changed to deep thu (rich plum + smoke lilac) — owner may want to confirm.
4. "kingfisher-blue" inlay/thread (t7/t8 crowns, m02/m28 t8, s62 Hán t7/t8, đông t7/t8) left: G33 replacement is "not in builder yet (HOLD)" and those are not plumage sentences.
5. Sentence "her ORIGINAL robe colour is kept exactly as in image 1" stays in non-root-season prompts (only colour words changed; A39) — conflicts with image 1 if image 1 is her root picture.
6. s62 t1–t3 thu `_c` files: their base dapung4 COMOI_v2 also serves as the ice-blue (đông/root) look — the originals are kept.

## Handover
Pass 1 (colours) done; pass 2 (L1561/L1562 items, flowers, hairpins, fabric, all rules) in progress — see below.

## L1561/L1562/L1563 pass 1 — THU s62 t1–t6 (production first)

Columns: colours / held item / hair flower (F2) / hairpins / fabric (B29) / rules (gate = check_store `--scope tpN --age a22` approved+master, and `s62 v0 --low N` store).

| file | colours | held item (F18) | flower (F2) | hairpins | fabric (B29) | rules |
|---|---|---|---|---|---|---|
| dapung4/s62_t1_COMOI_v2c | fixed: light plum #DF9ED9 + blush | OK thread-bound book | fixed: plum blossom → lilac spray (hair + embroidery) | OK silver, little gold, S24 | fixed: A_LIGHT sa hoa | approved+master PASS; store: Outfit sentence 0.83 (COMOI collar, pre-existing) |
| dapung4/s62_t2_COMOI_v2c | fixed | OK pellet drum, deep drum two pellets (F18) | fixed: → tiger lily | OK silver + pearl | fixed: A_LIGHT | approved+master PASS; store: Outfit 0.73 (COMOI, pre-existing; tiger-lily sentence now passes) |
| dapung4/s62_t3_COMOI_v2c | fixed | OK bamboo flute (other hand touches hairpin in hair) | fixed: → semi-double China rose | OK silver, pearl-tipped | fixed: A_LIGHT | approved+master PASS; store: G15 option-B words missing (pre-existing) |
| thu_comoi/s62_t4_THU_COMOIc | fixed | OK white-jade vase | OK lotus | OK gold trâm + bu yao | fixed: B_LIGHT đoạn mỏng | added S21+S23, S16 restored → only **S13 FAIL** (pre-existing: approved S13 'closes only at the throat clasp' vs DESIGN7 open neckline 'closes only at the sash, never at the throat') = gate/rule conflict, needs rule owner — NOT GEN-READY |
| thu_comoi/s62_t5_THU_COMOIc | fixed | OK folded letter | OK double hollyhock | OK | fixed: B_LIGHT | added S21+S23 → approved+master PASS; store: Outfit 0.83 (COMOI, pre-existing) |
| thu_comoi/s62_t6_THU_COMOIc | fixed + 'SATURATED' dropped (A32) | OK tú cầu round stuffed ball (F18) | OK incurved chrysanthemum | OK | fixed: C_GAM light gấm (+ outfit 'HEAVY'→'LIGHT') | added S21+S23, S16 restored → approved+master PASS; store: Outfit 0.69 (pre-existing) + 2 COLOUR RULE sentences (store gate checks ROOT ice-blue words, no season mode — gate limit) |

All 6: phi bạch kept (G36 thu OK); G37 one-tier vân kiên OK (t6); empty duplicate CAPTION line removed (t4–t6 bases carried one); colour fix: 'her ORIGINAL robe colour is kept exactly as in image 1 (her first reference):' dropped (image 1 is her ice-blue root picture — it would pull the robe back to đông colours). LEN ≤ 10 000 (max 9 996). keep --all PASS.

Exact edits per file (also in each .keep):

- dapung4/s62_t1_COMOI_v2c.txt: fabric B29 A_LIGHT (sa hoa); F2 flower: plum blossom → lilac spray x3 (hair + embroidery); colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours)
- dapung4/s62_t2_COMOI_v2c.txt: fabric B29 A_LIGHT (sa hoa); F2 flower: plum blossom → tiger lily x3 (hair + embroidery); colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours)
- dapung4/s62_t3_COMOI_v2c.txt: fabric B29 A_LIGHT (sa hoa); F2 flower: plum blossom → semi-double China rose x4 (hair + embroidery); colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours)
- thu_comoi/s62_t4_THU_COMOIc.txt: fabric B29 B_LIGHT (đoạn mỏng); cut duplicate EMPTY CAPTION line; Hair sentence: bun words moved to S21; add S21 + S23 (approved); trim head-turn words (now S23); S16 restored (approved); colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours)
- thu_comoi/s62_t5_THU_COMOIc.txt: fabric B29 B_LIGHT (đoạn mỏng); cut duplicate EMPTY CAPTION line; Hair sentence: bun words moved to S21; add S21 + S23 (approved); trim head-turn words (now S23); colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours)
- thu_comoi/s62_t6_THU_COMOIc.txt: fabric B29 C_GAM; outfit word HEAVY→LIGHT gấm (B28/B29); cut duplicate EMPTY CAPTION line; Hair sentence: bun words moved to S21; add S21 + S23 (approved); trim head-turn words (now S23); S16 restored (approved); cut repeat of the image-2 royal-yellow sentence; cut repeat "gold only as thin accents."; colour: drop "ORIGINAL robe colour kept exactly as in image 1" (image 1 = root ice-blue picture, not the thu colours); drop SATURATED (A32 Dịu dàng never deep; B29 light); LEN: cut repeat (= "the LARGEST single bloom of all ranks"); LEN: cut repeat "never covering the neckline" (said before in the same clause); LEN: cut repeat (TWO-COLOUR RULE says main ≠ secondary)
