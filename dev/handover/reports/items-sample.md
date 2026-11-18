# items-sample (W108) — t1/t4/t5/t6 with a fixed 3f item per rank, c05 + c25, a18 v0

PRIORITY #1 CHECK: FIGURE_GATE D3/3e/3f + t8-prompt-B README read; builder = build.py c4291fcf (handover). Nothing re-invented.

## Result
8 gens, 0 regens (all 8 first-try pass). Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/items-sample/sheet.jpg (row 1 = old live t1/t4/t5/t6 of c05 then c25, row 2 = new).
Files: img/_review/low-B/items-sample/<cNN>_a18_t<N>_v0.png (transparent, CDN only).

| fig | item (from 3f list) | hand | face / lips / forehead / eyes |
|---|---|---|---|
| c05 t1 | sprig of fresh plum blossoms | one hand grips sprig at chest, other touches a blossom | ok |
| c05 t4 | small cloisonné vase with flowers | both hands cradle vase, one under base | ok |
| c05 t5 | gold-mounted embroidered silk book | open in both hands at waist | ok |
| c05 t6 | small coral branch on a gold stand | presented in both hands | ok (yellow inner panel + sash visible) |
| c25 t1 | small woven bamboo flower basket | hangs from crook of arm, other hand arranges flower | ok |
| c25 t4 | silver-mounted book box | both hands, one lifts lid | ok |
| c25 t5 | coral-and-pearl bead tassel ornament | dangles from fingers, other hand cupped | ok |
| c25 t6 | white-jade ruyi | across both palms | ok (yellow panel + sash visible) |

Old live row: several figures hold fans/scroll/other; new row shows exactly the one prompted item, below the chin, hand interacting.

## Method
Prompts: `python3 dev/art/t8-prompt-B/build.py cNN --low N v0`, passed unchanged (=8 prompts, c05/c25 t1,t4,t5,t6; item per rank differs by person from the 3f list).
Magnific gpt-2-6, 1024x2304, 2k, folder ba4aecfe…, no seed, count 1. Refs: own a18 t1 v0 (uploaded as face-cNN-t1.png) + style kspkwKx16B (+ royal-yellow swatch, re-uploaded on this account, as 3rd ref at t6). Then images_remove_background. gens = 8 (+8 bg cuts). Credits 135/gen + 3/cut.
Note: swatch id TdwDfOyVNR was not used; new upload on this account.
~100% xong (sample) / owner verdict pending.
