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

---
# Part 2 — owner Lượt 618 (ROOT-52 job): Thái hậu = old liked look + everything the Hoàng hậu prompt has. NO gens.

## (1) SKINS
`dev/art/SKINS.md`, section "Thái hậu 18/11 round": 104 lines. They cover c01–c32 × a36/a51/a65 on CDN img/_review/thaihau/ (all 96 files checked 200), the 2-ref tests c04 + c21 (img/_review/thaihau-2ref/) and the states-sample c13/c05 a51 (sheet3). Gen ids are listed where the 18/11 reports recorded them (c14–c20, the 2-ref tests, states-sample); the others are "—". Nothing was deleted.

## (2) New builder: `python3 dev/art/store-all/build_all.py mNN thaihau --age a36|a51|a65`
Thái hậu = this person's FULL Hoàng hậu t8 prompt (the same pipeline as `build_all.py mNN 8`), with ONLY 3 Thái hậu slots changed. The builder asserts the slots; a diff against the HH output shows only these 3:
1. Who: "An imperial consort, the Empress Dowager (Thái hậu), dignified and gracious." (old 18/11 words).
2. Outfit:
   - label "(the Empress Dowager (Thái hậu), as splendid as the Empress but dignified and restrained)";
   - the HH cloud collar is replaced by the sheet3 STIFF squared shoulder piece + high round standing collar with jade button (K5, old words verbatim);
   - crown = "a full imperial phoenix crown of the Empress's rank: a FULL tall imperial nine-phoenix crown …" (HH crown words);
   - the HH-only "the most splendid outfit of all" claim is dropped.
3. Pose: the old Thái hậu pose with her Thái hậu item = IT1 `TH_ITEMS[TH_AGE[age][(n-1)%5]]` (a different item at each age). build.py `age_item()` ignores the given item, so it is not used here. The dead-frontal words are stripped as build.py's angle law does.
Refs: image 1 = her KC set-B cut (B8), image 2 = royal swatch TdwDfOyVNR.
Gate: `check_store.py --scope tp8 --age aNN` (every approved Hoàng hậu sentence verbatim + every ban). PASS for 30/30 (m01 m05 m09 m13 m20 m33 m41 m45 m50 m52 × 3 ages). Store part 1 against the HH store is not used: it flags exactly the 3 intended slots. Normal ranks are byte-identical (m13 t6/t8 a51 cmp).
The old `build.py --state thaihau` branch (TH1 Lượt 615, no yellow) is SUPERSEDED: do not use it.

## (3) CONFIRM NOTE for the owner
| Hoàng hậu has (lower ranks do not) | Thái hậu now has (same words) |
|---|---|
| royal yellow #EFBD69 is the main colour, her own colour second (collar, inner robe, borders, panels) | yes: "the royal golden yellow is the DOMINANT colour … honey-gold close to hex #EFBD69 …" + "lilac silk like #C3A1CE, with deep teal like #468E91 in the inner robe and linings" |
| THREE-COLOUR RULE (yellow + main + secondary) | yes, verbatim |
| sleeves to the floor: "very long, very wide sleeves that hang down past her ankles until they touch the floor" | yes (before: no sleeve law) |
| "FABRIC: thick gold-embroidered brocade with a graceful, flowing drape." | yes (before: missing) |
| "far denser and richer embroidery", large phoenixes, "The phoenix is the main embroidered motif" | yes |
| long mantle "edged with a broad band of gold brocade and pearls", many long pearl/jade strands, belt with long tassels and jade pendants | yes |
| nine-phoenix crown, kingfisher-blue inlay, rubies, pearls | yes |
| "NO flowers in the hair or on the crown at this rank" | yes |
| swatch picture = image 2 for the yellow | yes |
| general rules of every rank: ONE SINGLE SLEEVE LAYER, HEAD AND BODY, ANGLE, GRACE, HELD ITEM COLOUR, hand-grip tail, hairpins | yes (the old Thái hậu prompt had none of these) |

What stays Thái hậu-only: the stiff squared shoulder piece + high round standing collar with jade button (K5, instead of the HH cloud collar); "as splendid as the Empress but dignified and restrained"; her own Thái hậu item (a different one at a36 / a51 / a65); the calm standing pose. Ages: a36 B18 tone; a51/a65 elder text + elder colour clause (= the HH a51/a65 text; it follows J2 automatically once the build.py elder clause is changed).
Full prompt for one person: `dev/handover/review-sheets/thai-hau-sample/v618/m13_thaihau_a51.prompt.txt` (+ a36, a65). This is m13 (lilac + deep teal). c04 cannot be shown because c01–c32 have no set-B ref (B8) and are NOT drawable now.

### Why the 18/11 faces look alike (see `v618/faces_18-11_a51_alike.png`: c01 c17 c25 c04 c06 c13 c21 c29 at a51)
Every one has the same oval face, almond eyes, closed smile, centre-parted silver hair, crown and red-gold collar, in the 1-ref round (own live t1) and the 3-ref round (m09 style + own t1 + swatch) alike. Causes:
- (a) The refs were the OLD live t1 game figures. Those faces are already close to each other, and in the 3-ref round the m09 STYLE image came first and pulled every face toward it.
- (b) The old prompt said "keep … hairstyle" and gave ONE identical age text, crown, collar, pose ("calm standing pose") and palette (deep antique gold + muted own colour) to everyone. Faces are small next to a huge identical costume, so the generic "elder empress" face won.
How the redraw avoids it:
- ONE ref = her own approved thiếu nữ v3 picture (the 52 m-faces the owner approved as distinct), with no style image.
- Her face words are copied verbatim from her v3 file (e.g. m13 V-shaped face + phoenix eyes vs m05 round doe eyes).
- The identity sentence keeps face, features and hair colour.
- Each person has her own main + secondary colour with hex, her own ANGLE and GRACE (rotate per person), and her own item per age.

## Notes / open (flag only)
- J2 (owner Lượt 620, deeper elder colours): the build.py a51/a65 swap + check_store S33 still carry the old "never darker" text. Thái hậu picks up the change automatically when someone updates build.py.
- nc1–nc3 have KC refs but are foreign princesses (no royal yellow, B21), and build_all thaihau fails on them (item_for). Not Thái hậu candidates unless the owner says so.
- Items: n and n+5 share the same item at one age (IT1 design: 5 per age).
- BW5 (item wiring in the build.py thaihau branch): not needed for this path. build_all thaihau() already uses TH_ITEMS/TH_AGE.
