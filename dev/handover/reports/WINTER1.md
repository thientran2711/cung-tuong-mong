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
| t4 Tần | cpSPN2P0eP (no ANGLE sentence, see end) | SyhIap2Ub8 |
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

## t4 option B — trim study (Foreman C #2 asked ~15:32Z: prepare, do NOT fire)
Need to remove ≥ 194 chars from `dev/art/winter1/s62_t4_dong.txt` (10 193). Every trim was tested with check_store (store + approved):
- PHI BẠCH trim (drop "(her secondary colour, …ice blue)" + "— the robe, sleeves and arms are clearly visible … band of colour;") → 9 972 chars but **FAIL S12** (approved sentence). Not usable.
- Removing any one whole sentence ≥ 194 chars: every one FAILs (store sentence missing, or approved S01/S11/S12/S13) **except the whole ANGLE sentence** (407 chars → 9 786, gate PASS). That would drop her ¾-left turn, so the pose would change. Not recommended.
- ANGLE kept, only its last clause dropped ("her head turns together with her shoulders and body, never back-turned, never in profile.", a repeat of the HEAD AND BODY sentence) → 10 103, still LEN FAIL. Cutting more of the ANGLE words → **FAIL E1** (angle table).
**Conclusion:** no trim passes the gate while keeping the t4 design and pose. Real options: (a) Foreman C shortens the t4 store/builder text (a builder change, owner OK needed); (b) the owner accepts dropping the ANGLE sentence for the test; (c) t4 waits. Nothing fired.

## t4 DONE (Foreman C #2 go (b), owner YES "Sếp cho em cắt bớt một câu phụ trong đề vẽ Tần", ~15:39Z)
Prompt `dev/art/winter1/s62_t4_dong_noangle.txt` = s62_t4_dong.txt minus the whole ANGLE sentence (9 786 chars), STORE + APPROVED PASS. Builder untouched.
Gen **cpSPN2P0eP** (135 cr, one try). Look: square neckline + pearl-net capelet kept; ivory fur at capelet edge/collar, front edges, hem and cuffs; face OK (closed mouth, eyes straight). She stands almost frontal (no angle sentence). The sheet's t4 cell is filled ("Đông · có lông · không câu góc nghiêng").
**Total WINTER1: 8 gens × 135 = 1 080 cr.**

## Fur v2 — wider (owner ~15:45Z relay: "chưa đủ ấm áp … không muốn dày cui lên, muốn nó to hơn xíu nữa … phong cách đã giống ý tao rồi")
G26 updated (still TEST) to the v2 sentence, which is the same for every rank (343 chars, was 202):
`WINTER: a WIDE band of soft plain ivory-white fur trim, about a hand's width, along her collar, the front edges and hem of her outer garment, and her cuffs, visibly warm and cosy, yet lying smooth and close, never puffy or bulky; the same ivory fur at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.`
Test: s62 t4 = noangle prompt with only the fur sentence swapped → `dev/art/winter1/s62_t4_dong_fur2.txt` (9 927 chars, STORE + APPROVED PASS). Neckline untouched.
Gen **VX7Nn0OMMU** (135 cr). Look: the fur band is clearly wider (about twice v1) along the collar, front edges, hem and cuffs, smooth and not puffy; the square neckline and capelet are kept; face OK. The collar fur sits around the lower neck/throat but the face is free.
Sheet: `dev/handover/review-sheets/winter1/s62_t4_dong_long2.webp` (new v2 big · v1 cpSPN2P0eP · current).
Length note for the rollout: v2 adds 141 chars more than v1. The s62 builder prompts + v2 fit ≤10 000 at every rank except t4 (which needs the ANGLE sentence cut).
**WINTER1 total: 9 gens = 1 215 cr.**

