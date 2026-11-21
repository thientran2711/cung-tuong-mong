# HHCOL1 — Hoàng hậu t8 stiff shoulder piece + winter red/bell (owner L1840, via Foreman C #24)
depth 6 · START_CTX ≈ 4 % · gens used by me: 0 (VE4 asked to draw 2 @55)

## Files (commit c44eeab)
- THU: dev/art/thu_comoi/s62_t8_THU_cauvai_L1840.txt (+ .keep, base fix7_L1794) — 9994 chars
- ĐÔNG: dev/art/winter1/s62_t8_dong_L1840.txt (+ .keep, base dong_L1825) — 9970 chars
- Gates on both: check_store --scope tp8 --age a22 PASS · keep_check PASS · no waivers needed (bases had none).

## (A) Shoulder piece (both files), only these words changed (A47: hair/pose/angle/held item untouched)
- old thu: "a gold-and-pearl cloud collar set with jade lying FLAT and close on the shoulders"
- old winter: "a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders"
- new (both): "a STIFF, firm cloud-shaped shoulder piece of gold, pearl and jade (never soft), flat or gently curved on the shoulders, with layered pearl fringes [hanging straight down]"

## (B) Winter MBJnka0DCm — why
- BELL skirt: the winter prompt still had "over it a long ceremonial silk mantle falling from the shoulders to the floor, edged with a broad band of gold brocade and pearls" — a floor-length mantle from the shoulders = cone/bell silhouette (thu already had "NO cloak, NO cape, NO mantle"; winter never got it). Also "the DOMINANT colour of the robe, mantle, …".
  → removed the mantle; added "NO cloak, NO cape, NO mantle;"; "robe, mantle, sleeves" → "robe, sleeves"; "slim tall silhouette" → "slim tall silhouette, the skirt STRAIGHT, never bell-shaped or flared".
- RED gems: winter had the word "jewelled" on the collar (= coloured stones on clothing) and was MISSING the A46 t7/t8 JEWELLERY sentence that thu has. Crown "rubies and pearls" is legal (L1799) and kept.
  → "jewelled" removed with the collar; added verbatim A46: "JEWELLERY: only jade, pearls and gold, Chinese court style; red gems ONLY on the crown, NEVER on the robe, cape, collar, belt or pendants; NO sapphires, NO faceted or sparkling gems, nothing European."
  Possible residual (not changed, A47 held item): "gold lidded jewel casket" + HELD ITEM COLOUR contrast rule may still pull red stones onto the casket.
- Fur Lông 3 (W03) kept verbatim (approved check PASS); no cloak, no phi bạch.
- Trim for 10 000: dropped the outfit's duplicate "only slipper toe tips peeking under the hem" (the S19 tail keeps it). Listed in .keep.

## Draw
Sent to VE4 session_01D3E3Nb1srT6UkWvWCT4QHG: 2 × 55 cr (gpt-2-6 1k low 9:16 seed 7172, refs nVsrRMPYQD + TdwDfOyVNR), sheet old vs new (nVs3EAqYQD | thu new; MBJnka0DCm | winter new); VE4 reports ids to Foreman C #24.

## Note
Local branch ref in this container was stale (dc910d7, diverged); reset to origin before work, stale ref kept as local branch backup-stale-dc910d7 (not pushed).

## Result (VE4, 9bacaef, 110 cr)
THU cauvai 8aiDOoYIrU · ĐÔNG 79fL875JAL · sheet dev/handover/review-sheets/hh_t8_thu_dong_L1840.png.
VE4: stiff cloud shoulder piece OK on both; red only on crown (+ casket on ĐÔNG, held item, untouched per A47). Faults: outer robe still flares at the hem on both; ĐÔNG fur a bit less plush. No further fix made (needs owner word, A18/A20).

## HANDOVER (stop, per #24 07:56Z)
depth 6 · START_CTX ≈ 4 %, now well under +25 %. State: L1840 prompts done + drawn; waiting on owner verdict for 8aiDOoYIrU / 79fL875JAL.
Open for a successor (only on owner word): (1) outer robe hem still flares on both — likely "thick gold-embroidered brocade" + winter Lông 3 hem fur; a fix would need owner-approved wording (fur W03 is approved verbatim, do not edit it); (2) red stones on the winter held casket ("gold lidded jewel casket") — held-item words, A47, needs owner yes.
Bases for any next step: dev/art/thu_comoi/s62_t8_THU_cauvai_L1840.txt, dev/art/winter1/s62_t8_dong_L1840.txt (both PASS check_store tp8 a22 + keep_check).

