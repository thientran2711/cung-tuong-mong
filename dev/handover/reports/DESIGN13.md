# DESIGN13 — ĐÔNG fur cloak, SOFT vân kiên (owner Lượt 1472) — Foreman C #10
STATUS: depth 1 · START_CTX ≈ 3 % (get_session read 0; estimate) · finished at about 8 % · no rollover needed · 0 Magnific gens.

## Files
dev/art/dong_hientai/{s62_t4,s62_t5,s62_t6,s62_t7,s62_t8,m02_t7,m02_t8}_DONG_HIENTAI_cloak5.txt + .keep (base = _cloak4).
Chars t4 9855 (= base, copied unchanged) · t5 9875 · t6 9919 · t7 9987 · t8 10000 (exactly at the limit) · m02_t7 9955 · m02_t8 9969.

## WHY each rank reads stiff (plain English)
- Tần t4 (soft, the model): a small round SILK piece with an airy, sparse pearl net. No hard words. Left unchanged.
- Phi t5: "SATIN shoulder bands" (satin reads glossy and stiff), "RICHLY embroidered in gold thread", "edged with a ROW of SEWN-ON pearls" (a hard beaded rim), "SMALL and FLAT" with nothing saying soft.
- Quý phi t6: "FLAT" said twice ("SMALL, FLAT … sewn flat"), "a SCALLOPED gold-thread edge" (a hard cut-out outline), and no word for the cloth (no "silk") so the model guesses something stiff.
- Hoàng quý phi t7 (both): "a FLAT JEWELLED cloud collar … lying FLAT" reads as a jewelled plate, not cloth.
- Hoàng hậu t8 vs HQP t7 — why she reads stiffer:
  1. Collar: same "FLAT jewelled … lying flat", plus "two tiers of SCALLOPED lobes": two hard layers stacked look like armour.
  2. Pose: "her CHIN LIFTED" (proud, rigid neck) and "with STATELY grace, the robe falling STILL AND STRAIGHT", which tells the robe not to move. The m02 HH already had "swaying gently" and read softer.
  3. Fabric: "THICK gold-embroidered brocade" plus "FAR DENSER and richer embroidery than any other rank": heavy, dense brocade hangs like a board.
  4. Crown: "jewelled wings spreading WIDE": a big rigid crown stiffens the head line.
  5. The cloak join: "the cloud collar ON the cloak's shoulders" (at all ranks t5–t8) reads as a separate stiff object placed on top.
  (FULLY FRONTAL is the same at HQP t7, so it is not the difference. Not changed, because it is a rank-variety angle.)

## What changed (signature kept: Phi 2 bands, QP four-lobed cloud collar, HQP jewelled cloud collar + short pearl fringe, HH two small tiers + nine-phoenix crown)
- Every shoulder piece t5–t8 is now SOFT, of supple SILK, "draping with the shoulders" (QP: "one supple layer draping with the shoulders"). "FLAT"/"lying flat" are gone from the HQP/HH collars. The placement guards are KEPT word for word (ONLY on the shoulders and upper back, WITHIN their width, stops at the shoulder line, nothing puffed / beyond the shoulders). "sewn flat" is kept at Phi/QP, the same as Tần (the owner says Tần is soft).
- WINTER clause: "the <piece> on the cloak's shoulders" → "the <piece> lying soft on the cloak's shoulders". The rest of the clause (all fur words) is BYTE-IDENTICAL, checked by script for all 7 files.
- HH t8 only: chin lifted → head inclined gently toward the hairpin, shoulders relaxed; stately → gentle grace; "robe falling still and straight" → "hem swaying softly"; FABRIC thick → supple silk brocade (m02_t8 too); "far denser and richer embroidery" → "finer and richer"; crown wings "spreading wide" → "spreading gracefully" (nine-phoenix crown, size words and jewels kept).
- Boilerplate trims to fit 10 000 (each one said earlier in the prompt, listed as allow lines): t6 an orphan EMPTY duplicate "CAPTION: … WITH accents:" line; t7 "Floor-length robe with slippers visible, no train" → "No train" (the outfit already says floor-length robe with slippers visible); t8 + m02_t8 "The item is in a contrasting colour, not the robe colour;" (the HELD ITEM COLOUR sentence already says this).

