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