## JOB 2 — owner L1855 (reopened by #24 08:00Z): back to VÂN KIÊN, copy the original collar words exactly + square neck
Source copied from: dev/art/rank8-s62/s62_t8.txt = the ORIGINAL t8 prompt (store build_all s62 8, ledger 20/11 07:38Z RANK8; t8 approved by owner 18/11 ~22:00Z "hoàng hậu và hoàng quý phi tao đã duyệt ok hết rồi"). Its collar words, verbatim: "a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders".
- THU dev/art/thu_comoi/s62_t8_THU_vankien_L1855.txt (base cauvai_L1840, 9897 ch): stiff shoulder piece → the verbatim collar words; square neck sentence already there (kept); "belt with long tassels and jade pendants" → "belt with long tassels" (G57).
- ĐÔNG dev/art/winter1/s62_t8_dong_L1855.txt (base dong_L1840, 9991 ch): same collar words + added the thu square-neck words "a straight SQUARE collar (no crossed collar): a LOW open square neckline across the upper chest, neck and collarbones bare, NEVER a high stand collar or mandarin collar, framed by a wide flat band in her second colour"; G57 pendant cut; L1840 fixes kept (no mantle, skirt STRAIGHT, A46 jewellery sentence); fur Lông 3 verbatim. Trim: duplicate "Full-body standing figure head to feet, centered, plain light parchment background, soft even light;".
- Gates: check_store tp8 a22 PASS + keep_check PASS on both. Commit 9cd5fdf.
- Risk: the verbatim words contain "jewelled" (the L1840 red-on-clothing cause); now the A46 sentence "red gems ONLY on the crown" sits beside it in both.
- Draw: VE4 blocked (needs approval for maid gens) → sent to VE6 session_01D3E3NavF2AADAvmzPDhZC5, 2×55 cr, same settings; VE6 reports ids to #24.

## HANDOVER 2 (idle, per #25 08:05Z)
depth 6 · coordinator now Foreman C #25 session_01D3E3NYNncNzWuep6yvbxRe (#24 stopped). L1855 prompts done (9cd5fdf). Drawing: sent to VE6 session_01D3E3NavF2AADAvmzPDhZC5; #25 moved it to VE9 session_01D3E3NY6tdajnq7tHvQhexg unless VE6 already started — #25 to check for a double draw. Open: owner verdict on L1855 pair; "jewelled" in the original verbatim collar words may bring back red on clothing.