## Fur v3 — 3-step width ladder + Tần crossed collar (owner ~19:00Z: "Cho viền lông mới cho 3 bậc thấp, 3 bậc tiếp theo to hơn, gửi mẫu 1 hình tần. Hoàng quý phi và hoàng hậu to hơn nữa")
G26 set to the ladder (TEST). The colour is plain ivory for everyone; only the width changes:
- t1–t3: "WINTER: a WIDE band … about a hand's width …" (345 chars)
- t4–t6: "WINTER: a WIDER band … about one and a half hands wide …" (357)
- t7–t8: "WINTER: the WIDEST band … about two hands wide, rich and full …" (364)
(full text in rule G26; each one ends "… yet lying smooth and close, never puffy or bulky; the same plain ivory at every rank, no coloured fur, never covering her face or neck, the neckline keeps its shape.")
Sample s62 t4 → `dev/art/winter1/s62_t4_dong_fur3.txt` (9 887 chars, gate PASS): noangle prompt + t4–t6 fur + **pre-G22 collar** (the builder is not reverted yet, so the old words come from her drawn `dev/art/rank8-s62/s62_t4.txt`: "…borders of plum blossoms at collar, sleeves and hem, … a crossed collar,"; the G22 "few LARGE embroidered plum blossoms" kept, since only the neckline was reverted).
Gen **hu20QqTvqL** (135 cr). Look: crossed collar OK; the fur is clearly wider than v2, smooth and not puffy; the collar fur wraps the base of the neck (face free); face OK.
Sheet `dev/handover/review-sheets/winter1/s62_t4_dong_long3.webp` (new big · v2 VX7Nn0OMMU small).
**WINTER1 total: 10 gens = 1 350 cr.**

## Ladder confirmed (owner ~19:15Z: "Cho bản lông trước đó cho 3 bậc dưới, lông mới này cho, phi, quý phi, tần. Còn hqp và hh thì to hơn rõ, để thể hiện sự sang trọng hơn người khác")
G26 updated (TEST): t1–t3 = v2 width (VX7Nn0OMMU), t4–t6 = v3 (hu20QqTvqL), t7–t8 strengthened to "the WIDEST, most luxurious band of thick soft plain ivory-white fur trim, clearly wider than at any lower rank, about two and a half hands wide, … rich, warm and cosy, yet lying smooth and close, never puffy or bulky; …" (408 chars; s62 t7/t8 builder prompts 9 142 / 9 311, so both still fit ≤10 000). No gens; Foreman C #3 asks the owner before a t7/t8 sample.

