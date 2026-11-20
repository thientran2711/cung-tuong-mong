# WINTER1 — winter fur test, s62 × 8 ranks (worker for Foreman C #2, 20/11 ~18:05Z)
depth: worker (coordinator opens any successor). START_CTX ≈ 15 %; finished at about 40 %, so no rollover needed.

## Result
Sheet (A37): `dev/handover/review-sheets/winter1/s62_dong_coLong_t1-t8.webp` (453 KB). For each rank the new winter picture is big ("Đông · có lông") and her current picture is small ("Hiện tại").
7 gens × 135 = **945 cr**, one try each, no cut-outs (A34). No PNGs in git; the originals are in Magnific.

| rank | winter gen | current (compare) |
|---|---|---|
| t1 Đáp ứng | 1ldmoUCr4r | mEZiZ8ShJQ |
| t2 Thường tại | jUoattyLD0 | 9ZHuqIGNYZ |
| t3 Quý nhân | jUoam4eLD0 | vQARGIUa47 |
| t4 Tần | **not drawn** (see Q1) | SyhIap2Ub8 |
| t5 Phi | Lw8fhqlswO | xSBe8KVjfW |
| t6 Quý phi | 1ldmIAjr4r | 1ldDonjr4r |
| t7 Hoàng quý phi | 8aizA8UIrU | nVsxSZNYQD |
| t8 Hoàng hậu | KLpI8Vqkqp | KLpVBAXkqp |

## Person
s62 has a full t1–t8 a18 set (RANK8-A, 07:31Z, owner OK). Her ROOT season is **đông** (palettes_season_deep.json / s_root_colours.json: ice blue #71B5D7 + mint mist #CDF2E0). Her winter colour pair is therefore the pair she is already drawn in, so no colour swap was needed. (s62 is not in palettes_season.json, which only goes up to s61.)

## Prompts (dev/art/winter1/s62_tN_dong.txt)
- Base = `build_all.py s62 N` (a18) **as it is now**, unchanged.
- ADDED, the same text for every rank, just before "Pose:" (G26):
  `WINTER: soft plain ivory-white fur trim along her collar, the front edges and hem of her outer garment, and her cuffs; the same ivory fur at every rank, no coloured fur, never covering her face or neck.`
- t1–t3 only (G25, foreman message ~17:20Z): the Outfit sentence was replaced by the builder's own a36 Outfit sentence (old crossed collar, pre-G17 words, G21). t4–t8: collar unchanged.
- Gate: t5–t8 STORE + APPROVED PASS. t1–t3: STORE FAIL only on the G25 collar swap (expected); APPROVED (`--scope tpN`) PASS. t4: LEN FAIL (10 193 > 10 000).
- NOTE: the builder has changed since her drawn set (07:31Z). The current builder gives other poses, items and angles (pose dedupe), the slipper-toe tail, the G20 inner embroidery (t7/t8) and the two-layer capes (t6). So the poses and items on the sheet differ from "Hiện tại"; the fur is not the only difference. Her old drawn prompts + fur would fail today's gate (E1 angle table, S19 tail, G23), so they could not be used.

## Look (full size, all 7)
Faces: OK. Mouths closed, no teeth, eyes straight, no forehead marks. Ivory fur is at the collar, the front edges, the hem and the cuffs at every rank, all the same ivory, none coloured. t1–t3 have the crossed collar. Notes:
- t7 and t8: the fur collar stands up around the lower neck (the face is free). The owner should see whether that is too much.
- t6: the hairpin tassels hang beside her ears and may read as ear drops at a glance (not earrings).

## Open questions (for the foreman / owner)
1. **t4 Tần** is not drawn: the builder prompt is 9 990 chars. Options: (B) cut about 200 chars that are not about shape (e.g. trim the PHI BẠCH sentence), then gen 135 cr; or (C) leave it. I chose C by default and asked Foreman C #2.
2. A builder season switch does not exist. G26 is a test rule (the sentence is written in rule G26 only, not in the builder).

## Files
dev/art/winter1/ (8 prompt files) · sheet webp · ledger 8 WINTER-TEST lines · ART_RULES G26 (added).
