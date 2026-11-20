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
