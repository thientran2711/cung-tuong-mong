# GENNEW1 — new person in the NEW-COLLAR current outfit (owner Lượt 1402) — for Foreman C #8
depth 8 (limit). START_CTX ~4 % (get_session read 0 → own estimate); ended ~12 %. No rollover needed.

## Person
**m02** (Dịu dàng; face ref BhNCmskoQR approved KC_REFS ok=yes; not s62, not a c-id (A33-safe), not in the 19 t7 đông list). Builder t7 normal 9 643 chars, t8 9 035.

## Prompts
- t7 HQP: `dev/art/thu_comoi/m02_t7_THU_builder.txt` = `build_all.py m02 7` verbatim (new layered collar), 0 edits.
- t8 HH: base `dev/art/thu_comoi/m02_t8_THU_builder.txt` (= `build_all.py m02 8`) → `dev/art/thu_comoi/m02_t8_THU_COMOI_v2.txt` (+ .keep), 9 796 chars. Only the 3 v2 changes (A39):
  1. inserted LAYERED NECKLINE (s62 v2 wording; inner top = her main colour moss green as s62 v2 used her main ice blue; outer = golden yellow) + "the robe" before "richly embroidered".
  2. mantle dropped + cloud collar → v2 HQP-size sentence ("jewelled cloud-collar cape … SAME size and light flat shape as the Hoàng quý phi's … OPEN at the front …").
  3. "colour of the robe, mantle, sleeves and skirt" → "robe, sleeves and skirt".
  NOT taken from s62 v2 (not part of the 3 changes): "and richer embroidery", "slippers visible", "most splendid outfit of all", frontal angle, phoenix hairpin item, caption, INNER LAYER drop. Her own face/colours/item/angle/F2 incurved chrysanthemums kept.
- Word diff, every LOST word: "over it", "long silk mantle from the shoulders to the floor,", "edged with a broad band of gold brocade and pearls" (→ "edged with pearls and gold"), "a wide jewelled gold-and-pearl cloud collar with layered pearl fringes over the shoulders", "mantle," (colour rule). Nothing else.
- keep_check --sidecar: PASS (3 allowed drops).

## Gate (A19/A24)
check_store.py `--scope tp7/tp8 --age a18 --refs BhNCmskoQR,TdwDfOyVNR`: t7 PASS, t8 builder PASS, t8 v2 PASS → FAIL set empty = builder FAIL set (empty).

## Gens (B9: gpt-2-6 1024x2304 seed 7172, no transparentBackground, no cut-out)
simulate_cost 135 each → **270 cr** used (balance before 3 050 115). Refs: image 1 m02 face, image 2 royal-yellow swatch TdwDfOyVNR on BOTH (both builder prompts say "Image 2 is only a colour reference for the royal yellow", t6–t8 rule). Ledger 2 lines.
- t7 HQP: Magnific s7IFfwNl8e → review-sheets/newperson_L1402/m02_t7.jpg
- t8 HH v2: Magnific u5WBDNRQLD → review-sheets/newperson_L1402/m02_t8.jpg
- side-by-side: review-sheets/newperson_L1402/m02_t7_t8_sheet.jpg

## Look notes (both opened full size)
- t7 HQP: square neckline with coral inner top + yellow pearl band, open moss-green outer robe, flat cloud-collar cape open at front — new collar reads clearly. Face soft, eyes open, lips closed, no teeth, forehead clean. Letter held with both hands OK; slippers show. Outer robe looks a bit gauzy/sheer green. Pose nearly frontal (prompt asked ~15° left). Long gold tassels hang from the crown beside the ears — could read as earrings at small size.
- t8 HH v2: NO mantle; cloud collar small and flat with one pearl row (HQP size, a little richer) — much less bulky than s62 L1383; square neckline with moss-green inner top visible. Yellow dominant, coral skirt, green borders = 3 colours OK. Ball held by cord + palm, OK. Face same person as t7, lips closed. Wide sleeves still big and voluminous (the sleeve rank law), shoulders less stiff than s62 v1. Crown pearl strands hang to shoulder level beside the ears (earring-like risk, same as t7). Turn is mild, not a clear 45°.
- No redraw asked/done.

## Commit
see git log (GENNEW1).
