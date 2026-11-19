# ty-cold-2k (W105, Foreman C ROOT-36) — SAMPLE c06 + m37, trung y + lãnh cung, 5 ages, 2K transparent
PRIORITY #1 CHECK: OD [OD:L392] C8 trung y 8 tiers | handover reports/ty-cold-missing.md (W103c inventory + order §4), fig-cutout-clean/PROMPT_TEMPLATE.txt, maid-ty-m09.md | build.py AGE_TXT l.147, spec5pose l.852–925 | no ty/cold path in build.py (grep: no "ty"/"cold" state) | claims: N5c session_01PEhRbuZQUopcF5bN8FixL2 (item_age.py lãnh cung row). FIGURE_GATE 0 (5244e5a) + A0 + REFERENCES re-read.

## STATUS: PREP DONE, 0 gens. BLOCKED (FIGURE_GATE rule 0(e)): build.py has no trung y / lãnh cung builder → painter may not write the prompt. Asked ROOT-36 (19/11) to add `--state ty N|cold` to build.py by copying: PROMPT_TEMPLATE.txt DESIGN sentence (trung y cut + C8 colour; colours maid-ty-m09.md l.13 = jty.js TY_COL), AGE_TXT (build.py l.147), PRE/END, spec5pose(); plus item cell from item_age.py (N5c). Open questions sent: (1) spec5pose picks by rank only → same pose at all 5 ages; needs an age offset; (2) m37 = maid, no SPEC5_IDS personality; (3) AGE_TXT a51/a65 "DEEPER, DARKER" colour clause vs pale C8 silk; (4) gen_ledger.jsonl + build.py --verify do not exist yet.

## REFS (prepared; live image of that tier+age, flattened on parchment #EFE6D6, hd 1800 tall where it exists, else 900 upscaled)
CDN: img/_review/ty-cold/refs2k/<consort-c06|maid-m37>-<ty4|tcold|ty1|cold>-<age>.jpg. Forehead marks REMOVED by hand patch (dedot.py found the wrong blob on brown marks; used row-interp patch, checked by eye): m37 ty1 a18, c06 tcold a18, c06 ty4 a51, m37 ty1 a51. Note m37 ty1 a18 live has CLOSED eyes, m37 cold a18/a26 hold a cup (prompt must replace the item).
Magnific ids (folder ba4aecfe…):
| row | a18 | a26 | a36 | a51 (also ref for a65) |
|---|---|---|---|---|
| c06 ty4 | 9ZHZFUANYZ | WDgDlZpcXe | cpSpgAa0eP | u5W5Wc5QLD (clean; old gOmODIjSXO had the mark — do not use) |
| c06 tcold | YMlMs2aWeC | BhNh9pHoQR | iG5Gb4J3uK | DoOoOPmpcl |
| m37 ty1 | mEZERIohJQ | mEZERt8hJQ | s7I78sxl8e | eIPIPNHdqL (clean; old 9ZHZmqiNYZ had the mark) |
| m37 cold | gOmOmwrSXO | yiuiu6APW9 | xSBSBS4jfW | MBJBJ4kDCm |
Style image (A0 REFERENCES) = style3_girls Xm9tPkMBfo. Refs per gen = [live ref of that row+age, style3_girls].

## GEN PLAN once build.py path + N5c items + GO arrive
20 gens: `build.py c06|m37 --state ty4|ty1|cold --age aNN --spec5pose` stdout only, logged in gen_ledger.jsonl; gpt-2-6, 1520x2688 (2K, like kc2k-mass), folder ba4aecfe…; images_remove_background; look at each (frontal, item from cell, all 5 items different, clean forehead, lips closed, eyes open, nothing over face, no cup); sheet rows c06 ty | c06 cold | m37 ty | m37 cold, cols 18|26|36|51|65 → img/_review/ty-cold/sheet_2k.jpg.

