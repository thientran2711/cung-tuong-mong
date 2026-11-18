# hoa-dien-art: clean foreheads (remove painted hoa điền) + hoa điền sprites/icons (Foreman C, ROOT-9 order 17/11 19:42Z)
Reuses review/huadian-size (face.py, ref.json = per-person a18 face centre/eye line/face width). det3.py is new: brow/hair-safe
mark detector + remover (2nd-order Lab skin fit, mark = dE outliers clustered near the forehead centre, dark low-chroma parts that
are big / touch the zone edge = brow/hair -> never touched; Telea inpaint + matched skin grain, hard mask).
- clean3.py SRC OUT NAME... -> OUT/NAME.webp (LOSSLESS webp: every pixel outside the mask is bit-identical) + one json line per file
  (status clean|nomark, box, anchor = mark centre in image px (HD_ANCHOR source), rect, changed px, out_diff (must be 0), size_ok).
- ba.py SRC OUT SHEET NAMES : before|after forehead zoom sheet (for looking; never committed).
- MINPEAK env (default 20): weaker clusters are reported nomark (no change).
Images never in git; review copies on CDN img/_review/hoa-dien-art/.

## v2 (17/11 ~20:30Z, owner GO ~20:00Z on ROOT-8's harmonic method)
- detf.py = final detector: locate with det3_v3b (dE clusters) else det3_v5 (colour clusters); brow guards (_ok: above ey-0.15fw, not a long flat
  stroke); box method mask (dE > 7 vs skin fit on the box ring, brow/hair strokes protected on a wide region, pendant specks added).
- det3.remove = harmonic (Laplace) fill, NO grain, ITERS=800 from a Telea warm start.
- clean3.py: haar face of the image (REF only when haar finds no eyes); 2nd pass on the result for leftovers. por = lossless.
- twin.py: fig/hd/tn at own size, lossy (Q env, default 95) + out_mad QA.
- sprites/icons: img/hd-hd-*.webp, img/hd-hoadien-bac.webp, img/wd-hd-*.webp (live 17/11 ~20:15Z).

## v3 (hoa-dien #2, 17/11 ~22:30Z) — twins
- resume.sh KIND LIST OUT LOG: resumable 4-worker twin.py run (fig|hd|hd2|tn); runclean.sh: 4-worker clean3.py; look.py: before|after zoom sheet.
- guided.py KIND SRC OUT PORSRC PORLOG NAME...: 2nd pass for twin misses ('nomark' at twin scale: figs are often a re-painted pose whose
  small/pale mark the detector loses). Warps the twin forehead back to por scale (template match), skin ref = brighter part of a ring
  around the KNOWN por mark box, mask = colour outliers connected to the anchor (dark uncoloured = brow/hair never), dilate, harmonic fill.
  Pilot 12 misses: 10 clean, 2 nomark, brows intact, out_mad = base.

## v4 (hoa-dien #3, 18/11)
- guided2.py = guided with safety (env GDC min colour dist, GBROW mask above 0.8 face width, 3 px dilate, size cap 0.02): 0 smudges but half result -> NOT used; queue-3 misses stay (KNOWN_MISSES.tsv, owner 18/11: "để đó, đằng nào cũng vẽ lại").
- HD_ANCHOR.json: {"fig-<key>.webp":[x,y]} in 1/4000 of the picture (jhd.js hdAnchor), from the clean fig/hd logs (3,924 faces; fig-hd agree median 3/4000). Faces not listed: code falls back to the mesh anchor.
- Live uploads: W12 uploaded_w12b.txt (por 512 + fig 481 + hd 500), consort-ty twins uploaded_cty_twins.txt (fig 491 + hd 444), por2 live uploaded_por2_live.txt (1,557). Logs log_*b/cty_*/por2_live.