## Own word diff _cloak4 → _cloak5
- s62_t4: (unchanged)
- s62_t5: "SMALL" → "SMALL, FLAT"; "FLAT:" → "SOFT:"; "embroidered" → "soft supple"; "satin" → "silk"; "" → "draping with the shoulders,"; "richly" → "finely"; "" → "softly"; "a row of small sewn-on" → "tiny"; "" → "lying soft"
- s62_t6: "FLAT" → "SOFT"; "" → "silk"; "(yunjian)" → "(yunjian), one supple layer draping with the shoulders,"; "" → "softly"; "" → "lying soft"; "⏎⏎CAPTION: in LARGE bold letters, top-left corner, on the plain background, never over her body, write exactly this Vietnamese text WITH accents:" → ""
- s62_t7: "FLAT" → "SOFT"; "" → "of supple silk draping with the shoulders,"; "flat" → ""; "" → "lying soft"; "Floor-length robe with slippers visible, no" → "No"
- s62_t8: "(far denser" → "(finer"; "embroidery" → ""; "FLAT" → "SOFT"; "" → "supple silk in"; "" → "softly"; "" → "draping with the shoulders,"; "flat" → ""; "wide" → "gracefully"; "thick" → "supple"; "" → "silk"; "chin lifted just a little," → "head inclined gently toward the hairpin,"; "elegant." → "elegant, shoulders relaxed."; "" → "lying soft"; "stately" → "gentle"; "robe falling still and straight. The item is in a contrasting colour, not the robe colour; her" → "hem swaying softly. Her"
- m02_t7: "FLAT" → "SOFT"; "" → "of supple silk draping with the shoulders,"; "flat" → ""; "" → "lying soft"
- m02_t8: "FLAT" → "SOFT"; "" → "supple silk in"; "" → "softly"; "" → "draping with the shoulders,"; "flat" → ""; "wide" → "gracefully"; "thick" → "supple"; "" → "silk"; "" → "lying soft"; "stately" → "gentle"; "item is in a contrasting colour, not the robe colour; the" → ""

## Proof (A38)
keep_check --sidecar PASS ×7 · keep_check --all 153 sidecars PASS · fur text byte-identical ×7 (script) · check_store s62 t5–t8: FAIL set IDENTICAL to _cloak4 (no new FAIL; the old ones remain), no LEN fail.

## Open / recommend (NOT changed: outside the brief, A18)
- m02_t7 HQP pose "upright, feet together, … held level at her waist with both hands, with stately grace, the robe falling still and straight" and s62_t7 "with stately grace, the robe falling still and straight" are the same stiff pose words as HH. If the owner wants HQP looser too, swap them for "gentle grace, the hem swaying softly".
- Robe-body stiff words left alone: t5 "deep brocade cuffs, broad gold brocade girdle"; t6 "HEAVY silk brocade robe"; t6/t7 "FABRIC: thick gold-embroidered brocade".
- s62_t4 and s62_t5 still carry the orphan empty CAPTION line (harmless; t6 trimmed).
- s62_t8 is at exactly 10 000 chars: any later addition needs a trim first.

## Follow-up (C #10 asked to apply the recommendation, in place in _cloak5)
- s62_t7: "with stately grace, the robe falling still and straight" → "with gentle grace, the hem swaying softly".
- m02_t7: "upright, feet together, a folded letter" → "standing softly, weight on one leg, a folded letter"; "held level at her waist with both hands, with stately grace, the robe falling still and straight" → "held gently at her waist with both hands, her head softly inclined, with gentle grace, the hem swaying softly".
- Chars s62_t7 9973, m02_t7 9980. .keep allow lines added. keep_check --sidecar ×7 PASS, --all 155 PASS, fur byte-identical ×7, check_store t7 FAIL set = _cloak4. (The first "Open" item above is now DONE.)

