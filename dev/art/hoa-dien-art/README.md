# hoa-dien-art: clean foreheads (remove painted hoa điền) + hoa điền sprites/icons (Foreman C, ROOT-9 order 17/11 19:42Z)
Reuses review/huadian-size (face.py, ref.json = per-person a18 face centre/eye line/face width). det3.py is new: brow/hair-safe
mark detector + remover (2nd-order Lab skin fit, mark = dE outliers clustered near the forehead centre, dark low-chroma parts that
are big / touch the zone edge = brow/hair -> never touched; Telea inpaint + matched skin grain, hard mask).
- clean3.py SRC OUT NAME... -> OUT/NAME.webp (LOSSLESS webp: every pixel outside the mask is bit-identical) + one json line per file
  (status clean|nomark, box, anchor = mark centre in image px (HD_ANCHOR source), rect, changed px, out_diff (must be 0), size_ok).
- ba.py SRC OUT SHEET NAMES : before|after forehead zoom sheet (for looking; never committed).
- MINPEAK env (default 20): weaker clusters are reported nomark (no change).
Images never in git; review copies on CDN img/_review/hoa-dien-art/.
