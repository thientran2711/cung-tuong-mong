# RANK8-C — s65 (Đoan trang, jade + peach cream) — PREP ONLY, 0 cr (ROOT-68 HOLD)
depth 3 · START_CTX ≈ 4 % (context_usage read 0; own estimate) · worker for Foreman C ROOT-68 (session_01PEhRbv5MJBsBwzuyDQxpDD)

## 1. No rank pictures for s65 (checked)
- gen_ledger.jsonl: s65 appears only in NEWFACE-F4 (face gen jUoeq99LD0 → cut jUoe5yJLD0), ROOM-COMPOSITE and OWNER-OK (Lượt 1046). No rank gen.
- No s-id has ever been rank-built: build_all.py PEOPLE = c01–c32, m01–m52, p01–p03; the store build.py has no s65 row (`build.py s65 v0 --low 1` → KeyError 's65'); KC_REFS.json has no s65 entry (B8 refuses).

## 2. Unblock = DATA ROWS ONLY (patch NOT applied; needs ROOT-68 OK)
`dev/art/rank8-s65/s65_store_rows.patch` (`git apply --check` clean), modelled on the princess N8b data rows:
- t8-prompt-B/build.py: `S_NEW_ROWS={"s65":("chrysanthemums",)}` loop after PRINCESS_ROWS. Palette/hex = face-common/s_root_colours.json (jade #4EA989 / peach cream #FBDAC1). Motif = from her approved face outfit (chrysanthemum roundels). Hair flower = maid rule MAID_FLOWER[65%6] = a camellia. ITEMS_LOW = items3f. OUTFIT_JOBS t4–t6 = _g3 outfit (same as maids/princesses). SPEC5_IDS = maid index rule → thamvong list, slot 11. KC_ID regex + `s\d\d`. No store sentence touched.
- store-all/build_all.py: `PEOPLE+=["s65"]` appended LAST, so everyone else's plan is unchanged (verified: m04 t3, m52 t8, p02 t5 byte-identical before/after).
- KC_REFS.json: s65 entry, m09_ok yes, ref_id jUoe5yJLD0 (FACE_MAP s65.cut), face_words = "Her face: …" + "Expression: …" VERBATIM from s65.v5.FULL.txt.
- RANK8-A (s62) and RANK8-B (s64) are blocked the same way: add "s62"/"s64" to S_NEW_ROWS + PEOPLE + KC_REFS with the same method. One coordinated commit avoids a 3-way conflict in build.py.

## 3. 8 prompts built + gated (with the patch applied in the working tree)
dev/art/rank8-s65/s65_t1..t8.txt = `build_all.py s65 N` output. check_store: STORE CHECK PASS (approved_check PASS) t1–t8; build_all.check() 0 errors t1–t8. Image 1 = jUoe5yJLD0. Jade #4EA989 + peach cream at every rank. "Bare earlobes, no earrings" (F15). No fruit (F16).
Poses/items: t1 swallow kite · t2 pipa · t3 painted scroll · t4 jade butterfly hairpin · t5 gilded silver flower basket · t6 pearl-silk poetry book · t7 songbird on finger + tú cầu · t8 gold phoenix seal box.

## 4. Faults (notes only, nothing changed — A18)
1. **t7 songbird = a pet at HQP t7** (brief: no pets for HQP t7 / HH t8). This is builder-wide and pre-existing: plan() also gives c02 t8 and c13 t7 a songbird pose. The gate does not catch it. Needs a builder ban (`_banned` t≥7 bird/pet) — foreman call.
2. Đoan trang ("never playful") gets lively t1–t3 poses (curious kite lean, mid-step) and t5 "just finished a small twirl". The builder trait comes from the maid index rule (thamvong), not her look group. Option: map s65 to a calm list (hienlanh/thanhnha).
3. t4 store adaptation text reads "held in the hand in both hands" (grammar, store SPEC5_ADAPT).

## 5. Cost
~138 cr/picture × 8 = **≈1 104 cr**. Balance now 84 462 cr → ≈83 358 after (> 60 000 stop line). Used so far: 0 cr, 0 gens.

## 6. Waiting for ROOT-68 GO (apply the patch? fix fault 1 first?). No gens until then.
