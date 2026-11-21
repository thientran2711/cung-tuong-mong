# HAN5 — Hán LADDER6 collar fix (owner L1831/L1832), child of Foreman C #23
depth 5 (get_session lineage.depth) · START_CTX ~3 % of 1M · 0 image generations.

## Job
LADDER5 t2 (4RFUX629Aa) / t8 (lJtkWwngv9) vs Phi t5 (CqnIKlAEEy), sheet han_ladder5_t2_t8_L1816.png:
t2 shows ~2 collar bands and its V is narrower than Phi's; t8's 3 bands are hidden under the bead yoke/fringe, the plum area is small, and the robe is busy.

## LADDER6 = LADDER5 files + collar words only (generator dev/art/seasons4/make_han_ladder6_L1832.py)
Hair, pose, angle, held item, crown and captions are byte-identical to LADDER5. Changes:
1. V ×8: "the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V" → "the lapels lie FLAT over the tops of the shoulders out to their edge and meet low at the chest in one broad, shallow V".
2. Bands ×8: "THREE stacked WIDE gold-edged collar bands in the wide V (" → "THREE WIDE flat collar bands side by side, each gold-edged, all three running unbroken over both shoulders to the V, three clearly separate stripes, never two (" (band colours unchanged, owner L1807).
3. Yoke t4–t8: "bead yoke over both shoulders with" → "bead yoke on the outer shoulders only, OUTSIDE and below the three bands, with"; ", lying outside the collar, never touching or hiding the collar;" → ", never covering any collar band;". t8 smaller (L1794): "the richest … long fringe" → "a narrow … short fringe".
4. t8 colours (L1807): "her plum is the second colour (inner robe, collar edge, wide borders)" → "her plum is the clear second colour in LARGE calm areas (inner robe and skirt front, plum collar band, wide borders)"; inner collar "showing as a wide layered edge inside" → "showing inside" (trim).
5. Trims t7/t8 to fit ≤10 000 (each tested with check_store): " (medium depth, 18K gold tone)", " (honey-gold like #EFBD69)" in the THREE-COLOUR rule (the hex is still in the colour paragraph), yellow negatives shortened to "not cream, beige, ochre, mustard or lemon", and "INNER LAYER EMBROIDERED: …" removed (it also makes the robe less busy; tell the owner).
Tried and rejected (check_store FAIL): fabric "real cloth…" clause (M08), the "Luminous…" tail (S19), and "NOTHING on the forehead" (S34).

ch (check_store) 9613/9789/9843/9690/9344/9936/9957/9991; keep_check --sidecar PASS ×8 (.keep = LADDER5 .keep + 2 allow lines);
check_store --scope tpN --age a18 shows only the waived FAILs, the same as LADDER5: M06/M07/S06 t1–t3, M06/M07 t4–t5, S13 t4, B12/M07/S07 t6–t8, S14 t7.

## LADDER7 (owner L1847 via Foreman C #24): "the collar set still doesn't have that vibe"
Sheet han_ladder6_t2_t8_L1832.png (L6 t2 kseQG8Z16B, t8 KLpuAI0kqp vs Phi t5 CqnIKlAEEy).
CAUSE (word level): Phi CqnIKlAEEy was drawn from s62_t5_HAN_LADDER4_L1773.txt, and its collar words are the SAME as t2/t8 LADDER5. Phi's wide flat shoulder-to-shoulder neckline came from its bead yoke lying ON the collar line ("over both shoulders … lying outside the collar"), which pushed the collar flat across the shoulders. t1–t3 have no yoke, and LADDER6 moved the t4–t8 yoke off the collar, so the model drew an ordinary diagonal V from the neck with thin bands. No word described the SHAPE itself.
Fix (generator make_han_ladder7_L1847.py, built from LADDER5 files; hair, pose, angle, held item, crown and captions byte-identical):
1. Shape ×8: "the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V" → "the opening runs almost straight across the tops of both shoulders to the shoulder points, the bands lying flat ON the shoulders, then drops in one wide V meeting low at the chest".
2. Bands ×8: "THREE stacked WIDE gold-edged collar bands in the wide V (" → "THREE BOLD flat collar bands of EQUAL width side by side, each two fingers wide and gold-edged, unbroken from the neck over each shoulder down to the V, never thin, never two (" (colours unchanged).
3. Yoke t4–t7 = back to Phi's own LADDER5 words (they drew the Phi look). t8 → "a small flat gold-and-pearl bead yoke along the outer edge of the bands with a very short pearl fringe, never covering the bands".
4. t8: "her plum is the clear second colour in LARGE areas (inner robe, skirt front, wide plum collar band, borders)"; inner-collar clause shortened on t7 and t8. Same t7/t8 trims as LADDER6 (18K/hex clauses, shorter yellow negatives, INNER LAYER sentence removed).
ch 9690/9866/9920/9754/9408/10000/9998/9998; keep_check PASS ×8; check_store shows only the same waived FAILs as LADDER5/6.
### LADDER7 G57 (owner L1851 via #24): no jade pendant in any prompt
Belt-pendant words removed ×8 (folded into make_han_ladder7_L1847.py, same file names):
- t2: "with ONE small jade disc on a silk cord" → "no pendants".
- t3: the side jade pendant sets → girdle "edged with small pearls, no pendants".
- t4/t6: the zupei sets → ", no pendants".
- t5: "TWO long jade pendants" → ", no pendants".
- t7/t8: the zupei sets → "WIDE jade-and-gold belt, no pendants"; "belt or pendants" → "belt"; LUXURY sentence ", long jade-and-gold belt pendants with pearl tassels" removed.
ch 9690/9839/9878/9689/9379/9922/9877/9877; keep PASS ×8 (t5 +1 allow); check_store shows only the waived FAILs. No pendant/zupei/jade-disc words are left except "no pendants".
### LADDER7 samples (VE4, f3e889d): t2 u5WmGriQLD, t8 1ldFM7Jr4r, 110 cr, sheet han_ladder7_t2_t8_L1847.png
HAN5 read: the shape is closer to Phi (the collar now spreads wide across the shoulders, wide V, the t8 yoke is small and below the bands, no pendants). The bands still do not separate. Cause: same-colour neighbours — t2 has outer pink on a pink robe plus "inner two ivory", which reads as one ivory band; t8 has an outer yellow band on a yellow robe. In Phi the visible bands are pink on a plum robe, i.e. they contrast with the robe. The next lever is band colour order/contrast, but that is owner L1807 territory → asked #24 / the owner.
