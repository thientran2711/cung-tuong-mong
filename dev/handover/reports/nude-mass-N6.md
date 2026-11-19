# nude-mass — painter N6 (c17–c24), foreman ROOT-35 session_01PEhRbwGPqHkqe1BAxK4nA2
START_CTX ~20 % (estimate). Rollover line ~45 %: REACHED after c17 — handover below.
PRIORITY #1 CHECK: brief nude-mass + START_CORE/WORKER/ART + FIGURE_GATE (A0, REFERENCES, rule 3, H, AGE 51, ELDER COLOURS) + consort-B10 + N4 report read; claims: none seen.

## DONE (c17; all looked at, closed lips, face clear, one fan below the chin, crown no flowers, fringe to brow; cut with images_remove_background, corners alpha 0 verified)
- c17 a26 (gen xSBSOuujfW → cut jUoUPiTLD0), c17 a18 (p8y8fBLehw → O6E6GhIynm), c17 a36 (yiuiz6CPW9 → fHzHrZLCDY), c17 a51 (cpSpIp20eP → ov6vFPn829; silver visible, deep antique gold, slightly mustard-leaning: owner to judge).
- Files LOCAL in my container only: img/_review/nude-mass/c17_{a18,a26,a36,a51}_nude.png (NOT yet cdn_synced, NOT committed — images never go in git). If container is lost, re-download from Magnific cut ids above.
- 5 gens (1 extra a18 lost to a tool interrupt), credits ≈ 4×138 + interrupted. Balance start 145,174.
- c17 face refs uploaded (Magnific): a18 gOmONWgSXO, a26 vQAQ5wDa47, a36 1ldl7Gxr4r, a51 rgXgJzFxtc (a65 uses a51 ref). Style Xm9tPkMBfo, swatch TdwDfOyVNR (both work on this account).
- NOT done: c17 a65 (HOLD: ROOT-35 said no a65 until the builder commit keeping a65 the same soft yellow as a51); c18–c24 all ages; sheets; cdn_sync.

## METHOD (works)
1. face refs: creations_upload_image(url=https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-cNN-t1-aNN.webp (200 for a18/a26/a36/a51 of c17–c24; a65 = 404, use a51), folderReference ba4aecfe…).
2. prompt: `python3 dev/art/t8-prompt-B/build.py cNN v0 --state nude --spec5pose --nudeopt auto --age aNN` + appended: " The second reference image is style only: IGNORE its background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers/branches, no smoke, no haze, no glow, no stain."
3. images_generate gpt-2-6, 1024x2304, 2k, extraSettings {transparentBackground:true}, refs in order [image face, style Xm9tPkMBfo, image swatch TdwDfOyVNR]; look with creations_read; images_remove_background; download; check corners alpha. 3 gens in parallel per call works. Tool calls can get "interrupted" — the gen may still exist; check before retrying.
4. Then sheets per 8 people (rows people × cols ages), cdn_sync.py img/_review/nude-mass (from main checkout/worktree), READY to ROOT-35.
Options auto: c17 A, c18 B, c19 C, c20 D, c21 A, c22 B, c23 C, c24 D. Items: c17 round fan, c18 folding fan, c19 censer, c20 pendant, c21 seal, c22 sceptre, c23 scroll, c24 mirror.

## OPEN QUESTION to ROOT-35 (unanswered when I stopped)
build.py nude --spec5pose pose text: c17 "stepping forward to offer the fan in both hands, sleeves swinging"; c18–c22 "raising the <item> open beside her cheek, glancing over it"; c23/c24 "standing as a breeze lifts her long stole, one hand holding <item>"; same at a51/a65. Conflicts with: item below the chin, calm top rank/elders, no flying cloth. My c17 results (builder as is) still came out calm and fine. Proposal A: swap only the pose sentence for the calm one in build_nude_own; B: builder as is. Successor: ask ROOT-35 / check its reply; c18–c22 "beside her cheek" risks covering the face — LOOK hard; regen up to 3.
