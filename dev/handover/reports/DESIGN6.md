# DESIGN6 — Hán t6/t7/t8 collar + fabric ladder (owner Lượt 1344, Foreman C #6)
depth 6 · START_CTX ≈ 4 % of 1M window (get_session read 0; own estimate) · model Opus · 0 credits, 0 gens, text only. NOT sent to the owner.
Base for A38 + word diff: f626e73 (DESIGN5 v7b). Files: dev/art/seasons4/s62_t{6,7,8}_HAN_BAC.txt (+ .keep). t4/t5 untouched.

## Per file (3 lines each)
**t6 Quý phi (9955 → 9995):**
- FABRIC sentence `The FABRIC is silk BROCADE (gấm) … thicker and richer than the lower ranks' satin … yet still soft and supple, NOT the light gold-woven gauze (sa dệt kim) of the Empress; it hangs in fuller, rounder, heavier folds while still flowing gracefully (thướt tha); …` → `The FABRIC is the LIGHTEST brocade (gấm) of the high ranks: thin, supple Song brocade (Tống cẩm) with a soft MATTE finish … like fine old silk, never glossy … with a woven flower pattern all through the cloth, never stiff, thick or puffed, one step lighter than the gold-woven gauze (sa dệt kim) of the Hoàng quý phi and the Empress; it falls in soft, light folds close to the body, flowing gracefully (thướt tha); the small embroidered motifs are stitched in fine gold thread.`
- S07 line (C #6 decision) `FABRIC: thick gold-embroidered brocade with a graceful, flowing drape.` → `FABRIC: thin light Song brocade with a graceful, flowing drape.`; logged in ART_RULES_CONFLICTS 18 (t6 too).
- check_store tp6: M07+S12 (old) + S07+B12 (new, expected, conflict 18). Cloud collar, layers, everything else unchanged.

**t7 Hoàng quý phi (9949 → 9988):**
- `richer than the Quý phi's brocade:` → `one step richer than the Quý phi's brocade, yet still light, never heavy:`
- sa dệt kim + Tống cẩm text kept word for word; nothing cut.
- check_store tp7: S07+B12 only (unchanged).

**t8 Hoàng hậu (9991 → 9999):**
- Collar: `a wide jewelled gold-brocade and pearl cloud collar with layered pearl fringes, set LOW on the OUTER shoulders and upper arms,` → `a jewelled gold-brocade and pearl cloud collar with layered pearl fringes, set LOW and sloping DOWN over the OUTER shoulders and upper arms, its points hanging downward, never spreading sideways,` ("wide" dropped: it drove the sideways spread). Fabric: `FABRIC the richest of all:` → `FABRIC the richest of all, yet still light:` (the existing "DENSER … than the Hoàng quý phi's" = one step richer).
- Length cuts (boilerplate dups, allow lines): `; a kind, caring, gentle-hearted girl` (Expression "TENDER, kind, caring look" kept), `, eyes fully open, never a stretched grin` (eyes-open + "never a grin" kept elsewhere). Gate-trialled: no new FAIL.
- check_store tp8: S07+B12 only (unchanged). Jewellery, pearl fringes, deep V, nothing at throat all kept.

## Lost words (Counter diff f626e73 → new)
- t6: and, not, silk, thicker, richer, lower, ranks', satin, yet, still×2, hangs, fuller, rounder, heavier, while, gold-embroidered ("thick" moved: lost in S07, gained in "never stiff, thick or puffed").
- t7: none.
- t8: a×2, on, eyes, fully, open, grin, wide, kind, caring, gentle-hearted, girl, stretched.

## Checks
- `python3 dev/art/keep_check.py --all` → 24 sidecars PASS (allow lines added to t6/t8 .keep with "owner Lượt 1344 … DESIGN6").
- All three files ≤ 10 000 chars. Before Magnific: the S07/B12 Hán exemption (conflict 18) is still needed, now for t6 + t7 + t8.

## Handover
Done. Nothing left. No successor needed.
