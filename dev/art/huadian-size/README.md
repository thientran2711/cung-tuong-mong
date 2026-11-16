# Huadian size audit + one-size proposal (owner 15/11 16:50Z, 17:45Z)

Measured on live CDN portraits por-{consort-c01..c32, maid-m01..m52}-t1..t8-a18.webp (672 files; one edit covers all 4 ages).
Metric: huadian width / face width (haar face box, per-person median across tiers). c03 t1 = 0.095 (the reference).
Method: hmeas.py auto box (colour/brightness deviation from local skin), checked by eye on per-tier sheets (auditsheet.py);
114 wrong/missed boxes corrected by hand from the sheets (overrides.txt, +-0.01). Results: ratios.json, table.txt.

Proposal: ONE size for every tier t1..t8: width = 0.07 x face width (tolerance +-0.01, hard cap 0.08), measured over the whole mark
including faint gold scrolls / phoenix wings. Tiers differ by material/detail only (HUADIAN.md 8 steps). = 0.74 x today's c03 t1
= about one third of one eye length.

Samples (NOT batch): shrink.py removes the mark from the skin (robust 2nd-order skin fit + grain), then pastes the same mark
scaled about its centroid (alpha + premultiplied colour, 4x supersampled). Boxes set by hand per face (samples.py).
Sheet: huadian-sample-sheet.jpg = https://ctm-img.victoria-tntt.workers.dev/img/huadian-sample-sheet.jpg
Batch (after approval) would need: per-image box check (brows inside the box get eaten), fig + por, all 4 ages.

## Sample 2 (owner: 0.07 too small)
huadian-sample-sheet-2.jpg (sheet2.py) = same 6 faces, BEFORE | 0.10 | 0.09 | 0.08, marks already <= the size left untouched.
CDN: https://ctm-img.victoria-tntt.workers.dev/img/huadian-sample-sheet-2.jpg. Waiting for the owner to pick one size; no batch.

## r6 (art worker #4, 16/11): aged por finish
Tools: r6_sheet.py (before/after forehead sheet from a runswap/runpor log), r6_collateral.py (changes outside the mark window), rectfix.py (old light cover rectangle: pull box edges to the surrounding skin), inrect.py (inpaint explicit rects; the pendant dots at aged ages were removed with by-eye rects after stray.py), stray.py now has THR env (diff threshold).
runpor.py/locate.py understand ty1-8 names via ty_boxes.json (a18 boxes from hmeas.detect; 87 are fallbacks). TYBOX=1 (tight window) was tried and is BAD (dark blobs/smears where the box is wrong): do not batch ty, check per file.
ty_meas.json = hmeas ratio per a18 ty file (width/fw, h/fw, [x,y]); r6_names72.txt = the 72 por fixed; r6_skipped19.txt = the skipped por (all looked at: already small, left untouched).