## _cloak6 (owner Lượt 1488, via C #10): "tần ok, mềm đẹp, nhưng lên phi 2 lớp là bị thô lại, quý phi ổn, hoàng hậu bị thô lại, hoàng quý phi tạm, nhưng 2 hình của m02 lại nhìn gọn gàng"
Files: dev/art/dong_hientai/{s62_t4..t8,m02_t7,m02_t8}_DONG_HIENTAI_cloak6.txt + .keep (base _cloak5). t4, t6, m02_t7, m02_t8 are copied UNCHANGED. Chars t5 9864 · t7 9973 · t8 9997.

### What I saw in the owner's pictures (cloak5 t5, t7, t8)
- Phi: the 2 bands came out as two stacked, raised, dome-like caps covered in a pearl net, with a beaded fringe sticking out past the shoulders. That is the "coarse" look.
- HQP and HH: the cloud collar came out as raised epaulette caps with long pearl drop fringes. On HH there are two tiers of them, plus a huge gold cloak with big phoenixes and very wide sleeves, all shown square to the viewer.

### WHY s62 t7/t8 read bulkier than m02 (word diff s62 vs m02 _cloak5)
The outfit text is almost word-for-word the SAME (same collar, fringe, crown, colour rule, sleeve law). The real differences:
1. ANGLE (the biggest): s62 t7 AND t8 are both "FULLY FRONTAL … squarely facing the viewer". m02 t7 is "a SLIGHT turn (15°)" and m02 t8 is "a clear THREE-QUARTER view". Frontal shows both shoulder caps, both wide sleeves and the full width of the fur cloak side by side, so it is the widest silhouette possible. A turned body hides one shoulder and narrows everything.
2. POSE: s62 t8 "item held in the hand raised and admired, the other hand beneath it" opens both arms and spreads the sleeves; m02 t8 is "mid-step, sleeves flowing". s62 t7's flute is held low at her side, so one arm stands away from the body; m02 t7 holds the letter at the waist with both hands (compact).
3. s62 t8 alone had "the most splendid outfit of all, clearly grander than every other rank" (pushes "more of everything") and "floor-length robe with slippers visible" twice; m02 has neither.
4. m02 says "only slipper toe tips peeking under the hem"; s62 had "slippers visible".
NOT changed, needs the FOREMAN: points 1–2 are the seeded angle/pose slots (E1: 8 distinct angles per person; B2 store slots). m02's angles would duplicate s62 t6 (15° left) and t4 (¾ left). My recommendation: give s62 t7/t8 a turned angle (e.g. the mirrored 15° RIGHT / ¾ RIGHT, if free in s62 t1–t3) and a compact item hold. This is probably what makes m02 look neat.