## [SUPERSEDED — owner rejected thick/padded ~19:24Z, see next section] G28 winter fabric + G26 fur — first wording (Foreman C #3 ~16:04Z; NO gens)
Maker `dev/art/winter1/make_winter.py <person> [--gate]`. It does not change the builder; it starts from build_all output and applies G25 (t1–t3 crossed collar), pre-G22 t4 collar (while the builder still has the square neck), the G28 fabric swaps, the G26 ladder fur, and drops ANGLE when the prompt is over 10 000. It asserts that no sheer/translucent/gauze/chiffon/organza word is left (except the three negative phrases "no sheer floating scarf…", "never thin sheer silk or gauze", "never sheer or see-through"). Output for s62: `dev/art/winter1/g28/s62_tN_dong.txt`.
G28 swaps (old → new):
1. "The FABRIC is thin, light, flowing silk and gauze with a soft sheen … (thướt tha);" → "The FABRIC is thick, warm, OPAQUE winter cloth (padded silk and soft brocade with a gentle quilted look), never thin sheer silk or gauze, with a soft sheen and fine delicate embroidery, long soft graceful drapery that still sways and trails elegantly (thướt tha);"
2. "Light, soft, thin flowing silk: … supple and airy, drifting softly as in a gentle breeze, …" → "Warm, soft, OPAQUE padded silk: the long sleeves, skirt and sash are supple and fall in soft, heavier folds, never see-through, never stiff, flat or board-like."
3. t1 "showing a sheer thin undersleeve" → "showing a soft opaque undersleeve"
4. t3/t5 "a sheer silk shawl" → "a warm opaque padded-silk stole"
5. PHI BẠCH t1–t6 → "PHI BẠCH (winter): the shawl draped behind her back and over her arms is a warm OPAQUE padded-silk stole in {sec} (her secondary colour, clearly different from her main robe colour {main}), soft and thick, never sheer or see-through; it keeps its soft graceful drape."
s62 lengths / approved gate (`--scope tpN`):
| t | chars | notes | approved gate |
|---|---|---|---|
| 1 | 9 002 | G25, swaps 1-2-3-5 | FAIL M06 · S06 · S12 (winter swaps only) |
| 2 | 8 817 | G25, swaps 1-2-5 | FAIL M06 · S06 · S12 |
| 3 | 9 541 | G25, swaps 1-2-4-5 | FAIL M06 · S06 · S12 |
| 4 | 9 871 | pre-G22 collar, swaps 1-5, **ANGLE dropped** | FAIL M06 · S12 |
| 5 | 8 837 | swaps 1-4-5 | FAIL M06 · S12 |
| 6 | 9 775 | swap 5 | FAIL S12 |
| 7 | 9 561 | (no sheer words) | PASS |
| 8 | 9 730 | (no sheer words) | PASS |
The only FAILs are the approved sheer sentences that G28 replaces on purpose: M06 (master FABRIC line), S06 (store fabric t1–t3), S12 (PHI BẠCH). **For the foreman:** to gen a winter prompt, check_store needs a winter scope or an exemption for M06/S06/S12 that accepts exactly these G28 replacements (rule.py / gate change is the foreman's). Every other approved sentence passes.

## G28 FINAL (owner ~19:22Z t7/t8 keep brocade; ~19:24Z "Không phải dày ấm, mà là vải không xuyên thấu…", answer A) — wording + checker winter scope (NO gens)
- New `dev/art/winter_g28.py` holds the ONE copy of the swaps (used by make_winter.py and check_store.py). t1–t6 only; t7/t8 get G26 fur only. No thick/padded/quilted/brocade/heavy words; the module asserts this.
  1. master FABRIC → "The FABRIC is soft, light, flowing OPAQUE silk, never see-through, with a soft sheen and fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha);"
  2. "Light, soft, thin flowing silk: …" → "Light, soft, flowing OPAQUE silk: the long sleeves, skirt and sash are supple and airy, drifting softly as in a gentle breeze, with soft natural folds, never see-through, never stiff, flat or board-like."
  3. "showing a sheer thin undersleeve" → "showing a soft opaque silk undersleeve" · 4. "a sheer silk shawl" → "a soft opaque silk shawl"
  5. PHI BẠCH → "PHI BẠCH (winter): the shawl draped behind her back and over her arms is a soft, light, flowing OPAQUE silk shawl in {sec} (her secondary colour, clearly different from her main robe colour {main}), never see-through, never stiff or bulky; it keeps its soft graceful drape."
- **check_store WINTER scope** (Foreman C #3 order, G28): if the prompt carries the G26 fur sentence, `winter_g28.unwinter()` turns exactly these G28 forms back into the approved originals (M06/S06/S12) before the normal gate. Any other edit still FAILs. Tests: s62 winter t1–t8 approved PASS; without the fur sentence → FAIL; G28 shawl edited ("scarf") → FAIL. `--self` gives the same result as before the change (1 old problem: PROOF MISMATCH S19, already there).
- s62 `dev/art/winter1/g28/s62_tN_dong.txt`: t1 8 979 · t2 8 789 · t3 9 506 · t4 9 800 (ANGLE dropped) · t5 8 759 · t6 9 781 · t7 9 561 · t8 9 730, all ≤10 000, approved PASS. Store part: t1–t3 FAIL only on the G25 collar swap (as before); t4 PASS (pre-G22 collar passes the fuzzy store check).

## t8 Hoàng hậu winter (owner "Vẽ hh winter thử") → then STOP
Fired 1 gen before Foreman C #3's STOP (owner: no Magnific gens for 4-season test samples; she runs the prompts in ChatGPT herself): **eIPZ5GkdqL**, 135 cr, prompt `dev/art/winter1/g28/s62_t8_dong.txt` (9 730 chars, gate PASS). Not looked at and no sheet (STOP). **WINTER1 total: 11 gens = 1 485 cr.** The winter prompts for the owner are in `dev/art/winter1/g28/`. From now on: no Magnific gens for season tests.
Update (Foreman C #3: paid, so finish it): eIPZ5GkdqL looked at. The fur band is clearly the widest (wider than t4 v3), luxurious, smooth, not puffy; it runs along the front edges, the hem and the wide cuffs, and the collar fur lies on the shoulders with the neck free; brocade unchanged; face OK (closed mouth, eyes straight). Sheet `dev/handover/review-sheets/winter1/s62_t8_dong_long3.webp` (new big · old winter t8 KLpI8Vqkqp · current KLpVBAXkqp).
ChatGPT refs (review webp): `dev/handover/review-sheets/winter1/refs/image1_s62_face_style.webp (nVsrRMPYQD)` = Image 1, used for BOTH style/skin AND face (there is no separate style ref); `…/refs/image2_royal_yellow_swatch.webp (TdwDfOyVNR)` = Image 2, royal-yellow colour swatch (t6–t8 only).
