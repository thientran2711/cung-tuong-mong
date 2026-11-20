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

## Job 2 — "gọn" flat rank signatures (owner Lượt 1356/1359 via Foreman C #6)
New files `dev/art/seasons4/s62_t{4..8}_HAN_BAC_gon.txt` (+ .keep); old files untouched. New A38 bases = current files frozen as `han_bac_base/s62_t{4..8}_HAN_BAC_a2128fc.txt`. Only the signature clauses changed (+ captions naming a cape, + length trims).
- **t4 Tần (cd0ba20, 9827):** capelet + beaded yoke → slim flat pearl-net band sewn along the outer collar band, tiny flat pearl fringe; "never an extra layer, never a capelet, never beyond the shoulder line, nothing puffed or flared". CAPELET CUT (S13, already FAIL) → "COLLAR CUT (flowing): the collar lines are soft CURVES, never flat;" + wrap/belt/soft V kept. Caption → "cổ ba lớp viền lưới ngọc trai". Gate M07+S12+S13 = old.
- **t5 Phi (9995):** two shoulder capes → TWO layered embroidered plum satin collar bands sewn flat along the collar (upper narrower), gold peonies, sewn-on pearl edges, ONE short row of tiny pearl drops, flat pearl/jade net over the bands ("same … as the Tần's collar band"); "no capes, no extra layer, nothing beyond the shoulders or puffed". Caption → "+ viền cổ hai lớp". Gate M07+S12 = old.
- **t6 Quý phi (9995):** yunjian → "a SMALL, FLAT four-lobed embroidered brocade cloud collar (yunjian) sewn flat over the shoulders, WITHIN their width", scalloped gold edge + small gold tassels, "a few small jade and pearl drops", "no extra layer, nothing beyond the shoulders or puffed"; "set LOW on the OUTER shoulders and upper arms" gone. Cuts: 2 expression dups (kind/caring girl; eyes open/never a stretched grin). Gate B12+M07+S07+S12 = old.
- **t7 HQP (9986):** cloud-collar cape → "a FLAT jewelled gold-thread brocade cloud collar edged with pearls and gold, lying flat and sloping DOWN over the shoulders, with a short pearl fringe, no cape or extra layer, nothing beyond the shoulders or puffed"; "never covered by the collar". S14 LUXURY sentence ("trims along the cape edges") kept verbatim (gate). Caption "+ choàng vân kiên ngọc" → "+ vân kiên ngọc". Cuts: same 2 expression dups; conflict-18 FABRIC line → "FABRIC: light gold-woven gauze over thin Song brocade, flowing softly." Gate B12+S07 = old.
- **t8 HH (9997):** → "a jewelled royal-yellow gold-brocade and pearl cloud collar, denser in gold and pearls than the Hoàng quý phi's, with a short pearl fringe, lying flat and sloping DOWN over the shoulders, its points hanging downward, never sideways or beyond the shoulders, no extra layer". Cuts: "the Hoàng quý phi's four" ("EXACTLY FOUR … (never a fifth)" kept), "(medium depth, 18K gold tone)" (hex + "same 18K tone" kept), FABRIC line shortened as t7. Gate B12+S07 = old.
- **Lost words (Counter, old file → _gon):** t4 capelet/yoke/petal words (see C #6 msg); t5 capes×2 cape×4 shoulder shorter longer fringe dangling capelet set/low/upper/outer arms cut deep choàng vai + small words; t6 low set upper outer arms dangling + expression dups (eyes fully open grin stretched kind caring gentle-hearted girl); t7 cloud-collar cape choàng low set upper outer arms + same expression dups + drape supple graceful; t8 layered fringes spreading low set upper outer arms four + medium depth 18k tone + drape supple graceful.
- keep_check --all: 33 PASS.
