# NF4 report (face worker; Foreman C ROOT-54)

depth 7 · START_CTX ≈4 % · ended ≈14 % (rule: START+25 %, ceiling 60 %). All 4 owner orders (Lượt 686) done; no handover job left.

## Done (all gens ledgered in dev/art/gen_ledger.jsonl, kind TEETH-686 / NEWFACE-686 / SAMPLE-686)
Builder: dev/art/face-common/make_nf4.py (writes cNN.v3t, c27.v4, s07–s09.v5). Settings gpt-2-6 1024x2304 2k, ref eIyOFEidqL, then remove_bg.
1. TEETH — strong closed-mouth sentence (NEW_MOUTH replaces the COMMON mouth sentence in the prompt; Expression gets "with the lips fully sealed, no teeth"). Checked on a 2x mouth crop:
   - c06 c06.v3t → cut p8ysH61ehw (was jUo08nILD0) — closed
   - c14 c14.v3t → cut WDgKaOScXe (was aFGP8u5fSh) — closed
   - c19 c19.v3t → try 1 (seed 7173) still showed a white tooth line, rejected; try 2 seed 7175 → cut 1ldWibar4r (was 6Abv3QJiJO) — closed
   - c31 c31.v3t → cut fHzNgVTCDY (was 1ldYS3Zr4r) — closed
2. c27 NEW PERSON, Sắc sảo: c27.v4.FULL.txt (age 17, new face/expression/hair; rank colours, outfit, item, angle kept; pose "glancing at the flowers" → "gaze straight at the viewer"; EYES_STRAIGHT sentence). cut KLpnNqzkqp (was rgXWl3bxtc). 2x eye crop: irises centred and aligned.
   LOOK_GROUPS.md result lines + OWNER_GROUPS_L686.json: c27 moved Tươi tắn → Sắc sảo (Tươi tắn 29, Sắc sảo 7).
3. TYPES_v5.md — 8 types rewritten much stronger (face shape + personality in gaze/expression, each ends with "never …" so types don't blur). No makeup/colour words for lips/cheeks/eyes. Only Sắc sảo has v5 samples; other types not drawn yet.
4. Sắc sảo samples (new people): s07 cut gOmpzsdSXO (wine red + silver grey, go stone), s08 cut ov6w1BU829 (emerald + pearl white, rolled letter), s09 cut w4aXWwe7EI (indigo violet + pale rose, red plum sprig). Looked at full size + 2x face: adult, sharp, eyes aligned, no teeth.
   Note: s09's prompt has a doubled phrase ("a lifted tip and a neat tip") from my swap; the picture is fine, kept as sent.
Sheet: dev/handover/review-sheets/new-faces-v4/nf4_teeth_c27_sacsao.jpg (≈290 KB): 4 teeth fixes old|new, c27 old|new, s07 s08 s09.
Credits: 9 gens × 135 + 8 cuts × 3 = 1,239.

## Open for the owner
- Nothing redrawn from TYPES_v5 except Sắc sảo. If she likes v5 Sắc sảo: rewrite the face lines of the other Sắc sảo members (m09 c05 c11 c17 c23 c29) with the block, and draw v5 samples for the other 7 types.

## Part 2 — owner Lượt 689 (new people only in Sắc sảo / Kiêu kỳ / Lạnh lùng / Quyến rũ; 3 samples each = 12)
Recorded in LOOK_GROUPS.md by ROOT-55 and assigned to NF4. All drawn from the TYPES_v5 blocks (make_nf4.py section 5), with the strong mouth sentence and the straight-eyes sentence.
- Sắc sảo: c27 (KLpnNqzkqp), s07 (gOmpzsdSXO), s08 (ov6w1BU829), s09 (w4aXWwe7EI) — from part 1.
- Kiêu kỳ: s10 cut u5W3NLlQLD, s11 cut cpSkbto0eP, s12 cut fHzN9OxCDY. s12 needed 3 tries: in a frontal view, "pin pointing backward" drew sideways twice, so the A21 fix in s12.v5b says "set upright at the crown".
- Lạnh lùng: s13 cut bxMGZJJ5Y2, s14 cut nVsbFtaYQD, s15 cut YMl5HhtWeC.
- Quyến rũ: s16 cut s7IM02Wl8e, s17 cut WDgKqfpcXe, s18 cut SyheMY2Ub8.
All checked at full size and on a 2x face crop: eyes aligned, no teeth. The four types are clearly different at a glance.
Note (not fixed, tiny): on s16 and s18 the beauty mark sits under the eye on the viewer's left (her right eye), not her left as written. The old s03 had the same thing.
Sheet: dev/handover/review-sheets/new-faces-v4/nf4_4groups_12.jpg (≈270 KB, one row per type).
Credits part 2: 11 gens + 10 cuts = 1,515. NF4 total: 2,754.

## Part 3 — owner Lượt 696: c06 c14 c19 c31 become SẮC SẢO
make_nf4.py section 6 → cNN.v5.FULL.txt: base = their v3t prompts (strong closed-mouth sentence), new face from the approved Sắc sảo v5 block (no "phoenix" words) + straight-eyes sentence, Sắc sảo expression; c06 age 16 → 17; rank colours, outfit, hair, item, pose and angle kept.
Cuts: c06 rgXcT8Jxtc, c14 rgXcTIOxtc, c19 gOmpdCcSXO, c31 SyheXu8Ub8 (all first try). Checked side by side with s07: same drawing; 2x: eyes aligned, lips closed.
Sheet: dev/handover/review-sheets/new-faces-v4/nf4_c06_c14_c19_c31_sacsao.jpg (≈220 KB): s07 ref, then old | new for each, 3-line tags.
Credits part 3: 4 gens + 4 cuts = 552. NF4 total: 3,306.
Note for owner Lượt 695 ("phoenix" pulls to heavy lined eyes): the Kiêu kỳ v5 block (s10–s12) still says "PHOENIX eyes". Not redrawn — waiting for the verdict on the 12-person sheet.
