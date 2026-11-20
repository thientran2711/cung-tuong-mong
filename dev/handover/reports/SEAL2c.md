# SEAL2c — consort «giận» seals by the 8 ranks (A25) + Hoàng hậu remainder
depth 4 · START_CTX ≈ 3 % · roll line ≈ 28 % · coordinator ROOT-60 (session_01PEhRbxsHLiHaB6yGGXAQRY)

## JOB 1 — 8-rank «giận» A stills (DONE, sent to ROOT-60; NO clips until owner OK)
Builder: `dev/art/emo-anim/groups/rank_gian_prompts.py` (seal_gate PASS 16/16; first run FAILED S9 on t7 → wording fixed to "small gold phoenix crown").
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/rank-gian-sheet.jpg (A stills: img/_review/emo-anim-groups/kf/rank-tNy|o-gian-A.png)
Settings: gpt-2-6 1:1 2k, ref 1ldcfNpr4r (the women «giận» disc, same as pt/ptl v3 + hh-gian). SEAL8's one-hex-per-emotion table did not exist yet in the repo → the approved red disc was used.

| rank | VN | robe (B24) | hair ornaments (store words + F5/F13) | trẻ | lớn tuổi |
|---|---|---|---|---|---|
| t1 | Đáp ứng | cream-ivory #EAE3D0 | a few silver pins, tiny pearl drops + 1 small jasmine | 5jDYWLOKxe | gOmdXPeSXO |
| t2 | Thường tại | jade green #7FB394 | several silver+pearl pins, short drops + 1 small-medium pear blossom | ksec0Sy16B | JNCItRoOq4 |
| t3 | Quý nhân | cornflower blue #7E9CCB | silver, pearl, jade pins, dangles + 1 medium blue flower | mEZ49q2hJQ | ksec07216B |
| t4 | Tần | pink #E3A3B8 | gold+jade pins, small gold bu yao tassels + 1 large pink peony | Lw8Dp9dswO | JNCItGmOq4 |
| t5 | Phi | purple #A88BCB | larger gold headdress, gold tassels, jade pins + 1 big purple flower | rgXTVpgxtc | rgXTVeSxtc |
| t6 | Quý phi | orange #E3A25B | big ornate gold headdress, pearls, gold blossoms, many tassels + 1 largest orange peony | cpSrxg10eP | 0eUxjUKTfW |
| t7 | Hoàng quý phi | coral red #D46A64 | SMALL gold phoenix crown, gems, dangles; no flower (S9) | YMlk1grWeC | xSBVM83jfW |
| t8 | Hoàng hậu | royal yellow #EFBD69 | LARGE gold phoenix crown, pearl strings, red jewels; no flower (S9) | yiumhH0PW9 | 4RFva509Aa |

Rules: hair F11 (young t1–t3 top-half-up and loose, everyone else a high bun); older ones get the same ornament sentence plus "EXACTLY THE SAME hair ornaments as a young consort of her rank … age adds no hairpins" (A25(2)); brocade only, no silk, no gauze (A25(3)); no phoenix t1–t6 (S05).
Prompt diff vs pt/ptl v3 (A17): the rank ornaments, colour and flower replace the fixed pt/ptl pins; "thin silk and gauze (not brocade)" → "plain thick brocade … no thin silk, no gauze, nothing sheer"; added the same-pins sentence for older consorts; the rest (style, face, medallion, green) is word for word.
Looked at all 16 (one sheet). Small faults (list only, NO redo without owner yes):
- older t1/t2/t3: the pin layout is not exactly the young one's (t1o has an extra centre pin ornament, t3o has more pins). Same KIND of pins and the same single flower, but not a pixel copy.
- hair reads dark brown rather than pure black on most (same as the earlier seals).
- t7 young vs older: the small phoenix crown designs differ a little.
- t8 Hoàng hậu trẻ is a new ~18 y version; the approved hh-gian (gOmeqH6SXO, ~30 y) still stands.
Credits: 16 × 135 = 2 160. Balance 114 041 after (shared account).

