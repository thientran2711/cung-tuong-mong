# map-r8 — MAP-R8 worker for MAIN CHÍNH 163 (26/11)
PRIORITY #1 CHECK: OD 26/11 ~18:50Z (owner look gate: kitHand / kitPick / NHV areas not approved) + ~18:35Z (place icon = Ta size, above the name) | main LIVE 03a8c17c: jmapz without MAPZ_ZONES, kitHand 0, no jnhv / BAL.area / jkmapban | review/*: map-zones-r7 9c8985ab + kit-map-icons c11c7269 (RV-163B §3 FAIL/HOLD: carries nhv-areas + kit-stage-r2), ob-phu b5c053d1, place-glyphs v3 (Foreman C, CDN only, not wired) | claims none.
Read: START_CORE (18 laws) + START_WORKER, rv-163b §3, place-glyphs (v3), map-zones (r7 + RV-MAP-ZONES), kk44h.

## Branch review/map-r8 = f67cf0a8 (from LIVE 03a8c17c, MAIN ruling option b)
| step | commit | what |
|---|---|---|
| 1 | 9838917a | merge review/ob-phu b5c053d1 (18 commits after base 3da9b4c8: MAPZ_ZONES zoom/fog, jplink, map-wait, dtv painting, home people tab — kitHand/kitPick/BAL.area/jnhv counts unchanged). Conflicts: jk3 → LIVE homeWay label wins (ob-phu «Về <place>» + cut rule dropped); assemble.py → LIVE list + jplink.js before jplrule; built files rebuilt. jksize / jbal2 merged clean (LIVE F10 scroll-cue loop fix and BAL.pun/charge untouched: no hunk from ob-phu). |
| 2 | a52aba19 | re-apply r7's own commits b905190e d989b378 2e2d223b bae1fcd1 (jmapz zones Đông/Tây lục cung + Ty sở, her mark on the zone tag, data-mzk, re-fit after courtyard back, map-zones-scan / map-family-scan / map-zones-video, KIT §85.10 (1)). Built files of those commits dropped and rebuilt. |
| — | (none) | 22e318d5 KIT §103 zone fallback NOT applied: §103 kitMapBanner (jkmapban.js) does not exist on LIVE — it is part of review/kit-stage-r2 (gated). The fallback has no host; KIT §85.10 (1) now says so. dev/test/kit-mapban.js dropped (tests §103). |
| 3 | f5c1ffa0 | kit-map-icons d2b1cced + c11c7269 (kitPlaceIcPx = Ta marker px, above the name, zone tags too, kitPlaceSweep, KIT_MEMARK.mapBase) + glyph swap (below). |
| 4 | 58496171 | KIT §78 glyph rule (canon overwrite in place) + KIT_REQUESTS «place glyphs r8». |
| 5 | f67cf0a8 | dev/test/map-cover-scan.js (MAIN 165 #kshR family, scan only). |

## Icons: painted place glyphs only (law 9/11)
KIT_PLACE_IC now maps every place key to `img/place-<key>.webp`; no stat glyph stands for a place. Family scan (every key that had a stat / skill glyph or none):
| key | place | LIVE / kit-map-icons | r8 |
|---|---|---|---|
| thu | Cần Chính điện | sung | place-cung (stand-in, ART REQUEST) |
| dtd | Dưỡng Hòa điện | sung | place-cung (stand-in, ART REQUEST) |
| tn | Đức Thọ cung | duc | place-cung (stand-in, ART REQUEST) |
| kn | Càn Ninh cung | danh | place-cung (stand-in, ART REQUEST) |
| nvp | Nội vụ phủ | bac | place-cung (stand-in, ART REQUEST) |
| tyv | Thái y viện | y-thuat | place-cung (stand-in, ART REQUEST) |
| nth / pd | Ngự thiện phòng / Phật đường | suc / duc | place-nth / place-pd (v3) |
| ty / dtv | Ty sở / Dưỡng Tú viện | danh / danh (stand) | place-ty / place-dtv (v3) |
| kc_khue kc_sanh kc_thu kc_me kc_di kc_vuon kc_tu kc_hoc kinh | home map | none (LIVE) / danh·duc·sung·place-home stand-ins | place-<key> (v3) |
| kpm:chinh / dong / tay | courtyard halls | none / place-cung | place-chinh / dong / tay (v3) |
| kpm:ngudao vuonhoa thuyta dinhco nonbo | NHV areas (not on LIVE) | place-vuon stand-in | place-<key> (v3; unused until NHV areas land) |
| empty palace (no key) | Cảnh Phúc … Vĩnh Thọ | none / place-cung | place-cungtrong via `data-pk` (j27) |
| Ngoại triều (no key) | Ngoại triều | none / place-cung | place-ngoaitrieu via `data-pk` (jmen) |
| home | her room | place-cung | place-home |
ART REQUEST → Foreman C (via MAIN 163 / KK45): place-thu, place-dtd, place-tn, place-kn, place-nvp, place-tyv (dev/kit/KIT_REQUESTS.md «place glyphs r8»; also to be copied into FOREMAN_C_STATUS.md by MAIN). place-vinhtho unused (Vĩnh Thọ is an empty palace like the others → cungtrong; MAIN may rule).

## Checks
- Gated code (vs LIVE 03a8c17c): kitHand 0/0, kitPick 21/21, BAL.area 0/0, jnhv 0/0, kitMapBanner 0/0.
- map-icon-scan Fold + iPad: every tag of every view has its icon (before: overview 13/14, zone dlc 3/8, tlc 1/2, nv 3/4, courtyard 0/3, home maps 0/9), icon px = Ta px in every view (Fold 28.9–38.1), 0 not-above-name, 0 label overlaps.
- map-zones-scan Fold + iPad day / night / cấm túc / every zone / home: PASS.
- map-family-scan Fold + iPad: overview 14 tags (LIVE 27), 28 places reachable = LIVE; zones nv 4 / ht 2 / dlc 8 / tlc 2 / ty 3; home maps 9 = 9. Ngự hoa viên areas 0 (NHV areas not on LIVE, as ruled). Courtyard row reads 1 when her palace is slot 6 (Hoài Nhu điện): that palace has one hall on LIVE too (probed, not a regression).
- map-labels-scan Fold + iPad day + night + courtyards: PASS (the r7 night «lockBad» came from nhv-areas; gone here).
- quickcheck ×3 (perf median of 3 new/live): run 1 render 164/163 ms · tab 464/463 · buổi 968/976 · tasks>200ms 22/22; run 2 167/190 · 380/515 · 1037/936 · 20/22; run 3 177/168 · 456/420 · 1071/974 · 21/23; old save ok every run. The perf half PASSes every run; MutationObserver sweep adds no long tasks. The run FAILs only on two gates that FAIL identically on LIVE 03a8c17c (run here on both builds): G4 80-dialog-fixed «(kit-dialog-2 a) no empty Tốn / Được cell» Fold+iPad, and button-crawl «Ô lưu · Lui · close button did not close its layer» (Fold). Not map code.
- Pre-existing, reported not fixed (outside scope): home map face chips (`.mfaces`, j21/jkcg) can cover the next tag's name (LIVE 5 hits on home tt Fold, r8 10 — the taller icon label adds the tag's own «N bóng»); iPad courtyard east-hall tag under the right column edge (RV-MAP-ZONES note 4); cấm túc ring outlines the whole zone box.