## JOB 3 — owner L1887 (via #25): xuân QP L1848 collar (eIPc7xcdqL) onto HQP t7 + HH t8
Source words verbatim from dev/art/seasons4/s62_t6_XUAN_vankien2_L1848.txt (colour slots ice blue→light olive, mint mist→lilac): "a LAYERED NECKLINE: a lilac inner top with a low straight SQUARE neckline edged by a pearl-edged gold band, under the OPEN outer robe, its front edges (slim, pearl-edged) falling from both shoulders, neck and collarbones visible; an embroidered light olive TWO-TIER cloud collar (vân kiên hai tầng) of soft silk, like the Phi's scalloped vân kiên but two tiers, fitted close, never puffing out, small gold tassels (tua rua) hanging from it, pearl-edged, never hiding the neck," (source's "gold-and-jade necklace" NOT copied, G57).
Bases per #25 (no xuân t7/t8 ever drawn → current THU designs): t7 thu_comoi/s62_t7_THU_fix5_L1794.txt (pic nVs3E2HYQD) → thu_comoi/s62_t7_THU_vankien2_L1887.txt (9688 ch): replaced the SQUARE collar sentence + "soft gold-and-jade cloud-collar cape … tassels …"; "robe, cape and sleeves" → "robe, sleeves and cloud collar". t8 thu_comoi/s62_t8_THU_vankien_L1855.txt (pic 6AbJ5aqiJO) → thu_comoi/s62_t8_THU_vankien2_L1887.txt (9904 ch): replaced the wide jewelled cloud collar + SQUARE collar sentence; NO cloak/cape/mantle kept. Chest pearl strands kept.
Gates: check_store tp7/tp8 a22 PASS, keep_check PASS. Commit df0b5b9. Sent to VE8 session_01D3E3NYVRxTbf6aKEL79LCo 2×55.

## JOB 3b — L1887 correction (via #25): tua rua = pearl net
thu_comoi/s62_t7_THU_vankien2_L1887b.txt / s62_t8_THU_vankien2_L1887b.txt (f0d2334): "small gold tassels (tua rua) hanging from it" → "a pearl net (tua rua) of small pearls and jade beads over the collar, richer than the Quý phi's [t8: the richest of all], a pearl fringe below, never silk tassels" (T1QP1 words from thu_comoi/s62_t6_THU_vankien2_L1887.txt). Gates PASS. VE8 told to draw L1887b (instead, or in addition if L1887 already drawn).

## JOB 3c — L1887c (go from #25 08:35Z, option 1 only)
VE8 drew the TASSEL L1887 pair: t7 xSBqfnXjfW, t8 SyhrHMVUb8 (sheet thu_t7_t8_vankien2_L1887.png): neckline OK; collar reads one tier; t8 jade disc (pendant look) + red on collar.
Fix: t8 thu_comoi/s62_t8_THU_vankien2_L1887c.txt (fe606a3): "many long strands of pearls and jade across the chest" → "many long strands of pearls only across the chest". t7 needs none (already pearls only) → t7 L1887b stays. No tier words added (#25: copy eIPc7xcdqL y chang). Gates PASS. VE8 told: draw t7 L1887b + t8 L1887c, report to Foreman C #26 session_01D3E3NXDFbJUswJKxtfWLwX.
Open: red on t8 collar (crown 'a few smooth red gems' bleed) — not changed.

## JOB 4 — owner L1901 (via #25, report #26): WHOLE vân kiên like eIPc7xcdqL
Looked at eIPc7xcdqL (creations_read medium): short upright band round the back/sides of the neck, two tiers of large rounded cloud lobes spreading out to/over the shoulder points, gold-edged, flower-embroidered, front cut away square showing the inner square neckline.
Change (collar words only): "of soft silk, like the Phi's scalloped vân kiên but two tiers, fitted close, never puffing out," → "a WHOLE vân kiên circling the neck (a short upright band at the back), spreading OUT over the shoulders in rounded cloud lobes, upper tier smaller, its front CUT AWAY …, [t7] a little LONGER and STIFF, standing slightly OUT past the shoulders, never hugging them, / [t8] LONGER and STIFFER, standing clearly OUT past the shoulders, never hugging them,". t8 also: "NO cloak, NO cape, NO mantle: never a bell or flared cone shape at the neck and shoulders," → "NO cloak, NO cape, NO mantle," (contradicted 'out past the shoulders'). Pearl net + chest pearls only kept.
Trims (boilerplate, in .keep): t7 'slim,'; t8 'slim,', 'the most splendid outfit of all, clearly grander than every other rank.', 'Everyone beautiful at every age.'
Files (60963e2): thu_comoi/s62_t7_THU_vankien2_L1901.txt (old O6ElrJ3ynm), thu_comoi/s62_t8_THU_vankien2_L1901.txt (old 3zKyU3rREY). Gates PASS (t8 9998 ch). Sent to VE8 2×55.

## JOB 5 — owner L1903 + L1904 (via #25, report #26)
Collar crop ref (L1904): Magnific images_crop of eIPc7xcdqL (752x1344) x205 y225 340x255 → kseQCFw16B (collar from chin to mid-chest, shoulder to shoulder; includes the old jade necklace → prompt says 'no necklace').
L1903 (from L1901): pearl net → t7 "the vân kiên embroidered with gold-thread phoenixes, only tiny short drops along its scalloped edge (no net, no tassels), the Quý phi's design made richer," / t8 "…with a gold-thread dragon and phoenixes, … made richest,"; dropped 'pearl-edged, never hiding the neck' (pearl edge = jewellery look; collar now wraps the neck) and 'upper tier smaller' (shape carried by image 3); added "Collar SHAPE exactly as in image 3 (colours per this prompt; no necklace)."; caption shortened → '… · vân kiên L1903'.
Files (d9521a9): thu_comoi/s62_t7_THU_vankien2_L1903.txt (9958), thu_comoi/s62_t8_THU_vankien2_L1903.txt (9991). Gates PASS. VE8: 2×55 with refs nVsrRMPYQD, TdwDfOyVNR, kseQCFw16B.
t6 QP: to match (one design QP→HQP→HH) thu_comoi/s62_t6_THU_vankien2_L1887.txt still has the pearl net → needs the same change (not done by me, T1QP1's file).

## JOB 6 — t6 QP L1903 (go from #26)
Base thu_comoi/s62_t6_THU_vankien2_L1893.txt (eIPcGThdqL) → thu_comoi/s62_t6_THU_vankien2_L1903.txt (9997 ch): flat-like-Phi + pearl nets words → "a WHOLE vân kiên circling the neck (short upright band at back), spreading OUT over the shoulders in rounded cloud lobes, its front CUT AWAY, neckline open, with gold-thread camellia embroidery, only tiny short drops along its scalloped edge (no net, no tassels)"; image-3 line added; caption → vân kiên L1903. Camellias, not phoenix: the t6 prompt keeps the rank law 'No phoenix anywhere on the robe'. Gates PASS. VE8 1×55 refs nVsrRMPYQD, TdwDfOyVNR, kseQCFw16B.
