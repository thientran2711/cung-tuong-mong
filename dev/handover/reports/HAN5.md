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
