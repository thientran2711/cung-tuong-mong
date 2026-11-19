# AP1 — approved-sentence registry + machine gate + audit + owner sheet (owner Lượt 500, via ROOT-49). NO image generation.

## Built
- **Registry** `dev/art/APPROVED_SENTENCES.md`: 33 sentences (S01–S33) + 14 banned (X01–X14). Each sentence was COPIED by script from its proof prompt (pr_cl_t2_V2 Cao Ly V2, store build.py through build_all, trieu r21/r18, ma ma spec). Each entry lists its {slot}s, scope (+ "confirm" scope = WARN only), ages, Lượt, source, proof, approved picture (Magnific id + CDN), and a one-line Vietnamese meaning. Proof prompts: `dev/art/approved/proof/`.
- **Gate** `dev/art/check_approved.py`:
  - `python3 dev/art/check_approved.py <prompt> --scope tp1..8|pr1..8|trieu1..8|mama|nude [--age aNN]` checks one prompt. It is also built into `check_store.py`: the scope comes from the args (Nữ đế and ma ma are detected from the prompt text), and the gate prints `STORE CHECK PASS … (approved_check PASS)` or exits 1. build_all.py, nd.py and every painter already call check_store, so they are all gated now.
  - `--self` re-proves every registry entry against its proof prompt.
  - `--audit` writes `dev/art/APPROVED_AUDIT.md`.
  - nd.py ledger lines now carry `"approved_check":"PASS"`.
- **Audit** `dev/art/APPROVED_AUDIT.md`: 3,989 prompts checked, 3,580 PASS, 409 FAIL.
  - Ma ma: 341 FAIL (99 one-ref + 242 older), all because S01 TWO-COLOUR RULE is missing.
  - m39: 40 FAIL, face line "downcast eyes".
  - m12: 25 FAIL, own palette "pale golden yellow" at t1–t5.
  - Triều phục: 3 FAIL (r18 t7/t8 lack the brocade sentence S28 and the hands tail S17; r21 t6 lacks S31).
  - WARN only (not blocking): S01 is missing on t7/t8 thường phục (870 prompts), Nữ đế (160) and triều phục (8). B15's wording ("every outfit") reaches these, but the owner has not said so yet.
  - Consorts, princesses and Nữ đế: 0 FAIL.
- **Owner sheet** `dev/handover/review-sheets/approved/approved_sentences_1..5.png` (1200 px wide, phone-readable). Pages 1–3 = the sentences, each with the thumbnail of its approved picture, the VN meaning and the exact English. Pages 4–5 = the banned phrases. Regenerate: `python3 dev/art/approved/make_sheet.py <Lượt>`. Thumbnails are in `dev/art/approved/thumbs/`.
- **Rule** ART_RULES A18 (Lượt 500). It was added with `--force`: rule.py saw it as similar to B3 (store gate), but it is a different gate.

## Open points (see APPROVED_AUDIT.md "Findings")
- ART_RULES B15 cites the wrong Cao Ly V2 cut ids. Real V2 t2 = gen Lw8y0mCswO / cut 79f3BGcJAL (ledger :288), not on the CDN.
- S01 has no thumbnail for that reason.
- Builder-added sentences (S08–S15, S20–S23) pass because they were copied from build_all. Only the owner's one-time OK of the sheet makes them "her words".
- Negation handling: a banned word inside a clause that also says no/never/not is ignored (e.g. "never looking down"). This could hide a rare positive use in such a clause.

## Handover
Task complete; nothing is in flight. Next steps belong to the foreman:
1. Send the sheet to the owner.
2. Add each new owner approval as a new entry. Copy it from the approved prompt by script, then run `--self`.
3. After the owner rules on the WARN scopes, move them from `confirm:` to `scope:`.