## JOB 2 — remaining Hoàng hậu keys: NOTHING ELIGIBLE YET (0 gens)
Owner L812 approved for Thái hậu only: vui buồn sợ ẩn bình ghen lo mưu tựtin hănghái (FOREMAN_C_STATUS L88). Hoàng hậu has all of them already (SEAL2/SEAL2b).
Remaining hh_prompts.ORDER keys tinhtu chuyentam hungkhoi tinhnghich hothen chan khochiu choang hon + 17 act-*: their Thái hậu units (SEAL5 u4/u5, SEAL6/SEAL7)
were held for the whole-set send; no owner OK found in FOREMAN_C_STATUS / SEAL5 / SEAL6 → SKIPPED, waiting. đau: waits (wording). ghen LOOP/BACK: waits.
→ When the owner OKs the Thái hậu units 4+ (or ROOT-60 says the whole-set GO covers them), run them in units of ≤6 using the SEAL2b method (handover in SEAL2.md).
Side fix: sg2_prompts.py pt/ptl silk/gauze → brocade (A25(3)), so MG4 S11 PASS; marked SUPERSEDED by rank_gian_prompts.py. seal_gate --all sg2 PASS.

## Hoàng quý phi redo (owner ~01:01Z via ROOT-61, rule A28 / S9 updated e13a59f) — DONE
t7 ornament wording changed (A17 diff: only this): "a BIG Hoàng quý phi phoenix crown as large as a Quý phi's big ornate gold headdress: one gold phoenix with spread wings on an ornate gold crown band set with rubies, sapphires, pearls and jade, with many gold tassels and pearl-and-gold dangles (as big as a Quý phi's headdress, but never larger or grander than an empress's large crown with its spread-wing phoenixes)". The first try was blocked by the old S9 'small' rule → no gen until MG4/ROOT-61 updated S9.
New: t7y 3zKu15AREY, t7o DoOlPOlpcl (gate PASS, 270 cr). Sheet QP | HQP CŨ | HQP MỚI | HH, labels big on the picture (A27):
https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/rank-gian-hqp-v2-sheet.jpg
Look: the crown is now as big as the Quý phi headdress ✓; a single phoenix whose wings are smaller than the Empress's ✓. Faults (list only): its band is about as wide as the Empress's and carries MORE hanging tassels, so at a glance it can read as grand as Hoàng hậu; the medallion is drawn a bit larger than its neighbours; young and older crowns differ slightly in gem colours.

## CROWN SWAP Hoàng hậu ↔ Hoàng quý phi (owner ~01:13Z: "Hoàng quí phi còn to hơn hoàng hậu, đổi mũ…") — DONE, 4 gens 540 cr
t8 now = the HQP v2 crown ("LARGE ornate gold phoenix crown, the grandest crown in the palace: wide band, one spread-wing phoenix, rubies/sapphires/pearls/jade, many gold tassels + pearl-and-gold dangles").
t7 now = the old Hoàng hậu crown, a little smaller and simpler ("phoenix crown like an empress's but a little smaller and simpler: spread-wing phoenix on a gold band, pearl-string swags, red jewels; never larger or grander than the empress's crown"). Gate PASS (S9 A28, S12).
New: t7y iG5ELKJ3uK, t7o 3zKusr2REY, t8y xSBVvtwjfW, t8o tCRPYzFmZJ. Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/emo-anim-groups/rank-gian-crown-swap-sheet.jpg
Look: HQP MỚI crown clearly smaller and simpler than HH MỚI ✓; HH MỚI widest, with the most tassels ✓; young = older crowns ✓ (small gem differences). Faults: HH MỚI young crown is a little narrower than the HQP v2 crown it copies; the HQP MỚI phoenix is about the same height as the old HH phoenix.
