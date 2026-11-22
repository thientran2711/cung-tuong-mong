# MAIDFIX2 — maid prompts per owner L1722 (0 gens)
depth 1 · START_CTX ≈ 3 % (est.; get_session read 0) · done well under the roll line.

## Files (dev/art/maid7/, each + .keep)
1. NHẤT ĐẲNG `test10_nhat_L1722.txt` = copy of `test6_nhat_L1653.txt` (drew approved 4RFSnTa9Aa). ONE change:
   - was: `delicate cream-and-blush peony and plum-blossom embroidery over the vest, sleeves, front and back tà and hem`
   - now: `small, sparse, delicate little cream-and-blush embroidered flowers, tiny and widely spaced, over the vest, sleeves, front and back tà and hem, as a palace maid's rank allows (NO large flowers, NO peonies, NO medallions anywhere; large flowers belong only to Tần rank and above)` (K27/G22)
2. NHỊ ĐẲNG: `test8_nhi_L1685.txt` kept unchanged (jacket to mid-thigh, still to draw). Embroidery there is already small only ("narrow embroidered flower borders", "a few small embroidered flower sprays"), no peony/medallion/large flower → no test10_nhi file needed.
3. THÂN CẬN = exact copies, ONLY main ↔ secondary colour swapped (powder blue #A7BAD2 ↔ deep rose #CA7281, at every mention incl. nhị 'blue ruqun'/'pink jacket' and nhất 'lower maid's blue'/'sleeves blue'). The K28 square collar and every other test9 change are DROPPED.
   - `test10_tam_thancan_L1722.txt` ← test8_tam_L1685 · caption "Tam đẳng thân cận"
   - `test10_nhi_thancan_L1722.txt` ← test8_nhi_L1685 · caption "Nhị đẳng thân cận"
   - `test10_nhat_thancan_L1722.txt` ← test10_nhat_L1722 (incl. the small-flower fix) · caption "Nhất đẳng thân cận"
   test9_*_thancan_L1688 are superseded (not deleted).

## Gates
keep_check --all: 405 sidecars PASS. check_store --scope maid --age a18 --refs s7IPw0Ll8e: all 4 PASS (no S01/S32 noise). Sizes 6.6–8.0k chars (≤ 10 000).

## JOB 2 — owner L1725 (Foreman C #20), 0 gens
- Nhị prompt files (for the comparison sheet): dt4ZloSXSL = test5_nhi.txt (ledger) · 6Ab7cMSiJO = test7_nhi_L1656.txt (inferred from CHECK2 2c75a81) · Lw8btUtswO = test8_nhi_L1685.txt.
- Rule K30 added (rule.py add K, Lượt 1725): MAID EMBROIDERY LADDER + FRONT BOW.
- test11_tam_L1725 (base test8_tam_L1685): borders only (collar, short outer sleeve edges, long inner sleeve cuffs, hem of the short top); skirt-hem flower band REMOVED (tam = none); + "the sash tied at the FRONT of the waist in a pretty, graceful bow".
- test11_nhat_L1725 (base test10_nhat_L1722): scattered small flowers replaced by nhị-style border embroidery, a little richer (stand collar, vest front edges/hems, both front panels + back tà, WHOLE cuff band of every sleeve layer all the way round); skirt hem = small flowers a little bigger than nhị, never large (NO large/peony/medallion kept); open cloth plain; + a pretty, graceful bow at the FRONT of the sash.
- test11_{tam,nhat}_thancan_L1725 = the test11 maid prompts with only powder blue ↔ deep rose swapped.
- Nhị: WAITING for the owner's pick of a base (dt4ZloSXSL / 6Ab7cMSiJO / Lw8btUtswO).
- Gates: keep_check --all 409 PASS; check_store maid a18 ×4 PASS; 6.9–8.5k chars.

## JOB 2b — owner L1728 corrects K30 (0 gens)
- K30 updated (rule.py set, Lượt 1728): borders only (collar, cuffs of BOTH sleeves, hem bands, SKIRT HEM); NO body embroidery; skirt hem density tam very little < nhị more < nhất more again, always small; front bow every maid.
- test11_tam_L1725 rewritten: + VERY sparse tiny-flower skirt-hem band, no body embroidery. test11_nhat_L1725 rewritten: nhị border style DENSER, skirt hem densely small flowers, body plain.
- NEW test11_nhi_L1725 (base test8_nhi_L1685 = Lw8btUtswO, "C"): borders only (collar, outer half-sleeve AND inner long-sleeve cuffs, jacket hem, skirt-hem small-flower band fuller than tam); the "few small flower sprays on the jacket" removed (no body embroidery); + front bow.
- test11_{tam,nhi,nhat}_thancan_L1725 = colour swap of the above.
- keep_check --all 423 PASS; check_store maid a18 ×6 PASS; 6.9–8.5k chars.

## JOB 3 — owner L1731 (via Foreman C #20), 0 gens
- test12_nhi_L1731 (base test5_nhi_g43 = liked dt4ZloSXSL + G43 sachet): ONLY K30 border embroidery (collar, outer half-sleeve + inner long-sleeve cuffs, jacket hem, small-flower skirt-hem band; the jacket flower sprays removed) + front bow. test8/test11 nhị lineage dropped.
- test12_nhat_L1731 (base test11_nhat_L1725): sleeves = WHOLE edge of BOTH sleeve layers with a WIDE small-flower cuff band all the way round, clearly wider/denser than nhị, never a plain edge; border embroidery "clearly much DENSER and RICHER, the border bands wider".
- test12_{nhi,nhat}_thancan_L1731 = colour swap only. Tam: test11_tam_L1725 stands (already K30).
- keep_check --all 432 PASS; check_store maid a18 ×4 PASS; 6.5–8.8k chars.

## JOB 4 — owner L1734 (nhị A 1ldQhbmr4r approved), 0 gens
- K30 updated (Lượt 1734): sash colour always named (one of her two colours, never white), front bow in the opposite colour; nhất airier.
- test13_tam_L1736 (base test11_tam): sash + ties powder blue, front bow deep rose (was: all powder blue).
- test13_nhi_L1736 (base test12_nhi): + "the sash is deep rose and the front BOW is in the opposite colour powder blue ..., never white" only.
- test13_nhat_L1736 (base test12_nhat): sash powder blue / bow deep rose; borders "only a little richer than nhị, light and AIRY: NARROW bands, small flowers spaced apart, never crowded/heavy/stuffy"; cuffs narrow airy well-spaced band all round both sleeve layers; skirt hem small well-spaced flowers a little more than nhị.
- test13_*_thancan_L1736: word diff verified = only powder blue/deep rose/hex tokens differ.
- keep_check --all 441 PASS; check_store maid a18 ×6 PASS; 6.6–9.0k chars.

## JOB 5 — owner L1752 on test13 sheet (Foreman C #21), 0 gens
1. TAM sash: word diff test13_tam vs test13_tam_thancan = ONLY colour tokens (3× powder blue↔deep rose + hex) — no wording breaks the sash; the text never said how wide the sash is or that it goes OVER the short jacket, so the model drew a thin ribbon under the jacket hem. Fix (tam + tam thân cận identical): "the sash is a WIDE soft silk band (about a hand wide) wrapped round the waist OVER the short jacket and clearly visible, the front bow tied on it at the centre of the waist with its two long ties hanging down from the bow, never a thin ribbon, never tied below or under the jacket hem".
2. NHẤT hairpins: nhất and nhị had the SAME words ("several silver and pearl hairpins"); added to both nhất files: "her hairpins are AS LARGE AND AS MANY as a nhị đẳng maid's or a little more (never fewer, smaller or sparser), set densely around both buns, a few of them with small pearl tassels".
3. FABRIC: shared M06 master sentence identical in all 6 (MASTER_COMMON, kept verbatim). Differences were per-garment: tam jacket "fine silk brocade with a soft sheen", nhị "brocade jacket", nhất "fine embroidered silk brocade" robe. All three → "fine soft silk" (B29: maids = silk + gauze, no brocade) + one identical sentence added to all 6: "FABRIC SHEEN (same for every palace maid): all her clothes are the same soft fine silk with only a gentle, muted sheen, never glossy, never shiny or wet-looking satin, never metallic or stiff brocade."
Files: test14_{tam,nhi,nhat}_L1752 + test14_{tam,nhi,nhat}_thancan_L1752 (all 6 change because of the fabric line; thân cận word diff = colour tokens only). keep_check --all 452 PASS; check_store maid a18 ×6 PASS; 6.8–9.4k chars.

## JOB 6 — owner L1764 matte silk crepe, TAM THƯỜNG test (0 gens)
- test15_tam_L1764 (base test14_tam_L1752): ruqun, outer jacket, sash → "matte silk crepe"; the FABRIC SHEEN sentence → "FABRIC (same for every palace maid): all her clothes are matte silk crepe: a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, soft and drapey, never glossy, never satin, never brocade." Nothing else.
- NOT changed: master sentence M06 "...flowing silk and gauze with a soft sheen..." — changing it = check_store FAIL "M06 MASTER REWRITTEN" (B25). Needs a foreman/owner decision (rule.py) if the test shows sheen.
- keep PASS, check_store maid a18 PASS, 7.6k chars.

## JOB 7 — owner L1775: matte silk crepe approved for all maids (0 gens)
- Gate: master_common.py adds B29_S_CREPE + B29_S_SCOPES={"maid"}; b29_alts(scope maid) → [B29_S_CREPE], so a maid prompt may carry the crepe sentence IN PLACE OF master M06 (same B29 mechanism as the t1–t3/t4–t5/t6+ table sentences). MASTER_COMMON.txt and every other scope UNCHANGED; old maid prompts (M06) still pass. Rule B29 updated (rule.py set, Lượt 1775).
- B29_S_CREPE = "The FABRIC is thin, light, flowing matte silk crepe (lụa tơ tằm dệt nhám): a softly crinkled, slightly grainy, completely MATTE surface with no sheen at all, never glossy, never satin, never brocade, with fine delicate embroidery, long soft graceful drapery that sways and trails elegantly (thướt tha); the small embroidered motifs are stitched in fine gold thread."
- test16_{tam,nhi,nhat}_L1775 = test14 (wide sash fix, nhất big hairpins) + M06→B29_S_CREPE + test15 FABRIC line + garment words → matte silk crepe (tam ruqun/jacket/sash; nhị ruqun/jacket/sash; nhất robe/sash). test16_*_thancan = colour swap only (word diff verified).
- keep_check --all 476 PASS; check_store maid a18 ×6 PASS; 7.0–9.5k chars.

## JOB 8 — owner L1785 (via Foreman C #22), 0 gens
test17_{tam,nhi,nhat}(+_thancan)_L1785 from test16:
1. SMILE (all 6): + "Only a soft closed-lips smile, never laughing, no teeth." (no-teeth sentences were already there; the approved face line "a small playful closed-lip smile" / master "a bright closed-lip smile" kept — check_store needs them).
2. BOW: tam had "sash AND both long hanging ties powder blue, BOW deep rose" = tails in the sash colour → fixed to "sash band powder blue, BOW deep rose …; the bow and both long hanging tails are one single colour deep rose". nhị/nhất: + "the bow and both long hanging tails are one single colour <bow colour>".
3. BLEED (all 6): + "CLEAN COLOUR EDGES: every garment part is ONE flat solid colour with crisp clean edges (collar band, jacket, sash, bow, skirt): no colour bleeding, no gradient or ombré between the two colours; both colours stay as soft and muted as the colour rule says, never richer or more saturated."
4. NHẤT tone: nhất had "(a touch deeper than a lower maid's blue)" → thân cận "deeper than … deep rose" + "RECOLOUR the whole costume to her colour …" on skirt + WHOLE sleeves = the most saturated. → "(the same soft tone as the other maids)" in both nhất files.
Why bleed: tam text named sash+ties one colour and bow the other in one phrase; the sash (main colour) wraps over the jacket (other colour) right where the short jacket ends; nhất's "TWO colours that clearly interact"; collar borders "in a lighter tone"/"cream-and-blush" next to the other colour. No rule ever asked for clean edges, and the 55-cr draft model blends neighbouring colours more → both.
keep_check --all 496 PASS; check_store maid a18 ×6 PASS; nhất 9.93k (limit 10k), others 7.4–8.2k.

## JOB 9 — owner L1797 (via Foreman C #22), 0 gens
- test18_nhat_L1797 + test18_nhat_thancan_L1797 = test17 nhất files with ONE change: "a small embroidered silk fragrant sachet (túi thơm) on a silk cord with a tassel hanging at the centre between the two panels" → "... (túi thơm) with a tassel hanging from the sash at the waist on a short silk cord looped over the sash, never low at the knees". Everything else byte-identical; tc word diff = colour only.
- keep PASS ×2 (all 502), check_store maid a18 PASS ×2; 9974 / 9981 chars (limit 10 000, ~20 chars left).

## HANDOVER (MAIDFIX2, depth 1) — JOB 10 (owner L1836) NOT started
START_CTX ≈ 3 % · now 391k/1M ≈ 39 % (get_session) > roll line 28 % → rolled over; the COORDINATOR (Foreman C #23/#24) opens the successor.
JOB 10 (Foreman C #23 msg 07:38Z, owner L1836 verbatim: "Cung nữ đã ok rồi, tiến hành vẽ hai người cung nữ. Từ thô sử lên tới mama cho tôi. Hai người."): PRODUCTION prompt files for 2 maid PERSONS × every maid rank thô sử → tam → nhị → nhất (+ thân cận tam/nhị/nhất) → chưởng sự → ma ma; pick 2 persons from the roster the builders/palettes already have (say which + why); build per person × rank, gate PASS (keep_check + check_store --scope maid / mama, --age per rank), list files + count + cost @135 (2k medium, same settings as JOB K); push; report to Foreman C #24 (until it messages, #23 session_01D3E3NbPDzH9MSjxsnNqXEn).
Approved maid bases (owner OK): test17_{tam,nhi}_L1785, test17_{tam,nhi}_thancan_L1785, test18_nhat_L1797, test18_nhat_thancan_L1797 (all dev/art/maid7/). Thô sử / chưởng sự / ma ma: find their approved prompts (grep gen_ledger / dev/art/maid7/gpt/*, DESIGN15.md rows 20–25) — they do NOT yet have the K30 / crepe (B29_S_CREPE, scope maid only; ma ma scope "mama" still on M06) / clean-edge / bow lines; ask the foreman whether to port them.
How the swap/keep was done (reuse): thân cận = colour-token swap powder blue #A7BAD2 ↔ deep rose #CA7281 (+ 'lower maid's blue', 'sleeves blue all the way'); keep sidecars per file; nhất prompts sit at 9 974 / 9 981 chars (limit 10 000) — a person's face/identity lines will NOT fit without trimming boilerplate (A38: list as allow lines, never cut outfit words).
