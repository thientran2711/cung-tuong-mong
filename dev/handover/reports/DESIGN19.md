# DESIGN19 — xuân Hán s62 t1–t3 v5: collar back to a real Hán crossed collar (owner L1604 via Foreman C #14)
depth 5 (child of C #14) · START_CTX ≈ 3 % (used_tokens read 0; estimate) · end ≈ 12 % · 0 gens, 0 credits.

## Sheet (LOOKED): dev/handover/review-sheets/han_collar_L1604/sheet.jpg
Top row = liked Hán (existing pics): 1 Hán open2 Phi t5 L1417 "Phi thích nhất" · 2 Hán gọn Phi t5 L1371 "Phi đẹp" · 3 Quý phi t6 L1290 · 4 Hoàng hậu t8 L1290 ("khá là ổn").
Bottom row = xuân t1–t3 v3 drafts (L1599).

## Diagnosis (why v3 stopped looking Hán)
Liked pictures: ONE wide V collar from the shoulders that CROSSES (jiaoling), inner collar visible only as a layered edge inside the same V.
v3: white horizontal straight-top inner bodice (from L1577 "top edge straight across below the collarbones") + outer collar edges running PARALLEL straight down to the hem
("a straight vertical front edge", L1601) = an open coat over a tube top = Song beizi / Tang look, not Hán.

## Liked collar words (quoted)
- G32 (owner 20/11 ~18:15Z): "Hán cái cổ áo to như vậy tao thích" → rule text "Hán … wide collar to the shoulders liked".
- Hán gọn Phi t5 (L1371 "Phi đẹp", seasons4/s62_t5_HAN_BAC_gon): "the crossed collars of BOTH robes open WIDE: the lapels sweep out toward the edge of the SHOULDERS and meet low at the chest in a broad V, showing her neck and collarbones fully but modestly (never narrow near the neck, never a tight high crossing), the pink inner collar showing as a wide layered edge inside the plum outer collar"
- Hán open2 Phi t5 (L1417 favourite) and xuân t4/t5/t6 open5c/open3c/open5c (ỔN L1552): "the collar is worn OPEN, pulled wide OFF the neck: its two edges start at the OUTER shoulder points and run straight down to cross only LOW at the sash; the inner collar lies flat just inside those edges; all collar bands lie flat only along those edges"

## New collar sentence (v5; t2 shown, t1/t3 same except the {inner} band words)
"a WIDE Han CROSSED COLLAR (jiaoling): its two edges start near the shoulder points, SECURE on the shoulders, never slipping off, and sweep down in one broad V to CROSS left over right just above the sash; INNER ROBE: opaque ivory white, its collar a layered edge just inside the outer collar, same V (no second diagonal at the throat, no straight-across top, never parallel open-coat edges), edged by one narrow band of small embroidered tiger lilies in peach-blossom pink and gold; all collar bands lie flat only along those edges;"
+ zhiju: "a straight vertical front edge to a WIDE straight hem band" → "below the crossing the front edge runs straight down to a WIDE straight hem band" (rest of the L1601 clause kept).
HEAD kept ("collar open OFF the neck, SECURE on the shoulders: bare neck and collarbones"). Kept unchanged: OUTER_IN (G40), COLLAR CUT, TIER_LOW G8 density, xuân palette, G39 hairpins, B29 fabric, rank edge bands, sash/girdle, caption.
Left-over-right = hữu nhẫm (left panel over the right), the correct Hán closure.

## Rule check / conflicts
- L1577 ("diagonal crossed line at the neck = fault"): the fault was the INNER robe's own SECOND crossing higher up, at the throat. Now the inner collar is only a layered edge inside the same V, crossing at the same point → no second diagonal at the throat (spelled out). DESIGN18's fix (straight-across inner top) is replaced because that horizontal top is what made v3 read as beizi/Tang. **Owner/foreman to confirm.**
- L1565 (open only to the shoulder points) + L1601 (secure, not slipping): "start near the shoulder points, SECURE on the shoulders, never slipping off" kept.
- G25/G17 (spring = open square neck for t1–t3): Hán look keeps the Hán open crossed collar (DESIGN16 ruling, G32); neck + collarbones bare via HEAD.
- A40 (Hán t4–t8: write nothing about an inner top across the chest): now followed for t1–t3 too (no horizontal top); L1565 "describe the inner layer" kept as the layered collar edge.
- G21 (crossed collar a36/a51/a65): different ages, no conflict. G40: OUTER_IN unchanged.
- Dropped "never a deep low V" (length) — "start near the shoulder points … just above the sash" carries it.

## Build + gates
dev/art/seasons4/make_han_xuan_t13.py → s62_t1_HAN_BAC_v5.txt 9494 · t2 9700 · t3 9993 (LIMIT 10000).
Extra A38 boilerplate trims needed (all from make_han_bac.TRIM[4], each stated elsewhere): ", never a pair", ", no cluster", ", never back-turned", ", never in profile", " Everyone beautiful at every age." (trims used 4→8).
check_store --scope tp1/tp2/tp3 --age a22: STORE CHECK PASS ×3 · keep_check --sidecar PASS ×3 (base v4) · keep_check --all 256 PASS.
Note for foreman: "--scope tpN" in earlier reports means tp1/tp2/tp3 — literal "tpN" FAILS M06 (B29 swap not applied) on v4 too.

## Next
Owner runs v5 on ChatGPT herself (no Magnific gen). Nothing else open.
