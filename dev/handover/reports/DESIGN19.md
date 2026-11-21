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

## JOB 2 — owner L1606 + L1607 (via Foreman C #14): SCRAP the t1–t3 design → new Hán quju (khúc cư) design, files _v6 — 0 gens
v5 (JOB 1) is superseded but kept on disk as history and as the keep base.
Ladder check (L1607 "trực cư là lên quý nhân mới có"): today's xuân Hán t4–t8 (open5c/open3c/open5c/open8c/open11c) are ALL quju (khúc cư). No tier carries zhiju/trực cư. The t4 Tần wording is "wraps across ONCE … softly curved hem edge (short simple wrap)", and t6 has "the long spiral quju wrap". So t1–t3 = khúc cư, the short wrap like the Tần's, and every zhiju word is dropped. **FLAG:** if trực cư should appear "from Quý nhân/Quý phi up", no prompt carries it yet. That is the owner's call.
Hán expert basis: Western Han layered robes (several robes, each with its own jiaoling collar, stacked so 2–3 collar bands show in one V, closing left over right = hữu nhẫm) + quju front panel wrapping round the body with a wide contrasting border (duyên). Merged with her liked Hán words (gọn/open2 Phi: "inner collar showing as a wide layered edge inside the outer collar"; open5c Tần: "wraps across ONCE … softly curved hem edge").
New design paragraph (t3 shown):
"a NEW outfit, a Han-dynasty quju (khúc cư) look in TWO visible robe layers: a floor-length wrapped outer robe in peach-blossom pink over a full inner robe in ivory white; LAYERED CROSSED COLLARS (jiaoling): two wide crossed collars, left over right, the inner one just inside the outer, so TWO bands show side by side in one broad V that starts near the shoulder points, SECURE on the shoulders, never slipping off, and crosses just above the sash (no crossing at the throat, no straight-across top); inner collar edged by one slightly wider band of small embroidered semi-double China roses in peach-blossom pink and gold; the outer front panel wraps ONCE round to the side to a softly curved bordered hem (short, like the Tần's; no high waist, no petal panels), the inner robe hem showing below; wide long sleeves (one single visible sleeve layer, every inner sleeve hidden inside) ending in embroidered ivory white cuff bands; a thin ivory white piping and ONE WIDE stiff ivory white band embroidered with semi-double China roses along the outer collar, wrap edge and hem (the Quý nhân edge); wide embroidered semi-double China roses bands at the sleeve ends and the hem, sprays of China roses on the upper garment; the outer robe HELD IN by the sash or girdle tied OVER it, hugging the body, never a loose open coat; a wide stiff ivory white silk girdle at the natural waist with ONE jade disc at the centre and a long ceremonial jade pendant set on each side down to the knees: small carved jade plaques linked by strings of pearls, ending in silk tassels; no signature piece; no shawl;"
Per rank (G42: every tier has embroidered borders + jade; each higher tier carries all of the lower one, a little denser):
- t1 edge "ONE narrow … band of tiny embroidered lilac sprays along the outer collar, wrap edge and hem" (was plain, no embroidery) · store G8 · sash ends hanging down + ONE small jade pendant (was "no pendants").
- t2 edge "TWO stacked NARROW bands along the outer collar, wrap edge and hem: a thin piping and a narrow band of small embroidered tiger lilies" · store G8 + "small sprays of tiger lilies on the upper garment" (carried from t1) · sash ends hanging down + ONE jade disc + ONE jade pendant.
- t3 edge "a thin piping and ONE WIDE stiff band embroidered with semi-double China roses along the outer collar, wrap edge and hem" · store G8 + "sprays of China roses on the upper garment" · girdle + ONE jade disc at the centre + the 2 pendant sets.
Captions: "… · Khúc cư hai lớp, cổ viền hoa nhỏ / cổ viền hai lớp hoa / cổ viền thêu rộng".
Kept from master/store (L1567): HEAD open neck, B29 fabric, G40 OUTER_IN, COLLAR CUT, G8 store clause, G39 hairpins, xuân palette (D4), sleeve-layer law words.
Dropped (listed as allow lines in .keep, base v5): the zhiju words (straight-cut robe, straight front edge, WIDE straight hem band, no ruffled petticoat, no wrap spiral, never a short jacket), "LONG garments only", "the sleeve body plain" (G42: sleeves embroidered), "all collar bands lie flat only along those edges", t1's plain collar band, and the old v5 collar words. "no high waist" was KEPT (it stops the Tang look).
Gates: check_store tp1/tp2/tp3 a22 STORE CHECK PASS ×3 · keep_check --sidecar PASS ×3 · --all 262 PASS. Lengths 9430 / 9700 / 9989 (trims used 8, same as v5).
Open: GEN1 drafts (Magnific) per foreman. Watch for: 2 collar bands visible, the wrap panel curving round to the side, no horizontal top.
