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
