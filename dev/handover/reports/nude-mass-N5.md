# nude-mass — painter N5 (c09–c16), coordinator Foreman ROOT-34 → ROOT-35 (session_01PEhRbwGPqHkqe1BAxK4nA2)
START_CTX ~14 % (estimate). Rollover line ~39 %. ROLLING OVER NOW (~38 %).
PRIORITY #1 CHECK: brief nude-mass + START_CORE/WORKER/ART + FIGURE_GATE (A0 + REFERENCES, rule 3, H Nữ đế, AGE 51, ELDER COLOURS, Nữ đế lines) + consort-B10 + nude-mass-N4 read; claims: none seen. Owner orders via ROOT-34: a18 was dropped then re-added ("Thôi vẽ luôn 18 tuổi nữ đế đi") → ALL 5 ages.

## Procedure that works (copy it)
1. Faces: live t1 `https://ctm-img.victoria-tntt.workers.dev/img/hd/fig-consort-cNN-t1-aNN.webp` (a18/a26/a36/a51 exist, a65 404 → use a51) → `creations_upload_image` (folderReference ba4aecfe…) → identifier.
2. Prompt: `build.py cNN v0 --state nude --spec5pose --nudeopt auto --age aNN` + K3 background sentence. Generator script /tmp/…/mk.py is not durable; logic below.
3. POSE FIXES done at gen time (builder untouched — ROOT should decide whether to bake them in): spec5pose gives (a) c09 "a small songbird perched on her raised finger… + censer" = TWO objects → replaced by "standing calmly holding <item> in one hand at waist height, the other hand resting calmly at her side"; (b) c13/c14/c16 "stepping forward to offer X in both hands, sleeves swinging" → "offering X in both hands, head tilted gently" (rule 3: Nữ đế never walks/swings sleeves); (c) c15 "raising a mirror up beside her cheek, glancing at it" (covers face / looks aside) → "holding the mirror at chest height in one hand, the other hand resting calmly at her side, her eyes toward the viewer, the mirror clear of her face". c10/c11/c12 poses ("offering X forward with both hands, head tilted gently") unchanged.
4. gen: gpt-2-6 1024x2304 2k transparentBackground, refs [own face image, style Xm9tPkMBfo, swatch TdwDfOyVNR image]; then `images_remove_background` on EVERY gen (halo/parchment always present); download cut-out; corners alpha 0 verified.
5. Sheet: scratch script (rows = people, cols a18..a65, 380x855 on #D6D0C6). Upload `python3 dev/site/cdn_sync.py img/_review/nude-mass` from the repo (works from this checkout; cdn_sync.py is on the handover branch here).
Option/item table (builder, auto): c09 A censer | c10 B pendant | c11 C seal | c12 D sceptre | c13 A scroll | c14 B ruyi | c15 C mirror | c16 D hốt.

## DONE
c09 (option A, censer): a18 lJtJ9XMgv9, a26 kseswuF16B, a36 yiuiGFGPW9, a51 SyhyifDUb8, a65 MBJBh4GDCm → cut-outs files img/_review/nude-mass/c09_{a18,a26,a36,a51,a65}_nude.png (on CDN). 5 gens, 0 regens, credits 5×135+5×3 = 690 (balance before 145,174). Looked at all 5: closed smile, face clear, one censer at waist, one dragon-phoenix crown no flowers, fringe to the brow, calm pose; a36 face young, a51 visible silver + deep antique gold/burgundy, a65 clearly elderly, silver hair. Honest note: a51 and a65 gold read slightly mustard/ochre (same issue N4 flagged on c10 a65) — owner to judge. Sheet (c09 only): https://ctm-img.victoria-tntt.workers.dev/img/_review/nude-mass/check_c09.jpg
c10: N4's sample already covers a18/a51/a65 (reuse, do NOT regen). STILL TO MAKE for c10: a26 + a36 (2 gens).

## TODO for successor N5b
c10 a26,a36 · c11–c16 × all 5 ages (30 gens) = 32 gens ≈ 4.4k credits. Face refs not yet uploaded for c10–c16 (c09 uploaded: a18 u5W5xLKQLD, a26 P3Q3GYB42C, a36 dt4tfQKXSL, a51 jUoUy6TLD0). Then sheet_c09-c16.jpg (8 rows) + READY to ROOT-35. Re-read FIGURE_GATE + consort-B10 before every person. Look at every image at hq=low is enough for face/item check; check pose item fixes above.
