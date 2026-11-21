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
