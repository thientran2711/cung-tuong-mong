# BW2 — ROOT-50 extension (owner Lượt 529/534): J6 men, D9, E7, G14, E4, K15

depth 3 · START_CTX ≈ 3 % (get_session used_tokens read 0; own estimate) · builder only, NO generations · base tip d6ae5ac

## What changed (builders only; already-drawn pictures NOT redrawn)

| # | rule | files | change |
|---|---|---|---|
| 1 | J6 men ages | emperor-B/build.py, t8-prompt-B/build_npc.py | men `AGE_TXT` = the women's / Nữ đế `AGE_TXT` (build.py) of ALL FIVE ages, only gender words swapped (her→his, Her→His, she→he, lady/woman→man); **a65 added**. build_npc asserts the copy byte for byte (`_gswap`). Eunuch / official / physician / men / quý tử / Bắc Địch now build at a65. |
| 2 | D9 forehead | build.py (`D9_FOREHEAD`, every output via `__main__`, not `--golden`), build_npc.py (every NPC output), emperor-B/build.py | ONE added sentence right before END: `NOTHING on the forehead (no hoa điền, no dot, no mark, nothing).` The existing "bare clean forehead …" words are kept. |
| 3 | E7 items | item_age.py `pick_kind`, build.py `age_item`, build_all.py ladder | Nearest-age fallback removed: an age outside the status ages (kc/nhà nghèo a36+, Thái hậu a18/a26) takes the nearest age's cell but a kind NOT used by another age of that person (pass 2). Allowed-age picks unchanged (pass 1 = old code). build_all ladder uses the person's own age index (5 distinct, step 3 mod 10). |
| 4 | G14 t7/t8 secondary | build_all.py `extras`, check_store.py S01 | B15 TWO-COLOUR sentence (verbatim, slots main/secondary(person)) now on t7 + t8 too (consorts, maids, princesses pr7-8). S01 scope `tp1-8 pr1-8 mama` = **blocking** at t7/t8; confirm (WARN) only nude + triều. |
| 5 | E4 66 poses | build_all.py (`P30`, `lively`, `pose_end`, `_banned`, `plan`, `apply_dedupe`) | Pool = 36 spec5 + 30 POSES_30.md (parsed from the file, 'the item' → {prop}). t1–t3: lively only (POSES_30 L1–L10 + spec5 poses with movement words). t4+: any of 66. Walking/stepping allowed at every rank (Lượt 486 t6+ walking ban and t6+/a51+ calm skips removed). Ending at the end of the pose sentence (owner alt framing low 3 / middle 3 / top 2, POSE_GROUPS wording): t1–t3 `the skirt hem swinging softly`, t4–t6 `the robe hem stirring slightly`, t7–t8 `the robe falling still and straight`. Still banned (other rules): E2 look-back (also "glancing back over her shoulder"), D3d looking down, G4 stole/ribbon/sash at t7/t8, reading/open without book/fan. E1 seeded draw unchanged (same algorithm, bigger pool). |
| 6 | K15 tm flowers | build.py `build_maid` (`TM_NOFLOWER`), check_store.py | `NO flowers in the hair (no fresh or silk flowers), only her hairpins.` verbatim into tm1, tm2 and nữ quan tm4. Gate: X14 scope `mama tm0-4`; new S35 (sentence required tm1/tm2/tm4); check_store maps `--state tmN` to scope `tmN`. |

Gate additions (check_store.py): **S34** D9 sentence, scope `any` (every prompt, every scope incl. states); **S35** K15 sentence (tm1-2, tm4); X14 widened; S01 t7/t8 blocking. `--self`: 35 sentences, 14 banned, 0 problems.

## Gate results
- `check_store.py --self`: PASS (0 problems).
- `build_all.py --check` a18/a26/a36/a51/a65 (728 prompts each = 87 people × 8 ranks + 32 Nữ đế): **0 FAIL ×5 (3,640 prompts)**. First run found 16 FAIL = POSES_30 M8 'one hand resting on her draped shawl' at t7/t8 (check_store X05 / G4) → 'shawl' added to the t7/t8 pose ban, rerun green.
- E4 draw (a18 / a65, before the shawl ban; same algorithm): 0 non-lively poses at t1–t3; 0 people with a repeated pose; 61/66 poses used (5 banned: look-back ×4, looking-down ×1); new-30 share ≈ 41 %; max 3 people share one pose at one rank.
- E7: item_age 84 people × 21 tiers × 5 ages: 0 repeated kinds; build_all ladder 696 person×rank: 0 repeats; coverage.py: **ITEM= 0 cells** (dev/art/BUILDER_COVERAGE.md regenerated). Matrix vs pre-change run: women families identical; only men a65 cells moved from HELD/RUN to built (they keep the same pre-existing men ITEM/POSE marks as a18–a51: men pose/item table still held, E9). FRONT marks are pre-existing (old 3d2 check vs current angle law).
- NPC scan: every id × 5 ages builds or exits 3 (HELD), no crash.
- tm0–tm4 m05: STORE CHECK PASS; negative test (tm1 without the two sentences) FAILS as it should.

