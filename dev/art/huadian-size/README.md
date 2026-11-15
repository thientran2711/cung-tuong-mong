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
