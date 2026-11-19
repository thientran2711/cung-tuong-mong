# t8 prompt B (Hoang hau, a18) -- FROZEN
Owner 18/11 ~18:15Z: "lấy cái prompt B đi, B cho đẹp"; ~18:20Z: draw ALL Hoàng hậu, 3 colours, all 90 people with THIS prompt, exactly, no additions/removals per painter.
- `build.py cNN v0|v1|v2` prints the exact prompt. `--golden` = byte-identical to the 4 prompts actually run in the A/B test (B side) -> `golden/pB_c06|c16|c20|c25.txt` (golden check: `python3 build.py c06 v0 --golden | cmp - golden/pB_c06.txt`).
- Default mode differs from golden ONLY in the colour slot: yellow words measured from c25 B = "rich warm royal golden yellow, a honey-gold close to hex #F2C985 (light-medium depth, 18K gold tone), not pale cream, not beige/tan/ochre, not heavy mustard, not lemon" (pixel median #F2C985, IQR #E1BA73..#FBD493, HSV ~37deg/45%/95%; old C2 median was #F2BB5D) + "all colours fresh, clear and luminous, never dusty or greyed" (owner 18:00Z).
- v0 = her own signature colour (palette from jobs.json) + royal yellow mixed; v1 = royal yellow MAIN + one fresh accent of her colour; v2 = a different fresh family (V2 table in build.py) + royal yellow mixed.
- Item = one 3f t8 item rotated per person (ITEMS table); c06 c16 c20 c25 keep the items used in the A/B test; hand template follows the item kind.
- New people nNN: add a row to DATA (palette = their signature colour, face words) and keep everything else.
- refs.txt = references + settings + selection rules.

## t6 (Quý phi) royal-yellow SWATCH (owner 18/11 ~22:40Z: "đừng tả bằng lời... đưa một cái hình vuông màu chuẩn")
- t6 text (`--low 6`, all 32 people, YEL_T6 in build.py) says the royal yellow is exactly the colour of a flat swatch = image 3. t6 refs = THREE images: (1) own t1 of that age [image], (2) style B kspkwKx16B [style], (3) swatch [image]. t1-t5 stay two refs.
- Swatch: 1024x1024 flat PNG #F2BC61 (median robe-yellow of yellow-deeper/c03_a18_t8_C2.png). CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/swatch/royal_yellow_C2.png . Magnific id TdwDfOyVNR belongs to the OLD account: re-upload the CDN file on the new account (creations_upload_image) and use the new id.
- Sample (c06/c25, 1 gen each): img/_review/new-faces/style-test/b-t6-swatch.jpg. c06 got yellow inner panel + sash; c25 only the sash. If stronger is wanted: write "the whole inner robe front panel is royal yellow".

## Gen ledger: --log / --refs / --verify (N5d item 2)
Painter steps for EVERY figure gen (copy into briefs):
1. `python3 dev/art/t8-prompt-B/build.py <ARGS> --log --refs > prompt.txt` — prints the prompt (stdout, byte-identical to without the flags), the A0 reference list as JSON on stderr (image 1 = her own live t1 / live tier+age picture, face only; image 2 = style2_portraits_c01_c12 6AbGv6EiJO (two approved portraits); image 3 = royal swatch only when the prompt says "Image 3 …"), and appends a line to dev/art/gen_ledger.jsonl: {ts, cmd, argv, prompt, refs, gen_id:null, magnific_prompt:null}.
2. Generate with EXACTLY prompt.txt and exactly the listed refs.
3. `creations_get <gen_id>` → save the prompt Magnific stored to mp.txt, then `python3 dev/art/t8-prompt-B/build.py --log-fill <ts of the ledger line> <gen_id> mp.txt` (fills gen_id + magnific_prompt).
   (Shortcut when the gen id is already known: add `--gen-id ID --mprompt mp.txt` to step 1 instead.)
4. Reviewer / foreman: `python3 dev/art/t8-prompt-B/build.py --verify dev/art/gen_ledger.jsonl [--since 2026-11-19T00:00:00Z]` re-runs each logged cmd and compares the fresh prompt with magnific_prompt: PASS/FAIL per line, exit 1 on any FAIL (a line with no magnific_prompt is a FAIL).
Python API (W107b): `import build; build.K3_BG; build.gen_refs(argv, prompt); build.log_gen(argv, prompt, gen_id, mprompt); build.verify_ledger(path, since)`.