### What changed (_cloak5 → _cloak6)
- Phi t5: "SMALL, FLAT, THIN and LIGHT like the Tần's: TWO very thin soft silk bands, so thin and close that they read as ONE soft layer". Pearl detail made small: one row of drops → "a few tiny pearl drops"; the net of "small pearls and small jade beads" → "sparse tiny pearls" (like the Tần's); added "never a raised cap, never puffed or stiff". Two bands, gold hollyhocks and pearl edge kept (Phi signature).
- s62 t7/t8 collar: + "close-fitting, never a raised cap,". Jewels, fringe and tiers kept.
- s62 t8 (m02 wording): removed "; the most splendid outfit of all, clearly grander than every other rank" and the outfit-line "floor-length robe with slippers visible,"; "No train." → m02's "Floor-length robe, only slipper toe tips peeking under the hem, no train."; "More jewels on the crown … trims on" → m02's "on the phoenix crown … trims along". Nine-phoenix crown and the "GRANDEST headdress" rank wording kept.
- s62 t7 (m02 wording): "floor-length robe with slippers visible" → "floor-length robe, only slipper toe tips peeking under the hem". Trim: "The item is in a contrasting colour, not the robe colour;" (duplicate of HELD ITEM COLOUR).

### Word diff _cloak5 → _cloak6
- s62_t4: (unchanged)
- s62_t5: "FLAT" → "FLAT, THIN"; "SOFT:" → "LIGHT like the Tần's:"; "layered" → "very thin"; "supple" → ""; "bands draping with the shoulders," → "bands, so thin and close that they read as ONE soft layer,"; "one over" → ""; "other (the" → ""; "narrower), each" → "a little narrower,"; "small" → "tiny"; "each" → ""; "with ONE short row of" → "a few"; "beneath" → "at"; "band," → "edge,"; "small" → "sparse tiny"; "and small jade beads" → ""; "" → "them (like"; "bands (the same kind of beaded pearl net as the Tần's);" → "Tần's), never a raised cap, never puffed or stiff;"
- s62_t6: (unchanged)
- s62_t7: "" → "close-fitting, never a raised cap,"; "robe with slippers visible;" → "robe, only slipper toe tips peeking under the hem;"; "item is in a contrasting colour, not the robe colour; the" → ""
- s62_t8: "" → "close-fitting, never a raised cap,"; "floor-length robe with slippers visible," → ""; "sides; the most splendid outfit of all, clearly grander than every other rank." → "sides."; "" → "phoenix"; "on" → "along"; "No" → "Floor-length robe, only slipper toe tips peeking under the hem, no"
- m02_t7: (unchanged)
- m02_t8: (unchanged)
FUR byte-identical vs _cloak4: 7/7

Proof: keep_check --sidecar ×7 PASS · --all 165 PASS · fur byte-identical vs _cloak4 ×7 · check_store s62 t5/t7/t8: same FAIL sentences as _cloak5 (only the match scores moved), no new FAIL, no LEN.

## _cloak6 UPDATE (in place): owner Lượt 1490 fur + C #10 decision (owner-test change, L1488/L1490 neatness)
Owner L1490: "Nếu vậy cho lông của hqp và hh bằng lông 2 đi. Xem thử có đỡ cồng kềnh hơn không".
- FUR (the ONLY fur change, ordered by the owner): s62 + m02 t7/t8 WINTER fur words = s62_t6 fur words VERBATIM (Lông 2: "a VERY WIDE … about two and a half hands wide … rich, warm and cosy, yet lying smooth and close, never puffy or bulky"). The collar noun stays "cloud collar" (rank-correct, the same as t6).
- ANGLE (C #10 decision): s62's real store plan (build_all a18) is t1 = idx3 frontal, t2 = idx7 frontal mirrored, t3 = idx11 ¾ RIGHT, t4 ¾ LEFT, t5 frontal, t6 15° LEFT. The old Đông t7/t8 (idx7 / idx3) therefore repeated t2/t1. The new angles use FREE indices:
  - t7 = idx8 "a SLIGHT turn toward the RIGHT (about 15 degrees) … whole face clearly visible and towards the viewer".
  - t8 = idx2 "a clear THREE-QUARTER view toward the RIGHT, NOT frontal … face fully visible".
  Note: idx2 is a free index, but it is the same visual class (¾ right) as t3's idx11. No turned class was left unused; the foreman should confirm.
- COMPACT HOLD: t7 flute "held low at her side" → "held close at her waist in both hands, sleeves falling close,"; t8 hairpin "held in the hand raised and admired, the other hand beneath it" → "held close at her waist in both hands, sleeves falling close,".
- Trims to fit 10 000 (said elsewhere in the same prompt): "Even while her hands are raised to hold her item at chest height, each wide sleeve" → "Each wide sleeve" (also wrong now that the hands are at the waist); t7 ANGLE "; her head turns together with her shoulders and body" (the HEAD AND BODY line says it); t8 "and its hem lies on the floor beside her feet" → "to the floor" (SLEEVE LENGTH already says it touches the floor); t8 "fair porcelain skin;" (said in line 1).
- Chars: s62_t7 9952 · s62_t8 9982 · m02_t7 9905 · m02_t8 9894.

FUR t4–t6: byte-identical vs _cloak4 (3/3). t7/t8 fur clause now == s62_t6 fur clause (4/4).
FUR DIFF t7/t8 (identical for s62 t7, s62 t8, m02 t7, m02 t8): "the WIDEST, THICKEST and most" → "a VERY WIDE,"; "deep, dense, plush" → "thick"; "far" → ""; "and fuller" → ""; "any" → "the"; "rank," → "ranks,"; "three" → "two"; "wide and visibly thick and lush," → "wide,"; "sumptuous, softly rounded" → "cosy, yet lying smooth"; "full, yet neat and elegant;" → "close, never puffy or bulky;"

WORD DIFF _cloak5 → _cloak6, NON-FUR (final):
- s62_t4: (unchanged)
- s62_t5: "FLAT" → "FLAT, THIN"; "SOFT:" → "LIGHT like the Tần's:"; "layered" → "very thin"; "supple" → ""; "bands draping with the shoulders," → "bands, so thin and close that they read as ONE soft layer,"; "one over" → ""; "other (the" → ""; "narrower), each" → "a little narrower,"; "small" → "tiny"; "each" → ""; "with ONE short row of" → "a few"; "beneath" → "at"; "band," → "edge,"; "small" → "sparse tiny"; "and small jade beads" → ""; "" → "them (like"; "bands (the same kind of beaded pearl net as the Tần's);" → "Tần's), never a raised cap, never puffed or stiff;"
- s62_t6: (unchanged)
- s62_t7: "" → "close-fitting, never a raised cap,"; "robe with slippers visible;" → "robe, only slipper toe tips peeking under the hem;"; "Even while her hands are raised to hold her item at chest height, each" → "Each"; "FULLY FRONTAL," → "a SLIGHT turn toward the RIGHT side of the picture (about 15 degrees):"; "body, shoulders" → "chest"; "squarely facing" → "point a little toward the right edge of the picture, the shoulder on the picture's left side slightly nearer"; "no turn, mirrored: her weight" → "the whole face clearly visible"; "" → "towards"; "item on her LEFT side; her head turns together with her shoulders and body," → "viewer,"; "low" → "close"; "side," → "waist in both hands, sleeves falling close,"; "item is in a contrasting colour, not the robe colour; the" → ""
- s62_t8: "fair porcelain skin;" → ""; "" → "close-fitting, never a raised cap,"; "floor-length robe with slippers visible," → ""; "sides; the most splendid outfit of all, clearly grander than every other rank." → "sides."; "Even while her hands are raised to hold her item at chest height, each" → "Each"; "and its hem lies on" → "to"; "floor beside her feet;" → "floor;"; "FULLY FRONTAL," → "a clear THREE-QUARTER view toward the RIGHT side of the picture, NOT frontal:"; "" → "whole"; "shoulders" → "shoulders, hips"; "squarely facing" → "turned about 45 degrees so that her chest and face point toward the right edge of the picture, the shoulder on the picture's left side nearer"; "her weight resting on her RIGHT foot;" → "face fully visible;"; "" → "phoenix"; "on" → "along"; "dangles," → "dangles"; "" → "close at her waist"; "the hand raised and admired, the other hand beneath it," → "both hands, sleeves falling close,"; "No" → "Floor-length robe, only slipper toe tips peeking under the hem, no"
- m02_t7: (unchanged)
- m02_t8: (unchanged)

Proof: keep_check --sidecar ×7 PASS · --all 165 PASS · fur t4–t6 byte-identical vs _cloak4 · t7/t8 fur == s62_t6 fur (×4, script) · check_store s62 t7/t8 and m02 t7/t8: same FAIL count/set as _cloak5 (no new FAIL, no LEN).

## _cloak7 — Hoàng hậu t8 only (owner Lượt 1498: "Hoàng hậu vẫn thô kìa", relayed by C #10)
Files: dev/art/dong_hientai/{s62_t8,m02_t8}_DONG_HIENTAI_cloak7.txt + .keep (base _cloak6). Chars s62 9998 · m02 9949.

### WHY she is still coarse (picture cloak6_t8_hoanghau_L1498 + prompt words)
1. The CLOAK CLOTH: "the robe richly embroidered on the chest, shoulders and wide sleeves with LARGE phoenixes, incurved chrysanthemums and clouds … (finer and richer / far denser than any other rank)" + "FABRIC: … gold-embroidered silk BROCADE". In the picture the whole yellow cloak is covered in giant phoenixes and chrysanthemums, so it reads as heavy brocade.
2. The SHAPE: nothing said how the cloak hangs, so the model spreads it like a bell to the floor (the sleeve law "very long, very wide" adds to the width).
3. The SHOULDER PIECE: "richer than the Hoàng quý phi's" + "short pearl-and-gold DROP fringe (a little LONGER than the Hoàng quý phi's)" gives two tiers of pearl drops jutting past the shoulders.

### Changes _cloak6 → _cloak7 (s62 + m02 t8)
- Embroidery: "the outer robe embroidered ONLY in a border band along its edges and cuffs with SMALL phoenixes, incurved chrysanthemums and clouds …, the rest plain, ONE small phoenix roundel on the back, no large all-over motifs".
- FABRIC: "soft light silk, not brocade, with a graceful, flowing drape".
- Cloak shape (in the WINTER clause, BEFORE the fur words): "a slim cloak hanging close and narrow, never bell-wide,".
- Shoulder piece: "richer than" → "finer than" the Hoàng quý phi's; fringe → "its very short fine pearl fringe" (no "longer than"). Two small tiers kept.
- s62 only (length): GRACE "her neck long and elegant," dropped; "Each wide sleeve still hangs" → "hangs".
- COLOUR CHOICE: royal golden yellow stays the CLOAK colour (COLOUR RULE unchanged: "DOMINANT colour of the robe, sleeves and skirt"). Why: yellow is the one rank sign of the Empress readable at a glance, and the COLOUR RULE / THREE-COLOUR RULE are rank law. The coarseness came from the giant all-over motifs and the brocade, not from the colour. Plain soft yellow silk with only a border band reads light. Kept: the nine-phoenix crown, the GRANDEST headdress wording, jewels, belt pendants, pearl strands, "The phoenix is the main embroidered motif".
- Fur (Lông 2) words byte-identical (script, 2/2).

### Word diff _cloak6 → _cloak7
- s62_t8: "" → "outer"; "richly" → ""; "on the chest, shoulders" → "ONLY in a border band along its edges"; "wide sleeves" → "cuffs"; "large" → "small"; "thread (finer and richer than any other rank)," → "thread, the rest plain, ONE small phoenix roundel on the back, no large all-over motifs,"; "richer" → "finer"; "" → "very"; "pearl-and-gold drop" → "fine pearl"; "(a little longer than the Hoàng quý phi's)" → ""; "still" → ""; "supple gold-embroidered silk brocade" → "soft light silk, not brocade,"; "her neck long and elegant," → ""; "" → "a slim cloak hanging close and narrow, never bell-wide,"
- m02_t8: "" → "outer"; "richly" → ""; "on the chest, shoulders" → "ONLY in a border band along its edges"; "wide sleeves" → "cuffs"; "large" → "small"; "thread (far denser than any other rank)," → "thread, the rest plain, ONE small phoenix roundel on the back, no large all-over motifs,"; "richer" → "finer"; "" → "very"; "pearl-and-gold drop" → "fine pearl"; "(a little longer than the Hoàng quý phi's)" → ""; "supple gold-embroidered silk brocade" → "soft light silk, not brocade,"; "" → "a slim cloak hanging close and narrow, never bell-wide,"
Fur (Lông 2) words byte-identical _cloak6 → _cloak7: 2/2 (script).

Proof: keep_check --sidecar ×2 PASS (the other 5 ranks unchanged at _cloak6; their sidecars still PASS in --all) · --all 169 PASS · check_store s62/m02 t8 FAIL set = _cloak6 (no new FAIL, no LEN).

## _cloak7 — Hoàng quý phi t7 too (owner Lượt 1499 "Hqp cũng vậy", via C #10 / C #11)
Files: dev/art/dong_hientai/{s62_t7,m02_t7}_DONG_HIENTAI_cloak7.txt + .keep (base _cloak6). Chars s62 9997 · m02 9985.
WHY (picture cloak6_t7_hqp_L1499 + words): "the robe embroidered with phoenixes … on the chest and along the borders" gives big phoenixes over the whole blue cloak; "FABRIC: THICK gold-embroidered BROCADE" makes it heavy; no word on how the cloak falls, so it is bell-wide; the collar's "short pearl-and-gold DROP fringe (a little LONGER than the Quý phi's tassels)" gives a second hanging tier reaching the upper arm.
Changes (scope: cloak cloth, motif size, fall, shoulder-piece size only):
- "the outer robe plain except a border band of small phoenixes, incurved chrysanthemums and auspicious clouds in gold thread along its edges and cuffs, ONE small phoenix roundel on the back, no large motifs".
- Collar: "ONE small single-tier SOFT jewelled cloud collar …"; fringe → "its tiny short pearl edge there only". s62 also drops "close-fitting, never a raised cap," (my cloak6 addition; now the same as m02, needed to fit 10 000).
- FABRIC "soft light silk, not brocade,"; WINTER (before the fur words) "a slim cloak hanging close, never bell-wide,".
- Fur Lông 2, crown, face, pose, inner dress and the HQP LUXURY line are byte-identical.
NOTE for #11 on the t8 _cloak7 (done before your scope message): besides the cloak/collar words, s62_t8 has two length trims, both to my OWN earlier additions: GRACE "her neck long and elegant," (added in cloak5) and "still" in the sleeve line. Without them s62_t8 is 10 003 > 10 000.

### Word diff _cloak6 → _cloak7 (t7)
- s62_t7: "" → "outer"; "embroidered with" → "plain except a border band of small"; "" → "along its edges and cuffs, ONE small phoenix roundel"; "chest and along the borders, a" → "back, no large motifs, ONE small single-tier"; "close-fitting, never a raised cap," → ""; "" → "tiny"; "pearl-and-gold drop fringe (a little longer than the Quý phi's tassels)" → "pearl edge"; "thick gold-embroidered brocade" → "soft light silk, not brocade,"; "" → "a slim cloak hanging close, never bell-wide,"
- m02_t7: "" → "outer"; "embroidered with" → "plain except a border band of small"; "" → "along its edges and cuffs, ONE small phoenix roundel"; "chest and along the borders, a" → "back, no large motifs, ONE small single-tier"; "" → "tiny"; "pearl-and-gold drop fringe (a little longer than the Quý phi's tassels)" → "pearl edge"; "thick gold-embroidered brocade" → "soft light silk, not brocade,"; "" → "a slim cloak hanging close, never bell-wide,"
Fur (Lông 2) words byte-identical _cloak6 → _cloak7 t7: 2/2 (script).

Proof: keep_check --sidecar PASS (s62_t7, m02_t7, s62_t8, m02_t8) · --all 171 PASS · check_store t7 FAIL set = _cloak6 (no new FAIL, no LEN).