## Side effects / notes for ROOT-50 (LAW #0: not changed, only flagged)
1. **t7/t8 colour conflict**: TWO-COLOUR says "EXACTLY TWO colours … never a third colour", but the t7 store COLOUR RULE has large yellow parts and t8 is yellow-dominant + her colour → yellow + main + secondary = 3 colours. Added verbatim as ordered; sample m13 t7/t8 before mass.
2. **t7/t8 ending vs pose**: "ANY of 66" lets t8 draw e.g. "a light little twirl … skirt swirling out" followed by "the robe falling still and straight" (m13 t8). Literal E4; owner sample decides.
3. **GRACE line re-drawn**: GRACE is drawn after the pose with the same seeded RNG, so a bigger pose pool shifts GRACE picks for prompts not yet drawn (angles unchanged). Drawn pictures untouched.
4. **Men a51 text** keeps the women's colour example "the dark dignified tones an empress dowager or senior palace matron wears" (not a gender word of HIM, per the order). Emperor a65 has no silver beard words (J5 says silver hair + silver beard; the order was "gender words only"; the FACE slot carries facial hair). Owner call.
5. **công tử a65** = HELD (exit 3): its pose list CT_P has a18–a51 only (no source). Needs an owner/ROOT-50 pose source.
6. K15 applied to tm1/tm2/tm4; **tm3 chưởng sự cô cô** not touched (not named in the order); tm0 already says "no flowers".
7. Triều phục static prompt files (owner-copy/trieu r18–r23, records of drawn rounds) not edited; `build.py --trieu` outputs carry D9. S34 is scope `any`, so the audit will mark those old static files as missing D9 (report-only).
8. Ma ma base prompt (without `--noflower --twocol`) still fails S01/S17/X14 — pre-existing, unchanged.

## Samples (a18, exact builder stdout, gate PASS)
`dev/handover/reports/bw2-samples/m13_t2_a18.prompt.txt`, `m13_t7_a18.prompt.txt`, `m13_t8_a18.prompt.txt`
(rebuild: `python3 dev/art/store-all/build_all.py m13 2|7|8`)


## Add 1 — ma ma ONE reference (owner Lượt 543; ROOT-50 18:34Z) — DONE
build.py build_mama: with `--noflower` (MMX3's flag) or `--oneref`, the costume-image pointers are removed: "exactly the cut of image 3" (Outfit header), "take ONLY the cut from image 3; " and "; do not copy the brown of image 3" (COLOUR RULE), and the MAMA_IMG3 sentence is dropped (its "ONE panel" described the old costume image; the outfit text keeps TWO front panels / hai tà, gate S32). The garment description words are unchanged. Assert: no "image 3" left. Without the flags, the output is byte-identical.
Gate: `build.py mNN v0 --state mama --nostyle --noflower --twocol <sec> --age a36|a51|a65` → STORE CHECK PASS (m05, c07 × 3 ages), 0 image pointers. (With `--spec5pose` ma ma fails S17 hands tail; that was already so, and the mama-specs commands don't use spec5pose.)
Left in place (not asked): MAMA_HAIR "…the style reference image must not influence her hair." still names a style image that is no longer sent.

## HANDOVER — ROOT-50 adds NOT started (BW2 at rollover budget, start ≈3 % + 25 %)
The coordinator (ROOT-50) opens the successor. Start: `git pull`, read this file.
1. **Quý nhân t3 = option B v2 (owner Lượt 559, G15 + G16 no round neckline).** Put the Outfit sentence from dev/handover/reports/quy-nhan/m13_a26_t3_v2_optB.prompt.txt into the t3 builder: build.py build_low for t=3 (ITEMS_LOW / LOW outfit table, reached by `build.py cNN --low 3`; build_all rank 3 runs it). Replace ONLY the t3 outfit-design words; per-person main/secondary colour + motif slots instead of lilac / deep teal / wisteria. Keep everything else. Check that no t1–t8 outfit says "round collar/neckline" (G16). Gate: `build_all.py --check` (all ages) PASS; report one built t3 prompt for m07 and m20.
2. **B8 KC_REFS (owner Lượt 543/551):** when REF1's dev/art/KC_REFS.json + kc_ref.py land (they are on the branch now: kc_ref.py, kc_refs_build.py), wire the builders' FACE/identity words to the KC_REFS face words (copied from the kc prompt that made her thiếu nữ picture), and make the painters' ref list (`build.py --refs` gen_refs, build_all refs) = the KC_REFS cut id. Gate + report as before.
