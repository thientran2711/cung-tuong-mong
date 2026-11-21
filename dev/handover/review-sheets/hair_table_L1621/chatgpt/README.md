# ChatGPT hair-shape sheets (HAIR1 JOB 1b, owner L1630 via Foreman C #15) — 0 gens, 0 Magnific credits (G30)
hair_t1.txt … hair_t8.txt = one prompt per rank; each asks ChatGPT for ONE sheet of the 10 bun shapes of that rank (2×5 panels,
same girl, shoulders up, 3/4 view from behind so the bun shows; t1–t3 show the loose part, cycling the 3 loose variants; t7/t8 chignon under the store crown).
Lengths 4 846–5 619 chars. Rebuild: python3 make_chatgpt_hair.py (built from MASTER_COMMON.txt + store words of seasons4/ladder_base/s62_t{t}.txt + dev/art/hair/HAIR_TABLE.json).
Owner: attach ONE approved thiếu nữ picture as the style reference (the prompt says "the reference image" = drawing style + skin only); without it, ChatGPT just uses the written style.

Gate (check_store --scope tpN, approved part): no BANNED phrase; no REWRITTEN sentence; master/store kept VERBATIM where used
(M01 M02 M05 M11 M13, S02/S03 colour, S18 smile, S20/S21 hair law, S24 hairpins, S34 forehead, G39 t3 pins, F2/F4 flower size, t7/t8 crown, X08 no-phoenix t1–t6, X12 no flowers t7/t8).
MISSING on purpose (figure-only, not for a hair sheet): M03 full body, M04 body proportions, M06–M08 fabric, M09 legs/feet, M10 whole face visible (replaced by the 3/4-back view the Foreman asked for), M12 held item, M14 "No text, no labels" (the sheet needs labels), and the outfit/sleeve/item/pose store sentences (S01 S04 S06–S11 S13–S16 S19 S23 S33 S37 B12).
Hand-written (no store equivalent): sheet layout line, plain ivory upper robe, "Do not copy the hairstyle of the reference image either.", "Bare earlobes, no earrings." (= master EAR_SENT), panel lines (= HAIR_TABLE shape words), LABELS + CAPTION lines (G31).
