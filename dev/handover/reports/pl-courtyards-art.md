# pl-courtyards-art (art worker for Foreman C, OD:L1415)
START_CTX ~8%, now ~35%.

## Result
Owner approved sample v2 (sample.jpg = existing | thanhminh-sang | tang-sang). Batch painted: 299 pictures, 6 multi-hall dirs (cac, can-ninh, phi-cung, quy-cung, vinh-hoa, spare-cung = 48/48/48/48/48/59). Rules kept: no weather, same light/colour as the same-buổi existing picture, decorations only.
Method: gpt-2-6 edit of the existing same-buổi season picture (+ existing festival picture of the dir as decor guide). Delivered by 6 Sonnet sub-workers (one per dir), each looked at every image on per-festival sheets; I checked overview grids of all 6 dirs.
Files: 1792 px wide RGB WebP, 60-245 KB (54 files recompressed to <=~250 KB; q>=50). On CDN img/pl2 (299 new, 0 overwritten, --check same 299). hotspots.json pushed; jpm.js `have` re-inlined with `python3 dev/tools/pl2_sync.py` (after pulling img/pl2).
Counts of painted states per dir before -> after: cac 28->76, can-ninh 28->76, phi-cung 28->76, quy-cung 28->76, vinh-hoa 28->76, spare-cung 17->76. Check: all 299 MISSING rows are now in `have` (0 missing).
Sheets: sheets-<dir>.jpg (base above, results below, per festival); REPORT-<dir>.txt (KB, mean RGB vs base, redos).
Known minor flaws (not redone): tang-chieu (cac, phi-cung, spare) cloth only on main eaves/gate, pillars still red; tang-toi bluish/pale wall in phi-cung; vantho rows slightly gold-strong; giaothua couplets pseudo-writing (no readable text); doanngo-toi / trungcuu-toi decor subtle (dark night base); tang-* up to ~+15 brighter (white cloth). Dong bases already have snow on the ground (part of the base, not added weather).
Not run: dev/test/pl-courtyards-autopick.js needs a built site (not built here); data check instead: 299/299 rows in `have`, inlined JSON == img/pl2/hotspots.json.
Branch: review/pl-courtyards-art-code (based on origin/review/pl-courtyards-r1 = has the reviewer's regex + mourning kpmArt fix, which origin/main lacks) — only change = dev/build/jpm.js inline `have`.