## HANDOVER W105 → successor (START_CTX ~4 %, stopping at ~27 %, before any gen)
Nothing running. Worktree /home/user/wt/w105 (sparse, detached at origin tip), scratch /home/user/wt/w105-tmp (ref/*.png = cleaned refs). Next: wait for ROOT-36's build.py commit (ty/cold state) + N5c item commit + GO, then run the GEN PLAN above with the ref ids in the table. Never hand-write a prompt (rule 0).

## SAMPLE 2K DONE (painter subagent of Foreman C ROOT-38, 19/11 ~02:35-02:50Z)
PRIORITY #1 CHECK: report above + ty-cold-missing.md §4; FIGURE_GATE top + last blocks (style FINAL 6AbGv6EiJO, 3d2 frontal + lively hands, rule 0 builder-only, elder colour inside rank hue); consort-B10; build.py N5d item 4 (`--state ty1..ty8|cold`, l.870-893) exists now -> no cell skipped.
Method (rule 0): every prompt = exact stdout of `python3 dev/art/t8-prompt-B/build.py <c06|m37> --state <ty4|ty1|cold> --age <aNN> --spec5pose` (logged with --log; dev/art/gen_ledger.jsonl). Refs in --refs order: image 1 = style 6AbGv6EiJO, image 2 = live ref of that row+age from the table above (a65 used the a51 ref; no image 3). Magnific gpt-2-6, 1520x2688 (2K), folder ba4aecfe…, then images_remove_background (gens come back with a painted fake checkerboard; cut-outs are clean RGBA 1520x2688). `build.py --verify dev/art/gen_ledger.jsonl` = 21 lines, 0 FAIL (stored Magnific prompt = builder stdout, checked in creations_get). Every image looked at.
Sheet: img/_review/ty-cold/sample2k/sheet.jpg (1600x2126, CDN) — rows c06 ty4 | c06 cold | m37 ty1 | m37 cold, cols a18 a26 a36 a51 a65. 2K transparent PNGs: img/_review/ty-cold/sample2k/<c06|m37>-<ty4|ty1|cold>-<age>.png (CDN).
| row | a18 | a26 | a36 | a51 | a65 |
|---|---|---|---|---|---|
| c06 ty4 gen / cut | gOmyX4VSXO / 0eUdjWHTfW | p8yISvQehw / tCRE4IKmZJ | s7IJe9Hl8e / 79fNIwUJAL | iG5zuVD3uK / w4a98wx7EI | xSBUM9bjfW / 0eUdLV5TfW |
| c06 cold | jUowpppLD0 / vQAF3tva47 | u5WKAzkQLD / ov6aPX0829 | s7IJdoIl8e / nVsMrz1YQD | fHzqRGaCDY / lJtOBlzgv9 | s7IJdt3l8e / iG5zFii3uK |
| m37 ty1 | s7IJXbTl8e / kselDxv16B | 1ldgMFSr4r / cpSelMk0eP | TdwXlzyVNR / EbY5zqwuuO | vQAF38ma47 / 8aifNatIrU | 4RFZCO39Aa / P3QRE3S42C |
| m37 cold | MBJoUPxDCm / 1ldgpinr4r | mEZuiznhJQ / dt4myKBXSL | yiu3fblPW9 / UPv4mWXwny | 6AbGFjYiJO / rgXSeZlxtc | KLpsVtekqp / 1ldgpRMr4r |
21 gens (20 + 1 retry of c06 cold a36 = 79fNvBDJAL, same teapot-like lamp -> trashed, ledger line 21 kept). Skipped cells: none.
PASS on all 20: frontal body + face, poses varied (spec5, 4 different moves per row), one item each, all 5 items different per row, bare clean forehead, lips closed, eyes open, no cup, ages read right (a51 silver streaks, a65 mostly silver + wrinkles).
HONEST FAULTS:
1. c06 cold a36: the builder item "small old, worn clay oil lamp, unlit" is drawn as a little TEAPOT (twice) — reads as tea ware. Builder/item_age.py lanh a36 item should change (Foreman), not a painter fix.
2. Builder text conflict on cold: spec5 pose "adjusting a gold hairpin" vs COLD_OUTFIT "ONE plain wooden hairpin, NO gold" — c06 cold a51/a65 and m37 cold a36 pins look brass/golden-wood. Fix in build.py spec5pose for --state cold.
3. c06 ty4 a65 robe is LIGHTER than a51 (a51 deep rose-plum, a65 dusty pink) — both inside the pink hue, but not "deeper with age" in order.
4. m37 ty1 a51/a65 "deeper ivory" came out khaki/sand beige — reads close to a beige cold-palace tone; borderline for the ivory family.
5. Lãnh cung linen is warm grey-beige rather than the "pale grey-white" of the text; consistent across all 10 cells.
6. Items: m37 ty1 "smooth bamboo" items drawn gold (a18 butterfly) / red lacquer (a65 seal box); acceptable as contrast colours, not bamboo.
7. Faces: c06 and m37 young faces look alike (both drift to the shared style face); identity vs the live refs only roughly kept.
8. Cut-out bboxes touch the bottom edge on c06 cold a18-a51 and m37 cold a51 (slippers at the frame edge, not cut off on the sheet).

## TY0 FIX1 (Foreman C ROOT-39 child, 19/11 ~03:15–03:35Z) — builder fixes for the 6 sample faults + 4-gen check
PRIORITY #1 CHECK: this report (SAMPLE 2K DONE, faults 1–8) + ty-cold-missing.md §1/§4 | FIGURE_GATE A0 + REFERENCES + H NHÀ NGHÈO + 3d2 ty/cold ELDER COLOUR + last blocks re-read | build.py build_ty_cold / spec5pose, item_age.py POOL | live CDN img/_index.json (03:24Z) | claims: none other on ty/cold builder.
OWNER (verbatim 03:15Z, relayed): "Chung y ok rồi. Sửa mấy cái lỗi ở trên mà mày nói thôi rồi vẽ hàng loạt."
Commits (handover branch): 8da3a18 (fix 1), fe7c527 (fix 2–6), 985b047 (fix 3/4 round 2 + ledger).
| fault | change (builder only) | result on the check sheet |
|---|---|---|
| 1 lãnh cung a36 lamp drawn as teapot | item_age.py: poor a36 pool p_lamp -> p_plum "branch of plum blossoms picked from the roadside" (FIGURE_GATE H NHÀ NGHÈO #8 verbatim); item-rank-age.md regenerated; check() bad 0 | FIXED (c06 cold a36 holds a plum branch) |
| 2 cold pose "adjusting a gold hairpin" vs ONE plain wooden pin | spec5pose, --state cold only: "a gold hairpin" -> "her one plain wooden hairpin" (same pose choice, no skip; a skip made 41/84 people repeat poses across ages vs 27 before) | FIXED in text (47 cold cells now say wooden; 0 say gold) |
| 3 ty a65 lighter than a51 | a65 COLOUR RULE: "even deeper ... than at 51 (DEEPER than her 51-year-old trung y, never lighter or paler, at least as deep as at 51 (e.g. pink becomes deep rose-plum, ...))" — example list = AGE_TXT a51 verbatim; hue named WITHOUT "pale" (round 1 kept "pale powder-pink" and came out pastel again) | PARTLY: round 2 c06 a65 robe lum 151 vs old a51 139 (round 1: 164) — about as deep as a51, not clearly deeper. Mass fix: a65 image 2 = her NEW 2K a51 cut-out (plan below) |
| 4 ty1 ivory a51/a65 drifting khaki | hue clause "still clearly pearl ivory (never yellowed) at a glance, never khaki, sand, beige or tan" ("pearl ivory" = approved b10 palette word) | IMPROVED: m37 a65 RGB 208/187/167 (old a65 204/179/151 sand); still a warm cream — owner to judge |
| 5 lãnh cung linen warm grey-beige | COLOUR RULE "+ (not beige, tan, khaki or cream)" | FIXED (c06 a36, m37 a18 pale cool grey-white) |
| 6 young faces drift to the style image | + "Her face is HER OWN face from her second reference image (face and hair only — do NOT copy its outfit or sleeves), never a face from the style reference image." (FIGURE_GATE D.1 + l.518 wording; ref order unchanged: 1 style, 2 own) | PARTLY: c06 a36 closer to live; m37 a18 about the same as before (added bangs) |
Byte check: 3520 build.py commands rendered before (230dc46) and after: only --state ty1..ty8 / cold changed by TY0 (other diffs = nude, from F4 25263dc). --verify: the 21 old sample lines + my 2 round-1 a65 lines now differ (builder changed after them, expected); my 4 kept gens PASS.
NOT fixed (seen, outside the 6): spec5 poses with "long sleeves flowing behind her" / "sleeve floating out" still reach cold (COLD_FAB says no flying fabric) and a65 (calm rule only skips twirl/dance/skip); lãnh cung a65 item "clay hand warmer" may also read as tea ware — watch it.
Gens: 6 (rgXS10uxtc, YMlDniZWeC*, If3C8pqtvE*, vQAFho6a47, 3zKYZLhREY, UPv97Fdwny; *= round 1, superseded) + 6 cut-outs. Kept: c06 cold a36 bxMjb8h5Y2, c06 ty4 a65 4RF26TJ9Aa, m37 ty1 a65 TdwBDCUVNR, m37 cold a18 xSBUxEejfW.
SHEET (one row; LIVE | OLD 2K | NEW per cell): https://ctm-img.victoria-tntt.workers.dev/img/_review/ty-cold/fix1/sheet.jpg ; cut-outs img/_review/ty-cold/fix1/<c06|m37>-<state>-<age>.png

## MASS PLAN (TY0) — every ty/cold picture still to paint
SCOPE: 84 faces = consorts c01–c32 (file tier `tcold` for lãnh cung) + maids m01–m52 (`cold`), states ty1..ty8 + cold, ages a18 a26 a36 a51 a65 (AGE 65 EVERYONE). All need the 2K transparent re-make (live ty/cold are not 2K; a51 owner said wrong; a65 missing). 84 × 9 × 5 = 3780 − 4 kept fix1 gens = **3776 gens**. The 16 other old 2K sample cells (c06 ty4/cold, m37 ty1/cold) are superseded (faults 2/5/6) and are inside the list.
Ma ma = older maid pictures (owner), no own ty/cold set. FOREIGN PRINCESSES (6, art-matrix §5): HELD — no live face, no game id pattern (art-matrix CODE GAP 2); +270 gens once ROOT-39/owner gives faces + ids.
CREDITS: ≈138 cr/gen (135 + 3 cut-out) → 3776 ≈ **521k credits**; account has ≈103k (≈750 gens). ROOT-39 must decide top-up or which waves first.
LIST: dev/handover/reports/ty-cold-mass/batches.tsv (3776 rows, made by make_batches.py from the live index): batch | wave | face | state | exact builder command | image 2 | game file. 190 batches × ≤20 gens: B001–B038 a51, B039–B076 a65, B077–B114 a36, B115–B152 a26, B153–B190 a18 (face-major c01..c32 then m01..m52, ty1..ty8, cold). One painter = one batch (or several in order).
ORDER: wave a51 first; a65 batches start only after the a51 of the same faces exists, because a65 image 2 = her NEW 2K a51 cut-out (so "deeper than at 51" has a visible base; fault 3). Then a36, a26, a18.
PER GEN (FIGURE_GATE rule 0, builder only): (1) run the row's command from the repo root, paste stdout UNCHANGED (--log writes the ledger line; --refs prints the ref list). (2) image 2: download the row's URL (hd 1800 where it exists = 1379 rows, else the 900-px game file), flatten on parchment #EFE6D6, LOOK for a forehead mark (hoa điền) and patch it out (see SAMPLE section: m37 ty1 a18, c06 tcold a18, c06 ty4 a51 had one), creations_upload_image named ref-<face>-<state>-<age>. (3) images_generate mode gpt-2-6, aspectRatio 9:16, resolution 2k (1520×2688), folderReference ba4aecfe-efce-47e2-b53f-30d292091886, references [style 6AbGv6EiJO, image 2] in that order, no image 3 (no royal rank here). (4) images_remove_background. (5) LOOK at every image: frontal, face = her own (compare with image 2), lips closed, eyes open, clean forehead, ONE item = the item in the prompt, no cup/teapot-like vessel, cold = plain grey-white linen + wooden pin, ty colour = her tier colour (a51/a65 deeper than younger, a65 not lighter than her a51), feet inside the frame. Fail → regen once with the same prompt; still fails → note it, skip. (6) build.py --log-fill <ts> <gen_id> <prompt file> (prompt from creations_get), batch end: build.py --verify dev/art/gen_ledger.jsonl --since <batch start> = 0 FAIL. (7) cut-outs to img/_review/ty-cold/mass/<face>-<state>-<age>.png + one sheet per batch (rows = faces, cols = states) → cdn_sync, report line in ty-cold-mass/B<nnn>.md. Wiring into the game files (last column) = Foreman C after owner look, not painters.
