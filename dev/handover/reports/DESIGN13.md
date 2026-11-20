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
