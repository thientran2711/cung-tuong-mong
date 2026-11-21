# HAN4 — Hán LADDER4 t1–t8 (owner L1771/L1772/L1773 via Foreman C #21). 0 gens.
depth 3 (get_session lineage.depth) · START_CTX ~2 % of 1M.
Files dev/art/seasons4/s62_t{1..8}_HAN_LADDER4_L1773.txt + .keep (base Phi han_bac_base/s62_t5_HAN_BAC_02cd263.txt; keep_check --sidecar PASS ×8). Generator seasons4/make_han_ladder4_L1773.py (= LADDER3 generator, outfit() rewritten).
Diff vs LADDER3 (A17):
- (a) L1772 "ăn gian như Phi": every rank "TWO visible robe layers: a long wrapped outer robe (quju, khúc cư) … over an inner robe" + "the crossed collars of BOTH robes <CORE>, the … inner collar showing as a wide layered edge inside the … outer collar" (Phi words). Collar bands = Phi wording: t1–t3 TWO, t4–t6 THREE "(outer … embroidered in gold, inner two …)", t7–t8 FOUR "(outer … woven in gold and edged with pearls, then royal yellow, inner two …)"; t4+ add ", never a third robe". Gone: middle robe / yellow second robe / two inner robes / ALL THREE/FOUR robes / "one for each robe". CORE sentence count 1 ×8, Phi satin fabric ×8.
- (b) L1771/L1773 khúc cư: zhiju → own WRAP CUT per rank "(collar unchanged; no spiral or swallowtail points)":
  t1 short straight diagonal ending at the HIP · t2 straight diagonal to the SIDE SEAM then straight down · t3 wraps round to end at the BACK, straight bordered edge · t4 DOUBLE-EDGED diagonal (inner robe border shows as 2nd parallel edge) · t5 diagonal ending in ONE pointed corner tail at the hip · t6 ONE long sweeping diagonal waist→opposite hem, narrow softly curved tip · t7 CURVED WRAP: outer front panel sweeps in ONE wide CURVE, covering the inner layer, inner edge shows under the curve, curved hem · t8 same, "longest and grandest of all", curve runs round to the back hem.
- Caption: "Khúc cư đoạn, hai lớp áo, {hai/ba/bốn} dải cổ rộng"; t7/t8 colour paren "(the yellow collar band, wide yellow borders and a wide yellow sash)".
- Trims to fit 10 000 (in .keep, no outfit/embroidery/jewel words): t6–t8 eyes sentence shortened ("Both eyes look straight at the viewer, irises centred and aligned, never cross-eyed or wall-eyed."), "Everyone beautiful at every age.", " gaze to the viewer,"; t6 "RANK BLOCK…" label + "a NEW outfit"; t7/t8 ", NOT a straight-hem robe", "(quju, khúc cư)"→"(quju)", ", well visible at game size", "(t7/t8)" labels; t8 "An imperial consort." Each tested with check_store: no new store fail.
| rank | wrap | bands | ch | check_store (--scope tpN --age a18) |
|---|---|---|---|---|
| t1 | hip diagonal | 2 | 9304 | M06/M07/S06 |
| t2 | side-seam diagonal | 2 | 9480 | M06/M07/S06 |
| t3 | wrap to back | 2 | 9534 | M06/M07/S06 |
| t4 | double-edged | 3 | 9811 | M06/M07/S13 |
| t5 | pointed tail | 3 | 9584 | M06/M07 |
| t6 | long diagonal curved tip | 3 | 9959 | B12/M07/S07 |
| t7 | CURVED | 4 | 9952 | B12/M07/S07/S14 |
| t8 | CURVED longest | 4 | 9998 | B12/M07/S07 |
Waivers = same as LADDER3, all owner-ordered: one Phi satin fabric for 8 (M06/M07/S06, B12/S07), t4 capelet store S13 (none in Hán), t7 necklace S14.
Open: none. t8 at 9998 ch — any add needs a trim.