## Stills (looked at, both devices, @2): https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/fold-1-overview-day.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/ipad-1-overview-day.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/fold-2-zone-her.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/ipad-2-zone-her.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/fold-3-her-courtyard.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/ipad-3-her-courtyard.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/fold-4-overview-night.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/ipad-4-overview-night.jpg · https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/fold-5-home-map.jpg https://ctm-img.victoria-tntt.workers.dev/img/_review/map-r8/ipad-5-home-map.jpg (CDN folder img/_review/map-r8/, 10 files; verdict giver wipes it)



## ADD from MAIN 165 (26/11 ~22:37Z): #kshR / img.kfr over tappable map elements — SCAN DONE, FIX HANDED OVER (worker at rollover ceiling)
PRIORITY #1 CHECK ('kshR'): OD 0 | ledger 0 | claims 8 | main 15 | review/* 0 (MAIN 165's line). Open since D 26/11 09:17Z.
Scan: `node dev/test/map-cover-scan.js <url> [WxH,..]` — every Dư đồ view (overview day/night, every zone, her courtyard, home map) on Fold 755x1000 + iPad 1180x820, at the open view and the 4 scroll corners. Each tappable map element (.mspot, .khap, map tools, .kmov / .kfoc buttons) is hit-tested on 5 points inside the visible scroller; a point is covered when the top element is in #kshR / #kshL / .krailb (rail) or is img.kfr. FAULT = centre covered or 3+ of 5 points covered.
| device | view | LIVE 03a8c17c faults | r8 faults | what covers |
|---|---|---|---|---|
| Fold | palace overview day / night | 2 / 2 | 2 / 3 | rail .krailb.krailt over «!» (tr/br corners); night: Ngoại triều / Nội vụ / Ty sở under #kshR .k3l / .k3r.kasr (Ân sủng row) |
| Fold | zone nv / ty | – (no zones) | 1 / 1 | #kshR .k3r.kasr / .k3l (bottom Ân sủng row) |
| Fold | her courtyard | 2 | 2 | #kshR span.k3l |
| Fold | home map | 0 | 1 | rail .krailb (Hoa viên nhà, tr corner) |
| iPad | zone ht / dlc | – | 1 / 5 | #kshR .k3p.kas (Ân sủng box), .k3r.kasr, .k3p.k3py, span.k3l (right column) |
| iPad | overview night | 0 | 2 | rail .krailt, #kshR .k3r |
| total | | 6 | 18 | img.kfr: 0 hits in these states (E saw it on the «?» of .kmov — not reached by this scan) |
Cause: the zone zoom (jmapz mapFit wrapper) and the scroll extents use the WHOLE map scroller; on iPad #kshR (right column) and on Fold the #kshR rows + the rail lie OVER the scroller, so a zoomed zone / a scrolled corner puts tags under them. j38 mapFit (4) «no tag cut at open» already knows the rail + the card column but only at the first open.
Plan for the successor (one place, kit): (1) one function `mapFreeRect(sc)` = scroller rect minus the real boxes of #kshR / #kshL / .krailb that intersect it (j38 rowsM already measures the Fold rows); (2) jmapz zone fit + j38 open fit fit into mapFreeRect, not the scroller; (3) the scroller's content gets padding = those insets (so every map edge can be brought into the free area: scroll extents end at the free edge); (4) img.kfr / decorative frames `pointer-events:none` (aria-hidden decor); (5) re-run map-cover-scan Fold+iPad → 0 faults, + map-zones / map-labels / map-icon scans. Not done here.

## ROLLOVER (worker at ceiling): branch pushed f67cf0a8; serve the worktree with python3 -m http.server; my scratch tools in /home/user/wt/map-r8-tools (chipscan.js, court*.js, stills.js). Coordinator opens the successor for the #kshR fix.
~70% xong / ~55% chơi được (zones + painted icons on LIVE base ready to look at; #kshR cover fix still open)
