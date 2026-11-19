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
