# MA MA gen spec (MM1, for ROOT-45/46 helper; no gens made by MM1). Builder: dev/art/t8-prompt-B/build.py at the handover-branch tip when this file was committed (`--state mama`; my d80dd0b is inside it). NOTE: the tip builder now prints a different angle sentence than my d80dd0b version ("3/4 or frontal view", set by someone else after my commit; my MAMA_ANGLE 'slight shoulder turn' text no longer appears). The prompt files here are the TIP builder stdout, NOT the text of my earlier 3 gens. Check the angle wording against owner Lượt 229/364 before running.
Prompt = EXACT builder stdout; prompt files in this folder (byte-identical to stdout, no trailing newline):
- m01-a36.prompt.txt  = `python3 dev/art/t8-prompt-B/build.py m01 --state mama --age a36`
- m01-a51.prompt.txt  = `... --age a51`
- m01-a65.prompt.txt  = `... --age a65`
Regenerate/verify any time with the command; log with `--refs --log` (ledger dev/art/gen_ledger.jsonl) and `--verify` after `--log-fill`.
Other persons: same command with mNN (m01..m52). Hair flower rotates by person number (MAMA_FLOWERS in build.py, my own mapping, not owner-approved yet).

## Settings (same for every picture; the 3 earlier gens used exactly these)
- tool images_generate, mode `gpt-2-6` (GPT 2.6), width 1024 x height 2304, resolution `2k`, extraSettings `{"transparentBackground": true}`, count 1, seed: not set (random), folderReference `ba4aecfe-efce-47e2-b53f-30d292091886`.
- Cut name: "ma ma costume" = the live fig-mama-k01 brown a36/a51 outfit (worded from the picture, owner GO 03:15Z) + two front tà (Lượt 229).

## Reference images, ORDER MATTERS (image 1 style, image 2 her face, image 3 costume); all type `image`
| picture | image 1 style | image 2 face (her live maid picture) | image 3 costume |
|---|---|---|---|
| m01 a36 | 6AbGv6EiJO | s7IJ1gvl8e = live fig-maid-m01-a36 | 79fNlPEJAL = live fig-mama-k01-a36 |
| m01 a51 | 6AbGv6EiJO | Lw87kgoswO = live fig-maid-m01-a51 | 79fNlPEJAL |
| m01 a65 | 6AbGv6EiJO | Lw87kgoswO (m01 has NO a65 picture, CDN 404: a51 used as face ref) | 79fNlPEJAL |
Creation ids are in my Magnific account folder ba4aecfe (uploaded by me). If your helper runs on another account, re-upload from the repo/CDN:
- style: https://ctm-img.victoria-tntt.workers.dev/img/_review/style-refs/style2_portraits_c01_c12.png (REF_STYLE name in build.py, id 6AbGv6EiJO)
- face: https://ctm-img.victoria-tntt.workers.dev/img/fig-maid-m01-a36.webp , .../img/fig-maid-m01-a51.webp
- costume: https://ctm-img.victoria-tntt.workers.dev/img/fig-mama-k01-a36.webp
For another person mNN: image 2 = her own live `fig-maid-mNN-<age>.webp` (a65 -> use her a51), image 1 and 3 unchanged.

## Known faults of the PREVIOUS round (prompt before d80dd0b) to check on the redo
1. a36 face/hair drifted from m01 (double buns + peony, live m01 a36 has ONE dark bun). d80dd0b adds a hair guard sentence (style image must not influence hair); unproven.
2. a36 colour = her palette (sage green for m01), a51/a65 = brown (FIGURE_GATE l.496). One-line change if the owner wants a36 brown.
3. OD:L12 thin pink veil for ma ma is not in the builder or live picture (owner call).
4. Tools I could not run: my images_generate was classifier-denied; the stray uncommitted ledger line for m01 a36 (gen never ran) is NOT in this commit.
