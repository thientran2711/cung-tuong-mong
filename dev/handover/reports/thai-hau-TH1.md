# TH1 — Thái hậu sample (owner Lượt 607, ART_RULES I4) — worker of Foreman C ROOT-52

depth 5 · START_CTX ≈ 5 % (get_session used_tokens read 0; my own estimate) · NO mass

## (1) Builder fix — `dev/art/t8-prompt-B/build.py` `build_state(..., "thaihau")`
Run: `python3 dev/art/t8-prompt-B/build.py mNN --state thaihau --age a36|a51|a65 --nostyle`  (`--nostyle` = ONE ref, B8)
- **Colours (I4):** the old "deep antique-gold yellow mixed with a muted deep {main} (trầm)" is gone. Her own M_COLS colours with hexes: robe + wide sleeves = MAIN ("coral red like #D4897D"), mantle + collar + inner robe + wide borders = SECONDARY ("teal like #499597"); embroidery thread gold + secondary; "NOT a yellow robe, no royal yellow". The approved S01 TWO-COLOUR RULE sentence is copied verbatim with her two colours. The builder asserts that the person has an M_COLS row.
- **Reference (B8):** one ref = her KC_REFS set-B thiếu nữ cut. The royal-yellow swatch (old image 3, `TH_SWATCH`) is no longer used (no yellow robe). The `TH_SWATCH` constant is left in the file, unused.
- **Tone (B18):** the a36 B18 LOW_TONE swap in `__main__` now also covers `STATE=="thaihau"` (S03 words). a51/a65 get the existing elder S33 clause (calmer, never darker), and a65 gets the "a little more muted than at 51" add-on. These come through the shared swap; I wrote no new tone words.
- **K5:** stiff squared shoulder piece, high upright round standing collar with a jade button, long mantle and HH-rank phoenix crown are the sheet3 design text. Only the colour words changed: the collar is now the secondary-colour brocade, and "antique-gold" is now "gold".
- **F11:** S21 "HAIR (rank law): ALL her hair is swept UP into a high bun / chignon, nothing loose hanging down her back." was added.
- **D13 / identity / E8:** unchanged, from the shared parts: AGE_TXT a51 = D13 words; the identity sentence = the owner law (face, features, hair COLOUR, colour family — NOT hairstyle); the item comes from the TH_ITEMS / age_item Thái hậu list.
- **Gate:** `check_store.py <prompt> mNN v0 --state thaihau --age aNN --nostyle` gives **STORE CHECK PASS (approved_check PASS)** for all 3. `check_store.py --self` reports 0 problems.

## (2) Samples — 1 gen each, gpt-2-6 1024x2304 2k, no transparentBackground
| person | age | colours | ref (KC cut) | gen |
|---|---|---|---|---|
| m05 | a36 | coral red #D4897D + teal #499597 | KLpSlnEkqp | If3wdcytvE |
| m33 | a51 | lavender blue #9C97CE + apricot #D6A585 | nVseTaFYQD | hu2OoplvqL |
| m01 | a65 | sage green #A0C190 + plum #95507E | hu2qEwOvqL | rgXYbF5xtc |

Every output was already transparent (alpha 0 at the corners), as in TN4's earlier case, so I ran no remove_bg. I looked at each one full size and redid none.
Ledger: 3 lines `SAMPLE-THAIHAU-L607` in dev/art/gen_ledger.jsonl.

## (3) Files
- Sheet: `dev/handover/review-sheets/thai-hau-sample/sheet_thai_hau_sample.jpg`
- Prompts: `dev/handover/review-sheets/thai-hau-sample/{m05_thaihau_a36,m33_thaihau_a51,m01_thaihau_a65}.prompt.txt`
- Pictures: same folder, `*.webp`

## Notes (LAW #0 — flagged only, nothing changed for them)
1. m01 a65: the pose "the other hand touching a hairpin" came out as a long gold pin held up beside her head, pointing out diagonally.
2. m33 a51: her v3 face words (verbatim, B8) say "fresh and very youthful". The picture still reads about 50 (fine lines, silver front and temples, hair mostly dark), so D13 holds.
3. All 3 items are dark sandalwood with a deep indigo tassel (box / censer / mirror). They differ in kind but have a similar look.
4. The shared K3 sentence says "background completely transparent", while PRE says "plain light parchment background". Both are in every approved path; flagged only.
5. The gate has no Thái hậu-specific approved sentences: scope `state:thaihau` checks only the 'all' sentences. After the owner approves, the foreman can add the Thái hậu sentences to APPROVED (A19).
6. All 3 robes are very rich (heavy embroidery and mantle). The owner may judge whether this is "dignified and restrained" enough.

## HANDOVER
Done: push + report. Nothing open on my side. The next step is the owner's verdict on the sample, then a mass GO for the m01–m52 people that have a KC ref (A2/A19).
