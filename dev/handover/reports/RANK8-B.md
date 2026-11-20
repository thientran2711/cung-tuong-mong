# RANK8-B — s64 (Dịu dàng, peony pink + smoke lilac) — 8 ranks t1–t8 DONE
STATUS: depth 3 · START_CTX ~3 % · worker for ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD) · brief dev/handover/briefs/rank8-L1078.md

## Result
Sheet: **dev/handover/review-sheets/rank8/s64_rank8_sheet.jpg** (8 figures, big labels ON image: rank · s64 · Dịu dàng · place). Prompts: dev/handover/review-sheets/rank8/s64/s64_t1..t8.txt.
- No s64 rank pictures existed before (ledger/FACE_MAP/urls.json checked).
- Builder: `python3 dev/art/store-all/build_all.py s64 N` (store rows by RANK8-C c51c37e / merge fbb5797). No prompt hand-typed, no wording changed.
- Gate: check_store.py with store args (`s64 v0 --low N` / `--t7` / none) → STORE CHECK PASS + approved_check PASS for all 8.
- Gens (gpt-2-6, 1024x2304 2k, seed 7172, folder ba4aecfe, 1 try each, 135 cr each = **1 080 cr**; balance before 84 462):
  t1 mEZiZnFhJQ · t2 YMljgXcWeC · t3 mEZi2GEhJQ · t4 Xm9y6fCBfo · t5 kseMXeX16B · t6 YMljUpGWeC · t7 fHz2WGSCDY · t8 P3QCbZT42C.
  Refs: image 1 = s64 cut JNChlRROq4; t6–t8 image 2 = royal swatch TdwDfOyVNR. Ledger: 8 lines kind RANK8-S64. No remove_bg yet (parchment bg).
- Colours: root pair peony pink #F8B3D3 + smoke lilac #ECE2FE at every rank (+ royal yellow t6–t8). FRUITPET1 season pairs not pushed at build time → not used.

## Looked at full size — faults (notes only, NO redraw)
1. t4, t6, t7: gold hairpin dangles hang right beside the ear — may read as earrings (F15). Not clear earrings; owner to judge.
2. t3: a live butterfly sits on her raised finger (builder pose "gazing at a small butterfly"); not a pet, but a creature in contact.
3. Item/pose: t1 book, t2 butterfly hairpin, t3 flute, t4 jade vase w/ blossoms, t5 tú cầu, t6 perfume flask, t7 gold flower basket (no pet ✓), t8 gold phoenix jewel casket. No fruit ✓, mouths closed/no teeth ✓, face consistent across ranks ✓, hair loose t1–t3 / up t4+ ✓, flower t1–t6 only ✓.
4. Places on labels are my reading of L2 (t1–t3 phối shared, t4–t6 own chính điện, t7 HQP palace, t8 Khôn Ninh); palace names per person not assigned.

## Angle audit (ROOT-68, owner "không ai đứng nghiêng bên trái") — commit 64b798f, 0 cr
Builder picks were balanced (24 prompts: slight-L 5, slight-R 5, 3/4-L 5, 3/4-R 3, frontal 6; 14/14 used), but pictures turned one way (s64+s65: ~10 to the picture's left, ~6 frontal, 0 to the picture's right). Cause: ANG14 LEFT/RIGHT had no frame; idx 2/9 self-contradictory. Fix: every ANG14 sentence now names the PICTURE side + which picture-side shoulder is nearer; same classes → plans unchanged; check_store PASS. Old drawn prompts now fail E1 (old words) — expected, next gens only.

## Cổ vuông test (owner via ROOT-68) — 2 gens, 270 cr
t1 TdwgAm8VNR (style 1 simple square, narrow plain lilac band) · t2 KLpVEomkqp (style 2 wide shallow square, 2-layer border). Prompts = current builder (new ANG14) + RANK8-A neckline words; gate --scope tp1/tp2 PASS. Sheet dev/handover/review-sheets/rank8/s64_test_co_vuong.jpg (t1 NEW | t2 NEW | t3 existing). Look: both square, open, never round/V; t1 and t2 clearly different from each other and from t3. Angle: t1 (new "toward the RIGHT side of the picture") still reads near-frontal / slightly to the picture's left → the angle fix is NOT proven by this one picture.
Credits total RANK8-B: 1 080 + 270 = 1 350.
