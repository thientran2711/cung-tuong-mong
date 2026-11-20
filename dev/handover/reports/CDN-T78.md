# CDN-T78 — tonight's rank8 cut-outs moved from git to the CDN
depth 1 · START_CTX ≈ 3 % of 1M window (finished well under the roll line) · worker for Foreman C ROOT session_01D3E3NWtCdQC92tFLkd25H5

PRIORITY #1 CHECK: dev/art/CDN.md does NOT exist on the handover branch; convention taken from the dev/site/cdn_sync.py header (key = repo path under img/). CDN index had 0 keys under img/fig-cut/ before this job → brief layout `img/fig-cut/rank8/<id>-t7|t8-a18.png` used; dry-run showed 150 "new", 0 overwrites.

## Done
- Cut m18 t7 v2 (gen SyhuHMnUb8, eyes fix) with images_remove_background → cut dt4ZmiSXSL (3 cr). Looked at it on #18181C: clean edges, no halo, corners alpha 0, 1024×2304 RGBA. Production redraw → A34 cut applies.
- Uploaded with `cdn_sync.py img/fig-cut/rank8` (proxy auth): **150 objects, 608.2 MB**:
  - 134 PNG = 133 from git (117 CUT-ALL + 16 CUT-SS) + m18 t7 v2. Note m18 t7 had no old cut in git (CUT-ALL skipped it), so there is nothing old to replace.
  - 16 lossless webp copies of dev/art/rank8-t78/sacsao-page/cut/ → `img/fig-cut/rank8/<id>-<t>-a18.webp` (git copies + sacsao-page/ untouched).
- Verified: `cdn_sync.py --check img/fig-cut/rank8` → same 150, upload 0; plus public GET of every URL, md5 matches the local file for **150/150**. (Python urllib gets 403 from the Worker, so use curl.)
- `dev/art/rank8-t78/cut/CUTS.tsv` rewritten: id, t, gen, cut_id, cdn_url, md5, size (150 rows).
- `git rm` 133 PNGs from dev/art/rank8-t78/cut/ (history NOT rewritten; the ~560 MB stays in old commits). Kept CUTS.tsv + _check_overview_dark.jpg (848 KB) + _check_zoom_1to1.jpg (232 KB), both under 1 MB.
- .gitignore (root): `dev/art/rank8-t78/cut/*.png`.
- Ledger dev/art/gen_ledger.jsonl: 1 × RANK8-CUT (m18 t7 v2) + 1 × CDN-UPLOAD summary.

## Base URL
https://ctm-img.victoria-tntt.workers.dev/img/fig-cut/rank8/  (e.g. …/m18-t7-a18.png, …/s31-t8-a18.png)

## Credits
3 (one cut-out). 0 failures.

## Open
- dev/art/CDN.md (cited by the cdn_sync.py header and by briefs) is missing on the branch — foreman may want it written.
