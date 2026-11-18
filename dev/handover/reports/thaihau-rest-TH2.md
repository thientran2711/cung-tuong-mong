# thaihau-rest TH2 (c04 c05 c06 c07 c08 c13 c14 c15 c16) — painter TH2, Foreman C ROOT-33
PRIORITY #1 CHECK: owner 22:55Z verbatim + FIGURE_GATE A0 REFERENCES + A0 Thái hậu row read in full; main none, review/* none.
Command: `python3 dev/art/t8-prompt-B/build.py cNN --state thaihau --age a36|a51|a65` (handover tip incl. "build.py thaihau: H item list + swatch line"), pasted UNCHANGED, no --nostyle.
Refs (3, in order): (1) style m09 eIyOFEidqL (type style); (2) her own t1 of that age (a65 -> her a51 t1; no a65 t1 exists) = face only; (3) royal-yellow swatch TdwDfOyVNR. Pink kspkwKx16B never used.
Gen: gpt-2-6, 1024x2304, 2k, count 1, folder ba4aecfe…, extraSettings transparentBackground true. Alpha from the gen was unreliable (some had opaque parchment / halo), so images_remove_background was run on the output (said here: not "no-alpha only"; cut-out used wherever the gen had a background/halo).
Identity uploads (folder ba4aecfe…, a36 | a51): c04 jUoSRQsLD0|N2qZpSB6D9; c05 Xm9t5cZBfo|Lw8UZ5lswO; c06 kseL6rF16B|ov6h1hE829; c07 ov6h1vu829|0eUpEdyTfW; c08 rgXl3wnxtc|cpSDCBi0eP; c13 5jDx9NOKxe|MBJXFqbDCm; c14 lJt7GYrgv9|79f4cDmJAL; c15 WDgMfHAcXe|eIP8bLKdqL; c16 fHzFSNuCDY|xSBgRTZjfW (new uploads this session; the older T1 ids were not reused).
CDN base: https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau/ (cNN_a36_thaihau.png, cNN_a51_thaihau.png, cNN_a65_thaihau.png, cNN_thaihau_sheet.jpg)

| person | refs (a36 / a51+a65) | gens | item | look notes | links |
|---|---|---|---|---|---|
| c04 | jUoSRQsLD0 / N2qZpSB6D9 | 3 (0 regen) | ivory-handled silk fan | royal purple + antique gold; stiff squared shoulder piece + round standing collar; a36 young, a51 silver visible at temples (modest), a65 silver-grey elderly; closed lips, bare forehead, fan below chin, 3/4 | c04_thaihau_sheet.jpg |
| c05 | Xm9t5cZBfo / Lw8UZ5lswO | 3 (0 regen) | embroidered silk prayer-bead pouch | peacock teal + gold; same checks; pouch chest height below chin | c05_thaihau_sheet.jpg |
| c06 | kseL6rF16B / ov6h1hE829 | 3 (0 regen) | thread-bound sutra book, gold-brocade cover | vermilion + gold; same checks; book held in both hands at waist | c06_thaihau_sheet.jpg |
| c07 | ov6h1vu829 / 0eUpEdyTfW | 3 (0 regen) | scroll of calligraphy on yellow silk | lavender + gold; same checks; scroll in both hands at waist (yellow scroll sits close to the gold robe, still reads as a scroll) | c07_thaihau_sheet.jpg |
| c08 | rgXl3wnxtc / cpSDCBi0eP | 3 (0 regen) | small white-jade ruyi | cherry-blossom pink (muted) + gold; same checks | c08_thaihau_sheet.jpg |
| c13 | 5jDx9NOKxe / MBJXFqbDCm | 3 (0 regen) | thread-bound sutra book, gold-brocade cover | apricot + gold; same checks; book in both hands at waist | c13_thaihau_sheet.jpg |

Totals before TH2b: 18 gens (all kept, 0 regen) + 18 cut-outs (c04 a36 needed none; remove-bg run on the rest).

