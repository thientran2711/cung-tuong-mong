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
