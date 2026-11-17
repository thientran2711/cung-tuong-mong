# review/pl-courtyards-r3-r1 — report

Built on review/opt-greyed-r1 (75a8833b) + origin/review/pl-courtyards-r3 tip f42dd31c (= r3b; 5425e4c1 is its parent). Conflicts: jpm.js (took worker's r3b version; it already uses kitTam), assemble.py (identical lists), index/sw/assets rebuilt. jgrey.js identical on both sides.

## Verdict: PASS

## Checks
- stand-in uses kitTam: kpmArt returns tam:true for season/buổi fallback or unpainted halls; kitPalaceMap draws kitTam(!A||A.tam) from jgrey.js (single definition, no private chip). Seen at Fold 755x1000 and iPad 1180x820: chip in the picture corner, no overlap with labels/back button (measured: back button and hotspot label rects do not intersect).
- NO label/pin on an unpainted building: nhat-cac (rank 3 / home "Ngọc Thanh các") shows the picture + ONE hotspot on the single pavilion + 'tạm' chip; Đông/Tây/Dãy nhà cung nhân only in the kit list rows below. 3-hall dirs (shot: home on a Quý nhân dir, Tây/Chính/Đông) labels sit on the painted halls. Looked at the shots.
- pl-courtyards-nostandin.js: 1728 cells, standIns (unmarked) 0, only nhat-cac tam:true (288), errs 0.
- single-hall.js Fold 755x1000@2 + iPad 1180x820@2: fails [] (single-hall places go straight to hall, back button plain "‹ Dư đồ", multi-hall back returns to courtyard).
- Old saves: QUICKCHECK PASS (live-build save loads and plays a buổi); the courtyard picks state from date/festival/mourning only, no new save field.
- opt-greyed.js still PASS on the merged build (2/2 sizes). coop-e2e 59/59. QUICKCHECK PASS (open 952 ms, perf in band).
- KIT consistency: one 'tạm' chip look (kitTam) shared with opt-greyed; worker's `.kpmv .ktam{top:6px;bottom:auto}` override (leather crops the bottom edge) is a per-place position variant — kit keeper should fold it into kitTam (positioning) so all stand-ins match; not blocking (courtyard is the only user today).
- Shots only in scratch (/home/user/wt/og-shots), nothing in git/CDN.
