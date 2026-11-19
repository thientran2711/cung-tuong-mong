# NDX3 — Nữ đế set B (m01–m52) — STOPPED BEFORE ANY GEN (19/11)
depth 3 · START_CTX ≈ 6 % (est.; get_session used_tokens read 0) · 0 gens · 0 credits

## Done
- Builder test: `build.py m01 v0 --state nude --spec5pose --nudeopt auto --nostyle --age aXX` runs for m-people (exit 0), but the face slot is EMPTY ("Her face: .") — m-people have no DATA face.
- `dev/art/nude-B/mk.py mNN` = that output + ONLY (1) face slot ← her v3 face words verbatim (KC_REFS.json, asserted present in mNN.v3.FULL.txt), (2) "Image 3" → "Image 2" (one-ref renumber as store-all/build_all.py l.98). Refs: image 1 = set-B cut (m01 hu2qEwOvqL), image 2 = swatch TdwDfOyVNR.
- m01 prompts: dev/art/nude-B/prompts/m01_a18..a65.txt (opt A; items lantern / poetry book / incense box / sutra book / almanac — no repeat; forehead tail = approved D9 sentence verbatim; crowns r11 unchanged).
- kc_ref.py --check PASS (no banned ref).

## BLOCKER (why no gen)
`check_store.py <prompt> --scope nude` = **APPROVED CHECK FAIL** on the 18/11-approved Nữ đế prompt (all ages):
- S07 MISSING "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape." (Lượt 364, B12)
- S17 MISSING hands tail "Her hands interact naturally with the item …" (D3d 18/11)
- X05 BANNED stole/sash in the Pose at Nữ đế (Lượt 486) — the 18/11 pose says "holding the edge of her long sheer silk stole"
- S04 REWRITTEN (96 %): "flowers, clouds and dragons" vs gate "flowers, birds and {motif}"
The gate's nude scope was built on `--nude3` (store HH t8 + Nữ đế sentences): `build.py m01 v0 --nude3 --nostyle` → PASS. But --nude3 is the NDX1/NDX2 prompt the owner REJECTED in K16 ("prompt differs from the 18/11 approved").
So brief (K16: use the 18/11 prompt) and gate (FAIL = do not generate) contradict. Not ours to choose (A18). Question for ROOT-50/owner:
  (a) 18/11 prompt as is, gate waived for Nữ đế set B; or
  (b) 18/11 prompt + the later owner sentences S07/S17, stole removed from pose (X05), S04 wording; or
  (c) something else.
