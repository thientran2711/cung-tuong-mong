# root30 W100b (painter, JOB C a18 style B, c21 redo + c22-c24; successor of W100)
Prompts = exact build.py output (73299cc2; golden + test_low_all OK). Refs t1-t5 face+style kspkwKx16B; t6 + swatch 8aimcMyIrU. Previews = contact sheets (full body + face crop), every gen looked at; FIGURE_GATE re-read.

| figure | gens | pass |
|---|---|---|
| c21 t1 v1/v2 (REDO) | 1/1 | pass (azure / turquoise) |
| c21 t2 v1/v2 (REDO) | 1/1 | pass (lavender / mint) |
| c21 t3 v1/v2 (REDO) | 1/1 | pass (aqua / sky blue: both blue, LOWV table values, prompt frozen) |
| c21 t4 v1/v2 (REDO) | 1/1 | pass (jade / lilac) |
| c21 t5 v1/v2 (REDO) | 1/1 | pass (orchid / leaf green) |
| c21 t6 v1/v2 (REDO) | 1/1 | pass (cornflower / aqua; yellow touch fuller than "small", within prompt) |

c21 redo total 12 gens (v0 kept). Note for foreman: c21 t3 v1 aqua and t6 v2 aqua = same colour family on two ranks of one person (LOWV table).
Sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/low-B/c21/c21_a18_low_sheet.jpg (files c21_a18_tN_v1|v2.png same folder, md5 checked).
Tools: work dir /home/user/wt/w100b (cut.py, sheet.py), cdn worktree /home/user/wt/w100b-cdn. Magnific ids: c21 face P3QNbh242C, swatch 8aimcMyIrU.

## c22 (in progress)
| figure | gens | pass |
|---|---|---|
| c22 t1 v0/v1/v2 | 1/1/1 | pass (lavender / turquoise / jade) |
Uploaded to CDN img/_review/low-B/c22/c22_a18_t1_v{0,1,2}.png (md5 not rechecked). c22 face id N2qRZUF6D9 (uploaded face-c22-t1.png), style kspkwKx16B, swatch 8aimcMyIrU.

## HANDOVER (W100b context rollover after c22 t1)
Next: c22 t2..t6 (v0/v1/v2 each), then sheet + READY; then c23, c24. Procedure: tools in dev/art/t8-prompt-B/tools; per rank print 3 prompts with `python3 build.py c22 --low N vK --age a18` and paste EXACTLY; 3 gens parallel; look at them via tools/dl.py contact sheet (face+body); images_remove_background; cut PNGs saved with cut.py name=url; sheet via sheet.py cNN (row0 = live b10, rows1-3 = new v0-2); cdn_sync from a sparse origin/main worktree with CLOUDFLARE_API_TOKEN=proxy-injected. (My helper scripts live only in my container: cut.py = curl url -> out/<cNN>/<name>.png; sheet.py = 6 cols x 4 rows 230px thumbs, bg 250,244,232.) ~12k tokens of context per rank.