# HAN4 job 2 — Hán LADDER5 t1–t8 (owner L1794 via #22, sheet han_ladder4_L1773.png). 0 gens.
Files dev/art/seasons4/s62_t{1..8}_HAN_LADDER5_L1794.txt + .keep (keep PASS ×8); generator make_han_ladder5_L1794.py (= LADDER4 + L1794 block).
## WHY Thường tại did not get Phi's collar although the collar words were byte-identical
All 8 had the SAME ref (nVsrRMPYQD) + seed 7172 and the same collar core sentence, so the difference came from the OTHER words around the collar:
1. Phi has the flat bead yoke "over both shoulders" — on the picture it runs along the collar edge and pulls the neckline out flat across the shoulders. t1–t3 have "no shoulder piece", so the model fell back to an ordinary narrow crossed V. Nothing in the text described the SHAPE Phi got (collar flat on the shoulders); "open WIDE … toward the edge of the SHOULDERS" alone is too weak.
2. Loose hair at t1–t3 (rank law) falls over the shoulders and hides the shoulder line.
3. Held item at chest: t2 drum "close to her chest", t4 lamp upright at the chest → covers the V.
4. Angle: t3/t4/t7/t8 three-quarter turn (against FG 3d2 "frontal only") → the V is foreshortened; Phi is FULLY FRONTAL.
5. Band count: Phi THREE bands, t1–t3 TWO → narrower collar block.
6. t6–t8: long/layered fringe + "a breeze lifts her long stole" (t6) → cape-like mass over the shoulders.
Not a cause: refs (same image for all), caption, char cuts (collar words untouched).
## Fixes (diff vs LADDER4)
- A: new identical sentence ×8 "COLLAR AND SHOULDERS (every rank, exactly like the Phi): the wide crossed collar lies FLAT on top of both shoulders, its edges reaching almost to the shoulder points and dipping in one broad shallow V low at the chest; soft sloping shoulders; nothing covers the collar or shoulder line: loose hair falls BEHIND the shoulders, hands and held item stay below the collar, any bead yoke lies flat along the collar edge." + Phi ANGLE "FULLY FRONTAL … no turn;" ×8; t2 drum held low at waist; t6 stole removed. Band count 2/3/4 kept (L1772).
- B: wraps/robe shapes unchanged.
- C/D/E: identical ×8 "JEWELLERY: every jewel SMALL and delicate, never chunky or showy; NO red anywhere (no red gems, beads or tassels), no faceted gems, no necklace." t7 lux: rubies/sapphires + "a layered pearl-and-gold necklace" removed (A41) → small pearls and jade; t8 lux same; t8 yoke ruby drops → tiny jade drops; t5 "bigger pearls" → small pearls; t6 zupei "SMALL thin jade discs and fine pearl strands"; t7/t8 bands "small pearls".
- F: item-rank-age.md "t6+ never basket": t7 basket → closed kingfisher-feather gold silk parasol (t7 list #10), t8 basket → phoenix-embroidered imperial silk round fan (t8 list #1), t6 tú cầu kept (t6 list #4) held low; all items below the collar.
- G: t8 = HAN_BAC HH colour rule restored: outer robe royal golden yellow, "DOMINANT colour of the over-robe, sleeves and skirt (more than half…, the most of all ranks)", plum second (inner robe, collar edge, borders), pink third; THREE-COLOUR rule reworded to match; embroidery "many clearly visible gold PHOENIXES in flight on the robe body, sleeves and wrap edge, among large peonies and clouds"; item = phoenix fan.
- H: t4 sleeves "the same flowers embroidered all over the sleeves" + EMB "over EVERY part of the garment (robe body, sleeves, inner robe and skirt, like the Quý nhân)".
- I: captions all "Mùa Xuân" (= original HAN_BAC ladder t1–t8 all Xuân; t6–t8 Thu came from LADDER2 sources); EMB "autumn flowers" → "flowers" (t6/t7).
- Trims (in .keep, each checked with check_store): t4/t5 the LADDER4 t6+ boilerplate trims; t4–t6 sleeve-layer paren, label tail, RANK BLOCK label, signature-colour sentence (colour paragraph says it), fringe "never touching…" clause; t7/t8 "18K tone" clause, "WRAP CUT:" label, INNER LAYER (G20 kept, shorter), luxury lines shorter, t8 "(not only the borders)", "one foot ahead".
| t | ch | check_store --scope tpN --age a18 |
|---|---|---|
| 1 | 9746 | M06/M07/S06 |
| 2 | 9887 | M06/M07/S06 |
| 3 | 9775 | M06/M07/S06 |
| 4 | 9507 | M06/M07/S13 |
| 5 | 9424 | M06/M07 |
| 6 | 9800 | B12/M07/S07 |
| 7 | 9989 | B12/M07/S07/S14 (S14 now = necklace removed per A41 + rubies removed) |
| 8 | 9994 | B12/M07/S07 |
Open: (1) t1–t3 band count stays TWO (L1772) though Phi has THREE — ask owner if she wants 3 for all. (2) t8 outer robe now yellow (collar = yellow outer, plum inner) — OK with "Phi collar"? (3) t6 motif osmanthus is an autumn flower under Mùa Xuân.

## LADDER5 update L1799 (via #22/#23)
Red gems allowed ONLY on the t7/t8 crown, never on clothing: t7/t8 luxury lines = "more small cabochon rubies, pearls and jade on the phoenix crown"; t7/t8 JEWELLERY "NO red on clothing, belt or pendants (small rubies only on the crown)"; t1–t6 keep "NO red anywhere". Trims: t7/t8 "with her step", t7 "one foot ahead", t8 "imperial" (item), "of everything visible"→"of all visible". ch t7 9998, t8 9999; keep PASS; check_store unchanged (t7 B12/M07/S07/S14, t8 B12/M07/S07).
## LADDER5 update 2 (#23, L1799 sentence)
t7/t8 JEWELLERY = #23 sentence (+ "all SMALL and delicate", "no necklace"): "JEWELLERY: only jade, pearls and gold, Chinese court style, all SMALL and delicate; red gems ONLY on the crown, NEVER on the robe, collar, belt or pendants; no faceted or sparkling gems, nothing European, no necklace." t1–t6 unchanged (NO red anywhere). Crown red from REVERT1 thu words: t7/t8 LUXURY "more jade, pearls, gold and a few smooth red gems on the phoenix crown, long jade-and-gold belt pendants with pearl tassels" (+ t7 "still clearly simpler and less golden than the Empress"). Trims: "richer than every lower rank:", t7 head ", simpler than the Empress's" (lux line says it), t8 sleeve/colour/hem/item words, INNER LAYER "more sparsely." ch t7 9986, t8 9982; keep PASS.
S14 still FAIL at t7: the gate accepts only S14_L1794 verbatim, which contains "pearl and jade trims along the cape edges" — Hán has no cape and a cape is exactly what hid the collar, so it is NOT used; waiver asked of #23.
