# NDX4 — Nữ đế m05: Hoàng hậu sleeve/fabric sentences copied (owner Lượt 683)
depth 7 · START_CTX ≈5 % · end ≈12 % (no rollover needed).

## 1. Prompt diff (HH t8 `build_all.py m05 8 --age aNN` vs Nữ đế `nude-B/prompts/m05_aNN.txt`, every sleeve/fabric/drape sentence)
| HH t8 sentence | Nữ đế before | Now |
|---|---|---|
| FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. | present, verbatim | unchanged |
| The silk has real weight: the wide sleeves and robe hang and fold naturally … never stiff, flat or board-like. | present, verbatim | unchanged |
| All flowers, birds and the {motif} are fine silk-thread embroidery stitched directly … | present (motif slot = dragon) | unchanged |
| SLEEVE LENGTH (rank law): very long, very wide sleeves that hang down past her ankles until they touch the floor. | **MISSING** | **added verbatim, all 5 ages** |
| ONE SINGLE SLEEVE LAYER: each sleeve begins at the shoulder and falls in one piece; NO shorter outer sleeve, NO half-sleeve or elbow-length layer, NO short jacket sleeve or cuff layer visible on top of it. | **MISSING** | **added verbatim, all 5 ages** |
| "the robe falling still and straight" (end of the HH pose, a pose slot) | n/a (pose) | not copied: it is a pose phrase, not a sleeve/fabric sentence |
Unchanged on purpose: the Nữ đế outfit design, crown, colours, hair and pose. No makeup words (D14).
mk.py: the two sentences are inserted after the weight/drape sentence (the same place as in HH). For each age mk.py builds HH t8 and asserts both sentences appear in it verbatim; GATE assert: every HH sleeve/fabric sentence appears exactly once in every Nữ đế prompt. The prompt diff against NDX3 is exactly these two sentences for every age.
Gates: check_store --scope nude --age aNN PASS 5/5 (same S01 WARN as NDX3); kc_ref --check BANNED REF PASS. Commit 1e2b41b.

## 2. Gens (gpt-2-6 1024x2304 2k, no seed, folder ba4aecfe, refs KLpSlnEkqp + TdwDfOyVNR; prompt = file verbatim)
| age | gen | cut | result |
|---|---|---|---|
| a18 | tCROHJ7mZJ | If3JHx0tvE | PASS 1st gen: sleeves to the floor, one layer |
| a26 | fHzN1yiCDY | N2qvcZA6D9 | PASS 1st gen. NOTE: the parasol came out wine-crimson ≈ her secondary colour (B16). Only a note under LAW #0; not changed |
| a36 | vQA4kJKa47 | YMl58coWeC | PASS 1st gen (the raw image had edge speckle; the cut is clean) |
| a51 | WDgKI11cXe | eIPlua7dqL | PASS 1st gen: sleeves pool on the floor |
| a65 | 5jDzJYQKxe | s7IM3ycl8e | PASS 1st gen. NOTE: the gold hand warmer is close to the gold trim (only a note) |
Credits: 5 × (135 + 3) = 690. No redraws were needed. All 5 are in the ledger (worker NDX4).

## 3. Sheet
dev/handover/review-sheets/nu-de-B/nudeB_m05_old_vs_new_HHsleeve.jpg (OLD NDX3 row above NEW row, 3-line tags, 576 KB). Code: dev/art/nude-B/sheet_oldnew.py.

## ROUND 2 — owner Lượt 692 via ROOT-55 (full sentence diff vs HH t8, dev/handover/reports/nude-B-vs-HH-ROOT55.md)
Prompt change (mk.py, commit aec28b3be). The diff against round 1 is exactly this, at every age:
| HH t8 sentence | round 1 | round 2 |
|---|---|---|
| NO flowers in the hair or on the crown at this rank (flowers only at ranks 1 to 6). | missing | added verbatim |
| HEAD AND BODY: her head turns together with her shoulders and body … never a frontal head on a turned body. | missing | added verbatim |
| ANGLE: … (HH t8 of the same age, verbatim: a18 3/4 LEFT · a26 slight LEFT · a36 slight RIGHT · a51 slight shoulder LEFT · a65 fully frontal) | missing | added verbatim |
| HELD ITEM COLOUR: … clearly different from BOTH her robe colour {main} and her secondary colour {sec}. | missing | added with the HH template; only the colours differ: "royal golden yellow" / "wine-crimson like #7E2A33" |
| FABRIC: thick gold-embroidered brocade with a graceful, flowing drape. | before "The silk has real weight" | moved to the HH place (after HEAD AND BODY, before ANGLE) |
| spec5 pose phrase ", body turned slightly three-quarters to the right," (a26, a51) | present | REMOVED. It contradicted the HH ANGLE (left turn) at those ages; in HH the turn is given only by ANGLE |
Order now = HH order: weight → SLEEVE LENGTH → ONE SINGLE SLEEVE LAYER → NO flowers → HEAD AND BODY → FABRIC → ANGLE → HELD ITEM COLOUR → Pose.
Not copied (they are Nữ đế-specific, or ROOT-55 did not list them): HH GRACE line, HH THREE-COLOUR rule (Nữ đế keeps her own COLOUR RULE), HH HAIR rank law (Nữ đế has her own bun sentence).
Gate: each sentence is asserted verbatim in that age's HH t8 build (HELD ITEM COLOUR: the template up to the colour names); each appears exactly once in the Nữ đế prompt; the HH order is asserted; "three-quarters to the right" is asserted gone. check_store --scope nude --age PASS 5/5.
Gens (same settings and refs):
| age | gen | cut | result |
|---|---|---|---|
| a18 | xSB0GHBjfW | eIPlrOzdqL | PASS: 3/4 left with the head, floor sleeves, one layer, white-jade flute |
| a26 | aFG9JtRfSh | EbYi4eAuuO | PASS: slight turn, floor sleeves, the parasol is now JADE-TEAL (not crimson) |
| a36 | hu2P7VDvqL | gOmpVvOSXO | PASS: slight turn, floor sleeves, jade brush |
| a51 | KLpnABLkqp | 4RFmIQW9Aa | PASS: floor sleeves, green jade tally, silver streaks |
| a65 | aFG9Po4fSh | cpSkKkH0eP | PASS: fully frontal, floor sleeves, hand warmer teal-and-gold (raw had edge speckle; cut clean) |
Credits round 2: 690 (5 × 138), no redraws. NDX4 total 1380.
Sheet: dev/handover/review-sheets/nu-de-B/nudeB_m05_r1_vs_r2_HHfull.jpg (round-1 row above the round-2 row, 3-line tags, 574 KB).
Note: the Nữ đế angle now equals her own HH t8 angle at each age (copied verbatim, as ordered), so her Nữ đế and Hoàng hậu pictures face the same way at each age.