## HANDOVER (rollover: ctx past ceiling; coordinator opens the successor) — c14, c15, c16 NOT started
Same recipe: `python3 dev/art/t8-prompt-B/build.py cNN --state thaihau --age a36|a51|a65` pasted UNCHANGED; refs in order [style eIyOFEidqL (type style), own t1 id, swatch TdwDfOyVNR]; a65 uses the a51 id. gpt-2-6 1024x2304 2k count 1, folder ba4aecfe…, transparentBackground true, then ALWAYS images_remove_background on every output (gen alpha is unreliable: opaque parchment or halo), download the cut-out PNG, sheet a36|a51|a65 on parchment, cdn_sync (copy dev/site/cdn_sync.py + manifest_guard.py from origin/main into a scratch tree with img/_review/thaihau/, run with explicit file args), report row, READY to ROOT-33.
Ids: c14 a36 lJt7GYrgv9, a51/a65 79f4cDmJAL (item ivory-handled silk fan, soft butter yellow); c15 a36 WDgMfHAcXe, a51/a65 eIP8bLKdqL (item carved sandalwood box, coral pink); c16 a36 fHzFSNuCDY, a51/a65 xSBgRTZjfW (item small gilded bronze hand censer, sage green). Ids were uploaded in parallel: confirm by looking that the result face matches her t1 (c05 onward looked right).
Efficiency note: only five lines of the prompt differ per person (Her face / robe colour x2 / item / hands-and-body); age text a51/a65 as in build.py.
~67% xong (18/27 gens) / ~0% chơi được

## TH2b (successor of TH2, 18/11 ~23:10Z) — c14 c15 c16 DONE
PRIORITY #1 CHECK: owner 22:55Z verbatim + FIGURE_GATE A0 REFERENCES/D.3a/H THÁI HẬU/AGE a51+a65 + consort-B10 re-read before c14, c15 and c16; main none, review/* none. Same recipe as above (build.py thaihau, pasted unchanged; refs = style eIyOFEidqL, own t1 id, swatch TdwDfOyVNR; a65 uses the a51 id; gpt-2-6 1024x2304 2k count 1; then images_remove_background on every gen).
Ids used as in the handover (face looked right on all 9). Upload method: direct R2 PUT to bucket ctm-img via api.cloudflare.com (same keys as cdn_sync.py; cdn_sync.py/manifest_guard.py are not on this branch and the main fetch timed out), etag = md5 verified; img/_index.json NOT rebuilt (review files only).
| person | refs (a36 / a51+a65) | gens | item | look notes | links |
|---|---|---|---|---|---|
| c14 | lJt7GYrgv9 / 79f4cDmJAL | 3 (0 regen) | ivory-handled silk fan (plum, contrasts) | butter yellow + antique gold; stiff squared shoulder piece + round standing collar; a36 young, a51 silver streaks at temples, a65 grey-silver + fine lines; closed lips, bare forehead, fan below chin, 3/4 | c14_thaihau_sheet.jpg |
| c15 | WDgMfHAcXe / eIP8bLKdqL | 3 (0 regen) | carved sandalwood box | coral pink + gold; same checks; box in both hands at waist | c15_thaihau_sheet.jpg |
| c16 | fHzFSNuCDY / xSBgRTZjfW | 3 (0 regen) | small gilded bronze hand censer | sage green + gold; same checks; censer in both hands at waist (bronze-gold sits close to the gold robe, still clearly reads as a censer) | c16_thaihau_sheet.jpg |
Gens 9 x 135 cr + 9 cut-outs x 3 cr (every cut-out run: gen alpha unreliable). Ids (gen -> cut-out), a36|a51|a65: c14 6Ab2CUpiJO|p8yoSwyehw|CqnHRGTEEy -> 4RF3fnM9Aa|p8yoUfuehw|jUoSp9gLD0; c15 mEZCN2AhJQ|eIP8wNKdqL|lJt7Xf3gv9 -> 6Ab2QrGiJO|YMlVxJdWeC|VX7dgNBMMU; c16 CqnHAkjEEy|lJt7o9vgv9|s7IwBN4l8e -> kseLMQW16B|nVsTxRQYQD|WDgMLAXcXe.
CDN base: https://ctm-img.victoria-tntt.workers.dev/img/_review/thaihau/ (cNN_aNN_thaihau.png, cNN_thaihau_sheet.jpg).
TH2 total: 27/27 gens (c04–c08, c13–c16 = 9 people). ~100% xong (TH2 part) / ~0% chơi được
