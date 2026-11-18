# root30-W94 report (painter W94, Foreman C ROOT-30) — job A: a65 t7+t8 v0/v1/v2 for c25–c32
PRIORITY #1 CHECK: brief dev/handover/briefs/root30-mass.md; builder dev/art/t8-prompt-B (frozen, golden check OK: build.py c06 v0 --golden | cmp, test_low_all.py OK). Prompts = build.py output `cNN [--t7] vK --age a65`, copied unchanged.
Refs: own live a51 t1 uploaded as fig-consort-cNN-t1-a51.png (c25 mEZagOZhJQ, c26 vQACU9na47, c27 YMl0NGMWeC, c28 fHzuXjLCDY, c29 vQACexma47, c30 8aimTkeIrU, c31 xSBsQRXjfW, c32 YMl06C5WeC) + style eIyOFEidqL. Settings: gpt-2-6, 1024x2304, 2k, count 1, no seed, folder ba4aecfe…, then images_remove_background.
Output: CDN img/_review/t8-reprompt/cNN_a65_t{7,8}_v{0,1,2}.png + cNN_a65_sheet.jpg (live a51 t8 | t7 v0-2 | t8 v0-2).
Tools (scratch, not in repo): slots.py prints the per-version slots (face/colour/item/pose) of a person; sheet.py builds the sheet; push.sh cdn_syncs + md5.
| figure | gens | pass |
| c25 t7/t8 v0-v2 | 6 (t8v0 reused raw s7ISnjvl8e) | all pass, 1st gen |
| c26 | 6 | all pass |
| c27 | 6 | all pass |
| c28 | 6 | all pass (v0 colour = builder ORIG1 ivory; her live a51 t8 is sage-green; prompt kept frozen) |
| c29 | 6 | all pass |
Checks per figure: reads ~65 (wrinkles, silver not white), deeper dignified colours, phoenix clear, closed lips, face visible, item below chin (c26 ruyi / c27 vase flowers beside face, not covering). Note: a few t7 robes in bright pink/coral still read bright for 65 — prompt frozen.
HANDOVER: remaining c30, c31, c32 (then update this table). Slots per person: python3 slots.py cNN in dev/art/t8-prompt-B.
