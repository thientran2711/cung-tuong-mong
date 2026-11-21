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
